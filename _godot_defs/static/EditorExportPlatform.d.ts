/**
 * Base resource that provides the functionality of exporting a release build of a project to a platform, from the editor. Stores platform-specific metadata such as the name and supported features of the platform, and performs the exporting of projects, PCK files, and ZIP files. Uses an export template for the platform provided at the time of project exporting.
 *
 * Used in scripting by [EditorExportPlugin] to configure platform-specific customization of scenes and resources. See [method EditorExportPlugin._begin_customize_scenes] and [method EditorExportPlugin._begin_customize_resources] for more details.
 *
 */
declare class EditorExportPlatform extends RefCounted {
  /**
   * Base resource that provides the functionality of exporting a release build of a project to a platform, from the editor. Stores platform-specific metadata such as the name and supported features of the platform, and performs the exporting of projects, PCK files, and ZIP files. Uses an export template for the platform provided at the time of project exporting.
   *
   * Used in scripting by [EditorExportPlugin] to configure platform-specific customization of scenes and resources. See [method EditorExportPlugin._begin_customize_scenes] and [method EditorExportPlugin._begin_customize_resources] for more details.
   *
   */
  new(): EditorExportPlatform
  constructor()
  static new(): EditorExportPlatform

  /** Adds a message to the export log that will be displayed when exporting ends. */
  add_message(type: int, category: string, message: string): void

  /** Clears the export log. */
  clear_messages(): void

  /** Create a new preset for this platform. */
  create_preset(): EditorExportPreset

  /** Creates a PCK archive at [param path] for the specified [param preset]. */
  export_pack(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    flags?: int
  ): int

  /**
   * Creates a patch PCK archive at [param path] for the specified [param preset], containing only the files that have changed since the last patch.
   *
   * **Note:** [param patches] is an optional override of the set of patches defined in the export preset. When empty the patches defined in the export preset will be used instead.
   *
   */
  export_pack_patch(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    patches?: PackedStringArray,
    flags?: int
  ): int

  /** Creates a full project at [param path] for the specified [param preset]. */
  export_project(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    flags?: int
  ): int

  /**
   * Exports project files for the specified preset. This method can be used to implement custom export format, other than PCK and ZIP. One of the callbacks is called for each exported file.
   *
   * [param save_cb] is called for all exported files and have the following arguments: `file_path: String`, `file_data: PackedByteArray`, `file_index: int`, `file_count: int`, `encryption_include_filters: PackedStringArray`, `encryption_exclude_filters: PackedStringArray`, `encryption_key: PackedByteArray`.
   *
   * [param shared_cb] is called for exported native shared/static libraries and have the following arguments: `file_path: String`, `tags: PackedStringArray`, `target_folder: String`.
   *
   * **Note:** `file_index` and `file_count` are intended for progress tracking only and aren't necessarily unique and precise.
   *
   */
  export_project_files(
    preset: EditorExportPreset,
    debug: boolean,
    save_cb: Callable,
    shared_cb?: Callable
  ): int

  /** Create a ZIP archive at [param path] for the specified [param preset]. */
  export_zip(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    flags?: int
  ): int

  /**
   * Create a patch ZIP archive at [param path] for the specified [param preset], containing only the files that have changed since the last patch.
   *
   * **Note:** [param patches] is an optional override of the set of patches defined in the export preset. When empty the patches defined in the export preset will be used instead.
   *
   */
  export_zip_patch(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    patches?: PackedStringArray,
    flags?: int
  ): int

  /** Locates export template for the platform, and returns [Dictionary] with the following keys: [code]path: String[/code] and [code]error: String[/code]. This method is provided for convenience and custom export platforms aren't required to use it or keep export templates stored in the same way official templates are. */
  find_export_template(template_file_name: string): Dictionary<any, any>

  /** Generates array of command line arguments for the default export templates for the debug flags and editor settings. */
  gen_export_flags(flags: int): PackedStringArray

  /** Returns array of [EditorExportPreset]s for this platform. */
  get_current_presets(): any[]

  /** Returns array of core file names that always should be exported regardless of preset config. */
  static get_forced_export_files(preset?: EditorExportPreset): PackedStringArray

  /** Returns additional files that should always be exported regardless of preset configuration, and are not part of the project source. The returned [Dictionary] contains filename keys ([String]) and their corresponding raw data ([PackedByteArray]). */
  get_internal_export_files(
    preset: EditorExportPreset,
    debug: boolean
  ): Dictionary<any, any>

  /** Returns the message category for the message with the given [param index]. */
  get_message_category(index: int): string

  /** Returns the number of messages in the export log. */
  get_message_count(): int

  /** Returns the text for the message with the given [param index]. */
  get_message_text(index: int): string

  /** Returns the type for the message with the given [param index]. */
  get_message_type(index: int): int

  /** Returns the name of the export operating system handled by this [EditorExportPlatform] class, as a friendly string. Possible return values are [code]Windows[/code], [code]Linux[/code], [code]macOS[/code], [code]Android[/code], [code]iOS[/code], and [code]Web[/code]. */
  get_os_name(): string

