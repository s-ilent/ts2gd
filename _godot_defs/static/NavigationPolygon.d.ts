/**
 * A navigation mesh can be created either by baking it with the help of the [NavigationServer2D], or by adding vertices and convex polygon indices arrays manually.
 *
 * To bake a navigation mesh at least one outline needs to be added that defines the outer bounds of the baked area.
 *
 * @example
 *
 *
 * var new_navigation_mesh = NavigationPolygon.new()
 * var bounding_outline = PackedVector2Array([Vector2(0, 0), Vector2(0, 50), Vector2(50, 50), Vector2(50, 0)])
 * new_navigation_mesh.add_outline(bounding_outline)
 * NavigationServer2D.bake_from_source_geometry_data(new_navigation_mesh, NavigationMeshSourceGeometryData2D.new());
 * $NavigationRegion2D.navigation_polygon = new_navigation_mesh
 *
 *
 * var newNavigationMesh = new NavigationPolygon();
 * Vector2[] boundingOutline = [new Vector2(0, 0), new Vector2(0, 50), new Vector2(50, 50), new Vector2(50, 0)];
 * newNavigationMesh.AddOutline(boundingOutline);
 * NavigationServer2D.BakeFromSourceGeometryData(newNavigationMesh, new NavigationMeshSourceGeometryData2D());
 * GetNode<NavigationRegion2D>("NavigationRegion2D").NavigationPolygon = newNavigationMesh;
 *
 * @summary
 *
 *
 * Adding vertices and polygon indices manually.
 *
 * @example
 *
 *
 * var new_navigation_mesh = NavigationPolygon.new()
 * var new_vertices = PackedVector2Array([Vector2(0, 0), Vector2(0, 50), Vector2(50, 50), Vector2(50, 0)])
 * new_navigation_mesh.vertices = new_vertices
 * var new_polygon_indices = PackedInt32Array([0, 1, 2, 3])
 * new_navigation_mesh.add_polygon(new_polygon_indices)
 * $NavigationRegion2D.navigation_polygon = new_navigation_mesh
 *
 *
 * var newNavigationMesh = new NavigationPolygon();
 * Vector2[] newVertices = [new Vector2(0, 0), new Vector2(0, 50), new Vector2(50, 50), new Vector2(50, 0)];
 * newNavigationMesh.Vertices = newVertices;
 * int[] newPolygonIndices = [0, 1, 2, 3];
 * newNavigationMesh.AddPolygon(newPolygonIndices);
 * GetNode<NavigationRegion2D>("NavigationRegion2D").NavigationPolygon = newNavigationMesh;
 *
 * @summary
 *
 *
 */
declare class NavigationPolygon extends Resource {
  /**
   * A navigation mesh can be created either by baking it with the help of the [NavigationServer2D], or by adding vertices and convex polygon indices arrays manually.
   *
   * To bake a navigation mesh at least one outline needs to be added that defines the outer bounds of the baked area.
   *
   * @example
   *
   *
   * var new_navigation_mesh = NavigationPolygon.new()
   * var bounding_outline = PackedVector2Array([Vector2(0, 0), Vector2(0, 50), Vector2(50, 50), Vector2(50, 0)])
   * new_navigation_mesh.add_outline(bounding_outline)
   * NavigationServer2D.bake_from_source_geometry_data(new_navigation_mesh, NavigationMeshSourceGeometryData2D.new());
   * $NavigationRegion2D.navigation_polygon = new_navigation_mesh
   *
   *
   * var newNavigationMesh = new NavigationPolygon();
   * Vector2[] boundingOutline = [new Vector2(0, 0), new Vector2(0, 50), new Vector2(50, 50), new Vector2(50, 0)];
   * newNavigationMesh.AddOutline(boundingOutline);
   * NavigationServer2D.BakeFromSourceGeometryData(newNavigationMesh, new NavigationMeshSourceGeometryData2D());
   * GetNode<NavigationRegion2D>("NavigationRegion2D").NavigationPolygon = newNavigationMesh;
   *
   * @summary
   *
   *
   * Adding vertices and polygon indices manually.
   *
   * @example
   *
   *
   * var new_navigation_mesh = NavigationPolygon.new()
   * var new_vertices = PackedVector2Array([Vector2(0, 0), Vector2(0, 50), Vector2(50, 50), Vector2(50, 0)])
   * new_navigation_mesh.vertices = new_vertices
   * var new_polygon_indices = PackedInt32Array([0, 1, 2, 3])
   * new_navigation_mesh.add_polygon(new_polygon_indices)
   * $NavigationRegion2D.navigation_polygon = new_navigation_mesh
   *
   *
   * var newNavigationMesh = new NavigationPolygon();
   * Vector2[] newVertices = [new Vector2(0, 0), new Vector2(0, 50), new Vector2(50, 50), new Vector2(50, 0)];
   * newNavigationMesh.Vertices = newVertices;
   * int[] newPolygonIndices = [0, 1, 2, 3];
   * newNavigationMesh.AddPolygon(newPolygonIndices);
   * GetNode<NavigationRegion2D>("NavigationRegion2D").NavigationPolygon = newNavigationMesh;
   *
   * @summary
   *
   *
   */
  new(): NavigationPolygon
  constructor()
  static new(): NavigationPolygon

