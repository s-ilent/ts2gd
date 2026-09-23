/**
 * Base class for [AnimationPlayer] and [AnimationTree] to manage animation lists. It also has general properties and methods for playback and blending.
 *
 * After instantiating the playback information data within the extended class, the blending is processed by the [AnimationMixer].
 *
 */
declare class AnimationMixer extends Node {
  /**
   * Base class for [AnimationPlayer] and [AnimationTree] to manage animation lists. It also has general properties and methods for playback and blending.
   *
   * After instantiating the playback information data within the extended class, the blending is processed by the [AnimationMixer].
   *
   */
  new(): AnimationMixer
  constructor()
  static new(): AnimationMixer

  /** If [code]true[/code], the [AnimationMixer] will be processing. */
  active: boolean

  /**
   * The number of possible simultaneous sounds for each of the assigned AudioStreamPlayers.
   *
   * For example, if this value is `32` and the animation has two audio tracks, the two [AudioStreamPlayer]s assigned can play simultaneously up to `32` voices each.
   *
   */
  audio_max_polyphony: int

  /**
   * Ordinarily, tracks can be set to [constant Animation.UPDATE_DISCRETE] to update infrequently, usually when using nearest interpolation.
   *
   * However, when blending with [constant Animation.UPDATE_CONTINUOUS] several results are considered. The [member callback_mode_discrete] specify it explicitly. See also [enum AnimationCallbackModeDiscrete].
   *
   * To make the blended results look good, it is recommended to set this to [constant ANIMATION_CALLBACK_MODE_DISCRETE_FORCE_CONTINUOUS] to update every frame during blending. Other values exist for compatibility and they are fine if there is no blending, but not so, may produce artifacts.
   *
   */
  callback_mode_discrete: int

  /** The call mode used for "Call Method" tracks. */
  callback_mode_method: int

  /** The process notification in which to update animations. */
  callback_mode_process: int

  /**
   * If `true`, the blending uses the deterministic algorithm. The total weight is not normalized and the result is accumulated with an initial value (`0` or a `"RESET"` animation if present).
   *
   * This means that if the total amount of blending is `0.0`, the result is equal to the `"RESET"` animation.
   *
   * If the number of tracks between the blended animations is different, the animation with the missing track is treated as if it had the initial value.
   *
   * If `false`, The blend does not use the deterministic algorithm. The total weight is normalized and always `1.0`. If the number of tracks between the blended animations is different, nothing is done about the animation that is missing a track.
   *
   * **Note:** In [AnimationTree], the blending with [AnimationNodeAdd2], [AnimationNodeAdd3], [AnimationNodeSub2] or the weight greater than `1.0` may produce unexpected results.
   *
   * For example, if [AnimationNodeAdd2] blends two nodes with the amount `1.0`, then total weight is `2.0` but it will be normalized to make the total amount `1.0` and the result will be equal to [AnimationNodeBlend2] with the amount `0.5`.
   *
   */
  deterministic: boolean

  /**
   * This is used by the editor. If set to `true`, the scene will be saved with the effects of the reset animation (the animation with the key `"RESET"`) applied as if it had been seeked to time 0, with the editor keeping the values that the scene had before saving.
   *
   * This makes it more convenient to preview and edit animations in the editor, as changes to the scene will not be saved as long as they are set in the reset animation.
   *
   */
  reset_on_save: boolean

  /** If [code]true[/code], [method get_root_motion_position] value is extracted as a local translation value before blending. In other words, it is treated like the translation is done after the rotation. */
  root_motion_local: boolean

  /**
   * The path to the Animation track used for root motion. Paths must be valid scene-tree paths to a node, and must be specified starting from the parent node of the node that will reproduce the animation. The [member root_motion_track] uses the same format as [method Animation.track_set_path], but note that a bone must be specified.
   *
   * If the track has type [constant Animation.TYPE_POSITION_3D], [constant Animation.TYPE_ROTATION_3D], or [constant Animation.TYPE_SCALE_3D] the transformation will be canceled visually, and the animation will appear to stay in place. See also [method get_root_motion_position], [method get_root_motion_rotation], [method get_root_motion_scale], and [RootMotionView].
   *
   */
  root_motion_track: NodePathType

