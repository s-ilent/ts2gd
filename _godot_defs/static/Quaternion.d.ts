/**
 * The [Quaternion] built-in [Variant] type is a 4D data structure that represents rotation in the form of a [url=https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation]Hamilton convention quaternion[/url]. Compared to the [Basis] type which can store both rotation and scale, quaternions can **only** store rotation.
 *
 * A [Quaternion] is composed by 4 floating-point components: [member w], [member x], [member y], and [member z]. These components are very compact in memory, and because of this some operations are more efficient and less likely to cause floating-point errors. Methods such as [method get_angle], [method get_axis], and [method slerp] are faster than their [Basis] counterparts.
 *
 * For a great introduction to quaternions, see [url=https://www.youtube.com/watch?v=d4EgbgTm0Bg]this video by 3Blue1Brown[/url]. You do not need to know the math behind quaternions, as Godot provides several helper methods that handle it for you. These include [method slerp] and [method spherical_cubic_interpolate], as well as the `*` operator.
 *
 * **Note:** Quaternions must be normalized before being used for rotation (see [method normalized]).
 *
 * **Note:** Similarly to [Vector2] and [Vector3], the components of a quaternion use 32-bit precision by default, unlike [float] which is always 64-bit. If double precision is needed, compile the engine with the option `precision=double`.
 *
 */
declare class Quaternion {
  /**
   * The [Quaternion] built-in [Variant] type is a 4D data structure that represents rotation in the form of a [url=https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation]Hamilton convention quaternion[/url]. Compared to the [Basis] type which can store both rotation and scale, quaternions can **only** store rotation.
   *
   * A [Quaternion] is composed by 4 floating-point components: [member w], [member x], [member y], and [member z]. These components are very compact in memory, and because of this some operations are more efficient and less likely to cause floating-point errors. Methods such as [method get_angle], [method get_axis], and [method slerp] are faster than their [Basis] counterparts.
   *
   * For a great introduction to quaternions, see [url=https://www.youtube.com/watch?v=d4EgbgTm0Bg]this video by 3Blue1Brown[/url]. You do not need to know the math behind quaternions, as Godot provides several helper methods that handle it for you. These include [method slerp] and [method spherical_cubic_interpolate], as well as the `*` operator.
   *
   * **Note:** Quaternions must be normalized before being used for rotation (see [method normalized]).
   *
   * **Note:** Similarly to [Vector2] and [Vector3], the components of a quaternion use 32-bit precision by default, unlike [float] which is always 64-bit. If double precision is needed, compile the engine with the option `precision=double`.
   *
   */

  new(): Quaternion
  constructor()

  new(from: Quaternion): Quaternion
  constructor(from: Quaternion)

  new(arc_from: Vector3, arc_to: Vector3): Quaternion
  constructor(arc_from: Vector3, arc_to: Vector3)

  new(axis: Vector3, angle: float): Quaternion
  constructor(axis: Vector3, angle: float)

  new(from: Basis): Quaternion
  constructor(from: Basis)

  new(x: float, y: float, z: float, w: float): Quaternion
  constructor(x: float, y: float, z: float, w: float)

  static new(): Quaternion

  /**
   * W component of the quaternion. This is the "real" part.
   *
   * **Note:** Quaternion components should usually not be manipulated directly.
   *
   */
  w: float

  /**
   * X component of the quaternion. This is the value along the "imaginary" `i` axis.
   *
   * **Note:** Quaternion components should usually not be manipulated directly.
   *
   */
  x: float

  /**
   * Y component of the quaternion. This is the value along the "imaginary" `j` axis.
   *
   * **Note:** Quaternion components should usually not be manipulated directly.
   *
   */
  y: float

  /**
   * Z component of the quaternion. This is the value along the "imaginary" `k` axis.
   *
   * **Note:** Quaternion components should usually not be manipulated directly.
   *
   */
  z: float

  /**
   * Returns the angle between this quaternion and [param to]. This is the magnitude of the angle you would need to rotate by to get from one to the other.
   *
   * **Note:** The magnitude of the floating-point error for this method is abnormally high, so methods such as `is_zero_approx` will not work reliably.
   *
   */
  angle_to(to: Quaternion): float

  /**
   * Returns the dot product between this quaternion and [param with].
   *
   * This is equivalent to `(quat.x * with.x) + (quat.y * with.y) + (quat.z * with.z) + (quat.w * with.w)`.
   *
   */
  dot(_with: Quaternion): float

