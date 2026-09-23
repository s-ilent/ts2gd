/**
 * Base resource for [AnimationTree] nodes. In general, it's not used directly, but you can create custom ones with custom blending formulas.
 *
 * Inherit this when creating animation nodes mainly for use in [AnimationNodeBlendTree], otherwise [AnimationRootNode] should be used instead.
 *
 * You can access the time information as read-only parameter which is processed and stored in the previous frame for all nodes except [AnimationNodeOutput].
 *
 * **Note:** If multiple inputs exist in the [AnimationNode], which time information takes precedence depends on the type of [AnimationNode].
 *
 * @example
 *
 * var current_length = $AnimationTree["parameters/AnimationNodeName/current_length"]
 * var current_position = $AnimationTree["parameters/AnimationNodeName/current_position"]
 * var current_delta = $AnimationTree["parameters/AnimationNodeName/current_delta"]
 * @summary
 *
 *
 */
declare class AnimationNode extends Resource {
  /**
   * Base resource for [AnimationTree] nodes. In general, it's not used directly, but you can create custom ones with custom blending formulas.
   *
   * Inherit this when creating animation nodes mainly for use in [AnimationNodeBlendTree], otherwise [AnimationRootNode] should be used instead.
   *
   * You can access the time information as read-only parameter which is processed and stored in the previous frame for all nodes except [AnimationNodeOutput].
   *
   * **Note:** If multiple inputs exist in the [AnimationNode], which time information takes precedence depends on the type of [AnimationNode].
   *
   * @example
   *
   * var current_length = $AnimationTree["parameters/AnimationNodeName/current_length"]
   * var current_position = $AnimationTree["parameters/AnimationNodeName/current_position"]
   * var current_delta = $AnimationTree["parameters/AnimationNodeName/current_delta"]
   * @summary
   *
   *
   */
  new(): AnimationNode
  constructor()
  static new(): AnimationNode

  /** If [code]true[/code], filtering is enabled. */
  filter_enabled: boolean

  /** When inheriting from [AnimationRootNode], implement this virtual method to override the text caption for this animation node. */
  protected _get_caption(): string

  /** When inheriting from [AnimationRootNode], implement this virtual method to return a child animation node by its [param name]. */
  protected _get_child_by_name(name: StringName): AnimationNode

  /** When inheriting from [AnimationRootNode], implement this virtual method to return all child animation nodes in order as a [code]name: node[/code] dictionary. */
  protected _get_child_nodes(): Dictionary<any, any>

  /** When inheriting from [AnimationRootNode], implement this virtual method to return the default value of a [param parameter]. Parameters are custom local memory used for your animation nodes, given a resource can be reused in multiple trees. */
  protected _get_parameter_default_value(parameter: StringName): any

  /** When inheriting from [AnimationRootNode], implement this virtual method to return a list of the properties on this animation node. Parameters are custom local memory used for your animation nodes, given a resource can be reused in multiple trees. Format is similar to [method Object.get_property_list]. */
  protected _get_parameter_list(): any[]

  /** When inheriting from [AnimationRootNode], implement this virtual method to return whether the blend tree editor should display filter editing on this animation node. */
  protected _has_filter(): boolean

  /** When inheriting from [AnimationRootNode], implement this virtual method to return whether the [param parameter] is read-only. Parameters are custom local memory used for your animation nodes, given a resource can be reused in multiple trees. */
  protected _is_parameter_read_only(parameter: StringName): boolean

  /**
   * When inheriting from [AnimationRootNode], implement this virtual method to run some code when this animation node is processed. The [param time] parameter is a relative delta, unless [param seek] is `true`, in which case it is absolute.
   *
   * Here, call the [method blend_input], [method blend_node] or [method blend_animation] functions. You can also use [method get_parameter] and [method set_parameter] to modify local memory.
   *
   * This function should return the delta.
   *
   */
  protected _process(
    time: float,
    seek: boolean,
    is_external_seeking: boolean,
    test_only: boolean
  ): float

  /** Adds an input to the animation node. This is only useful for animation nodes created for use in an [AnimationNodeBlendTree]. If the addition fails, returns [code]false[/code]. */
  add_input(name: string): boolean

