/**
 * The [AudioStreamPlayer] node plays an audio stream non-positionally. It is ideal for user interfaces, menus, or background music.
 *
 * To use this node, [member stream] needs to be set to a valid [AudioStream] resource. Playing more than one sound at the same time is also supported, see [member max_polyphony].
 *
 * If you need to play audio at a specific position, use [AudioStreamPlayer2D] or [AudioStreamPlayer3D] instead.
 *
 */
declare class AudioStreamPlayer extends Node {
  /**
   * The [AudioStreamPlayer] node plays an audio stream non-positionally. It is ideal for user interfaces, menus, or background music.
   *
   * To use this node, [member stream] needs to be set to a valid [AudioStream] resource. Playing more than one sound at the same time is also supported, see [member max_polyphony].
   *
   * If you need to play audio at a specific position, use [AudioStreamPlayer2D] or [AudioStreamPlayer3D] instead.
   *
   */
  new(): AudioStreamPlayer
  constructor()
  static new(): AudioStreamPlayer

  /** If [code]true[/code], this node calls [method play] when entering the tree. */
  autoplay: boolean

  /**
   * The target bus name. All sounds from this node will be playing on this bus.
   *
   * **Note:** At runtime, if no bus with the given name exists, all sounds will fall back on `"Master"`. See also [method AudioServer.get_bus_name].
   *
   */
  bus: StringName

  /** The maximum number of sounds this node can play at the same time. Calling [method play] after this value is reached will cut off the oldest sounds. */
  max_polyphony: int

  /** The mix target channels. Has no effect when two speakers or less are detected (see [enum AudioServer.SpeakerMode]). */
  mix_target: int

  /** The audio's pitch and tempo, as a multiplier of the [member stream]'s sample rate. A value of [code]2.0[/code] doubles the audio's pitch, while a value of [code]0.5[/code] halves the pitch. */
  pitch_scale: float

  /** The playback type of the stream player. If set other than to the default value, it will force that playback type. */
  playback_type: int

  /** If [code]true[/code], this node is playing sounds. Setting this property has the same effect as [method play] and [method stop]. */
  playing: boolean

  /** The [AudioStream] resource to be played. Setting this property stops all currently playing sounds. If left empty, the [AudioStreamPlayer] does not work. */
  stream: AudioStream

  /**
   * If `true`, the sounds are paused. Setting [member stream_paused] to `false` resumes all sounds.
   *
   * **Note:** This property is automatically changed when exiting or entering the tree, or this node is paused (see [member Node.process_mode]).
   *
   */
  stream_paused: boolean

  /**
   * Volume of sound, in decibels. This is an offset of the [member stream]'s volume.
   *
   * **Note:** To convert between decibel and linear energy (like most volume sliders do), use [member volume_linear], or [method @GlobalScope.db_to_linear] and [method @GlobalScope.linear_to_db].
   *
   */
  volume_db: float

  /**
   * Volume of sound, as a linear value.
   *
   * **Note:** This member modifies [member volume_db] for convenience. The returned value is equivalent to the result of [method @GlobalScope.db_to_linear] on [member volume_db]. Setting this member is equivalent to setting [member volume_db] to the result of [method @GlobalScope.linear_to_db] on a value.
   *
   */
  volume_linear: float

  /**
   * Returns the position in the [AudioStream] of the latest sound, in seconds. Returns `0.0` if no sounds are playing.
   *
   * **Note:** The position is not always accurate, as the [AudioServer] does not mix audio every processed frame. To get more accurate results, add [method AudioServer.get_time_since_last_mix] to the returned position.
   *
   * **Note:** This method always returns `0.0` if the [member stream] is an [AudioStreamInteractive], since it can have multiple clips playing at once.
   *
   */
  get_playback_position(): float

  /** Returns the latest [AudioStreamPlayback] of this node, usually the most recently created by [method play]. If no sounds are playing, this method fails and returns an empty playback. */
  get_stream_playback(): AudioStreamPlayback

  /** Returns [code]true[/code] if any sound is active, even if [member stream_paused] is set to [code]true[/code]. See also [member playing] and [method get_stream_playback]. */
  has_stream_playback(): boolean

  /** Plays a sound from the beginning, or the given [param from_position] in seconds. */
  play(from_position?: float): void

  /** Restarts all sounds to be played from the given [param to_position], in seconds. Does nothing if no sounds are playing. */
  seek(to_position: float): void

  /** Stops all sounds from this node. */
  stop(): void

  connect<T extends SignalsOf<AudioStreamPlayer>>(
    signal: T,
    method: SignalFunction<AudioStreamPlayer[T]>
  ): number

  /**
   * The audio will be played only on the first channel. This is the default.
   *
   */
  static MIX_TARGET_STEREO: any

  /**
   * The audio will be played on all surround channels.
   *
   */
  static MIX_TARGET_SURROUND: any

  /**
   * The audio will be played on the second channel, which is usually the center.
   *
   */
  static MIX_TARGET_CENTER: any

  /**
   * Emitted when a sound finishes playing without interruptions. This signal is **not** emitted when calling [method stop], or when exiting the tree while sounds are playing.
   *
   */
  $finished: Signal<() => void>
}
