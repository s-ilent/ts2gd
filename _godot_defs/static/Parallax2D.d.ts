/**
 * A [Parallax2D] is used to create a parallax effect. It can move at a different speed relative to the camera movement using [member scroll_scale]. This creates an illusion of depth in a 2D game. If manual scrolling is desired, the [Camera2D] position can be ignored with [member ignore_camera_scroll].
 *
 * **Note:** Any changes to this node's position made after it enters the scene tree will be overridden if [member ignore_camera_scroll] is `false` or [member screen_offset] is modified.
 *
 */
declare class Parallax2D extends Node2D {
  /**
   * A [Parallax2D] is used to create a parallax effect. It can move at a different speed relative to the camera movement using [member scroll_scale]. This creates an illusion of depth in a 2D game. If manual scrolling is desired, the [Camera2D] position can be ignored with [member ignore_camera_scroll].
   *
   * **Note:** Any changes to this node's position made after it enters the scene tree will be overridden if [member ignore_camera_scroll] is `false` or [member screen_offset] is modified.
   *
   */
  new(): Parallax2D
  constructor()
  static new(): Parallax2D

  /** Velocity at which the offset scrolls automatically, in pixels per second. */
  autoscroll: Vector2

  /** If [code]true[/code], this [Parallax2D] is offset by the current camera's position. If the [Parallax2D] is in a [CanvasLayer] separate from the current camera, it may be desired to match the value with [member CanvasLayer.follow_viewport_enabled]. */
  follow_viewport: boolean

  /** If [code]true[/code], [Parallax2D]'s position is not affected by the position of the camera. */
  ignore_camera_scroll: boolean

  /** Top-left limits for scrolling to begin. If the camera is outside of this limit, the [Parallax2D] stops scrolling. Must be lower than [member limit_end] minus the viewport size to work. */
  limit_begin: Vector2

  /** Bottom-right limits for scrolling to end. If the camera is outside of this limit, the [Parallax2D] will stop scrolling. Must be higher than [member limit_begin] and the viewport size combined to work. */
  limit_end: Vector2

  /** Repeats the [Texture2D] of each of this node's children and offsets them by this value. When scrolling, the node's position loops, giving the illusion of an infinite scrolling background if the values are larger than the screen size. If an axis is set to [code]0[/code], the [Texture2D] will not be repeated. */
  repeat_size: Vector2

  /** Overrides the amount of times the texture repeats. Each texture copy spreads evenly from the original by [member repeat_size]. Useful for when zooming out with a camera. */
  repeat_times: int

  /** Offset used to scroll this [Parallax2D]. This value is updated automatically unless [member ignore_camera_scroll] is [code]true[/code]. */
  screen_offset: Vector2

  /**
   * The [Parallax2D]'s offset. Similar to [member screen_offset] and [member Node2D.position], but will not be overridden.
   *
   * **Note:** Values will loop if [member repeat_size] is set higher than `0`.
   *
   */
  scroll_offset: Vector2

  /**
   * Multiplier to the final [Parallax2D]'s offset. Can be used to simulate distance from the camera.
   *
   * For example, a value of `1` scrolls at the same speed as the camera. A value greater than `1` scrolls faster, making objects appear closer. Less than `1` scrolls slower, making objects appear further, and a value of `0` stops the objects completely.
   *
   */
  scroll_scale: Vector2

  connect<T extends SignalsOf<Parallax2D>>(
    signal: T,
    method: SignalFunction<Parallax2D[T]>
  ): number
}
