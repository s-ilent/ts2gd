/**
 * An implementation of the A* algorithm, used to find the shortest path between two vertices on a connected graph in 2D space.
 *
 * See [AStar3D] for a more thorough explanation on how to use this class. [AStar2D] is a wrapper for [AStar3D] that enforces 2D coordinates.
 *
 */
declare class AStar2D extends RefCounted {
  /**
   * An implementation of the A* algorithm, used to find the shortest path between two vertices on a connected graph in 2D space.
   *
   * See [AStar3D] for a more thorough explanation on how to use this class. [AStar2D] is a wrapper for [AStar3D] that enforces 2D coordinates.
   *
   */
  new(): AStar2D
  constructor()
  static new(): AStar2D

  /** If [code]true[/code] enables the filtering of neighbors via [method _filter_neighbor]. */
  neighbor_filter_enabled: boolean

  /**
   * Called when computing the cost between two connected points.
   *
   * Note that this function is hidden in the default [AStar2D] class.
   *
   */
  protected _compute_cost(from_id: int, to_id: int): float

  /**
   * Called when estimating the cost between a point and the path's ending point.
   *
   * Note that this function is hidden in the default [AStar2D] class.
   *
   */
  protected _estimate_cost(from_id: int, end_id: int): float

  /**
   * Called when neighboring enters processing and if [member neighbor_filter_enabled] is `true`. If `true` is returned the point will not be processed.
   *
   * Note that this function is hidden in the default [AStar2D] class.
   *
   */
  protected _filter_neighbor(from_id: int, neighbor_id: int): boolean

  /**
   * Adds a new point at the given position with the given identifier. The [param id] must be 0 or larger, and the [param weight_scale] must be 0.0 or greater.
   *
   * The [param weight_scale] is multiplied by the result of [method _compute_cost] when determining the overall cost of traveling across a segment from a neighboring point to this point. Thus, all else being equal, the algorithm prefers points with lower [param weight_scale]s to form a path.
   *
   * @example
   *
   *
   * var astar = AStar2D.new()
   * astar.add_point(1, Vector2(1, 0), 4) # Adds the point (1, 0) with weight_scale 4 and id 1
   *
   *
   * var astar = new AStar2D();
   * astar.AddPoint(1, new Vector2(1, 0), 4); // Adds the point (1, 0) with weight_scale 4 and id 1
   *
   * @summary
   *
   *
   * If there already exists a point for the given [param id], its position and weight scale are updated to the given values.
   *
   */
  add_point(id: int, position: Vector2, weight_scale?: float): void

  /** Returns whether there is a connection/segment between the given points. If [param bidirectional] is [code]false[/code], returns whether movement from [param id] to [param to_id] is possible through this segment. */
  are_points_connected(id: int, to_id: int, bidirectional?: boolean): boolean

  /** Clears all the points and segments. */
  clear(): void

  /**
   * Creates a segment between the given points. If [param bidirectional] is `false`, only movement from [param id] to [param to_id] is allowed, not the reverse direction.
   *
   * @example
   *
   *
   * var astar = AStar2D.new()
   * astar.add_point(1, Vector2(1, 1))
   * astar.add_point(2, Vector2(0, 5))
   * astar.connect_points(1, 2, false)
   *
   *
   * var astar = new AStar2D();
   * astar.AddPoint(1, new Vector2(1, 1));
   * astar.AddPoint(2, new Vector2(0, 5));
   * astar.ConnectPoints(1, 2, false);
   *
   * @summary
   *
   *
   */
  connect_points(id: int, to_id: int, bidirectional?: boolean): void

  /** Deletes the segment between the given points. If [param bidirectional] is [code]false[/code], only movement from [param id] to [param to_id] is prevented, and a unidirectional segment possibly remains. */
  disconnect_points(id: int, to_id: int, bidirectional?: boolean): void

  /** Returns the next available point ID with no point associated to it. */
  get_available_point_id(): int

  /**
   * Returns the ID of the closest point to [param to_position], optionally taking disabled points into account. Returns `-1` if there are no points in the points pool.
   *
   * **Note:** If several points are the closest to [param to_position], the one with the smallest ID will be returned, ensuring a deterministic result.
   *
   */
  get_closest_point(to_position: Vector2, include_disabled?: boolean): int

  /**
   * Returns the closest position to [param to_position] that resides inside a segment between two connected points.
   *
   * @example
   *
   *
   * var astar = AStar2D.new()
   * astar.add_point(1, Vector2(0, 0))
   * astar.add_point(2, Vector2(0, 5))
   * astar.connect_points(1, 2)
   * var res = astar.get_closest_position_in_segment(Vector2(3, 3)) # Returns (0, 3)
   *
   *
   * var astar = new AStar2D();
   * astar.AddPoint(1, new Vector2(0, 0));
   * astar.AddPoint(2, new Vector2(0, 5));
   * astar.ConnectPoints(1, 2);
   * Vector2 res = astar.GetClosestPositionInSegment(new Vector2(3, 3)); // Returns (0, 3)
   *
   * @summary
   *
   *
   * The result is in the segment that goes from `y = 0` to `y = 5`. It's the closest position in the segment to the given point.
   *
   */
  get_closest_position_in_segment(to_position: Vector2): Vector2

