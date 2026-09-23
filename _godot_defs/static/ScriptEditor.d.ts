/**
 * Godot editor's script editor.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_script_editor].
 *
 */
declare class ScriptEditor extends PanelContainer {
  /**
   * Godot editor's script editor.
   *
   * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_script_editor].
   *
   */
  new(): ScriptEditor
  constructor()
  static new(): ScriptEditor

  /**
   * Removes the documentation for the given [param script].
   *
   * **Note:** This should be called whenever the script is changed to keep the open documentation state up to date.
   *
   */
  clear_docs_from_script(script: Script): void

  /** Returns array of breakpoints. */
  get_breakpoints(): PackedStringArray

  /** Returns the [ScriptEditorBase] object that the user is currently editing. */
  get_current_editor(): ScriptEditorBase

  /** Returns a [Script] that is currently active in editor. */
  get_current_script(): Script

  /** Returns an array with all [ScriptEditorBase] objects which are currently open in editor. */
  get_open_script_editors(): ScriptEditorBase[]

  /** Returns an array with all [Script] objects which are currently open in editor. */
  get_open_scripts(): Script[]

  /**
   * Opens help for the given topic. The [param topic] is an encoded string that controls which class, method, constant, signal, annotation, property, or theme item should be focused.
   *
   * The supported [param topic] formats include `class_name:class`, `class_method:class:method`, `class_constant:class:constant`, `class_signal:class:signal`, `class_annotation:class:@annotation`, `class_property:class:property`, and `class_theme_item:class:item`, where `class` is the class name, `method` is the method name, `constant` is the constant name, `signal` is the signal name, `annotation` is the annotation name, `property` is the property name, and `item` is the theme item.
   *
   * @example
   *
   * # Shows help for the Node class.
   * class_name:Node
   * # Shows help for the global min function.
   * # Global objects are accessible in the `@GlobalScope` namespace, shown here.
   * class_method:@GlobalScope:min
   * # Shows help for get_viewport in the Node class.
   * class_method:Node:get_viewport
   * # Shows help for the Input constant MOUSE_BUTTON_MIDDLE.
   * class_constant:Input:MOUSE_BUTTON_MIDDLE
   * # Shows help for the BaseButton signal pressed.
   * class_signal:BaseButton:pressed
   * # Shows help for the CanvasItem property visible.
   * class_property:CanvasItem:visible
   * # Shows help for the GDScript annotation export.
   * # Annotations should be prefixed with the `@` symbol in the descriptor, as shown here.
   * class_annotation:@GDScript:@export
   * # Shows help for the GraphNode theme item named panel_selected.
   * class_theme_item:GraphNode:panel_selected
   * @summary
   *
   *
   */
  goto_help(topic: string): void

  /** Goes to the specified line in the current script. */
  goto_line(line_number: int): void

  /** Opens the script create dialog. The script will extend [param base_name]. The file extension can be omitted from [param base_path]. It will be added based on the selected scripting language. */
  open_script_create_dialog(base_name: string, base_path: string): void

  /**
   * Registers the [EditorSyntaxHighlighter] to the editor, the [EditorSyntaxHighlighter] will be available on all open scripts.
   *
   * **Note:** Does not apply to scripts that are already opened.
   *
   */
  register_syntax_highlighter(syntax_highlighter: EditorSyntaxHighlighter): void

  /**
   * Unregisters the [EditorSyntaxHighlighter] from the editor.
   *
   * **Note:** The [EditorSyntaxHighlighter] will still be applied to scripts that are already opened.
   *
   */
  unregister_syntax_highlighter(
    syntax_highlighter: EditorSyntaxHighlighter
  ): void

  /**
   * Updates the documentation for the given [param script].
   *
   * **Note:** This should be called whenever the script is changed to keep the open documentation state up to date.
   *
   */
  update_docs_from_script(script: Script): void

  connect<T extends SignalsOf<ScriptEditor>>(
    signal: T,
    method: SignalFunction<ScriptEditor[T]>
  ): number

  /**
   * Emitted when user changed active script. Argument is a freshly activated [Script].
   *
   */
  $editor_script_changed: Signal<() => void>

  /**
   * Emitted when editor is about to close the active script. Argument is a [Script] that is going to be closed.
   *
   */
  $script_close: Signal<() => void>
}
