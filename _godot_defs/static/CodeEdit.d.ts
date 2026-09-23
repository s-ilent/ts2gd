/**
 * CodeEdit is a specialized [TextEdit] designed for editing plain text code files. It has many features commonly found in code editors such as line numbers, line folding, code completion, indent management, and string/comment management.
 *
 * **Note:** Regardless of locale, [CodeEdit] will by default always use left-to-right text direction to correctly display source code.
 *
 */
declare class CodeEdit extends TextEdit {
  /**
   * CodeEdit is a specialized [TextEdit] designed for editing plain text code files. It has many features commonly found in code editors such as line numbers, line folding, code completion, indent management, and string/comment management.
   *
   * **Note:** Regardless of locale, [CodeEdit] will by default always use left-to-right text direction to correctly display source code.
   *
   */
  new(): CodeEdit
  constructor()
  static new(): CodeEdit

  /** If [code]true[/code], uses [member auto_brace_completion_pairs] to automatically insert the closing brace when the opening brace is inserted by typing or autocompletion. Also automatically removes the closing brace when using backspace on the opening brace. */
  auto_brace_completion_enabled: boolean

  /** If [code]true[/code], highlights brace pairs when the caret is on either one, using [member auto_brace_completion_pairs]. If matching, the pairs will be underlined. If a brace is unmatched, it is colored with [theme_item brace_mismatch_color]. */
  auto_brace_completion_highlight_matching: boolean

  /** Sets the brace pairs to be autocompleted. For each entry in the dictionary, the key is the opening brace and the value is the closing brace that matches it. A brace is a [String] made of symbols. See [member auto_brace_completion_enabled] and [member auto_brace_completion_highlight_matching]. */
  auto_brace_completion_pairs: Dictionary<any, any>

  /** If [code]true[/code], the [member ProjectSettings.input/ui_text_completion_query] action requests code completion. To handle it, see [method _request_code_completion] or [signal code_completion_requested]. */
  code_completion_enabled: boolean

  /** Sets prefixes that will trigger code completion. */
  code_completion_prefixes: String[]

  /** Sets the comment delimiters. All existing comment delimiters will be removed. */
  delimiter_comments: String[]

  /** Sets the string delimiters. All existing string delimiters will be removed. */
  delimiter_strings: String[]

  /** If [code]true[/code], bookmarks are drawn in the gutter. This gutter is shared with breakpoints and executing lines. See [method set_line_as_bookmarked]. */
  gutters_draw_bookmarks: boolean

  /** If [code]true[/code], breakpoints are drawn in the gutter. This gutter is shared with bookmarks and executing lines. Clicking the gutter will toggle the breakpoint for the line, see [method set_line_as_breakpoint]. */
  gutters_draw_breakpoints_gutter: boolean

  /** If [code]true[/code], executing lines are marked in the gutter. This gutter is shared with breakpoints and bookmarks. See [method set_line_as_executing]. */
  gutters_draw_executing_lines: boolean

  /** If [code]true[/code], the fold gutter is drawn. In this gutter, the [theme_item can_fold_code_region] icon is drawn for each foldable line (see [method can_fold_line]) and the [theme_item folded_code_region] icon is drawn for each folded line (see [method is_line_folded]). These icons can be clicked to toggle the fold state, see [method toggle_foldable_line]. [member line_folding] must be [code]true[/code] to show icons. */
  gutters_draw_fold_gutter: boolean

  /** If [code]true[/code], the line number gutter is drawn. Line numbers start at [code]1[/code] and are incremented for each line of text. Clicking and dragging in the line number gutter will select entire lines of text. */
  gutters_draw_line_numbers: boolean

  /** The minimum width in digits reserved for the line number gutter. */
  gutters_line_numbers_min_digits: int

  /** If [code]true[/code], line numbers drawn in the gutter are zero padded based on the total line count. Requires [member gutters_draw_line_numbers] to be set to [code]true[/code]. */
  gutters_zero_pad_line_numbers: boolean

  /** If [code]true[/code], an extra indent is automatically inserted when a new line is added and a prefix in [member indent_automatic_prefixes] is found. If a brace pair opening key is found, the matching closing brace will be moved to another new line (see [member auto_brace_completion_pairs]). */
  indent_automatic: boolean

