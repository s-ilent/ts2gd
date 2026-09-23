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
  const unused = usages?.uses.length === 0 ? "_" : ""
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
  // static functions that module-level functions compile to.
  const isModuleLevel =
    node.parent?.parent?.parent?.kind === SyntaxKind.SourceFile

  if (node.name.kind === SyntaxKind.Identifier) {
    props.scope.addName(node.name)

    return combine({
      parent: node,
      nodes: [node.name, node.initializer],
      props,
      parsedStrings: (nodeName, init) =>
        `${
          isModuleLevel ? "static " : ""
        }var ${unused}${nodeName}${typeString}${init ? " = " + init : ""}`,
    })
  } else {
    let destructuredNames = getDestructuredNamesAndAccessStrings(node.name)

    for (const { id } of destructuredNames) {
      props.scope.addName(id)
    }

    const genName = props.scope.createUniqueName()

    return combine({
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
  }
}

export const testDestructure: Test = {
  ts: `
let [a, [b, c]] = [1, [2, 3]]
  `,
  expected: `
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
static var __gen: int = 1
static var __gen1 = { "a": 1, "b": 2 }
static var a = __gen1.a
static var b = __gen1.b
print(__gen)
  `,
}

export const testDestructureRename: Test = {
  ts: `
let { a: a1, b: b1 } = { a: 1, b: 2 }
  `,
  expected: `
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
static var preload_: int = 123
print(preload_)
  `,
}

export const testIntFloat1: Test = {
  ts: `
let int = 1
  `,
  expected: `
static var _int: int = 1
  `,
}

export const testIntFloat2: Test = {
  ts: `
let float = 1.0
  `,
  expected: `
static var _float: float = 1.0
  `,
}

export const testIntFloat3: Test = {
  ts: `
let float: int = 1.0
  `,
  expected: `
static var _float: int = 1.0
  `,
}

export const testIntFloat4: Test = {
  ts: `
let float: float = 0
  `,
  expected: `
static var _float: float = 0
  `,
}
