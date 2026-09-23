import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
const { SyntaxKind } = ts

export const parseTypeofExpression = (
  node: ts.TypeOfExpression,
  props: ParseState
): ParseNodeType => {
  // TS typeof returns JS-style type strings; GDScript's builtin typeof
  // returns a Variant.Type enum. Emit a hoisted helper that converts.
  const result = combine({
    parent: node,
    nodes: node.expression,
    props,
    parsedStrings: (expr) => {
      return `__ts_typeof(${expr})`
    },
  })

  result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
  result.hoistedLibraryFunctions.add("ts_typeof")

  return result
}

export const testTypeofExpression: Test = {
  ts: `
let x = new Vector2(1, 1);
print(typeof x);
  `,
  expected: `
func __ts_typeof(v):
  match typeof(v):
    TYPE_NIL:
      return "undefined"
    TYPE_BOOL:
      return "boolean"
    TYPE_INT, TYPE_FLOAT:
      return "number"
    TYPE_STRING:
      return "string"
    TYPE_CALLABLE:
      return "function"
    _:
      return "object"
var x = Vector2(1, 1)
print(__ts_typeof(x))
  `,
}

export const testTypeofComparison: Test = {
  ts: `
export class Test {
  check(x) {
    return typeof x == "number"
  }
}
  `,
  expected: `
class_name Test
func __ts_typeof(v):
  match typeof(v):
    TYPE_NIL:
      return "undefined"
    TYPE_BOOL:
      return "boolean"
    TYPE_INT, TYPE_FLOAT:
      return "number"
    TYPE_STRING:
      return "string"
    TYPE_CALLABLE:
      return "function"
    _:
      return "object"
func check(x):
  return __ts_typeof(x) == "number"
`,
}
