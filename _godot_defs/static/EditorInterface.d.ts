/**
 * [EditorInterface] gives you control over Godot editor's window. It allows customizing the window, saving and (re-)loading scenes, rendering mesh previews, inspecting and editing resources and objects, and provides access to [EditorSettings], [EditorFileSystem], [EditorResourcePreview], [ScriptEditor], the editor viewport, and information about scenes.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton directly by its name.
 *
 * @example
 *
 *
 * var editor_settings = EditorInterface.get_editor_settings()
 *
 *
 * // In C# you can access it via the static Singleton property.
 * EditorSettings settings = EditorInterface.Singleton.GetEditorSettings();
 *
 * @summary
 *
 *
 */
declare class EditorInterfaceClass extends Object {
  /**
   * [EditorInterface] gives you control over Godot editor's window. It allows customizing the window, saving and (re-)loading scenes, rendering mesh previews, inspecting and editing resources and objects, and provides access to [EditorSettings], [EditorFileSystem], [EditorResourcePreview], [ScriptEditor], the editor viewport, and information about scenes.
   *
   * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton directly by its name.
   *
   * @example
   *
   *
   * var editor_settings = EditorInterface.get_editor_settings()
   *
   *
   * // In C# you can access it via the static Singleton property.
   * EditorSettings settings = EditorInterface.Singleton.GetEditorSettings();
   *
   * @summary
   *
   *
   */
  new(): EditorInterfaceClass
  constructor()
  static new(): EditorInterfaceClass

  /** If [code]true[/code], enables distraction-free mode which hides side docks to increase the space available for the main view. */
  distraction_free_mode: boolean

  /** If [code]true[/code], the Movie Maker mode is enabled in the editor. See [MovieWriter] for more information. */
  movie_maker_enabled: boolean

  /** Makes [param node] root of the currently opened scene. Only works if the scene is empty. If the [param node] is a scene instance, an inheriting scene will be created. */
  add_root_node(node: Node): void

  /** Closes the currently active scene, discarding any pending changes in the process. Returns [constant OK] on success or [constant ERR_DOES_NOT_EXIST] if there is no scene to close. */
  close_scene(): int

  /** Edits the given [Node]. The node will be also selected if it's inside the scene tree. */
  edit_node(node: Node): void

  /** Edits the given [Resource]. If the resource is a [Script] you can also edit it with [method edit_script] to specify the line and column position. */
  edit_resource(resource: Resource): void

  /** Edits the given [Script]. The line and column on which to open the script can also be specified. The script will be open with the user-configured editor for the script's language which may be an external editor. */
  edit_script(
    script: Script,
    line?: int,
    column?: int,
    grab_focus?: boolean
  ): void

  /**
   * Returns the main container of Godot editor's window. For example, you can use it to retrieve the size of the container and place your controls accordingly.
   *
   * **Warning:** Removing and freeing this node will render the editor useless and may cause a crash.
   *
   */
  get_base_control(): Control

  /**
   * Returns the editor's [EditorCommandPalette] instance.
   *
   * **Warning:** Removing and freeing this node will render a part of the editor useless and may cause a crash.
   *
   */
  get_command_palette(): EditorCommandPalette

  /** Returns the current directory being viewed in the [FileSystemDock]. If a file is selected, its base directory will be returned using [method String.get_base_dir] instead. */
  get_current_directory(): string

  /**
   * Returns the name of the currently activated feature profile. If the default profile is currently active, an empty string is returned instead.
   *
   * In order to get a reference to the [EditorFeatureProfile], you must load the feature profile using [method EditorFeatureProfile.load_from_file].
   *
   * **Note:** Feature profiles created via the user interface are loaded from the `feature_profiles` directory, as a file with the `.profile` extension. The editor configuration folder can be found by using [method EditorPaths.get_config_dir].
   *
   */
  get_current_feature_profile(): string

  /** Returns the current path being viewed in the [FileSystemDock]. */
  get_current_path(): string

  /** Returns the edited (current) scene's root [Node]. */
  get_edited_scene_root(): Node

  /** Returns the language currently used for the editor interface. */
  get_editor_language(): string

  /**
   * Returns the editor control responsible for main screen plugins and tools. Use it with plugins that implement [method EditorPlugin._has_main_screen].
   *
   * **Note:** This node is a [VBoxContainer], which means that if you add a [Control] child to it, you need to set the child's [member Control.size_flags_vertical] to [constant Control.SIZE_EXPAND_FILL] to make it use the full available space.
   *
   * **Warning:** Removing and freeing this node will render a part of the editor useless and may cause a crash.
   *
   */
  get_editor_main_screen(): VBoxContainer

