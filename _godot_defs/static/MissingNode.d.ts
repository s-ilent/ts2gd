/**
 * This is an internal editor class intended for keeping data of nodes of unknown type (most likely this type was supplied by an extension that is no longer loaded). It can't be manually instantiated or placed in a scene.
 *
 * **Warning:** Ignore missing nodes unless you know what you are doing. Existing properties on a missing node can be freely modified in code, regardless of the type they are intended to be.
 *
 */
declare class MissingNode extends Node {
  /**
   * This is an internal editor class intended for keeping data of nodes of unknown type (most likely this type was supplied by an extension that is no longer loaded). It can't be manually instantiated or placed in a scene.
   *
   * **Warning:** Ignore missing nodes unless you know what you are doing. Existing properties on a missing node can be freely modified in code, regardless of the type they are intended to be.
   *
   */
  new(): MissingNode
  constructor()
  static new(): MissingNode

  /** The name of the class this node was supposed to be (see [method Object.get_class]). */
  original_class: string

  /** Returns the path of the scene this node was instance of originally. */
  original_scene: string

  /** If [code]true[/code], allows new properties to be set along with existing ones. If [code]false[/code], only existing properties' values can be set, and new properties cannot be added. */
  recording_properties: boolean

  /** If [code]true[/code], allows new signals to be connected to along with existing ones. If [code]false[/code], only existing signals can be connected to, and new signals cannot be added. */
  recording_signals: boolean

  connect<T extends SignalsOf<MissingNode>>(
    signal: T,
    method: SignalFunction<MissingNode[T]>
  ): number
}
