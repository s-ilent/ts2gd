/**
 * Meta class for playing back audio samples.
 *
 */
declare class AudioSamplePlayback extends RefCounted {
  /**
   * Meta class for playing back audio samples.
   *
   */
  new(): AudioSamplePlayback
  constructor()
  static new(): AudioSamplePlayback

  connect<T extends SignalsOf<AudioSamplePlayback>>(
    signal: T,
    method: SignalFunction<AudioSamplePlayback[T]>
  ): number
}
