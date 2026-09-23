/**
 * The runtime part of an [AudioEffectSpectrumAnalyzer], which can be used to query the magnitude of a frequency range on its host bus.
 *
 * An instance of this class can be obtained with [method AudioServer.get_bus_effect_instance].
 *
 */
declare class AudioEffectSpectrumAnalyzerInstance extends AudioEffectInstance {
  /**
   * The runtime part of an [AudioEffectSpectrumAnalyzer], which can be used to query the magnitude of a frequency range on its host bus.
   *
   * An instance of this class can be obtained with [method AudioServer.get_bus_effect_instance].
   *
   */
  new(): AudioEffectSpectrumAnalyzerInstance
  constructor()
  static new(): AudioEffectSpectrumAnalyzerInstance

  /**
   * Returns the magnitude of the frequencies from [param from_hz] to [param to_hz] in linear energy as a Vector2. The `x` component of the return value represents the left stereo channel, and `y` represents the right channel.
   *
   * [param mode] determines how the frequency range will be processed.
   *
   */
  get_magnitude_for_frequency_range(
    from_hz: float,
    to_hz: float,
    mode?: int
  ): Vector2

  connect<T extends SignalsOf<AudioEffectSpectrumAnalyzerInstance>>(
    signal: T,
    method: SignalFunction<AudioEffectSpectrumAnalyzerInstance[T]>
  ): number

  /**
   * Use the average value across the frequency range as magnitude.
   *
   */
  static MAGNITUDE_AVERAGE: any

  /**
   * Use the maximum value of the frequency range as magnitude.
   *
   */
  static MAGNITUDE_MAX: any
}
