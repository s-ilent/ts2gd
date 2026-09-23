/**
 * Stores information about a mouse or a pen motion. This includes relative position, absolute position, and velocity. See [method Node._input].
 *
 * **Note:** By default, this event is only emitted once per frame rendered at most. If you need more precise input reporting, set [member Input.use_accumulated_input] to `false` to make events emitted as often as possible. If you use InputEventMouseMotion to draw lines, consider using [method Geometry2D.bresenham_line] as well to avoid visible gaps in lines if the user is moving the mouse quickly.
 *
 * **Note:** This event may be emitted even when the mouse hasn't moved, either by the operating system or by Godot itself. If you really need to know if the mouse has moved (e.g. to suppress displaying a tooltip), you should check that `relative.is_zero_approx()` is `false`.
 *
 */
declare class InputEventMouseMotion extends InputEventMouse {
  /**
   * Stores information about a mouse or a pen motion. This includes relative position, absolute position, and velocity. See [method Node._input].
   *
   * **Note:** By default, this event is only emitted once per frame rendered at most. If you need more precise input reporting, set [member Input.use_accumulated_input] to `false` to make events emitted as often as possible. If you use InputEventMouseMotion to draw lines, consider using [method Geometry2D.bresenham_line] as well to avoid visible gaps in lines if the user is moving the mouse quickly.
   *
   * **Note:** This event may be emitted even when the mouse hasn't moved, either by the operating system or by Godot itself. If you really need to know if the mouse has moved (e.g. to suppress displaying a tooltip), you should check that `relative.is_zero_approx()` is `false`.
   *
   */
  new(): InputEventMouseMotion
  constructor()
  static new(): InputEventMouseMotion

  /**
   * Returns `true` when using the eraser end of a stylus pen.
   *
   * **Note:** This property is implemented on Linux, macOS and Windows.
   *
   */
  pen_inverted: boolean

  /** Represents the pressure the user puts on the pen. Ranges from [code]0.0[/code] to [code]1.0[/code]. */
  pressure: float

  /**
   * The mouse position relative to the previous position (position at the last frame).
   *
   * **Note:** Since [InputEventMouseMotion] may only be emitted when the mouse moves, it is not possible to reliably detect when the mouse has stopped moving by checking this property. A separate, short timer may be necessary.
   *
   * **Note:** [member relative] is automatically scaled according to the content scale factor, which is defined by the project's stretch mode settings. This means mouse sensitivity will appear different depending on resolution when using [member relative] in a script that handles mouse aiming with the [constant Input.MOUSE_MODE_CAPTURED] mouse mode. To avoid this, use [member screen_relative] instead.
   *
   */
  relative: Vector2

  /**
   * The unscaled mouse position relative to the previous position in the coordinate system of the screen (position at the last frame).
   *
   * **Note:** Since [InputEventMouseMotion] may only be emitted when the mouse moves, it is not possible to reliably detect when the mouse has stopped moving by checking this property. A separate, short timer may be necessary.
   *
   * **Note:** This coordinate is **not** scaled according to the content scale factor or calls to [method InputEvent.xformed_by]. This should be preferred over [member relative] for mouse aiming when using the [constant Input.MOUSE_MODE_CAPTURED] mouse mode, regardless of the project's stretch mode.
   *
   */
  screen_relative: Vector2

  /**
   * The unscaled mouse velocity in pixels per second in screen coordinates. This velocity is **not** scaled according to the content scale factor or calls to [method InputEvent.xformed_by].
   *
   * **Note:** Use [member screen_relative] for mouse aiming using the [constant Input.MOUSE_MODE_CAPTURED] mouse mode.
   *
   */
  screen_velocity: Vector2

  /** Represents the angles of tilt of the pen. Positive X-coordinate value indicates a tilt to the right. Positive Y-coordinate value indicates a tilt toward the user. Ranges from [code]-1.0[/code] to [code]1.0[/code] for both axes. */
  tilt: Vector2

  /**
   * The mouse velocity in pixels per second.
   *
   * **Note:** [member velocity] is automatically scaled according to the content scale factor, which is defined by the project's stretch mode settings. That means mouse sensitivity may appear different depending on resolution.
   *
   * **Note:** Use [member screen_relative] for mouse aiming using the [constant Input.MOUSE_MODE_CAPTURED] mouse mode.
   *
   */
  velocity: Vector2

  connect<T extends SignalsOf<InputEventMouseMotion>>(
    signal: T,
    method: SignalFunction<InputEventMouseMotion[T]>
  ): number
}
