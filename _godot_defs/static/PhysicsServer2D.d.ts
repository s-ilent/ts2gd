/**
 * PhysicsServer2D is the server responsible for all 2D physics. It can directly create and manipulate all physics objects:
 *
 * - A **space** is a self-contained world for a physics simulation. It contains bodies, areas, and joints. Its state can be queried for collision and intersection information, and several parameters of the simulation can be modified.
 *
 * - A **shape** is a geometric shape such as a circle, a rectangle, a capsule, or a polygon. It can be used for collision detection by adding it to a body/area, possibly with an extra transformation relative to the body/area's origin. Bodies/areas can have multiple (transformed) shapes added to them, and a single shape can be added to bodies/areas multiple times with different local transformations.
 *
 * - A **body** is a physical object which can be in static, kinematic, or rigid mode. Its state (such as position and velocity) can be queried and updated. A force integration callback can be set to customize the body's physics.
 *
 * - An **area** is a region in space which can be used to detect bodies and areas entering and exiting it. A body monitoring callback can be set to report entering/exiting body shapes, and similarly an area monitoring callback can be set. Gravity and damping can be overridden within the area by setting area parameters.
 *
 * - A **joint** is a constraint, either between two bodies or on one body relative to a point. Parameters such as the joint bias and the rest length of a spring joint can be adjusted.
 *
 * Physics objects in [PhysicsServer2D] may be created and manipulated independently; they do not have to be tied to nodes in the scene tree.
 *
 * **Note:** All the 2D physics nodes use the physics server internally. Adding a physics node to the scene tree will cause a corresponding physics object to be created in the physics server. A rigid body node registers a callback that updates the node's transform with the transform of the respective body object in the physics server (every physics update). An area node registers a callback to inform the area node about overlaps with the respective area object in the physics server. The raycast node queries the direct state of the relevant space in the physics server.
 *
 */
declare class PhysicsServer2DClass extends Object {
  /**
   * PhysicsServer2D is the server responsible for all 2D physics. It can directly create and manipulate all physics objects:
   *
   * - A **space** is a self-contained world for a physics simulation. It contains bodies, areas, and joints. Its state can be queried for collision and intersection information, and several parameters of the simulation can be modified.
   *
   * - A **shape** is a geometric shape such as a circle, a rectangle, a capsule, or a polygon. It can be used for collision detection by adding it to a body/area, possibly with an extra transformation relative to the body/area's origin. Bodies/areas can have multiple (transformed) shapes added to them, and a single shape can be added to bodies/areas multiple times with different local transformations.
   *
   * - A **body** is a physical object which can be in static, kinematic, or rigid mode. Its state (such as position and velocity) can be queried and updated. A force integration callback can be set to customize the body's physics.
   *
   * - An **area** is a region in space which can be used to detect bodies and areas entering and exiting it. A body monitoring callback can be set to report entering/exiting body shapes, and similarly an area monitoring callback can be set. Gravity and damping can be overridden within the area by setting area parameters.
   *
   * - A **joint** is a constraint, either between two bodies or on one body relative to a point. Parameters such as the joint bias and the rest length of a spring joint can be adjusted.
   *
   * Physics objects in [PhysicsServer2D] may be created and manipulated independently; they do not have to be tied to nodes in the scene tree.
   *
   * **Note:** All the 2D physics nodes use the physics server internally. Adding a physics node to the scene tree will cause a corresponding physics object to be created in the physics server. A rigid body node registers a callback that updates the node's transform with the transform of the respective body object in the physics server (every physics update). An area node registers a callback to inform the area node about overlaps with the respective area object in the physics server. The raycast node queries the direct state of the relevant space in the physics server.
   *
   */
  new(): PhysicsServer2DClass
  constructor()
  static new(): PhysicsServer2DClass

  /** Adds a shape to the area, with the given local transform. The shape (together with its [param transform] and [param disabled] properties) is added to an array of shapes, and the shapes of an area are usually referenced by their index in this array. */
  area_add_shape(
    area: RID,
    shape: RID,
    transform?: Transform2D,
    disabled?: boolean
  ): void

  /** Attaches the [code]ObjectID[/code] of a canvas to the area. Use [method Object.get_instance_id] to get the [code]ObjectID[/code] of a [CanvasLayer]. */
  area_attach_canvas_instance_id(area: RID, id: int): void

  /** Attaches the [code]ObjectID[/code] of an [Object] to the area. Use [method Object.get_instance_id] to get the [code]ObjectID[/code] of a [CollisionObject2D]. */
  area_attach_object_instance_id(area: RID, id: int): void

  /** Removes all shapes from the area. This does not delete the shapes themselves, so they can continue to be used elsewhere or added back later. */
  area_clear_shapes(area: RID): void

  /**
   * Creates a 2D area object in the physics server, and returns the [RID] that identifies it. The default settings for the created area include a collision layer and mask set to `1`, and `monitorable` set to `false`.
   *
   * Use [method area_add_shape] to add shapes to it, use [method area_set_transform] to set its transform, and use [method area_set_space] to add the area to a space. If you want the area to be detectable use [method area_set_monitorable].
   *
   */
  area_create(): RID

  /** Returns the [code]ObjectID[/code] of the canvas attached to the area. Use [method @GlobalScope.instance_from_id] to retrieve a [CanvasLayer] from a nonzero [code]ObjectID[/code]. */
  area_get_canvas_instance_id(area: RID): int

  /** Returns the physics layer or layers the area belongs to, as a bitmask. */
  area_get_collision_layer(area: RID): int

  /** Returns the physics layer or layers the area can contact with, as a bitmask. */
  area_get_collision_mask(area: RID): int

  /** Returns the [code]ObjectID[/code] attached to the area. Use [method @GlobalScope.instance_from_id] to retrieve an [Object] from a nonzero [code]ObjectID[/code]. */
  area_get_object_instance_id(area: RID): int

  /** Returns the value of the given area parameter. */
  area_get_param(area: RID, param: int): any

  /** Returns the [RID] of the shape with the given index in the area's array of shapes. */
  area_get_shape(area: RID, shape_idx: int): RID

