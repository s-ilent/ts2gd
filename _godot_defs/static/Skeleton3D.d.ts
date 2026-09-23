/**
 * [Skeleton3D] provides an interface for managing a hierarchy of bones, including pose, rest and animation (see [Animation]). It can also use ragdoll physics.
 *
 * The overall transform of a bone with respect to the skeleton is determined by bone pose. Bone rest defines the initial transform of the bone pose.
 *
 * Note that "global pose" below refers to the overall transform of the bone with respect to skeleton, so it is not the actual global/world transform of the bone.
 *
 */
declare class Skeleton3D extends Node3D {
  /**
   * [Skeleton3D] provides an interface for managing a hierarchy of bones, including pose, rest and animation (see [Animation]). It can also use ragdoll physics.
   *
   * The overall transform of a bone with respect to the skeleton is determined by bone pose. Bone rest defines the initial transform of the bone pose.
   *
   * Note that "global pose" below refers to the overall transform of the bone with respect to skeleton, so it is not the actual global/world transform of the bone.
   *
   */
  new(): Skeleton3D
  constructor()
  static new(): Skeleton3D

  /**
   * If you follow the recommended workflow and explicitly have [PhysicalBoneSimulator3D] as a child of [Skeleton3D], you can control whether it is affected by raycasting without running [method physical_bones_start_simulation], by its [member SkeletonModifier3D.active].
   *
   * However, for old (deprecated) configurations, [Skeleton3D] has an internal virtual [PhysicalBoneSimulator3D] for compatibility. This property controls the internal virtual [PhysicalBoneSimulator3D]'s [member SkeletonModifier3D.active].
   *
   */
  animate_physical_bones: boolean

  /** Sets the processing timing for the Modifier. */
  modifier_callback_mode_process: int

  /**
   * Multiplies the 3D position track animation.
   *
   * **Note:** Unless this value is `1.0`, the key value in animation will not match the actual position value.
   *
   */
  motion_scale: float

  /** If [code]true[/code], forces the bones in their default rest pose, regardless of their values. In the editor, this also prevents the bones from being edited. */
  show_rest_only: boolean

  /**
   * Adds a new bone with the given name. Returns the new bone's index, or `-1` if this method fails.
   *
   * **Note:** Bone names should be unique, non empty, and cannot include the `:` and `/` characters.
   *
   */
  add_bone(name: string): int

  /**
   * Manually advance the child [SkeletonModifier3D]s by the specified time (in seconds).
   *
   * **Note:** The [param delta] is temporarily accumulated in the [Skeleton3D], and the deferred process uses the accumulated value to process the modification.
   *
   */
  advance(delta: float): void

  /** Clear all the bones in this skeleton. */
  clear_bones(): void

  /** Removes the global pose override on all bones in the skeleton. */
  clear_bones_global_pose_override(): void

  /** No documentation provided. */
  create_skin_from_rest_transforms(): Skin

  /** Returns the bone index that matches [param name] as its name. Returns [code]-1[/code] if no bone with this name exists. */
  find_bone(name: string): int

  /** Force updates the bone transforms/poses for all bones in the skeleton. */
  force_update_all_bone_transforms(): void

  /** Force updates the bone transform for the bone at [param bone_idx] and all of its children. */
  force_update_bone_child_transform(bone_idx: int): void

  /** Returns an array containing the bone indexes of all the child node of the passed in bone, [param bone_idx]. */
  get_bone_children(bone_idx: int): PackedInt32Array

  /** Returns the number of bones in the skeleton. */
  get_bone_count(): int

  /**
   * Returns the overall transform of the specified bone, with respect to the skeleton. Being relative to the skeleton frame, this is not the actual "global" transform of the bone.
   *
   * **Note:** This is the global pose you set to the skeleton in the process, the final global pose can get overridden by modifiers in the deferred process, if you want to access the final global pose, use [signal SkeletonModifier3D.modification_processed].
   *
   */
  get_bone_global_pose(bone_idx: int): Transform3D

  /** Returns the overall transform of the specified bone, with respect to the skeleton, but without any global pose overrides. Being relative to the skeleton frame, this is not the actual "global" transform of the bone. */
  get_bone_global_pose_no_override(bone_idx: int): Transform3D

  /** Returns the global pose override transform for [param bone_idx]. */
  get_bone_global_pose_override(bone_idx: int): Transform3D

  /** Returns the global rest transform for [param bone_idx]. */
  get_bone_global_rest(bone_idx: int): Transform3D

