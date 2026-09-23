/**
 * A control for displaying text that can contain custom fonts, images, and basic formatting. [RichTextLabel] manages these as an internal tag stack. It also adapts itself to given width/heights.
 *
 * **Note:** [method newline], [method push_paragraph], `"\n"`, `"\r\n"`, `p` tag, and alignment tags start a new paragraph. Each paragraph is processed independently, in its own BiDi context. If you want to force line wrapping within paragraph, any other line breaking character can be used, for example, Form Feed (U+000C), Next Line (U+0085), Line Separator (U+2028).
 *
 * **Note:** Assignments to [member text] clear the tag stack and reconstruct it from the property's contents. Any edits made to [member text] will erase previous edits made from other manual sources such as [method append_text] and the `push_*` / [method pop] methods.
 *
 * **Note:** RichTextLabel doesn't support entangled BBCode tags. For example, instead of using [code skip-lint]**bold**bold italic**italic**`, use [code skip-lint]**bold**bold italic******italic**`.
 *
 * **Note:** `push_pop_*` functions won't affect BBCode.
 *
 * **Note:** While [member bbcode_enabled] is enabled, alignment tags such as [code skip-lint][center]` will take priority over the [member horizontal_alignment] setting which determines the default text alignment.
 *
 */
declare class RichTextLabel extends Control {
  /**
   * A control for displaying text that can contain custom fonts, images, and basic formatting. [RichTextLabel] manages these as an internal tag stack. It also adapts itself to given width/heights.
   *
   * **Note:** [method newline], [method push_paragraph], `"\n"`, `"\r\n"`, `p` tag, and alignment tags start a new paragraph. Each paragraph is processed independently, in its own BiDi context. If you want to force line wrapping within paragraph, any other line breaking character can be used, for example, Form Feed (U+000C), Next Line (U+0085), Line Separator (U+2028).
   *
   * **Note:** Assignments to [member text] clear the tag stack and reconstruct it from the property's contents. Any edits made to [member text] will erase previous edits made from other manual sources such as [method append_text] and the `push_*` / [method pop] methods.
   *
   * **Note:** RichTextLabel doesn't support entangled BBCode tags. For example, instead of using [code skip-lint]**bold**bold italic**italic**`, use [code skip-lint]**bold**bold italic******italic**`.
   *
   * **Note:** `push_pop_*` functions won't affect BBCode.
   *
   * **Note:** While [member bbcode_enabled] is enabled, alignment tags such as [code skip-lint][center]` will take priority over the [member horizontal_alignment] setting which determines the default text alignment.
   *
   */
  new(): RichTextLabel
  constructor()
  static new(): RichTextLabel

  /** If set to something other than [constant TextServer.AUTOWRAP_OFF], the text gets wrapped inside the node's bounding rectangle. */
  autowrap_mode: int

  /** Autowrap space trimming flags. See [constant TextServer.BREAK_TRIM_START_EDGE_SPACES] and [constant TextServer.BREAK_TRIM_END_EDGE_SPACES] for more info. */
  autowrap_trim_flags: int

  /**
   * If `true`, the label uses BBCode formatting.
   *
   * **Note:** This only affects the contents of [member text], not the tag stack.
   *
   */
  bbcode_enabled: boolean

  /** If [code]true[/code], a right-click displays the context menu. */
  context_menu_enabled: boolean

  /**
   * The currently installed custom effects. This is an array of [RichTextEffect]s.
   *
   * To add a custom effect, it's more convenient to use [method install_effect].
   *
   */
  custom_effects: any[]

  /** If [code]true[/code], the selected text will be deselected when focus is lost. */
  deselect_on_focus_loss_enabled: boolean

  /** If [code]true[/code], allow drag and drop of selected text. */
  drag_and_drop_selection_enabled: boolean

  /** If [code]true[/code], the label's minimum size will be automatically updated to fit its content, matching the behavior of [Label]. */
  fit_content: boolean

  /** If [code]true[/code], the label underlines hint tags such as [code skip-lint][hint=description]{text}[/hint][/code]. */
  hint_underlined: boolean

  /** Controls the text's horizontal alignment. Supports left, center, right, and fill (also known as justify). */
  horizontal_alignment: int

  /** Line fill alignment rules. */
  justification_flags: int

  /** Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead. */
  language: string

