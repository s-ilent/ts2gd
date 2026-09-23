/**
 * A 4-element structure that can be used to represent 4D grid coordinates or any other quadruplet of integers.
 *
 * It uses integer coordinates and is therefore preferable to [Vector4] when exact precision is required. Note that the values are limited to 32 bits, and unlike [Vector4] this cannot be configured with an engine build option. Use [int] or [PackedInt64Array] if 64-bit values are needed.
 *
 * **Note:** In a boolean context, a Vector4i will evaluate to `false` if it's equal to `Vector4i(0, 0, 0, 0)`. Otherwise, a Vector4i will always evaluate to `true`.
 *
 */
declare class Vector4i {
  /**
   * A 4-element structure that can be used to represent 4D grid coordinates or any other quadruplet of integers.
   *
   * It uses integer coordinates and is therefore preferable to [Vector4] when exact precision is required. Note that the values are limited to 32 bits, and unlike [Vector4] this cannot be configured with an engine build option. Use [int] or [PackedInt64Array] if 64-bit values are needed.
   *
   * **Note:** In a boolean context, a Vector4i will evaluate to `false` if it's equal to `Vector4i(0, 0, 0, 0)`. Otherwise, a Vector4i will always evaluate to `true`.
   *
   */

  new(): Vector4i
  constructor()

  new(from: Vector4i): Vector4i
  constructor(from: Vector4i)

  new(from: Vector4): Vector4i
  constructor(from: Vector4)

  new(x: int, y: int, z: int, w: int): Vector4i
  constructor(x: int, y: int, z: int, w: int)

  static new(): Vector4i

  /** The vector's W component. Also accessible by using the index position [code][3][/code]. */
  w: int

  /** The vector's X component. Also accessible by using the index position [code][0][/code]. */
  x: int

  /** The vector's Y component. Also accessible by using the index position [code][1][/code]. */
  y: int

  /** The vector's Z component. Also accessible by using the index position [code][2][/code]. */
  z: int

  /** Returns a new vector with all components in absolute values (i.e. positive). */
  abs(): Vector4i

  /** Returns a new vector with all components clamped between the components of [param min] and [param max], by running [method @GlobalScope.clamp] on each component. */
  clamp(min: Vector4i, max: Vector4i): Vector4i

  /** Returns a new vector with all components clamped between [param min] and [param max], by running [method @GlobalScope.clamp] on each component. */
  clampi(min: int, max: int): Vector4i

  /**
   * Returns the squared distance between this vector and [param to].
   *
   * This method runs faster than [method distance_to], so prefer it if you need to compare vectors or need the squared distance for some formula.
   *
   */
  distance_squared_to(to: Vector4i): int

  /** Returns the distance between this vector and [param to]. */
  distance_to(to: Vector4i): float

  /** Returns the length (magnitude) of this vector. */
  length(): float

  /**
   * Returns the squared length (squared magnitude) of this vector.
   *
   * This method runs faster than [method length], so prefer it if you need to compare vectors or need the squared distance for some formula.
   *
   */
  length_squared(): int

  /** Returns the component-wise maximum of this and [param with], equivalent to [code]Vector4i(maxi(x, with.x), maxi(y, with.y), maxi(z, with.z), maxi(w, with.w))[/code]. */
  max(_with: Vector4i): Vector4i

  /** Returns the axis of the vector's highest value. See [code]AXIS_*[/code] constants. If all components are equal, this method returns [constant AXIS_X]. */
  max_axis_index(): int

  /** Returns the component-wise maximum of this and [param with], equivalent to [code]Vector4i(maxi(x, with), maxi(y, with), maxi(z, with), maxi(w, with))[/code]. */
  maxi(_with: int): Vector4i

  /** Returns the component-wise minimum of this and [param with], equivalent to [code]Vector4i(mini(x, with.x), mini(y, with.y), mini(z, with.z), mini(w, with.w))[/code]. */
  min(_with: Vector4i): Vector4i

  /** Returns the axis of the vector's lowest value. See [code]AXIS_*[/code] constants. If all components are equal, this method returns [constant AXIS_W]. */
  min_axis_index(): int

  /** Returns the component-wise minimum of this and [param with], equivalent to [code]Vector4i(mini(x, with), mini(y, with), mini(z, with), mini(w, with))[/code]. */
  mini(_with: int): Vector4i

  /** Returns a new vector with each component set to [code]1[/code] if it's positive, [code]-1[/code] if it's negative, and [code]0[/code] if it's zero. The result is identical to calling [method @GlobalScope.sign] on each component. */
  sign(): Vector4i

  /** Returns a new vector with each component snapped to the closest multiple of the corresponding component in [param step]. */
  snapped(step: Vector4i): Vector4i

  /** Returns a new vector with each component snapped to the closest multiple of [param step]. */
  snappedi(step: int): Vector4i

  connect<T extends SignalsOf<Vector4i>>(
    signal: T,
    method: SignalFunction<Vector4i[T]>
  ): number

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
   * Enumerated value for the Z axis. Returned by [method max_axis_index] and [method min_axis_index].
   *
   */
  static AXIS_Z: any

  /**
   * Enumerated value for the W axis. Returned by [method max_axis_index] and [method min_axis_index].
   *
   */
  static AXIS_W: any

  /**
   * Zero vector, a vector with all components set to `0`.
   *
   */
  static ZERO: Vector4i

  /**
   * One vector, a vector with all components set to `1`.
   *
   */
  static ONE: Vector4i

  /**
   * Min vector, a vector with all components equal to `INT32_MIN`. Can be used as a negative integer equivalent of [constant Vector4.INF].
   *
   */
  static MIN: Vector4i

  /**
   * Max vector, a vector with all components equal to `INT32_MAX`. Can be used as an integer equivalent of [constant Vector4.INF].
   *
   */
  static MAX: Vector4i
}
