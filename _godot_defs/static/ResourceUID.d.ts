/**
 * Resource UIDs (Unique IDentifiers) allow the engine to keep references between resources intact, even if files are renamed or moved. They can be accessed with `uid://`.
 *
 * [ResourceUID] keeps track of all registered resource UIDs in a project, generates new UIDs, and converts between their string and integer representations.
 *
 */
declare class ResourceUIDClass extends Object {
  /**
   * Resource UIDs (Unique IDentifiers) allow the engine to keep references between resources intact, even if files are renamed or moved. They can be accessed with `uid://`.
   *
   * [ResourceUID] keeps track of all registered resource UIDs in a project, generates new UIDs, and converts between their string and integer representations.
   *
   */
  new(): ResourceUIDClass
  constructor()
  static new(): ResourceUIDClass

  /**
   * Adds a new UID value which is mapped to the given resource path.
   *
   * Fails with an error if the UID already exists, so be sure to check [method has_id] beforehand, or use [method set_id] instead.
   *
   */
  add_id(id: int, path: string): void

  /**
   * Generates a random resource UID which is guaranteed to be unique within the list of currently loaded UIDs.
   *
   * In order for this UID to be registered, you must call [method add_id] or [method set_id].
   *
   */
  create_id(): int

  /** Like [method create_id], but the UID is seeded with the provided [param path] and project name. UIDs generated for that path will be always the same within the current project. */
  create_id_for_path(path: string): int

  /** Returns a path, converting [param path_or_uid] if necessary. Fails and returns an empty string if an invalid UID is provided. */
  static ensure_path(path_or_uid: string): string

  /**
   * Returns the path that the given UID value refers to.
   *
   * Fails with an error if the UID does not exist, so be sure to check [method has_id] beforehand.
   *
   */
  get_id_path(id: int): string

  /** Returns whether the given UID value is known to the cache. */
  has_id(id: int): boolean

  /** Converts the given UID to a [code]uid://[/code] string value. */
  id_to_text(id: int): string

  /** Converts the provided resource [param path] to a UID. Returns the unchanged path if it has no associated UID. */
  static path_to_uid(path: string): string

  /**
   * Removes a loaded UID value from the cache.
   *
   * Fails with an error if the UID does not exist, so be sure to check [method has_id] beforehand.
   *
   */
  remove_id(id: int): void

  /**
   * Updates the resource path of an existing UID.
   *
   * Fails with an error if the UID does not exist, so be sure to check [method has_id] beforehand, or use [method add_id] instead.
   *
   */
  set_id(id: int, path: string): void

  /** Extracts the UID value from the given [code]uid://[/code] string. */
  text_to_id(text_id: string): int

  /** Converts the provided [param uid] to a path. Prints an error if the UID is invalid. */
  static uid_to_path(uid: string): string

  connect<T extends SignalsOf<ResourceUIDClass>>(
    signal: T,
    method: SignalFunction<ResourceUIDClass[T]>
  ): number

  /**
   * The value to use for an invalid UID, for example if the resource could not be loaded.
   *
   * Its text representation is `uid://<invalid>`.
   *
   */
  static INVALID_ID: any
}
