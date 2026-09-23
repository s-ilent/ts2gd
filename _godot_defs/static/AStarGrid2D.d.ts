/**
 * [AStarGrid2D] is a variant of [AStar2D] that is specialized for partial 2D grids. It is simpler to use because it doesn't require you to manually create points and connect them together. This class also supports multiple types of heuristics, modes for diagonal movement, and a jumping mode to speed up calculations.
 *
 * To use [AStarGrid2D], you only need to set the [member region] of the grid, optionally set the [member cell_size], and then call the [method update] method:
 *
 * @example
 *
 *
 * var astar_grid = AStarGrid2D.new()
 * astar_grid.region = Rect2i(0, 0, 32, 32)
 * astar_grid.cell_size = Vector2(16, 16)
 * astar_grid.update()
 * print(astar_grid.get_id_path(Vector2i(0, 0), Vector2i(3, 4))) # Prints [(0, 0), (1, 1), (2, 2), (3, 3), (3, 4)]
 * print(astar_grid.get_point_path(Vector2i(0, 0), Vector2i(3, 4))) # Prints [(0, 0), (16, 16), (32, 32), (48, 48), (48, 64)]
 *
 *
 * AStarGrid2D astarGrid = new AStarGrid2D();
 * astarGrid.Region = new Rect2I(0, 0, 32, 32);
 * astarGrid.CellSize = new Vector2I(16, 16);
 * astarGrid.Update();
 * GD.Print(astarGrid.GetIdPath(Vector2I.Zero, new Vector2I(3, 4))); // Prints [(0, 0), (1, 1), (2, 2), (3, 3), (3, 4)]
 * GD.Print(astarGrid.GetPointPath(Vector2I.Zero, new Vector2I(3, 4))); // Prints [(0, 0), (16, 16), (32, 32), (48, 48), (48, 64)]
 *
 * @summary
 *
 *
 * To remove a point from the pathfinding grid, it must be set as "solid" with [method set_point_solid].
 *
 */
declare class AStarGrid2D extends RefCounted {
  /**
   * [AStarGrid2D] is a variant of [AStar2D] that is specialized for partial 2D grids. It is simpler to use because it doesn't require you to manually create points and connect them together. This class also supports multiple types of heuristics, modes for diagonal movement, and a jumping mode to speed up calculations.
   *
   * To use [AStarGrid2D], you only need to set the [member region] of the grid, optionally set the [member cell_size], and then call the [method update] method:
   *
   * @example
   *
   *
   * var astar_grid = AStarGrid2D.new()
   * astar_grid.region = Rect2i(0, 0, 32, 32)
   * astar_grid.cell_size = Vector2(16, 16)
   * astar_grid.update()
   * print(astar_grid.get_id_path(Vector2i(0, 0), Vector2i(3, 4))) # Prints [(0, 0), (1, 1), (2, 2), (3, 3), (3, 4)]
   * print(astar_grid.get_point_path(Vector2i(0, 0), Vector2i(3, 4))) # Prints [(0, 0), (16, 16), (32, 32), (48, 48), (48, 64)]
   *
   *
   * AStarGrid2D astarGrid = new AStarGrid2D();
   * astarGrid.Region = new Rect2I(0, 0, 32, 32);
   * astarGrid.CellSize = new Vector2I(16, 16);
   * astarGrid.Update();
   * GD.Print(astarGrid.GetIdPath(Vector2I.Zero, new Vector2I(3, 4))); // Prints [(0, 0), (1, 1), (2, 2), (3, 3), (3, 4)]
   * GD.Print(astarGrid.GetPointPath(Vector2I.Zero, new Vector2I(3, 4))); // Prints [(0, 0), (16, 16), (32, 32), (48, 48), (48, 64)]
   *
   * @summary
   *
   *
   * To remove a point from the pathfinding grid, it must be set as "solid" with [method set_point_solid].
   *
   */
  new(): AStarGrid2D
  constructor()
  static new(): AStarGrid2D

  /** The cell shape. Affects how the positions are placed in the grid. If changed, [method update] needs to be called before finding the next path. */
  cell_shape: int

  /** The size of the point cell which will be applied to calculate the resulting point position returned by [method get_point_path]. If changed, [method update] needs to be called before finding the next path. */
  cell_size: Vector2

  /** The default [enum Heuristic] which will be used to calculate the cost between two points if [method _compute_cost] was not overridden. */
  default_compute_heuristic: int

  /** The default [enum Heuristic] which will be used to calculate the cost between the point and the end point if [method _estimate_cost] was not overridden. */
  default_estimate_heuristic: int

  /** A specific [enum DiagonalMode] mode which will force the path to avoid or accept the specified diagonals. */
  diagonal_mode: int