  /** Returns the number of shapes added to the area. */
  area_get_shape_count(area: RID): int

  /** Returns the local transform matrix of the shape with the given index in the area's array of shapes. */
  area_get_shape_transform(area: RID, shape_idx: int): Transform2D

  /** Returns the [RID] of the space assigned to the area. Returns an empty [RID] if no space is assigned. */
  area_get_space(area: RID): RID

  /** Returns the transform matrix of the area. */
  area_get_transform(area: RID): Transform2D

  /** Removes the shape with the given index from the area's array of shapes. The shape itself is not deleted, so it can continue to be used elsewhere or added back later. As a result of this operation, the area's shapes which used to have indices higher than [param shape_idx] will have their index decreased by one. */
  area_remove_shape(area: RID, shape_idx: int): void

  /**
   * Sets the area's area monitor callback. This callback will be called when any other (shape of an) area enters or exits (a shape of) the given area, and must take the following five parameters:
   *
   * 1. an integer `status`: either [constant AREA_BODY_ADDED] or [constant AREA_BODY_REMOVED] depending on whether the other area's shape entered or exited the area,
   *
   * 2. an [RID] `area_rid`: the [RID] of the other area that entered or exited the area,
   *
   * 3. an integer `instance_id`: the `ObjectID` attached to the other area,
   *
   * 4. an integer `area_shape_idx`: the index of the shape of the other area that entered or exited the area,
   *
   * 5. an integer `self_shape_idx`: the index of the shape of the area where the other area entered or exited.
   *
   * By counting (or keeping track of) the shapes that enter and exit, it can be determined if an area (with all its shapes) is entering for the first time or exiting for the last time.
   *
   */
  area_set_area_monitor_callback(area: RID, callback: Callable): void

  /** Assigns the area to one or many physics layers, via a bitmask. */
  area_set_collision_layer(area: RID, layer: int): void

  /** Sets which physics layers the area will monitor, via a bitmask. */
  area_set_collision_mask(area: RID, mask: int): void

  /**
   * Sets the area's body monitor callback. This callback will be called when any other (shape of a) body enters or exits (a shape of) the given area, and must take the following five parameters:
   *
   * 1. an integer `status`: either [constant AREA_BODY_ADDED] or [constant AREA_BODY_REMOVED] depending on whether the other body shape entered or exited the area,
   *
   * 2. an [RID] `body_rid`: the [RID] of the body that entered or exited the area,
   *
   * 3. an integer `instance_id`: the `ObjectID` attached to the body,
   *
   * 4. an integer `body_shape_idx`: the index of the shape of the body that entered or exited the area,
   *
   * 5. an integer `self_shape_idx`: the index of the shape of the area where the body entered or exited.
   *
   * By counting (or keeping track of) the shapes that enter and exit, it can be determined if a body (with all its shapes) is entering for the first time or exiting for the last time.
   *
   */
  area_set_monitor_callback(area: RID, callback: Callable): void

  /** Sets whether the area is monitorable or not. If [param monitorable] is [code]true[/code], the area monitoring callback of other areas will be called when this area enters or exits them. */
  area_set_monitorable(area: RID, monitorable: boolean): void

  /** Sets the value of the given area parameter. */
  area_set_param(area: RID, param: int, value: any): void

  /** Replaces the area's shape at the given index by another shape, while not affecting the [code]transform[/code] and [code]disabled[/code] properties at the same index. */
  area_set_shape(area: RID, shape_idx: int, shape: RID): void

  /** Sets the disabled property of the area's shape with the given index. If [param disabled] is [code]true[/code], then the shape will not detect any other shapes entering or exiting it. */
  area_set_shape_disabled(area: RID, shape_idx: int, disabled: boolean): void

  /** Sets the local transform matrix of the area's shape with the given index. */
  area_set_shape_transform(
    area: RID,
    shape_idx: int,
    transform: Transform2D
  ): void

  /**
   * Adds the area to the given space, after removing the area from the previously assigned space (if any).
   *
   * **Note:** To remove an area from a space without immediately adding it back elsewhere, use `PhysicsServer2D.area_set_space(area, RID())`.
   *
   */
  area_set_space(area: RID, space: RID): void

  /** Sets the transform matrix of the area. */
  area_set_transform(area: RID, transform: Transform2D): void

  /** Adds [param excepted_body] to the body's list of collision exceptions, so that collisions with it are ignored. */
  body_add_collision_exception(body: RID, excepted_body: RID): void

  /**
   * Adds a constant directional force to the body. The force does not affect rotation. The force remains applied over time until cleared with `PhysicsServer2D.body_set_constant_force(body, Vector2(0, 0))`.
   *
   * This is equivalent to using [method body_add_constant_force] at the body's center of mass.
   *
   */
  body_add_constant_central_force(body: RID, force: Vector2): void

  /**
   * Adds a constant positioned force to the body. The force can affect rotation if [param position] is different from the body's center of mass. The force remains applied over time until cleared with `PhysicsServer2D.body_set_constant_force(body, Vector2(0, 0))`.
   *
   * [param position] is the offset from the body origin in global coordinates.
   *
   */
  body_add_constant_force(body: RID, force: Vector2, position?: Vector2): void

  /** Adds a constant rotational force to the body. The force does not affect position. The force remains applied over time until cleared with [code]PhysicsServer2D.body_set_constant_torque(body, 0)[/code]. */
  body_add_constant_torque(body: RID, torque: float): void

  /** Adds a shape to the area, with the given local transform. The shape (together with its [param transform] and [param disabled] properties) is added to an array of shapes, and the shapes of a body are usually referenced by their index in this array. */
  body_add_shape(
    body: RID,
    shape: RID,
    transform?: Transform2D,
    disabled?: boolean
  ): void

  /**
   * Applies a directional force to the body, at the body's center of mass. The force does not affect rotation. A force is time dependent and meant to be applied every physics update.
   *
   * This is equivalent to using [method body_apply_force] at the body's center of mass.
   *
   */
  body_apply_central_force(body: RID, force: Vector2): void