  /** Prefixes to trigger an automatic indent. Used when [member indent_automatic] is set to [code]true[/code]. */
  indent_automatic_prefixes: String[]

  /** Size of the tabulation indent (one [kbd]Tab[/kbd] press) in characters. If [member indent_use_spaces] is enabled the number of spaces to use. */
  indent_size: int

  /** Use spaces instead of tabs for indentation. */
  indent_use_spaces: boolean

  /** If [code]true[/code], lines can be folded. Otherwise, line folding methods like [method fold_line] will not work and [method can_fold_line] will always return [code]false[/code]. See [member gutters_draw_fold_gutter]. */
  line_folding: boolean

  /** Draws vertical lines at the provided columns. The first entry is considered a main hard guideline and is drawn more prominently. */
  line_length_guidelines: int[]

  /** Set when a validated word from [signal symbol_validate] is clicked, the [signal symbol_lookup] should be emitted. */
  symbol_lookup_on_click: boolean

  /** If [code]true[/code], the [signal symbol_hovered] signal is emitted when hovering over a word. */
  symbol_tooltip_on_hover: boolean

  /** Override this method to define how the selected entry should be inserted. If [param replace] is [code]true[/code], any existing text should be replaced. */
  protected _confirm_code_completion(replace: boolean): void

  /**
   * Override this method to define what items in [param candidates] should be displayed.
   *
   * Both [param candidates] and the return is an [Array] of [Dictionary], see [method get_code_completion_option] for [Dictionary] content.
   *
   */
  protected _filter_code_completion_candidates(
    candidates: Dictionary<any, any>[]
  ): Dictionary<any, any>[]

  /** Override this method to define what happens when the user requests code completion. If [param force] is [code]true[/code], any checks should be bypassed. */
  protected _request_code_completion(force: boolean): void

  /**
   * Adds a brace pair.
   *
   * Both the start and end keys must be symbols. Only the start key has to be unique.
   *
   */
  add_auto_brace_completion_pair(start_key: string, end_key: string): void

  /**
   * Submits an item to the queue of potential candidates for the autocomplete menu. Call [method update_code_completion_options] to update the list.
   *
   * [param location] indicates location of the option relative to the location of the code completion query. See [enum CodeEdit.CodeCompletionLocation] for how to set this value.
   *
   * **Note:** This list will replace all current candidates.
   *
   */
  add_code_completion_option(
    type: int,
    display_text: string,
    insert_text: string,
    text_color?: Color,
    icon?: Resource,
    value?: any,
    location?: int
  ): void

  /**
   * Adds a comment delimiter from [param start_key] to [param end_key]. Both keys should be symbols, and [param start_key] must not be shared with other delimiters.
   *
   * If [param line_only] is `true` or [param end_key] is an empty [String], the region does not carry over to the next line.
   *
   */
  add_comment_delimiter(
    start_key: string,
    end_key: string,
    line_only?: boolean
  ): void

  /**
   * Defines a string delimiter from [param start_key] to [param end_key]. Both keys should be symbols, and [param start_key] must not be shared with other delimiters.
   *
   * If [param line_only] is `true` or [param end_key] is an empty [String], the region does not carry over to the next line.
   *
   */
  add_string_delimiter(
    start_key: string,
    end_key: string,
    line_only?: boolean
  ): void

  /** Returns [code]true[/code] if the given line is foldable. A line is foldable if it is the start of a valid code region (see [method get_code_region_start_tag]), if it is the start of a comment or string block, or if the next non-empty line is more indented (see [method TextEdit.get_indent_level]). */
  can_fold_line(line: int): boolean

  /** Cancels the autocomplete menu. */
  cancel_code_completion(): void

  /** Clears all bookmarked lines. */
  clear_bookmarked_lines(): void

  /** Clears all breakpointed lines. */
  clear_breakpointed_lines(): void

  /** Removes all comment delimiters. */
  clear_comment_delimiters(): void

  /** Clears all executed lines. */
  clear_executing_lines(): void

  /** Removes all string delimiters. */
  clear_string_delimiters(): void

  /** Inserts the selected entry into the text. If [param replace] is [code]true[/code], any existing text is replaced rather than merged. */
  confirm_code_completion(replace?: boolean): void

