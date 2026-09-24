import ts, { SyntaxKind } from "typescript"

import {
  ExtraLineType,
  ParseNodeType,
  ParseState,
  combine,
  parseNode,
} from "../parse_node"
import { Test } from "../tests/test"
import { getGodotType } from "../ts_utils"

import { LibraryFunctions } from "./library_functions"

// Assignment operators whose expression form GDScript rejects.
const assignmentTokens = new Set([
  SyntaxKind.EqualsToken,
  SyntaxKind.PlusEqualsToken,
  SyntaxKind.MinusEqualsToken,
  SyntaxKind.AsteriskEqualsToken,
  SyntaxKind.SlashEqualsToken,
  SyntaxKind.PercentEqualsToken,
  SyntaxKind.AmpersandEqualsToken,
  SyntaxKind.BarEqualsToken,
  SyntaxKind.CaretEqualsToken,
  SyntaxKind.LessThanLessThanEqualsToken,
  SyntaxKind.GreaterThanGreaterThanEqualsToken,
  SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
])

// An assignment only lands in a real statement position when its direct
// (parenthesis-unwrapping) parent is an expression statement, or when it
// fills a for-loop initializer/incrementor slot (the for lowering emits
// those as standalone statements).
const isStatementPosition = (node: ts.BinaryExpression): boolean => {
  let parent: ts.Node | undefined = node.parent

  while (parent && ts.isParenthesizedExpression(parent)) {
    parent = parent.parent
  }

  if (!parent) {
    return false
  }

  if (ts.isExpressionStatement(parent)) {
    return true
  }

  return (
    ts.isForStatement(parent) &&
    (parent.initializer === node || parent.incrementor === node)
  )
}

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

  // Same for the compound assignment form, which GDScript also lacks.
  if (
    node.operatorToken.kind ===
    SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
  ) {
    const result = combine({
      parent: node,
      nodes: [node.left, node.right],
      props,
      parsedStrings: (l, r) => `${l} = __ts_shr_unsigned(${l}, ${r})`,
    })

    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add("ts_shr_unsigned")

    return result
  }

  // GDScript has no logical assignment operators; lower them onto ternary
  // assignments. The target is only evaluated for a read, so simple lvalues
  // are exact, and the right-hand side is evaluated at most once.
  //
  // An assignment in VALUE position (`return x ??= y`) must additionally
  // split: the assignment becomes a hoisted line and the expression yields
  // the assigned lvalue, because GDScript rejects assignments inside
  // expressions.
  if (
    node.operatorToken.kind === SyntaxKind.QuestionQuestionEqualsToken ||
    node.operatorToken.kind === SyntaxKind.BarBarEqualsToken ||
    node.operatorToken.kind === SyntaxKind.AmpersandAmpersandEqualsToken
  ) {
    const lowered = (l: string, r: string): string => {
      switch (node.operatorToken.kind) {
        case SyntaxKind.QuestionQuestionEqualsToken:
          return `${l} = (${l} if (${l}) != null else ${r})`
        case SyntaxKind.BarBarEqualsToken:
          return `${l} = (${l} if (${l}) else ${r})`
        default:
          return `${l} = (${r} if (${l}) else ${l})`
      }
    }

    if (isStatementPosition(node)) {
      return combine({
        parent: node,
        nodes: [node.left, node.right],
        props,
        parsedStrings: (l, r) => lowered(l, r),
      })
    }

    const leftParsed = parseNode(node.left, props)
    const rightParsed = parseNode(node.right, props)
    const line = lowered(leftParsed.content, rightParsed.content)
    const result = combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => leftParsed.content,
    })

    result.extraLines = [
      ...(result.extraLines ?? []),
      {
        type: "before",
        lineType: ExtraLineType.NullableIntermediateExpression,
        line,
      },
    ]

    return result
  }

  const checker = props.program.getTypeChecker()

  const leftType = checker.getTypeAtLocation(node.left)
  const rightType = checker.getTypeAtLocation(node.right)
  const leftTypeString = checker.typeToString(leftType)
  const rightTypeString = checker.typeToString(rightType)

  // JS bitwise operators run ToInt32 on their operands, so bool and float
  // operands are fair game there. GDScript requires ints, and this
  // conversion is the semantically exact equivalent, so non-int operands
  // go through int().
  const needsIntCoercion = (operand: ts.Expression, type: ts.Type): boolean => {
    const godotType = getGodotType(operand, type, props, false)

    if (godotType !== "bool" && godotType !== "float") {
      return false
    }

    // Plain number maps onto float, but a variable whose declaration is
    // provably integral (int-typed or integer initializer) holds an int at
    // runtime, so coercing it would be pure noise.
    if (ts.isIdentifier(operand)) {
      const symbol = checker.getSymbolAtLocation(operand)
      const decl = symbol?.declarations?.[0]

      if (
        decl &&
        (ts.isVariableDeclaration(decl) ||
          ts.isPropertyDeclaration(decl) ||
          ts.isParameter(decl))
      ) {
        const declGodotType = getGodotType(
          decl,
          checker.getTypeAtLocation(decl.name),
          props,
          false,
          decl.initializer,
          decl.type
        )

        if (declGodotType === "int") {
          return false
        }
      }
    }

    return true
  }

  const operatorKind = node.operatorToken.kind

  // Plain and compound assignments in value position split the same way:
  // hoist the assignment, yield the lvalue.
  if (assignmentTokens.has(operatorKind) && !isStatementPosition(node)) {
    const leftParsed = parseNode(node.left, props)
    const rightParsed = parseNode(node.right, props)
    const operatorText = node.operatorToken.getText()
    const assignmentLine =
      operatorText === ">>>="
        ? `${leftParsed.content} = __ts_shr_unsigned(${leftParsed.content}, ${rightParsed.content})`
        : `${leftParsed.content}${
            needsLeftHandSpace ? " " : ""
          }${operatorText} ${rightParsed.content}`
    const assignment = combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => leftParsed.content,
    })

    if (operatorText === ">>>=") {
      assignment.hoistedLibraryFunctions =
        assignment.hoistedLibraryFunctions ?? new Set()
      assignment.hoistedLibraryFunctions.add("ts_shr_unsigned")
    }

    assignment.extraLines = [
      ...(assignment.extraLines ?? []),
      {
        type: "before",
        lineType: ExtraLineType.NullableIntermediateExpression,
        line: assignmentLine,
      },
    ]

    assignment.content = leftParsed.content
    return assignment
  }
  const isBitwiseOp = [
    SyntaxKind.AmpersandToken,
    SyntaxKind.BarToken,
    SyntaxKind.CaretToken,
    SyntaxKind.LessThanLessThanToken,
    SyntaxKind.GreaterThanGreaterThanToken,
    SyntaxKind.AmpersandEqualsToken,
    SyntaxKind.BarEqualsToken,
    SyntaxKind.CaretEqualsToken,
    SyntaxKind.LessThanLessThanEqualsToken,
    SyntaxKind.GreaterThanGreaterThanEqualsToken,
  ].includes(operatorKind)

  const leftCoerce = isBitwiseOp ? needsIntCoercion(node.left, leftType) : false
  const rightCoerce = isBitwiseOp
    ? needsIntCoercion(node.right, rightType)
    : false
  const isCompoundBitwise = [
    SyntaxKind.AmpersandEqualsToken,
    SyntaxKind.BarEqualsToken,
    SyntaxKind.CaretEqualsToken,
    SyntaxKind.LessThanLessThanEqualsToken,
    SyntaxKind.GreaterThanGreaterThanEqualsToken,
  ].includes(operatorKind)

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

      if (isBitwiseOp) {
        if (isCompoundBitwise) {
          const r = rightCoerce ? `int(${right})` : right

          // A compound bitwise assignment cannot coerce its target in
          // place, so a float/bool target rewrites as a plain assignment.
          // Right-side-only coercion keeps the compound form.
          if (leftCoerce) {
            return `${left} = int(${left}) ${operatorToken.slice(0, -1)} ${r}`
          }

          if (rightCoerce) {
            return `${left} ${operatorToken} ${r}`
          }
        } else if (leftCoerce || rightCoerce) {
          const l = leftCoerce ? `int(${left})` : left
          const r = rightCoerce ? `int(${right})` : right

          return `${l} ${operatorToken} ${r}`
        }
      }

      return `${left}${needsLeftHandSpace ? " " : ""}${operatorToken} ${right}`
    },
  })
}

