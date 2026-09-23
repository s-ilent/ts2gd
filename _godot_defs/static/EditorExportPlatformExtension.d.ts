/**
 * External [EditorExportPlatform] implementations should inherit from this class.
 *
 * To use [EditorExportPlatform], register it using the [method EditorPlugin.add_export_platform] method first.
 *
 */
declare class EditorExportPlatformExtension extends EditorExportPlatform {
  /**
   * External [EditorExportPlatform] implementations should inherit from this class.
   *
   * To use [EditorExportPlatform], register it using the [method EditorPlugin.add_export_platform] method first.
   *
   */
  new(): EditorExportPlatformExtension
  constructor()
  static new(): EditorExportPlatformExtension

  /**
   * Returns `true` if the specified [param preset] is valid and can be exported. Use [method set_config_error] and [method set_config_missing_templates] to set error details.
   *
   * Usual implementations call [method _has_valid_export_configuration] and [method _has_valid_project_configuration] to determine if exporting is possible.
   *
   */
  protected _can_export(preset: EditorExportPreset, debug: boolean): boolean

  /** Called by the editor before platform is unregistered. */
  protected _cleanup(): void

  /**
   * Creates a PCK archive at [param path] for the specified [param preset].
   *
   * This method is called when "Export PCK/ZIP" button is pressed in the export dialog, with "Export as Patch" disabled, and PCK is selected as a file type.
   *
   */
  protected _export_pack(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    flags: int
  ): int

  /**
   * Creates a patch PCK archive at [param path] for the specified [param preset], containing only the files that have changed since the last patch.
   *
   * This method is called when "Export PCK/ZIP" button is pressed in the export dialog, with "Export as Patch" enabled, and PCK is selected as a file type.
   *
   * **Note:** The patches provided in [param patches] have already been loaded when this method is called and are merely provided as context. When empty the patches defined in the export preset have been loaded instead.
   *
   */
  protected _export_pack_patch(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    patches: PackedStringArray,
    flags: int
  ): int

  /**
   * Creates a full project at [param path] for the specified [param preset].
   *
   * This method is called when "Export" button is pressed in the export dialog.
   *
   * This method implementation can call [method EditorExportPlatform.save_pack] or [method EditorExportPlatform.save_zip] to use default PCK/ZIP export process, or calls [method EditorExportPlatform.export_project_files] and implement custom callback for processing each exported file.
   *
   */
  protected _export_project(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    flags: int
  ): int

  /**
   * Create a ZIP archive at [param path] for the specified [param preset].
   *
   * This method is called when "Export PCK/ZIP" button is pressed in the export dialog, with "Export as Patch" disabled, and ZIP is selected as a file type.
   *
   */
  protected _export_zip(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    flags: int
  ): int

  /**
   * Create a ZIP archive at [param path] for the specified [param preset], containing only the files that have changed since the last patch.
   *
   * This method is called when "Export PCK/ZIP" button is pressed in the export dialog, with "Export as Patch" enabled, and ZIP is selected as a file type.
   *
   * **Note:** The patches provided in [param patches] have already been loaded when this method is called and are merely provided as context. When empty the patches defined in the export preset have been loaded instead.
   *
   */
  protected _export_zip_patch(
    preset: EditorExportPreset,
    debug: boolean,
    path: string,
    patches: PackedStringArray,
    flags: int
  ): int

  /** Returns array of supported binary extensions for the full project export. */
  protected _get_binary_extensions(
    preset: EditorExportPreset
  ): PackedStringArray

  /** Returns protocol used for remote debugging. Default implementation return [code]tcp://[/code]. */
  protected _get_debug_protocol(): string

  /** Returns device architecture for one-click deploy. */
  protected _get_device_architecture(device: int): string

  /** Validates [param option] and returns visibility for the specified [param preset]. Default implementation return [code]true[/code] for all options. */
  protected _get_export_option_visibility(
    preset: EditorExportPreset,
    option: string
  ): boolean

  /** Validates [param option] and returns warning message for the specified [param preset]. Default implementation return empty string for all options. */
  protected _get_export_option_warning(
    preset: EditorExportPreset,
    option: StringName
  ): string

