/**
 * A 2-element structure that can be used to represent 2D coordinates or any other pair of numeric values.
 *
 * It uses floating-point coordinates. By default, these floating-point values use 32-bit precision, unlike [float] which is always 64-bit. If double precision is needed, compile the engine with the option `precision=double`.
 *
 * See [Vector2i] for its integer counterpart.
 *
 * **Note:** In a boolean context, a Vector2 will evaluate to `false` if it's equal to `Vector2(0, 0)`. Otherwise, a Vector2 will always evaluate to `true`.
 *
 */
declare class Vector2Constructor {
  /**
   * A 2-element structure that can be used to represent 2D coordinates or any other pair of numeric values.
   *
   * It uses floating-point coordinates. By default, these floating-point values use 32-bit precision, unlike [float] which is always 64-bit. If double precision is needed, compile the engine with the option `precision=double`.
   *
   * See [Vector2i] for its integer counterpart.
   *
   * **Note:** In a boolean context, a Vector2 will evaluate to `false` if it's equal to `Vector2(0, 0)`. Otherwise, a Vector2 will always evaluate to `true`.
   *
   */

  /** The vector's X component. Also accessible by using the index position [code][0][/code]. */
  x: float

  /** The vector's Y component. Also accessible by using the index position [code][1][/code]. */
  y: float

  /** Returns a new vector with all components in absolute values (i.e. positive). */
  abs(): Vector2

  /**
   * Returns this vector's angle with respect to the positive X axis, or `(1, 0)` vector, in radians.
   *
   * For example, `Vector2.RIGHT.angle()` will return zero, `Vector2.DOWN.angle()` will return `PI / 2` (a quarter turn, or 90 degrees), and `Vector2(1, -1).angle()` will return `-PI / 4` (a negative eighth turn, or -45 degrees).
   *
   * This is equivalent to calling [method @GlobalScope.atan2] with [member y] and [member x].
   *
   * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/vector2_angle.png]Illustration of the returned angle.[/url]
   *
   */
  angle(): float

  /**
   * Returns the signed angle to the given vector, in radians. The result ranges from `-PI` to `PI` (inclusive).
   *
   * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/vector2_angle_to.png]Illustration of the returned angle.[/url]
   *
   */
  angle_to(to: Vector2): float

  /**
   * Returns the signed angle between the X axis and the line from this vector to point [param to], in radians. The result ranges from `-PI` to `PI` (inclusive).
   *
   * `a.angle_to_point(b)` is equivalent to `(b - a).angle()`. See also [method angle].
   *
   * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/vector2_angle_to_point.png]Illustration of the returned angle.[/url]
   *
   */
  angle_to_point(to: Vector2): float

  /** Returns this vector's aspect ratio, which is [member x] divided by [member y]. */
  aspect(): float

  /** Returns the derivative at the given [param t] on the [url=https://en.wikipedia.org/wiki/B%C3%A9zier_curve]Bézier curve[/url] defined by this vector and the given [param control_1], [param control_2], and [param end] points. */
  bezier_derivative(
    control_1: Vector2,
    control_2: Vector2,
    end: Vector2,
    t: float
  ): Vector2

  /** Returns the point at the given [param t] on the [url=https://en.wikipedia.org/wiki/B%C3%A9zier_curve]Bézier curve[/url] defined by this vector and the given [param control_1], [param control_2], and [param end] points. */
  bezier_interpolate(
    control_1: Vector2,
    control_2: Vector2,
    end: Vector2,
    t: float
  ): Vector2

  /**
   * Returns the vector "bounced off" from a line defined by the given normal [param n] perpendicular to the line.
   *
   * **Note:** [method bounce] performs the operation that most engines and frameworks call [code skip-lint]reflect()`.
   *
   */
  bounce(n: Vector2): Vector2

  /** Returns a new vector with all components rounded up (towards positive infinity). */
  ceil(): Vector2

