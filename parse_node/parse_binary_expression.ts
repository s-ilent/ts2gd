import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

import { LibraryFunctions } from "./library_functions"

export const parseBinaryExpression = (
  node: ts.BinaryExpression,
  props: ParseState
): ParseNodeType => {
  const needsLeftHandSpace = node.operatorToken.kind !== SyntaxKind.CommaToken

  // We need to rewrite things like dict.a = foo into dict['a'] = foo
  // if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
  //   if (node.left.kind === ts.SyntaxKind.PropertyAccessExpression) {
  //     const leftPropAccess = node.left as ts.PropertyAccessExpression;
  //     const dictNode = leftPropAccess.expression;
  //     const dictNodeType = props.program.getTypeChecker().getTypeAtLocation(dictNode);
  //     const keyNode = leftPropAccess.name;

  //     if (isDictionary(dictNodeType)) {
  //       return combine({
  //         parent: node,
  //         nodes: [dictNode, node.right],
  //         props,
  //         content: (dictNode, right) => `${dictNode}["${keyNode.text}"] = ${right}`
  //       });
  //     }
  //   }
  // }

  // GDScript has no unsigned right shift; compile through a helper.
  if (
    node.operatorToken.kind ===
    SyntaxKind.GreaterThanGreaterThanGreaterThanToken
  ) {
    const result = combine({
      parent: node,
      nodes: [node.left, node.right],
      props,
      parsedStrings: (l, r) => `__ts_shr_unsigned(${l}, ${r})`,
    })

    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add("ts_shr_unsigned")

    return result
  }

  const checker = props.program.getTypeChecker()

  const leftType = checker.getTypeAtLocation(node.left)
  const rightType = checker.getTypeAtLocation(node.right)
  const leftTypeString = checker.typeToString(leftType)
  const rightTypeString = checker.typeToString(rightType)

  return combine({
    parent: node,
    nodes: [node.left, node.operatorToken, node.right],
    props,
    parsedStrings: (left, operatorToken, right) => {
      if (operatorToken === "??") {
        return `(${left} if (${left}) != null else ${right})`
      }

      // In Godot 4, == across differing types is legal and simply yields
      // false (the Godot 3 hard-error limitation no longer applies), so no
      // runtime type guard is needed. GDScript has no strict variants:
      // === / !== behave identically to == / !=.
      if (operatorToken === "===") {
        operatorToken = "=="
      } else if (operatorToken === "!==") {
        operatorToken = "!="
      }

      return `${left}${needsLeftHandSpace ? " " : ""}${operatorToken} ${right}`
    },
  })
}

// Tests

export const testAdd: Test = {
  ts: "1 + 2",
  expected: "class_name __Mod_Test_4064or\n\n1 + 2",
}

export const testMultiply: Test = {
  ts: "1 * 2",
  expected: "class_name __Mod_Test_4064or\n\n1 * 2",
}

export const testAssignmentToDict: Test = {
  ts: `const foo = {};
foo.bar = 1`,

  expected: `
class_name __Mod_Test_4064or
static var foo = {}
foo.bar = 1
`,
}

export const testNestedAssignmentToDict: Test = {
  ts: `const foo = { bar: {} };
foo.bar.baz = 1`,
  expected: `
class_name __Mod_Test_4064or
static var foo = { "bar": {} }
foo.bar.baz = 1
`,
}

export const testDoubleEqual: Test = {
  ts: "(1 as int) == (2 as int)",
  expected: "class_name __Mod_Test_4064or\n\n1 == 2",
}

export const testDoubleEqualDifferentTypes: Test = {
  ts: `
let a: { a: number; } | string
let b: string

a == b
  `,
  expected: `
class_name __Mod_Test_4064or
static var a
static var b  
a == b
`,
}

export const testDoubleNotEqualDifferentTypes: Test = {
  ts: `
let a: { a: number; } | string
let b: string

a != b
  `,
  expected: `
class_name __Mod_Test_4064or
static var a
static var b  
a != b
`,
}

export const testBitwiseTokens: Test = {
  ts: `
let a = (x >> 2) | (y << 3)
let b = 8 >>> 1
let flags = 0
flags &= ~mask
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_shr_unsigned.definition("__ts_shr_unsigned")}
static var _a = (x >> 2) | (y << 3)
static var _b = __ts_shr_unsigned(8, 1)
static var flags
flags &= ~mask
  `,
}
