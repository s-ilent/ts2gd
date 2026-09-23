/**
 * This node can be used in fragment shaders.
 *
 */
declare class VisualShaderNodeLinearSceneDepth extends VisualShaderNode {
  /**
   * This node can be used in fragment shaders.
   *
   */
  new(): VisualShaderNodeLinearSceneDepth
  constructor()
  static new(): VisualShaderNodeLinearSceneDepth

  connect<T extends SignalsOf<VisualShaderNodeLinearSceneDepth>>(
    signal: T,
    method: SignalFunction<VisualShaderNodeLinearSceneDepth[T]>
  ): number
}
