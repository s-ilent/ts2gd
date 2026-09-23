import ts, { SymbolFlags, SyntaxKind } from "typescript"

import {
  ExtraLine,
  ExtraLineType,
  ParseNodeType,
  ParseState,
  combine,
  parseNode,
} from "../parse_node"
import { Test } from "../tests/test"
import {
  findContainingClassDeclaration,
  isArrayType,
  isDictionary,
  isEnumType,
  isNullableNode,
} from "../ts_utils"

import { LibraryFunctionName, LibraryFunctions } from "./library_functions"

const isRhs = (node: ts.PropertyAccessExpression) => {
  let parentExpression: ts.Node = node

  while (
    parentExpression.parent &&
    (parentExpression.parent.kind !== SyntaxKind.BinaryExpression ||
      (parentExpression.parent.kind === SyntaxKind.BinaryExpression &&
        (parentExpression.parent as ts.BinaryExpression).operatorToken.kind !==
          SyntaxKind.EqualsToken))
  ) {
    parentExpression = parentExpression.parent
  }
  let binaryExpression = parentExpression.parent as ts.BinaryExpression

  if (!parentExpression.parent) {
    return true
  }

  if (parentExpression.parent && binaryExpression.right === parentExpression) {
    return true
  } else {
    return false
  }
}

