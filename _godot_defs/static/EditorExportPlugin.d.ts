/**
 * [EditorExportPlugin]s are automatically invoked whenever the user exports the project. Their most common use is to determine what files are being included in the exported project. For each plugin, [method _export_begin] is called at the beginning of the export process and then [method _export_file] is called for each exported file.
 *
 * To use [EditorExportPlugin], register it using the [method EditorPlugin.add_export_plugin] method first.
 *
 */
declare class EditorExportPlugin extends RefCounted {
  /**
   * [EditorExportPlugin]s are automatically invoked whenever the user exports the project. Their most common use is to determine what files are being included in the exported project. For each plugin, [method _export_begin] is called at the beginning of the export process and then [method _export_file] is called for each exported file.
   *
   * To use [EditorExportPlugin], register it using the [method EditorPlugin.add_export_plugin] method first.
   *
   */
  new(): EditorExportPlugin
  constructor()
  static new(): EditorExportPlugin

  /**
   * Return `true` if this plugin will customize resources based on the platform and features used.
   *
   * When enabled, [method _get_customization_configuration_hash] and [method _customize_resource] will be called and must be implemented.
   *
   */
  protected _begin_customize_resources(
    platform: EditorExportPlatform,
    features: PackedStringArray
  ): boolean

  /**
   * Return `true` if this plugin will customize scenes based on the platform and features used.
   *
   * When enabled, [method _get_customization_configuration_hash] and [method _customize_scene] will be called and must be implemented.
   *
   * **Note:** [method _customize_scene] will only be called for scenes that have been modified since the last export.
   *
   */
  protected _begin_customize_scenes(
    platform: EditorExportPlatform,
    features: PackedStringArray
  ): boolean

  /**
   * Customize a resource. If changes are made to it, return the same or a new resource. Otherwise, return `null`. When a new resource is returned, [param resource] will be replaced by a copy of the new resource.
   *
   * The [param path] argument is only used when customizing an actual file, otherwise this means that this resource is part of another one and it will be empty.
   *
   * Implementing this method is required if [method _begin_customize_resources] returns `true`.
   *
   * **Note:** When customizing any of the following types and returning another resource, the other resource should not be skipped using [method skip] in [method _export_file]:
   *
   * - [AtlasTexture]
   *
   * - [CompressedCubemap]
   *
   * - [CompressedCubemapArray]
   *
   * - [CompressedTexture2D]
   *
   * - [CompressedTexture2DArray]
   *
   * - [CompressedTexture3D]
   *
   */
  protected _customize_resource(resource: Resource, path: string): Resource

  /**
   * Customize a scene. If changes are made to it, return the same or a new scene. Otherwise, return `null`. If a new scene is returned, it is up to you to dispose of the old one.
   *
   * Implementing this method is required if [method _begin_customize_scenes] returns `true`.
   *
   */
  protected _customize_scene(scene: Node, path: string): Node

  /** This is called when the customization process for resources ends. */
  protected _end_customize_resources(): void

  /** This is called when the customization process for scenes ends. */
  protected _end_customize_scenes(): void

  /** Virtual method to be overridden by the user. It is called when the export starts and provides all information about the export. [param features] is the list of features for the export, [param is_debug] is [code]true[/code] for debug builds, [param path] is the target path for the exported project. [param flags] is only used when running a runnable profile, e.g. when using native run on Android. */
  protected _export_begin(
    features: PackedStringArray,
    is_debug: boolean,
    path: string,
    flags: int
  ): void

  /** Virtual method to be overridden by the user. Called when the export is finished. */
  protected _export_end(): void

  /**
   * Virtual method to be overridden by the user. Called for each exported file before [method _customize_resource] and [method _customize_scene]. The arguments can be used to identify the file. [param path] is the path of the file, [param type] is the [Resource] represented by the file (e.g. [PackedScene]), and [param features] is the list of features for the export.
   *
   * Calling [method skip] inside this callback will make the file not included in the export.
   *
   */
  protected _export_file(
    path: string,
    type: string,
    features: PackedStringArray
  ): void

  /**
   * Virtual method to be overridden by the user. This is called to retrieve the set of Android dependencies provided by this plugin. Each returned Android dependency should have the format of an Android remote binary dependency: `org.godot.example:my-plugin:0.0.0`
   *
   * For more information see [url=https://developer.android.com/build/dependencies?agpversion=4.1#dependency-types]Android documentation on dependencies[/url].
   *
   * **Note:** Only supported on Android and requires [member EditorExportPlatformAndroid.gradle_build/use_gradle_build] to be enabled.
   *
   */
  protected _get_android_dependencies(
    platform: EditorExportPlatform,
    debug: boolean
  ): PackedStringArray

