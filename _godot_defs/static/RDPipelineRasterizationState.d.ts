/**
 * This object is used by [RenderingDevice].
 *
 */
declare class RDPipelineRasterizationState extends RefCounted {
  /**
   * This object is used by [RenderingDevice].
   *
   */
  new(): RDPipelineRasterizationState
  constructor()
  static new(): RDPipelineRasterizationState

  /** The cull mode to use when drawing polygons, which determines whether front faces or backfaces are hidden. */
  cull_mode: int

  /** A limit for how much each depth value can be offset. If negative, it serves as a minimum value, but if positive, it serves as a maximum value. */
  depth_bias_clamp: float

  /** A constant offset added to each depth value. Applied after [member depth_bias_slope_factor]. */
  depth_bias_constant_factor: float

  /** If [code]true[/code], each generated depth value will by offset by some amount. The specific amount is generated per polygon based on the values of [member depth_bias_slope_factor] and [member depth_bias_constant_factor]. */
  depth_bias_enabled: boolean

  /** A constant scale applied to the slope of each polygons' depth. Applied before [member depth_bias_constant_factor]. */
  depth_bias_slope_factor: float

  /** If [code]true[/code], primitives are discarded immediately before the rasterization stage. */
  discard_primitives: boolean

  /** If [code]true[/code], clamps depth values according to the minimum and maximum depth of the associated viewport. */
  enable_depth_clamp: boolean

  /** The winding order to use to determine which face of a triangle is considered its front face. */
  front_face: int

  /** The line width to use when drawing lines (in pixels). Thick lines may not be supported on all hardware. */
  line_width: float

  /** The number of control points to use when drawing a patch with tessellation enabled. Higher values result in higher quality at the cost of performance. */
  patch_control_points: int

  /** If [code]true[/code], performs wireframe rendering for triangles instead of flat or textured rendering. */
  wireframe: boolean

  connect<T extends SignalsOf<RDPipelineRasterizationState>>(
    signal: T,
    method: SignalFunction<RDPipelineRasterizationState[T]>
  ): number
}
