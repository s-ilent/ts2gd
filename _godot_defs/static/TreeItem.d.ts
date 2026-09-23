/**
 * A single item of a [Tree] control. It can contain other [TreeItem]s as children, which allows it to create a hierarchy. It can also contain text and buttons. [TreeItem] is not a [Node], it is internal to the [Tree].
 *
 * To create a [TreeItem], use [method Tree.create_item] or [method TreeItem.create_child]. To remove a [TreeItem], use [method Object.free].
 *
 * **Note:** The ID values used for buttons are 32-bit, unlike [int] which is always 64-bit. They go from `-2147483648` to `2147483647`.
 *
 */
declare class TreeItem extends Object {
  /**
   * A single item of a [Tree] control. It can contain other [TreeItem]s as children, which allows it to create a hierarchy. It can also contain text and buttons. [TreeItem] is not a [Node], it is internal to the [Tree].
   *
   * To create a [TreeItem], use [method Tree.create_item] or [method TreeItem.create_child]. To remove a [TreeItem], use [method Object.free].
   *
   * **Note:** The ID values used for buttons are 32-bit, unlike [int] which is always 64-bit. They go from `-2147483648` to `2147483647`.
   *
   */
  new(): TreeItem
  constructor()
  static new(): TreeItem

  /** If [code]true[/code], the TreeItem is collapsed. */
  collapsed: boolean

  /** The custom minimum height. */
  custom_minimum_height: int

  /** If [code]true[/code], folding is disabled for this TreeItem. */
  disable_folding: boolean

  /**
   * If `true`, the [TreeItem] is visible (default).
   *
   * Note that if a [TreeItem] is set to not be visible, none of its children will be visible either.
   *
   */
  visible: boolean

  /** Adds a button with [Texture2D] [param button] to the end of the cell at column [param column]. The [param id] is used to identify the button in the according [signal Tree.button_clicked] signal and can be different from the buttons index. If not specified, the next available index is used, which may be retrieved by calling [method get_button_count] immediately before this method. Optionally, the button can be [param disabled] and have a [param tooltip_text]. [param description] is used as the button description for assistive apps. */
  add_button(
    column: int,
    button: Texture2D,
    id?: int,
    disabled?: boolean,
    tooltip_text?: string,
    description?: string
  ): void

  /** Adds a previously unparented [TreeItem] as a direct child of this one. The [param child] item must not be a part of any [Tree] or parented to any [TreeItem]. See also [method remove_child]. */
  add_child(child: TreeItem): void

  /** Calls the [param method] on the actual TreeItem and its children recursively. Pass parameters as a comma separated list. */
  call_recursive(method: StringName, ...args: any[]): void

  /** Removes all buttons from all columns of this item. */
  clear_buttons(): void

  /** Resets the background color for the given column to default. */
  clear_custom_bg_color(column: int): void

  /** Resets the color for the given column to default. */
  clear_custom_color(column: int): void

  /**
   * Creates an item and adds it as a child.
   *
   * The new item will be inserted as position [param index] (the default value `-1` means the last position), or it will be the last child if [param index] is higher than the child count.
   *
   */
  create_child(index?: int): TreeItem

  /** Deselects the given column. */
  deselect(column: int): void

  /** Removes the button at index [param button_index] in column [param column]. */
  erase_button(column: int, button_index: int): void

  /** Returns the column's auto translate mode. */
  get_auto_translate_mode(column: int): int

  /** Returns the text autowrap mode in the given [param column]. By default it is [constant TextServer.AUTOWRAP_OFF]. */
  get_autowrap_mode(column: int): int

  /** Returns the [Texture2D] of the button at index [param button_index] in column [param column]. */
  get_button(column: int, button_index: int): Texture2D

  /** Returns the button index if there is a button with ID [param id] in column [param column], otherwise returns -1. */
  get_button_by_id(column: int, id: int): int

  /** Returns the color of the button with ID [param id] in column [param column]. If the specified button does not exist, returns [constant Color.BLACK]. */
  get_button_color(column: int, id: int): Color

  /** Returns the number of buttons in column [param column]. */
  get_button_count(column: int): int

  /** Returns the ID for the button at index [param button_index] in column [param column]. */
  get_button_id(column: int, button_index: int): int

