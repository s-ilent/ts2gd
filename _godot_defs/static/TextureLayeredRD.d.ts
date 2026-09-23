/**
 * Base class for [Texture2DArrayRD], [TextureCubemapRD] and [TextureCubemapArrayRD]. Cannot be used directly, but contains all the functions necessary for accessing the derived resource types.
 *
 * **Note:** [TextureLayeredRD] is intended for low-level usage with [RenderingDevice]. For most use cases, use [TextureLayered] instead.
 *
 */
declare class TextureLayeredRD extends TextureLayered {
  /**
   * Base class for [Texture2DArrayRD], [TextureCubemapRD] and [TextureCubemapArrayRD]. Cannot be used directly, but contains all the functions necessary for accessing the derived resource types.
   *
   * **Note:** [TextureLayeredRD] is intended for low-level usage with [RenderingDevice]. For most use cases, use [TextureLayered] instead.
   *
   */
  new(): TextureLayeredRD
  constructor()
  static new(): TextureLayeredRD

  /** The RID of the texture object created on the [RenderingDevice]. */
  texture_rd_rid: RID

  connect<T extends SignalsOf<TextureLayeredRD>>(
    signal: T,
    method: SignalFunction<TextureLayeredRD[T]>
  ): number
}