  /** The node which node path references will travel from. */
  root_node: NodePathType

  /** A virtual function for processing after getting a key during playback. */
  protected _post_process_key_value(
    animation: Animation,
    track: int,
    value: any,
    object_id: int,
    object_sub_idx: int
  ): any

  /**
   * Adds [param library] to the animation player, under the key [param name].
   *
   * AnimationMixer has a global library by default with an empty string as key. For adding an animation to the global library:
   *
   * @example
   *
   *
   * var global_library = mixer.get_animation_library("")
   * global_library.add_animation("animation_name", animation_resource)
   *
   * @summary
   *
   *
   */
  add_animation_library(name: StringName, library: AnimationLibrary): int

  /** Manually advance the animations by the specified time (in seconds). */
  advance(delta: float): void

  /**
   * If the animation track specified by [param name] has an option [constant Animation.UPDATE_CAPTURE], stores current values of the objects indicated by the track path as a cache. If there is already a captured cache, the old cache is discarded.
   *
   * After this it will interpolate with current animation blending result during the playback process for the time specified by [param duration], working like a crossfade.
   *
   * You can specify [param trans_type] as the curve for the interpolation. For better results, it may be appropriate to specify [constant Tween.TRANS_LINEAR] for cases where the first key of the track begins with a non-zero value or where the key value does not change, and [constant Tween.TRANS_QUAD] for cases where the key value changes linearly.
   *
   */
  capture(
    name: StringName,
    duration: float,
    trans_type?: int,
    ease_type?: int
  ): void

  /** [AnimationMixer] caches animated nodes. It may not notice if a node disappears; [method clear_caches] forces it to update the cache again. */
  clear_caches(): void

  /** Returns the key of [param animation] or an empty [StringName] if not found. */
  find_animation(animation: Animation): StringName

  /** Returns the key for the [AnimationLibrary] that contains [param animation] or an empty [StringName] if not found. */
  find_animation_library(animation: Animation): StringName

  /** Returns the [Animation] with the key [param name]. If the animation does not exist, [code]null[/code] is returned and an error is logged. */
  get_animation(name: StringName): Animation

  /**
   * Returns the first [AnimationLibrary] with key [param name] or `null` if not found.
   *
   * To get the [AnimationMixer]'s global animation library, use `get_animation_library("")`.
   *
   */
  get_animation_library(name: StringName): AnimationLibrary

  /** Returns the list of stored library keys. */
  get_animation_library_list(): StringName[]

  /** Returns the list of stored animation keys. */
  get_animation_list(): PackedStringArray

  /**
   * Retrieve the motion delta of position with the [member root_motion_track] as a [Vector3] that can be used elsewhere.
   *
   * If [member root_motion_track] is not a path to a track of type [constant Animation.TYPE_POSITION_3D], returns `Vector3(0, 0, 0)`.
   *
   * See also [member root_motion_track] and [RootMotionView].
   *
   * The most basic example is applying position to [CharacterBody3D]:
   *
   * @example
   *
   *
   * var current_rotation
   * func _process(delta):
   * 	if Input.is_action_just_pressed("animate"):
   * 		current_rotation = get_quaternion()
   * 		state_machine.travel("Animate")
   * 	var velocity = current_rotation * animation_tree.get_root_motion_position() / delta
   * 	set_velocity(velocity)
   * 	move_and_slide()
   *
   * @summary
   *
   *
   * By using this in combination with [method get_root_motion_rotation_accumulator], you can apply the root motion position more correctly to account for the rotation of the node.
   *
   * @example
   *
   *
   * func _process(delta):
   * 	if Input.is_action_just_pressed("animate"):
   * 		state_machine.travel("Animate")
   * 	set_quaternion(get_quaternion() * animation_tree.get_root_motion_rotation())
   * 	var velocity = (animation_tree.get_root_motion_rotation_accumulator().inverse() * get_quaternion()) * animation_tree.get_root_motion_position() / delta
   * 	set_velocity(velocity)
   * 	move_and_slide()
   *
   * @summary
   *
   *
   * If [member root_motion_local] is `true`, returns the pre-multiplied translation value with the inverted rotation.
   *
   * In this case, the code can be written as follows:
   *
   * @example
   *
   *
   * func _process(delta):
   * 	if Input.is_action_just_pressed("animate"):
   * 		state_machine.travel("Animate")
   * 	set_quaternion(get_quaternion() * animation_tree.get_root_motion_rotation())
   * 	var velocity = get_quaternion() * animation_tree.get_root_motion_position() / delta
   * 	set_velocity(velocity)
   * 	move_and_slide()
   *
   * @summary
   *
   *
   */
  get_root_motion_position(): Vector3

