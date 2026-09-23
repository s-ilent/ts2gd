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
  root: ts.ArrowFunction | ts.FunctionDeclaration,
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

    if (symbol) {
      if (!symbol.declarations || symbol.declarations.length === 0) {
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
      const decl = symbol.declarations[0]

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
        return [node as ts.Identifier | ts.PropertyAccessExpression]
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
    const text = node.getText()

    return text
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

  let parsed = combine({
    parent: node,
    nodes: [node.body, ...node.parameters],
    props,
    addIndent: true,
    parsedStrings: (body, ...args) => {
      const signature = ensureOptionalParametersLast(
        [...args, "captures"].join(", ")
      )

      if (node.body.kind === SyntaxKind.Block) {
        return `
${funcKind} ${name}(${signature}):
${unwrapCapturedScope}
  ${body.trim() === "" ? "pass" : body}
        `
      } else {
        // Single line arrow function, with implicit return.

        return `
${funcKind} ${name}(${signature}):
${unwrapCapturedScope}
  return ${body}
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
