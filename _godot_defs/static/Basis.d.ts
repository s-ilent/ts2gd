/**
 * The [Basis] built-in [Variant] type is a 3×3 [url=https://en.wikipedia.org/wiki/Matrix_(mathematics)]matrix[/url] used to represent 3D rotation, scale, and shear. It is frequently used within a [Transform3D].
 *
 * A [Basis] is composed by 3 axis vectors, each representing a column of the matrix: [member x], [member y], and [member z]. The length of each axis ([method Vector3.length]) influences the basis's scale, while the direction of all axes influence the rotation. Usually, these axes are perpendicular to one another. However, when you rotate any axis individually, the basis becomes sheared. Applying a sheared basis to a 3D model will make the model appear distorted.
 *
 * A [Basis] is:
 *
 * - **Orthogonal** if its axes are perpendicular to each other.
 *
 * - **Normalized** if the length of every axis is `1.0`.
 *
 * - **Uniform** if all axes share the same length (see [method get_scale]).
 *
 * - **Orthonormal** if it is both orthogonal and normalized, which allows it to only represent rotations (see [method orthonormalized]).
 *
 * - **Conformal** if it is both orthogonal and uniform, which ensures it is not distorted.
 *
 * For a general introduction, see the [url=$DOCS_URL/tutorials/math/matrices_and_transforms.html]Matrices and transforms[/url] tutorial.
 *
 * **Note:** Godot uses a [url=https://en.wikipedia.org/wiki/Right-hand_rule]right-handed coordinate system[/url], which is a common standard. For directions, the convention for built-in types like [Camera3D] is for -Z to point forward (+X is right, +Y is up, and +Z is back). Other objects may use different direction conventions. For more information, see the [url=$DOCS_URL/tutorials/assets_pipeline/importing_3d_scenes/model_export_considerations.html#d-asset-direction-conventions]3D asset direction conventions[/url] tutorial.
 *
 * **Note:** The basis matrices are exposed as [url=https://www.mindcontrol.org/~hplus/graphics/matrix-layout.html]column-major[/url] order, which is the same as OpenGL. However, they are stored internally in row-major order, which is the same as DirectX.
 *
 */
declare class Basis {
  /**
   * The [Basis] built-in [Variant] type is a 3×3 [url=https://en.wikipedia.org/wiki/Matrix_(mathematics)]matrix[/url] used to represent 3D rotation, scale, and shear. It is frequently used within a [Transform3D].
   *
   * A [Basis] is composed by 3 axis vectors, each representing a column of the matrix: [member x], [member y], and [member z]. The length of each axis ([method Vector3.length]) influences the basis's scale, while the direction of all axes influence the rotation. Usually, these axes are perpendicular to one another. However, when you rotate any axis individually, the basis becomes sheared. Applying a sheared basis to a 3D model will make the model appear distorted.
   *
   * A [Basis] is:
   *
   * - **Orthogonal** if its axes are perpendicular to each other.
   *
   * - **Normalized** if the length of every axis is `1.0`.
   *
   * - **Uniform** if all axes share the same length (see [method get_scale]).
   *
   * - **Orthonormal** if it is both orthogonal and normalized, which allows it to only represent rotations (see [method orthonormalized]).
   *
   * - **Conformal** if it is both orthogonal and uniform, which ensures it is not distorted.
   *
   * For a general introduction, see the [url=$DOCS_URL/tutorials/math/matrices_and_transforms.html]Matrices and transforms[/url] tutorial.
   *
   * **Note:** Godot uses a [url=https://en.wikipedia.org/wiki/Right-hand_rule]right-handed coordinate system[/url], which is a common standard. For directions, the convention for built-in types like [Camera3D] is for -Z to point forward (+X is right, +Y is up, and +Z is back). Other objects may use different direction conventions. For more information, see the [url=$DOCS_URL/tutorials/assets_pipeline/importing_3d_scenes/model_export_considerations.html#d-asset-direction-conventions]3D asset direction conventions[/url] tutorial.
   *
   * **Note:** The basis matrices are exposed as [url=https://www.mindcontrol.org/~hplus/graphics/matrix-layout.html]column-major[/url] order, which is the same as OpenGL. However, they are stored internally in row-major order, which is the same as DirectX.
   *
   */

  new(): Basis
  constructor()

  new(from: Basis): Basis
  constructor(from: Basis)

  new(axis: Vector3, angle: float): Basis
  constructor(axis: Vector3, angle: float)

  new(from: Quaternion): Basis
  constructor(from: Quaternion)

