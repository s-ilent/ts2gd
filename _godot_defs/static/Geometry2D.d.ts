/**
 * Provides a set of helper functions to create geometric shapes, compute intersections between shapes, and process various other geometric operations in 2D.
 *
 */
declare class Geometry2DClass extends Object {
  /**
   * Provides a set of helper functions to create geometric shapes, compute intersections between shapes, and process various other geometric operations in 2D.
   *
   */
  new(): Geometry2DClass
  constructor()
  static new(): Geometry2DClass

  /**
   * Returns the [url=https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm]Bresenham line[/url] between the [param from] and [param to] points. A Bresenham line is a series of pixels that draws a line and is always 1-pixel thick on every row and column of the drawing (never more, never less).
   *
   * Example code to draw a line between two [Marker2D] nodes using a series of [method CanvasItem.draw_rect] calls:
   *
   * @example
   *
   * func _draw():
   * 	for pixel in Geometry2D.bresenham_line($MarkerA.position, $MarkerB.position):
   * 		draw_rect(Rect2(pixel, Vector2.ONE), Color.WHITE)
   * @summary
   *
   *
   */
  bresenham_line(from: Vector2i, to: Vector2i): Vector2i[]

  /**
   * Clips [param polygon_a] against [param polygon_b] and returns an array of clipped polygons. This performs [constant OPERATION_DIFFERENCE] between polygons. Returns an empty array if [param polygon_b] completely overlaps [param polygon_a].
   *
   * If [param polygon_b] is enclosed by [param polygon_a], returns an outer polygon (boundary) and inner polygon (hole) which could be distinguished by calling [method is_polygon_clockwise].
   *
   */
  clip_polygons(
    polygon_a: PackedVector2Array,
    polygon_b: PackedVector2Array
  ): PackedVector2Array[]

  /** Clips [param polyline] against [param polygon] and returns an array of clipped polylines. This performs [constant OPERATION_DIFFERENCE] between the polyline and the polygon. This operation can be thought of as cutting a line with a closed shape. */
  clip_polyline_with_polygon(
    polyline: PackedVector2Array,
    polygon: PackedVector2Array
  ): PackedVector2Array[]

  /** Given an array of [Vector2]s, returns the convex hull as a list of points in counterclockwise order. The last point is the same as the first one. */
  convex_hull(points: PackedVector2Array): PackedVector2Array

  /** Decomposes the [param polygon] into multiple convex hulls and returns an array of [PackedVector2Array]. */
  decompose_polygon_in_convex(polygon: PackedVector2Array): PackedVector2Array[]

  /**
   * Mutually excludes common area defined by intersection of [param polygon_a] and [param polygon_b] (see [method intersect_polygons]) and returns an array of excluded polygons. This performs [constant OPERATION_XOR] between polygons. In other words, returns all but common area between polygons.
   *
   * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
   *
   */
  exclude_polygons(
    polygon_a: PackedVector2Array,
    polygon_b: PackedVector2Array
  ): PackedVector2Array[]

  /** Returns the 2D point on the 2D segment ([param s1], [param s2]) that is closest to [param point]. The returned point will always be inside the specified segment. */
  get_closest_point_to_segment(
    point: Vector2,
    s1: Vector2,
    s2: Vector2
  ): Vector2

  /** Returns the 2D point on the 2D line defined by ([param s1], [param s2]) that is closest to [param point]. The returned point can be inside the segment ([param s1], [param s2]) or outside of it, i.e. somewhere on the line extending from the segment. */
  get_closest_point_to_segment_uncapped(
    point: Vector2,
    s1: Vector2,
    s2: Vector2
  ): Vector2

  /** Given the two 2D segments ([param p1], [param q1]) and ([param p2], [param q2]), finds those two points on the two segments that are closest to each other. Returns a [PackedVector2Array] that contains this point on ([param p1], [param q1]) as well the accompanying point on ([param p2], [param q2]). */
  get_closest_points_between_segments(
    p1: Vector2,
    q1: Vector2,
    p2: Vector2,
    q2: Vector2
  ): PackedVector2Array

  /**
   * Intersects [param polygon_a] with [param polygon_b] and returns an array of intersected polygons. This performs [constant OPERATION_INTERSECTION] between polygons. In other words, returns common area shared by polygons. Returns an empty array if no intersection occurs.
   *
   * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
   *
   */
  intersect_polygons(
    polygon_a: PackedVector2Array,
    polygon_b: PackedVector2Array
  ): PackedVector2Array[]

  /** Intersects [param polyline] with [param polygon] and returns an array of intersected polylines. This performs [constant OPERATION_INTERSECTION] between the polyline and the polygon. This operation can be thought of as chopping a line with a closed shape. */
  intersect_polyline_with_polygon(
    polyline: PackedVector2Array,
    polygon: PackedVector2Array
  ): PackedVector2Array[]