  /** Returns the metadata with the given [param key] for the bone at index [param bone_idx]. */
  get_bone_meta(bone_idx: int, key: StringName): any

  /** Returns the list of all metadata keys for the bone at index [param bone_idx]. */
  get_bone_meta_list(bone_idx: int): StringName[]

  /** Returns the name of the bone at index [param bone_idx]. */
  get_bone_name(bone_idx: int): string

  /**
   * Returns the bone index which is the parent of the bone at [param bone_idx]. If -1, then bone has no parent.
   *
   * **Note:** The parent bone returned will always be less than [param bone_idx].
   *
   */
  get_bone_parent(bone_idx: int): int

  /**
   * Returns the pose transform of the specified bone.
   *
   * **Note:** This is the pose you set to the skeleton in the process, the final pose can get overridden by modifiers in the deferred process, if you want to access the final pose, use [signal SkeletonModifier3D.modification_processed].
   *
   */
  get_bone_pose(bone_idx: int): Transform3D

  /** Returns the pose position of the bone at [param bone_idx]. The returned [Vector3] is in the local coordinate space of the [Skeleton3D] node. */
  get_bone_pose_position(bone_idx: int): Vector3

  /** Returns the pose rotation of the bone at [param bone_idx]. The returned [Quaternion] is local to the bone with respect to the rotation of any parent bones. */
  get_bone_pose_rotation(bone_idx: int): Quaternion

  /** Returns the pose scale of the bone at [param bone_idx]. */
  get_bone_pose_scale(bone_idx: int): Vector3

  /** Returns the rest transform for a bone [param bone_idx]. */
  get_bone_rest(bone_idx: int): Transform3D

  /**
   * Returns all bone names concatenated with commas (`,`) as a single [StringName].
   *
   * It is useful to set it as a hint for the enum property.
   *
   */
  get_concatenated_bone_names(): StringName

  /** Returns an array with all of the bones that are parentless. Another way to look at this is that it returns the indexes of all the bones that are not dependent or modified by other bones in the Skeleton. */
  get_parentless_bones(): PackedInt32Array

  /**
   * Returns the number of times the bone hierarchy has changed within this skeleton, including renames.
   *
   * The Skeleton version is not serialized: only use within a single instance of Skeleton3D.
   *
   * Use for invalidating caches in IK solvers and other nodes which process bones.
   *
   */
  get_version(): int

  /** Returns [code]true[/code] if the bone at index [param bone_idx] has metadata with the given [param key]. */
  has_bone_meta(bone_idx: int, key: StringName): boolean

  /** Returns whether the bone pose for the bone at [param bone_idx] is enabled. */
  is_bone_enabled(bone_idx: int): boolean

  /** Returns all bones in the skeleton to their rest poses. */
  localize_rests(): void

  /**
   * Adds a collision exception to the physical bone.
   *
   * Works just like the [RigidBody3D] node.
   *
   */
  physical_bones_add_collision_exception(exception: RID): void

  /**
   * Removes a collision exception to the physical bone.
   *
   * Works just like the [RigidBody3D] node.
   *
   */
  physical_bones_remove_collision_exception(exception: RID): void

  /**
   * Tells the [PhysicalBone3D] nodes in the Skeleton to start simulating and reacting to the physics world.
   *
   * Optionally, a list of bone names can be passed-in, allowing only the passed-in bones to be simulated.
   *
   */
  physical_bones_start_simulation(bones?: StringName[]): void

  /** Tells the [PhysicalBone3D] nodes in the Skeleton to stop simulating. */
  physical_bones_stop_simulation(): void

  /** Binds the given Skin to the Skeleton. */
  register_skin(skin: Skin): SkinReference

  /** Sets the bone pose to rest for [param bone_idx]. */
  reset_bone_pose(bone_idx: int): void

  /** Sets all bone poses to rests. */
  reset_bone_poses(): void

  /** Disables the pose for the bone at [param bone_idx] if [code]false[/code], enables the bone pose if [code]true[/code]. */
  set_bone_enabled(bone_idx: int, enabled?: boolean): void

  /**
   * Sets the global pose transform, [param pose], for the bone at [param bone_idx].
   *
   * **Note:** If other bone poses have been changed, this method executes a dirty poses recalculation and will cause performance to deteriorate. If you know that multiple global poses will be applied, consider using [method set_bone_pose] with precalculation.
   *
   */
  set_bone_global_pose(bone_idx: int, pose: Transform3D): void

