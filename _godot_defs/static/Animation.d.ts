/**
 * This resource holds data that can be used to animate anything in the engine. Animations are divided into tracks and each track must be linked to a node. The state of that node can be changed through time, by adding timed keys (events) to the track.
 *
 * @example
 *
 *
 * # This creates an animation that makes the node "Enemy" move to the right by
 * # 100 pixels in 2.0 seconds.
 * var animation = Animation.new()
 * var track_index = animation.add_track(Animation.TYPE_VALUE)
 * animation.track_set_path(track_index, "Enemy:position:x")
 * animation.track_insert_key(track_index, 0.0, 0)
 * animation.track_insert_key(track_index, 2.0, 100)
 * animation.length = 2.0
 *
 *
 * // This creates an animation that makes the node "Enemy" move to the right by
 * // 100 pixels in 2.0 seconds.
 * var animation = new Animation();
 * int trackIndex = animation.AddTrack(Animation.TrackType.Value);
 * animation.TrackSetPath(trackIndex, "Enemy:position:x");
 * animation.TrackInsertKey(trackIndex, 0.0f, 0);
 * animation.TrackInsertKey(trackIndex, 2.0f, 100);
 * animation.Length = 2.0f;
 *
 * @summary
 *
 *
 * Animations are just data containers, and must be added to nodes such as an [AnimationPlayer] to be played back. Animation tracks have different types, each with its own set of dedicated methods. Check [enum TrackType] to see available types.
 *
 * **Note:** For 3D position/rotation/scale, using the dedicated [constant TYPE_POSITION_3D], [constant TYPE_ROTATION_3D] and [constant TYPE_SCALE_3D] track types instead of [constant TYPE_VALUE] is recommended for performance reasons.
 *
 */
declare class Animation extends Resource {
  /**
   * This resource holds data that can be used to animate anything in the engine. Animations are divided into tracks and each track must be linked to a node. The state of that node can be changed through time, by adding timed keys (events) to the track.
   *
   * @example
   *
   *
   * # This creates an animation that makes the node "Enemy" move to the right by
   * # 100 pixels in 2.0 seconds.
   * var animation = Animation.new()
   * var track_index = animation.add_track(Animation.TYPE_VALUE)
   * animation.track_set_path(track_index, "Enemy:position:x")
   * animation.track_insert_key(track_index, 0.0, 0)
   * animation.track_insert_key(track_index, 2.0, 100)
   * animation.length = 2.0
   *
   *
   * // This creates an animation that makes the node "Enemy" move to the right by
   * // 100 pixels in 2.0 seconds.
   * var animation = new Animation();
   * int trackIndex = animation.AddTrack(Animation.TrackType.Value);
   * animation.TrackSetPath(trackIndex, "Enemy:position:x");
   * animation.TrackInsertKey(trackIndex, 0.0f, 0);
   * animation.TrackInsertKey(trackIndex, 2.0f, 100);
   * animation.Length = 2.0f;
   *
   * @summary
   *
   *
   * Animations are just data containers, and must be added to nodes such as an [AnimationPlayer] to be played back. Animation tracks have different types, each with its own set of dedicated methods. Check [enum TrackType] to see available types.
   *
   * **Note:** For 3D position/rotation/scale, using the dedicated [constant TYPE_POSITION_3D], [constant TYPE_ROTATION_3D] and [constant TYPE_SCALE_3D] track types instead of [constant TYPE_VALUE] is recommended for performance reasons.
   *
   */
  new(): Animation
  constructor()
  static new(): Animation

  /** Returns [code]true[/code] if the capture track is included. This is a cached readonly value for performance. */
  capture_included: boolean

  /**
   * The total length of the animation (in seconds).
   *
   * **Note:** Length is not delimited by the last key, as this one may be before or after the end to ensure correct interpolation and looping.
   *
   */
  length: float

  /** Determines the behavior of both ends of the animation timeline during animation playback. This indicates whether and how the animation should be restarted, and is also used to correctly interpolate animation cycles. */
  loop_mode: int

  /** The animation step value. */
  step: float

  /** Adds a marker to this Animation. */
  add_marker(name: StringName, time: float): void

  /** Adds a track to the Animation. */
  add_track(type: int, at_position?: int): int

  /** Returns the animation name at the key identified by [param key_idx]. The [param track_idx] must be the index of an Animation Track. */
  animation_track_get_key_animation(track_idx: int, key_idx: int): StringName

