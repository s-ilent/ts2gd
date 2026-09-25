import ts, { SyntaxKind } from "typescript"

export class Scope {
  namesInScope: [
    ts.BindingName | ts.ParameterDeclaration | undefined,
    string
  ][][] = [[]]
  program: ts.Program

  constructor(program: ts.Program) {
    this.program = program
  }

  enterScope() {
    this.namesInScope.push([])
  }

  leaveScope() {
    this.namesInScope.pop()
  }

  getName(node: ts.BindingName): string | null {
    let ourSymbol = this.program.getTypeChecker().getSymbolAtLocation(node)

    return this.getNameBySymbol(ourSymbol)
  }

  /**
   * Resolves a name by symbol rather than node. Shorthand property names
   * carry a synthesized property symbol, so their value symbol must be
   * resolved by the caller first to reach the declaration's registered name.
   */
  getNameBySymbol(ourSymbol: ts.Symbol | undefined): string | null {
    if (!ourSymbol) {
      return null
    }

    // Match the provided symbol to an existing name in scope by symbol reference.
    for (const scope of this.namesInScope.slice().reverse()) {
      for (const [otherNode, name] of scope) {
        if (!otherNode) {
          continue
        }

        const theirSymbol = this.program
          .getTypeChecker()
          .getSymbolAtLocation(otherNode)

        if (ourSymbol === theirSymbol) {
          return name
        }
      }
    }

    return null
  }

  addName(node: ts.BindingName): void {
    let declaredVariableName = ""

    if (node.kind === SyntaxKind.Identifier) {
      declaredVariableName = (node as ts.Identifier).text
    } else if (node.kind === SyntaxKind.ObjectBindingPattern) {
      throw new Error(" Havent handled destructuring yet")
    } else if (node.kind === SyntaxKind.ArrayBindingPattern) {
      throw new Error(" Havent handled destructuring yet")
    }

    // Don't use a keyword as a name
    if (keywords.includes(declaredVariableName)) {
      declaredVariableName = declaredVariableName + "_"
    }

    const matchingNames = this.namesInScope.flat()
    let newName = declaredVariableName
    let increment = 0

    while (matchingNames.filter((x) => x[1] === newName).length > 0) {
      newName = declaredVariableName + String(++increment)
    }

    this.namesInScope[this.namesInScope.length - 1].push([node, newName])
  }

  createUniqueName(): string {
    let declaredVariableName = "__gen"

    const matchingNames = this.namesInScope.flat()
    let newName = declaredVariableName
    let increment = 0

    while (matchingNames.filter((x) => x[1] === newName).length > 0) {
      newName = declaredVariableName + String(++increment)
    }

    // Generated functions go into global scope, so we add our new name into global scope.
    this.namesInScope[0].push([undefined, newName])

    return newName
  }

  /**
   * Like createUniqueName, but keeps a readable base name and deduplicates
   * against every name already in scope (e.g. two sibling functions each
   * declaring a nested function with the same name).
   */
  createUniqueNameWithBase(base: string): string {
    const matchingNames = this.namesInScope.flat()
    let newName = base
    let increment = 0

    while (matchingNames.filter((x) => x[1] === newName).length > 0) {
      newName = base + String(++increment)
    }

    // Hoisted functions become class-level members, so the name is global.
    this.namesInScope[0].push([undefined, newName])

    return newName
  }
}

