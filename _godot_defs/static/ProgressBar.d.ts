/**
 * A control used for visual representation of a percentage. Shows the fill percentage in the center. Can also be used to show indeterminate progress. For more fill modes, use [TextureProgressBar] instead.
 *
 */
declare class ProgressBar extends Range {
  /**
   * A control used for visual representation of a percentage. Shows the fill percentage in the center. Can also be used to show indeterminate progress. For more fill modes, use [TextureProgressBar] instead.
   *
   */
  new(): ProgressBar
  constructor()
  static new(): ProgressBar

  /** If [code]false[/code], the [member indeterminate] animation will be paused in the editor. */
  editor_preview_indeterminate: boolean

  /** The fill direction. See [enum FillMode] for possible values. */
  fill_mode: int

  /** When set to [code]true[/code], the progress bar indicates that something is happening with an animation, but does not show the fill percentage or value. */
  indeterminate: boolean

  /** If [code]true[/code], the fill percentage is displayed on the bar. */
  show_percentage: boolean

  connect<T extends SignalsOf<ProgressBar>>(
    signal: T,
    method: SignalFunction<ProgressBar[T]>
  ): number

  /**
   * The progress bar fills from begin to end horizontally, according to the language direction. If [method Control.is_layout_rtl] returns `false`, it fills from left to right, and if it returns `true`, it fills from right to left.
   *
   */
  static FILL_BEGIN_TO_END: any

  /**
   * The progress bar fills from end to begin horizontally, according to the language direction. If [method Control.is_layout_rtl] returns `false`, it fills from right to left, and if it returns `true`, it fills from left to right.
   *
   */
  static FILL_END_TO_BEGIN: any

  /**
   * The progress fills from top to bottom.
   *
   */
  static FILL_TOP_TO_BOTTOM: any

  /**
   * The progress fills from bottom to top.
   *
   */
  static FILL_BOTTOM_TO_TOP: any
}
