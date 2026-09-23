/**
 * The limitation is attached to each joint and limits the rotation of the bone.
 *
 */
declare class JointLimitation3D extends Resource {
  /**
   * The limitation is attached to each joint and limits the rotation of the bone.
   *
   */
  new(): JointLimitation3D
  constructor()
  static new(): JointLimitation3D

  connect<T extends SignalsOf<JointLimitation3D>>(
    signal: T,
    method: SignalFunction<JointLimitation3D[T]>
  ): number
}