  /**
   * Applies a directional impulse to the body, at the body's center of mass. The impulse does not affect rotation.
   *
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   *
   * This is equivalent to using [method body_apply_impulse] at the body's center of mass.
   *
   */
  body_apply_central_impulse(body: RID, impulse: Vector2): void

  /**
   * Applies a positioned force to the body. The force can affect rotation if [param position] is different from the body's center of mass. A force is time dependent and meant to be applied every physics update.
   *
   * [param position] is the offset from the body origin in global coordinates.
   *
   */
  body_apply_force(body: RID, force: Vector2, position?: Vector2): void

  /**
   * Applies a positioned impulse to the body. The impulse can affect rotation if [param position] is different from the body's center of mass.
   *
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   *
   * [param position] is the offset from the body origin in global coordinates.
   *
   */
  body_apply_impulse(body: RID, impulse: Vector2, position?: Vector2): void

  /** Applies a rotational force to the body. The force does not affect position. A force is time dependent and meant to be applied every physics update. */
  body_apply_torque(body: RID, torque: float): void

  /**
   * Applies a rotational impulse to the body. The impulse does not affect position.
   *
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   *
   */
  body_apply_torque_impulse(body: RID, impulse: float): void

  /** Attaches the [code]ObjectID[/code] of a canvas to the body. Use [method Object.get_instance_id] to get the [code]ObjectID[/code] of a [CanvasLayer]. */
  body_attach_canvas_instance_id(body: RID, id: int): void

  /** Attaches the [code]ObjectID[/code] of an [Object] to the body. Use [method Object.get_instance_id] to get the [code]ObjectID[/code] of a [CollisionObject2D]. */
  body_attach_object_instance_id(body: RID, id: int): void

  /** Removes all shapes from the body. This does not delete the shapes themselves, so they can continue to be used elsewhere or added back later. */
  body_clear_shapes(body: RID): void

  /**
   * Creates a 2D body object in the physics server, and returns the [RID] that identifies it. The default settings for the created area include a collision layer and mask set to `1`, and body mode set to [constant BODY_MODE_RIGID].
   *
   * Use [method body_add_shape] to add shapes to it, use [method body_set_state] to set its transform, and use [method body_set_space] to add the body to a space.
   *
   */
  body_create(): RID

  /** Returns the [code]ObjectID[/code] of the canvas attached to the body. Use [method @GlobalScope.instance_from_id] to retrieve a [CanvasLayer] from a nonzero [code]ObjectID[/code]. */
  body_get_canvas_instance_id(body: RID): int

  /** Returns the physics layer or layers the body belongs to, as a bitmask. */
  body_get_collision_layer(body: RID): int

  /** Returns the physics layer or layers the body can collide with, as a bitmask. */
  body_get_collision_mask(body: RID): int

  /** Returns the body's collision priority. This is used in the depenetration phase of [method body_test_motion]. The higher the priority is, the lower the penetration into the body will be. */
  body_get_collision_priority(body: RID): float

  /**
   * Returns the body's total constant positional force applied during each physics update.
   *
   * See [method body_add_constant_force] and [method body_add_constant_central_force].
   *
   */
  body_get_constant_force(body: RID): Vector2

  /**
   * Returns the body's total constant rotational force applied during each physics update.
   *
   * See [method body_add_constant_torque].
   *
   */
  body_get_constant_torque(body: RID): float

  /** Returns the body's continuous collision detection mode. */
  body_get_continuous_collision_detection_mode(body: RID): int

  /** Returns the [PhysicsDirectBodyState2D] of the body. Returns [code]null[/code] if the body is destroyed or not assigned to a space. */
  body_get_direct_state(body: RID): PhysicsDirectBodyState2D

  /** Returns the maximum number of contacts that the body can report. See [method body_set_max_contacts_reported]. */
  body_get_max_contacts_reported(body: RID): int

  /** Returns the body's mode. */
  body_get_mode(body: RID): int

  /** Returns the [code]ObjectID[/code] attached to the body. Use [method @GlobalScope.instance_from_id] to retrieve an [Object] from a nonzero [code]ObjectID[/code]. */
  body_get_object_instance_id(body: RID): int

  /** Returns the value of the given body parameter. */
  body_get_param(body: RID, param: int): any

  /** Returns the [RID] of the shape with the given index in the body's array of shapes. */
  body_get_shape(body: RID, shape_idx: int): RID

  /** Returns the number of shapes added to the body. */
  body_get_shape_count(body: RID): int

  /** Returns the local transform matrix of the shape with the given index in the area's array of shapes. */
  body_get_shape_transform(body: RID, shape_idx: int): Transform2D

  /** Returns the [RID] of the space assigned to the body. Returns an empty [RID] if no space is assigned. */
  body_get_space(body: RID): RID

  /** Returns the value of the given state of the body. */
  body_get_state(body: RID, state: int): any

  /** Returns [code]true[/code] if the body is omitting the standard force integration. See [method body_set_omit_force_integration]. */
  body_is_omitting_force_integration(body: RID): boolean

  /** Removes [param excepted_body] from the body's list of collision exceptions, so that collisions with it are no longer ignored. */
  body_remove_collision_exception(body: RID, excepted_body: RID): void

  /** Removes the shape with the given index from the body's array of shapes. The shape itself is not deleted, so it can continue to be used elsewhere or added back later. As a result of this operation, the body's shapes which used to have indices higher than [param shape_idx] will have their index decreased by one. */
  body_remove_shape(body: RID, shape_idx: int): void

  /** Restores the default inertia and center of mass of the body based on its shapes. This undoes any custom values previously set using [method body_set_param]. */
  body_reset_mass_properties(body: RID): void

  /** Modifies the body's linear velocity so that its projection to the axis [code]axis_velocity.normalized()[/code] is exactly [code]axis_velocity.length()[/code]. This is useful for jumping behavior. */
  body_set_axis_velocity(body: RID, axis_velocity: Vector2): void

  /** Sets the physics layer or layers the body belongs to, via a bitmask. */
  body_set_collision_layer(body: RID, layer: int): void

  /** Sets the physics layer or layers the body can collide with, via a bitmask. */
  body_set_collision_mask(body: RID, mask: int): void

