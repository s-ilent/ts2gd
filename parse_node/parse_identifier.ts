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
