/**
 * This is an internal editor class intended for keeping data of resources of unknown type (most likely this type was supplied by an extension that is no longer loaded). It can't be manually instantiated or placed in a scene.
 *
 * **Warning:** Ignore missing resources unless you know what you are doing. Existing properties on a missing resource can be freely modified in code, regardless of the type they are intended to be.
 *
 */
declare class MissingResource extends Resource {
  /**
   * This is an internal editor class intended for keeping data of resources of unknown type (most likely this type was supplied by an extension that is no longer loaded). It can't be manually instantiated or placed in a scene.
   *
   * **Warning:** Ignore missing resources unless you know what you are doing. Existing properties on a missing resource can be freely modified in code, regardless of the type they are intended to be.
   *
   */
  new(): MissingResource
  constructor()
  static new(): MissingResource

  /** The name of the class this resource was supposed to be (see [method Object.get_class]). */
  original_class: string

  /** If set to [code]true[/code], allows new properties to be added on top of the existing ones with [method Object.set]. */
  recording_properties: boolean

  connect<T extends SignalsOf<MissingResource>>(
    signal: T,
    method: SignalFunction<MissingResource[T]>
  ): number
}