  /** Sets the body's collision priority. This is used in the depenetration phase of [method body_test_motion]. The higher the priority is, the lower the penetration into the body will be. */
  body_set_collision_priority(body: RID, priority: float): void

  /**
   * Sets the body's total constant positional force applied during each physics update.
   *
   * See [method body_add_constant_force] and [method body_add_constant_central_force].
   *
   */
  body_set_constant_force(body: RID, force: Vector2): void

  /**
   * Sets the body's total constant rotational force applied during each physics update.
   *
   * See [method body_add_constant_torque].
   *
   */
  body_set_constant_torque(body: RID, torque: float): void

  /**
   * Sets the continuous collision detection mode.
   *
   * Continuous collision detection tries to predict where a moving body would collide in between physics updates, instead of moving it and correcting its movement if it collided.
   *
   */
  body_set_continuous_collision_detection_mode(body: RID, mode: int): void

  /**
   * Sets the body's custom force integration callback function to [param callable]. Use an empty [Callable] ([code skip-lint]Callable()`) to clear the custom callback.
   *
   * The function [param callable] will be called every physics tick, before the standard force integration (see [method body_set_omit_force_integration]). It can be used for example to update the body's linear and angular velocity based on contact with other bodies.
   *
   * If [param userdata] is not `null`, the function [param callable] must take the following two parameters:
   *
   * 1. `state`: a [PhysicsDirectBodyState2D] used to retrieve and modify the body's state,
   *
   * 2. [code skip-lint]userdata`: a [Variant]; its value will be the [param userdata] passed into this method.
   *
   * If [param userdata] is `null`, then [param callable] must take only the `state` parameter.
   *
   */
  body_set_force_integration_callback(
    body: RID,
    callable: Callable,
    userdata?: any
  ): void

  /** Sets the maximum number of contacts that the body can report. If [param amount] is greater than zero, then the body will keep track of at most this many contacts with other bodies. */
  body_set_max_contacts_reported(body: RID, amount: int): void

  /** Sets the body's mode. */
  body_set_mode(body: RID, mode: int): void

  /**
   * Sets whether the body omits the standard force integration. If [param enable] is `true`, the body will not automatically use applied forces, torques, and damping to update the body's linear and angular velocity. In this case, [method body_set_force_integration_callback] can be used to manually update the linear and angular velocity instead.
   *
   * This method is called when the property [member RigidBody2D.custom_integrator] is set.
   *
   */
  body_set_omit_force_integration(body: RID, enable: boolean): void

  /** Sets the value of the given body parameter. */
  body_set_param(body: RID, param: int, value: any): void

  /** Replaces the body's shape at the given index by another shape, while not affecting the [code]transform[/code], [code]disabled[/code], and one-way collision properties at the same index. */
  body_set_shape(body: RID, shape_idx: int, shape: RID): void

  /** Sets the one-way collision properties of the body's shape with the given index. If [param enable] is [code]true[/code], the one-way collision direction given by the shape's local upward axis [code]body_get_shape_transform(body, shape_idx).y[/code] will be used to ignore collisions with the shape in the opposite direction, and to ensure depenetration of kinematic bodies happens in this direction. */
  body_set_shape_as_one_way_collision(
    body: RID,
    shape_idx: int,
    enable: boolean,
    margin: float
  ): void

  /** Sets the disabled property of the body's shape with the given index. If [param disabled] is [code]true[/code], then the shape will be ignored in all collision detection. */
  body_set_shape_disabled(body: RID, shape_idx: int, disabled: boolean): void

  /** Sets the local transform matrix of the body's shape with the given index. */
  body_set_shape_transform(
    body: RID,
    shape_idx: int,
    transform: Transform2D
  ): void

  /**
   * Adds the body to the given space, after removing the body from the previously assigned space (if any). If the body's mode is set to [constant BODY_MODE_RIGID], then adding the body to a space will have the following additional effects:
   *
   * - If the parameter [constant BODY_PARAM_CENTER_OF_MASS] has never been set explicitly, then the value of that parameter will be recalculated based on the body's shapes.
   *
   * - If the parameter [constant BODY_PARAM_INERTIA] is set to a value `<= 0.0`, then the value of that parameter will be recalculated based on the body's shapes, mass, and center of mass.
   *
   * **Note:** To remove a body from a space without immediately adding it back elsewhere, use `PhysicsServer2D.body_set_space(body, RID())`.
   *
   */
  body_set_space(body: RID, space: RID): void

  /**
   * Sets the value of a body's state.
   *
   * **Note:** The state change doesn't take effect immediately. The state will change on the next physics frame.
   *
   */
  body_set_state(body: RID, state: int, value: any): void

  /**
   * Sets the body's state synchronization callback function to [param callable]. Use an empty [Callable] ([code skip-lint]Callable()`) to clear the callback.
   *
   * The function [param callable] will be called every physics frame, assuming that the body was active during the previous physics tick, and can be used to fetch the latest state from the physics server.
   *
   * The function [param callable] must take the following parameters:
   *
   * 1. `state`: a [PhysicsDirectBodyState2D], used to retrieve the body's state.
   *
   */
  body_set_state_sync_callback(body: RID, callable: Callable): void

  /** Returns [code]true[/code] if a collision would result from moving the body along a motion vector from a given point in space. See [PhysicsTestMotionParameters2D] for the available motion parameters. Optionally a [PhysicsTestMotionResult2D] object can be passed, which will be used to store the information about the resulting collision. */
  body_test_motion(
    body: RID,
    parameters: PhysicsTestMotionParameters2D,
    result?: PhysicsTestMotionResult2D
  ): boolean

  /** Creates a 2D capsule shape in the physics server, and returns the [RID] that identifies it. Use [method shape_set_data] to set the capsule's height and radius. */
  capsule_shape_create(): RID

  /** Creates a 2D circle shape in the physics server, and returns the [RID] that identifies it. Use [method shape_set_data] to set the circle's radius. */
  circle_shape_create(): RID

  /** Creates a 2D concave polygon shape in the physics server, and returns the [RID] that identifies it. Use [method shape_set_data] to set the concave polygon's segments. */
  concave_polygon_shape_create(): RID

