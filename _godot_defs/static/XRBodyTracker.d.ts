/**
 * A body tracking system will create an instance of this object and add it to the [XRServer]. This tracking system will then obtain skeleton data, convert it to the Godot Humanoid skeleton and store this data on the [XRBodyTracker] object.
 *
 * Use [XRBodyModifier3D] to animate a body mesh using body tracking data.
 *
 */
declare class XRBodyTracker extends XRPositionalTracker {
  /**
   * A body tracking system will create an instance of this object and add it to the [XRServer]. This tracking system will then obtain skeleton data, convert it to the Godot Humanoid skeleton and store this data on the [XRBodyTracker] object.
   *
   * Use [XRBodyModifier3D] to animate a body mesh using body tracking data.
   *
   */
  new(): XRBodyTracker
  constructor()
  static new(): XRBodyTracker

  /** The type of body tracking data captured. */
  body_flags: int

  /** If [code]true[/code], the body tracking data is valid. */
  has_tracking_data: boolean

  /** Returns flags about the validity of the tracking data for the given body joint. */
  get_joint_flags(joint: int): int

  /** Returns the transform for the given body joint. */
  get_joint_transform(joint: int): Transform3D

  /** Sets flags about the validity of the tracking data for the given body joint. */
  set_joint_flags(joint: int, flags: int): void

  /** Sets the transform for the given body joint. */
  set_joint_transform(joint: int, transform: Transform3D): void

  connect<T extends SignalsOf<XRBodyTracker>>(
    signal: T,
    method: SignalFunction<XRBodyTracker[T]>
  ): number

  /**
   * Upper body tracking supported.
   *
   */
  static BODY_FLAG_UPPER_BODY_SUPPORTED: any

  /**
   * Lower body tracking supported.
   *
   */
  static BODY_FLAG_LOWER_BODY_SUPPORTED: any

  /**
   * Hand tracking supported.
   *
   */
  static BODY_FLAG_HANDS_SUPPORTED: any

  /**
   * Root joint.
   *
   */
  static JOINT_ROOT: any

  /**
   * Hips joint.
   *
   */
  static JOINT_HIPS: any

  /**
   * Spine joint.
   *
   */
  static JOINT_SPINE: any

  /**
   * Chest joint.
   *
   */
  static JOINT_CHEST: any

  /**
   * Upper chest joint.
   *
   */
  static JOINT_UPPER_CHEST: any

  /**
   * Neck joint.
   *
   */
  static JOINT_NECK: any

  /**
   * Head joint.
   *
   */
  static JOINT_HEAD: any

  /**
   * Head tip joint.
   *
   */
  static JOINT_HEAD_TIP: any

  /**
   * Left shoulder joint.
   *
   */
  static JOINT_LEFT_SHOULDER: any

  /**
   * Left upper arm joint.
   *
   */
  static JOINT_LEFT_UPPER_ARM: any

  /**
   * Left lower arm joint.
   *
   */
  static JOINT_LEFT_LOWER_ARM: any

  /**
   * Right shoulder joint.
   *
   */
  static JOINT_RIGHT_SHOULDER: any

  /**
   * Right upper arm joint.
   *
   */
  static JOINT_RIGHT_UPPER_ARM: any

  /**
   * Right lower arm joint.
   *
   */
  static JOINT_RIGHT_LOWER_ARM: any

  /**
   * Left upper leg joint.
   *
   */
  static JOINT_LEFT_UPPER_LEG: any

  /**
   * Left lower leg joint.
   *
   */
  static JOINT_LEFT_LOWER_LEG: any

  /**
   * Left foot joint.
   *
   */
  static JOINT_LEFT_FOOT: any

  /**
   * Left toes joint.
   *
   */
  static JOINT_LEFT_TOES: any

  /**
   * Right upper leg joint.
   *
   */
  static JOINT_RIGHT_UPPER_LEG: any

  /**
   * Right lower leg joint.
   *
   */
  static JOINT_RIGHT_LOWER_LEG: any

  /**
   * Right foot joint.
   *
   */
  static JOINT_RIGHT_FOOT: any

  /**
   * Right toes joint.
   *
   */
  static JOINT_RIGHT_TOES: any

  /**
   * Left hand joint.
   *
   */
  static JOINT_LEFT_HAND: any

  /**
   * Left palm joint.
   *
   */
  static JOINT_LEFT_PALM: any

  /**
   * Left wrist joint.
   *
   */
  static JOINT_LEFT_WRIST: any

