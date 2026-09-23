/**
 * This object is used by [RenderingDevice].
 *
 */
declare class RDUniform extends RefCounted {
  /**
   * This object is used by [RenderingDevice].
   *
   */
  new(): RDUniform
  constructor()
  static new(): RDUniform

  /** The uniform's binding. */
  binding: int

  /** The uniform's data type. */
  uniform_type: int

  /** Binds the given id to the uniform. The data associated with the id is then used when the uniform is passed to a shader. */
  add_id(id: RID): void

  /** Unbinds all ids currently bound to the uniform. */
  clear_ids(): void

  /** Returns an array of all ids currently bound to the uniform. */
  get_ids(): RID[]

  connect<T extends SignalsOf<RDUniform>>(
    signal: T,
    method: SignalFunction<RDUniform[T]>
  ): number
}