  /** Creates a 2D convex polygon shape in the physics server, and returns the [RID] that identifies it. Use [method shape_set_data] to set the convex polygon's points. */
  convex_polygon_shape_create(): RID

  /** Returns the value of the given damped spring joint parameter. */
  damped_spring_joint_get_param(joint: RID, param: int): float

  /** Sets the value of the given damped spring joint parameter. */
  damped_spring_joint_set_param(joint: RID, param: int, value: float): void

  /** Destroys any of the objects created by PhysicsServer2D. If the [RID] passed is not one of the objects that can be created by PhysicsServer2D, an error will be printed to the console. */
  free_rid(rid: RID): void

  /** Returns the value of a physics engine state specified by [param process_info]. */
  get_process_info(process_info: int): int

  /** Destroys the joint with the given [RID], creates a new uninitialized joint, and makes the [RID] refer to this new joint. */
  joint_clear(joint: RID): void

  /** Creates a 2D joint in the physics server, and returns the [RID] that identifies it. To set the joint type, use [method joint_make_damped_spring], [method joint_make_groove] or [method joint_make_pin]. Use [method joint_set_param] to set generic joint parameters. */
  joint_create(): RID

  /** Sets whether the bodies attached to the [Joint2D] will collide with each other. */
  joint_disable_collisions_between_bodies(joint: RID, disable: boolean): void

  /** Returns the value of the given joint parameter. */
  joint_get_param(joint: RID, param: int): float

  /** Returns the joint's type. */
  joint_get_type(joint: RID): int

  /** Returns whether the bodies attached to the [Joint2D] will collide with each other. */
  joint_is_disabled_collisions_between_bodies(joint: RID): boolean

  /** Makes the joint a damped spring joint, attached at the point [param anchor_a] (given in global coordinates) on the body [param body_a] and at the point [param anchor_b] (given in global coordinates) on the body [param body_b]. To set the parameters which are specific to the damped spring, see [method damped_spring_joint_set_param]. */
  joint_make_damped_spring(
    joint: RID,
    anchor_a: Vector2,
    anchor_b: Vector2,
    body_a: RID,
    body_b?: RID
  ): void

  /** Makes the joint a groove joint. */
  joint_make_groove(
    joint: RID,
    groove1_a: Vector2,
    groove2_a: Vector2,
    anchor_b: Vector2,
    body_a?: RID,
    body_b?: RID
  ): void

  /** Makes the joint a pin joint. If [param body_b] is an empty [RID], then [param body_a] is pinned to the point [param anchor] (given in global coordinates); otherwise, [param body_a] is pinned to [param body_b] at the point [param anchor] (given in global coordinates). To set the parameters which are specific to the pin joint, see [method pin_joint_set_param]. */
  joint_make_pin(joint: RID, anchor: Vector2, body_a: RID, body_b?: RID): void

  /** Sets the value of the given joint parameter. */
  joint_set_param(joint: RID, param: int, value: float): void

  /** Gets a pin joint flag. */
  pin_joint_get_flag(joint: RID, flag: int): boolean

  /** Returns the value of a pin joint parameter. */
  pin_joint_get_param(joint: RID, param: int): float

  /** Sets a pin joint flag. */
  pin_joint_set_flag(joint: RID, flag: int, enabled: boolean): void

  /** Sets a pin joint parameter. */
  pin_joint_set_param(joint: RID, param: int, value: float): void

  /** Creates a 2D rectangle shape in the physics server, and returns the [RID] that identifies it. Use [method shape_set_data] to set the rectangle's half-extents. */
  rectangle_shape_create(): RID

  /** Creates a 2D segment shape in the physics server, and returns the [RID] that identifies it. Use [method shape_set_data] to set the segment's start and end points. */
  segment_shape_create(): RID

  /** Creates a 2D separation ray shape in the physics server, and returns the [RID] that identifies it. Use [method shape_set_data] to set the shape's [code]length[/code] and [code]slide_on_slope[/code] properties. */
  separation_ray_shape_create(): RID

  /** Activates or deactivates the 2D physics server. If [param active] is [code]false[/code], then the physics server will not do anything in its physics step. */
  set_active(active: boolean): void

  /** Returns the shape data that defines the configuration of the shape, such as the half-extents of a rectangle or the segments of a concave shape. See [method shape_set_data] for the precise format of this data in each case. */
  shape_get_data(shape: RID): any

  /** Returns the shape's type. */
  shape_get_type(shape: RID): int

  /**
   * Sets the shape data that defines the configuration of the shape. The [param data] to be passed depends on the shape's type (see [method shape_get_type]):
   *
   * - [constant SHAPE_WORLD_BOUNDARY]: an array of length two containing a [Vector2] `normal` direction and a [float] distance `d`,
   *
   * - [constant SHAPE_SEPARATION_RAY]: a dictionary containing the key `length` with a [float] value and the key `slide_on_slope` with a [bool] value,
   *
   * - [constant SHAPE_SEGMENT]: a [Rect2] `rect` containing the first point of the segment in `rect.position` and the second point of the segment in `rect.size`,
   *
   * - [constant SHAPE_CIRCLE]: a [float] `radius`,
   *
   * - [constant SHAPE_RECTANGLE]: a [Vector2] `half_extents`,
   *
   * - [constant SHAPE_CAPSULE]: an array of length two (or a [Vector2]) containing a [float] `height` and a [float] `radius`,
   *
   * - [constant SHAPE_CONVEX_POLYGON]: either a [PackedVector2Array] of points defining a convex polygon in counterclockwise order (the clockwise outward normal of each segment formed by consecutive points is calculated internally), or a [PackedFloat32Array] of length divisible by four so that every 4-tuple of [float]s contains the coordinates of a point followed by the coordinates of the clockwise outward normal vector to the segment between the current point and the next point,
   *
   * - [constant SHAPE_CONCAVE_POLYGON]: a [PackedVector2Array] of length divisible by two (each pair of points forms one segment).
   *
   * **Warning:** In the case of [constant SHAPE_CONVEX_POLYGON], this method does not check if the points supplied actually form a convex polygon (unlike the [member CollisionPolygon2D.polygon] property).
   *
   */
  shape_set_data(shape: RID, data: any): void

