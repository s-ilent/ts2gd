/**
 * [FileDialog] is a preset dialog used to choose files and directories in the filesystem. It supports filter masks. [FileDialog] automatically sets its window title according to the [member file_mode]. If you want to use a custom title, disable this by setting [member mode_overrides_title] to `false`.
 *
 * **Note:** [FileDialog] is invisible by default. To make it visible, call one of the `popup_*` methods from [Window] on the node, such as [method Window.popup_centered_clamped].
 *
 */
declare class FileDialog extends ConfirmationDialog {
  /**
   * [FileDialog] is a preset dialog used to choose files and directories in the filesystem. It supports filter masks. [FileDialog] automatically sets its window title according to the [member file_mode]. If you want to use a custom title, disable this by setting [member mode_overrides_title] to `false`.
   *
   * **Note:** [FileDialog] is invisible by default. To make it visible, call one of the `popup_*` methods from [Window] on the node, such as [method Window.popup_centered_clamped].
   *
   */
  new(): FileDialog
  constructor()
  static new(): FileDialog

  /**
   * The file system access scope.
   *
   * **Warning:** In Web builds, FileDialog cannot access the host file system. In sandboxed Linux and macOS environments, [member use_native_dialog] is automatically used to allow limited access to host file system.
   *
   */
  access: int

  /**
   * The current working directory of the file dialog.
   *
   * **Note:** For native file dialogs, this property is only treated as a hint and may not be respected by specific OS implementations.
   *
   */
  current_dir: string

  /** The currently selected file of the file dialog. */
  current_file: string

  /** The currently selected file path of the file dialog. */
  current_path: string

  /** If [code]true[/code], the context menu will show the "Delete" option, which allows moving files and folders to trash. */
  deleting_enabled: boolean

  /** Display mode of the dialog's file list. */
  display_mode: int

  /** If [code]true[/code], shows the toggle favorite button and favorite list on the left side of the dialog. */
  favorites_enabled: boolean

  /** If [code]true[/code], shows the toggle file filter button. */
  file_filter_toggle_enabled: boolean

  /** The dialog's open or save mode, which affects the selection behavior. */
  file_mode: int

  /** If [code]true[/code], shows the file sorting options button. */
  file_sort_options_enabled: boolean

  /**
   * The filter for file names (case-insensitive). When set to a non-empty string, only files that contains the substring will be shown. [member filename_filter] can be edited by the user with the filter button at the top of the file dialog.
   *
   * See also [member filters], which should be used to restrict the file types that can be selected instead of [member filename_filter] which is meant to be set by the user.
   *
   */
  filename_filter: string

  /**
   * The available file type filters. Each filter string in the array should be formatted like this: `*.png,*.jpg,*.jpeg;Image Files;image/png,image/jpeg`. The description text of the filter is optional and can be omitted. Both file extensions and MIME type should be always set.
   *
   * **Note:** Embedded file dialogs and Windows file dialogs support only file extensions, while Android, Linux, and macOS file dialogs also support MIME types.
   *
   */
  filters: PackedStringArray

  /** If [code]true[/code], shows the button for creating new directories (when using [constant FILE_MODE_OPEN_DIR], [constant FILE_MODE_OPEN_ANY], or [constant FILE_MODE_SAVE_FILE]), and the context menu will have the "New Folder..." option. */
  folder_creation_enabled: boolean

  /** If [code]true[/code], shows the toggle hidden files button. */
  hidden_files_toggle_enabled: boolean

  /** If [code]true[/code], shows the layout switch buttons (list/thumbnails). */
  layout_toggle_enabled: boolean

  /** If [code]true[/code], changing the [member file_mode] property will set the window title accordingly (e.g. setting [member file_mode] to [constant FILE_MODE_OPEN_FILE] will change the window title to "Open a File"). */
  mode_overrides_title: boolean

  /** The number of additional [OptionButton]s and [CheckBox]es in the dialog. */
  option_count: int

