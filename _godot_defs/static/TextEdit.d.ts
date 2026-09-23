/**
 * A multiline text editor. It also has limited facilities for editing code, such as syntax highlighting support. For more advanced facilities for editing code, see [CodeEdit].
 *
 * While entering text, it is possible to insert special characters using Unicode, OEM or Windows alt codes:
 *
 * - To enter Unicode codepoints, hold [kbd]Alt[/kbd] and type the codepoint on the numpad. For example, to enter the character `á` (U+00E1), hold [kbd]Alt[/kbd] and type [kbd]+E1[/kbd] on the numpad (the leading zeroes can be omitted).
 *
 * - To enter OEM codepoints, hold [kbd]Alt[/kbd] and type the code on the numpad. For example, to enter the character `á` (OEM 160), hold [kbd]Alt[/kbd] and type `160` on the numpad.
 *
 * - To enter Windows codepoints, hold [kbd]Alt[/kbd] and type the code on the numpad. For example, to enter the character `á` (Windows 0225), hold [kbd]Alt[/kbd] and type [kbd]0[/kbd], [kbd]2[/kbd], [kbd]2[/kbd], [kbd]5[/kbd] on the numpad. The leading zero here must **not** be omitted, as this is how Windows codepoints are distinguished from OEM codepoints.
 *
 * **Note:** Most viewport, caret, and edit methods contain a `caret_index` argument for [member caret_multiple] support. The argument should be one of the following: `-1` for all carets, `0` for the main caret, or greater than `0` for secondary carets in the order they were created.
 *
 * **Note:** When holding down [kbd]Alt[/kbd], the vertical scroll wheel will scroll 5 times as fast as it would normally do. This also works in the Godot script editor.
 *
 */
declare class TextEdit extends Control {
  /**
   * A multiline text editor. It also has limited facilities for editing code, such as syntax highlighting support. For more advanced facilities for editing code, see [CodeEdit].
   *
   * While entering text, it is possible to insert special characters using Unicode, OEM or Windows alt codes:
   *
   * - To enter Unicode codepoints, hold [kbd]Alt[/kbd] and type the codepoint on the numpad. For example, to enter the character `á` (U+00E1), hold [kbd]Alt[/kbd] and type [kbd]+E1[/kbd] on the numpad (the leading zeroes can be omitted).
   *
   * - To enter OEM codepoints, hold [kbd]Alt[/kbd] and type the code on the numpad. For example, to enter the character `á` (OEM 160), hold [kbd]Alt[/kbd] and type `160` on the numpad.
   *
   * - To enter Windows codepoints, hold [kbd]Alt[/kbd] and type the code on the numpad. For example, to enter the character `á` (Windows 0225), hold [kbd]Alt[/kbd] and type [kbd]0[/kbd], [kbd]2[/kbd], [kbd]2[/kbd], [kbd]5[/kbd] on the numpad. The leading zero here must **not** be omitted, as this is how Windows codepoints are distinguished from OEM codepoints.
   *
   * **Note:** Most viewport, caret, and edit methods contain a `caret_index` argument for [member caret_multiple] support. The argument should be one of the following: `-1` for all carets, `0` for the main caret, or greater than `0` for secondary carets in the order they were created.
   *
   * **Note:** When holding down [kbd]Alt[/kbd], the vertical scroll wheel will scroll 5 times as fast as it would normally do. This also works in the Godot script editor.
   *
   */
  new(): TextEdit
  constructor()
  static new(): TextEdit

  /** If [member wrap_mode] is set to [constant LINE_WRAPPING_BOUNDARY], sets text wrapping mode. */
  autowrap_mode: int

  /** If [code]true[/code] and [member caret_mid_grapheme] is [code]false[/code], backspace deletes an entire composite character such as ❤️‍🩹, instead of deleting part of the composite character. */
  backspace_deletes_composite_character_enabled: boolean

  /** If [code]true[/code], makes the caret blink. */
  caret_blink: boolean

  /** The interval at which the caret blinks (in seconds). */
  caret_blink_interval: float

  /** If [code]true[/code], caret will be visible when [member editable] is disabled. */
  caret_draw_when_editable_disabled: boolean

  /**
   * Allow moving caret, selecting and removing the individual composite character components.
   *
   * **Note:** [kbd]Backspace[/kbd] is always removing individual composite character components.
   *
   */
  caret_mid_grapheme: boolean

  /**
   * If `true`, a right-click moves the caret at the mouse position before displaying the context menu.
   *
   * If `false`, the context menu ignores mouse location.
   *
   */
  caret_move_on_right_click: boolean

  /** If [code]true[/code], multiple carets are allowed. Left-clicking with [kbd]Alt[/kbd] adds a new caret. See [method add_caret] and [method get_caret_count]. */
  caret_multiple: boolean

  /** Set the type of caret to draw. */
  caret_type: int

  /** If [code]true[/code], a right-click displays the context menu. */
  context_menu_enabled: boolean

  /** The characters to consider as word delimiters if [member use_custom_word_separators] is [code]true[/code]. The characters should be defined without separation, for example [code]#_![/code]. */
  custom_word_separators: string

  /** If [code]true[/code], the selected text will be deselected when focus is lost. */
  deselect_on_focus_loss_enabled: boolean

  /** If [code]true[/code], allow drag and drop of selected text. Text can still be dropped from other sources. */
  drag_and_drop_selection_enabled: boolean

  /** If [code]true[/code], control characters are displayed. */
  draw_control_chars: boolean

  /** If [code]true[/code], the "space" character will have a visible representation. */
  draw_spaces: boolean

  /** If [code]true[/code], the "tab" character will have a visible representation. */
  draw_tabs: boolean

  /** If [code]false[/code], existing text cannot be modified and new text cannot be added. */
  editable: boolean

  /** If [code]true[/code], "Emoji and Symbols" menu is enabled. */
  emoji_menu_enabled: boolean

  /** If [code]true[/code], copying or cutting without a selection is performed on all lines with a caret. Otherwise, copy and cut require a selection. */
  empty_selection_clipboard_enabled: boolean

  /** If [code]true[/code], all occurrences of the selected text will be highlighted. */
  highlight_all_occurrences: boolean

  /** If [code]true[/code], the line containing the cursor is highlighted. */
  highlight_current_line: boolean