  /** Returns most severe message type currently present in the export log. */
  get_worst_message_type(): int

  /**
   * Saves PCK archive and returns [Dictionary] with the following keys: `result: Error`, `so_files: Array` (array of the shared/static objects which contains dictionaries with the following keys: `path: String`, `tags: PackedStringArray`, and `target_folder: String`).
   *
   * If [param embed] is `true`, PCK content is appended to the end of [param path] file and return [Dictionary] additionally include following keys: `embedded_start: int` (embedded PCK offset) and `embedded_size: int` (embedded PCK size).
   *
   */
  save_pack(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    embed?: boolean
  ): Dictionary<any, any>

  /** Saves patch PCK archive and returns [Dictionary] with the following keys: [code]result: Error[/code], [code]so_files: Array[/code] (array of the shared/static objects which contains dictionaries with the following keys: [code]path: String[/code], [code]tags: PackedStringArray[/code], and [code]target_folder: String[/code]). */
  save_pack_patch(
    preset: EditorExportPreset,
    debug: boolean,
    path: string
  ): Dictionary<any, any>

  /** Saves ZIP archive and returns [Dictionary] with the following keys: [code]result: Error[/code], [code]so_files: Array[/code] (array of the shared/static objects which contains dictionaries with the following keys: [code]path: String[/code], [code]tags: PackedStringArray[/code], and [code]target_folder: String[/code]). */
  save_zip(
    preset: EditorExportPreset,
    debug: boolean,
    path: string
  ): Dictionary<any, any>

  /** Saves patch ZIP archive and returns [Dictionary] with the following keys: [code]result: Error[/code], [code]so_files: Array[/code] (array of the shared/static objects which contains dictionaries with the following keys: [code]path: String[/code], [code]tags: PackedStringArray[/code], and [code]target_folder: String[/code]). */
  save_zip_patch(
    preset: EditorExportPreset,
    debug: boolean,
    path: string
  ): Dictionary<any, any>

  /** Uploads specified file over SCP protocol to the remote host. */
  ssh_push_to_remote(
    host: string,
    port: string,
    scp_args: PackedStringArray,
    src_file: string,
    dst_file: string
  ): int

  /** Executes specified command on the remote host via SSH protocol and returns command output in the [param output]. */
  ssh_run_on_remote(
    host: string,
    port: string,
    ssh_arg: PackedStringArray,
    cmd_args: string,
    output?: any[],
    port_fwd?: int
  ): int

  /** Executes specified command on the remote host via SSH protocol and returns process ID (on the remote host) without waiting for command to finish. */
  ssh_run_on_remote_no_wait(
    host: string,
    port: string,
    ssh_args: PackedStringArray,
    cmd_args: string,
    port_fwd?: int
  ): int

  connect<T extends SignalsOf<EditorExportPlatform>>(
    signal: T,
    method: SignalFunction<EditorExportPlatform[T]>
  ): number

  /**
   * Invalid message type used as the default value when no type is specified.
   *
   */
  static EXPORT_MESSAGE_NONE: any

  /**
   * Message type for informational messages that have no effect on the export.
   *
   */
  static EXPORT_MESSAGE_INFO: any

  /**
   * Message type for warning messages that should be addressed but still allow to complete the export.
   *
   */
  static EXPORT_MESSAGE_WARNING: any

  /**
   * Message type for error messages that must be addressed and fail the export.
   *
   */
  static EXPORT_MESSAGE_ERROR: any

  /**
   * Flag is set if the remotely debugged project is expected to use the remote file system. If set, [method gen_export_flags] will append `--remote-fs` and `--remote-fs-password` (if [member EditorSettings.filesystem/file_server/password] is defined) command line arguments to the returned list.
   *
   */
  static DEBUG_FLAG_DUMB_CLIENT: any

  /**
   * Flag is set if remote debug is enabled. If set, [method gen_export_flags] will append `--remote-debug` and `--breakpoints` (if breakpoints are selected in the script editor or added by the plugin) command line arguments to the returned list.
   *
   */
  static DEBUG_FLAG_REMOTE_DEBUG: any

  /**
   * Flag is set if remotely debugged project is running on the localhost. If set, [method gen_export_flags] will use `localhost` instead of [member EditorSettings.network/debug/remote_host] as remote debugger host.
   *
   */
  static DEBUG_FLAG_REMOTE_DEBUG_LOCALHOST: any

  /**
   * Flag is set if the "Visible Collision Shapes" remote debug option is enabled. If set, [method gen_export_flags] will append the `--debug-collisions` command line argument to the returned list.
   *
   */
  static DEBUG_FLAG_VIEW_COLLISIONS: any

  /**
   * Flag is set if the "Visible Navigation" remote debug option is enabled. If set, [method gen_export_flags] will append the `--debug-navigation` command line argument to the returned list.
   *
   */
  static DEBUG_FLAG_VIEW_NAVIGATION: any
}
