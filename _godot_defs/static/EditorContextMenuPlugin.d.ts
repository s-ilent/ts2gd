/**
 * [EditorContextMenuPlugin] allows for the addition of custom options in the editor's context menu.
 *
 * Currently, context menus are supported for three commonly used areas: the file system, scene tree, and editor script list panel.
 *
 */
declare class EditorContextMenuPlugin extends RefCounted {
  /**
   * [EditorContextMenuPlugin] allows for the addition of custom options in the editor's context menu.
   *
   * Currently, context menus are supported for three commonly used areas: the file system, scene tree, and editor script list panel.
   *
   */
  new(): EditorContextMenuPlugin
  constructor()
  static new(): EditorContextMenuPlugin

  /** Called when creating a context menu, custom options can be added by using the [method add_context_menu_item] or [method add_context_menu_item_from_shortcut] functions. [param paths] contains currently selected paths (depending on menu), which can be used to conditionally add options. */
  protected _popup_menu(paths: PackedStringArray): void

  /**
   * Add custom option to the context menu of the plugin's specified slot. When the option is activated, [param callback] will be called. Callback should take single [Array] argument; array contents depend on context menu slot.
   *
   * @example
   *
   * func _popup_menu(paths):
   * 	add_context_menu_item("File Custom options", handle, ICON)
   * @summary
   *
   *
   * If you want to assign shortcut to the menu item, use [method add_context_menu_item_from_shortcut] instead.
   *
   */
  add_context_menu_item(
    name: string,
    callback: Callable,
    icon?: Texture2D
  ): void

  /**
   * Add custom option to the context menu of the plugin's specified slot. The option will have the [param shortcut] assigned and reuse its callback. The shortcut has to be registered beforehand with [method add_menu_shortcut].
   *
   * @example
   *
   * func _init():
   * 	add_menu_shortcut(SHORTCUT, handle)
   * func _popup_menu(paths):
   * 	add_context_menu_item_from_shortcut("File Custom options", SHORTCUT, ICON)
   * @summary
   *
   *
   */
  add_context_menu_item_from_shortcut(
    name: string,
    shortcut: Shortcut,
    icon?: Texture2D
  ): void

  /**
   * Add a submenu to the context menu of the plugin's specified slot. The submenu is not automatically handled, you need to connect to its signals yourself. Also the submenu is freed on every popup, so provide a new [PopupMenu] every time.
   *
   * @example
   *
   * func _popup_menu(paths):
   * 	var popup_menu = PopupMenu.new()
   * 	popup_menu.add_item("Blue")
   * 	popup_menu.add_item("White")
   * 	popup_menu.id_pressed.connect(_on_color_submenu_option)
   * 	add_context_submenu_item("Set Node Color", popup_menu)
   * @summary
   *
   *
   */
  add_context_submenu_item(
    name: string,
    menu: PopupMenu,
    icon?: Texture2D
  ): void

  /**
   * Registers a shortcut associated with the plugin's context menu. This method should be called once (e.g. in plugin's [method Object._init]). [param callback] will be called when user presses the specified [param shortcut] while the menu's context is in effect (e.g. FileSystem dock is focused). Callback should take single [Array] argument; array contents depend on context menu slot.
   *
   * @example
   *
   * func _init():
   * 	add_menu_shortcut(SHORTCUT, handle)
   * @summary
   *
   *
   */
  add_menu_shortcut(shortcut: Shortcut, callback: Callable): void

  connect<T extends SignalsOf<EditorContextMenuPlugin>>(
    signal: T,
    method: SignalFunction<EditorContextMenuPlugin[T]>
  ): number

  /**
   * Context menu of Scene dock. [method _popup_menu] will be called with a list of paths to currently selected nodes, while option callback will receive the list of currently selected nodes.
   *
   */
  static CONTEXT_SLOT_SCENE_TREE: any

  /**
   * Context menu of FileSystem dock. [method _popup_menu] and option callback will be called with list of paths of the currently selected files.
   *
   */
  static CONTEXT_SLOT_FILESYSTEM: any

  /**
   * Context menu of Script editor's script tabs. [method _popup_menu] will be called with the path to the currently edited script, while option callback will receive reference to that script.
   *
   */
  static CONTEXT_SLOT_SCRIPT_EDITOR: any

  /**
   * The "Create..." submenu of FileSystem dock's context menu, or the "New" section of the main context menu when empty space is clicked. [method _popup_menu] and option callback will be called with the path of the currently selected folder. When clicking the empty space, the list of paths for popup method will be empty.
   *
   * @example
   *
   * func _popup_menu(paths):
   *     if paths.is_empty():
   *         add_context_menu_item("New Image File...", create_image)
   *     else:
   *         add_context_menu_item("Image File...", create_image)
   * @summary
   *
   *
   */
  static CONTEXT_SLOT_FILESYSTEM_CREATE: any

  /**
   * Context menu of Script editor's code editor. [method _popup_menu] will be called with the path to the [CodeEdit] node. You can fetch it using this code:
   *
   * @example
   *
   * func _popup_menu(paths):
   * 	var code_edit = Engine.get_main_loop().root.get_node(paths[0]);
   * @summary
   *
   *
   * The option callback will receive reference to that node. You can use [CodeEdit] methods to perform symbol lookups etc.
   *
   */
  static CONTEXT_SLOT_SCRIPT_EDITOR_CODE: any

  /**
   * Context menu of scene tabs. [method _popup_menu] will be called with the path of the clicked scene, or empty [PackedStringArray] if the menu was opened on empty space. The option callback will receive the path of the clicked scene, or empty [String] if none was clicked.
   *
   */
  static CONTEXT_SLOT_SCENE_TABS: any

  /**
   * Context menu of 2D editor's basic right-click menu. [method _popup_menu] will be called with paths to all [CanvasItem] nodes under the cursor. You can fetch them using this code:
   *
   * @example
   *
   * func _popup_menu(paths):
   * 	var canvas_item = Engine.get_main_loop().root.get_node(paths[0]); # Replace 0 with the desired index.
   * @summary
   *
   *
   * The paths array is empty if there weren't any nodes under cursor. The option callback will receive a typed array of [CanvasItem] nodes.
   *
   */
  static CONTEXT_SLOT_2D_EDITOR: any
}
