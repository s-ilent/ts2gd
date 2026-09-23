/**
 * [EditorDebuggerPlugin] provides functions related to the editor side of the debugger.
 *
 * To interact with the debugger, an instance of this class must be added to the editor via [method EditorPlugin.add_debugger_plugin].
 *
 * Once added, the [method _setup_session] callback will be called for every [EditorDebuggerSession] available to the plugin, and when new ones are created (the sessions may be inactive during this stage).
 *
 * You can retrieve the available [EditorDebuggerSession]s via [method get_sessions] or get a specific one via [method get_session].
 *
 * @example
 *
 *
 * @tool
 * extends EditorPlugin
 * class ExampleEditorDebugger extends EditorDebuggerPlugin:
 * 	func _has_capture(capture):
 * 		# Return true if you wish to handle messages with the prefix "my_plugin:".
 * 		return capture == "my_plugin"
 * 	func _capture(message, data, session_id):
 * 		if message == "my_plugin:ping":
 * 			get_session(session_id).send_message("my_plugin:echo", data)
 * 			return true
 * 		return false
 * 	func _setup_session(session_id):
 * 		# Add a new tab in the debugger session UI containing a label.
 * 		var label = Label.new()
 * 		label.name = "Example plugin" # Will be used as the tab title.
 * 		label.text = "Example plugin"
 * 		var session = get_session(session_id)
 * 		# Listens to the session started and stopped signals.
 * 		session.started.connect(func (): print("Session started"))
 * 		session.stopped.connect(func (): print("Session stopped"))
 * 		session.add_session_tab(label)
 * var debugger = ExampleEditorDebugger.new()
 * func _enter_tree():
 * 	add_debugger_plugin(debugger)
 * func _exit_tree():
 * 	remove_debugger_plugin(debugger)
 *
 * @summary
 *
 *
 * To connect on the running game side, use the [EngineDebugger] singleton:
 *
 * @example
 *
 *
 * extends Node
 * func _ready():
 * 	EngineDebugger.register_message_capture("my_plugin", _capture)
 * 	EngineDebugger.send_message("my_plugin:ping", ["test"])
 * func _capture(message, data):
 * 	# Note that the "my_plugin:" prefix is not used here.
 * 	if message == "echo":
 * 		prints("Echo received:", data)
 * 		return true
 * 	return false
 *
 * @summary
 *
 *
 * **Note:** While the game is running, [method @GlobalScope.print] and similar functions **called in the editor** do not print anything, the Output Log prints only game messages.
 *
 */
declare class EditorDebuggerPlugin extends RefCounted {
  /**
   * [EditorDebuggerPlugin] provides functions related to the editor side of the debugger.
   *
   * To interact with the debugger, an instance of this class must be added to the editor via [method EditorPlugin.add_debugger_plugin].
   *
   * Once added, the [method _setup_session] callback will be called for every [EditorDebuggerSession] available to the plugin, and when new ones are created (the sessions may be inactive during this stage).
   *
   * You can retrieve the available [EditorDebuggerSession]s via [method get_sessions] or get a specific one via [method get_session].
   *
   * @example
   *
   *
   * @tool
   * extends EditorPlugin
   * class ExampleEditorDebugger extends EditorDebuggerPlugin:
   * 	func _has_capture(capture):
   * 		# Return true if you wish to handle messages with the prefix "my_plugin:".
   * 		return capture == "my_plugin"
   * 	func _capture(message, data, session_id):
   * 		if message == "my_plugin:ping":
   * 			get_session(session_id).send_message("my_plugin:echo", data)
   * 			return true
   * 		return false
   * 	func _setup_session(session_id):
   * 		# Add a new tab in the debugger session UI containing a label.
   * 		var label = Label.new()
   * 		label.name = "Example plugin" # Will be used as the tab title.
   * 		label.text = "Example plugin"
   * 		var session = get_session(session_id)
   * 		# Listens to the session started and stopped signals.
   * 		session.started.connect(func (): print("Session started"))
   * 		session.stopped.connect(func (): print("Session stopped"))
   * 		session.add_session_tab(label)
   * var debugger = ExampleEditorDebugger.new()
   * func _enter_tree():
   * 	add_debugger_plugin(debugger)
   * func _exit_tree():
   * 	remove_debugger_plugin(debugger)
   *
   * @summary
   *
   *
   * To connect on the running game side, use the [EngineDebugger] singleton:
   *
   * @example
   *
   *
   * extends Node
   * func _ready():
   * 	EngineDebugger.register_message_capture("my_plugin", _capture)
   * 	EngineDebugger.send_message("my_plugin:ping", ["test"])
   * func _capture(message, data):
   * 	# Note that the "my_plugin:" prefix is not used here.
   * 	if message == "echo":
   * 		prints("Echo received:", data)
   * 		return true
   * 	return false
   *
   * @summary
   *
   *
   * **Note:** While the game is running, [method @GlobalScope.print] and similar functions **called in the editor** do not print anything, the Output Log prints only game messages.
   *
   */
  new(): EditorDebuggerPlugin
  constructor()
  static new(): EditorDebuggerPlugin

  /** Override this method to be notified when a breakpoint is set in the editor. */
  protected _breakpoint_set_in_tree(
    script: Script,
    line: int,
    enabled: boolean
  ): void

  /** Override this method to be notified when all breakpoints are cleared in the editor. */
  protected _breakpoints_cleared_in_tree(): void

  /** Override this method to process incoming messages. The [param session_id] is the ID of the [EditorDebuggerSession] that received the [param message]. Use [method get_session] to retrieve the session. This method should return [code]true[/code] if the message is recognized. */
  protected _capture(message: string, data: any[], session_id: int): boolean

  /** Override this method to be notified when a breakpoint line has been clicked in the debugger breakpoint panel. */
  protected _goto_script_line(script: Script, line: int): void

  /** Override this method to enable receiving messages from the debugger. If [param capture] is "my_message" then messages starting with "my_message:" will be passed to the [method _capture] method. */
  protected _has_capture(capture: string): boolean

  /** Override this method to be notified whenever a new [EditorDebuggerSession] is created. Note that the session may be inactive during this stage. */
  protected _setup_session(session_id: int): void

  /** Returns the [EditorDebuggerSession] with the given [param id]. */
  get_session(id: int): EditorDebuggerSession

  /**
   * Returns an array of [EditorDebuggerSession] currently available to this debugger plugin.
   *
   * **Note:** Sessions in the array may be inactive, check their state via [method EditorDebuggerSession.is_active].
   *
   */
  get_sessions(): any[]

  connect<T extends SignalsOf<EditorDebuggerPlugin>>(
    signal: T,
    method: SignalFunction<EditorDebuggerPlugin[T]>
  ): number
}
