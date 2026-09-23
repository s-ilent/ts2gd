/**
 * [ImageTexture3D] is a 3-dimensional [ImageTexture] that has a width, height, and depth. See also [ImageTextureLayered].
 *
 * 3D textures are typically used to store density maps for [FogMaterial], color correction LUTs for [Environment], vector fields for [GPUParticlesAttractorVectorField3D] and collision maps for [GPUParticlesCollisionSDF3D]. 3D textures can also be used in custom shaders.
 *
 */
declare class ImageTexture3D extends Texture3D {
  /**
   * [ImageTexture3D] is a 3-dimensional [ImageTexture] that has a width, height, and depth. See also [ImageTextureLayered].
   *
   * 3D textures are typically used to store density maps for [FogMaterial], color correction LUTs for [Environment], vector fields for [GPUParticlesAttractorVectorField3D] and collision maps for [GPUParticlesCollisionSDF3D]. 3D textures can also be used in custom shaders.
   *
   */
  new(): ImageTexture3D
  constructor()
  static new(): ImageTexture3D

  /** Creates the [ImageTexture3D] with specified [param format], [param width], [param height], and [param depth]. If [param use_mipmaps] is [code]true[/code], generates mipmaps for the [ImageTexture3D]. */
  create(
    format: int,
    width: int,
    height: int,
    depth: int,
    use_mipmaps: boolean,
    data: Image[]
  ): int

  /** Replaces the texture's existing data with the layers specified in [param data]. The size of [param data] must match the parameters that were used for [method create]. In other words, the texture cannot be resized or have its format changed by calling [method update]. */
  update(data: Image[]): void

  connect<T extends SignalsOf<ImageTexture3D>>(
    signal: T,
    method: SignalFunction<ImageTexture3D[T]>
  ): number
}
