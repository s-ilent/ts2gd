import path from "path"
import process from "process"

import { UsageDomain } from "tsutils"
import ts, { SyntaxKind } from "typescript"

import TsGdProject from "../project/project"
import { ErrorName, addError } from "../errors"
import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"
import { isEnumType } from "../ts_utils"

const getPathWithoutExtension = (
  node: ts.ImportDeclaration,
  props: ParseState
) => {
  const importPathLiteral = node.moduleSpecifier as ts.StringLiteral
  const importPath = importPathLiteral.text
  let pathToImportedTs = ""

  if (importPath.startsWith(".")) {
    // Handle relative paths

    pathToImportedTs = path.join(
      path.dirname(node.getSourceFile().fileName),
      importPath
    )
  } else {
    // Handle absolute paths

    pathToImportedTs = path.join(props.project.paths.rootPath, importPath)
  }

  return pathToImportedTs
}

const toPosix = (p: string) => p.split(path.sep).join("/")

/**
 * Best-effort res:// path for a module specifier that refers to a non-code
 * asset (e.g. a JSON file imported with a ?url suffix). Prefers the
 * project's own path mapping when available and falls back to a path
 * relative to the project root or the current working directory.
 */
const resPathForAsset = (
  node: ts.ImportDeclaration,
  modulePath: string,
  props: ParseState
): string => {
  try {
    const abs = path.resolve(
      path.dirname(node.getSourceFile().fileName),
      modulePath
    )

    const rootPath: string | undefined = props.project.paths?.rootPath

    if (rootPath && abs.startsWith(rootPath + path.sep)) {
      return "res://" + toPosix(path.relative(rootPath, abs))
    }

    return "res://" + toPosix(path.relative(process.cwd(), abs))
  } catch {
    return "res://" + toPosix(modulePath)
  }
}

/**
 * Res path for a TS module that is being imported. Prefers the project's
 * asset record; falls back to deriving the .gd location from the specifier
 * so that imports of files outside the project layout still produce
 * something reasonable.
 */
const resPathForModule = (
  node: ts.ImportDeclaration,
  pathToImportedTs: string,
  props: ParseState
): string => {
  const importedSourceFile = props.project
    .sourceFiles()
    .find((sf) => sf.fsPath === pathToImportedTs)

  if (importedSourceFile) {
    return importedSourceFile.resPath
  }

  try {
    const absWithoutExtension = pathToImportedTs.replace(/\.ts$/, "")
    const rootPath: string | undefined = props.project.paths?.rootPath
    const rel =
      rootPath && absWithoutExtension.startsWith(rootPath + path.sep)
        ? path.relative(rootPath, absWithoutExtension)
        : path.relative(process.cwd(), absWithoutExtension)

    return "res://" + toPosix(rel) + ".gd"
  } catch {
    return "res://" + path.basename(pathToImportedTs, ".ts") + ".gd"
  }
}

const pascalCaseModuleName = (pathToImportedTs: string): string => {
  const base = path.basename(pathToImportedTs, ".ts")
  const cleaned = base.replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) =>
    c.toUpperCase()
  )
  const pascal = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

  return pascal || "Module"
}

export const getImportResPathForEnum = (
  node: ts.Type,
  props: ParseState
): {
  sourceFile: ts.SourceFile
  resPath: string
  enumName: string
} => {
  const enumSymbol = node.getSymbol()

  if (!enumSymbol) {
    throw new Error("Can't find symbol for node.")
  }

  const enumDeclarations = enumSymbol.declarations

  if (!enumDeclarations) {
    throw new Error(`No Enum declartion given`)
  }

  if (enumDeclarations.length === 0 || enumDeclarations.length > 1) {
    throw new Error(
      `Invalid length for declarations: ${enumDeclarations.length}`
    )
  }

  const enumDeclaration = enumDeclarations[0]
  const enumSourceFile = enumDeclaration.getSourceFile()

  const enumSourceFileAsset = props.project
    .sourceFiles()
    .find((sf) => sf.fsPath === enumSourceFile.fileName)

  if (!enumSourceFileAsset) {
    throw new Error(
      `Can't find associated sourcefile for ${enumSourceFile.fileName}`
    )
  }

  let enumTypeString = props.program.getTypeChecker().typeToString(node)

  if (enumTypeString.startsWith("typeof ")) {
    enumTypeString = enumTypeString.slice("typeof ".length)
  }

  const pathWithoutEnum = enumSourceFileAsset.resPath
  const importPath =
    pathWithoutEnum.slice(0, -".gd".length) + "_" + enumTypeString + ".gd"

  return {
    resPath: importPath,
    sourceFile: enumSourceFile,
    enumName: enumTypeString,
  }
}

