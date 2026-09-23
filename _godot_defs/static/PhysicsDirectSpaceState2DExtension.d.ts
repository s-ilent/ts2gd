/**
 * This class extends [PhysicsDirectSpaceState2D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
 *
 * Intended for use with GDExtension to create custom implementations of [PhysicsDirectSpaceState2D].
 *
 */
declare class PhysicsDirectSpaceState2DExtension extends PhysicsDirectSpaceState2D {
  /**
   * This class extends [PhysicsDirectSpaceState2D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
   *
   * Intended for use with GDExtension to create custom implementations of [PhysicsDirectSpaceState2D].
   *
   */
  new(): PhysicsDirectSpaceState2DExtension
  constructor()
  static new(): PhysicsDirectSpaceState2DExtension

  /** No documentation provided. */
  protected _cast_motion(
    shape_rid: RID,
    transform: Transform2D,
    motion: Vector2,
    margin: float,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    closest_safe: CPointer,
    closest_unsafe: CPointer
  ): boolean

  /** No documentation provided. */
  protected _collide_shape(
    shape_rid: RID,
    transform: Transform2D,
    motion: Vector2,
    margin: float,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    results: CPointer,
    max_results: int,
    result_count: CPointer
  ): boolean

  /** No documentation provided. */
  protected _intersect_point(
    position: Vector2,
    canvas_instance_id: int,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    results: CPointer,
    max_results: int
  ): int

  /** No documentation provided. */
  protected _intersect_ray(
    from: Vector2,
    to: Vector2,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    hit_from_inside: boolean,
    result: CPointer
  ): boolean

  /** No documentation provided. */
  protected _intersect_shape(
    shape_rid: RID,
    transform: Transform2D,
    motion: Vector2,
    margin: float,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    result: CPointer,
    max_results: int
  ): int

  /** No documentation provided. */
  protected _rest_info(
    shape_rid: RID,
    transform: Transform2D,
    motion: Vector2,
    margin: float,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    rest_info: CPointer
  ): boolean

  /** No documentation provided. */
  is_body_excluded_from_query(body: RID): boolean

  connect<T extends SignalsOf<PhysicsDirectSpaceState2DExtension>>(
    signal: T,
    method: SignalFunction<PhysicsDirectSpaceState2DExtension[T]>
  ): number
}
