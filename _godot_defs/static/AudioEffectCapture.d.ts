/**
 * AudioEffectCapture is an AudioEffect which copies all audio frames from the attached audio effect bus into its internal ring buffer.
 *
 * Application code should consume these audio frames from this ring buffer using [method get_buffer] and process it as needed, for example to capture data from an [AudioStreamMicrophone], implement application-defined effects, or to transmit audio over the network. When capturing audio data from a microphone, the format of the samples will be stereo 32-bit floating-point PCM.
 *
 * Unlike [AudioEffectRecord], this effect only returns the raw audio samples instead of encoding them into an [AudioStream].
 *
 */
declare class AudioEffectCapture extends AudioEffect {
  /**
   * AudioEffectCapture is an AudioEffect which copies all audio frames from the attached audio effect bus into its internal ring buffer.
   *
   * Application code should consume these audio frames from this ring buffer using [method get_buffer] and process it as needed, for example to capture data from an [AudioStreamMicrophone], implement application-defined effects, or to transmit audio over the network. When capturing audio data from a microphone, the format of the samples will be stereo 32-bit floating-point PCM.
   *
   * Unlike [AudioEffectRecord], this effect only returns the raw audio samples instead of encoding them into an [AudioStream].
   *
   */
  new(): AudioEffectCapture
  constructor()
  static new(): AudioEffectCapture

  /** Length of the internal ring buffer, in seconds. Setting the buffer length will have no effect if already initialized. */
  buffer_length: float

  /** Returns [code]true[/code] if at least [param frames] audio frames are available to read in the internal ring buffer. */
  can_get_buffer(frames: int): boolean

  /**
   * Clears the internal ring buffer.
   *
   * **Note:** Calling this during a capture can cause the loss of samples which causes popping in the playback.
   *
   */
  clear_buffer(): void

  /**
   * Gets the next [param frames] audio samples from the internal ring buffer.
   *
   * Returns a [PackedVector2Array] containing exactly [param frames] audio samples if available, or an empty [PackedVector2Array] if insufficient data was available.
   *
   * The samples are signed floating-point PCM between `-1` and `1`. You will have to scale them if you want to use them as 8 or 16-bit integer samples. (`v = 0x7fff * samples[0].x`)
   *
   */
  get_buffer(frames: int): PackedVector2Array

  /** Returns the total size of the internal ring buffer in frames. */
  get_buffer_length_frames(): int

  /** Returns the number of audio frames discarded from the audio bus due to full buffer. */
  get_discarded_frames(): int

  /** Returns the number of frames available to read using [method get_buffer]. */
  get_frames_available(): int

  /** Returns the number of audio frames inserted from the audio bus. */
  get_pushed_frames(): int

  connect<T extends SignalsOf<AudioEffectCapture>>(
    signal: T,
    method: SignalFunction<AudioEffectCapture[T]>
  ): number
}