  /** If [code]true[/code], all wrapped lines are indented to the same amount as the unwrapped line. */
  indent_wrapped_lines: boolean

  /** Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead. */
  language: string

  /**
   * If `false`, using middle mouse button to paste clipboard will be disabled.
   *
   * **Note:** This method is only implemented on Linux.
   *
   */
  middle_mouse_paste_enabled: boolean

  /** If [code]true[/code], a minimap is shown, providing an outline of your source code. The minimap uses a fixed-width text size. */
  minimap_draw: boolean

  /** The width, in pixels, of the minimap. */
  minimap_width: int

  /** Text shown when the [TextEdit] is empty. It is [b]not[/b] the [TextEdit]'s default value (see [member text]). */
  placeholder_text: string

  /** If [code]true[/code], [TextEdit] will disable vertical scroll and fit minimum height to the number of visible lines. When both this property and [member scroll_fit_content_width] are [code]true[/code], no scrollbars will be displayed. */
  scroll_fit_content_height: boolean

  /** If [code]true[/code], [TextEdit] will disable horizontal scroll and fit minimum width to the widest line in the text. When both this property and [member scroll_fit_content_height] are [code]true[/code], no scrollbars will be displayed. */
  scroll_fit_content_width: boolean

  /** If there is a horizontal scrollbar, this determines the current horizontal scroll value in pixels. */
  scroll_horizontal: int

  /** Allow scrolling past the last line into "virtual" space. */
  scroll_past_end_of_file: boolean

  /** Scroll smoothly over the text rather than jumping to the next location. */
  scroll_smooth: boolean

  /** Sets the scroll speed with the minimap or when [member scroll_smooth] is enabled. */
  scroll_v_scroll_speed: float

  /** If there is a vertical scrollbar, this determines the current vertical scroll value in line numbers, starting at 0 for the top line. */
  scroll_vertical: float

  /**
   * If `true`, text can be selected.
   *
   * If `false`, text can not be selected by the user or by the [method select] or [method select_all] methods.
   *
   */
  selecting_enabled: boolean

  /** If [code]true[/code], shortcut keys for context menu items are enabled, even if the context menu is disabled. */
  shortcut_keys_enabled: boolean

  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int

  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: any[]

  /**
   * The syntax highlighter to use.
   *
   * **Note:** A [SyntaxHighlighter] instance should not be used across multiple [TextEdit] nodes.
   *
   */
  syntax_highlighter: SyntaxHighlighter

  /** If [code]true[/code], [member ProjectSettings.input/ui_text_indent] input [code]Tab[/code] character, otherwise it moves keyboard focus to the next [Control] in the scene. */
  tab_input_mode: boolean

  /** String value of the [TextEdit]. */
  text: string

  /** Base text writing direction. */
  text_direction: int

  /** If [code]false[/code], using [kbd]Ctrl + Left[/kbd] or [kbd]Ctrl + Right[/kbd] ([kbd]Cmd + Left[/kbd] or [kbd]Cmd + Right[/kbd] on macOS) bindings will use the behavior of [member use_default_word_separators]. If [code]true[/code], it will also stop the caret if a character within [member custom_word_separators] is detected. Useful for subword moving. This behavior also will be applied to the behavior of text selection. */
  use_custom_word_separators: boolean

  /** If [code]false[/code], using [kbd]Ctrl + Left[/kbd] or [kbd]Ctrl + Right[/kbd] ([kbd]Cmd + Left[/kbd] or [kbd]Cmd + Right[/kbd] on macOS) bindings will stop moving caret only if a space or punctuation is detected. If [code]true[/code], it will also stop the caret if a character is part of [code]!"#$%&'()*+,-./:;<=>?@[\]^`{|}~[/code], the Unicode General Punctuation table, or the Unicode CJK Punctuation table. Useful for subword moving. This behavior also will be applied to the behavior of text selection. */
  use_default_word_separators: boolean

  /** If [code]true[/code], the native virtual keyboard is enabled on platforms that support it. */
  virtual_keyboard_enabled: boolean

  /** If [code]true[/code], the native virtual keyboard is shown on focus events on platforms that support it. */
  virtual_keyboard_show_on_focus: boolean

  /** Sets the line wrapping mode to use. */
  wrap_mode: int

  /** Override this method to define what happens when the user presses the backspace key. */
  protected _backspace(caret_index: int): void

  /** Override this method to define what happens when the user performs a copy operation. */
  protected _copy(caret_index: int): void

  /** Override this method to define what happens when the user performs a cut operation. */
  protected _cut(caret_index: int): void

  /** Override this method to define what happens when the user types in the provided key [param unicode_char]. */
  protected _handle_unicode_input(unicode_char: int, caret_index: int): void

  /** Override this method to define what happens when the user performs a paste operation. */
  protected _paste(caret_index: int): void

  /**
   * Override this method to define what happens when the user performs a paste operation with middle mouse button.
   *
   * **Note:** This method is only implemented on Linux.
   *
   */
  protected _paste_primary_clipboard(caret_index: int): void

  /** Adds a new caret at the given location. Returns the index of the new caret, or [code]-1[/code] if the location is invalid. */
  add_caret(line: int, column: int): int

  /** Adds an additional caret above or below every caret. If [param below] is [code]true[/code] the new caret will be added below and above otherwise. */
  add_caret_at_carets(below: boolean): void

  /** Register a new gutter to this [TextEdit]. Use [param at] to have a specific gutter order. A value of [code]-1[/code] appends the gutter to the right. */
  add_gutter(at?: int): void

  /** Adds a selection and a caret for the next occurrence of the current selection. If there is no active selection, selects word under caret. */
  add_selection_for_next_occurrence(): void

  /** This method does nothing. */
  adjust_carets_after_edit(
    caret: int,
    from_line: int,
    from_col: int,
    to_line: int,
    to_col: int
  ): void

  /** Adjust the viewport so the caret is visible. */
  adjust_viewport_to_caret(caret_index?: int): void

  /** Applies text from the [url=https://en.wikipedia.org/wiki/Input_method]Input Method Editor[/url] (IME) to each caret and closes the IME if it is open. */
  apply_ime(): void

  /** Called when the user presses the backspace key. Can be overridden with [method _backspace]. */
  backspace(caret_index?: int): void