  /**
   * Returns an array with the IDs of the points that form the path found by AStar2D between the given points. The array is ordered from the starting point to the ending point of the path.
   *
   * If [param from_id] point is disabled, returns an empty array (even if `from_id == to_id`).
   *
   * If [param from_id] point is not disabled, there is no valid path to the target, and [param allow_partial_path] is `true`, returns a path to the point closest to the target that can be reached.
   *
   * **Note:** When [param allow_partial_path] is `true` and [param to_id] is disabled the search may take an unusually long time to finish.
   *
   * @example
   *
   *
   * var astar = AStar2D.new()
   * astar.add_point(1, Vector2(0, 0))
   * astar.add_point(2, Vector2(0, 1), 1) # Default weight is 1
   * astar.add_point(3, Vector2(1, 1))
   * astar.add_point(4, Vector2(2, 0))
   * astar.connect_points(1, 2, false)
   * astar.connect_points(2, 3, false)
   * astar.connect_points(4, 3, false)
   * astar.connect_points(1, 4, false)
   * var res = astar.get_id_path(1, 3) # Returns [1, 2, 3]
   *
   *
   * var astar = new AStar2D();
   * astar.AddPoint(1, new Vector2(0, 0));
   * astar.AddPoint(2, new Vector2(0, 1), 1); // Default weight is 1
   * astar.AddPoint(3, new Vector2(1, 1));
   * astar.AddPoint(4, new Vector2(2, 0));
   * astar.ConnectPoints(1, 2, false);
   * astar.ConnectPoints(2, 3, false);
   * astar.ConnectPoints(4, 3, false);
   * astar.ConnectPoints(1, 4, false);
   * long[] res = astar.GetIdPath(1, 3); // Returns [1, 2, 3]
   *
   * @summary
   *
   *
   * If you change the 2nd point's weight to 3, then the result will be `[1, 4, 3]` instead, because now even though the distance is longer, it's "easier" to get through point 4 than through point 2.
   *
   */
  get_id_path(
    from_id: int,
    to_id: int,
    allow_partial_path?: boolean
  ): PackedInt64Array

  /** Returns the capacity of the structure backing the points, useful in conjunction with [method reserve_space]. */
  get_point_capacity(): int

  /**
   * Returns an array with the IDs of the points that form the connection with the given point.
   *
   * @example
   *
   *
   * var astar = AStar2D.new()
   * astar.add_point(1, Vector2(0, 0))
   * astar.add_point(2, Vector2(0, 1))
   * astar.add_point(3, Vector2(1, 1))
   * astar.add_point(4, Vector2(2, 0))
   * astar.connect_points(1, 2, true)
   * astar.connect_points(1, 3, true)
   * var neighbors = astar.get_point_connections(1) # Returns [2, 3]
   *
   *
   * var astar = new AStar2D();
   * astar.AddPoint(1, new Vector2(0, 0));
   * astar.AddPoint(2, new Vector2(0, 1));
   * astar.AddPoint(3, new Vector2(1, 1));
   * astar.AddPoint(4, new Vector2(2, 0));
   * astar.ConnectPoints(1, 2, true);
   * astar.ConnectPoints(1, 3, true);
   * long[] neighbors = astar.GetPointConnections(1); // Returns [2, 3]
   *
   * @summary
   *
   *
   */
  get_point_connections(id: int): PackedInt64Array

  /** Returns the number of points currently in the points pool. */
  get_point_count(): int

  /** Returns an array of all point IDs. */
  get_point_ids(): PackedInt64Array

  /**
   * Returns an array with the points that are in the path found by AStar2D between the given points. The array is ordered from the starting point to the ending point of the path.
   *
   * If [param from_id] point is disabled, returns an empty array (even if `from_id == to_id`).
   *
   * If [param from_id] point is not disabled, there is no valid path to the target, and [param allow_partial_path] is `true`, returns a path to the point closest to the target that can be reached.
   *
   * **Note:** This method is not thread-safe; it can only be used from a single [Thread] at a given time. Consider using [Mutex] to ensure exclusive access to one thread to avoid race conditions.
   *
   * Additionally, when [param allow_partial_path] is `true` and [param to_id] is disabled the search may take an unusually long time to finish.
   *
   */
  get_point_path(
    from_id: int,
    to_id: int,
    allow_partial_path?: boolean
  ): PackedVector2Array

  /** Returns the position of the point associated with the given [param id]. */
  get_point_position(id: int): Vector2

  /** Returns the weight scale of the point associated with the given [param id]. */
  get_point_weight_scale(id: int): float

  /** Returns whether a point associated with the given [param id] exists. */
  has_point(id: int): boolean

  /** Returns whether a point is disabled or not for pathfinding. By default, all points are enabled. */
  is_point_disabled(id: int): boolean

  /** Removes the point associated with the given [param id] from the points pool. */
  remove_point(id: int): void

  /** Reserves space internally for [param num_nodes] points. Useful if you're adding a known large number of points at once, such as points on a grid. */
  reserve_space(num_nodes: int): void

  /** Disables or enables the specified point for pathfinding. Useful for making a temporary obstacle. */
  set_point_disabled(id: int, disabled?: boolean): void

  /** Sets the [param position] for the point with the given [param id]. */
  set_point_position(id: int, position: Vector2): void

  /** Sets the [param weight_scale] for the point with the given [param id]. The [param weight_scale] is multiplied by the result of [method _compute_cost] when determining the overall cost of traveling across a segment from a neighboring point to this point. */
  set_point_weight_scale(id: int, weight_scale: float): void

  connect<T extends SignalsOf<AStar2D>>(
    signal: T,
    method: SignalFunction<AStar2D[T]>
  ): number
}
