/**
 * A limiter is an effect designed to disallow sound from going over a given dB threshold. Hard limiters predict volume peaks, and will smoothly apply gain reduction when a peak crosses the ceiling threshold to prevent clipping and distortion. It preserves the waveform and prevents it from crossing the ceiling threshold. Adding one in the Master bus is recommended as a safety measure to prevent sudden volume peaks from occurring, and to prevent distortion caused by clipping.
 *
 */
declare class AudioEffectHardLimiter extends AudioEffect {
  /**
   * A limiter is an effect designed to disallow sound from going over a given dB threshold. Hard limiters predict volume peaks, and will smoothly apply gain reduction when a peak crosses the ceiling threshold to prevent clipping and distortion. It preserves the waveform and prevents it from crossing the ceiling threshold. Adding one in the Master bus is recommended as a safety measure to prevent sudden volume peaks from occurring, and to prevent distortion caused by clipping.
   *
   */
  new(): AudioEffectHardLimiter
  constructor()
  static new(): AudioEffectHardLimiter

  /**
   * The waveform's maximum allowed value, in decibels. This value can range from `-24.0` to `0.0`.
   *
   * The default value of `-0.3` prevents potential inter-sample peaks (ISP) from crossing over 0 dB, which can cause slight distortion on some older hardware.
   *
   */
  ceiling_db: float

  /** Gain to apply before limiting, in decibels. */
  pre_gain_db: float

  /** Time it takes in seconds for the gain reduction to fully release. */
  release: float

  connect<T extends SignalsOf<AudioEffectHardLimiter>>(
    signal: T,
    method: SignalFunction<AudioEffectHardLimiter[T]>
  ): number
}