  /** Returns a new vector with all components clamped between the components of [param min] and [param max], by running [method @GlobalScope.clamp] on each component. */
  clamp(min: Vector2, max: Vector2): Vector2

  /** Returns a new vector with all components clamped between [param min] and [param max], by running [method @GlobalScope.clamp] on each component. */
  clampf(min: float, max: float): Vector2

  /**
   * Returns the 2D analog of the cross product for this vector and [param with].
   *
   * This is the signed area of the parallelogram formed by the two vectors. If the second vector is clockwise from the first vector, then the cross product is the positive area. If counter-clockwise, the cross product is the negative area. If the two vectors are parallel this returns zero, making it useful for testing if two vectors are parallel.
   *
   * **Note:** Cross product is not defined in 2D mathematically. This method embeds the 2D vectors in the XY plane of 3D space and uses their cross product's Z component as the analog.
   *
   */
  cross(_with: Vector2): float

  /** Performs a cubic interpolation between this vector and [param b] using [param pre_a] and [param post_b] as handles, and returns the result at position [param weight]. [param weight] is on the range of 0.0 to 1.0, representing the amount of interpolation. */
  cubic_interpolate(
    b: Vector2,
    pre_a: Vector2,
    post_b: Vector2,
    weight: float
  ): Vector2

  /**
   * Performs a cubic interpolation between this vector and [param b] using [param pre_a] and [param post_b] as handles, and returns the result at position [param weight]. [param weight] is on the range of 0.0 to 1.0, representing the amount of interpolation.
   *
   * It can perform smoother interpolation than [method cubic_interpolate] by the time values.
   *
   */
  cubic_interpolate_in_time(
    b: Vector2,
    pre_a: Vector2,
    post_b: Vector2,
    weight: float,
    b_t: float,
    pre_a_t: float,
    post_b_t: float
  ): Vector2

  /**
   * Returns the normalized vector pointing from this vector to [param to].
   *
   * `a.direction_to(b)` is equivalent to `(b - a).normalized()`. See also [method normalized].
   *
   */
  direction_to(to: Vector2): Vector2

  /**
   * Returns the squared distance between this vector and [param to].
   *
   * This method runs faster than [method distance_to], so prefer it if you need to compare vectors or need the squared distance for some formula.
   *
   */
  distance_squared_to(to: Vector2): float

  /** Returns the distance between this vector and [param to]. */
  distance_to(to: Vector2): float

  /**
   * Returns the dot product of this vector and [param with]. This can be used to compare the angle between two vectors. For example, this can be used to determine whether an enemy is facing the player.
   *
   * The dot product will be `0` for a right angle (90 degrees), greater than 0 for angles narrower than 90 degrees and lower than 0 for angles wider than 90 degrees.
   *
   * When using unit (normalized) vectors, the result will always be between `-1.0` (180 degree angle) when the vectors are facing opposite directions, and `1.0` (0 degree angle) when the vectors are aligned.
   *
   * **Note:** `a.dot(b)` is equivalent to `b.dot(a)`.
   *
   */
  dot(_with: Vector2): float

  /** Returns a new vector with all components rounded down (towards negative infinity). */
  floor(): Vector2

  /**
   * Creates a [Vector2] rotated to the given [param angle] in radians. This is equivalent to doing `Vector2(cos(angle), sin(angle))` or `Vector2.RIGHT.rotated(angle)`.
   *
   * @example
   *
   * print(Vector2.from_angle(0)) # Prints (1.0, 0.0)
   * print(Vector2(1, 0).angle()) # Prints 0.0, which is the angle used above.
   * print(Vector2.from_angle(PI / 2)) # Prints (0.0, 1.0)
   * @summary
   *
   *
   * **Note:** The length of the returned [Vector2] is **approximately** `1.0`, but is is not guaranteed to be exactly `1.0` due to floating-point precision issues. Call [method normalized] on the returned [Vector2] if you require a unit vector.
   *
   */
  static from_angle(angle: float): Vector2

