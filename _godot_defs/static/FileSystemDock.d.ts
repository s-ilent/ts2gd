/**
 * This class is available only in [EditorPlugin]s and can't be instantiated. You can access it using [method EditorInterface.get_file_system_dock].
 *
 * While [FileSystemDock] doesn't expose any methods for file manipulation, it can listen for various file-related signals.
 *
 */
declare class FileSystemDock extends EditorDock {
  /**
   * This class is available only in [EditorPlugin]s and can't be instantiated. You can access it using [method EditorInterface.get_file_system_dock].
   *
   * While [FileSystemDock] doesn't expose any methods for file manipulation, it can listen for various file-related signals.
   *
   */
  new(): FileSystemDock
  constructor()
  static new(): FileSystemDock

  /** Registers a new [EditorResourceTooltipPlugin]. */
  add_resource_tooltip_plugin(plugin: EditorResourceTooltipPlugin): void

  /** Sets the given [param path] as currently selected, ensuring that the selected file/directory is visible. */
  navigate_to_path(path: string): void

  /** Removes an [EditorResourceTooltipPlugin]. Fails if the plugin wasn't previously added. */
  remove_resource_tooltip_plugin(plugin: EditorResourceTooltipPlugin): void

  connect<T extends SignalsOf<FileSystemDock>>(
    signal: T,
    method: SignalFunction<FileSystemDock[T]>
  ): number

  /**
   * Emitted when the user switches file display mode or split mode.
   *
   */
  $display_mode_changed: Signal<() => void>

  /**
   * Emitted when the given [param file] was removed.
   *
   */
  $file_removed: Signal<() => void>

  /**
   * Emitted when a file is moved from [param old_file] path to [param new_file] path.
   *
   */
  $files_moved: Signal<() => void>

  /**
   * Emitted when folders change color.
   *
   */
  $folder_color_changed: Signal<() => void>

  /**
   * Emitted when a folder is moved from [param old_folder] path to [param new_folder] path.
   *
   */
  $folder_moved: Signal<() => void>

  /**
   * Emitted when the given [param folder] was removed.
   *
   */
  $folder_removed: Signal<() => void>

  /**
   * Emitted when a new scene is created that inherits the scene at [param file] path.
   *
   */
  $inherit: Signal<() => void>

  /**
   * Emitted when the given scenes are being instantiated in the editor.
   *
   */
  $instantiate: Signal<() => void>

  /**
   * Emitted when an external [param resource] had its file removed.
   *
   */
  $resource_removed: Signal<() => void>

  /**
   * Emitted when the selection changes. Use [method EditorInterface.get_selected_paths] in the connected method to get the selected paths.
   *
   */
  $selection_changed: Signal<() => void>
}
