/**
 * The [Node3D] node is the base representation of a node in 3D space. All other 3D nodes inherit from this class.
 *
 * Affine operations (translation, rotation, scale) are calculated in the coordinate system relative to the parent, unless the [Node3D]'s [member top_level] is `true`. In this coordinate system, affine operations correspond to direct affine operations on the [Node3D]'s [member transform]. The term **parent space** refers to this coordinate system. The coordinate system that is attached to the [Node3D] itself is referred to as object-local coordinate system, or **local space**.
 *
 * **Note:** Unless otherwise specified, all methods that need angle parameters must receive angles in **radians**. To convert degrees to radians, use [method @GlobalScope.deg_to_rad].
 *
 * **Note:** In Godot 3 and older, [Node3D] was named **Spatial**.
 *
 */
declare class Node3D extends Node {
  /**
   * The [Node3D] node is the base representation of a node in 3D space. All other 3D nodes inherit from this class.
   *
   * Affine operations (translation, rotation, scale) are calculated in the coordinate system relative to the parent, unless the [Node3D]'s [member top_level] is `true`. In this coordinate system, affine operations correspond to direct affine operations on the [Node3D]'s [member transform]. The term **parent space** refers to this coordinate system. The coordinate system that is attached to the [Node3D] itself is referred to as object-local coordinate system, or **local space**.
   *
   * **Note:** Unless otherwise specified, all methods that need angle parameters must receive angles in **radians**. To convert degrees to radians, use [method @GlobalScope.deg_to_rad].
   *
   * **Note:** In Godot 3 and older, [Node3D] was named **Spatial**.
   *
   */
  new(): Node3D
  constructor()
  static new(): Node3D

  /** Basis of the [member transform] property. Represents the rotation, scale, and shear of this node in parent space (relative to the parent node). */
  basis: Basis

  /**
   * Basis of the [member global_transform] property. Represents the rotation, scale, and shear of this node in global space (relative to the world).
   *
   * **Note:** If the node is not inside the tree, getting this property fails and returns [constant Basis.IDENTITY].
   *
   */
  global_basis: Basis

  /**
   * Global position (translation) of this node in global space (relative to the world). This is equivalent to the [member global_transform]'s [member Transform3D.origin].
   *
   * **Note:** If the node is not inside the tree, getting this property fails and returns [constant Vector3.ZERO].
   *
   */
  global_position: Vector3

  /**
   * Global rotation of this node as [url=https://en.wikipedia.org/wiki/Euler_angles]Euler angles[/url], in radians and in global space (relative to the world). This value is obtained from [member global_basis]'s rotation.
   *
   * - The [member Vector3.x] is the angle around the global X axis (pitch);
   *
   * - The [member Vector3.y] is the angle around the global Y axis (yaw);
   *
   * - The [member Vector3.z] is the angle around the global Z axis (roll).
   *
   * **Note:** Unlike [member rotation], this property always follows the YXZ convention ([constant EULER_ORDER_YXZ]).
   *
   * **Note:** If the node is not inside the tree, getting this property fails and returns [constant Vector3.ZERO].
   *
   */
  global_rotation: Vector3

  /**
   * The [member global_rotation] of this node, in degrees instead of radians.
   *
   * **Note:** If the node is not inside the tree, getting this property fails and returns [constant Vector3.ZERO].
   *
   */
  global_rotation_degrees: Vector3

  /**
   * The transformation of this node, in global space (relative to the world). Contains and represents this node's [member global_position], [member global_rotation], and global scale.
   *
   * **Note:** If the node is not inside the tree, getting this property fails and returns [constant Transform3D.IDENTITY].
   *
   */
  global_transform: Transform3D

  /** Position (translation) of this node in parent space (relative to the parent node). This is equivalent to the [member transform]'s [member Transform3D.origin]. */
  position: Vector3

  /**
   * Rotation of this node represented as a [Quaternion] in parent space (relative to the parent node). This value is obtained from [member basis]'s rotation.
   *
   * **Note:** Quaternions are much more suitable for 3D math but are less intuitive. Setting this property can be useful for interpolation (see [method Quaternion.slerp]).
   *
   */
  quaternion: Quaternion

