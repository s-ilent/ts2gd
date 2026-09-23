/**
 * The [Transform3D] built-in [Variant] type is a 3×4 matrix representing a transformation in 3D space. It contains a [Basis], which on its own can represent rotation, scale, and shear. Additionally, combined with its own [member origin], the transform can also represent a translation.
 *
 * For a general introduction, see the [url=$DOCS_URL/tutorials/math/matrices_and_transforms.html]Matrices and transforms[/url] tutorial.
 *
 * **Note:** Godot uses a [url=https://en.wikipedia.org/wiki/Right-hand_rule]right-handed coordinate system[/url], which is a common standard. For directions, the convention for built-in types like [Camera3D] is for -Z to point forward (+X is right, +Y is up, and +Z is back). Other objects may use different direction conventions. For more information, see the [url=$DOCS_URL/tutorials/assets_pipeline/importing_3d_scenes/model_export_considerations.html#d-asset-direction-conventions]3D asset direction conventions[/url] tutorial.
 *
 */
declare class Transform3D {
  /**
   * The [Transform3D] built-in [Variant] type is a 3×4 matrix representing a transformation in 3D space. It contains a [Basis], which on its own can represent rotation, scale, and shear. Additionally, combined with its own [member origin], the transform can also represent a translation.
   *
   * For a general introduction, see the [url=$DOCS_URL/tutorials/math/matrices_and_transforms.html]Matrices and transforms[/url] tutorial.
   *
   * **Note:** Godot uses a [url=https://en.wikipedia.org/wiki/Right-hand_rule]right-handed coordinate system[/url], which is a common standard. For directions, the convention for built-in types like [Camera3D] is for -Z to point forward (+X is right, +Y is up, and +Z is back). Other objects may use different direction conventions. For more information, see the [url=$DOCS_URL/tutorials/assets_pipeline/importing_3d_scenes/model_export_considerations.html#d-asset-direction-conventions]3D asset direction conventions[/url] tutorial.
   *
   */

  new(): Transform3D
  constructor()

  new(from: Transform3D): Transform3D
  constructor(from: Transform3D)

  new(basis: Basis, origin: Vector3): Transform3D
  constructor(basis: Basis, origin: Vector3)

  new(from: Projection): Transform3D
  constructor(from: Projection)

  new(
    x_axis: Vector3,
    y_axis: Vector3,
    z_axis: Vector3,
    origin: Vector3
  ): Transform3D
  constructor(
    x_axis: Vector3,
    y_axis: Vector3,
    z_axis: Vector3,
    origin: Vector3
  )

  static new(): Transform3D

  /** The [Basis] of this transform. It is composed by 3 axes ([member Basis.x], [member Basis.y], and [member Basis.z]). Together, these represent the transform's rotation, scale, and shear. */
  basis: Basis

  /** The translation offset of this transform. In 3D space, this can be seen as the position. */
  origin: Vector3

  /**
   * Returns the inverted version of this transform. Unlike [method inverse], this method works with almost any [member basis], including non-uniform ones, but is slower. See also [method Basis.inverse].
   *
   * **Note:** For this method to return correctly, the transform's [member basis] needs to have a determinant that is not exactly `0.0` (see [method Basis.determinant]).
   *
   */
  affine_inverse(): Transform3D

  /**
   * Returns the result of the linear interpolation between this transform and [param xform] by the given [param weight].
   *
   * The [param weight] should be between `0.0` and `1.0` (inclusive). Values outside this range are allowed and can be used to perform **extrapolation** instead.
   *
   */
  interpolate_with(xform: Transform3D, weight: float): Transform3D

  /**
   * Returns the [url=https://en.wikipedia.org/wiki/Invertible_matrix]inverted version of this transform[/url]. See also [method Basis.inverse].
   *
   * **Note:** For this method to return correctly, the transform's [member basis] needs to be **orthonormal** (see [method orthonormalized]). That means the basis should only represent a rotation. If it does not, use [method affine_inverse] instead.
   *
   */
  inverse(): Transform3D

  /** Returns [code]true[/code] if this transform and [param xform] are approximately equal, by running [method @GlobalScope.is_equal_approx] on each component. */
  is_equal_approx(xform: Transform3D): boolean

  /** Returns [code]true[/code] if this transform is finite, by calling [method @GlobalScope.is_finite] on each component. */
  is_finite(): boolean

  /**
   * Returns a copy of this transform rotated so that the forward axis (-Z) points towards the [param target] position.
   *
   * The up axis (+Y) points as close to the [param up] vector as possible while staying perpendicular to the forward axis. The resulting transform is orthonormalized. The existing rotation, scale, and skew information from the original transform is discarded. The [param target] and [param up] vectors cannot be zero, cannot be parallel to each other, and are defined in global/parent space.
   *
   * If [param use_model_front] is `true`, the +Z axis (asset front) is treated as forward (implies +X is left) and points toward the [param target] position. By default, the -Z axis (camera forward) is treated as forward (implies +X is right).
   *
   */
  looking_at(
    target: Vector3,
    up?: Vector3,
    use_model_front?: boolean
  ): Transform3D