  /**
   * Returns a property list, as an [Array] of dictionaries. Each [Dictionary] must at least contain the `name: StringName` and `type: Variant.Type` entries.
   *
   * Additionally, the following keys are supported:
   *
   * - `hint: PropertyHint`
   *
   * - `hint_string: String`
   *
   * - `usage: PropertyUsageFlags`
   *
   * - `class_name: StringName`
   *
   * - `default_value: Variant`, default value of the property.
   *
   * - `update_visibility: bool`, if set to `true`, [method _get_export_option_visibility] is called for each property when this property is changed.
   *
   * - `required: bool`, if set to `true`, this property warnings are critical, and should be resolved to make export possible. This value is a hint for the [method _has_valid_export_configuration] implementation, and not used by the engine directly.
   *
   * See also [method Object._get_property_list].
   *
   */
  protected _get_export_options(): Dictionary<any, any>[]

  /** Returns the platform logo displayed in the export dialog. The logo should be 32×32 pixels, adjusted for the current editor scale (see [method EditorInterface.get_editor_scale]). */
  protected _get_logo(): Texture2D

  /** Returns export platform name. */
  protected _get_name(): string

  /** Returns the item icon for the specified [param device] in the one-click deploy menu. The icon should be 16×16 pixels, adjusted for the current editor scale (see [method EditorInterface.get_editor_scale]). */
  protected _get_option_icon(device: int): Texture2D

  /** Returns one-click deploy menu item label for the specified [param device]. */
  protected _get_option_label(device: int): string

  /** Returns one-click deploy menu item tooltip for the specified [param device]. */
  protected _get_option_tooltip(device: int): string

  /** Returns the number of devices (or other options) available in the one-click deploy menu. */
  protected _get_options_count(): int

  /** Returns tooltip of the one-click deploy menu button. */
  protected _get_options_tooltip(): string

  /** Returns target OS name. */
  protected _get_os_name(): string

  /** Returns array of platform specific features. */
  protected _get_platform_features(): PackedStringArray

  /** Returns array of platform specific features for the specified [param preset]. */
  protected _get_preset_features(preset: EditorExportPreset): PackedStringArray

  /** Returns the icon of the one-click deploy menu button. The icon should be 16×16 pixels, adjusted for the current editor scale (see [method EditorInterface.get_editor_scale]). */
  protected _get_run_icon(): Texture2D

  /** Returns [code]true[/code] if export configuration is valid. */
  protected _has_valid_export_configuration(
    preset: EditorExportPreset,
    debug: boolean
  ): boolean

  /** Returns [code]true[/code] if project configuration is valid. */
  protected _has_valid_project_configuration(
    preset: EditorExportPreset
  ): boolean

  /** Initializes the plugin. Called by the editor when platform is registered. */
  protected _initialize(): void

  /** Returns [code]true[/code] if specified file is a valid executable (native executable or script) for the target platform. */
  protected _is_executable(path: string): boolean

  /** Returns [code]true[/code] if one-click deploy options are changed and editor interface should be updated. */
  protected _poll_export(): boolean

  /**
   * This method is called when [param device] one-click deploy menu option is selected.
   *
   * Implementation should export project to a temporary location, upload and run it on the specific [param device], or perform another action associated with the menu item.
   *
   */
  protected _run(preset: EditorExportPreset, device: int, debug_flags: int): int

  /** Returns [code]true[/code] if export options list is changed and presets should be updated. */
  protected _should_update_export_options(): boolean

  /** Returns current configuration error message text. This method should be called only from the [method _can_export], [method _has_valid_export_configuration], or [method _has_valid_project_configuration] implementations. */
  get_config_error(): string

  /** Returns [code]true[/code] is export templates are missing from the current configuration. This method should be called only from the [method _can_export], [method _has_valid_export_configuration], or [method _has_valid_project_configuration] implementations. */
  get_config_missing_templates(): boolean

  /** Sets current configuration error message text. This method should be called only from the [method _can_export], [method _has_valid_export_configuration], or [method _has_valid_project_configuration] implementations. */
  set_config_error(error_text: string): void

  /** Set to [code]true[/code] is export templates are missing from the current configuration. This method should be called only from the [method _can_export], [method _has_valid_export_configuration], or [method _has_valid_project_configuration] implementations. */
  set_config_missing_templates(missing_templates: boolean): void

  connect<T extends SignalsOf<EditorExportPlatformExtension>>(
    signal: T,
    method: SignalFunction<EditorExportPlatformExtension[T]>
  ): number
}
