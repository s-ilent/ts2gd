/**
 * Container for parsed source geometry data used in navigation mesh baking.
 *
 */
declare class NavigationMeshSourceGeometryData3D extends Resource {
  /**
   * Container for parsed source geometry data used in navigation mesh baking.
   *
   */
  new(): NavigationMeshSourceGeometryData3D
  constructor()
  static new(): NavigationMeshSourceGeometryData3D

  /** Adds an array of vertex positions to the geometry data for navigation mesh baking to form triangulated faces. For each face the array must have three vertex positions in clockwise winding order. Since [NavigationMesh] resources have no transform, all vertex positions need to be offset by the node's transform using [param xform]. */
  add_faces(faces: PackedVector3Array, xform: Transform3D): void

  /** Adds the geometry data of a [Mesh] resource to the navigation mesh baking data. The mesh must have valid triangulated mesh data to be considered. Since [NavigationMesh] resources have no transform, all vertex positions need to be offset by the node's transform using [param xform]. */
  add_mesh(mesh: Mesh, xform: Transform3D): void

  /** Adds an [Array] the size of [constant Mesh.ARRAY_MAX] and with vertices at index [constant Mesh.ARRAY_VERTEX] and indices at index [constant Mesh.ARRAY_INDEX] to the navigation mesh baking data. The array must have valid triangulated mesh data to be considered. Since [NavigationMesh] resources have no transform, all vertex positions need to be offset by the node's transform using [param xform]. */
  add_mesh_array(mesh_array: any[], xform: Transform3D): void

  /** Adds a projected obstruction shape to the source geometry. The [param vertices] are considered projected on an xz-axes plane, placed at the global y-axis [param elevation] and extruded by [param height]. If [param carve] is [code]true[/code] the carved shape will not be affected by additional offsets (e.g. agent radius) of the navigation mesh baking process. */
  add_projected_obstruction(
    vertices: PackedVector3Array,
    elevation: float,
    height: float,
    carve: boolean
  ): void

  /** Appends arrays of [param vertices] and [param indices] at the end of the existing arrays. Adds the existing index as an offset to the appended indices. */
  append_arrays(vertices: PackedFloat32Array, indices: PackedInt32Array): void

  /** Clears the internal data. */
  clear(): void

  /** Clears all projected obstructions. */
  clear_projected_obstructions(): void

  /** Returns an axis-aligned bounding box that covers all the stored geometry data. The bounds are calculated when calling this function with the result cached until further geometry changes are made. */
  get_bounds(): AABB

  /** Returns the parsed source geometry data indices array. */
  get_indices(): PackedInt32Array

  /**
   * Returns the projected obstructions as an [Array] of dictionaries. Each [Dictionary] contains the following entries:
   *
   * - `vertices` - A [PackedFloat32Array] that defines the outline points of the projected shape.
   *
   * - `elevation` - A [float] that defines the projected shape placement on the y-axis.
   *
   * - `height` - A [float] that defines how much the projected shape is extruded along the y-axis.
   *
   * - `carve` - A [bool] that defines how the obstacle affects the navigation mesh baking. If `true` the projected shape will not be affected by addition offsets, e.g. agent radius.
   *
   */
  get_projected_obstructions(): any[]

  /** Returns the parsed source geometry data vertices array. */
  get_vertices(): PackedFloat32Array

  /** Returns [code]true[/code] when parsed source geometry data exists. */
  has_data(): boolean

  /** Adds the geometry data of another [NavigationMeshSourceGeometryData3D] to the navigation mesh baking data. */
  merge(other_geometry: NavigationMeshSourceGeometryData3D): void

  /**
   * Sets the parsed source geometry data indices. The indices need to be matched with appropriated vertices.
   *
   * **Warning:** Inappropriate data can crash the baking process of the involved third-party libraries.
   *
   */
  set_indices(indices: PackedInt32Array): void

  /**
   * Sets the projected obstructions with an Array of Dictionaries with the following key value pairs:
   *
   * @example
   *
   *
   * "vertices" : PackedFloat32Array
   * "elevation" : float
   * "height" : float
   * "carve" : bool
   *
   * @summary
   *
   *
   */
  set_projected_obstructions(projected_obstructions: any[]): void

  /**
   * Sets the parsed source geometry data vertices. The vertices need to be matched with appropriated indices.
   *
   * **Warning:** Inappropriate data can crash the baking process of the involved third-party libraries.
   *
   */
  set_vertices(vertices: PackedFloat32Array): void

  connect<T extends SignalsOf<NavigationMeshSourceGeometryData3D>>(
    signal: T,
    method: SignalFunction<NavigationMeshSourceGeometryData3D[T]>
  ): number
}