  /**
   * Converts the indents of lines between [param from_line] and [param to_line] to tabs or spaces as set by [member indent_use_spaces].
   *
   * Values of `-1` convert the entire text.
   *
   */
  convert_indent(from_line?: int, to_line?: int): void

  /**
   * Creates a new code region with the selection. At least one single line comment delimiter have to be defined (see [method add_comment_delimiter]).
   *
   * A code region is a part of code that is highlighted when folded and can help organize your script.
   *
   * Code region start and end tags can be customized (see [method set_code_region_tags]).
   *
   * Code regions are delimited using start and end tags (respectively `region` and `endregion` by default) preceded by one line comment delimiter. (eg. `#region` and `#endregion`)
   *
   */
  create_code_region(): void

  /** Deletes all lines that are selected or have a caret on them. */
  delete_lines(): void

  /** If there is no selection, indentation is inserted at the caret. Otherwise, the selected lines are indented like [method indent_lines]. Equivalent to the [member ProjectSettings.input/ui_text_indent] action. The indentation characters used depend on [member indent_use_spaces] and [member indent_size]. */
  do_indent(): void

  /** Duplicates all lines currently selected with any caret. Duplicates the entire line beneath the current one no matter where the caret is within the line. */
  duplicate_lines(): void

  /** Duplicates all selected text and duplicates all lines with a caret on them. */
  duplicate_selection(): void

  /** Folds all lines that are possible to be folded (see [method can_fold_line]). */
  fold_all_lines(): void

  /** Folds the given line, if possible (see [method can_fold_line]). */
  fold_line(line: int): void

  /** Gets the matching auto brace close key for [param open_key]. */
  get_auto_brace_completion_close_key(open_key: string): string

  /** Gets all bookmarked lines. */
  get_bookmarked_lines(): PackedInt32Array

  /** Gets all breakpointed lines. */
  get_breakpointed_lines(): PackedInt32Array

  /**
   * Gets the completion option at [param index]. The return [Dictionary] has the following key-values:
   *
   * `kind`: [enum CodeCompletionKind]
   *
   * `display_text`: Text that is shown on the autocomplete menu.
   *
   * `insert_text`: Text that is to be inserted when this item is selected.
   *
   * `font_color`: Color of the text on the autocomplete menu.
   *
   * `icon`: Icon to draw on the autocomplete menu.
   *
   * `default_value`: Value of the symbol.
   *
   */
  get_code_completion_option(index: int): Dictionary<any, any>

  /** Gets all completion options, see [method get_code_completion_option] for return content. */
  get_code_completion_options(): Dictionary<any, any>[]

  /** Gets the index of the current selected completion option. */
  get_code_completion_selected_index(): int

  /** Returns the code region end tag (without comment delimiter). */
  get_code_region_end_tag(): string

  /** Returns the code region start tag (without comment delimiter). */
  get_code_region_start_tag(): string

  /** Gets the end key for a string or comment region index. */
  get_delimiter_end_key(delimiter_index: int): string

  /** If [param line] [param column] is in a string or comment, returns the end position of the region. If not or no end could be found, both [Vector2] values will be [code]-1[/code]. */
  get_delimiter_end_position(line: int, column: int): Vector2

  /** Gets the start key for a string or comment region index. */
  get_delimiter_start_key(delimiter_index: int): string

  /** If [param line] [param column] is in a string or comment, returns the start position of the region. If not or no start could be found, both [Vector2] values will be [code]-1[/code]. */
  get_delimiter_start_position(line: int, column: int): Vector2

  /** Gets all executing lines. */
  get_executing_lines(): PackedInt32Array

  /** Returns all lines that are currently folded. */
  get_folded_lines(): int[]

  /** Returns the full text with char [code]0xFFFF[/code] at the caret location. */
  get_text_for_code_completion(): string

  /** Returns the full text with char [code]0xFFFF[/code] at the cursor location. */
  get_text_for_symbol_lookup(): string

  /** Returns the full text with char [code]0xFFFF[/code] at the specified location. */
  get_text_with_cursor_char(line: int, column: int): string

  /** Returns [code]true[/code] if close key [param close_key] exists. */
  has_auto_brace_completion_close_key(close_key: string): boolean

