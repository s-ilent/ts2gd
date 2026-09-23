/**
 * Arranges child controls into a tabbed view, creating a tab for each one. The active tab's corresponding control is made visible, while all other child controls are hidden. Ignores non-control children.
 *
 * **Note:** The drawing of the clickable tabs is handled by this node; [TabBar] is not needed.
 *
 */
declare class TabContainer extends Container {
  /**
   * Arranges child controls into a tabbed view, creating a tab for each one. The active tab's corresponding control is made visible, while all other child controls are hidden. Ignores non-control children.
   *
   * **Note:** The drawing of the clickable tabs is handled by this node; [TabBar] is not needed.
   *
   */
  new(): TabContainer
  constructor()
  static new(): TabContainer

  /** If [code]true[/code], all tabs are drawn in front of the panel. If [code]false[/code], inactive tabs are drawn behind the panel. */
  all_tabs_in_front: boolean

  /** If [code]true[/code], tabs overflowing this node's width will be hidden, displaying two navigation buttons instead. Otherwise, this node's minimum size is updated so that all tabs are visible. */
  clip_tabs: boolean

  /**
   * The current tab index. When set, this index's [Control] node's `visible` property is set to `true` and all others are set to `false`.
   *
   * A value of `-1` means that no tab is selected.
   *
   */
  current_tab: int

  /**
   * If `true`, all tabs can be deselected so that no tab is selected. Click on the [member current_tab] to deselect it.
   *
   * Only the tab header will be shown if no tabs are selected.
   *
   */
  deselect_enabled: boolean

  /** If [code]true[/code], tabs can be rearranged with mouse drag. */
  drag_to_rearrange_enabled: boolean

  /** If [code]true[/code], hovering over a tab while dragging something will switch to that tab. Does not have effect when hovering another tab to rearrange. */
  switch_on_drag_hover: boolean

  /** The position at which tabs will be placed. */
  tab_alignment: int

  /** The focus access mode for the internal [TabBar] node. */
  tab_focus_mode: int

  /** The horizontal alignment of the tabs. */
  tabs_position: int

  /**
   * [TabContainer]s with the same rearrange group ID will allow dragging the tabs between them. Enable drag with [member drag_to_rearrange_enabled].
   *
   * Setting this to `-1` will disable rearranging between [TabContainer]s.
   *
   */
  tabs_rearrange_group: int

  /** If [code]true[/code], tabs are visible. If [code]false[/code], tabs' content and titles are hidden. */
  tabs_visible: boolean

  /** If [code]true[/code], child [Control] nodes that are hidden have their minimum size take into account in the total, instead of only the currently visible one. */
  use_hidden_tabs_for_min_size: boolean

  /** Returns the child [Control] node located at the active tab index. */
  get_current_tab_control(): Control

  /**
   * Returns the [Popup] node instance if one has been set already with [method set_popup].
   *
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member Window.visible] property.
   *
   */
  get_popup(): Popup

  /** Returns the previously active tab index. */
  get_previous_tab(): int

  /**
   * Returns the [TabBar] contained in this container.
   *
   * **Warning:** This is a required internal node, removing and freeing it or editing its tabs may cause a crash. If you wish to edit the tabs, use the methods provided in [TabContainer].
   *
   */
  get_tab_bar(): TabBar

  /** Returns the button icon from the tab at index [param tab_idx]. */
  get_tab_button_icon(tab_idx: int): Texture2D

  /** Returns the [Control] node from the tab at index [param tab_idx]. */
  get_tab_control(tab_idx: int): Control

  /** Returns the number of tabs. */
  get_tab_count(): int

  /** Returns the [Texture2D] for the tab at index [param tab_idx] or [code]null[/code] if the tab has no [Texture2D]. */
  get_tab_icon(tab_idx: int): Texture2D

  /** Returns the maximum allowed width of the icon for the tab at index [param tab_idx]. */
  get_tab_icon_max_width(tab_idx: int): int

  /** Returns the index of the tab at local coordinates [param point]. Returns [code]-1[/code] if the point is outside the control boundaries or if there's no tab at the queried position. */
  get_tab_idx_at_point(point: Vector2): int

  /** Returns the index of the tab tied to the given [param control]. The control must be a child of the [TabContainer]. */
  get_tab_idx_from_control(control: Control): int

  /** Returns the metadata value set to the tab at index [param tab_idx] using [method set_tab_metadata]. If no metadata was previously set, returns [code]null[/code] by default. */
  get_tab_metadata(tab_idx: int): any