  /** Returns a copy of this transform with its [member basis] orthonormalized. An orthonormal basis is both [i]orthogonal[/i] (the axes are perpendicular to each other) and [i]normalized[/i] (the axes have a length of [code]1.0[/code]), which also means it can only represent a rotation. See also [method Basis.orthonormalized]. */
  orthonormalized(): Transform3D

  /**
   * Returns a copy of this transform rotated around the given [param axis] by the given [param angle] (in radians).
   *
   * The [param axis] must be a normalized vector (see [method Vector3.normalized]). If [param angle] is positive, the basis is rotated counter-clockwise around the axis.
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding rotation transform `R` from the left, i.e., `R * X`.
   *
   * This can be seen as transforming with respect to the global/parent frame.
   *
   */
  rotated(axis: Vector3, angle: float): Transform3D

  /**
   * Returns a copy of this transform rotated around the given [param axis] by the given [param angle] (in radians).
   *
   * The [param axis] must be a normalized vector in the transform's local coordinate system. For example, to rotate around the local X-axis, use [constant Vector3.RIGHT].
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding rotation transform `R` from the right, i.e., `X * R`.
   *
   * This can be seen as transforming with respect to the local frame.
   *
   */
  rotated_local(axis: Vector3, angle: float): Transform3D

  /**
   * Returns a copy of this transform scaled by the given [param scale] factor.
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the left, i.e., `S * X`.
   *
   * This can be seen as transforming with respect to the global/parent frame.
   *
   */
  scaled(scale: Vector3): Transform3D

  /**
   * Returns a copy of this transform scaled by the given [param scale] factor.
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the right, i.e., `X * S`.
   *
   * This can be seen as transforming with respect to the local frame.
   *
   */
  scaled_local(scale: Vector3): Transform3D

  /**
   * Returns a copy of this transform translated by the given [param offset].
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the left, i.e., `T * X`.
   *
   * This can be seen as transforming with respect to the global/parent frame.
   *
   */
  translated(offset: Vector3): Transform3D

  /**
   * Returns a copy of this transform translated by the given [param offset].
   *
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the right, i.e., `X * T`.
   *
   * This can be seen as transforming with respect to the local frame.
   *
   */
  translated_local(offset: Vector3): Transform3D

  connect<T extends SignalsOf<Transform3D>>(
    signal: T,
    method: SignalFunction<Transform3D[T]>
  ): number

  /**
   * The identity [Transform3D]. This is a transform with no translation, no rotation, and a scale of [constant Vector3.ONE]. Its [member basis] is equal to [constant Basis.IDENTITY]. This also means that:
   *
   * - Its [member Basis.x] points right ([constant Vector3.RIGHT]);
   *
   * - Its [member Basis.y] points up ([constant Vector3.UP]);
   *
   * - Its [member Basis.z] points back ([constant Vector3.BACK]).
   *
   * @example
   *
   * var transform = Transform3D.IDENTITY
   * var basis = transform.basis
   * print("| X | Y | Z | Origin")
   * print("| %.f | %.f | %.f | %.f" % [basis.x.x, basis.y.x, basis.z.x, transform.origin.x])
   * print("| %.f | %.f | %.f | %.f" % [basis.x.y, basis.y.y, basis.z.y, transform.origin.y])
   * print("| %.f | %.f | %.f | %.f" % [basis.x.z, basis.y.z, basis.z.z, transform.origin.z])
   * # Prints:
   * # | X | Y | Z | Origin
   * # | 1 | 0 | 0 | 0
   * # | 0 | 1 | 0 | 0
   * # | 0 | 0 | 1 | 0
   * @summary
   *
   *
   * If a [Vector3], an [AABB], a [Plane], a [PackedVector3Array], or another [Transform3D] is transformed (multiplied) by this constant, no transformation occurs.
   *
   * **Note:** In GDScript, this constant is equivalent to creating a [constructor Transform3D] without any arguments. It can be used to make your code clearer, and for consistency with C#.
   *
   */
  static IDENTITY: Transform3D

  /**
   * [Transform3D] with mirroring applied perpendicular to the YZ plane. Its [member basis] is equal to [constant Basis.FLIP_X].
   *
   */
  static FLIP_X: Transform3D

  /**
   * [Transform3D] with mirroring applied perpendicular to the XZ plane. Its [member basis] is equal to [constant Basis.FLIP_Y].
   *
   */
  static FLIP_Y: Transform3D

  /**
   * [Transform3D] with mirroring applied perpendicular to the XY plane. Its [member basis] is equal to [constant Basis.FLIP_Z].
   *
   */
  static FLIP_Z: Transform3D
}
