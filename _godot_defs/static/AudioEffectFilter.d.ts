/**
 * Allows frequencies other than the [member cutoff_hz] to pass.
 *
 */
declare class AudioEffectFilter extends AudioEffect {
  /**
   * Allows frequencies other than the [member cutoff_hz] to pass.
   *
   */
  new(): AudioEffectFilter
  constructor()
  static new(): AudioEffectFilter

  /** Threshold frequency for the filter, in Hz. */
  cutoff_hz: float

  /** Steepness of the cutoff curve in dB per octave, also known as the order of the filter. Higher orders have a more aggressive cutoff. */
  db: int

  /** Gain amount of the frequencies after the filter. */
  gain: float

  /** Amount of boost in the frequency range near the cutoff frequency. */
  resonance: float

  connect<T extends SignalsOf<AudioEffectFilter>>(
    signal: T,
    method: SignalFunction<AudioEffectFilter[T]>
  ): number

  /**
   * Cutting off at 6dB per octave.
   *
   */
  static FILTER_6DB: any

  /**
   * Cutting off at 12dB per octave.
   *
   */
  static FILTER_12DB: any

  /**
   * Cutting off at 18dB per octave.
   *
   */
  static FILTER_18DB: any

  /**
   * Cutting off at 24dB per octave.
   *
   */
  static FILTER_24DB: any
}
