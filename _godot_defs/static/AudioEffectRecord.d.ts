/**
 * Allows the user to record the sound from an audio bus into an [AudioStreamWAV]. When used on the "Master" audio bus, this includes all audio output by Godot.
 *
 * Unlike [AudioEffectCapture], this effect encodes the recording with the given format (8-bit, 16-bit, or compressed) instead of giving access to the raw audio samples.
 *
 * Can be used (with an [AudioStreamMicrophone]) to record from a microphone.
 *
 * **Note:** [member ProjectSettings.audio/driver/enable_input] must be `true` for audio input to work. See also that setting's description for caveats related to permissions and operating system privacy settings.
 *
 */
declare class AudioEffectRecord extends AudioEffect {
  /**
   * Allows the user to record the sound from an audio bus into an [AudioStreamWAV]. When used on the "Master" audio bus, this includes all audio output by Godot.
   *
   * Unlike [AudioEffectCapture], this effect encodes the recording with the given format (8-bit, 16-bit, or compressed) instead of giving access to the raw audio samples.
   *
   * Can be used (with an [AudioStreamMicrophone]) to record from a microphone.
   *
   * **Note:** [member ProjectSettings.audio/driver/enable_input] must be `true` for audio input to work. See also that setting's description for caveats related to permissions and operating system privacy settings.
   *
   */
  new(): AudioEffectRecord
  constructor()
  static new(): AudioEffectRecord

  /** Specifies the format in which the sample will be recorded. */
  format: int

  /** Returns the recorded sample. */
  get_recording(): AudioStreamWAV

  /** Returns whether the recording is active or not. */
  is_recording_active(): boolean

  /** If [code]true[/code], the sound will be recorded. Note that restarting the recording will remove the previously recorded sample. */
  set_recording_active(record: boolean): void

  connect<T extends SignalsOf<AudioEffectRecord>>(
    signal: T,
    method: SignalFunction<AudioEffectRecord[T]>
  ): number
}