const isModuleAssetQuery = (modulePath: string) => modulePath.includes("?")

/**
 * Emit (once per module, per file) a static variable holding the imported
 * module's script resource. Static so it is reachable from static functions
 * too; load() rather than preload() so import cycles resolve at runtime
 * instead of failing at compile time.
 */
const receiverForModule = (
  node: ts.ImportDeclaration,
  pathToImportedTs: string,
  props: ParseState
): { receiver: string; resPath: string; isNew: boolean } => {
  const resPath = resPathForModule(node, pathToImportedTs, props)

  if (!props.importReceivers) {
    props.importReceivers = new Map()
  }

  const existing = props.importReceivers.get(resPath)

  if (existing) {
    return { receiver: existing.name, resPath, isNew: false }
  }

  let receiver = "__ts_import_" + pascalCaseModuleName(pathToImportedTs)
  const takenNames = new Set(
    [...props.importReceivers.values()].map((v) => v.name)
  )
  let suffix = 1

  while (takenNames.has(receiver)) {
    suffix += 1
    receiver = "__ts_import_" + pascalCaseModuleName(pathToImportedTs) + suffix
  }

  props.importReceivers.set(resPath, { name: receiver, emitted: false })

  return { receiver, resPath, isNew: true }
}

const receiverDeclarationLine = (
  node: ts.ImportDeclaration,
  pathToImportedTs: string,
  props: ParseState,
  importLines: string[]
): { receiver: string } => {
  const { receiver, resPath, isNew } = receiverForModule(
    node,
    pathToImportedTs,
    props
  )

  if (isNew) {
    importLines.push(`static var ${receiver} = load("${resPath}")`)

    const record = props.importReceivers!.get(resPath)!
    record.emitted = true
  }

  return { receiver }
}

const registerImportedBinding = (
  localSymbol: ts.Symbol | undefined,
  expression: string,
  props: ParseState
) => {
  if (!localSymbol || !expression) {
    return
  }

  if (!props.importedBindings) {
    props.importedBindings = new Map()
  }

  props.importedBindings.set(localSymbol, expression)
}

