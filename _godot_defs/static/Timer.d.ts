/**
 * The [Timer] node is a countdown timer and is the simplest way to handle time-based logic in the engine. When a timer reaches the end of its [member wait_time], it will emit the [signal timeout] signal.
 *
 * After a timer enters the scene tree, it can be manually started with [method start]. A timer node is also started automatically if [member autostart] is `true`.
 *
 * Without requiring much code, a timer node can be added and configured in the editor. The [signal timeout] signal it emits can also be connected through the Signals dock in the editor:
 *
 * @example
 *
 * func _on_timer_timeout():
 * 	print("Time to attack!")
 * @summary
 *
 *
 * **Note:** To create a one-shot timer without instantiating a node, use [method SceneTree.create_timer].
 *
 * **Note:** Timers are affected by [member Engine.time_scale] unless [member ignore_time_scale] is `true`. The higher the time scale, the sooner timers will end. How often a timer processes may depend on the framerate or [member Engine.physics_ticks_per_second].
 *
 */
declare class Timer extends Node {
  /**
   * The [Timer] node is a countdown timer and is the simplest way to handle time-based logic in the engine. When a timer reaches the end of its [member wait_time], it will emit the [signal timeout] signal.
   *
   * After a timer enters the scene tree, it can be manually started with [method start]. A timer node is also started automatically if [member autostart] is `true`.
   *
   * Without requiring much code, a timer node can be added and configured in the editor. The [signal timeout] signal it emits can also be connected through the Signals dock in the editor:
   *
   * @example
   *
   * func _on_timer_timeout():
   * 	print("Time to attack!")
   * @summary
   *
   *
   * **Note:** To create a one-shot timer without instantiating a node, use [method SceneTree.create_timer].
   *
   * **Note:** Timers are affected by [member Engine.time_scale] unless [member ignore_time_scale] is `true`. The higher the time scale, the sooner timers will end. How often a timer processes may depend on the framerate or [member Engine.physics_ticks_per_second].
   *
   */
  new(): Timer
  constructor()
  static new(): Timer

  /**
   * If `true`, the timer will start immediately when it enters the scene tree.
   *
   * **Note:** After the timer enters the tree, this property is automatically set to `false`.
   *
   * **Note:** This property does nothing when the timer is running in the editor.
   *
   */
  autostart: boolean

  /** If [code]true[/code], the timer will ignore [member Engine.time_scale] and update with the real, elapsed time. */
  ignore_time_scale: boolean

  /** If [code]true[/code], the timer will stop after reaching the end. Otherwise, as by default, the timer will automatically restart. */
  one_shot: boolean

  /** If [code]true[/code], the timer is paused. A paused timer does not process until this property is set back to [code]false[/code], even when [method start] is called. See also [method stop]. */
  paused: boolean

  /** Specifies when the timer is updated during the main loop. */
  process_callback: int

  /**
   * The timer's remaining time in seconds. This is always `0` if the timer is stopped.
   *
   * **Note:** This property is read-only and cannot be modified. It is based on [member wait_time].
   *
   */
  time_left: float

  /**
   * The time required for the timer to end, in seconds. This property can also be set every time [method start] is called.
   *
   * **Note:** Timers can only process once per physics or process frame (depending on the [member process_callback]). An unstable framerate may cause the timer to end inconsistently, which is especially noticeable if the wait time is lower than roughly `0.05` seconds. For very short timers, it is recommended to write your own code instead of using a [Timer] node. Timers are also affected by [member Engine.time_scale].
   *
   */
  wait_time: float

  /** Returns [code]true[/code] if the timer is stopped or has not started. */
  is_stopped(): boolean

  /**
   * Starts the timer, or resets the timer if it was started already. Fails if the timer is not inside the scene tree. If [param time_sec] is greater than `0`, this value is used for the [member wait_time].
   *
   * **Note:** This method does not resume a paused timer. See [member paused].
   *
   */
  start(time_sec?: float): void

  /**
   * Stops the timer. See also [member paused]. Unlike [method start], this can safely be called if the timer is not inside the scene tree.
   *
   * **Note:** Calling [method stop] does not emit the [signal timeout] signal, as the timer is not considered to have timed out. If this is desired, use `$Timer.timeout.emit()` after calling [method stop] to manually emit the signal.
   *
   */
  stop(): void

  connect<T extends SignalsOf<Timer>>(
    signal: T,
    method: SignalFunction<Timer[T]>
  ): number

  /**
   * Update the timer every physics process frame (see [constant Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS]).
   *
   */
  static TIMER_PROCESS_PHYSICS: any

  /**
   * Update the timer every process (rendered) frame (see [constant Node.NOTIFICATION_INTERNAL_PROCESS]).
   *
   */
  static TIMER_PROCESS_IDLE: any

  /**
   * Emitted when the timer reaches the end.
   *
   */
  $timeout: Signal<() => void>
}
