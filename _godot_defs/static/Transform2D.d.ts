/**
 * The [Transform2D] built-in [Variant] type is a 2×3 [url=https://en.wikipedia.org/wiki/Matrix_(mathematics)]matrix[/url] representing a transformation in 2D space. It contains three [Vector2] values: [member x], [member y], and [member origin]. Together, they can represent translation, rotation, scale, and skew.
 *
 * The [member x] and [member y] axes form a 2×2 matrix, known as the transform's **basis**. The length of each axis ([method Vector2.length]) influences the transform's scale, while the direction of all axes influence the rotation. Usually, both axes are perpendicular to one another. However, when you rotate one axis individually, the transform becomes skewed. Applying a skewed transform to a 2D sprite will make the sprite appear distorted.
 *
 * For a general introduction, see the [url=$DOCS_URL/tutorials/math/matrices_and_transforms.html]Matrices and transforms[/url] tutorial.
 *
 * **Note:** Unlike [Transform3D], there is no 2D equivalent to the [Basis] type. All mentions of "basis" refer to the [member x] and [member y] components of [Transform2D].
 *
 */
declare class Transform2D {
  /**
   * The [Transform2D] built-in [Variant] type is a 2×3 [url=https://en.wikipedia.org/wiki/Matrix_(mathematics)]matrix[/url] representing a transformation in 2D space. It contains three [Vector2] values: [member x], [member y], and [member origin]. Together, they can represent translation, rotation, scale, and skew.
   *
   * The [member x] and [member y] axes form a 2×2 matrix, known as the transform's **basis**. The length of each axis ([method Vector2.length]) influences the transform's scale, while the direction of all axes influence the rotation. Usually, both axes are perpendicular to one another. However, when you rotate one axis individually, the transform becomes skewed. Applying a skewed transform to a 2D sprite will make the sprite appear distorted.
   *
   * For a general introduction, see the [url=$DOCS_URL/tutorials/math/matrices_and_transforms.html]Matrices and transforms[/url] tutorial.
   *
   * **Note:** Unlike [Transform3D], there is no 2D equivalent to the [Basis] type. All mentions of "basis" refer to the [member x] and [member y] components of [Transform2D].
   *
   */

  new(): Transform2D
  constructor()

  new(from: Transform2D): Transform2D
  constructor(from: Transform2D)

  new(rotation: float, position: Vector2): Transform2D
  constructor(rotation: float, position: Vector2)

  new(
    rotation: float,
    scale: Vector2,
    skew: float,
    position: Vector2
  ): Transform2D
  constructor(rotation: float, scale: Vector2, skew: float, position: Vector2)

  new(x_axis: Vector2, y_axis: Vector2, origin: Vector2): Transform2D
  constructor(x_axis: Vector2, y_axis: Vector2, origin: Vector2)

  static new(): Transform2D

  /** The translation offset of this transform, and the column [code]2[/code] of the matrix. In 2D space, this can be seen as the position. */
  origin: Vector2

  /**
   * The transform basis's X axis, and the column `0` of the matrix. Combined with [member y], this represents the transform's rotation, scale, and skew.
   *
   * On the identity transform, this vector points right ([constant Vector2.RIGHT]).
   *
   */
  x: Vector2

  /**
   * The transform basis's Y axis, and the column `1` of the matrix. Combined with [member x], this represents the transform's rotation, scale, and skew.
   *
   * On the identity transform, this vector points down ([constant Vector2.DOWN]).
   *
   */
  y: Vector2

  /**
   * Returns the inverted version of this transform. Unlike [method inverse], this method works with almost any basis, including non-uniform ones, but is slower.
   *
   * **Note:** For this method to return correctly, the transform's basis needs to have a determinant that is not exactly `0.0` (see [method determinant]).
   *
   */
  affine_inverse(): Transform2D

