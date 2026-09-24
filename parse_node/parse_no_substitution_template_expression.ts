import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

import { escapeGdString } from "./parse_string_literal"

export const parseNoSubstitutionTemplateLiteral = (
  node: ts.NoSubstitutionTemplateLiteral,
  props: ParseState
): ParseNodeType => {
  // Same escaping as plain string literals (quotes, backslashes, control
  // characters).
  const sanitizeText = (text: string) => {
    return escapeGdString(text)
  }

  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => `"${sanitizeText(node.text)}"`,
  })
}

export const testSanitizeText: Test = {
  ts: `
let foo = \`
woo
\`
  `,
  expected: `
class_name __Mod_Test_4064or
static var _foo = "\\nwoo\\n"
`,
}
