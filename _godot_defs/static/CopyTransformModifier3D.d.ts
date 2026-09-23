/**
 * Apply the copied transform of the bone set by [method BoneConstraint3D.set_reference_bone] to the bone set by [method BoneConstraint3D.set_apply_bone] with processing it with some masks and options.
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
 */
declare class CopyTransformModifier3D extends BoneConstraint3D {
  /**
   * Apply the copied transform of the bone set by [method BoneConstraint3D.set_reference_bone] to the bone set by [method BoneConstraint3D.set_apply_bone] with processing it with some masks and options.
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
   */
  new(): CopyTransformModifier3D
  constructor()
  static new(): CopyTransformModifier3D

  /** The number of settings in the modifier. */
  setting_count: int

  /** Returns the axis flags of the setting at [param index]. */
  get_axis_flags(index: int): int

  /** Returns the copy flags of the setting at [param index]. */
  get_copy_flags(index: int): int

  /** Returns the invert flags of the setting at [param index]. */
  get_invert_flags(index: int): int

  /** Returns [code]true[/code] if the additive option is enabled in the setting at [param index]. */
  is_additive(index: int): boolean

  /** Returns [code]true[/code] if the enable flags has the flag for the X-axis in the setting at [param index]. See also [method set_axis_flags]. */
  is_axis_x_enabled(index: int): boolean

  /** Returns [code]true[/code] if the invert flags has the flag for the X-axis in the setting at [param index]. See also [method set_invert_flags]. */
  is_axis_x_inverted(index: int): boolean

  /** Returns [code]true[/code] if the enable flags has the flag for the Y-axis in the setting at [param index]. See also [method set_axis_flags]. */
  is_axis_y_enabled(index: int): boolean

  /** Returns [code]true[/code] if the invert flags has the flag for the Y-axis in the setting at [param index]. See also [method set_invert_flags]. */
  is_axis_y_inverted(index: int): boolean

  /** Returns [code]true[/code] if the enable flags has the flag for the Z-axis in the setting at [param index]. See also [method set_axis_flags]. */
  is_axis_z_enabled(index: int): boolean

  /** Returns [code]true[/code] if the invert flags has the flag for the Z-axis in the setting at [param index]. See also [method set_invert_flags]. */
  is_axis_z_inverted(index: int): boolean

  /** Returns [code]true[/code] if the copy flags has the flag for the position in the setting at [param index]. See also [method set_copy_flags]. */
  is_position_copying(index: int): boolean

  /** Returns [code]true[/code] if the relative option is enabled in the setting at [param index]. */
  is_relative(index: int): boolean

  /** Returns [code]true[/code] if the copy flags has the flag for the rotation in the setting at [param index]. See also [method set_copy_flags]. */
  is_rotation_copying(index: int): boolean

  /** Returns [code]true[/code] if the copy flags has the flag for the scale in the setting at [param index]. See also [method set_copy_flags]. */
  is_scale_copying(index: int): boolean

  /**
   * Sets additive option in the setting at [param index] to [param enabled]. This mainly affects the process of applying transform to the [method BoneConstraint3D.set_apply_bone].
   *
   * If sets [param enabled] to `true`, the processed transform is added to the pose of the current apply bone.
   *
   * If sets [param enabled] to `false`, the pose of the current apply bone is replaced with the processed transform. However, if set [method set_relative] to `true`, the transform is relative to rest.
   *
   */
  set_additive(index: int, enabled: boolean): void

  /** Sets the flags to copy axes. If the flag is valid, the axis is copied. */
  set_axis_flags(index: int, axis_flags: int): void

  /** If sets [param enabled] to [code]true[/code], the X-axis will be copied. */
  set_axis_x_enabled(index: int, enabled: boolean): void

  /** If sets [param enabled] to [code]true[/code], the X-axis will be inverted. */
  set_axis_x_inverted(index: int, enabled: boolean): void

  /** If sets [param enabled] to [code]true[/code], the Y-axis will be copied. */
  set_axis_y_enabled(index: int, enabled: boolean): void

  /** If sets [param enabled] to [code]true[/code], the Y-axis will be inverted. */
  set_axis_y_inverted(index: int, enabled: boolean): void

  /** If sets [param enabled] to [code]true[/code], the Z-axis will be copied. */
  set_axis_z_enabled(index: int, enabled: boolean): void

  /** If sets [param enabled] to [code]true[/code], the Z-axis will be inverted. */
  set_axis_z_inverted(index: int, enabled: boolean): void

  /**
   * Sets the flags to process the transform operations. If the flag is valid, the transform operation is processed.
   *
   * **Note:** If the rotation is valid for only one axis, it respects the roll of the valid axis. If the rotation is valid for two axes, it discards the roll of the invalid axis.
   *
   */
  set_copy_flags(index: int, copy_flags: int): void

  /** If sets [param enabled] to [code]true[/code], the position will be copied. */
  set_copy_position(index: int, enabled: boolean): void

  /** If sets [param enabled] to [code]true[/code], the rotation will be copied. */
  set_copy_rotation(index: int, enabled: boolean): void

  /** If sets [param enabled] to [code]true[/code], the scale will be copied. */
  set_copy_scale(index: int, enabled: boolean): void

  /**
   * Sets the flags to inverte axes. If the flag is valid, the axis is copied.
   *
   * **Note:** An inverted scale means an inverse number, not a negative scale. For example, inverting `2.0` means `0.5`.
   *
   * **Note:** An inverted rotation flips the elements of the quaternion. For example, a two-axis inversion will flip the roll of each axis, and a three-axis inversion will flip the final orientation. However, be aware that flipping only one axis may cause unintended rotation by the unflipped axes, due to the characteristics of the quaternion.
   *
   */
  set_invert_flags(index: int, axis_flags: int): void

  /**
   * Sets relative option in the setting at [param index] to [param enabled].
   *
   * If sets [param enabled] to `true`, the extracted and applying transform is relative to the rest.
   *
   * If sets [param enabled] to `false`, the extracted transform is absolute.
   *
   */
  set_relative(index: int, enabled: boolean): void

  connect<T extends SignalsOf<CopyTransformModifier3D>>(
    signal: T,
    method: SignalFunction<CopyTransformModifier3D[T]>
  ): number

  /**
   * If set, allows to copy the position.
   *
   */
  static TRANSFORM_FLAG_POSITION: any

  /**
   * If set, allows to copy the rotation.
   *
   */
  static TRANSFORM_FLAG_ROTATION: any

  /**
   * If set, allows to copy the scale.
   *
   */
  static TRANSFORM_FLAG_SCALE: any

  /**
   * If set, allows to copy the position/rotation/scale.
   *
   */
  static TRANSFORM_FLAG_ALL: any

  /**
   * If set, allows to process the X-axis.
   *
   */
  static AXIS_FLAG_X: any

  /**
   * If set, allows to process the Y-axis.
   *
   */
  static AXIS_FLAG_Y: any

  /**
   * If set, allows to process the Z-axis.
   *
   */
  static AXIS_FLAG_Z: any

  /**
   * If set, allows to process the all axes.
   *
   */
  static AXIS_FLAG_ALL: any
}
