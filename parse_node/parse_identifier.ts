import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { mangleGdName } from "../scope"

import { LibraryFunctions } from "./library_functions"

/**
 * Ambient JavaScript environment globals that stand in for a browser host.
 * They resolve to a shared environment object only when no declaration of
 * the same name exists, so ordinary local variables are never rewritten.
 */
const ambientReceiverGlobals = new Set([
  "window",
  "document",
  "navigator",
  "location",
  "history",
  "localStorage",
  "sessionStorage",
  "performance",
  "screen",
  "Reflect",
])

const ambientCallGlobals = new Set([
  "fetch",
  "setTimeout",
  "clearTimeout",
  "setInterval",
  "clearInterval",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "atob",
  "btoa",
  "getComputedStyle",
])

export const parseIdentifier = (
  node: ts.Identifier,
  props: ParseState
): ParseNodeType => {
  const name = node.text

  if (name === "undefined") {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "null",
    })
  }

  if (name === "Infinity") {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "INF",
    })
  }

  // Global parseInt maps onto the shared radix-aware helper.
  if (name === "parseInt") {
    const result = combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "__ts_parse_int",
    })

    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add("ts_parse_int")

    return result
  }

  // The ambient decision is computed before parsing children so the helper
  // is only hoisted when the mapping will actually fire: the identifier must
  // resolve to no declaration and must not be a member name.
  const scopeName = props.scope.getName(node)
  const isAccessName =
    node.parent.kind === SyntaxKind.PropertyAccessExpression
      ? (node.parent as ts.PropertyAccessExpression).name === node
      : node.parent.kind === SyntaxKind.QualifiedName

  const isAmbientGlobal =
    !isAccessName &&
    !scopeName &&
    (ambientReceiverGlobals.has(name) || ambientCallGlobals.has(name))

  // The global Error value maps to the shim class; the hoist is decided
  // before parsing so the load line only lands when the mapping fires.
  const isGlobalError = !isAccessName && !scopeName && name === "Error"

  const result = combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => {
      // Imported bindings from other modules resolve to a receiver
      // expression registered when the import was parsed.
      const symbol = props.program.getTypeChecker().getSymbolAtLocation(node)

      if (symbol && props.importedBindings?.has(symbol)) {
        return props.importedBindings.get(symbol)!
      }

      // A shorthand property assignment references its variable through the
      // property name, whose own symbol is the synthesized property rather
      // than the referenced binding. Resolve the value symbol to pick up
      // function-value rewrites and imported bindings.
      if (
        node.parent.kind === SyntaxKind.ShorthandPropertyAssignment &&
        (node.parent as ts.ShorthandPropertyAssignment).name === node
      ) {
        const valueSymbol = props.program
          .getTypeChecker()
          .getShorthandAssignmentValueSymbol(
            node.parent as ts.ShorthandPropertyAssignment
          )

        if (valueSymbol) {
          if (props.nestedFunctionBindings?.has(valueSymbol)) {
            const binding = props.nestedFunctionBindings.get(valueSymbol)!
            const callableTarget =
              props.inStaticContext && props.moduleClassName
                ? props.moduleClassName
                : "self"

            return `[Callable(${callableTarget}, "${
              binding.name
            }"), ${binding.captures()}]`
          }

          if (props.importedBindings?.has(valueSymbol)) {
            return props.importedBindings.get(valueSymbol)!
          }
        }
      }

      // Nested (inner) function declarations are values as [Callable,
      // captures] tuples so closed-over variables travel with them.
      if (symbol && props.nestedFunctionBindings?.has(symbol)) {
        const binding = props.nestedFunctionBindings.get(symbol)!
        const callableTarget =
          props.inStaticContext && props.moduleClassName
            ? props.moduleClassName
            : "self"

        return `[Callable(${callableTarget}, "${
          binding.name
        }"), ${binding.captures()}]`
      }

      // Module-level function declarations referenced as values become
      // [Callable, captures] tuples so that any expression combining
      // function values (conditionals, nullish coalescing) calls uniformly
      // through the tuple convention. Member names in property accesses
      // resolve through the access chain, never as standalone values.
      const isMemberName =
        node.parent.kind === SyntaxKind.PropertyAccessExpression ||
        node.parent.kind === SyntaxKind.QualifiedName

      if (symbol && !props.importedBindings?.has(symbol) && !isMemberName) {
        const decl = symbol.declarations?.[0]

        if (decl && ts.isFunctionDeclaration(decl) && decl.name && decl.body) {
          const callableTarget =
            props.inStaticContext && props.moduleClassName
              ? props.moduleClassName
              : "self"

          return `[Callable(${callableTarget}, "${mangleGdName(
            decl.name.text
          )}"), {}]`
        }
      }

      const resolvedName = scopeName

      if (!resolvedName) {
        // Imports from modules outside the project register their local
        // binding names directly, because the checker produces no symbol to
        // key on. Only identifiers that resolve to no declaration consult
        // this map, so local shadowing is unaffected.
        if (props.importedNames?.has(node.text)) {
          return props.importedNames.get(node.text)!
        }

        // Ambient JavaScript environment globals resolve to a shared
        // stand-in object; free environment functions become method calls
        // on it. Skipped when the identifier names a member, so member
        // access chains are unaffected.
        if (!isAccessName) {
          if (ambientReceiverGlobals.has(node.text)) {
            return "__ts_env()"
          }

          if (ambientCallGlobals.has(node.text)) {
            return `__ts_env().${node.text}`
          }

          // The global Error constructor/value stands in for the shim script
          // resource: Error.new(...) becomes __ts_Error.new(...), and
          // instanceof Error is rewritten separately (is requires a type
          // name, not a value).
          if (node.text === "Error") {
            return "__ts_Error"
          }
        }

        return node.text
      }

      return resolvedName
    },
  })

  if (isAmbientGlobal || isGlobalError) {
    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add(
      isGlobalError ? "ts_error_class" : "ts_env"
    )
  }

  return result
}

export const testUndefined: Test = {
  ts: `
let x = undefined
  `,
  expected: `
class_name __Mod_Test_4064or
static var _x = null
  `,
}

export const testAmbientBrowserObject: Test = {
  ts: `
const ready = document.readyState
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_env.definition("__ts_env")}
static var _ready = __ts_env().readyState
  `,
}

export const testAmbientEnvFunctionCall: Test = {
  ts: `
const size = fetch("http://example.com")
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_env.definition("__ts_env")}
static var _size = __ts_env().fetch("http://example.com")
  `,
}

export const testAmbientGlobalShadowedByLocal: Test = {
  ts: `
function go(window: int): int {
  return window + 1
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func go(window: int):
  return window + 1
  `,
}
