import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

import { LibraryFunctions } from "./library_functions"
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
class_name __Mod_Test_4064or
${LibraryFunctions.ts_typeof.definition("__ts_typeof")}
static var x = Vector2(1, 1)

static func _static_init():
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
${LibraryFunctions.ts_typeof.definition("__ts_typeof")}
func check(x):
  return __ts_typeof(x) == "number"
`,
}
