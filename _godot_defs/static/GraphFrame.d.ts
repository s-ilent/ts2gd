/**
 * GraphFrame is a special [GraphElement] to which other [GraphElement]s can be attached. It can be configured to automatically resize to enclose all attached [GraphElement]s. If the frame is moved, all the attached [GraphElement]s inside it will be moved as well.
 *
 * A GraphFrame is always kept behind the connection layer and other [GraphElement]s inside a [GraphEdit].
 *
 */
declare class GraphFrame extends GraphElement {
  /**
   * GraphFrame is a special [GraphElement] to which other [GraphElement]s can be attached. It can be configured to automatically resize to enclose all attached [GraphElement]s. If the frame is moved, all the attached [GraphElement]s inside it will be moved as well.
   *
   * A GraphFrame is always kept behind the connection layer and other [GraphElement]s inside a [GraphEdit].
   *
   */
  new(): GraphFrame
  constructor()
  static new(): GraphFrame

  /** If [code]true[/code], the frame's rect will be adjusted automatically to enclose all attached [GraphElement]s. */
  autoshrink_enabled: boolean

  /** The margin around the attached nodes that is used to calculate the size of the frame when [member autoshrink_enabled] is [code]true[/code]. */
  autoshrink_margin: int

  /** The margin inside the frame that can be used to drag the frame. */
  drag_margin: int

  /** The color of the frame when [member tint_color_enabled] is [code]true[/code]. */
  tint_color: Color

  /** If [code]true[/code], the tint color will be used to tint the frame. */
  tint_color_enabled: boolean

  /** Title of the frame. */
  title: string

  /**
   * Returns the [HBoxContainer] used for the title bar, only containing a [Label] for displaying the title by default.
   *
   * This can be used to add custom controls to the title bar such as option or close buttons.
   *
   */
  get_titlebar_hbox(): HBoxContainer

  connect<T extends SignalsOf<GraphFrame>>(
    signal: T,
    method: SignalFunction<GraphFrame[T]>
  ): number

  /**
   * Emitted when [member autoshrink_enabled] or [member autoshrink_margin] changes.
   *
   */
  $autoshrink_changed: Signal<() => void>
}
