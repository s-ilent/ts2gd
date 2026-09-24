import ts from "typescript"

import { ParseState, combine, ParseNodeType } from "../parse_node"
import { Test } from "../tests/test"

/**
 * Get accessors are assembled into Godot 4 property blocks by the class
 * declaration emitter; this only produces the accessor body.
 */
export const parseGetAccessor = (
  node: ts.GetAccessorDeclaration,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [...node.parameters, node.body],
    props,
    parsedStrings: (...allParsed) => allParsed[allParsed.length - 1] || "pass",
  })
}

export const testGet: Test = {
  ts: `
export class Foo {
  _x;
  get x() { return this._x; }
}
  `,
  expected: `
class_name Foo
var x:
  get:
    return self._x
var _x
  `,
}

export const testExportingGetSetBig: Test = {
  ts: `
export class Test {
  @exports
  set label(text: string) {
    if (this.LI) {
      this.LI.text = text;
    }
  }

  get label(): string {
    return this.LI?.text ?? "";
  }
}
  `,
  expected: `
class_name Test
@export var label: String:
  get:
    var __gen = self.LI
    return ((__gen.text if __gen != null else null) if ((__gen.text if __gen != null else null)) != null else "")
  set(text):
    if self.LI:
      self.LI.text = text
`,
}

export const testExportingGetSet2: Test = {
  ts: `
export class Test {
  set label(text: string) {
  }

  @exports
  get label(): string {
    return ""
  }
}
  `,
  expected: `
class_name Test
@export var label: String:
  get:
    return ""
  set(text):
    pass
`,
}

// Strictly speaking this makes no sense, but there's no reason to error.
export const testExportingGetSetBoth: Test = {
  ts: `
export class Test {
  @exports
  set label(text: string) {
  }

  @exports
  get label(): string {
    return ""
  }
}
  `,
  expected: `
class_name Test
@export var label: String:
  get:
    return ""
  set(text):
    pass
`,
}

export const testGetSetMultiLineBody: Test = {
  ts: `
export class Foo {
  _x: float;

  get x(): float {
    if (this._x > 10) {
      return 10
    }

    return this._x
  }

  set x(value: float) {
    this._x = value
  }
}
  `,
  expected: `
class_name Foo
var x: float:
  get:
    if self._x > 10:
      return 10
    return self._x
  set(value):
    self._x = value
var _x: float
  `,
}
