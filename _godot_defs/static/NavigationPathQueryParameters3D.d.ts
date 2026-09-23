/**
 * By changing various properties of this object, such as the start and target position, you can configure path queries to the [NavigationServer3D].
 *
 */
declare class NavigationPathQueryParameters3D extends RefCounted {
  /**
   * By changing various properties of this object, such as the start and target position, you can configure path queries to the [NavigationServer3D].
   *
   */
  new(): NavigationPathQueryParameters3D
  constructor()
  static new(): NavigationPathQueryParameters3D

  /**
   * The list of region [RID]s that will be excluded from the path query. Use [method NavigationRegion3D.get_rid] to get the [RID] associated with a [NavigationRegion3D] node.
   *
   * **Note:** The returned array is copied and any changes to it will not update the original property value. To update the value you need to modify the returned array, and then set it to the property again.
   *
   */
  excluded_regions: RID[]

  /**
   * The list of region [RID]s that will be included by the path query. Use [method NavigationRegion3D.get_rid] to get the [RID] associated with a [NavigationRegion3D] node. If left empty all regions are included. If a region ends up being both included and excluded at the same time it will be excluded.
   *
   * **Note:** The returned array is copied and any changes to it will not update the original property value. To update the value you need to modify the returned array, and then set it to the property again.
   *
   */
  included_regions: RID[]

  /** The navigation map [RID] used in the path query. */
  map: RID

  /** Additional information to include with the navigation path. */
  metadata_flags: int

  /** The navigation layers the query will use (as a bitmask). */
  navigation_layers: int

  /** The path postprocessing applied to the raw path corridor found by the [member pathfinding_algorithm]. */
  path_postprocessing: int

  /** The maximum allowed length of the returned path in world units. A path will be clipped when going over this length. A value of [code]0[/code] or below counts as disabled. */
  path_return_max_length: float

  /**
   * The maximum allowed radius in world units that the returned path can be from the path start. The path will be clipped when going over this radius. A value of `0` or below counts as disabled.
   *
   * **Note:** This will perform a sphere shaped clip operation on the path with the first path position being the sphere's center position.
   *
   */
  path_return_max_radius: float

  /** The maximum distance a searched polygon can be away from the start polygon before the pathfinding cancels the search for a path to the (possibly unreachable or very far away) target position polygon. In this case the pathfinding resets and builds a path from the start polygon to the polygon that was found closest to the target position so far. A value of [code]0[/code] or below counts as unlimited. In case of unlimited the pathfinding will search all polygons connected with the start polygon until either the target position polygon is found or all available polygon search options are exhausted. */
  path_search_max_distance: float

  /** The maximum number of polygons that are searched before the pathfinding cancels the search for a path to the (possibly unreachable or very far away) target position polygon. In this case the pathfinding resets and builds a path from the start polygon to the polygon that was found closest to the target position so far. A value of [code]0[/code] or below counts as unlimited. In case of unlimited the pathfinding will search all polygons connected with the start polygon until either the target position polygon is found or all available polygon search options are exhausted. */
  path_search_max_polygons: int

  /** The pathfinding algorithm used in the path query. */
  pathfinding_algorithm: int

  /** The path simplification amount in worlds units. */
  simplify_epsilon: float

  /**
   * If `true` a simplified version of the path will be returned with less critical path points removed. The simplification amount is controlled by [member simplify_epsilon]. The simplification uses a variant of Ramer-Douglas-Peucker algorithm for curve point decimation.
   *
   * Path simplification can be helpful to mitigate various path following issues that can arise with certain agent types and script behaviors. E.g. "steering" agents or avoidance in "open fields".
   *
   */
  simplify_path: boolean

  /** The pathfinding start position in global coordinates. */
  start_position: Vector3

  /** The pathfinding target position in global coordinates. */
  target_position: Vector3

  connect<T extends SignalsOf<NavigationPathQueryParameters3D>>(
    signal: T,
    method: SignalFunction<NavigationPathQueryParameters3D[T]>
  ): number

  /**
   * The path query uses the default A* pathfinding algorithm.
   *
   */
  static PATHFINDING_ALGORITHM_ASTAR: any

  /**
   * Applies a funnel algorithm to the raw path corridor found by the pathfinding algorithm. This will result in the shortest path possible inside the path corridor. This postprocessing very much depends on the navigation mesh polygon layout and the created corridor. Especially tile- or gridbased layouts can face artificial corners with diagonal movement due to a jagged path corridor imposed by the cell shapes.
   *
   */
  static PATH_POSTPROCESSING_CORRIDORFUNNEL: any

  /**
   * Centers every path position in the middle of the traveled navigation mesh polygon edge. This creates better paths for tile- or gridbased layouts that restrict the movement to the cells center.
   *
   */
  static PATH_POSTPROCESSING_EDGECENTERED: any

  /**
   * Applies no postprocessing and returns the raw path corridor as found by the pathfinding algorithm.
   *
   */
  static PATH_POSTPROCESSING_NONE: any

  /**
   * Don't include any additional metadata about the returned path.
   *
   */
  static PATH_METADATA_INCLUDE_NONE: any

  /**
   * Include the type of navigation primitive (region or link) that each point of the path goes through.
   *
   */
  static PATH_METADATA_INCLUDE_TYPES: any

  /**
   * Include the [RID]s of the regions and links that each point of the path goes through.
   *
   */
  static PATH_METADATA_INCLUDE_RIDS: any

  /**
   * Include the `ObjectID`s of the [Object]s which manage the regions and links each point of the path goes through.
   *
   */
  static PATH_METADATA_INCLUDE_OWNERS: any

  /**
   * Include all available metadata about the returned path.
   *
   */
  static PATH_METADATA_INCLUDE_ALL: any
}
