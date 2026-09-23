/**
 * Base editor for editing scripts in the [ScriptEditor]. This does not include documentation items.
 *
 */
declare class ScriptEditorBase extends VBoxContainer {
  /**
   * Base editor for editing scripts in the [ScriptEditor]. This does not include documentation items.
   *
   */
  new(): ScriptEditorBase
  constructor()
  static new(): ScriptEditorBase

  /** Adds an [EditorSyntaxHighlighter] to the open script. */
  add_syntax_highlighter(highlighter: EditorSyntaxHighlighter): void

  /** Returns the underlying [Control] used for editing scripts. For text scripts, this is a [CodeEdit]. */
  get_base_editor(): Control

  connect<T extends SignalsOf<ScriptEditorBase>>(
    signal: T,
    method: SignalFunction<ScriptEditorBase[T]>
  ): number

  /**
   * Emitted after script validation.
   *
   */
  $edited_script_changed: Signal<() => void>

  /**
   * Emitted when the user requests a specific documentation page.
   *
   */
  $go_to_help: Signal<() => void>

  /**
   * Emitted when the user requests to view a specific method of a script, similar to [signal request_open_script_at_line].
   *
   */
  $go_to_method: Signal<() => void>

  /**
   * Emitted after script validation or when the edited resource has changed.
   *
   */
  $name_changed: Signal<() => void>

  /**
   * Emitted when the user request to find and replace text in the file system.
   *
   */
  $replace_in_files_requested: Signal<() => void>

  /**
   * Emitted when the user requests contextual help.
   *
   */
  $request_help: Signal<() => void>

  /**
   * Emitted when the user requests to view a specific line of a script, similar to [signal go_to_method].
   *
   */
  $request_open_script_at_line: Signal<() => void>

  /**
   * Emitted when the user contextual goto and the item is in the same script.
   *
   */
  $request_save_history: Signal<() => void>

  /**
   * Emitted when the user changes current script or moves caret by 10 or more columns within the same script.
   *
   */
  $request_save_previous_state: Signal<() => void>

  /**
   * Emitted when the user request to search text in the file system.
   *
   */
  $search_in_files_requested: Signal<() => void>
}
