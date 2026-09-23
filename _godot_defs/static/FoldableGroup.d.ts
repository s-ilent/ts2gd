/**
 * A group of [FoldableContainer]-derived nodes. Only one container can be expanded at a time.
 *
 */
declare class FoldableGroup extends Resource {
  /**
   * A group of [FoldableContainer]-derived nodes. Only one container can be expanded at a time.
   *
   */
  new(): FoldableGroup
  constructor()
  static new(): FoldableGroup

  /** If [code]true[/code], it is possible to fold all containers in this FoldableGroup. */
  allow_folding_all: boolean

  /** Returns an [Array] of [FoldableContainer]s that have this as their FoldableGroup (see [member FoldableContainer.foldable_group]). This is equivalent to [ButtonGroup] but for FoldableContainers. */
  get_containers(): FoldableContainer[]

  /** Returns the current expanded container. */
  get_expanded_container(): FoldableContainer

  connect<T extends SignalsOf<FoldableGroup>>(
    signal: T,
    method: SignalFunction<FoldableGroup[T]>
  ): number

  /**
   * Emitted when one of the containers of the group is expanded.
   *
   */
  $expanded: Signal<() => void>
}
