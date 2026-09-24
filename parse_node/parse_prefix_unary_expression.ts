import ts from "typescript"

import {
  ExtraLine,
  ExtraLineType,
  ParseState,
  combine,
  parseNode,
  ParseNodeType,
} from "../parse_node"
import { Test } from "../tests/test"
import { getGodotType } from "../ts_utils"
const { SyntaxKind } = ts

export const parsePrefixUnaryExpression = (
  node: ts.PrefixUnaryExpression,
  props: ParseState
): ParseNodeType => {
  let newIncrements: ExtraLine | null = null

  const result = combine({
    parent: node,
    nodes: node.operand,
    props,
    parsedStrings: (operand) => {
      switch (node.operator) {
        case SyntaxKind.PlusPlusToken: {
          newIncrements = {
            type: "before",
            line: `${operand} += 1`,
            lineType: ExtraLineType.Increment,
          }

          return node.parent.kind === SyntaxKind.ExpressionStatement
            ? ""
            : operand
        }
        case SyntaxKind.MinusMinusToken: {
          newIncrements = {
            type: "before",
            line: `${operand} -= 1`,
            lineType: ExtraLineType.Decrement,
          }

          return node.parent.kind === SyntaxKind.ExpressionStatement
            ? ""
            : operand
        }
        case SyntaxKind.PlusToken:
          return `+${operand}`
        case SyntaxKind.MinusToken:
          return `-${operand}`
        case SyntaxKind.TildeToken: {
          // JS runs ToInt32 on the operand; GDScript requires an int, so
          // bool and float operands go through int().
          const tildeType = props.program
            .getTypeChecker()
            .getTypeAtLocation(node.operand)
          const tildeGodotType = getGodotType(
            node.operand,
            tildeType,
            props,
            false
          )

          return tildeGodotType === "bool" || tildeGodotType === "float"
            ? `~int(${operand})`
            : `~${operand}`
        }
        case SyntaxKind.ExclamationToken:
          return `not ${operand}`
      }
    },
  })

  result.extraLines = [
    ...(newIncrements ? [newIncrements] : []),
    ...(result.extraLines ?? []),
  ]

  return result
}

// TODO: for loops
// TODO: indents

export const testPreincrement1: Test = {
  ts: `
if (true) {
  ++x
  print(x)
}
  `,
  expected: `
class_name __Mod_Test_4064or
if true:
  x += 1
  print(x)
  `,
}

export const testPreincrement2: Test = {
  ts: `
if (true) {
  print(++x)
}
  `,
  expected: `
class_name __Mod_Test_4064or
if true:
  x += 1
  print(x)
  `,
}

export const testPostincrement1: Test = {
  ts: `
if (true) {
  print(x++)
}
  `,
  expected: `
class_name __Mod_Test_4064or
if true:
  print(x)
  x += 1
  `,
}

export const testIfStatement: Test = {
  ts: `
let x = 0
if (true) {
  if (++x) {
    print(x)
  } else {
    print(x)
  }
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var x: int = 0
if true:
  x += 1
  if x:
    print(x)
  else:
    print(x)
`,
}

export const testIfStatement2: Test = {
  ts: `
let x = 0
if (true) {
  if (x++) {
    print(x)
  } else {
    print(x)
  }
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var x: int = 0
if true:
  if x:
    x += 1
    print(x)
  else:
    x += 1
    print(x)
`,
}

export const testTildeFloatCoercion: Test = {
  ts: "let x = 1.5\nconst y = ~x\nprint(y)",
  expected: `
class_name __Mod_Test_4064or
static var x: float = 1.5
static var y = ~int(x)
print(y)
`,
}
