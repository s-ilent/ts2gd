import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

import { resolveLabeledJump } from "./label_utils"

export const parseContinueStatement = (
  node: ts.ContinueStatement,
  props: ParseState
): ParseNodeType => {
  if (node.label) {
    const resolved = resolveLabeledJump(
      props,
      node.label.text,
      true,
      props.mostRecentControlStructureIsSwitch
    )

    if (resolved.matched) {
      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => resolved.lines.join("\n") + "\n",
      })
    }
  }

  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () => `
${props.mostRecentForStatement?.incrementor ?? ""}
continue
`,
  })
}

export const testContinue1: Test = {
  ts: `
for (let x = 0; x < 10; x++) {
  continue;
  print(x);
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var x: int = 0
while x < 10:
  x += 1
  continue
  print(x)  
  x += 1
  `,
}

export const testContinue2: Test = {
  ts: `
for (let x: int = 0; x < 10; x++) {
  if (x == (0 as int)) continue;
  print(x);
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var x: int = 0
while x < 10:
  if x == 0:
    x += 1
    continue
  print(x)
  x += 1
  `,
}