  /**
   * Rotation of this node as [url=https://en.wikipedia.org/wiki/Euler_angles]Euler angles[/url], in radians and in parent space (relative to the parent node). This value is obtained from [member basis]'s rotation.
   *
   * - The [member Vector3.x] is the angle around the local X axis (pitch);
   *
   * - The [member Vector3.y] is the angle around the local Y axis (yaw);
   *
   * - The [member Vector3.z] is the angle around the local Z axis (roll).
   *
   * The order of each consecutive rotation can be changed with [member rotation_order] (see [enum EulerOrder] constants). By default, the YXZ convention is used ([constant EULER_ORDER_YXZ]).
   *
   * **Note:** This property is edited in degrees in the inspector. If you want to use degrees in a script, use [member rotation_degrees].
   *
   */
  rotation: Vector3

  /**
   * The [member rotation] of this node, in degrees instead of radians.
   *
   * **Note:** This is **not** the property available in the Inspector dock.
   *
   */
  rotation_degrees: Vector3

  /** How this node's rotation and scale are displayed in the Inspector dock. */
  rotation_edit_mode: int

  /** The axis rotation order of the [member rotation] property. The final orientation is calculated by rotating around the local X, Y, and Z axis in this order. */
  rotation_order: int

  /**
   * Scale of this node in local space (relative to this node). This value is obtained from [member basis]'s scale.
   *
   * **Note:** The behavior of some 3D node types is not affected by this property. These include [Light3D], [Camera3D], [AudioStreamPlayer3D], and more.
   *
   * **Warning:** The scale's components must either be all positive or all negative, and **not** exactly `0.0`. Otherwise, it won't be possible to obtain the scale from the [member basis]. This may cause the intended scale to be lost when reloaded from disk, and potentially other unstable behavior.
   *
   */
  scale: Vector3

  /** If [code]true[/code], the node does not inherit its transformations from its parent. As such, node transformations will only be in global space, which also means that [member global_transform] and [member transform] will be identical. */
  top_level: boolean

  /** The local transformation of this node, in parent space (relative to the parent node). Contains and represents this node's [member position], [member rotation], and [member scale]. */
  transform: Transform3D

  /**
   * Path to the visibility range parent for this node and its descendants. The visibility parent must be a [GeometryInstance3D].
   *
   * Any visual instance will only be visible if the visibility parent (and all of its visibility ancestors) is hidden by being closer to the camera than its own [member GeometryInstance3D.visibility_range_begin]. Nodes hidden via the [member Node3D.visible] property are essentially removed from the visibility dependency tree, so dependent instances will not take the hidden node or its descendants into account.
   *
   */
  visibility_parent: NodePathType

  /** If [code]true[/code], this node can be visible. The node is only rendered when all of its ancestors are visible, as well. That means [method is_visible_in_tree] must return [code]true[/code]. */
  visible: boolean

  /**
   * Attaches the given [param gizmo] to this node. Only works in the editor.
   *
   * **Note:** [param gizmo] should be an [EditorNode3DGizmo]. The argument type is [Node3DGizmo] to avoid depending on editor classes in [Node3D].
   *
   */
  add_gizmo(gizmo: Node3DGizmo): void

  /** Clears all [EditorNode3DGizmo] objects attached to this node. Only works in the editor. */
  clear_gizmos(): void

  /** Deselects all subgizmos for this node. Useful to call when the selected subgizmo may no longer exist after a property change. Only works in the editor. */
  clear_subgizmo_selection(): void

  /**
   * Forces the node's [member global_transform] to update, by sending [constant NOTIFICATION_TRANSFORM_CHANGED]. Fails if the node is not inside the tree.
   *
   * **Note:** For performance reasons, transform changes are usually accumulated and applied **once** at the end of the frame. The update propagates through [Node3D] children, as well. Therefore, use this method only when you need an up-to-date transform (such as during physics operations).
   *
   */
  force_update_transform(): void

