/**
 * The [AABB] built-in [Variant] type represents an axis-aligned bounding box in a 3D space. It is defined by its [member position] and [member size], which are [Vector3]. It is frequently used for fast overlap tests (see [method intersects]). Although [AABB] itself is axis-aligned, it can be combined with [Transform3D] to represent a rotated or skewed bounding box.
 *
 * It uses floating-point coordinates. The 2D counterpart to [AABB] is [Rect2]. There is no version of [AABB] that uses integer coordinates.
 *
 * **Note:** Negative values for [member size] are not supported. With negative size, most [AABB] methods do not work correctly. Use [method abs] to get an equivalent [AABB] with a non-negative size.
 *
 * **Note:** In a boolean context, an [AABB] evaluates to `false` if both [member position] and [member size] are zero (equal to [constant Vector3.ZERO]). Otherwise, it always evaluates to `true`.
 *
 */
declare class AABB {
  /**
   * The [AABB] built-in [Variant] type represents an axis-aligned bounding box in a 3D space. It is defined by its [member position] and [member size], which are [Vector3]. It is frequently used for fast overlap tests (see [method intersects]). Although [AABB] itself is axis-aligned, it can be combined with [Transform3D] to represent a rotated or skewed bounding box.
   *
   * It uses floating-point coordinates. The 2D counterpart to [AABB] is [Rect2]. There is no version of [AABB] that uses integer coordinates.
   *
   * **Note:** Negative values for [member size] are not supported. With negative size, most [AABB] methods do not work correctly. Use [method abs] to get an equivalent [AABB] with a non-negative size.
   *
   * **Note:** In a boolean context, an [AABB] evaluates to `false` if both [member position] and [member size] are zero (equal to [constant Vector3.ZERO]). Otherwise, it always evaluates to `true`.
   *
   */

  new(): AABB
  constructor()

  new(from: AABB): AABB
  constructor(from: AABB)

  new(position: Vector3, size: Vector3): AABB
  constructor(position: Vector3, size: Vector3)

  static new(): AABB

  /** The ending point. This is usually the corner on the top-right and back of the bounding box, and is equivalent to [code]position + size[/code]. Setting this point affects the [member size]. */
  end: Vector3

  /** The origin point. This is usually the corner on the bottom-left and forward of the bounding box. */
  position: Vector3

  /**
   * The bounding box's width, height, and depth starting from [member position]. Setting this value also affects the [member end] point.
   *
   * **Note:** It's recommended setting the width, height, and depth to non-negative values. This is because most methods in Godot assume that the [member position] is the bottom-left-forward corner, and the [member end] is the top-right-back corner. To get an equivalent bounding box with non-negative size, use [method abs].
   *
   */
  size: Vector3

  /**
   * Returns an [AABB] equivalent to this bounding box, with its width, height, and depth modified to be non-negative values.
   *
   * @example
   *
   *
   * var box = AABB(Vector3(5, 0, 5), Vector3(-20, -10, -5))
   * var absolute = box.abs()
   * print(absolute.position) # Prints (-15.0, -10.0, 0.0)
   * print(absolute.size)     # Prints (20.0, 10.0, 5.0)
   *
   *
   * var box = new Aabb(new Vector3(5, 0, 5), new Vector3(-20, -10, -5));
   * var absolute = box.Abs();
   * GD.Print(absolute.Position); // Prints (-15, -10, 0)
   * GD.Print(absolute.Size);     // Prints (20, 10, 5)
   *
   * @summary
   *
   *
   * **Note:** It's recommended to use this method when [member size] is negative, as most other methods in Godot assume that the [member size]'s components are greater than `0`.
   *
   */
  abs(): AABB

  /**
   * Returns `true` if this bounding box **completely** encloses the [param with] box. The edges of both boxes are included.
   *
   * @example
   *
   *
   * var a = AABB(Vector3(0, 0, 0), Vector3(4, 4, 4))
   * var b = AABB(Vector3(1, 1, 1), Vector3(3, 3, 3))
   * var c = AABB(Vector3(2, 2, 2), Vector3(8, 8, 8))
   * print(a.encloses(a)) # Prints true
   * print(a.encloses(b)) # Prints true
   * print(a.encloses(c)) # Prints false
   *
   *
   * var a = new Aabb(new Vector3(0, 0, 0), new Vector3(4, 4, 4));
   * var b = new Aabb(new Vector3(1, 1, 1), new Vector3(3, 3, 3));
   * var c = new Aabb(new Vector3(2, 2, 2), new Vector3(8, 8, 8));
   * GD.Print(a.Encloses(a)); // Prints True
   * GD.Print(a.Encloses(b)); // Prints True
   * GD.Print(a.Encloses(c)); // Prints False
   *
   * @summary
   *
   *
   */
  encloses(_with: AABB): boolean