  /** Starts a multipart edit. All edits will be treated as one action until [method end_complex_operation] is called. */
  begin_complex_operation(): void

  /**
   * Starts an edit for multiple carets. The edit must be ended with [method end_multicaret_edit]. Multicaret edits can be used to edit text at multiple carets and delay merging the carets until the end, so the caret indexes aren't affected immediately. [method begin_multicaret_edit] and [method end_multicaret_edit] can be nested, and the merge will happen at the last [method end_multicaret_edit].
   *
   * @example
   *
   * begin_complex_operation()
   * begin_multicaret_edit()
   * for i in range(get_caret_count()):
   * 	if multicaret_edit_ignore_caret(i):
   * 		continue
   * 	# Logic here.
   * end_multicaret_edit()
   * end_complex_operation()
   * @summary
   *
   *
   */
  begin_multicaret_edit(): void

  /** Closes the [url=https://en.wikipedia.org/wiki/Input_method]Input Method Editor[/url] (IME) if it is open. Any text in the IME will be lost. */
  cancel_ime(): void

  /** Centers the viewport on the line the editing caret is at. This also resets the [member scroll_horizontal] value to [code]0[/code]. */
  center_viewport_to_caret(caret_index?: int): void

  /** Performs a full reset of [TextEdit], including undo history. */
  clear(): void

  /** Clears the undo history. */
  clear_undo_history(): void

  /**
   * Collapse all carets in the given range to the [param from_line] and [param from_column] position.
   *
   * [param inclusive] applies to both ends.
   *
   * If [method is_in_mulitcaret_edit] is `true`, carets that are collapsed will be `true` for [method multicaret_edit_ignore_caret].
   *
   * [method merge_overlapping_carets] will be called if any carets were collapsed.
   *
   */
  collapse_carets(
    from_line: int,
    from_column: int,
    to_line: int,
    to_column: int,
    inclusive?: boolean
  ): void

  /** Copies the current text selection. Can be overridden with [method _copy]. */
  copy(caret_index?: int): void

  /** Cut's the current selection. Can be overridden with [method _cut]. */
  cut(caret_index?: int): void

  /** Deletes the selected text. */
  delete_selection(caret_index?: int): void

  /** Deselects the current selection. */
  deselect(caret_index?: int): void

  /** Marks the end of steps in the current action started with [method start_action]. */
  end_action(): void

  /** Ends a multipart edit, started with [method begin_complex_operation]. If called outside a complex operation, the current operation is pushed onto the undo/redo stack. */
  end_complex_operation(): void

  /** Ends an edit for multiple carets, that was started with [method begin_multicaret_edit]. If this was the last [method end_multicaret_edit] and [method merge_overlapping_carets] was called, carets will be merged. */
  end_multicaret_edit(): void

  /** Returns the column the editing caret is at. */
  get_caret_column(caret_index?: int): int

  /** Returns the number of carets in this [TextEdit]. */
  get_caret_count(): int

  /** Returns the caret pixel draw position. */
  get_caret_draw_pos(caret_index?: int): Vector2

  /** Returns a list of caret indexes in their edit order, this done from bottom to top. Edit order refers to the way actions such as [method insert_text_at_caret] are applied. */
  get_caret_index_edit_order(): PackedInt32Array

  /** Returns the line the editing caret is on. */
  get_caret_line(caret_index?: int): int

  /** Returns the wrap index the editing caret is on. */
  get_caret_wrap_index(caret_index?: int): int

  /** Returns the first column containing a non-whitespace character on the given line. If there is only whitespace, returns the number of characters. */
  get_first_non_whitespace_column(line: int): int

  /** Returns the first visible line. */
  get_first_visible_line(): int

  /** Returns the number of gutters registered. */
  get_gutter_count(): int

  /** Returns the name of the gutter at the given index. */
  get_gutter_name(gutter: int): string

  /** Returns the type of the gutter at the given index. Gutters can contain icons, text, or custom visuals. */
  get_gutter_type(gutter: int): int

  /** Returns the width of the gutter at the given index. */
  get_gutter_width(gutter: int): int

  /** Returns the [HScrollBar] used by [TextEdit]. */
  get_h_scroll_bar(): HScrollBar

  /** Returns the indent level of the given line. This is the number of spaces and tabs at the beginning of the line, with the tabs taking the tab size into account (see [method get_tab_size]). */
  get_indent_level(line: int): int

  /** Returns the last visible line. Use [method get_last_full_visible_line_wrap_index] for the wrap index. */
  get_last_full_visible_line(): int

  /** Returns the last visible wrap index of the last visible line. */
  get_last_full_visible_line_wrap_index(): int

  /** Returns the last unhidden line in the entire [TextEdit]. */
  get_last_unhidden_line(): int

  /** Returns the text of a specific line. */
  get_line(line: int): string

  /** Returns the custom background color of the given line. If no color is set, returns [code]Color(0, 0, 0, 0)[/code]. */
  get_line_background_color(line: int): Color

  /**
   * Returns the line and column at the given position. In the returned vector, `x` is the column and `y` is the line.
   *
   * If [param clamp_line] is `false` and [param position] is below the last line, `Vector2i(-1, -1)` is returned.
   *
   * If [param clamp_column] is `false` and [param position] is outside the column range of the line, `Vector2i(-1, -1)` is returned.
   *
   */
  get_line_column_at_pos(
    position: Vector2i,
    clamp_line?: boolean,
    clamp_column?: boolean
  ): Vector2i

  /** Returns the number of lines in the text. */
  get_line_count(): int

  /** Returns the icon currently in [param gutter] at [param line]. This only works when the gutter type is [constant GUTTER_TYPE_ICON] (see [method set_gutter_type]). */
  get_line_gutter_icon(line: int, gutter: int): Texture2D

  /** Returns the color currently in [param gutter] at [param line]. */
  get_line_gutter_item_color(line: int, gutter: int): Color

  /** Returns the metadata currently in [param gutter] at [param line]. */
  get_line_gutter_metadata(line: int, gutter: int): any

  /** Returns the text currently in [param gutter] at [param line]. This only works when the gutter type is [constant GUTTER_TYPE_STRING] (see [method set_gutter_type]). */
  get_line_gutter_text(line: int, gutter: int): string

