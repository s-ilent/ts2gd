/**
 * When placed on a [TileMapLayer], tiles from [TileSetScenesCollectionSource] will automatically instantiate an associated scene at the cell's position in the TileMapLayer.
 *
 * Scenes are instantiated as children of the [TileMapLayer] after it enters the tree, at the end of the frame (their creation is deferred). If you add/remove a scene tile in the [TileMapLayer] that is already inside the tree, the [TileMapLayer] will automatically instantiate/free the scene accordingly.
 *
 * **Note:** Scene tiles all occupy one tile slot and instead use alternate tile ID to identify scene index. [method TileSetSource.get_tiles_count] will always return `1`. Use [method get_scene_tiles_count] to get a number of scenes in a [TileSetScenesCollectionSource].
 *
 * Use this code if you want to find the scene path at a given tile in [TileMapLayer]:
 *
 * @example
 *
 *
 * var source_id = tile_map_layer.get_cell_source_id(Vector2i(x, y))
 * if source_id > -1:
 * 	var scene_source = tile_map_layer.tile_set.get_source(source_id)
 * 	if scene_source is TileSetScenesCollectionSource:
 * 		var alt_id = tile_map_layer.get_cell_alternative_tile(Vector2i(x, y))
 * 		# The assigned PackedScene.
 * 		var scene = scene_source.get_scene_tile_scene(alt_id)
 *
 *
 * int sourceId = tileMapLayer.GetCellSourceId(new Vector2I(x, y));
 * if (sourceId > -1)
 * {
 * 	TileSetSource source = tileMapLayer.TileSet.GetSource(sourceId);
 * 	if (source is TileSetScenesCollectionSource sceneSource)
 * 	{
 * 		int altId = tileMapLayer.GetCellAlternativeTile(new Vector2I(x, y));
 * 		// The assigned PackedScene.
 * 		PackedScene scene = sceneSource.GetSceneTileScene(altId);
 * 	}
 * }
 *
 * @summary
 *
 *
 */
declare class TileSetScenesCollectionSource extends TileSetSource {
  /**
   * When placed on a [TileMapLayer], tiles from [TileSetScenesCollectionSource] will automatically instantiate an associated scene at the cell's position in the TileMapLayer.
   *
   * Scenes are instantiated as children of the [TileMapLayer] after it enters the tree, at the end of the frame (their creation is deferred). If you add/remove a scene tile in the [TileMapLayer] that is already inside the tree, the [TileMapLayer] will automatically instantiate/free the scene accordingly.
   *
   * **Note:** Scene tiles all occupy one tile slot and instead use alternate tile ID to identify scene index. [method TileSetSource.get_tiles_count] will always return `1`. Use [method get_scene_tiles_count] to get a number of scenes in a [TileSetScenesCollectionSource].
   *
   * Use this code if you want to find the scene path at a given tile in [TileMapLayer]:
   *
   * @example
   *
   *
   * var source_id = tile_map_layer.get_cell_source_id(Vector2i(x, y))
   * if source_id > -1:
   * 	var scene_source = tile_map_layer.tile_set.get_source(source_id)
   * 	if scene_source is TileSetScenesCollectionSource:
   * 		var alt_id = tile_map_layer.get_cell_alternative_tile(Vector2i(x, y))
   * 		# The assigned PackedScene.
   * 		var scene = scene_source.get_scene_tile_scene(alt_id)
   *
   *
   * int sourceId = tileMapLayer.GetCellSourceId(new Vector2I(x, y));
   * if (sourceId > -1)
   * {
   * 	TileSetSource source = tileMapLayer.TileSet.GetSource(sourceId);
   * 	if (source is TileSetScenesCollectionSource sceneSource)
   * 	{
   * 		int altId = tileMapLayer.GetCellAlternativeTile(new Vector2I(x, y));
   * 		// The assigned PackedScene.
   * 		PackedScene scene = sceneSource.GetSceneTileScene(altId);
   * 	}
   * }
   *
   * @summary
   *
   *
   */
  new(): TileSetScenesCollectionSource
  constructor()
  static new(): TileSetScenesCollectionSource

  /**
   * Creates a scene-based tile out of the given scene.
   *
   * Returns a newly generated unique ID.
   *
   */
  create_scene_tile(packed_scene: PackedScene<any>, id_override?: int): int

  /** Returns the scene ID a following call to [method create_scene_tile] would return. */
  get_next_scene_tile_id(): int

  /** Returns whether the scene tile with [param id] displays a placeholder in the editor. */
  get_scene_tile_display_placeholder(id: int): boolean

  /** Returns the scene tile ID of the scene tile at [param index]. */
  get_scene_tile_id(index: int): int

  /** Returns the [PackedScene] resource of scene tile with [param id]. */
  get_scene_tile_scene(id: int): PackedScene<any>

  /** Returns the number or scene tiles this TileSet source has. */
  get_scene_tiles_count(): int

  /** Returns whether this TileSet source has a scene tile with [param id]. */
  has_scene_tile_id(id: int): boolean

  /** Remove the scene tile with [param id]. */
  remove_scene_tile(id: int): void

  /** Sets whether or not the scene tile with [param id] should display a placeholder in the editor. This might be useful for scenes that are not visible. */
  set_scene_tile_display_placeholder(
    id: int,
    display_placeholder: boolean
  ): void

  /** Changes a scene tile's ID from [param id] to [param new_id]. This will fail if there is already a tile with an ID equal to [param new_id]. */
  set_scene_tile_id(id: int, new_id: int): void

  /** Assigns a [PackedScene] resource to the scene tile with [param id]. This will fail if the scene does not extend [CanvasItem], as positioning properties are needed to place the scene on the [TileMapLayer]. */
  set_scene_tile_scene(id: int, packed_scene: PackedScene<any>): void

  connect<T extends SignalsOf<TileSetScenesCollectionSource>>(
    signal: T,
    method: SignalFunction<TileSetScenesCollectionSource[T]>
  ): number
}
