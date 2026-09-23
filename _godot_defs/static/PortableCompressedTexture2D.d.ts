/**
 * This class allows storing compressed textures as self contained (not imported) resources.
 *
 * For 2D usage (compressed on disk, uncompressed on VRAM), the lossy and lossless modes are recommended. For 3D usage (compressed on VRAM) it depends on the target platform.
 *
 * If you intend to only use desktop, S3TC or BPTC are recommended. For only mobile, ETC2 is recommended.
 *
 * For portable, self contained 3D textures that work on both desktop and mobile, Basis Universal is recommended (although it has a small quality cost and longer compression time as a tradeoff).
 *
 * This resource is intended to be created from code.
 *
 */
declare class PortableCompressedTexture2D extends Texture2D {
  /**
   * This class allows storing compressed textures as self contained (not imported) resources.
   *
   * For 2D usage (compressed on disk, uncompressed on VRAM), the lossy and lossless modes are recommended. For 3D usage (compressed on VRAM) it depends on the target platform.
   *
   * If you intend to only use desktop, S3TC or BPTC are recommended. For only mobile, ETC2 is recommended.
   *
   * For portable, self contained 3D textures that work on both desktop and mobile, Basis Universal is recommended (although it has a small quality cost and longer compression time as a tradeoff).
   *
   * This resource is intended to be created from code.
   *
   */
  new(): PortableCompressedTexture2D
  constructor()
  static new(): PortableCompressedTexture2D

  /**
   * If `true`, when running in the editor, this texture will keep the source-compressed data in memory, allowing the data to persist after loading. Otherwise, the source-compressed data is lost after loading and the texture can't be re-saved.
   *
   * **Note:** This property must be set before [method create_from_image] for this to work.
   *
   */
  keep_compressed_buffer: boolean

  /** Allows overriding the texture's size (for 2D only). */
  size_override: Vector2

  /**
   * Initializes the compressed texture from a base image. The compression mode must be provided.
   *
   * [param normal_map] is recommended to ensure optimum quality if this image will be used as a normal map.
   *
   * If lossy compression is requested, the quality setting can optionally be provided. This maps to Lossy WebP compression quality.
   *
   */
  create_from_image(
    image: Image,
    compression_mode: int,
    normal_map?: boolean,
    lossy_quality?: float
  ): void

  /** Return the compression mode used (valid after initialized). */
  get_compression_mode(): int

  /** Return the image format used (valid after initialized). */
  get_format(): int

  /** Returns [code]true[/code] if the flag is overridden for all textures of this type. */
  static is_keeping_all_compressed_buffers(): boolean

  /**
   * Sets the compressor parameters for Basis Universal compression. See also the settings in [ResourceImporterTexture].
   *
   * **Note:** This method must be called before [method create_from_image] for this to work.
   *
   */
  set_basisu_compressor_params(uastc_level: int, rdo_quality_loss: float): void

  /** If [param keep] is [code]true[/code], overrides the flag globally for all textures of this type. This is used primarily by the editor. */
  static set_keep_all_compressed_buffers(keep: boolean): void

  connect<T extends SignalsOf<PortableCompressedTexture2D>>(
    signal: T,
    method: SignalFunction<PortableCompressedTexture2D[T]>
  ): number

  /** No documentation provided. */
  static COMPRESSION_MODE_LOSSLESS: any

  /** No documentation provided. */
  static COMPRESSION_MODE_LOSSY: any

  /** No documentation provided. */
  static COMPRESSION_MODE_BASIS_UNIVERSAL: any

  /** No documentation provided. */
  static COMPRESSION_MODE_S3TC: any

  /** No documentation provided. */
  static COMPRESSION_MODE_ETC2: any

  /** No documentation provided. */
  static COMPRESSION_MODE_BPTC: any

  /** No documentation provided. */
  static COMPRESSION_MODE_ASTC: any
}
