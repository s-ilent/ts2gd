/**
 * A node used for advanced animation transitions in an [AnimationPlayer].
 *
 * **Note:** When linked with an [AnimationPlayer], several properties and methods of the corresponding [AnimationPlayer] will not function as expected. Playback and transitions should be handled using only the [AnimationTree] and its constituent [AnimationNode](s). The [AnimationPlayer] node should be used solely for adding, deleting, and editing animations.
 *
 */
declare class AnimationTree extends AnimationMixer {
  /**
   * A node used for advanced animation transitions in an [AnimationPlayer].
   *
   * **Note:** When linked with an [AnimationPlayer], several properties and methods of the corresponding [AnimationPlayer] will not function as expected. Playback and transitions should be handled using only the [AnimationTree] and its constituent [AnimationNode](s). The [AnimationPlayer] node should be used solely for adding, deleting, and editing animations.
   *
   */
  new(): AnimationTree
  constructor()
  static new(): AnimationTree

  /** The path to the [Node] used to evaluate the [AnimationNode] [Expression] if one is not explicitly specified internally. */
  advance_expression_base_node: NodePathType

  /** The path to the [AnimationPlayer] used for animating. */
  anim_player: NodePathType

  /** The root animation node of this [AnimationTree]. See [AnimationRootNode]. */
  tree_root: AnimationRootNode

  /** Returns the process notification in which to update animations. */
  get_process_callback(): int

  /** Sets the process notification in which to update animations. */
  set_process_callback(mode: int): void

  connect<T extends SignalsOf<AnimationTree>>(
    signal: T,
    method: SignalFunction<AnimationTree[T]>
  ): number

  /** No documentation provided. */
  static ANIMATION_PROCESS_PHYSICS: any

  /** No documentation provided. */
  static ANIMATION_PROCESS_IDLE: any

  /** No documentation provided. */
  static ANIMATION_PROCESS_MANUAL: any

  /**
   * Emitted when the [member anim_player] is changed.
   *
   */
  $animation_player_changed: Signal<() => void>
}
