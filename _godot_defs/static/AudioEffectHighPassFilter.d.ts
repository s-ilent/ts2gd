/**
 * Cuts frequencies lower than the [member AudioEffectFilter.cutoff_hz] and allows higher frequencies to pass.
 *
 */
declare class AudioEffectHighPassFilter extends AudioEffectFilter {
  /**
   * Cuts frequencies lower than the [member AudioEffectFilter.cutoff_hz] and allows higher frequencies to pass.
   *
   */
  new(): AudioEffectHighPassFilter
  constructor()
  static new(): AudioEffectHighPassFilter

  connect<T extends SignalsOf<AudioEffectHighPassFilter>>(
    signal: T,
    method: SignalFunction<AudioEffectHighPassFilter[T]>
  ): number
}