  /** Returns the [EditorPaths] singleton. */
  get_editor_paths(): EditorPaths

  /**
   * Returns the actual scale of the editor UI (`1.0` being 100% scale). This can be used to adjust position and dimensions of the UI added by plugins.
   *
   * **Note:** This value is set via the [member EditorSettings.interface/editor/display_scale] and [member EditorSettings.interface/editor/custom_display_scale] settings. The editor must be restarted for changes to be properly applied.
   *
   */
  get_editor_scale(): float

  /** Returns the editor's [EditorSettings] instance. */
  get_editor_settings(): EditorSettings

  /**
   * Returns the editor's [Theme].
   *
   * **Note:** When creating custom editor UI, prefer accessing theme items directly from your GUI nodes using the `get_theme_*` methods.
   *
   */
  get_editor_theme(): Theme

  /** Returns the editor's [EditorToaster]. */
  get_editor_toaster(): EditorToaster

  /** Returns the editor's [EditorUndoRedoManager]. */
  get_editor_undo_redo(): EditorUndoRedoManager

  /** Returns the 2D editor [SubViewport]. It does not have a camera. Instead, the view transforms are done directly and can be accessed with [member Viewport.global_canvas_transform]. */
  get_editor_viewport_2d(): SubViewport

  /** Returns the specified 3D editor [SubViewport], from [code]0[/code] to [code]3[/code]. The viewport can be used to access the active editor cameras with [method Viewport.get_camera_3d]. */
  get_editor_viewport_3d(idx?: int): SubViewport

  /**
   * Returns the editor's [FileSystemDock] instance.
   *
   * **Warning:** Removing and freeing this node will render a part of the editor useless and may cause a crash.
   *
   */
  get_file_system_dock(): FileSystemDock

  /**
   * Returns the editor's [EditorInspector] instance.
   *
   * **Warning:** Removing and freeing this node will render a part of the editor useless and may cause a crash.
   *
   */
  get_inspector(): EditorInspector

  /** Returns the amount of degrees the 3D editor's rotational snapping is set to. */
  get_node_3d_rotate_snap(): float

  /** Returns the amount of units the 3D editor's scale snapping is set to. */
  get_node_3d_scale_snap(): float

  /** Returns the amount of units the 3D editor's translation snapping is set to. */
  get_node_3d_translate_snap(): float

  /** Returns an array with references to the root nodes of the currently opened scenes. */
  get_open_scene_roots(): Node[]

  /** Returns an array with the file paths of the currently opened scenes. */
  get_open_scenes(): PackedStringArray

  /** Returns the name of the scene that is being played. If no scene is currently being played, returns an empty string. */
  get_playing_scene(): string

  /** Returns the editor's [EditorFileSystem] instance. */
  get_resource_filesystem(): EditorFileSystem

  /** Returns the editor's [EditorResourcePreview] instance. */
  get_resource_previewer(): EditorResourcePreview

  /**
   * Returns the editor's [ScriptEditor] instance.
   *
   * **Warning:** Removing and freeing this node will render a part of the editor useless and may cause a crash.
   *
   */
  get_script_editor(): ScriptEditor

  /** Returns an array containing the paths of the currently selected files (and directories) in the [FileSystemDock]. */
  get_selected_paths(): PackedStringArray

  /** Returns the editor's [EditorSelection] instance. */
  get_selection(): EditorSelection

  /** Shows the given property on the given [param object] in the editor's Inspector dock. If [param inspector_only] is [code]true[/code], plugins will not attempt to edit [param object]. */
  inspect_object(
    object: Object,
    for_property?: string,
    inspector_only?: boolean
  ): void

  /**
   * Returns `true` if multiple window support is enabled in the editor. Multiple window support is enabled if **all** of these statements are true:
   *
   * - [member EditorSettings.interface/multi_window/enable] is `true`.
   *
   * - [member EditorSettings.interface/editor/single_window_mode] is `false`.
   *
   * - [member Viewport.gui_embed_subwindows] is `false`. This is forced to `true` on platforms that don't support multiple windows such as Web, or when the `--single-window` [url=$DOCS_URL/tutorials/editor/command_line_tutorial.html]command line argument[/url] is used.
   *
   */
  is_multi_window_enabled(): boolean

