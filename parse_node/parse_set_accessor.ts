import ts from "typescript"

import { ParseNodeType, ParseState, combine } from "../parse_node"
import { Test } from "../tests/test"

/**
 * Set accessors are assembled into Godot 4 property blocks by the class
 * declaration emitter; this only produces the accessor body.
 */
export const parseSetAccessor = (
  node: ts.SetAccessorDeclaration,
  props: ParseState
): ParseNodeType => {
  return combine({
    parent: node,
    nodes: [node.body, ...node.parameters],
    props,
    parsedStrings: (body) => body || "pass",
  })
}

export const testGet: Test = {
  ts: `
class Foo {
  _x: float;
  set x(value: float) { _x = value; }
}
  `,
  expected: `
class_name Foo
var x: float:
  set(value):
    _x = value
var _x: float
  `,
}