  /** Creates a 2D space in the physics server, and returns the [RID] that identifies it. A space contains bodies and areas, and controls the stepping of the physics simulation of the objects in it. */
  space_create(): RID

  /** Returns the state of a space, a [PhysicsDirectSpaceState2D]. This object can be used for collision/intersection queries. */
  space_get_direct_state(space: RID): PhysicsDirectSpaceState2D

  /** Returns the value of the given space parameter. */
  space_get_param(space: RID, param: int): float

  /** Returns [code]true[/code] if the space is active. */
  space_is_active(space: RID): boolean

  /** Activates or deactivates the space. If [param active] is [code]false[/code], then the physics server will not do anything with this space in its physics step. */
  space_set_active(space: RID, active: boolean): void

  /** Sets the value of the given space parameter. */
  space_set_param(space: RID, param: int, value: float): void

  /** Creates a 2D world boundary shape in the physics server, and returns the [RID] that identifies it. Use [method shape_set_data] to set the shape's normal direction and distance properties. */
  world_boundary_shape_create(): RID

  connect<T extends SignalsOf<PhysicsServer2DClass>>(
    signal: T,
    method: SignalFunction<PhysicsServer2DClass[T]>
  ): number

  /**
   * Constant to set/get the maximum distance a pair of bodies has to move before their collision status has to be recalculated. The default value of this parameter is [member ProjectSettings.physics/2d/solver/contact_recycle_radius].
   *
   */
  static SPACE_PARAM_CONTACT_RECYCLE_RADIUS: any

  /**
   * Constant to set/get the maximum distance a shape can be from another before they are considered separated and the contact is discarded. The default value of this parameter is [member ProjectSettings.physics/2d/solver/contact_max_separation].
   *
   */
  static SPACE_PARAM_CONTACT_MAX_SEPARATION: any

  /**
   * Constant to set/get the maximum distance a shape can penetrate another shape before it is considered a collision. The default value of this parameter is [member ProjectSettings.physics/2d/solver/contact_max_allowed_penetration].
   *
   */
  static SPACE_PARAM_CONTACT_MAX_ALLOWED_PENETRATION: any

  /**
   * Constant to set/get the default solver bias for all physics contacts. A solver bias is a factor controlling how much two objects "rebound", after overlapping, to avoid leaving them in that state because of numerical imprecision. The default value of this parameter is [member ProjectSettings.physics/2d/solver/default_contact_bias].
   *
   */
  static SPACE_PARAM_CONTACT_DEFAULT_BIAS: any

  /**
   * Constant to set/get the threshold linear velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given. The default value of this parameter is [member ProjectSettings.physics/2d/sleep_threshold_linear].
   *
   */
  static SPACE_PARAM_BODY_LINEAR_VELOCITY_SLEEP_THRESHOLD: any

  /**
   * Constant to set/get the threshold angular velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given. The default value of this parameter is [member ProjectSettings.physics/2d/sleep_threshold_angular].
   *
   */
  static SPACE_PARAM_BODY_ANGULAR_VELOCITY_SLEEP_THRESHOLD: any

  /**
   * Constant to set/get the maximum time of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after this time. The default value of this parameter is [member ProjectSettings.physics/2d/time_before_sleep].
   *
   */
  static SPACE_PARAM_BODY_TIME_TO_SLEEP: any

  /**
   * Constant to set/get the default solver bias for all physics constraints. A solver bias is a factor controlling how much two objects "rebound", after violating a constraint, to avoid leaving them in that state because of numerical imprecision. The default value of this parameter is [member ProjectSettings.physics/2d/solver/default_constraint_bias].
   *
   */
  static SPACE_PARAM_CONSTRAINT_DEFAULT_BIAS: any

  /**
   * Constant to set/get the number of solver iterations for all contacts and constraints. The greater the number of iterations, the more accurate the collisions will be. However, a greater number of iterations requires more CPU power, which can decrease performance. The default value of this parameter is [member ProjectSettings.physics/2d/solver/solver_iterations].
   *
   */
  static SPACE_PARAM_SOLVER_ITERATIONS: any

  /**
   * This is the constant for creating world boundary shapes. A world boundary shape is an **infinite** line with an origin point, and a normal. Thus, it can be used for front/behind checks.
   *
   */
  static SHAPE_WORLD_BOUNDARY: any

  /**
   * This is the constant for creating separation ray shapes. A separation ray is defined by a length and separates itself from what is touching its far endpoint. Useful for character controllers.
   *
   */
  static SHAPE_SEPARATION_RAY: any

  /**
   * This is the constant for creating segment shapes. A segment shape is a **finite** line from a point A to a point B. It can be checked for intersections.
   *
   */
  static SHAPE_SEGMENT: any

  /**
   * This is the constant for creating circle shapes. A circle shape only has a radius. It can be used for intersections and inside/outside checks.
   *
   */
  static SHAPE_CIRCLE: any

  /**
   * This is the constant for creating rectangle shapes. A rectangle shape is defined by a width and a height. It can be used for intersections and inside/outside checks.
   *
   */
  static SHAPE_RECTANGLE: any

  /**
   * This is the constant for creating capsule shapes. A capsule shape is defined by a radius and a length. It can be used for intersections and inside/outside checks.
   *
   */
  static SHAPE_CAPSULE: any

  /**
   * This is the constant for creating convex polygon shapes. A polygon is defined by a list of points. It can be used for intersections and inside/outside checks.
   *
   */
  static SHAPE_CONVEX_POLYGON: any

  /**
   * This is the constant for creating concave polygon shapes. A polygon is defined by a list of points. It can be used for intersections checks, but not for inside/outside checks.
   *
   */
  static SHAPE_CONCAVE_POLYGON: any

  /**
   * This constant is used internally by the engine. Any attempt to create this kind of shape results in an error.
   *
   */
  static SHAPE_CUSTOM: any

  /**
   * Constant to set/get gravity override mode in an area. See [enum AreaSpaceOverrideMode] for possible values. The default value of this parameter is [constant AREA_SPACE_OVERRIDE_DISABLED].
   *
   */
  static AREA_PARAM_GRAVITY_OVERRIDE_MODE: any

