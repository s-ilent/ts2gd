/**
 * Node for 2D tile-based maps. A [TileMapLayer] uses a [TileSet] which contain a list of tiles which are used to create grid-based maps. Unlike the [TileMap] node, which is deprecated, [TileMapLayer] has only one layer of tiles. You can use several [TileMapLayer] to achieve the same result as a [TileMap] node.
 *
 * For performance reasons, all TileMap updates are batched at the end of a frame. Notably, this means that scene tiles from a [TileSetScenesCollectionSource] are initialized after their parent. This is only queued when inside the scene tree.
 *
 * To force an update earlier on, call [method update_internals].
 *
 * **Note:** For performance and compatibility reasons, the coordinates serialized by [TileMapLayer] are limited to 16-bit signed integers, i.e. the range for X and Y coordinates is from `-32768` to `32767`. When saving tile data, tiles outside this range are wrapped.
 *
 */
declare class TileMapLayer extends Node2D {
  /**
   * Node for 2D tile-based maps. A [TileMapLayer] uses a [TileSet] which contain a list of tiles which are used to create grid-based maps. Unlike the [TileMap] node, which is deprecated, [TileMapLayer] has only one layer of tiles. You can use several [TileMapLayer] to achieve the same result as a [TileMap] node.
   *
   * For performance reasons, all TileMap updates are batched at the end of a frame. Notably, this means that scene tiles from a [TileSetScenesCollectionSource] are initialized after their parent. This is only queued when inside the scene tree.
   *
   * To force an update earlier on, call [method update_internals].
   *
   * **Note:** For performance and compatibility reasons, the coordinates serialized by [TileMapLayer] are limited to 16-bit signed integers, i.e. the range for X and Y coordinates is from `-32768` to `32767`. When saving tile data, tiles outside this range are wrapped.
   *
   */
  new(): TileMapLayer
  constructor()
  static new(): TileMapLayer

  /** Enable or disable collisions. */
  collision_enabled: boolean

  /** Show or hide the [TileMapLayer]'s collision shapes. If set to [constant DEBUG_VISIBILITY_MODE_DEFAULT], this depends on the show collision debug settings. */
  collision_visibility_mode: int

  /** If [code]false[/code], disables this [TileMapLayer] completely (rendering, collision, navigation, scene tiles, etc.) */
  enabled: boolean

  /** If [code]true[/code], navigation regions are enabled. */
  navigation_enabled: boolean

  /** Show or hide the [TileMapLayer]'s navigation meshes. If set to [constant DEBUG_VISIBILITY_MODE_DEFAULT], this depends on the show navigation debug settings. */
  navigation_visibility_mode: int

  /** Enable or disable light occlusion. */
  occlusion_enabled: boolean

  /**
   * The [TileMapLayer]'s physics quadrant size. Within a physics quadrant, cells with similar physics properties are grouped together and their collision shapes get merged. [member physics_quadrant_size] defines the length of a square's side, in the map's coordinate system, that forms the quadrant. Thus, the default quadrant size groups together `16 * 16 = 256` tiles.
   *
   * **Note:** As quadrants are created according to the map's coordinate system, the quadrant's "square shape" might not look like square in the [TileMapLayer]'s local coordinate system.
   *
   * **Note:** This impacts the value returned by [method get_coords_for_body_rid]. Higher values will make that function less precise. To get the exact cell coordinates, you need to set [member physics_quadrant_size] to `1`, which disables physics chunking.
   *
   */
  physics_quadrant_size: int

  /**
   * The [TileMapLayer]'s rendering quadrant size. A quadrant is a group of tiles to be drawn together on a single canvas item, for optimization purposes. [member rendering_quadrant_size] defines the length of a square's side, in the map's coordinate system, that forms the quadrant. Thus, the default quadrant size groups together `16 * 16 = 256` tiles.
   *
   * The quadrant size does not apply on a Y-sorted [TileMapLayer], as tiles are grouped by Y position instead in that case.
   *
   * **Note:** As quadrants are created according to the map's coordinate system, the quadrant's "square shape" might not look like square in the [TileMapLayer]'s local coordinate system.
   *
   */
  rendering_quadrant_size: int

  /** The raw tile map data as a byte array. */
  tile_map_data: PackedByteArray

  /** The [TileSet] used by this layer. The textures, collisions, and additional behavior of all available tiles are stored here. */
  tile_set: TileSet

  /** If [code]true[/code], this [TileMapLayer] collision shapes will be instantiated as kinematic bodies. This can be needed for moving [TileMapLayer] nodes (i.e. moving platforms). */
  use_kinematic_bodies: boolean

