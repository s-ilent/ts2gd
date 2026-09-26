import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { getPreciseInitializerType as getFloatOrInt } from "../ts_utils"

export const getDestructuredNamesAndAccessStrings = (
  node: ts.BindingName,
  access = ""
): { id: ts.Identifier; access: string }[] => {
  if (node.kind === SyntaxKind.Identifier) {
    const id = node as ts.Identifier

    return [{ id, access: access }]
  } else if (node.kind === SyntaxKind.ObjectBindingPattern) {
    const obj = node as ts.ObjectBindingPattern

    return obj.elements
      .map((elem) =>
        getDestructuredNamesAndAccessStrings(
          elem.name,
          access + "." + (elem.propertyName?.getText() ?? elem.name.getText())
        )
      )
      .flat()
  } else if (node.kind === SyntaxKind.ArrayBindingPattern) {
    const obj = node as ts.ArrayBindingPattern

    return obj.elements
      .map((elem, i) => {
        if (elem.kind === SyntaxKind.BindingElement) {
          const bindingElement = elem as ts.BindingElement

          const elemAccess = bindingElement.dotDotDotToken
            ? accessSlice(i, access)
            : access + `[${i}]`

          return getDestructuredNamesAndAccessStrings(
            bindingElement.name,
            elemAccess
          )
        } else {
          // Omitted hole - nothing to bind.
          return []
        }
      })
      .flat()
  }

  throw new Error(
    "Completely and totally impossible. You will never see this. I promise."
  )
}

/**
 * The suffix for a rest element at index i, e.g. `.slice(2)` for a top-level
 * pattern, or `.slice(2)` appended to an existing access chain.
 */
const accessSlice = (index: number, access = ""): string => {
  // access ends with "]" or an identifier chain; slicing applies to the
  // array reached so far.
  return `${access}.slice(${index})`
}