  /**
   * Returns the maximum value of the line height among all lines.
   *
   * **Note:** The return value is influenced by [theme_item line_spacing] and [theme_item font_size]. And it will not be less than `1`.
   *
   */
  get_line_height(): int

  /**
   * Returns an [Array] of line ranges where `x` is the first line and `y` is the last line. All lines within these ranges will have a caret on them or be part of a selection. Each line will only be part of one line range, even if it has multiple carets on it.
   *
   * If a selection's end column ([method get_selection_to_column]) is at column `0`, that line will not be included. If a selection begins on the line after another selection ends and [param merge_adjacent] is `true`, or they begin and end on the same line, one line range will include both selections.
   *
   */
  get_line_ranges_from_carets(
    only_selections?: boolean,
    merge_adjacent?: boolean
  ): Vector2i[]

  /** Returns the width in pixels of the [param wrap_index] on [param line]. */
  get_line_width(line: int, wrap_index?: int): int

  /** Returns line text as it is currently displayed, including IME composition string. */
  get_line_with_ime(line: int): string

  /** Returns the number of times the given line is wrapped. */
  get_line_wrap_count(line: int): int

  /** Returns the wrap index of the given column on the given line. This ranges from [code]0[/code] to [method get_line_wrap_count]. */
  get_line_wrap_index_at_column(line: int, column: int): int

  /** Returns an array of [String]s representing each wrapped index. */
  get_line_wrapped_text(line: int): PackedStringArray

  /** Returns the local mouse position adjusted for the text direction. */
  get_local_mouse_pos(): Vector2

  /**
   * Returns the [PopupMenu] of this [TextEdit]. By default, this menu is displayed when right-clicking on the [TextEdit].
   *
   * You can add custom menu items or remove standard ones. Make sure your IDs don't conflict with the standard ones (see [enum MenuItems]). For example:
   *
   * @example
   *
   *
   * func _ready():
   * 	var menu = get_menu()
   * 	# Remove all items after "Redo".
   * 	menu.item_count = menu.get_item_index(MENU_REDO) + 1
   * 	# Add custom items.
   * 	menu.add_separator()
   * 	menu.add_item("Insert Date", MENU_MAX + 1)
   * 	# Connect callback.
   * 	menu.id_pressed.connect(_on_item_pressed)
   * func _on_item_pressed(id):
   * 	if id == MENU_MAX + 1:
   * 		insert_text_at_caret(Time.get_date_string_from_system())
   *
   *
   * public override void _Ready()
   * {
   * 	var menu = GetMenu();
   * 	// Remove all items after "Redo".
   * 	menu.ItemCount = menu.GetItemIndex(TextEdit.MenuItems.Redo) + 1;
   * 	// Add custom items.
   * 	menu.AddSeparator();
   * 	menu.AddItem("Insert Date", TextEdit.MenuItems.Max + 1);
   * 	// Add event handler.
   * 	menu.IdPressed += OnItemPressed;
   * }
   * public void OnItemPressed(int id)
   * {
   * 	if (id == TextEdit.MenuItems.Max + 1)
   * 	{
   * 		InsertTextAtCaret(Time.GetDateStringFromSystem());
   * 	}
   * }
   *
   * @summary
   *
   *
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member Window.visible] property.
   *
   */
  get_menu(): PopupMenu

  /** Returns the equivalent minimap line at [param position]. */
  get_minimap_line_at_pos(position: Vector2i): int

  /** Returns the number of lines that may be drawn on the minimap. */
  get_minimap_visible_lines(): int

  /**
   * Returns the correct column at the end of a composite character like ❤️‍🩹 (mending heart; Unicode: `U+2764 U+FE0F U+200D U+1FA79`) which is comprised of more than one Unicode code point, if the caret is at the start of the composite character. Also returns the correct column with the caret at mid grapheme and for non-composite characters.
   *
   * **Note:** To check at caret location use `get_next_composite_character_column(get_caret_line(), get_caret_column())`
   *
   */
  get_next_composite_character_column(line: int, column: int): int

  /** Similar to [method get_next_visible_line_offset_from], but takes into account the line wrap indexes. In the returned vector, [code]x[/code] is the line, [code]y[/code] is the wrap index. */
  get_next_visible_line_index_offset_from(
    line: int,
    wrap_index: int,
    visible_amount: int
  ): Vector2i

  /** Returns the count to the next visible line from [param line] to [code]line + visible_amount[/code]. Can also count backwards. For example if a [TextEdit] has 5 lines with lines 2 and 3 hidden, calling this with [code]line = 1, visible_amount = 1[/code] would return 3. */
  get_next_visible_line_offset_from(line: int, visible_amount: int): int

  /**
   * Returns the local position for the given [param line] and [param column]. If `x` or `y` of the returned vector equal `-1`, the position is outside of the viewable area of the control.
   *
   * **Note:** The Y position corresponds to the bottom side of the line. Use [method get_rect_at_line_column] to get the top side position.
   *
   */
  get_pos_at_line_column(line: int, column: int): Vector2i

  /**
   * Returns the correct column at the start of a composite character like ❤️‍🩹 (mending heart; Unicode: `U+2764 U+FE0F U+200D U+1FA79`) which is comprised of more than one Unicode code point, if the caret is at the end of the composite character. Also returns the correct column with the caret at mid grapheme and for non-composite characters.
   *
   * **Note:** To check at caret location use `get_previous_composite_character_column(get_caret_line(), get_caret_column())`
   *
   */
  get_previous_composite_character_column(line: int, column: int): int

  /**
   * Returns the local position and size for the grapheme at the given [param line] and [param column]. If `x` or `y` position of the returned rect equal `-1`, the position is outside of the viewable area of the control.
   *
   * **Note:** The Y position of the returned rect corresponds to the top side of the line, unlike [method get_pos_at_line_column] which returns the bottom side.
   *
   */
  get_rect_at_line_column(line: int, column: int): Rect2i

  /** Returns the last tagged saved version from [method tag_saved_version]. */
  get_saved_version(): int

  /** Returns the scroll position for [param wrap_index] of [param line]. */
  get_scroll_pos_for_line(line: int, wrap_index?: int): float

