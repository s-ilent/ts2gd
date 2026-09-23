/**
 * A node that provides a polygon shape to a [CollisionObject2D] parent and allows it to be edited. The polygon can be concave or convex. This can give a detection shape to an [Area2D], turn a [PhysicsBody2D] into a solid object, or give a hollow shape to a [StaticBody2D].
 *
 * **Warning:** A non-uniformly scaled [CollisionPolygon2D] will likely not behave as expected. Make sure to keep its scale the same on all axes and adjust its polygon instead.
 *
 */
declare class CollisionPolygon2D extends Node2D {
  /**
   * A node that provides a polygon shape to a [CollisionObject2D] parent and allows it to be edited. The polygon can be concave or convex. This can give a detection shape to an [Area2D], turn a [PhysicsBody2D] into a solid object, or give a hollow shape to a [StaticBody2D].
   *
   * **Warning:** A non-uniformly scaled [CollisionPolygon2D] will likely not behave as expected. Make sure to keep its scale the same on all axes and adjust its polygon instead.
   *
   */
  new(): CollisionPolygon2D
  constructor()
  static new(): CollisionPolygon2D

  /** Collision build mode. */
  build_mode: int

  /** If [code]true[/code], no collisions will be detected. This property should be changed with [method Object.set_deferred]. */
  disabled: boolean

  /**
   * If `true`, only edges that face up, relative to [CollisionPolygon2D]'s rotation, will collide with other objects.
   *
   * **Note:** This property has no effect if this [CollisionPolygon2D] is a child of an [Area2D] node.
   *
   */
  one_way_collision: boolean

  /** The margin used for one-way collision (in pixels). Higher values will make the shape thicker, and work better for colliders that enter the polygon at a high velocity. */
  one_way_collision_margin: float

  /**
   * The polygon's list of vertices. Each point will be connected to the next, and the final point will be connected to the first.
   *
   * **Note:** The returned vertices are in the local coordinate space of the given [CollisionPolygon2D].
   *
   */
  polygon: PackedVector2Array

  connect<T extends SignalsOf<CollisionPolygon2D>>(
    signal: T,
    method: SignalFunction<CollisionPolygon2D[T]>
  ): number

  /**
   * Collisions will include the polygon and its contained area. In this mode the node has the same effect as several [ConvexPolygonShape2D] nodes, one for each convex shape in the convex decomposition of the polygon (but without the overhead of multiple nodes).
   *
   */
  static BUILD_SOLIDS: any

  /**
   * Collisions will only include the polygon edges. In this mode the node has the same effect as a single [ConcavePolygonShape2D] made of segments, with the restriction that each segment (after the first one) starts where the previous one ends, and the last one ends where the first one starts (forming a closed but hollow polygon).
   *
   */
  static BUILD_SEGMENTS: any
}