export const parsePropertyAccessExpression = (
  node: ts.PropertyAccessExpression,
  props: ParseState
): ParseNodeType => {
  const exprType = props.program
    .getTypeChecker()
    .getTypeAtLocation(node.expression)

  // Compile things like KeyList.KEY_SPACE into KEY_SPACE
  if (isEnumType(exprType)) {
    const symbol = exprType.getSymbol()!
    const declarations = symbol.declarations

    let isGlobal = false
    if (declarations) {
      const sourceFiles = declarations.map((d) => d.getSourceFile().fileName)
      isGlobal = !!sourceFiles.find((f) => f.includes("@globals.d.ts"))
    }

    if (isGlobal) {
      return parseNode(node.name, props)
    }
  }

  let nullCoalesce: ExtraLine[] = []
  const tc = props.program.getTypeChecker()

  // Math.* maps onto GDScript global functions and constants.
  if (ts.isIdentifier(node.expression) && node.expression.text === "Math") {
    const mathGlobals: Record<string, string> = {
      abs: "abs",
      ceil: "ceil",
      ceili: "ceili",
      exp: "exp",
      floor: "floor",
      floori: "floori",
      log: "log",
      max: "max",
      min: "min",
      pow: "pow",
      random: "randf",
      round: "round",
      roundi: "roundi",
      sign: "sign",
      sqrt: "sqrt",
      sin: "sin",
      cos: "cos",
      tan: "tan",
      asin: "asin",
      acos: "acos",
      atan: "atan",
      atan2: "atan2",
      E: "E",
      INF: "INF",
      NaN: "NAN",
      PI: "PI",
      TAU: "TAU",
    }

    const name = node.name.text

    if (name in mathGlobals) {
      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => mathGlobals[name],
      })
    }

    // Members without direct GDScript builtins compile to hoisted helpers.
    const mathHoisted: Record<string, LibraryFunctionName> = {
      trunc: "ts_trunc",
      hypot: "ts_hypot",
      fround: "ts_fround",
      imul: "ts_imul",
    }

    if (name in mathHoisted) {
      const result = combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => `__${mathHoisted[name]}`,
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add(mathHoisted[name])

      return result
    }
  }

  // Number.* statics map onto GDScript helpers.
  if (ts.isIdentifier(node.expression) && node.expression.text === "Number") {
    const name = node.name.text

    if (name === "isFinite") {
      // GDScript ships a global is_finite.
      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => "is_finite",
      })
    }

    if (name === "isInteger") {
      const result = combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => "__ts_is_integer",
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add("ts_is_integer")

      return result
    }
  }

  let result = combine({
    parent: node,
    nodes: [node.expression, node.name],
    props,
    parsedStrings: (lhs, rhs) => {
      if (node.questionDotToken) {
        const type = tc.getTypeAtLocation(node).getNonNullableType()
        const areWeAFunction =
          type.symbol?.flags & SymbolFlags.Method ||
          type.symbol?.flags & SymbolFlags.Function

        let exprName: string

        if (areWeAFunction) {
          let lhsName: string
          const lhsType = tc.typeToString(
            tc.getTypeAtLocation(node.expression).getNonNullableType()
          )

          lhsName = props.scope.createUniqueName()
          exprName = props.scope.createUniqueName()

          if (
            (lhsType === "Vector2Constructor" ||
              lhsType === "Vector2iConstructor" ||
              lhsType === "Vector3Constructor" ||
              lhsType === "Vector3iConstructor") &&
            (rhs === "add" || rhs === "sub" || rhs === "mul" || rhs === "div")
          ) {
            nullCoalesce = [
              {
                type: "before",
                line: `var ${lhsName} = ${lhs}`,
                lineType: ExtraLineType.NullableIntermediateExpression,
              },
              {
                type: "before",
                line: `var ${exprName} = [Callable(self, "${rhs}_vec_lib") if ${lhsName} != null else null, {}, ${lhsName}]`,
                lineType: ExtraLineType.NullableIntermediateExpression,
              },
            ]

            return exprName
          }

          nullCoalesce = [
            {
              type: "before",
              line: `var ${lhsName} = ${lhs}`,
              lineType: ExtraLineType.NullableIntermediateExpression,
            },
            {
              type: "before",
              line: `var ${exprName} = [Callable(${lhsName}, "${rhs}") if ${lhsName} != null else null, {}, null]`,
              lineType: ExtraLineType.NullableIntermediateExpression,
            },
          ]

          return exprName
        } else {
          exprName = props.scope.createUniqueName()

          nullCoalesce = [
            {
              type: "before",
              line: `var ${exprName} = ${lhs}`,
              lineType: ExtraLineType.NullableIntermediateExpression,
            },
          ]
        }

        return `(${exprName}.${rhs} if ${exprName} != null else null)`
      }

      // Godot does not like var foo = bar.baz when baz is not a key of bar
      // However, Godot is fine with bar.baz = foo even if baz is not a key.

      if (
        isDictionary(exprType) &&
        isNullableNode(node.name, props.program.getTypeChecker()) &&
        isRhs(node)
      ) {
        return `(${lhs}.${rhs} if ${lhs}.has("${rhs}") else null)`
      }

      const containingClassDecl = findContainingClassDeclaration(node)

      if (
        containingClassDecl &&
        exprType.symbol?.declarations &&
        exprType.symbol.declarations[0] === containingClassDecl &&
        node.expression.getText() === containingClassDecl.name?.getText()
      ) {
        return `self.${rhs}`
      }

      // JS collections are backed by generated shim classes whose get/set
      // members are named ts_get/ts_set, because bare get/set would clash
      // with Object's own methods in Godot.
      const baseTypeString = tc.typeToString(exprType)

      if (
        /(?:Readonly)?(?:Weak)?(?:Set|Map)\b/.test(baseTypeString) &&
        (rhs === "set" || rhs === "get")
      ) {
        return `${lhs}.ts_${rhs}`
      }

      // TS .length maps to different GDScript members per type:
      // arrays expose .size(), strings expose .length() as a method.
      if (rhs === "length" && isRhs(node)) {
        if (isArrayType(exprType)) {
          return `${lhs}.size()`
        }

        if (exprType.flags & ts.TypeFlags.String) {
          return `${lhs}.length()`
        }
      }

      return `${lhs}.${rhs}`
    },
  })

  result.extraLines = [...(result.extraLines ?? []), ...nullCoalesce]

  return result
}

export const testAccess: Test = {
  ts: `
let foo = { bar: 1 }
print(foo.bar)
  `,
  expected: `
class_name __Mod_Test_4064or
static var foo = { "bar": 1 }
print(foo.bar)
  `,
}