  /** If [code]true[/code], the label underlines meta tags such as [code skip-lint][url]{text}[/url][/code]. These tags can call a function when clicked if [signal meta_clicked] is connected to a function. */
  meta_underlined: boolean

  /**
   * The delay after which the loading progress bar is displayed, in milliseconds. Set to `-1` to disable progress bar entirely.
   *
   * **Note:** Progress bar is displayed only if [member threaded] is enabled.
   *
   */
  progress_bar_delay: int

  /** If [code]true[/code], the scrollbar is visible. Setting this to [code]false[/code] does not block scrolling completely. See [method scroll_to_line]. */
  scroll_active: boolean

  /** If [code]true[/code], the window scrolls down to display new content automatically. */
  scroll_following: boolean

  /** If [code]true[/code], the window scrolls to display the last visible line when [member visible_characters] or [member visible_ratio] is changed. */
  scroll_following_visible_characters: boolean

  /** If [code]true[/code], the label allows text selection. */
  selection_enabled: boolean

  /** If [code]true[/code], shortcut keys for context menu items are enabled, even if the context menu is disabled. */
  shortcut_keys_enabled: boolean

  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int

  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: any[]

  /** The number of spaces associated with a single tab length. Does not affect [code]\t[/code] in text tags, only indent tags. */
  tab_size: int

  /** Aligns text to the given tab-stops. */
  tab_stops: PackedFloat32Array

  /**
   * The label's text in BBCode format. Is not representative of manual modifications to the internal tag stack. Erases changes made by other methods when edited.
   *
   * **Note:** If [member bbcode_enabled] is `true`, it is unadvised to use the `+=` operator with [member text] (e.g. `text += "some string"`) as it replaces the whole text and can cause slowdowns. It will also erase all BBCode that was added to stack using `push_*` methods. Use [method append_text] for adding text instead, unless you absolutely need to close a tag that was opened in an earlier method call.
   *
   */
  text: string

  /** Base text writing direction. */
  text_direction: int

  /** If [code]true[/code], text processing is done in a background thread. */
  threaded: boolean

  /** Controls the text's vertical alignment. Supports top, center, bottom, and fill. */
  vertical_alignment: int

  /**
   * The number of characters to display. If set to `-1`, all characters are displayed. This can be useful when animating the text appearing in a dialog box.
   *
   * **Note:** Setting this property updates [member visible_ratio] accordingly.
   *
   * **Note:** Characters are counted as Unicode codepoints. A single visible grapheme may contain multiple codepoints (e.g. certain emoji use three codepoints). A single codepoint may contain two UTF-16 characters, which are used in C# strings.
   *
   */
  visible_characters: int

  /** The clipping behavior when [member visible_characters] or [member visible_ratio] is set. */
  visible_characters_behavior: int

  /**
   * The fraction of characters to display, relative to the total number of characters (see [method get_total_character_count]). If set to `1.0`, all characters are displayed. If set to `0.5`, only half of the characters will be displayed. This can be useful when animating the text appearing in a dialog box.
   *
   * **Note:** Setting this property updates [member visible_characters] accordingly.
   *
   */
  visible_ratio: float

  /**
   * Adds a horizontal rule that can be used to separate content.
   *
   * If [param width_in_percent] is set, [param width] values are percentages of the control width instead of pixels.
   *
   * If [param height_in_percent] is set, [param height] values are percentages of the control width instead of pixels.
   *
   */
  add_hr(
    width?: int,
    height?: int,
    color?: Color,
    alignment?: int,
    width_in_percent?: boolean,
    height_in_percent?: boolean
  ): void

  /**
   * Adds an image's opening and closing tags to the tag stack, optionally providing a [param width] and [param height] to resize the image, a [param color] to tint the image and a [param region] to only use parts of the image.
   *
   * If [param width] or [param height] is set to 0, the image size will be adjusted in order to keep the original aspect ratio.
   *
   * If [param width] and [param height] are not set, but [param region] is, the region's rect will be used.
   *
   * [param key] is an optional identifier, that can be used to modify the image via [method update_image].
   *
   * If [param pad] is set, and the image is smaller than the size specified by [param width] and [param height], the image padding is added to match the size instead of upscaling.
   *
   * If [param width_in_percent] is set, [param width] values are percentages of the control width instead of pixels.
   *
   * If [param height_in_percent] is set, [param height] values are percentages of the control width instead of pixels.
   *
   * [param alt_text] is used as the image description for assistive apps.
   *
   */
  add_image(
    image: Texture2D,
    width?: int,
    height?: int,
    color?: Color,
    inline_align?: int,
    region?: Rect2,
    key?: any,
    pad?: boolean,
    tooltip?: string,
    width_in_percent?: boolean,
    height_in_percent?: boolean,
    alt_text?: string
  ): void

