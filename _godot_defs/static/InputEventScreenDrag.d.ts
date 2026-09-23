/**
 * Stores information about screen drag events. See [method Node._input].
 *
 */
declare class InputEventScreenDrag extends InputEventFromWindow {
  /**
   * Stores information about screen drag events. See [method Node._input].
   *
   */
  new(): InputEventScreenDrag
  constructor()
  static new(): InputEventScreenDrag

  /** The drag event index in the case of a multi-drag event. */
  index: int

  /** Returns [code]true[/code] when using the eraser end of a stylus pen. */
  pen_inverted: boolean

  /** The drag position in the viewport the node is in, using the coordinate system of this viewport. */
  position: Vector2

  /** Represents the pressure the user puts on the pen. Ranges from [code]0.0[/code] to [code]1.0[/code]. */
  pressure: float

  /**
   * The drag position relative to the previous position (position at the last frame).
   *
   * **Note:** [member relative] is automatically scaled according to the content scale factor, which is defined by the project's stretch mode settings. This means touch sensitivity will appear different depending on resolution when using [member relative] in a script that handles touch aiming. To avoid this, use [member screen_relative] instead.
   *
   */
  relative: Vector2

  /** The unscaled drag position relative to the previous position in screen coordinates (position at the last frame). This position is [i]not[/i] scaled according to the content scale factor or calls to [method InputEvent.xformed_by]. This should be preferred over [member relative] for touch aiming regardless of the project's stretch mode. */
  screen_relative: Vector2

  /** The unscaled drag velocity in pixels per second in screen coordinates. This velocity is [i]not[/i] scaled according to the content scale factor or calls to [method InputEvent.xformed_by]. This should be preferred over [member velocity] for touch aiming regardless of the project's stretch mode. */
  screen_velocity: Vector2

  /** Represents the angles of tilt of the pen. Positive X-coordinate value indicates a tilt to the right. Positive Y-coordinate value indicates a tilt toward the user. Ranges from [code]-1.0[/code] to [code]1.0[/code] for both axes. */
  tilt: Vector2

  /**
   * The drag velocity.
   *
   * **Note:** [member velocity] is automatically scaled according to the content scale factor, which is defined by the project's stretch mode settings. This means touch sensitivity will appear different depending on resolution when using [member velocity] in a script that handles touch aiming. To avoid this, use [member screen_velocity] instead.
   *
   */
  velocity: Vector2

  connect<T extends SignalsOf<InputEventScreenDrag>>(
    signal: T,
    method: SignalFunction<InputEventScreenDrag[T]>
  ): number
}