const keywords = [
  // Godot keywords
  "if",
  "elif",
  "else",
  "for",
  "while",
  "match",
  "when",
  "break",
  "continue",
  "pass",
  "return",
  "class",
  "class_name",
  "extends",
  "is",
  "in",
  "as",
  "self",
  "super",
  "tool",
  "signal",
  "func",
  "static",
  "const",
  "enum",
  "var",
  "onready",
  "export",
  "setget",
  "breakpoint",
  "preload",
  "yield",
  "await",
  "assert",
  "void",
  "namespace",
  "remote",
  "master",
  "puppet",
  "remotesync",
  "mastersync",
  "puppetsync",
  "PI",
  "TAU",
  "INF",
  "NAN",

  // GDScript global variables
  "Color8",
  "ColorN",
  "abs",
  "acos",
  "asin",
  "assert",
  "atan",
  "atan2",
  "bytes2var",
  "cartesian2polar",
  "ceil",
  "char",
  "clamp",
  "convert",
  "cos",
  "cosh",
  "db2linear",
  "decimals",
  "dectime",
  "deg2rad",
  "dict2inst",
  "ease",
  "exp",
  "floor",
  "fmod",
  "fposmod",
  "funcref",
  "get_stack",
  "hash",
  "inst2dict",
  "instance_from_id",
  "inverse_lerp",
  "is_equal_approx",
  "is_inf",
  "is_instance_valid",
  "is_nan",
  "is_zero_approx",
  "len",
  "lerp",
  "lerp_angle",
  "linear2db",
  "load",
  "log",
  "max",
  "min",
  "move_toward",
  "nearest_po2",
  "ord",
  "parse_json",
  "polar2cartesian",
  "posmod",
  "pow",
  "preload",
  "print",
  "print_debug",
  "print_stack",
  "printerr",
  "printraw",
  "prints",
  "printt",
  "push_error",
  "push_warning",
  "rad2deg",
  "rand_range",
  "rand_seed",
  "randf",
  "randi",
  "randomize",
  "range",
  "range_lerp",
  "round",
  "seed",
  "sign",
  "sin",
  "sinh",
  "smoothstep",
  "sqrt",
  "step_decimals",
  "stepify",
  "str",
  "str2var",
  "tan",
  "tanh",
  "to_json",
  "type_exists",
  "typeof",
  "validate_json",
  "var2bytes",
  "var2str",
  "weakref",
  "wrapf",
  "wrapi",
  "yield",
  // Godot native classes / singletons. A member with one of these names
  // makes the script fail to parse ("shadows a native class").
  "AABB",
  "AudioServer",
  "Basis",
  "ClassDB",
  "Color",
  "DisplayServer",
  "Engine",
  "Geometry2D",
  "Geometry3D",
  "Input",
  "IP",
  "JSON",
  "Marshalls",
  "NativeMenu",
  "NavigationMeshGenerator",
  "NavigationServer2D",
  "NavigationServer3D",
  "Node",
  "Object",
  "OS",
  "Performance",
  "PhysicsServer2D",
  "PhysicsServer3D",
  "Plane",
  "ProjectSettings",
  "Quaternion",
  "RID",
  "RenderingServer",
  "ResourceLoader",
  "ResourceSaver",
  "StringName",
  "ThemeDB",
  "Time",
  "TranslationServer",
  "Variant",
  "Vector2",
  "Vector2i",
  "Vector3",
  "Vector3i",
  "WorkerThreadPool",
  "XRServer",

  // Native member names. Object carries a `script` property, so a declared
  // member with that name fails to parse ("Member script redefined").
  // Declared names are renamed with a trailing underscore for consistency
  // with the keyword handling above.
  "script",

  // Builtin type names cannot be used as declared names in GDScript.
  "Array",
  "bool",
  "Callable",
  "Dictionary",
  "float",
  "int",
  "NodePath",
  "PackedByteArray",
  "PackedColorArray",
  "PackedFloat32Array",
  "PackedFloat64Array",
  "PackedInt32Array",
  "PackedInt64Array",
  "PackedStringArray",
  "PackedVector2Array",
  "PackedVector3Array",
  "Rect2",
  "Rect2i",
  "Signal",
  "String",
  "Transform2D",
  "Transform3D",
]

/**
 * Names declared as functions never pass through Scope.addName, so keyword
 * mangling must be applied explicitly at every emission site that spells a
 * function's name (the declaration, direct calls, and function-value
 * references). Returns the GDScript-safe spelling of the source name.
 */
export const mangleGdName = (name: string): string =>
  keywords.includes(name) ? name + "_" : name

/**
 * Class members whose names collide with native properties (see the
 * native member names in the keyword list above) are renamed at their
 * declaration sites, and every symbol-resolved access to such a member
 * must follow. Accesses that resolve into declaration files (Godot or TS
 * library types) keep the native spelling so that assigning a native
 * property like Node.script is untouched, and accesses resolving to plain
 * type-level properties (interfaces compiled to Dictionaries) stay raw so
 * dictionary keys are preserved.
 */
export const mangleMemberDeclName = (
  name: string,
  sourceFile: ts.SourceFile
): string =>
  keywords.includes(name) && !sourceFile.isDeclarationFile ? name + "_" : name

export const mangleMemberAccessName = (
  name: string,
  symbol?: ts.Symbol
): string => {
  if (!keywords.includes(name) || !symbol?.declarations?.[0]) {
    return name
  }

  const decl = symbol.declarations[0]

  if (decl.getSourceFile().isDeclarationFile) {
    return name
  }

  const isValueMember =
    ts.isPropertyDeclaration(decl) ||
    ts.isMethodDeclaration(decl) ||
    ts.isGetAccessorDeclaration(decl) ||
    ts.isSetAccessorDeclaration(decl) ||
    ts.isParameterPropertyDeclaration(decl, decl.parent)

  return isValueMember ? name + "_" : name
}