  /** Returns the exponential of this quaternion. The rotation axis of the result is the normalized rotation axis of this quaternion, the angle of the result is the length of the vector part of this quaternion. */
  exp(): Quaternion

  /** Constructs a new [Quaternion] from the given [Vector3] of [url=https://en.wikipedia.org/wiki/Euler_angles]Euler angles[/url], in radians. This method always uses the YXZ convention ([constant EULER_ORDER_YXZ]). */
  static from_euler(euler: Vector3): Quaternion

  /**
   * Returns the angle of the rotation represented by this quaternion.
   *
   * **Note:** The quaternion must be normalized.
   *
   */
  get_angle(): float

  /** Returns the rotation axis of the rotation represented by this quaternion. */
  get_axis(): Vector3

  /**
   * Returns this quaternion's rotation as a [Vector3] of [url=https://en.wikipedia.org/wiki/Euler_angles]Euler angles[/url], in radians.
   *
   * The order of each consecutive rotation can be changed with [param order] (see [enum EulerOrder] constants). By default, the YXZ convention is used ([constant EULER_ORDER_YXZ]): Z (roll) is calculated first, then X (pitch), and lastly Y (yaw). When using the opposite method [method from_euler], this order is reversed.
   *
   */
  get_euler(order?: int): Vector3

  /** Returns the inverse version of this quaternion, inverting the sign of every component except [member w]. */
  inverse(): Quaternion

  /** Returns [code]true[/code] if this quaternion and [param to] are approximately equal, by calling [method @GlobalScope.is_equal_approx] on each component. */
  is_equal_approx(to: Quaternion): boolean

  /** Returns [code]true[/code] if this quaternion is finite, by calling [method @GlobalScope.is_finite] on each component. */
  is_finite(): boolean

  /** Returns [code]true[/code] if this quaternion is normalized. See also [method normalized]. */
  is_normalized(): boolean

  /** Returns this quaternion's length, also called magnitude. */
  length(): float

  /**
   * Returns this quaternion's length, squared.
   *
   * **Note:** This method is faster than [method length], so prefer it if you only need to compare quaternion lengths.
   *
   */
  length_squared(): float

  /** Returns the logarithm of this quaternion. Multiplies this quaternion's rotation axis by its rotation angle, and stores the result in the returned quaternion's vector part ([member x], [member y], and [member z]). The returned quaternion's real part ([member w]) is always [code]0.0[/code]. */
  log(): Quaternion

  /** Returns a copy of this quaternion, normalized so that its length is [code]1.0[/code]. See also [method is_normalized]. */
  normalized(): Quaternion

  /** Performs a spherical-linear interpolation with the [param to] quaternion, given a [param weight] and returns the result. Both this quaternion and [param to] must be normalized. */
  slerp(to: Quaternion, weight: float): Quaternion

  /** Performs a spherical-linear interpolation with the [param to] quaternion, given a [param weight] and returns the result. Unlike [method slerp], this method does not check if the rotation path is smaller than 90 degrees. Both this quaternion and [param to] must be normalized. */
  slerpni(to: Quaternion, weight: float): Quaternion

  /** Performs a spherical cubic interpolation between quaternions [param pre_a], this vector, [param b], and [param post_b], by the given amount [param weight]. */
  spherical_cubic_interpolate(
    b: Quaternion,
    pre_a: Quaternion,
    post_b: Quaternion,
    weight: float
  ): Quaternion

  /**
   * Performs a spherical cubic interpolation between quaternions [param pre_a], this vector, [param b], and [param post_b], by the given amount [param weight].
   *
   * It can perform smoother interpolation than [method spherical_cubic_interpolate] by the time values.
   *
   */
  spherical_cubic_interpolate_in_time(
    b: Quaternion,
    pre_a: Quaternion,
    post_b: Quaternion,
    weight: float,
    b_t: float,
    pre_a_t: float,
    post_b_t: float
  ): Quaternion

  connect<T extends SignalsOf<Quaternion>>(
    signal: T,
    method: SignalFunction<Quaternion[T]>
  ): number

  /**
   * The identity quaternion, representing no rotation. This has the same rotation as [constant Basis.IDENTITY].
   *
   * If a [Vector3] is rotated (multiplied) by this quaternion, it does not change.
   *
   * **Note:** In GDScript, this constant is equivalent to creating a [constructor Quaternion] without any arguments. It can be used to make your code clearer, and for consistency with C#.
   *
   */
  static IDENTITY: Quaternion
}
