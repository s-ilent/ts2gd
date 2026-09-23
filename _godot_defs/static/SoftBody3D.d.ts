/**
 * A deformable 3D physics mesh. Used to create elastic or deformable objects such as cloth, rubber, or other flexible materials.
 *
 * Additionally, [SoftBody3D] is subject to wind forces defined in [Area3D] (see [member Area3D.wind_source_path], [member Area3D.wind_force_magnitude], and [member Area3D.wind_attenuation_factor]).
 *
 * **Note:** It's recommended to use Jolt Physics when using [SoftBody3D] instead of the default GodotPhysics3D, as Jolt Physics' soft body implementation is faster and more reliable. You can switch the physics engine using the [member ProjectSettings.physics/3d/physics_engine] project setting.
 *
 */
declare class SoftBody3D extends MeshInstance3D {
  /**
   * A deformable 3D physics mesh. Used to create elastic or deformable objects such as cloth, rubber, or other flexible materials.
   *
   * Additionally, [SoftBody3D] is subject to wind forces defined in [Area3D] (see [member Area3D.wind_source_path], [member Area3D.wind_force_magnitude], and [member Area3D.wind_attenuation_factor]).
   *
   * **Note:** It's recommended to use Jolt Physics when using [SoftBody3D] instead of the default GodotPhysics3D, as Jolt Physics' soft body implementation is faster and more reliable. You can switch the physics engine using the [member ProjectSettings.physics/3d/physics_engine] project setting.
   *
   */
  new(): SoftBody3D
  constructor()
  static new(): SoftBody3D

  /**
   * The physics layers this SoftBody3D **is in**. Collision objects can exist in one or more of 32 different layers. See also [member collision_mask].
   *
   * **Note:** Object A can detect a contact with object B only if object B is in any of the layers that object A scans. See [url=$DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information.
   *
   */
  collision_layer: int

  /**
   * The physics layers this SoftBody3D **scans**. Collision objects can scan one or more of 32 different layers. See also [member collision_layer].
   *
   * **Note:** Object A can detect a contact with object B only if object B is in any of the layers that object A scans. See [url=$DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks]Collision layers and masks[/url] in the documentation for more information.
   *
   */
  collision_mask: int

  /** The body's damping coefficient. Higher values will slow down the body more noticeably when forces are applied. */
  damping_coefficient: float

  /** Defines the behavior in physics when [member Node.process_mode] is set to [constant Node.PROCESS_MODE_DISABLED]. */
  disable_mode: int

  /**
   * The body's drag coefficient. Higher values increase this body's air resistance.
   *
   * **Note:** This value is currently unused by Godot's default physics implementation.
   *
   */
  drag_coefficient: float

  /** Higher values will result in a stiffer body, while lower values will increase the body's ability to bend. The value can be between [code]0.0[/code] and [code]1.0[/code] (inclusive). */
  linear_stiffness: float

  /** [NodePath] to a [CollisionObject3D] this SoftBody3D should avoid clipping. */
  parent_collision_ignore: NodePathType

  /** The pressure coefficient of this soft body. Simulate pressure build-up from inside this body. Higher values increase the strength of this effect. */
  pressure_coefficient: float

  /** If [code]true[/code], the [SoftBody3D] will respond to [RayCast3D]s. */
  ray_pickable: boolean

  /**
   * Scales the rest lengths of [SoftBody3D]'s edge constraints. Positive values shrink the mesh, while negative values expand it. For example, a value of `0.1` shortens the edges of the mesh by 10%, while `-0.1` expands the edges by 10%.
   *
   * **Note:** [member shrinking_factor] is best used on surface meshes with pinned points.
   *
   */
  shrinking_factor: float

  /** Increasing this value will improve the resulting simulation, but can affect performance. Use with care. */
  simulation_precision: int

  /** The SoftBody3D's mass. */
  total_mass: float

  /** Adds a body to the list of bodies that this body can't collide with. */
  add_collision_exception_with(body: Node): void

  /** Distributes and applies a force to all points. A force is time dependent and meant to be applied every physics update. */
  apply_central_force(force: Vector3): void

  /**
   * Distributes and applies an impulse to all points.
   *
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   *
   */
  apply_central_impulse(impulse: Vector3): void

  /** Applies a force to a point. A force is time dependent and meant to be applied every physics update. */
  apply_force(point_index: int, force: Vector3): void

  /**
   * Applies an impulse to a point.
   *
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   *
   */
  apply_impulse(point_index: int, impulse: Vector3): void

  /** Returns an array of nodes that were added as collision exceptions for this body. */
  get_collision_exceptions(): PhysicsBody3D[]

  /** Returns whether or not the specified layer of the [member collision_layer] is enabled, given a [param layer_number] between 1 and 32. */
  get_collision_layer_value(layer_number: int): boolean

  /** Returns whether or not the specified layer of the [member collision_mask] is enabled, given a [param layer_number] between 1 and 32. */
  get_collision_mask_value(layer_number: int): boolean

  /** Returns the internal [RID] used by the [PhysicsServer3D] for this body. */
  get_physics_rid(): RID

  /** Returns local translation of a vertex in the surface array. */
  get_point_transform(point_index: int): Vector3

  /** Returns [code]true[/code] if vertex is set to pinned. */
  is_point_pinned(point_index: int): boolean

  /** Removes a body from the list of bodies that this body can't collide with. */
  remove_collision_exception_with(body: Node): void

  /** Based on [param value], enables or disables the specified layer in the [member collision_layer], given a [param layer_number] between 1 and 32. */
  set_collision_layer_value(layer_number: int, value: boolean): void

  /** Based on [param value], enables or disables the specified layer in the [member collision_mask], given a [param layer_number] between 1 and 32. */
  set_collision_mask_value(layer_number: int, value: boolean): void

  /** Sets the pinned state of a surface vertex. When set to [code]true[/code], the optional [param attachment_path] can define a [Node3D] the pinned vertex will be attached to. */
  set_point_pinned(
    point_index: int,
    pinned: boolean,
    attachment_path?: NodePathType,
    insert_at?: int
  ): void

  connect<T extends SignalsOf<SoftBody3D>>(
    signal: T,
    method: SignalFunction<SoftBody3D[T]>
  ): number

  /**
   * When [member Node.process_mode] is set to [constant Node.PROCESS_MODE_DISABLED], remove from the physics simulation to stop all physics interactions with this [SoftBody3D].
   *
   * Automatically re-added to the physics simulation when the [Node] is processed again.
   *
   */
  static DISABLE_MODE_REMOVE: any

  /**
   * When [member Node.process_mode] is set to [constant Node.PROCESS_MODE_DISABLED], do not affect the physics simulation.
   *
   */
  static DISABLE_MODE_KEEP_ACTIVE: any
}
