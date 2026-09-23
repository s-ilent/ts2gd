/**
 * Container for parsed source geometry data used in navigation mesh baking.
 *
 */
declare class NavigationMeshSourceGeometryData2D extends Resource {
  /**
   * Container for parsed source geometry data used in navigation mesh baking.
   *
   */
  new(): NavigationMeshSourceGeometryData2D
  constructor()
  static new(): NavigationMeshSourceGeometryData2D

  /** Adds the outline points of a shape as obstructed area. */
  add_obstruction_outline(shape_outline: PackedVector2Array): void

  /** Adds a projected obstruction shape to the source geometry. If [param carve] is [code]true[/code] the carved shape will not be affected by additional offsets (e.g. agent radius) of the navigation mesh baking process. */
  add_projected_obstruction(vertices: PackedVector2Array, carve: boolean): void

  /** Adds the outline points of a shape as traversable area. */
  add_traversable_outline(shape_outline: PackedVector2Array): void

  /** Appends another array of [param obstruction_outlines] at the end of the existing obstruction outlines array. */
  append_obstruction_outlines(obstruction_outlines: PackedVector2Array[]): void

  /** Appends another array of [param traversable_outlines] at the end of the existing traversable outlines array. */
  append_traversable_outlines(traversable_outlines: PackedVector2Array[]): void

  /** Clears the internal data. */
  clear(): void

  /** Clears all projected obstructions. */
  clear_projected_obstructions(): void

  /** Returns an axis-aligned bounding box that covers all the stored geometry data. The bounds are calculated when calling this function with the result cached until further geometry changes are made. */
  get_bounds(): Rect2

  /** Returns all the obstructed area outlines arrays. */
  get_obstruction_outlines(): PackedVector2Array[]

  /**
   * Returns the projected obstructions as an [Array] of dictionaries. Each [Dictionary] contains the following entries:
   *
   * - `vertices` - A [PackedFloat32Array] that defines the outline points of the projected shape.
   *
   * - `carve` - A [bool] that defines how the projected shape affects the navigation mesh baking. If `true` the projected shape will not be affected by addition offsets, e.g. agent radius.
   *
   */
  get_projected_obstructions(): any[]

  /** Returns all the traversable area outlines arrays. */
  get_traversable_outlines(): PackedVector2Array[]

  /** Returns [code]true[/code] when parsed source geometry data exists. */
  has_data(): boolean

  /** Adds the geometry data of another [NavigationMeshSourceGeometryData2D] to the navigation mesh baking data. */
  merge(other_geometry: NavigationMeshSourceGeometryData2D): void

  /** Sets all the obstructed area outlines arrays. */
  set_obstruction_outlines(obstruction_outlines: PackedVector2Array[]): void

  /**
   * Sets the projected obstructions with an Array of Dictionaries with the following key value pairs:
   *
   * @example
   *
   *
   * "vertices" : PackedFloat32Array
   * "carve" : bool
   *
   * @summary
   *
   *
   */
  set_projected_obstructions(projected_obstructions: any[]): void

  /** Sets all the traversable area outlines arrays. */
  set_traversable_outlines(traversable_outlines: PackedVector2Array[]): void

  connect<T extends SignalsOf<NavigationMeshSourceGeometryData2D>>(
    signal: T,
    method: SignalFunction<NavigationMeshSourceGeometryData2D[T]>
  ): number
}
