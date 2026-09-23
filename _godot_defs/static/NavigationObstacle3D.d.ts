/**
 * An obstacle needs a navigation map and outline [member vertices] defined to work correctly. The outlines can not cross or overlap and are restricted to a plane projection. This means the y-axis of the vertices is ignored, instead the obstacle's global y-axis position is used for placement. The projected shape is extruded by the obstacles height along the y-axis.
 *
 * Obstacles can be included in the navigation mesh baking process when [member affect_navigation_mesh] is enabled. They do not add walkable geometry, instead their role is to discard other source geometry inside the shape. This can be used to prevent navigation mesh from appearing in unwanted places, e.g. inside "solid" geometry or on top of it. If [member carve_navigation_mesh] is enabled the baked shape will not be affected by offsets of the navigation mesh baking, e.g. the agent radius.
 *
 * With [member avoidance_enabled] the obstacle can constrain the avoidance velocities of avoidance using agents. If the obstacle's vertices are wound in clockwise order, avoidance agents will be pushed in by the obstacle, otherwise, avoidance agents will be pushed out. Obstacles using vertices and avoidance can warp to a new position but should not be moved every single frame as each change requires a rebuild of the avoidance map.
 *
 */
declare class NavigationObstacle3D extends Node3D {
  /**
   * An obstacle needs a navigation map and outline [member vertices] defined to work correctly. The outlines can not cross or overlap and are restricted to a plane projection. This means the y-axis of the vertices is ignored, instead the obstacle's global y-axis position is used for placement. The projected shape is extruded by the obstacles height along the y-axis.
   *
   * Obstacles can be included in the navigation mesh baking process when [member affect_navigation_mesh] is enabled. They do not add walkable geometry, instead their role is to discard other source geometry inside the shape. This can be used to prevent navigation mesh from appearing in unwanted places, e.g. inside "solid" geometry or on top of it. If [member carve_navigation_mesh] is enabled the baked shape will not be affected by offsets of the navigation mesh baking, e.g. the agent radius.
   *
   * With [member avoidance_enabled] the obstacle can constrain the avoidance velocities of avoidance using agents. If the obstacle's vertices are wound in clockwise order, avoidance agents will be pushed in by the obstacle, otherwise, avoidance agents will be pushed out. Obstacles using vertices and avoidance can warp to a new position but should not be moved every single frame as each change requires a rebuild of the avoidance map.
   *
   */
  new(): NavigationObstacle3D
  constructor()
  static new(): NavigationObstacle3D

  /** If enabled and parsed in a navigation mesh baking process the obstacle will discard source geometry inside its [member vertices] and [member height] defined shape. */
  affect_navigation_mesh: boolean

  /** If [code]true[/code] the obstacle affects avoidance using agents. */
  avoidance_enabled: boolean

  /** A bitfield determining the avoidance layers for this obstacle. Agents with a matching bit on the their avoidance mask will avoid this obstacle. */
  avoidance_layers: int

  /**
   * If enabled the obstacle vertices will carve into the baked navigation mesh with the shape unaffected by additional offsets (e.g. agent radius).
   *
   * It will still be affected by further postprocessing of the baking process, like edge and polygon simplification.
   *
   * Requires [member affect_navigation_mesh] to be enabled.
   *
   */
  carve_navigation_mesh: boolean

  /** Sets the obstacle height used in 2D avoidance. 2D avoidance using agent's ignore obstacles that are below or above them. */
  height: float

  /** Sets the avoidance radius for the obstacle. */
  radius: float

  /**
   * If `true` the obstacle affects 3D avoidance using agent's with obstacle [member radius].
   *
   * If `false` the obstacle affects 2D avoidance using agent's with both obstacle [member vertices] as well as obstacle [member radius].
   *
   */
  use_3d_avoidance: boolean

  /** Sets the wanted velocity for the obstacle so other agent's can better predict the obstacle if it is moved with a velocity regularly (every frame) instead of warped to a new position. Does only affect avoidance for the obstacles [member radius]. Does nothing for the obstacles static vertices. */
  velocity: Vector3

  /** The outline vertices of the obstacle. If the vertices are winded in clockwise order agents will be pushed in by the obstacle, else they will be pushed out. Outlines can not be crossed or overlap. Should the vertices using obstacle be warped to a new position agent's can not predict this movement and may get trapped inside the obstacle. */
  vertices: PackedVector3Array

  /** Returns whether or not the specified layer of the [member avoidance_layers] bitmask is enabled, given a [param layer_number] between 1 and 32. */
  get_avoidance_layer_value(layer_number: int): boolean

  /** Returns the [RID] of the navigation map for this NavigationObstacle node. This function returns always the map set on the NavigationObstacle node and not the map of the abstract obstacle on the NavigationServer. If the obstacle map is changed directly with the NavigationServer API the NavigationObstacle node will not be aware of the map change. Use [method set_navigation_map] to change the navigation map for the NavigationObstacle and also update the obstacle on the NavigationServer. */
  get_navigation_map(): RID

  /** Returns the [RID] of this obstacle on the [NavigationServer3D]. */
  get_rid(): RID

  /** Based on [param value], enables or disables the specified layer in the [member avoidance_layers] bitmask, given a [param layer_number] between 1 and 32. */
  set_avoidance_layer_value(layer_number: int, value: boolean): void

  /** Sets the [RID] of the navigation map this NavigationObstacle node should use and also updates the [code]obstacle[/code] on the NavigationServer. */
  set_navigation_map(navigation_map: RID): void

  connect<T extends SignalsOf<NavigationObstacle3D>>(
    signal: T,
    method: SignalFunction<NavigationObstacle3D[T]>
  ): number
}
