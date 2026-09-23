/**
 * Translates to `texture_sdf(sdf_pos)` in the shader language.
 *
 */
declare class VisualShaderNodeTextureSDF extends VisualShaderNode {
  /**
   * Translates to `texture_sdf(sdf_pos)` in the shader language.
   *
   */
  new(): VisualShaderNodeTextureSDF
  constructor()
  static new(): VisualShaderNodeTextureSDF

  connect<T extends SignalsOf<VisualShaderNodeTextureSDF>>(
    signal: T,
    method: SignalFunction<VisualShaderNodeTextureSDF[T]>
  ): number
}