  /** Inserts a key with value [param animation] at the given [param time] (in seconds). The [param track_idx] must be the index of an Animation Track. */
  animation_track_insert_key(
    track_idx: int,
    time: float,
    animation: StringName
  ): int

  /** Sets the key identified by [param key_idx] to value [param animation]. The [param track_idx] must be the index of an Animation Track. */
  animation_track_set_key_animation(
    track_idx: int,
    key_idx: int,
    animation: StringName
  ): void

  /**
   * Returns the end offset of the key identified by [param key_idx]. The [param track_idx] must be the index of an Audio Track.
   *
   * End offset is the number of seconds cut off at the ending of the audio stream.
   *
   */
  audio_track_get_key_end_offset(track_idx: int, key_idx: int): float

  /**
   * Returns the start offset of the key identified by [param key_idx]. The [param track_idx] must be the index of an Audio Track.
   *
   * Start offset is the number of seconds cut off at the beginning of the audio stream.
   *
   */
  audio_track_get_key_start_offset(track_idx: int, key_idx: int): float

  /** Returns the audio stream of the key identified by [param key_idx]. The [param track_idx] must be the index of an Audio Track. */
  audio_track_get_key_stream(track_idx: int, key_idx: int): Resource

  /**
   * Inserts an Audio Track key at the given [param time] in seconds. The [param track_idx] must be the index of an Audio Track.
   *
   * [param stream] is the [AudioStream] resource to play. [param start_offset] is the number of seconds cut off at the beginning of the audio stream, while [param end_offset] is at the ending.
   *
   */
  audio_track_insert_key(
    track_idx: int,
    time: float,
    stream: Resource,
    start_offset?: float,
    end_offset?: float
  ): int

  /** Returns [code]true[/code] if the track at [param track_idx] will be blended with other animations. */
  audio_track_is_use_blend(track_idx: int): boolean

  /** Sets the end offset of the key identified by [param key_idx] to value [param offset]. The [param track_idx] must be the index of an Audio Track. */
  audio_track_set_key_end_offset(
    track_idx: int,
    key_idx: int,
    offset: float
  ): void

  /** Sets the start offset of the key identified by [param key_idx] to value [param offset]. The [param track_idx] must be the index of an Audio Track. */
  audio_track_set_key_start_offset(
    track_idx: int,
    key_idx: int,
    offset: float
  ): void

  /** Sets the stream of the key identified by [param key_idx] to value [param stream]. The [param track_idx] must be the index of an Audio Track. */
  audio_track_set_key_stream(
    track_idx: int,
    key_idx: int,
    stream: Resource
  ): void

  /** Sets whether the track will be blended with other animations. If [code]true[/code], the audio playback volume changes depending on the blend value. */
  audio_track_set_use_blend(track_idx: int, enable: boolean): void

  /** Returns the in handle of the key identified by [param key_idx]. The [param track_idx] must be the index of a Bezier Track. */
  bezier_track_get_key_in_handle(track_idx: int, key_idx: int): Vector2

  /** Returns the out handle of the key identified by [param key_idx]. The [param track_idx] must be the index of a Bezier Track. */
  bezier_track_get_key_out_handle(track_idx: int, key_idx: int): Vector2

  /** Returns the value of the key identified by [param key_idx]. The [param track_idx] must be the index of a Bezier Track. */
  bezier_track_get_key_value(track_idx: int, key_idx: int): float

  /**
   * Inserts a Bezier Track key at the given [param time] in seconds. The [param track_idx] must be the index of a Bezier Track.
   *
   * [param in_handle] is the left-side weight of the added Bezier curve point, [param out_handle] is the right-side one, while [param value] is the actual value at this point.
   *
   */
  bezier_track_insert_key(
    track_idx: int,
    time: float,
    value: float,
    in_handle?: Vector2,
    out_handle?: Vector2
  ): int

  /** Returns the interpolated value at the given [param time] (in seconds). The [param track_idx] must be the index of a Bezier Track. */
  bezier_track_interpolate(track_idx: int, time: float): float

  /** Sets the in handle of the key identified by [param key_idx] to value [param in_handle]. The [param track_idx] must be the index of a Bezier Track. */
  bezier_track_set_key_in_handle(
    track_idx: int,
    key_idx: int,
    in_handle: Vector2,
    balanced_value_time_ratio?: float
  ): void

  /** Sets the out handle of the key identified by [param key_idx] to value [param out_handle]. The [param track_idx] must be the index of a Bezier Track. */
  bezier_track_set_key_out_handle(
    track_idx: int,
    key_idx: int,
    out_handle: Vector2,
    balanced_value_time_ratio?: float
  ): void

