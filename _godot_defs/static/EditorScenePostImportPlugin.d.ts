/**
 * This plugin type exists to modify the process of importing scenes, allowing to change the content as well as add importer options at every stage of the process.
 *
 */
declare class EditorScenePostImportPlugin extends RefCounted {
  /**
   * This plugin type exists to modify the process of importing scenes, allowing to change the content as well as add importer options at every stage of the process.
   *
   */
  new(): EditorScenePostImportPlugin
  constructor()
  static new(): EditorScenePostImportPlugin

  /** Override to add general import options. These will appear in the main import dock on the editor. Add options via [method add_import_option] and [method add_import_option_advanced]. */
  protected _get_import_options(path: string): void

  /** Override to add internal import options. These will appear in the 3D scene import dialog. Add options via [method add_import_option] and [method add_import_option_advanced]. */
  protected _get_internal_import_options(category: int): void

  /** Should return [code]true[/code] if the 3D view of the import dialog needs to update when changing the given option. */
  protected _get_internal_option_update_view_required(
    category: int,
    option: string
  ): any

  /** Should return [code]true[/code] to show the given option, [code]false[/code] to hide the given option, or [code]null[/code] to ignore. */
  protected _get_internal_option_visibility(
    category: int,
    for_animation: boolean,
    option: string
  ): any

  /** Should return [code]true[/code] to show the given option, [code]false[/code] to hide the given option, or [code]null[/code] to ignore. */
  protected _get_option_visibility(
    path: string,
    for_animation: boolean,
    option: string
  ): any

  /** Process a specific node or resource for a given category. */
  protected _internal_process(
    category: int,
    base_node: Node,
    node: Node,
    resource: Resource
  ): void

  /** Post-process the scene. This function is called after the final scene has been configured. */
  protected _post_process(scene: Node): void

  /**
   * Pre-process the scene. This function is called right after the scene format loader loaded the scene and no changes have been made.
   *
   * Pre-process may be used to adjust internal import options in the `"nodes"`, `"meshes"`, `"animations"` or `"materials"` keys inside `get_option_value("_subresources")`.
   *
   */
  protected _pre_process(scene: Node): void

  /** Add a specific import option (name and default value only). This function can only be called from [method _get_import_options] and [method _get_internal_import_options]. */
  add_import_option(name: string, value: any): void

  /** Add a specific import option. This function can only be called from [method _get_import_options] and [method _get_internal_import_options]. */
  add_import_option_advanced(
    type: int,
    name: string,
    default_value: any,
    hint?: int,
    hint_string?: string,
    usage_flags?: int
  ): void

  /** Query the value of an option. This function can only be called from those querying visibility, or processing. */
  get_option_value(name: StringName): any

  connect<T extends SignalsOf<EditorScenePostImportPlugin>>(
    signal: T,
    method: SignalFunction<EditorScenePostImportPlugin[T]>
  ): number

  /** No documentation provided. */
  static INTERNAL_IMPORT_CATEGORY_NODE: any

  /** No documentation provided. */
  static INTERNAL_IMPORT_CATEGORY_MESH_3D_NODE: any

  /** No documentation provided. */
  static INTERNAL_IMPORT_CATEGORY_MESH: any

  /** No documentation provided. */
  static INTERNAL_IMPORT_CATEGORY_MATERIAL: any

  /** No documentation provided. */
  static INTERNAL_IMPORT_CATEGORY_ANIMATION: any

  /** No documentation provided. */
  static INTERNAL_IMPORT_CATEGORY_ANIMATION_NODE: any

  /** No documentation provided. */
  static INTERNAL_IMPORT_CATEGORY_SKELETON_3D_NODE: any

  /** No documentation provided. */
  static INTERNAL_IMPORT_CATEGORY_MAX: any
}
