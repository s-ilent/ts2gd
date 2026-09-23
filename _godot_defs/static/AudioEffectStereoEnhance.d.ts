/**
 * An audio effect that can be used to adjust the intensity of stereo panning.
 *
 */
declare class AudioEffectStereoEnhance extends AudioEffect {
  /**
   * An audio effect that can be used to adjust the intensity of stereo panning.
   *
   */
  new(): AudioEffectStereoEnhance
  constructor()
  static new(): AudioEffectStereoEnhance

  /** Amplifies the difference between stereo channels, increasing or decreasing existing panning. A value of 0.0 will downmix stereo to mono. Does not affect a mono signal. */
  pan_pullout: float

  /** Widens sound stage through phase shifting in conjunction with [member time_pullout_ms]. Just pans sound to the left channel if [member time_pullout_ms] is 0. */
  surround: float

  /** Widens sound stage through phase shifting in conjunction with [member surround]. Just delays the right channel if [member surround] is 0. */
  time_pullout_ms: float

  connect<T extends SignalsOf<AudioEffectStereoEnhance>>(
    signal: T,
    method: SignalFunction<AudioEffectStereoEnhance[T]>
  ): number
}
