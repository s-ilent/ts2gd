/**
 * This resource describes a mathematical curve by defining a set of points and tangents at each point. By default, it ranges between `0` and `1` on the X and Y axes, but these ranges can be changed.
 *
 * Please note that many resources and nodes assume they are given **unit curves**. A unit curve is a curve whose domain (the X axis) is between `0` and `1`. Some examples of unit curve usage are [member CPUParticles2D.angle_curve] and [member Line2D.width_curve].
 *
 */
declare class Curve extends Resource {
  /**
   * This resource describes a mathematical curve by defining a set of points and tangents at each point. By default, it ranges between `0` and `1` on the X and Y axes, but these ranges can be changed.
   *
   * Please note that many resources and nodes assume they are given **unit curves**. A unit curve is a curve whose domain (the X axis) is between `0` and `1`. Some examples of unit curve usage are [member CPUParticles2D.angle_curve] and [member Line2D.width_curve].
   *
   */
  new(): Curve
  constructor()
  static new(): Curve

  /** The number of points to include in the baked (i.e. cached) curve data. */
  bake_resolution: int

  /** The maximum domain (x-coordinate) that points can have. */
  max_domain: float

  /** The maximum value (y-coordinate) that points can have. Tangents can cause higher values between points. */
  max_value: float

  /** The minimum domain (x-coordinate) that points can have. */
  min_domain: float

  /** The minimum value (y-coordinate) that points can have. Tangents can cause lower values between points. */
  min_value: float

  /** The number of points describing the curve. */
  point_count: int

  /** Adds a point to the curve. For each side, if the [code]*_mode[/code] is [constant TANGENT_LINEAR], the [code]*_tangent[/code] angle (in degrees) uses the slope of the curve halfway to the adjacent point. Allows custom assignments to the [code]*_tangent[/code] angle if [code]*_mode[/code] is set to [constant TANGENT_FREE]. */
  add_point(
    position: Vector2,
    left_tangent?: float,
    right_tangent?: float,
    left_mode?: int,
    right_mode?: int
  ): int

  /** Recomputes the baked cache of points for the curve. */
  bake(): void

  /** Removes duplicate points, i.e. points that are less than 0.00001 units (engine epsilon value) away from their neighbor on the curve. */
  clean_dupes(): void

  /** Removes all points from the curve. */
  clear_points(): void

  /** Returns the difference between [member min_domain] and [member max_domain]. */
  get_domain_range(): float

  /** Returns the left [enum TangentMode] for the point at [param index]. */
  get_point_left_mode(index: int): int

  /** Returns the left tangent angle (in degrees) for the point at [param index]. */
  get_point_left_tangent(index: int): float

  /** Returns the curve coordinates for the point at [param index]. */
  get_point_position(index: int): Vector2

  /** Returns the right [enum TangentMode] for the point at [param index]. */
  get_point_right_mode(index: int): int

  /** Returns the right tangent angle (in degrees) for the point at [param index]. */
  get_point_right_tangent(index: int): float

  /** Returns the difference between [member min_value] and [member max_value]. */
  get_value_range(): float

  /** Removes the point at [param index] from the curve. */
  remove_point(index: int): void

  /** Returns the Y value for the point that would exist at the X position [param offset] along the curve. */
  sample(offset: float): float

  /** Returns the Y value for the point that would exist at the X position [param offset] along the curve using the baked cache. Bakes the curve's points if not already baked. */
  sample_baked(offset: float): float

  /** Sets the left [enum TangentMode] for the point at [param index] to [param mode]. */
  set_point_left_mode(index: int, mode: int): void

  /** Sets the left tangent angle for the point at [param index] to [param tangent]. */
  set_point_left_tangent(index: int, tangent: float): void

  /** Sets the offset from [code]0.5[/code]. */
  set_point_offset(index: int, offset: float): int

  /** Sets the right [enum TangentMode] for the point at [param index] to [param mode]. */
  set_point_right_mode(index: int, mode: int): void

  /** Sets the right tangent angle for the point at [param index] to [param tangent]. */
  set_point_right_tangent(index: int, tangent: float): void

  /** Assigns the vertical position [param y] to the point at [param index]. */
  set_point_value(index: int, y: float): void

  connect<T extends SignalsOf<Curve>>(
    signal: T,
    method: SignalFunction<Curve[T]>
  ): number

  /**
   * The tangent on this side of the point is user-defined.
   *
   */
  static TANGENT_FREE: any

  /**
   * The curve calculates the tangent on this side of the point as the slope halfway towards the adjacent point.
   *
   */
  static TANGENT_LINEAR: any

  /**
   * The total number of available tangent modes.
   *
   */
  static TANGENT_MODE_COUNT: any

  /**
   * Emitted when [member max_domain] or [member min_domain] is changed.
   *
   */
  $domain_changed: Signal<() => void>

  /**
   * Emitted when [member max_value] or [member min_value] is changed.
   *
   */
  $range_changed: Signal<() => void>
}