  /**
   * The distance to erode/shrink the walkable surface when baking the navigation mesh.
   *
   * **Note:** The radius must be equal or higher than `0.0`. If the radius is `0.0`, it won't be possible to fix invalid outline overlaps and other precision errors during the baking process. As a result, some obstacles may be excluded incorrectly from the final navigation mesh, or may delete the navigation mesh's polygons.
   *
   */
  agent_radius: float

  /** If the baking [Rect2] has an area the navigation mesh baking will be restricted to its enclosing area. */
  baking_rect: Rect2

  /** The position offset applied to the [member baking_rect] [Rect2]. */
  baking_rect_offset: Vector2

  /**
   * The size of the non-navigable border around the bake bounding area defined by the [member baking_rect] [Rect2].
   *
   * In conjunction with the [member baking_rect] the border size can be used to bake tile aligned navigation meshes without the tile edges being shrunk by [member agent_radius].
   *
   */
  border_size: float

  /** The cell size used to rasterize the navigation mesh vertices. Must match with the cell size on the navigation map. */
  cell_size: float

  /**
   * The physics layers to scan for static colliders.
   *
   * Only used when [member parsed_geometry_type] is [constant PARSED_GEOMETRY_STATIC_COLLIDERS] or [constant PARSED_GEOMETRY_BOTH].
   *
   */
  parsed_collision_mask: int

  /** Determines which type of nodes will be parsed as geometry. */
  parsed_geometry_type: int

  /** Partitioning algorithm for creating the navigation mesh polys. */
  sample_partition_type: int

  /**
   * The group name of nodes that should be parsed for baking source geometry.
   *
   * Only used when [member source_geometry_mode] is [constant SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN] or [constant SOURCE_GEOMETRY_GROUPS_EXPLICIT].
   *
   */
  source_geometry_group_name: StringName

  /** The source of the geometry used when baking. */
  source_geometry_mode: int

  /** Appends a [PackedVector2Array] that contains the vertices of an outline to the internal array that contains all the outlines. */
  add_outline(outline: PackedVector2Array): void

  /** Adds a [PackedVector2Array] that contains the vertices of an outline to the internal array that contains all the outlines at a fixed position. */
  add_outline_at_index(outline: PackedVector2Array, index: int): void

  /** Adds a polygon using the indices of the vertices you get when calling [method get_vertices]. */
  add_polygon(polygon: PackedInt32Array): void

  /** Clears the internal arrays for vertices and polygon indices. */
  clear(): void

  /** Clears the array of the outlines, but it doesn't clear the vertices and the polygons that were created by them. */
  clear_outlines(): void

  /** Clears the array of polygons, but it doesn't clear the array of outlines and vertices. */
  clear_polygons(): void