  /**
   * Left thumb metacarpal joint.
   *
   */
  static JOINT_LEFT_THUMB_METACARPAL: any

  /**
   * Left thumb phalanx proximal joint.
   *
   */
  static JOINT_LEFT_THUMB_PHALANX_PROXIMAL: any

  /**
   * Left thumb phalanx distal joint.
   *
   */
  static JOINT_LEFT_THUMB_PHALANX_DISTAL: any

  /**
   * Left thumb tip joint.
   *
   */
  static JOINT_LEFT_THUMB_TIP: any

  /**
   * Left index finger metacarpal joint.
   *
   */
  static JOINT_LEFT_INDEX_FINGER_METACARPAL: any

  /**
   * Left index finger phalanx proximal joint.
   *
   */
  static JOINT_LEFT_INDEX_FINGER_PHALANX_PROXIMAL: any

  /**
   * Left index finger phalanx intermediate joint.
   *
   */
  static JOINT_LEFT_INDEX_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Left index finger phalanx distal joint.
   *
   */
  static JOINT_LEFT_INDEX_FINGER_PHALANX_DISTAL: any

  /**
   * Left index finger tip joint.
   *
   */
  static JOINT_LEFT_INDEX_FINGER_TIP: any

  /**
   * Left middle finger metacarpal joint.
   *
   */
  static JOINT_LEFT_MIDDLE_FINGER_METACARPAL: any

  /**
   * Left middle finger phalanx proximal joint.
   *
   */
  static JOINT_LEFT_MIDDLE_FINGER_PHALANX_PROXIMAL: any

  /**
   * Left middle finger phalanx intermediate joint.
   *
   */
  static JOINT_LEFT_MIDDLE_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Left middle finger phalanx distal joint.
   *
   */
  static JOINT_LEFT_MIDDLE_FINGER_PHALANX_DISTAL: any

  /**
   * Left middle finger tip joint.
   *
   */
  static JOINT_LEFT_MIDDLE_FINGER_TIP: any

  /**
   * Left ring finger metacarpal joint.
   *
   */
  static JOINT_LEFT_RING_FINGER_METACARPAL: any

  /**
   * Left ring finger phalanx proximal joint.
   *
   */
  static JOINT_LEFT_RING_FINGER_PHALANX_PROXIMAL: any

  /**
   * Left ring finger phalanx intermediate joint.
   *
   */
  static JOINT_LEFT_RING_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Left ring finger phalanx distal joint.
   *
   */
  static JOINT_LEFT_RING_FINGER_PHALANX_DISTAL: any

  /**
   * Left ring finger tip joint.
   *
   */
  static JOINT_LEFT_RING_FINGER_TIP: any

  /**
   * Left pinky finger metacarpal joint.
   *
   */
  static JOINT_LEFT_PINKY_FINGER_METACARPAL: any

  /**
   * Left pinky finger phalanx proximal joint.
   *
   */
  static JOINT_LEFT_PINKY_FINGER_PHALANX_PROXIMAL: any

  /**
   * Left pinky finger phalanx intermediate joint.
   *
   */
  static JOINT_LEFT_PINKY_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Left pinky finger phalanx distal joint.
   *
   */
  static JOINT_LEFT_PINKY_FINGER_PHALANX_DISTAL: any

  /**
   * Left pinky finger tip joint.
   *
   */
  static JOINT_LEFT_PINKY_FINGER_TIP: any

  /**
   * Right hand joint.
   *
   */
  static JOINT_RIGHT_HAND: any

  /**
   * Right palm joint.
   *
   */
  static JOINT_RIGHT_PALM: any

  /**
   * Right wrist joint.
   *
   */
  static JOINT_RIGHT_WRIST: any

  /**
   * Right thumb metacarpal joint.
   *
   */
  static JOINT_RIGHT_THUMB_METACARPAL: any

  /**
   * Right thumb phalanx proximal joint.
   *
   */
  static JOINT_RIGHT_THUMB_PHALANX_PROXIMAL: any

  /**
   * Right thumb phalanx distal joint.
   *
   */
  static JOINT_RIGHT_THUMB_PHALANX_DISTAL: any

  /**
   * Right thumb tip joint.
   *
   */
  static JOINT_RIGHT_THUMB_TIP: any

  /**
   * Right index finger metacarpal joint.
   *
   */
  static JOINT_RIGHT_INDEX_FINGER_METACARPAL: any

  /**
   * Right index finger phalanx proximal joint.
   *
   */
  static JOINT_RIGHT_INDEX_FINGER_PHALANX_PROXIMAL: any

