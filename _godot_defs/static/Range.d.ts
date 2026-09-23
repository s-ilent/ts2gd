/**
 * Range is an abstract base class for controls that represent a number within a range, using a configured [member step] and [member page] size. See e.g. [ScrollBar] and [Slider] for examples of higher-level nodes using Range.
 *
 */
declare class Range extends Control {
  /**
   * Range is an abstract base class for controls that represent a number within a range, using a configured [member step] and [member page] size. See e.g. [ScrollBar] and [Slider] for examples of higher-level nodes using Range.
   *
   */
  new(): Range
  constructor()
  static new(): Range

  /** If [code]true[/code], [member value] may be greater than [member max_value]. */
  allow_greater: boolean

  /** If [code]true[/code], [member value] may be less than [member min_value]. */
  allow_lesser: boolean

  /** If [code]true[/code], and [member min_value] is greater or equal to [code]0[/code], [member value] will be represented exponentially rather than linearly. */
  exp_edit: boolean

  /** Maximum value. Range is clamped if [member value] is greater than [member max_value]. */
  max_value: float

  /** Minimum value. Range is clamped if [member value] is less than [member min_value]. */
  min_value: float

  /** Page size. Used mainly for [ScrollBar]. A [ScrollBar]'s grabber length is the [ScrollBar]'s size multiplied by [member page] over the difference between [member min_value] and [member max_value]. */
  page: float

  /** The value mapped between 0 and 1. */
  ratio: float

  /** If [code]true[/code], [member value] will always be rounded to the nearest integer. */
  rounded: boolean

  /** If greater than [code]0.0[/code], [member value] will always be rounded to a multiple of this property's value above [member min_value]. For example, if [member min_value] is [code]0.1[/code] and step is [code]0.2[/code], then [member value] is limited to [code]0.1[/code], [code]0.3[/code], [code]0.5[/code], and so on. If [member rounded] is also [code]true[/code], [member value] will first be rounded to a multiple of this property's value, then rounded to the nearest integer. */
  step: float

  /** Range's current value. Changing this property (even via code) will trigger [signal value_changed] signal. Use [method set_value_no_signal] if you want to avoid it. */
  value: float

  /** Called when the [Range]'s value is changed (following the same conditions as [signal value_changed]). */
  protected _value_changed(new_value: float): void

  /** Sets the [Range]'s current value to the specified [param value], without emitting the [signal value_changed] signal. */
  set_value_no_signal(value: float): void

  /** Binds two [Range]s together along with any ranges previously grouped with either of them. When any of range's member variables change, it will share the new value with all other ranges in its group. */
  share(_with: Node): void

  /** Stops the [Range] from sharing its member variables with any other. */
  unshare(): void

  connect<T extends SignalsOf<Range>>(
    signal: T,
    method: SignalFunction<Range[T]>
  ): number

  /**
   * Emitted when [member min_value], [member max_value], [member page], or [member step] change.
   *
   */
  $changed: Signal<() => void>

  /**
   * Emitted when [member value] changes. When used on a [Slider], this is called continuously while dragging (potentially every frame). If you are performing an expensive operation in a function connected to [signal value_changed], consider using a **debouncing** [Timer] to call the function less often.
   *
   * **Note:** Unlike signals such as [signal LineEdit.text_changed], [signal value_changed] is also emitted when [param value] is set directly via code.
   *
   */
  $value_changed: Signal<() => void>
}