  /**
   * Constant to set/get gravity strength in an area. The default value of this parameter is `9.80665`.
   *
   */
  static AREA_PARAM_GRAVITY: any

  /**
   * Constant to set/get gravity vector/center in an area. The default value of this parameter is `Vector2(0, -1)`.
   *
   */
  static AREA_PARAM_GRAVITY_VECTOR: any

  /**
   * Constant to set/get whether the gravity vector of an area is a direction, or a center point. The default value of this parameter is `false`.
   *
   */
  static AREA_PARAM_GRAVITY_IS_POINT: any

  /**
   * Constant to set/get the distance at which the gravity strength is equal to the gravity controlled by [constant AREA_PARAM_GRAVITY]. For example, on a planet 100 pixels in radius with a surface gravity of 4.0 px/s², set the gravity to 4.0 and the unit distance to 100.0. The gravity will have falloff according to the inverse square law, so in the example, at 200 pixels from the center the gravity will be 1.0 px/s² (twice the distance, 1/4th the gravity), at 50 pixels it will be 16.0 px/s² (half the distance, 4x the gravity), and so on.
   *
   * The above is true only when the unit distance is a positive number. When the unit distance is set to 0.0, the gravity will be constant regardless of distance. The default value of this parameter is `0.0`.
   *
   */
  static AREA_PARAM_GRAVITY_POINT_UNIT_DISTANCE: any

  /**
   * Constant to set/get linear damping override mode in an area. See [enum AreaSpaceOverrideMode] for possible values. The default value of this parameter is [constant AREA_SPACE_OVERRIDE_DISABLED].
   *
   */
  static AREA_PARAM_LINEAR_DAMP_OVERRIDE_MODE: any

  /**
   * Constant to set/get the linear damping factor of an area. The default value of this parameter is `0.1`.
   *
   */
  static AREA_PARAM_LINEAR_DAMP: any

  /**
   * Constant to set/get angular damping override mode in an area. See [enum AreaSpaceOverrideMode] for possible values. The default value of this parameter is [constant AREA_SPACE_OVERRIDE_DISABLED].
   *
   */
  static AREA_PARAM_ANGULAR_DAMP_OVERRIDE_MODE: any

  /**
   * Constant to set/get the angular damping factor of an area. The default value of this parameter is `1.0`.
   *
   */
  static AREA_PARAM_ANGULAR_DAMP: any

  /**
   * Constant to set/get the priority (order of processing) of an area. The default value of this parameter is `0`.
   *
   */
  static AREA_PARAM_PRIORITY: any

  /**
   * This area does not affect gravity/damp. These are generally areas that exist only to detect collisions, and objects entering or exiting them.
   *
   */
  static AREA_SPACE_OVERRIDE_DISABLED: any

  /**
   * This area adds its gravity/damp values to whatever has been calculated so far. This way, many overlapping areas can combine their physics to make interesting effects.
   *
   */
  static AREA_SPACE_OVERRIDE_COMBINE: any

  /**
   * This area adds its gravity/damp values to whatever has been calculated so far. Then stops taking into account the rest of the areas, even the default one.
   *
   */
  static AREA_SPACE_OVERRIDE_COMBINE_REPLACE: any

  /**
   * This area replaces any gravity/damp, even the default one, and stops taking into account the rest of the areas.
   *
   */
  static AREA_SPACE_OVERRIDE_REPLACE: any

  /**
   * This area replaces any gravity/damp calculated so far, but keeps calculating the rest of the areas, down to the default one.
   *
   */
  static AREA_SPACE_OVERRIDE_REPLACE_COMBINE: any

  /**
   * Constant for static bodies. In this mode, a body can be only moved by user code and doesn't collide with other bodies along its path when moved.
   *
   */
  static BODY_MODE_STATIC: any

  /**
   * Constant for kinematic bodies. In this mode, a body can be only moved by user code and collides with other bodies along its path.
   *
   */
  static BODY_MODE_KINEMATIC: any

  /**
   * Constant for rigid bodies. In this mode, a body can be pushed by other bodies and has forces applied.
   *
   */
  static BODY_MODE_RIGID: any

  /**
   * Constant for linear rigid bodies. In this mode, a body can not rotate, and only its linear velocity is affected by external forces.
   *
   */
  static BODY_MODE_RIGID_LINEAR: any

  /**
   * Constant to set/get a body's bounce factor. The default value of this parameter is `0.0`.
   *
   */
  static BODY_PARAM_BOUNCE: any

  /**
   * Constant to set/get a body's friction. The default value of this parameter is `1.0`.
   *
   */
  static BODY_PARAM_FRICTION: any

  /**
   * Constant to set/get a body's mass. The default value of this parameter is `1.0`. If the body's mode is set to [constant BODY_MODE_RIGID], then setting this parameter will have the following additional effects:
   *
   * - If the parameter [constant BODY_PARAM_CENTER_OF_MASS] has never been set explicitly, then the value of that parameter will be recalculated based on the body's shapes.
   *
   * - If the parameter [constant BODY_PARAM_INERTIA] is set to a value `<= 0.0`, then the value of that parameter will be recalculated based on the body's shapes, mass, and center of mass.
   *
   */
  static BODY_PARAM_MASS: any

  /**
   * Constant to set/get a body's inertia. The default value of this parameter is `0.0`. If the body's inertia is set to a value `<= 0.0`, then the inertia will be recalculated based on the body's shapes, mass, and center of mass.
   *
   */
  static BODY_PARAM_INERTIA: any

  /**
   * Constant to set/get a body's center of mass position in the body's local coordinate system. The default value of this parameter is `Vector2(0, 0)`. If this parameter is never set explicitly, then it is recalculated based on the body's shapes when setting the parameter [constant BODY_PARAM_MASS] or when calling [method body_set_space].
   *
   */
  static BODY_PARAM_CENTER_OF_MASS: any

  /**
   * Constant to set/get a body's gravity multiplier. The default value of this parameter is `1.0`.
   *
   */
  static BODY_PARAM_GRAVITY_SCALE: any

