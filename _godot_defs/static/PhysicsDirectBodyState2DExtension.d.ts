/**
 * This class extends [PhysicsDirectBodyState2D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
 *
 * Intended for use with GDExtension to create custom implementations of [PhysicsDirectBodyState2D].
 *
 */
declare class PhysicsDirectBodyState2DExtension extends PhysicsDirectBodyState2D {
  /**
   * This class extends [PhysicsDirectBodyState2D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
   *
   * Intended for use with GDExtension to create custom implementations of [PhysicsDirectBodyState2D].
   *
   */
  new(): PhysicsDirectBodyState2DExtension
  constructor()
  static new(): PhysicsDirectBodyState2DExtension

  /** Overridable version of [method PhysicsDirectBodyState2D.add_constant_central_force]. */
  protected _add_constant_central_force(force: Vector2): void

  /** Overridable version of [method PhysicsDirectBodyState2D.add_constant_force]. */
  protected _add_constant_force(force: Vector2, position: Vector2): void

  /** Overridable version of [method PhysicsDirectBodyState2D.add_constant_torque]. */
  protected _add_constant_torque(torque: float): void

  /** Overridable version of [method PhysicsDirectBodyState2D.apply_central_force]. */
  protected _apply_central_force(force: Vector2): void

  /** Overridable version of [method PhysicsDirectBodyState2D.apply_central_impulse]. */
  protected _apply_central_impulse(impulse: Vector2): void

  /** Overridable version of [method PhysicsDirectBodyState2D.apply_force]. */
  protected _apply_force(force: Vector2, position: Vector2): void

  /** Overridable version of [method PhysicsDirectBodyState2D.apply_impulse]. */
  protected _apply_impulse(impulse: Vector2, position: Vector2): void

  /** Overridable version of [method PhysicsDirectBodyState2D.apply_torque]. */
  protected _apply_torque(torque: float): void

  /** Overridable version of [method PhysicsDirectBodyState2D.apply_torque_impulse]. */
  protected _apply_torque_impulse(impulse: float): void

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.angular_velocity] and its respective getter. */
  protected _get_angular_velocity(): float

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.center_of_mass] and its respective getter. */
  protected _get_center_of_mass(): Vector2

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.center_of_mass_local] and its respective getter. */
  protected _get_center_of_mass_local(): Vector2

  /** No documentation provided. */
  protected _get_collision_layer(): int

  /** No documentation provided. */
  protected _get_collision_mask(): int

  /** Overridable version of [method PhysicsDirectBodyState2D.get_constant_force]. */
  protected _get_constant_force(): Vector2

  /** Overridable version of [method PhysicsDirectBodyState2D.get_constant_torque]. */
  protected _get_constant_torque(): float

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_collider]. */
  protected _get_contact_collider(contact_idx: int): RID

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_collider_id]. */
  protected _get_contact_collider_id(contact_idx: int): int

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_collider_object]. */
  protected _get_contact_collider_object(contact_idx: int): Object

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_collider_position]. */
  protected _get_contact_collider_position(contact_idx: int): Vector2

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_collider_shape]. */
  protected _get_contact_collider_shape(contact_idx: int): int

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_collider_velocity_at_position]. */
  protected _get_contact_collider_velocity_at_position(
    contact_idx: int
  ): Vector2

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_count]. */
  protected _get_contact_count(): int

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_impulse]. */
  protected _get_contact_impulse(contact_idx: int): Vector2

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_local_normal]. */
  protected _get_contact_local_normal(contact_idx: int): Vector2

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_local_position]. */
  protected _get_contact_local_position(contact_idx: int): Vector2

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_local_shape]. */
  protected _get_contact_local_shape(contact_idx: int): int

  /** Overridable version of [method PhysicsDirectBodyState2D.get_contact_local_velocity_at_position]. */
  protected _get_contact_local_velocity_at_position(contact_idx: int): Vector2

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.inverse_inertia] and its respective getter. */
  protected _get_inverse_inertia(): float

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.inverse_mass] and its respective getter. */
  protected _get_inverse_mass(): float

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.linear_velocity] and its respective getter. */
  protected _get_linear_velocity(): Vector2

  /** Overridable version of [method PhysicsDirectBodyState2D.get_space_state]. */
  protected _get_space_state(): PhysicsDirectSpaceState2D

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.step] and its respective getter. */
  protected _get_step(): float

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.total_angular_damp] and its respective getter. */
  protected _get_total_angular_damp(): float

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.total_gravity] and its respective getter. */
  protected _get_total_gravity(): Vector2

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.total_linear_damp] and its respective getter. */
  protected _get_total_linear_damp(): float

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.transform] and its respective getter. */
  protected _get_transform(): Transform2D

  /** Overridable version of [method PhysicsDirectBodyState2D.get_velocity_at_local_position]. */
  protected _get_velocity_at_local_position(local_position: Vector2): Vector2

  /** Overridable version of [method PhysicsDirectBodyState2D.integrate_forces]. */
  protected _integrate_forces(): void

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.sleeping] and its respective getter. */
  protected _is_sleeping(): boolean

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.angular_velocity] and its respective setter. */
  protected _set_angular_velocity(velocity: float): void

  /** No documentation provided. */
  protected _set_collision_layer(layer: int): void

  /** No documentation provided. */
  protected _set_collision_mask(mask: int): void

  /** Overridable version of [method PhysicsDirectBodyState2D.set_constant_force]. */
  protected _set_constant_force(force: Vector2): void

  /** Overridable version of [method PhysicsDirectBodyState2D.set_constant_torque]. */
  protected _set_constant_torque(torque: float): void

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.linear_velocity] and its respective setter. */
  protected _set_linear_velocity(velocity: Vector2): void

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.sleeping] and its respective setter. */
  protected _set_sleep_state(enabled: boolean): void

  /** Implement to override the behavior of [member PhysicsDirectBodyState2D.transform] and its respective setter. */
  protected _set_transform(transform: Transform2D): void

  connect<T extends SignalsOf<PhysicsDirectBodyState2DExtension>>(
    signal: T,
    method: SignalFunction<PhysicsDirectBodyState2DExtension[T]>
  ): number
}
