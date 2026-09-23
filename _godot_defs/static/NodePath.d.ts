/**
 * The [NodePath] built-in [Variant] type represents a path to a node or property in a hierarchy of nodes. It is designed to be efficiently passed into many built-in methods (such as [method Node.get_node], [method Object.set_indexed], [method Tween.tween_property], etc.) without a hard dependence on the node or property they point to.
 *
 * A node path is represented as a [String] composed of slash-separated (`/`) node names and colon-separated (`:`) property names (also called "subnames"). Similar to a filesystem path, `".."` and `"."` are special node names. They refer to the parent node and the current node, respectively.
 *
 * The following examples are paths relative to the current node:
 *
 * @example
 *
 * ^"A"     # Points to the direct child A.
 * ^"A/B"   # Points to A's child B.
 * ^"."     # Points to the current node.
 * ^".."    # Points to the parent node.
 * ^"../C"  # Points to the sibling node C.
 * ^"../.." # Points to the grandparent node.
 * @summary
 *
 *
 * A leading slash means the path is absolute, and begins from the [SceneTree]:
 *
 * @example
 *
 * ^"/root"            # Points to the SceneTree's root Window.
 * ^"/root/Title"      # May point to the main scene's root node named "Title".
 * ^"/root/Global"     # May point to an autoloaded node or scene named "Global".
 * @summary
 *
 *
 * Despite their name, node paths may also point to a property:
 *
 * @example
 *
 * ^":position"           # Points to this object's position.
 * ^":position:x"         # Points to this object's position in the x axis.
 * ^"Camera3D:rotation:y" # Points to the child Camera3D and its y rotation.
 * ^"/root:size:x"        # Points to the root Window and its width.
 * @summary
 *
 *
 * In some situations, it's possible to omit the leading `:` when pointing to an object's property. As an example, this is the case with [method Object.set_indexed] and [method Tween.tween_property], as those methods call [method NodePath.get_as_property_path] under the hood. However, it's generally recommended to keep the `:` prefix.
 *
 * Node paths cannot check whether they are valid and may point to nodes or properties that do not exist. Their meaning depends entirely on the context in which they're used.
 *
 * You usually do not have to worry about the [NodePath] type, as strings are automatically converted to the type when necessary. There are still times when defining node paths is useful. For example, exported [NodePath] properties allow you to easily select any node within the currently edited scene. They are also automatically updated when moving, renaming or deleting nodes in the scene tree editor. See also [annotation @GDScript.@export_node_path].
 *
 * See also [StringName], which is a similar type designed for optimized strings.
 *
 * **Note:** In a boolean context, a [NodePath] will evaluate to `false` if it is empty (`NodePath("")`). Otherwise, a [NodePath] will always evaluate to `true`.
 *
 */
declare class NodePath {
  /**
   * The [NodePath] built-in [Variant] type represents a path to a node or property in a hierarchy of nodes. It is designed to be efficiently passed into many built-in methods (such as [method Node.get_node], [method Object.set_indexed], [method Tween.tween_property], etc.) without a hard dependence on the node or property they point to.
   *
   * A node path is represented as a [String] composed of slash-separated (`/`) node names and colon-separated (`:`) property names (also called "subnames"). Similar to a filesystem path, `".."` and `"."` are special node names. They refer to the parent node and the current node, respectively.
   *
   * The following examples are paths relative to the current node:
   *
   * @example
   *
   * ^"A"     # Points to the direct child A.
   * ^"A/B"   # Points to A's child B.
   * ^"."     # Points to the current node.
   * ^".."    # Points to the parent node.
   * ^"../C"  # Points to the sibling node C.
   * ^"../.." # Points to the grandparent node.
   * @summary
   *
   *
   * A leading slash means the path is absolute, and begins from the [SceneTree]:
   *
   * @example
   *
   * ^"/root"            # Points to the SceneTree's root Window.
   * ^"/root/Title"      # May point to the main scene's root node named "Title".
   * ^"/root/Global"     # May point to an autoloaded node or scene named "Global".
   * @summary
   *
   *
   * Despite their name, node paths may also point to a property:
   *
   * @example
   *
   * ^":position"           # Points to this object's position.
   * ^":position:x"         # Points to this object's position in the x axis.
   * ^"Camera3D:rotation:y" # Points to the child Camera3D and its y rotation.
   * ^"/root:size:x"        # Points to the root Window and its width.
   * @summary
   *
   *
   * In some situations, it's possible to omit the leading `:` when pointing to an object's property. As an example, this is the case with [method Object.set_indexed] and [method Tween.tween_property], as those methods call [method NodePath.get_as_property_path] under the hood. However, it's generally recommended to keep the `:` prefix.
   *
   * Node paths cannot check whether they are valid and may point to nodes or properties that do not exist. Their meaning depends entirely on the context in which they're used.
   *
   * You usually do not have to worry about the [NodePath] type, as strings are automatically converted to the type when necessary. There are still times when defining node paths is useful. For example, exported [NodePath] properties allow you to easily select any node within the currently edited scene. They are also automatically updated when moving, renaming or deleting nodes in the scene tree editor. See also [annotation @GDScript.@export_node_path].
   *
   * See also [StringName], which is a similar type designed for optimized strings.
   *
   * **Note:** In a boolean context, a [NodePath] will evaluate to `false` if it is empty (`NodePath("")`). Otherwise, a [NodePath] will always evaluate to `true`.
   *
   */

