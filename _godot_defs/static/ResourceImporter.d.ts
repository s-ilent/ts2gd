/**
 * This is the base class for Godot's resource importers. To implement your own resource importers using editor plugins, see [EditorImportPlugin].
 *
 */
declare class ResourceImporter extends RefCounted {
  /**
   * This is the base class for Godot's resource importers. To implement your own resource importers using editor plugins, see [EditorImportPlugin].
   *
   */
  new(): ResourceImporter
  constructor()
  static new(): ResourceImporter

  /**
   * Called when the engine compilation profile editor wants to check what build options an imported resource needs. For example, [ResourceImporterDynamicFont] has a property called [member ResourceImporterDynamicFont.multichannel_signed_distance_field], that depends on the engine to be build with the "msdfgen" module. If that resource happened to be a custom one, it would be handled like this:
   *
   * @example
   *
   * func _get_build_dependencies(path):
   * 	var resource = load(path)
   * 	var dependencies = PackedStringArray()
   * 	if resource.multichannel_signed_distance_field:
   * 		dependencies.push_back("module_msdfgen_enabled")
   * 	return dependencies
   * @summary
   *
   *
   */
  protected _get_build_dependencies(path: string): PackedStringArray

  connect<T extends SignalsOf<ResourceImporter>>(
    signal: T,
    method: SignalFunction<ResourceImporter[T]>
  ): number

  /**
   * The default import order.
   *
   */
  static IMPORT_ORDER_DEFAULT: any

  /**
   * The import order for scenes, which ensures scenes are imported **after** all other core resources such as textures. Custom importers should generally have an import order lower than `100` to avoid issues when importing scenes that rely on custom resources.
   *
   */
  static IMPORT_ORDER_SCENE: any
}
