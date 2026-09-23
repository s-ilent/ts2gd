/**
 * Shortcuts (also known as hotkeys) are containers of [InputEvent] resources. They are commonly used to interact with a [Control] element from an [InputEvent].
 *
 * One shortcut can contain multiple [InputEvent] resources, making it possible to trigger one action with multiple different inputs.
 *
 * **Example:** Capture the [kbd]Ctrl + S[/kbd] shortcut using a [Shortcut] resource:
 *
 * @example
 *
 *
 * extends Node
 * var save_shortcut = Shortcut.new()
 * func _ready():
 * 	var key_event = InputEventKey.new()
 * 	key_event.keycode = KEY_S
 * 	key_event.ctrl_pressed = true
 * 	key_event.command_or_control_autoremap = true # Swaps Ctrl for Command on Mac.
 * 	save_shortcut.events = [key_event]
 * func _input(event):
 * 	if save_shortcut.matches_event(event) and event.is_pressed() and not event.is_echo():
 * 		print("Save shortcut pressed!")
 * 		get_viewport().set_input_as_handled()
 *
 *
 * using Godot;
 * public partial class MyNode : Node
 * {
 * 	private readonly Shortcut _saveShortcut = new Shortcut();
 * 	public override void _Ready()
 * 	{
 * 		InputEventKey keyEvent = new InputEventKey
 * 		{
 * 			Keycode = Key.S,
 * 			CtrlPressed = true,
 * 			CommandOrControlAutoremap = true, // Swaps Ctrl for Command on Mac.
 * 		};
 * 		_saveShortcut.Events = [keyEvent];
 * 	}
 * 	public override void _Input(InputEvent @event)
 * 	{
 * 		if (@event is InputEventKey keyEvent &&
 * 			_saveShortcut.MatchesEvent(@event) &&
 * 			keyEvent.Pressed && !keyEvent.Echo)
 * 		{
 * 			GD.Print("Save shortcut pressed!");
 * 			GetViewport().SetInputAsHandled();
 * 		}
 * 	}
 * }
 *
 * @summary
 *
 *
 */
declare class Shortcut extends Resource {
  /**
   * Shortcuts (also known as hotkeys) are containers of [InputEvent] resources. They are commonly used to interact with a [Control] element from an [InputEvent].
   *
   * One shortcut can contain multiple [InputEvent] resources, making it possible to trigger one action with multiple different inputs.
   *
   * **Example:** Capture the [kbd]Ctrl + S[/kbd] shortcut using a [Shortcut] resource:
   *
   * @example
   *
   *
   * extends Node
   * var save_shortcut = Shortcut.new()
   * func _ready():
   * 	var key_event = InputEventKey.new()
   * 	key_event.keycode = KEY_S
   * 	key_event.ctrl_pressed = true
   * 	key_event.command_or_control_autoremap = true # Swaps Ctrl for Command on Mac.
   * 	save_shortcut.events = [key_event]
   * func _input(event):
   * 	if save_shortcut.matches_event(event) and event.is_pressed() and not event.is_echo():
   * 		print("Save shortcut pressed!")
   * 		get_viewport().set_input_as_handled()
   *
   *
   * using Godot;
   * public partial class MyNode : Node
   * {
   * 	private readonly Shortcut _saveShortcut = new Shortcut();
   * 	public override void _Ready()
   * 	{
   * 		InputEventKey keyEvent = new InputEventKey
   * 		{
   * 			Keycode = Key.S,
   * 			CtrlPressed = true,
   * 			CommandOrControlAutoremap = true, // Swaps Ctrl for Command on Mac.
   * 		};
   * 		_saveShortcut.Events = [keyEvent];
   * 	}
   * 	public override void _Input(InputEvent @event)
   * 	{
   * 		if (@event is InputEventKey keyEvent &&
   * 			_saveShortcut.MatchesEvent(@event) &&
   * 			keyEvent.Pressed && !keyEvent.Echo)
   * 		{
   * 			GD.Print("Save shortcut pressed!");
   * 			GetViewport().SetInputAsHandled();
   * 		}
   * 	}
   * }
   *
   * @summary
   *
   *
   */
  new(): Shortcut
  constructor()
  static new(): Shortcut

  /**
   * The shortcut's [InputEvent] array.
   *
   * Generally the [InputEvent] used is an [InputEventKey], though it can be any [InputEvent], including an [InputEventAction].
   *
   */
  events: any[]

  /** Returns the shortcut's first valid [InputEvent] as a [String]. */
  get_as_text(): string

  /** Returns whether [member events] contains an [InputEvent] which is valid. */
  has_valid_event(): boolean

  /** Returns whether any [InputEvent] in [member events] equals [param event]. This uses [method InputEvent.is_match] to compare events. */
  matches_event(event: InputEvent): boolean

  connect<T extends SignalsOf<Shortcut>>(
    signal: T,
    method: SignalFunction<Shortcut[T]>
  ): number
}