// Tests

export const testAdd: Test = {
  ts: "1 + 2",
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or




static func _static_init():
  1 + 2
`,
}

export const testMultiply: Test = {
  ts: "1 * 2",
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or




static func _static_init():
  1 * 2
`,
}

export const testAssignmentToDict: Test = {
  ts: `const foo = {};
foo.bar = 1`,

  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var foo = {}

static func _static_init():
  foo.bar = 1
`,
}

export const testNestedAssignmentToDict: Test = {
  ts: `const foo = { bar: {} };
foo.bar.baz = 1`,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var foo = { "bar": {} }

static func _static_init():
  foo.bar.baz = 1
`,
}

export const testDoubleEqual: Test = {
  ts: "(1 as int) == (2 as int)",
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or




static func _static_init():
  1 == 2
`,
}

export const testDoubleEqualDifferentTypes: Test = {
  ts: `
let a: { a: number; } | string
let b: string

a == b
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var a


static var b

static func _static_init():
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
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var a


static var b

static func _static_init():
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
static var _a = int((x >> 2)) | int((y << 3))
static var _b = __ts_shr_unsigned(8, 1)
static var flags: int = 0

static func _static_init():
  flags &= int(~mask)
  `,
}

export const testUnsignedShiftAssign: Test = {
  ts: `
let x = 8
x >>>= 1
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_shr_unsigned.definition("__ts_shr_unsigned")}
static var x: int = 8