  /** Sets the value of the key identified by [param key_idx] to the given value. The [param track_idx] must be the index of a Bezier Track. */
  bezier_track_set_key_value(track_idx: int, key_idx: int, value: float): void

  /** Inserts a key in a given blend shape track. Returns the key index. */
  blend_shape_track_insert_key(track_idx: int, time: float, amount: float): int

  /** Returns the interpolated blend shape value at the given time (in seconds). The [param track_idx] must be the index of a blend shape track. */
  blend_shape_track_interpolate(
    track_idx: int,
    time_sec: float,
    backward?: boolean
  ): float

  /** Clear the animation (clear all tracks and reset all). */
  clear(): void

  /**
   * Compress the animation and all its tracks in-place. This will make [method track_is_compressed] return `true` once called on this [Animation]. Compressed tracks require less memory to be played, and are designed to be used for complex 3D animations (such as cutscenes) imported from external 3D software. Compression is lossy, but the difference is usually not noticeable in real world conditions.
   *
   * **Note:** Compressed tracks have various limitations (such as not being editable from the editor), so only use compressed animations if you actually need them.
   *
   */
  compress(page_size?: int, fps?: int, split_tolerance?: float): void

  /** Adds a new track to [param to_animation] that is a copy of the given track from this animation. */
  copy_track(track_idx: int, to_animation: Animation): void

  /** Returns the index of the specified track. If the track is not found, return -1. */
  find_track(path: NodePathType, type: int): int

  /** Returns the name of the marker located at the given time. */
  get_marker_at_time(time: float): StringName

  /** Returns the given marker's color. */
  get_marker_color(name: StringName): Color

  /** Returns every marker in this Animation, sorted ascending by time. */
  get_marker_names(): PackedStringArray

  /** Returns the given marker's time. */
  get_marker_time(name: StringName): float

  /** Returns the closest marker that comes after the given time. If no such marker exists, an empty string is returned. */
  get_next_marker(time: float): StringName

  /** Returns the closest marker that comes before the given time. If no such marker exists, an empty string is returned. */
  get_prev_marker(time: float): StringName

  /** Returns the amount of tracks in the animation. */
  get_track_count(): int

  /** Returns [code]true[/code] if this Animation contains a marker with the given name. */
  has_marker(name: StringName): boolean

  /** Returns the method name of a method track. */
  method_track_get_name(track_idx: int, key_idx: int): StringName

  /** Returns the arguments values to be called on a method track for a given key in a given track. */
  method_track_get_params(track_idx: int, key_idx: int): any[]

  /** Optimize the animation and all its tracks in-place. This will preserve only as many keys as are necessary to keep the animation within the specified bounds. */
  optimize(
    allowed_velocity_err?: float,
    allowed_angular_err?: float,
    precision?: int
  ): void

  /** Inserts a key in a given 3D position track. Returns the key index. */
  position_track_insert_key(track_idx: int, time: float, position: Vector3): int

  /** Returns the interpolated position value at the given time (in seconds). The [param track_idx] must be the index of a 3D position track. */
  position_track_interpolate(
    track_idx: int,
    time_sec: float,
    backward?: boolean
  ): Vector3

  /** Removes the marker with the given name from this Animation. */
  remove_marker(name: StringName): void

  /** Removes a track by specifying the track index. */
  remove_track(track_idx: int): void

  /** Inserts a key in a given 3D rotation track. Returns the key index. */
  rotation_track_insert_key(
    track_idx: int,
    time: float,
    rotation: Quaternion
  ): int

  /** Returns the interpolated rotation value at the given time (in seconds). The [param track_idx] must be the index of a 3D rotation track. */
  rotation_track_interpolate(
    track_idx: int,
    time_sec: float,
    backward?: boolean
  ): Quaternion

  /** Inserts a key in a given 3D scale track. Returns the key index. */
  scale_track_insert_key(track_idx: int, time: float, scale: Vector3): int

  /** Returns the interpolated scale value at the given time (in seconds). The [param track_idx] must be the index of a 3D scale track. */
  scale_track_interpolate(
    track_idx: int,
    time_sec: float,
    backward?: boolean
  ): Vector3

  /** Sets the given marker's color. */
  set_marker_color(name: StringName, color: Color): void

