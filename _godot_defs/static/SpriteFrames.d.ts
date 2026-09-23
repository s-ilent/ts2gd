/**
 * Sprite frame library for an [AnimatedSprite2D] or [AnimatedSprite3D] node. Contains frames and animation data for playback.
 *
 */
declare class SpriteFrames extends Resource {
  /**
   * Sprite frame library for an [AnimatedSprite2D] or [AnimatedSprite3D] node. Contains frames and animation data for playback.
   *
   */
  new(): SpriteFrames
  constructor()
  static new(): SpriteFrames

  /** Adds a new [param anim] animation to the library. */
  add_animation(anim: StringName): void

  /** Adds a frame to the [param anim] animation. If [param at_position] is [code]-1[/code], the frame will be added to the end of the animation. [param duration] specifies the relative duration, see [method get_frame_duration] for details. */
  add_frame(
    anim: StringName,
    texture: Texture2D,
    duration?: float,
    at_position?: int
  ): void

  /** Removes all frames from the [param anim] animation. */
  clear(anim: StringName): void

  /** Removes all animations. An empty [code]default[/code] animation will be created. */
  clear_all(): void

  /** Duplicates the animation [param anim_from] to a new animation named [param anim_to]. Fails if [param anim_to] already exists, or if [param anim_from] does not exist. */
  duplicate_animation(anim_from: StringName, anim_to: StringName): void

  /** Returns [code]true[/code] if the given animation is configured to loop when it finishes playing. Otherwise, returns [code]false[/code]. */
  get_animation_loop(anim: StringName): boolean

  /** Returns an array containing the names associated to each animation. Values are placed in alphabetical order. */
  get_animation_names(): PackedStringArray

  /** Returns the speed in frames per second for the [param anim] animation. */
  get_animation_speed(anim: StringName): float

  /** Returns the number of frames for the [param anim] animation. */
  get_frame_count(anim: StringName): int

  /**
   * Returns a relative duration of the frame [param idx] in the [param anim] animation (defaults to `1.0`). For example, a frame with a duration of `2.0` is displayed twice as long as a frame with a duration of `1.0`. You can calculate the absolute duration (in seconds) of a frame using the following formula:
   *
   * @example
   *
   * absolute_duration = relative_duration / (animation_fps * abs(playing_speed))
   * @summary
   *
   *
   * In this example, `playing_speed` refers to either [method AnimatedSprite2D.get_playing_speed] or [method AnimatedSprite3D.get_playing_speed].
   *
   */
  get_frame_duration(anim: StringName, idx: int): float

  /** Returns the texture of the frame [param idx] in the [param anim] animation. */
  get_frame_texture(anim: StringName, idx: int): Texture2D

  /** Returns [code]true[/code] if the [param anim] animation exists. */
  has_animation(anim: StringName): boolean

  /** Removes the [param anim] animation. */
  remove_animation(anim: StringName): void

  /** Removes the [param anim] animation's frame [param idx]. */
  remove_frame(anim: StringName, idx: int): void

  /** Changes the [param anim] animation's name to [param newname]. */
  rename_animation(anim: StringName, newname: StringName): void

  /** If [param loop] is [code]true[/code], the [param anim] animation will loop when it reaches the end, or the start if it is played in reverse. */
  set_animation_loop(anim: StringName, loop: boolean): void

  /** Sets the speed for the [param anim] animation in frames per second. */
  set_animation_speed(anim: StringName, fps: float): void

  /** Sets the [param texture] and the [param duration] of the frame [param idx] in the [param anim] animation. [param duration] specifies the relative duration, see [method get_frame_duration] for details. */
  set_frame(
    anim: StringName,
    idx: int,
    texture: Texture2D,
    duration?: float
  ): void

  connect<T extends SignalsOf<SpriteFrames>>(
    signal: T,
    method: SignalFunction<SpriteFrames[T]>
  ): number
}
