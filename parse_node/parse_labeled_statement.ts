import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

import {
  LabelEntry,
  labelFlagDeclarations,
  labelPropagationChecks,
  statementIsLoop,
} from "./label_utils"

export const parseLabeledStatement = (
  node: ts.LabeledStatement,
  props: ParseState
): ParseNodeType => {
  const label = node.label.text

  // A labeled loop hands its name to the loop emitter, which declares the
  // label flags, pushes the stack entry and emits the loop directly.
  if (statementIsLoop(node.statement)) {
    return combine({
      parent: node,
      nodes: [node.statement],
      props: { ...props, pendingLabel: label },
      parsedObjs: (loop) => loop.content,
    })
  }

  // A labeled block becomes a single-pass `while true:` wrapper: a plain
  // `break` at the site reaches the end of the block, and deeper jumps
  // propagate through the flag checks like any loop.
  const entry: LabelEntry = {
    name: label,
    kind: "block",
    continueFlag: null,
    breakFlag: `__ts_break_${label}`,
    incrementor: "",
  }

  const incoming = props.labelStack ?? []

  return combine({
    parent: node,
    nodes: [node.statement],
    props: { ...props, labelStack: [...incoming, entry] },
    addIndent: true,
    parsedStrings: (body) => {
      const checks = labelPropagationChecks(incoming)

      return [
        ...labelFlagDeclarations(entry),
        "while true:",
        `  ${body.replace(/^\n+/, "")}`,
        `  break`,
        ...checks,
      ]
        .filter((l) => l !== "")
        .join("\n")
    },
  })
}

export const testLabeledBreakBlock: Test = {
  ts: `
block: {
  if (true) {
    break block
  }
  print("unreached")
}
  `,
  expected: `
class_name __Mod_Test_4064or
var __ts_break_block = false
while true:
  if true:
    break
  print("unreached")
  break
`,
}
