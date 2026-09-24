import ts, { SyntaxKind } from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { ensureOptionalParametersLast } from "../ts_utils"

import { getCapturedScope } from "./parse_arrow_function"
import { LibraryFunctionName, LibraryFunctions } from "./library_functions"

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
    | { kind: "shorthand"; keyText: string }
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

  // Lifted method bodies may themselves request runtime helpers and hoist
  // their own generated functions; those must survive to the file level.
  const methodHoistedLibraryFunctions = new Set<LibraryFunctionName>()
  const methodHoistedArrowFunctions: ParseNodeType["hoistedArrowFunctions"] = []
  const methodAccessorNames = new Set<string>()

  const hoistFunctionLikeMember = (
    member:
      | ts.MethodDeclaration
      | ts.GetAccessorDeclaration
      | ts.SetAccessorDeclaration,
    props: ParseState
  ): {
    name: string
    value: string
    content: string
    hoistedLibraryFunctions?: Set<LibraryFunctionName>
    hoistedArrowFunctions?: ParseNodeType["hoistedArrowFunctions"]
  } => {
    const name = props.scope.createUniqueName()
    const { capturedScopeObject, unwrapCapturedScope } = getCapturedScope(
      member as unknown as ts.ArrowFunction,
      props
    )

    const callableTarget =
      props.inStaticContext && props.moduleClassName
        ? props.moduleClassName
        : "self"

    props.scope.enterScope()

    // Parameters are parsed before the body so that references inside the
    // body resolve through the scope to the parameters' emitted (possibly
    // renamed) names.
    const parsed = combine({
      parent: member,
      nodes: [...member.parameters, member.body],
      props,
      addIndent: true,
      parsedStrings: (...allParsed) => {
        const args = allParsed.slice(0, -1)
        const body = allParsed[allParsed.length - 1]
        const signature = ensureOptionalParametersLast(
          [...args, "captures"].join(", ")
        )

        if (member.body && member.body.kind !== SyntaxKind.Block) {
          return `
static func ${name}(${signature}):
${unwrapCapturedScope}
  return ${body}
`
        }

        return `
static func ${name}(${signature}):
${unwrapCapturedScope}
  ${body.trim() === "" ? "pass" : body}
`
      },
    })

    props.scope.leaveScope()

    return {
      name,
      value: `[Callable(${callableTarget}, "${name}"), ${capturedScopeObject}]`,
      content: parsed.content,
      hoistedLibraryFunctions: parsed.hoistedLibraryFunctions,
      hoistedArrowFunctions: parsed.hoistedArrowFunctions,
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

      for (const lf of hoisted.hoistedLibraryFunctions ?? []) {
        methodHoistedLibraryFunctions.add(lf)
      }

      methodHoistedArrowFunctions.push(...(hoisted.hoistedArrowFunctions ?? []))

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

      // The name node is the value reference; the key is the literal text.
      // (Parsing the name twice would run the key through identifier
      // rewriting as well, mangling the key.)
      flatNodes.push(shorthand.name)
      segmentMeta.push({ kind: "shorthand", keyText: shorthand.name.text })
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
        if (meta.kind === "shorthand") {
          const value = strings[stringIndex++]
          const key = `"${meta.keyText}"`
          const last = segments[segments.length - 1]

          if (last && last.kind === "literal") {
            last.pairs.push([key, value])
          } else {
            segments.push({
              kind: "literal",
              pairs: [[key, value]],
            })
          }

          continue
        }

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
    hoistedLibraryFunctions: new Set([
      ...(result.hoistedLibraryFunctions ?? []),
      ...methodHoistedLibraryFunctions,
    ]),
    hoistedArrowFunctions: [
      ...methodHoistedArrowFunctions,
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
class_name __Mod_Test_4064or
static var _x = {}
  `,
}

export const testObjectLiteral2: Test = {
  ts: `
let x = {a: 1}
  `,
  expected: `
class_name __Mod_Test_4064or
static var _x = { "a": 1 }
  `,
}

export const testObjectLiteralShorthand: Test = {
  ts: `
let x = {a}
  `,
  expected: `
class_name __Mod_Test_4064or
static var _x = { "a": a }
  `,
}

export const testObjectLiteralShorthand2: Test = {
  ts: `
let x = { a: 1 }
  `,
  expected: `
class_name __Mod_Test_4064or
static var _x = { "a": 1 }
  `,
}

export const testObjectLiteralShorthandFunctionReference: Test = {
  ts: `
export function make(): any {
  function tick(state: int): bool {
    return state > 0
  }

  return { tick }
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __nested_tick(state: int, captures):
  return state > 0
static func make():
  return { "tick": [Callable(__Mod_Test_4064or, "__nested_tick"), {}] }
  `,
}

export const testObjectLiteralMultiline: Test = {
  ts: `
let x = {
  a: 1
}
  `,
  expected: `
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
static func __gen(x: int, captures):
  return x + 1
static var _strategies = {
  "name": "a",
  "apply": [Callable(__Mod_Test_4064or, "__gen"), {}],
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
class_name __Mod_Test_4064or
static func __gen(captures):
  return self.total * 2
static var _obj = {
  "total": 5,
  "doubled": [Callable(__Mod_Test_4064or, "__gen"), {}],
}
  `,
}

export const testObjectLiteralMethodHoistsLibraryHelper: Test = {
  ts: `
export function make(): { tick: () => void } {
  return {
    tick(): void {
      const roster: number[] = []
      const rec = roster.find(r => r === 1)
      void rec
    },
  }
}
void make
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_array_find.definition("__ts_array_find")}
${LibraryFunctions.ts_call_fn.definition("__ts_call_fn")}
${LibraryFunctions.ts_truthy.definition("__ts_truthy")}
static func __gen1(r, captures):
  return r == 1
static func __gen(captures):
  var roster = []
  var rec = __ts_array_find(roster, [Callable(__Mod_Test_4064or, "__gen1"), {}])
  null
static func make():
  return {
    "tick": [Callable(__Mod_Test_4064or, "__gen"), {}],
  }
null
  `,
}
