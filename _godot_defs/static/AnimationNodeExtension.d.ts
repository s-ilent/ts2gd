/**
 * [AnimationNodeExtension] exposes the APIs of [AnimationRootNode] to allow users to extend it from GDScript, C#, or C++. This class is not meant to be used directly, but to be extended by other classes. It is used to create custom nodes for the [AnimationTree] system.
 *
 */
declare class AnimationNodeExtension extends AnimationNode {
  /**
   * [AnimationNodeExtension] exposes the APIs of [AnimationRootNode] to allow users to extend it from GDScript, C#, or C++. This class is not meant to be used directly, but to be extended by other classes. It is used to create custom nodes for the [AnimationTree] system.
   *
   */
  new(): AnimationNodeExtension
  constructor()
  static new(): AnimationNodeExtension

  /**
   * A version of the [method AnimationNode._process] method that is meant to be overridden by custom nodes. It returns a [PackedFloat32Array] with the processed animation data.
   *
   * The [PackedFloat64Array] parameter contains the playback information, containing the following values encoded as floating point numbers (in order): playback time and delta, start and end times, whether a seek was requested (encoded as a float greater than `0`), whether the seek request was externally requested (encoded as a float greater than `0`), the current [enum Animation.LoopedFlag] (encoded as a float), and the current blend weight.
   *
   * The function must return a [PackedFloat32Array] of the node's time info, containing the following values (in order): animation length, time position, delta, [enum Animation.LoopMode] (encoded as a float), whether the animation is about to end (encoded as a float greater than `0`) and whether the animation is infinite (encoded as a float greater than `0`). All values must be included in the returned array.
   *
   */
  protected _process_animation_node(
    playback_info: PackedFloat64Array,
    test_only: boolean
  ): PackedFloat32Array

  /** Returns the animation's remaining time for the given node info. For looping animations, it will only return the remaining time if [param break_loop] is [code]true[/code], a large integer value will be returned otherwise. */
  static get_remaining_time(
    node_info: PackedFloat32Array,
    break_loop: boolean
  ): float

  /** Returns [code]true[/code] if the animation for the given [param node_info] is looping. */
  static is_looping(node_info: PackedFloat32Array): boolean

  connect<T extends SignalsOf<AnimationNodeExtension>>(
    signal: T,
    method: SignalFunction<AnimationNodeExtension[T]>
  ): number
}