  /** Returns [code]true[/code] if open key [param open_key] exists. */
  has_auto_brace_completion_open_key(open_key: string): boolean

  /** Returns [code]true[/code] if comment [param start_key] exists. */
  has_comment_delimiter(start_key: string): boolean

  /** Returns [code]true[/code] if string [param start_key] exists. */
  has_string_delimiter(start_key: string): boolean

  /** Indents all lines that are selected or have a caret on them. Uses spaces or a tab depending on [member indent_use_spaces]. See [method unindent_lines]. */
  indent_lines(): void

  /** Returns delimiter index if [param line] [param column] is in a comment. If [param column] is not provided, will return delimiter index if the entire [param line] is a comment. Otherwise [code]-1[/code]. */
  is_in_comment(line: int, column?: int): int

  /** Returns the delimiter index if [param line] [param column] is in a string. If [param column] is not provided, will return the delimiter index if the entire [param line] is a string. Otherwise [code]-1[/code]. */
  is_in_string(line: int, column?: int): int

  /** Returns [code]true[/code] if the given line is bookmarked. See [method set_line_as_bookmarked]. */
  is_line_bookmarked(line: int): boolean

  /** Returns [code]true[/code] if the given line is breakpointed. See [method set_line_as_breakpoint]. */
  is_line_breakpointed(line: int): boolean

  /** Returns [code]true[/code] if the given line is a code region end. See [method set_code_region_tags]. */
  is_line_code_region_end(line: int): boolean

  /** Returns [code]true[/code] if the given line is a code region start. See [method set_code_region_tags]. */
  is_line_code_region_start(line: int): boolean

  /** Returns [code]true[/code] if the given line is marked as executing. See [method set_line_as_executing]. */
  is_line_executing(line: int): boolean

  /** Returns [code]true[/code] if the given line is folded. See [method fold_line]. */
  is_line_folded(line: int): boolean

  /** Moves all lines down that are selected or have a caret on them. */
  move_lines_down(): void

  /** Moves all lines up that are selected or have a caret on them. */
  move_lines_up(): void

  /** Removes the comment delimiter with [param start_key]. */
  remove_comment_delimiter(start_key: string): void

  /** Removes the string delimiter with [param start_key]. */
  remove_string_delimiter(start_key: string): void

  /** Emits [signal code_completion_requested], if [param force] is [code]true[/code] will bypass all checks. Otherwise will check that the caret is in a word or in front of a prefix. Will ignore the request if all current options are of type file path, node path, or signal. */
  request_code_completion(force?: boolean): void

  /** Sets the current selected completion option. */
  set_code_completion_selected_index(index: int): void

  /** Sets the code hint text. Pass an empty string to clear. */
  set_code_hint(code_hint: string): void

  /** If [code]true[/code], the code hint will draw below the main caret. If [code]false[/code], the code hint will draw above the main caret. See [method set_code_hint]. */
  set_code_hint_draw_below(draw_below: boolean): void

  /** Sets the code region start and end tags (without comment delimiter). */
  set_code_region_tags(start?: string, end?: string): void

  /** Sets the given line as bookmarked. If [code]true[/code] and [member gutters_draw_bookmarks] is [code]true[/code], draws the [theme_item bookmark] icon in the gutter for this line. See [method get_bookmarked_lines] and [method is_line_bookmarked]. */
  set_line_as_bookmarked(line: int, bookmarked: boolean): void

  /** Sets the given line as a breakpoint. If [code]true[/code] and [member gutters_draw_breakpoints_gutter] is [code]true[/code], draws the [theme_item breakpoint] icon in the gutter for this line. See [method get_breakpointed_lines] and [method is_line_breakpointed]. */
  set_line_as_breakpoint(line: int, breakpointed: boolean): void

  /** Sets the given line as executing. If [code]true[/code] and [member gutters_draw_executing_lines] is [code]true[/code], draws the [theme_item executing_line] icon in the gutter for this line. See [method get_executing_lines] and [method is_line_executing]. */
  set_line_as_executing(line: int, executing: boolean): void

  /** Sets the symbol emitted by [signal symbol_validate] as a valid lookup. */
  set_symbol_lookup_word_as_valid(valid: boolean): void

