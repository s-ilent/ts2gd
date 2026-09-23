/**
 * Once added to the scene tree and enabled using [method make_current], this node will override the location sounds are heard from. This can be used to listen from a location different from the [Camera3D].
 *
 */
declare class AudioListener3D extends Node3D {
  /**
   * Once added to the scene tree and enabled using [method make_current], this node will override the location sounds are heard from. This can be used to listen from a location different from the [Camera3D].
   *
   */
  new(): AudioListener3D
  constructor()
  static new(): AudioListener3D

  /**
   * If not [constant DOPPLER_TRACKING_DISABLED], this listener will simulate the [url=https://en.wikipedia.org/wiki/Doppler_effect]Doppler effect[/url] for objects changed in particular `_process` methods.
   *
   * **Note:** The Doppler effect will only be heard on [AudioStreamPlayer3D]s if [member AudioStreamPlayer3D.doppler_tracking] is not set to [constant AudioStreamPlayer3D.DOPPLER_TRACKING_DISABLED].
   *
   */
  doppler_tracking: int

  /** Disables the listener to use the current camera's listener instead. */
  clear_current(): void

  /** Returns the listener's global orthonormalized [Transform3D]. */
  get_listener_transform(): Transform3D

  /**
   * Returns `true` if the listener was made current using [method make_current], `false` otherwise.
   *
   * **Note:** There may be more than one AudioListener3D marked as "current" in the scene tree, but only the one that was made current last will be used.
   *
   */
  is_current(): boolean

  /** Enables the listener. This will override the current camera's listener. */
  make_current(): void

  connect<T extends SignalsOf<AudioListener3D>>(
    signal: T,
    method: SignalFunction<AudioListener3D[T]>
  ): number

  /**
   * Disables [url=https://en.wikipedia.org/wiki/Doppler_effect]Doppler effect[/url] simulation (default).
   *
   */
  static DOPPLER_TRACKING_DISABLED: any

  /**
   * Simulate [url=https://en.wikipedia.org/wiki/Doppler_effect]Doppler effect[/url] by tracking positions of objects that are changed in `_process`. Changes in the relative velocity of this listener compared to those objects affect how audio is perceived (changing the audio's [member AudioStreamPlayer3D.pitch_scale]).
   *
   */
  static DOPPLER_TRACKING_IDLE_STEP: any

  /**
   * Simulate [url=https://en.wikipedia.org/wiki/Doppler_effect]Doppler effect[/url] by tracking positions of objects that are changed in `_physics_process`. Changes in the relative velocity of this listener compared to those objects affect how audio is perceived (changing the audio's [member AudioStreamPlayer3D.pitch_scale]).
   *
   */
  static DOPPLER_TRACKING_PHYSICS_STEP: any
}