  /** Adds raw non-BBCode-parsed text to the tag stack. */
  add_text(text: string): void

  /**
   * Parses [param bbcode] and adds tags to the tag stack as needed.
   *
   * **Note:** Using this method, you can't close a tag that was opened in a previous [method append_text] call. This is done to improve performance, especially when updating large RichTextLabels since rebuilding the whole BBCode every time would be slower. If you absolutely need to close a tag in a future method call, append the [member text] instead of using [method append_text].
   *
   */
  append_text(bbcode: string): void

  /**
   * Clears the tag stack, causing the label to display nothing.
   *
   * **Note:** This method does not affect [member text], and its contents will show again if the label is redrawn. However, setting [member text] to an empty [String] also clears the stack.
   *
   */
  clear(): void

  /** Clears the current selection. */
  deselect(): void

  /**
   * Returns the line number of the character position provided. Line and character numbers are both zero-indexed.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_character_line(character: int): int

  /**
   * Returns the paragraph number of the character position provided. Paragraph and character numbers are both zero-indexed.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_character_paragraph(character: int): int

  /**
   * Returns the height of the content.
   *
   * **Note:** This method always returns the full content size, and is not affected by [member visible_ratio] and [member visible_characters]. To get the visible content size, use [method get_visible_content_rect].
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_content_height(): int

  /**
   * Returns the width of the content.
   *
   * **Note:** This method always returns the full content size, and is not affected by [member visible_ratio] and [member visible_characters]. To get the visible content size, use [method get_visible_content_rect].
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_content_width(): int

  /**
   * Returns the total number of lines in the text. Wrapped text is counted as multiple lines.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_line_count(): int

  /**
   * Returns the height of the line found at the provided index.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether the document is fully loaded.
   *
   */
  get_line_height(line: int): int

  /**
   * Returns the vertical offset of the line found at the provided index.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_line_offset(line: int): float

  /**
   * Returns the indexes of the first and last visible characters for the given [param line], as a [Vector2i].
   *
   * **Note:** If [member visible_characters_behavior] is set to [constant TextServer.VC_CHARS_BEFORE_SHAPING] only visible wrapped lines are counted.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_line_range(line: int): Vector2i

  /**
   * Returns the width of the line found at the provided index.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether the document is fully loaded.
   *
   */
  get_line_width(line: int): int

  /**
   * Returns the [PopupMenu] of this [RichTextLabel]. By default, this menu is displayed when right-clicking on the [RichTextLabel].
   *
   * You can add custom menu items or remove standard ones. Make sure your IDs don't conflict with the standard ones (see [enum MenuItems]). For example:
   *
   * @example
   *
   *
   * func _ready():
   * 	var menu = get_menu()
   * 	# Remove "Select All" item.
   * 	menu.remove_item(MENU_SELECT_ALL)
   * 	# Add custom items.
   * 	menu.add_separator()
   * 	menu.add_item("Duplicate Text", MENU_MAX + 1)
   * 	# Connect callback.
   * 	menu.id_pressed.connect(_on_item_pressed)
   * func _on_item_pressed(id):
   * 	if id == MENU_MAX + 1:
   * 		add_text("\n" + get_parsed_text())
   *
   *
   * public override void _Ready()
   * {
   * 	var menu = GetMenu();
   * 	// Remove "Select All" item.
   * 	menu.RemoveItem(RichTextLabel.MenuItems.SelectAll);
   * 	// Add custom items.
   * 	menu.AddSeparator();
   * 	menu.AddItem("Duplicate Text", RichTextLabel.MenuItems.Max + 1);
   * 	// Add event handler.
   * 	menu.IdPressed += OnItemPressed;
   * }
   * public void OnItemPressed(int id)
   * {
   * 	if (id == TextEdit.MenuItems.Max + 1)
   * 	{
   * 		AddText("\n" + GetParsedText());
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

  /** Returns the total number of paragraphs (newlines or [code]p[/code] tags in the tag stack's text tags). Considers wrapped text as one paragraph. */
  get_paragraph_count(): int

