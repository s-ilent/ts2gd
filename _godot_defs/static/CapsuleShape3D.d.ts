/**
 * A 3D capsule shape, intended for use in physics. Usually used to provide a shape for a [CollisionShape3D].
 *
 * **Performance:** [CapsuleShape3D] is fast to check collisions against. It is faster than [CylinderShape3D], but slower than [SphereShape3D] and [BoxShape3D].
 *
 */
declare class CapsuleShape3D extends Shape3D {
  /**
   * A 3D capsule shape, intended for use in physics. Usually used to provide a shape for a [CollisionShape3D].
   *
   * **Performance:** [CapsuleShape3D] is fast to check collisions against. It is faster than [CylinderShape3D], but slower than [SphereShape3D] and [BoxShape3D].
   *
   */
  new(): CapsuleShape3D
  constructor()
  static new(): CapsuleShape3D

  /**
   * The capsule's full height, including the hemispheres.
   *
   * **Note:** The [member height] of a capsule must be at least twice its [member radius]. Otherwise, the capsule becomes a sphere. If the [member height] is less than twice the [member radius], the properties adjust to a valid value.
   *
   */
  height: float

  /** The capsule's height, excluding the hemispheres. This is the height of the central cylindrical part in the middle of the capsule, and is the distance between the centers of the two hemispheres. This is a wrapper for [member height]. */
  mid_height: float

  /**
   * The capsule's radius.
   *
   * **Note:** The [member radius] of a capsule cannot be greater than half of its [member height]. Otherwise, the capsule becomes a sphere. If the [member radius] is greater than half of the [member height], the properties adjust to a valid value.
   *
   */
  radius: float

  connect<T extends SignalsOf<CapsuleShape3D>>(
    signal: T,
    method: SignalFunction<CapsuleShape3D[T]>
  ): number
}
