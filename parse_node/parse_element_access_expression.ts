import ts from "typescript"

import { ParseState, combine, parseNode, ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

/**
 * JS regexp execution results (RegExpExecArray from exec, RegExpMatchArray
 * from match) hold a Godot RegExMatch at runtime, and RegExMatch rejects
 * integer indexing ("Only String or StringName can be used as index").
 * JS group access maps onto get_string(), which takes both a group index
 * and a group name, so element access rewrites uniformly.
 *
 * When the project declares the standard result interfaces the type-string
 * test catches them directly (unions with null included). Projects compiled
 * with an empty RegExp interface leave exec/match results untyped, so
 * detection then follows the producing call syntactically: the expression
 * either IS a .exec(...) / .match(...) call on a RegExp or string receiver,
 * or it is a variable whose initializer is such a call.
 */
const regExResultTypePattern = /RegExp(Exec|Match)?Array\b/

const isRegexMatchProducingCall = (
  call: ts.CallExpression,
  checker: ts.TypeChecker
): boolean => {
  const callee = call.expression

  if (!ts.isPropertyAccessExpression(callee)) {
    return false
  }

  const receiverTypeString = checker.typeToString(
    checker.getTypeAtLocation(callee.expression)
  )

  if (callee.name.text === "exec") {
    return (
      receiverTypeString === "RegExp" ||
      ts.isRegularExpressionLiteral(callee.expression)
    )
  }

  if (callee.name.text === "match") {
    // Literal-tolerant: a const initialized with a string literal carries
    // the literal type, whose apparent type is string.
    const apparent = checker.typeToString(
      checker.getApparentType(checker.getTypeAtLocation(callee.expression))
    )

    return apparent === "string" || apparent === "String"
  }

  return false
}

const resolvesToRegexMatch = (
  node: ts.Expression,
  checker: ts.TypeChecker
): boolean => {
  if (ts.isCallExpression(node)) {
    return isRegexMatchProducingCall(node, checker)
  }

  if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node)) {
    const decl = checker.getSymbolAtLocation(node)?.declarations?.[0]
    let init: ts.Expression | undefined

    if (decl && ts.isVariableDeclaration(decl)) {
      init = decl.initializer
    } else if (decl && ts.isPropertyDeclaration(decl)) {
      init = decl.initializer
    } else if (decl && ts.isParameter(decl)) {
      init = decl.initializer
    }

    return (
      !!init &&
      ts.isCallExpression(init) &&
      isRegexMatchProducingCall(init, checker)
    )
  }

  return false
}

export const parseElementAccessExpression = (
  node: ts.ElementAccessExpression,
  props: ParseState
): ParseNodeType => {
  const checker = props.program.getTypeChecker()
  const baseTypeString = checker.typeToString(
    checker.getTypeAtLocation(node.expression)
  )

  if (
    regExResultTypePattern.test(baseTypeString) ||
    resolvesToRegexMatch(node.expression, checker)
  ) {
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
const match = /^item:(\\d+)$/.exec(id)
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