  /** Returns a copy of the [param v] vector, transformed (multiplied) by the transform basis's matrix. Unlike the multiplication operator ([code]*[/code]), this method ignores the [member origin]. */
  basis_xform(v: Vector2): Vector2

  /**
   * Returns a copy of the [param v] vector, transformed (multiplied) by the inverse transform basis's matrix (see [method inverse]). This method ignores the [member origin].
   *
   * **Note:** This method assumes that this transform's basis is **orthonormal** (see [method orthonormalized]). If the basis is not orthonormal, `transform.affine_inverse().basis_xform(vector)` should be used instead (see [method affine_inverse]).
   *
   */
  basis_xform_inv(v: Vector2): Vector2

  /**
   * Returns the [url=https://en.wikipedia.org/wiki/Determinant]determinant[/url] of this transform basis's matrix. For advanced math, this number can be used to determine a few attributes:
   *
   * - If the determinant is exactly `0.0`, the basis is not invertible (see [method inverse]).
   *
   * - If the determinant is a negative number, the basis represents a negative scale.
   *
   * **Note:** If the basis's scale is the same for every axis, its determinant is always that scale by the power of 2.
   *
   */
  determinant(): float

  /** Returns this transform's translation. Equivalent to [member origin]. */
  get_origin(): Vector2

  /** Returns this transform's rotation (in radians). This is equivalent to [member x]'s angle (see [method Vector2.angle]). */
  get_rotation(): float

  /**
   * Returns the length of both [member x] and [member y], as a [Vector2]. If this transform's basis is not skewed, this value is the scaling factor. It is not affected by rotation.
   *
   * @example
   *
   *
   * var my_transform = Transform2D(
   * 	Vector2(2, 0),
   * 	Vector2(0, 4),
   * 	Vector2(0, 0)
   * )
   * # Rotating the Transform2D in any way preserves its scale.
   * my_transform = my_transform.rotated(TAU / 2)
   * print(my_transform.get_scale()) # Prints (2.0, 4.0)
   *
   *
   * var myTransform = new Transform2D(
   * 	Vector3(2.0f, 0.0f),
   * 	Vector3(0.0f, 4.0f),
   * 	Vector3(0.0f, 0.0f)
   * );
   * // Rotating the Transform2D in any way preserves its scale.
   * myTransform = myTransform.Rotated(Mathf.Tau / 2.0f);
   * GD.Print(myTransform.GetScale()); // Prints (2, 4)
   *
   * @summary
   *
   *
   * **Note:** If the value returned by [method determinant] is negative, the scale is also negative.
   *
   */
  get_scale(): Vector2

  /** Returns this transform's skew (in radians). */
  get_skew(): float

  /**
   * Returns the result of the linear interpolation between this transform and [param xform] by the given [param weight].
   *
   * The [param weight] should be between `0.0` and `1.0` (inclusive). Values outside this range are allowed and can be used to perform **extrapolation** instead.
   *
   */
  interpolate_with(xform: Transform2D, weight: float): Transform2D

  /**
   * Returns the [url=https://en.wikipedia.org/wiki/Invertible_matrix]inverted version of this transform[/url].
   *
   * **Note:** For this method to return correctly, the transform's basis needs to be **orthonormal** (see [method orthonormalized]). That means the basis should only represent a rotation. If it does not, use [method affine_inverse] instead.
   *
   */
  inverse(): Transform2D

  /** Returns [code]true[/code] if this transform's basis is conformal. A conformal basis is both [i]orthogonal[/i] (the axes are perpendicular to each other) and [i]uniform[/i] (the axes share the same length). This method can be especially useful during physics calculations. */
  is_conformal(): boolean

  /** Returns [code]true[/code] if this transform and [param xform] are approximately equal, by running [method @GlobalScope.is_equal_approx] on each component. */
  is_equal_approx(xform: Transform2D): boolean

  /** Returns [code]true[/code] if this transform is finite, by calling [method @GlobalScope.is_finite] on each component. */
  is_finite(): boolean

