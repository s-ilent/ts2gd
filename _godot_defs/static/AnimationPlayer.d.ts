/**
 * An animation player is used for general-purpose playback of animations. It contains a dictionary of [AnimationLibrary] resources and custom blend times between animation transitions.
 *
 * Some methods and properties use a single key to reference an animation directly. These keys are formatted as the key for the library, followed by a forward slash, then the key for the animation within the library, for example `"movement/run"`. If the library's key is an empty string (known as the default library), the forward slash is omitted, being the same key used by the library.
 *
 * [AnimationPlayer] is better-suited than [Tween] for more complex animations, for example ones with non-trivial timings. It can also be used over [Tween] if the animation track editor is more convenient than doing it in code.
 *
 * Updating the target properties of animations occurs at the process frame.
 *
 */
declare class AnimationPlayer extends AnimationMixer {
  /**
   * An animation player is used for general-purpose playback of animations. It contains a dictionary of [AnimationLibrary] resources and custom blend times between animation transitions.
   *
   * Some methods and properties use a single key to reference an animation directly. These keys are formatted as the key for the library, followed by a forward slash, then the key for the animation within the library, for example `"movement/run"`. If the library's key is an empty string (known as the default library), the forward slash is omitted, being the same key used by the library.
   *
   * [AnimationPlayer] is better-suited than [Tween] for more complex animations, for example ones with non-trivial timings. It can also be used over [Tween] if the animation track editor is more convenient than doing it in code.
   *
   * Updating the target properties of animations occurs at the process frame.
   *
   */
  new(): AnimationPlayer
  constructor()
  static new(): AnimationPlayer

  /** If playing, the current animation's key, otherwise, the animation last played. When set, this changes the animation, but will not play it unless already playing. See also [member current_animation]. */
  assigned_animation: StringName

  /** The key of the animation to play when the scene loads. */
  autoplay: StringName

  /**
   * The key of the currently playing animation. If no animation is playing, the property's value is an empty string. Changing this value does not restart the animation. See [method play] for more information on playing animations.
   *
   * **Note:** While this property appears in the Inspector, it's not meant to be edited, and it's not saved in the scene. This property is mainly used to get the currently playing animation, and internally for animation playback tracks. For more information, see [Animation].
   *
   */
  current_animation: StringName

  /** The length (in seconds) of the currently playing animation. */
  current_animation_length: float

  /** The position (in seconds) of the currently playing animation. */
  current_animation_position: float

  /**
   * If `true` and the engine is running in Movie Maker mode (see [MovieWriter]), exits the engine with [method SceneTree.quit] as soon as an animation is done playing in this [AnimationPlayer]. A message is printed when the engine quits for this reason.
   *
   * **Note:** This obeys the same logic as the [signal AnimationMixer.animation_finished] signal, so it will not quit the engine if the animation is set to be looping.
   *
   */
  movie_quit_on_finish: boolean

  /**
   * If `true`, performs [method AnimationMixer.capture] before playback automatically. This means just [method play_with_capture] is executed with default arguments instead of [method play].
   *
   * **Note:** Capture interpolation is only performed if the animation contains a capture track. See also [constant Animation.UPDATE_CAPTURE].
   *
   */
  playback_auto_capture: boolean

  /**
   * See also [method play_with_capture] and [method AnimationMixer.capture].
   *
   * If [member playback_auto_capture_duration] is negative value, the duration is set to the interval between the current position and the first key.
   *
   */
  playback_auto_capture_duration: float

  /** The ease type of the capture interpolation. See also [enum Tween.EaseType]. */
  playback_auto_capture_ease_type: int

  /** The transition type of the capture interpolation. See also [enum Tween.TransitionType]. */
  playback_auto_capture_transition_type: int

  /** The default time in which to blend animations. Ranges from 0 to 4096 with 0.01 precision. */
  playback_default_blend_time: float

  /**
   * The speed scaling ratio. For example, if this value is `1`, then the animation plays at normal speed. If it's `0.5`, then it plays at half speed. If it's `2`, then it plays at double speed.
   *
   * If set to a negative value, the animation is played in reverse. If set to `0`, the animation will not advance.
   *
   */
  speed_scale: float

  /** Returns the key of the animation which is queued to play after the [param animation_from] animation. */
  animation_get_next(animation_from: StringName): StringName

  /** Triggers the [param animation_to] animation when the [param animation_from] animation completes. */
  animation_set_next(animation_from: StringName, animation_to: StringName): void

  /** Clears all queued, unplayed animations. */
  clear_queue(): void