  /** Returns the text inside the selection of a caret, or all the carets if [param caret_index] is its default value [code]-1[/code]. */
  get_selected_text(caret_index?: int): string

  /**
   * Returns the caret index of the selection at the given [param line] and [param column], or `-1` if there is none.
   *
   * If [param include_edges] is `false`, the position must be inside the selection and not at either end. If [param only_selections] is `false`, carets without a selection will also be considered.
   *
   */
  get_selection_at_line_column(
    line: int,
    column: int,
    include_edges?: boolean,
    only_selections?: boolean
  ): int

  /** Returns the original start column of the selection. */
  get_selection_column(caret_index?: int): int

  /** Returns the selection begin column. Returns the caret column if there is no selection. */
  get_selection_from_column(caret_index?: int): int

  /** Returns the selection begin line. Returns the caret line if there is no selection. */
  get_selection_from_line(caret_index?: int): int

  /** Returns the original start line of the selection. */
  get_selection_line(caret_index?: int): int

  /** Returns the current selection mode. */
  get_selection_mode(): int

  /** Returns the origin column of the selection. This is the opposite end from the caret. */
  get_selection_origin_column(caret_index?: int): int

  /** Returns the origin line of the selection. This is the opposite end from the caret. */
  get_selection_origin_line(caret_index?: int): int

  /** Returns the selection end column. Returns the caret column if there is no selection. */
  get_selection_to_column(caret_index?: int): int

  /** Returns the selection end line. Returns the caret line if there is no selection. */
  get_selection_to_line(caret_index?: int): int

  /**
   * Returns the carets sorted by selection beginning from lowest line and column to highest (from top to bottom of text).
   *
   * If [param include_ignored_carets] is `false`, carets from [method multicaret_edit_ignore_caret] will be ignored.
   *
   */
  get_sorted_carets(include_ignored_carets?: boolean): PackedInt32Array

  /** Returns the [TextEdit]'s' tab size. */
  get_tab_size(): int

  /** Returns the total width of all gutters and internal padding. */
  get_total_gutter_width(): int

  /** Returns the total number of lines in the text. This includes wrapped lines and excludes folded lines. If [member wrap_mode] is set to [constant LINE_WRAPPING_NONE] and no lines are folded (see [method CodeEdit.is_line_folded]) then this is equivalent to [method get_line_count]. See [method get_visible_line_count_in_range] for a limited range of lines. */
  get_total_visible_line_count(): int

  /** Returns the [VScrollBar] of the [TextEdit]. */
  get_v_scroll_bar(): VScrollBar

  /** Returns the current version of the [TextEdit]. The version is a count of recorded operations by the undo/redo history. */
  get_version(): int

  /** Returns the number of lines that can visually fit, rounded down, based on this control's height. */
  get_visible_line_count(): int

  /** Returns the total number of lines between [param from_line] and [param to_line] (inclusive) in the text. This includes wrapped lines and excludes folded lines. If the range covers all lines it is equivalent to [method get_total_visible_line_count]. */
  get_visible_line_count_in_range(from_line: int, to_line: int): int

  /** Returns the word at [param position]. */
  get_word_at_pos(position: Vector2): string

  /** Returns a [String] text with the word under the caret's location. */
  get_word_under_caret(caret_index?: int): string

  /** Returns [code]true[/code] if the user has text in the [url=https://en.wikipedia.org/wiki/Input_method]Input Method Editor[/url] (IME). */
  has_ime_text(): boolean

  /** Returns [code]true[/code] if a "redo" action is available. */
  has_redo(): boolean

  /** Returns [code]true[/code] if the user has selected text. */
  has_selection(caret_index?: int): boolean

  /** Returns [code]true[/code] if an "undo" action is available. */
  has_undo(): boolean

  /** Inserts a new line with [param text] at [param line]. */
  insert_line_at(line: int, text: string): void

  /**
   * Inserts the [param text] at [param line] and [param column].
   *
   * If [param before_selection_begin] is `true`, carets and selections that begin at [param line] and [param column] will moved to the end of the inserted text, along with all carets after it.
   *
   * If [param before_selection_end] is `true`, selections that end at [param line] and [param column] will be extended to the end of the inserted text. These parameters can be used to insert text inside of or outside of selections.
   *
   */
  insert_text(
    text: string,
    line: int,
    column: int,
    before_selection_begin?: boolean,
    before_selection_end?: boolean
  ): void

  /** Insert the specified text at the caret position. */
  insert_text_at_caret(text: string, caret_index?: int): void

  /** Returns [code]true[/code] if the caret of the selection is after the selection origin. This can be used to determine the direction of the selection. */
  is_caret_after_selection_origin(caret_index?: int): boolean

  /**
   * Returns `true` if the caret is visible, `false` otherwise. A caret will be considered hidden if it is outside the scrollable area when scrolling is enabled.
   *
   * **Note:** [method is_caret_visible] does not account for a caret being off-screen if it is still within the scrollable area. It will return `true` even if the caret is off-screen as long as it meets [TextEdit]'s own conditions for being visible. This includes uses of [member scroll_fit_content_width] and [member scroll_fit_content_height] that cause the [TextEdit] to expand beyond the viewport's bounds.
   *
   */
  is_caret_visible(caret_index?: int): boolean

  /** Returns [code]true[/code] if the user is dragging their mouse for scrolling, selecting, or text dragging. */
  is_dragging_cursor(): boolean

  /** Returns [code]true[/code] if the gutter at the given index is clickable. See [method set_gutter_clickable]. */
  is_gutter_clickable(gutter: int): boolean

  /** Returns [code]true[/code] if the gutter at the given index is currently drawn. See [method set_gutter_draw]. */
  is_gutter_drawn(gutter: int): boolean

  /** Returns [code]true[/code] if the gutter at the given index is overwritable. See [method set_gutter_overwritable]. */
  is_gutter_overwritable(gutter: int): boolean

  /** Returns [code]true[/code] if a [method begin_multicaret_edit] has been called and [method end_multicaret_edit] has not yet been called. */
  is_in_mulitcaret_edit(): boolean

  /** Returns [code]true[/code] if the gutter at the given index on the given line is clickable. See [method set_line_gutter_clickable]. */
  is_line_gutter_clickable(line: int, gutter: int): boolean

  /** Returns if the given line is wrapped. */
  is_line_wrapped(line: int): boolean

