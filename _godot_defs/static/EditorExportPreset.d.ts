/**
 * Represents the configuration of an export preset, as created by the editor's export dialog. An [EditorExportPreset] instance is intended to be used a read-only configuration passed to the [EditorExportPlatform] methods when exporting the project.
 *
 */
declare class EditorExportPreset extends RefCounted {
  /**
   * Represents the configuration of an export preset, as created by the editor's export dialog. An [EditorExportPreset] instance is intended to be used a read-only configuration passed to the [EditorExportPlatform] methods when exporting the project.
   *
   */
  new(): EditorExportPreset
  constructor()
  static new(): EditorExportPreset

  /** Returns [code]true[/code] if the "Advanced" toggle is enabled in the export dialog. */
  are_advanced_options_enabled(): boolean

  /** Returns a comma-separated list of custom features added to this preset, as a string. See [url=$DOCS_URL/tutorials/export/feature_tags.html]Feature tags[/url] in the documentation for more information. */
  get_custom_features(): string

  /** Returns a dictionary of files selected in the "Resources" tab of the export dialog. The dictionary's keys are file paths, and its values are the corresponding export modes: [code]"strip"[/code], [code]"keep"[/code], or [code]"remove"[/code]. See also [method get_file_export_mode]. */
  get_customized_files(): Dictionary<any, any>

  /** Returns the number of files selected in the "Resources" tab of the export dialog. */
  get_customized_files_count(): int

  /** Returns [code]true[/code] if PCK directory encryption is enabled in the export dialog. */
  get_encrypt_directory(): boolean

  /** Returns [code]true[/code] if PCK encryption is enabled in the export dialog. */
  get_encrypt_pck(): boolean

  /** Returns file filters to exclude during PCK encryption. */
  get_encryption_ex_filter(): string

  /** Returns file filters to include during PCK encryption. */
  get_encryption_in_filter(): string

  /** Returns PCK encryption key. */
  get_encryption_key(): string

  /** Returns file filters to exclude during export. */
  get_exclude_filter(): string

  /** Returns export file filter mode selected in the "Resources" tab of the export dialog. */
  get_export_filter(): int

  /** Returns export target path. */
  get_export_path(): string

  /** Returns file export mode for the specified file. */
  get_file_export_mode(path: string, _default?: int): int

  /** Returns array of files to export. */
  get_files_to_export(): PackedStringArray

  /** Returns file filters to include during export. */
  get_include_filter(): string

  /** Returns export option value or value of environment variable if it is set. */
  get_or_env(name: StringName, env_var: string): any

  /** Returns the list of packs on which to base a patch export on. */
  get_patches(): PackedStringArray

  /** Returns this export preset's name. */
  get_preset_name(): string

  /** Returns the value of the setting identified by [param name] using export preset feature tag overrides instead of current OS features. */
  get_project_setting(name: StringName): any

  /** Returns the export mode used by GDScript files. [code]0[/code] for "Text", [code]1[/code] for "Binary tokens", and [code]2[/code] for "Compressed binary tokens (smaller files)". */
  get_script_export_mode(): int

  /**
   * Returns the preset's version number, or fall back to the [member ProjectSettings.application/config/version] project setting if set to an empty string.
   *
   * If [param windows_version] is `true`, formats the returned version number to be compatible with Windows executable metadata.
   *
   */
  get_version(name: StringName, windows_version: boolean): string

  /** Returns [code]true[/code] if the preset has the property named [param property]. */
  has(property: StringName): boolean

  /** Returns [code]true[/code] if the file at the specified [param path] will be exported. */
  has_export_file(path: string): boolean

  /** Returns [code]true[/code] if the dedicated server export mode is selected in the export dialog. */
  is_dedicated_server(): boolean

  /** Returns [code]true[/code] if the "Runnable" toggle is enabled in the export dialog. */
  is_runnable(): boolean

  connect<T extends SignalsOf<EditorExportPreset>>(
    signal: T,
    method: SignalFunction<EditorExportPreset[T]>
  ): number

  /** No documentation provided. */
  static EXPORT_ALL_RESOURCES: any

  /** No documentation provided. */
  static EXPORT_SELECTED_SCENES: any

  /** No documentation provided. */
  static EXPORT_SELECTED_RESOURCES: any

  /** No documentation provided. */
  static EXCLUDE_SELECTED_RESOURCES: any

  /** No documentation provided. */
  static EXPORT_CUSTOMIZED: any

  /** No documentation provided. */
  static MODE_FILE_NOT_CUSTOMIZED: any

  /** No documentation provided. */
  static MODE_FILE_STRIP: any

  /** No documentation provided. */
  static MODE_FILE_KEEP: any

  /** No documentation provided. */
  static MODE_FILE_REMOVE: any

  /** No documentation provided. */
  static MODE_SCRIPT_TEXT: any

  /** No documentation provided. */
  static MODE_SCRIPT_BINARY_TOKENS: any

  /** No documentation provided. */
  static MODE_SCRIPT_BINARY_TOKENS_COMPRESSED: any
}