  /** Returns [code]true[/code] if this vector and [param to] are approximately equal, by running [method @GlobalScope.is_equal_approx] on each component. */
  is_equal_approx(to: Vector2): boolean

  /** Returns [code]true[/code] if this vector is finite, by calling [method @GlobalScope.is_finite] on each component. */
  is_finite(): boolean

  /** Returns [code]true[/code] if the vector is normalized, i.e. its length is approximately equal to 1. */
  is_normalized(): boolean

  /**
   * Returns `true` if this vector's values are approximately zero, by running [method @GlobalScope.is_zero_approx] on each component.
   *
   * This method is faster than using [method is_equal_approx] with one value as a zero vector.
   *
   */
  is_zero_approx(): boolean

  /** Returns the length (magnitude) of this vector. */
  length(): float

  /**
   * Returns the squared length (squared magnitude) of this vector.
   *
   * This method runs faster than [method length], so prefer it if you need to compare vectors or need the squared distance for some formula.
   *
   */
  length_squared(): float

  /** Returns the result of the linear interpolation between this vector and [param to] by amount [param weight]. [param weight] is on the range of [code]0.0[/code] to [code]1.0[/code], representing the amount of interpolation. */
  lerp(to: Vector2, weight: float): Vector2

  /** Returns the vector with a maximum length by limiting its length to [param length]. If the vector is non-finite, the result is undefined. */
  limit_length(length?: float): Vector2

  /** Returns the component-wise maximum of this and [param with], equivalent to [code]Vector2(maxf(x, with.x), maxf(y, with.y))[/code]. */
  max(_with: Vector2): Vector2

  /** Returns the axis of the vector's highest value. See [code]AXIS_*[/code] constants. If all components are equal, this method returns [constant AXIS_X]. */
  max_axis_index(): int

  /** Returns the component-wise maximum of this and [param with], equivalent to [code]Vector2(maxf(x, with), maxf(y, with))[/code]. */
  maxf(_with: float): Vector2

  /** Returns the component-wise minimum of this and [param with], equivalent to [code]Vector2(minf(x, with.x), minf(y, with.y))[/code]. */
  min(_with: Vector2): Vector2

  /** Returns the axis of the vector's lowest value. See [code]AXIS_*[/code] constants. If all components are equal, this method returns [constant AXIS_Y]. */
  min_axis_index(): int

  /** Returns the component-wise minimum of this and [param with], equivalent to [code]Vector2(minf(x, with), minf(y, with))[/code]. */
  minf(_with: float): Vector2

  /** Returns a new vector moved toward [param to] by the fixed [param delta] amount. Will not go past the final value. */
  move_toward(to: Vector2, delta: float): Vector2

  /**
   * Returns the result of scaling the vector to unit length. Equivalent to `v / v.length()`. Returns `(0, 0)` if `v.length() == 0`. See also [method is_normalized].
   *
   * **Note:** This function may return incorrect values if the input vector length is near zero.
   *
   */
  normalized(): Vector2

  /** Returns a perpendicular vector rotated 90 degrees counter-clockwise compared to the original, with the same length. */
  orthogonal(): Vector2

  /** Returns a vector composed of the [method @GlobalScope.fposmod] of this vector's components and [param mod]. */
  posmod(mod: float): Vector2

  /** Returns a vector composed of the [method @GlobalScope.fposmod] of this vector's components and [param modv]'s components. */
  posmodv(modv: Vector2): Vector2

  /**
   * Returns a new vector resulting from projecting this vector onto the given vector [param b]. The resulting new vector is parallel to [param b]. See also [method slide].
   *
   * **Note:** If the vector [param b] is a zero vector, the components of the resulting new vector will be [constant @GDScript.NAN].
   *
   */
  project(b: Vector2): Vector2

