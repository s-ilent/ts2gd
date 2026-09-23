/**
 * This texture class allows you to use a 2D texture created directly on the [RenderingDevice] as a texture for materials, meshes, etc.
 *
 * **Note:** [Texture2DRD] is intended for low-level usage with [RenderingDevice]. For most use cases, use [Texture2D] instead.
 *
 */
declare class Texture2DRD extends Texture2D {
  /**
   * This texture class allows you to use a 2D texture created directly on the [RenderingDevice] as a texture for materials, meshes, etc.
   *
   * **Note:** [Texture2DRD] is intended for low-level usage with [RenderingDevice]. For most use cases, use [Texture2D] instead.
   *
   */
  new(): Texture2DRD
  constructor()
  static new(): Texture2DRD

  /** The RID of the texture object created on the [RenderingDevice]. */
  texture_rd_rid: RID

  connect<T extends SignalsOf<Texture2DRD>>(
    signal: T,
    method: SignalFunction<Texture2DRD[T]>
  ): number
}
