/**
 * [EditorSceneFormatImporter] allows to define an importer script for a third-party 3D format.
 *
 * To use [EditorSceneFormatImporter], register it using the [method EditorPlugin.add_scene_format_importer_plugin] method first.
 *
 */
declare class EditorSceneFormatImporter extends RefCounted {
  /**
   * [EditorSceneFormatImporter] allows to define an importer script for a third-party 3D format.
   *
   * To use [EditorSceneFormatImporter], register it using the [method EditorPlugin.add_scene_format_importer_plugin] method first.
   *
   */
  new(): EditorSceneFormatImporter
  constructor()
  static new(): EditorSceneFormatImporter

  /** Return supported file extensions for this scene importer. */
  protected _get_extensions(): PackedStringArray

  /**
   * Override to add general import options. These will appear in the main import dock on the editor. Add options via [method add_import_option] and [method add_import_option_advanced].
   *
   * **Note:** All [EditorSceneFormatImporter] and [EditorScenePostImportPlugin] instances will add options for all files. It is good practice to check the file extension when [param path] is non-empty.
   *
   * When the user is editing project settings, [param path] will be empty. It is recommended to add all options when [param path] is empty to allow the user to customize Import Defaults.
   *
   */
  protected _get_import_options(path: string): void

  /** Should return [code]true[/code] to show the given option, [code]false[/code] to hide the given option, or [code]null[/code] to ignore. */
  protected _get_option_visibility(
    path: string,
    for_animation: boolean,
    option: string
  ): any

  /** Perform the bulk of the scene import logic here, for example using [GLTFDocument] or [FBXDocument]. */
  protected _import_scene(
    path: string,
    flags: int,
    options: Dictionary<any, any>
  ): Object

  /** Add a specific import option (name and default value only). This function can only be called from [method _get_import_options]. */
  add_import_option(name: string, value: any): void

  /** Add a specific import option. This function can only be called from [method _get_import_options]. */
  add_import_option_advanced(
    type: int,
    name: string,
    default_value: any,
    hint?: int,
    hint_string?: string,
    usage_flags?: int
  ): void

  connect<T extends SignalsOf<EditorSceneFormatImporter>>(
    signal: T,
    method: SignalFunction<EditorSceneFormatImporter[T]>
  ): number

  /** No documentation provided. */
  static IMPORT_SCENE: any

  /** No documentation provided. */
  static IMPORT_ANIMATION: any

  /** No documentation provided. */
  static IMPORT_FAIL_ON_MISSING_DEPENDENCIES: any

  /** No documentation provided. */
  static IMPORT_GENERATE_TANGENT_ARRAYS: any

  /** No documentation provided. */
  static IMPORT_USE_NAMED_SKIN_BINDS: any

  /** No documentation provided. */
  static IMPORT_DISCARD_MESHES_AND_MATERIALS: any

  /** No documentation provided. */
  static IMPORT_FORCE_DISABLE_MESH_COMPRESSION: any
}