  /**
   * Returns the result of reflecting the vector from a line defined by the given direction vector [param line].
   *
   * **Note:** [method reflect] differs from what other engines and frameworks call [code skip-lint]reflect()`. In other engines, [code skip-lint]reflect()` takes a normal direction which is a direction perpendicular to the line. In Godot, you specify the direction of the line directly. See also [method bounce] which does what most engines call [code skip-lint]reflect()`.
   *
   */
  reflect(line: Vector2): Vector2

  /** Returns the result of rotating this vector by [param angle] (in radians). See also [method @GlobalScope.deg_to_rad]. */
  rotated(angle: float): Vector2

  /** Returns a new vector with all components rounded to the nearest integer, with halfway cases rounded away from zero. */
  round(): Vector2

  /** Returns a new vector with each component set to [code]1.0[/code] if it's positive, [code]-1.0[/code] if it's negative, and [code]0.0[/code] if it's zero. The result is identical to calling [method @GlobalScope.sign] on each component. */
  sign(): Vector2

  /**
   * Returns the result of spherical linear interpolation between this vector and [param to], by amount [param weight]. [param weight] is on the range of 0.0 to 1.0, representing the amount of interpolation.
   *
   * This method also handles interpolating the lengths if the input vectors have different lengths. For the special case of one or both input vectors having zero length, this method behaves like [method lerp].
   *
   */
  slerp(to: Vector2, weight: float): Vector2

  /**
   * Returns a new vector resulting from sliding this vector along a line with normal [param n]. The resulting new vector is perpendicular to [param n], and is equivalent to this vector minus its projection on [param n]. See also [method project].
   *
   * **Note:** The vector [param n] must be normalized. See also [method normalized].
   *
   */
  slide(n: Vector2): Vector2

  /** Returns a new vector with each component snapped to the nearest multiple of the corresponding component in [param step]. This can also be used to round the components to an arbitrary number of decimals. */
  snapped(step: Vector2): Vector2

  /** Returns a new vector with each component snapped to the nearest multiple of [param step]. This can also be used to round the components to an arbitrary number of decimals. */
  snappedf(step: float): Vector2

  connect<T extends SignalsOf<Vector2>>(
    signal: T,
    method: SignalFunction<Vector2[T]>
  ): number

  add(other: number | Vector2): Vector2
  sub(other: number | Vector2): Vector2
  mul(other: number | Vector2): Vector2
  div(other: number | Vector2): Vector2

  /**
   * Enumerated value for the X axis. Returned by [method max_axis_index] and [method min_axis_index].
   *
   */
  static AXIS_X: any

  /**
   * Enumerated value for the Y axis. Returned by [method max_axis_index] and [method min_axis_index].
   *
   */
  static AXIS_Y: any

  /**
   * Zero vector, a vector with all components set to `0`.
   *
   */
  static ZERO: Vector2

  /**
   * One vector, a vector with all components set to `1`.
   *
   */
  static ONE: Vector2

  /**
   * Infinity vector, a vector with all components set to [constant @GDScript.INF].
   *
   */
  static INF: Vector2

  /**
   * Left unit vector. Represents the direction of left.
   *
   */
  static LEFT: Vector2

  /**
   * Right unit vector. Represents the direction of right.
   *
   */
  static RIGHT: Vector2

  /**
   * Up unit vector. Y is down in 2D, so this vector points -Y.
   *
   */
  static UP: Vector2

  /**
   * Down unit vector. Y is down in 2D, so this vector points +Y.
   *
   */
  static DOWN: Vector2
}

declare type Vector2 = Vector2Constructor
declare var Vector2: typeof Vector2Constructor & {
  new (): Vector2

  new (from: Vector2): Vector2

  new (from: Vector2i): Vector2

  new (x: float, y: float): Vector2

  (): Vector2
  (from: Vector2): Vector2
  (from: Vector2i): Vector2
  (x: float, y: float): Vector2
}
