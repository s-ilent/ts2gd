/**
 * A cone shape limitation that interacts with [ChainIK3D].
 *
 */
declare class JointLimitationCone3D extends JointLimitation3D {
  /**
   * A cone shape limitation that interacts with [ChainIK3D].
   *
   */
  new(): JointLimitationCone3D
  constructor()
  static new(): JointLimitationCone3D

  /**
   * The radius range of the hole made by the cone.
   *
   * `0` degrees makes a sphere without hole, `180` degrees makes a hemisphere, and `360` degrees become empty (no limitation).
   *
   */
  angle: float

  connect<T extends SignalsOf<JointLimitationCone3D>>(
    signal: T,
    method: SignalFunction<JointLimitationCone3D[T]>
  ): number
}
