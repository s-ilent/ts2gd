/**
 * [ScriptBacktrace] holds an already captured backtrace of a specific script language, such as GDScript or C#, which are captured using [method Engine.capture_script_backtraces].
 *
 * See [member ProjectSettings.debug/settings/gdscript/always_track_call_stacks] and [member ProjectSettings.debug/settings/gdscript/always_track_local_variables] for ways of controlling the contents of this class.
 *
 */
declare class ScriptBacktrace extends RefCounted {
  /**
   * [ScriptBacktrace] holds an already captured backtrace of a specific script language, such as GDScript or C#, which are captured using [method Engine.capture_script_backtraces].
   *
   * See [member ProjectSettings.debug/settings/gdscript/always_track_call_stacks] and [member ProjectSettings.debug/settings/gdscript/always_track_local_variables] for ways of controlling the contents of this class.
   *
   */
  new(): ScriptBacktrace
  constructor()
  static new(): ScriptBacktrace

  /**
   * Converts the backtrace to a [String], where the entire string will be indented by [param indent_all] number of spaces, and the individual stack frames will be additionally indented by [param indent_frames] number of spaces.
   *
   * **Note:** Calling [method Object.to_string] on a [ScriptBacktrace] will produce the same output as calling [method format] with all parameters left at their default values.
   *
   */
  format(indent_all?: int, indent_frames?: int): string

  /** Returns the number of stack frames in the backtrace. */
  get_frame_count(): int

  /** Returns the file name of the call site represented by the stack frame at the specified index. */
  get_frame_file(index: int): string

  /** Returns the name of the function called at the stack frame at the specified index. */
  get_frame_function(index: int): string

  /** Returns the line number of the call site represented by the stack frame at the specified index. */
  get_frame_line(index: int): int

  /**
   * Returns the number of global variables (e.g. autoload singletons) in the backtrace.
   *
   * **Note:** This will be non-zero only if the `include_variables` parameter was `true` when capturing the backtrace with [method Engine.capture_script_backtraces].
   *
   */
  get_global_variable_count(): int

  /** Returns the name of the global variable at the specified index. */
  get_global_variable_name(variable_index: int): string

  /**
   * Returns the value of the global variable at the specified index.
   *
   * **Warning:** With GDScript backtraces, the returned [Variant] will be the variable's actual value, including any object references. This means that storing the returned [Variant] will prevent any such object from being deallocated, so it's generally recommended not to do so.
   *
   */
  get_global_variable_value(variable_index: int): any

  /** Returns the name of the script language that this backtrace was captured from. */
  get_language_name(): string

  /**
   * Returns the number of local variables in the stack frame at the specified index.
   *
   * **Note:** This will be non-zero only if the `include_variables` parameter was `true` when capturing the backtrace with [method Engine.capture_script_backtraces].
   *
   */
  get_local_variable_count(frame_index: int): int

  /** Returns the name of the local variable at the specified [param variable_index] in the stack frame at the specified [param frame_index]. */
  get_local_variable_name(frame_index: int, variable_index: int): string

  /**
   * Returns the value of the local variable at the specified [param variable_index] in the stack frame at the specified [param frame_index].
   *
   * **Warning:** With GDScript backtraces, the returned [Variant] will be the variable's actual value, including any object references. This means that storing the returned [Variant] will prevent any such object from being deallocated, so it's generally recommended not to do so.
   *
   */
  get_local_variable_value(frame_index: int, variable_index: int): any

  /**
   * Returns the number of member variables in the stack frame at the specified index.
   *
   * **Note:** This will be non-zero only if the `include_variables` parameter was `true` when capturing the backtrace with [method Engine.capture_script_backtraces].
   *
   */
  get_member_variable_count(frame_index: int): int

  /** Returns the name of the member variable at the specified [param variable_index] in the stack frame at the specified [param frame_index]. */
  get_member_variable_name(frame_index: int, variable_index: int): string

  /**
   * Returns the value of the member variable at the specified [param variable_index] in the stack frame at the specified [param frame_index].
   *
   * **Warning:** With GDScript backtraces, the returned [Variant] will be the variable's actual value, including any object references. This means that storing the returned [Variant] will prevent any such object from being deallocated, so it's generally recommended not to do so.
   *
   */
  get_member_variable_value(frame_index: int, variable_index: int): any

  /** Returns [code]true[/code] if the backtrace has no stack frames. */
  is_empty(): boolean

  connect<T extends SignalsOf<ScriptBacktrace>>(
    signal: T,
    method: SignalFunction<ScriptBacktrace[T]>
  ): number
}