  /** Toggle the folding of the code block at the given line. */
  toggle_foldable_line(line: int): void

  /** Toggle the folding of the code block on all lines with a caret on them. */
  toggle_foldable_lines_at_carets(): void

  /** Unfolds all lines that are folded. */
  unfold_all_lines(): void

  /** Unfolds the given line if it is folded or if it is hidden under a folded line. */
  unfold_line(line: int): void

  /** Unindents all lines that are selected or have a caret on them. Uses spaces or a tab depending on [member indent_use_spaces]. Equivalent to the [member ProjectSettings.input/ui_text_dedent] action. See [method indent_lines]. */
  unindent_lines(): void

  /**
   * Submits all completion options added with [method add_code_completion_option]. Will try to force the autocomplete menu to popup, if [param force] is `true`.
   *
   * **Note:** This will replace all current candidates.
   *
   */
  update_code_completion_options(force: boolean): void

  connect<T extends SignalsOf<CodeEdit>>(
    signal: T,
    method: SignalFunction<CodeEdit[T]>
  ): number

  /**
   * Marks the option as a class.
   *
   */
  static KIND_CLASS: any

  /**
   * Marks the option as a function.
   *
   */
  static KIND_FUNCTION: any

  /**
   * Marks the option as a Godot signal.
   *
   */
  static KIND_SIGNAL: any

  /**
   * Marks the option as a variable.
   *
   */
  static KIND_VARIABLE: any

  /**
   * Marks the option as a member.
   *
   */
  static KIND_MEMBER: any

  /**
   * Marks the option as an enum entry.
   *
   */
  static KIND_ENUM: any

  /**
   * Marks the option as a constant.
   *
   */
  static KIND_CONSTANT: any

  /**
   * Marks the option as a Godot node path.
   *
   */
  static KIND_NODE_PATH: any

  /**
   * Marks the option as a file path.
   *
   */
  static KIND_FILE_PATH: any

  /**
   * Marks the option as unclassified or plain text.
   *
   */
  static KIND_PLAIN_TEXT: any

  /**
   * The option is local to the location of the code completion query - e.g. a local variable. Subsequent value of location represent options from the outer class, the exact value represent how far they are (in terms of inner classes).
   *
   */
  static LOCATION_LOCAL: any

  /**
   * The option is from the containing class or a parent class, relative to the location of the code completion query. Perform a bitwise OR with the class depth (e.g. `0` for the local class, `1` for the parent, `2` for the grandparent, etc.) to store the depth of an option in the class or a parent class.
   *
   */
  static LOCATION_PARENT_MASK: any

  /**
   * The option is from user code which is not local and not in a derived class (e.g. Autoload Singletons).
   *
   */
  static LOCATION_OTHER_USER_CODE: any

  /**
   * The option is from other engine code, not covered by the other enum constants - e.g. built-in classes.
   *
   */
  static LOCATION_OTHER: any

  /**
   * Emitted when a breakpoint is added or removed from a line. If the line is removed via backspace, a signal is emitted at the old line.
   *
   */
  $breakpoint_toggled: Signal<() => void>

  /**
   * Emitted when the user requests code completion. This signal will not be sent if [method _request_code_completion] is overridden or [member code_completion_enabled] is `false`.
   *
   */
  $code_completion_requested: Signal<() => void>

  /**
   * Emitted when the user hovers over a symbol. Unlike [signal Control.mouse_entered], this signal is not emitted immediately, but when the cursor is over the symbol for [member ProjectSettings.gui/timers/tooltip_delay_sec] seconds.
   *
   * **Note:** [member symbol_tooltip_on_hover] must be `true` for this signal to be emitted.
   *
   */
  $symbol_hovered: Signal<() => void>

  /**
   * Emitted when the user has clicked on a valid symbol.
   *
   */
  $symbol_lookup: Signal<() => void>

  /**
   * Emitted when the user hovers over a symbol. The symbol should be validated and responded to, by calling [method set_symbol_lookup_word_as_valid].
   *
   * **Note:** [member symbol_lookup_on_click] must be `true` for this signal to be emitted.
   *
   */
  $symbol_validate: Signal<() => void>
}
