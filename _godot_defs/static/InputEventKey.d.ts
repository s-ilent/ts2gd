/**
 * An input event for keys on a keyboard. Supports key presses, key releases and [member echo] events. It can also be received in [method Node._unhandled_key_input].
 *
 * **Note:** Events received from the keyboard usually have all properties set. Event mappings should have only one of the [member keycode], [member physical_keycode] or [member unicode] set.
 *
 * When events are compared, properties are checked in the following priority - [member keycode], [member physical_keycode] and [member unicode]. Events with the first matching value will be considered equal.
 *
 */
declare class InputEventKey extends InputEventWithModifiers {
  /**
   * An input event for keys on a keyboard. Supports key presses, key releases and [member echo] events. It can also be received in [method Node._unhandled_key_input].
   *
   * **Note:** Events received from the keyboard usually have all properties set. Event mappings should have only one of the [member keycode], [member physical_keycode] or [member unicode] set.
   *
   * When events are compared, properties are checked in the following priority - [member keycode], [member physical_keycode] and [member unicode]. Events with the first matching value will be considered equal.
   *
   */
  new(): InputEventKey
  constructor()
  static new(): InputEventKey

  /**
   * If `true`, the key was already pressed before this event. An echo event is a repeated key event sent when the user is holding down the key.
   *
   * **Note:** The rate at which echo events are sent is typically around 20 events per second (after holding down the key for roughly half a second). However, the key repeat delay/speed can be changed by the user or disabled entirely in the operating system settings. To ensure your project works correctly on all configurations, do not assume the user has a specific key repeat configuration in your project's behavior.
   *
   */
  echo: boolean

  /**
   * Represents the localized label printed on the key in the current keyboard layout, which corresponds to one of the [enum Key] constants or any valid Unicode character. Key labels are meant for key prompts.
   *
   * For keyboard layouts with a single label on the key, it is equivalent to [member keycode].
   *
   * To get a human-readable representation of the [InputEventKey], use `OS.get_keycode_string(event.key_label)` where `event` is the [InputEventKey].
   *
   * [codeblock lang=text]
   *
   * +-----+ +-----+
   *
   * | Q   | | Q   | - "Q" - keycode
   *
   * |   Й | |  ض | - "Й" and "ض" - key_label
   *
   * +-----+ +-----+
   *
   * @summary
   *
   *
   */
  key_label: int

  /**
   * Latin label printed on the key in the current keyboard layout, which corresponds to one of the [enum Key] constants. Key codes are meant for shortcuts expressed with a standard Latin keyboard, such as [kbd]Ctrl + S[/kbd] for a "Save" shortcut.
   *
   * To get a human-readable representation of the [InputEventKey], use `OS.get_keycode_string(event.keycode)` where `event` is the [InputEventKey].
   *
   * [codeblock lang=text]
   *
   * +-----+ +-----+
   *
   * | Q   | | Q   | - "Q" - keycode
   *
   * |   Й | |  ض | - "Й" and "ض" - key_label
   *
   * +-----+ +-----+
   *
   * @summary
   *
   *
   */
  keycode: int

  /** Represents the location of a key which has both left and right versions, such as [kbd]Shift[/kbd] or [kbd]Alt[/kbd]. */
  location: int

  /**
   * Represents the physical location of a key on the 101/102-key US QWERTY keyboard, which corresponds to one of the [enum Key] constants. Physical key codes meant for game input, such as WASD movement, where only the location of the keys is important.
   *
   * To get a human-readable representation of the [InputEventKey], use [method OS.get_keycode_string] in combination with [method DisplayServer.keyboard_get_keycode_from_physical] or [method DisplayServer.keyboard_get_label_from_physical]:
   *
   * @example
   *
   *
   * func _input(event):
   * 	if event is InputEventKey:
   * 		var keycode = DisplayServer.keyboard_get_keycode_from_physical(event.physical_keycode)
   * 		var label = DisplayServer.keyboard_get_label_from_physical(event.physical_keycode)
   * 		print(OS.get_keycode_string(keycode))
   * 		print(OS.get_keycode_string(label))
   *
   *
   * public override void _Input(InputEvent @event)
   * {
   * 	if (@event is InputEventKey inputEventKey)
   * 	{
   * 		var keycode = DisplayServer.KeyboardGetKeycodeFromPhysical(inputEventKey.PhysicalKeycode);
   * 		var label = DisplayServer.KeyboardGetLabelFromPhysical(inputEventKey.PhysicalKeycode);
   * 		GD.Print(OS.GetKeycodeString(keycode));
   * 		GD.Print(OS.GetKeycodeString(label));
   * 	}
   * }
   *
   * @summary
   *
   *
   */
  physical_keycode: int

  /** If [code]true[/code], the key's state is pressed. If [code]false[/code], the key's state is released. */
  pressed: boolean

  /**
   * The key Unicode character code (when relevant), shifted by modifier keys. Unicode character codes for composite characters and complex scripts may not be available unless IME input mode is active. See [method Window.set_ime_active] for more information. Unicode character codes are meant for text input.
   *
   * **Note:** This property is set by the engine only for a pressed event. If the event is sent by an IME or a virtual keyboard, no corresponding key released event is sent.
   *
   */
  unicode: int

  /** Returns a [String] representation of the event's [member key_label] and modifiers. */
  as_text_key_label(): string

  /** Returns a [String] representation of the event's [member keycode] and modifiers. */
  as_text_keycode(): string

  /** Returns a [String] representation of the event's [member location]. This will be a blank string if the event is not specific to a location. */
  as_text_location(): string

  /** Returns a [String] representation of the event's [member physical_keycode] and modifiers. */
  as_text_physical_keycode(): string

  /**
   * Returns the localized key label combined with modifier keys such as [kbd]Shift[/kbd] or [kbd]Alt[/kbd]. See also [InputEventWithModifiers].
   *
   * To get a human-readable representation of the [InputEventKey] with modifiers, use `OS.get_keycode_string(event.get_key_label_with_modifiers())` where `event` is the [InputEventKey].
   *
   */
  get_key_label_with_modifiers(): int

  /**
   * Returns the Latin keycode combined with modifier keys such as [kbd]Shift[/kbd] or [kbd]Alt[/kbd]. See also [InputEventWithModifiers].
   *
   * To get a human-readable representation of the [InputEventKey] with modifiers, use `OS.get_keycode_string(event.get_keycode_with_modifiers())` where `event` is the [InputEventKey].
   *
   */
  get_keycode_with_modifiers(): int

  /**
   * Returns the physical keycode combined with modifier keys such as [kbd]Shift[/kbd] or [kbd]Alt[/kbd]. See also [InputEventWithModifiers].
   *
   * To get a human-readable representation of the [InputEventKey] with modifiers, use `OS.get_keycode_string(event.get_physical_keycode_with_modifiers())` where `event` is the [InputEventKey].
   *
   */
  get_physical_keycode_with_modifiers(): int

  connect<T extends SignalsOf<InputEventKey>>(
    signal: T,
    method: SignalFunction<InputEventKey[T]>
  ): number
}