  /** Returns [code]true[/code] if the 3D editor currently has snapping mode enabled, and [code]false[/code] otherwise. */
  is_node_3d_snap_enabled(): boolean

  /** Returns [code]true[/code] if the object has been marked as edited through [method set_object_edited]. */
  is_object_edited(object: Object): boolean

  /** Returns [code]true[/code] if a scene is currently being played, [code]false[/code] otherwise. Paused scenes are considered as being played. */
  is_playing_scene(): boolean

  /** Returns [code]true[/code] if the specified [param plugin] is enabled. The plugin name is the same as its directory name. */
  is_plugin_enabled(plugin: string): boolean

  /** Returns mesh previews rendered at the given size as an [Array] of [Texture2D]s. */
  make_mesh_previews(meshes: Mesh[], preview_size: int): Texture2D[]

  /** Marks the current scene tab as unsaved. */
  mark_scene_as_unsaved(): void

  /** Opens the scene at the given path. If [param set_inherited] is [code]true[/code], creates a new inherited scene. */
  open_scene_from_path(scene_filepath: string, set_inherited?: boolean): void

  /** Plays the currently active scene. */
  play_current_scene(): void

  /** Plays the scene specified by its filepath. */
  play_custom_scene(scene_filepath: string): void

  /** Plays the main scene. */
  play_main_scene(): void

  /**
   * Pops up an editor dialog for creating an object.
   *
   * The [param callback] must take a single argument of type [String], which will contain the type name of the selected object (or the script path of the type, if the type is created from a script), or be an empty string if no item is selected.
   *
   * The [param base_type] specifies the base type of objects to display. For example, if you set this to "Resource", all types derived from [Resource] will display in the create dialog.
   *
   * The [param current_type] will be passed in the search box of the create dialog, and the specified type can be immediately selected when the dialog pops up. If the [param current_type] is not derived from [param base_type], there will be no result of the type in the dialog.
   *
   * The [param dialog_title] allows you to define a custom title for the dialog. This is useful if you want to accurately hint the usage of the dialog. If the [param dialog_title] is an empty string, the dialog will use "Create New 'Base Type'" as the default title.
   *
   * The [param type_blocklist] contains a list of type names, and the types in the blocklist will be hidden from the create dialog.
   *
   * **Note:** Trying to list the base type in the [param type_blocklist] will hide all types derived from the base type from the create dialog.
   *
   */
  popup_create_dialog(
    callback: Callable,
    base_type?: StringName,
    current_type?: string,
    dialog_title?: string,
    type_blocklist?: StringName[]
  ): void

  /**
   * Pops up the [param dialog] in the editor UI with [method Window.popup_exclusive]. The dialog must have no current parent, otherwise the method fails.
   *
   * See also [method Window.set_unparent_when_invisible].
   *
   */
  popup_dialog(dialog: Window, rect?: Rect2i): void

  /**
   * Pops up the [param dialog] in the editor UI with [method Window.popup_exclusive_centered]. The dialog must have no current parent, otherwise the method fails.
   *
   * See also [method Window.set_unparent_when_invisible].
   *
   */
  popup_dialog_centered(dialog: Window, minsize?: Vector2i): void

  /**
   * Pops up the [param dialog] in the editor UI with [method Window.popup_exclusive_centered_clamped]. The dialog must have no current parent, otherwise the method fails.
   *
   * See also [method Window.set_unparent_when_invisible].
   *
   */
  popup_dialog_centered_clamped(
    dialog: Window,
    minsize?: Vector2i,
    fallback_ratio?: float
  ): void

  /**
   * Pops up the [param dialog] in the editor UI with [method Window.popup_exclusive_centered_ratio]. The dialog must have no current parent, otherwise the method fails.
   *
   * See also [method Window.set_unparent_when_invisible].
   *
   */
  popup_dialog_centered_ratio(dialog: Window, ratio?: float): void

  /** Pops up an editor dialog for selecting a method from [param object]. The [param callback] must take a single argument of type [String] which will contain the name of the selected method or be empty if the dialog is canceled. If [param current_value] is provided, the method will be selected automatically in the method list, if it exists. */
  popup_method_selector(
    object: Object,
    callback: Callable,
    current_value?: string
  ): void