  /**
   * Virtual method to be overridden by the user. This is called to retrieve the URLs of Maven repositories for the set of Android dependencies provided by this plugin.
   *
   * For more information see [url=https://docs.gradle.org/current/userguide/dependency_management.html#sec:maven_repo]Gradle documentation on dependency management[/url].
   *
   * **Note:** Google's Maven repo and the Maven Central repo are already included by default.
   *
   * **Note:** Only supported on Android and requires [member EditorExportPlatformAndroid.gradle_build/use_gradle_build] to be enabled.
   *
   */
  protected _get_android_dependencies_maven_repos(
    platform: EditorExportPlatform,
    debug: boolean
  ): PackedStringArray

  /**
   * Virtual method to be overridden by the user. This is called to retrieve the local paths of the Android libraries archive (AAR) files provided by this plugin.
   *
   * **Note:** Relative paths **must** be relative to Godot's `res://addons/` directory. For example, an AAR file located under `res://addons/hello_world_plugin/HelloWorld.release.aar` can be returned as an absolute path using `res://addons/hello_world_plugin/HelloWorld.release.aar` or a relative path using `hello_world_plugin/HelloWorld.release.aar`.
   *
   * **Note:** Only supported on Android and requires [member EditorExportPlatformAndroid.gradle_build/use_gradle_build] to be enabled.
   *
   */
  protected _get_android_libraries(
    platform: EditorExportPlatform,
    debug: boolean
  ): PackedStringArray

  /**
   * Virtual method to be overridden by the user. This is used at export time to update the contents of the `activity` element in the generated Android manifest.
   *
   * **Note:** Only supported on Android and requires [member EditorExportPlatformAndroid.gradle_build/use_gradle_build] to be enabled.
   *
   */
  protected _get_android_manifest_activity_element_contents(
    platform: EditorExportPlatform,
    debug: boolean
  ): string

  /**
   * Virtual method to be overridden by the user. This is used at export time to update the contents of the `application` element in the generated Android manifest.
   *
   * **Note:** Only supported on Android and requires [member EditorExportPlatformAndroid.gradle_build/use_gradle_build] to be enabled.
   *
   */
  protected _get_android_manifest_application_element_contents(
    platform: EditorExportPlatform,
    debug: boolean
  ): string

  /**
   * Virtual method to be overridden by the user. This is used at export time to update the contents of the `manifest` element in the generated Android manifest.
   *
   * **Note:** Only supported on Android and requires [member EditorExportPlatformAndroid.gradle_build/use_gradle_build] to be enabled.
   *
   */
  protected _get_android_manifest_element_contents(
    platform: EditorExportPlatform,
    debug: boolean
  ): string

  /**
   * Return a hash based on the configuration passed (for both scenes and resources). This helps keep separate caches for separate export configurations.
   *
   * Implementing this method is required if [method _begin_customize_resources] returns `true`.
   *
   */
  protected _get_customization_configuration_hash(): int

  /** Return a [PackedStringArray] of additional features this preset, for the given [param platform], should have. */
  protected _get_export_features(
    platform: EditorExportPlatform,
    debug: boolean
  ): PackedStringArray

  /** Validates [param option] and returns the visibility for the specified [param platform]. The default implementation returns [code]true[/code] for all options. */
  protected _get_export_option_visibility(
    platform: EditorExportPlatform,
    option: string
  ): boolean

  /**
   * Check the requirements for the given [param option] and return a non-empty warning string if they are not met.
   *
   * **Note:** Use [method get_option] to check the value of the export options.
   *
   */
  protected _get_export_option_warning(
    platform: EditorExportPlatform,
    option: string
  ): string

  /**
   * Return a list of export options that can be configured for this export plugin.
   *
   * Each element in the return value is a [Dictionary] with the following keys:
   *
   * - `option`: A dictionary with the structure documented by [method Object.get_property_list], but all keys are optional.
   *
   * - `default_value`: The default value for this option.
   *
   * - `update_visibility`: An optional boolean value. If set to `true`, the preset will emit [signal Object.property_list_changed] when the option is changed.
   *
   */
  protected _get_export_options(
    platform: EditorExportPlatform
  ): Dictionary<any, any>[]

  /**
   * Return a [Dictionary] of override values for export options, that will be used instead of user-provided values. Overridden options will be hidden from the user interface.
   *
   * @example
   *
   * class MyExportPlugin extends EditorExportPlugin:
   * 	func _get_name() -> String:
   * 		return "MyExportPlugin"
   * 	func _supports_platform(platform) -> bool:
   * 		if platform is EditorExportPlatformPC:
   * 			# Run on all desktop platforms including Windows, MacOS and Linux.
   * 			return true
   * 		return false
   * 	func _get_export_options_overrides(platform) -> Dictionary:
   * 		# Override "Embed PCK" to always be enabled.
   * 		return {
   * 			"binary_format/embed_pck": true,
   * 		}
   * @summary
   *
   *
   */
  protected _get_export_options_overrides(
    platform: EditorExportPlatform
  ): Dictionary<any, any>

  /**
   * Return the name identifier of this plugin (for future identification by the exporter). The plugins are sorted by name before exporting.
   *
   * Implementing this method is required.
   *
   */
  protected _get_name(): string

