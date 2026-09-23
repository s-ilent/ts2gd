/**
 * [SubtweenTweener] is used to execute a [Tween] as one step in a sequence defined by another [Tween]. See [method Tween.tween_subtween] for more usage information.
 *
 * **Note:** [method Tween.tween_subtween] is the only correct way to create [SubtweenTweener]. Any [SubtweenTweener] created manually will not function correctly.
 *
 */
declare class SubtweenTweener extends Tweener {
  /**
   * [SubtweenTweener] is used to execute a [Tween] as one step in a sequence defined by another [Tween]. See [method Tween.tween_subtween] for more usage information.
   *
   * **Note:** [method Tween.tween_subtween] is the only correct way to create [SubtweenTweener]. Any [SubtweenTweener] created manually will not function correctly.
   *
   */
  new(): SubtweenTweener
  constructor()
  static new(): SubtweenTweener

  /** Sets the time in seconds after which the [SubtweenTweener] will start running the subtween. By default there's no delay. */
  set_delay(delay: float): SubtweenTweener

  connect<T extends SignalsOf<SubtweenTweener>>(
    signal: T,
    method: SignalFunction<SubtweenTweener[T]>
  ): number
}
