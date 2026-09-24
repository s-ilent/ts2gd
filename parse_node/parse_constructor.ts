import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"
import { ensureOptionalParametersLast, getGodotType } from "../ts_utils"
import { Test } from "../tests/test"

const magic = `"[no value passed in]"`

const getParameterText = (node: ts.ConstructorDeclaration): string => {
  const parts: string[] = []

  for (const param of node.parameters) {
    const paramName = param.name.getText()
    let text = paramName

    if (param.initializer) {
      text += " = " + param.initializer.getText()
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

  for (const param of paramProps) {
    const name = param.name.getText()
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
      fieldLines.push(
        `var ${name}${typeSuffix} = ${param.initializer.getText()}`
      )
      assignmentLines.push(
        `self.${name} = (${param.initializer.getText()} if (typeof(${name}) == TYPE_STRING and ${name} == ${magic}) else ${name})`
      )
    } else {
      fieldLines.push(`var ${name}${typeSuffix}`)
      assignmentLines.push(`self.${name} = ${name}`)
    }
  }

  const assignments = assignmentLines.join("\n")

  if (node.body) {
    // The trim() is for a constructor with only one element: a super() call

    return combine({
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
        }func _init(${ensureOptionalParametersLast(getParameterText(node))}):
${prefix}${bodyText}
`
      },
    })
  } else {
    if (paramProps.length === 0) {
      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => `func _init():\n pass`,
      })
    }

    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () =>
        `${fieldLines.join("\n")}\nfunc _init(${ensureOptionalParametersLast(
          getParameterText(node)
        )}):\n  ${assignments}`,
    })
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
