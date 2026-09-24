import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

import { escapeGdString } from "./parse_string_literal"

export const parseTemplateExpression = (
  node: ts.TemplateExpression,
  props: ParseState
): ParseNodeType => {
  // Template spans go through the same escaping as plain string literals:
  // embedded quotes, backslashes and control characters must not terminate
  // or corrupt the emitted GDScript string.
  const sanitizeText = (text: string) => {
    return escapeGdString(text)
  }

  return combine({
    parent: node,
    nodes: node.templateSpans.map((span) => span.expression),
    props,
    parsedStrings: (...exprs) => {
      let result = ""

      result += '"' + sanitizeText(node.head.text) + '"'

      for (let i = 0; i < exprs.length; i++) {
        result += ` + str(${exprs[i]})`
        result +=
          ' + "' + sanitizeText(node.templateSpans[i].literal.text) + '"'
      }

      return result
    },
  })
}

export const testStringInterpolation: Test = {
  ts: `
let foo = \`blah \${ 10 }  \${ 20 }\`
  `,
  expected: `
class_name __Mod_Test_4064or
static var _foo = "blah " + str(10) + "  " + str(20) + ""
`,
}
