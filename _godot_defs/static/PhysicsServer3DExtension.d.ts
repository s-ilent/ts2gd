/**
 * This class extends [PhysicsServer3D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
 *
 * Intended for use with GDExtension to create custom implementations of [PhysicsServer3D].
 *
 */
declare class PhysicsServer3DExtension extends PhysicsServer3DClass {
  /**
   * This class extends [PhysicsServer3D] by providing additional virtual methods that can be overridden. When these methods are overridden, they will be called instead of the internal methods of the physics server.
   *
   * Intended for use with GDExtension to create custom implementations of [PhysicsServer3D].
   *
   */
  new(): PhysicsServer3DExtension
  constructor()
  static new(): PhysicsServer3DExtension

  /** No documentation provided. */
  protected _area_add_shape(
    area: RID,
    shape: RID,
    transform: Transform3D,
    disabled: boolean
  ): void

  /** No documentation provided. */
  protected _area_attach_object_instance_id(area: RID, id: int): void

  /** No documentation provided. */
  protected _area_clear_shapes(area: RID): void

  /** No documentation provided. */
  protected _area_create(): RID

  /** No documentation provided. */
  protected _area_get_collision_layer(area: RID): int

  /** No documentation provided. */
  protected _area_get_collision_mask(area: RID): int

  /** No documentation provided. */
  protected _area_get_object_instance_id(area: RID): int

  /** No documentation provided. */
  protected _area_get_param(area: RID, param: int): any

  /** No documentation provided. */
  protected _area_get_shape(area: RID, shape_idx: int): RID

  /** No documentation provided. */
  protected _area_get_shape_count(area: RID): int

  /** No documentation provided. */
  protected _area_get_shape_transform(area: RID, shape_idx: int): Transform3D

  /** No documentation provided. */
  protected _area_get_space(area: RID): RID

  /** No documentation provided. */
  protected _area_get_transform(area: RID): Transform3D

  /** No documentation provided. */
  protected _area_remove_shape(area: RID, shape_idx: int): void

  /** No documentation provided. */
  protected _area_set_area_monitor_callback(area: RID, callback: Callable): void

  /** No documentation provided. */
  protected _area_set_collision_layer(area: RID, layer: int): void

  /** No documentation provided. */
  protected _area_set_collision_mask(area: RID, mask: int): void

  /** No documentation provided. */
  protected _area_set_monitor_callback(area: RID, callback: Callable): void

  /** No documentation provided. */
  protected _area_set_monitorable(area: RID, monitorable: boolean): void

  /** No documentation provided. */
  protected _area_set_param(area: RID, param: int, value: any): void

  /** No documentation provided. */
  protected _area_set_ray_pickable(area: RID, enable: boolean): void

  /** No documentation provided. */
  protected _area_set_shape(area: RID, shape_idx: int, shape: RID): void

  /** No documentation provided. */
  protected _area_set_shape_disabled(
    area: RID,
    shape_idx: int,
    disabled: boolean
  ): void

  /** No documentation provided. */
  protected _area_set_shape_transform(
    area: RID,
    shape_idx: int,
    transform: Transform3D
  ): void

  /** No documentation provided. */
  protected _area_set_space(area: RID, space: RID): void

  /** No documentation provided. */
  protected _area_set_transform(area: RID, transform: Transform3D): void

  /** No documentation provided. */
  protected _body_add_collision_exception(body: RID, excepted_body: RID): void

  /** No documentation provided. */
  protected _body_add_constant_central_force(body: RID, force: Vector3): void

  /** No documentation provided. */
  protected _body_add_constant_force(
    body: RID,
    force: Vector3,
    position: Vector3
  ): void

  /** No documentation provided. */
  protected _body_add_constant_torque(body: RID, torque: Vector3): void

  /** No documentation provided. */
  protected _body_add_shape(
    body: RID,
    shape: RID,
    transform: Transform3D,
    disabled: boolean
  ): void

  /** No documentation provided. */
  protected _body_apply_central_force(body: RID, force: Vector3): void

  /** No documentation provided. */
  protected _body_apply_central_impulse(body: RID, impulse: Vector3): void

  /** No documentation provided. */
  protected _body_apply_force(
    body: RID,
    force: Vector3,
    position: Vector3
  ): void

