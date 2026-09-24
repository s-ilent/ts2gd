import ts, { SyntaxKind } from "typescript"

import { ErrorName, addError } from "../errors"
import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { ensureOptionalParametersLast } from "../ts_utils"

import { LibraryFunctions } from "./library_functions"

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
/**
 * Walk an expression's children for free variables. Property names are
 * members of the base's type rather than variables, so a property access
 * contributes only its base side; element-access arguments are value
 * positions and do contribute.
 */
const walkFreeVariableChildren = (
  node: ts.Node,
  root: ts.ArrowFunction | ts.FunctionDeclaration | ts.FunctionExpression,
  props: ParseState
): (ts.Identifier | ts.PropertyAccessExpression)[] => {
  const result: (ts.Identifier | ts.PropertyAccessExpression)[][] = []

  ts.forEachChild(node, (child) => {
    if (
      ts.isPropertyAccessExpression(node) &&
      child === (node as ts.PropertyAccessExpression).name
    ) {
      return
    }

    result.push(getFreeVariables(child, root, props))
  })

  return result.flat()
}

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
    let base: ts.Node = node

    while (ts.isPropertyAccessExpression(base)) {
      base = (base as ts.PropertyAccessExpression).expression
    }

    // The shortcut above only applies when the chain bottoms out at an
    // identifier. Chains rooted in other expressions (call results, element
    // accesses, `this`, `super`) may hold free variables of their own — the
    // call arguments inside `map.get(key).first()` being the canonical case
    // — so walk the whole expression instead of dropping the subtree.
    if (!ts.isIdentifier(base)) {
      // `import.meta` / `new.target` are keywords, not variable references.
      if (base.kind === SyntaxKind.MetaProperty) {
        return []
      }

      return walkFreeVariableChildren(node, root, props)
    }

    const symbol = props.program.getTypeChecker().getSymbolAtLocation(base)

    // A shorthand property (`{ rng }`) names a binding; the checker reports
    // a synthesized symbol for the property itself, which breaks the
    // declaration walk below. Resolve through the value symbol instead.
    const shorthandValueSymbol =
      base.parent &&
      ts.isShorthandPropertyAssignment(base.parent) &&
      (base.parent as ts.ShorthandPropertyAssignment).name === base
        ? props.program
            .getTypeChecker()
            .getShorthandAssignmentValueSymbol(
              base.parent as ts.ShorthandPropertyAssignment
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
          location: base,
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
        const found = [base as ts.Identifier | ts.PropertyAccessExpression]

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
      if (base.kind === SyntaxKind.Identifier) {
        // Expressions like this.get_node("HBoxContainer/BuildButton").visible give
        // "no symbol" logs. I don't understand why
        console.error(base.getText(), "no symbol")
      }
    }

    return []
  }

  return walkFreeVariableChildren(node, root, props)
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

    const checker = props.program.getTypeChecker()

    const shorthandParent =
      freeVar.parent &&
      ts.isShorthandPropertyAssignment(freeVar.parent) &&
      (freeVar.parent as ts.ShorthandPropertyAssignment).name === freeVar
        ? (freeVar.parent as ts.ShorthandPropertyAssignment)
        : undefined

    // A shorthand (`{ step }`) reports the contextual property symbol at its
    // identifier; resolve through the value symbol so the checks below see
    // the same declaration the reference site's rewrite is keyed on.
    const symbol = shorthandParent
      ? checker.getShorthandAssignmentValueSymbol(shorthandParent) ??
        checker.getSymbolAtLocation(freeVar)
      : checker.getSymbolAtLocation(freeVar)

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

      // Parameter parsing hoists lines that belong at the top of the
      // generated function: destructured bindings (`var mode = __gen.mode`),
      // default-value fallbacks (`n = (3 if ... else n)`) and any
      // intermediate lines the default expressions themselves hoisted.
      // Dropping them leaves the body — and the captures dicts of nested
      // lifted callables — referencing names that were never declared.
      const paramLines = argParsed
        .flatMap((a) => a.extraLines ?? [])
        .map((l) => "  " + l.line)
      const paramBlock = paramLines.length ? paramLines.join("\n") + "\n" : ""

      if (node.body.kind === SyntaxKind.Block) {
        return `
${funcKind} ${name}(${signature}):
${unwrapCapturedScope}${paramBlock}  ${
          bodyParsed.content.trim() === "" ? "pass" : bodyParsed.content
        }
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
${unwrapCapturedScope}${paramBlock}${
          before ? "\n" + before + "\n" : ""
        }  return ${bodyParsed.content}
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

export const testCapturesThroughChainedCallArguments: Test = {
  ts: `
const RINGS: Map<number, number | undefined> = new Map()

export function createBrain(ctx: { scope: number }): void {
  function ring(id: number): number | undefined {
    return RINGS.get(ctx.scope)?.get(id);
  }
  ring(1);
}
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.ts_new_map.definition("__ts_new_map")}
static func __nested_ring(id: float, captures):
  var RINGS = captures.RINGS
  var ctx = captures.ctx
  var __gen = RINGS.ts_get(ctx.scope)
  return (__gen.get if __gen != null else null).call(id)
