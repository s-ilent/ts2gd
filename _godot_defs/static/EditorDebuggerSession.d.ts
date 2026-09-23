/**
 * This class cannot be directly instantiated and must be retrieved via an [EditorDebuggerPlugin].
 *
 * You can add tabs to the session UI via [method add_session_tab], send messages via [method send_message], and toggle [EngineProfiler]s via [method toggle_profiler].
 *
 */
declare class EditorDebuggerSession extends RefCounted {
  /**
   * This class cannot be directly instantiated and must be retrieved via an [EditorDebuggerPlugin].
   *
   * You can add tabs to the session UI via [method add_session_tab], send messages via [method send_message], and toggle [EngineProfiler]s via [method toggle_profiler].
   *
   */
  new(): EditorDebuggerSession
  constructor()
  static new(): EditorDebuggerSession

  /** Adds the given [param control] to the debug session UI in the debugger bottom panel. The [param control]'s node name will be used as the tab title. */
  add_session_tab(control: Control): void

  /** Returns [code]true[/code] if the debug session is currently attached to a remote instance. */
  is_active(): boolean

  /** Returns [code]true[/code] if the attached remote instance is currently in the debug loop. */
  is_breaked(): boolean

  /** Returns [code]true[/code] if the attached remote instance can be debugged. */
  is_debuggable(): boolean

  /** Removes the given [param control] from the debug session UI in the debugger bottom panel. */
  remove_session_tab(control: Control): void

  /** Sends the given [param message] to the attached remote instance, optionally passing additionally [param data]. See [EngineDebugger] for how to retrieve those messages. */
  send_message(message: string, data?: any[]): void

  /** Enables or disables a specific breakpoint based on [param enabled], updating the Editor Breakpoint Panel accordingly. */
  set_breakpoint(path: string, line: int, enabled: boolean): void

  /** Toggle the given [param profiler] on the attached remote instance, optionally passing additionally [param data]. See [EngineProfiler] for more details. */
  toggle_profiler(profiler: string, enable: boolean, data?: any[]): void

  connect<T extends SignalsOf<EditorDebuggerSession>>(
    signal: T,
    method: SignalFunction<EditorDebuggerSession[T]>
  ): number

  /**
   * Emitted when the attached remote instance enters a break state. If [param can_debug] is `true`, the remote instance will enter the debug loop.
   *
   */
  $breaked: Signal<() => void>

  /**
   * Emitted when the attached remote instance exits a break state.
   *
   */
  $continued: Signal<() => void>

  /**
   * Emitted when a remote instance is attached to this session (i.e. the session becomes active).
   *
   */
  $started: Signal<() => void>

  /**
   * Emitted when a remote instance is detached from this session (i.e. the session becomes inactive).
   *
   */
  $stopped: Signal<() => void>
}