  /** Returns [code]true[/code] if the menu is visible. Use this instead of [code]get_menu().visible[/code] to improve performance (so the creation of the menu is avoided). See [method get_menu]. */
  is_menu_visible(): boolean

  /** Returns [code]true[/code] if the mouse is over a selection. If [param edges] is [code]true[/code], the edges are considered part of the selection. */
  is_mouse_over_selection(edges: boolean, caret_index?: int): boolean

  /** Returns [code]true[/code] if overtype mode is enabled. See [method set_overtype_mode_enabled]. */
  is_overtype_mode_enabled(): boolean

  /** Executes a given action as defined in the [enum MenuItems] enum. */
  menu_option(option: int): void

  /** Merge the gutters from [param from_line] into [param to_line]. Only overwritable gutters will be copied. See [method set_gutter_overwritable]. */
  merge_gutters(from_line: int, to_line: int): void

  /**
   * Merges any overlapping carets. Will favor the newest caret, or the caret with a selection.
   *
   * If [method is_in_mulitcaret_edit] is `true`, the merge will be queued to happen at the end of the multicaret edit. See [method begin_multicaret_edit] and [method end_multicaret_edit].
   *
   * **Note:** This is not called when a caret changes position but after certain actions, so it is possible to get into a state where carets overlap.
   *
   */
  merge_overlapping_carets(): void

  /**
   * Returns `true` if the given [param caret_index] should be ignored as part of a multicaret edit. See [method begin_multicaret_edit] and [method end_multicaret_edit]. Carets that should be ignored are ones that were part of removed text and will likely be merged at the end of the edit, or carets that were added during the edit.
   *
   * It is recommended to `continue` within a loop iterating on multiple carets if a caret should be ignored.
   *
   */
  multicaret_edit_ignore_caret(caret_index: int): boolean

  /** Paste at the current location. Can be overridden with [method _paste]. */
  paste(caret_index?: int): void

  /** Pastes the primary clipboard. */
  paste_primary_clipboard(caret_index?: int): void

  /** Perform redo operation. */
  redo(): void

  /**
   * Removes the given caret index.
   *
   * **Note:** This can result in adjustment of all other caret indices.
   *
   */
  remove_caret(caret: int): void

  /** Removes the gutter at the given index. */
  remove_gutter(gutter: int): void

  /**
   * Removes the line of text at [param line]. Carets on this line will attempt to match their previous visual x position.
   *
   * If [param move_carets_down] is `true` carets will move to the next line down, otherwise carets will move up.
   *
   */
  remove_line_at(line: int, move_carets_down?: boolean): void

  /** Removes all additional carets. */
  remove_secondary_carets(): void

  /** Removes text between the given positions. */
  remove_text(
    from_line: int,
    from_column: int,
    to_line: int,
    to_column: int
  ): void

  /**
   * Perform a search inside the text. Search flags can be specified in the [enum SearchFlags] enum.
   *
   * In the returned vector, `x` is the column, `y` is the line. If no results are found, both are equal to `-1`.
   *
   * @example
   *
   *
   * var result = search("print", SEARCH_WHOLE_WORDS, 0, 0)
   * if result.x != -1:
   * 	# Result found.
   * 	var line_number = result.y
   * 	var column_number = result.x
   *
   *
   * Vector2I result = Search("print", (uint)TextEdit.SearchFlags.WholeWords, 0, 0);
   * if (result.X != -1)
   * {
   * 	// Result found.
   * 	int lineNumber = result.Y;
   * 	int columnNumber = result.X;
   * }
   *
   * @summary
   *
   *
   */
  search(text: string, flags: int, from_line: int, from_column: int): Vector2i

  /**
   * Selects text from [param origin_line] and [param origin_column] to [param caret_line] and [param caret_column] for the given [param caret_index]. This moves the selection origin and the caret. If the positions are the same, the selection will be deselected.
   *
   * If [member selecting_enabled] is `false`, no selection will occur.
   *
   * **Note:** If supporting multiple carets this will not check for any overlap. See [method merge_overlapping_carets].
   *
   */
  select(
    origin_line: int,
    origin_column: int,
    caret_line: int,
    caret_column: int,
    caret_index?: int
  ): void

  /**
   * Select all the text.
   *
   * If [member selecting_enabled] is `false`, no selection will occur.
   *
   */
  select_all(): void

  /** Selects the word under the caret. */
  select_word_under_caret(caret_index?: int): void

  /**
   * Moves the caret to the specified [param column] index.
   *
   * If [param adjust_viewport] is `true`, the viewport will center at the caret position after the move occurs.
   *
   * **Note:** If supporting multiple carets this will not check for any overlap. See [method merge_overlapping_carets].
   *
   */
  set_caret_column(
    column: int,
    adjust_viewport?: boolean,
    caret_index?: int
  ): void

  /**
   * Moves the caret to the specified [param line] index. The caret column will be moved to the same visual position it was at the last time [method set_caret_column] was called, or clamped to the end of the line.
   *
   * If [param adjust_viewport] is `true`, the viewport will center at the caret position after the move occurs.
   *
   * If [param can_be_hidden] is `true`, the specified [param line] can be hidden.
   *
   * If [param wrap_index] is `-1`, the caret column will be clamped to the [param line]'s length. If [param wrap_index] is greater than `-1`, the column will be moved to attempt to match the visual x position on the line's [param wrap_index] to the position from the last time [method set_caret_column] was called.
   *
   * **Note:** If supporting multiple carets this will not check for any overlap. See [method merge_overlapping_carets].
   *
   */
  set_caret_line(
    line: int,
    adjust_viewport?: boolean,
    can_be_hidden?: boolean,
    wrap_index?: int,
    caret_index?: int
  ): void

  /** If [code]true[/code], the mouse cursor will change to a pointing hand ([constant Control.CURSOR_POINTING_HAND]) when hovering over the gutter at the given index. See [method is_gutter_clickable] and [method set_line_gutter_clickable]. */
  set_gutter_clickable(gutter: int, clickable: boolean): void

  /** Set a custom draw callback for the gutter at the given index. [param draw_callback] must take the following arguments: A line index [int], a gutter index [int], and an area [Rect2]. This callback only works when the gutter type is [constant GUTTER_TYPE_CUSTOM] (see [method set_gutter_type]). */
  set_gutter_custom_draw(column: int, draw_callback: Callable): void

