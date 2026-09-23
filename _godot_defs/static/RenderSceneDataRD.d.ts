/**
 * Object holds scene data related to rendering a single frame of a viewport. See also [RenderSceneData], [RenderData], and [RenderDataRD].
 *
 * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
 *
 */
declare class RenderSceneDataRD extends RenderSceneData {
  /**
   * Object holds scene data related to rendering a single frame of a viewport. See also [RenderSceneData], [RenderData], and [RenderDataRD].
   *
   * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
   *
   */
  new(): RenderSceneDataRD
  constructor()
  static new(): RenderSceneDataRD

  connect<T extends SignalsOf<RenderSceneDataRD>>(
    signal: T,
    method: SignalFunction<RenderSceneDataRD[T]>
  ): number
}