export const parseVariableDeclaration = (
  node: ts.VariableDeclaration,
  props: ParseState
): ParseNodeType => {
  let declaredType = node.type?.getText()

  if (declaredType !== "int" && declaredType !== "float") {
    declaredType = undefined
  }

  let inferredType = getFloatOrInt(
    node.initializer,
    node.initializer ? node.initializer.getText() : ""
  )

  const type = declaredType ?? inferredType
  const usages = props.usages.get(node.name as ts.Identifier)

  // The unused-prefix mangle silences GDScript's unused-variable warning,
  // but the usage map is file-local: an exported declaration whose ONLY
  // consumers live in other modules reports zero uses here and would be
  // renamed out from under its importers (`__ts_import_Mod.X` reads the
  // original name). Exported declarations keep their declared name.
  const isExported =
    node.parent?.parent != null &&
    ts.isVariableStatement(node.parent.parent) &&
    node.parent.parent.modifiers?.some(
      (m) => m.kind === SyntaxKind.ExportKeyword
    ) === true
  const unused = !isExported && usages?.uses.length === 0 ? "_" : ""
  const typeString = type ? `: ${type}` : ""

  if (node.name.kind === SyntaxKind.Identifier) {
    const decl = props.program
      .getTypeChecker()
      .getTypeAtLocation(node)
      .getSymbol()?.declarations?.[0]

    const isAutoload =
      props.isAutoload &&
      decl?.kind === SyntaxKind.ClassDeclaration &&
      decl.getSourceFile() === node.getSourceFile() &&
      node.parent.parent.parent.kind === SyntaxKind.SourceFile

    if (isAutoload) {
      return combine({
        parent: node,
        nodes: [node.name, node.initializer],
        props,
        parsedStrings: (nodeName, init) => ``,
      })
    }
  }

  // Module-level variables are shared across every instance of the
  // generated script's implicit class, and must stay reachable from the
  // static functions that module-level functions compile to. The immediate
  // grandparent must be a VariableStatement: a for-loop initializer's
  // declaration list also sits three levels under the SourceFile (its
  // grandparent is the ForStatement), and those are block-scoped locals of
  // whatever function contains the loop.
  const isModuleLevel =
    node.parent?.parent?.kind === SyntaxKind.VariableStatement &&
    node.parent?.parent?.parent?.kind === SyntaxKind.SourceFile

  // Static variable initializers run in a static context: `self` is not
  // available and callables must target the class.
  const previousStaticContext = props.inStaticContext

  if (isModuleLevel) {
    props.inStaticContext = true
  }

  if (node.name.kind === SyntaxKind.Identifier) {
    props.scope.addName(node.name)

    // Detect references to the variable being declared inside its own
    // initializer. JS allows them inside closures (the closure reads the
    // final value when it runs); the eagerly-evaluated GDScript initializer
    // would reference the variable before it exists. The references are
    // nulled out at emission, the declaration splits into an assignment, and
    // a late-binding pass points the captured slots at the final value.
    const declSymbol = props.program
      .getTypeChecker()
      .getSymbolAtLocation(node.name)
    let selfCapturing = false

    if (node.initializer && declSymbol) {
      const checker = props.program.getTypeChecker()

      const findSelfReference = (n: ts.Node): void => {
        if (
          n !== node.name &&
          ts.isIdentifier(n) &&
          checker.getSymbolAtLocation(n) === declSymbol
        ) {
          selfCapturing = true
        }

        n.forEachChild(findSelfReference)
      }

      node.initializer.forEachChild(findSelfReference)
    }

    const parsed = combine({
      parent: node,
      nodes: [node.name, node.initializer],
      props,
      parsedStrings: (nodeName, init) => {
        if (!selfCapturing || !init) {
          return `${
            isModuleLevel ? "static " : ""
          }var ${unused}${nodeName}${typeString}${init ? " = " + init : ""}`
        }

        // Null out references to the variable inside its own initializer.
        // They only appear as captured values inside function-value tuples,
        // so a quote-bounded token replacement is precise; dictionary keys
        // carrying the same text are inside string literals and stay intact.
        const nulled = init.replace(
          new RegExp(`(?<!["\\w])${nodeName}(?![\\w"])`, "g"),
          "null"
        )
        const sourceName =
          node.name.kind === SyntaxKind.Identifier ? node.name.text : ""

        if (isModuleLevel) {
          return `static var ${unused}${nodeName}${typeString} = ${nulled}`
        }

        return `var ${nodeName}${typeString} = null\n${nodeName} = ${nulled}\n__ts_patch_captures(${nodeName}, "${sourceName}", ${nodeName})`
      },
    })

    if (selfCapturing && !isModuleLevel) {
      parsed.hoistedLibraryFunctions =
        parsed.hoistedLibraryFunctions ?? new Set()
      parsed.hoistedLibraryFunctions.add("ts_patch_captures")
    }

    props.inStaticContext = previousStaticContext

    return parsed
  } else {
    let destructuredNames = getDestructuredNamesAndAccessStrings(node.name)

    // A binding pattern with no elements (`const [] = ...`) binds nothing,
    // so there is nothing to emit. Emitting the hidden temporary would
    // produce an initializer with no value (`var __gen =`), which does not
    // parse. This shape also appears from parser error recovery.
    if (destructuredNames.length === 0) {
      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => "",
      })
    }

    for (const { id } of destructuredNames) {
      props.scope.addName(id)
    }

    const genName = props.scope.createUniqueName()

    const parsed = combine({
      parent: node,
      nodes: [node.initializer, ...destructuredNames.map((d) => d.id)],
      props,
      parsedStrings: (initializer, ...nodes) => {
        return `
${isModuleLevel ? "static " : ""}var ${genName} = ${initializer}
${nodes
  .map(
    (node, i) =>
      `${isModuleLevel ? "static " : ""}var ${node} = ${genName}${
        destructuredNames[i].access
      }`
  )
  .join("\n")}
`
      },
    })

    props.inStaticContext = previousStaticContext

    return parsed
  }
}

export const testDestructure: Test = {
  ts: `
let [a, [b, c]] = [1, [2, 3]]
  `,
  expected: `
class_name __Mod_Test_4064or
static var __gen = [1, [2, 3]]
static var a = __gen[0]
static var b = __gen[1][0]
static var c = __gen[1][1]
  `,
}

export const testDestructure2: Test = {
  ts: `
let [a] = [1]
let [b] = [1]
  `,
  expected: `
class_name __Mod_Test_4064or
static var __gen = [1]
static var a = __gen[0]
static var __gen1 = [1]
static var b = __gen1[0]
  `,
}

export const testDestructure3: Test = {
  ts: `
let { a, b } = { a: 1, b: 2 }
  `,
  expected: `
class_name __Mod_Test_4064or
static var __gen = { "a": 1, "b": 2 }
static var a = __gen.a
static var b = __gen.b
  `,
}

export const testDestructure4: Test = {
  ts: `
let __gen = 1
let { a, b } = { a: 1, b: 2 }

print(__gen)
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var __gen: int = 1


static var __gen1 = { "a": 1, "b": 2 }
static var a = __gen1.a
static var b = __gen1.b

static func _static_init():
  print(__gen)
`,
}

