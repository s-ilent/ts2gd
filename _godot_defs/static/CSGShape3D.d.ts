/**
 * This is the CSG base class that provides CSG operation support to the various CSG nodes in Godot.
 *
 * **Performance:** CSG nodes are only intended for prototyping as they have a significant CPU performance cost. Consider baking final CSG operation results into static geometry that replaces the CSG nodes.
 *
 * Individual CSG root node results can be baked to nodes with static resources with the editor menu that appears when a CSG root node is selected.
 *
 * Individual CSG root nodes can also be baked to static resources with scripts by calling [method bake_static_mesh] for the visual mesh or [method bake_collision_shape] for the physics collision.
 *
 * Entire scenes of CSG nodes can be baked to static geometry and exported with the editor glTF scene exporter: **Scene > Export As... > glTF 2.0 Scene...**
 *
 */
declare class CSGShape3D extends GeometryInstance3D {
  /**
   * This is the CSG base class that provides CSG operation support to the various CSG nodes in Godot.
   *
   * **Performance:** CSG nodes are only intended for prototyping as they have a significant CPU performance cost. Consider baking final CSG operation results into static geometry that replaces the CSG nodes.
   *
   * Individual CSG root node results can be baked to nodes with static resources with the editor menu that appears when a CSG root node is selected.
   *
   * Individual CSG root nodes can also be baked to static resources with scripts by calling [method bake_static_mesh] for the visual mesh or [method bake_collision_shape] for the physics collision.
   *
   * Entire scenes of CSG nodes can be baked to static geometry and exported with the editor glTF scene exporter: **Scene > Export As... > glTF 2.0 Scene...**
   *
   */
  new(): CSGShape3D
  constructor()
  static new(): CSGShape3D

  /** Calculate tangents for the CSG shape which allows the use of normal and height maps. This is only applied on the root shape, this setting is ignored on any child. Setting this to [code]false[/code] can speed up shape generation slightly. */
  calculate_tangents: boolean

  /**
   * The physics layers this area is in.
   *
   * Collidable objects can exist in any of 32 different layers. These layers work like a tagging system, and are not visual. A collidable can use these layers to select with which objects it can collide, using the collision_mask property.
   *
   * A contact is detected if object A is in any of the layers that object B scans, or object B is in any layer scanned by object A. See [url=$DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information.
   *
   */
  collision_layer: int

  /** The physics layers this CSG shape scans for collisions. Only effective if [member use_collision] is [code]true[/code]. See [url=$DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information. */
  collision_mask: int

  /** The priority used to solve colliding when occurring penetration. Only effective if [member use_collision] is [code]true[/code]. The higher the priority is, the lower the penetration into the object will be. This can for example be used to prevent the player from breaking through the boundaries of a level. */
  collision_priority: float

  /** The operation that is performed on this shape. This is ignored for the first CSG child node as the operation is between this node and the previous child of this nodes parent. */
  operation: int

  /** This property does nothing. */
  snap: float

  /** Adds a collision shape to the physics engine for our CSG shape. This will always act like a static body. Note that the collision shape is still active even if the CSG shape itself is hidden. See also [member collision_mask] and [member collision_priority]. */
  use_collision: boolean

  /**
   * Returns a baked physics [ConcavePolygonShape3D] of this node's CSG operation result. Returns an empty shape if the node is not a CSG root node or has no valid geometry.
   *
   * **Performance:** If the CSG operation results in a very detailed geometry with many faces physics performance will be very slow. Concave shapes should in general only be used for static level geometry and not with dynamic objects that are moving.
   *
   * **Note:** CSG mesh data updates are deferred, which means they are updated with a delay of one rendered frame. To avoid getting an empty shape or outdated mesh data, make sure to call `await get_tree().process_frame` before using [method bake_collision_shape] in [method Node._ready] or after changing properties on the [CSGShape3D].
   *
   */
  bake_collision_shape(): ConcavePolygonShape3D

  /**
   * Returns a baked static [ArrayMesh] of this node's CSG operation result. Materials from involved CSG nodes are added as extra mesh surfaces. Returns an empty mesh if the node is not a CSG root node or has no valid geometry.
   *
   * **Note:** CSG mesh data updates are deferred, which means they are updated with a delay of one rendered frame. To avoid getting an empty mesh or outdated mesh data, make sure to call `await get_tree().process_frame` before using [method bake_static_mesh] in [method Node._ready] or after changing properties on the [CSGShape3D].
   *
   */
  bake_static_mesh(): ArrayMesh

  /** Returns whether or not the specified layer of the [member collision_layer] is enabled, given a [param layer_number] between 1 and 32. */
  get_collision_layer_value(layer_number: int): boolean

  /** Returns whether or not the specified layer of the [member collision_mask] is enabled, given a [param layer_number] between 1 and 32. */
  get_collision_mask_value(layer_number: int): boolean

  /**
   * Returns an [Array] with two elements, the first is the [Transform3D] of this node and the second is the root [Mesh] of this node. Only works when this node is the root shape.
   *
   * **Note:** CSG mesh data updates are deferred, which means they are updated with a delay of one rendered frame. To avoid getting an empty shape or outdated mesh data, make sure to call `await get_tree().process_frame` before using [method get_meshes] in [method Node._ready] or after changing properties on the [CSGShape3D].
   *
   */
  get_meshes(): any[]

  /** Returns [code]true[/code] if this is a root shape and is thus the object that is rendered. */
  is_root_shape(): boolean

  /** Based on [param value], enables or disables the specified layer in the [member collision_layer], given a [param layer_number] between 1 and 32. */
  set_collision_layer_value(layer_number: int, value: boolean): void

  /** Based on [param value], enables or disables the specified layer in the [member collision_mask], given a [param layer_number] between 1 and 32. */
  set_collision_mask_value(layer_number: int, value: boolean): void

  connect<T extends SignalsOf<CSGShape3D>>(
    signal: T,
    method: SignalFunction<CSGShape3D[T]>
  ): number

  /**
   * Geometry of both primitives is merged, intersecting geometry is removed.
   *
   */
  static OPERATION_UNION: any

  /**
   * Only intersecting geometry remains, the rest is removed.
   *
   */
  static OPERATION_INTERSECTION: any

  /**
   * The second shape is subtracted from the first, leaving a dent with its shape.
   *
   */
  static OPERATION_SUBTRACTION: any
}