  /** Returns the title of the tab at index [param tab_idx]. Tab titles default to the name of the indexed child node, but this can be overridden with [method set_tab_title]. */
  get_tab_title(tab_idx: int): string

  /** Returns the tooltip text of the tab at index [param tab_idx]. */
  get_tab_tooltip(tab_idx: int): string

  /** Returns [code]true[/code] if the tab at index [param tab_idx] is disabled. */
  is_tab_disabled(tab_idx: int): boolean

  /** Returns [code]true[/code] if the tab at index [param tab_idx] is hidden. */
  is_tab_hidden(tab_idx: int): boolean

  /** Selects the first available tab with greater index than the currently selected. Returns [code]true[/code] if tab selection changed. */
  select_next_available(): boolean

  /** Selects the first available tab with lower index than the currently selected. Returns [code]true[/code] if tab selection changed. */
  select_previous_available(): boolean

  /** If set on a [Popup] node instance, a popup menu icon appears in the top-right corner of the [TabContainer] (setting it to [code]null[/code] will make it go away). Clicking it will expand the [Popup] node. */
  set_popup(popup: Node): void

  /** Sets the button icon from the tab at index [param tab_idx]. */
  set_tab_button_icon(tab_idx: int, icon: Texture2D): void

  /** If [param disabled] is [code]true[/code], disables the tab at index [param tab_idx], making it non-interactable. */
  set_tab_disabled(tab_idx: int, disabled: boolean): void

  /** If [param hidden] is [code]true[/code], hides the tab at index [param tab_idx], making it disappear from the tab area. */
  set_tab_hidden(tab_idx: int, hidden: boolean): void

  /** Sets an icon for the tab at index [param tab_idx]. */
  set_tab_icon(tab_idx: int, icon: Texture2D): void

  /** Sets the maximum allowed width of the icon for the tab at index [param tab_idx]. This limit is applied on top of the default size of the icon and on top of [theme_item icon_max_width]. The height is adjusted according to the icon's ratio. */
  set_tab_icon_max_width(tab_idx: int, width: int): void

  /** Sets the metadata value for the tab at index [param tab_idx], which can be retrieved later using [method get_tab_metadata]. */
  set_tab_metadata(tab_idx: int, metadata: any): void

  /** Sets a custom title for the tab at index [param tab_idx] (tab titles default to the name of the indexed child node). Set it back to the child's name to make the tab default to it again. */
  set_tab_title(tab_idx: int, title: string): void

  /**
   * Sets a custom tooltip text for tab at index [param tab_idx].
   *
   * **Note:** By default, if the [param tooltip] is empty and the tab text is truncated (not all characters fit into the tab), the title will be displayed as a tooltip. To hide the tooltip, assign `" "` as the [param tooltip] text.
   *
   */
  set_tab_tooltip(tab_idx: int, tooltip: string): void

  connect<T extends SignalsOf<TabContainer>>(
    signal: T,
    method: SignalFunction<TabContainer[T]>
  ): number

  /**
   * Places the tab bar at the top.
   *
   */
  static POSITION_TOP: any

  /**
   * Places the tab bar at the bottom. The tab bar's [StyleBox] will be flipped vertically.
   *
   */
  static POSITION_BOTTOM: any

  /**
   * Represents the size of the [enum TabPosition] enum.
   *
   */
  static POSITION_MAX: any

  /**
   * Emitted when the active tab is rearranged via mouse drag. See [member drag_to_rearrange_enabled].
   *
   */
  $active_tab_rearranged: Signal<() => void>

  /**
   * Emitted when the [TabContainer]'s [Popup] button is clicked. See [method set_popup] for details.
   *
   */
  $pre_popup_pressed: Signal<() => void>

  /**
   * Emitted when the user clicks on the button icon on this tab.
   *
   */
  $tab_button_pressed: Signal<() => void>

  /**
   * Emitted when switching to another tab.
   *
   */
  $tab_changed: Signal<() => void>

  /**
   * Emitted when a tab is clicked, even if it is the current tab.
   *
   */
  $tab_clicked: Signal<() => void>

  /**
   * Emitted when a tab is hovered by the mouse.
   *
   */
  $tab_hovered: Signal<() => void>

  /**
   * Emitted when a tab is selected via click, directional input, or script, even if it is the current tab.
   *
   */
  $tab_selected: Signal<() => void>
}
