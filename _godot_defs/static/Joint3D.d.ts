/**
 * Abstract base class for all joints in 3D physics. 3D joints bind together two physics bodies ([member node_a] and [member node_b]) and apply a constraint. If only one body is defined, it is attached to a fixed [StaticBody3D] without collision shapes.
 *
 */
declare class Joint3D extends Node3D {
  /**
   * Abstract base class for all joints in 3D physics. 3D joints bind together two physics bodies ([member node_a] and [member node_b]) and apply a constraint. If only one body is defined, it is attached to a fixed [StaticBody3D] without collision shapes.
   *
   */
  new(): Joint3D
  constructor()
  static new(): Joint3D

  /** If [code]true[/code], the two bodies bound together do not collide with each other. */
  exclude_nodes_from_collision: boolean

  /**
   * Path to the first node (A) attached to the joint. The node must inherit [PhysicsBody3D].
   *
   * If left empty and [member node_b] is set, the body is attached to a fixed [StaticBody3D] without collision shapes.
   *
   */
  node_a: NodePathType

  /**
   * Path to the second node (B) attached to the joint. The node must inherit [PhysicsBody3D].
   *
   * If left empty and [member node_a] is set, the body is attached to a fixed [StaticBody3D] without collision shapes.
   *
   */
  node_b: NodePathType

  /** The priority used to define which solver is executed first for multiple joints. The lower the value, the higher the priority. */
  solver_priority: int

  /** Returns the joint's internal [RID] from the [PhysicsServer3D]. */
  get_rid(): RID

  connect<T extends SignalsOf<Joint3D>>(
    signal: T,
    method: SignalFunction<Joint3D[T]>
  ): number
}
