import ts, { SyntaxKind } from "typescript"

import { ErrorName, addError } from "../errors"
import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { ensureOptionalParametersLast } from "../ts_utils"

/**
 * Get all identifiers in a scope that were declared in an enclosing scope.
 *
 * e.g.
 *
 * function foo() {
 *   let a = 1;
 *   return a + b + 1;
 * }
 *
 * in foo(), `a` is not a free variable, but `b` is.
 */
const getFreeVariables = (
  node: ts.Node | undefined | null,
  root: ts.ArrowFunction | ts.FunctionDeclaration | ts.FunctionExpression,
  props: ParseState
): (ts.Identifier | ts.PropertyAccessExpression)[] => {
  if (!node) {
    return []
  }

  // Identifiers in type positions (annotations, generic type arguments, type
  // queries) are erased during emission, so they are never free variables.
  if (ts.isTypeNode(node)) {
    return []
  }

  if (
    node.kind === SyntaxKind.Identifier ||
    node.kind === SyntaxKind.PropertyAccessExpression
  ) {
    // In cases like "a.b.c", only return "a".
    while (node.kind === SyntaxKind.PropertyAccessExpression) {
      const pae = node as ts.PropertyAccessExpression
      node = pae.expression
    }

    const symbol = props.program.getTypeChecker().getSymbolAtLocation(node)

    // A shorthand property (`{ rng }`) names a binding; the checker reports
    // a synthesized symbol for the property itself, which breaks the
    // declaration walk below. Resolve through the value symbol instead.
    const shorthandValueSymbol =
      node.kind === SyntaxKind.Identifier &&
      node.parent &&
      ts.isShorthandPropertyAssignment(node.parent) &&
      (node.parent as ts.ShorthandPropertyAssignment).name === node
        ? props.program
            .getTypeChecker()
            .getShorthandAssignmentValueSymbol(
              node.parent as ts.ShorthandPropertyAssignment
            )
        : undefined

    const effectiveSymbol = shorthandValueSymbol ?? symbol

    if (effectiveSymbol) {
      if (
        !effectiveSymbol.declarations ||
        effectiveSymbol.declarations.length === 0
      ) {
        addError({
          error: ErrorName.DeclarationNotGiven,
          location: node,
          stack: new Error().stack ?? "",
          description: `
Declaration not provided for free variables. This is an internal ts2gd bug. Please report it.
        `,
        })
        return []
      }
      const decl = effectiveSymbol.declarations[0]

      if (decl.getSourceFile() !== root.getSourceFile()) {
        return []
      }

      let currentParent: ts.Node | undefined = decl
      let isFreeVariable = true

      while (currentParent) {
        if (currentParent === root) {
          isFreeVariable = false

          break
        }

        currentParent = currentParent.parent
      }

      if (isFreeVariable) {
        const found = [node as ts.Identifier | ts.PropertyAccessExpression]

        // A free variable bound to a nested function drags that function's
        // own free variables along: the parent's captures dict must carry
        // them, because the child's call-site capture object is emitted
        // inside the parent's scope.
        if (
          ts.isFunctionDeclaration(decl) ||
          ts.isArrowFunction(decl) ||
          ts.isFunctionExpression(decl)
        ) {
          found.push(...getFreeVariables(decl.body, decl, props))
        }

        return found
      } else {
        return []
      }
    } else {
      if (node.kind === SyntaxKind.Identifier) {
        // Expressions like this.get_node("HBoxContainer/BuildButton").visible give
        // "no symbol" logs. I don't understand why
        console.error(node.getText(), "no symbol")
      }
    }

    return []
  }

  let result: (ts.Identifier | ts.PropertyAccessExpression)[][] = []

  ts.forEachChild(node, (ch) => {
    result.push(getFreeVariables(ch, root, props))
  })

  return result.flat()
}