  /**
   * Blends an animation by [param blend] amount (name must be valid in the linked [AnimationPlayer]). A [param time] and [param delta] may be passed, as well as whether [param seeked] happened.
   *
   * A [param looped_flag] is used by internal processing immediately after the loop.
   *
   */
  blend_animation(
    animation: StringName,
    time: float,
    delta: float,
    seeked: boolean,
    is_external_seeking: boolean,
    blend: float,
    looped_flag?: int
  ): void

  /** Blends an input. This is only useful for animation nodes created for an [AnimationNodeBlendTree]. The [param time] parameter is a relative delta, unless [param seek] is [code]true[/code], in which case it is absolute. A filter mode may be optionally passed. */
  blend_input(
    input_index: int,
    time: float,
    seek: boolean,
    is_external_seeking: boolean,
    blend: float,
    filter?: int,
    sync?: boolean,
    test_only?: boolean
  ): float

  /** Blend another animation node (in case this animation node contains child animation nodes). This function is only useful if you inherit from [AnimationRootNode] instead, otherwise editors will not display your animation node for addition. */
  blend_node(
    name: StringName,
    node: AnimationNode,
    time: float,
    seek: boolean,
    is_external_seeking: boolean,
    blend: float,
    filter?: int,
    sync?: boolean,
    test_only?: boolean
  ): float

  /** Returns the input index which corresponds to [param name]. If not found, returns [code]-1[/code]. */
  find_input(name: string): int

  /** Amount of inputs in this animation node, only useful for animation nodes that go into [AnimationNodeBlendTree]. */
  get_input_count(): int

  /** Gets the name of an input by index. */
  get_input_name(input: int): string

  /** Gets the value of a parameter. Parameters are custom local memory used for your animation nodes, given a resource can be reused in multiple trees. */
  get_parameter(name: StringName): any

  /**
   * Returns the object id of the [AnimationTree] that owns this node.
   *
   * **Note:** This method should only be called from within the [method AnimationNodeExtension._process_animation_node] method, and will return an invalid id otherwise.
   *
   */
  get_processing_animation_tree_instance_id(): int

  /** Returns [code]true[/code] if the given path is filtered. */
  is_path_filtered(path: NodePathType): boolean

  /** Returns [code]true[/code] if this animation node is being processed in test-only mode. */
  is_process_testing(): boolean

  /** Removes an input, call this only when inactive. */
  remove_input(index: int): void

  /** Adds or removes a path for the filter. */
  set_filter_path(path: NodePathType, enable: boolean): void

  /** Sets the name of the input at the given [param input] index. If the setting fails, returns [code]false[/code]. */
  set_input_name(input: int, name: string): boolean

  /** Sets a custom parameter. These are used as local memory, because resources can be reused across the tree or scenes. */
  set_parameter(name: StringName, value: any): void

  connect<T extends SignalsOf<AnimationNode>>(
    signal: T,
    method: SignalFunction<AnimationNode[T]>
  ): number

  /**
   * Do not use filtering.
   *
   */
  static FILTER_IGNORE: any

  /**
   * Paths matching the filter will be allowed to pass.
   *
   */
  static FILTER_PASS: any

  /**
   * Paths matching the filter will be discarded.
   *
   */
  static FILTER_STOP: any

  /**
   * Paths matching the filter will be blended (by the blend value).
   *
   */
  static FILTER_BLEND: any

  /**
   * Emitted by nodes that inherit from this class and that have an internal tree when one of their animation nodes removes. The animation nodes that emit this signal are [AnimationNodeBlendSpace1D], [AnimationNodeBlendSpace2D], [AnimationNodeStateMachine], and [AnimationNodeBlendTree].
   *
   */
  $animation_node_removed: Signal<() => void>

  /**
   * Emitted by nodes that inherit from this class and that have an internal tree when one of their animation node names changes. The animation nodes that emit this signal are [AnimationNodeBlendSpace1D], [AnimationNodeBlendSpace2D], [AnimationNodeStateMachine], and [AnimationNodeBlendTree].
   *
   */
  $animation_node_renamed: Signal<() => void>

  /**
   * Emitted by nodes that inherit from this class and that have an internal tree when one of their animation nodes changes. The animation nodes that emit this signal are [AnimationNodeBlendSpace1D], [AnimationNodeBlendSpace2D], [AnimationNodeStateMachine], [AnimationNodeBlendTree] and [AnimationNodeTransition].
   *
   */
  $tree_changed: Signal<() => void>
}