export const parseImportDeclaration = (
  node: ts.ImportDeclaration,
  props: ParseState
): ParseNodeType => {
  // Step 1: resolve full path

  const pathWithoutExtension = getPathWithoutExtension(node, props)
  let pathToImportedTs = pathWithoutExtension + ".ts"

  const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text

  // Step 2: Parse bindings, sorting between the different kinds of things
  // that can be imported (each of which needs different generated code).

  type ImportType = {
    importedName: string
    type: "enum" | "class" | "scene"
    resPath: string
  }

  const imports: ImportType[] = []
  const importLines: string[] = []

  const namedBindings = node.importClause?.namedBindings

  // Side-effect-only imports (import "./x") generate no code.
  if (!node.importClause) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "",
    })
  }

  // Type-only imports do not exist at runtime.
  if (node.importClause.isTypeOnly) {
    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => "",
    })
  }

  // Asset imports (e.g. import url from "./data.json?url") bind the name to
  // the asset's res:// path.
  if (isModuleAssetQuery(moduleSpecifier)) {
    const assetResPath = resPathForAsset(
      node,
      moduleSpecifier.split("?")[0],
      props
    )

    if (node.importClause.name) {
      importLines.push(
        `const ${node.importClause.name.text} = "${assetResPath}"`
      )
    }

    if (namedBindings?.kind === SyntaxKind.NamedImports) {
      for (const element of (namedBindings as ts.NamedImports).elements) {
        importLines.push(`const ${element.name.text} = "${assetResPath}"`)
      }
    }

    return combine({
      parent: node,
      nodes: [],
      props,
      parsedStrings: () => importLines.join("\n"),
    })
  }

  // Default imports bind the name to the module's script resource itself.
  if (node.importClause.name && !namedBindings) {
    const { receiver } = receiverDeclarationLine(
      node,
      pathToImportedTs,
      props,
      importLines
    )

    registerImportedBinding(
      props.program
        .getTypeChecker()
        .getSymbolAtLocation(node.importClause.name),
      receiver,
      props
    )
  }

  // Namespace imports (import * as X) bind the name to the module's script
  // resource, whose static members are reachable as X.member.
  if (namedBindings?.kind === SyntaxKind.NamespaceImport) {
    const namespaceImport = namedBindings as ts.NamespaceImport
    const { receiver } = receiverDeclarationLine(
      node,
      pathToImportedTs,
      props,
      importLines
    )

    registerImportedBinding(
      props.program.getTypeChecker().getSymbolAtLocation(namespaceImport.name),
      receiver,
      props
    )
  }

  if (namedBindings && namedBindings.kind === SyntaxKind.NamedImports) {
    const bindings = namedBindings as ts.NamedImports

    for (const element of bindings.elements) {
      if (element.isTypeOnly) {
        continue
      }

      const type = props.program.getTypeChecker().getTypeAtLocation(element)
      const localSymbol = props.program
        .getTypeChecker()
        .getSymbolAtLocation(element.name)

      // TODO rewrite this using new project obj

      if (isEnumType(type)) {
        const { resPath, enumName } = getImportResPathForEnum(type, props)

        imports.push({ importedName: enumName, resPath: resPath, type: "enum" })
        continue
      }

      if (type.symbol?.name === "PackedScene") {
        const importedName = element.name.text
        const className = importedName.slice(0, -"Tscn".length)
        const resPath = props.project
          .godotScenes()
          .find((scene) => scene.name === className)?.resPath

        if (!resPath) {
          continue
        }

        imports.push({
          importedName: importedName,
          resPath: resPath,
          type: "scene",
        })
        continue
      }

      // Functions and constants exported from another module: reach them as
      // members of the imported module's script resource.
      const checker = props.program.getTypeChecker()
      let moduleSymbol = localSymbol

      if (moduleSymbol && moduleSymbol.flags & ts.SymbolFlags.Alias) {
        try {
          moduleSymbol = checker.getAliasedSymbol(moduleSymbol)
        } catch {
          // Keep the unresolved symbol; the declaration checks below will
          // simply not match.
        }
      }

      const declKind = moduleSymbol?.declarations?.[0]?.kind

      if (
        declKind === SyntaxKind.FunctionDeclaration ||
        declKind === SyntaxKind.VariableDeclaration
      ) {
        const usages = props.usages.get(element.name)

        let usedAsValue = false

        for (const use of usages?.uses ?? []) {
          if (use.domain & UsageDomain.Value) {
            usedAsValue = true
            break
          }
        }

        if (usedAsValue) {
          const { receiver } = receiverDeclarationLine(
            node,
            pathToImportedTs,
            props,
            importLines
          )

          const memberName = (element.propertyName ?? element.name).text

          registerImportedBinding(
            localSymbol,
            `${receiver}.${memberName}`,
            props
          )
        }

        continue
      }

      const importedSourceFile = props.project
        .sourceFiles()
        .find((sf) => sf.fsPath === pathToImportedTs)

      // Classes (and anything else value-used that isn't a plain function or
      // constant). When the module resolved in the type checker but has no
      // project asset record, fall back to a derived res path rather than
      // dropping the import entirely.
      const aliasResolved = !!moduleSymbol && moduleSymbol !== localSymbol

      if (!importedSourceFile && !aliasResolved) {
        if (pathToImportedTs.includes("@")) {
          continue
        }

        // Types (aliases, interfaces, classes used only in type positions)
        // need no generated code. Anything used as a value that we can't
        // resolve is worth reporting.
        let usedAsValue = false

        for (const use of props.usages.get(element.name)?.uses ?? []) {
          if (use.domain & UsageDomain.Value) {
            usedAsValue = true
            break
          }
        }

        if (usedAsValue) {
          addError({
            error: ErrorName.InvalidNumber,
            location: node,
            description: `Import ${pathToImportedTs} not found.`,
            stack: new Error().stack ?? "",
          })
        }

        continue
      }

      let typeString = props.program.getTypeChecker().typeToString(type)

      if (typeString.startsWith("typeof ")) {
        typeString = typeString.slice("typeof ".length)
      }

      const usages = props.usages.get(element.name)

      let usedAsValue = false

      // No import is necessary unless we actually use the identifier as a value. (Circular references
      // will crash Godot, so we try to avoid them.)
      for (const use of usages?.uses ?? []) {
        if (use.domain & UsageDomain.Value) {
          usedAsValue = true
          break
        }
      }

      const isAutoload = importedSourceFile?.isAutoload() ?? false
      const resPath =
        importedSourceFile?.resPath ??
        resPathForModule(node, pathToImportedTs, props)

      if (!isAutoload && usedAsValue) {
        imports.push({
          importedName: typeString,
          resPath: resPath,
          type: "class",
        })
      }
    }
  }

  return combine({
    parent: node,
    nodes: [],
    props,
    parsedStrings: () =>
      [
        ...importLines,
        ...imports.map(({ importedName, type, resPath }) => {
          if (type === "class") {
            return `var ${importedName} = load("${resPath}")`
          } else if (type === "enum") {
            return `const ${importedName} = preload("${resPath}").${importedName}`
          } else if (type === "scene") {
            return `const ${importedName} = preload("${resPath}")`
          }
        }),
      ]
        .filter((line) => !!line)
        .join("\n"),
  })
}

