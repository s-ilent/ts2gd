/**
 * A 2D game object, with a transform (position, rotation, and scale). All 2D nodes, including physics objects and sprites, inherit from Node2D. Use Node2D as a parent node to move, scale and rotate children in a 2D project. Also gives control of the node's render order.
 *
 * **Note:** Since both [Node2D] and [Control] inherit from [CanvasItem], they share several concepts from the class such as the [member CanvasItem.z_index] and [member CanvasItem.visible] properties.
 *
 */
declare class Node2D extends CanvasItem {
  /**
   * A 2D game object, with a transform (position, rotation, and scale). All 2D nodes, including physics objects and sprites, inherit from Node2D. Use Node2D as a parent node to move, scale and rotate children in a 2D project. Also gives control of the node's render order.
   *
   * **Note:** Since both [Node2D] and [Control] inherit from [CanvasItem], they share several concepts from the class such as the [member CanvasItem.z_index] and [member CanvasItem.visible] properties.
   *
   */
  new(): Node2D
  constructor()
  static new(): Node2D

  /** Global position. See also [member position]. */
  global_position: Vector2

  /** Global rotation in radians. See also [member rotation]. */
  global_rotation: float

  /** Helper property to access [member global_rotation] in degrees instead of radians. See also [member rotation_degrees]. */
  global_rotation_degrees: float

  /** Global scale. See also [member scale]. */
  global_scale: Vector2

  /** Global skew in radians. See also [member skew]. */
  global_skew: float

  /** Global [Transform2D]. See also [member transform]. */
  global_transform: Transform2D

  /** Position, relative to the node's parent. See also [member global_position]. */
  position: Vector2

  /**
   * Rotation in radians, relative to the node's parent. See also [member global_rotation].
   *
   * **Note:** This property is edited in the inspector in degrees. If you want to use degrees in a script, use [member rotation_degrees].
   *
   */
  rotation: float

  /** Helper property to access [member rotation] in degrees instead of radians. See also [member global_rotation_degrees]. */
  rotation_degrees: float

  /**
   * The node's scale, relative to the node's parent. Unscaled value: `(1, 1)`. See also [member global_scale].
   *
   * **Note:** Negative X scales in 2D are not decomposable from the transformation matrix. Due to the way scale is represented with transformation matrices in Godot, negative scales on the X axis will be changed to negative scales on the Y axis and a rotation of 180 degrees when decomposed.
   *
   */
  scale: Vector2

  /**
   * If set to a non-zero value, slants the node in one direction or another. This can be used for pseudo-3D effects. See also [member global_skew].
   *
   * **Note:** Skew is performed on the X axis only, and **between** rotation and scaling.
   *
   * **Note:** This property is edited in the inspector in degrees. If you want to use degrees in a script, use `skew = deg_to_rad(value_in_degrees)`.
   *
   */
  skew: float

  /** The node's [Transform2D], relative to the node's parent. See also [member global_transform]. */
  transform: Transform2D

  /** Multiplies the current scale by the [param ratio] vector. */
  apply_scale(ratio: Vector2): void

  /**
   * Returns the angle between the node and the [param point] in radians. See also [method look_at].
   *
   * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/node2d_get_angle_to.png]Illustration of the returned angle.[/url]
   *
   */
  get_angle_to(point: Vector2): float

  /** Returns the [Transform2D] relative to this node's parent. */
  get_relative_transform_to_parent(parent: Node): Transform2D

  /** Adds the [param offset] vector to the node's global position. */
  global_translate(offset: Vector2): void

  /**
   * Rotates the node so that its local +X axis points towards the [param point], which is expected to use global coordinates. This method is a combination of both [method rotate] and [method get_angle_to].
   *
   * [param point] should not be the same as the node's position, otherwise the node always looks to the right.
   *
   */
  look_at(point: Vector2): void

  /** Applies a local translation on the node's X axis with the amount specified in [param delta]. If [param scaled] is [code]false[/code], normalizes the movement to occur independently of the node's [member scale]. */
  move_local_x(delta: float, scaled?: boolean): void

  /** Applies a local translation on the node's Y axis with the amount specified in [param delta]. If [param scaled] is [code]false[/code], normalizes the movement to occur independently of the node's [member scale]. */
  move_local_y(delta: float, scaled?: boolean): void

  /** Applies a rotation to the node, in radians, starting from its current rotation. This is equivalent to [code]rotation += radians[/code]. */
  rotate(radians: float): void

  /** Transforms the provided local position into a position in global coordinate space. The input is expected to be local relative to the [Node2D] it is called on. e.g. Applying this method to the positions of child nodes will correctly transform their positions into the global coordinate space, but applying it to a node's own position will give an incorrect result, as it will incorporate the node's own transformation into its global position. */
  to_global(local_point: Vector2): Vector2

  /** Transforms the provided global position into a position in local coordinate space. The output will be local relative to the [Node2D] it is called on. e.g. It is appropriate for determining the positions of child nodes, but it is not appropriate for determining its own position relative to its parent. */
  to_local(global_point: Vector2): Vector2

  /** Translates the node by the given [param offset] in local coordinates. This is equivalent to [code]position += offset[/code]. */
  translate(offset: Vector2): void

  connect<T extends SignalsOf<Node2D>>(
    signal: T,
    method: SignalFunction<Node2D[T]>
  ): number
}
