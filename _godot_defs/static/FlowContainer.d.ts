/**
 * A container that arranges its child controls horizontally or vertically and wraps them around at the borders. This is similar to how text in a book wraps around when no more words can fit on a line.
 *
 */
declare class FlowContainer extends Container {
  /**
   * A container that arranges its child controls horizontally or vertically and wraps them around at the borders. This is similar to how text in a book wraps around when no more words can fit on a line.
   *
   */
  new(): FlowContainer
  constructor()
  static new(): FlowContainer

  /** The alignment of the container's children (must be one of [constant ALIGNMENT_BEGIN], [constant ALIGNMENT_CENTER], or [constant ALIGNMENT_END]). */
  alignment: int

  /** The wrap behavior of the last, partially filled row or column (must be one of [constant LAST_WRAP_ALIGNMENT_INHERIT], [constant LAST_WRAP_ALIGNMENT_BEGIN], [constant LAST_WRAP_ALIGNMENT_CENTER], or [constant LAST_WRAP_ALIGNMENT_END]). */
  last_wrap_alignment: int

  /**
   * If `true`, reverses fill direction. Horizontal [FlowContainer]s will fill rows bottom to top, vertical [FlowContainer]s will fill columns right to left.
   *
   * When using a vertical [FlowContainer] with a right to left [member Control.layout_direction], columns will fill left to right instead.
   *
   */
  reverse_fill: boolean

  /**
   * If `true`, the [FlowContainer] will arrange its children vertically, rather than horizontally.
   *
   * Can't be changed when using [HFlowContainer] and [VFlowContainer].
   *
   */
  vertical: boolean

  /** Returns the current line count. */
  get_line_count(): int

  connect<T extends SignalsOf<FlowContainer>>(
    signal: T,
    method: SignalFunction<FlowContainer[T]>
  ): number

  /**
   * The child controls will be arranged at the beginning of the container, i.e. top if orientation is vertical, left if orientation is horizontal (right for RTL layout).
   *
   */
  static ALIGNMENT_BEGIN: any

  /**
   * The child controls will be centered in the container.
   *
   */
  static ALIGNMENT_CENTER: any

  /**
   * The child controls will be arranged at the end of the container, i.e. bottom if orientation is vertical, right if orientation is horizontal (left for RTL layout).
   *
   */
  static ALIGNMENT_END: any

  /**
   * The last partially filled row or column will wrap aligned to the previous row or column in accordance with [member alignment].
   *
   */
  static LAST_WRAP_ALIGNMENT_INHERIT: any

  /**
   * The last partially filled row or column will wrap aligned to the beginning of the previous row or column.
   *
   */
  static LAST_WRAP_ALIGNMENT_BEGIN: any

  /**
   * The last partially filled row or column will wrap aligned to the center of the previous row or column.
   *
   */
  static LAST_WRAP_ALIGNMENT_CENTER: any

  /**
   * The last partially filled row or column will wrap aligned to the end of the previous row or column.
   *
   */
  static LAST_WRAP_ALIGNMENT_END: any
}
