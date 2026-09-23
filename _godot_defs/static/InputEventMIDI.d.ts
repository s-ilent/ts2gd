/**
 * InputEventMIDI stores information about messages from [url=https://en.wikipedia.org/wiki/MIDI]MIDI[/url] (Musical Instrument Digital Interface) devices. These may include musical keyboards, synthesizers, and drum machines.
 *
 * MIDI messages can be received over a 5-pin MIDI connector or over USB. If your device supports both be sure to check the settings in the device to see which output it is using.
 *
 * By default, Godot does not detect MIDI devices. You need to call [method OS.open_midi_inputs], first. You can check which devices are detected with [method OS.get_connected_midi_inputs], and close the connection with [method OS.close_midi_inputs].
 *
 * @example
 *
 *
 * func _ready():
 * 	OS.open_midi_inputs()
 * 	print(OS.get_connected_midi_inputs())
 * func _input(input_event):
 * 	if input_event is InputEventMIDI:
 * 		_print_midi_info(input_event)
 * func _print_midi_info(midi_event):
 * 	print(midi_event)
 * 	print("Channel ", midi_event.channel)
 * 	print("Message ", midi_event.message)
 * 	print("Pitch ", midi_event.pitch)
 * 	print("Velocity ", midi_event.velocity)
 * 	print("Instrument ", midi_event.instrument)
 * 	print("Pressure ", midi_event.pressure)
 * 	print("Controller number: ", midi_event.controller_number)
 * 	print("Controller value: ", midi_event.controller_value)
 *
 *
 * public override void _Ready()
 * {
 * 	OS.OpenMidiInputs();
 * 	GD.Print(OS.GetConnectedMidiInputs());
 * }
 * public override void _Input(InputEvent inputEvent)
 * {
 * 	if (inputEvent is InputEventMidi midiEvent)
 * 	{
 * 		PrintMIDIInfo(midiEvent);
 * 	}
 * }
 * private void PrintMIDIInfo(InputEventMidi midiEvent)
 * {
 * 	GD.Print(midiEvent);
 * 	GD.Print($"Channel {midiEvent.Channel}");
 * 	GD.Print($"Message {midiEvent.Message}");
 * 	GD.Print($"Pitch {midiEvent.Pitch}");
 * 	GD.Print($"Velocity {midiEvent.Velocity}");
 * 	GD.Print($"Instrument {midiEvent.Instrument}");
 * 	GD.Print($"Pressure {midiEvent.Pressure}");
 * 	GD.Print($"Controller number: {midiEvent.ControllerNumber}");
 * 	GD.Print($"Controller value: {midiEvent.ControllerValue}");
 * }
 *
 * @summary
 *
 *
 * **Note:** Godot does not support MIDI output, so there is no way to emit MIDI messages from Godot. Only MIDI input is supported.
 *
 * **Note:** On the Web platform, using MIDI input requires a browser permission to be granted first. This permission request is performed when calling [method OS.open_midi_inputs]. MIDI input will not work until the user accepts the permission request.
 *
 */
declare class InputEventMIDI extends InputEvent {
  /**
   * InputEventMIDI stores information about messages from [url=https://en.wikipedia.org/wiki/MIDI]MIDI[/url] (Musical Instrument Digital Interface) devices. These may include musical keyboards, synthesizers, and drum machines.
   *
   * MIDI messages can be received over a 5-pin MIDI connector or over USB. If your device supports both be sure to check the settings in the device to see which output it is using.
   *
   * By default, Godot does not detect MIDI devices. You need to call [method OS.open_midi_inputs], first. You can check which devices are detected with [method OS.get_connected_midi_inputs], and close the connection with [method OS.close_midi_inputs].
   *
   * @example
   *
   *
   * func _ready():
   * 	OS.open_midi_inputs()
   * 	print(OS.get_connected_midi_inputs())
   * func _input(input_event):
   * 	if input_event is InputEventMIDI:
   * 		_print_midi_info(input_event)
   * func _print_midi_info(midi_event):
   * 	print(midi_event)
   * 	print("Channel ", midi_event.channel)
   * 	print("Message ", midi_event.message)
   * 	print("Pitch ", midi_event.pitch)
   * 	print("Velocity ", midi_event.velocity)
   * 	print("Instrument ", midi_event.instrument)
   * 	print("Pressure ", midi_event.pressure)
   * 	print("Controller number: ", midi_event.controller_number)
   * 	print("Controller value: ", midi_event.controller_value)
   *
   *
   * public override void _Ready()
   * {
   * 	OS.OpenMidiInputs();
   * 	GD.Print(OS.GetConnectedMidiInputs());
   * }
   * public override void _Input(InputEvent inputEvent)
   * {
   * 	if (inputEvent is InputEventMidi midiEvent)
   * 	{
   * 		PrintMIDIInfo(midiEvent);
   * 	}
   * }
   * private void PrintMIDIInfo(InputEventMidi midiEvent)
   * {
   * 	GD.Print(midiEvent);
   * 	GD.Print($"Channel {midiEvent.Channel}");
   * 	GD.Print($"Message {midiEvent.Message}");
   * 	GD.Print($"Pitch {midiEvent.Pitch}");
   * 	GD.Print($"Velocity {midiEvent.Velocity}");
   * 	GD.Print($"Instrument {midiEvent.Instrument}");
   * 	GD.Print($"Pressure {midiEvent.Pressure}");
   * 	GD.Print($"Controller number: {midiEvent.ControllerNumber}");
   * 	GD.Print($"Controller value: {midiEvent.ControllerValue}");
   * }
   *
   * @summary
   *
   *
   * **Note:** Godot does not support MIDI output, so there is no way to emit MIDI messages from Godot. Only MIDI input is supported.
   *
   * **Note:** On the Web platform, using MIDI input requires a browser permission to be granted first. This permission request is performed when calling [method OS.open_midi_inputs]. MIDI input will not work until the user accepts the permission request.
   *
   */
  new(): InputEventMIDI
  constructor()
  static new(): InputEventMIDI