  /** Returns a copy of the transform rotated such that the rotated X-axis points towards the [param target] position, in global space. */
  looking_at(target?: Vector2): Transform2D

  /** Returns a copy of this transform with its basis orthonormalized. An orthonormal basis is both [i]orthogonal[/i] (the axes are perpendicular to each other) and [i]normalized[/i] (the axes have a length of [code]1.0[/code]), which also means it can only represent a rotation. */
  orthonormalized(): Transform2D

  /**
   * Returns a copy of this transform rotated by the given [param angle] (in radians).
   *
   * If [param angle] is positive, the transform is rotated clockwise.
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding rotation transform `R` from the left, i.e., `R * X`.
   *
   * This can be seen as transforming with respect to the global/parent frame.
   *
   */
  rotated(angle: float): Transform2D

  /**
   * Returns a copy of the transform rotated by the given [param angle] (in radians).
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding rotation transform `R` from the right, i.e., `X * R`.
   *
   * This can be seen as transforming with respect to the local frame.
   *
   */
  rotated_local(angle: float): Transform2D

  /**
   * Returns a copy of the transform scaled by the given [param scale] factor.
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the left, i.e., `S * X`.
   *
   * This can be seen as transforming with respect to the global/parent frame.
   *
   */
  scaled(scale: Vector2): Transform2D

  /**
   * Returns a copy of the transform scaled by the given [param scale] factor.
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the right, i.e., `X * S`.
   *
   * This can be seen as transforming with respect to the local frame.
   *
   */
  scaled_local(scale: Vector2): Transform2D

  /**
   * Returns a copy of the transform translated by the given [param offset].
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the left, i.e., `T * X`.
   *
   * This can be seen as transforming with respect to the global/parent frame.
   *
   */
  translated(offset: Vector2): Transform2D

  /**
   * Returns a copy of the transform translated by the given [param offset].
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the right, i.e., `X * T`.
   *
   * This can be seen as transforming with respect to the local frame.
   *
   */
  translated_local(offset: Vector2): Transform2D

  connect<T extends SignalsOf<Transform2D>>(
    signal: T,
    method: SignalFunction<Transform2D[T]>
  ): number

  /**
   * The identity [Transform2D]. This is a transform with no translation, no rotation, and a scale of [constant Vector2.ONE]. This also means that:
   *
   * - The [member x] points right ([constant Vector2.RIGHT]);
   *
   * - The [member y] points down ([constant Vector2.DOWN]).
   *
   * @example
   *
   * var transform = Transform2D.IDENTITY
   * print("| X | Y | Origin")
   * print("| %.f | %.f | %.f" % [transform.x.x, transform.y.x, transform.origin.x])
   * print("| %.f | %.f | %.f" % [transform.x.y, transform.y.y, transform.origin.y])
   * # Prints:
   * # | X | Y | Origin
   * # | 1 | 0 | 0
   * # | 0 | 1 | 0
   * @summary
   *
   *
   * If a [Vector2], a [Rect2], a [PackedVector2Array], or another [Transform2D] is transformed (multiplied) by this constant, no transformation occurs.
   *
   * **Note:** In GDScript, this constant is equivalent to creating a [constructor Transform2D] without any arguments. It can be used to make your code clearer, and for consistency with C#.
   *
   */
  static IDENTITY: Transform2D

  /**
   * When any transform is multiplied by [constant FLIP_X], it negates all components of the [member x] axis (the X column).
   *
   * When [constant FLIP_X] is multiplied by any transform, it negates the [member Vector2.x] component of all axes (the X row).
   *
   */
  static FLIP_X: Transform2D

  /**
   * When any transform is multiplied by [constant FLIP_Y], it negates all components of the [member y] axis (the Y column).
   *
   * When [constant FLIP_Y] is multiplied by any transform, it negates the [member Vector2.y] component of all axes (the Y row).
   *
   */
  static FLIP_Y: Transform2D
}