  /**
   * Enables or disables jumping to skip up the intermediate points and speeds up the searching algorithm.
   *
   * **Note:** Currently, toggling it on disables the consideration of weight scaling in pathfinding.
   *
   */
  jumping_enabled: boolean

  /** The offset of the grid which will be applied to calculate the resulting point position returned by [method get_point_path]. If changed, [method update] needs to be called before finding the next path. */
  offset: Vector2

  /** The region of grid cells available for pathfinding. If changed, [method update] needs to be called before finding the next path. */
  region: Rect2i

  /** The size of the grid (number of cells of size [member cell_size] on each axis). If changed, [method update] needs to be called before finding the next path. */
  size: Vector2i

  /**
   * Called when computing the cost between two connected points.
   *
   * Note that this function is hidden in the default [AStarGrid2D] class.
   *
   */
  protected _compute_cost(from_id: Vector2i, to_id: Vector2i): float

  /**
   * Called when estimating the cost between a point and the path's ending point.
   *
   * Note that this function is hidden in the default [AStarGrid2D] class.
   *
   */
  protected _estimate_cost(from_id: Vector2i, end_id: Vector2i): float

  /** Clears the grid and sets the [member region] to [code]Rect2i(0, 0, 0, 0)[/code]. */
  clear(): void

  /**
   * Fills the given [param region] on the grid with the specified value for the solid flag.
   *
   * **Note:** Calling [method update] is not needed after the call of this function.
   *
   */
  fill_solid_region(region: Rect2i, solid?: boolean): void

  /**
   * Fills the given [param region] on the grid with the specified value for the weight scale.
   *
   * **Note:** Calling [method update] is not needed after the call of this function.
   *
   */
  fill_weight_scale_region(region: Rect2i, weight_scale: float): void

  /**
   * Returns an array with the IDs of the points that form the path found by AStar2D between the given points. The array is ordered from the starting point to the ending point of the path.
   *
   * If [param from_id] point is disabled, returns an empty array (even if `from_id == to_id`).
   *
   * If [param from_id] point is not disabled, there is no valid path to the target, and [param allow_partial_path] is `true`, returns a path to the point closest to the target that can be reached.
   *
   * **Note:** When [param allow_partial_path] is `true` and [param to_id] is solid the search may take an unusually long time to finish.
   *
   */
  get_id_path(
    from_id: Vector2i,
    to_id: Vector2i,
    allow_partial_path?: boolean
  ): Vector2i[]

  /** Returns an array of dictionaries with point data ([code]id[/code]: [Vector2i], [code]position[/code]: [Vector2], [code]solid[/code]: [bool], [code]weight_scale[/code]: [float]) within a [param region]. */
  get_point_data_in_region(region: Rect2i): Dictionary<any, any>[]

  /**
   * Returns an array with the points that are in the path found by [AStarGrid2D] between the given points. The array is ordered from the starting point to the ending point of the path.
   *
   * If [param from_id] point is disabled, returns an empty array (even if `from_id == to_id`).
   *
   * If [param from_id] point is not disabled, there is no valid path to the target, and [param allow_partial_path] is `true`, returns a path to the point closest to the target that can be reached.
   *
   * **Note:** This method is not thread-safe; it can only be used from a single [Thread] at a given time. Consider using [Mutex] to ensure exclusive access to one thread to avoid race conditions.
   *
   * Additionally, when [param allow_partial_path] is `true` and [param to_id] is solid the search may take an unusually long time to finish.
   *
   */
  get_point_path(
    from_id: Vector2i,
    to_id: Vector2i,
    allow_partial_path?: boolean
  ): PackedVector2Array

  /** Returns the position of the point associated with the given [param id]. */
  get_point_position(id: Vector2i): Vector2

  /** Returns the weight scale of the point associated with the given [param id]. */
  get_point_weight_scale(id: Vector2i): float

  /** Indicates that the grid parameters were changed and [method update] needs to be called. */
  is_dirty(): boolean

  /** Returns [code]true[/code] if the [param x] and [param y] is a valid grid coordinate (id), i.e. if it is inside [member region]. Equivalent to [code]region.has_point(Vector2i(x, y))[/code]. */
  is_in_bounds(x: int, y: int): boolean

  /** Returns [code]true[/code] if the [param id] vector is a valid grid coordinate, i.e. if it is inside [member region]. Equivalent to [code]region.has_point(id)[/code]. */
  is_in_boundsv(id: Vector2i): boolean

  /** Returns [code]true[/code] if a point is disabled for pathfinding. By default, all points are enabled. */
  is_point_solid(id: Vector2i): boolean

  /**
   * Disables or enables the specified point for pathfinding. Useful for making an obstacle. By default, all points are enabled.
   *
   * **Note:** Calling [method update] is not needed after the call of this function.
   *
   */
  set_point_solid(id: Vector2i, solid?: boolean): void