  new(x_axis: Vector3, y_axis: Vector3, z_axis: Vector3): Basis
  constructor(x_axis: Vector3, y_axis: Vector3, z_axis: Vector3)

  static new(): Basis

  /**
   * The basis's X axis, and the column `0` of the matrix.
   *
   * On the identity basis, this vector points right ([constant Vector3.RIGHT]).
   *
   */
  x: Vector3

  /**
   * The basis's Y axis, and the column `1` of the matrix.
   *
   * On the identity basis, this vector points up ([constant Vector3.UP]).
   *
   */
  y: Vector3

  /**
   * The basis's Z axis, and the column `2` of the matrix.
   *
   * On the identity basis, this vector points back ([constant Vector3.BACK]).
   *
   */
  z: Vector3

  /**
   * Returns the [url=https://en.wikipedia.org/wiki/Determinant]determinant[/url] of this basis's matrix. For advanced math, this number can be used to determine a few attributes:
   *
   * - If the determinant is exactly `0.0`, the basis is not invertible (see [method inverse]).
   *
   * - If the determinant is a negative number, the basis represents a negative scale.
   *
   * **Note:** If the basis's scale is the same for every axis, its determinant is always that scale by the power of 3.
   *
   */
  determinant(): float

  /**
   * Constructs a new [Basis] that only represents rotation from the given [Vector3] of [url=https://en.wikipedia.org/wiki/Euler_angles]Euler angles[/url], in radians.
   *
   * - The [member Vector3.x] should contain the angle around the [member x] axis (pitch);
   *
   * - The [member Vector3.y] should contain the angle around the [member y] axis (yaw);
   *
   * - The [member Vector3.z] should contain the angle around the [member z] axis (roll).
   *
   * @example
   *
   *
   * # Creates a Basis whose z axis points down.
   * var my_basis = Basis.from_euler(Vector3(TAU / 4, 0, 0))
   * print(my_basis.z) # Prints (0.0, -1.0, 0.0)
   *
   *
   * // Creates a Basis whose z axis points down.
   * var myBasis = Basis.FromEuler(new Vector3(Mathf.Tau / 4.0f, 0.0f, 0.0f));
   * GD.Print(myBasis.Z); // Prints (0, -1, 0)
   *
   * @summary
   *
   *
   * The order of each consecutive rotation can be changed with [param order] (see [enum EulerOrder] constants). By default, the YXZ convention is used ([constant EULER_ORDER_YXZ]): the basis rotates first around the Y axis (yaw), then X (pitch), and lastly Z (roll). When using the opposite method [method get_euler], this order is reversed.
   *
   */
  static from_euler(euler: Vector3, order?: int): Basis

  /**
   * Constructs a new [Basis] that only represents scale, with no rotation or shear, from the given [param scale] vector.
   *
   * @example
   *
   *
   * var my_basis = Basis.from_scale(Vector3(2, 4, 8))
   * print(my_basis.x) # Prints (2.0, 0.0, 0.0)
   * print(my_basis.y) # Prints (0.0, 4.0, 0.0)
   * print(my_basis.z) # Prints (0.0, 0.0, 8.0)
   *
   *
   * var myBasis = Basis.FromScale(new Vector3(2.0f, 4.0f, 8.0f));
   * GD.Print(myBasis.X); // Prints (2, 0, 0)
   * GD.Print(myBasis.Y); // Prints (0, 4, 0)
   * GD.Print(myBasis.Z); // Prints (0, 0, 8)
   *
   * @summary
   *
   *
   * **Note:** In linear algebra, the matrix of this basis is also known as a [url=https://en.wikipedia.org/wiki/Diagonal_matrix]diagonal matrix[/url].
   *
   */
  static from_scale(scale: Vector3): Basis

  /**
   * Returns this basis's rotation as a [Vector3] of [url=https://en.wikipedia.org/wiki/Euler_angles]Euler angles[/url], in radians. For the returned value:
   *
   * - The [member Vector3.x] contains the angle around the [member x] axis (pitch);
   *
   * - The [member Vector3.y] contains the angle around the [member y] axis (yaw);
   *
   * - The [member Vector3.z] contains the angle around the [member z] axis (roll).
   *
   * The order of each consecutive rotation can be changed with [param order] (see [enum EulerOrder] constants). By default, the YXZ convention is used ([constant EULER_ORDER_YXZ]): Z (roll) is calculated first, then X (pitch), and lastly Y (yaw). When using the opposite method [method from_euler], this order is reversed.
   *
   * **Note:** For this method to return correctly, the basis needs to be **orthonormal** (see [method orthonormalized]).
   *
   * **Note:** Euler angles are much more intuitive but are not suitable for 3D math. Because of this, consider using the [method get_rotation_quaternion] method instead, which returns a [Quaternion].
   *
   * **Note:** In the Inspector dock, a basis's rotation is often displayed in Euler angles (in degrees), as is the case with the [member Node3D.rotation] property.
   *
   */
  get_euler(order?: int): Vector3

