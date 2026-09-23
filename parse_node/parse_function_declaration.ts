import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { ensureOptionalParametersLast } from "../ts_utils"
import { Test } from "../tests/test"

import { getCapturedScope } from "./parse_arrow_function"

/**
 * A function declaration is nested when it appears inside another function
 * body rather than at module or class level. GDScript has no local function
 * declarations, so these are hoisted to file-level static functions.
 */
const isNestedFunctionDeclaration = (node: ts.FunctionDeclaration): boolean => {
  let parent = node.parent

  while (parent) {
    if (
      ts.isSourceFile(parent) ||
      ts.isModuleBlock(parent) ||
      ts.isClassDeclaration(parent)
    ) {
      return false
    }

    if (ts.isFunctionLike(parent)) {
      return true
    }

    parent = parent.parent
  }

  return false
}

/**
 * Walk a source file and register every nested function declaration so that
 * references which appear textually before the declaration (function
 * declarations are hoisted in JS) still resolve.
 */
export const registerNestedFunctionBindings = (
  root: ts.SourceFile,
  props: ParseState
): void => {
  const bindings = new Map<ts.Symbol, { name: string; captures: string }>()

  props.nestedFunctionBindings = bindings

  const visit = (node: ts.Node): void => {
    if (
      ts.isFunctionDeclaration(node) &&
      node.body &&
      node.name &&
      isNestedFunctionDeclaration(node)
    ) {
      const symbol = props.program
        .getTypeChecker()
        .getSymbolAtLocation(node.name)

      if (symbol && !bindings.has(symbol)) {
        const uniqueName = props.scope.createUniqueNameWithBase(
          `__nested_${node.name.text}`
        )
        const { capturedScopeObject } = getCapturedScope(node, props)

        bindings.set(symbol, {
          name: uniqueName,
          captures: capturedScopeObject,
        })
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(root)
}

/**
 * Module-level function declarations. These are emitted as static functions so
 * that they stay callable through the script resource from other files (a
 * plain file-level function in GDScript is a member of the file's implicit
 * class, and non-static members are not reachable without an instance).
 *
 * Nested (inner) function declarations are hoisted to file level as static
 * functions with a generated name; their references (including recursive and
 * forward ones) rewrite to [Callable, captures] tuples so closed-over
 * variables travel with the function value.
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

  const nestedBinding = (() => {
    const symbol = props.program
      .getTypeChecker()
      .getSymbolAtLocation(node.name!)

    return symbol && props.nestedFunctionBindings?.has(symbol)
      ? props.nestedFunctionBindings.get(symbol)!
      : undefined
  })()

  const funcName = nestedBinding ? nestedBinding.name : node.name.text

  props.scope.enterScope()

  const previousStaticContext = props.inStaticContext
  props.inStaticContext = true

  const compiledParameters = combine({
    parent: node,
    nodes: node.parameters,
    props,
    parsedStrings: (...params) => params.join(", "),
  })

  const { unwrapCapturedScope } = nestedBinding
    ? getCapturedScope(node, props)
    : { unwrapCapturedScope: "" }

  const result = combine({
    parent: node,
    nodes: [node.body],
    props,
    addIndent: true,
    parsedStrings: (body) => {
      const joinedParams = ensureOptionalParametersLast(
        [compiledParameters.content, ...(nestedBinding ? ["captures"] : [])]
          .filter((part) => part !== "")
          .join(", ")
      )

      // Each unwrap line is indented with the rest of the body; the source
      // lines already carry their own base indentation.
      const unwrapLines =
        unwrapCapturedScope !== ""
          ? unwrapCapturedScope
              .split("\n")
              .map((l) => l.trim())
              .filter((l) => l !== "")
          : []

      let bodyLines = [
        ...(compiledParameters.extraLines?.map((param) => param.line) ?? []),
        ...unwrapLines,
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
  props.inStaticContext = previousStaticContext

  if (nestedBinding) {
    // The declaration site emits nothing; the hoisted function carries it.
    return {
      content: "",
      hoistedArrowFunctions: [
        {
          name: nestedBinding.name,
          content: result.content,
          node,
        },
        ...(result.hoistedArrowFunctions ?? []),
      ],
    }
  }

  return result
}

export const testTopLevelFunction: Test = {
  ts: `
function doThing(x: int): int {
  return x * 2
}
  `,
  expected: `
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
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
class_name __Mod_Test_4064or
static func greet(name = "[no value passed in]"):
  name = ("world" if (typeof(name) == TYPE_STRING and name == "[no value passed in]") else name)
  return "hi " + name
  `,
}

export const testAwaitExpression: Test = {
  ts: `
async function loadThing(): Promise<int> {
  return 5
}

function useThing(): int {
  return await loadThing()
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func loadThing():
  return 5
static func useThing():
  return await loadThing()
  `,
}

export const testOptionalParamsLast: Test = {
  ts: `
export function mix(a = 1, b: int): int {
  return a + b
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func mix(a = "[no value passed in]", b: int = null):
  a = (1 if (typeof(a) == TYPE_STRING and a == "[no value passed in]") else a)
  return a + b
  `,
}

export const testNestedFunctionHoistsWithCaptures: Test = {
  ts: `
export function outer(base: int): int {
  let extra = 10

  function add(x: int): int {
    return x + extra + base
  }

  return add(5)
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __nested_add(x: int, captures):
  var extra = captures.extra
  var base = captures.base
  return x + extra + base
static func outer(base: int):
  var extra: int = 10
  return __nested_add(5, {"extra": extra, "base": base})
  `,
}

export const testNestedFunctionForwardReference: Test = {
  ts: `
export function outer(): int {
  return helper() + 1

  function helper(): int {
    return 2
  }
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __nested_helper(captures):
  return 2
static func outer():
  return __nested_helper({}) + 1
  `,
}

export const testNestedFunctionSameNameInSiblings: Test = {
  ts: `
export function first(): int {
  function run(): int {
    return 1
  }
  return run()
}

export function second(): int {
  function run(): int {
    return 2
  }
  return run()
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func __nested_run(captures):
  return 1
static func __nested_run1(captures):
  return 2
static func first():
  return __nested_run({})
static func second():
  return __nested_run1({})
  `,
}
