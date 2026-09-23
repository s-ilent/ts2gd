import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

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
  if (node.body) {
    // The trim() is for a constructor with only one element: a super() call

    return combine({
      parent: node,
      nodes: node.body,
      props,
      addIndent: true,
      parsedStrings: (body) => `
func _init(${getParameterText(node)}):
  ${body.trim().length > 0 ? body : "pass"}
`,
    })
  } else {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => `func _init():\n pass`,
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

export const testConstructorOptionalParameters: Test = {
  ts: `
export class Foo {
  y: int = 0

  constructor(a?: int) {
    if (a) {
      self.y = a
    }
  }
}`,
  expected: `
class_name Foo

var y: int = 0

func _init(a = null):
  if a:
    self.y = a
`,
}
