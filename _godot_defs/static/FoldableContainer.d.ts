/**
 * A container that can be expanded/collapsed, with a title that can be filled with controls, such as buttons. This is also called an accordion.
 *
 * The title can be positioned at the top or bottom of the container. The container can be expanded or collapsed by clicking the title or by pressing `ui_accept` when focused. Child control nodes are hidden when the container is collapsed. Ignores non-control children.
 *
 * A FoldableContainer can be grouped with other FoldableContainers so that only one of them can be opened at a time; see [member foldable_group] and [FoldableGroup].
 *
 */
declare class FoldableContainer extends Container {
  /**
   * A container that can be expanded/collapsed, with a title that can be filled with controls, such as buttons. This is also called an accordion.
   *
   * The title can be positioned at the top or bottom of the container. The container can be expanded or collapsed by clicking the title or by pressing `ui_accept` when focused. Child control nodes are hidden when the container is collapsed. Ignores non-control children.
   *
   * A FoldableContainer can be grouped with other FoldableContainers so that only one of them can be opened at a time; see [member foldable_group] and [FoldableGroup].
   *
   */
  new(): FoldableContainer
  constructor()
  static new(): FoldableContainer

  /** The [FoldableGroup] associated with the container. When multiple [FoldableContainer] nodes share the same group, only one of them is allowed to be unfolded. */
  foldable_group: FoldableGroup

  /** If [code]true[/code], the container will becomes folded and will hide all its children. */
  folded: boolean

  /** Language code used for text shaping algorithms. If left empty, the current locale is used instead. */
  language: string

  /** The container's title text. */
  title: string

  /** Title's horizontal text alignment. */
  title_alignment: int

  /** Title's position. */
  title_position: int

  /** Title text writing direction. */
  title_text_direction: int

  /** Defines the behavior of the title when the text is longer than the available space. */
  title_text_overrun_behavior: int

  /**
   * Adds a [Control] that will be placed next to the container's title, obscuring the clickable area. Prime usage is adding [Button] nodes, but it can be any [Control].
   *
   * The control will be added as a child of this container and removed from previous parent if necessary. The controls will be placed aligned to the right, with the first added control being the leftmost one.
   *
   */
  add_title_bar_control(control: Control): void

  /** Expands the container and emits [signal folding_changed]. */
  expand(): void

  /** Folds the container and emits [signal folding_changed]. */
  fold(): void

  /** Removes a [Control] added with [method add_title_bar_control]. The node is not freed automatically, you need to use [method Node.queue_free]. */
  remove_title_bar_control(control: Control): void

  connect<T extends SignalsOf<FoldableContainer>>(
    signal: T,
    method: SignalFunction<FoldableContainer[T]>
  ): number

  /**
   * Makes the title appear at the top of the container.
   *
   */
  static POSITION_TOP: any

  /**
   * Makes the title appear at the bottom of the container. Also makes all StyleBoxes flipped vertically.
   *
   */
  static POSITION_BOTTOM: any

  /**
   * Emitted when the container is folded/expanded.
   *
   */
  $folding_changed: Signal<() => void>
}