  /**
   * Pops up an editor dialog for selecting a [Node] from the edited scene. The [param callback] must take a single argument of type [NodePath]. It is called on the selected [NodePath] or the empty path `^""` if the dialog is canceled. If [param valid_types] is provided, the dialog will only show Nodes that match one of the listed Node types. If [param current_value] is provided, the Node will be automatically selected in the tree, if it exists.
   *
   * **Example:** Display the node selection dialog as soon as this node is added to the tree for the first time:
   *
   * @example
   *
   * func _ready():
   * 	if Engine.is_editor_hint():
   * 		EditorInterface.popup_node_selector(_on_node_selected, ["Button"])
   * func _on_node_selected(node_path):
   * 	if node_path.is_empty():
   * 		print("node selection canceled")
   * 	else:
   * 		print("selected ", node_path)
   * @summary
   *
   *
   */
  popup_node_selector(
    callback: Callable,
    valid_types?: StringName[],
    current_value?: Node
  ): void

  /**
   * Pops up an editor dialog for selecting properties from [param object]. The [param callback] must take a single argument of type [NodePath]. It is called on the selected property path (see [method NodePath.get_as_property_path]) or the empty path `^""` if the dialog is canceled. If [param type_filter] is provided, the dialog will only show properties that match one of the listed [enum Variant.Type] values. If [param current_value] is provided, the property will be selected automatically in the property list, if it exists.
   *
   * @example
   *
   * func _ready():
   * 	if Engine.is_editor_hint():
   * 		EditorInterface.popup_property_selector(this, _on_property_selected, [TYPE_INT])
   * func _on_property_selected(property_path):
   * 	if property_path.is_empty():
   * 		print("property selection canceled")
   * 	else:
   * 		print("selected ", property_path)
   * @summary
   *
   *
   */
  popup_property_selector(
    object: Object,
    callback: Callable,
    type_filter?: PackedInt32Array,
    current_value?: string
  ): void

  /** Pops up an editor dialog for quick selecting a resource file. The [param callback] must take a single argument of type [String] which will contain the path of the selected resource or be empty if the dialog is canceled. If [param base_types] is provided, the dialog will only show resources that match these types. Only types deriving from [Resource] are supported. */
  popup_quick_open(callback: Callable, base_types?: StringName[]): void

  /** Reloads the scene at the given path. */
  reload_scene_from_path(scene_filepath: string): void

  /** Restarts the editor. This closes the editor and then opens the same project. If [param save] is [code]true[/code], the project will be saved before restarting. */
  restart_editor(save?: boolean): void

  /** Saves all opened scenes in the editor. */
  save_all_scenes(): void

  /** Saves the currently active scene. Returns either [constant OK] or [constant ERR_CANT_CREATE]. */
  save_scene(): int

  /** Saves the currently active scene as a file at [param path]. */
  save_scene_as(path: string, with_preview?: boolean): void

  /** Selects the file, with the path provided by [param file], in the FileSystem dock. */
  select_file(file: string): void

  /**
   * Selects and activates the specified feature profile with the given [param profile_name]. Set [param profile_name] to an empty string to reset to the default feature profile.
   *
   * A feature profile can be created programmatically using the [EditorFeatureProfile] class.
   *
   * **Note:** The feature profile that gets activated must be located in the `feature_profiles` directory, as a file with the `.profile` extension. If a profile could not be found, an error occurs. The editor configuration folder can be found by using [method EditorPaths.get_config_dir].
   *
   */
  set_current_feature_profile(profile_name: string): void

  /** Sets the editor's current main screen to the one specified in [param name]. [param name] must match the title of the tab in question exactly (e.g. [code]2D[/code], [code]3D[/code], [code skip-lint]Script[/code], [code]Game[/code], or [code]AssetLib[/code] for default tabs). */
  set_main_screen_editor(name: string): void

  /**
   * If [param edited] is `true`, the object is marked as edited.
   *
   * **Note:** This is primarily used by the editor for [Resource] based objects to track their modified state. For example, any changes to an open scene, a resource in the inspector, or an edited script will cause this method to be called with `true`. Saving the scene, script, or resource resets the edited state by calling this method with `false`.
   *
   * **Note:** Each call to this method increments the object's edited version. This is used to track changes in the editor and to trigger when thumbnails should be regenerated for resources.
   *
   */
  set_object_edited(object: Object, edited: boolean): void

  /** Sets the enabled status of a plugin. The plugin name is the same as its directory name. */
  set_plugin_enabled(plugin: string, enabled: boolean): void

  /** Stops the scene that is currently playing. */
  stop_playing_scene(): void

  connect<T extends SignalsOf<EditorInterfaceClass>>(
    signal: T,
    method: SignalFunction<EditorInterfaceClass[T]>
  ): number
}
