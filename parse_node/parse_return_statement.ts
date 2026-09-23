import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

const { SyntaxKind } = ts

export const parseReturnStatement = (
  node: ts.ReturnStatement,
  props: ParseState
): ParseNodeType => {
  // `return i++` must yield the old value and still run the increment.
  // The postfix emitter's increment line is an "after" extra line, which
  // lands after the return (dead code). Capture into a temp instead.
  if (
    node.expression &&
    ts.isPostfixUnaryExpression(node.expression) &&
    (node.expression.operator === SyntaxKind.PlusPlusToken ||
      node.expression.operator === SyntaxKind.MinusMinusToken)
  ) {
    const op =
      node.expression.operator === SyntaxKind.PlusPlusToken ? "+=" : "-="

    return combine({
      parent: node,
      nodes: [node.expression.operand],
      props,
      parsedStrings: (operand) => {
        const tmp = props.scope.createUniqueName()

        return `var ${tmp} = ${operand}\n${operand} ${op} 1\nreturn ${tmp}`
      },
    })
  }

  return combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => `return ${expr}`,
  })
}

export const testPostfixIncrementInReturn: Test = {
  ts: `
export class Test {
  bump(): int {
    let i: int = 0
    return i++
  }
}
  `,
  expected: `
class_name Test
func bump():
  var i: int = 0
  var __gen = i
  i += 1
  return __gen
`,
}

export const testPostfixDecrementInReturn: Test = {
  ts: `
export class Test {
  drop(): int {
    let i: int = 10
    return i--
  }
}
  `,
  expected: `
class_name Test
func drop():
  var i: int = 10
  var __gen = i
  i -= 1
  return __gen
`,
}

export const testPrefixIncrementInReturn: Test = {
  ts: `
export class Test {
  bump(): int {
    let i: int = 0
    return ++i
  }
}
  `,
  expected: `
class_name Test
func bump():
  var i: int = 0
  i += 1
  return i
`,
}
