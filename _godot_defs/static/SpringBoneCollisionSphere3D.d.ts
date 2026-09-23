/**
 * A sphere shape collision that interacts with [SpringBoneSimulator3D].
 *
 */
declare class SpringBoneCollisionSphere3D extends SpringBoneCollision3D {
  /**
   * A sphere shape collision that interacts with [SpringBoneSimulator3D].
   *
   */
  new(): SpringBoneCollisionSphere3D
  constructor()
  static new(): SpringBoneCollisionSphere3D

  /** If [code]true[/code], the collision acts to trap the joint within the collision. */
  inside: boolean

  /** The sphere's radius. */
  radius: float

  connect<T extends SignalsOf<SpringBoneCollisionSphere3D>>(
    signal: T,
    method: SignalFunction<SpringBoneCollisionSphere3D[T]>
  ): number
}