  /** Returns the [NavigationMesh] resulting from this navigation polygon. This navigation mesh can be used to update the navigation mesh of a region with the [method NavigationServer3D.region_set_navigation_mesh] API directly. */
  get_navigation_mesh(): NavigationMesh

  /** Returns a [PackedVector2Array] containing the vertices of an outline that was created in the editor or by script. */
  get_outline(idx: int): PackedVector2Array

  /** Returns the number of outlines that were created in the editor or by script. */
  get_outline_count(): int

  /** Returns whether or not the specified layer of the [member parsed_collision_mask] is enabled, given a [param layer_number] between 1 and 32. */
  get_parsed_collision_mask_value(layer_number: int): boolean

  /** Returns a [PackedInt32Array] containing the indices of the vertices of a created polygon. */
  get_polygon(idx: int): PackedInt32Array

  /** Returns the count of all polygons. */
  get_polygon_count(): int

  /** Returns a [PackedVector2Array] containing all the vertices being used to create the polygons. */
  get_vertices(): PackedVector2Array

  /** Creates polygons from the outlines added in the editor or by script. */
  make_polygons_from_outlines(): void

  /** Removes an outline created in the editor or by script. You have to call [method make_polygons_from_outlines] for the polygons to update. */
  remove_outline(idx: int): void

  /** Changes an outline created in the editor or by script. You have to call [method make_polygons_from_outlines] for the polygons to update. */
  set_outline(idx: int, outline: PackedVector2Array): void

  /** Based on [param value], enables or disables the specified layer in the [member parsed_collision_mask], given a [param layer_number] between 1 and 32. */
  set_parsed_collision_mask_value(layer_number: int, value: boolean): void

  /** Sets the vertices that can be then indexed to create polygons with the [method add_polygon] method. */
  set_vertices(vertices: PackedVector2Array): void

  connect<T extends SignalsOf<NavigationPolygon>>(
    signal: T,
    method: SignalFunction<NavigationPolygon[T]>
  ): number

  /**
   * Convex partitioning that results in a navigation mesh with convex polygons.
   *
   */
  static SAMPLE_PARTITION_CONVEX_PARTITION: any

  /**
   * Triangulation partitioning that results in a navigation mesh with triangle polygons.
   *
   */
  static SAMPLE_PARTITION_TRIANGULATE: any

  /**
   * Represents the size of the [enum SamplePartitionType] enum.
   *
   */
  static SAMPLE_PARTITION_MAX: any

  /**
   * Parses mesh instances as obstruction geometry. This includes [Polygon2D], [MeshInstance2D], [MultiMeshInstance2D], and [TileMap] nodes.
   *
   * Meshes are only parsed when they use a 2D vertices surface format.
   *
   */
  static PARSED_GEOMETRY_MESH_INSTANCES: any

  /**
   * Parses [StaticBody2D] and [TileMap] colliders as obstruction geometry. The collider should be in any of the layers specified by [member parsed_collision_mask].
   *
   */
  static PARSED_GEOMETRY_STATIC_COLLIDERS: any

  /**
   * Both [constant PARSED_GEOMETRY_MESH_INSTANCES] and [constant PARSED_GEOMETRY_STATIC_COLLIDERS].
   *
   */
  static PARSED_GEOMETRY_BOTH: any

  /**
   * Represents the size of the [enum ParsedGeometryType] enum.
   *
   */
  static PARSED_GEOMETRY_MAX: any

  /**
   * Scans the child nodes of the root node recursively for geometry.
   *
   */
  static SOURCE_GEOMETRY_ROOT_NODE_CHILDREN: any

  /**
   * Scans nodes in a group and their child nodes recursively for geometry. The group is specified by [member source_geometry_group_name].
   *
   */
  static SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN: any

  /**
   * Uses nodes in a group for geometry. The group is specified by [member source_geometry_group_name].
   *
   */
  static SOURCE_GEOMETRY_GROUPS_EXPLICIT: any

  /**
   * Represents the size of the [enum SourceGeometryMode] enum.
   *
   */
  static SOURCE_GEOMETRY_MAX: any
}
