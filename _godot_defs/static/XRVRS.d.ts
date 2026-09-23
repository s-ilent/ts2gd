/**
 * This class is used by various XR interfaces to generate VRS textures that can be used to speed up rendering.
 *
 */
declare class XRVRS extends Object {
  /**
   * This class is used by various XR interfaces to generate VRS textures that can be used to speed up rendering.
   *
   */
  new(): XRVRS
  constructor()
  static new(): XRVRS

  /** The minimum radius around the focal point where full quality is guaranteed if VRS is used as a percentage of screen size. */
  vrs_min_radius: float

  /** The render region that the VRS texture will be scaled to when generated. */
  vrs_render_region: Rect2i

  /** The strength used to calculate the VRS density map. The greater this value, the more noticeable VRS is. */
  vrs_strength: float

  /**
   * Generates the VRS texture based on a render [param target_size] adjusted by our VRS tile size. For each eyes focal point passed in [param eye_foci] a layer is created. Focal point should be in NDC.
   *
   * The result will be cached, requesting a VRS texture with unchanged parameters and settings will return the cached RID.
   *
   */
  make_vrs_texture(target_size: Vector2, eye_foci: PackedVector2Array): RID

  connect<T extends SignalsOf<XRVRS>>(
    signal: T,
    method: SignalFunction<XRVRS[T]>
  ): number
}
