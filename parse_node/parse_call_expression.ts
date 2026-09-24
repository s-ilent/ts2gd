import ts, { SyntaxKind } from "typescript"

import { ErrorName, addError } from "../errors"
import {
  ExtraLine,
  ExtraLineType,
  ParseState,
  combine,
  parseNode,
  ParseNodeType,
} from "../parse_node"
import { Test } from "../tests/test"
import { isArrayType, isDictionary, isNullableNode } from "../ts_utils"

import { LibraryFunctionName, LibraryFunctions } from "./library_functions"
import { getCapturedScope } from "./parse_arrow_function"

/**
 * Typed-array static factories map onto generated copying helpers.
 */
const typedArrayFromShims: Record<string, LibraryFunctionName> = {
  Int32Array: "ts_int32_from",
  Float32Array: "ts_new_float32",
  Float64Array: "ts_new_float64",
  Uint8Array: "ts_new_uint8",
}

type CalleeRestInfo = {
  isRest: boolean
  /** Number of non-rest parameters preceding the rest parameter. */
  fixedCount: number
  /** True when the callee takes only a rest parameter. */
  pureRest: boolean
}

const resolveCalleeRestInfo = (
  expression: ts.Expression,
  props: ParseState
): CalleeRestInfo | null => {
  const checker = props.program.getTypeChecker()

  let symbol: ts.Symbol | undefined

  if (ts.isIdentifier(expression)) {
    symbol = checker.getSymbolAtLocation(expression)
  } else if (ts.isPropertyAccessExpression(expression)) {
    symbol = checker.getSymbolAtLocation(expression.name)
  }

  const decl = symbol?.declarations?.[0]

  if (!decl) {
    return null
  }

  // Godot API and standard library declarations live in .d.ts files and
  // already have dedicated emitters; only user code needs rest folding.
  if (decl.getSourceFile().fileName.endsWith(".d.ts")) {
    return null
  }

  // Hoisted nested functions take a trailing captures argument; their call
  // sites are handled by the dedicated dispatch below.
  if (symbol && props.nestedFunctionBindings?.has(symbol)) {
    return null
  }

  if (
    !ts.isFunctionDeclaration(decl) &&
    !ts.isMethodDeclaration(decl) &&
    !ts.isFunctionExpression(decl) &&
    !ts.isArrowFunction(decl)
  ) {
    return null
  }

  const parameters = decl.parameters

  if (!parameters.some((p) => p.dotDotDotToken)) {
    return null
  }

  return {
    isRest: true,
    fixedCount: parameters.length - 1,
    pureRest: parameters.length === 1,
  }
}

// The plain textual form of a call target when the callee is a function
// declaration or hoisted nested function; null otherwise. Function
// identifiers parse as callables tuples in value positions, which is the
// wrong shape for a call target, so those two cases stay plain names.
const plainCalleeName = (
  expression: ts.Expression,
  props: ParseState
): string | null => {
  if (!ts.isIdentifier(expression)) {
    return null
  }

  const symbol = props.program.getTypeChecker().getSymbolAtLocation(expression)

  if (symbol && props.nestedFunctionBindings?.has(symbol)) {
    return props.nestedFunctionBindings.get(symbol)!.name
  }

  const decl = symbol?.declarations?.[0]

  if (
    decl &&
    ts.isFunctionDeclaration(decl) &&
    decl.name &&
    decl.body &&
    !(symbol && props.importedBindings?.has(symbol))
  ) {
    return decl.name.text
  }

  return null
}

type ArgGroup = {
  spread: boolean
  elements: ts.Expression[]
}

// Groups call arguments into consecutive plain and spread runs, unwrapping
// spread elements into their inner expressions.
const buildArgGroups = (args: readonly ts.Expression[]): ArgGroup[] => {
  const groups: ArgGroup[] = []

  for (const arg of args) {
    const spread = ts.isSpreadElement(arg)
    const inner = spread ? (arg as ts.SpreadElement).expression : arg
    const last = groups[groups.length - 1]

    if (last && last.spread === spread) {
      last.elements.push(inner)
    } else {
      groups.push({ spread, elements: [inner] })
    }
  }

  return groups
}

// Folds parsed argument groups into one GDScript array expression. Spread
// groups contribute their elements directly; plain groups become array
// literals.
const foldArgGroups = (
  groups: ArgGroup[],
  parsed: readonly string[],
  copyLoneSpread = true
): string => {
  let index = 0
  let accumulator: string | null = null

  for (const group of groups) {
    const slice = parsed.slice(index, index + group.elements.length)
    index += group.elements.length

    const part = group.spread ? slice.join(", ") : `[${slice.join(", ")}]`

    accumulator =
      accumulator === null ? part : `__ts_array_concat(${accumulator}, ${part})`
  }

  // A lone spread passes the array itself, which must not alias whatever
  // list the callee retains, so it goes through a copy. Consumers that
  // immediately reduce the array (Math.max/min) can skip it.
  if (
    copyLoneSpread &&
    accumulator !== null &&
    groups.length === 1 &&
    groups[0].spread
  ) {
    accumulator = `__ts_array_concat([], ${accumulator})`
  }

  return accumulator ?? "[]"
}

const argGroupsNeedConcat = (groups: ArgGroup[]): boolean => {
  return groups.length > 1 || (groups.length === 1 && groups[0].spread)
}

/**
 * Groups call arguments into consecutive plain and spread runs, then folds
 * them into a single GDScript array expression. Spread groups contribute
 * their elements directly; plain groups become array literals.
 */
const foldSpreadGroups = (
  args: readonly (ts.Expression | ts.SpreadElement)[],
  parsed: readonly string[]
): string => {
  const groups: { spread: boolean; count: number }[] = []

  for (const arg of args) {
    const spread = ts.isSpreadElement(arg)
    const last = groups[groups.length - 1]

    if (last && last.spread === spread) {
      last.count += 1
    } else {
      groups.push({ spread, count: 1 })
    }
  }

  let index = 0
  let accumulator: string | null = null

  for (const group of groups) {
    const slice = parsed.slice(index, index + group.count)
    index += group.count

    const part = group.spread ? slice.join(", ") : `[${slice.join(", ")}]`

    accumulator =
      accumulator === null ? part : `__ts_array_concat(${accumulator}, ${part})`
  }

  // A lone spread passes the array itself, which must not alias the
  // callee's stored argument list, so it goes through a copy.
  if (accumulator !== null && groups[0].spread && groups.length === 1) {
    accumulator = `__ts_array_concat([], ${accumulator})`
  }

  return accumulator ?? "[]"
}