  /** Returns all the [EditorNode3DGizmo] objects attached to this node. Only works in the editor. */
  get_gizmos(): Node3DGizmo[]

  /**
   * When using physics interpolation, there will be circumstances in which you want to know the interpolated (displayed) transform of a node rather than the standard transform (which may only be accurate to the most recent physics tick).
   *
   * This is particularly important for frame-based operations that take place in [method Node._process], rather than [method Node._physics_process]. Examples include [Camera3D]s focusing on a node, or finding where to fire lasers from on a frame rather than physics tick.
   *
   * **Note:** This function creates an interpolation pump on the [Node3D] the first time it is called, which can respond to physics interpolation resets. If you get problems with "streaking" when initially following a [Node3D], be sure to call [method get_global_transform_interpolated] at least once **before** resetting the [Node3D] physics interpolation.
   *
   */
  get_global_transform_interpolated(): Transform3D

  /**
   * Returns the parent [Node3D] that directly affects this node's [member global_transform]. Returns `null` if no parent exists, the parent is not a [Node3D], or [member top_level] is `true`.
   *
   * **Note:** This method is not always equivalent to [method Node.get_parent], which does not take [member top_level] into account.
   *
   */
  get_parent_node_3d(): Node3D

  /**
   * Returns the [World3D] this node is registered to.
   *
   * Usually, this is the same as the world used by this node's viewport (see [method Node.get_viewport] and [method Viewport.find_world_3d]).
   *
   */
  get_world_3d(): World3D

  /** Rotates this node's [member global_basis] around the global [param axis] by the given [param angle], in radians. This operation is calculated in global space (relative to the world) and preserves the [member global_position]. */
  global_rotate(axis: Vector3, angle: float): void

  /**
   * Scales this node's [member global_basis] by the given [param scale] factor. This operation is calculated in global space (relative to the world) and preserves the [member global_position].
   *
   * **Note:** This method is not to be confused with the [member scale] property.
   *
   */
  global_scale(scale: Vector3): void

  /** Adds the given translation [param offset] to the node's [member global_position] in global space (relative to the world). */
  global_translate(offset: Vector3): void

  /** Prevents this node from being rendered. Equivalent to setting [member visible] to [code]false[/code]. This is the opposite of [method show]. */
  hide(): void

  /** Returns [code]true[/code] if the node receives [constant NOTIFICATION_LOCAL_TRANSFORM_CHANGED] whenever [member transform] changes. This is enabled with [method set_notify_local_transform]. */
  is_local_transform_notification_enabled(): boolean

  /**
   * Returns `true` if this node's [member global_transform] is automatically orthonormalized. This results in this node not appearing distorted, as if its global scale were set to [constant Vector3.ONE] (or its negative counterpart). See also [method set_disable_scale] and [method orthonormalize].
   *
   * **Note:** [member transform] is not affected by this setting.
   *
   */
  is_scale_disabled(): boolean

  /** Returns [code]true[/code] if the node receives [constant NOTIFICATION_TRANSFORM_CHANGED] whenever [member global_transform] changes. This is enabled with [method set_notify_transform]. */
  is_transform_notification_enabled(): boolean

  /**
   * Returns `true` if this node is inside the scene tree and the [member visible] property is `true` for this node and all of its [Node3D] ancestors **in sequence**. An ancestor of any other type (such as [Node] or [Node2D]) breaks the sequence. See also [method Node.get_parent].
   *
   * **Note:** This method cannot take [member VisualInstance3D.layers] into account, so even if this method returns `true`, the node may not be rendered.
   *
   */
  is_visible_in_tree(): boolean

  /**
   * Rotates the node so that the local forward axis (-Z, [constant Vector3.FORWARD]) points toward the [param target] position. This operation is calculated in global space (relative to the world).
   *
   * The local up axis (+Y) points as close to the [param up] vector as possible while staying perpendicular to the local forward axis. The resulting transform is orthogonal, and the scale is preserved. Non-uniform scaling may not work correctly.
   *
   * The [param target] position cannot be the same as the node's position, the [param up] vector cannot be [constant Vector3.ZERO]. Furthermore, the direction from the node's position to the [param target] position cannot be parallel to the [param up] vector, to avoid an unintended rotation around the local Z axis.
   *
   * If [param use_model_front] is `true`, the +Z axis (asset front) is treated as forward (implies +X is left) and points toward the [param target] position. By default, the -Z axis (camera forward) is treated as forward (implies +X is right).
   *
   * **Note:** This method fails if the node is not in the scene tree. If necessary, use [method look_at_from_position] instead.
   *
   */
  look_at(target: Vector3, up?: Vector3, use_model_front?: boolean): void

