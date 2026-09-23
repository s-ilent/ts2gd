/**
 * Retrieves the pose (or global pose) relative to the parent Skeleton's rest in model space and transfers it to the child Skeleton.
 *
 * This modifier rewrites the pose of the child skeleton directly in the parent skeleton's update process. This means that it overwrites the mapped bone pose set in the normal process on the target skeleton. If you want to set the target skeleton bone pose after retargeting, you will need to add a [SkeletonModifier3D] child to the target skeleton and thereby modify the pose.
 *
 * **Note:** When the [member use_global_pose] is enabled, even if it is an unmapped bone, it can cause visual problems because the global pose is applied ignoring the parent bone's pose **if it has mapped bone children**. See also [member use_global_pose].
 *
 */
declare class RetargetModifier3D extends SkeletonModifier3D {
  /**
   * Retrieves the pose (or global pose) relative to the parent Skeleton's rest in model space and transfers it to the child Skeleton.
   *
   * This modifier rewrites the pose of the child skeleton directly in the parent skeleton's update process. This means that it overwrites the mapped bone pose set in the normal process on the target skeleton. If you want to set the target skeleton bone pose after retargeting, you will need to add a [SkeletonModifier3D] child to the target skeleton and thereby modify the pose.
   *
   * **Note:** When the [member use_global_pose] is enabled, even if it is an unmapped bone, it can cause visual problems because the global pose is applied ignoring the parent bone's pose **if it has mapped bone children**. See also [member use_global_pose].
   *
   */
  new(): RetargetModifier3D
  constructor()
  static new(): RetargetModifier3D

  /** Flags to control the process of the transform elements individually when [member use_global_pose] is disabled. */
  enable: int

  /** [SkeletonProfile] for retargeting bones with names matching the bone list. */
  profile: SkeletonProfile

  /**
   * If `false`, in case the target skeleton has fewer bones than the source skeleton, the source bone parent's transform will be ignored.
   *
   * Instead, it is possible to retarget between models with different body shapes, and position, rotation, and scale can be retargeted separately.
   *
   * If `true`, retargeting is performed taking into account global pose.
   *
   * In case the target skeleton has fewer bones than the source skeleton, the source bone parent's transform is taken into account. However, bone length between skeletons must match exactly, if not, the bones will be forced to expand or shrink.
   *
   * This is useful for using dummy bone with length `0` to match postures when retargeting between models with different number of bones.
   *
   */
  use_global_pose: boolean

  /** Returns [code]true[/code] if [member enable] has [constant TRANSFORM_FLAG_POSITION]. */
  is_position_enabled(): boolean

  /** Returns [code]true[/code] if [member enable] has [constant TRANSFORM_FLAG_ROTATION]. */
  is_rotation_enabled(): boolean

  /** Returns [code]true[/code] if [member enable] has [constant TRANSFORM_FLAG_SCALE]. */
  is_scale_enabled(): boolean

  /** Sets [constant TRANSFORM_FLAG_POSITION] into [member enable]. */
  set_position_enabled(enabled: boolean): void

  /** Sets [constant TRANSFORM_FLAG_ROTATION] into [member enable]. */
  set_rotation_enabled(enabled: boolean): void

  /** Sets [constant TRANSFORM_FLAG_SCALE] into [member enable]. */
  set_scale_enabled(enabled: boolean): void

  connect<T extends SignalsOf<RetargetModifier3D>>(
    signal: T,
    method: SignalFunction<RetargetModifier3D[T]>
  ): number

  /**
   * If set, allows to retarget the position.
   *
   */
  static TRANSFORM_FLAG_POSITION: any

  /**
   * If set, allows to retarget the rotation.
   *
   */
  static TRANSFORM_FLAG_ROTATION: any

  /**
   * If set, allows to retarget the scale.
   *
   */
  static TRANSFORM_FLAG_SCALE: any

  /**
   * If set, allows to retarget the position/rotation/scale.
   *
   */
  static TRANSFORM_FLAG_ALL: any
}