  /**
   * Returns this basis's rotation as a [Quaternion].
   *
   * **Note:** Quaternions are much more suitable for 3D math but are less intuitive. For user interfaces, consider using the [method get_euler] method, which returns Euler angles.
   *
   */
  get_rotation_quaternion(): Quaternion

  /**
   * Returns the length of each axis of this basis, as a [Vector3]. If the basis is not sheared, this value is the scaling factor. It is not affected by rotation.
   *
   * @example
   *
   *
   * var my_basis = Basis(
   * 	Vector3(2, 0, 0),
   * 	Vector3(0, 4, 0),
   * 	Vector3(0, 0, 8)
   * )
   * # Rotating the Basis in any way preserves its scale.
   * my_basis = my_basis.rotated(Vector3.UP, TAU / 2)
   * my_basis = my_basis.rotated(Vector3.RIGHT, TAU / 4)
   * print(my_basis.get_scale()) # Prints (2.0, 4.0, 8.0)
   *
   *
   * var myBasis = new Basis(
   * 	Vector3(2.0f, 0.0f, 0.0f),
   * 	Vector3(0.0f, 4.0f, 0.0f),
   * 	Vector3(0.0f, 0.0f, 8.0f)
   * );
   * // Rotating the Basis in any way preserves its scale.
   * myBasis = myBasis.Rotated(Vector3.Up, Mathf.Tau / 2.0f);
   * myBasis = myBasis.Rotated(Vector3.Right, Mathf.Tau / 4.0f);
   * GD.Print(myBasis.Scale); // Prints (2, 4, 8)
   *
   * @summary
   *
   *
   * **Note:** If the value returned by [method determinant] is negative, the scale is also negative.
   *
   */
  get_scale(): Vector3

  /** Returns the [url=https://en.wikipedia.org/wiki/Invertible_matrix]inverse of this basis's matrix[/url]. */
  inverse(): Basis

  /** Returns [code]true[/code] if this basis is conformal. A conformal basis is both [i]orthogonal[/i] (the axes are perpendicular to each other) and [i]uniform[/i] (the axes share the same length). This method can be especially useful during physics calculations. */
  is_conformal(): boolean

  /** Returns [code]true[/code] if this basis and [param b] are approximately equal, by calling [method @GlobalScope.is_equal_approx] on all vector components. */
  is_equal_approx(b: Basis): boolean

  /** Returns [code]true[/code] if this basis is finite, by calling [method @GlobalScope.is_finite] on all vector components. */
  is_finite(): boolean

  /**
   * Creates a new [Basis] with a rotation such that the forward axis (-Z) points towards the [param target] position.
   *
   * By default, the -Z axis (camera forward) is treated as forward (implies +X is right). If [param use_model_front] is `true`, the +Z axis (asset front) is treated as forward (implies +X is left) and points toward the [param target] position.
   *
   * The up axis (+Y) points as close to the [param up] vector as possible while staying perpendicular to the forward axis. The returned basis is orthonormalized (see [method orthonormalized]).
   *
   * The [param target] and the [param up] cannot be [constant Vector3.ZERO], and shouldn't be colinear to avoid unintended rotation around local Z axis.
   *
   */
  static looking_at(
    target: Vector3,
    up?: Vector3,
    use_model_front?: boolean
  ): Basis

  /**
   * Returns the orthonormalized version of this basis. An orthonormal basis is both **orthogonal** (the axes are perpendicular to each other) and **normalized** (the axes have a length of `1.0`), which also means it can only represent a rotation.
   *
   * It is often useful to call this method to avoid rounding errors on a rotating basis:
   *
   * @example
   *
   *
   * # Rotate this Node3D every frame.
   * func _process(delta):
   * 	basis = basis.rotated(Vector3.UP, TAU * delta)
   * 	basis = basis.rotated(Vector3.RIGHT, TAU * delta)
   * 	basis = basis.orthonormalized()
   *
   *
   * // Rotate this Node3D every frame.
   * public override void _Process(double delta)
   * {
   * 	Basis = Basis.Rotated(Vector3.Up, Mathf.Tau * (float)delta)
   * 			.Rotated(Vector3.Right, Mathf.Tau * (float)delta)
   * 			.Orthonormalized();
   * }
   *
   * @summary
   *
   *
   */
  orthonormalized(): Basis