  /** No documentation provided. */
  protected _body_apply_impulse(
    body: RID,
    impulse: Vector3,
    position: Vector3
  ): void

  /** No documentation provided. */
  protected _body_apply_torque(body: RID, torque: Vector3): void

  /** No documentation provided. */
  protected _body_apply_torque_impulse(body: RID, impulse: Vector3): void

  /** No documentation provided. */
  protected _body_attach_object_instance_id(body: RID, id: int): void

  /** No documentation provided. */
  protected _body_clear_shapes(body: RID): void

  /** No documentation provided. */
  protected _body_create(): RID

  /** No documentation provided. */
  protected _body_get_collision_exceptions(body: RID): RID[]

  /** No documentation provided. */
  protected _body_get_collision_layer(body: RID): int

  /** No documentation provided. */
  protected _body_get_collision_mask(body: RID): int

  /** No documentation provided. */
  protected _body_get_collision_priority(body: RID): float

  /** No documentation provided. */
  protected _body_get_constant_force(body: RID): Vector3

  /** No documentation provided. */
  protected _body_get_constant_torque(body: RID): Vector3

  /** No documentation provided. */
  protected _body_get_contacts_reported_depth_threshold(body: RID): float

  /** No documentation provided. */
  protected _body_get_direct_state(body: RID): PhysicsDirectBodyState3D

  /** No documentation provided. */
  protected _body_get_max_contacts_reported(body: RID): int

  /** No documentation provided. */
  protected _body_get_mode(body: RID): int

  /** No documentation provided. */
  protected _body_get_object_instance_id(body: RID): int

  /** No documentation provided. */
  protected _body_get_param(body: RID, param: int): any

  /** No documentation provided. */
  protected _body_get_shape(body: RID, shape_idx: int): RID

  /** No documentation provided. */
  protected _body_get_shape_count(body: RID): int

  /** No documentation provided. */
  protected _body_get_shape_transform(body: RID, shape_idx: int): Transform3D

  /** No documentation provided. */
  protected _body_get_space(body: RID): RID

  /** No documentation provided. */
  protected _body_get_state(body: RID, state: int): any

  /** No documentation provided. */
  protected _body_get_user_flags(body: RID): int

  /** No documentation provided. */
  protected _body_is_axis_locked(body: RID, axis: int): boolean

  /** No documentation provided. */
  protected _body_is_continuous_collision_detection_enabled(body: RID): boolean

  /** No documentation provided. */
  protected _body_is_omitting_force_integration(body: RID): boolean

  /** No documentation provided. */
  protected _body_remove_collision_exception(
    body: RID,
    excepted_body: RID
  ): void

  /** No documentation provided. */
  protected _body_remove_shape(body: RID, shape_idx: int): void

  /** No documentation provided. */
  protected _body_reset_mass_properties(body: RID): void

  /** No documentation provided. */
  protected _body_set_axis_lock(body: RID, axis: int, lock: boolean): void

  /** No documentation provided. */
  protected _body_set_axis_velocity(body: RID, axis_velocity: Vector3): void

  /** No documentation provided. */
  protected _body_set_collision_layer(body: RID, layer: int): void

  /** No documentation provided. */
  protected _body_set_collision_mask(body: RID, mask: int): void

  /** No documentation provided. */
  protected _body_set_collision_priority(body: RID, priority: float): void

  /** No documentation provided. */
  protected _body_set_constant_force(body: RID, force: Vector3): void

  /** No documentation provided. */
  protected _body_set_constant_torque(body: RID, torque: Vector3): void

  /** No documentation provided. */
  protected _body_set_contacts_reported_depth_threshold(
    body: RID,
    threshold: float
  ): void

  /** No documentation provided. */
  protected _body_set_enable_continuous_collision_detection(
    body: RID,
    enable: boolean
  ): void

  /** No documentation provided. */
  protected _body_set_force_integration_callback(
    body: RID,
    callable: Callable,
    userdata: any
  ): void

  /** No documentation provided. */
  protected _body_set_max_contacts_reported(body: RID, amount: int): void

  /** No documentation provided. */
  protected _body_set_mode(body: RID, mode: int): void

  /** No documentation provided. */
  protected _body_set_omit_force_integration(body: RID, enable: boolean): void

  /** No documentation provided. */
  protected _body_set_param(body: RID, param: int, value: any): void