export const getCapturedScope = (
  node: ts.ArrowFunction | ts.FunctionDeclaration,
  props: ParseState
): {
  capturedScopeObject: string
  unwrapCapturedScope: string
} => {
  const freeVariables = getFreeVariables(node.body, node, props)
  const uniqueFreeVariables = freeVariables.filter(
    (item, index) =>
      freeVariables.findIndex((obj) => obj.getText() === item.getText()) ===
      index
  )

  // We don't want to capture `this` as part of our scope. There's no reason to
  // do it: lambdas are only ever executed in the current class, so `this` will
  // never be different. Plus, we'd have to rewrite all `this` access in the
  // function to be `_self`, which would be confusing, and look stupid, and
  // basically be a completely pointless workaround.
  const freeVariablesWithoutThis = uniqueFreeVariables.filter(
    (v) => v.getText() !== "this"
  )

  // Symbols whose references rewrite themselves (imported bindings, nested
  // function declarations, function declarations as values) must not be
  // captured: their body references never read the unwrapped local, and the
  // capture entry would emit a bare, undeclared identifier.
  const selfResolving = (
    freeVar: ts.Identifier | ts.PropertyAccessExpression
  ) => {
    if (freeVar.kind !== SyntaxKind.Identifier) {
      return false
    }

    const symbol = props.program.getTypeChecker().getSymbolAtLocation(freeVar)

    if (!symbol) {
      return false
    }

    if (props.importedBindings?.has(symbol)) {
      return true
    }

    if (props.nestedFunctionBindings?.has(symbol)) {
      return true
    }

    const decl = symbol.declarations?.[0]

    return (
      !!decl && ts.isFunctionDeclaration(decl) && !!decl.name && !!decl.body
    )
  }

  const capturedVariables = freeVariablesWithoutThis.filter(
    (freeVar) => !selfResolving(freeVar)
  )

  const getNodeName = (node: ts.Node) => {
    // Captured names must match the references inside the emitted body,
    // which resolve through the scope (and may be renamed, e.g. a local or
    // parameter whose source name is a GDScript keyword). Fall back to the
    // source text when the declaration has not been registered yet.
    if (ts.isIdentifier(node)) {
      const scopeName = props.scope.getName(node)

      if (scopeName) {
        return scopeName
      }
    }

    return node.getText()
  }

  const capturedScopeObject =
    "{" +
    capturedVariables
      .map((freeVar) => `"${getNodeName(freeVar)}": ${getNodeName(freeVar)}`)
      .join(", ") +
    "}"

  const unwrapCapturedScope = capturedVariables
    .map((v) => `  var ${getNodeName(v)} = captures.${getNodeName(v)}\n`)
    .join("")

  return {
    capturedScopeObject,
    unwrapCapturedScope,
  }
}

/**
 * Whether a node subtree references `this`. Nested function expressions and
 * declarations bind their own this and stop the search; nested arrows share
 * the enclosing lexical this and keep it going.
 */
const referencesThis = (root: ts.Node): boolean => {
  let found = false

  const walk = (n: ts.Node): void => {
    if (found) {
      return
    }

    if (n.kind === SyntaxKind.ThisKeyword) {
      found = true

      return
    }

    if (
      ts.isFunctionDeclaration(n) ||
      ts.isFunctionExpression(n) ||
      ts.isMethodDeclaration(n)
    ) {
      return
    }

    ts.forEachChild(n, walk)
  }

  walk(root)

  return found
}

// We emit all arrow functions as a tuple of [function object, closed-over
// variables]. (Previously, when we passed an arrow function to another
// function, we were just passing in captured variables as a second argument,
// but this gets messy and complicated when we pass function arguments through
// multiple functions.)
export const parseArrowFunction = (
  node: ts.ArrowFunction,
  props: ParseState
): ParseNodeType => {
  const name = props.scope.createUniqueName()

  const { unwrapCapturedScope } = getCapturedScope(node, props)

  // Arrows whose body references this bind to the enclosing instance, so
  // they hoist as instance functions; everything else hoists static so it
  // can be targeted by callables from static contexts as well. Inside a
  // static function `self` is unavailable, so the callable targets the
  // class itself.
  const isInstanceBound = referencesThis(node.body)
  const funcKind = isInstanceBound ? "func" : "static func"

  const callableTarget = isInstanceBound
    ? "self"
    : props.inStaticContext && props.moduleClassName
    ? props.moduleClassName
    : "self"

  props.scope.enterScope()

  // Parameters are parsed before the body so that references inside the
  // body resolve through the scope to the parameters' emitted (possibly
  // renamed) names; parsing the body first would resolve those references
  // before the parameter names are registered, leaking source text.
  let parsed = combine({
    parent: node,
    nodes: [...node.parameters, node.body],
    props,
    addIndent: true,
    parsedObjs: (...allParsed) => {
      const bodyParsed = allParsed[allParsed.length - 1]
      const argParsed = allParsed.slice(0, -1)
      const signature = ensureOptionalParametersLast(
        [...argParsed.map((a) => a.content), "captures"].join(", ")
      )

      if (node.body.kind === SyntaxKind.Block) {
        return `
${funcKind} ${name}(${signature}):
${unwrapCapturedScope}
  ${bodyParsed.content.trim() === "" ? "pass" : bodyParsed.content}
        `
      } else {
        // Single line arrow function, with implicit return. Hoisted
        // intermediate lines produced while parsing the body expression
        // belong inside the generated function, before the implicit return,
        // since the body references the names they declare.
        const extra = bodyParsed.extraLines ?? []
        const before = extra
          .filter((line) => line.type === "before")
          .map((line) => "  " + line.line)
          .join("\n")
        bodyParsed.extraLines = extra.filter((line) => line.type !== "before")

        return `
${funcKind} ${name}(${signature}):
${unwrapCapturedScope}${before ? "\n" + before : ""}
  return ${bodyParsed.content}
        `
      }
    },
  })

  props.scope.leaveScope()

  const decls = props.program.getTypeChecker().getTypeAtLocation(node)
    .symbol?.declarations

  if (!decls) {
    addError({
      error: ErrorName.DeclarationNotGiven,
      location: node,
      stack: new Error().stack ?? "",
      description: `
Declaration not provided for arrow function. This is an internal ts2gd bug. Please report it. 
        `,
    })
  }

  const capturedScopeObject = decls
    ? getCapturedScope(decls[0] as ts.ArrowFunction, props).capturedScopeObject
    : "{}"

  return {
    content: `[Callable(${callableTarget}, "${name}"), ${capturedScopeObject}]`,
    hoistedLibraryFunctions: parsed.hoistedLibraryFunctions,
    hoistedArrowFunctions: [
      {
        name,
        node,
        content: parsed.content,
      },
      ...(parsed.hoistedArrowFunctions ?? []),
    ],
  }
}