  /**
   * Returns a copy of this bounding box expanded to align the edges with the given [param to_point], if necessary.
   *
   * @example
   *
   *
   * var box = AABB(Vector3(0, 0, 0), Vector3(5, 2, 5))
   * box = box.expand(Vector3(10, 0, 0))
   * print(box.position) # Prints (0.0, 0.0, 0.0)
   * print(box.size)     # Prints (10.0, 2.0, 5.0)
   * box = box.expand(Vector3(-5, 0, 5))
   * print(box.position) # Prints (-5.0, 0.0, 0.0)
   * print(box.size)     # Prints (15.0, 2.0, 5.0)
   *
   *
   * var box = new Aabb(new Vector3(0, 0, 0), new Vector3(5, 2, 5));
   * box = box.Expand(new Vector3(10, 0, 0));
   * GD.Print(box.Position); // Prints (0, 0, 0)
   * GD.Print(box.Size);     // Prints (10, 2, 5)
   * box = box.Expand(new Vector3(-5, 0, 5));
   * GD.Print(box.Position); // Prints (-5, 0, 0)
   * GD.Print(box.Size);     // Prints (15, 2, 5)
   *
   * @summary
   *
   *
   */
  expand(to_point: Vector3): AABB

  /** Returns the center point of the bounding box. This is the same as [code]position + (size / 2.0)[/code]. */
  get_center(): Vector3

  /** Returns the position of one of the 8 vertices that compose this bounding box. With an [param idx] of [code]0[/code] this is the same as [member position], and an [param idx] of [code]7[/code] is the same as [member end]. */
  get_endpoint(idx: int): Vector3

  /**
   * Returns the longest normalized axis of this bounding box's [member size], as a [Vector3] ([constant Vector3.RIGHT], [constant Vector3.UP], or [constant Vector3.BACK]).
   *
   * @example
   *
   *
   * var box = AABB(Vector3(0, 0, 0), Vector3(2, 4, 8))
   * print(box.get_longest_axis())       # Prints (0.0, 0.0, 1.0)
   * print(box.get_longest_axis_index()) # Prints 2
   * print(box.get_longest_axis_size())  # Prints 8.0
   *
   *
   * var box = new Aabb(new Vector3(0, 0, 0), new Vector3(2, 4, 8));
   * GD.Print(box.GetLongestAxis());      // Prints (0, 0, 1)
   * GD.Print(box.GetLongestAxisIndex()); // Prints Z
   * GD.Print(box.GetLongestAxisSize());  // Prints 8
   *
   * @summary
   *
   *
   * See also [method get_longest_axis_index] and [method get_longest_axis_size].
   *
   */
  get_longest_axis(): Vector3

  /**
   * Returns the index to the longest axis of this bounding box's [member size] (see [constant Vector3.AXIS_X], [constant Vector3.AXIS_Y], and [constant Vector3.AXIS_Z]).
   *
   * For an example, see [method get_longest_axis].
   *
   */
  get_longest_axis_index(): int

  /**
   * Returns the longest dimension of this bounding box's [member size].
   *
   * For an example, see [method get_longest_axis].
   *
   */
  get_longest_axis_size(): float

  /**
   * Returns the shortest normalized axis of this bounding box's [member size], as a [Vector3] ([constant Vector3.RIGHT], [constant Vector3.UP], or [constant Vector3.BACK]).
   *
   * @example
   *
   *
   * var box = AABB(Vector3(0, 0, 0), Vector3(2, 4, 8))
   * print(box.get_shortest_axis())       # Prints (1.0, 0.0, 0.0)
   * print(box.get_shortest_axis_index()) # Prints 0
   * print(box.get_shortest_axis_size())  # Prints 2.0
   *
   *
   * var box = new Aabb(new Vector3(0, 0, 0), new Vector3(2, 4, 8));
   * GD.Print(box.GetShortestAxis());      // Prints (1, 0, 0)
   * GD.Print(box.GetShortestAxisIndex()); // Prints X
   * GD.Print(box.GetShortestAxisSize());  // Prints 2
   *
   * @summary
   *
   *
   * See also [method get_shortest_axis_index] and [method get_shortest_axis_size].
   *
   */
  get_shortest_axis(): Vector3

  /**
   * Returns the index to the shortest axis of this bounding box's [member size] (see [constant Vector3.AXIS_X], [constant Vector3.AXIS_Y], and [constant Vector3.AXIS_Z]).
   *
   * For an example, see [method get_shortest_axis].
   *
   */
  get_shortest_axis_index(): int

  /**
   * Returns the shortest dimension of this bounding box's [member size].
   *
   * For an example, see [method get_shortest_axis].
   *
   */
  get_shortest_axis_size(): float

  /** Returns the vertex's position of this bounding box that's the farthest in the given direction. This point is commonly known as the support point in collision detection algorithms. */
  get_support(direction: Vector3): Vector3

