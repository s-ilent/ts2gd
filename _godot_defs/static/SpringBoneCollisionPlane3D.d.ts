/**
 * An infinite plane collision that interacts with [SpringBoneSimulator3D]. It is an infinite size XZ plane, and the +Y direction is treated as normal.
 *
 */
declare class SpringBoneCollisionPlane3D extends SpringBoneCollision3D {
  /**
   * An infinite plane collision that interacts with [SpringBoneSimulator3D]. It is an infinite size XZ plane, and the +Y direction is treated as normal.
   *
   */
  new(): SpringBoneCollisionPlane3D
  constructor()
  static new(): SpringBoneCollisionPlane3D

  connect<T extends SignalsOf<SpringBoneCollisionPlane3D>>(
    signal: T,
    method: SignalFunction<SpringBoneCollisionPlane3D[T]>
  ): number
}
