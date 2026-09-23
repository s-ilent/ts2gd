/**
 * Resource is the base class for all Godot-specific resource types, serving primarily as data containers. Since they inherit from [RefCounted], resources are reference-counted and freed when no longer in use. They can also be nested within other resources, and saved on disk. [PackedScene], one of the most common [Object]s in a Godot project, is also a resource, uniquely capable of storing and instantiating the [Node]s it contains as many times as desired.
 *
 * In GDScript, resources can loaded from disk by their [member resource_path] using [method @GDScript.load] or [method @GDScript.preload].
 *
 * The engine keeps a global cache of all loaded resources, referenced by paths (see [method ResourceLoader.has_cached]). A resource will be cached when loaded for the first time and removed from cache once all references are released. When a resource is cached, subsequent loads using its path will return the cached reference.
 *
 * **Note:** In C#, resources will not be freed instantly after they are no longer in use. Instead, garbage collection will run periodically and will free resources that are no longer in use. This means that unused resources will remain in memory for a while before being removed.
 *
 */
declare class Resource extends RefCounted {
  /**
   * Resource is the base class for all Godot-specific resource types, serving primarily as data containers. Since they inherit from [RefCounted], resources are reference-counted and freed when no longer in use. They can also be nested within other resources, and saved on disk. [PackedScene], one of the most common [Object]s in a Godot project, is also a resource, uniquely capable of storing and instantiating the [Node]s it contains as many times as desired.
   *
   * In GDScript, resources can loaded from disk by their [member resource_path] using [method @GDScript.load] or [method @GDScript.preload].
   *
   * The engine keeps a global cache of all loaded resources, referenced by paths (see [method ResourceLoader.has_cached]). A resource will be cached when loaded for the first time and removed from cache once all references are released. When a resource is cached, subsequent loads using its path will return the cached reference.
   *
   * **Note:** In C#, resources will not be freed instantly after they are no longer in use. Instead, garbage collection will run periodically and will free resources that are no longer in use. This means that unused resources will remain in memory for a while before being removed.
   *
   */
  new(): Resource
  constructor()
  static new(): Resource

  /**
   * If `true`, the resource is duplicated for each instance of all scenes using it. At run-time, the resource can be modified in one scene without affecting other instances (see [method PackedScene.instantiate]).
   *
   * **Note:** Changing this property at run-time has no effect on already created duplicate resources.
   *
   */
  resource_local_to_scene: boolean

  /**
   * An optional name for this resource. When defined, its value is displayed to represent the resource in the Inspector dock. For built-in scripts, the name is displayed as part of the tab name in the script editor.
   *
   * **Note:** Some resource formats do not support resource names. You can still set the name in the editor or via code, but it will be lost when the resource is reloaded. For example, only built-in scripts can have a resource name, while scripts stored in separate files cannot.
   *
   */
  resource_name: string

  /**
   * The unique path to this resource. If it has been saved to disk, the value will be its filepath. If the resource is exclusively contained within a scene, the value will be the [PackedScene]'s filepath, followed by a unique identifier.
   *
   * **Note:** Setting this property manually may fail if a resource with the same path has already been previously loaded. If necessary, use [method take_over_path].
   *
   */
  resource_path: string

  /**
   * A unique identifier relative to the this resource's scene. If left empty, the ID is automatically generated when this resource is saved inside a [PackedScene]. If the resource is not inside a scene, this property is empty by default.
   *
   * **Note:** When the [PackedScene] is saved, if multiple resources in the same scene use the same ID, only the earliest resource in the scene hierarchy keeps the original ID. The other resources are assigned new IDs from [method generate_scene_unique_id].
   *
   * **Note:** Setting this property does not emit the [signal changed] signal.
   *
   * **Warning:** When setting, the ID must only consist of letters, numbers, and underscores. Otherwise, it will fail and default to a randomly generated ID.
   *
   */
  resource_scene_unique_id: string

  /** Override this method to return a custom [RID] when [method get_rid] is called. */
  protected _get_rid(): RID

  /** For resources that store state in non-exported properties, such as via [method Object._validate_property] or [method Object._get_property_list], this method must be implemented to clear them. */
  protected _reset_state(): void

  /** Override this method to execute additional logic after [method set_path_cache] is called on this object. */
  protected _set_path_cache(path: string): void

  /**
   * Override this method to customize the newly duplicated resource created from [method PackedScene.instantiate], if the original's [member resource_local_to_scene] is set to `true`.
   *
   * **Example:** Set a random `damage` value to every local resource from an instantiated scene:
   *
   * @example
   *
   * extends Resource
   * var damage = 0
   * func _setup_local_to_scene():
   * 	damage = randi_range(10, 40)
   * @summary
   *
   *
   */
  protected _setup_local_to_scene(): void

