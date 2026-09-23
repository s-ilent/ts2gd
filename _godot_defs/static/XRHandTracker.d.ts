/**
 * A hand tracking system will create an instance of this object and add it to the [XRServer]. This tracking system will then obtain skeleton data, convert it to the Godot Humanoid hand skeleton and store this data on the [XRHandTracker] object.
 *
 * Use [XRHandModifier3D] to animate a hand mesh using hand tracking data.
 *
 */
declare class XRHandTracker extends XRPositionalTracker {
  /**
   * A hand tracking system will create an instance of this object and add it to the [XRServer]. This tracking system will then obtain skeleton data, convert it to the Godot Humanoid hand skeleton and store this data on the [XRHandTracker] object.
   *
   * Use [XRHandModifier3D] to animate a hand mesh using hand tracking data.
   *
   */
  new(): XRHandTracker
  constructor()
  static new(): XRHandTracker

  /** The source of the hand tracking data. */
  hand_tracking_source: int

  /** If [code]true[/code], the hand tracking data is valid. */
  has_tracking_data: boolean

  /** Returns the angular velocity for the given hand joint. */
  get_hand_joint_angular_velocity(joint: int): Vector3

  /** Returns flags about the validity of the tracking data for the given hand joint. */
  get_hand_joint_flags(joint: int): int

  /** Returns the linear velocity for the given hand joint. */
  get_hand_joint_linear_velocity(joint: int): Vector3

  /** Returns the radius of the given hand joint. */
  get_hand_joint_radius(joint: int): float

  /** Returns the transform for the given hand joint. */
  get_hand_joint_transform(joint: int): Transform3D

  /** Sets the angular velocity for the given hand joint. */
  set_hand_joint_angular_velocity(joint: int, angular_velocity: Vector3): void

  /** Sets flags about the validity of the tracking data for the given hand joint. */
  set_hand_joint_flags(joint: int, flags: int): void

  /** Sets the linear velocity for the given hand joint. */
  set_hand_joint_linear_velocity(joint: int, linear_velocity: Vector3): void

  /** Sets the radius of the given hand joint. */
  set_hand_joint_radius(joint: int, radius: float): void

  /** Sets the transform for the given hand joint. */
  set_hand_joint_transform(joint: int, transform: Transform3D): void

  connect<T extends SignalsOf<XRHandTracker>>(
    signal: T,
    method: SignalFunction<XRHandTracker[T]>
  ): number

  /**
   * The source of hand tracking data is unknown.
   *
   */
  static HAND_TRACKING_SOURCE_UNKNOWN: any

  /**
   * The source of hand tracking data is unobstructed, meaning that an accurate method of hand tracking is used. These include optical hand tracking, data gloves, etc.
   *
   */
  static HAND_TRACKING_SOURCE_UNOBSTRUCTED: any

  /**
   * The source of hand tracking data is a controller, meaning that joint positions are inferred from controller inputs.
   *
   */
  static HAND_TRACKING_SOURCE_CONTROLLER: any

  /**
   * No hand tracking data is tracked, this either means the hand is obscured, the controller is turned off, or tracking is not supported for the current input type.
   *
   */
  static HAND_TRACKING_SOURCE_NOT_TRACKED: any

  /**
   * Represents the size of the [enum HandTrackingSource] enum.
   *
   */
  static HAND_TRACKING_SOURCE_MAX: any

  /**
   * Palm joint.
   *
   */
  static HAND_JOINT_PALM: any

  /**
   * Wrist joint.
   *
   */
  static HAND_JOINT_WRIST: any

  /**
   * Thumb metacarpal joint.
   *
   */
  static HAND_JOINT_THUMB_METACARPAL: any

  /**
   * Thumb phalanx proximal joint.
   *
   */
  static HAND_JOINT_THUMB_PHALANX_PROXIMAL: any

  /**
   * Thumb phalanx distal joint.
   *
   */
  static HAND_JOINT_THUMB_PHALANX_DISTAL: any