  /**
   * Returns the vertical offset of the paragraph found at the provided index.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_paragraph_offset(paragraph: int): float

  /** Returns the text without BBCode mark-up. */
  get_parsed_text(): string

  /** Returns the current selection text. Does not include BBCodes. */
  get_selected_text(): string

  /** Returns the current selection first character index if a selection is active, [code]-1[/code] otherwise. Does not include BBCodes. */
  get_selection_from(): int

  /** Returns the current selection vertical line offset if a selection is active, [code]-1.0[/code] otherwise. */
  get_selection_line_offset(): float

  /** Returns the current selection last character index if a selection is active, [code]-1[/code] otherwise. Does not include BBCodes. */
  get_selection_to(): int

  /** Returns the total number of characters from text tags. Does not include BBCodes. */
  get_total_character_count(): int

  /**
   * Returns the vertical scrollbar.
   *
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
   *
   */
  get_v_scroll_bar(): VScrollBar

  /**
   * Returns the bounding rectangle of the visible content.
   *
   * **Note:** This method returns a correct value only after the label has been drawn.
   *
   * @example
   *
   *
   * extends RichTextLabel
   * @export var background_panel: Panel
   * func _ready():
   * 	await draw
   * 	background_panel.position = get_visible_content_rect().position
   * 	background_panel.size = get_visible_content_rect().size
   *
   *
   * public partial class TestLabel : RichTextLabel
   * {
   * 	[Export]
   * 	public Panel BackgroundPanel { get; set; }
   * 	public override async void _Ready()
   * 	{
   * 		await ToSignal(this, Control.SignalName.Draw);
   * 		BackgroundGPanel.Position = GetVisibleContentRect().Position;
   * 		BackgroundPanel.Size = GetVisibleContentRect().Size;
   * 	}
   * }
   *
   * @summary
   *
   *
   */
  get_visible_content_rect(): Rect2i

  /**
   * Returns the number of visible lines.
   *
   * **Note:** This method returns a correct value only after the label has been drawn.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_visible_line_count(): int

  /**
   * Returns the number of visible paragraphs. A paragraph is considered visible if at least one of its lines is visible.
   *
   * **Note:** This method returns a correct value only after the label has been drawn.
   *
   * **Note:** If [member threaded] is enabled, this method returns a value for the loaded part of the document. Use [method is_finished] or [signal finished] to determine whether document is fully loaded.
   *
   */
  get_visible_paragraph_count(): int

  /**
   * Installs a custom effect. This can also be done in the Inspector through the [member custom_effects] property. [param effect] should be a valid [RichTextEffect].
   *
   * **Example:** With the following script extending from [RichTextEffect]:
   *
   * @example
   *
   * # effect.gd
   * class_name MyCustomEffect
   * extends RichTextEffect
   * var bbcode = "my_custom_effect"
   * # ...
   * @summary
   *
   *
   * The above effect can be installed in [RichTextLabel] from a script:
   *
   * @example
   *
   * # rich_text_label.gd
   * extends RichTextLabel
   * func _ready():
   * 	install_effect(MyCustomEffect.new())
   * 	# Alternatively, if not using `class_name` in the script that extends RichTextEffect:
   * 	install_effect(preload("res://effect.gd").new())
   * @summary
   *
   *
   */
  install_effect(effect: any): void

  /** Invalidates [param paragraph] and all subsequent paragraphs cache. */
  invalidate_paragraph(paragraph: int): boolean

  /** If [member threaded] is enabled, returns [code]true[/code] if the background thread has finished text processing, otherwise always return [code]true[/code]. */
  is_finished(): boolean

  /** Returns whether the menu is visible. Use this instead of [code]get_menu().visible[/code] to improve performance (so the creation of the menu is avoided). */
  is_menu_visible(): boolean

  /** If [member threaded] is enabled, returns [code]true[/code] if the background thread has finished text processing, otherwise always return [code]true[/code]. */
  is_ready(): boolean

  /** Executes a given action as defined in the [enum MenuItems] enum. */
  menu_option(option: int): void

  /** Adds a newline tag to the tag stack. */
  newline(): void

  /** The assignment version of [method append_text]. Clears the tag stack and inserts the new content. */
  parse_bbcode(bbcode: string): void

