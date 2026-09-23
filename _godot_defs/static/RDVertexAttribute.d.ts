/**
 * This object is used by [RenderingDevice].
 *
 */
declare class RDVertexAttribute extends RefCounted {
  /**
   * This object is used by [RenderingDevice].
   *
   */
  new(): RDVertexAttribute
  constructor()
  static new(): RDVertexAttribute

  /**
   * The index of the buffer in the vertex buffer array to bind this vertex attribute. When set to `-1`, it defaults to the index of the attribute.
   *
   * **Note:** You cannot mix binding explicitly assigned attributes with implicitly assigned ones (i.e. `-1`). Either all attributes must have their binding set to `-1`, or all must have explicit bindings.
   *
   */
  binding: int

  /** The way that this attribute's data is interpreted when sent to a shader. */
  format: int

  /** The rate at which this attribute is pulled from its vertex buffer. */
  frequency: int

  /** The location in the shader that this attribute is bound to. */
  location: int

  /** The number of bytes between the start of the vertex buffer and the first instance of this attribute. */
  offset: int

  /** The number of bytes between the starts of consecutive instances of this attribute. */
  stride: int

  connect<T extends SignalsOf<RDVertexAttribute>>(
    signal: T,
    method: SignalFunction<RDVertexAttribute[T]>
  ): number
}
