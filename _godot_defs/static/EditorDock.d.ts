/**
 * EditorDock is a [Container] node that can be docked in one of the editor's dock slots. Docks are added by plugins to provide space for controls related to an [EditorPlugin]. The editor comes with a few built-in docks, such as the Scene dock, FileSystem dock, etc.
 *
 * You can add a dock by using [method EditorPlugin.add_dock]. The dock can be customized by changing its properties.
 *
 * @example
 *
 * @tool
 * extends EditorPlugin
 * # Dock reference.
 * var dock
 * # Plugin initialization.
 * func _enter_tree():
 * 	dock = EditorDock.new()
 * 	dock.title = "My Dock"
 * 	dock.dock_icon = preload("./dock_icon.png")
 * 	dock.default_slot = EditorPlugin.DOCK_SLOT_RIGHT_UL
 * 	var dock_content = preload("./dock_content.tscn").instantiate()
 * 	dock.add_child(dock_content)
 * 	add_dock(dock)
 * # Plugin clean-up.
 * func _exit_tree():
 * 	remove_dock(dock)
 * 	dock.queue_free()
 * 	dock = null
 * @summary
 *
 *
 */
declare class EditorDock extends MarginContainer {
  /**
   * EditorDock is a [Container] node that can be docked in one of the editor's dock slots. Docks are added by plugins to provide space for controls related to an [EditorPlugin]. The editor comes with a few built-in docks, such as the Scene dock, FileSystem dock, etc.
   *
   * You can add a dock by using [method EditorPlugin.add_dock]. The dock can be customized by changing its properties.
   *
   * @example
   *
   * @tool
   * extends EditorPlugin
   * # Dock reference.
   * var dock
   * # Plugin initialization.
   * func _enter_tree():
   * 	dock = EditorDock.new()
   * 	dock.title = "My Dock"
   * 	dock.dock_icon = preload("./dock_icon.png")
   * 	dock.default_slot = EditorPlugin.DOCK_SLOT_RIGHT_UL
   * 	var dock_content = preload("./dock_content.tscn").instantiate()
   * 	dock.add_child(dock_content)
   * 	add_dock(dock)
   * # Plugin clean-up.
   * func _exit_tree():
   * 	remove_dock(dock)
   * 	dock.queue_free()
   * 	dock = null
   * @summary
   *
   *
   */
  new(): EditorDock
  constructor()
  static new(): EditorDock

  /** The available layouts for this dock, as a bitmask. By default, the dock allows vertical and floating layouts. */
  available_layouts: int

  /** If [code]true[/code], the dock can be closed with the Close button in the context popup. Docks with [member global] enabled are always closable. */
  closable: boolean

  /**
   * The default dock slot used when adding the dock with [method EditorPlugin.add_dock].
   *
   * After the dock is added, it can be moved to a different slot and the editor will automatically remember its position between sessions. If you remove and re-add the dock, it will be reset to default.
   *
   */
  default_slot: int

  /** The icon for the dock, as a texture. If specified, it will override [member icon_name]. */
  dock_icon: Texture2D

  /** The shortcut used to open the dock. */
  dock_shortcut: Shortcut

  /** If [code]true[/code], the dock will always display an icon, regardless of [member EditorSettings.interface/editor/dock_tab_style] or [member EditorSettings.interface/editor/bottom_dock_tab_style]. */
  force_show_icon: boolean

  /** If [code]true[/code], the dock appears in the [b]Editor > Editor Docks[/b] menu and can be closed. Non-global docks can still be closed using [method close] or when [member closable] is [code]true[/code]. */
  global: boolean

  /** The icon for the dock, as a name from the [code]EditorIcons[/code] theme type in the editor theme. You can find the list of available icons [url=https://godot-editor-icons.github.io/]here[/url]. */
  icon_name: StringName

  /** The key representing this dock in the editor's layout file. If empty, the dock's displayed name will be used instead. */
  layout_key: string

  /** The title of the dock's tab. If empty, the dock's [member Node.name] will be used. If the name is auto-generated (contains [code]@[/code]), the first child's name will be used instead. */
  title: string

  /** The color of the dock tab's title. If its alpha is [code]0.0[/code], the default font color will be used. */
  title_color: Color

  /** If [code]true[/code], the dock is not automatically opened or closed when loading an editor layout, only moved. It also can't be opened using a shortcut. This is meant for docks that are opened and closed in specific cases, such as when selecting a [TileMap] or [AnimationTree] node. */
  transient: boolean

  /** Implement this method to handle loading this dock's layout. It's equivalent to [method EditorPlugin._set_window_layout]. [param section] is a unique section based on [member layout_key]. */
  protected _load_layout_from_config(config: ConfigFile, section: string): void

  /** Implement this method to handle saving this dock's layout. It's equivalent to [method EditorPlugin._get_window_layout]. [param section] is a unique section based on [member layout_key]. */
  protected _save_layout_to_config(config: ConfigFile, section: string): void

  /**
   * Implement this method to handle the layout switching for this dock. [param layout] is one of the [enum DockLayout] constants.
   *
   * @example
   *
   * func _update_layout(layout):
   * 	box_container.vertical = (layout == DOCK_LAYOUT_VERTICAL)
   * @summary
   *
   *
   */
  protected _update_layout(layout: int): void

  /** Closes the dock, making its tab hidden. */
  close(): void

  /** Focuses the dock's tab (or window if it's floating). If the dock was closed, it will be opened. If it's a bottom dock, makes the bottom panel visible. */
  make_visible(): void

  /**
   * Opens the dock. It will appear in the last used dock slot. If the dock has no default slot, it will be opened floating.
   *
   * **Note:** This does not focus the dock. If you want to open and focus the dock, use [method make_visible].
   *
   */
  open(): void

  connect<T extends SignalsOf<EditorDock>>(
    signal: T,
    method: SignalFunction<EditorDock[T]>
  ): number

  /**
   * Allows placing the dock in the vertical dock slots on either side of the editor.
   *
   */
  static DOCK_LAYOUT_VERTICAL: any

  /**
   * Allows placing the dock in the editor's bottom panel.
   *
   */
  static DOCK_LAYOUT_HORIZONTAL: any

  /**
   * Allows making the dock floating (opened as a separate window).
   *
   */
  static DOCK_LAYOUT_FLOATING: any

  /**
   * Allows placing the dock in all available slots.
   *
   */
  static DOCK_LAYOUT_ALL: any

  /**
   * Emitted when the dock is closed with the Close button in the context popup, before it's removed from its parent. See [member closable].
   *
   */
  $closed: Signal<() => void>
}
