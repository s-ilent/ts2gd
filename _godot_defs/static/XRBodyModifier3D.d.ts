/**
 * This node uses body tracking data from an [XRBodyTracker] to pose the skeleton of a body mesh.
 *
 * Positioning of the body is performed by creating an [XRNode3D] ancestor of the body mesh driven by the same [XRBodyTracker].
 *
 * The body tracking position-data is scaled by [member Skeleton3D.motion_scale] when applied to the skeleton, which can be used to adjust the tracked body to match the scale of the body model.
 *
 */
declare class XRBodyModifier3D extends SkeletonModifier3D {
  /**
   * This node uses body tracking data from an [XRBodyTracker] to pose the skeleton of a body mesh.
   *
   * Positioning of the body is performed by creating an [XRNode3D] ancestor of the body mesh driven by the same [XRBodyTracker].
   *
   * The body tracking position-data is scaled by [member Skeleton3D.motion_scale] when applied to the skeleton, which can be used to adjust the tracked body to match the scale of the body model.
   *
   */
  new(): XRBodyModifier3D
  constructor()
  static new(): XRBodyModifier3D

  /** The name of the [XRBodyTracker] registered with [XRServer] to obtain the body tracking data from. */
  body_tracker: StringName

  /** Specifies the body parts to update. */
  body_update: int

  /** Specifies the type of updates to perform on the bones. */
  bone_update: int

  connect<T extends SignalsOf<XRBodyModifier3D>>(
    signal: T,
    method: SignalFunction<XRBodyModifier3D[T]>
  ): number

  /**
   * The skeleton's upper body joints are updated.
   *
   */
  static BODY_UPDATE_UPPER_BODY: any

  /**
   * The skeleton's lower body joints are updated.
   *
   */
  static BODY_UPDATE_LOWER_BODY: any

  /**
   * The skeleton's hand joints are updated.
   *
   */
  static BODY_UPDATE_HANDS: any

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
