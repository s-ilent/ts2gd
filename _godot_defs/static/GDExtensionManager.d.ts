/**
 * The GDExtensionManager loads, initializes, and keeps track of all available [GDExtension] libraries in the project.
 *
 * **Note:** Do not worry about GDExtension unless you know what you are doing.
 *
 */
declare class GDExtensionManagerClass extends Object {
  /**
   * The GDExtensionManager loads, initializes, and keeps track of all available [GDExtension] libraries in the project.
   *
   * **Note:** Do not worry about GDExtension unless you know what you are doing.
   *
   */
  new(): GDExtensionManagerClass
  constructor()
  static new(): GDExtensionManagerClass

  /** Returns the [GDExtension] at the given file [param path], or [code]null[/code] if it has not been loaded or does not exist. */
  get_extension(path: string): GDExtension

  /** Returns the file paths of all currently loaded extensions. */
  get_loaded_extensions(): PackedStringArray

  /** Returns [code]true[/code] if the extension at the given file [param path] has already been loaded successfully. See also [method get_loaded_extensions]. */
  is_extension_loaded(path: string): boolean

  /** Loads an extension by absolute file path. The [param path] needs to point to a valid [GDExtension]. Returns [constant LOAD_STATUS_OK] if successful. */
  load_extension(path: string): int

  /** Loads the extension already in address space via the given path and initialization function. The [param path] needs to be unique and start with [code]"libgodot://"[/code]. Returns [constant LOAD_STATUS_OK] if successful. */
  load_extension_from_function(path: string, init_func: CPointer): int

  /**
   * Reloads the extension at the given file path. The [param path] needs to point to a valid [GDExtension], otherwise this method may return either [constant LOAD_STATUS_NOT_LOADED] or [constant LOAD_STATUS_FAILED].
   *
   * **Note:** You can only reload extensions in the editor. In release builds, this method always fails and returns [constant LOAD_STATUS_FAILED].
   *
   */
  reload_extension(path: string): int

  /** Unloads an extension by file path. The [param path] needs to point to an already loaded [GDExtension], otherwise this method returns [constant LOAD_STATUS_NOT_LOADED]. */
  unload_extension(path: string): int

  connect<T extends SignalsOf<GDExtensionManagerClass>>(
    signal: T,
    method: SignalFunction<GDExtensionManagerClass[T]>
  ): number

  /**
   * The extension has loaded successfully.
   *
   */
  static LOAD_STATUS_OK: any

  /**
   * The extension has failed to load, possibly because it does not exist or has missing dependencies.
   *
   */
  static LOAD_STATUS_FAILED: any

  /**
   * The extension has already been loaded.
   *
   */
  static LOAD_STATUS_ALREADY_LOADED: any

  /**
   * The extension has not been loaded.
   *
   */
  static LOAD_STATUS_NOT_LOADED: any

  /**
   * The extension requires the application to restart to fully load.
   *
   */
  static LOAD_STATUS_NEEDS_RESTART: any

  /**
   * Emitted after the editor has finished loading a new extension.
   *
   * **Note:** This signal is only emitted in editor builds.
   *
   */
  $extension_loaded: Signal<() => void>

  /**
   * Emitted before the editor starts unloading an extension.
   *
   * **Note:** This signal is only emitted in editor builds.
   *
   */
  $extension_unloading: Signal<() => void>

  /**
   * Emitted after the editor has finished reloading one or more extensions.
   *
   */
  $extensions_reloaded: Signal<() => void>
}