export const testImportFunctionBinding: Test = {
  files: { "util.ts": "export function doThing(x: int): int { return x }" },
  ts: `
import { doThing } from "./util"

doThing(5)
  `,
  expected: `
static var __ts_import_Util = load("res://util.gd")
__ts_import_Util.doThing(5)
  `,
}

export const testImportConstBinding: Test = {
  files: { "constants.ts": "export const MAX = 5" },
  ts: `
import { MAX } from "./constants"

print(MAX)
  `,
  expected: `
static var __ts_import_Constants = load("res://constants.gd")
print(__ts_import_Constants.MAX)
  `,
}

export const testImportAliasedBinding: Test = {
  files: { "util.ts": "export function doThing(x: int): int { return x }" },
  ts: `
import { doThing as dt } from "./util"

dt(5)
  `,
  expected: `
static var __ts_import_Util = load("res://util.gd")
__ts_import_Util.doThing(5)
  `,
}

export const testNamespaceImport: Test = {
  files: { "util.ts": "export function doThing(x: int): int { return x }" },
  ts: `
import * as Utils from "./util"

Utils.doThing(5)
  `,
  expected: `
static var __ts_import_Util = load("res://util.gd")
__ts_import_Util.doThing(5)
  `,
}

export const testDefaultImportFromModule: Test = {
  files: { "util.ts": "export function doThing(x: int): int { return x }" },
  ts: `
import Util from "./util"

Util.doThing(5)
  `,
  expected: `
static var __ts_import_Util = load("res://util.gd")
__ts_import_Util.doThing(5)
  `,
}

export const testTypeOnlyImportSkipped: Test = {
  ts: `
import type { Shape } from "./shapes"

export class Test {
  x: int = 1
}
  `,
  expected: `
class_name Test
var x: int = 1
  `,
}

export const testUnusedFunctionImportSkipped: Test = {
  files: { "util.ts": "export function doThing(x: int): int { return x }" },
  ts: `
import { doThing } from "./util"

export class Test {
  x: int = 1
}
  `,
  expected: `
class_name Test
var x: int = 1
  `,
}

export const testAssetUrlImport: Test = {
  ts: `
import dataUrl from "./data/level.json?url"

print(dataUrl)
  `,
  expected: `
const dataUrl = "res://data/level.json"
print(dataUrl)
  `,
}

export const testSharedReceiverAcrossImports: Test = {
  files: {
    "util.ts": "export function a() {}\nexport function b() {}",
  },
  ts: `
import { a } from "./util"
import { b } from "./util"

a()
b()
  `,
  expected: `
static var __ts_import_Util = load("res://util.gd")
__ts_import_Util.a()
__ts_import_Util.b()
  `,
}

export const testImportClassBinding: Test = {
  files: { "helper.ts": "export class Helper { }" },
  ts: `
import { Helper } from "./helper"

let h = Helper
print(h)
  `,
  expected: `
var Helper = load("res://helper.gd")
var h = Helper
print(h)
  `,
}