  /** Returns the bounding box's volume. This is equivalent to [code]size.x * size.y * size.z[/code]. See also [method has_volume]. */
  get_volume(): float

  /**
   * Returns a copy of this bounding box extended on all sides by the given amount [param by]. A negative amount shrinks the box instead.
   *
   * @example
   *
   *
   * var a = AABB(Vector3(4, 4, 4), Vector3(8, 8, 8)).grow(4)
   * print(a.position) # Prints (0.0, 0.0, 0.0)
   * print(a.size)     # Prints (16.0, 16.0, 16.0)
   * var b = AABB(Vector3(0, 0, 0), Vector3(8, 4, 2)).grow(2)
   * print(b.position) # Prints (-2.0, -2.0, -2.0)
   * print(b.size)     # Prints (12.0, 8.0, 6.0)
   *
   *
   * var a = new Aabb(new Vector3(4, 4, 4), new Vector3(8, 8, 8)).Grow(4);
   * GD.Print(a.Position); // Prints (0, 0, 0)
   * GD.Print(a.Size);     // Prints (16, 16, 16)
   * var b = new Aabb(new Vector3(0, 0, 0), new Vector3(8, 4, 2)).Grow(2);
   * GD.Print(b.Position); // Prints (-2, -2, -2)
   * GD.Print(b.Size);     // Prints (12, 8, 6)
   *
   * @summary
   *
   *
   */
  grow(by: float): AABB

  /**
   * Returns `true` if the bounding box contains the given [param point]. By convention, points exactly on the right, top, and front sides are **not** included.
   *
   * **Note:** This method is not reliable for [AABB] with a **negative** [member size]. Use [method abs] first to get a valid bounding box.
   *
   */
  has_point(point: Vector3): boolean

  /** Returns [code]true[/code] if this bounding box has a surface or a length, that is, at least one component of [member size] is greater than [code]0[/code]. Otherwise, returns [code]false[/code]. */
  has_surface(): boolean

  /** Returns [code]true[/code] if this bounding box's width, height, and depth are all positive. See also [method get_volume]. */
  has_volume(): boolean

  /**
   * Returns the intersection between this bounding box and [param with]. If the boxes do not intersect, returns an empty [AABB]. If the boxes intersect at the edge, returns a flat [AABB] with no volume (see [method has_surface] and [method has_volume]).
   *
   * @example
   *
   *
   * var box1 = AABB(Vector3(0, 0, 0), Vector3(5, 2, 8))
   * var box2 = AABB(Vector3(2, 0, 2), Vector3(8, 4, 4))
   * var intersection = box1.intersection(box2)
   * print(intersection.position) # Prints (2.0, 0.0, 2.0)
   * print(intersection.size)     # Prints (3.0, 2.0, 4.0)
   *
   *
   * var box1 = new Aabb(new Vector3(0, 0, 0), new Vector3(5, 2, 8));
   * var box2 = new Aabb(new Vector3(2, 0, 2), new Vector3(8, 4, 4));
   * var intersection = box1.Intersection(box2);
   * GD.Print(intersection.Position); // Prints (2, 0, 2)
   * GD.Print(intersection.Size);     // Prints (3, 2, 4)
   *
   * @summary
   *
   *
   * **Note:** If you only need to know whether two bounding boxes are intersecting, use [method intersects], instead.
   *
   */
  intersection(_with: AABB): AABB

  /** Returns [code]true[/code] if this bounding box overlaps with the box [param with]. The edges of both boxes are [i]always[/i] excluded. */
  intersects(_with: AABB): boolean

  /** Returns [code]true[/code] if this bounding box is on both sides of the given [param plane]. */
  intersects_plane(plane: Plane): boolean

  /**
   * Returns the first point where this bounding box and the given ray intersect, as a [Vector3]. If no intersection occurs, returns `null`.
   *
   * The ray begin at [param from], faces [param dir] and extends towards infinity.
   *
   */
  intersects_ray(from: Vector3, dir: Vector3): any

  /**
   * Returns the first point where this bounding box and the given segment intersect, as a [Vector3]. If no intersection occurs, returns `null`.
   *
   * The segment begins at [param from] and ends at [param to].
   *
   */
  intersects_segment(from: Vector3, to: Vector3): any

  /** Returns [code]true[/code] if this bounding box and [param aabb] are approximately equal, by calling [method Vector3.is_equal_approx] on the [member position] and the [member size]. */
  is_equal_approx(aabb: AABB): boolean

  /** Returns [code]true[/code] if this bounding box's values are finite, by calling [method Vector3.is_finite] on the [member position] and the [member size]. */
  is_finite(): boolean

  /** Returns an [AABB] that encloses both this bounding box and [param with] around the edges. See also [method encloses]. */
  merge(_with: AABB): AABB

  connect<T extends SignalsOf<AABB>>(
    signal: T,
    method: SignalFunction<AABB[T]>
  ): number
}
