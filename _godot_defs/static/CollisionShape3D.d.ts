/**
 * A node that provides a [Shape3D] to a [CollisionObject3D] parent and allows it to be edited. This can give a detection shape to an [Area3D] or turn a [PhysicsBody3D] into a solid object.
 *
 * **Warning:** A non-uniformly scaled [CollisionShape3D] will likely not behave as expected. Make sure to keep its scale the same on all axes and adjust its [member shape] resource instead.
 *
 */
declare class CollisionShape3D extends Node3D {
  /**
   * A node that provides a [Shape3D] to a [CollisionObject3D] parent and allows it to be edited. This can give a detection shape to an [Area3D] or turn a [PhysicsBody3D] into a solid object.
   *
   * **Warning:** A non-uniformly scaled [CollisionShape3D] will likely not behave as expected. Make sure to keep its scale the same on all axes and adjust its [member shape] resource instead.
   *
   */
  new(): CollisionShape3D
  constructor()
  static new(): CollisionShape3D

  /**
   * The collision shape color that is displayed in the editor, or in the running project if **Debug > Visible Collision Shapes** is checked at the top of the editor.
   *
   * **Note:** The default value is [member ProjectSettings.debug/shapes/collision/shape_color]. The `Color(0, 0, 0, 0)` value documented here is a placeholder, and not the actual default debug color.
   *
   */
  debug_color: Color

  /** If [code]true[/code], when the shape is displayed, it will show a solid fill color in addition to its wireframe. */
  debug_fill: boolean

  /** A disabled collision shape has no effect in the world. This property should be changed with [method Object.set_deferred]. */
  disabled: boolean

  /** The actual shape owned by this collision shape. */
  shape: Shape3D

  /** Sets the collision shape's shape to the addition of all its convexed [MeshInstance3D] siblings geometry. */
  make_convex_from_siblings(): void

  /** This method does nothing. */
  resource_changed(resource: Resource): void

  connect<T extends SignalsOf<CollisionShape3D>>(
    signal: T,
    method: SignalFunction<CollisionShape3D[T]>
  ): number
}
