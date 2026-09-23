/**
 * Allows control of [AnimationTree] state machines created with [AnimationNodeStateMachine]. Retrieve with `$AnimationTree.get("parameters/playback")`.
 *
 * @example
 *
 *
 * var state_machine = $AnimationTree.get("parameters/playback")
 * state_machine.travel("some_state")
 *
 *
 * var stateMachine = GetNode<AnimationTree>("AnimationTree").Get("parameters/playback").As<AnimationNodeStateMachinePlayback>();
 * stateMachine.Travel("some_state");
 *
 * @summary
 *
 *
 */
declare class AnimationNodeStateMachinePlayback extends Resource {
  /**
   * Allows control of [AnimationTree] state machines created with [AnimationNodeStateMachine]. Retrieve with `$AnimationTree.get("parameters/playback")`.
   *
   * @example
   *
   *
   * var state_machine = $AnimationTree.get("parameters/playback")
   * state_machine.travel("some_state")
   *
   *
   * var stateMachine = GetNode<AnimationTree>("AnimationTree").Get("parameters/playback").As<AnimationNodeStateMachinePlayback>();
   * stateMachine.Travel("some_state");
   *
   * @summary
   *
   *
   */
  new(): AnimationNodeStateMachinePlayback
  constructor()
  static new(): AnimationNodeStateMachinePlayback

  /**
   * Returns the current state length.
   *
   * **Note:** It is possible that any [AnimationRootNode] can be nodes as well as animations. This means that there can be multiple animations within a single state. Which animation length has priority depends on the nodes connected inside it. Also, if a transition does not reset, the remaining length at that point will be returned.
   *
   */
  get_current_length(): float

  /**
   * Returns the currently playing animation state.
   *
   * **Note:** When using a cross-fade, the current state changes to the next state immediately after the cross-fade begins.
   *
   */
  get_current_node(): StringName

  /** Returns the playback position within the current animation state. */
  get_current_play_position(): float

  /** Returns the playback state length of the node from [method get_fading_from_node]. Returns [code]0[/code] if no animation fade is occurring. */
  get_fading_from_length(): float

  /** Returns the starting state of currently fading animation. */
  get_fading_from_node(): StringName

  /** Returns the playback position of the node from [method get_fading_from_node]. Returns [code]0[/code] if no animation fade is occurring. */
  get_fading_from_play_position(): float

  /** Returns the length of the current fade animation. Returns [code]0[/code] if no animation fade is occurring. */
  get_fading_length(): float

  /** Returns the playback position of the current fade animation. Returns [code]0[/code] if no animation fade is occurring. */
  get_fading_position(): float

  /** Returns the current travel path as computed internally by the A* algorithm. */
  get_travel_path(): StringName[]

  /** Returns [code]true[/code] if an animation is playing. */
  is_playing(): boolean

  /** If there is a next path by travel or auto advance, immediately transitions from the current state to the next state. */
  next(): void

  /**
   * Starts playing the given animation.
   *
   * If [param reset] is `true`, the animation is played from the beginning.
   *
   */
  start(node: StringName, reset?: boolean): void

  /** Stops the currently playing animation. */
  stop(): void

  /**
   * Transitions from the current state to another one, following the shortest path.
   *
   * If the path does not connect from the current state, the animation will play after the state teleports.
   *
   * If [param reset_on_teleport] is `true`, the animation is played from the beginning when the travel cause a teleportation.
   *
   */
  travel(to_node: StringName, reset_on_teleport?: boolean): void

  connect<T extends SignalsOf<AnimationNodeStateMachinePlayback>>(
    signal: T,
    method: SignalFunction<AnimationNodeStateMachinePlayback[T]>
  ): number

  /**
   * Emitted when the [param state] finishes playback. If [param state] is a state machine set to grouped mode, its signals are passed through with its name prefixed.
   *
   * If there is a crossfade, this will be fired when the influence of the [method get_fading_from_node] animation is no longer present.
   *
   */
  $state_finished: Signal<() => void>

  /**
   * Emitted when the [param state] starts playback. If [param state] is a state machine set to grouped mode, its signals are passed through with its name prefixed.
   *
   */
  $state_started: Signal<() => void>
}