  /**
   * Finds the key index by time in a given track. Optionally, only find it if the approx/exact time is given.
   *
   * If [param limit] is `true`, it does not return keys outside the animation range.
   *
   * If [param backward] is `true`, the direction is reversed in methods that rely on one directional processing.
   *
   * For example, in case [param find_mode] is [constant FIND_MODE_NEAREST], if there is no key in the current position just after seeked, the first key found is retrieved by searching before the position, but if [param backward] is `true`, the first key found is retrieved after the position.
   *
   */
  track_find_key(
    track_idx: int,
    time: float,
    find_mode?: int,
    limit?: boolean,
    backward?: boolean
  ): int

  /** Returns [code]true[/code] if the track at [param track_idx] wraps the interpolation loop. New tracks wrap the interpolation loop by default. */
  track_get_interpolation_loop_wrap(track_idx: int): boolean

  /** Returns the interpolation type of a given track. */
  track_get_interpolation_type(track_idx: int): int

  /** Returns the number of keys in a given track. */
  track_get_key_count(track_idx: int): int

  /** Returns the time at which the key is located. */
  track_get_key_time(track_idx: int, key_idx: int): float

  /** Returns the transition curve (easing) for a specific key (see the built-in math function [method @GlobalScope.ease]). */
  track_get_key_transition(track_idx: int, key_idx: int): float

  /** Returns the value of a given key in a given track. */
  track_get_key_value(track_idx: int, key_idx: int): any

  /** Gets the path of a track. For more information on the path format, see [method track_set_path]. */
  track_get_path(track_idx: int): NodePathType

  /** Gets the type of a track. */
  track_get_type(track_idx: int): int

  /** Inserts a generic key in a given track. Returns the key index. */
  track_insert_key(
    track_idx: int,
    time: float,
    key: any,
    transition?: float
  ): int

  /** Returns [code]true[/code] if the track is compressed, [code]false[/code] otherwise. See also [method compress]. */
  track_is_compressed(track_idx: int): boolean

  /** Returns [code]true[/code] if the track at index [param track_idx] is enabled. */
  track_is_enabled(track_idx: int): boolean

  /** Returns [code]true[/code] if the given track is imported. Else, return [code]false[/code]. */
  track_is_imported(track_idx: int): boolean

  /** Moves a track down. */
  track_move_down(track_idx: int): void

  /** Changes the index position of track [param track_idx] to the one defined in [param to_idx]. */
  track_move_to(track_idx: int, to_idx: int): void

  /** Moves a track up. */
  track_move_up(track_idx: int): void

  /** Removes a key by index in a given track. */
  track_remove_key(track_idx: int, key_idx: int): void

  /** Removes a key at [param time] in a given track. */
  track_remove_key_at_time(track_idx: int, time: float): void

  /** Enables/disables the given track. Tracks are enabled by default. */
  track_set_enabled(track_idx: int, enabled: boolean): void

  /** Sets the given track as imported or not. */
  track_set_imported(track_idx: int, imported: boolean): void

  /** If [code]true[/code], the track at [param track_idx] wraps the interpolation loop. */
  track_set_interpolation_loop_wrap(
    track_idx: int,
    interpolation: boolean
  ): void

  /** Sets the interpolation type of a given track. */
  track_set_interpolation_type(track_idx: int, interpolation: int): void

  /** Sets the time of an existing key. */
  track_set_key_time(track_idx: int, key_idx: int, time: float): void

  /** Sets the transition curve (easing) for a specific key (see the built-in math function [method @GlobalScope.ease]). */
  track_set_key_transition(
    track_idx: int,
    key_idx: int,
    transition: float
  ): void

  /** Sets the value of an existing key. */
  track_set_key_value(track_idx: int, key: int, value: any): void

  /**
   * Sets the path of a track. Paths must be valid scene-tree paths to a node and must be specified starting from the [member AnimationMixer.root_node] that will reproduce the animation. Tracks that control properties or bones must append their name after the path, separated by `":"`.
   *
   * For example, `"character/skeleton:ankle"` or `"character/mesh:transform/local"`.
   *
   */
  track_set_path(track_idx: int, path: NodePathType): void

  /** Swaps the track [param track_idx]'s index position with the track [param with_idx]. */
  track_swap(track_idx: int, with_idx: int): void

  /** Returns the update mode of a value track. */
  value_track_get_update_mode(track_idx: int): int

  /**
   * Returns the interpolated value at the given time (in seconds). The [param track_idx] must be the index of a value track.
   *
   * A [param backward] mainly affects the direction of key retrieval of the track with [constant UPDATE_DISCRETE] converted by [constant AnimationMixer.ANIMATION_CALLBACK_MODE_DISCRETE_FORCE_CONTINUOUS] to match the result with [method track_find_key].
   *
   */
  value_track_interpolate(
    track_idx: int,
    time_sec: float,
    backward?: boolean
  ): any

