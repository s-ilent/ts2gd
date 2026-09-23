/**
 * Custom logger to receive messages from the internal error/warning stream. Loggers are registered via [method OS.add_logger].
 *
 */
declare class Logger extends RefCounted {
  /**
   * Custom logger to receive messages from the internal error/warning stream. Loggers are registered via [method OS.add_logger].
   *
   */
  new(): Logger
  constructor()
  static new(): Logger

  /**
   * Called when an error is logged. The error provides the [param function], [param file], and [param line] that it originated from, as well as either the [param code] that generated the error or a [param rationale].
   *
   * The type of error provided by [param error_type] is described in the [enum ErrorType] enumeration.
   *
   * Additionally, [param script_backtraces] provides backtraces for each of the script languages. These will only contain stack frames in editor builds and debug builds by default. To enable them for release builds as well, you need to enable [member ProjectSettings.debug/settings/gdscript/always_track_call_stacks].
   *
   * **Warning:** This method will be called from threads other than the main thread, possibly at the same time, so you will need to have some kind of thread-safety in your implementation of it, like a [Mutex].
   *
   * **Note:** [param script_backtraces] will not contain any captured variables, due to its prohibitively high cost. To get those you will need to capture the backtraces yourself, from within the [Logger] virtual methods, using [method Engine.capture_script_backtraces].
   *
   * **Note:** Logging errors from this method using functions like [method @GlobalScope.push_error] or [method @GlobalScope.push_warning] is not supported, as it could cause infinite recursion. These errors will only show up in the console output.
   *
   */
  protected _log_error(
    func: string,
    file: string,
    line: int,
    code: string,
    rationale: string,
    editor_notify: boolean,
    error_type: int,
    script_backtraces: ScriptBacktrace[]
  ): void

  /**
   * Called when a message is logged. If [param error] is `true`, then this message was meant to be sent to `stderr`.
   *
   * **Warning:** This method will be called from threads other than the main thread, possibly at the same time, so you will need to have some kind of thread-safety in your implementation of it, like a [Mutex].
   *
   * **Note:** Logging another message from this method using functions like [method @GlobalScope.print] is not supported, as it could cause infinite recursion. These messages will only show up in the console output.
   *
   */
  protected _log_message(message: string, error: boolean): void

  connect<T extends SignalsOf<Logger>>(
    signal: T,
    method: SignalFunction<Logger[T]>
  ): number

  /**
   * The message received is an error.
   *
   */
  static ERROR_TYPE_ERROR: any

  /**
   * The message received is a warning.
   *
   */
  static ERROR_TYPE_WARNING: any

  /**
   * The message received is a script error.
   *
   */
  static ERROR_TYPE_SCRIPT: any

  /**
   * The message received is a shader error.
   *
   */
  static ERROR_TYPE_SHADER: any
}
