import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

/**
 * Module-level function declarations. These are emitted as static functions so
 * that they stay callable through the script resource from other files (a
 * plain file-level function in GDScript is a member of the file's implicit
 * class, and non-static members are not reachable without an instance).
 */
export const parseFunctionDeclaration = (
  node: ts.FunctionDeclaration,
  props: ParseState
): ParseNodeType => {
  // Ambient declarations and overload signatures carry no implementation.
  const isAmbient =
    !node.body || node.modifiers?.some((m) => m.getText() === "declare")

  if (isAmbient || !node.name) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "",
    })
  }

  const funcName = node.name.text

  props.scope.enterScope()

  const compiledParameters = combine({
    parent: node,
    nodes: node.parameters,
    props,
    parsedStrings: (...params) => params.join(", "),
  })

  const result = combine({
    parent: node,
    nodes: [node.body],
    props,
    addIndent: true,
    parsedStrings: (body) => {
      const joinedParams = compiledParameters.content

      let bodyLines = [
        ...(compiledParameters.extraLines?.map((param) => param.line) ?? []),
        ...(body.trim() === "" ? [] : [body]),
      ]

      if (bodyLines.length === 0) {
        bodyLines = ["pass"]
      }

      const indentedBody = bodyLines.map((line) => "  " + line + "\n").join("")

      return `
static func ${funcName}(${joinedParams}):
${indentedBody.trim() === "" ? "  pass" : indentedBody}
`
    },
  })

  props.scope.leaveScope()

  return result
}

export const testTopLevelFunction: Test = {
  ts: `
function doThing(x: int): int {
  return x * 2
}
  `,
  expected: `
static func doThing(x: int):
  return x * 2
  `,
}

export const testTopLevelExportedFunction: Test = {
  ts: `
export function shout(s: string): string {
  return s + "!"
}
  `,
  expected: `
static func shout(s: String):
  return s + "!"
  `,
}

export const testTopLevelFunctionCallsSibling: Test = {
  ts: `
function inner(): int {
  return 1
}

export function outer(): int {
  return inner() + 1
}
  `,
  expected: `
static func inner():
  return 1
static func outer():
  return inner() + 1
  `,
}

export const testAmbientFunctionEmitsNothing: Test = {
  ts: `
declare function notImplemented(x: int): void
  `,
  expected: `
  `,
}

export const testFunctionOverloadSignatureEmitsNothing: Test = {
  ts: `
function pick(x: string): string
function pick(x: int): int
function pick(x: any): any {
  return x
}
  `,
  expected: `
static func pick(x):
  return x
  `,
}

export const testFunctionWithDefaultParam: Test = {
  ts: `
function greet(name: string = "world"): string {
  return "hi " + name
}
  `,
  expected: `
static func greet(name = "[no value passed in]"):
  name = ("world" if (typeof(name) == TYPE_STRING and name == "[no value passed in]") else name)
  return "hi " + name
  `,
}
