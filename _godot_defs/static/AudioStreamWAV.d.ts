/**
 * AudioStreamWAV stores sound samples loaded from WAV files. To play the stored sound, use an [AudioStreamPlayer] (for non-positional audio) or [AudioStreamPlayer2D]/[AudioStreamPlayer3D] (for positional audio). The sound can be looped.
 *
 * This class can also be used to store dynamically-generated PCM audio data. See also [AudioStreamGenerator] for procedural audio generation.
 *
 */
declare class AudioStreamWAV extends AudioStream {
  /**
   * AudioStreamWAV stores sound samples loaded from WAV files. To play the stored sound, use an [AudioStreamPlayer] (for non-positional audio) or [AudioStreamPlayer2D]/[AudioStreamPlayer3D] (for positional audio). The sound can be looped.
   *
   * This class can also be used to store dynamically-generated PCM audio data. See also [AudioStreamGenerator] for procedural audio generation.
   *
   */
  new(): AudioStreamWAV
  constructor()
  static new(): AudioStreamWAV

  /**
   * Contains the audio data in bytes.
   *
   * **Note:** If [member format] is set to [constant FORMAT_8_BITS], this property expects signed 8-bit PCM data. To convert from unsigned 8-bit PCM, subtract 128 from each byte.
   *
   * **Note:** If [member format] is set to [constant FORMAT_QOA], this property expects data from a full QOA file.
   *
   */
  data: PackedByteArray

  /** Audio format. */
  format: int

  /** The loop start point (in number of samples, relative to the beginning of the stream). */
  loop_begin: int

  /** The loop end point (in number of samples, relative to the beginning of the stream). */
  loop_end: int

  /** The loop mode. */
  loop_mode: int

  /**
   * The sample rate for mixing this audio. Higher values require more storage space, but result in better quality.
   *
   * In games, common sample rates in use are `11025`, `16000`, `22050`, `32000`, `44100`, and `48000`.
   *
   * According to the [url=https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem]Nyquist-Shannon sampling theorem[/url], there is no quality difference to human hearing when going past 40,000 Hz (since most humans can only hear up to ~20,000 Hz, often less). If you are using lower-pitched sounds such as voices, lower sample rates such as `32000` or `22050` may be usable with no loss in quality.
   *
   */
  mix_rate: int

  /** If [code]true[/code], audio is stereo. */
  stereo: boolean

  /**
   * Contains user-defined tags if found in the WAV data.
   *
   * Commonly used tags include `title`, `artist`, `album`, `tracknumber`, and `date` (`date` does not have a standard date format).
   *
   * **Note:** No tag is **guaranteed** to be present in every file, so make sure to account for the keys not always existing.
   *
   * **Note:** Only WAV files using a `LIST` chunk with an identifier of `INFO` to encode the tags are currently supported.
   *
   */
  tags: Dictionary<any, any>

  /**
   * Creates a new [AudioStreamWAV] instance from the given buffer. The buffer must contain WAV data.
   *
   * The keys and values of [param options] match the properties of [ResourceImporterWAV]. The usage of [param options] is identical to [method AudioStreamWAV.load_from_file].
   *
   */
  static load_from_buffer(
    stream_data: PackedByteArray,
    options?: Dictionary<any, any>
  ): AudioStreamWAV

  /**
   * Creates a new [AudioStreamWAV] instance from the given file path. The file must be in WAV format.
   *
   * The keys and values of [param options] match the properties of [ResourceImporterWAV].
   *
   * **Example:** Load the first file dropped as a WAV and play it:
   *
   * @example
   *
   * @onready var audio_player = $AudioStreamPlayer
   * func _ready():
   * 	get_window().files_dropped.connect(_on_files_dropped)
   * func _on_files_dropped(files):
   * 	if files[0].get_extension() == "wav":
   * 		audio_player.stream = AudioStreamWAV.load_from_file(files[0], {
   * 				"force/max_rate": true,
   * 				"force/max_rate_hz": 11025
   * 			})
   * 		audio_player.play()
   * @summary
   *
   *
   */
  static load_from_file(
    path: string,
    options?: Dictionary<any, any>
  ): AudioStreamWAV

  /**
   * Saves the AudioStreamWAV as a WAV file to [param path]. Samples with IMA ADPCM or Quite OK Audio formats can't be saved.
   *
   * **Note:** A `.wav` extension is automatically appended to [param path] if it is missing.
   *
   */
  save_to_wav(path: string): int

  connect<T extends SignalsOf<AudioStreamWAV>>(
    signal: T,
    method: SignalFunction<AudioStreamWAV[T]>
  ): number

  /**
   * 8-bit PCM audio codec.
   *
   */
  static FORMAT_8_BITS: any

  /**
   * 16-bit PCM audio codec.
   *
   */
  static FORMAT_16_BITS: any

  /**
   * Audio is lossily compressed as IMA ADPCM.
   *
   */
  static FORMAT_IMA_ADPCM: any

  /**
   * Audio is lossily compressed as [url=https://qoaformat.org/]Quite OK Audio[/url].
   *
   */
  static FORMAT_QOA: any

  /**
   * Audio does not loop.
   *
   */
  static LOOP_DISABLED: any

  /**
   * Audio loops the data between [member loop_begin] and [member loop_end], playing forward only.
   *
   */
  static LOOP_FORWARD: any

  /**
   * Audio loops the data between [member loop_begin] and [member loop_end], playing back and forth.
   *
   */
  static LOOP_PINGPONG: any

  /**
   * Audio loops the data between [member loop_begin] and [member loop_end], playing backward only.
   *
   */
  static LOOP_BACKWARD: any
}
