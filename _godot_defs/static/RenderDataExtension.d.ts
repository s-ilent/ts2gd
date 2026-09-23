/**
 * This class allows for a RenderData implementation to be made in GDExtension.
 *
 */
declare class RenderDataExtension extends RenderData {
  /**
   * This class allows for a RenderData implementation to be made in GDExtension.
   *
   */
  new(): RenderDataExtension
  constructor()
  static new(): RenderDataExtension

  /** Implement this in GDExtension to return the [RID] for the implementation's camera attributes object. */
  protected _get_camera_attributes(): RID

  /** Implement this in GDExtension to return the [RID] of the implementation's environment object. */
  protected _get_environment(): RID

  /** Implement this in GDExtension to return the implementation's [RenderSceneBuffers] object. */
  protected _get_render_scene_buffers(): RenderSceneBuffers

  /** Implement this in GDExtension to return the implementation's [RenderSceneDataExtension] object. */
  protected _get_render_scene_data(): RenderSceneData

  connect<T extends SignalsOf<RenderDataExtension>>(
    signal: T,
    method: SignalFunction<RenderDataExtension[T]>
  ): number
}
