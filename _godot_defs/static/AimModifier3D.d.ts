/**
 * This is a simple version of [LookAtModifier3D] that only allows bone to the reference without advanced options such as angle limitation or time-based interpolation.
 *
 * The feature is simplified, but instead it is implemented with smooth tracking without euler, see [method set_use_euler].
 *
 */
declare class AimModifier3D extends BoneConstraint3D {
  /**
   * This is a simple version of [LookAtModifier3D] that only allows bone to the reference without advanced options such as angle limitation or time-based interpolation.
   *
   * The feature is simplified, but instead it is implemented with smooth tracking without euler, see [method set_use_euler].
   *
   */
  new(): AimModifier3D
  constructor()
  static new(): AimModifier3D

  /** The number of settings in the modifier. */
  setting_count: int

  /** Returns the forward axis of the bone. */
  get_forward_axis(index: int): int

  /** Returns the axis of the first rotation. It is enabled only if [method is_using_euler] is [code]true[/code]. */
  get_primary_rotation_axis(index: int): int

  /** Returns [code]true[/code] if the relative option is enabled in the setting at [param index]. */
  is_relative(index: int): boolean

  /** Returns [code]true[/code] if it provides rotation with using euler. */
  is_using_euler(index: int): boolean

  /** Returns [code]true[/code] if it provides rotation by two axes. It is enabled only if [method is_using_euler] is [code]true[/code]. */
  is_using_secondary_rotation(index: int): boolean

  /** Sets the forward axis of the bone. */
  set_forward_axis(index: int, axis: int): void

  /** Sets the axis of the first rotation. It is enabled only if [method is_using_euler] is [code]true[/code]. */
  set_primary_rotation_axis(index: int, axis: int): void

  /**
   * Sets relative option in the setting at [param index] to [param enabled].
   *
   * If sets [param enabled] to `true`, the rotation is applied relative to the pose.
   *
   * If sets [param enabled] to `false`, the rotation is applied relative to the rest. It means to replace the current pose with the [AimModifier3D]'s result.
   *
   */
  set_relative(index: int, enabled: boolean): void

  /**
   * If sets [param enabled] to `true`, it provides rotation with using euler.
   *
   * If sets [param enabled] to `false`, it provides rotation with using rotation by arc generated from the forward axis vector and the vector toward the reference.
   *
   */
  set_use_euler(index: int, enabled: boolean): void

  /** If sets [param enabled] to [code]true[/code], it provides rotation by two axes. It is enabled only if [method is_using_euler] is [code]true[/code]. */
  set_use_secondary_rotation(index: int, enabled: boolean): void

  connect<T extends SignalsOf<AimModifier3D>>(
    signal: T,
    method: SignalFunction<AimModifier3D[T]>
  ): number
}
