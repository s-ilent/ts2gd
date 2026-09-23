import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

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

  return combine({
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

          return `[Callable(${callableTarget}, "${decl.name.text}"), {}]`
        }
      }

      const name = props.scope.getName(node)

      if (!name) {
        // Imports from modules outside the project register their local
        // binding names directly, because the checker produces no symbol to
        // key on. Only identifiers that resolve to no declaration consult
        // this map, so local shadowing is unaffected.
        if (props.importedNames?.has(node.text)) {
          return props.importedNames.get(node.text)!
        }

        return node.text
      }

      return name
    },
  })
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