  /**
   * Right index finger phalanx intermediate joint.
   *
   */
  static JOINT_RIGHT_INDEX_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Right index finger phalanx distal joint.
   *
   */
  static JOINT_RIGHT_INDEX_FINGER_PHALANX_DISTAL: any

  /**
   * Right index finger tip joint.
   *
   */
  static JOINT_RIGHT_INDEX_FINGER_TIP: any

  /**
   * Right middle finger metacarpal joint.
   *
   */
  static JOINT_RIGHT_MIDDLE_FINGER_METACARPAL: any

  /**
   * Right middle finger phalanx proximal joint.
   *
   */
  static JOINT_RIGHT_MIDDLE_FINGER_PHALANX_PROXIMAL: any

  /**
   * Right middle finger phalanx intermediate joint.
   *
   */
  static JOINT_RIGHT_MIDDLE_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Right middle finger phalanx distal joint.
   *
   */
  static JOINT_RIGHT_MIDDLE_FINGER_PHALANX_DISTAL: any

  /**
   * Right middle finger tip joint.
   *
   */
  static JOINT_RIGHT_MIDDLE_FINGER_TIP: any

  /**
   * Right ring finger metacarpal joint.
   *
   */
  static JOINT_RIGHT_RING_FINGER_METACARPAL: any

  /**
   * Right ring finger phalanx proximal joint.
   *
   */
  static JOINT_RIGHT_RING_FINGER_PHALANX_PROXIMAL: any

  /**
   * Right ring finger phalanx intermediate joint.
   *
   */
  static JOINT_RIGHT_RING_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Right ring finger phalanx distal joint.
   *
   */
  static JOINT_RIGHT_RING_FINGER_PHALANX_DISTAL: any

  /**
   * Right ring finger tip joint.
   *
   */
  static JOINT_RIGHT_RING_FINGER_TIP: any

  /**
   * Right pinky finger metacarpal joint.
   *
   */
  static JOINT_RIGHT_PINKY_FINGER_METACARPAL: any

  /**
   * Right pinky finger phalanx proximal joint.
   *
   */
  static JOINT_RIGHT_PINKY_FINGER_PHALANX_PROXIMAL: any

  /**
   * Right pinky finger phalanx intermediate joint.
   *
   */
  static JOINT_RIGHT_PINKY_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Right pinky finger phalanx distal joint.
   *
   */
  static JOINT_RIGHT_PINKY_FINGER_PHALANX_DISTAL: any

  /**
   * Right pinky finger tip joint.
   *
   */
  static JOINT_RIGHT_PINKY_FINGER_TIP: any

  /**
   * Lower chest joint.
   *
   */
  static JOINT_LOWER_CHEST: any

  /**
   * Left scapula joint.
   *
   */
  static JOINT_LEFT_SCAPULA: any

  /**
   * Left wrist twist joint.
   *
   */
  static JOINT_LEFT_WRIST_TWIST: any

  /**
   * Right scapula joint.
   *
   */
  static JOINT_RIGHT_SCAPULA: any

  /**
   * Right wrist twist joint.
   *
   */
  static JOINT_RIGHT_WRIST_TWIST: any

  /**
   * Left foot twist joint.
   *
   */
  static JOINT_LEFT_FOOT_TWIST: any

  /**
   * Left heel joint.
   *
   */
  static JOINT_LEFT_HEEL: any

  /**
   * Left middle foot joint.
   *
   */
  static JOINT_LEFT_MIDDLE_FOOT: any

  /**
   * Right foot twist joint.
   *
   */
  static JOINT_RIGHT_FOOT_TWIST: any

  /**
   * Right heel joint.
   *
   */
  static JOINT_RIGHT_HEEL: any

  /**
   * Right middle foot joint.
   *
   */
  static JOINT_RIGHT_MIDDLE_FOOT: any

  /**
   * Represents the size of the [enum Joint] enum.
   *
   */
  static JOINT_MAX: any

  /**
   * The joint's orientation data is valid.
   *
   */
  static JOINT_FLAG_ORIENTATION_VALID: any

  /**
   * The joint's orientation is actively tracked. May not be set if tracking has been temporarily lost.
   *
   */
  static JOINT_FLAG_ORIENTATION_TRACKED: any

  /**
   * The joint's position data is valid.
   *
   */
  static JOINT_FLAG_POSITION_VALID: any

  /**
   * The joint's position is actively tracked. May not be set if tracking has been temporarily lost.
   *
   */
  static JOINT_FLAG_POSITION_TRACKED: any
}
