/**
 * Cuts frequencies higher than the [member AudioEffectFilter.cutoff_hz] and allows lower frequencies to pass.
 *
 */
declare class AudioEffectLowPassFilter extends AudioEffectFilter {
  /**
   * Cuts frequencies higher than the [member AudioEffectFilter.cutoff_hz] and allows lower frequencies to pass.
   *
   */
  new(): AudioEffectLowPassFilter
  constructor()
  static new(): AudioEffectLowPassFilter

  connect<T extends SignalsOf<AudioEffectLowPassFilter>>(
    signal: T,
    method: SignalFunction<AudioEffectLowPassFilter[T]>
  ): number
}