  /** If [code]true[/code], the [FileDialog] will warn the user before overwriting files in save mode. */
  overwrite_warning_enabled: boolean

  /** If [code]true[/code], shows the recent directories list on the left side of the dialog. */
  recent_list_enabled: boolean

  /**
   * If non-empty, the given sub-folder will be "root" of this [FileDialog], i.e. user won't be able to go to its parent directory.
   *
   * **Note:** This property is ignored by native file dialogs.
   *
   */
  root_subfolder: string

  /**
   * If `true`, the dialog will show hidden files.
   *
   * **Note:** This property is ignored by native file dialogs on Android and Linux.
   *
   */
  show_hidden_files: boolean

  /**
   * If `true`, and if supported by the current [DisplayServer], OS native dialog will be used instead of custom one.
   *
   * **Note:** On Android, it is only supported for Android 10+ devices and when using [constant ACCESS_FILESYSTEM]. For access mode [constant ACCESS_RESOURCES] and [constant ACCESS_USERDATA], the system will fall back to custom FileDialog.
   *
   * **Note:** On Linux and macOS, sandboxed apps always use native dialogs to access the host file system.
   *
   * **Note:** On macOS, sandboxed apps will save security-scoped bookmarks to retain access to the opened folders across multiple sessions. Use [method OS.get_granted_permissions] to get a list of saved bookmarks.
   *
   * **Note:** Native dialogs are isolated from the base process, file dialog properties can't be modified once the dialog is shown.
   *
   * **Note:** This property is ignored in [EditorFileDialog].
   *
   */
  use_native_dialog: boolean

  /**
   * Adds a comma-separated file extension [param filter] and comma-separated MIME type [param mime_type] option to the [FileDialog] with an optional [param description], which restricts what files can be picked.
   *
   * A [param filter] should be of the form `"filename.extension"`, where filename and extension can be `*` to match any string. Filters starting with `.` (i.e. empty filenames) are not allowed.
   *
   * For example, a [param filter] of `"*.png, *.jpg"`, a [param mime_type] of `image/png, image/jpeg`, and a [param description] of `"Images"` results in filter text "Images (*.png, *.jpg)".
   *
   * **Note:** Embedded file dialogs and Windows file dialogs support only file extensions, while Android, Linux, and macOS file dialogs also support MIME types.
   *
   */
  add_filter(filter: string, description?: string, mime_type?: string): void

  /**
   * Adds an additional [OptionButton] to the file dialog. If [param values] is empty, a [CheckBox] is added instead.
   *
   * [param default_value_index] should be an index of the value in the [param values]. If [param values] is empty it should be either `1` (checked), or `0` (unchecked).
   *
   */
  add_option(
    name: string,
    values: PackedStringArray,
    default_value_index: int
  ): void

  /** Clear the filter for file names. */
  clear_filename_filter(): void

  /** Clear all the added filters in the dialog. */
  clear_filters(): void

  /** Clear all currently selected items in the dialog. */
  deselect_all(): void

  /** Returns the list of favorite directories, which is shared by all [FileDialog] nodes. Useful to store the list of favorites between project sessions. This method can be called only from the main thread. */
  static get_favorite_list(): PackedStringArray

  /**
   * Returns the LineEdit for the selected file.
   *
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
   *
   */
  get_line_edit(): LineEdit

  /** Returns the default value index of the [OptionButton] or [CheckBox] with index [param option]. */
  get_option_default(option: int): int

  /** Returns the name of the [OptionButton] or [CheckBox] with index [param option]. */
  get_option_name(option: int): string

  /** Returns an array of values of the [OptionButton] with index [param option]. */
  get_option_values(option: int): PackedStringArray

  /** Returns the list of recent directories, which is shared by all [FileDialog] nodes. Useful to store the list of recents between project sessions. This method can be called only from the main thread. */
  static get_recent_list(): PackedStringArray

