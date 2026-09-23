/**
 * Increases or decreases the volume being routed through the audio bus.
 *
 */
declare class AudioEffectAmplify extends AudioEffect {
  /**
   * Increases or decreases the volume being routed through the audio bus.
   *
   */
  new(): AudioEffectAmplify
  constructor()
  static new(): AudioEffectAmplify

  /** Amount of amplification in decibels. Positive values make the sound louder, negative values make it quieter. Value can range from -80 to 24. */
  volume_db: float

  /**
   * Amount of amplification as a linear value.
   *
   * **Note:** This member modifies [member volume_db] for convenience. The returned value is equivalent to the result of [method @GlobalScope.db_to_linear] on [member volume_db]. Setting this member is equivalent to setting [member volume_db] to the result of [method @GlobalScope.linear_to_db] on a value.
   *
   */
  volume_linear: float

  connect<T extends SignalsOf<AudioEffectAmplify>>(
    signal: T,
    method: SignalFunction<AudioEffectAmplify[T]>
  ): number
}