  /**
   * Duplicates this resource, returning a new resource with its `export`ed or [constant PROPERTY_USAGE_STORAGE] properties copied from the original.
   *
   * If [param deep] is `false`, a **shallow** copy is returned: nested [Array], [Dictionary], and [Resource] properties are not duplicated and are shared with the original resource.
   *
   * If [param deep] is `true`, a **deep** copy is returned: all nested arrays, dictionaries, and packed arrays are also duplicated (recursively). Any [Resource] found inside will only be duplicated if it's local, like [constant DEEP_DUPLICATE_INTERNAL] used with [method duplicate_deep].
   *
   * The following exceptions apply:
   *
   * - Subresource properties with the [constant PROPERTY_USAGE_ALWAYS_DUPLICATE] flag are always duplicated (recursively or not, depending on [param deep]).
   *
   * - Subresource properties with the [constant PROPERTY_USAGE_NEVER_DUPLICATE] flag are never duplicated.
   *
   * **Note:** For custom resources, this method will fail if [method Object._init] has been defined with required parameters.
   *
   * **Note:** When duplicating with [param deep] set to `true`, each resource found, including the one on which this method is called, will be only duplicated once and referenced as many times as needed in the duplicate. For instance, if you are duplicating resource A that happens to have resource B referenced twice, you'll get a new resource A' referencing a new resource B' twice.
   *
   */
  duplicate(deep?: boolean): Resource

  /** Duplicates this resource, deeply, like [method duplicate] when passing [code]true[/code], with extra control over how subresources are handled. */
  duplicate_deep(deep_subresources_mode?: int): Resource

  /**
   * Emits the [signal changed] signal. This method is called automatically for some built-in resources.
   *
   * **Note:** For custom resources, it's recommended to call this method whenever a meaningful change occurs, such as a modified property. This ensures that custom [Object]s depending on the resource are properly updated.
   *
   * @example
   *
   * var damage:
   * 	set(new_value):
   * 		if damage != new_value:
   * 			damage = new_value
   * 			emit_changed()
   * @summary
   *
   *
   */
  emit_changed(): void

  /** Generates a unique identifier for a resource to be contained inside a [PackedScene], based on the current date, time, and a random value. The returned string is only composed of letters ([code]a[/code] to [code]y[/code]) and numbers ([code]0[/code] to [code]8[/code]). See also [member resource_scene_unique_id]. */
  static generate_scene_unique_id(): string

  /**
   * From the internal cache for scene-unique IDs, returns the ID of this resource for the scene at [param path]. If there is no entry, an empty string is returned. Useful to keep scene-unique IDs the same when implementing a VCS-friendly custom resource format by extending [ResourceFormatLoader] and [ResourceFormatSaver].
   *
   * **Note:** This method is only implemented when running in an editor context. At runtime, it returns an empty string.
   *
   */
  get_id_for_path(path: string): string

  /** If [member resource_local_to_scene] is set to [code]true[/code] and the resource has been loaded from a [PackedScene] instantiation, returns the root [Node] of the scene where this resource is used. Otherwise, returns [code]null[/code]. */
  get_local_scene(): Node

  /** Returns the [RID] of this resource (or an empty RID). Many resources (such as [Texture2D], [Mesh], and so on) are high-level abstractions of resources stored in a specialized server ([DisplayServer], [RenderingServer], etc.), so this function will return the original [RID]. */
  get_rid(): RID

  /** Returns [code]true[/code] if the resource is saved on disk as a part of another resource's file. */
  is_built_in(): boolean

  /** Makes the resource clear its non-exported properties. See also [method _reset_state]. Useful when implementing a custom resource format by extending [ResourceFormatLoader] and [ResourceFormatSaver]. */
  reset_state(): void

  /**
   * In the internal cache for scene-unique IDs, sets the ID of this resource to [param id] for the scene at [param path]. If [param id] is empty, the cache entry for [param path] is cleared. Useful to keep scene-unique IDs the same when implementing a VCS-friendly custom resource format by extending [ResourceFormatLoader] and [ResourceFormatSaver].
   *
   * **Note:** This method is only implemented when running in an editor context.
   *
   */
  set_id_for_path(path: string, id: string): void

  /** Sets the resource's path to [param path] without involving the resource cache. Useful for handling [enum ResourceFormatLoader.CacheMode] values when implementing a custom resource format by extending [ResourceFormatLoader] and [ResourceFormatSaver]. */
  set_path_cache(path: string): void

  /** Calls [method _setup_local_to_scene]. If [member resource_local_to_scene] is set to [code]true[/code], this method is automatically called from [method PackedScene.instantiate] by the newly duplicated resource within the scene instance. */
  setup_local_to_scene(): void

  /** Sets the [member resource_path] to [param path], potentially overriding an existing cache entry for this path. Further attempts to load an overridden resource by path will instead return this resource. */
  take_over_path(path: string): void

  connect<T extends SignalsOf<Resource>>(
    signal: T,
    method: SignalFunction<Resource[T]>
  ): number

  /**
   * No subresorces at all are duplicated. This is useful even in a deep duplication to have all the arrays and dictionaries duplicated but still pointing to the original resources.
   *
   */
  static DEEP_DUPLICATE_NONE: any

  /**
   * Only subresources without a path or with a scene-local path will be duplicated.
   *
   */
  static DEEP_DUPLICATE_INTERNAL: any

  /**
   * Every subresource found will be duplicated, even if it has a non-local path. In other words, even potentially big resources stored separately will be duplicated.
   *
   */
  static DEEP_DUPLICATE_ALL: any

  /**
   * Emitted when the resource changes, usually when one of its properties is modified. See also [method emit_changed].
   *
   * **Note:** This signal is not emitted automatically for properties of custom resources. If necessary, a setter needs to be created to emit the signal.
   *
   */
  $changed: Signal<() => void>

  /**
   * Emitted by a newly duplicated resource with [member resource_local_to_scene] set to `true`.
   *
   */
  $setup_local_to_scene_requested: Signal<() => void>
}