  /** Return [code]true[/code] if the result of [method _get_export_options] has changed and the export options of the preset corresponding to [param platform] should be updated. */
  protected _should_update_export_options(
    platform: EditorExportPlatform
  ): boolean

  /** Return [code]true[/code] if the plugin supports the given [param platform]. */
  protected _supports_platform(platform: EditorExportPlatform): boolean

  /**
   * Provide access to the Android prebuilt manifest and allows the plugin to modify it if needed.
   *
   * Implementers of this virtual method should take the binary manifest data from [param manifest_data], copy it, modify it, and then return it with the modifications.
   *
   * If no modifications are needed, then an empty [PackedByteArray] should be returned.
   *
   */
  protected _update_android_prebuilt_manifest(
    platform: EditorExportPlatform,
    manifest_data: PackedByteArray
  ): PackedByteArray

  /** Adds an Apple embedded platform bundle file from the given [param path] to the exported project. */
  add_apple_embedded_platform_bundle_file(path: string): void

  /** Adds C++ code to the Apple embedded platform export. The final code is created from the code appended by each active export plugin. */
  add_apple_embedded_platform_cpp_code(code: string): void

  /**
   * Adds a dynamic library (*.dylib, *.framework) to the Linking Phase in the Apple embedded platform's Xcode project and embeds it into the resulting binary.
   *
   * **Note:** For static libraries (*.a), this works in the same way as [method add_apple_embedded_platform_framework].
   *
   * **Note:** This method should not be used for System libraries as they are already present on the device.
   *
   */
  add_apple_embedded_platform_embedded_framework(path: string): void

  /** Adds a static library (*.a) or a dynamic library (*.dylib, *.framework) to the Linking Phase to the Apple embedded platform's Xcode project. */
  add_apple_embedded_platform_framework(path: string): void

  /** Adds linker flags for the Apple embedded platform export. */
  add_apple_embedded_platform_linker_flags(flags: string): void

  /** Adds additional fields to the Apple embedded platform's project Info.plist file. */
  add_apple_embedded_platform_plist_content(plist_content: string): void

  /** Adds a static library from the given [param path] to the Apple embedded platform project. */
  add_apple_embedded_platform_project_static_lib(path: string): void

  /**
   * Adds a custom file to be exported. [param path] is the virtual path that can be used to load the file, [param file] is the binary data of the file.
   *
   * When called inside [method _export_file] and [param remap] is `true`, the current file will not be exported, but instead remapped to this custom file. [param remap] is ignored when called in other places.
   *
   * [param file] will not be imported, so consider using [method _customize_resource] to remap imported resources.
   *
   */
  add_file(path: string, file: PackedByteArray, remap: boolean): void

  /** Adds an iOS bundle file from the given [param path] to the exported project. */
  add_ios_bundle_file(path: string): void

  /** Adds C++ code to the iOS export. The final code is created from the code appended by each active export plugin. */
  add_ios_cpp_code(code: string): void

  /**
   * Adds a dynamic library (*.dylib, *.framework) to Linking Phase in iOS's Xcode project and embeds it into resulting binary.
   *
   * **Note:** For static libraries (*.a), this works the in same way as [method add_apple_embedded_platform_framework].
   *
   * **Note:** This method should not be used for System libraries as they are already present on the device.
   *
   */
  add_ios_embedded_framework(path: string): void

  /** Adds a static library (*.a) or a dynamic library (*.dylib, *.framework) to the Linking Phase to the iOS Xcode project. */
  add_ios_framework(path: string): void

  /** Adds linker flags for the iOS export. */
  add_ios_linker_flags(flags: string): void

  /** Adds additional fields to the iOS project Info.plist file. */
  add_ios_plist_content(plist_content: string): void

  /** Adds a static library from the given [param path] to the iOS project. */
  add_ios_project_static_lib(path: string): void

  /**
   * Adds file or directory matching [param path] to `PlugIns` directory of macOS app bundle.
   *
   * **Note:** This is useful only for macOS exports.
   *
   */
  add_macos_plugin_file(path: string): void

  /**
   * Adds a shared object or a directory containing only shared objects with the given [param tags] and destination [param path].
   *
   * **Note:** In case of macOS exports, those shared objects will be added to `Frameworks` directory of app bundle.
   *
   * In case of a directory code-sign will error if you place non code object in directory.
   *
   */
  add_shared_object(path: string, tags: PackedStringArray, target: string): void

  /** Returns currently used export platform. */
  get_export_platform(): EditorExportPlatform

  /** Returns currently used export preset. */
  get_export_preset(): EditorExportPreset

  /** Returns the current value of an export option supplied by [method _get_export_options]. */
  get_option(name: StringName): any

  /** To be called inside [method _export_file]. Skips the current file, so it's not included in the export. */
  skip(): void

  connect<T extends SignalsOf<EditorExportPlugin>>(
    signal: T,
    method: SignalFunction<EditorExportPlugin[T]>
  ): number
}