  /** No documentation provided. */
  protected _body_set_ray_pickable(body: RID, enable: boolean): void

  /** No documentation provided. */
  protected _body_set_shape(body: RID, shape_idx: int, shape: RID): void

  /** No documentation provided. */
  protected _body_set_shape_disabled(
    body: RID,
    shape_idx: int,
    disabled: boolean
  ): void

  /** No documentation provided. */
  protected _body_set_shape_transform(
    body: RID,
    shape_idx: int,
    transform: Transform3D
  ): void

  /** No documentation provided. */
  protected _body_set_space(body: RID, space: RID): void

  /** No documentation provided. */
  protected _body_set_state(body: RID, state: int, value: any): void

  /** No documentation provided. */
  protected _body_set_state_sync_callback(body: RID, callable: Callable): void

  /** No documentation provided. */
  protected _body_set_user_flags(body: RID, flags: int): void

  /** No documentation provided. */
  protected _body_test_motion(
    body: RID,
    from: Transform3D,
    motion: Vector3,
    margin: float,
    max_collisions: int,
    collide_separation_ray: boolean,
    recovery_as_collision: boolean,
    result: CPointer
  ): boolean

  /** No documentation provided. */
  protected _box_shape_create(): RID

  /** No documentation provided. */
  protected _capsule_shape_create(): RID

  /** No documentation provided. */
  protected _concave_polygon_shape_create(): RID

  /** No documentation provided. */
  protected _cone_twist_joint_get_param(joint: RID, param: int): float

  /** No documentation provided. */
  protected _cone_twist_joint_set_param(
    joint: RID,
    param: int,
    value: float
  ): void

  /** No documentation provided. */
  protected _convex_polygon_shape_create(): RID

  /** No documentation provided. */
  protected _custom_shape_create(): RID

  /** No documentation provided. */
  protected _cylinder_shape_create(): RID

  /** No documentation provided. */
  protected _end_sync(): void

  /** No documentation provided. */
  protected _finish(): void

  /** No documentation provided. */
  protected _flush_queries(): void

  /** No documentation provided. */
  protected _free_rid(rid: RID): void

  /** No documentation provided. */
  protected _generic_6dof_joint_get_flag(
    joint: RID,
    axis: int,
    flag: int
  ): boolean

  /** No documentation provided. */
  protected _generic_6dof_joint_get_param(
    joint: RID,
    axis: int,
    param: int
  ): float

  /** No documentation provided. */
  protected _generic_6dof_joint_set_flag(
    joint: RID,
    axis: int,
    flag: int,
    enable: boolean
  ): void

  /** No documentation provided. */
  protected _generic_6dof_joint_set_param(
    joint: RID,
    axis: int,
    param: int,
    value: float
  ): void

  /** No documentation provided. */
  protected _get_process_info(process_info: int): int

  /** No documentation provided. */
  protected _heightmap_shape_create(): RID

  /** No documentation provided. */
  protected _hinge_joint_get_flag(joint: RID, flag: int): boolean

  /** No documentation provided. */
  protected _hinge_joint_get_param(joint: RID, param: int): float

  /** No documentation provided. */
  protected _hinge_joint_set_flag(joint: RID, flag: int, enabled: boolean): void

  /** No documentation provided. */
  protected _hinge_joint_set_param(joint: RID, param: int, value: float): void

  /** No documentation provided. */
  protected _init(): void

  /** No documentation provided. */
  protected _is_flushing_queries(): boolean

  /** No documentation provided. */
  protected _joint_clear(joint: RID): void

  /** No documentation provided. */
  protected _joint_create(): RID

  /** No documentation provided. */
  protected _joint_disable_collisions_between_bodies(
    joint: RID,
    disable: boolean
  ): void

  /** No documentation provided. */
  protected _joint_get_solver_priority(joint: RID): int

  /** No documentation provided. */
  protected _joint_get_type(joint: RID): int

  /** No documentation provided. */
  protected _joint_is_disabled_collisions_between_bodies(joint: RID): boolean

  /** No documentation provided. */
  protected _joint_make_cone_twist(
    joint: RID,
    body_A: RID,
    local_ref_A: Transform3D,
    body_B: RID,
    local_ref_B: Transform3D
  ): void

