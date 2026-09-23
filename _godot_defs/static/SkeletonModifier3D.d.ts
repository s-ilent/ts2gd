/**
 * [SkeletonModifier3D] retrieves a target [Skeleton3D] by having a [Skeleton3D] parent.
 *
 * If there is an [AnimationMixer], a modification always performs after playback process of the [AnimationMixer].
 *
 * This node should be used to implement custom IK solvers, constraints, or skeleton physics.
 *
 */
declare class SkeletonModifier3D extends Node3D {
  /**
   * [SkeletonModifier3D] retrieves a target [Skeleton3D] by having a [Skeleton3D] parent.
   *
   * If there is an [AnimationMixer], a modification always performs after playback process of the [AnimationMixer].
   *
   * This node should be used to implement custom IK solvers, constraints, or skeleton physics.
   *
   */
  new(): SkeletonModifier3D
  constructor()
  static new(): SkeletonModifier3D

  /** If [code]true[/code], the [SkeletonModifier3D] will be processing. */
  active: boolean

  /**
   * Sets the influence of the modification.
   *
   * **Note:** This value is used by [Skeleton3D] to blend, so the [SkeletonModifier3D] should always apply only 100% of the result without interpolation.
   *
   */
  influence: float

  /**
   * Override this virtual method to implement a custom skeleton modifier. You should do things like get the [Skeleton3D]'s current pose and apply the pose here.
   *
   * [method _process_modification] must not apply [member influence] to bone poses because the [Skeleton3D] automatically applies influence to all bone poses set by the modifier.
   *
   */
  protected _process_modification(): void

  /**
   * Override this virtual method to implement a custom skeleton modifier. You should do things like get the [Skeleton3D]'s current pose and apply the pose here.
   *
   * [method _process_modification_with_delta] must not apply [member influence] to bone poses because the [Skeleton3D] automatically applies influence to all bone poses set by the modifier.
   *
   * [param delta] is passed from parent [Skeleton3D]. See also [method Skeleton3D.advance].
   *
   */
  protected _process_modification_with_delta(delta: float): void

  /** Called when the skeleton is changed. */
  protected _skeleton_changed(
    old_skeleton: Skeleton3D,
    new_skeleton: Skeleton3D
  ): void

  /** Called when bone names and indices need to be validated, such as when entering the scene tree or changing skeleton. */
  protected _validate_bone_names(): void

  /** Returns the parent [Skeleton3D] node if it exists. Otherwise, returns [code]null[/code]. */
  get_skeleton(): Skeleton3D

  connect<T extends SignalsOf<SkeletonModifier3D>>(
    signal: T,
    method: SignalFunction<SkeletonModifier3D[T]>
  ): number

  /**
   * Enumerated value for the +X axis.
   *
   */
  static BONE_AXIS_PLUS_X: any

  /**
   * Enumerated value for the -X axis.
   *
   */
  static BONE_AXIS_MINUS_X: any

  /**
   * Enumerated value for the +Y axis.
   *
   */
  static BONE_AXIS_PLUS_Y: any

  /**
   * Enumerated value for the -Y axis.
   *
   */
  static BONE_AXIS_MINUS_Y: any

  /**
   * Enumerated value for the +Z axis.
   *
   */
  static BONE_AXIS_PLUS_Z: any

  /**
   * Enumerated value for the -Z axis.
   *
   */
  static BONE_AXIS_MINUS_Z: any

  /**
   * Enumerated value for the +X axis.
   *
   */
  static BONE_DIRECTION_PLUS_X: any

  /**
   * Enumerated value for the -X axis.
   *
   */
  static BONE_DIRECTION_MINUS_X: any

  /**
   * Enumerated value for the +Y axis.
   *
   */
  static BONE_DIRECTION_PLUS_Y: any

  /**
   * Enumerated value for the -Y axis.
   *
   */
  static BONE_DIRECTION_MINUS_Y: any

  /**
   * Enumerated value for the +Z axis.
   *
   */
  static BONE_DIRECTION_PLUS_Z: any

  /**
   * Enumerated value for the -Z axis.
   *
   */
  static BONE_DIRECTION_MINUS_Z: any

  /**
   * Enumerated value for the axis from a parent bone to the child bone.
   *
   */
  static BONE_DIRECTION_FROM_PARENT: any

  /**
   * Enumerated value for the case when the axis is undefined.
   *
   */
  static SECONDARY_DIRECTION_NONE: any

  /**
   * Enumerated value for the +X axis.
   *
   */
  static SECONDARY_DIRECTION_PLUS_X: any

  /**
   * Enumerated value for the -X axis.
   *
   */
  static SECONDARY_DIRECTION_MINUS_X: any

  /**
   * Enumerated value for the +Y axis.
   *
   */
  static SECONDARY_DIRECTION_PLUS_Y: any

  /**
   * Enumerated value for the -Y axis.
   *
   */
  static SECONDARY_DIRECTION_MINUS_Y: any

  /**
   * Enumerated value for the +Z axis.
   *
   */
  static SECONDARY_DIRECTION_PLUS_Z: any

  /**
   * Enumerated value for the -Z axis.
   *
   */
  static SECONDARY_DIRECTION_MINUS_Z: any

  /**
   * Enumerated value for an optional axis.
   *
   */
  static SECONDARY_DIRECTION_CUSTOM: any

  /**
   * Enumerated value for the rotation of the X axis.
   *
   */
  static ROTATION_AXIS_X: any

  /**
   * Enumerated value for the rotation of the Y axis.
   *
   */
  static ROTATION_AXIS_Y: any

  /**
   * Enumerated value for the rotation of the Z axis.
   *
   */
  static ROTATION_AXIS_Z: any

  /**
   * Enumerated value for the unconstrained rotation.
   *
   */
  static ROTATION_AXIS_ALL: any

  /**
   * Enumerated value for an optional rotation axis.
   *
   */
  static ROTATION_AXIS_CUSTOM: any

  /**
   * Notifies when the modification have been finished.
   *
   * **Note:** If you want to get the modified bone pose by the modifier, you must use [method Skeleton3D.get_bone_pose] or [method Skeleton3D.get_bone_global_pose] at the moment this signal is fired.
   *
   */
  $modification_processed: Signal<() => void>
}