export const testAccessRewriting: Test = {
  ts: `
let foo = { bar: 1 }
if (foo.bar) {
  print (foo.bar)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var foo = { "bar": 1 }
if foo.bar:
  print(foo.bar)
  `,
}

export const testAccessRewriting2: Test = {
  ts: `
let foo: { bar?: int } = { bar: 1 as int }
if (foo.bar === 1 as int) {
  print (foo.bar)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var foo = { "bar": 1 }
if (foo.bar if foo.has("bar") else null) == 1:
  print(foo.bar)
  `,
}

export const testNullableAccess: Test = {
  ts: `
let foo: { bar: number | null } = { bar: 1 }
print(foo.bar)
  `,
  expected: `
class_name __Mod_Test_4064or
static var foo = { "bar": 1 }
print((foo.bar if foo.has("bar") else null))
  `,
}

export const testOptionalAccess: Test = {
  ts: `
let foo: { bar?: number } = { bar: 1 }
print(foo.bar)
  `,
  expected: `
class_name __Mod_Test_4064or
static var foo = { "bar": 1 }
print((foo.bar if foo.has("bar") else null))
  `,
}

export const testOptionalAssignment: Test = {
  ts: `
let foo: { bar?: number } = { bar: 1 }
foo.bar = 2
  `,
  expected: `
class_name __Mod_Test_4064or
static var foo = { "bar": 1 }
foo.bar = 2
  `,
}

export const testComplexLhs: Test = {
  ts: `
let foo: { bar?: number }[] = [{ bar: 1 }]
foo[0].bar = 2
  `,
  expected: `
class_name __Mod_Test_4064or
static var foo = [{ "bar": 1 }]
foo[0].bar = 2
  `,
}

export const testNoSelfForSignal: Test = {
  ts: `
export class Test {
  $mouseenter!: Signal<[]>;

  test() {
    this.$mouseenter.emit()
  }
}
  `,
  expected: `
class_name Test
signal mouseenter

func test():
  self.emit_signal("mouseenter")
`,
}

export const testAddSelfForParams: Test = {
  ts: `
export class Test {
  a: float
  b: string

  test(a: float, b: string) {
    this.a = a;
    this.b = b;
  }
}
  `,
  expected: `
class_name Test
var a: float
var b: String
func test(a: float, b: String):
  self.a = a
  self.b = b
`,
}

export const testNullCoalesce: Test = {
  ts: `
export class Test {
  test() {
    const foo: string | null = "hello"

    print(foo?.bar)
  }
}
  `,
  expected: `
class_name Test
func test():
  var foo = "hello"
  var __gen = foo
  print((__gen.bar if __gen != null else null))
  `,
}

export const testNullCoalesce2: Test = {
  ts: `
export class Test {
  test() {
    const foo: string | null = "hello"

    print((foo + "a")?.bar)
  }
}
  `,
  expected: `
class_name Test
func test():
  var foo = "hello"
  var __gen = (foo + "a")
  print((__gen.bar if __gen != null else null))
  `,
}

export const testNullCoalesce3: Test = {
  ts: `
export class Test {
  foo: string | null = "hello"

  test(): void {
    print(this.foo?.bar)
  }
}
  `,
  expected: `
class_name Test
var foo = "hello"
func test():
  var __gen = self.foo
  print((__gen.bar if __gen != null else null))
  `,
}

export const testNullCoalesce4: Test = {
  ts: `
export class Test {
  test(): void {
    let foo: Test | null = null as (Test | null)
    print(foo?.test())
  }
}
  `,
  expected: `
class_name Test
func test():
  var foo = null
  var __gen = foo
  var __gen1 = [Callable(__gen, "test") if __gen != null else null, {}, null]
  var __gen2 = __gen1[0].call() if __gen1 != null else null
  print(__gen2)
  `,
}

