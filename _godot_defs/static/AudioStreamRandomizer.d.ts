/**
 * Picks a random AudioStream from the pool, depending on the playback mode, and applies random pitch shifting and volume shifting during playback.
 *
 */
declare class AudioStreamRandomizer extends AudioStream {
  /**
   * Picks a random AudioStream from the pool, depending on the playback mode, and applies random pitch shifting and volume shifting during playback.
   *
   */
  new(): AudioStreamRandomizer
  constructor()
  static new(): AudioStreamRandomizer

  /** Controls how this AudioStreamRandomizer picks which AudioStream to play next. */
  playback_mode: int

  /**
   * The largest possible frequency multiplier of the random pitch variation. Pitch will be randomly chosen within a range of [code skip-lint]1.0 / random_pitch` and [code skip-lint]random_pitch`. A value of `1.0` means no variation. A value of `2.0` means pitch will be randomized between double and half.
   *
   * **Note:** Setting this property also sets [member random_pitch_semitones].
   *
   */
  random_pitch: float

  /**
   * The largest possible distance, in semitones, of the random pitch variation. A value of `0.0` means no variation.
   *
   * **Note:** Setting this property also sets [member random_pitch].
   *
   */
  random_pitch_semitones: float

  /** The intensity of random volume variation. Volume will be increased or decreased by a random value up to [code skip-lint]random_volume_offset_db[/code]. A value of [code]0.0[/code] means no variation. A value of [code]3.0[/code] means volume will be randomized between [code]-3.0 dB[/code] and [code]+3.0 dB[/code]. */
  random_volume_offset_db: float

  /** The number of streams in the stream pool. */
  streams_count: int

  /** Insert a stream at the specified index. If the index is less than zero, the insertion occurs at the end of the underlying pool. */
  add_stream(index: int, stream: AudioStream, weight?: float): void

  /** Returns the stream at the specified index. */
  get_stream(index: int): AudioStream

  /** Returns the probability weight associated with the stream at the given index. */
  get_stream_probability_weight(index: int): float

  /** Move a stream from one index to another. */
  move_stream(index_from: int, index_to: int): void

  /** Remove the stream at the specified index. */
  remove_stream(index: int): void

  /** Set the AudioStream at the specified index. */
  set_stream(index: int, stream: AudioStream): void

  /** Set the probability weight of the stream at the specified index. The higher this value, the more likely that the randomizer will choose this stream during random playback modes. */
  set_stream_probability_weight(index: int, weight: float): void

  connect<T extends SignalsOf<AudioStreamRandomizer>>(
    signal: T,
    method: SignalFunction<AudioStreamRandomizer[T]>
  ): number

  /**
   * Pick a stream at random according to the probability weights chosen for each stream, but avoid playing the same stream twice in a row whenever possible. If only 1 sound is present in the pool, the same sound will always play, effectively allowing repeats to occur.
   *
   */
  static PLAYBACK_RANDOM_NO_REPEATS: any

  /**
   * Pick a stream at random according to the probability weights chosen for each stream. If only 1 sound is present in the pool, the same sound will always play.
   *
   */
  static PLAYBACK_RANDOM: any

  /**
   * Play streams in the order they appear in the stream pool. If only 1 sound is present in the pool, the same sound will always play.
   *
   */
  static PLAYBACK_SEQUENTIAL: any
}