  /** Returns the tooltip text for the button at index [param button_index] in column [param column]. */
  get_button_tooltip_text(column: int, button_index: int): string

  /** Returns the column's cell mode. */
  get_cell_mode(column: int): int

  /**
   * Returns a child item by its [param index] (see [method get_child_count]). This method is often used for iterating all children of an item.
   *
   * Negative indices access the children from the last one.
   *
   */
  get_child(index: int): TreeItem

  /** Returns the number of child items. */
  get_child_count(): int

  /** Returns an array of references to the item's children. */
  get_children(): Node[]

  /** Returns the custom background color of column [param column]. */
  get_custom_bg_color(column: int): Color

  /** Returns the custom color of column [param column]. */
  get_custom_color(column: int): Color

  /** Returns the custom callback of column [param column]. */
  get_custom_draw_callback(column: int): Callable

  /** Returns custom font used to draw text in the column [param column]. */
  get_custom_font(column: int): Font

  /** Returns custom font size used to draw text in the column [param column]. */
  get_custom_font_size(column: int): int

  /** Returns the given column's custom [StyleBox] used to draw the background. */
  get_custom_stylebox(column: int): StyleBox

  /** Returns the given column's description for assistive apps. */
  get_description(column: int): string

  /** Returns [code]true[/code] if [code]expand_right[/code] is set. */
  get_expand_right(column: int): boolean

  /** Returns the TreeItem's first child. */
  get_first_child(): TreeItem

  /** Returns the given column's icon [Texture2D]. Error if no icon is set. */
  get_icon(column: int): Texture2D

  /** Returns the maximum allowed width of the icon in the given [param column]. */
  get_icon_max_width(column: int): int

  /** Returns the [Color] modulating the column's icon. */
  get_icon_modulate(column: int): Color

  /** Returns the given column's icon overlay [Texture2D]. */
  get_icon_overlay(column: int): Texture2D

  /** Returns the icon [Texture2D] region as [Rect2]. */
  get_icon_region(column: int): Rect2

  /** Returns the node's order in the tree. For example, if called on the first child item the position is [code]0[/code]. */
  get_index(): int

  /** Returns item's text language code. */
  get_language(column: int): string

  /** Returns the metadata value that was set for the given column using [method set_metadata]. */
  get_metadata(column: int): any

  /** Returns the next sibling TreeItem in the tree or a [code]null[/code] object if there is none. */
  get_next(): TreeItem

  /**
   * Returns the next TreeItem in the tree (in the context of a depth-first search) or a `null` object if there is none.
   *
   * If [param wrap] is enabled, the method will wrap around to the first element in the tree when called on the last element, otherwise it returns `null`.
   *
   */
  get_next_in_tree(wrap?: boolean): TreeItem

  /**
   * Returns the next visible TreeItem in the tree (in the context of a depth-first search) or a `null` object if there is none.
   *
   * If [param wrap] is enabled, the method will wrap around to the first visible element in the tree when called on the last visible element, otherwise it returns `null`.
   *
   */
  get_next_visible(wrap?: boolean): TreeItem

  /** Returns the parent TreeItem or a [code]null[/code] object if there is none. */
  get_parent(): TreeItem

  /** Returns the previous sibling TreeItem in the tree or a [code]null[/code] object if there is none. */
  get_prev(): TreeItem

  /**
   * Returns the previous TreeItem in the tree (in the context of a depth-first search) or a `null` object if there is none.
   *
   * If [param wrap] is enabled, the method will wrap around to the last element in the tree when called on the first visible element, otherwise it returns `null`.
   *
   */
  get_prev_in_tree(wrap?: boolean): TreeItem

  /**
   * Returns the previous visible sibling TreeItem in the tree (in the context of a depth-first search) or a `null` object if there is none.
   *
   * If [param wrap] is enabled, the method will wrap around to the last visible element in the tree when called on the first visible element, otherwise it returns `null`.
   *
   */
  get_prev_visible(wrap?: boolean): TreeItem

  /** Returns the value of a [constant CELL_MODE_RANGE] column. */
  get_range(column: int): float

  /** Returns a dictionary containing the range parameters for a given column. The keys are "min", "max", "step", and "expr". */
  get_range_config(column: int): Dictionary<any, any>

