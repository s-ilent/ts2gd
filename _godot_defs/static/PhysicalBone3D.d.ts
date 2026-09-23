/**
 * The [PhysicalBone3D] node is a physics body that can be used to make bones in a [Skeleton3D] react to physics.
 *
 * **Note:** In order to detect physical bones with raycasts, the [member SkeletonModifier3D.active] property of the parent [PhysicalBoneSimulator3D] must be `true` and the [Skeleton3D]'s bone must be assigned to [PhysicalBone3D] correctly; it means that [method get_bone_id] should return a valid id (`>= 0`).
 *
 */
declare class PhysicalBone3D extends PhysicsBody3D {
  /**
   * The [PhysicalBone3D] node is a physics body that can be used to make bones in a [Skeleton3D] react to physics.
   *
   * **Note:** In order to detect physical bones with raycasts, the [member SkeletonModifier3D.active] property of the parent [PhysicalBoneSimulator3D] must be `true` and the [Skeleton3D]'s bone must be assigned to [PhysicalBone3D] correctly; it means that [method get_bone_id] should return a valid id (`>= 0`).
   *
   */
  new(): PhysicalBone3D
  constructor()
  static new(): PhysicalBone3D

  /**
   * Damps the body's rotation. By default, the body will use the [member ProjectSettings.physics/3d/default_angular_damp] project setting or any value override set by an [Area3D] the body is in. Depending on [member angular_damp_mode], you can set [member angular_damp] to be added to or to replace the body's damping value.
   *
   * See [member ProjectSettings.physics/3d/default_angular_damp] for more details about damping.
   *
   */
  angular_damp: float

  /** Defines how [member angular_damp] is applied. */
  angular_damp_mode: int

  /** The PhysicalBone3D's rotational velocity in [i]radians[/i] per second. */
  angular_velocity: Vector3

  /** Sets the body's transform. */
  body_offset: Transform3D

  /**
   * The body's bounciness. Values range from `0` (no bounce) to `1` (full bounciness).
   *
   * **Note:** Even with [member bounce] set to `1.0`, some energy will be lost over time due to linear and angular damping. To have a [PhysicalBone3D] that preserves all its energy over time, set [member bounce] to `1.0`, [member linear_damp_mode] to [constant DAMP_MODE_REPLACE], [member linear_damp] to `0.0`, [member angular_damp_mode] to [constant DAMP_MODE_REPLACE], and [member angular_damp] to `0.0`.
   *
   */
  bounce: float

  /** If [code]true[/code], the body is deactivated when there is no movement, so it will not take part in the simulation until it is awakened by an external force. */
  can_sleep: boolean

  /**
   * If `true`, the standard force integration (like gravity or damping) will be disabled for this body. Other than collision response, the body will only move as determined by the [method _integrate_forces] method, if that virtual method is overridden.
   *
   * Setting this property will call the method [method PhysicsServer3D.body_set_omit_force_integration] internally.
   *
   */
  custom_integrator: boolean

  /** The body's friction, from [code]0[/code] (frictionless) to [code]1[/code] (max friction). */
  friction: float

  /** This is multiplied by [member ProjectSettings.physics/3d/default_gravity] to produce this body's gravity. For example, a value of [code]1.0[/code] will apply normal gravity, [code]2.0[/code] will apply double the gravity, and [code]0.5[/code] will apply half the gravity to this body. */
  gravity_scale: float

  /** Sets the joint's transform. */
  joint_offset: Transform3D

  /** Sets the joint's rotation in radians. */
  joint_rotation: Vector3

  /** Sets the joint type. */
  joint_type: int

  /**
   * Damps the body's movement. By default, the body will use [member ProjectSettings.physics/3d/default_linear_damp] or any value override set by an [Area3D] the body is in. Depending on [member linear_damp_mode], [member linear_damp] may be added to or replace the body's damping value.
   *
   * See [member ProjectSettings.physics/3d/default_linear_damp] for more details about damping.
   *
   */
  linear_damp: float

  /** Defines how [member linear_damp] is applied. */
  linear_damp_mode: int

  /** The body's linear velocity in units per second. Can be used sporadically, but [b]don't set this every frame[/b], because physics may run in another thread and runs at a different granularity. Use [method _integrate_forces] as your process loop for precise control of the body state. */
  linear_velocity: Vector3

  /** The body's mass. */
  mass: float

  /** Called during physics processing, allowing you to read and safely modify the simulation state for the object. By default, it is called before the standard force integration, but the [member custom_integrator] property allows you to disable the standard force integration and do fully custom force integration for a body. */
  protected _integrate_forces(state: PhysicsDirectBodyState3D): void

  /**
   * Applies a directional impulse without affecting rotation.
   *
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_integrate_forces" functions otherwise).
   *
   * This is equivalent to using [method apply_impulse] at the body's center of mass.
   *
   */
  apply_central_impulse(impulse: Vector3): void

  /**
   * Applies a positioned impulse to the PhysicsBone3D.
   *
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_integrate_forces" functions otherwise).
   *
   * [param position] is the offset from the PhysicsBone3D origin in global coordinates.
   *
   */
  apply_impulse(impulse: Vector3, position?: Vector3): void

  /** Returns the unique identifier of the PhysicsBone3D. */
  get_bone_id(): int

  /** Returns [code]true[/code] if the PhysicsBone3D is allowed to simulate physics. */
  get_simulate_physics(): boolean

  /** Returns [code]true[/code] if the PhysicsBone3D is currently simulating physics. */
  is_simulating_physics(): boolean

  connect<T extends SignalsOf<PhysicalBone3D>>(
    signal: T,
    method: SignalFunction<PhysicalBone3D[T]>
  ): number

  /**
   * In this mode, the body's damping value is added to any value set in areas or the default value.
   *
   */
  static DAMP_MODE_COMBINE: any

  /**
   * In this mode, the body's damping value replaces any value set in areas or the default value.
   *
   */
  static DAMP_MODE_REPLACE: any

  /**
   * No joint is applied to the PhysicsBone3D.
   *
   */
  static JOINT_TYPE_NONE: any

  /**
   * A pin joint is applied to the PhysicsBone3D.
   *
   */
  static JOINT_TYPE_PIN: any

  /**
   * A cone joint is applied to the PhysicsBone3D.
   *
   */
  static JOINT_TYPE_CONE: any

  /**
   * A hinge joint is applied to the PhysicsBone3D.
   *
   */
  static JOINT_TYPE_HINGE: any

  /**
   * A slider joint is applied to the PhysicsBone3D.
   *
   */
  static JOINT_TYPE_SLIDER: any

  /**
   * A 6 degrees of freedom joint is applied to the PhysicsBone3D.
   *
   */
  static JOINT_TYPE_6DOF: any
}