  /**
   * Retrieve the blended value of the position tracks with the [member root_motion_track] as a [Vector3] that can be used elsewhere.
   *
   * This is useful in cases where you want to respect the initial key values of the animation.
   *
   * For example, if an animation with only one key `Vector3(0, 0, 0)` is played in the previous frame and then an animation with only one key `Vector3(1, 0, 1)` is played in the next frame, the difference can be calculated as follows:
   *
   * @example
   *
   *
   * var prev_root_motion_position_accumulator
   * func _process(delta):
   * 	if Input.is_action_just_pressed("animate"):
   * 		state_machine.travel("Animate")
   * 	var current_root_motion_position_accumulator = animation_tree.get_root_motion_position_accumulator()
   * 	var difference = current_root_motion_position_accumulator - prev_root_motion_position_accumulator
   * 	prev_root_motion_position_accumulator = current_root_motion_position_accumulator
   * 	transform.origin += difference
   *
   * @summary
   *
   *
   * However, if the animation loops, an unintended discrete change may occur, so this is only useful for some simple use cases.
   *
   */
  get_root_motion_position_accumulator(): Vector3

  /**
   * Retrieve the motion delta of rotation with the [member root_motion_track] as a [Quaternion] that can be used elsewhere.
   *
   * If [member root_motion_track] is not a path to a track of type [constant Animation.TYPE_ROTATION_3D], returns `Quaternion(0, 0, 0, 1)`.
   *
   * See also [member root_motion_track] and [RootMotionView].
   *
   * The most basic example is applying rotation to [CharacterBody3D]:
   *
   * @example
   *
   *
   * func _process(delta):
   * 	if Input.is_action_just_pressed("animate"):
   * 		state_machine.travel("Animate")
   * 	set_quaternion(get_quaternion() * animation_tree.get_root_motion_rotation())
   *
   * @summary
   *
   *
   */
  get_root_motion_rotation(): Quaternion

  /**
   * Retrieve the blended value of the rotation tracks with the [member root_motion_track] as a [Quaternion] that can be used elsewhere.
   *
   * This is necessary to apply the root motion position correctly, taking rotation into account. See also [method get_root_motion_position].
   *
   * Also, this is useful in cases where you want to respect the initial key values of the animation.
   *
   * For example, if an animation with only one key `Quaternion(0, 0, 0, 1)` is played in the previous frame and then an animation with only one key `Quaternion(0, 0.707, 0, 0.707)` is played in the next frame, the difference can be calculated as follows:
   *
   * @example
   *
   *
   * var prev_root_motion_rotation_accumulator
   * func _process(delta):
   * 	if Input.is_action_just_pressed("animate"):
   * 		state_machine.travel("Animate")
   * 	var current_root_motion_rotation_accumulator = animation_tree.get_root_motion_rotation_accumulator()
   * 	var difference = prev_root_motion_rotation_accumulator.inverse() * current_root_motion_rotation_accumulator
   * 	prev_root_motion_rotation_accumulator = current_root_motion_rotation_accumulator
   * 	transform.basis *=  Basis(difference)
   *
   * @summary
   *
   *
   * However, if the animation loops, an unintended discrete change may occur, so this is only useful for some simple use cases.
   *
   */
  get_root_motion_rotation_accumulator(): Quaternion

