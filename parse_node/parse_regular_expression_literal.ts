import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

export const parseRegularExpressionLiteral = (
  node: ts.RegularExpressionLiteral,
  props: ParseState
): ParseNodeType => {
  // /pattern/flags compiles to a RegEx instance built by a helper. The
  // global flag changes call-site semantics (replace-all), not compilation,
  // so only case-insensitivity carries into the pattern.
  const text = node.text
  const lastSlash = text.lastIndexOf("/")

  if (lastSlash <= 0) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "null",
    })
  }

  const pattern = text.slice(1, lastSlash)
  const flags = text.slice(lastSlash + 1)

  const result = combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => `__ts_regex("${pattern}", "${flags}")`,
  })

  result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
  result.hoistedLibraryFunctions.add("ts_regex")

  return result
}

export const testRegexLiteral: Test = {
  ts: "const r = /abc/g",
  expected: `
class_name __Mod_Test_4064or
static func __ts_regex(pattern: String, flags: String) -> RegEx:
  var regex = RegEx.new()
  var effective = pattern

  if flags.contains("i"):
    effective = "(?i)" + effective

  regex.compile(effective)
  return regex
static var _r = __ts_regex("abc", "g")
`,
}
