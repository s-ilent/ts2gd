/**
 * This resource holds a set of cells to help bulk manipulations of [TileMap].
 *
 * A pattern always starts at the `(0, 0)` coordinates and cannot have cells with negative coordinates.
 *
 */
declare class TileMapPattern extends Resource {
  /**
   * This resource holds a set of cells to help bulk manipulations of [TileMap].
   *
   * A pattern always starts at the `(0, 0)` coordinates and cannot have cells with negative coordinates.
   *
   */
  new(): TileMapPattern
  constructor()
  static new(): TileMapPattern

  /** Returns the tile alternative ID of the cell at [param coords]. */
  get_cell_alternative_tile(coords: Vector2i): int

  /** Returns the tile atlas coordinates ID of the cell at [param coords]. */
  get_cell_atlas_coords(coords: Vector2i): Vector2i

  /** Returns the tile source ID of the cell at [param coords]. */
  get_cell_source_id(coords: Vector2i): int

  /** Returns the size, in cells, of the pattern. */
  get_size(): Vector2i

  /** Returns the list of used cell coordinates in the pattern. */
  get_used_cells(): Vector2i[]

  /** Returns whether the pattern has a tile at the given coordinates. */
  has_cell(coords: Vector2i): boolean

  /** Returns whether the pattern is empty or not. */
  is_empty(): boolean

  /** Remove the cell at the given coordinates. */
  remove_cell(coords: Vector2i, update_size: boolean): void

  /** Sets the tile identifiers for the cell at coordinates [param coords]. See [method TileMap.set_cell]. */
  set_cell(
    coords: Vector2i,
    source_id?: int,
    atlas_coords?: Vector2i,
    alternative_tile?: int
  ): void

  /** Sets the size of the pattern. */
  set_size(size: Vector2i): void

  connect<T extends SignalsOf<TileMapPattern>>(
    signal: T,
    method: SignalFunction<TileMapPattern[T]>
  ): number
}