  /** No documentation provided. */
  protected _joint_make_generic_6dof(
    joint: RID,
    body_A: RID,
    local_ref_A: Transform3D,
    body_B: RID,
    local_ref_B: Transform3D
  ): void

  /** No documentation provided. */
  protected _joint_make_hinge(
    joint: RID,
    body_A: RID,
    hinge_A: Transform3D,
    body_B: RID,
    hinge_B: Transform3D
  ): void

  /** No documentation provided. */
  protected _joint_make_hinge_simple(
    joint: RID,
    body_A: RID,
    pivot_A: Vector3,
    axis_A: Vector3,
    body_B: RID,
    pivot_B: Vector3,
    axis_B: Vector3
  ): void

  /** No documentation provided. */
  protected _joint_make_pin(
    joint: RID,
    body_A: RID,
    local_A: Vector3,
    body_B: RID,
    local_B: Vector3
  ): void

  /** No documentation provided. */
  protected _joint_make_slider(
    joint: RID,
    body_A: RID,
    local_ref_A: Transform3D,
    body_B: RID,
    local_ref_B: Transform3D
  ): void

  /** No documentation provided. */
  protected _joint_set_solver_priority(joint: RID, priority: int): void

  /** No documentation provided. */
  protected _pin_joint_get_local_a(joint: RID): Vector3

  /** No documentation provided. */
  protected _pin_joint_get_local_b(joint: RID): Vector3

  /** No documentation provided. */
  protected _pin_joint_get_param(joint: RID, param: int): float

  /** No documentation provided. */
  protected _pin_joint_set_local_a(joint: RID, local_A: Vector3): void

  /** No documentation provided. */
  protected _pin_joint_set_local_b(joint: RID, local_B: Vector3): void

  /** No documentation provided. */
  protected _pin_joint_set_param(joint: RID, param: int, value: float): void

  /** No documentation provided. */
  protected _separation_ray_shape_create(): RID

  /** No documentation provided. */
  protected _set_active(active: boolean): void

  /** No documentation provided. */
  protected _shape_get_custom_solver_bias(shape: RID): float

  /** No documentation provided. */
  protected _shape_get_data(shape: RID): any

  /** No documentation provided. */
  protected _shape_get_margin(shape: RID): float

  /** No documentation provided. */
  protected _shape_get_type(shape: RID): int

  /** No documentation provided. */
  protected _shape_set_custom_solver_bias(shape: RID, bias: float): void

  /** No documentation provided. */
  protected _shape_set_data(shape: RID, data: any): void

  /** No documentation provided. */
  protected _shape_set_margin(shape: RID, margin: float): void

  /** No documentation provided. */
  protected _slider_joint_get_param(joint: RID, param: int): float

  /** No documentation provided. */
  protected _slider_joint_set_param(joint: RID, param: int, value: float): void

  /** No documentation provided. */
  protected _soft_body_add_collision_exception(body: RID, body_b: RID): void

  /** No documentation provided. */
  protected _soft_body_apply_central_force(body: RID, force: Vector3): void

  /** No documentation provided. */
  protected _soft_body_apply_central_impulse(body: RID, impulse: Vector3): void

  /** No documentation provided. */
  protected _soft_body_apply_point_force(
    body: RID,
    point_index: int,
    force: Vector3
  ): void

  /** No documentation provided. */
  protected _soft_body_apply_point_impulse(
    body: RID,
    point_index: int,
    impulse: Vector3
  ): void

  /** No documentation provided. */
  protected _soft_body_create(): RID

  /** No documentation provided. */
  protected _soft_body_get_bounds(body: RID): AABB

  /** No documentation provided. */
  protected _soft_body_get_collision_exceptions(body: RID): RID[]

  /** No documentation provided. */
  protected _soft_body_get_collision_layer(body: RID): int

  /** No documentation provided. */
  protected _soft_body_get_collision_mask(body: RID): int

  /** No documentation provided. */
  protected _soft_body_get_damping_coefficient(body: RID): float

  /** No documentation provided. */
  protected _soft_body_get_drag_coefficient(body: RID): float

  /** No documentation provided. */
  protected _soft_body_get_linear_stiffness(body: RID): float

  /** No documentation provided. */
  protected _soft_body_get_point_global_position(
    body: RID,
    point_index: int
  ): Vector3

  /** No documentation provided. */
  protected _soft_body_get_pressure_coefficient(body: RID): float

