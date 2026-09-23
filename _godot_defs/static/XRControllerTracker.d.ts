/**
 * An instance of this object represents a controller that is tracked.
 *
 * As controllers are turned on and the [XRInterface] detects them, instances of this object are automatically added to this list of active tracking objects accessible through the [XRServer].
 *
 * The [XRController3D] consumes objects of this type and should be used in your project.
 *
 */
declare class XRControllerTracker extends XRPositionalTracker {
  /**
   * An instance of this object represents a controller that is tracked.
   *
   * As controllers are turned on and the [XRInterface] detects them, instances of this object are automatically added to this list of active tracking objects accessible through the [XRServer].
   *
   * The [XRController3D] consumes objects of this type and should be used in your project.
   *
   */
  new(): XRControllerTracker
  constructor()
  static new(): XRControllerTracker

  connect<T extends SignalsOf<XRControllerTracker>>(
    signal: T,
    method: SignalFunction<XRControllerTracker[T]>
  ): number
}