  /** If [member CanvasItem.y_sort_enabled] is enabled, setting this to [code]true[/code] will reverse the order the tiles are drawn on the X-axis. */
  x_draw_order_reversed: boolean

  /** This Y-sort origin value is added to each tile's Y-sort origin value. This allows, for example, to fake a different height level. This can be useful for top-down view games. */
  y_sort_origin: int

  /**
   * Called with a [TileData] object about to be used internally by the [TileMapLayer], allowing its modification at runtime.
   *
   * This method is only called if [method _use_tile_data_runtime_update] is implemented and returns `true` for the given tile [param coords].
   *
   * **Warning:** The [param tile_data] object's sub-resources are the same as the one in the TileSet. Modifying them might impact the whole TileSet. Instead, make sure to duplicate those resources.
   *
   * **Note:** If the properties of [param tile_data] object should change over time, use [method notify_runtime_tile_data_update] to notify the [TileMapLayer] it needs an update.
   *
   */
  protected _tile_data_runtime_update(
    coords: Vector2i,
    tile_data: TileData
  ): void

  /**
   * Called when this [TileMapLayer]'s cells need an internal update. This update may be caused from individual cells being modified or by a change in the [member tile_set] (causing all cells to be queued for an update). The first call to this function is always for initializing all the [TileMapLayer]'s cells. [param coords] contains the coordinates of all modified cells, roughly in the order they were modified. [param forced_cleanup] is `true` when the [TileMapLayer]'s internals should be fully cleaned up. This is the case when:
   *
   * - The layer is disabled;
   *
   * - The layer is not visible;
   *
   * - [member tile_set] is set to `null`;
   *
   * - The node is removed from the tree;
   *
   * - The node is freed.
   *
   * Note that any internal update happening while one of these conditions is verified is considered to be a "cleanup". See also [method update_internals].
   *
   * **Warning:** Implementing this method may degrade the [TileMapLayer]'s performance.
   *
   */
  protected _update_cells(coords: Vector2i[], forced_cleanup: boolean): void

  /**
   * Should return `true` if the tile at coordinates [param coords] requires a runtime update.
   *
   * **Warning:** Make sure this function only returns `true` when needed. Any tile processed at runtime without a need for it will imply a significant performance penalty.
   *
   * **Note:** If the result of this function should change, use [method notify_runtime_tile_data_update] to notify the [TileMapLayer] it needs an update.
   *
   */
  protected _use_tile_data_runtime_update(coords: Vector2i): boolean

  /** Clears all cells. */
  clear(): void

  /** Erases the cell at coordinates [param coords]. */
  erase_cell(coords: Vector2i): void

  /** Clears cells containing tiles that do not exist in the [member tile_set]. */
  fix_invalid_tiles(): void

  /** Returns the tile alternative ID of the cell at coordinates [param coords]. */
  get_cell_alternative_tile(coords: Vector2i): int

  /** Returns the tile atlas coordinates ID of the cell at coordinates [param coords]. Returns [code]Vector2i(-1, -1)[/code] if the cell does not exist. */
  get_cell_atlas_coords(coords: Vector2i): Vector2i

  /** Returns the tile source ID of the cell at coordinates [param coords]. Returns [code]-1[/code] if the cell does not exist. */
  get_cell_source_id(coords: Vector2i): int

  /**
   * Returns the [TileData] object associated with the given cell, or `null` if the cell does not exist or is not a [TileSetAtlasSource].
   *
   * @example
   *
   * func get_clicked_tile_power():
   * 	var clicked_cell = tile_map_layer.local_to_map(tile_map_layer.get_local_mouse_position())
   * 	var data = tile_map_layer.get_cell_tile_data(clicked_cell)
   * 	if data:
   * 		return data.get_custom_data("power")
   * 	else:
   * 		return 0
   * @summary
   *
   *
   */
  get_cell_tile_data(coords: Vector2i): TileData

  /**
   * Returns the coordinates of the physics quadrant (see [member physics_quadrant_size]) for given physics body [RID]. Such an [RID] can be retrieved from [method KinematicCollision2D.get_collider_rid], when colliding with a tile.
   *
   * **Note:** Higher values of [member physics_quadrant_size] will make this function less precise. To get the exact cell coordinates, you need to set [member physics_quadrant_size] to `1`, which disables physics chunking.
   *
   */
  get_coords_for_body_rid(body: RID): Vector2i

