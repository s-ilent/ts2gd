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

/**
 * JS typed arrays map onto Packed arrays. Unsigned element types degrade to
 * wider signed packed types (GDScript has no unsigned packed arrays).
 */
const typedArrayShims: Record<string, LibraryFunctionName> = {
  Float32Array: "ts_new_float32",
  Float64Array: "ts_new_float64",
  Int32Array: "ts_new_int32",
  Uint32Array: "ts_new_uint32",
  Int16Array: "ts_new_int16",
  Uint16Array: "ts_new_uint16",
  Int8Array: "ts_new_int8",
  Uint8Array: "ts_new_uint8",
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

  // Typed arrays construct Packed arrays through generated helpers.
  if (
    node.expression.kind === SyntaxKind.Identifier &&
    (node.expression as ts.Identifier).text in typedArrayShims
  ) {
    const callee = (node.expression as ts.Identifier).text
    const libName = typedArrayShims[callee]

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

export const testNewTypedArrays: Test = {
  ts: `
let f = new Float32Array(9)
let b = new Uint8Array(16)
let i = new Int32Array(4)
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_new_float32.definition("__ts_new_float32")}
${LibraryFunctions.ts_new_uint8.definition("__ts_new_uint8")}
${LibraryFunctions.ts_new_int32.definition("__ts_new_int32")}
static var _f = __ts_new_float32(9)
static var _b = __ts_new_uint8(16)
static var _i = __ts_new_int32(4)
  `,
}
