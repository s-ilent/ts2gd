/**
 * This object manages the SceneTree selection in the editor.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_selection].
 *
 */
declare class EditorSelection extends Object {
  /**
   * This object manages the SceneTree selection in the editor.
   *
   * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_selection].
   *
   */
  new(): EditorSelection
  constructor()
  static new(): EditorSelection

  /**
   * Adds a node to the selection.
   *
   * **Note:** The newly selected node will not be automatically edited in the inspector. If you want to edit a node, use [method EditorInterface.edit_node].
   *
   */
  add_node(node: Node): void

  /** Clear the selection. */
  clear(): void

  /** Returns the list of selected nodes. */
  get_selected_nodes(): Node[]

  /**
   * Returns the list of top selected nodes only, excluding any children. This is useful for performing transform operations (moving them, rotating, etc.).
   *
   * For example, if there is a node A with a child B and a sibling C, then selecting all three will cause this method to return only A and C. Changing the global transform of A will affect the global transform of B, so there is no need to change B separately.
   *
   */
  get_top_selected_nodes(): Node[]

  /** Returns the list of top selected nodes only, excluding any children. This is useful for performing transform operations (moving them, rotating, etc.). See [method get_top_selected_nodes]. */
  get_transformable_selected_nodes(): Node[]

  /** Removes a node from the selection. */
  remove_node(node: Node): void

  connect<T extends SignalsOf<EditorSelection>>(
    signal: T,
    method: SignalFunction<EditorSelection[T]>
  ): number

  /**
   * Emitted when the selection changes.
   *
   */
  $selection_changed: Signal<() => void>
}
