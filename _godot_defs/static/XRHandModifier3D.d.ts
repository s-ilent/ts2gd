/**
 * This node uses hand tracking data from an [XRHandTracker] to pose the skeleton of a hand mesh.
 *
 * Positioning of hands is performed by creating an [XRNode3D] ancestor of the hand mesh driven by the same [XRHandTracker].
 *
 * The hand tracking position-data is scaled by [member Skeleton3D.motion_scale] when applied to the skeleton, which can be used to adjust the tracked hand to match the scale of the hand model.
 *
 */
declare class XRHandModifier3D extends SkeletonModifier3D {
  /**
   * This node uses hand tracking data from an [XRHandTracker] to pose the skeleton of a hand mesh.
   *
   * Positioning of hands is performed by creating an [XRNode3D] ancestor of the hand mesh driven by the same [XRHandTracker].
   *
   * The hand tracking position-data is scaled by [member Skeleton3D.motion_scale] when applied to the skeleton, which can be used to adjust the tracked hand to match the scale of the hand model.
   *
   */
  new(): XRHandModifier3D
  constructor()
  static new(): XRHandModifier3D

  /** Specifies the type of updates to perform on the bones. */
  bone_update: int

  /** The name of the [XRHandTracker] registered with [XRServer] to obtain the hand tracking data from. */
  hand_tracker: StringName

  connect<T extends SignalsOf<XRHandModifier3D>>(
    signal: T,
    method: SignalFunction<XRHandModifier3D[T]>
  ): number

  /**
   * The skeleton's bones are fully updated (both position and rotation) to match the tracked bones.
   *
   */
  static BONE_UPDATE_FULL: any

  /**
   * The skeleton's bones are only rotated to align with the tracked bones, preserving bone length.
   *
   */
  static BONE_UPDATE_ROTATION_ONLY: any

  /**
   * Represents the size of the [enum BoneUpdate] enum.
   *
   */
  static BONE_UPDATE_MAX: any
}
