import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

export const parseThrowStatement = (
  node: ts.ThrowStatement,
  props: ParseState
): ParseNodeType => {
  // GDScript has no throw statement: log the error via push_error, and
  // trap via assert(false) in debug builds (assert is stripped in release).

  // For `throw new Error(<msg>)`, emit <msg> rather than the constructor.
  const expression = node.expression
  const messageNode: ts.Expression | undefined =
    expression &&
    ts.isNewExpression(expression) &&
    expression.getText().startsWith("new Error") &&
    expression.arguments &&
    expression.arguments.length === 1
      ? expression.arguments[0]
      : expression

  // GDScript's assert rejects non-string messages; thrown objects and
  // other values route through the stringifying assert helper instead.
  const thrownType = messageNode
    ? props.program.getTypeChecker().getTypeAtLocation(messageNode)
    : undefined
  const thrownTypeString = messageNode
    ? props.program.getTypeChecker().typeToString(thrownType!)
    : "string"
  const isStringMessage =
    !messageNode ||
    thrownTypeString === "string" ||
    thrownTypeString === "String" ||
    thrownTypeString.startsWith('"')

  const result = combine({
    parent: node,
    nodes: messageNode ? [messageNode] : [],
    props,
    parsedStrings: (message) => {
      const msg =
        message.trim().length > 0 ? message.trim() : '"unspecified error"'

      if (isStringMessage) {
        return `
push_error(${msg})
assert(false, ${msg})
`
      }

      return `
push_error(str(${msg}))
__ts_assert(false, ${msg})
`
    },
  })

  if (!isStringMessage) {
    result.hoistedLibraryFunctions = result.hoistedLibraryFunctions ?? new Set()
    result.hoistedLibraryFunctions.add("ts_assert")
  }

  return result
}

export const testThrowNewError: Test = {
  ts: `
export class Foo {
  maybe(x: int) {
    if (x < 0) {
      throw new Error("negative value")
    }
    print(x)
  }
}`,
  expected: `
class_name Foo
func maybe(x: int):
  if x < 0:
    push_error("negative value")
    assert(false, "negative value")
  print(x)
`,
}

export const testThrowExpression: Test = {
  ts: `
export class Foo {
  maybe(x: int) {
    if (x < 0) {
      throw "bad " + "value"
    }
  }
}`,
  expected: `
class_name Foo
func maybe(x: int):
  if x < 0:
    push_error("bad " + "value")
    assert(false, "bad " + "value")
`,
}
