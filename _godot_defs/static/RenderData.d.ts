/**
 * Abstract render data object, exists for the duration of rendering a single viewport. See also [RenderDataRD], [RenderSceneData], and [RenderSceneDataRD].
 *
 * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
 *
 */
declare class RenderData extends Object {
  /**
   * Abstract render data object, exists for the duration of rendering a single viewport. See also [RenderDataRD], [RenderSceneData], and [RenderSceneDataRD].
   *
   * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
   *
   */
  new(): RenderData
  constructor()
  static new(): RenderData

  /** Returns the [RID] of the camera attributes object in the [RenderingServer] being used to render this viewport. */
  get_camera_attributes(): RID

  /** Returns the [RID] of the environment object in the [RenderingServer] being used to render this viewport. */
  get_environment(): RID

  /** Returns the [RenderSceneBuffers] object managing the scene buffers for rendering this viewport. */
  get_render_scene_buffers(): RenderSceneBuffers

  /** Returns the [RenderSceneData] object managing this frames scene data. */
  get_render_scene_data(): RenderSceneData

  connect<T extends SignalsOf<RenderData>>(
    signal: T,
    method: SignalFunction<RenderData[T]>
  ): number
}