export const testDestructureRename: Test = {
  ts: `
let { a: a1, b: b1 } = { a: 1, b: 2 }
  `,
  expected: `
class_name __Mod_Test_4064or
static var __gen = { "a": 1, "b": 2 }
static var a1 = __gen.a
static var b1 = __gen.b
  `,
}

export const testNormalVariableDeclaration: Test = {
  ts: `
let x = 1  
let y = 'a'
  `,
  expected: `
class_name __Mod_Test_4064or
static var _x: int = 1  
static var _y = "a"
  `,
}

export const testAutoloadVariableDeclaration: Test = {
  isAutoload: true,
  ts: `
export class Blah {

}

const x: Blah = new Blah();
  `,
  expected: `
  `,
}

export const testClassNameWithoutAutoload: Test = {
  ts: `
export class Blah {

}

const x: Blah = new Blah();
  `,
  expected: `
class_name Blah

static var _x = Blah.new()
  `,
}

export const testAutoloadVariableDeclaration2: Test = {
  isAutoload: true,
  ts: `
export class Blah {

}

const x: Blah = new Blah();
  `,
  expected: `
  `,
}

export const testAutoloadVariableDeclaration3: Test = {
  isAutoload: true,

  ts: `
export class Blah {
  test() {
    const blah: Blah = new Blah();
  }
}

const x: Blah = new Blah();
  `,
  expected: `
func test():
  var _blah = Blah.new()
  `,
}

export const testKeyword: Test = {
  ts: `
let preload = 123
print(preload)
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var preload_: int = 123

static func _static_init():
  print(preload_)
`,
}

export const testIntFloat1: Test = {
  ts: `
let int = 1
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var _int_: int = 1

`,
}

export const testIntFloat2: Test = {
  ts: `
let float = 1.0
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var _float_: float = 1.0

`,
}

export const testIntFloat3: Test = {
  ts: `
let float: int = 1.0
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var _float_: int = 1.0

`,
}

export const testIntFloat4: Test = {
  ts: `
let float: float = 0
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var _float_: float = 0

`,
}

export const testModuleLevelCallableTargetsClass: Test = {
  files: { "scope.ts": "export function scopedState(fn: any) { return fn }" },
  ts: `
import { scopedState } from "./scope"

const [flag] = [true]
const view = scopedState(() => flag)
  `,
  expected: `
class_name __Mod_Test_4064or
static func __gen1(captures):
  var flag = captures.flag
  return flag
static var __ts_import_Scope = load("res://scope.gd")
static var __gen = [true]
static var flag = __gen[0]
static var _view = __ts_import_Scope.scopedState([Callable(__Mod_Test_4064or, "__gen1"), {"flag": flag}])
  `,
}

export const testExponentiation: Test = {
  ts: `
let p = 2 ** 10
  `,
  expected: `
class_name __Mod_Test_4064or
static var _p = 2 ** 10
  `,
}

export const testEmptyBindingPatternEmitsNothing: Test = {
  ts: `
type Id = string
export const items = ['a'] as const satisfies readonly Id[];
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or



static var _items = ["a"]

`,
}

export const testNativeClassMemberNameIsMangled: Test = {
  ts: `
const IP = { cool: 55, chargePower: 420 };
export function range(unit: number): number {
  return IP.chargeUnits * unit
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var IP_ = { "cool": 55, "chargePower": 420 }
static func range_(unit: float):
  return IP_.chargeUnits * unit
  `,
}

export const testSelfCapturingInitializerSplitsAndPatches: Test = {
  ts: `
export class Test {
  direct() {
    const tick = () => {
      tick()
    }
    return tick
  }
}
  `,
  expected: `
class_name Test

static func __ts_patch_captures(root, name, value):
  __ts_patch_captures_walk(root, name, value, [])


static func __ts_patch_captures_walk(node, name, value, seen):
  if node == null:
    return
  if not (node is Array or node is Dictionary):
    return
  for prior in seen:
    if is_same(prior, node):
      return
  seen.append(node)
  if node is Array and node.size() == 2 and node[0] is Callable and node[1] is Dictionary:
    var caps: Dictionary = node[1]
    if caps.has(name) and caps[name] == null:
      caps[name] = value
    __ts_patch_captures_walk(caps, name, value, seen)
  elif node is Dictionary:
    for k in node:
      __ts_patch_captures_walk(node[k], name, value, seen)
  else:
    for entry in node:
      __ts_patch_captures_walk(entry, name, value, seen)

static func __gen(captures):
  var tick = captures.tick
  tick[0].call(tick[1])

func direct():
  var tick = null
  tick = [Callable(self, "__gen"), {"tick": null}]
  __ts_patch_captures(tick, "tick", tick)
  return tick
  `,
}
