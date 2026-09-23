/**
 */
declare class PhysicsServer3DRenderingServerHandler extends Object {
  /**
   */
  new(): PhysicsServer3DRenderingServerHandler
  constructor()
  static new(): PhysicsServer3DRenderingServerHandler

  /** Called by the [PhysicsServer3D] to set the bounding box for the [SoftBody3D]. */
  protected _set_aabb(aabb: AABB): void

  /**
   * Called by the [PhysicsServer3D] to set the normal for the [SoftBody3D] vertex at the index specified by [param vertex_id].
   *
   * **Note:** The [param normal] parameter used to be of type `const void*` prior to Godot 4.2.
   *
   */
  protected _set_normal(vertex_id: int, normal: Vector3): void

  /**
   * Called by the [PhysicsServer3D] to set the position for the [SoftBody3D] vertex at the index specified by [param vertex_id].
   *
   * **Note:** The [param vertex] parameter used to be of type `const void*` prior to Godot 4.2.
   *
   */
  protected _set_vertex(vertex_id: int, vertex: Vector3): void

  /** Sets the bounding box for the [SoftBody3D]. */
  set_aabb(aabb: AABB): void

  /** Sets the normal for the [SoftBody3D] vertex at the index specified by [param vertex_id]. */
  set_normal(vertex_id: int, normal: Vector3): void

  /** Sets the position for the [SoftBody3D] vertex at the index specified by [param vertex_id]. */
  set_vertex(vertex_id: int, vertex: Vector3): void

  connect<T extends SignalsOf<PhysicsServer3DRenderingServerHandler>>(
    signal: T,
    method: SignalFunction<PhysicsServer3DRenderingServerHandler[T]>
  ): number
}