  /** Moves the node to the specified [param position], then rotates the node to point toward the [param target] position, similar to [method look_at]. This operation is calculated in global space (relative to the world). */
  look_at_from_position(
    position: Vector3,
    target: Vector3,
    up?: Vector3,
    use_model_front?: boolean
  ): void

  /** Orthonormalizes this node's [member basis]. This method sets this node's [member scale] to [constant Vector3.ONE] (or its negative counterpart), but preserves the [member position] and [member rotation]. See also [method Transform3D.orthonormalized]. */
  orthonormalize(): void

  /** Rotates this node's [member basis] around the [param axis] by the given [param angle], in radians. This operation is calculated in parent space (relative to the parent) and preserves the [member position]. */
  rotate(axis: Vector3, angle: float): void

  /** Rotates this node's [member basis] around the [param axis] by the given [param angle], in radians. This operation is calculated in local space (relative to this node) and preserves the [member position]. */
  rotate_object_local(axis: Vector3, angle: float): void

  /** Rotates this node's [member basis] around the X axis by the given [param angle], in radians. This operation is calculated in parent space (relative to the parent) and preserves the [member position]. */
  rotate_x(angle: float): void

  /** Rotates this node's [member basis] around the Y axis by the given [param angle], in radians. This operation is calculated in parent space (relative to the parent) and preserves the [member position]. */
  rotate_y(angle: float): void

  /** Rotates this node's [member basis] around the Z axis by the given [param angle], in radians. This operation is calculated in parent space (relative to the parent) and preserves the [member position]. */
  rotate_z(angle: float): void

  /** Scales this node's [member basis] by the given [param scale] factor. This operation is calculated in local space (relative to this node) and preserves the [member position]. */
  scale_object_local(scale: Vector3): void

  /**
   * If `true`, this node's [member global_transform] is automatically orthonormalized. This results in this node not appearing distorted, as if its global scale were set to [constant Vector3.ONE] (or its negative counterpart). See also [method is_scale_disabled] and [method orthonormalize].
   *
   * **Note:** [member transform] is not affected by this setting.
   *
   */
  set_disable_scale(disable: boolean): void

  /** Sets this node's [member transform] to [constant Transform3D.IDENTITY], which resets all transformations in parent space ([member position], [member rotation], and [member scale]). */
  set_identity(): void

  /**
   * If `true`, the node will not receive [constant NOTIFICATION_TRANSFORM_CHANGED] or [constant NOTIFICATION_LOCAL_TRANSFORM_CHANGED].
   *
   * It may useful to call this method when handling these notifications to prevent infinite recursion.
   *
   */
  set_ignore_transform_notification(enabled: boolean): void

  /**
   * If `true`, the node will receive [constant NOTIFICATION_LOCAL_TRANSFORM_CHANGED] whenever [member transform] changes.
   *
   * **Note:** Some 3D nodes such as [CSGShape3D] or [CollisionShape3D] automatically enable this to function correctly.
   *
   */
  set_notify_local_transform(enable: boolean): void

  /**
   * If `true`, the node will receive [constant NOTIFICATION_TRANSFORM_CHANGED] whenever [member global_transform] changes.
   *
   * **Note:** Most 3D nodes such as [VisualInstance3D] or [CollisionObject3D] automatically enable this to function correctly.
   *
   * **Note:** In the editor, nodes will propagate this notification to their children if a gizmo is attached (see [method add_gizmo]).
   *
   */
  set_notify_transform(enable: boolean): void