  /** Parses BBCode parameter [param expressions] into a dictionary. */
  parse_expressions_for_values(
    expressions: PackedStringArray
  ): Dictionary<any, any>

  /** Terminates the current tag. Use after [code]push_*[/code] methods to close BBCodes manually. Does not need to follow [code]add_*[/code] methods. */
  pop(): void

  /** Terminates all tags opened by [code]push_*[/code] methods. */
  pop_all(): void

  /** Terminates tags opened after the last [method push_context] call (including context marker), or all tags if there's no context marker on the stack. */
  pop_context(): void

  /**
   * Adds a [code skip-lint][bgcolor]` tag to the tag stack.
   *
   * **Note:** The background color has padding applied by default, which is controlled using [theme_item text_highlight_h_padding] and [theme_item text_highlight_v_padding]. This can lead to overlapping highlights if background colors are placed on neighboring lines/columns, so consider setting those theme items to `0` if you want to avoid this.
   *
   */
  push_bgcolor(bgcolor: Color): void

  /** Adds a [code skip-lint][font][/code] tag with a bold font to the tag stack. This is the same as adding a [code skip-lint][b][/code] tag if not currently in a [code skip-lint][i][/code] tag. */
  push_bold(): void

  /** Adds a [code skip-lint][font][/code] tag with a bold italics font to the tag stack. */
  push_bold_italics(): void

  /** Adds a [code skip-lint][cell][/code] tag to the tag stack. Must be inside a [code skip-lint][table][/code] tag. See [method push_table] for details. Use [method set_table_column_expand] to set column expansion ratio, [method set_cell_border_color] to set cell border, [method set_cell_row_background_color] to set cell background, [method set_cell_size_override] to override cell size, and [method set_cell_padding] to set padding. */
  push_cell(): void

  /** Adds a [code skip-lint][color][/code] tag to the tag stack. */
  push_color(color: Color): void

  /** Adds a context marker to the tag stack. See [method pop_context]. */
  push_context(): void

  /** Adds a custom effect tag to the tag stack. The effect does not need to be in [member custom_effects]. The environment is directly passed to the effect. */
  push_customfx(effect: RichTextEffect, env: Dictionary<any, any>): void

  /** Adds a [code skip-lint][dropcap][/code] tag to the tag stack. Drop cap (dropped capital) is a decorative element at the beginning of a paragraph that is larger than the rest of the text. */
  push_dropcap(
    string: string,
    font: Font,
    size: int,
    dropcap_margins?: Rect2,
    color?: Color,
    outline_size?: int,
    outline_color?: Color
  ): void

  /**
   * Adds a [code skip-lint][fgcolor]` tag to the tag stack.
   *
   * **Note:** The foreground color has padding applied by default, which is controlled using [theme_item text_highlight_h_padding] and [theme_item text_highlight_v_padding]. This can lead to overlapping highlights if foreground colors are placed on neighboring lines/columns, so consider setting those theme items to `0` if you want to avoid this.
   *
   */
  push_fgcolor(fgcolor: Color): void

  /**
   * Adds a [code skip-lint][font]` tag to the tag stack. Overrides default fonts for its duration.
   *
   * Passing `0` to [param font_size] will use the existing default font size.
   *
   */
  push_font(font: Font, font_size?: int): void

  /** Adds a [code skip-lint][font_size][/code] tag to the tag stack. Overrides default font size for its duration. */
  push_font_size(font_size: int): void

  /** Adds a [code skip-lint][hint][/code] tag to the tag stack. Same as BBCode [code skip-lint][hint=something]{text}[/hint][/code]. */
  push_hint(description: string): void

  /** Adds an [code skip-lint][indent][/code] tag to the tag stack. Multiplies [param level] by current [member tab_size] to determine new margin length. */
  push_indent(level: int): void

  /** Adds a [code skip-lint][font][/code] tag with an italics font to the tag stack. This is the same as adding an [code skip-lint][i][/code] tag if not currently in a [code skip-lint][b][/code] tag. */
  push_italics(): void

  /** Adds language code used for text shaping algorithm and Open-Type font features. */
  push_language(language: string): void

  /** Adds [code skip-lint][ol][/code] or [code skip-lint][ul][/code] tag to the tag stack. Multiplies [param level] by current [member tab_size] to determine new margin length. */
  push_list(level: int, type: int, capitalize: boolean, bullet?: string): void