  /** Returns [code]true[/code] if [param point] is inside the circle or if it's located exactly [i]on[/i] the circle's boundary, otherwise returns [code]false[/code]. */
  is_point_in_circle(
    point: Vector2,
    circle_position: Vector2,
    circle_radius: float
  ): boolean

  /** Returns [code]true[/code] if [param point] is inside [param polygon] or if it's located exactly [i]on[/i] polygon's boundary, otherwise returns [code]false[/code]. */
  is_point_in_polygon(point: Vector2, polygon: PackedVector2Array): boolean

  /**
   * Returns `true` if [param polygon]'s vertices are ordered in clockwise order, otherwise returns `false`.
   *
   * **Note:** Assumes a Cartesian coordinate system where `+x` is right and `+y` is up. If using screen coordinates (`+y` is down), the result will need to be flipped (i.e. a `true` result will indicate counter-clockwise).
   *
   */
  is_polygon_clockwise(polygon: PackedVector2Array): boolean

  /**
   * Returns the point of intersection between the two lines ([param from_a], [param dir_a]) and ([param from_b], [param dir_b]). Returns a [Vector2], or `null` if the lines are parallel.
   *
   * `from` and `dir` are **not** endpoints of a line segment or ray but the slope (`dir`) and a known point (`from`) on that line.
   *
   * @example
   *
   *
   * var from_a = Vector2.ZERO
   * var dir_a = Vector2.RIGHT
   * var from_b = Vector2.DOWN
   * # Returns Vector2(1, 0)
   * Geometry2D.line_intersects_line(from_a, dir_a, from_b, Vector2(1, -1))
   * # Returns Vector2(-1, 0)
   * Geometry2D.line_intersects_line(from_a, dir_a, from_b, Vector2(-1, -1))
   * # Returns null
   * Geometry2D.line_intersects_line(from_a, dir_a, from_b, Vector2.RIGHT)
   *
   *
   * var fromA = Vector2.Zero;
   * var dirA = Vector2.Right;
   * var fromB = Vector2.Down;
   * // Returns new Vector2(1, 0)
   * Geometry2D.LineIntersectsLine(fromA, dirA, fromB, new Vector2(1, -1));
   * // Returns new Vector2(-1, 0)
   * Geometry2D.LineIntersectsLine(fromA, dirA, fromB, new Vector2(-1, -1));
   * // Returns null
   * Geometry2D.LineIntersectsLine(fromA, dirA, fromB, Vector2.Right);
   *
   * @summary
   *
   *
   */
  line_intersects_line(
    from_a: Vector2,
    dir_a: Vector2,
    from_b: Vector2,
    dir_b: Vector2
  ): any

  /** Given an array of [Vector2]s representing tiles, builds an atlas. The returned dictionary has two keys: [code]points[/code] is a [PackedVector2Array] that specifies the positions of each tile, [code]size[/code] contains the overall size of the whole atlas as [Vector2i]. */
  make_atlas(sizes: PackedVector2Array): Dictionary<any, any>

  /**
   * Merges (combines) [param polygon_a] and [param polygon_b] and returns an array of merged polygons. This performs [constant OPERATION_UNION] between polygons.
   *
   * The operation may result in an outer polygon (boundary) and multiple inner polygons (holes) produced which could be distinguished by calling [method is_polygon_clockwise].
   *
   */
  merge_polygons(
    polygon_a: PackedVector2Array,
    polygon_b: PackedVector2Array
  ): PackedVector2Array[]

  /**
   * Inflates or deflates [param polygon] by [param delta] units (pixels). If [param delta] is positive, makes the polygon grow outward. If [param delta] is negative, shrinks the polygon inward. Returns an array of polygons because inflating/deflating may result in multiple discrete polygons. Returns an empty array if [param delta] is negative and the absolute value of it approximately exceeds the minimum bounding rectangle dimensions of the polygon.
   *
   * Each polygon's vertices will be rounded as determined by [param join_type].
   *
   * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
   *
   * **Note:** To translate the polygon's vertices specifically, multiply them to a [Transform2D]:
   *
   * @example
   *
   *
   * var polygon = PackedVector2Array([Vector2(0, 0), Vector2(100, 0), Vector2(100, 100), Vector2(0, 100)])
   * var offset = Vector2(50, 50)
   * polygon = Transform2D(0, offset) * polygon
   * print(polygon) # Prints [(50.0, 50.0), (150.0, 50.0), (150.0, 150.0), (50.0, 150.0)]
   *
   *
   * Vector2[] polygon = [new Vector2(0, 0), new Vector2(100, 0), new Vector2(100, 100), new Vector2(0, 100)];
   * var offset = new Vector2(50, 50);
   * polygon = new Transform2D(0, offset) * polygon;
   * GD.Print((Variant)polygon); // Prints [(50, 50), (150, 50), (150, 150), (50, 150)]
   *
   * @summary
   *
   *
   */
  offset_polygon(
    polygon: PackedVector2Array,
    delta: float,
    join_type?: int
  ): PackedVector2Array[]

