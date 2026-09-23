import ts, { SyntaxKind } from "typescript"

import { ErrorName, addError } from "../errors"
import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { getGodotType } from "../ts_utils"

import {
  isDecoratedAsExportFlags,
  isDecoratedAsExports,
  parseExportFlags,
  parseExports,
} from "./parse_property_declaration"

const getSettersAndGetters = (
  members: readonly ts.ClassElement[],
  props: ParseState
) => {
  const setOrGetters = members.filter(
    (member) =>
      member.kind === SyntaxKind.SetAccessor ||
      member.kind === SyntaxKind.GetAccessor
  ) as (ts.SetAccessorDeclaration | ts.GetAccessorDeclaration)[]

  const pairings: {
    setter?: ts.SetAccessorDeclaration
    getter?: ts.GetAccessorDeclaration
    exportText: string | null
    name: string
  }[] = []

  for (const setGet of setOrGetters) {
    let exportText: string | null = null

    if (isDecoratedAsExports(setGet)) {
      exportText = parseExports(setGet, props)
    }

    if (isDecoratedAsExportFlags(setGet)) {
      exportText = parseExportFlags(setGet, props)
    }

    if (setGet.kind === SyntaxKind.SetAccessor) {
      const setter = setGet as ts.SetAccessorDeclaration
      const name = setter.name.getText()
      const existingObj = pairings.find((pair) => pair.name === name)

      if (existingObj) {
        existingObj.setter = setter
        existingObj.exportText ??= exportText
      } else {
        pairings.push({ setter, name, exportText })
      }
    }

    if (setGet.kind === SyntaxKind.GetAccessor) {
      const getter = setGet as ts.GetAccessorDeclaration
      const name = getter.name.getText()
      const existingObj = pairings.find((pair) => pair.name === name)

      if (existingObj) {
        existingObj.getter = getter
        existingObj.exportText ??= exportText
      } else {
        pairings.push({ getter, name, exportText })
      }
    }
  }

  return pairings
}

export const parseClassDeclaration = (
  node: ts.ClassDeclaration | ts.ClassExpression,
  props: ParseState
): ParseNodeType => {
  const modifiers = node.modifiers?.map((x) => x.getText())

  // skip class declarations; there's no code to generate here
  if (modifiers?.includes("declare")) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "",
    })
  }

  const isAutoload = !!node.decorators?.find(
    (dec) => dec.expression.getText() === "autoload"
  )

  if (!modifiers?.includes("export") && !isAutoload) {
    addError({
      description: "You must export this class.",
      error: ErrorName.ClassMustBeExported,
      location: node,
      stack: new Error().stack ?? "",
    })
  }

  // While the class's members are parsed, its own name is the callable
  // target for static contexts (e.g. lambdas inside static methods).
  const previousModuleClassName = props.moduleClassName

  if (node.name) {
    props.moduleClassName = node.name.text
  }

  // Preprocess set/get accessors into Godot 4 property blocks. The bodies
  // themselves are emitted by the accessor parsers; here they are assembled
  // under their property declaration with proper indentation.
  const settersAndGetters = getSettersAndGetters(node.members, props)

  const isAccessorMember = (member: ts.ClassElement) =>
    member.kind === SyntaxKind.GetAccessor ||
    member.kind === SyntaxKind.SetAccessor

  return combine({
    parent: node,
    nodes: node.members,
    props,
    parsedObjs: (...objs) => {
      const bodyFor = (member: ts.ClassElement | undefined): string => {
        if (!member) {
          return ""
        }

        const idx = node.members.indexOf(member)

        return idx >= 0 ? objs[idx]?.content ?? "" : ""
      }

      const indentBody = (body: string): string[] => {
        const bodyLines = body.split("\n").filter((l) => l.trim() !== "")

        if (bodyLines.length === 0) {
          return ["    pass"]
        }

        return bodyLines.map((l) => "    " + l)
      }

      const blocks = settersAndGetters.map((pair) => {
        const lines: string[] = []

        // A property with accessors needs a type hint whenever @export is
        // present; Godot can't infer the type of an exported accessor
        // property without one.
        let typeHint: string | null | undefined

        if (pair.getter) {
          typeHint = getGodotType(
            pair.getter,
            props.program.getTypeChecker().getTypeAtLocation(pair.getter),
            props,
            false,
            undefined,
            pair.getter.type
          )
        } else if (pair.setter) {
          const param = pair.setter.parameters[0]

          if (param) {
            typeHint = getGodotType(
              param,
              props.program.getTypeChecker().getTypeAtLocation(param),
              props,
              false,
              undefined,
              param.type
            )
          }
        }

        const exportText = typeHint ? pair.exportText ?? "" : ""

        lines.push(
          `${exportText}var ${pair.name}${typeHint ? `: ${typeHint}` : ""}:`
        )

        if (pair.getter) {
          lines.push("  get:")
          lines.push(...indentBody(bodyFor(pair.getter)))
        }

        if (pair.setter) {
          const paramName = pair.setter.parameters[0]?.name.getText() ?? "value"

          lines.push(`  set(${paramName}):`)
          lines.push(...indentBody(bodyFor(pair.setter)))
        }

        return lines.join("\n")
      })

      const memberStrs = objs
        .filter(
          (_, i) => !node.members[i] || !isAccessorMember(node.members[i])
        )
        .map((o) => o.content)

      return `\n${blocks.join("\n")}\n${memberStrs.join("")}\n`
    },
  })

  if (previousModuleClassName !== undefined) {
    props.moduleClassName = previousModuleClassName
  }
}

export const testRequireExportedClass: Test = {
  ts: `
class Foo {
  x = 1
}`,
  expected: { error: "You must export this class", type: "error" },
}

export const testDontRequireExportingAutoloads: Test = {
  ts: `
@autoload
class Foo {
  x = 1
}`,
  expected: `
class_name Foo
var x: int = 1
`,
}

export const testExportArgsSetGet: Test = {
  ts: `
@autoload
class Foo {
  @exports
  get nodes(): PackedScene<Node2D>[] {
      return [];
  }

  set nodes(v: PackedScene<Node2D>[]) {

  }
}`,
  // PackedScene<Node2D>[] cannot produce a type hint (arrays are hinted
  // without one by convention), and an untyped property cannot carry
  // @export, so the annotation is dropped here.
  expected: `
class_name Foo
var nodes:
  get:
    return []
  set(v):
    pass
`,
}
