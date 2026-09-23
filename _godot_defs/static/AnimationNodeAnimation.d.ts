/**
 * A resource to add to an [AnimationNodeBlendTree]. Only has one output port using the [member animation] property. Used as an input for [AnimationNode]s that blend animations together.
 *
 */
declare class AnimationNodeAnimation extends AnimationRootNode {
  /**
   * A resource to add to an [AnimationNodeBlendTree]. Only has one output port using the [member animation] property. Used as an input for [AnimationNode]s that blend animations together.
   *
   */
  new(): AnimationNodeAnimation
  constructor()
  static new(): AnimationNodeAnimation

  /**
   * If `true`, on receiving a request to play an animation from the start, the first frame is not drawn, but only processed, and playback starts from the next frame.
   *
   * See also the notes of [method AnimationPlayer.play].
   *
   */
  advance_on_start: boolean

  /** Animation to use as an output. It is one of the animations provided by [member AnimationTree.anim_player]. */
  animation: StringName

  /**
   * If [member use_custom_timeline] is `true`, override the loop settings of the original [Animation] resource with the value.
   *
   * **Note:** If the [member Animation.loop_mode] isn't set to looping, the [method Animation.track_set_interpolation_loop_wrap] option will not be respected. If you cannot get the expected behavior, consider duplicating the [Animation] resource and changing the loop settings.
   *
   */
  loop_mode: int

  /** Determines the playback direction of the animation. */
  play_mode: int

  /**
   * If [member use_custom_timeline] is `true`, offset the start position of the animation.
   *
   * This is useful for adjusting which foot steps first in 3D walking animations.
   *
   */
  start_offset: float

  /**
   * If `true`, scales the time so that the length specified in [member timeline_length] is one cycle.
   *
   * This is useful for matching the periods of walking and running animations.
   *
   * If `false`, the original animation length is respected. If you set the loop to [member loop_mode], the animation will loop in [member timeline_length].
   *
   */
  stretch_time_scale: boolean

  /**
   * The length of the custom timeline.
   *
   * If [member stretch_time_scale] is `true`, scales the animation to this length.
   *
   */
  timeline_length: float

  /** If [code]true[/code], [AnimationNode] provides an animation based on the [Animation] resource with some parameters adjusted. */
  use_custom_timeline: boolean

  connect<T extends SignalsOf<AnimationNodeAnimation>>(
    signal: T,
    method: SignalFunction<AnimationNodeAnimation[T]>
  ): number

  /**
   * Plays animation in forward direction.
   *
   */
  static PLAY_MODE_FORWARD: any

  /**
   * Plays animation in backward direction.
   *
   */
  static PLAY_MODE_BACKWARD: any
}