  /**
   * Inflates or deflates [param polyline] by [param delta] units (pixels), producing polygons. If [param delta] is positive, makes the polyline grow outward. Returns an array of polygons because inflating/deflating may result in multiple discrete polygons. If [param delta] is negative, returns an empty array.
   *
   * Each polygon's vertices will be rounded as determined by [param join_type].
   *
   * Each polygon's endpoints will be rounded as determined by [param end_type].
   *
   * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling [method is_polygon_clockwise].
   *
   */
  offset_polyline(
    polyline: PackedVector2Array,
    delta: float,
    join_type?: int,
    end_type?: int
  ): PackedVector2Array[]

  /** Returns if [param point] is inside the triangle specified by [param a], [param b] and [param c]. */
  point_is_inside_triangle(
    point: Vector2,
    a: Vector2,
    b: Vector2,
    c: Vector2
  ): boolean

  /** Given the 2D segment ([param segment_from], [param segment_to]), returns the position on the segment (as a number between 0 and 1) at which the segment hits the circle that is located at position [param circle_position] and has radius [param circle_radius]. If the segment does not intersect the circle, -1 is returned (this is also the case if the line extending the segment would intersect the circle, but the segment does not). */
  segment_intersects_circle(
    segment_from: Vector2,
    segment_to: Vector2,
    circle_position: Vector2,
    circle_radius: float
  ): float

  /** Checks if the two segments ([param from_a], [param to_a]) and ([param from_b], [param to_b]) intersect. If yes, return the point of intersection as [Vector2]. If no intersection takes place, returns [code]null[/code]. */
  segment_intersects_segment(
    from_a: Vector2,
    to_a: Vector2,
    from_b: Vector2,
    to_b: Vector2
  ): any

  /** Triangulates the area specified by discrete set of [param points] such that no point is inside the circumcircle of any resulting triangle. Returns a [PackedInt32Array] where each triangle consists of three consecutive point indices into [param points] (i.e. the returned array will have [code]n * 3[/code] elements, with [code]n[/code] being the number of found triangles). If the triangulation did not succeed, an empty [PackedInt32Array] is returned. */
  triangulate_delaunay(points: PackedVector2Array): PackedInt32Array

  /** Triangulates the polygon specified by the points in [param polygon]. Returns a [PackedInt32Array] where each triangle consists of three consecutive point indices into [param polygon] (i.e. the returned array will have [code]n * 3[/code] elements, with [code]n[/code] being the number of found triangles). Output triangles will always be counter clockwise, and the contour will be flipped if it's clockwise. If the triangulation did not succeed, an empty [PackedInt32Array] is returned. */
  triangulate_polygon(polygon: PackedVector2Array): PackedInt32Array

  connect<T extends SignalsOf<Geometry2DClass>>(
    signal: T,
    method: SignalFunction<Geometry2DClass[T]>
  ): number

  /**
   * Create regions where either subject or clip polygons (or both) are filled.
   *
   */
  static OPERATION_UNION: any

  /**
   * Create regions where subject polygons are filled except where clip polygons are filled.
   *
   */
  static OPERATION_DIFFERENCE: any

  /**
   * Create regions where both subject and clip polygons are filled.
   *
   */
  static OPERATION_INTERSECTION: any

  /**
   * Create regions where either subject or clip polygons are filled but not where both are filled.
   *
   */
  static OPERATION_XOR: any

  /**
   * Squaring is applied uniformally at all convex edge joins at `1 * delta`.
   *
   */
  static JOIN_SQUARE: any

  /**
   * While flattened paths can never perfectly trace an arc, they are approximated by a series of arc chords.
   *
   */
  static JOIN_ROUND: any

  /**
   * There's a necessary limit to mitered joins since offsetting edges that join at very acute angles will produce excessively long and narrow "spikes". For any given edge join, when miter offsetting would exceed that maximum distance, "square" joining is applied.
   *
   */
  static JOIN_MITER: any

  /**
   * Endpoints are joined using the [enum PolyJoinType] value and the path filled as a polygon.
   *
   */
  static END_POLYGON: any

  /**
   * Endpoints are joined using the [enum PolyJoinType] value and the path filled as a polyline.
   *
   */
  static END_JOINED: any

  /**
   * Endpoints are squared off with no extension.
   *
   */
  static END_BUTT: any

  /**
   * Endpoints are squared off and extended by `delta` units.
   *
   */
  static END_SQUARE: any

  /**
   * Endpoints are rounded off and extended by `delta` units.
   *
   */
  static END_ROUND: any
}