export const testPropertyArrowBoundToInstance: Test = {
  ts: `
export class Loop {
  running: bool = false

  private frame = (now: float): void => {
    if (!this.running) {
      return
    }
  }
}
  `,
  expected: `
class_name Loop
func __gen(_now: float, captures):
  if not self.running:
    return
var running = false
var frame = [Callable(self, "__gen"), {}]
  `,
}

export const testPropertyArrowStaticWhenNoThis: Test = {
  ts: `
export class Maker {
  make = (n: int): int => n * 2
}
  `,
  expected: `
class_name Maker
static func __gen(n: int, captures):
  return n * 2
var make = [Callable(self, "__gen"), {}]
  `,
}

export const testTransitiveNestedFunctionCaptures: Test = {
  ts: `
export function outer(): boolean {
  let playhead = 0;
  let playRate = 1;
  function crossed(frame: number): boolean {
    return playhead >= frame && playhead - playRate < frame;
  }
  function footsteps(): boolean {
    return crossed(3);
  }
  return footsteps();
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __nested_crossed(frame: float, captures):
  var playhead = captures.playhead
  var playRate = captures.playRate
  return playhead >= frame and playhead - playRate < frame
static func __nested_footsteps(captures):
  var playhead = captures.playhead
  var playRate = captures.playRate
  return __nested_crossed(3, {"playhead": playhead, "playRate": playRate})
static func outer():
  var playhead: int = 0
  var playRate: int = 1
  return __nested_footsteps({"playhead": playhead, "playRate": playRate})
`,
}

export const testShorthandPropertyCaptured: Test = {
  ts: `
export function outer(ctx: { rng: () => number; stats: number }): number {
  const { rng, stats } = ctx;
  let A = 2;
  function resolve(state: number): number {
    return consume(state, A, { stats, rng, atp: stats * 2 });
  }
  function consume(s: number, a: number, o: { stats: number; rng: () => number; atp: number }): number {
    return stats + s + a + (o.atp > 0 ? 1 : 0);
  }
  return resolve(1) + stats;
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __nested_resolve(state: float, captures):
  var stats = captures.stats
  var A = captures.A
  var rng = captures.rng
  return __nested_consume(state, A, { "stats": stats, "rng": rng, "atp": stats * 2 }, {"stats": stats})
static func __nested_consume(s: float, a: float, o, captures):
  var stats = captures.stats
  return stats + s + a + (1 if o.atp > 0 else 0)
static func outer(ctx):
  var __gen = ctx
  var rng = __gen.rng
  var stats = __gen.stats
  var A: int = 2
  return __nested_resolve(1, {"stats": stats, "A": A, "rng": rng}) + stats
`,
}

export const testArrowBodyHoistsNullableIntermediate: Test = {
  ts: `
interface Shape { kind: string; demo?: { kind: string } | null }

function apply(f: (b: Shape) => boolean, b: Shape): boolean {
  return f(b);
}

export function check(b: Shape): boolean {
  return apply(b2 => b2.kind === "x" && b2.demo?.kind === "type1", b);
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __gen(b2, captures):
  var __gen1 = b2.demo
  return b2.kind == "x" and (__gen1.kind if __gen1 != null else null) == "type1"

static func apply(f, b):
  return f[0].call(b, f[1])

static func check(b):
  return apply([Callable(__Mod_Test_4064or, "__gen"), {}], b)
`,
}

export const testArrowSelfParamReferencesResolve: Test = {
  ts: `
export function outer(): void {
  function fly(self: { x: number }, tx: number): void {
    print(self.x + tx)
  }
  const step = (self: { x: number }, tx: number): void => {
    fly(self, tx)
  }
  step({ x: 1 }, 2)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __nested_fly(self_, tx: float, captures):
  print(self_.x + tx)
static func __gen(self_, tx: float, captures):
  __nested_fly(self_, tx, {})
static func outer():
  var step = [Callable(__Mod_Test_4064or, "__gen"), {}]
  step[0].call({ "x": 1 }, 2, step[1])
  `,
}

export const testCapturedKeywordNameUsesScopeName: Test = {
  ts: `
export function pick(): boolean {
  let floor = 3.5
  const match = (r: { f: number }) => r.f == floor
  return match({ f: 3.5 })
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __gen(r, captures):
  var floor_ = captures.floor_
  return r.f == floor_
static func pick():
  var floor_: float = 3.5
  var match_ = [Callable(__Mod_Test_4064or, "__gen"), {"floor_": floor_}]
  return match_[0].call({ "f": 3.5 }, match_[1])
  `,
}
