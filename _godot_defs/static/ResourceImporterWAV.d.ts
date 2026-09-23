/**
 * WAV is an uncompressed format, which can provide higher quality compared to Ogg Vorbis and MP3. It also has the lowest CPU cost to decode. This means high numbers of WAV sounds can be played at the same time, even on low-end devices.
 *
 * By default, Godot imports WAV files using the lossy Quite OK Audio compression. You may change this by setting the [member compress/mode] property.
 *
 */
declare class ResourceImporterWAV extends ResourceImporter {
  /**
   * WAV is an uncompressed format, which can provide higher quality compared to Ogg Vorbis and MP3. It also has the lowest CPU cost to decode. This means high numbers of WAV sounds can be played at the same time, even on low-end devices.
   *
   * By default, Godot imports WAV files using the lossy Quite OK Audio compression. You may change this by setting the [member compress/mode] property.
   *
   */
  new(): ResourceImporterWAV
  constructor()
  static new(): ResourceImporterWAV

  /**
   * The compression mode to use on import.
   *
   * - **PCM (Uncompressed):** Imports audio data without any form of compression, preserving the highest possible quality. It has the lowest CPU cost, but the highest memory usage.
   *
   * - **IMA ADPCM:** Applies fast, lossy compression during import, noticeably decreasing the quality, but with low CPU cost and memory usage. Does not support seeking and only Forward loop mode is supported.
   *
   * - **[url=https://qoaformat.org/]Quite OK Audio[/url]:** Also applies lossy compression on import, having a slightly higher CPU cost compared to IMA ADPCM, but much higher quality and the lowest memory usage.
   *
   */
  "compress/mode": int

  /** The begin loop point to use when [member edit/loop_mode] is [b]Forward[/b], [b]Ping-Pong[/b], or [b]Backward[/b]. This is set in samples after the beginning of the audio file. */
  "edit/loop_begin": int

  /** The end loop point to use when [member edit/loop_mode] is [b]Forward[/b], [b]Ping-Pong[/b], or [b]Backward[/b]. This is set in samples after the beginning of the audio file. A value of [code]-1[/code] uses the end of the audio file as the end loop point. */
  "edit/loop_end": int

  /**
   * Controls how audio should loop.
   *
   * - **Detect From WAV:** Uses loop information from the WAV metadata.
   *
   * - **Disabled:** Don't loop audio, even if the metadata indicates the file playback should loop.
   *
   * - **Forward:** Standard audio looping. Plays the audio forward from the beginning to [member edit/loop_end], then returns to [member edit/loop_begin] and repeats.
   *
   * - **Ping-Pong:** Plays the audio forward until [member edit/loop_end], then backwards to [member edit/loop_begin], repeating this cycle.
   *
   * - **Backward:** Plays the audio backwards from [member edit/loop_end] to [member edit/loop_begin], then repeats.
   *
   * **Note:** In [AudioStreamPlayer], the [signal AudioStreamPlayer.finished] signal won't be emitted for looping audio when it reaches the end of the audio file, as the audio will keep playing indefinitely.
   *
   */
  "edit/loop_mode": int

  /** If [code]true[/code], normalize the audio volume so that its peak volume is equal to 0 dB. When enabled, normalization will make audio sound louder depending on its original peak volume. */
  "edit/normalize": boolean

  /** If [code]true[/code], automatically trim the beginning and end of the audio if it's lower than -50 dB after normalization (see [member edit/normalize]). This prevents having files with silence at the beginning or end, which increases their size unnecessarily and adds latency to the moment they are played back. A fade-in/fade-out period of 500 samples is also used during trimming to avoid audible pops. */
  "edit/trim": boolean

  /**
   * If `true`, forces the imported audio to use 8-bit quantization if the source file is 16-bit or higher.
   *
   * Enabling this is generally not recommended, as 8-bit quantization decreases audio quality significantly. If you need smaller file sizes, consider using Ogg Vorbis or MP3 audio instead.
   *
   */
  "force/8_bit": boolean

  /**
   * If set to a value greater than `0`, forces the audio's sample rate to be reduced to a value lower than or equal to the value specified in [member force/max_rate_hz].
   *
   * This can decrease file size noticeably on certain sounds, without impacting quality depending on the actual sound's contents. See [url=$DOCS_URL/tutorials/assets_pipeline/importing_audio_samples.html#doc-importing-audio-samples-best-practices]Best practices[/url] for more information.
   *
   */
  "force/max_rate": boolean

  /** The frequency to limit the imported audio sample to (in Hz). Only effective if [member force/max_rate] is [code]true[/code]. */
  "force/max_rate_hz": float

  /** If [code]true[/code], forces the imported audio to be mono if the source file is stereo. This decreases the file size by 50% by merging the two channels into one. */
  "force/mono": boolean

  connect<T extends SignalsOf<ResourceImporterWAV>>(
    signal: T,
    method: SignalFunction<ResourceImporterWAV[T]>
  ): number
}
