import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

import { LibraryFunctionName, LibraryFunctions } from "./library_functions"

const collectionShims: Record<string, LibraryFunctionName> = {
  Set: "ts_new_set",
  Map: "ts_new_map",
  WeakSet: "ts_new_weak_set",
  WeakMap: "ts_new_weak_map",
}

export const parseNewExpression = (
  node: ts.NewExpression,
  props: ParseState
): ParseNodeType => {
  // JS collections are constructed through generated shim classes.
  if (
    node.expression.kind === SyntaxKind.Identifier &&
    (node.expression as ts.Identifier).text in collectionShims
  ) {
    const callee = (node.expression as ts.Identifier).text
    const libName = collectionShims[callee]

    const result = combine({
      parent: node,
      nodes: [...(node.arguments ?? [])],
      props,
      parsedStrings: (...args) => `__${libName}(${args.join(", ")})`,
    })

    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add(libName)

    return result
  }

  return combine({
    parent: node,
    nodes: [node.expression, ...(node.arguments ?? [])],
    props,
    parsedStrings: (expr, ...args) => {
      if (
        expr === "Vector2" ||
        expr === "Vector3" ||
        expr === "Color" ||
        expr === "Vector2i" ||
        expr === "Vector3i" ||
        expr === "Rect2"
      ) {
        // Special cases that do not require .new
        return `${expr}(${args.join(", ")})`
      }

      return `${expr}.new(${args.join(", ")})`
    },
  })
}

export const testNormalNew: Test = {
  ts: `
let foo = new Node2D()
  `,
  expected: `
class_name __Mod_Test_4064or
static var _foo = Node2D.new()
  `,
}

export const testVectorNoNew: Test = {
  ts: `
let foo = new Vector2()
  `,
  expected: `
class_name __Mod_Test_4064or
static var _foo = Vector2()
  `,
}

export const testColorNoNew: Test = {
  ts: `
let foo = new Color()
  `,
  expected: `
class_name __Mod_Test_4064or
static var _foo = Color()
  `,
}

export const testNewSet: Test = {
  ts: `
let s = new Set([1, 2, 3])
let m = new Map<number, int>()
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_new_set.definition("__ts_new_set")}
${LibraryFunctions.ts_new_map.definition("__ts_new_map")}
static var _s = __ts_new_set([1, 2, 3])
static var _m = __ts_new_map()
  `,
}