  /** If [code]true[/code], the gutter at the given index is drawn. The gutter type ([method set_gutter_type]) determines how it is drawn. See [method is_gutter_drawn]. */
  set_gutter_draw(gutter: int, draw: boolean): void

  /** Sets the name of the gutter at the given index. */
  set_gutter_name(gutter: int, name: string): void

  /** If [code]true[/code], the line data of the gutter at the given index can be overridden when using [method merge_gutters]. See [method is_gutter_overwritable]. */
  set_gutter_overwritable(gutter: int, overwritable: boolean): void

  /** Sets the type of gutter at the given index. Gutters can contain icons, text, or custom visuals. */
  set_gutter_type(gutter: int, type: int): void

  /** Set the width of the gutter at the given index. */
  set_gutter_width(gutter: int, width: int): void

  /**
   * Sets the text for a specific [param line].
   *
   * Carets on the line will attempt to keep their visual x position.
   *
   */
  set_line(line: int, new_text: string): void

  /** Positions the [param wrap_index] of [param line] at the center of the viewport. */
  set_line_as_center_visible(line: int, wrap_index?: int): void

  /** Positions the [param wrap_index] of [param line] at the top of the viewport. */
  set_line_as_first_visible(line: int, wrap_index?: int): void

  /** Positions the [param wrap_index] of [param line] at the bottom of the viewport. */
  set_line_as_last_visible(line: int, wrap_index?: int): void

  /** Sets the custom background color of the given line. If transparent, this color is applied on top of the default background color (See [theme_item background_color]). If set to [code]Color(0, 0, 0, 0)[/code], no additional color is applied. */
  set_line_background_color(line: int, color: Color): void

  /** If [param clickable] is [code]true[/code], makes the [param gutter] on the given [param line] clickable. This is like [method set_gutter_clickable], but for a single line. If [method is_gutter_clickable] is [code]true[/code], this will not have any effect. See [method is_line_gutter_clickable] and [signal gutter_clicked]. */
  set_line_gutter_clickable(line: int, gutter: int, clickable: boolean): void

  /** Sets the icon for [param gutter] on [param line] to [param icon]. This only works when the gutter type is [constant GUTTER_TYPE_ICON] (see [method set_gutter_type]). */
  set_line_gutter_icon(line: int, gutter: int, icon: Texture2D): void

  /** Sets the color for [param gutter] on [param line] to [param color]. */
  set_line_gutter_item_color(line: int, gutter: int, color: Color): void

  /** Sets the metadata for [param gutter] on [param line] to [param metadata]. */
  set_line_gutter_metadata(line: int, gutter: int, metadata: any): void

  /** Sets the text for [param gutter] on [param line] to [param text]. This only works when the gutter type is [constant GUTTER_TYPE_STRING] (see [method set_gutter_type]). */
  set_line_gutter_text(line: int, gutter: int, text: string): void

  /** If [code]true[/code], enables overtype mode. In this mode, typing overrides existing text instead of inserting text. The [member ProjectSettings.input/ui_text_toggle_insert_mode] action toggles overtype mode. See [method is_overtype_mode_enabled]. */
  set_overtype_mode_enabled(enabled: boolean): void

  /** Sets the search [param flags]. This is used with [method set_search_text] to highlight occurrences of the searched text. Search flags can be specified from the [enum SearchFlags] enum. */
  set_search_flags(flags: int): void

  /** Sets the search text. See [method set_search_flags]. */
  set_search_text(search_text: string): void

  /** Sets the current selection mode. */
  set_selection_mode(mode: int): void

  /** Sets the selection origin column to the [param column] for the given [param caret_index]. If the selection origin is moved to the caret position, the selection will deselect. */
  set_selection_origin_column(column: int, caret_index?: int): void

  /**
   * Sets the selection origin line to the [param line] for the given [param caret_index]. If the selection origin is moved to the caret position, the selection will deselect.
   *
   * If [param can_be_hidden] is `false`, The line will be set to the nearest unhidden line below or above.
   *
   * If [param wrap_index] is `-1`, the selection origin column will be clamped to the [param line]'s length. If [param wrap_index] is greater than `-1`, the column will be moved to attempt to match the visual x position on the line's [param wrap_index] to the position from the last time [method set_selection_origin_column] or [method select] was called.
   *
   */
  set_selection_origin_line(
    line: int,
    can_be_hidden?: boolean,
    wrap_index?: int,
    caret_index?: int
  ): void

  /** Sets the tab size for the [TextEdit] to use. */
  set_tab_size(size: int): void

  /** Provide custom tooltip text. The callback method must take the following args: [code]hovered_word: String[/code]. */
  set_tooltip_request_func(callback: Callable): void

  /** Moves a selection and a caret for the next occurrence of the current selection. If there is no active selection, moves to the next occurrence of the word under caret. */
  skip_selection_for_next_occurrence(): void

  /**
   * Starts an action, will end the current action if [param action] is different.
   *
   * An action will also end after a call to [method end_action], after [member ProjectSettings.gui/timers/text_edit_idle_detect_sec] is triggered or a new undoable step outside the [method start_action] and [method end_action] calls.
   *
   */
  start_action(action: int): void

  /** Swaps the two lines. Carets will be swapped with the lines. */
  swap_lines(from_line: int, to_line: int): void

  /** Tag the current version as saved. */
  tag_saved_version(): void

  /** Perform undo operation. */
  undo(): void

  connect<T extends SignalsOf<TextEdit>>(
    signal: T,
    method: SignalFunction<TextEdit[T]>
  ): number

  /**
   * Cuts (copies and clears) the selected text.
   *
   */
  static MENU_CUT: any

  /**
   * Copies the selected text.
   *
   */
  static MENU_COPY: any

  /**
   * Pastes the clipboard text over the selected text (or at the cursor's position).
   *
   */
  static MENU_PASTE: any

  /**
   * Erases the whole [TextEdit] text.
   *
   */
  static MENU_CLEAR: any

  /**
   * Selects the whole [TextEdit] text.
   *
   */
  static MENU_SELECT_ALL: any

  /**
   * Undoes the previous action.
   *
   */
  static MENU_UNDO: any

