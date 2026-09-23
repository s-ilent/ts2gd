/**
 * XR runtimes often identify multiple locations on devices such as controllers that are spatially tracked.
 *
 * Orientation, location, linear velocity and angular velocity are all provided for each pose by the XR runtime. This object contains this state of a pose.
 *
 */
declare class XRPose extends RefCounted {
  /**
   * XR runtimes often identify multiple locations on devices such as controllers that are spatially tracked.
   *
   * Orientation, location, linear velocity and angular velocity are all provided for each pose by the XR runtime. This object contains this state of a pose.
   *
   */
  new(): XRPose
  constructor()
  static new(): XRPose

  /** The angular velocity for this pose. */
  angular_velocity: Vector3

  /** If [code]true[/code] our tracking data is up to date. If [code]false[/code] we're no longer receiving new tracking data and our state is whatever that last valid state was. */
  has_tracking_data: boolean

  /** The linear velocity of this pose. */
  linear_velocity: Vector3

  /**
   * The name of this pose. Usually, this name is derived from an action map set up by the user. Godot also suggests some pose names that [XRInterface] objects are expected to implement:
   *
   * - `root` is the root location, often used for tracked objects that do not have further nodes.
   *
   * - `aim` is the tip of a controller with its orientation pointing outwards, often used for raycasts.
   *
   * - `grip` is the location where the user grips the controller.
   *
   * - `skeleton` is the root location for a hand mesh, when using hand tracking and an animated skeleton is supplied by the XR runtime.
   *
   */
  name: StringName

  /** The tracking confidence for this pose, provides insight on how accurate the spatial positioning of this record is. */
  tracking_confidence: int

  /** The transform containing the original and transform as reported by the XR runtime. */
  transform: Transform3D

  /** Returns the [member transform] with world scale and our reference frame applied. This is the transform used to position [XRNode3D] objects. */
  get_adjusted_transform(): Transform3D

  connect<T extends SignalsOf<XRPose>>(
    signal: T,
    method: SignalFunction<XRPose[T]>
  ): number

  /**
   * No tracking information is available for this pose.
   *
   */
  static XR_TRACKING_CONFIDENCE_NONE: any

  /**
   * Tracking information may be inaccurate or estimated. For example, with inside out tracking this would indicate a controller may be (partially) obscured.
   *
   */
  static XR_TRACKING_CONFIDENCE_LOW: any

  /**
   * Tracking information is considered accurate and up to date.
   *
   */
  static XR_TRACKING_CONFIDENCE_HIGH: any
}
