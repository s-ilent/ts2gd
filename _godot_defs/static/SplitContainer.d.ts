/**
 * A container that arranges child controls horizontally or vertically and creates grabbers between them. The grabbers can be dragged around to change the size relations between the child controls.
 *
 */
declare class SplitContainer extends Container {
  /**
   * A container that arranges child controls horizontally or vertically and creates grabbers between them. The grabbers can be dragged around to change the size relations between the child controls.
   *
   */
  new(): SplitContainer
  constructor()
  static new(): SplitContainer

  /** If [code]true[/code], the draggers will be disabled and the children will be sized as if all [member split_offsets] were [code]0[/code]. */
  collapsed: boolean

  /** Highlights the drag area [Rect2] so you can see where it is during development. The drag area is gold if [member dragging_enabled] is [code]true[/code], and red if [code]false[/code]. */
  drag_area_highlight_in_editor: boolean

  /** Reduces the size of the drag area and split bar [theme_item split_bar_background] at the beginning of the container. */
  drag_area_margin_begin: int

  /** Reduces the size of the drag area and split bar [theme_item split_bar_background] at the end of the container. */
  drag_area_margin_end: int

  /** Shifts the drag area in the axis of the container to prevent the drag area from overlapping the [ScrollBar] or other selectable [Control] of a child node. */
  drag_area_offset: int

  /** Determines the dragger's visibility. This property does not determine whether dragging is enabled or not. Use [member dragging_enabled] for that. */
  dragger_visibility: int

  /** Enables or disables split dragging. */
  dragging_enabled: boolean

  /** The first element of [member split_offsets]. */
  split_offset: int

  /**
   * Offsets for each dragger in pixels. Each one is the offset of the split between the [Control] nodes before and after the dragger, with `0` being the default position. The default position is based on the [Control] nodes expand flags and minimum sizes. See [member Control.size_flags_horizontal], [member Control.size_flags_vertical], and [member Control.size_flags_stretch_ratio].
   *
   * If none of the [Control] nodes before the dragger are expanded, the default position will be at the start of the [SplitContainer]. If none of the [Control] nodes after the dragger are expanded, the default position will be at the end of the [SplitContainer]. If the dragger is in between expanded [Control] nodes, the default position will be in the middle, based on the [member Control.size_flags_stretch_ratio]s and minimum sizes.
   *
   * **Note:** If the split offsets cause [Control] nodes to overlap, the first split will take priority when resolving the positions.
   *
   */
  split_offsets: PackedInt32Array

  /** If [code]true[/code], a touch-friendly drag handle will be enabled for better usability on smaller screens. Unlike the standard grabber, this drag handle overlaps the [SplitContainer]'s children and does not affect their minimum separation. The standard grabber will no longer be drawn when this option is enabled. */
  touch_dragger_enabled: boolean

  /**
   * If `true`, the [SplitContainer] will arrange its children vertically, rather than horizontally.
   *
   * Can't be changed when using [HSplitContainer] and [VSplitContainer].
   *
   */
  vertical: boolean

  /** Clamps the [member split_offsets] values to ensure they are within valid ranges and do not overlap with each other. When overlaps occur, this method prioritizes one split offset (at index [param priority_index]) by clamping any overlapping split offsets to it. */
  clamp_split_offset(priority_index?: int): void

  /**
   * Returns the drag area [Control]. For example, you can move a pre-configured button into the drag area [Control] so that it rides along with the split bar. Try setting the [Button] anchors to `center` prior to the `reparent()` call.
   *
   * @example
   *
   * $BarnacleButton.reparent($SplitContainer.get_drag_area_control())
   * @summary
   *
   *
   * **Note:** The drag area [Control] is drawn over the [SplitContainer]'s children, so [CanvasItem] draw objects called from the [Control] and children added to the [Control] will also appear over the [SplitContainer]'s children. Try setting [member Control.mouse_filter] of custom children to [constant Control.MOUSE_FILTER_IGNORE] to prevent blocking the mouse from dragging if desired.
   *
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash.
   *
   */
  get_drag_area_control(): Control

  /**
   * Returns an [Array] of the drag area [Control]s. These are the interactable [Control] nodes between each child. For example, this can be used to add a pre-configured button to a drag area [Control] so that it rides along with the split bar. Try setting the [Button] anchors to `center` prior to the [method Node.reparent] call.
   *
   * @example
   *
   * $BarnacleButton.reparent($SplitContainer.get_drag_area_controls()[0])
   * @summary
   *
   *
   * **Note:** The drag area [Control]s are drawn over the [SplitContainer]'s children, so [CanvasItem] draw objects called from a drag area and children added to it will also appear over the [SplitContainer]'s children. Try setting [member Control.mouse_filter] of custom children to [constant Control.MOUSE_FILTER_IGNORE] to prevent blocking the mouse from dragging if desired.
   *
   * **Warning:** These are required internal nodes, removing or freeing them may cause a crash.
   *
   */
  get_drag_area_controls(): Control[]

  connect<T extends SignalsOf<SplitContainer>>(
    signal: T,
    method: SignalFunction<SplitContainer[T]>
  ): number

  /**
   * The split dragger icon is always visible when [theme_item autohide] is `false`, otherwise visible only when the cursor hovers it.
   *
   * The size of the grabber icon determines the minimum [theme_item separation].
   *
   * The dragger icon is automatically hidden if the length of the grabber icon is longer than the split bar.
   *
   */
  static DRAGGER_VISIBLE: any

  /**
   * The split dragger icon is never visible regardless of the value of [theme_item autohide].
   *
   * The size of the grabber icon determines the minimum [theme_item separation].
   *
   */
  static DRAGGER_HIDDEN: any

  /**
   * The split dragger icon is not visible, and the split bar is collapsed to zero thickness.
   *
   */
  static DRAGGER_HIDDEN_COLLAPSED: any

  /**
   * Emitted when the user ends dragging.
   *
   */
  $drag_ended: Signal<() => void>

  /**
   * Emitted when the user starts dragging.
   *
   */
  $drag_started: Signal<() => void>

  /**
   * Emitted when any dragger is dragged by user.
   *
   */
  $dragged: Signal<() => void>
}
