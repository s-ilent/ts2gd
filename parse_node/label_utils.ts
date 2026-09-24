import ts from "typescript"

import { ParseState } from "../parse_node"

/**
 * GDScript has no labeled statements. Labeled loops are lowered with two
 * boolean flags per label: jump sites set a flag and break their innermost
 * loop, and every enclosing loop checks the flags where control lands,
 * cascading outward until the labeled loop consumes the jump. Labeled
 * blocks become single-pass `while true:` wrappers so plain `break` reaches
 * the end of the block.
 *
 * Every loop pushes an entry onto labelStack (labeled or not) so that a
 * nested loop emitting its checks can tell whether a matching label belongs
 * to the loop directly enclosing it (full jump) or to a deeper ancestor
 * (break outward and let the next check finish the jump).
 */
export type LabelEntry = {
  /** Label name, or null for an unlabeled loop. */
  name: string | null
  kind: "loop" | "block"
  continueFlag: string | null
  breakFlag: string | null
  /** The loop's incrementor, re-run on continue jumps for for-loops. */
  incrementor: string
}

const isLoopKind = (node: ts.Statement): boolean => {
  return (
    node.kind === ts.SyntaxKind.ForStatement ||
    node.kind === ts.SyntaxKind.ForOfStatement ||
    node.kind === ts.SyntaxKind.ForInStatement ||
    node.kind === ts.SyntaxKind.WhileStatement ||
    node.kind === ts.SyntaxKind.DoStatement
  )
}

export const statementIsLoop = isLoopKind

/** The entry a labeled loop adopts from its LabeledStatement wrapper. */
export const adoptPendingLabel = (props: ParseState): LabelEntry => {
  const name = props.pendingLabel ?? ""

  return {
    name,
    kind: "loop",
    continueFlag: `__ts_continue_${name}`,
    breakFlag: `__ts_break_${name}`,
    incrementor: "",
  }
}

export const unlabeledEntry = (incrementor: string): LabelEntry => {
  return {
    name: null,
    kind: "loop",
    continueFlag: null,
    breakFlag: null,
    incrementor,
  }
}

/** Variable declarations placed immediately before a labeled loop. */
export const labelFlagDeclarations = (entry: LabelEntry): string[] => {
  if (!entry.name) {
    return []
  }

  const lines: string[] = []

  if (entry.continueFlag) {
    lines.push(`var ${entry.continueFlag} = false`)
  }

  if (entry.breakFlag) {
    lines.push(`var ${entry.breakFlag} = false`)
  }

  return lines
}

/** Flags are cleared at the top of each iteration so a jump that escaped
 * the flag checks (e.g. from inside a switch) cannot poison later ones. */
export const labelFlagResets = (entry: LabelEntry): string[] => {
  if (!entry.name) {
    return []
  }

  const lines: string[] = []

  if (entry.continueFlag) {
    lines.push(`${entry.continueFlag} = false`)
  }

  if (entry.breakFlag) {
    lines.push(`${entry.breakFlag} = false`)
  }

  return lines
}

/**
 * Checks emitted after a loop statement for each labeled loop enclosing it.
 * A label owned by the directly enclosing loop performs the full jump;
 * deeper labels only break outward, letting the next check continue.
 */
export const labelPropagationChecks = (
  incomingStack: LabelEntry[]
): string[] => {
  const lines: string[] = []

  for (let i = incomingStack.length - 1; i >= 0; i--) {
    const entry = incomingStack[i]

    if (!entry.name) {
      continue
    }

    const isDirectlyEnclosing = i === incomingStack.length - 1

    if (isDirectlyEnclosing && entry.kind === "loop" && entry.continueFlag) {
      lines.push(`if ${entry.continueFlag}:`)
      lines.push(`  ${entry.continueFlag} = false`)

      if (entry.incrementor) {
        lines.push(`  ${entry.incrementor}`)
      }

      lines.push(`  continue`)
    }

    if (isDirectlyEnclosing && entry.kind === "loop" && entry.continueFlag) {
      lines.push(`if ${entry.breakFlag}:`)
      lines.push(`  break`)
    } else if (
      isDirectlyEnclosing ||
      entry.kind === "block" ||
      !entry.continueFlag
    ) {
      lines.push(`if ${entry.breakFlag}:`)
      lines.push(`  break`)
    } else {
      // Deeper loop labels propagate both jump kinds outward; control lands
      // at this loop's exit either way.
      lines.push(`if ${entry.continueFlag} or ${entry.breakFlag}:`)
      lines.push(`  break`)
    }
  }

  return lines
}

export type LabeledJump = {
  lines: string[]
  matched: boolean
}

/**
 * Emission for a labeled break or continue statement. A jump whose target
 * is the loop directly enclosing the site is direct; any other jump sets
 * the target's flag and breaks the innermost loop.
 */
export const resolveLabeledJump = (
  props: ParseState,
  label: string,
  isContinue: boolean,
  forceFlagPath = false
): LabeledJump => {
  const stack = props.labelStack ?? []

  let targetIndex = -1

  for (let i = stack.length - 1; i >= 0; i--) {
    if (stack[i].name === label) {
      targetIndex = i
      break
    }
  }

  if (targetIndex < 0) {
    return { lines: [], matched: false }
  }

  const target = stack[targetIndex]
  const innermost = stack[stack.length - 1]
  const innermostIncrementor =
    innermost && innermost.kind === "loop" ? innermost.incrementor : ""
  const direct = targetIndex === stack.length - 1 && !forceFlagPath

  if (direct && !isContinue && target.kind === "block") {
    return { lines: ["break"], matched: true }
  }

  if (direct && target.kind === "loop") {
    const jump = isContinue ? "continue" : "break"

    return {
      lines: target.incrementor ? [target.incrementor, jump] : [jump],
      matched: true,
    }
  }

  const flag = isContinue ? target.continueFlag : target.breakFlag

  if (!flag) {
    return { lines: [], matched: false }
  }

  return {
    lines: [
      ...(innermostIncrementor ? [innermostIncrementor] : []),
      `${flag} = true`,
      "break",
    ],
    matched: true,
  }
}
