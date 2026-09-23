/**
 * Takes a 4×4 transform matrix and decomposes it into four `vec3` values, one from each row of the matrix.
 *
 */
declare class VisualShaderNodeTransformDecompose extends VisualShaderNode {
  /**
   * Takes a 4×4 transform matrix and decomposes it into four `vec3` values, one from each row of the matrix.
   *
   */
  new(): VisualShaderNodeTransformDecompose
  constructor()
  static new(): VisualShaderNodeTransformDecompose

  connect<T extends SignalsOf<VisualShaderNodeTransformDecompose>>(
    signal: T,
    method: SignalFunction<VisualShaderNodeTransformDecompose[T]>
  ): number
}
