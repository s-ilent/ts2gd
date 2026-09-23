/**
 * The [GDExtension] resource type represents a [url=https://en.wikipedia.org/wiki/Shared_library]shared library[/url] which can expand the functionality of the engine. The [GDExtensionManager] singleton is responsible for loading, reloading, and unloading [GDExtension] resources.
 *
 * **Note:** GDExtension itself is not a scripting language and has no relation to [GDScript] resources.
 *
 */
declare class GDExtension extends Resource {
  /**
   * The [GDExtension] resource type represents a [url=https://en.wikipedia.org/wiki/Shared_library]shared library[/url] which can expand the functionality of the engine. The [GDExtensionManager] singleton is responsible for loading, reloading, and unloading [GDExtension] resources.
   *
   * **Note:** GDExtension itself is not a scripting language and has no relation to [GDScript] resources.
   *
   */
  new(): GDExtension
  constructor()
  static new(): GDExtension

  /** Returns the lowest level required for this extension to be properly initialized (see the [enum InitializationLevel] enum). */
  get_minimum_library_initialization_level(): int

  /** Returns [code]true[/code] if this extension's library has been opened. */
  is_library_open(): boolean

  connect<T extends SignalsOf<GDExtension>>(
    signal: T,
    method: SignalFunction<GDExtension[T]>
  ): number

  /**
   * The library is initialized at the same time as the core features of the engine.
   *
   */
  static INITIALIZATION_LEVEL_CORE: any

  /**
   * The library is initialized at the same time as the engine's servers (such as [RenderingServer] or [PhysicsServer3D]).
   *
   */
  static INITIALIZATION_LEVEL_SERVERS: any

  /**
   * The library is initialized at the same time as the engine's scene-related classes.
   *
   */
  static INITIALIZATION_LEVEL_SCENE: any

  /**
   * The library is initialized at the same time as the engine's editor classes. Only happens when loading the GDExtension in the editor.
   *
   */
  static INITIALIZATION_LEVEL_EDITOR: any
}