  /** Returns the BiDi algorithm override set for this cell. */
  get_structured_text_bidi_override(column: int): int

  /** Returns the additional BiDi options set for this cell. */
  get_structured_text_bidi_override_options(column: int): any[]

  /** Gets the suffix string shown after the column value. */
  get_suffix(column: int): string

  /** Returns the given column's text. */
  get_text(column: int): string

  /** Returns the given column's text alignment. */
  get_text_alignment(column: int): int

  /** Returns item's text base writing direction. */
  get_text_direction(column: int): int

  /** Returns the clipping behavior when the text exceeds the item's bounding rectangle in the given [param column]. By default it is [constant TextServer.OVERRUN_TRIM_ELLIPSIS]. */
  get_text_overrun_behavior(column: int): int

  /** Returns the given column's tooltip text. */
  get_tooltip_text(column: int): string

  /** Returns the [Tree] that owns this TreeItem. */
  get_tree(): Tree

  /**
   * Returns `true` if this [TreeItem], or any of its descendants, is collapsed.
   *
   * If [param only_visible] is `true` it ignores non-visible [TreeItem]s.
   *
   */
  is_any_collapsed(only_visible?: boolean): boolean

  /** Returns [code]true[/code] if the button at index [param button_index] for the given [param column] is disabled. */
  is_button_disabled(column: int, button_index: int): boolean

  /** Returns [code]true[/code] if the given [param column] is checked. */
  is_checked(column: int): boolean

  /** Returns [code]true[/code] if the cell was made into a button with [method set_custom_as_button]. */
  is_custom_set_as_button(column: int): boolean

  /** Returns [code]true[/code] if the given [param column] is multiline editable. */
  is_edit_multiline(column: int): boolean

  /** Returns [code]true[/code] if the given [param column] is editable. */
  is_editable(column: int): boolean

  /** Returns [code]true[/code] if the given [param column] is indeterminate. */
  is_indeterminate(column: int): boolean

  /** Returns [code]true[/code] if the given [param column] is selectable. */
  is_selectable(column: int): boolean

  /** Returns [code]true[/code] if the given [param column] is selected. */
  is_selected(column: int): boolean

  /** Returns [code]true[/code] if [member visible] is [code]true[/code] and all its ancestors are also visible. */
  is_visible_in_tree(): boolean

  /**
   * Moves this TreeItem right after the given [param item].
   *
   * **Note:** You can't move to the root or move the root.
   *
   */
  move_after(item: TreeItem): void

  /**
   * Moves this TreeItem right before the given [param item].
   *
   * **Note:** You can't move to the root or move the root.
   *
   */
  move_before(item: TreeItem): void

  /** Propagates this item's checked status to its children and parents for the given [param column]. It is possible to process the items affected by this method call by connecting to [signal Tree.check_propagated_to_item]. The order that the items affected will be processed is as follows: the item invoking this method, children of that item, and finally parents of that item. If [param emit_signal] is [code]false[/code], then [signal Tree.check_propagated_to_item] will not be emitted. */
  propagate_check(column: int, emit_signal?: boolean): void

  /**
   * Removes the given child [TreeItem] and all its children from the [Tree]. Note that it doesn't free the item from memory, so it can be reused later (see [method add_child]). To completely remove a [TreeItem] use [method Object.free].
   *
   * **Note:** If you want to move a child from one [Tree] to another, then instead of removing and adding it manually you can use [method move_before] or [method move_after].
   *
   */
  remove_child(child: TreeItem): void

  /** Selects the given [param column]. */
  select(column: int): void

  /**
   * Sets the given column's auto translate mode to [param mode].
   *
   * All columns use [constant Node.AUTO_TRANSLATE_MODE_INHERIT] by default, which uses the same auto translate mode as the [Tree] itself.
   *
   */
  set_auto_translate_mode(column: int, mode: int): void

  /** Sets the autowrap mode in the given [param column]. If set to something other than [constant TextServer.AUTOWRAP_OFF], the text gets wrapped inside the cell's bounding rectangle. */
  set_autowrap_mode(column: int, autowrap_mode: int): void

  /** Sets the given column's button [Texture2D] at index [param button_index] to [param button]. */
  set_button(column: int, button_index: int, button: Texture2D): void

