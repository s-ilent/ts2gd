/**
 * This node was replaced by [VisualShaderNodeFrame] and only exists to preserve compatibility. In the [VisualShader] editor it behaves exactly like [VisualShaderNodeFrame].
 *
 */
declare class VisualShaderNodeComment extends VisualShaderNodeFrame {
  /**
   * This node was replaced by [VisualShaderNodeFrame] and only exists to preserve compatibility. In the [VisualShader] editor it behaves exactly like [VisualShaderNodeFrame].
   *
   */
  new(): VisualShaderNodeComment
  constructor()
  static new(): VisualShaderNodeComment

  /** This property only exists to preserve data authored in earlier versions of Godot. It has currently no function. */
  description: string

  connect<T extends SignalsOf<VisualShaderNodeComment>>(
    signal: T,
    method: SignalFunction<VisualShaderNodeComment[T]>
  ): number
}