  new(): NodePath
  constructor()

  new(from: NodePathType): NodePath
  constructor(from: NodePathType)

  new(from: string): NodePath
  constructor(from: string)

  static new(): NodePath

  /**
   * Returns a copy of this node path with a colon character (`:`) prefixed, transforming it to a pure property path with no node names (relative to the current node).
   *
   * @example
   *
   *
   * # node_path points to the "x" property of the child node named "position".
   * var node_path = ^"position:x"
   * # property_path points to the "position" in the "x" axis of this node.
   * var property_path = node_path.get_as_property_path()
   * print(property_path) # Prints ":position:x"
   *
   *
   * // nodePath points to the "x" property of the child node named "position".
   * var nodePath = new NodePath("position:x");
   * // propertyPath points to the "position" in the "x" axis of this node.
   * NodePath propertyPath = nodePath.GetAsPropertyPath();
   * GD.Print(propertyPath); // Prints ":position:x"
   *
   * @summary
   *
   *
   */
  get_as_property_path(): NodePathType

  /** Returns all node names concatenated with a slash character ([code]/[/code]) as a single [StringName]. */
  get_concatenated_names(): StringName

  /**
   * Returns all property subnames concatenated with a colon character (`:`) as a single [StringName].
   *
   * @example
   *
   *
   * var node_path = ^"Sprite2D:texture:resource_name"
   * print(node_path.get_concatenated_subnames()) # Prints "texture:resource_name"
   *
   *
   * var nodePath = new NodePath("Sprite2D:texture:resource_name");
   * GD.Print(nodePath.GetConcatenatedSubnames()); // Prints "texture:resource_name"
   *
   * @summary
   *
   *
   */
  get_concatenated_subnames(): StringName

  /**
   * Returns the node name indicated by [param idx], starting from 0. If [param idx] is out of bounds, an error is generated. See also [method get_subname_count] and [method get_name_count].
   *
   * @example
   *
   *
   * var sprite_path = NodePath("../RigidBody2D/Sprite2D")
   * print(sprite_path.get_name(0)) # Prints ".."
   * print(sprite_path.get_name(1)) # Prints "RigidBody2D"
   * print(sprite_path.get_name(2)) # Prints "Sprite"
   *
   *
   * var spritePath = new NodePath("../RigidBody2D/Sprite2D");
   * GD.Print(spritePath.GetName(0)); // Prints ".."
   * GD.Print(spritePath.GetName(1)); // Prints "PathFollow2D"
   * GD.Print(spritePath.GetName(2)); // Prints "Sprite"
   *
   * @summary
   *
   *
   */
  get_name(idx: int): StringName

  /**
   * Returns the number of node names in the path. Property subnames are not included.
   *
   * For example, `"../RigidBody2D/Sprite2D:texture"` contains 3 node names.
   *
   */
  get_name_count(): int

  /**
   * Returns the property name indicated by [param idx], starting from 0. If [param idx] is out of bounds, an error is generated. See also [method get_subname_count].
   *
   * @example
   *
   *
   * var path_to_name = NodePath("Sprite2D:texture:resource_name")
   * print(path_to_name.get_subname(0)) # Prints "texture"
   * print(path_to_name.get_subname(1)) # Prints "resource_name"
   *
   *
   * var pathToName = new NodePath("Sprite2D:texture:resource_name");
   * GD.Print(pathToName.GetSubname(0)); // Prints "texture"
   * GD.Print(pathToName.GetSubname(1)); // Prints "resource_name"
   *
   * @summary
   *
   *
   */
  get_subname(idx: int): StringName

  /**
   * Returns the number of property names ("subnames") in the path. Each subname in the node path is listed after a colon character (`:`).
   *
   * For example, `"Level/RigidBody2D/Sprite2D:texture:resource_name"` contains 2 subnames.
   *
   */
  get_subname_count(): int

  /**
   * Returns the 32-bit hash value representing the node path's contents.
   *
   * **Note:** Node paths with equal hash values are **not** guaranteed to be the same, as a result of hash collisions. Node paths with different hash values are guaranteed to be different.
   *
   */
  hash(): int

  /** Returns [code]true[/code] if the node path is absolute. Unlike a relative path, an absolute path is represented by a leading slash character ([code]/[/code]) and always begins from the [SceneTree]. It can be used to reliably access nodes from the root node (e.g. [code]"/root/Global"[/code] if an autoload named "Global" exists). */
  is_absolute(): boolean

  /** Returns [code]true[/code] if the node path has been constructed from an empty [String] ([code]""[/code]). */
  is_empty(): boolean

  /**
   * Returns the slice of the [NodePath], from [param begin] (inclusive) to [param end] (exclusive), as a new [NodePath].
   *
   * The absolute value of [param begin] and [param end] will be clamped to the sum of [method get_name_count] and [method get_subname_count], so the default value for [param end] makes it slice to the end of the [NodePath] by default (i.e. `path.slice(1)` is a shorthand for `path.slice(1, path.get_name_count() + path.get_subname_count())`).
   *
   * If either [param begin] or [param end] are negative, they will be relative to the end of the [NodePath] (i.e. `path.slice(0, -2)` is a shorthand for `path.slice(0, path.get_name_count() + path.get_subname_count() - 2)`).
   *
   */
  slice(begin: int, end?: int): NodePathType

  connect<T extends SignalsOf<NodePath>>(
    signal: T,
    method: SignalFunction<NodePath[T]>
  ): number
}