  /**
   * Returns the [RID] of the [NavigationServer2D] navigation used by this [TileMapLayer].
   *
   * By default this returns the default [World2D] navigation map, unless a custom map was provided using [method set_navigation_map].
   *
   */
  get_navigation_map(): RID

  /** Returns the neighboring cell to the one at coordinates [param coords], identified by the [param neighbor] direction. This method takes into account the different layouts a TileMap can take. */
  get_neighbor_cell(coords: Vector2i, neighbor: int): Vector2i

  /** Creates and returns a new [TileMapPattern] from the given array of cells. See also [method set_pattern]. */
  get_pattern(coords_array: Vector2i[]): TileMapPattern

  /** Returns the list of all neighboring cells to the one at [param coords]. Any neighboring cell is one that is touching edges, so for a square cell 4 cells would be returned, for a hexagon 6 cells are returned. */
  get_surrounding_cells(coords: Vector2i): Vector2i[]

  /** Returns a [Vector2i] array with the positions of all cells containing a tile. A cell is considered empty if its source identifier equals [code]-1[/code], its atlas coordinate identifier is [code]Vector2(-1, -1)[/code] and its alternative identifier is [code]-1[/code]. */
  get_used_cells(): Vector2i[]

  /**
   * Returns a [Vector2i] array with the positions of all cells containing a tile. Tiles may be filtered according to their source ([param source_id]), their atlas coordinates ([param atlas_coords]), or alternative id ([param alternative_tile]).
   *
   * If a parameter has its value set to the default one, this parameter is not used to filter a cell. Thus, if all parameters have their respective default values, this method returns the same result as [method get_used_cells].
   *
   * A cell is considered empty if its source identifier equals `-1`, its atlas coordinate identifier is `Vector2(-1, -1)` and its alternative identifier is `-1`.
   *
   */
  get_used_cells_by_id(
    source_id?: int,
    atlas_coords?: Vector2i,
    alternative_tile?: int
  ): Vector2i[]

  /** Returns a rectangle enclosing the used (non-empty) tiles of the map. */
  get_used_rect(): Rect2i

  /** Returns whether the provided [param body] [RID] belongs to one of this [TileMapLayer]'s cells. */
  has_body_rid(body: RID): boolean

  /** Returns [code]true[/code] if the cell at coordinates [param coords] is flipped horizontally. The result is valid only for atlas sources. */
  is_cell_flipped_h(coords: Vector2i): boolean

  /** Returns [code]true[/code] if the cell at coordinates [param coords] is flipped vertically. The result is valid only for atlas sources. */
  is_cell_flipped_v(coords: Vector2i): boolean

  /** Returns [code]true[/code] if the cell at coordinates [param coords] is transposed. The result is valid only for atlas sources. */
  is_cell_transposed(coords: Vector2i): boolean

  /** Returns the map coordinates of the cell containing the given [param local_position]. If [param local_position] is in global coordinates, consider using [method Node2D.to_local] before passing it to this method. See also [method map_to_local]. */
  local_to_map(local_position: Vector2): Vector2i

  /** Returns for the given coordinates [param coords_in_pattern] in a [TileMapPattern] the corresponding cell coordinates if the pattern was pasted at the [param position_in_tilemap] coordinates (see [method set_pattern]). This mapping is required as in half-offset tile shapes, the mapping might not work by calculating [code]position_in_tile_map + coords_in_pattern[/code]. */
  map_pattern(
    position_in_tilemap: Vector2i,
    coords_in_pattern: Vector2i,
    pattern: TileMapPattern
  ): Vector2i

  /**
   * Returns the centered position of a cell in the [TileMapLayer]'s local coordinate space. To convert the returned value into global coordinates, use [method Node2D.to_global]. See also [method local_to_map].
   *
   * **Note:** This may not correspond to the visual position of the tile, i.e. it ignores the [member TileData.texture_origin] property of individual tiles.
   *
   */
  map_to_local(map_position: Vector2i): Vector2

  /**
   * Notifies the [TileMapLayer] node that calls to [method _use_tile_data_runtime_update] or [method _tile_data_runtime_update] will lead to different results. This will thus trigger a [TileMapLayer] update.
   *
   * **Warning:** Updating the [TileMapLayer] is computationally expensive and may impact performance. Try to limit the number of calls to this function to avoid unnecessary update.
   *
   * **Note:** This does not trigger a direct update of the [TileMapLayer], the update will be done at the end of the frame as usual (unless you call [method update_internals]).
   *
   */
  notify_runtime_tile_data_update(): void

