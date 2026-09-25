import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { mangleGdName, mangleMemberAccessName } from "../scope"

import { LibraryFunctions, LibraryFunctionName } from "./library_functions"

/**
 * Global classes that stand in for shim script resources loaded from
 * res://_ts_shims. Bare value references compile to the loaded script
 * (Error.new -> __ts_Error.new) and static members read off it.
 */
export const globalShimClassLibs: Record<string, LibraryFunctionName> = {
  Error: "ts_error_class",
  Date: "ts_date_class",
  DataView: "ts_data_view_class",
  WeakRef: "ts_weak_ref_class",
}

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

  // Remaining global one-shot helpers map their bare identifier onto the
  // hoisted helper function: calls compose naturally, and function-value
  // positions pass the helper reference as a Callable.
  const globalHelperIdents: Record<string, LibraryFunctionName> = {
    Number: "ts_number",
    Symbol: "ts_symbol",
    structuredClone: "ts_structured_clone",
    encodeURIComponent: "ts_encode_uri_component",
  }

  if (Object.prototype.hasOwnProperty.call(globalHelperIdents, name)) {
    const libName = globalHelperIdents[name]
    const result = combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => `__${libName}`,
    })

    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add(libName)

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
  const isGlobalShimClass =
    !isAccessName &&
    !scopeName &&
    Object.prototype.hasOwnProperty.call(globalShimClassLibs, name)

  // The environment shim backs globalThis and feature-detected browser
  // services in both value and member-base positions.
  const isEnvShimBase =
    !scopeName && (name === "globalThis" || name === "indexedDB")

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

        // The global object and feature-detected browser services resolve
        // to the shared environment shim in both value and member-base
        // positions; unassigned shim members read back null so feature
        // tests (typeof x == "undefined") still hold.
        if (node.text === "globalThis") {
          return "__ts_env()"
        }

        if (node.text === "indexedDB") {
          return "__ts_env().indexedDB"
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
          // name, not a value). Other global classes with shims (Date,
          // DataView, WeakRef) follow the same pattern.
          if (
            Object.prototype.hasOwnProperty.call(globalShimClassLibs, node.text)
          ) {
            return `__ts_${node.text}`
          }
        }

        // Member names in property access chains resolve through the access
        // chain rather than the scope. A member whose name collides with a
        // native property (Object.script) is renamed at its declaration, so
        // an access follows when it resolves to a project-source member;
        // accesses into declaration files (native properties) and plain
        // type-level properties (Dictionaries) keep the source spelling.
        if (isAccessName) {
          return mangleMemberAccessName(node.text, symbol)
        }

        return node.text
      }

      return resolvedName
    },
  })

  if (isAmbientGlobal || isGlobalShimClass || isEnvShimBase) {
    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add(
      isGlobalShimClass ? globalShimClassLibs[name] : "ts_env"
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

export const testGlobalShimClassesAndEnv: Test = {
  ts: `
\
export class Test {
  static stamp() {
    return Date.now()
  }
  static view(bytes) {
    return new DataView(bytes, 0, bytes.length)
  }
  static hold(obj) {
    return new WeakRef(obj)
  }
  static globals() {
    return globalThis
  }
  static hasStore() {
    return typeof indexedDB == "undefined"
  }
  static castValue(values) {
    return values.map(Number)
  }
}
  `,
  expected: `

# This file has been autogenerated by ts2gd. DO NOT EDIT!



class_name Test
    


static var __ts_Date = load("res://_ts_shims/ts_date.gd")


static var __ts_DataView = load("res://_ts_shims/ts_data_view.gd")


static var __ts_WeakRef = load("res://_ts_shims/ts_weak_ref.gd")


static var __ts_env_instance = null

static func __ts_env():
  if __ts_env_instance == null:
    __ts_env_instance = load("res://_ts_shims/ts_env.gd").new()
  return __ts_env_instance


static func __ts_typeof(v):
  match typeof(v):
    TYPE_NIL:
      return "undefined"
    TYPE_BOOL:
      return "boolean"
    TYPE_INT, TYPE_FLOAT:
      return "number"
    TYPE_STRING:
      return "string"
    TYPE_CALLABLE:
      return "function"
    _:
      return "object"


static func __ts_number(x):
  if x is bool:
    return 1.0 if x else 0.0
  if x is String:
    return x.to_float()
  return float(x)


static func __ts_array_map(arr, f):
  var out := []
  for item in arr:
    out.append(__ts_call_fn(f, [item]))
  return out


static func __ts_call_fn(f, args):
  if f is Array and f.size() == 2 and f[0] is Callable:
    var all_args: Array = args.duplicate()
    if f[1] is Dictionary and not f[1].is_empty():
      all_args.append(f[1])
    return f[0].callv(all_args)
  if f is Callable:
    return f.callv(args)
  return null


static func __ts_truthy(v):
  match typeof(v):
    TYPE_BOOL:
      return v
    TYPE_INT, TYPE_FLOAT:
      return v != 0
    TYPE_STRING:
      return v != ""
    TYPE_NIL:
      return false
    _:
      return v != null





static func stamp():
  return __ts_Date.now()
static func view(bytes):
  return __ts_DataView.new(bytes, 0, bytes.length)
static func hold(obj):
  return __ts_WeakRef.new(obj)
static func globals():
  return __ts_env()
static func hasStore():
  return __ts_typeof(__ts_env().indexedDB) == "undefined"
static func castValue(values):
  return __ts_array_map(values, __ts_number)
`,
}

export const testToStringMethodNotShimRouted: Test = {
  ts: `
export class Item {
  name = "sword"
  toString(): string {
    return this.name
  }
}
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name Item
    





var name: String = "sword"
func toString():
  return self.name

`,
}
