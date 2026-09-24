import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

// GDScript only understands a small set of backslash escapes inside string
// literals. TypeScript's AST hands us the *decoded* text, so a source string
// like "C:\\path" arrives containing a single literal backslash; passing that
// through unescaped produces "\p" — an invalid GDScript escape. Re-escape
// everything GDScript would otherwise misread.
export const escapeGdString = (text: string): string => {
  let out = ""

  for (const ch of text) {
    switch (ch) {
      case "\\":
        out += "\\\\"
        break
      case '"':
        out += '\\"'
        break
      case "\n":
        out += "\\n"
        break
      case "\r":
        out += "\\r"
        break
      case "\t":
        out += "\\t"
        break
      default: {
        const code = ch.codePointAt(0) ?? 0

        if (code < 0x20) {
          out += "\\u" + code.toString(16).padStart(4, "0")
        } else {
          out += ch
        }
      }
    }
  }

  return out
}

export const parseStringLiteral = (
  node: ts.StringLiteral,
  props: ParseState
): ParseNodeType => {
  const text = escapeGdString(node.text)

  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => `"${text}"`,
  })
}

export const testNewlineLiteral: Test = {
  ts: `
let d = "\\n"
  `,
  expected: `
class_name __Mod_Test_4064or
static var _d = "\\n"
`,
}

export const testBackslashLiteral: Test = {
  ts: `
let d = "C:\\\\path\\\\to"
  `,
  expected: `
class_name __Mod_Test_4064or
static var _d = "C:\\\\path\\\\to"
`,
}

export const testQuoteLiteral: Test = {
  ts: `
let d = 'say "hi" now'
  `,
  expected: `
class_name __Mod_Test_4064or
static var _d = "say \\"hi\\" now"
`,
}

export const testNulLiteral: Test = {
  ts: `
let d = "a\\0b"
  `,
  expected: `
class_name __Mod_Test_4064or
static var _d = "a\\u0000b"
`,
}
