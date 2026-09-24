import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

export const parseDeleteExpression = (
  node: ts.DeleteExpression,
  props: ParseState
): ParseNodeType => {
  // `delete recv.key` / `delete recv[key]` removes the entry from a
  // dictionary, which GDScript spells recv.erase(key).
  let receiver: ts.Expression
  let keyNode: ts.Expression
  let keyText: string | null = null

  if (ts.isPropertyAccessExpression(node.expression)) {
    receiver = node.expression.expression
    keyNode = node.expression.name
    keyText = node.expression.name.getText()
  } else if (ts.isElementAccessExpression(node.expression)) {
    receiver = node.expression.expression
    keyNode = node.expression.argumentExpression
  } else {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "false",
    })
  }

  return combine({
    parent: node,
    nodes: [receiver, keyNode],
    props,
    parsedStrings: (recv, key) => {
      const keyExpr = keyText !== null ? `"${keyText}"` : key

      return `${recv}.erase(${keyExpr})`
    },
  })
}

export const testDeleteProperty: Test = {
  ts: "const o = { k: 1 }\ndelete o.k",
  expected: `
class_name __Mod_Test_4064or
static var o = { "k": 1 }
o.erase("k")
`,
}

export const testDeleteElement: Test = {
  ts: `const o = { k: 1 }\ndelete o["k"]`,
  expected: `
class_name __Mod_Test_4064or
static var o = { "k": 1 }
o.erase("k")
`,
}