  /**
   * Adds a meta tag to the tag stack. Similar to the BBCode [code skip-lint][url=something]{text}[/url]`, but supports non-[String] metadata types.
   *
   * If [member meta_underlined] is `true`, meta tags display an underline. This behavior can be customized with [param underline_mode].
   *
   * **Note:** Meta tags do nothing by default when clicked. To assign behavior when clicked, connect [signal meta_clicked] to a function that is called when the meta tag is clicked.
   *
   */
  push_meta(data: any, underline_mode?: int, tooltip?: string): void

  /** Adds a [code skip-lint][font][/code] tag with a monospace font to the tag stack. */
  push_mono(): void

  /** Adds a [code skip-lint][font][/code] tag with a normal font to the tag stack. */
  push_normal(): void

  /** Adds a [code skip-lint][outline_color][/code] tag to the tag stack. Adds text outline for its duration. */
  push_outline_color(color: Color): void

  /** Adds a [code skip-lint][outline_size][/code] tag to the tag stack. Overrides default text outline size for its duration. */
  push_outline_size(outline_size: int): void

  /** Adds a [code skip-lint][p][/code] tag to the tag stack. */
  push_paragraph(
    alignment: int,
    base_direction?: int,
    language?: string,
    st_parser?: int,
    justification_flags?: int,
    tab_stops?: PackedFloat32Array
  ): void

  /** Adds a [code skip-lint][s][/code] tag to the tag stack. If [param color]'s alpha value is [code]0.0[/code], the current font's color with its alpha multiplied by [theme_item strikethrough_alpha] is used. */
  push_strikethrough(color?: Color): void

  /** Adds a [code skip-lint][table=columns,inline_align][/code] tag to the tag stack. Use [method set_table_column_expand] to set column expansion ratio. Use [method push_cell] to add cells. [param name] is used as the table name for assistive apps. */
  push_table(
    columns: int,
    inline_align?: int,
    align_to_row?: int,
    name?: string
  ): void

  /** Adds a [code skip-lint][u][/code] tag to the tag stack. If [param color]'s alpha value is [code]0.0[/code], the current font's color with its alpha multiplied by [theme_item underline_alpha] is used. */
  push_underline(color?: Color): void

  /** Reloads custom effects. Useful when [member custom_effects] is modified manually. */
  reload_effects(): void

  /**
   * Removes a paragraph of content from the label. Returns `true` if the paragraph exists.
   *
   * The [param paragraph] argument is the index of the paragraph to remove, it can take values in the interval `[0, get_paragraph_count() - 1]`.
   *
   * If [param no_invalidate] is set to `true`, cache for the subsequent paragraphs is not invalidated. Use it for faster updates if deleted paragraph is fully self-contained (have no unclosed tags), or this call is part of the complex edit operation and [method invalidate_paragraph] will be called at the end of operation.
   *
   */
  remove_paragraph(paragraph: int, no_invalidate?: boolean): boolean

  /** Scrolls the window's top line to match [param line]. */
  scroll_to_line(line: int): void

  /** Scrolls the window's top line to match first line of the [param paragraph]. */
  scroll_to_paragraph(paragraph: int): void

  /** Scrolls to the beginning of the current selection. */
  scroll_to_selection(): void

  /**
   * Select all the text.
   *
   * If [member selection_enabled] is `false`, no selection will occur.
   *
   */
  select_all(): void

  /** Sets color of a table cell border. */
  set_cell_border_color(color: Color): void

  /** Sets inner padding of a table cell. */
  set_cell_padding(padding: Rect2): void

  /** Sets color of a table cell. Separate colors for alternating rows can be specified. */
  set_cell_row_background_color(odd_row_bg: Color, even_row_bg: Color): void

  /** Sets minimum and maximum size overrides for a table cell. */
  set_cell_size_override(min_size: Vector2, max_size: Vector2): void

  /**
   * Edits the selected column's expansion options. If [param expand] is `true`, the column expands in proportion to its expansion ratio versus the other columns' ratios.
   *
   * For example, 2 columns with ratios 3 and 4 plus 70 pixels in available width would expand 30 and 40 pixels, respectively.
   *
   * If [param expand] is `false`, the column will not contribute to the total ratio.
   *
   */
  set_table_column_expand(
    column: int,
    expand: boolean,
    ratio?: int,
    shrink?: boolean
  ): void

