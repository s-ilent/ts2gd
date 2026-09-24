import ts, { SyntaxKind } from "typescript"

import {
  ExtraLine,
  ExtraLineType,
  ParseState,
  combine,
  ParseNodeType,
} from "../parse_node"
import { Test } from "../tests/test"
import { getGodotType } from "../ts_utils"

import { getDestructuredNamesAndAccessStrings } from "./parse_variable_declaration"

const magic = `"[no value passed in]"`

export const parseParameter = (
  node: ts.ParameterDeclaration,
  props: ParseState
): ParseNodeType => {
  // Destructured parameters (e.g. function f({ a, b })) cannot exist in
  // GDScript signatures. The signature receives one generated parameter and
  // the destructured names are bound at the top of the function body.
  if (node.name.kind !== SyntaxKind.Identifier) {
    const destructuredNames = getDestructuredNamesAndAccessStrings(node.name)
    const genName = props.scope.createUniqueName()

    for (const { id } of destructuredNames) {
      props.scope.addName(id)
    }

    const result = combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => genName,
    })

    result.extraLines = destructuredNames.map(({ id, access }) => ({
      line: `var ${id.text} = ${genName}${access}`,
      type: "after" as const,
      lineType: ExtraLineType.DefaultInitialization,
    }))

    return result
  }

  // Rest parameters (function f(...args)) have no GDScript signature
  // equivalent: the parameter receives one untyped Array holding the
  // trailing call arguments.
  if (node.dotDotDotToken) {
    props.scope.addName(node.name)

    const usages = props.usages.get(node.name as ts.Identifier)
    const unusedPrefix = usages?.uses.length === 0 ? "_" : ""

    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => `${unusedPrefix}${node.name.getText()}: Array`,
    })
  }

  const type = getGodotType(
    node,
    props.program.getTypeChecker().getTypeAtLocation(node),
    props,
    false,
    node.initializer,
    node.type
  )
  const usages = props.usages.get(node.name as ts.Identifier)
  const unusedPrefix = usages?.uses.length === 0 && !node.initializer ? "_" : ""
  const typeString = type ? `: ${type}` : ""

  props.scope.addName(node.name)

  const initializers: ExtraLine[] = []

  const result = combine({
    parent: node,
    nodes: [node.name, node.initializer],
    props,
    parsedStrings: (name, initializer) => {
      if (initializer) {
        // It's tempting to just initialize it with godot default parameter
        // initializers, but there's a subtle bug: TS supports myFunction(a, b =
        // a) { } but Godot does not. So we need to compile that out.

        // `magic` is a giant hack but it's the only way to get things to work
        // without rewriting callsites.

        initializers.push({
          line: `${name} = (${initializer} if (typeof(${name}) == TYPE_STRING and ${name} == ${magic}) else ${name})`,
          type: "after",
          lineType: ExtraLineType.DefaultInitialization,
        })

        return `${name}${initializer ? ` = ${magic}` : ""}`
      }

      return `${unusedPrefix}${name}${typeString}${
        initializer ? " = null" : ""
      }`
    },
  })

  // The default-value expression may itself hoist intermediate lines
  // (null-guarded member accesses); those must precede the fallback
  // assignment, which references the names they declare.
  result.extraLines = [...(result.extraLines ?? []), ...initializers]

  return result
}

export const testParameter: Test = {
  ts: `
export class Test {
  test(a: int, b: string) {
    print(a);
  }
}
  `,
  expected: `
class_name Test

func test(a: int, _b: String):
  print(a)
  `,
}

export const testDestructuredParameter: Test = {
  ts: `
export class Test {
  go(opts: { a: int, b: int }) {
    print(opts)
  }

  pick({ a, b }: { a: int, b: int }) {
    return a + b
  }
}
  `,
  expected: `
class_name Test
func go(opts):
  print(opts)
func pick(__gen):
  var a = __gen.a
  var b = __gen.b
  return a + b
  `,
}

export const testArrayHoleAndRest: Test = {
  ts: `
let [a, , c, ...rest] = [1, 2, 3, 4, 5]
  `,
  expected: `
class_name __Mod_Test_4064or
static var __gen = [1, 2, 3, 4, 5]
static var a = __gen[0]
static var c = __gen[2]
static var rest = __gen.slice(3)
  `,
}

export const testParameterDefaultHoistsNullableIntermediate: Test = {
  ts: `
interface Run { npcRegisters: number[] }
interface State { quest: { run?: Run | null } }

export function questVisible(state: State, registers: number[] | undefined = state.quest.run?.npcRegisters): boolean {
  return registers != null;
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func questVisible(state, registers = "[no value passed in]"):
  var __gen = (state.quest.run if state.quest.has("run") else null)
  registers = ((__gen.npcRegisters if __gen != null else null) if (typeof(registers) == TYPE_STRING and registers == "[no value passed in]") else registers)
  return registers != null
`,
}