export const testNullCoalesce5: Test = {
  ts: `
export class Test {
  test(x: int): void {
    let foo: Test | null = null as (Test | null)
    print(foo?.test(1))
  }
}
  `,
  expected: `
class_name Test
func test(_x: int):
  var foo = null
  var __gen = foo
  var __gen1 = [Callable(__gen, "test") if __gen != null else null, {}, null]
  var __gen2 = __gen1[0].call(1) if __gen1 != null else null
  print(__gen2)
  `,
}

export const testPropertyConvertToFuncRef: Test = {
  ts: `
class Test extends Area2D {
  foo(arg: () => void) {

  }

  bar() {
    this.foo(this.foo)
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func foo(arg):
  pass

func bar():
  this.foo(Callable(self, "foo"))
  `,

  expectFail: true,
}

// This ensures that we do funcref of .mul() correctly.
export const testComplicatedLibFunc: Test = {
  ts: `
class Test extends Area2D {
  test() {
    const maybeVec = randi() ? Vector2(0, 0) : null
    const foo = maybeVec?.mul(4)
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func test():
  var maybeVec = Vector2(0, 0) if randi() else null
  var __gen = maybeVec
  var __gen1 = [Callable(self, "mul_vec_lib") if __gen != null else null, {}, __gen]
  var __gen2 = __gen1[0].call(__gen1[2], 4) if __gen1 != null else null
  var _foo = __gen2
`,
}

export const testStaticClassMethodInvoke: Test = {
  ts: `
class Test extends Area2D {
  constructor() {
    super()
    Test.test()
  }

  static test() {
    print("static")
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func _init():
  self.test()
static func test():
  print("static")

`,
}

export const testArrayLengthMapsToSize: Test = {
  ts: `
export class Foo {
  items: Array<int> = [1, 2, 3]

  count(): int {
    return this.items.length
  }
}`,
  expected: `
class_name Foo
var items = [1, 2, 3]
func count():
  return self.items.size()
`,
}

export const testStringLengthMapsToLengthCall: Test = {
  ts: `
export class Foo {
  name: string = "hi"

  size(): int {
    return this.name.length
  }
}`,
  expected: `
class_name Foo
var name: String = "hi"
func size():
  return self.name.length()
`,
}

export const testMathFunctionsAndConstants: Test = {
  ts: `
export class Foo {
  compute(x: float) {
    return Math.floor(x) + Math.abs(x) + Math.PI
  }

  roll() {
    return Math.random() * 10.0
  }
}`,
  expected: `
class_name Foo
func compute(x: float):
  return floor(x) + abs(x) + PI
func roll():
  return randf() * 10.0
`,
}

export const testMathMinMax: Test = {
  ts: `
export class Foo {
  clamp01(x: float) {
    return Math.max(0.0, Math.min(1.0, x))
  }
}`,
  expected: `
class_name Foo
func clamp01(x: float):
  return max(0.0, min(1.0, x))
`,
}

export const testMathExtraFunctions: Test = {
  ts: `
export class Foo {
  go(x: float, y: float) {
    return Math.trunc(x) + Math.hypot(x, y) + Math.fround(x) + Math.imul(x, y) + Math.atan2(y, x)
  }
}
  `,
  expected: `
class_name Foo
${LibraryFunctions.ts_trunc.definition("__ts_trunc")}
${LibraryFunctions.ts_hypot.definition("__ts_hypot")}
${LibraryFunctions.ts_fround.definition("__ts_fround")}
${LibraryFunctions.ts_imul.definition("__ts_imul")}
func go(x, y):
  return (__ts_trunc(x) + __ts_hypot(x, y)) + (__ts_fround(x) + __ts_imul(x, y) + atan2(y, x))
  `,
}

export const testNumberStaticAndConvert: Test = {
  ts: `
let ok = Number.isInteger(5)
let n = Number("12.5")
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_is_integer.definition("__ts_is_integer")}
${LibraryFunctions.ts_number.definition("__ts_number")}
static var _ok = __ts_is_integer(5)
static var _n = __ts_number("12.5")
  `,
}
