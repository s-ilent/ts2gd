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
  resolvesToRegexMatch,
} from "../ts_utils"

import { LibraryFunctionName, LibraryFunctions } from "./library_functions"
import { globalShimClassLibs } from "./parse_identifier"

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

// Members without direct GDScript builtins compile to hoisted helpers.
const mathHoisted: Record<string, LibraryFunctionName> = {
  trunc: "ts_trunc",
  hypot: "ts_hypot",
  fround: "ts_fround",
  imul: "ts_imul",
}

// Resolves a Math member to its emitted GDScript form, so other parsers
// (e.g. unbound `.call` invocations like Math.ceil.call(x)) can reuse the
// same mapping.
export const gdMathMember = (
  name: string
): { gd: string; helper?: LibraryFunctionName } | undefined => {
  if (name in mathGlobals) {
    return { gd: mathGlobals[name] }
  }

  if (name in mathHoisted) {
    return { gd: `__${mathHoisted[name]}`, helper: mathHoisted[name] }
  }

  return undefined
}

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

  // import.meta.env resolves to the shared environment shim; the .env link
  // itself disappears so chained members read off the shim directly
  // (import.meta.env.DEV -> __ts_env().DEV).
  if (
    node.expression.kind === SyntaxKind.MetaProperty &&
    node.name.text === "env"
  ) {
    const result = combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "__ts_env()",
    })

    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add("ts_env")

    return result
  }

  // Math.* maps onto GDScript global functions and constants.
  if (ts.isIdentifier(node.expression) && node.expression.text === "Math") {
    const mapped = gdMathMember(node.name.text)

    if (mapped) {
      const result = combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => mapped.gd,
      })

      if (mapped.helper) {
        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add(mapped.helper)
      }

      return result
    }
  }

  // Static members of global shim classes (Date.now, WeakRef-style
  // statics) read off the loaded shim script resource. Instance members
  // on shim instances flow through untouched; the class-name base is the
  // only position remapped.
  if (
    ts.isIdentifier(node.expression) &&
    (node.expression as ts.Identifier).text in globalShimClassLibs
  ) {
    const shimClassName = (node.expression as ts.Identifier).text
    const result = combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => `__ts_${shimClassName}.${node.name.text}`,
    })

    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add(globalShimClassLibs[shimClassName])

    return result
  }

  // Promise statics compile to hoisted helpers. all() degrades to returning
  // its input array (await on a plain value resumes immediately), resolve()
  // returns its value, reject() logs and yields null.
  if (ts.isIdentifier(node.expression) && node.expression.text === "Promise") {
    const promiseStatics: Record<string, LibraryFunctionName> = {
      all: "ts_promise_all",
      resolve: "ts_promise_resolve",
      reject: "ts_promise_reject",
    }

    const name = node.name.text

    if (name in promiseStatics) {
      const result = combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => `__${promiseStatics[name]}`,
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add(promiseStatics[name])

      return result
    }
  }

  // Reflect.* members compile to hoisted helpers with dictionary-friendly
  // degradation (a member named get/set would collide with Object natives
  // on the environment shim).
  if (ts.isIdentifier(node.expression) && node.expression.text === "Reflect") {
    const reflectStatics: Record<string, LibraryFunctionName> = {
      get: "ts_reflect_get",
      set: "ts_reflect_set",
      has: "ts_reflect_has",
      ownKeys: "ts_reflect_own_keys",
    }

    const name = node.name.text

    if (name in reflectStatics) {
      const result = combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => `__${reflectStatics[name]}`,
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add(reflectStatics[name])

      return result
    }
  }

  // performance.now() maps onto the engine's millisecond clock.
  if (
    ts.isIdentifier(node.expression) &&
    node.expression.text === "performance" &&
    node.name.text === "now"
  ) {
    const result = combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "__ts_perf_now",
    })

    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add("ts_perf_now")

    return result
  }

  // JSON.parse is an instance method in the engine; the static equivalent
  // is parse_string.
  if (
    ts.isIdentifier(node.expression) &&
    node.expression.text === "JSON" &&
    node.name.text === "parse"
  ) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "JSON.parse_string",
    })
  }

  // Object statics compile to hoisted helpers over dictionaries; freeze is
  // a no-op that returns its argument.
  if (ts.isIdentifier(node.expression) && node.expression.text === "Object") {
    const objectStatics: Record<string, LibraryFunctionName> = {
      keys: "ts_object_keys",
      values: "ts_object_values",
      entries: "ts_object_entries",
      freeze: "ts_object_freeze",
      fromEntries: "ts_object_from_entries",
      assign: "ts_object_assign",
      hasOwn: "ts_object_has_own",
      create: "ts_object_create",
    }

    const name = node.name.text

    if (name in objectStatics) {
      const result = combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => `__${objectStatics[name]}`,
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add(objectStatics[name])

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

    if (name === "isSafeInteger") {
      const result = combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => "__ts_is_safe_integer",
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add("ts_is_safe_integer")

      return result
    }

    if (name === "parseInt") {
      const result = combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => "__ts_parse_int",
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add("ts_parse_int")

      return result
    }

    if (name === "MAX_SAFE_INTEGER") {
      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => "9007199254740991",
      })
    }

    if (name === "POSITIVE_INFINITY") {
      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => "INF",
      })
    }

    if (name === "NEGATIVE_INFINITY") {
      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => "-INF",
      })
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

        // A regexp group result (match[0]) is a string at runtime even
        // when the producing call is untyped (empty RegExp interface), so
        // its member lookups follow the string rules. Length on the match
        // object itself keeps the raw spelling (no corpus usage; its JS
        // semantics differ from any single Godot member).
        if (
          ts.isElementAccessExpression(node.expression) &&
          resolvesToRegexMatch(node.expression.expression, tc)
        ) {
          return `${lhs}.length()`
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
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var foo = { "bar": 1 }

static func _static_init():
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
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var foo = { "bar": 1 }

static func _static_init():
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
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var foo = { "bar": 1 }

static func _static_init():
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
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var foo = { "bar": 1 }

static func _static_init():
  print((foo.bar if foo.has("bar") else null))
`,
}

export const testOptionalAccess: Test = {
  ts: `
let foo: { bar?: number } = { bar: 1 }
print(foo.bar)
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var foo = { "bar": 1 }

static func _static_init():
  print((foo.bar if foo.has("bar") else null))
`,
}

export const testOptionalAssignment: Test = {
  ts: `
let foo: { bar?: number } = { bar: 1 }
foo.bar = 2
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var foo = { "bar": 1 }

static func _static_init():
  foo.bar = 2
`,
}

export const testComplexLhs: Test = {
  ts: `
let foo: { bar?: number }[] = [{ bar: 1 }]
foo[0].bar = 2
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var foo = [{ "bar": 1 }]

static func _static_init():
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
# This file has been autogenerated by ts2gd. DO NOT EDIT!


extends Area2D
class_name Test
    





func foo(_arg):
  pass
func bar():
  self.foo(self.foo)
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
func go(x: float, y: float):
  return __ts_trunc(x) + __ts_hypot(x, y) + __ts_fround(x) + __ts_imul(x, y) + atan2(y, x)
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

export const testPromiseStatics: Test = {
  ts: `
export function load(): int {
  return Promise.resolve(7)
}

export function joinAll(parts): int {
  return Promise.all(parts)
}
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_promise_resolve.definition("__ts_promise_resolve")}
${LibraryFunctions.ts_promise_all.definition("__ts_promise_all")}
static func load_():
  return __ts_promise_resolve(7)
static func joinAll(parts):
  return __ts_promise_all(parts)
  `,
}

export const testReflectStatics: Test = {
  ts: `
export function read(target): int {
  return Reflect.get(target, "x")
}
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_reflect_get.definition("__ts_reflect_get")}
static func read(target):
  return __ts_reflect_get(target, "x")
  `,
}

export const testPerformanceNow: Test = {
  ts: `
export class Foo {
  stamp(): float {
    return performance.now()
  }
}
  `,
  expected: `
class_name Foo
${LibraryFunctions.ts_perf_now.definition("__ts_perf_now")}
func stamp():
  return __ts_perf_now()
  `,
}

export const testJsonParse: Test = {
  ts: `
export function decode(text): int {
  return JSON.parse(text)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func decode(text):
  return JSON.parse_string(text)
  `,
}

export const testObjectStatics: Test = {
  ts: `
export function go(cfg): int {
  const copy = Object.assign({}, cfg)
  Object.freeze(copy)
  return Object.keys(copy).size() + Object.values(copy).size() +
    Object.entries(copy).size() + Object.hasOwn(copy, "a") +
    Object.keys(Object.fromEntries(Object.entries(copy))).size()
}
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_object_assign.definition("__ts_object_assign")}
${LibraryFunctions.ts_object_freeze.definition("__ts_object_freeze")}
${LibraryFunctions.ts_object_keys.definition("__ts_object_keys")}
${LibraryFunctions.ts_object_values.definition("__ts_object_values")}
${LibraryFunctions.ts_object_entries.definition("__ts_object_entries")}
${LibraryFunctions.ts_object_has_own.definition("__ts_object_has_own")}
${LibraryFunctions.ts_object_from_entries.definition(
  "__ts_object_from_entries"
)}
static func go(cfg):
  var copy = __ts_object_assign({}, cfg)
  __ts_object_freeze(copy)
  return __ts_object_keys(copy).size() + __ts_object_values(copy).size() + __ts_object_entries(copy).size() + __ts_object_has_own(copy, "a") + __ts_object_keys(__ts_object_from_entries(__ts_object_entries(copy))).size()
  `,
}

export const testImportMetaEnvResolvesToShim: Test = {
  ts: `
export class Test {
  static enabled = import.meta.env.DEV
}
  `,
  expected: `
class_name Test
${LibraryFunctions.ts_env.definition("__ts_env")}
var enabled = __ts_env().DEV
  `,
}
