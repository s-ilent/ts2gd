/**
 * Abstract base class for sliders, used to adjust a value by moving a grabber along a horizontal or vertical axis. Sliders are [Range]-based controls.
 *
 */
declare class Slider extends Range {
  /**
   * Abstract base class for sliders, used to adjust a value by moving a grabber along a horizontal or vertical axis. Sliders are [Range]-based controls.
   *
   */
  new(): Slider
  constructor()
  static new(): Slider

  /** If [code]true[/code], the slider can be interacted with. If [code]false[/code], the value can be changed only by code. */
  editable: boolean

  /** If [code]true[/code], the value can be changed using the mouse wheel. */
  scrollable: boolean

  /** Number of ticks displayed on the slider, including border ticks. Ticks are uniformly-distributed value markers. */
  tick_count: int

  /** If [code]true[/code], the slider will display ticks for minimum and maximum values. */
  ticks_on_borders: boolean

  /** Sets the position of the ticks. See [enum TickPosition] for details. */
  ticks_position: int

  connect<T extends SignalsOf<Slider>>(
    signal: T,
    method: SignalFunction<Slider[T]>
  ): number

  /**
   * Places the ticks at the bottom of the [HSlider], or right of the [VSlider].
   *
   */
  static TICK_POSITION_BOTTOM_RIGHT: any

  /**
   * Places the ticks at the top of the [HSlider], or left of the [VSlider].
   *
   */
  static TICK_POSITION_TOP_LEFT: any

  /**
   * Places the ticks at the both sides of the slider.
   *
   */
  static TICK_POSITION_BOTH: any

  /**
   * Places the ticks at the center of the slider.
   *
   */
  static TICK_POSITION_CENTER: any

  /**
   * Emitted when the grabber stops being dragged. If [param value_changed] is `true`, [member Range.value] is different from the value when the dragging was started.
   *
   */
  $drag_ended: Signal<() => void>

  /**
   * Emitted when the grabber starts being dragged. This is emitted before the corresponding [signal Range.value_changed] signal.
   *
   */
  $drag_started: Signal<() => void>
}
