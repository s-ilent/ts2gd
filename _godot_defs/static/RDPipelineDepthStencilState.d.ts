/**
 * [RDPipelineDepthStencilState] controls the way depth and stencil comparisons are performed when sampling those values using [RenderingDevice].
 *
 */
declare class RDPipelineDepthStencilState extends RefCounted {
  /**
   * [RDPipelineDepthStencilState] controls the way depth and stencil comparisons are performed when sampling those values using [RenderingDevice].
   *
   */
  new(): RDPipelineDepthStencilState
  constructor()
  static new(): RDPipelineDepthStencilState

  /** The method used for comparing the previous back stencil value and [member back_op_reference]. */
  back_op_compare: int

  /** Selects which bits from the back stencil value will be compared. */
  back_op_compare_mask: int

  /** The operation to perform on the stencil buffer for back pixels that pass the stencil test but fail the depth test. */
  back_op_depth_fail: int

  /** The operation to perform on the stencil buffer for back pixels that fail the stencil test. */
  back_op_fail: int

  /** The operation to perform on the stencil buffer for back pixels that pass the stencil test. */
  back_op_pass: int

  /** The value the previous back stencil value will be compared to. */
  back_op_reference: int

  /** Selects which bits from the back stencil value will be changed. */
  back_op_write_mask: int

  /** The method used for comparing the previous and current depth values. */
  depth_compare_operator: int

  /** The maximum depth that returns [code]true[/code] for [member enable_depth_range]. */
  depth_range_max: float

  /** The minimum depth that returns [code]true[/code] for [member enable_depth_range]. */
  depth_range_min: float

  /** If [code]true[/code], each depth value will be tested to see if it is between [member depth_range_min] and [member depth_range_max]. If it is outside of these values, it is discarded. */
  enable_depth_range: boolean

  /** If [code]true[/code], enables depth testing which allows objects to be automatically occluded by other objects based on their depth. This also allows objects to be partially occluded by other objects. If [code]false[/code], objects will appear in the order they were drawn (like in Godot's 2D renderer). */
  enable_depth_test: boolean

  /** If [code]true[/code], writes to the depth buffer whenever the depth test returns [code]true[/code]. Only works when enable_depth_test is also [code]true[/code]. */
  enable_depth_write: boolean

  /** If [code]true[/code], enables stencil testing. There are separate stencil buffers for front-facing triangles and back-facing triangles. See properties that begin with "front_op" and properties with "back_op" for each. */
  enable_stencil: boolean

  /** The method used for comparing the previous front stencil value and [member front_op_reference]. */
  front_op_compare: int

  /** Selects which bits from the front stencil value will be compared. */
  front_op_compare_mask: int

  /** The operation to perform on the stencil buffer for front pixels that pass the stencil test but fail the depth test. */
  front_op_depth_fail: int

  /** The operation to perform on the stencil buffer for front pixels that fail the stencil test. */
  front_op_fail: int

  /** The operation to perform on the stencil buffer for front pixels that pass the stencil test. */
  front_op_pass: int

  /** The value the previous front stencil value will be compared to. */
  front_op_reference: int

  /** Selects which bits from the front stencil value will be changed. */
  front_op_write_mask: int

  connect<T extends SignalsOf<RDPipelineDepthStencilState>>(
    signal: T,
    method: SignalFunction<RDPipelineDepthStencilState[T]>
  ): number
}
