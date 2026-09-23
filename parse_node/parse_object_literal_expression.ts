import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

import { getCapturedScope } from "./parse_arrow_function"
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
    | { kind: "method"; key: string; value: string }

  // A flat node list in property order. Regular properties contribute two
  // nodes (name and value, or the shorthand name twice); spreads contribute
  // one (the spread expression). Methods and accessors are hoisted to file
  // level functions up front, so they contribute no nodes at all.
  const flatNodes: ts.Node[] = []
  const segmentMeta: SegmentMeta[] = []
  const hoistedMethodFunctions: {
    name: string
    node: ts.ArrowFunction
    content: string
  }[] = []
  const methodAccessorNames = new Set<string>()

  const hoistFunctionLikeMember = (
    member:
      | ts.MethodDeclaration
      | ts.GetAccessorDeclaration
      | ts.SetAccessorDeclaration,
    props: ParseState
  ): { name: string; value: string; content: string } => {
    const name = props.scope.createUniqueName()
    const { capturedScopeObject, unwrapCapturedScope } = getCapturedScope(
      member as unknown as ts.ArrowFunction,
      props
    )

    props.scope.enterScope()

    const parsed = combine({
      parent: member,
      nodes: [member.body, ...member.parameters],
      props,
      addIndent: true,
      parsedStrings: (body, ...args) => {
        if (member.body && member.body.kind !== SyntaxKind.Block) {
          return `
func ${name}(${[...args, "captures"].join(", ")}):
${unwrapCapturedScope}
  return ${body}
`
        }

        return `
func ${name}(${[...args, "captures"].join(", ")}):
${unwrapCapturedScope}
  ${body.trim() === "" ? "pass" : body}
`
      },
    })

    props.scope.leaveScope()

    return {
      name,
      value: `[Callable(self, "${name}"), ${capturedScopeObject}]`,
      content: parsed.content,
    }
  }

  for (const prop of node.properties) {
    if (
      prop.kind === SyntaxKind.MethodDeclaration ||
      prop.kind === SyntaxKind.GetAccessor ||
      prop.kind === SyntaxKind.SetAccessor
    ) {
      const member = prop as
        | ts.MethodDeclaration
        | ts.GetAccessorDeclaration
        | ts.SetAccessorDeclaration

      const key = member.name.getText()

      // A setter paired with a getter on the same key cannot both occupy
      // the dictionary slot; the getter wins.
      if (
        prop.kind === SyntaxKind.SetAccessor &&
        methodAccessorNames.has(key)
      ) {
        continue
      }

      methodAccessorNames.add(key)

      const hoisted = hoistFunctionLikeMember(member, props)

      hoistedMethodFunctions.push({
        name: hoisted.name,
        node: member as unknown as ts.ArrowFunction,
        content: hoisted.content,
      })

      segmentMeta.push({
        kind: "method",
        key: `"${key}"`,
        value: hoisted.value,
      })

      continue
    }

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

        if (meta.kind === "method") {
          const last = segments[segments.length - 1]

          if (last && last.kind === "literal") {
            last.pairs.push([meta.key, meta.value])
          } else {
            segments.push({
              kind: "literal",
              pairs: [[meta.key, meta.value]],
            })
          }

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

  return {
    ...result,
    hoistedArrowFunctions: [
      ...hoistedMethodFunctions,
      ...(result.hoistedArrowFunctions ?? []),
    ],
  }
}

export const testObjectLiteral: Test = {
  ts: `
let x = {}
  `,
  expected: `
static var _x = {}
  `,
}

export const testObjectLiteral2: Test = {
  ts: `
let x = {a: 1}
  `,
  expected: `
static var _x = { "a": 1 }
  `,
}

export const testObjectLiteralShorthand: Test = {
  ts: `
let x = {a}
  `,
  expected: `
static var _x = { "a": a }
  `,
}

export const testObjectLiteralShorthand2: Test = {
  ts: `
let x = { a: 1 }
  `,
  expected: `
static var _x = { "a": 1 }
  `,
}

export const testObjectLiteralMultiline: Test = {
  ts: `
let x = {
  a: 1
}
  `,
  expected: `
static var _x = { 
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
static var _x = { 
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
static var base = { "a": 1 }
static var _x = __dict_merge(__dict_merge(base, {}), { "b": 2 })
  `,
}

export const testObjectLiteralSpreadOnly: Test = {
  ts: `
let base = { a: 1 }
let x = { ...base }
  `,
  expected: `
${LibraryFunctions.dict_merge.definition("__dict_merge")}
static var base = { "a": 1 }
static var _x = __dict_merge(base, {})
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
static var a = { "x": 1 }
static var b = { "y": 2 }
static var _c = __dict_merge(__dict_merge(a, {}), __dict_merge(b, {}))
  `,
}

export const testObjectLiteralMethod: Test = {
  ts: `
let strategies = {
  name: "a",
  apply(x: int) {
    return x + 1
  },
}
  `,
  expected: `
func __gen(x: int, captures):
  return x + 1
static var _strategies = {
  "name": "a",
  "apply": [Callable(self, "__gen"), {}],
}
  `,
}

export const testObjectLiteralGetter: Test = {
  ts: `
let obj = {
  total: 5,
  get doubled() {
    return this.total * 2
  },
}
  `,
  expected: `
func __gen(captures):
  return self.total * 2
static var _obj = {
  "total": 5,
  "doubled": [Callable(self, "__gen"), {}],
}
  `,
}
