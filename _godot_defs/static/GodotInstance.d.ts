/**
 * GodotInstance represents a running Godot instance that is controlled from an outside codebase, without a perpetual main loop. It is created by the C API `libgodot_create_godot_instance`. Only one may be created per process.
 *
 */
declare class GodotInstance extends Object {
  /**
   * GodotInstance represents a running Godot instance that is controlled from an outside codebase, without a perpetual main loop. It is created by the C API `libgodot_create_godot_instance`. Only one may be created per process.
   *
   */
  new(): GodotInstance
  constructor()
  static new(): GodotInstance

  /** Notifies the instance that it is now in focus. */
  focus_in(): void

  /** Notifies the instance that it is now not in focus. */
  focus_out(): void

  /** Returns [code]true[/code] if this instance has been fully started. */
  is_started(): boolean

  /** Runs a single iteration of the main loop. Returns [code]true[/code] if the engine is attempting to quit. */
  iteration(): boolean

  /** Notifies the instance that it is going to be paused. */
  pause(): void

  /** Notifies the instance that it is being resumed. */
  resume(): void

  /** Finishes this instance's startup sequence. Returns [code]true[/code] on success. */
  start(): boolean

  connect<T extends SignalsOf<GodotInstance>>(
    signal: T,
    method: SignalFunction<GodotInstance[T]>
  ): number
}