  /**
   * Constant to set/get a body's linear damping mode. See [enum BodyDampMode] for possible values. The default value of this parameter is [constant BODY_DAMP_MODE_COMBINE].
   *
   */
  static BODY_PARAM_LINEAR_DAMP_MODE: any

  /**
   * Constant to set/get a body's angular damping mode. See [enum BodyDampMode] for possible values. The default value of this parameter is [constant BODY_DAMP_MODE_COMBINE].
   *
   */
  static BODY_PARAM_ANGULAR_DAMP_MODE: any

  /**
   * Constant to set/get a body's linear damping factor. The default value of this parameter is `0.0`.
   *
   */
  static BODY_PARAM_LINEAR_DAMP: any

  /**
   * Constant to set/get a body's angular damping factor. The default value of this parameter is `0.0`.
   *
   */
  static BODY_PARAM_ANGULAR_DAMP: any

  /**
   * Represents the size of the [enum BodyParameter] enum.
   *
   */
  static BODY_PARAM_MAX: any

  /**
   * The body's damping value is added to any value set in areas or the default value.
   *
   */
  static BODY_DAMP_MODE_COMBINE: any

  /**
   * The body's damping value replaces any value set in areas or the default value.
   *
   */
  static BODY_DAMP_MODE_REPLACE: any

  /**
   * Constant to set/get the current transform matrix of the body.
   *
   */
  static BODY_STATE_TRANSFORM: any

  /**
   * Constant to set/get the current linear velocity of the body.
   *
   */
  static BODY_STATE_LINEAR_VELOCITY: any

  /**
   * Constant to set/get the current angular velocity of the body.
   *
   */
  static BODY_STATE_ANGULAR_VELOCITY: any

  /**
   * Constant to sleep/wake up a body, or to get whether it is sleeping.
   *
   */
  static BODY_STATE_SLEEPING: any

  /**
   * Constant to set/get whether the body can sleep.
   *
   */
  static BODY_STATE_CAN_SLEEP: any

  /**
   * Constant to create pin joints.
   *
   */
  static JOINT_TYPE_PIN: any

  /**
   * Constant to create groove joints.
   *
   */
  static JOINT_TYPE_GROOVE: any

  /**
   * Constant to create damped spring joints.
   *
   */
  static JOINT_TYPE_DAMPED_SPRING: any

  /**
   * Represents the size of the [enum JointType] enum.
   *
   */
  static JOINT_TYPE_MAX: any

  /**
   * Constant to set/get how fast the joint pulls the bodies back to satisfy the joint constraint. The lower the value, the more the two bodies can pull on the joint. The default value of this parameter is `0.0`.
   *
   * **Note:** In Godot Physics, this parameter is only used for pin joints and groove joints.
   *
   */
  static JOINT_PARAM_BIAS: any

  /**
   * Constant to set/get the maximum speed with which the joint can apply corrections. The default value of this parameter is `3.40282e+38`.
   *
   * **Note:** In Godot Physics, this parameter is only used for groove joints.
   *
   */
  static JOINT_PARAM_MAX_BIAS: any

  /**
   * Constant to set/get the maximum force that the joint can use to act on the two bodies. The default value of this parameter is `3.40282e+38`.
   *
   * **Note:** In Godot Physics, this parameter is only used for groove joints.
   *
   */
  static JOINT_PARAM_MAX_FORCE: any

  /**
   * Constant to set/get a how much the bond of the pin joint can flex. The default value of this parameter is `0.0`.
   *
   */
  static PIN_JOINT_SOFTNESS: any

  /**
   * The maximum rotation around the pin.
   *
   */
  static PIN_JOINT_LIMIT_UPPER: any

  /**
   * The minimum rotation around the pin.
   *
   */
  static PIN_JOINT_LIMIT_LOWER: any

  /**
   * Target speed for the motor. In radians per second.
   *
   */
  static PIN_JOINT_MOTOR_TARGET_VELOCITY: any

  /**
   * If `true`, the pin has a maximum and a minimum rotation.
   *
   */
  static PIN_JOINT_FLAG_ANGULAR_LIMIT_ENABLED: any

  /**
   * If `true`, a motor turns the pin.
   *
   */
  static PIN_JOINT_FLAG_MOTOR_ENABLED: any

  /**
   * Sets the resting length of the spring joint. The joint will always try to go to back this length when pulled apart. The default value of this parameter is the distance between the joint's anchor points.
   *
   */
  static DAMPED_SPRING_REST_LENGTH: any

  /**
   * Sets the stiffness of the spring joint. The joint applies a force equal to the stiffness times the distance from its resting length. The default value of this parameter is `20.0`.
   *
   */
  static DAMPED_SPRING_STIFFNESS: any

  /**
   * Sets the damping ratio of the spring joint. A value of 0 indicates an undamped spring, while 1 causes the system to reach equilibrium as fast as possible (critical damping). The default value of this parameter is `1.5`.
   *
   */
  static DAMPED_SPRING_DAMPING: any

  /**
   * Disables continuous collision detection. This is the fastest way to detect body collisions, but it can miss small and/or fast-moving objects.
   *
   */
  static CCD_MODE_DISABLED: any

  /**
   * Enables continuous collision detection by raycasting. It is faster than shapecasting, but less precise.
   *
   */
  static CCD_MODE_CAST_RAY: any

  /**
   * Enables continuous collision detection by shapecasting. It is the slowest CCD method, and the most precise.
   *
   */
  static CCD_MODE_CAST_SHAPE: any

  /**
   * The value of the first parameter and area callback function receives, when an object enters one of its shapes.
   *
   */
  static AREA_BODY_ADDED: any

  /**
   * The value of the first parameter and area callback function receives, when an object exits one of its shapes.
   *
   */
  static AREA_BODY_REMOVED: any

  /**
   * Constant to get the number of objects that are not sleeping.
   *
   */
  static INFO_ACTIVE_OBJECTS: any

  /**
   * Constant to get the number of possible collisions.
   *
   */
  static INFO_COLLISION_PAIRS: any

  /**
   * Constant to get the number of space regions where a collision could occur.
   *
   */
  static INFO_ISLAND_COUNT: any
}