  /**
   * Returns a copy of this basis rotated around the given [param axis] by the given [param angle] (in radians).
   *
   * The [param axis] must be a normalized vector (see [method Vector3.normalized]). If [param angle] is positive, the basis is rotated counter-clockwise around the axis.
   *
   * @example
   *
   *
   * var my_basis = Basis.IDENTITY
   * var angle = TAU / 2
   * my_basis = my_basis.rotated(Vector3.UP, angle)    # Rotate around the up axis (yaw).
   * my_basis = my_basis.rotated(Vector3.RIGHT, angle) # Rotate around the right axis (pitch).
   * my_basis = my_basis.rotated(Vector3.BACK, angle)  # Rotate around the back axis (roll).
   *
   *
   * var myBasis = Basis.Identity;
   * var angle = Mathf.Tau / 2.0f;
   * myBasis = myBasis.Rotated(Vector3.Up, angle);    // Rotate around the up axis (yaw).
   * myBasis = myBasis.Rotated(Vector3.Right, angle); // Rotate around the right axis (pitch).
   * myBasis = myBasis.Rotated(Vector3.Back, angle);  // Rotate around the back axis (roll).
   *
   * @summary
   *
   *
   */
  rotated(axis: Vector3, angle: float): Basis

  /**
   * Returns this basis with each axis's components scaled by the given [param scale]'s components.
   *
   * The basis matrix's rows are multiplied by [param scale]'s components. This operation is a global scale (relative to the parent).
   *
   * @example
   *
   *
   * var my_basis = Basis(
   * 	Vector3(1, 1, 1),
   * 	Vector3(2, 2, 2),
   * 	Vector3(3, 3, 3)
   * )
   * my_basis = my_basis.scaled(Vector3(0, 2, -2))
   * print(my_basis.x) # Prints (0.0, 2.0, -2.0)
   * print(my_basis.y) # Prints (0.0, 4.0, -4.0)
   * print(my_basis.z) # Prints (0.0, 6.0, -6.0)
   *
   *
   * var myBasis = new Basis(
   * 	new Vector3(1.0f, 1.0f, 1.0f),
   * 	new Vector3(2.0f, 2.0f, 2.0f),
   * 	new Vector3(3.0f, 3.0f, 3.0f)
   * );
   * myBasis = myBasis.Scaled(new Vector3(0.0f, 2.0f, -2.0f));
   * GD.Print(myBasis.X); // Prints (0, 2, -2)
   * GD.Print(myBasis.Y); // Prints (0, 4, -4)
   * GD.Print(myBasis.Z); // Prints (0, 6, -6)
   *
   * @summary
   *
   *
   */
  scaled(scale: Vector3): Basis

  /**
   * Returns this basis with each axis scaled by the corresponding component in the given [param scale].
   *
   * The basis matrix's columns are multiplied by [param scale]'s components. This operation is a local scale (relative to self).
   *
   * @example
   *
   *
   * var my_basis = Basis(
   *     Vector3(1, 1, 1),
   *     Vector3(2, 2, 2),
   *     Vector3(3, 3, 3)
   * )
   * my_basis = my_basis.scaled_local(Vector3(0, 2, -2))
   * print(my_basis.x) # Prints (0.0, 0.0, 0.0)
   * print(my_basis.y) # Prints (4.0, 4.0, 4.0)
   * print(my_basis.z) # Prints (-6.0, -6.0, -6.0)
   *
   *
   * var myBasis = new Basis(
   *     new Vector3(1.0f, 1.0f, 1.0f),
   *     new Vector3(2.0f, 2.0f, 2.0f),
   *     new Vector3(3.0f, 3.0f, 3.0f)
   * );
   * myBasis = myBasis.ScaledLocal(new Vector3(0.0f, 2.0f, -2.0f));
   * GD.Print(myBasis.X); // Prints (0, 0, 0)
   * GD.Print(myBasis.Y); // Prints (4, 4, 4)
   * GD.Print(myBasis.Z); // Prints (-6, -6, -6)
   *
   * @summary
   *
   *
   */
  scaled_local(scale: Vector3): Basis

