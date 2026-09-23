/**
 * Base class of [SkeletonModifier3D]s that has some joint lists and applies inverse kinematics. This class has some structs, enums, and helper methods which are useful to solve inverse kinematics.
 *
 */
declare class IKModifier3D extends SkeletonModifier3D {
  /**
   * Base class of [SkeletonModifier3D]s that has some joint lists and applies inverse kinematics. This class has some structs, enums, and helper methods which are useful to solve inverse kinematics.
   *
   */
  new(): IKModifier3D
  constructor()
  static new(): IKModifier3D

  /**
   * If `true`, the solver retrieves the bone axis from the bone pose every frame.
   *
   * If `false`, the solver retrieves the bone axis from the bone rest and caches it, which increases performance slightly, but position changes in the bone pose made before processing this [IKModifier3D] are ignored.
   *
   */
  mutable_bone_axes: boolean

  /** Clears all settings. */
  clear_settings(): void

  /** Returns the number of settings. */
  get_setting_count(): int

  /** Resets a state with respect to the current bone pose. */
  reset(): void

  /** Sets the number of settings. */
  set_setting_count(count: int): void

  connect<T extends SignalsOf<IKModifier3D>>(
    signal: T,
    method: SignalFunction<IKModifier3D[T]>
  ): number
}