  /**
   * Retrieve the motion delta of scale with the [member root_motion_track] as a [Vector3] that can be used elsewhere.
   *
   * If [member root_motion_track] is not a path to a track of type [constant Animation.TYPE_SCALE_3D], returns `Vector3(0, 0, 0)`.
   *
   * See also [member root_motion_track] and [RootMotionView].
   *
   * The most basic example is applying scale to [CharacterBody3D]:
   *
   * @example
   *
   *
   * var current_scale = Vector3(1, 1, 1)
   * var scale_accum = Vector3(1, 1, 1)
   * func _process(delta):
   * 	if Input.is_action_just_pressed("animate"):
   * 		current_scale = get_scale()
   * 		scale_accum = Vector3(1, 1, 1)
   * 		state_machine.travel("Animate")
   * 	scale_accum += animation_tree.get_root_motion_scale()
   * 	set_scale(current_scale * scale_accum)
   *
   * @summary
   *
   *
   */
  get_root_motion_scale(): Vector3

  /**
   * Retrieve the blended value of the scale tracks with the [member root_motion_track] as a [Vector3] that can be used elsewhere.
   *
   * For example, if an animation with only one key `Vector3(1, 1, 1)` is played in the previous frame and then an animation with only one key `Vector3(2, 2, 2)` is played in the next frame, the difference can be calculated as follows:
   *
   * @example
   *
   *
   * var prev_root_motion_scale_accumulator
   * func _process(delta):
   * 	if Input.is_action_just_pressed("animate"):
   * 		state_machine.travel("Animate")
   * 	var current_root_motion_scale_accumulator = animation_tree.get_root_motion_scale_accumulator()
   * 	var difference = current_root_motion_scale_accumulator - prev_root_motion_scale_accumulator
   * 	prev_root_motion_scale_accumulator = current_root_motion_scale_accumulator
   * 	transform.basis = transform.basis.scaled(difference)
   *
   * @summary
   *
   *
   * However, if the animation loops, an unintended discrete change may occur, so this is only useful for some simple use cases.
   *
   */
  get_root_motion_scale_accumulator(): Vector3

  /** Returns [code]true[/code] if the [AnimationMixer] stores an [Animation] with key [param name]. */
  has_animation(name: StringName): boolean

  /** Returns [code]true[/code] if the [AnimationMixer] stores an [AnimationLibrary] with key [param name]. */
  has_animation_library(name: StringName): boolean

  /** Removes the [AnimationLibrary] associated with the key [param name]. */
  remove_animation_library(name: StringName): void

  /** Moves the [AnimationLibrary] associated with the key [param name] to the key [param newname]. */
  rename_animation_library(name: StringName, newname: StringName): void

  connect<T extends SignalsOf<AnimationMixer>>(
    signal: T,
    method: SignalFunction<AnimationMixer[T]>
  ): number

  /**
   * Process animation during physics frames (see [constant Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS]). This is especially useful when animating physics bodies.
   *
   */
  static ANIMATION_CALLBACK_MODE_PROCESS_PHYSICS: any

  /**
   * Process animation during process frames (see [constant Node.NOTIFICATION_INTERNAL_PROCESS]).
   *
   */
  static ANIMATION_CALLBACK_MODE_PROCESS_IDLE: any

  /**
   * Do not process animation. Use [method advance] to process the animation manually.
   *
   */
  static ANIMATION_CALLBACK_MODE_PROCESS_MANUAL: any

  /**
   * Batch method calls during the animation process, then do the calls after events are processed. This avoids bugs involving deleting nodes or modifying the AnimationPlayer while playing.
   *
   */
  static ANIMATION_CALLBACK_MODE_METHOD_DEFERRED: any

  /**
   * Make method calls immediately when reached in the animation.
   *
   */
  static ANIMATION_CALLBACK_MODE_METHOD_IMMEDIATE: any

