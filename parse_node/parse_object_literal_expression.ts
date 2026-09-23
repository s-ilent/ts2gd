import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

import { LibraryFunctions } from "./library_functions"

export const parseObjectLiteralExpression = (
  node: ts.ObjectLiteralExpression,
  props: ParseState
): ParseNodeType => {
  if (node.properties.length === 0) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "{}",
    })
  }

  const isMultiline = node.getText().includes("\n")

  type SegmentMeta =
    | { kind: "pair"; keyIsIdentifier: boolean }
    | { kind: "spread" }

  // A flat node list in property order. Regular properties contribute two
  // nodes (name and value, or the shorthand name twice); spreads contribute
  // one (the spread expression).
  const flatNodes: ts.Node[] = []
  const segmentMeta: SegmentMeta[] = []

  for (const prop of node.properties) {
    if (prop.kind === SyntaxKind.PropertyAssignment) {
      const assignment = prop as ts.PropertyAssignment

      if (assignment.name.kind === SyntaxKind.ComputedPropertyName) {
        const computedProp = assignment.name as ts.ComputedPropertyName

        flatNodes.push(computedProp.expression)
        segmentMeta.push({ kind: "pair", keyIsIdentifier: false })
      } else {
        flatNodes.push(assignment.name)
        segmentMeta.push({
          kind: "pair",
          keyIsIdentifier: assignment.name.kind === SyntaxKind.Identifier,
        })
      }

      flatNodes.push(assignment.initializer)
    } else if (prop.kind === SyntaxKind.ShorthandPropertyAssignment) {
      const shorthand = prop as ts.ShorthandPropertyAssignment

      flatNodes.push(shorthand.name)
      flatNodes.push(shorthand.name)
      segmentMeta.push({ kind: "pair", keyIsIdentifier: true })
    } else if (prop.kind === SyntaxKind.SpreadAssignment) {
      const spread = prop as ts.SpreadAssignment

      flatNodes.push(spread.expression)
      segmentMeta.push({ kind: "spread" })
    } else {
      throw new Error("Unknown property in object.")
    }
  }

  const result = combine({
    parent: node,
    nodes: flatNodes,
    props,
    parsedStrings: (...strings) => {
      let stringIndex = 0

      type Segment =
        | { kind: "literal"; pairs: [string, string][] }
        | { kind: "spread"; expr: string }

      const segments: Segment[] = []

      for (const meta of segmentMeta) {
        if (meta.kind === "spread") {
          segments.push({ kind: "spread", expr: strings[stringIndex++] })
          continue
        }

        const key = strings[stringIndex++]
        const value = strings[stringIndex++]

        const formattedKey = meta.keyIsIdentifier ? `"${key}"` : key

        const last = segments[segments.length - 1]

        if (last && last.kind === "literal") {
          last.pairs.push([formattedKey, value])
        } else {
          segments.push({
            kind: "literal",
            pairs: [[formattedKey, value]],
          })
        }
      }

      const formatLiteral = (pairs: [string, string][]) => {
        if (pairs.length === 0) {
          return "{}"
        }

        if (isMultiline) {
          return `
{
${pairs.map(([k, v]) => `  ${k}: ${v},`).join("\n")}
}      
      `
        } else {
          return `{ ${pairs.map(([k, v]) => `${k}: ${v}`).join(", ")} }`
        }
      }

      // Fold the segments left to right. Every spread copies its source, so
      // later properties can never mutate the spread object - matching
      // object spread semantics.
      let accumulator: string | null = null

      for (const segment of segments) {
        if (segment.kind === "spread") {
          const copy = `__dict_merge(${segment.expr}, {})`

          accumulator = accumulator
            ? `__dict_merge(${accumulator}, ${copy})`
            : copy
        } else {
          const literal = formatLiteral(segment.pairs)

          accumulator = accumulator
            ? `__dict_merge(${accumulator}, ${literal})`
            : literal
        }
      }

      return accumulator ?? "{}"
    },
  })

  if (segmentMeta.some((meta) => meta.kind === "spread")) {
    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add("dict_merge")
  }

  return result
}

export const testObjectLiteral: Test = {
  ts: `
let x = {}
  `,
  expected: `
var _x = {}
  `,
}

export const testObjectLiteral2: Test = {
  ts: `
let x = {a: 1}
  `,
  expected: `
var _x = { "a": 1 }
  `,
}

export const testObjectLiteralShorthand: Test = {
  ts: `
let x = {a}
  `,
  expected: `
var _x = { "a": a }
  `,
}

export const testObjectLiteralShorthand2: Test = {
  ts: `
let x = { a: 1 }
  `,
  expected: `
var _x = { "a": 1 }
  `,
}

export const testObjectLiteralMultiline: Test = {
  ts: `
let x = {
  a: 1
}
  `,
  expected: `
var _x = { 
  "a": 1,
}
  `,
}

export const testObjectLiteralMultiline2: Test = {
  ts: `
let x = {
  a: 1,
  b: 1,
}
  `,
  expected: `
var _x = { 
  "a": 1,
  "b": 1,
}
  `,
}

export const testObjectLiteralMultiline3: Test = {
  ts: `
{
  let foo = {
    a: 1,
    b: 2,
  }
  foo
}
  `,
  expected: `
var foo = {
  "a": 1,
  "b": 2,
}
foo  
`,
}

export const testObjectLiteralSpread: Test = {
  ts: `
let base = { a: 1 }
let x = { ...base, b: 2 }
  `,
  expected: `
${LibraryFunctions.dict_merge.definition("__dict_merge")}
var base = { "a": 1 }
var _x = __dict_merge(__dict_merge(base, {}), { "b": 2 })
  `,
}

export const testObjectLiteralSpreadOnly: Test = {
  ts: `
let base = { a: 1 }
let x = { ...base }
  `,
  expected: `
${LibraryFunctions.dict_merge.definition("__dict_merge")}
var base = { "a": 1 }
var _x = __dict_merge(base, {})
  `,
}

export const testObjectLiteralDoubleSpread: Test = {
  ts: `
let a = { x: 1 }
let b = { y: 2 }
let c = { ...a, ...b }
  `,
  expected: `
${LibraryFunctions.dict_merge.definition("__dict_merge")}
var a = { "x": 1 }
var b = { "y": 2 }
var _c = __dict_merge(__dict_merge(a, {}), __dict_merge(b, {}))
  `,
}
