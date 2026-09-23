/**
 * Apply the copied transform of the bone set by [method BoneConstraint3D.set_reference_bone] to the bone set by [method BoneConstraint3D.set_apply_bone] about the specific axis with remapping it with some options.
 *
 * There are 4 ways to apply the transform, depending on the combination of [method set_relative] and [method set_additive].
 *
 * **Relative + Additive:**
 *
 * - Extract reference pose relative to the rest and add it to the apply bone's pose.
 *
 * **Relative + Not Additive:**
 *
 * - Extract reference pose relative to the rest and add it to the apply bone's rest.
 *
 * **Not Relative + Additive:**
 *
 * - Extract reference pose absolutely and add it to the apply bone's pose.
 *
 * **Not Relative + Not Additive:**
 *
 * - Extract reference pose absolutely and the apply bone's pose is replaced with it.
 *
 * **Note:** Relative option is available only in the case [method BoneConstraint3D.get_reference_type] is [constant BoneConstraint3D.REFERENCE_TYPE_BONE]. See also [enum BoneConstraint3D.ReferenceType].
 *
 * **Note:** If there is a rotation greater than `180` degrees with constrained axes, flipping may occur.
 *
 */
declare class ConvertTransformModifier3D extends BoneConstraint3D {
  /**
   * Apply the copied transform of the bone set by [method BoneConstraint3D.set_reference_bone] to the bone set by [method BoneConstraint3D.set_apply_bone] about the specific axis with remapping it with some options.
   *
   * There are 4 ways to apply the transform, depending on the combination of [method set_relative] and [method set_additive].
   *
   * **Relative + Additive:**
   *
   * - Extract reference pose relative to the rest and add it to the apply bone's pose.
   *
   * **Relative + Not Additive:**
   *
   * - Extract reference pose relative to the rest and add it to the apply bone's rest.
   *
   * **Not Relative + Additive:**
   *
   * - Extract reference pose absolutely and add it to the apply bone's pose.
   *
   * **Not Relative + Not Additive:**
   *
   * - Extract reference pose absolutely and the apply bone's pose is replaced with it.
   *
   * **Note:** Relative option is available only in the case [method BoneConstraint3D.get_reference_type] is [constant BoneConstraint3D.REFERENCE_TYPE_BONE]. See also [enum BoneConstraint3D.ReferenceType].
   *
   * **Note:** If there is a rotation greater than `180` degrees with constrained axes, flipping may occur.
   *
   */
  new(): ConvertTransformModifier3D
  constructor()
  static new(): ConvertTransformModifier3D

  /** The number of settings in the modifier. */
  setting_count: int

  /** Returns the axis of the remapping destination transform. */
  get_apply_axis(index: int): int

  /** Returns the maximum value of the remapping destination range. */
  get_apply_range_max(index: int): float

  /** Returns the minimum value of the remapping destination range. */
  get_apply_range_min(index: int): float

  /** Returns the operation of the remapping destination transform. */
  get_apply_transform_mode(index: int): int

  /** Returns the axis of the remapping source transform. */
  get_reference_axis(index: int): int

  /** Returns the maximum value of the remapping source range. */
  get_reference_range_max(index: int): float

  /** Returns the minimum value of the remapping source range. */
  get_reference_range_min(index: int): float

  /** Returns the operation of the remapping source transform. */
  get_reference_transform_mode(index: int): int

  /** Returns [code]true[/code] if the additive option is enabled in the setting at [param index]. */
  is_additive(index: int): boolean

  /** Returns [code]true[/code] if the relative option is enabled in the setting at [param index]. */
  is_relative(index: int): boolean

  /**
   * Sets additive option in the setting at [param index] to [param enabled]. This mainly affects the process of applying transform to the [method BoneConstraint3D.set_apply_bone].
   *
   * If sets [param enabled] to `true`, the processed transform is added to the pose of the current apply bone.
   *
   * If sets [param enabled] to `false`, the pose of the current apply bone is replaced with the processed transform. However, if set [method set_relative] to `true`, the transform is relative to rest.
   *
   */
  set_additive(index: int, enabled: boolean): void

  /** Sets the axis of the remapping destination transform. */
  set_apply_axis(index: int, axis: int): void

  /** Sets the maximum value of the remapping destination range. */
  set_apply_range_max(index: int, range_max: float): void

  /** Sets the minimum value of the remapping destination range. */
  set_apply_range_min(index: int, range_min: float): void

  /** Sets the operation of the remapping destination transform. */
  set_apply_transform_mode(index: int, transform_mode: int): void

  /** Sets the axis of the remapping source transform. */
  set_reference_axis(index: int, axis: int): void

  /** Sets the maximum value of the remapping source range. */
  set_reference_range_max(index: int, range_max: float): void

  /** Sets the minimum value of the remapping source range. */
  set_reference_range_min(index: int, range_min: float): void

  /** Sets the operation of the remapping source transform. */
  set_reference_transform_mode(index: int, transform_mode: int): void

  /**
   * Sets relative option in the setting at [param index] to [param enabled].
   *
   * If sets [param enabled] to `true`, the extracted and applying transform is relative to the rest.
   *
   * If sets [param enabled] to `false`, the extracted transform is absolute.
   *
   */
  set_relative(index: int, enabled: boolean): void

  connect<T extends SignalsOf<ConvertTransformModifier3D>>(
    signal: T,
    method: SignalFunction<ConvertTransformModifier3D[T]>
  ): number

  /**
   * Convert with position. Transfer the difference.
   *
   */
  static TRANSFORM_MODE_POSITION: any

  /**
   * Convert with rotation. The angle is the roll for the specified axis.
   *
   */
  static TRANSFORM_MODE_ROTATION: any

  /**
   * Convert with scale. Transfers the ratio, not the difference.
   *
   */
  static TRANSFORM_MODE_SCALE: any
}