  /**
   * Sets the [param weight_scale] for the point with the given [param id]. The [param weight_scale] is multiplied by the result of [method _compute_cost] when determining the overall cost of traveling across a segment from a neighboring point to this point.
   *
   * **Note:** Calling [method update] is not needed after the call of this function.
   *
   */
  set_point_weight_scale(id: Vector2i, weight_scale: float): void

  /**
   * Updates the internal state of the grid according to the parameters to prepare it to search the path. Needs to be called if parameters like [member region], [member cell_size] or [member offset] are changed. [method is_dirty] will return `true` if this is the case and this needs to be called.
   *
   * **Note:** All point data (solidity and weight scale) will be cleared.
   *
   */
  update(): void

  connect<T extends SignalsOf<AStarGrid2D>>(
    signal: T,
    method: SignalFunction<AStarGrid2D[T]>
  ): number

  /**
   * The [url=https://en.wikipedia.org/wiki/Euclidean_distance]Euclidean heuristic[/url] to be used for the pathfinding using the following formula:
   *
   * @example
   *
   * dx = abs(to_id.x - from_id.x)
   * dy = abs(to_id.y - from_id.y)
   * result = sqrt(dx * dx + dy * dy)
   * @summary
   *
   *
   * **Note:** This is also the internal heuristic used in [AStar3D] and [AStar2D] by default (with the inclusion of possible z-axis coordinate).
   *
   */
  static HEURISTIC_EUCLIDEAN: any

  /**
   * The [url=https://en.wikipedia.org/wiki/Taxicab_geometry]Manhattan heuristic[/url] to be used for the pathfinding using the following formula:
   *
   * @example
   *
   * dx = abs(to_id.x - from_id.x)
   * dy = abs(to_id.y - from_id.y)
   * result = dx + dy
   * @summary
   *
   *
   * **Note:** This heuristic is intended to be used with 4-side orthogonal movements, provided by setting the [member diagonal_mode] to [constant DIAGONAL_MODE_NEVER].
   *
   */
  static HEURISTIC_MANHATTAN: any

  /**
   * The Octile heuristic to be used for the pathfinding using the following formula:
   *
   * @example
   *
   * dx = abs(to_id.x - from_id.x)
   * dy = abs(to_id.y - from_id.y)
   * f = sqrt(2) - 1
   * result = (dx < dy) ? f * dx + dy : f * dy + dx;
   * @summary
   *
   *
   */
  static HEURISTIC_OCTILE: any

  /**
   * The [url=https://en.wikipedia.org/wiki/Chebyshev_distance]Chebyshev heuristic[/url] to be used for the pathfinding using the following formula:
   *
   * @example
   *
   * dx = abs(to_id.x - from_id.x)
   * dy = abs(to_id.y - from_id.y)
   * result = max(dx, dy)
   * @summary
   *
   *
   */
  static HEURISTIC_CHEBYSHEV: any

  /**
   * Represents the size of the [enum Heuristic] enum.
   *
   */
  static HEURISTIC_MAX: any

  /**
   * The pathfinding algorithm will ignore solid neighbors around the target cell and allow passing using diagonals.
   *
   */
  static DIAGONAL_MODE_ALWAYS: any

  /**
   * The pathfinding algorithm will ignore all diagonals and the way will be always orthogonal.
   *
   */
  static DIAGONAL_MODE_NEVER: any

  /**
   * The pathfinding algorithm will avoid using diagonals if at least two obstacles have been placed around the neighboring cells of the specific path segment.
   *
   */
  static DIAGONAL_MODE_AT_LEAST_ONE_WALKABLE: any

  /**
   * The pathfinding algorithm will avoid using diagonals if any obstacle has been placed around the neighboring cells of the specific path segment.
   *
   */
  static DIAGONAL_MODE_ONLY_IF_NO_OBSTACLES: any

  /**
   * Represents the size of the [enum DiagonalMode] enum.
   *
   */
  static DIAGONAL_MODE_MAX: any

  /**
   * Rectangular cell shape.
   *
   */
  static CELL_SHAPE_SQUARE: any

  /**
   * Diamond cell shape (for isometric look). Cell coordinates layout where the horizontal axis goes up-right, and the vertical one goes down-right.
   *
   */
  static CELL_SHAPE_ISOMETRIC_RIGHT: any

  /**
   * Diamond cell shape (for isometric look). Cell coordinates layout where the horizontal axis goes down-right, and the vertical one goes down-left.
   *
   */
  static CELL_SHAPE_ISOMETRIC_DOWN: any

  /**
   * Represents the size of the [enum CellShape] enum.
   *
   */
  static CELL_SHAPE_MAX: any
}
