import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

export const parseIfStatement = (
  node: ts.IfStatement,
  props: ParseState
): ParseNodeType => {
  props.scope.enterScope()

  // Body content can start with a newline (e.g. a statement whose emission
  // is entirely an extra line, like a bare `x--`); strip those newlines so
  // the body cannot escape the `if` block's indentation. Block content is
  // relatively indented already (first line raw, the rest indented), so only
  // the first line gains this level's two spaces.
  const indentBody = (content: string): string => {
    const trimmed = content.replace(/^\n+/, "").replace(/[ \t]+$/, "")

    if (trimmed.trim() === "") {
      return ""
    }

    const lines = trimmed.split("\n")

    return (
      lines.map((line, i) => (i === 0 ? "  " + line : line)).join("\n") + "\n"
    )
  }

  let result = combine({
    addIndent: true,
    parent: node,
    nodes: [node.expression, node.thenStatement, node.elseStatement],
    props,
    parsedObjs: (expression, thenStatement, elseStatement) => {
      const beforeLines =
        expression.extraLines?.filter((line) => line.type === "before") ?? []
      const afterLines =
        expression.extraLines?.filter((line) => line.type === "after") ?? []

      let thenBody =
        afterLines.map(({ line }) => "  " + line + "\n").join("") +
        (thenStatement.content.trim() === ""
          ? ""
          : indentBody(thenStatement.content))
      let elseBody =
        afterLines.map(({ line }) => "  " + line + "\n").join("") +
        (elseStatement === undefined || elseStatement.content.trim() === ""
          ? ""
          : indentBody(elseStatement.content))

      if (thenBody.trim() === "") {
        thenBody = "  pass"
      }

      if (elseBody !== "" && elseBody.trim() === "") {
        elseBody = "  pass\n"
      }

      return `
${beforeLines.map((line) => line.line).join("\n")}
if ${expression.content}:
${thenBody}
${
  elseBody.trim() === ""
    ? ""
    : `else:
${elseBody}
`
}`
    },
  })

  result.extraLines = []

  props.scope.leaveScope()

  return result
}

export const testIf: Test = {
  ts: `
if (true) {
  print(1)
} else {
  print(0)
}
  `,
  expected: `
class_name __Mod_Test_4064or
if true:
  print(1)
else:
  print(0)
  `,
}

export const testElseIf: Test = {
  ts: `
if (true) {
  print(1)
} else if ('maybe') {
  print(2)
} else {
  print(0)
}
  `,
  expected: `
class_name __Mod_Test_4064or
if true:
  print(1)
else:
  if "maybe":
    print(2)
  else:
    print(0)
  `,
}

export const testIfPreInc1: Test = {
  ts: `
if (++x) {
  print(1)
} else {
  print(0)
}
  `,
  expected: `
class_name __Mod_Test_4064or
x += 1
if x:
  print(1)
else:
  print(0)
  `,
}

export const testIfPreInc2: Test = {
  ts: `
if (x) {
  print(++x)
} else {
  print(++x)
}
  `,
  expected: `
class_name __Mod_Test_4064or
if x:
  x += 1
  print(x)
else:
  x += 1
  print(x)
  `,
}

export const testIfPostInc1: Test = {
  ts: `
if (x++) {
  print(1)
} else {
  print(0)
}
  `,
  expected: `
class_name __Mod_Test_4064or
if x:
  x += 1
  print(1)
else:
  x += 1
  print(0)
  `,
}

export const testIfPostInc2: Test = {
  ts: `
if (x) {
  print(x++)
} else {
  print(x++)
}
  `,
  expected: `
class_name __Mod_Test_4064or
if x:
  print(x)
  x += 1
else:
  print(x)
  x += 1
  `,
}

export const testIfPass: Test = {
  ts: `
if (true) {
} else {
  print(0)
}
  `,
  expected: `
class_name __Mod_Test_4064or
if true:
  pass
else:
  print(0)
  `,
}

export const testIfPass2: Test = {
  ts: `
if (true) {
  print(1)
} else {
}
  `,
  expected: `
class_name __Mod_Test_4064or
if true:
  print(1)
  `,
}

export const testIfBodyWithStatementExtraLines: Test = {
  ts: `
type Sink = (id: int) => void
let sink: Sink | null = null

function go(): void {
  if (wasSeated) sink?.(0)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var sink = null
static func go():
  if wasSeated:
    var __gen = sink[0].call(0,sink[1]) if sink != null else null
    __gen
  `,
}