static func _static_init():
  x = __ts_shr_unsigned(x, 1)
  `,
}

export const testNullishAssign: Test = {
  ts: `let x: string | null = null\nx ??= "a"`,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var x = null

static func _static_init():
  x = (x if (x) != null else "a")
`,
}

export const testOrAssign: Test = {
  ts: `let x = 0\nx ||= 5`,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var x: int = 0

static func _static_init():
  x = (x if (x) else 5)
`,
}

export const testAndAssign: Test = {
  ts: `let x = 1\nx &&= 5`,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var x: int = 1

static func _static_init():
  x = (5 if (x) else x)
`,
}

export const testBitwiseFloatCoercion: Test = {
  ts: "let hp = 3.5\nconst m = hp & 0xff\nprint(m)",
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var hp: float = 3.5


static var m = int(hp) & 0xff

static func _static_init():
  print(m)
`,
}

export const testBitwiseBoolCoercion: Test = {
  ts: "const a = 2\nconst f = (a > 1) & (a < 5)\nprint(f)",
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var a: int = 2


static var f = int((a > 1)) & int((a < 5))

static func _static_init():
  print(f)
`,
}

export const testBitwiseCompoundFloatCoercion: Test = {
  ts: "let hp = 3.5\nlet mask = 1\nhp &= mask\nprint(hp)",
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var hp: float = 3.5


static var mask: int = 1

static func _static_init():
  hp = int(hp) & mask

  print(hp)
`,
}

export const testAssignmentExpressionInReturn: Test = {
  ts: `
let current: number | undefined;
declare let defaults: number;
function f(): number {
  return current ??= defaults
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var current
static func f():
  current = (current if (current) != null else defaults)
  return current
`,
}

export const testAssignmentExpressionInCondition: Test = {
  ts: `
let x: number;
let y: number;
let z = 0;
if ((x = y)) {
  z = 1
}
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var x


static var y


static var z: int = 0

static func _static_init():
  x = y
  if (x):
    z = 1
`,
}
