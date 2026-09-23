/**
 * Input event type for gamepad buttons. For gamepad analog sticks and joysticks, see [InputEventJoypadMotion].
 *
 */
declare class InputEventJoypadButton extends InputEvent {
  /**
   * Input event type for gamepad buttons. For gamepad analog sticks and joysticks, see [InputEventJoypadMotion].
   *
   */
  new(): InputEventJoypadButton
  constructor()
  static new(): InputEventJoypadButton

  /** Button identifier. One of the [enum JoyButton] button constants. */
  button_index: int

  /** If [code]true[/code], the button's state is pressed. If [code]false[/code], the button's state is released. */
  pressed: boolean

  connect<T extends SignalsOf<InputEventJoypadButton>>(
    signal: T,
    method: SignalFunction<InputEventJoypadButton[T]>
  ): number
}