static var RINGS = __ts_new_map()
static func createBrain(ctx):
  __nested_ring(1, {"RINGS": RINGS, "ctx": ctx})
  `,
}

export const testShorthandNestedFunctionNotCaptured: Test = {
  ts: `
interface Opts { onEnter(): void; step(e: unknown, tx: number, tz: number): void }
function run(e: unknown, o: Opts): boolean { void e; void o; return true }
export function factory(enemy: { hp: number }): void {
  let swipeResolved = false
  function step(e: unknown, tx: number, tz: number): void { void e; void tx; void tz }
  function tick(state: unknown, e: unknown): boolean {
    const r = run(e, { onEnter: () => { swipeResolved = false }, step })
    return r
  }
  tick({}, {})
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __nested_step(e, tx: float, tz: float, captures):
  null
  null
  null
static func __nested_tick(_state, e, captures):
  var swipeResolved = captures.swipeResolved
  var r = run(e, { "onEnter": [Callable(__Mod_Test_4064or, "__gen"), {"swipeResolved": swipeResolved}], "step": [Callable(__Mod_Test_4064or, "__nested_step"), {}] })
  return r
static func __gen(captures):
  var swipeResolved = captures.swipeResolved
  swipeResolved = false
static func run(e, o):
  null
  null
  return true
static func factory(_enemy):
  var swipeResolved = false
  __nested_tick({}, {}, {"swipeResolved": swipeResolved})
  `,
}

export const testArrowDestructuredParameterBindings: Test = {
  ts: `
type Factory = (enemy: { hp: number }, opts: { mode: string; players: number }) => { tick: (s: number, e: number) => boolean }
export const makeBrain: Factory = (enemy, { mode, players }) => {
  let initialized = false
  function tick(state: number, e: number): boolean {
    if (!initialized) { initialized = true }
    return mode === "multi" && e > players
  }
  return { tick }
}
void makeBrain
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or


static func __gen(_enemy, __gen1, captures):
  var mode = __gen1.mode
  var players = __gen1.players
  var initialized = false
  
  return { "tick": [Callable(__Mod_Test_4064or, "__nested_tick"), {"initialized": initialized, "mode": mode, "players": players}] }
static func __nested_tick(_state: float, e: float, captures):
  var initialized = captures.initialized
  var mode = captures.mode
  var players = captures.players
  if not initialized:
    initialized = true
  
  return mode == "multi" and e > players


static var makeBrain = [Callable(__Mod_Test_4064or, "__gen"), {}]

static func _static_init():
  null
`,
}

export const testArrowParameterDefaultInitializers: Test = {
  ts: `
interface State { quest?: { run?: { npcRegisters: number[] } | null } }
export const visible = (state: State, registers: number[] | undefined = state.quest?.run?.npcRegisters): boolean => {
  return registers != null
}
void visible
  `,
  expected: `
# This file has been autogenerated by ts2gd. DO NOT EDIT!


class_name __Mod_Test_4064or


static func __gen(state, registers = "[no value passed in]", captures = null):
  var __gen1 = state.quest
  var __gen2 = (__gen1.run if __gen1 != null else null)
  registers = ((__gen2.npcRegisters if __gen2 != null else null) if (typeof(registers) == TYPE_STRING and registers == "[no value passed in]") else registers)
  return registers != null

static var visible = [Callable(__Mod_Test_4064or, "__gen"), {}]

static func _static_init():
  null
`,
}
