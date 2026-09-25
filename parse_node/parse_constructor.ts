import ts from "typescript"

import { ParseState, combine, ParseNodeType, parseNode } from "../parse_node"
import { mangleGdName } from "../scope"
import { ensureOptionalParametersLast, getGodotType } from "../ts_utils"
import { Test } from "../tests/test"

import { LibraryFunctionName } from "./library_functions"

const magic = `"[no value passed in]"`

/**
 * Parses a constructor default through the converter. Raw source text would
 * leak unmapped expressions (e.g. Math.random) into the signature; parsing
 * routes them through the same mappings as any other expression and reports
 * hoisted helpers through the shared set.
 */
const parseParamDefault = (
  initializer: ts.Expression,
  props: ParseState,
  hoisted: Set<LibraryFunctionName>
): string => {
  const parsed = parseNode(initializer, props)

  for (const hf of parsed.hoistedLibraryFunctions ?? []) {
    hoisted.add(hf)
  }

  return parsed.content.trim()
}

const getParameterText = (
  node: ts.ConstructorDeclaration,
  props: ParseState,
  hoisted: Set<LibraryFunctionName>
): string => {
  const parts: string[] = []

  for (const param of node.parameters) {
    // The signature must spell parameter names exactly like the body's
    // scope-resolved references do (Scope.addName applies the same
    // mangling when the parameter is registered).
    const paramName = mangleGdName(param.name.getText())
    let text = paramName

    if (param.initializer) {
      text += " = " + parseParamDefault(param.initializer, props, hoisted)
    } else if (param.questionToken) {
      text += " = null"
    }

    parts.push(text)
  }

  return parts.join(", ")
}

export const parseConstructor = (
  node: ts.ConstructorDeclaration,
  props: ParseState
): ParseNodeType => {
  // Parameter properties (constructor(private x: int)) declare a class
  // field and assign it during construction. GDScript class bodies accept
  // field declarations inline, so the field emits just above _init.
  const paramProps = node.parameters.filter((p) =>
    ts.isParameterPropertyDeclaration(p, p.parent)
  )

  const fieldLines: string[] = []
  const assignmentLines: string[] = []
  const hoistedHelpers = new Set<LibraryFunctionName>()

  for (const param of paramProps) {
    // The field name is a class member, and the assignment's right side
    // names the parameter: both spellings are mangled identically, and the
    // scope-registered parameter name matches the signature.
    const name = mangleGdName(param.name.getText())
    const type = getGodotType(
      param,
      props.program.getTypeChecker().getTypeAtLocation(param),
      props,
      false,
      param.initializer,
      param.type
    )
    const typeSuffix = type ? `: ${type}` : ""

    if (param.initializer) {
      // The parameter's default rides on the magic sentinel (defaults are
      // resolved inside the body by the parameter emitter), so the field
      // assignment resolves the sentinel inline to stay order-independent.
      const parsedDefault = parseParamDefault(
        param.initializer,
        props,
        hoistedHelpers
      )

      fieldLines.push(`var ${name}${typeSuffix} = ${parsedDefault}`)
      assignmentLines.push(
        `self.${name} = (${parsedDefault} if (typeof(${name}) == TYPE_STRING and ${name} == ${magic}) else ${name})`
      )
    } else {
      fieldLines.push(`var ${name}${typeSuffix}`)
      assignmentLines.push(`self.${name} = ${name}`)
    }
  }

  const assignments = assignmentLines.join("\n")

  const mergeHoisted = (result: ParseNodeType): ParseNodeType => {
    if (hoistedHelpers.size > 0) {
      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()

      for (const hf of hoistedHelpers) {
        result.hoistedLibraryFunctions.add(hf)
      }
    }

    return result
  }

  if (node.body) {
    // The trim() is for a constructor with only one element: a super() call

    return mergeHoisted(
      combine({
        parent: node,
        nodes: node.body,
        props,
        addIndent: true,
        parsedStrings: (body) => {
          // A body whose emission starts with a newline (e.g. a leading call
          // statement) would otherwise escape the _init indentation.
          const stripped = body.replace(/^\n+/, "")
          const bodyText =
            stripped.trim().length > 0 || assignments.length > 0
              ? stripped
              : "pass"
          const prefix =
            assignmentLines.length > 0
              ? assignmentLines.map((a) => `  ${a}`).join("\n") + "\n  "
              : "  "

          return `
${fieldLines.join("\n")}${
            fieldLines.length > 0 ? "\n" : ""
          }func _init(${ensureOptionalParametersLast(
            getParameterText(node, props, hoistedHelpers)
          )}):
${prefix}${bodyText}
`
        },
      })
    )
  } else {
    if (paramProps.length === 0) {
      return mergeHoisted(
        combine({
          parent: node,
          nodes: [],
          props,
          parsedStrings: () => `func _init():\n pass`,
        })
      )
    }

    return mergeHoisted(
      combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () =>
          `${fieldLines.join("\n")}\nfunc _init(${ensureOptionalParametersLast(
            getParameterText(node, props, hoistedHelpers)
          )}):\n  ${assignments}`,
      })
    )
  }
}

export const testConstructorEmitsInit: Test = {
  ts: `
export class Foo {
  constructor() {
    print("constructed")
  }
}`,
  expected: `
class_name Foo

func _init():
  print("constructed")
`,
}

export const testConstructorParameterProperty: Test = {
  ts: `
export class Foo {
  constructor(private x: int) {
    print(x)
  }
}`,
  expected: `
class_name Foo
var x: int
func _init(x):
  self.x = x
  print(x)
`,
}

export const testConstructorParameterPropertyDefault: Test = {
  ts: `
export class Foo {
  constructor(private x: int = 5) { print(x) }
}`,
  expected: `
class_name Foo
var x: int = 5
func _init(x = 5):
  self.x = (5 if (typeof(x) == TYPE_STRING and x == "[no value passed in]") else x)
  print(x)
`,
}

export const testConstructorParameters: Test = {
  ts: `
export class Foo {
  x: int = 0

  constructor(mult: int, base: int = 5) {
    this.x = mult * base
  }
}`,
  expected: `
class_name Foo

var x: int = 0

func _init(mult, base = 5):
  self.x = mult * base
`,
}

export const testConstructorParameterPropertyScriptMangled: Test = {
  ts: `
export class QuestVm {
  constructor(readonly script) {}

  current() {
    return this.script
  }
}`,
  expected: `
class_name QuestVm
var script_
func _init(script_):
  self.script_ = script_
func current():
  return self.script_
`,
}

export const testConstructorDefaultParsesThroughConverter: Test = {
  ts: `
export class Foo {
  constructor(capacity = 4096, random = Math.random) {}
}`,
  expected: `
class_name Foo

func _init(capacity = 4096, random = randf):
  pass
`,
}
