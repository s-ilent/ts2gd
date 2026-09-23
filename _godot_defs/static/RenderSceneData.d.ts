/**
 * Abstract scene data object, exists for the duration of rendering a single viewport. See also [RenderSceneDataRD], [RenderData], and [RenderDataRD].
 *
 * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
 *
 */
declare class RenderSceneData extends Object {
  /**
   * Abstract scene data object, exists for the duration of rendering a single viewport. See also [RenderSceneDataRD], [RenderData], and [RenderDataRD].
   *
   * **Note:** This is an internal rendering server object. Do not instantiate this class from a script.
   *
   */
  new(): RenderSceneData
  constructor()
  static new(): RenderSceneData

  /**
   * Returns the camera projection used to render this frame.
   *
   * **Note:** If more than one view is rendered, this will return a combined projection.
   *
   */
  get_cam_projection(): Projection

  /**
   * Returns the camera transform used to render this frame.
   *
   * **Note:** If more than one view is rendered, this will return a centered transform.
   *
   */
  get_cam_transform(): Transform3D

  /** Return the [RID] of the uniform buffer containing the scene data as a UBO. */
  get_uniform_buffer(): RID

  /** Returns the number of views being rendered. */
  get_view_count(): int

  /** Returns the eye offset per view used to render this frame. This is the offset between our camera transform and the eye transform. */
  get_view_eye_offset(view: int): Vector3

  /**
   * Returns the view projection per view used to render this frame.
   *
   * **Note:** If a single view is rendered, this returns the camera projection. If more than one view is rendered, this will return a projection for the given view including the eye offset.
   *
   */
  get_view_projection(view: int): Projection

  connect<T extends SignalsOf<RenderSceneData>>(
    signal: T,
    method: SignalFunction<RenderSceneData[T]>
  ): number
}