  /** Sets the update mode of a value track. */
  value_track_set_update_mode(track_idx: int, mode: int): void

  connect<T extends SignalsOf<Animation>>(
    signal: T,
    method: SignalFunction<Animation[T]>
  ): number

  /**
   * Value tracks set values in node properties, but only those which can be interpolated. For 3D position/rotation/scale, using the dedicated [constant TYPE_POSITION_3D], [constant TYPE_ROTATION_3D] and [constant TYPE_SCALE_3D] track types instead of [constant TYPE_VALUE] is recommended for performance reasons.
   *
   */
  static TYPE_VALUE: any

  /**
   * 3D position track (values are stored in [Vector3]s).
   *
   */
  static TYPE_POSITION_3D: any

  /**
   * 3D rotation track (values are stored in [Quaternion]s).
   *
   */
  static TYPE_ROTATION_3D: any

  /**
   * 3D scale track (values are stored in [Vector3]s).
   *
   */
  static TYPE_SCALE_3D: any

  /**
   * Blend shape track.
   *
   */
  static TYPE_BLEND_SHAPE: any

  /**
   * Method tracks call functions with given arguments per key.
   *
   */
  static TYPE_METHOD: any

  /**
   * Bezier tracks are used to interpolate a value using custom curves. They can also be used to animate sub-properties of vectors and colors (e.g. alpha value of a [Color]).
   *
   */
  static TYPE_BEZIER: any

  /**
   * Audio tracks are used to play an audio stream with either type of [AudioStreamPlayer]. The stream can be trimmed and previewed in the animation.
   *
   */
  static TYPE_AUDIO: any

  /**
   * Animation tracks play animations in other [AnimationPlayer] nodes.
   *
   */
  static TYPE_ANIMATION: any

  /**
   * No interpolation (nearest value).
   *
   */
  static INTERPOLATION_NEAREST: any

  /**
   * Linear interpolation.
   *
   */
  static INTERPOLATION_LINEAR: any

  /**
   * Cubic interpolation. This looks smoother than linear interpolation, but is more expensive to interpolate. Stick to [constant INTERPOLATION_LINEAR] for complex 3D animations imported from external software, even if it requires using a higher animation framerate in return.
   *
   */
  static INTERPOLATION_CUBIC: any

  /**
   * Linear interpolation with shortest path rotation.
   *
   * **Note:** The result value is always normalized and may not match the key value.
   *
   */
  static INTERPOLATION_LINEAR_ANGLE: any

  /**
   * Cubic interpolation with shortest path rotation.
   *
   * **Note:** The result value is always normalized and may not match the key value.
   *
   */
  static INTERPOLATION_CUBIC_ANGLE: any

  /**
   * Update between keyframes and hold the value.
   *
   */
  static UPDATE_CONTINUOUS: any

  /**
   * Update at the keyframes.
   *
   */
  static UPDATE_DISCRETE: any

  /**
   * Same as [constant UPDATE_CONTINUOUS] but works as a flag to capture the value of the current object and perform interpolation in some methods. See also [method AnimationMixer.capture], [member AnimationPlayer.playback_auto_capture], and [method AnimationPlayer.play_with_capture].
   *
   */
  static UPDATE_CAPTURE: any

  /**
   * At both ends of the animation, the animation will stop playing.
   *
   */
  static LOOP_NONE: any

  /**
   * At both ends of the animation, the animation will be repeated without changing the playback direction.
   *
   */
  static LOOP_LINEAR: any

  /**
   * Repeats playback and reverse playback at both ends of the animation.
   *
   */
  static LOOP_PINGPONG: any

  /**
   * This flag indicates that the animation proceeds without any looping.
   *
   */
  static LOOPED_FLAG_NONE: any

  /**
   * This flag indicates that the animation has reached the end of the animation and just after loop processed.
   *
   */
  static LOOPED_FLAG_END: any

  /**
   * This flag indicates that the animation has reached the start of the animation and just after loop processed.
   *
   */
  static LOOPED_FLAG_START: any

  /**
   * Finds the nearest time key.
   *
   */
  static FIND_MODE_NEAREST: any

  /**
   * Finds only the key with approximating the time.
   *
   */
  static FIND_MODE_APPROX: any

  /**
   * Finds only the key with matching the time.
   *
   */
  static FIND_MODE_EXACT: any
}
