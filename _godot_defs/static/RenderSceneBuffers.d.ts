/**
 * Abstract scene buffers object, created for each viewport for which 3D rendering is done. It manages any additional buffers used during rendering and will discard buffers when the viewport is resized. See also [RenderSceneBuffersRD].
 *
 * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
 *
 */
declare class RenderSceneBuffers extends RefCounted {
  /**
   * Abstract scene buffers object, created for each viewport for which 3D rendering is done. It manages any additional buffers used during rendering and will discard buffers when the viewport is resized. See also [RenderSceneBuffersRD].
   *
   * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
   *
   */
  new(): RenderSceneBuffers
  constructor()
  static new(): RenderSceneBuffers

  /** This method is called by the rendering server when the associated viewport's configuration is changed. It will discard the old buffers and recreate the internal buffers used. */
  configure(config: RenderSceneBuffersConfiguration): void

  connect<T extends SignalsOf<RenderSceneBuffers>>(
    signal: T,
    method: SignalFunction<RenderSceneBuffers[T]>
  ): number
}