  /** Returns a [Dictionary] with the selected values of the additional [OptionButton]s and/or [CheckBox]es. [Dictionary] keys are names and values are selected value indices. */
  get_selected_options(): Dictionary<any, any>

  /**
   * Returns the vertical box container of the dialog, custom controls can be added to it.
   *
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their [member CanvasItem.visible] property.
   *
   * **Note:** Changes to this node are ignored by native file dialogs, use [method add_option] to add custom elements to the dialog instead.
   *
   */
  get_vbox(): VBoxContainer

  /**
   * Invalidates and updates this dialog's content list.
   *
   * **Note:** This method does nothing on native file dialogs.
   *
   */
  invalidate(): void

  /** Returns [code]true[/code] if the provided [param flag] is enabled. */
  is_customization_flag_enabled(flag: int): boolean

  /** Shows the [FileDialog] using the default size and position for file dialogs, and selects the file name if there is a current file. */
  popup_file_dialog(): void

  /** Sets the specified customization [param flag], allowing to customize the features available in this [FileDialog]. */
  set_customization_flag_enabled(flag: int, enabled: boolean): void

  /**
   * Sets the list of favorite directories, which is shared by all [FileDialog] nodes. Useful to restore the list of favorites saved with [method get_favorite_list]. This method can be called only from the main thread.
   *
   * **Note:** [FileDialog] will update its internal [ItemList] of favorites when its visibility changes. Be sure to call this method earlier if you want your changes to have effect.
   *
   */
  static set_favorite_list(favorites: PackedStringArray): void

  /** Sets the callback used by the [FileDialog] nodes to get a file icon, when [constant DISPLAY_LIST] mode is used. The callback should take a single [String] argument (file path), and return a [Texture2D]. If an invalid texture is returned, the [theme_item file] icon will be used instead. */
  static set_get_icon_callback(callback: Callable): void

  /**
   * Sets the callback used by the [FileDialog] nodes to get a file icon, when [constant DISPLAY_THUMBNAILS] mode is used. The callback should take a single [String] argument (file path), and return a [Texture2D]. If an invalid texture is returned, the [theme_item file_thumbnail] icon will be used instead.
   *
   * Thumbnails are usually more complex and may take a while to load. To avoid stalling the application, you can use [ImageTexture] to asynchronously create the thumbnail.
   *
   * @example
   *
   * func _ready():
   * 	FileDialog.set_get_thumbnail_callback(thumbnail_method)
   * func thumbnail_method(path):
   * 	var image_texture = ImageTexture.new()
   * 	make_thumbnail_async(path, image_texture)
   * 	return image_texture
   * func make_thumbnail_async(path, image_texture):
   * 	var thumbnail_texture = await generate_thumbnail(path) # Some method that generates a thumbnail.
   * 	image_texture.set_image(thumbnail_texture.get_image())
   * @summary
   *
   *
   */
  static set_get_thumbnail_callback(callback: Callable): void

  /** Sets the default value index of the [OptionButton] or [CheckBox] with index [param option]. */
  set_option_default(option: int, default_value_index: int): void

  /** Sets the name of the [OptionButton] or [CheckBox] with index [param option]. */
  set_option_name(option: int, name: string): void

  /** Sets the option values of the [OptionButton] with index [param option]. */
  set_option_values(option: int, values: PackedStringArray): void

  /**
   * Sets the list of recent directories, which is shared by all [FileDialog] nodes. Useful to restore the list of recents saved with [method set_recent_list]. This method can be called only from the main thread.
   *
   * **Note:** [FileDialog] will update its internal [ItemList] of recent directories when its visibility changes. Be sure to call this method earlier if you want your changes to have effect.
   *
   */
  static set_recent_list(recents: PackedStringArray): void

  connect<T extends SignalsOf<FileDialog>>(
    signal: T,
    method: SignalFunction<FileDialog[T]>
  ): number

