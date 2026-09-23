/**
 * Base class for audio streams. Audio streams are used for sound effects and music playback, and support WAV (via [AudioStreamWAV]) and Ogg (via [AudioStreamOggVorbis]) file formats.
 *
 */
declare class AudioStream extends Resource {
  /**
   * Base class for audio streams. Audio streams are used for sound effects and music playback, and support WAV (via [AudioStreamWAV]) and Ogg (via [AudioStreamOggVorbis]) file formats.
   *
   */
  new(): AudioStream
  constructor()
  static new(): AudioStream

  /** Override this method to return the bar beats of this stream. */
  protected _get_bar_beats(): int

  /**
   * Overridable method. Should return the total number of beats of this audio stream. Used by the engine to determine the position of every beat.
   *
   * Ideally, the returned value should be based off the stream's sample rate ([member AudioStreamWAV.mix_rate], for example).
   *
   */
  protected _get_beat_count(): int

  /**
   * Overridable method. Should return the tempo of this audio stream, in beats per minute (BPM). Used by the engine to determine the position of every beat.
   *
   * Ideally, the returned value should be based off the stream's sample rate ([member AudioStreamWAV.mix_rate], for example).
   *
   */
  protected _get_bpm(): float

  /** Override this method to customize the returned value of [method get_length]. Should return the length of this audio stream, in seconds. */
  protected _get_length(): float

  /** Return the controllable parameters of this stream. This array contains dictionaries with a property info description format (see [method Object.get_property_list]). Additionally, the default value for this parameter must be added tho each dictionary in "default_value" field. */
  protected _get_parameter_list(): Dictionary<any, any>[]

  /** Override this method to customize the name assigned to this audio stream. Unused by the engine. */
  protected _get_stream_name(): string

  /**
   * Override this method to customize the tags for this audio stream. Should return a [Dictionary] of strings with the tag as the key and its content as the value.
   *
   * Commonly used tags include `title`, `artist`, `album`, `tracknumber`, and `date`.
   *
   */
  protected _get_tags(): Dictionary<any, any>

  /** Override this method to return [code]true[/code] if this stream has a loop. */
  protected _has_loop(): boolean

  /** Override this method to customize the returned value of [method instantiate_playback]. Should return a new [AudioStreamPlayback] created when the stream is played (such as by an [AudioStreamPlayer]). */
  protected _instantiate_playback(): AudioStreamPlayback

  /** Override this method to customize the returned value of [method is_monophonic]. Should return [code]true[/code] if this audio stream only supports one channel. */
  protected _is_monophonic(): boolean

  /** Returns if the current [AudioStream] can be used as a sample. Only static streams can be sampled. */
  can_be_sampled(): boolean

  /** Generates an [AudioSample] based on the current stream. */
  generate_sample(): AudioSample

  /** Returns the length of the audio stream in seconds. If this stream is an [AudioStreamRandomizer], returns the length of the last played stream. If this stream has an indefinite length (such as for [AudioStreamGenerator] and [AudioStreamMicrophone]), returns [code]0.0[/code]. */
  get_length(): float

  /** Returns a newly created [AudioStreamPlayback] intended to play this audio stream. Useful for when you want to extend [method _instantiate_playback] but call [method instantiate_playback] from an internally held AudioStream subresource. An example of this can be found in the source code for [code]AudioStreamRandomPitch::instantiate_playback[/code]. */
  instantiate_playback(): AudioStreamPlayback

  /** Returns [code]true[/code] if the stream is a collection of other streams, [code]false[/code] otherwise. */
  is_meta_stream(): boolean

  /** Returns [code]true[/code] if this audio stream only supports one channel ([i]monophony[/i]), or [code]false[/code] if the audio stream supports two or more channels ([i]polyphony[/i]). */
  is_monophonic(): boolean

  connect<T extends SignalsOf<AudioStream>>(
    signal: T,
    method: SignalFunction<AudioStream[T]>
  ): number

  /**
   * Signal to be emitted to notify when the parameter list changed.
   *
   */
  $parameter_list_changed: Signal<() => void>
}
