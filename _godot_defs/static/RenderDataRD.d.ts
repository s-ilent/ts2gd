/**
 * This object manages all render data for the [RenderingDevice]-based renderers. See also [RenderData], [RenderSceneData], and [RenderSceneDataRD].
 *
 * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
 *
 */
declare class RenderDataRD extends RenderData {
  /**
   * This object manages all render data for the [RenderingDevice]-based renderers. See also [RenderData], [RenderSceneData], and [RenderSceneDataRD].
   *
   * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
   *
   */
  new(): RenderDataRD
  constructor()
  static new(): RenderDataRD

  connect<T extends SignalsOf<RenderDataRD>>(
    signal: T,
    method: SignalFunction<RenderDataRD[T]>
  ): number
}