  /**
   * The dialog allows selecting one, and only one file.
   *
   */
  static FILE_MODE_OPEN_FILE: any

  /**
   * The dialog allows selecting multiple files.
   *
   */
  static FILE_MODE_OPEN_FILES: any

  /**
   * The dialog only allows selecting a directory, disallowing the selection of any file.
   *
   */
  static FILE_MODE_OPEN_DIR: any

  /**
   * The dialog allows selecting one file or directory.
   *
   */
  static FILE_MODE_OPEN_ANY: any

  /**
   * The dialog will warn when a file exists.
   *
   */
  static FILE_MODE_SAVE_FILE: any

  /**
   * The dialog only allows accessing files under the [Resource] path (`res://`).
   *
   */
  static ACCESS_RESOURCES: any

  /**
   * The dialog only allows accessing files under user data path (`user://`).
   *
   */
  static ACCESS_USERDATA: any

  /**
   * The dialog allows accessing files on the whole file system.
   *
   */
  static ACCESS_FILESYSTEM: any

  /**
   * The dialog displays files as a grid of thumbnails. Use [theme_item thumbnail_size] to adjust their size.
   *
   */
  static DISPLAY_THUMBNAILS: any

  /**
   * The dialog displays files as a list of filenames.
   *
   */
  static DISPLAY_LIST: any

  /**
   * Toggles visibility of the favorite button, and the favorite list on the left side of the dialog.
   *
   * Equivalent to [member hidden_files_toggle_enabled].
   *
   */
  static CUSTOMIZATION_HIDDEN_FILES: any

  /**
   * If enabled, shows the button for creating new directories (when using [constant FILE_MODE_OPEN_DIR], [constant FILE_MODE_OPEN_ANY], or [constant FILE_MODE_SAVE_FILE]).
   *
   * Equivalent to [member folder_creation_enabled].
   *
   */
  static CUSTOMIZATION_CREATE_FOLDER: any

  /**
   * If enabled, shows the toggle file filter button.
   *
   * Equivalent to [member file_filter_toggle_enabled].
   *
   */
  static CUSTOMIZATION_FILE_FILTER: any

  /**
   * If enabled, shows the file sorting options button.
   *
   * Equivalent to [member file_sort_options_enabled].
   *
   */
  static CUSTOMIZATION_FILE_SORT: any

  /**
   * If enabled, shows the toggle favorite button and favorite list on the left side of the dialog.
   *
   * Equivalent to [member favorites_enabled].
   *
   */
  static CUSTOMIZATION_FAVORITES: any

  /**
   * If enabled, shows the recent directories list on the left side of the dialog.
   *
   * Equivalent to [member recent_list_enabled].
   *
   */
  static CUSTOMIZATION_RECENT: any

  /**
   * If enabled, shows the layout switch buttons (list/thumbnails).
   *
   * Equivalent to [member layout_toggle_enabled].
   *
   */
  static CUSTOMIZATION_LAYOUT: any

  /**
   * If enabled, the [FileDialog] will warn the user before overwriting files in save mode.
   *
   * Equivalent to [member overwrite_warning_enabled].
   *
   */
  static CUSTOMIZATION_OVERWRITE_WARNING: any

  /**
   * If enabled, the context menu will show the "Delete" option, which allows moving files and folders to trash.
   *
   * Equivalent to [member deleting_enabled].
   *
   */
  static CUSTOMIZATION_DELETE: any

  /**
   * Emitted when the user selects a directory.
   *
   */
  $dir_selected: Signal<() => void>

  /**
   * Emitted when the user selects a file by double-clicking it or pressing the **OK** button.
   *
   */
  $file_selected: Signal<() => void>

  /**
   * Emitted when the filter for file names changes.
   *
   */
  $filename_filter_changed: Signal<() => void>

  /**
   * Emitted when the user selects multiple files.
   *
   */
  $files_selected: Signal<() => void>
}
