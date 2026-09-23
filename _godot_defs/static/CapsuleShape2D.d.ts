/**
 * A 2D capsule shape, intended for use in physics. Usually used to provide a shape for a [CollisionShape2D].
 *
 * **Performance:** [CapsuleShape2D] is fast to check collisions against, but it is slower than [RectangleShape2D] and [CircleShape2D].
 *
 */
declare class CapsuleShape2D extends Shape2D {
  /**
   * A 2D capsule shape, intended for use in physics. Usually used to provide a shape for a [CollisionShape2D].
   *
   * **Performance:** [CapsuleShape2D] is fast to check collisions against, but it is slower than [RectangleShape2D] and [CircleShape2D].
   *
   */
  new(): CapsuleShape2D
  constructor()
  static new(): CapsuleShape2D

  /**
   * The capsule's full height, including the semicircles.
   *
   * **Note:** The [member height] of a capsule must be at least twice its [member radius]. Otherwise, the capsule becomes a circle. If the [member height] is less than twice the [member radius], the properties adjust to a valid value.
   *
   */
  height: float

  /** The capsule's height, excluding the semicircles. This is the height of the central rectangular part in the middle of the capsule, and is the distance between the centers of the two semicircles. This is a wrapper for [member height]. */
  mid_height: float

  /**
   * The capsule's radius.
   *
   * **Note:** The [member radius] of a capsule cannot be greater than half of its [member height]. Otherwise, the capsule becomes a circle. If the [member radius] is greater than half of the [member height], the properties adjust to a valid value.
   *
   */
  radius: float

  connect<T extends SignalsOf<CapsuleShape2D>>(
    signal: T,
    method: SignalFunction<CapsuleShape2D[T]>
  ): number
}
