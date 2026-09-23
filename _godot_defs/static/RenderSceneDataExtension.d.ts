/**
 * This class allows for a RenderSceneData implementation to be made in GDExtension.
 *
 */
declare class RenderSceneDataExtension extends RenderSceneData {
  /**
   * This class allows for a RenderSceneData implementation to be made in GDExtension.
   *
   */
  new(): RenderSceneDataExtension
  constructor()
  static new(): RenderSceneDataExtension

  /** Implement this in GDExtension to return the camera [Projection]. */
  protected _get_cam_projection(): Projection

  /** Implement this in GDExtension to return the camera [Transform3D]. */
  protected _get_cam_transform(): Transform3D

  /** Implement this in GDExtension to return the [RID] of the uniform buffer containing the scene data as a UBO. */
  protected _get_uniform_buffer(): RID

  /** Implement this in GDExtension to return the view count. */
  protected _get_view_count(): int

  /** Implement this in GDExtension to return the eye offset for the given [param view]. */
  protected _get_view_eye_offset(view: int): Vector3

  /** Implement this in GDExtension to return the view [Projection] for the given [param view]. */
  protected _get_view_projection(view: int): Projection

  connect<T extends SignalsOf<RenderSceneDataExtension>>(
    signal: T,
    method: SignalFunction<RenderSceneDataExtension[T]>
  ): number
}
