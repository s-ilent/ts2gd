/**
 * Abstract base class of all types of input events. See [method Node._input].
 *
 */
declare class InputEvent extends Resource {
  /**
   * Abstract base class of all types of input events. See [method Node._input].
   *
   */
  new(): InputEvent
  constructor()
  static new(): InputEvent

  /**
   * The event's device ID.
   *
   * **Note:** [member device] can be negative for special use cases that don't refer to devices physically present on the system. See [constant DEVICE_ID_EMULATION].
   *
   */
  device: int

  /**
   * Returns `true` if the given input event and this input event can be added together (only for events of type [InputEventMouseMotion]).
   *
   * The given input event's position, global position and speed will be copied. The resulting `relative` is a sum of both events. Both events' modifiers have to be identical.
   *
   */
  accumulate(with_event: InputEvent): boolean

  /** Returns a [String] representation of the event. */
  as_text(): string

  /**
   * Returns a value between 0.0 and 1.0 depending on the given actions' state. Useful for getting the value of events of type [InputEventJoypadMotion].
   *
   * If [param exact_match] is `false`, it ignores additional input modifiers for [InputEventKey] and [InputEventMouseButton] events, and the direction for [InputEventJoypadMotion] events.
   *
   */
  get_action_strength(action: Action, exact_match?: boolean): float

  /**
   * Returns `true` if this input event matches a pre-defined action of any type.
   *
   * If [param exact_match] is `false`, it ignores additional input modifiers for [InputEventKey] and [InputEventMouseButton] events, and the direction for [InputEventJoypadMotion] events.
   *
   */
  is_action(action: Action, exact_match?: boolean): boolean

  /**
   * Returns `true` if the given action matches this event and is being pressed (and is not an echo event for [InputEventKey] events, unless [param allow_echo] is `true`). Not relevant for events of type [InputEventMouseMotion] or [InputEventScreenDrag].
   *
   * If [param exact_match] is `false`, it ignores additional input modifiers for [InputEventKey] and [InputEventMouseButton] events, and the direction for [InputEventJoypadMotion] events.
   *
   * **Note:** Due to keyboard ghosting, [method is_action_pressed] may return `false` even if one of the action's keys is pressed. See [url=$DOCS_URL/tutorials/inputs/input_examples.html#keyboard-events]Input examples[/url] in the documentation for more information.
   *
   */
  is_action_pressed(action: Action): boolean

  /**
   * Returns `true` if the given action matches this event and is released (i.e. not pressed). Not relevant for events of type [InputEventMouseMotion] or [InputEventScreenDrag].
   *
   * If [param exact_match] is `false`, it ignores additional input modifiers for [InputEventKey] and [InputEventMouseButton] events, and the direction for [InputEventJoypadMotion] events.
   *
   */
  is_action_released(action: Action, exact_match?: boolean): boolean

  /** Returns [code]true[/code] if this input event's type is one that can be assigned to an input action: [InputEventKey], [InputEventMouseButton], [InputEventJoypadButton], [InputEventJoypadMotion], [InputEventAction]. Returns [code]false[/code] for all other input event types. */
  is_action_type(): boolean

  /** Returns [code]true[/code] if this input event has been canceled. */
  is_canceled(): boolean

  /**
   * Returns `true` if this input event is an echo event (only for events of type [InputEventKey]). An echo event is a repeated key event sent when the user is holding down the key. Any other event type returns `false`.
   *
   * **Note:** The rate at which echo events are sent is typically around 20 events per second (after holding down the key for roughly half a second). However, the key repeat delay/speed can be changed by the user or disabled entirely in the operating system settings. To ensure your project works correctly on all configurations, do not assume the user has a specific key repeat configuration in your project's behavior.
   *
   */
  is_echo(): boolean

  /**
   * Returns `true` if the specified [param event] matches this event. Only valid for action events, which include key ([InputEventKey]), button ([InputEventMouseButton] or [InputEventJoypadButton]), axis [InputEventJoypadMotion], and action ([InputEventAction]) events.
   *
   * If [param exact_match] is `false`, the check ignores additional input modifiers for [InputEventKey] and [InputEventMouseButton] events, and the direction for [InputEventJoypadMotion] events.
   *
   * **Note:** This method only considers the event configuration (such as the keyboard key or the joypad axis), not state information like [method is_pressed], [method is_released], [method is_echo], or [method is_canceled].
   *
   */
  is_match(event: InputEvent, exact_match?: boolean): boolean

  /**
   * Returns `true` if this input event is pressed. Not relevant for events of type [InputEventMouseMotion] or [InputEventScreenDrag].
   *
   * **Note:** Due to keyboard ghosting, [method is_pressed] may return `false` even if one of the action's keys is pressed. See [url=$DOCS_URL/tutorials/inputs/input_examples.html#keyboard-events]Input examples[/url] in the documentation for more information.
   *
   */
  is_pressed(): boolean

  /** Returns [code]true[/code] if this input event is released. Not relevant for events of type [InputEventMouseMotion] or [InputEventScreenDrag]. */
  is_released(): boolean

  /** Returns a copy of the given input event which has been offset by [param local_ofs] and transformed by [param xform]. Relevant for events of type [InputEventMouseButton], [InputEventMouseMotion], [InputEventScreenTouch], [InputEventScreenDrag], [InputEventMagnifyGesture] and [InputEventPanGesture]. */
  xformed_by(xform: Transform2D, local_ofs?: Vector2): InputEvent

  connect<T extends SignalsOf<InputEvent>>(
    signal: T,
    method: SignalFunction<InputEvent[T]>
  ): number

  /**
   * Device ID used for emulated mouse input from a touchscreen, or for emulated touch input from a mouse. This can be used to distinguish emulated mouse input from physical mouse input, or emulated touch input from physical touch input.
   *
   */
  static DEVICE_ID_EMULATION: any
}