  /**
   * Redoes the previous action.
   *
   */
  static MENU_REDO: any

  /**
   * ID of "Text Writing Direction" submenu.
   *
   */
  static MENU_SUBMENU_TEXT_DIR: any

  /**
   * Sets text direction to inherited.
   *
   */
  static MENU_DIR_INHERITED: any

  /**
   * Sets text direction to automatic.
   *
   */
  static MENU_DIR_AUTO: any

  /**
   * Sets text direction to left-to-right.
   *
   */
  static MENU_DIR_LTR: any

  /**
   * Sets text direction to right-to-left.
   *
   */
  static MENU_DIR_RTL: any

  /**
   * Toggles control character display.
   *
   */
  static MENU_DISPLAY_UCC: any

  /**
   * ID of "Insert Control Character" submenu.
   *
   */
  static MENU_SUBMENU_INSERT_UCC: any

  /**
   * Inserts left-to-right mark (LRM) character.
   *
   */
  static MENU_INSERT_LRM: any

  /**
   * Inserts right-to-left mark (RLM) character.
   *
   */
  static MENU_INSERT_RLM: any

  /**
   * Inserts start of left-to-right embedding (LRE) character.
   *
   */
  static MENU_INSERT_LRE: any

  /**
   * Inserts start of right-to-left embedding (RLE) character.
   *
   */
  static MENU_INSERT_RLE: any

  /**
   * Inserts start of left-to-right override (LRO) character.
   *
   */
  static MENU_INSERT_LRO: any

  /**
   * Inserts start of right-to-left override (RLO) character.
   *
   */
  static MENU_INSERT_RLO: any

  /**
   * Inserts pop direction formatting (PDF) character.
   *
   */
  static MENU_INSERT_PDF: any

  /**
   * Inserts Arabic letter mark (ALM) character.
   *
   */
  static MENU_INSERT_ALM: any

  /**
   * Inserts left-to-right isolate (LRI) character.
   *
   */
  static MENU_INSERT_LRI: any

  /**
   * Inserts right-to-left isolate (RLI) character.
   *
   */
  static MENU_INSERT_RLI: any

  /**
   * Inserts first strong isolate (FSI) character.
   *
   */
  static MENU_INSERT_FSI: any

  /**
   * Inserts pop direction isolate (PDI) character.
   *
   */
  static MENU_INSERT_PDI: any

  /**
   * Inserts zero width joiner (ZWJ) character.
   *
   */
  static MENU_INSERT_ZWJ: any

  /**
   * Inserts zero width non-joiner (ZWNJ) character.
   *
   */
  static MENU_INSERT_ZWNJ: any

  /**
   * Inserts word joiner (WJ) character.
   *
   */
  static MENU_INSERT_WJ: any

  /**
   * Inserts soft hyphen (SHY) character.
   *
   */
  static MENU_INSERT_SHY: any

  /**
   * Opens system emoji and symbol picker.
   *
   */
  static MENU_EMOJI_AND_SYMBOL: any

  /**
   * Represents the size of the [enum MenuItems] enum.
   *
   */
  static MENU_MAX: any

  /**
   * No current action.
   *
   */
  static ACTION_NONE: any

  /**
   * A typing action.
   *
   */
  static ACTION_TYPING: any

  /**
   * A backwards delete action.
   *
   */
  static ACTION_BACKSPACE: any

  /**
   * A forward delete action.
   *
   */
  static ACTION_DELETE: any

  /**
   * Match case when searching.
   *
   */
  static SEARCH_MATCH_CASE: any

  /**
   * Match whole words when searching.
   *
   */
  static SEARCH_WHOLE_WORDS: any

  /**
   * Search from end to beginning.
   *
   */
  static SEARCH_BACKWARDS: any

  /**
   * Vertical line caret.
   *
   */
  static CARET_TYPE_LINE: any

  /**
   * Block caret.
   *
   */
  static CARET_TYPE_BLOCK: any

  /**
   * Not selecting.
   *
   */
  static SELECTION_MODE_NONE: any

  /**
   * Select as if `shift` is pressed.
   *
   */
  static SELECTION_MODE_SHIFT: any

  /**
   * Select single characters as if the user single clicked.
   *
   */
  static SELECTION_MODE_POINTER: any

  /**
   * Select whole words as if the user double clicked.
   *
   */
  static SELECTION_MODE_WORD: any

  /**
   * Select whole lines as if the user triple clicked.
   *
   */
  static SELECTION_MODE_LINE: any

  /**
   * Line wrapping is disabled.
   *
   */
  static LINE_WRAPPING_NONE: any

  /**
   * Line wrapping occurs at the control boundary, beyond what would normally be visible.
   *
   */
  static LINE_WRAPPING_BOUNDARY: any

  /**
   * When a gutter is set to string using [method set_gutter_type], it is used to contain text set via the [method set_line_gutter_text] method.
   *
   */
  static GUTTER_TYPE_STRING: any

  /**
   * When a gutter is set to icon using [method set_gutter_type], it is used to contain an icon set via the [method set_line_gutter_icon] method.
   *
   */
  static GUTTER_TYPE_ICON: any

  /**
   * When a gutter is set to custom using [method set_gutter_type], it is used to contain custom visuals controlled by a callback method set via the [method set_gutter_custom_draw] method.
   *
   */
  static GUTTER_TYPE_CUSTOM: any

  /**
   * Emitted when any caret changes position.
   *
   */
  $caret_changed: Signal<() => void>

  /**
   * Emitted when a gutter is added.
   *
   */
  $gutter_added: Signal<() => void>

  /**
   * Emitted when a gutter is clicked.
   *
   */
  $gutter_clicked: Signal<() => void>

  /**
   * Emitted when a gutter is removed.
   *
   */
  $gutter_removed: Signal<() => void>

  /**
   * Emitted immediately when the text changes.
   *
   * When text is added [param from_line] will be less than [param to_line]. On a remove [param to_line] will be less than [param from_line].
   *
   */
  $lines_edited_from: Signal<() => void>

  /**
   * Emitted when the text changes.
   *
   */
  $text_changed: Signal<() => void>

  /**
   * Emitted when [method clear] is called or [member text] is set.
   *
   */
  $text_set: Signal<() => void>
}