  /**
   * Thumb tip joint.
   *
   */
  static HAND_JOINT_THUMB_TIP: any

  /**
   * Index finger metacarpal joint.
   *
   */
  static HAND_JOINT_INDEX_FINGER_METACARPAL: any

  /**
   * Index finger phalanx proximal joint.
   *
   */
  static HAND_JOINT_INDEX_FINGER_PHALANX_PROXIMAL: any

  /**
   * Index finger phalanx intermediate joint.
   *
   */
  static HAND_JOINT_INDEX_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Index finger phalanx distal joint.
   *
   */
  static HAND_JOINT_INDEX_FINGER_PHALANX_DISTAL: any

  /**
   * Index finger tip joint.
   *
   */
  static HAND_JOINT_INDEX_FINGER_TIP: any

  /**
   * Middle finger metacarpal joint.
   *
   */
  static HAND_JOINT_MIDDLE_FINGER_METACARPAL: any

  /**
   * Middle finger phalanx proximal joint.
   *
   */
  static HAND_JOINT_MIDDLE_FINGER_PHALANX_PROXIMAL: any

  /**
   * Middle finger phalanx intermediate joint.
   *
   */
  static HAND_JOINT_MIDDLE_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Middle finger phalanx distal joint.
   *
   */
  static HAND_JOINT_MIDDLE_FINGER_PHALANX_DISTAL: any

  /**
   * Middle finger tip joint.
   *
   */
  static HAND_JOINT_MIDDLE_FINGER_TIP: any

  /**
   * Ring finger metacarpal joint.
   *
   */
  static HAND_JOINT_RING_FINGER_METACARPAL: any

  /**
   * Ring finger phalanx proximal joint.
   *
   */
  static HAND_JOINT_RING_FINGER_PHALANX_PROXIMAL: any

  /**
   * Ring finger phalanx intermediate joint.
   *
   */
  static HAND_JOINT_RING_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Ring finger phalanx distal joint.
   *
   */
  static HAND_JOINT_RING_FINGER_PHALANX_DISTAL: any

  /**
   * Ring finger tip joint.
   *
   */
  static HAND_JOINT_RING_FINGER_TIP: any

  /**
   * Pinky finger metacarpal joint.
   *
   */
  static HAND_JOINT_PINKY_FINGER_METACARPAL: any

  /**
   * Pinky finger phalanx proximal joint.
   *
   */
  static HAND_JOINT_PINKY_FINGER_PHALANX_PROXIMAL: any

  /**
   * Pinky finger phalanx intermediate joint.
   *
   */
  static HAND_JOINT_PINKY_FINGER_PHALANX_INTERMEDIATE: any

  /**
   * Pinky finger phalanx distal joint.
   *
   */
  static HAND_JOINT_PINKY_FINGER_PHALANX_DISTAL: any

  /**
   * Pinky finger tip joint.
   *
   */
  static HAND_JOINT_PINKY_FINGER_TIP: any

  /**
   * Represents the size of the [enum HandJoint] enum.
   *
   */
  static HAND_JOINT_MAX: any

  /**
   * The hand joint's orientation data is valid.
   *
   */
  static HAND_JOINT_FLAG_ORIENTATION_VALID: any

  /**
   * The hand joint's orientation is actively tracked. May not be set if tracking has been temporarily lost.
   *
   */
  static HAND_JOINT_FLAG_ORIENTATION_TRACKED: any

  /**
   * The hand joint's position data is valid.
   *
   */
  static HAND_JOINT_FLAG_POSITION_VALID: any

  /**
   * The hand joint's position is actively tracked. May not be set if tracking has been temporarily lost.
   *
   */
  static HAND_JOINT_FLAG_POSITION_TRACKED: any

  /**
   * The hand joint's linear velocity data is valid.
   *
   */
  static HAND_JOINT_FLAG_LINEAR_VELOCITY_VALID: any

  /**
   * The hand joint's angular velocity data is valid.
   *
   */
  static HAND_JOINT_FLAG_ANGULAR_VELOCITY_VALID: any
}