  /** No documentation provided. */
  protected _soft_body_get_shrinking_factor(body: RID): float

  /** No documentation provided. */
  protected _soft_body_get_simulation_precision(body: RID): int

  /** No documentation provided. */
  protected _soft_body_get_space(body: RID): RID

  /** No documentation provided. */
  protected _soft_body_get_state(body: RID, state: int): any

  /** No documentation provided. */
  protected _soft_body_get_total_mass(body: RID): float

  /** No documentation provided. */
  protected _soft_body_is_point_pinned(body: RID, point_index: int): boolean

  /** No documentation provided. */
  protected _soft_body_move_point(
    body: RID,
    point_index: int,
    global_position: Vector3
  ): void

  /** No documentation provided. */
  protected _soft_body_pin_point(
    body: RID,
    point_index: int,
    pin: boolean
  ): void

  /** No documentation provided. */
  protected _soft_body_remove_all_pinned_points(body: RID): void

  /** No documentation provided. */
  protected _soft_body_remove_collision_exception(body: RID, body_b: RID): void

  /** No documentation provided. */
  protected _soft_body_set_collision_layer(body: RID, layer: int): void

  /** No documentation provided. */
  protected _soft_body_set_collision_mask(body: RID, mask: int): void

  /** No documentation provided. */
  protected _soft_body_set_damping_coefficient(
    body: RID,
    damping_coefficient: float
  ): void

  /** No documentation provided. */
  protected _soft_body_set_drag_coefficient(
    body: RID,
    drag_coefficient: float
  ): void

  /** No documentation provided. */
  protected _soft_body_set_linear_stiffness(
    body: RID,
    linear_stiffness: float
  ): void

  /** No documentation provided. */
  protected _soft_body_set_mesh(body: RID, mesh: RID): void

  /** No documentation provided. */
  protected _soft_body_set_pressure_coefficient(
    body: RID,
    pressure_coefficient: float
  ): void

  /** No documentation provided. */
  protected _soft_body_set_ray_pickable(body: RID, enable: boolean): void

  /** No documentation provided. */
  protected _soft_body_set_shrinking_factor(
    body: RID,
    shrinking_factor: float
  ): void

  /** No documentation provided. */
  protected _soft_body_set_simulation_precision(
    body: RID,
    simulation_precision: int
  ): void

  /** No documentation provided. */
  protected _soft_body_set_space(body: RID, space: RID): void

  /** No documentation provided. */
  protected _soft_body_set_state(body: RID, state: int, variant: any): void

  /** No documentation provided. */
  protected _soft_body_set_total_mass(body: RID, total_mass: float): void

  /** No documentation provided. */
  protected _soft_body_set_transform(body: RID, transform: Transform3D): void

  /** No documentation provided. */
  protected _soft_body_update_rendering_server(
    body: RID,
    rendering_server_handler: PhysicsServer3DRenderingServerHandler
  ): void

  /** No documentation provided. */
  protected _space_create(): RID

  /** No documentation provided. */
  protected _space_get_contact_count(space: RID): int

  /** No documentation provided. */
  protected _space_get_contacts(space: RID): PackedVector3Array

  /** No documentation provided. */
  protected _space_get_direct_state(space: RID): PhysicsDirectSpaceState3D

  /** No documentation provided. */
  protected _space_get_param(space: RID, param: int): float

  /** No documentation provided. */
  protected _space_is_active(space: RID): boolean

  /** No documentation provided. */
  protected _space_set_active(space: RID, active: boolean): void

  /** No documentation provided. */
  protected _space_set_debug_contacts(space: RID, max_contacts: int): void

  /** No documentation provided. */
  protected _space_set_param(space: RID, param: int, value: float): void

  /** No documentation provided. */
  protected _sphere_shape_create(): RID

  /** No documentation provided. */
  protected _step(step: float): void

  /** No documentation provided. */
  protected _sync(): void

  /** No documentation provided. */
  protected _world_boundary_shape_create(): RID

  /** No documentation provided. */
  body_test_motion_is_excluding_body(body: RID): boolean

  /** No documentation provided. */
  body_test_motion_is_excluding_object(object: int): boolean

  connect<T extends SignalsOf<PhysicsServer3DExtension>>(
    signal: T,
    method: SignalFunction<PhysicsServer3DExtension[T]>
  ): number
}
