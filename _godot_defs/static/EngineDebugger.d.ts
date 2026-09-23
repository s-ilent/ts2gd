/**
 * [EngineDebugger] handles the communication between the editor and the running game. It is active in the running game. Messages can be sent/received through it. It also manages the profilers.
 *
 */
declare class EngineDebuggerClass extends Object {
  /**
   * [EngineDebugger] handles the communication between the editor and the running game. It is active in the running game. Messages can be sent/received through it. It also manages the profilers.
   *
   */
  new(): EngineDebuggerClass
  constructor()
  static new(): EngineDebuggerClass

  /** Clears all breakpoints. */
  clear_breakpoints(): void

  /** Starts a debug break in script execution, optionally specifying whether the program can continue based on [param can_continue] and whether the break was due to a breakpoint. */
  debug(can_continue?: boolean, is_error_breakpoint?: boolean): void

  /** Returns the current debug depth. */
  get_depth(): int

  /** Returns the number of lines that remain. */
  get_lines_left(): int

  /** Returns [code]true[/code] if a capture with the given name is present otherwise [code]false[/code]. */
  has_capture(name: StringName): boolean

  /** Returns [code]true[/code] if a profiler with the given name is present otherwise [code]false[/code]. */
  has_profiler(name: StringName): boolean

  /** Inserts a new breakpoint with the given [param source] and [param line]. */
  insert_breakpoint(line: int, source: StringName): void

  /** Returns [code]true[/code] if the debugger is active otherwise [code]false[/code]. */
  is_active(): boolean

  /** Returns [code]true[/code] if the given [param source] and [param line] represent an existing breakpoint. */
  is_breakpoint(line: int, source: StringName): boolean

  /** Returns [code]true[/code] if a profiler with the given name is present and active otherwise [code]false[/code]. */
  is_profiling(name: StringName): boolean

  /** Returns [code]true[/code] if the debugger is skipping breakpoints otherwise [code]false[/code]. */
  is_skipping_breakpoints(): boolean

  /** Forces a processing loop of debugger events. The purpose of this method is just processing events every now and then when the script might get too busy, so that bugs like infinite loops can be caught. */
  line_poll(): void

  /** Calls the [code]add[/code] callable of the profiler with given [param name] and [param data]. */
  profiler_add_frame_data(name: StringName, data: any[]): void

  /** Calls the [code]toggle[/code] callable of the profiler with given [param name] and [param arguments]. Enables/Disables the same profiler depending on [param enable] argument. */
  profiler_enable(name: StringName, enable: boolean, arguments?: any[]): void

  /**
   * Registers a message capture with given [param name]. If [param name] is "my_message" then messages starting with "my_message:" will be called with the given callable.
   *
   * The callable must accept a message string and a data array as argument. The callable should return `true` if the message is recognized.
   *
   * **Note:** The callable will receive the message with the prefix stripped, unlike [method EditorDebuggerPlugin._capture]. See the [EditorDebuggerPlugin] description for an example.
   *
   */
  register_message_capture(name: StringName, callable: Callable): void

  /** Registers a profiler with the given [param name]. See [EngineProfiler] for more information. */
  register_profiler(name: StringName, profiler: EngineProfiler): void

  /** Removes a breakpoint with the given [param source] and [param line]. */
  remove_breakpoint(line: int, source: StringName): void

  /** Starts a debug break in script execution, optionally specifying whether the program can continue based on [param can_continue] and whether the break was due to a breakpoint. */
  script_debug(
    language: ScriptLanguage,
    can_continue?: boolean,
    is_error_breakpoint?: boolean
  ): void

  /** Sends a message with given [param message] and [param data] array. */
  send_message(message: string, data: any[]): void

  /** Sets the current debugging depth. */
  set_depth(depth: int): void

  /** Sets the current debugging lines that remain. */
  set_lines_left(lines: int): void

  /** Unregisters the message capture with given [param name]. */
  unregister_message_capture(name: StringName): void

  /** Unregisters a profiler with given [param name]. */
  unregister_profiler(name: StringName): void

  connect<T extends SignalsOf<EngineDebuggerClass>>(
    signal: T,
    method: SignalFunction<EngineDebuggerClass[T]>
  ): number
}
