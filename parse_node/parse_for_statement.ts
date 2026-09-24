import ts from "typescript"

import {
  ExtraLineType,
  ParseState,
  combine,
  ParseNodeType,
} from "../parse_node"
import { Test } from "../tests/test"

import {
  adoptPendingLabel,
  labelFlagDeclarations,
  labelFlagResets,
  labelPropagationChecks,
  unlabeledEntry,
} from "./label_utils"

export const parseForStatement = (
  node: ts.ForStatement,
  props: ParseState
): ParseNodeType => {
  props = { ...props, mostRecentControlStructureIsSwitch: false }

  // Add initializer to current scope BEFORE entering new scope
  let initializer = combine({
    parent: node,
    nodes: node.initializer,
    props,
    parsedStrings: (init) => init,
  }).content

  props.scope.enterScope()

  const increment = combine({
    parent: node,
    addIndent: true,
    nodes: [node.incrementor],
    props,
    parsedStrings: (inc) => inc,
  })

  const incrementExtraLines =
    increment.extraLines
      ?.filter(
        (line) =>
          line.lineType === ExtraLineType.Decrement ||
          line.lineType === ExtraLineType.Increment
      )
      .map((line) => line.line) ?? []

  // Prefix/postfix ++/-- emit their side effect as an increment/decrement
  // extra line (their content is just the operand expression). All other
  // increment forms (i += n, i = i + n, f()) arrive via content instead.
  // Those were previously computed and then dropped, which made every
  // such loop infinite.
  const contentIncrement =
    increment.content.trim().length > 0 ? increment.content.trim() : undefined

  const incrementLines =
    incrementExtraLines.length > 0
      ? incrementExtraLines
      : contentIncrement
      ? [contentIncrement]
      : []

  props.mostRecentForStatement = {
    incrementor: incrementLines.join("\n"),
  }

  const incrementor = incrementLines.join("\n")
  const incoming = props.labelStack ?? []
  const entry = props.pendingLabel
    ? adoptPendingLabel(props)
    : unlabeledEntry(incrementor)
  entry.incrementor = incrementor
  const bodyProps = {
    ...props,
    pendingLabel: undefined,
    labelStack: [...incoming, entry],
  }

  const result = combine({
    parent: node,
    addIndent: true,
    nodes: [node.condition, node.statement],
    props: bodyProps,
    parsedStrings: (cond, statement) => {
      // A statement whose emission is entirely an extra line (e.g. a bare
      // `x--`) produces content starting with a newline; strip it so the
      // body cannot escape the for block's indentation.
      statement = statement.replace(/^\n+/, "")

      if (statement.trim().length === 0 && incrementLines.length === 0) {
        statement = "pass"
      }

      const decls = labelFlagDeclarations(entry)
      const resets = labelFlagResets(entry)
      const checks = labelPropagationChecks(incoming)
      const declBlock = decls.length > 0 ? decls.join("\n") + "\n" : ""
      const resetBlock =
        resets.length > 0 ? resets.map((l) => `  ${l}`).join("\n") + "\n" : ""
      const checkBlock = checks.length > 0 ? checks.join("\n") + "\n" : ""

      return `
${declBlock}${initializer || ""}
while ${cond || "true"}:
${resetBlock}  ${statement}
  ${incrementLines.join("\n")}
${checkBlock}`
    },
  })

  props.scope.leaveScope()

  return result
}

export const testMultipleSameNameVars: Test = {
  ts: `

for (let i = 0; i < 6; ++i) {
  print(i)
}
for (let i = 0; i < 5; ++i) {
  print(i)
}
for (let i = 0; i < 5; ++i) {
  print(i)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var i: int = 0
while i < 6:
  print(i)
  i += 1
static var i1: int = 0
while i1 < 5:
  print(i1)
  i1 += 1
static var i2: int = 0
while i2 < 5:
  print(i2)
  i2 += 1
  `,
}

export const testPass2: Test = {
  ts: `
for (let x = 0; x < 10; );
  `,
  expected: `
class_name __Mod_Test_4064or
static var x: int = 0
while x < 10:
  pass
  `,
}

export const testCompoundAssignmentIncrement: Test = {
  ts: `
for (let i: int = 0; i < 10; i += 2) {
  print(i)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var i: int = 0
while i < 10:
  print(i)
  i += 2
  `,
}

export const testAssignmentIncrement: Test = {
  ts: `
for (let i: int = 1; i < 100; i = i * 3) {
  print(i)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var i: int = 1
while i < 100:
  print(i)
  i = i * 3
  `,
}

export const testCompoundIncrementWithContinue: Test = {
  ts: `
for (let i: int = 0; i < 10; i += 2) {
  if (i == (4 as int)) {
    continue
  }
  print(i)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static var i: int = 0
while i < 10:
  if i == 4:
    i += 2
    continue
  print(i)
  i += 2
  `,
}