const countSpreadGroups = (
  args: readonly (ts.Expression | ts.SpreadElement)[]
): number => {
  let groups = 0
  let previous: boolean | null = null

  for (const arg of args) {
    const spread = ts.isSpreadElement(arg)

    if (spread && previous !== true) {
      groups += 1
    }

    previous = spread
  }

  return groups
}

export const parseCallExpression = (
  node: ts.CallExpression,
  props: ParseState
): ParseNodeType => {
  let expression = node.expression
  let args = node.arguments

  // Number(x) conversions compile to a hoisted helper.
  if (expression.kind === SyntaxKind.Identifier) {
    const calleeName = (expression as ts.Identifier).text

    if (calleeName === "Number") {
      const result = combine({
        parent: node,
        nodes: [...args],
        props,
        parsedStrings: (...parsed) => `__ts_number(${parsed.join(", ")})`,
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add("ts_number")

      return result
    }
  }

  if (node.expression.kind === SyntaxKind.SuperKeyword) {
    return combine({
      parent: node,
      nodes: node.expression,
      props,
      parsedStrings: () => "",
    })
  }

  const calleeRestInfo = resolveCalleeRestInfo(node.expression, props)
  const hasSpreadArgs = args.some((a) => ts.isSpreadElement(a))

  if (calleeRestInfo) {
    // Functions declaring a rest parameter receive their trailing arguments
    // as a single array in GDScript, which has no variadic signatures.
    // Calls pass the fixed arguments normally and fold the remainder into
    // one array expression.
    const fixedCount = calleeRestInfo.fixedCount
    const firstSpread = args.findIndex((a) => ts.isSpreadElement(a))

    if (firstSpread >= 0 && firstSpread < fixedCount) {
      addError({
        error: ErrorName.UnknownTsSyntax,
        location: node,
        stack: new Error().stack ?? "",
        description: `Spread arguments cannot cross the boundary between fixed and rest parameters in this call:\n\n${node.getText()}`,
      })

      return combine({
        parent: node,
        nodes: [],
        props,
        parsedStrings: () => "",
      })
    }

    if (hasSpreadArgs || args.length > fixedCount) {
      const fixedGroups = buildArgGroups(args.slice(0, fixedCount))
      const restGroups = buildArgGroups(args.slice(fixedCount))
      const plainName = plainCalleeName(node.expression, props)
      const fixedNodes = fixedGroups.flatMap((g) => g.elements)
      const restNodes = restGroups.flatMap((g) => g.elements)

      const result = combine({
        parent: node,
        nodes: [
          ...(plainName !== null ? [] : [node.expression]),
          ...fixedNodes,
          ...restNodes,
        ],
        props,
        parsedStrings: (...parsed) => {
          const offset = plainName !== null ? 0 : 1
          const target = plainName !== null ? plainName! : parsed[0]
          const fixedParsed = parsed.slice(offset, offset + fixedNodes.length)
          const restParsed = parsed.slice(offset + fixedNodes.length)
          const folded = foldArgGroups(restGroups, restParsed)

          return `${target}(${[...fixedParsed, folded].join(", ")})`
        },
      })

      if (argGroupsNeedConcat(restGroups)) {
        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add("array_concat")
      }

      return result
    }
  } else if (hasSpreadArgs) {
    // Spread arguments compile to callv over one concatenated argument
    // array. Math.max/min are variadic GDScript globals rather than
    // callables, so they fold onto Array.max()/Array.min() instead.
    const mathExtreme =
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      (node.expression.expression as ts.Identifier).text === "Math" &&
      (node.expression.name.text === "max" ||
        node.expression.name.text === "min")

    const groups = buildArgGroups(args)

    if (mathExtreme) {
      const method =
        (node.expression as ts.PropertyAccessExpression).name.text === "max"
          ? "max()"
          : "min()"

      const result = combine({
        parent: node,
        nodes: groups.flatMap((g) => g.elements),
        props,
        parsedStrings: (...parsed) =>
          `${foldArgGroups(groups, parsed, false)}.${method}`,
      })

      if (argGroupsNeedConcat(groups)) {
        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add("array_concat")
      }

      return result
    }

    const plainName = plainCalleeName(node.expression, props)

    const result = combine({
      parent: node,
      nodes: [
        ...(plainName !== null ? [] : [node.expression]),
        ...groups.flatMap((g) => g.elements),
      ],
      props,
      parsedStrings: (...parsed) => {
        const offset = plainName !== null ? 0 : 1
        const target = plainName !== null ? plainName! : parsed[0]
        const argParsed = parsed.slice(offset)
        const folded = foldArgGroups(groups, argParsed)

        return `${target}.callv(${folded})`
      },
    })

    if (argGroupsNeedConcat(groups)) {
      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add("array_concat")
    }

    return result
  }

  // Nested (inner) function declarations hoist to static functions that take
  // a trailing captures parameter; calls pass the captured scope directly.
  if (expression.kind === SyntaxKind.Identifier) {
    const symbol = props.program
      .getTypeChecker()
      .getSymbolAtLocation(expression)
    const nestedBinding =
      symbol && props.nestedFunctionBindings
        ? props.nestedFunctionBindings.get(symbol)
        : undefined

    if (nestedBinding) {
      return combine({
        parent: node,
        nodes: [...args],
        props,
        parsedStrings: (...parsed) =>
          `${nestedBinding.name}(${[...parsed, nestedBinding.captures()].join(
            ", "
          )})`,
      })
    }

    // Module-level function declarations stay direct calls.
    const decl = symbol?.declarations?.[0]

    if (
      decl &&
      ts.isFunctionDeclaration(decl) &&
      decl.name &&
      decl.body &&
      !(symbol && props.importedBindings?.has(symbol))
    ) {
      const funcName = decl.name.text

      return combine({
        parent: node,
        nodes: [...args],
        props,
        parsedStrings: (...parsed) => `${funcName}(${parsed.join(", ")})`,
      })
    }
  }

  // node = [[ a.b(c) ]]
  if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
    // prop = [[ a.b ]](c)
    const prop = node.expression as ts.PropertyAccessExpression
    const functionName = prop.name.getText()

    const type = props.program
      .getTypeChecker()
      .getTypeAtLocation(prop.expression)

    if (isDictionary(type)) {
      if (functionName === "entries") {
        let result = combine({
          parent: node,
          nodes: [prop.expression],
          props,
          parsedStrings: (expr) => {
            return `__entries(${[expr].join(", ")})`
          },
        })

        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add("entries")

        return result
      }
    }

    if (isArrayType(type)) {
      if (functionName in LibraryFunctions) {
        const libFunctionName = functionName as LibraryFunctionName

        let result = combine({
          parent: node,
          nodes: [prop.expression, ...args],
          props,
          parsedStrings: (expr, ...args) => {
            return `__${libFunctionName}(${[expr, ...args].join(", ")})`
          },
        })

        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add(libFunctionName)

        return result
      }
    }

    const typeAsString = props.program.getTypeChecker().typeToString(type)

    if (
      typeAsString === "Vector2Constructor" ||
      typeAsString === "Vector2iConstructor" ||
      typeAsString === "Vector3Constructor" ||
      typeAsString === "Vector3iConstructor"
    ) {
      if (
        functionName === "add" ||
        functionName === "sub" ||
        functionName === "mul" ||
        functionName === "div"
      ) {
        const libFunctionName = (functionName +
          "_vec_lib") as LibraryFunctionName

        let result = combine({
          parent: node,
          nodes: [prop.expression, ...args],
          props,
          parsedStrings: (expr, ...args) => {
            return `${libFunctionName}(${[expr, ...args].join(", ")})`
          },
        })

        result.hoistedLibraryFunctions =
          result.hoistedLibraryFunctions ?? new Set()
        result.hoistedLibraryFunctions.add(libFunctionName)

        return result
      }
    }

    // JS String/Array member methods with no GDScript member equivalent
    // map onto helpers or native members by name.
    const baseTypeAsString = props.program
      .getTypeChecker()
      .typeToString(
        props.program.getTypeChecker().getTypeAtLocation(prop.expression)
      )
    const isStringBase =
      baseTypeAsString === "String" || baseTypeAsString === "string"
    const isNumberBase = ["float", "int", "number", "Number", "Float"].includes(
      baseTypeAsString
    )

    const helperCall = (
      libName: LibraryFunctionName,
      wrapArgsInArray = false
    ) => {
      const result = combine({
        parent: node,
        nodes: [prop.expression, ...args],
        props,
        parsedStrings: (expr, ...parsed) =>
          `__${libName}(${[
            expr,
            ...(wrapArgsInArray ? ["[" + parsed.join(", ") + "]"] : parsed),
          ].join(", ")})`,
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add(libName)

      return result
    }

    if (
      functionName === "includes" &&
      (isStringBase || baseTypeAsString === "Array")
    ) {
      return helperCall("ts_includes")
    }

    if (functionName === "padStart" && isStringBase) {
      return helperCall("ts_pad_start")
    }

    if (functionName === "toString" && (isNumberBase || isStringBase)) {
      return helperCall("ts_number_to_string")
    }

    if (functionName === "startsWith" && isStringBase) {
      return combine({
        parent: node,
        nodes: [prop.expression, ...args],
        props,
        parsedStrings: (expr, ...parsed) =>
          `${expr}.begins_with(${parsed.join(", ")})`,
      })
    }

    if (functionName === "endsWith" && isStringBase) {
      return combine({
        parent: node,
        nodes: [prop.expression, ...args],
        props,
        parsedStrings: (expr, ...parsed) =>
          `${expr}.ends_with(${parsed.join(", ")})`,
      })
    }

    if (functionName === "toUpperCase" && isStringBase) {
      return combine({
        parent: node,
        nodes: [prop.expression],
        props,
        parsedStrings: (expr) => `${expr}.to_upper()`,
      })
    }

    // RegExp receivers: JS test/exec map onto GDScript RegEx.search.
    const receiverTypeString = props.program.getTypeChecker().typeToString(type)

    if (
      receiverTypeString === "RegExp" &&
      (functionName === "test" || functionName === "exec")
    ) {
      if (functionName === "test") {
        return combine({
          parent: node,
          nodes: [prop.expression, ...args],
          props,
          parsedStrings: (expr, ...parsed) =>
            `(${expr}.search(${parsed.join(", ")}) != null)`,
        })
      }

      return combine({
        parent: node,
        nodes: [prop.expression, ...args],
        props,
        parsedStrings: (expr, ...parsed) =>
          `${expr}.search(${parsed.join(", ")})`,
      })
    }

    if (functionName === "toLowerCase" && isStringBase) {
      return combine({
        parent: node,
        nodes: [prop.expression],
        props,
        parsedStrings: (expr) => `${expr}.to_lower()`,
      })
    }

    if (
      functionName === "fromCharCode" &&
      prop.expression.getText() === "String"
    ) {
      return helperCall("ts_string_from_char_code", true)
    }

    if (functionName === "isArray" && prop.expression.getText() === "Array") {
      return combine({
        parent: node,
        nodes: [...args],
        props,
        parsedStrings: (...parsed) => `(${parsed.join(", ")}) is Array`,
      })
    }

    if (functionName === "apply") {
      // f.apply(thisArg, args) spreads args onto the call; GDScript's
      // callv does the same. The thisArg is dropped - the callable already
      // carries its receiver. A pure rest-parameter callee instead takes
      // the array as its single argument.
      const callArgs = args.slice(1)
      const plainName = plainCalleeName(prop.expression, props)
      const restInfo = resolveCalleeRestInfo(prop.expression, props)

      if (callArgs.length <= 1) {
        const result = combine({
          parent: node,
          nodes: [
            ...(plainName !== null ? [] : [prop.expression]),
            ...callArgs,
          ],
          props,
          parsedStrings: (...parsed) => {
            const offset = plainName !== null ? 0 : 1
            const target = plainName !== null ? plainName! : parsed[0]
            const arrParsed = parsed.slice(offset)
            const argArray = arrParsed[0] ?? "[]"

            return restInfo?.pureRest
              ? `${target}(${argArray})`
              : `${target}.callv(${argArray})`
          },
        })

        return result
      }
    }

    if (
      functionName === "call" &&
      prop.expression.getText() === "Object.prototype.hasOwnProperty"
    ) {
      // hasOwnProperty.call(dict, key) is a plain membership check.
      return combine({
        parent: node,
        nodes: [...args],
        props,
        parsedStrings: (...parsed) =>
          `${parsed[0]}.has(${parsed.slice(1).join(", ")})`,
      })
    }

    if (functionName === "from" && prop.expression.getText() === "Array") {
      return helperCall("ts_array_from")
    }

    if (
      functionName === "from" &&
      ts.isIdentifier(prop.expression) &&
      typedArrayFromShims[(prop.expression as ts.Identifier).text]
    ) {
      const libName =
        typedArrayFromShims[(prop.expression as ts.Identifier).text]
      const result = combine({
        parent: node,
        nodes: [...args],
        props,
        parsedStrings: (...parsed) => `__${libName}(${parsed.join(", ")})`,
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add(libName)

      return result
    }

    // Array callback methods on receivers whose type is unresolved.
    // Function values travel as [Callable, captures] tuples, so callbacks
    // route through helpers that adapt them for invocation instead of
    // native members that require a bare Callable.
    const arrayCallbackShims: Record<string, [LibraryFunctionName, number]> = {
      map: ["ts_array_map", 1],
      filter: ["ts_array_filter", 1],
      sort: ["ts_array_sort", 1],
      some: ["ts_array_some", 1],
      every: ["ts_array_every", 1],
      find: ["ts_array_find", 2],
      findIndex: ["ts_array_find_index", 2],
      forEach: ["ts_array_for_each", 1],
      reduce: ["ts_array_reduce", 2],
      flatMap: ["ts_array_flat_map", 1],
    }

    if (
      functionName in arrayCallbackShims &&
      args.length >= 1 &&
      args.length <= arrayCallbackShims[functionName][1]
    ) {
      const libName = arrayCallbackShims[functionName][0]
      const result = combine({
        parent: node,
        nodes: [prop.expression, ...args],
        props,
        parsedStrings: (expr, ...parsed) =>
          `__${libName}(${[expr, ...parsed].join(", ")})`,
      })

      result.hoistedLibraryFunctions =
        result.hoistedLibraryFunctions ?? new Set()
      result.hoistedLibraryFunctions.add(libName)
      result.hoistedLibraryFunctions.add("ts_call_fn")
      result.hoistedLibraryFunctions.add("ts_truthy")

      return result
    }
  }

  // This compiles dict.put(a, b) into dict[a] = b
  if (expression.kind === SyntaxKind.PropertyAccessExpression) {
    const propAccess = expression as ts.PropertyAccessExpression

    if (
      isDictionary(
        props.program.getTypeChecker().getTypeAtLocation(propAccess.expression)
      ) &&
      propAccess.name.escapedText === "put"
    ) {
      return combine({
        parent: node,
        nodes: [propAccess.expression, args[0], args[1]],
        props,
        parsedStrings: (dict, key, val) => `${dict}[${key}] = ${val}`,
      })
    }
  }

  const decls = props.program
    .getTypeChecker()
    .getTypeAtLocation(node.expression).symbol?.declarations
  const isExpressionArrowFunction =
    decls &&
    decls[0].kind === SyntaxKind.ArrowFunction &&
    decls[0].getSourceFile() === node.getSourceFile()

  let nullCoalesce: ExtraLine[] = []

  let result = combine({
    parent: node,
    nodes: [expression, ...args],
    props,
    parsedObjs: (parsedExpr, ...parsedArgs) => {
      let parsedStringArgs: string[] = parsedArgs.map((arg) => arg.content)

      if (parsedExpr.content.endsWith("get_node_unsafe")) {
        parsedExpr.content = parsedExpr.content.replace(
          "get_node_unsafe",
          "get_node"
        )
      }

      // console.log/info/debug/warn/error map onto GDScript printing. The
      // error channel takes exactly one argument, so extra arguments are
      // stringified and joined.
      if (parsedExpr.content.startsWith("console.")) {
        const method = parsedExpr.content.slice("console.".length)

        const consolePrint = ["log", "info", "debug"].includes(method)
        const consoleError = ["warn", "error"].includes(method)

        if (consolePrint || consoleError) {
          if (consoleError) {
            const joined = parsedStringArgs
              .map((arg) => `str(${arg})`)
              .join(' + " " + ')

            parsedExpr = { content: "push_error" }
            parsedStringArgs = joined === "" ? [] : [joined]
          } else {
            parsedExpr = { content: "print" }
          }
        }
      }

      // Rewrite this.$signal.emit() to this.emit_signal("signal")
      if (parsedExpr.content.endsWith(".emit")) {
        const secondDot = parsedExpr.content.lastIndexOf(".")
        const firstDot = parsedExpr.content.lastIndexOf(".", secondDot - 1)
        let signalName = parsedExpr.content.slice(firstDot + 1, secondDot)

        if (signalName.startsWith("$")) {
          signalName = signalName.slice(1)
        }

        if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
          const pae = node.expression as ts.PropertyAccessExpression
          if (pae.expression.kind === SyntaxKind.PropertyAccessExpression) {
            const pae2 = pae.expression as ts.PropertyAccessExpression
            const expr = parseNode(pae2.expression, props)

            parsedStringArgs = [
              `"${signalName}"`,
              ...parsedArgs.map((arg) => arg.content),
            ]
            parsedExpr = {
              content: expr.content + ".emit_signal",
            }
          }
        }
      }

      // TODO - there are less brittle ways of checking for this.

      // Rewrite this.$signal.connect(() => stuff()) to this.connect(this, 'signal', method)
      if (parsedExpr.content.endsWith(".connect")) {
        if (expression.kind === SyntaxKind.PropertyAccessExpression) {
          const pae = expression as ts.PropertyAccessExpression

          if (pae.kind === SyntaxKind.PropertyAccessExpression) {
            const pae2 = pae.expression as ts.PropertyAccessExpression
            let signalName = pae2.name.getText()

            if (signalName.startsWith("$")) {
              signalName = signalName.slice(1)
            }

            if (!parsedArgs[0]) {
              addError({
                description:
                  "Missing arrow function argument in signal connect invocation.",
                error: ErrorName.Ts2GdError,
                location: expression,
                stack: new Error().stack ?? "",
              })
            } else {
              const af = args[0] as ts.ArrowFunction
              const arrowFunctionObj =
                parsedArgs[0].hoistedArrowFunctions?.find(
                  (obj) => obj.node === af
                )

              if (!arrowFunctionObj) {
                addError({
                  description:
                    "ts2gd can't find that arrow function. This is an internal ts2gd error. Please report it on GitHub along with the code that caused it.",
                  error: ErrorName.Ts2GdError,
                  location: expression,
                  stack: new Error().stack ?? "",
                })
              } else {
                const { capturedScopeObject } = getCapturedScope(
                  arrowFunctionObj.node,
                  props
                )

                parsedStringArgs = [
                  `"${signalName}"`,
                  "self",
                  `"${arrowFunctionObj.name}"`,
                  `[${capturedScopeObject}]`,
                ]

                const secondDot = parsedExpr.content.lastIndexOf(".")
                const firstDot = parsedExpr.content.lastIndexOf(
                  ".",
                  secondDot - 1
                )

                // We have "self.variable.signal.connect" but we want
                // "self.signal.connect".
                // TODO: This is kinda a hack.
                parsedExpr = {
                  content:
                    parsedExpr.content.substring(0, firstDot) +
                    parsedExpr.content.substring(secondDot),
                }
              }
            }
          }
        }
      }

      if (
        parsedExpr.content.endsWith(".rpc") ||
        parsedExpr.content.endsWith(".rpc_id")
      ) {
        if (expression.kind === SyntaxKind.PropertyAccessExpression) {
          const pae = expression as ts.PropertyAccessExpression

          if (pae.expression.kind === SyntaxKind.PropertyAccessExpression) {
            const pae2 = pae.expression as ts.PropertyAccessExpression
            const rpcFunctionName = pae2.name.getText()

            const secondDot = parsedExpr.content.lastIndexOf(".")
            const firstDot = parsedExpr.content.lastIndexOf(".", secondDot - 1)

            const expressionWithoutRpcName =
              parsedExpr.content.substring(0, firstDot) +
              parsedExpr.content.substring(secondDot)

            const isRpcId = parsedExpr.content.endsWith(".rpc_id")

            if (isRpcId) {
              parsedStringArgs = [
                parsedArgs[0].content,
                `"${rpcFunctionName}"`,
                ...parsedArgs.slice(1).map((arg) => arg.content),
              ]
            } else {
              parsedStringArgs = [
                `"${rpcFunctionName}"`,
                ...parsedArgs.map((arg) => arg.content),
              ]
            }

            parsedExpr = {
              content: expressionWithoutRpcName,
            }
          } else {
            addError({
              description: "I'm confused by this rpc",
              error: ErrorName.Ts2GdError,
              location: pae.expression,
              stack: new Error().stack ?? "",
            })
          }
        }
      }

      if (parsedExpr.content === "todict") {
        return parsedArgs[0].content
      }

      // When we pass in functions to other functions, they're passed in as parameters.
      const symbol = props.program
        .getTypeChecker()
        .getSymbolAtLocation(expression)

      const decl = symbol?.getDeclarations() ?? []
      let isFromLib = false

      for (const d of decl) {
        if (d.getSourceFile().fileName.endsWith(".d.ts")) {
          isFromLib = true
        }
      }

      // Function values may be bound by a plain declaration, a parameter, or
      // a destructuring binding element (`const { rng } = ctx`); all three
      // travel under the [Callable, captures] tuple convention.
      const declarationKinds = (symbol?.getDeclarations() ?? []).map(
        (d) => d.kind
      )
      const isFunctionObject =
        !isFromLib &&
        (declarationKinds.includes(ts.SyntaxKind.Parameter) ||
          declarationKinds.includes(ts.SyntaxKind.VariableDeclaration) ||
          declarationKinds.includes(ts.SyntaxKind.BindingElement))

      // A call whose callee is a parenthesized expression (an IIFE, or a
      // call applied to a conditional/binary of function values) must go
      // through the function-value tuple convention; GDScript rejects
      // calling directly on an expression.
      let parenInner: ts.Expression | undefined

      if (expression.kind === SyntaxKind.ParenthesizedExpression) {
        parenInner = (expression as ts.ParenthesizedExpression).expression

        while (parenInner.kind === SyntaxKind.ParenthesizedExpression) {
          parenInner = (parenInner as ts.ParenthesizedExpression).expression
        }
      }

      if (parenInner) {
        if (parenInner.kind === SyntaxKind.PropertyAccessExpression) {
          // A method reference is a native Callable.
          return `${parsedExpr.content}.call(${parsedStringArgs.join(", ")})`
        }

        return `${parsedExpr.content}[0].call(${[
          parsedExpr.content + "[1]",
          ...parsedStringArgs,
        ].join(", ")})`
      }

      if (isFunctionObject) {
        parsedStringArgs = [...parsedStringArgs, parsedExpr.content + "[1]"]
      }

      if (isNullableNode(expression, props.program.getTypeChecker())) {
        const newName = props.scope.createUniqueName()
        const needsExplicitSelfArg =
          expression.getText().endsWith("add") ||
          expression.getText().endsWith("sub") ||
          expression.getText().endsWith("mul") ||
          expression.getText().endsWith("div")

        nullCoalesce = [
          {
            type: "before",
            line: `var ${newName} = ${parsedExpr.content}[0].call(${
              needsExplicitSelfArg ? parsedExpr.content + "[2], " : ""
            }${parsedStringArgs}) if ${parsedExpr.content} != null else null`,
            lineType: ExtraLineType.NullableIntermediateExpression,
          },
        ]

        return `${newName}`
      }

      if (isFunctionObject) {
        return `${parsedExpr.content}[0].call(${parsedStringArgs.join(", ")})`
      } else {
        return `${parsedExpr.content}(${parsedStringArgs.join(", ")})`
      }
    },
  })

  result.extraLines = [...(result.extraLines ?? []), ...nullCoalesce]

  if (expression.kind === SyntaxKind.Identifier) {
    const prop = node.expression as ts.Identifier
    const functionName = prop.text

    if (
      functionName === "add_vec_lib" ||
      functionName === "sub_vec_lib" ||
      functionName === "div_vec_lib" ||
      functionName === "mul_vec_lib"
    ) {
      if (!result.hoistedLibraryFunctions) {
        result.hoistedLibraryFunctions = new Set()
      }

      result.hoistedLibraryFunctions.add(functionName)
    }
  }

  return result
}

export const testBasicCall: Test = {
  ts: `foo("bar")`,
  expected: `
class_name __Mod_Test_4064or
foo("bar")`,
}

export const testDestructuredFunctionValueCall: Test = {
  ts: `
export function makeCtx(): { rng: () => number } {
  const n = 5
  return { rng: () => n }
}
const { rng } = makeCtx()
const x = rng()
  `,
  expected: `
class_name __Mod_Test_4064or
static func __gen(captures):
  var n = captures.n

  return n

static func makeCtx():
  var n: int = 5

  return { "rng": [Callable(__Mod_Test_4064or, "__gen"), {"n": n}] }

static var __gen1 = makeCtx()
static var rng = __gen1.rng

static var _x = rng[0].call(rng[1])
`,
}

export const testAddVec: Test = {
  ts: `const v1: Vector2; const v2: Vector2; v1.add(v2)`,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.add_vec_lib.definition("add_vec_lib")}
static var v1
static var v2
add_vec_lib(v1, v2)
`,
}

export const testAddVec2: Test = {
  ts: `const foo: { v: Vector2; }; const v2: Vector2; foo.v.add(v2)`,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.add_vec_lib.definition("add_vec_lib")}
static var foo
static var v2
add_vec_lib(foo.v, v2)
`,
}

export const testNormalVec: Test = {
  ts: `const v1: Vector2; v1.distance_to(v1)`,
  expected: `
class_name __Mod_Test_4064or
static var v1
v1.distance_to(v1)
`,
}

export const testArrowScoping: Test = {
  ts: `
export class Foo {
  a() {
    const a = () => {};
  }

  b() {
    const b = () => {};
  }
}
  `,
  expected: `
class_name Foo
static func __gen(captures):
  pass
static func __gen1(captures):
  pass
func a():
  var _a = [Callable(self, "__gen"), {}]
func b():
  var _b = [Callable(self, "__gen1"), {}]
`,
}

export const testArrowFunction: Test = {
  ts: `
const test = () => 5;
test()  
  `,
  expected: `
class_name __Mod_Test_4064or
static func __gen(captures):
  return 5
static var test = [Callable(__Mod_Test_4064or, "__gen"), {}]
test[0].call(test[1])
`,
}

export const testMap: Test = {
  ts: `
let x: string[] = ['a', 'b', 'c']
x.map(y => y + '1')
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.map.definition("__map")}
static func __gen(y: String, captures):
  return y + "1"
static var x = ["a", "b", "c"]
__map(x, [Callable(self, "__gen"), {}])
`,
}

export const testMapCapture: Test = {
  ts: `
let x = [1, 2, 3]
let z = 5
let big = { a : 6 }
x.map((y: int) => {
  return z + big.a + y * 3
})
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.map.definition("__map")}
static func __gen(y: int, captures):
  var z = captures.z
  var big = captures.big
  return z + big.a + y * 3
static var x = [1, 2, 3]
static var z: int = 5
static var big = { "a": 6 }
__map(x, [Callable(self, "__gen"), {"z": z, "big": big}])
`,
}

// TODO: this also fails lol
// for (let i = 0; i < 3; i++) {

// }
// return z + big.a + y * 3

export const testRewriteDictPut: Test = {
  ts: `
let d = todict({ 'a': 1 })
d.put('b', 2)
  `,
  expected: `
class_name __Mod_Test_4064or
static var d = { "a": 1 }
d["b"] = 2
`,
}

export const testConnect: Test = {
  expectFail: true,
  ts: `
export class Test extends Area2D {
  constructor() {
    super()

    this.$body_entered.connect(this.on_body_entered)
  }

  on_body_entered(body: Node) {

  }
}
  `,
  expected: `
extends Area2D
class_name Test
func _init():
  self.connect("body_entered", self, "on_body_entered")
func on_body_entered(_body):
  pass
`,
}

export const testConnect2: Test = {
  ts: `
export class Test extends Area2D {
  constructor() {
    super()

    let x = 5
    this.$body_entered.connect((body: Node) => { print(body) })
  }
}
  `,
  expected: `
extends Area2D
class_name Test
static func __gen(body, captures):
  print(body)
func _init():
  var _x: int = 5
  self.connect("body_entered", self, "__gen", [{}])
`,
}

export const testConnectWithClosures: Test = {
  ts: `
export class Test extends Area2D {
  constructor() {
    super()
    let x = 1, y = 2;

    this.$body_entered.connect((body: Node) => { print(x + y) })
  }
}
  `,
  expected: `
extends Area2D
class_name Test
static func __gen(_body, captures):
  var x = captures.x
  var y = captures.y
  print(x + y)
func _init():
  var x: int = 1
  var y: int = 2
  self.connect("body_entered", self, "__gen", [{"x": x, "y": y}])`,
}

// we intentionally do not capture `this` as self - see comment in parse_arrow_function.ts for rationale
export const testConnectWithClosuresNoThis: Test = {
  ts: `
export class Test extends Area2D {
  constructor() {
    super()
    let x = 1, y = 2;

    this.$body_entered.connect((body: Node) => { this.print(x + y) })
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func __gen(_body, captures):
  var x = captures.x
  var y = captures.y
  self.print(x + y)
func _init():
  var x: int = 1
  var y: int = 2
  self.connect("body_entered", self, "__gen", [{"x": x, "y": y}])`,
}

export const testConnectComplex: Test = {
  ts: `
export class Test {
  enemies: any;

  foo() {
    let enem: any;

    enem.$on_die.connect(() => { this.enemies.erase(enem) });  
  }
}
  `,
  expected: `
class_name Test
func __gen(captures):
  var enem = captures.enem
  self.enemies.erase(enem)
var enemies
func foo():
  var enem
  enem.connect("on_die", self, "__gen", [{"enem": enem}])  
`,
}

export const testRewriteDictPut2: Test = {
  ts: `
let d = todict({ 'a': 1 })
d.put([1, 2], 2)
  `,
  expected: `
class_name __Mod_Test_4064or
static var d = { "a": 1 }
d[[1, 2]] = 2
`,
}

export const testEmitSignal: Test = {
  ts: `
export class CityGridCollision extends Area {
  $mouseenter!: Signal<[]>;
  test() {
    this.$mouseenter.emit()
  }
}
  `,
  expected: `
extends Area
class_name CityGridCollision
signal mouseenter
func test():
  self.emit_signal("mouseenter")
`,
}

export const testDoubleMap: Test = {
  ts: `
let a: string[] = []
a.filter(x => x).map(x => x)
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.filter.definition("__filter")}
${LibraryFunctions.map.definition("__map")}
static func __gen(x: String, captures):
  return x
static func __gen1(x: String, captures):
  return x
static var a = []
__map(__filter(a, [Callable(self, "__gen"), {}]), [Callable(self, "__gen1"), {}])
`,
}

export const testRewriteGetNode: Test = {
  ts: `
export class Test {
  foo() {
    this.get_node('hello')
  }
}
  `,
  expected: `
class_name Test

func foo():
  self.get_node("hello")
`,
}

export const testRewriteGetNode2: Test = {
  ts: `
export class Test {
  foo() {
    this.get_node_unsafe('hello')
  }
}
  `,
  expected: `
class_name Test

func foo():
  self.get_node("hello")
`,
}

export const testDoubleCapture: Test = {
  ts: `
let big = { a : 6 }
let x = []
x.map(() => {
  return big.a + big.a
})
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.map.definition("__map")}
static func __gen(captures):
  var big = captures.big
  return big.a + big.a
static var big = { "a": 6 }
static var x = []
__map(x, [Callable(self, "__gen"), {"big": big}])
`,
}

export const testFunctionNull: Test = {
  ts: `
  declare class Foo {
    x(): number | null;
  }

  export class Test {
    example() {
      const thing: Foo = new Foo()
      let result = thing.x()

      if (result) {
        print("Woohoo")
      }
    }
  }
  `,
  expected: `
class_name Test
func example():
  var thing = Foo.new()
  var result = thing.x()
  if result:
    print("Woohoo")
`,
}

export const testRewriteGetNodeUnsafe: Test = {
  ts: `
let x: Node = 0 as any
x.get_node_unsafe("Foo")
  `,
  expected: `
class_name __Mod_Test_4064or
static var x = 0
x.get_node("Foo")
`,
}

// export const testRewriteY: Test = {
//   ts: `
// export class Test extends Node {
//   f() {
//     yield y(this.get_tree(), "idle_frame")
//   }
// }
//   `,
//   expected: `
// extends Node
// class_name Test
// func f():
//   yield (self.get_tree(), "idle_frame")`,
// }

export const testConnectDirectlyToSig: Test = {
  ts: `
export class Test extends Area2D {
  $mysig!: Signal

  constructor() {
    super()

    this.$mysig.connect(() => {
      print("OK")
    })
  }
}
  `,
  expected: `
extends Area2D
class_name Test
static func __gen(captures):
  print("OK")
signal mysig
func _init():
  self.connect("mysig", self, "__gen", [{}])
`,
}

export const testNestedDirectSignalConnect: Test = {
  ts: `
export class Test extends Area2D {
  $mysig!: Signal
  test!: Test

  constructor() {
    super()

    this.test.$mysig.connect(() => {
      print("OK")
    })

    this.test.$mysig.emit()
    this.$mysig.emit(1, 2, 3)
  }
}
  `,
  expected: `
extends Area2D
class_name Test
static func __gen(captures):
  print("OK")
signal mysig
var test
func _init():
  self.test.connect("mysig", self, "__gen", [{}])
  self.test.emit_signal("mysig")
  self.emit_signal("mysig", 1, 2, 3)
`,
}

export const testRpcRewrite: Test = {
  ts: `
export class Test extends Area2D {
  rpc_me() {

  }

  rpc_me_2() {

  }

  rpc_me_3() {

  }

  constructor() {
    super()

    this.rpc_me.rpc()
    this.rpc_me_2.rpc(1, 2, 3)
    this.rpc_me_3.rpc_id(1, "egg")
  }
}
  `,
  expected: `
extends Area2D
class_name Test
func rpc_me():
  pass
func rpc_me_2():
  pass
func rpc_me_3():
  pass
func _init():
  self.rpc("rpc_me")
  self.rpc("rpc_me_2", 1, 2, 3)
  self.rpc_id(1, "rpc_me_3", "egg")
`,
}

export const testPassInFunction: Test = {
  ts: `
export class Test extends Area2D {
  fn(other: () => void) {
    other()
  }

  constructor() {
    super()

    const fnObject = () => {}

    this.fn(() => {})
    fnObject()
  }
}
  `,
  expected: `
extends Area2D
class_name Test
static func __gen(captures):
  pass
static func __gen1(captures):
  pass
func fn(other):
  other[0].call(other[1])
func _init():
  var fnObject = [Callable(self, "__gen"), {}]
  self.fn([Callable(self, "__gen1"), {}])
  fnObject[0].call(fnObject[1])
`,
}

export const testLibFunction: Test = {
  ts: `
let test = [Vector2.UP, Vector2.DOWN].random_element()?.mul(5)
  `,
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.random_element.definition("__random_element")}
var __gen = __random_element([Vector2.UP, Vector2.DOWN])
var __gen1 = [Callable(self, "mul_vec_lib") if __gen != null else null, {}, __gen]
var __gen2 = __gen1[0].call(__gen1[2], 5) if __gen1 != null else null
static var _test = __gen2`,
}

export const testConsoleRewrite: Test = {
  ts: `
console.log("a", 1)
console.warn("low fuel")
console.error("bad", code)
  `,
  expected: `
class_name __Mod_Test_4064or
print("a", 1)
push_error(str("low fuel"))
push_error(str("bad") + " " + str(code))
  `,
}

export const testIifeArrow: Test = {
  ts: `
const value = (() => {
  return 5
})()
  `,
  expected: `
class_name __Mod_Test_4064or
static func __gen(captures):
  return 5
static var _value = ([Callable(__Mod_Test_4064or, "__gen"), {}])[0].call(([Callable(__Mod_Test_4064or, "__gen"), {}])[1])
  `,
}

export const testCallOnConditionalOfFunctions: Test = {
  ts: `
function fallback(): int {
  return 1
}

export function caller(sink = null): int {
  return (sink ?? fallback)()
}
  `,
  expected: `
class_name __Mod_Test_4064or
static func fallback():
  return 1
static func caller(sink = "[no value passed in]"):
  sink = (null if (typeof(sink) == TYPE_STRING and sink == "[no value passed in]") else sink)
  return ((sink if (sink) != null else [Callable(__Mod_Test_4064or, "fallback"), {}]))[0].call(((sink if (sink) != null else [Callable(__Mod_Test_4064or, "fallback"), {}]))[1])
  `,
}

export const testArrayCallbackMethods: Test = {
  ts: `
const nums: any = null
const doubled = nums.map((x: int): int => x * 2)
const big = nums.filter((x: int): bool => x > 1)
nums.sort((a: int, b: int): int => a - b)
  `,
  expected: `
class_name __Mod_Test_4064or
static func __ts_array_map(arr, f):
  var out := []
  for item in arr:
    out.append(__ts_call_fn(f, [item]))
  return out
static func __ts_call_fn(f, args):
  if f is Array and f.size() == 2 and f[0] is Callable:
    var all_args: Array = args.duplicate()
    if f[1] is Dictionary and not f[1].is_empty():
      all_args.append(f[1])
    return f[0].callv(all_args)
  if f is Callable:
    return f.callv(args)
  return null
static func __ts_truthy(v):
  match typeof(v):
    TYPE_BOOL:
      return v
    TYPE_INT, TYPE_FLOAT:
      return v != 0
    TYPE_STRING:
      return v != ""
    TYPE_NIL:
      return false
    _:
      return v != null
static func __ts_array_filter(arr, f):
  var out := []
  for item in arr:
    if __ts_truthy(__ts_call_fn(f, [item])):
      out.append(item)
  return out
static func __ts_array_sort(arr, f):
  arr.sort_custom(func(a, b): return __ts_truthy(__ts_call_fn(f, [a, b])))
  return arr
static func __gen(x: int, captures):
  return x * 2
static func __gen1(x: int, captures):
  return x > 1
static func __gen2(a: int, b: int, captures):
  return a - b
static var nums = null
static var _doubled = __ts_array_map(nums, [Callable(__Mod_Test_4064or, "__gen"), {}])
static var _big = __ts_array_filter(nums, [Callable(__Mod_Test_4064or, "__gen1"), {}])
__ts_array_sort(nums, [Callable(self, "__gen2"), {}])
  `,
}

export const testRestParameterPlainCall: Test = {
  ts: "function f(...args: int[]) { print(args) }\nf(1, 2, 3)",
  expected: `
class_name __Mod_Test_4064or
static func f(args: Array):
  print(args)
f([1, 2, 3])
`,
}

export const testRestParameterSpreadCall: Test = {
  ts: "function f(...args: int[]) { print(args) }\nconst a = [4, 5]\nf(...a)",
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.array_concat.definition("__ts_array_concat")}
static func f(args: Array):
  print(args)
static var a = [4, 5]
f(__ts_array_concat([], a))
`,
}

export const testRestParameterMixedCall: Test = {
  ts: "function f(n: int, ...rest: int[]) { print(rest) }\nf(1, 2, 3)",
  expected: `
class_name __Mod_Test_4064or
static func f(_n: int, rest: Array):
  print(rest)
f(1, [2, 3])
`,
}

export const testRestMethodCall: Test = {
  ts: "export class A { m(...args: int[]) { print(args) } }\nconst a = new A()\na.m(1, 2)",
  expected: `
class_name A
static var a = A.new()
a.m([1, 2])
func m(args: Array):
  print(args)
`,
}

export const testSpreadCallFixedFunction: Test = {
  ts: "function g(x: int) { print(x) }\nconst a = [1]\ng(...a)",
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.array_concat.definition("__ts_array_concat")}
static func g(x: int):
  print(x)
static var a = [1]
g.callv(__ts_array_concat([], a))
`,
}

export const testMathMaxSpread: Test = {
  ts: "const a = [1, 5, 3]\nprint(Math.max(...a))\nprint(Math.max(0, ...a))",
  expected: `
class_name __Mod_Test_4064or
${LibraryFunctions.array_concat.definition("__ts_array_concat")}
static var a = [1, 5, 3]
print(a.max())
print(__ts_array_concat([0], a).max())
`,
}

export const testApplyCall: Test = {
  ts: "function g(x: int, y: int) { print(x) }\nconst a = [1, 2]\ng.apply(null, a)",
  expected: `
class_name __Mod_Test_4064or
static func g(x: int, _y: int):
  print(x)
static var a = [1, 2]
g.callv(a)
`,
}

export const testApplyMethod: Test = {
  ts: "export class A { m(x: int) { print(x) } }\nconst a = new A()\nconst arr = [1]\na.m.apply(a, arr)",
  expected: `
class_name A
static var a = A.new()
static var arr = [1]
a.m.callv(arr)
func m(x: int):
  print(x)
`,
}

export const testRegexTestCall: Test = {
  ts: 'const r = /abc/i\nconst b = r.test("xabcx")\nprint(b)',
  expected: `
class_name __Mod_Test_4064or
static func __ts_regex(pattern: String, flags: String) -> RegEx:
  var regex = RegEx.new()
  var effective = pattern

  if flags.contains("i"):
    effective = "(?i)" + effective

  regex.compile(effective)
  return regex
static var r = __ts_regex("abc", "i")
static var b = (r.search("xabcx") != null)
print(b)
`,
}
