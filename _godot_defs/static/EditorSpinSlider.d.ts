/**
 * This [Control] node is used in the editor's Inspector dock to allow editing of numeric values. Can be used with [EditorInspectorPlugin] to recreate the same behavior.
 *
 * If the [member Range.step] value is `1`, the [EditorSpinSlider] will display up/down arrows, similar to [SpinBox]. If the [member Range.step] value is not `1`, a slider will be displayed instead.
 *
 */
declare class EditorSpinSlider extends Range {
  /**
   * This [Control] node is used in the editor's Inspector dock to allow editing of numeric values. Can be used with [EditorInspectorPlugin] to recreate the same behavior.
   *
   * If the [member Range.step] value is `1`, the [EditorSpinSlider] will display up/down arrows, similar to [SpinBox]. If the [member Range.step] value is not `1`, a slider will be displayed instead.
   *
   */
  new(): EditorSpinSlider
  constructor()
  static new(): EditorSpinSlider

  /** The state in which the control used to manipulate the value will be. */
  control_state: int

  /** If [code]true[/code], the [EditorSpinSlider] is considered to be editing an integer value. If [code]false[/code], the [EditorSpinSlider] is considered to be editing a floating-point value. This is used to determine whether a slider should be drawn by default. The slider is only drawn for floats; integers use up-down arrows similar to [SpinBox] instead, unless [member control_state] is set to [constant CONTROL_STATE_PREFER_SLIDER]. It will also use [member EditorSettings.interface/inspector/integer_drag_speed] instead of [member EditorSettings.interface/inspector/float_drag_speed] if the slider is available. */
  editing_integer: boolean

  /** If [code]true[/code], the slider will not draw background. */
  flat: boolean

  /** If [code]true[/code], the slider and up/down arrows are hidden. */
  hide_slider: boolean

  /** The text that displays to the left of the value. */
  label: string

  /** If [code]true[/code], the slider can't be interacted with. */
  read_only: boolean

  /** The suffix to display after the value (in a faded color). This should generally be a plural word. You may have to use an abbreviation if the suffix is too long to be displayed. */
  suffix: string

  connect<T extends SignalsOf<EditorSpinSlider>>(
    signal: T,
    method: SignalFunction<EditorSpinSlider[T]>
  ): number

  /**
   * The type of control used will depend on the value of [member editing_integer]. Up-down arrows if `true`, a slider if `false`.
   *
   */
  static CONTROL_STATE_DEFAULT: any

  /**
   * A slider will always be used, even if [member editing_integer] is enabled.
   *
   */
  static CONTROL_STATE_PREFER_SLIDER: any

  /**
   * Neither the up-down arrows nor the slider will be shown.
   *
   */
  static CONTROL_STATE_HIDE: any

  /**
   * Emitted when the spinner/slider is grabbed.
   *
   */
  $grabbed: Signal<() => void>

  /**
   * Emitted when the spinner/slider is ungrabbed.
   *
   */
  $ungrabbed: Signal<() => void>

  /**
   * Emitted when the updown button is pressed.
   *
   */
  $updown_pressed: Signal<() => void>

  /**
   * Emitted when the value form gains focus.
   *
   */
  $value_focus_entered: Signal<() => void>

  /**
   * Emitted when the value form loses focus.
   *
   */
  $value_focus_exited: Signal<() => void>
}
