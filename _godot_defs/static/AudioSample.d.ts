/**
 * Base class for audio samples.
 *
 */
declare class AudioSample extends RefCounted {
  /**
   * Base class for audio samples.
   *
   */
  new(): AudioSample
  constructor()
  static new(): AudioSample

  connect<T extends SignalsOf<AudioSample>>(
    signal: T,
    method: SignalFunction<AudioSample[T]>
  ): number
}