  /** Sets table column name for assistive apps. */
  set_table_column_name(column: int, name: string): void

  /** Updates the existing images with the key [param key]. Only properties specified by [param mask] bits are updated. See [method add_image]. */
  update_image(
    key: any,
    mask: int,
    image: Texture2D,
    width?: int,
    height?: int,
    color?: Color,
    inline_align?: int,
    region?: Rect2,
    pad?: boolean,
    tooltip?: string,
    width_in_percent?: boolean,
    height_in_percent?: boolean
  ): void

  connect<T extends SignalsOf<RichTextLabel>>(
    signal: T,
    method: SignalFunction<RichTextLabel[T]>
  ): number

  /**
   * Each list item has a number marker.
   *
   */
  static LIST_NUMBERS: any

  /**
   * Each list item has a letter marker.
   *
   */
  static LIST_LETTERS: any

  /**
   * Each list item has a roman number marker.
   *
   */
  static LIST_ROMAN: any

  /**
   * Each list item has a filled circle marker.
   *
   */
  static LIST_DOTS: any

  /**
   * Copies the selected text.
   *
   */
  static MENU_COPY: any

  /**
   * Selects the whole [RichTextLabel] text.
   *
   */
  static MENU_SELECT_ALL: any

  /**
   * Represents the size of the [enum MenuItems] enum.
   *
   */
  static MENU_MAX: any

  /**
   * Meta tag does not display an underline, even if [member meta_underlined] is `true`.
   *
   */
  static META_UNDERLINE_NEVER: any

  /**
   * If [member meta_underlined] is `true`, meta tag always display an underline.
   *
   */
  static META_UNDERLINE_ALWAYS: any

  /**
   * If [member meta_underlined] is `true`, meta tag display an underline when the mouse cursor is over it.
   *
   */
  static META_UNDERLINE_ON_HOVER: any

  /**
   * If this bit is set, [method update_image] changes image texture.
   *
   */
  static UPDATE_TEXTURE: any

  /**
   * If this bit is set, [method update_image] changes image size.
   *
   */
  static UPDATE_SIZE: any

  /**
   * If this bit is set, [method update_image] changes image color.
   *
   */
  static UPDATE_COLOR: any

  /**
   * If this bit is set, [method update_image] changes image inline alignment.
   *
   */
  static UPDATE_ALIGNMENT: any

  /**
   * If this bit is set, [method update_image] changes image texture region.
   *
   */
  static UPDATE_REGION: any

  /**
   * If this bit is set, [method update_image] changes image padding.
   *
   */
  static UPDATE_PAD: any

  /**
   * If this bit is set, [method update_image] changes image tooltip.
   *
   */
  static UPDATE_TOOLTIP: any

  /**
   * If this bit is set, [method update_image] changes image width from/to percents.
   *
   */
  static UPDATE_WIDTH_IN_PERCENT: any

  /**
   * Triggered when the document is fully loaded.
   *
   * **Note:** This can happen before the text is processed for drawing. Scrolling values may not be valid until the document is drawn for the first time after this signal.
   *
   */
  $finished: Signal<() => void>

  /**
   * Triggered when the user clicks on content between meta (URL) tags. If the meta is defined in BBCode, e.g. [code skip-lint][url={"key": "value"}]Text[/url]`, then the parameter for this signal will always be a [String] type. If a particular type or an object is desired, the [method push_meta] method must be used to manually insert the data into the tag stack. Alternatively, you can convert the [String] input to the desired type based on its contents (such as calling [method JSON.parse] on it).
   *
   * For example, the following method can be connected to [signal meta_clicked] to open clicked URLs using the user's default web browser:
   *
   * @example
   *
   *
   * # This assumes RichTextLabel's `meta_clicked` signal was connected to
   * # the function below using the signal connection dialog.
   * func _richtextlabel_on_meta_clicked(meta):
   * 	# `meta` is of Variant type, so convert it to a String to avoid script errors at run-time.
   * 	OS.shell_open(str(meta))
   *
   * @summary
   *
   *
   */
  $meta_clicked: Signal<() => void>

  /**
   * Triggers when the mouse exits a meta tag.
   *
   */
  $meta_hover_ended: Signal<() => void>

  /**
   * Triggers when the mouse enters a meta tag.
   *
   */
  $meta_hover_started: Signal<() => void>
}