  /**
   * An [constant Animation.UPDATE_DISCRETE] track value takes precedence when blending [constant Animation.UPDATE_CONTINUOUS] or [constant Animation.UPDATE_CAPTURE] track values and [constant Animation.UPDATE_DISCRETE] track values.
   *
   */
  static ANIMATION_CALLBACK_MODE_DISCRETE_DOMINANT: any

  /**
   * An [constant Animation.UPDATE_CONTINUOUS] or [constant Animation.UPDATE_CAPTURE] track value takes precedence when blending the [constant Animation.UPDATE_CONTINUOUS] or [constant Animation.UPDATE_CAPTURE] track values and the [constant Animation.UPDATE_DISCRETE] track values. This is the default behavior for [AnimationPlayer].
   *
   */
  static ANIMATION_CALLBACK_MODE_DISCRETE_RECESSIVE: any

  /**
   * Always treat the [constant Animation.UPDATE_DISCRETE] track value as [constant Animation.UPDATE_CONTINUOUS] with [constant Animation.INTERPOLATION_NEAREST]. This is the default behavior for [AnimationTree].
   *
   * If a value track has un-interpolatable type key values, it is internally converted to use [constant ANIMATION_CALLBACK_MODE_DISCRETE_RECESSIVE] with [constant Animation.UPDATE_DISCRETE].
   *
   * Un-interpolatable type list:
   *
   * - [constant @GlobalScope.TYPE_NIL]
   *
   * - [constant @GlobalScope.TYPE_NODE_PATH]
   *
   * - [constant @GlobalScope.TYPE_RID]
   *
   * - [constant @GlobalScope.TYPE_OBJECT]
   *
   * - [constant @GlobalScope.TYPE_CALLABLE]
   *
   * - [constant @GlobalScope.TYPE_SIGNAL]
   *
   * - [constant @GlobalScope.TYPE_DICTIONARY]
   *
   * - [constant @GlobalScope.TYPE_PACKED_BYTE_ARRAY]
   *
   * [constant @GlobalScope.TYPE_BOOL] and [constant @GlobalScope.TYPE_INT] are treated as [constant @GlobalScope.TYPE_FLOAT] during blending and rounded when the result is retrieved.
   *
   * It is same for arrays and vectors with them such as [constant @GlobalScope.TYPE_PACKED_INT32_ARRAY] or [constant @GlobalScope.TYPE_VECTOR2I], they are treated as [constant @GlobalScope.TYPE_PACKED_FLOAT32_ARRAY] or [constant @GlobalScope.TYPE_VECTOR2]. Also note that for arrays, the size is also interpolated.
   *
   * [constant @GlobalScope.TYPE_STRING] and [constant @GlobalScope.TYPE_STRING_NAME] are interpolated between character codes and lengths, but note that there is a difference in algorithm between interpolation between keys and interpolation by blending.
   *
   */
  static ANIMATION_CALLBACK_MODE_DISCRETE_FORCE_CONTINUOUS: any

  /**
   * Notifies when an animation finished playing.
   *
   * **Note:** This signal is not emitted if an animation is looping.
   *
   */
  $animation_finished: Signal<() => void>

  /**
   * Notifies when the animation libraries have changed.
   *
   */
  $animation_libraries_updated: Signal<() => void>

  /**
   * Notifies when an animation list is changed.
   *
   */
  $animation_list_changed: Signal<() => void>

  /**
   * Notifies when an animation starts playing.
   *
   * **Note:** This signal is not emitted if an animation is looping.
   *
   */
  $animation_started: Signal<() => void>

  /**
   * Notifies when the caches have been cleared, either automatically, or manually via [method clear_caches].
   *
   */
  $caches_cleared: Signal<() => void>

  /**
   * Notifies when the blending result related have been applied to the target objects.
   *
   */
  $mixer_applied: Signal<() => void>

  /**
   * Notifies when the property related process have been updated.
   *
   */
  $mixer_updated: Signal<() => void>
}