  /** Returns the blend time (in seconds) between two animations, referenced by their keys. */
  get_blend_time(animation_from: StringName, animation_to: StringName): float

  /** Returns the call mode used for "Call Method" tracks. */
  get_method_call_mode(): int

  /**
   * Returns the actual playing speed of current animation or `0` if not playing. This speed is the [member speed_scale] property multiplied by `custom_speed` argument specified when calling the [method play] method.
   *
   * Returns a negative value if the current animation is playing backwards.
   *
   */
  get_playing_speed(): float

  /** Returns the process notification in which to update animations. */
  get_process_callback(): int

  /** Returns a list of the animation keys that are currently queued to play. */
  get_queue(): StringName[]

  /** Returns the node which node path references will travel from. */
  get_root(): NodePathType

  /** Returns the end time of the section currently being played. */
  get_section_end_time(): float

  /** Returns the start time of the section currently being played. */
  get_section_start_time(): float

  /** Returns [code]true[/code] if an animation is currently playing with a section. */
  has_section(): boolean

  /**
   * Returns `true` if the an animation is currently active. An animation is active if it was played by calling [method play] and was not finished yet, or was stopped by calling [method stop].
   *
   * This can be used to check whether an animation is currently paused or stopped.
   *
   * @example
   *
   * var is_paused = not is_playing() and is_animation_active()
   * var is_stopped = not is_playing() and not is_animation_active()
   * @summary
   *
   *
   */
  is_animation_active(): boolean

  /** Returns [code]true[/code] if an animation is currently playing (even if [member speed_scale] and/or [code]custom_speed[/code] are [code]0[/code]). */
  is_playing(): boolean

  /**
   * Pauses the currently playing animation. The [member current_animation_position] will be kept and calling [method play] or [method play_backwards] without arguments or with the same animation name as [member assigned_animation] will resume the animation.
   *
   * See also [method stop].
   *
   */
  pause(): void

  /**
   * Plays the animation with key [param name]. Custom blend times and speed can be set.
   *
   * The [param from_end] option only affects when switching to a new animation track, or if the same track but at the start or end. It does not affect resuming playback that was paused in the middle of an animation. If [param custom_speed] is negative and [param from_end] is `true`, the animation will play backwards (which is equivalent to calling [method play_backwards]).
   *
   * The [AnimationPlayer] keeps track of its current or last played animation with [member assigned_animation]. If this method is called with that same animation [param name], or with no [param name] parameter, the assigned animation will resume playing if it was paused.
   *
   * **Note:** The animation will be updated the next time the [AnimationPlayer] is processed. If other variables are updated at the same time this is called, they may be updated too early. To perform the update immediately, call `advance(0)`.
   *
   */
  play(
    name?: StringName,
    custom_blend?: float,
    custom_speed?: float,
    from_end?: boolean
  ): void

  /**
   * Plays the animation with key [param name] in reverse.
   *
   * This method is a shorthand for [method play] with `custom_speed = -1.0` and `from_end = true`, so see its description for more information.
   *
   */
  play_backwards(name?: StringName, custom_blend?: float): void

  /**
   * Plays the animation with key [param name] and the section starting from [param start_time] and ending on [param end_time]. See also [method play].
   *
   * Setting [param start_time] to a value outside the range of the animation means the start of the animation will be used instead, and setting [param end_time] to a value outside the range of the animation means the end of the animation will be used instead. [param start_time] cannot be equal to [param end_time].
   *
   */
  play_section(
    name?: StringName,
    start_time?: float,
    end_time?: float,
    custom_blend?: float,
    custom_speed?: float,
    from_end?: boolean
  ): void

  /**
   * Plays the animation with key [param name] and the section starting from [param start_time] and ending on [param end_time] in reverse.
   *
   * This method is a shorthand for [method play_section] with `custom_speed = -1.0` and `from_end = true`, see its description for more information.
   *
   */
  play_section_backwards(
    name?: StringName,
    start_time?: float,
    end_time?: float,
    custom_blend?: float
  ): void

  /**
   * Plays the animation with key [param name] and the section starting from [param start_marker] and ending on [param end_marker].
   *
   * If the start marker is empty, the section starts from the beginning of the animation. If the end marker is empty, the section ends on the end of the animation. See also [method play].
   *
   */
  play_section_with_markers(
    name?: StringName,
    start_marker?: StringName,
    end_marker?: StringName,
    custom_blend?: float,
    custom_speed?: float,
    from_end?: boolean
  ): void

