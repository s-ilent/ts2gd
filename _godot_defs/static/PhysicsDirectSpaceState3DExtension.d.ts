/**
 * This class extends [PhysicsDirectSpaceState3D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
 *
 * Intended for use with GDExtension to create custom implementations of [PhysicsDirectSpaceState3D].
 *
 */
declare class PhysicsDirectSpaceState3DExtension extends PhysicsDirectSpaceState3D {
  /**
   * This class extends [PhysicsDirectSpaceState3D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
   *
   * Intended for use with GDExtension to create custom implementations of [PhysicsDirectSpaceState3D].
   *
   */
  new(): PhysicsDirectSpaceState3DExtension
  constructor()
  static new(): PhysicsDirectSpaceState3DExtension

  /** No documentation provided. */
  protected _cast_motion(
    shape_rid: RID,
    transform: Transform3D,
    motion: Vector3,
    margin: float,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    closest_safe: CPointer,
    closest_unsafe: CPointer,
    info: CPointer
  ): boolean

  /** No documentation provided. */
  protected _collide_shape(
    shape_rid: RID,
    transform: Transform3D,
    motion: Vector3,
    margin: float,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    results: CPointer,
    max_results: int,
    result_count: CPointer
  ): boolean

  /** No documentation provided. */
  protected _get_closest_point_to_object_volume(
    object: RID,
    point: Vector3
  ): Vector3

  /** No documentation provided. */
  protected _intersect_point(
    position: Vector3,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    results: CPointer,
    max_results: int
  ): int

  /** No documentation provided. */
  protected _intersect_ray(
    from: Vector3,
    to: Vector3,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    hit_from_inside: boolean,
    hit_back_faces: boolean,
    pick_ray: boolean,
    result: CPointer
  ): boolean

  /** No documentation provided. */
  protected _intersect_shape(
    shape_rid: RID,
    transform: Transform3D,
    motion: Vector3,
    margin: float,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    result_count: CPointer,
    max_results: int
  ): int

  /** No documentation provided. */
  protected _rest_info(
    shape_rid: RID,
    transform: Transform3D,
    motion: Vector3,
    margin: float,
    collision_mask: int,
    collide_with_bodies: boolean,
    collide_with_areas: boolean,
    rest_info: CPointer
  ): boolean

  /** No documentation provided. */
  is_body_excluded_from_query(body: RID): boolean

  connect<T extends SignalsOf<PhysicsDirectSpaceState3DExtension>>(
    signal: T,
    method: SignalFunction<PhysicsDirectSpaceState3DExtension[T]>
  ): number
}