  /**
   * Selects the [param gizmo]'s subgizmo with the given [param id] and sets its transform. Only works in the editor.
   *
   * **Note:** The gizmo object would typically be an instance of [EditorNode3DGizmo], but the argument type is kept generic to avoid creating a dependency on editor classes in [Node3D].
   *
   */
  set_subgizmo_selection(
    gizmo: Node3DGizmo,
    id: int,
    transform: Transform3D
  ): void

  /** Allows this node to be rendered. Equivalent to setting [member visible] to [code]true[/code]. This is the opposite of [method hide]. */
  show(): void

  /** Returns the [param local_point] converted from this node's local space to global space. This is the opposite of [method to_local]. */
  to_global(local_point: Vector3): Vector3

  /** Returns the [param global_point] converted from global space to this node's local space. This is the opposite of [method to_global]. */
  to_local(global_point: Vector3): Vector3

  /**
   * Adds the given translation [param offset] to the node's position, in local space (relative to this node).
   *
   * **Note:** Prefer using [method translate_object_local], instead, as this method may be changed in a future release.
   *
   * **Note:** Despite the naming convention, this operation is **not** calculated in parent space for compatibility reasons. To translate in parent space, add [param offset] to the [member position] (`node_3d.position += offset`).
   *
   */
  translate(offset: Vector3): void

  /** Adds the given translation [param offset] to the node's position, in local space (relative to this node). */
  translate_object_local(offset: Vector3): void

  /** Updates all the [EditorNode3DGizmo] objects attached to this node. Only works in the editor. */
  update_gizmos(): void

  connect<T extends SignalsOf<Node3D>>(
    signal: T,
    method: SignalFunction<Node3D[T]>
  ): number

  /**
   * Notification received when this node's [member global_transform] changes, if [method is_transform_notification_enabled] is `true`. See also [method set_notify_transform].
   *
   * **Note:** Most 3D nodes such as [VisualInstance3D] or [CollisionObject3D] automatically enable this to function correctly.
   *
   * **Note:** In the editor, nodes will propagate this notification to their children if a gizmo is attached (see [method add_gizmo]).
   *
   */
  static NOTIFICATION_TRANSFORM_CHANGED: any

  /**
   * Notification received when this node is registered to a new [World3D] (see [method get_world_3d]).
   *
   */
  static NOTIFICATION_ENTER_WORLD: any

  /**
   * Notification received when this node is unregistered from the current [World3D] (see [method get_world_3d]).
   *
   * This notification is sent in reversed order.
   *
   */
  static NOTIFICATION_EXIT_WORLD: any

  /**
   * Notification received when this node's visibility changes (see [member visible] and [method is_visible_in_tree]).
   *
   * This notification is received **before** the related [signal visibility_changed] signal.
   *
   */
  static NOTIFICATION_VISIBILITY_CHANGED: any

  /**
   * Notification received when this node's [member transform] changes, if [method is_local_transform_notification_enabled] is `true`. This is not received when a parent [Node3D]'s [member transform] changes. See also [method set_notify_local_transform].
   *
   * **Note:** Some 3D nodes such as [CSGShape3D] or [CollisionShape3D] automatically enable this to function correctly.
   *
   */
  static NOTIFICATION_LOCAL_TRANSFORM_CHANGED: any

  /**
   * The rotation is edited using a [Vector3] in [url=https://en.wikipedia.org/wiki/Euler_angles]Euler angles[/url].
   *
   */
  static ROTATION_EDIT_MODE_EULER: any

  /**
   * The rotation is edited using a [Quaternion].
   *
   */
  static ROTATION_EDIT_MODE_QUATERNION: any

  /**
   * The rotation is edited using a [Basis]. In this mode, the raw [member basis]'s axes can be freely modified, but the [member scale] property is not available.
   *
   */
  static ROTATION_EDIT_MODE_BASIS: any

  /**
   * Emitted when this node's visibility changes (see [member visible] and [method is_visible_in_tree]).
   *
   * This signal is emitted **after** the related [constant NOTIFICATION_VISIBILITY_CHANGED] notification.
   *
   */
  $visibility_changed: Signal<() => void>
}