  /**
   * Plays the animation with key [param name] and the section starting from [param start_marker] and ending on [param end_marker] in reverse.
   *
   * This method is a shorthand for [method play_section_with_markers] with `custom_speed = -1.0` and `from_end = true`, see its description for more information.
   *
   */
  play_section_with_markers_backwards(
    name?: StringName,
    start_marker?: StringName,
    end_marker?: StringName,
    custom_blend?: float
  ): void

  /**
   * See also [method AnimationMixer.capture].
   *
   * You can use this method to use more detailed options for capture than those performed by [member playback_auto_capture]. When [member playback_auto_capture] is `false`, this method is almost the same as the following:
   *
   * @example
   *
   * capture(name, duration, trans_type, ease_type)
   * play(name, custom_blend, custom_speed, from_end)
   * @summary
   *
   *
   * If [param name] is blank, it specifies [member assigned_animation].
   *
   * If [param duration] is a negative value, the duration is set to the interval between the current position and the first key, when [param from_end] is `true`, uses the interval between the current position and the last key instead.
   *
   * **Note:** The [param duration] takes [member speed_scale] into account, but [param custom_speed] does not, because the capture cache is interpolated with the blend result and the result may contain multiple animations.
   *
   */
  play_with_capture(
    name?: StringName,
    duration?: float,
    custom_blend?: float,
    custom_speed?: float,
    from_end?: boolean,
    trans_type?: int,
    ease_type?: int
  ): void

  /**
   * Queues an animation for playback once the current animation and all previously queued animations are done.
   *
   * **Note:** If a looped animation is currently playing, the queued animation will never play unless the looped animation is stopped somehow.
   *
   */
  queue(name: StringName): void

  /** Resets the current section. Does nothing if a section has not been set. */
  reset_section(): void

  /**
   * Seeks the animation to the [param seconds] point in time (in seconds). If [param update] is `true`, the animation updates too, otherwise it updates at process time. Events between the current frame and [param seconds] are skipped.
   *
   * If [param update_only] is `true`, the method / audio / animation playback tracks will not be processed.
   *
   * **Note:** Seeking to the end of the animation doesn't emit [signal AnimationMixer.animation_finished]. If you want to skip animation and emit the signal, use [method AnimationMixer.advance].
   *
   */
  seek(seconds: float, update?: boolean, update_only?: boolean): void

  /** Specifies a blend time (in seconds) between two animations, referenced by their keys. */
  set_blend_time(
    animation_from: StringName,
    animation_to: StringName,
    sec: float
  ): void

  /** Sets the call mode used for "Call Method" tracks. */
  set_method_call_mode(mode: int): void

  /** Sets the process notification in which to update animations. */
  set_process_callback(mode: int): void

  /** Sets the node which node path references will travel from. */
  set_root(path: NodePathType): void

  /** Changes the start and end times of the section being played. The current playback position will be clamped within the new section. See also [method play_section]. */
  set_section(start_time?: float, end_time?: float): void

  /**
   * Changes the start and end markers of the section being played. The current playback position will be clamped within the new section. See also [method play_section_with_markers].
   *
   * If the argument is empty, the section uses the beginning or end of the animation. If both are empty, it means that the section is not set.
   *
   */
  set_section_with_markers(
    start_marker?: StringName,
    end_marker?: StringName
  ): void

  /**
   * Stops the currently playing animation. The animation position is reset to `0` and the `custom_speed` is reset to `1.0`. See also [method pause].
   *
   * If [param keep_state] is `true`, the animation state is not updated visually.
   *
   * **Note:** The method / audio / animation playback tracks will not be processed by this method.
   *
   */
  stop(keep_state?: boolean): void

  connect<T extends SignalsOf<AnimationPlayer>>(
    signal: T,
    method: SignalFunction<AnimationPlayer[T]>
  ): number

  /** No documentation provided. */
  static ANIMATION_PROCESS_PHYSICS: any

  /** No documentation provided. */
  static ANIMATION_PROCESS_IDLE: any

  /** No documentation provided. */
  static ANIMATION_PROCESS_MANUAL: any

  /** No documentation provided. */
  static ANIMATION_METHOD_CALL_DEFERRED: any

  /** No documentation provided. */
  static ANIMATION_METHOD_CALL_IMMEDIATE: any

  /**
   * Emitted when a queued animation plays after the previous animation finished. See also [method AnimationPlayer.queue].
   *
   * **Note:** The signal is not emitted when the animation is changed via [method AnimationPlayer.play] or by an [AnimationTree].
   *
   */
  $animation_changed: Signal<() => void>

  /**
   * Emitted when [member current_animation] changes.
   *
   */
  $current_animation_changed: Signal<() => void>
}
