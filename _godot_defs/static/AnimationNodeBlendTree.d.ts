/**
 * This animation node may contain a sub-tree of any other type animation nodes, such as [AnimationNodeTransition], [AnimationNodeBlend2], [AnimationNodeBlend3], [AnimationNodeOneShot], etc. This is one of the most commonly used animation node roots.
 *
 * An [AnimationNodeOutput] node named `output` is created by default.
 *
 */
declare class AnimationNodeBlendTree extends AnimationRootNode {
  /**
   * This animation node may contain a sub-tree of any other type animation nodes, such as [AnimationNodeTransition], [AnimationNodeBlend2], [AnimationNodeBlend3], [AnimationNodeOneShot], etc. This is one of the most commonly used animation node roots.
   *
   * An [AnimationNodeOutput] node named `output` is created by default.
   *
   */
  new(): AnimationNodeBlendTree
  constructor()
  static new(): AnimationNodeBlendTree

  /** The global offset of all sub animation nodes. */
  graph_offset: Vector2

  /** Adds an [AnimationNode] at the given [param position]. The [param name] is used to identify the created sub animation node later. */
  add_node(name: StringName, node: AnimationNode, position?: Vector2): void

  /** Connects the output of an [AnimationNode] as input for another [AnimationNode], at the input port specified by [param input_index]. */
  connect_node(
    input_node: StringName,
    input_index: int,
    output_node: StringName
  ): void

  /** Disconnects the animation node connected to the specified input. */
  disconnect_node(input_node: StringName, input_index: int): void

  /** Returns the sub animation node with the specified [param name]. */
  get_node(path: NodePathType): Node

  /** Returns the sub animation node with the specified [param name]. */
  get_node<T extends Node>(path: NodePathType): T
  get_node_unsafe<T extends Node>(path: NodePathType): T

  /** Returns a list containing the names of all sub animation nodes in this blend tree. */
  get_node_list(): StringName[]

  /** Returns the position of the sub animation node with the specified [param name]. */
  get_node_position(name: StringName): Vector2

  /** Returns [code]true[/code] if a sub animation node with specified [param name] exists. */
  has_node(name: StringName): boolean

  /** Removes a sub animation node. */
  remove_node(name: StringName): void

  /** Changes the name of a sub animation node. */
  rename_node(name: StringName, new_name: StringName): void

  /** Modifies the position of a sub animation node. */
  set_node_position(name: StringName, position: Vector2): void

  connect<T extends SignalsOf<AnimationNodeBlendTree>>(
    signal: T,
    method: SignalFunction<AnimationNodeBlendTree[T]>
  ): number

  /**
   * The connection was successful.
   *
   */
  static CONNECTION_OK: any

  /**
   * The input node is `null`.
   *
   */
  static CONNECTION_ERROR_NO_INPUT: any

  /**
   * The specified input port is out of range.
   *
   */
  static CONNECTION_ERROR_NO_INPUT_INDEX: any

  /**
   * The output node is `null`.
   *
   */
  static CONNECTION_ERROR_NO_OUTPUT: any

  /**
   * Input and output nodes are the same.
   *
   */
  static CONNECTION_ERROR_SAME_NODE: any

  /**
   * The specified connection already exists.
   *
   */
  static CONNECTION_ERROR_CONNECTION_EXISTS: any

  /**
   * Emitted when the input port information is changed.
   *
   */
  $node_changed: Signal<() => void>
}