  /** The MIDI channel of this message, ranging from [code]0[/code] to [code]15[/code]. MIDI channel [code]9[/code] is reserved for percussion instruments. */
  channel: int

  /** The unique number of the controller, if [member message] is [constant MIDI_MESSAGE_CONTROL_CHANGE], otherwise this is [code]0[/code]. This value can be used to identify sliders for volume, balance, and panning, as well as switches and pedals on the MIDI device. See the [url=https://en.wikipedia.org/wiki/General_MIDI#Controller_events]General MIDI specification[/url] for a small list. */
  controller_number: int

  /** The value applied to the controller. If [member message] is [constant MIDI_MESSAGE_CONTROL_CHANGE], this value ranges from [code]0[/code] to [code]127[/code], otherwise it is [code]0[/code]. See also [member controller_value]. */
  controller_value: int

  /**
   * The instrument (also called **program** or **preset**) used on this MIDI message. This value ranges from `0` to `127`.
   *
   * To see what each value means, refer to the [url=https://en.wikipedia.org/wiki/General_MIDI#Program_change_events]General MIDI's instrument list[/url]. Keep in mind that the list is off by 1 because it does not begin from 0. A value of `0` corresponds to the acoustic grand piano.
   *
   */
  instrument: int

  /**
   * Represents the type of MIDI message (see the [enum MIDIMessage] enum).
   *
   * For more information, see the [url=https://www.midi.org/specifications-old/item/table-2-expanded-messages-list-status-bytes]MIDI message status byte list chart[/url].
   *
   */
  message: int

  /**
   * The pitch index number of this MIDI message. This value ranges from `0` to `127`.
   *
   * On a piano, the **middle C** is `60`, followed by a **C-sharp** (`61`), then a **D** (`62`), and so on. Each octave is split in offsets of 12. See the "MIDI note number" column of the [url=https://en.wikipedia.org/wiki/Piano_key_frequencies]piano key frequency chart[/url] a full list.
   *
   */
  pitch: int

  /**
   * The strength of the key being pressed. This value ranges from `0` to `127`.
   *
   * **Note:** For many devices, this value is always `0`. Other devices such as musical keyboards may simulate pressure by changing the [member velocity], instead.
   *
   */
  pressure: int

  /**
   * The velocity of the MIDI message. This value ranges from `0` to `127`. For a musical keyboard, this corresponds to how quickly the key was pressed, and is rarely above `110` in practice.
   *
   * **Note:** Some MIDI devices may send a [constant MIDI_MESSAGE_NOTE_ON] message with `0` velocity and expect it to be treated the same as a [constant MIDI_MESSAGE_NOTE_OFF] message. If necessary, this can be handled with a few lines of code:
   *
   * @example
   *
   * func _input(event):
   * 	if event is InputEventMIDI:
   * 		if event.message == MIDI_MESSAGE_NOTE_ON and event.velocity > 0:
   * 			print("Note pressed!")
   * @summary
   *
   *
   */
  velocity: int

  connect<T extends SignalsOf<InputEventMIDI>>(
    signal: T,
    method: SignalFunction<InputEventMIDI[T]>
  ): number
}
