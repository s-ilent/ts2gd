/**
 * Remap will transform the input range into output range, e.g. you can change a `0..1` value to `-2..2` etc. See [method @GlobalScope.remap] for more details.
 *
 */
declare class VisualShaderNodeRemap extends VisualShaderNode {
  /**
   * Remap will transform the input range into output range, e.g. you can change a `0..1` value to `-2..2` etc. See [method @GlobalScope.remap] for more details.
   *
   */
  new(): VisualShaderNodeRemap
  constructor()
  static new(): VisualShaderNodeRemap

  connect<T extends SignalsOf<VisualShaderNodeRemap>>(
    signal: T,
    method: SignalFunction<VisualShaderNodeRemap[T]>
  ): number

  /**
   * A floating-point scalar type.
   *
   */
  static OP_TYPE_SCALAR: any

  /**
   * A 2D vector type.
   *
   */
  static OP_TYPE_VECTOR_2D: any

  /**
   * The `value` port uses a 2D vector type, while the `input min`, `input max`, `output min`, and `output max` ports use a floating-point scalar type.
   *
   */
  static OP_TYPE_VECTOR_2D_SCALAR: any

  /**
   * A 3D vector type.
   *
   */
  static OP_TYPE_VECTOR_3D: any

  /**
   * The `value` port uses a 3D vector type, while the `input min`, `input max`, `output min`, and `output max` ports use a floating-point scalar type.
   *
   */
  static OP_TYPE_VECTOR_3D_SCALAR: any

  /**
   * A 4D vector type.
   *
   */
  static OP_TYPE_VECTOR_4D: any

  /**
   * The `value` port uses a 4D vector type, while the `input min`, `input max`, `output min`, and `output max` ports use a floating-point scalar type.
   *
   */
  static OP_TYPE_VECTOR_4D_SCALAR: any

  /**
   * Represents the size of the [enum OpType] enum.
   *
   */
  static OP_TYPE_MAX: any
}
