import ts from "typescript"

import { ParseState, combine, parseNode, ParseNodeType } from "../parse_node"
import { resolvesToRegexMatch } from "../ts_utils"
import { Test } from "../tests/test"

export const parseElementAccessExpression = (
  node: ts.ElementAccessExpression,
  props: ParseState
): ParseNodeType => {
  // JS regexp execution results (RegExpExecArray from exec, RegExpMatchArray
  // from match) hold a Godot RegExMatch at runtime, and RegExMatch rejects
  // integer indexing ("Only String or StringName can be used as index").
  // JS group access maps onto get_string(), which takes both a group index
  // and a group name, so element access rewrites uniformly.
  if (resolvesToRegexMatch(node.expression, props.program.getTypeChecker())) {
    return combine({
      parent: node,
      nodes: [node.expression, node.argumentExpression],
      props,
      parsedStrings: (lhs, rhs) => `${lhs}.get_string(${rhs})`,
    })
  }

  return combine({
    parent: node,
    nodes: [node.expression, node.argumentExpression],
    props,
    parsedStrings: (lhs, rhs) => `${lhs}[${rhs}]`,
  })
}

export const testRegExpExecElementAccess: Test = {
  ts: `
const m = /(\\d+)-(\\d+)/.exec("12-34")
const x = m[1]
  `,
  expected: `
class_name __Mod_Test_4064or
static func __ts_regex(pattern: String, flags: String) -> RegEx:
  var regex = RegEx.new()
  var effective = pattern
  if flags.contains("i"):
    effective = "(?i)" + effective
  regex.compile(effective)
  return regex
static var m = __ts_regex("(\\\\d+)-(\\\\d+)", "").search("12-34")
static var _x = m.get_string(1)
  `,
}

export const testRegExpMatchVarElementAccess: Test = {
  ts: `
const id = "item:42"
const match = /^item:(\\d+)$/.exec(id)!
const n = match[1]
  `,
  expected: `
class_name __Mod_Test_4064or
static func __ts_regex(pattern: String, flags: String) -> RegEx:
  var regex = RegEx.new()
  var effective = pattern
  if flags.contains("i"):
    effective = "(?i)" + effective
  regex.compile(effective)
  return regex
static var id = "item:42"
static var match_ = __ts_regex("^item:(\\\\d+)$", "").search(id)
static var _n = match_.get_string(1)
  `,
}