  /**
   * Performs a spherical-linear interpolation with the [param to] basis, given a [param weight]. Both this basis and [param to] should represent a rotation.
   *
   * **Example:** Smoothly rotate a [Node3D] to the target basis over time, with a [Tween]:
   *
   * @example
   *
   * var start_basis = Basis.IDENTITY
   * var target_basis = Basis.IDENTITY.rotated(Vector3.UP, TAU / 2)
   * func _ready():
   * 	create_tween().tween_method(interpolate, 0.0, 1.0, 5.0).set_trans(Tween.TRANS_EXPO)
   * func interpolate(weight):
   * 	basis = start_basis.slerp(target_basis, weight)
   * @summary
   *
   *
   */
  slerp(to: Basis, weight: float): Basis

  /**
   * Returns the transposed dot product between [param with] and the [member x] axis (see [method transposed]).
   *
   * This is equivalent to `basis.x.dot(vector)`.
   *
   */
  tdotx(_with: Vector3): float

  /**
   * Returns the transposed dot product between [param with] and the [member y] axis (see [method transposed]).
   *
   * This is equivalent to `basis.y.dot(vector)`.
   *
   */
  tdoty(_with: Vector3): float

  /**
   * Returns the transposed dot product between [param with] and the [member z] axis (see [method transposed]).
   *
   * This is equivalent to `basis.z.dot(vector)`.
   *
   */
  tdotz(_with: Vector3): float

  /**
   * Returns the transposed version of this basis. This turns the basis matrix's columns into rows, and its rows into columns.
   *
   * @example
   *
   *
   * var my_basis = Basis(
   * 	Vector3(1, 2, 3),
   * 	Vector3(4, 5, 6),
   * 	Vector3(7, 8, 9)
   * )
   * my_basis = my_basis.transposed()
   * print(my_basis.x) # Prints (1.0, 4.0, 7.0)
   * print(my_basis.y) # Prints (2.0, 5.0, 8.0)
   * print(my_basis.z) # Prints (3.0, 6.0, 9.0)
   *
   *
   * var myBasis = new Basis(
   * 	new Vector3(1.0f, 2.0f, 3.0f),
   * 	new Vector3(4.0f, 5.0f, 6.0f),
   * 	new Vector3(7.0f, 8.0f, 9.0f)
   * );
   * myBasis = myBasis.Transposed();
   * GD.Print(myBasis.X); // Prints (1, 4, 7)
   * GD.Print(myBasis.Y); // Prints (2, 5, 8)
   * GD.Print(myBasis.Z); // Prints (3, 6, 9)
   *
   * @summary
   *
   *
   */
  transposed(): Basis

  connect<T extends SignalsOf<Basis>>(
    signal: T,
    method: SignalFunction<Basis[T]>
  ): number

  /**
   * The identity [Basis]. This is an orthonormal basis with no rotation, no shear, and a scale of [constant Vector3.ONE]. This also means that:
   *
   * - The [member x] points right ([constant Vector3.RIGHT]);
   *
   * - The [member y] points up ([constant Vector3.UP]);
   *
   * - The [member z] points back ([constant Vector3.BACK]).
   *
   * @example
   *
   * var basis = Basis.IDENTITY
   * print("| X | Y | Z")
   * print("| %.f | %.f | %.f" % [basis.x.x, basis.y.x, basis.z.x])
   * print("| %.f | %.f | %.f" % [basis.x.y, basis.y.y, basis.z.y])
   * print("| %.f | %.f | %.f" % [basis.x.z, basis.y.z, basis.z.z])
   * # Prints:
   * # | X | Y | Z
   * # | 1 | 0 | 0
   * # | 0 | 1 | 0
   * # | 0 | 0 | 1
   * @summary
   *
   *
   * If a [Vector3] or another [Basis] is transformed (multiplied) by this constant, no transformation occurs.
   *
   * **Note:** In GDScript, this constant is equivalent to creating a [constructor Basis] without any arguments. It can be used to make your code clearer, and for consistency with C#.
   *
   */
  static IDENTITY: Basis

  /**
   * When any basis is multiplied by [constant FLIP_X], it negates all components of the [member x] axis (the X column).
   *
   * When [constant FLIP_X] is multiplied by any basis, it negates the [member Vector3.x] component of all axes (the X row).
   *
   */
  static FLIP_X: Basis

  /**
   * When any basis is multiplied by [constant FLIP_Y], it negates all components of the [member y] axis (the Y column).
   *
   * When [constant FLIP_Y] is multiplied by any basis, it negates the [member Vector3.y] component of all axes (the Y row).
   *
   */
  static FLIP_Y: Basis

  /**
   * When any basis is multiplied by [constant FLIP_Z], it negates all components of the [member z] axis (the Z column).
   *
   * When [constant FLIP_Z] is multiplied by any basis, it negates the [member Vector3.z] component of all axes (the Z row).
   *
   */
  static FLIP_Z: Basis
}