  /** Sets the given column's button color at index [param button_index] to [param color]. */
  set_button_color(column: int, button_index: int, color: Color): void

  /** Sets the given column's button description at index [param button_index] for assistive apps. */
  set_button_description(
    column: int,
    button_index: int,
    description: string
  ): void

  /** If [code]true[/code], disables the button at index [param button_index] in the given [param column]. */
  set_button_disabled(column: int, button_index: int, disabled: boolean): void

  /** Sets the tooltip text for the button at index [param button_index] in the given [param column]. */
  set_button_tooltip_text(column: int, button_index: int, tooltip: string): void

  /** Sets the given column's cell mode to [param mode]. This determines how the cell is displayed and edited. */
  set_cell_mode(column: int, mode: int): void

  /** If [param checked] is [code]true[/code], the given [param column] is checked. Clears column's indeterminate status. */
  set_checked(column: int, checked: boolean): void

  /** Collapses or uncollapses this [TreeItem] and all the descendants of this item. */
  set_collapsed_recursive(enable: boolean): void

  /** Makes a cell with [constant CELL_MODE_CUSTOM] display as a non-flat button with a [StyleBox]. */
  set_custom_as_button(column: int, enable: boolean): void

  /**
   * Sets the given column's custom background color and whether to just use it as an outline.
   *
   * **Note:** If a custom [StyleBox] is set, the background color will be drawn behind it.
   *
   */
  set_custom_bg_color(column: int, color: Color, just_outline?: boolean): void

  /** Sets the given column's custom color. */
  set_custom_color(column: int, color: Color): void

  /**
   * Sets the given column's custom draw callback to the [param callback] method on [param object].
   *
   * The method named [param callback] should accept two arguments: the [TreeItem] that is drawn and its position and size as a [Rect2].
   *
   */
  set_custom_draw(column: int, object: Object, callback: StringName): void

  /**
   * Sets the given column's custom draw callback. Use an empty [Callable] ([code skip-lint]Callable()`) to clear the custom callback. The cell has to be in [constant CELL_MODE_CUSTOM] to use this feature.
   *
   * The [param callback] should accept two arguments: the [TreeItem] that is drawn and its position and size as a [Rect2].
   *
   */
  set_custom_draw_callback(column: int, callback: Callable): void

  /** Sets custom font used to draw text in the given [param column]. */
  set_custom_font(column: int, font: Font): void

  /** Sets custom font size used to draw text in the given [param column]. */
  set_custom_font_size(column: int, font_size: int): void

  /**
   * Sets the given column's custom [StyleBox] used to draw the background.
   *
   * **Note:** If a custom background color is set, the [StyleBox] will be drawn in front of it.
   *
   */
  set_custom_stylebox(column: int, stylebox: StyleBox): void

  /** Sets the given column's description for assistive apps. */
  set_description(column: int, description: string): void

  /**
   * If [param multiline] is `true`, the given [param column] is multiline editable.
   *
   * **Note:** This option only affects the type of control ([LineEdit] or [TextEdit]) that appears when editing the column. You can set multiline values with [method set_text] even if the column is not multiline editable.
   *
   */
  set_edit_multiline(column: int, multiline: boolean): void

  /** If [param enabled] is [code]true[/code], the given [param column] is editable. */
  set_editable(column: int, enabled: boolean): void

  /** If [param enable] is [code]true[/code], the given [param column] is expanded to the right. */
  set_expand_right(column: int, enable: boolean): void

  /** Sets the given cell's icon [Texture2D]. If the cell is in [constant CELL_MODE_ICON] mode, the icon is displayed in the center of the cell. Otherwise, the icon is displayed before the cell's text. [constant CELL_MODE_RANGE] does not display an icon. */
  set_icon(column: int, texture: Texture2D): void

  /** Sets the maximum allowed width of the icon in the given [param column]. This limit is applied on top of the default size of the icon and on top of [theme_item Tree.icon_max_width]. The height is adjusted according to the icon's ratio. */
  set_icon_max_width(column: int, width: int): void

  /** Modulates the given column's icon with [param modulate]. */
  set_icon_modulate(column: int, modulate: Color): void

