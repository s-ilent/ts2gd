/**
 * This texture array class allows you to use a 2D array texture created directly on the [RenderingDevice] as a texture for materials, meshes, etc.
 *
 * **Note:** [Texture2DArrayRD] is intended for low-level usage with [RenderingDevice]. For most use cases, use [Texture2DArray] instead.
 *
 */
declare class Texture2DArrayRD extends TextureLayeredRD {
  /**
   * This texture array class allows you to use a 2D array texture created directly on the [RenderingDevice] as a texture for materials, meshes, etc.
   *
   * **Note:** [Texture2DArrayRD] is intended for low-level usage with [RenderingDevice]. For most use cases, use [Texture2DArray] instead.
   *
   */
  new(): Texture2DArrayRD
  constructor()
  static new(): Texture2DArrayRD

  connect<T extends SignalsOf<Texture2DArrayRD>>(
    signal: T,
    method: SignalFunction<Texture2DArrayRD[T]>
  ): number
}
