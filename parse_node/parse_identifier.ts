import ts from "typescript"

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

        return `[Callable(${callableTarget}, "${binding.name}"), ${binding.captures}]`
      }

      const name = props.scope.getName(node)

      if (!name) {
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
