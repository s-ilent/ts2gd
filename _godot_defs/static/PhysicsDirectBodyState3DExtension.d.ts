/**
 * This class extends [PhysicsDirectBodyState3D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
 *
 * Intended for use with GDExtension to create custom implementations of [PhysicsDirectBodyState3D].
 *
 */
declare class PhysicsDirectBodyState3DExtension extends PhysicsDirectBodyState3D {
  /**
   * This class extends [PhysicsDirectBodyState3D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
   *
   * Intended for use with GDExtension to create custom implementations of [PhysicsDirectBodyState3D].
   *
   */
  new(): PhysicsDirectBodyState3DExtension
  constructor()
  static new(): PhysicsDirectBodyState3DExtension

  /** No documentation provided. */
  protected _add_constant_central_force(force: Vector3): void

  /** No documentation provided. */
  protected _add_constant_force(force: Vector3, position: Vector3): void

  /** No documentation provided. */
  protected _add_constant_torque(torque: Vector3): void

  /** No documentation provided. */
  protected _apply_central_force(force: Vector3): void

  /** No documentation provided. */
  protected _apply_central_impulse(impulse: Vector3): void

  /** No documentation provided. */
  protected _apply_force(force: Vector3, position: Vector3): void

  /** No documentation provided. */
  protected _apply_impulse(impulse: Vector3, position: Vector3): void

  /** No documentation provided. */
  protected _apply_torque(torque: Vector3): void

  /** No documentation provided. */
  protected _apply_torque_impulse(impulse: Vector3): void

  /** No documentation provided. */
  protected _get_angular_velocity(): Vector3

  /** No documentation provided. */
  protected _get_center_of_mass(): Vector3

  /** No documentation provided. */
  protected _get_center_of_mass_local(): Vector3

  /** No documentation provided. */
  protected _get_collision_layer(): int

  /** No documentation provided. */
  protected _get_collision_mask(): int

  /** No documentation provided. */
  protected _get_constant_force(): Vector3

  /** No documentation provided. */
  protected _get_constant_torque(): Vector3

  /** No documentation provided. */
  protected _get_contact_collider(contact_idx: int): RID

  /** No documentation provided. */
  protected _get_contact_collider_id(contact_idx: int): int

  /** No documentation provided. */
  protected _get_contact_collider_object(contact_idx: int): Object

  /** No documentation provided. */
  protected _get_contact_collider_position(contact_idx: int): Vector3

  /** No documentation provided. */
  protected _get_contact_collider_shape(contact_idx: int): int

  /** No documentation provided. */
  protected _get_contact_collider_velocity_at_position(
    contact_idx: int
  ): Vector3

  /** No documentation provided. */
  protected _get_contact_count(): int

  /** No documentation provided. */
  protected _get_contact_impulse(contact_idx: int): Vector3

  /** No documentation provided. */
  protected _get_contact_local_normal(contact_idx: int): Vector3

  /** No documentation provided. */
  protected _get_contact_local_position(contact_idx: int): Vector3

  /** No documentation provided. */
  protected _get_contact_local_shape(contact_idx: int): int

  /** No documentation provided. */
  protected _get_contact_local_velocity_at_position(contact_idx: int): Vector3

  /** No documentation provided. */
  protected _get_inverse_inertia(): Vector3

  /** No documentation provided. */
  protected _get_inverse_inertia_tensor(): Basis

  /** No documentation provided. */
  protected _get_inverse_mass(): float

  /** No documentation provided. */
  protected _get_linear_velocity(): Vector3

  /** No documentation provided. */
  protected _get_principal_inertia_axes(): Basis

  /** No documentation provided. */
  protected _get_space_state(): PhysicsDirectSpaceState3D

  /** No documentation provided. */
  protected _get_step(): float

  /** No documentation provided. */
  protected _get_total_angular_damp(): float

  /** No documentation provided. */
  protected _get_total_gravity(): Vector3

  /** No documentation provided. */
  protected _get_total_linear_damp(): float

  /** No documentation provided. */
  protected _get_transform(): Transform3D

  /** No documentation provided. */
  protected _get_velocity_at_local_position(local_position: Vector3): Vector3

  /** No documentation provided. */
  protected _integrate_forces(): void

  /** No documentation provided. */
  protected _is_sleeping(): boolean

  /** No documentation provided. */
  protected _set_angular_velocity(velocity: Vector3): void

  /** No documentation provided. */
  protected _set_collision_layer(layer: int): void

  /** No documentation provided. */
  protected _set_collision_mask(mask: int): void

  /** No documentation provided. */
  protected _set_constant_force(force: Vector3): void

  /** No documentation provided. */
  protected _set_constant_torque(torque: Vector3): void

  /** No documentation provided. */
  protected _set_linear_velocity(velocity: Vector3): void

  /** No documentation provided. */
  protected _set_sleep_state(enabled: boolean): void

  /** No documentation provided. */
  protected _set_transform(transform: Transform3D): void

  connect<T extends SignalsOf<PhysicsDirectBodyState3DExtension>>(
    signal: T,
    method: SignalFunction<PhysicsDirectBodyState3DExtension[T]>
  ): number
}