  /**
   * Sets the global pose transform, [param pose], for the bone at [param bone_idx].
   *
   * [param amount] is the interpolation strength that will be used when applying the pose, and [param persistent] determines if the applied pose will remain.
   *
   * **Note:** The pose transform needs to be a global pose! To convert a world transform from a [Node3D] to a global bone pose, multiply the [method Transform3D.affine_inverse] of the node's [member Node3D.global_transform] by the desired world transform.
   *
   */
  set_bone_global_pose_override(
    bone_idx: int,
    pose: Transform3D,
    amount: float,
    persistent?: boolean
  ): void

  /** Sets the metadata with the given [param key] to [param value] for the bone at index [param bone_idx]. */
  set_bone_meta(bone_idx: int, key: StringName, value: any): void

  /** Sets the bone name, [param name], for the bone at [param bone_idx]. */
  set_bone_name(bone_idx: int, name: string): void

  /**
   * Sets the bone index [param parent_idx] as the parent of the bone at [param bone_idx]. If -1, then bone has no parent.
   *
   * **Note:** [param parent_idx] must be less than [param bone_idx].
   *
   */
  set_bone_parent(bone_idx: int, parent_idx: int): void

  /** Sets the pose transform, [param pose], for the bone at [param bone_idx]. */
  set_bone_pose(bone_idx: int, pose: Transform3D): void

  /** Sets the pose position of the bone at [param bone_idx] to [param position]. [param position] is a [Vector3] describing a position local to the [Skeleton3D] node. */
  set_bone_pose_position(bone_idx: int, position: Vector3): void

  /** Sets the pose rotation of the bone at [param bone_idx] to [param rotation]. [param rotation] is a [Quaternion] describing a rotation in the bone's local coordinate space with respect to the rotation of any parent bones. */
  set_bone_pose_rotation(bone_idx: int, rotation: Quaternion): void

  /** Sets the pose scale of the bone at [param bone_idx] to [param scale]. */
  set_bone_pose_scale(bone_idx: int, scale: Vector3): void

  /** Sets the rest transform for bone [param bone_idx]. */
  set_bone_rest(bone_idx: int, rest: Transform3D): void

  /** Unparents the bone at [param bone_idx] and sets its rest position to that of its parent prior to being reset. */
  unparent_bone_and_rest(bone_idx: int): void

  connect<T extends SignalsOf<Skeleton3D>>(
    signal: T,
    method: SignalFunction<Skeleton3D[T]>
  ): number

  /**
   * Notification received when this skeleton's pose needs to be updated. In that case, this is called only once per frame in a deferred process.
   *
   */
  static NOTIFICATION_UPDATE_SKELETON: any

  /**
   * Set a flag to process modification during physics frames (see [constant Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS]).
   *
   */
  static MODIFIER_CALLBACK_MODE_PROCESS_PHYSICS: any

  /**
   * Set a flag to process modification during process frames (see [constant Node.NOTIFICATION_INTERNAL_PROCESS]).
   *
   */
  static MODIFIER_CALLBACK_MODE_PROCESS_IDLE: any

  /**
   * Do not process modification. Use [method advance] to process the modification manually.
   *
   */
  static MODIFIER_CALLBACK_MODE_PROCESS_MANUAL: any

  /**
   * Emitted when the bone at [param bone_idx] is toggled with [method set_bone_enabled]. Use [method is_bone_enabled] to check the new value.
   *
   */
  $bone_enabled_changed: Signal<() => void>

  /**
   * Emitted when the list of bones changes, such as when calling [method add_bone], [method set_bone_parent], [method unparent_bone_and_rest], or [method clear_bones].
   *
   */
  $bone_list_changed: Signal<() => void>

  /**
   * Emitted when the pose is updated.
   *
   * **Note:** During the update process, this signal is not fired, so modification by [SkeletonModifier3D] is not detected.
   *
   */
  $pose_updated: Signal<() => void>

  /**
   * Emitted when the rest is updated.
   *
   */
  $rest_updated: Signal<() => void>

  /**
   * Emitted when the value of [member show_rest_only] changes.
   *
   */
  $show_rest_only_changed: Signal<() => void>

  /**
   * Emitted when the final pose has been calculated will be applied to the skin in the update process.
   *
   * This means that all [SkeletonModifier3D] processing is complete. In order to detect the completion of the processing of each [SkeletonModifier3D], use [signal SkeletonModifier3D.modification_processed].
   *
   */
  $skeleton_updated: Signal<() => void>
}