  /** Sets the given cell's icon overlay [Texture2D]. The cell has to be in [constant CELL_MODE_ICON] mode, and icon has to be set. Overlay is drawn on top of icon, in the bottom left corner. */
  set_icon_overlay(column: int, texture: Texture2D): void

  /** Sets the given column's icon's texture region. */
  set_icon_region(column: int, region: Rect2): void

  /**
   * If [param indeterminate] is `true`, the given [param column] is marked indeterminate.
   *
   * **Note:** If set `true` from `false`, then column is cleared of checked status.
   *
   */
  set_indeterminate(column: int, indeterminate: boolean): void

  /** Sets the language code of the given [param column]'s text to [param language]. This is used for line-breaking and text shaping algorithms. If [param language] is empty, the current locale is used. */
  set_language(column: int, language: string): void

  /** Sets the metadata value for the given column, which can be retrieved later using [method get_metadata]. This can be used, for example, to store a reference to the original data. */
  set_metadata(column: int, meta: any): void

  /** Sets the value of a [constant CELL_MODE_RANGE] column. */
  set_range(column: int, value: float): void

  /**
   * Sets the range of accepted values for a column. The column must be in the [constant CELL_MODE_RANGE] mode.
   *
   * If [param expr] is `true`, the edit mode slider will use an exponential scale as with [member Range.exp_edit].
   *
   */
  set_range_config(
    column: int,
    min: float,
    max: float,
    step: float,
    expr?: boolean
  ): void

  /** If [param selectable] is [code]true[/code], the given [param column] is selectable. */
  set_selectable(column: int, selectable: boolean): void

  /** Set BiDi algorithm override for the structured text. Has effect for cells that display text. */
  set_structured_text_bidi_override(column: int, parser: int): void

  /** Set additional options for BiDi override. Has effect for cells that display text. */
  set_structured_text_bidi_override_options(column: int, args: any[]): void

  /** Sets a string to be shown after a column's value (for example, a unit abbreviation). */
  set_suffix(column: int, text: string): void

  /** Sets the given column's text value. */
  set_text(column: int, text: string): void

  /** Sets the given column's text alignment to [param text_alignment]. */
  set_text_alignment(column: int, text_alignment: int): void

  /** Sets item's text base writing direction. */
  set_text_direction(column: int, direction: int): void

  /** Sets the clipping behavior when the text exceeds the item's bounding rectangle in the given [param column]. */
  set_text_overrun_behavior(column: int, overrun_behavior: int): void

  /** Sets the given column's tooltip text. */
  set_tooltip_text(column: int, tooltip: string): void

  /** Uncollapses all [TreeItem]s necessary to reveal this [TreeItem], i.e. all ancestor [TreeItem]s. */
  uncollapse_tree(): void

  connect<T extends SignalsOf<TreeItem>>(
    signal: T,
    method: SignalFunction<TreeItem[T]>
  ): number

  /**
   * Cell shows a string label, optionally with an icon. When editable, the text can be edited using a [LineEdit], or a [TextEdit] popup if [method set_edit_multiline] is used.
   *
   */
  static CELL_MODE_STRING: any

  /**
   * Cell shows a checkbox, optionally with text and an icon. The checkbox can be pressed, released, or indeterminate (via [method set_indeterminate]). The checkbox can't be clicked unless the cell is editable.
   *
   */
  static CELL_MODE_CHECK: any

  /**
   * Cell shows a numeric range. When editable, it can be edited using a range slider. Use [method set_range] to set the value and [method set_range_config] to configure the range.
   *
   * This cell can also be used in a text dropdown mode when you assign a text with [method set_text]. Separate options with a comma, e.g. `"Option1,Option2,Option3"`.
   *
   */
  static CELL_MODE_RANGE: any

  /**
   * Cell shows an icon. It can't be edited nor display text. The icon is always centered within the cell.
   *
   */
  static CELL_MODE_ICON: any

  /**
   * Cell shows as a clickable button. It will display an arrow similar to [OptionButton], but doesn't feature a dropdown (for that you can use [constant CELL_MODE_RANGE]). Clicking the button emits the [signal Tree.item_edited] signal. The button is flat by default, you can use [method set_custom_as_button] to display it with a [StyleBox].
   *
   * This mode also supports custom drawing using [method set_custom_draw_callback].
   *
   */
  static CELL_MODE_CUSTOM: any
}
