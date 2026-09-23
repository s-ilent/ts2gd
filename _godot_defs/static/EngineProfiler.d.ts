/**
 * This class can be used to implement custom profilers that are able to interact with the engine and editor debugger.
 *
 * See [EngineDebugger] and [EditorDebuggerPlugin] for more information.
 *
 */
declare class EngineProfiler extends RefCounted {
  /**
   * This class can be used to implement custom profilers that are able to interact with the engine and editor debugger.
   *
   * See [EngineDebugger] and [EditorDebuggerPlugin] for more information.
   *
   */
  new(): EngineProfiler
  constructor()
  static new(): EngineProfiler

  /** Called when data is added to profiler using [method EngineDebugger.profiler_add_frame_data]. */
  protected _add_frame(data: any[]): void

  /** Called once every engine iteration when the profiler is active with information about the current frame. All time values are in seconds. Lower values represent faster processing times and are therefore considered better. */
  protected _tick(
    frame_time: float,
    process_time: float,
    physics_time: float,
    physics_frame_time: float
  ): void

  /** Called when the profiler is enabled/disabled, along with a set of [param options]. */
  protected _toggle(enable: boolean, options: any[]): void

  connect<T extends SignalsOf<EngineProfiler>>(
    signal: T,
    method: SignalFunction<EngineProfiler[T]>
  ): number
}