  /**
   * Sets the tile identifiers for the cell at coordinates [param coords]. Each tile of the [TileSet] is identified using three parts:
   *
   * - The source identifier [param source_id] identifies a [TileSetSource] identifier. See [method TileSet.set_source_id],
   *
   * - The atlas coordinate identifier [param atlas_coords] identifies a tile coordinates in the atlas (if the source is a [TileSetAtlasSource]). For [TileSetScenesCollectionSource] it should always be `Vector2i(0, 0)`,
   *
   * - The alternative tile identifier [param alternative_tile] identifies a tile alternative in the atlas (if the source is a [TileSetAtlasSource]), and the scene for a [TileSetScenesCollectionSource].
   *
   * If [param source_id] is set to `-1`, [param atlas_coords] to `Vector2i(-1, -1)`, or [param alternative_tile] to `-1`, the cell will be erased. An erased cell gets **all** its identifiers automatically set to their respective invalid values, namely `-1`, `Vector2i(-1, -1)` and `-1`.
   *
   */
  set_cell(
    coords: Vector2i,
    source_id?: int,
    atlas_coords?: Vector2i,
    alternative_tile?: int
  ): void

  /**
   * Update all the cells in the [param cells] coordinates array so that they use the given [param terrain] for the given [param terrain_set]. If an updated cell has the same terrain as one of its neighboring cells, this function tries to join the two. This function might update neighboring tiles if needed to create correct terrain transitions.
   *
   * If [param ignore_empty_terrains] is `true`, empty terrains will be ignored when trying to find the best fitting tile for the given terrain constraints.
   *
   * **Note:** To work correctly, this method requires the [TileMapLayer]'s TileSet to have terrains set up with all required terrain combinations. Otherwise, it may produce unexpected results.
   *
   */
  set_cells_terrain_connect(
    cells: Vector2i[],
    terrain_set: int,
    terrain: int,
    ignore_empty_terrains?: boolean
  ): void

  /**
   * Update all the cells in the [param path] coordinates array so that they use the given [param terrain] for the given [param terrain_set]. The function will also connect two successive cell in the path with the same terrain. This function might update neighboring tiles if needed to create correct terrain transitions.
   *
   * If [param ignore_empty_terrains] is `true`, empty terrains will be ignored when trying to find the best fitting tile for the given terrain constraints.
   *
   * **Note:** To work correctly, this method requires the [TileMapLayer]'s TileSet to have terrains set up with all required terrain combinations. Otherwise, it may produce unexpected results.
   *
   */
  set_cells_terrain_path(
    path: Vector2i[],
    terrain_set: int,
    terrain: int,
    ignore_empty_terrains?: boolean
  ): void

  /** Sets a custom [param map] as a [NavigationServer2D] navigation map. If not set, uses the default [World2D] navigation map instead. */
  set_navigation_map(map: RID): void

  /** Pastes the [TileMapPattern] at the given [param position] in the tile map. See also [method get_pattern]. */
  set_pattern(position: Vector2i, pattern: TileMapPattern): void

  /**
   * Triggers a direct update of the [TileMapLayer]. Usually, calling this function is not needed, as [TileMapLayer] node updates automatically when one of its properties or cells is modified.
   *
   * However, for performance reasons, those updates are batched and delayed to the end of the frame. Calling this function will force the [TileMapLayer] to update right away instead.
   *
   * **Warning:** Updating the [TileMapLayer] is computationally expensive and may impact performance. Try to limit the number of updates and how many tiles they impact.
   *
   */
  update_internals(): void

  connect<T extends SignalsOf<TileMapLayer>>(
    signal: T,
    method: SignalFunction<TileMapLayer[T]>
  ): number

  /**
   * Hide the collisions or navigation debug shapes in the editor, and use the debug settings to determine their visibility in game (i.e. [member SceneTree.debug_collisions_hint] or [member SceneTree.debug_navigation_hint]).
   *
   */
  static DEBUG_VISIBILITY_MODE_DEFAULT: any

  /**
   * Always hide the collisions or navigation debug shapes.
   *
   */
  static DEBUG_VISIBILITY_MODE_FORCE_HIDE: any

  /**
   * Always show the collisions or navigation debug shapes.
   *
   */
  static DEBUG_VISIBILITY_MODE_FORCE_SHOW: any

  /**
   * Emitted when this [TileMapLayer]'s properties changes. This includes modified cells, properties, or changes made to its assigned [TileSet].
   *
   * **Note:** This signal may be emitted very often when batch-modifying a [TileMapLayer]. Avoid executing complex processing in a connected function, and consider delaying it to the end of the frame instead (i.e. calling [method Object.call_deferred]).
   *
   */
  $changed: Signal<() => void>
}
