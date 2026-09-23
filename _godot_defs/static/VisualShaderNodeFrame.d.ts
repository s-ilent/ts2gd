/**
 * A rectangular frame that can be used to group visual shader nodes together to improve organization.
 *
 * Nodes attached to the frame will move with it when it is dragged and it can automatically resize to enclose all attached nodes.
 *
 * Its title, description and color can be customized.
 *
 */
declare class VisualShaderNodeFrame extends VisualShaderNodeResizableBase {
  /**
   * A rectangular frame that can be used to group visual shader nodes together to improve organization.
   *
   * Nodes attached to the frame will move with it when it is dragged and it can automatically resize to enclose all attached nodes.
   *
   * Its title, description and color can be customized.
   *
   */
  new(): VisualShaderNodeFrame
  constructor()
  static new(): VisualShaderNodeFrame

  /** The list of nodes attached to the frame. */
  attached_nodes: PackedInt32Array

  /** If [code]true[/code], the frame will automatically resize to enclose all attached nodes. */
  autoshrink: boolean

  /** The color of the frame when [member tint_color_enabled] is [code]true[/code]. */
  tint_color: Color

  /** If [code]true[/code], the frame will be tinted with the color specified in [member tint_color]. */
  tint_color_enabled: boolean

  /** The title of the node. */
  title: string

  /** Adds a node to the list of nodes attached to the frame. Should not be called directly, use the [method VisualShader.attach_node_to_frame] method instead. */
  add_attached_node(node: int): void

  /** Removes a node from the list of nodes attached to the frame. Should not be called directly, use the [method VisualShader.detach_node_from_frame] method instead. */
  remove_attached_node(node: int): void

  connect<T extends SignalsOf<VisualShaderNodeFrame>>(
    signal: T,
    method: SignalFunction<VisualShaderNodeFrame[T]>
  ): number
}
