/**
 * Native image datatype. Contains image data which can be converted to an [ImageTexture] and provides commonly used **image processing** methods. The maximum width and height for an [Image] are [constant MAX_WIDTH] and [constant MAX_HEIGHT].
 *
 * An [Image] cannot be assigned to a texture property of an object directly (such as [member Sprite2D.texture]), and has to be converted manually to an [ImageTexture] first.
 *
 * **Note:** Methods that modify the image data cannot be used on VRAM-compressed images. Use [method decompress] to convert the image to an uncompressed format first.
 *
 * **Note:** The maximum image size is 16384×16384 pixels due to graphics hardware limitations. Larger images may fail to import.
 *
 */
declare class Image extends Resource {
  /**
   * Native image datatype. Contains image data which can be converted to an [ImageTexture] and provides commonly used **image processing** methods. The maximum width and height for an [Image] are [constant MAX_WIDTH] and [constant MAX_HEIGHT].
   *
   * An [Image] cannot be assigned to a texture property of an object directly (such as [member Sprite2D.texture]), and has to be converted manually to an [ImageTexture] first.
   *
   * **Note:** Methods that modify the image data cannot be used on VRAM-compressed images. Use [method decompress] to convert the image to an uncompressed format first.
   *
   * **Note:** The maximum image size is 16384×16384 pixels due to graphics hardware limitations. Larger images may fail to import.
   *
   */
  new(): Image
  constructor()
  static new(): Image

  /** Holds all the image's color data in a given format. See [enum Format] constants. */
  data: Dictionary<any, any>

  /** Adjusts this image's [param brightness], [param contrast], and [param saturation] by the given values. Does not work if the image is compressed (see [method is_compressed]). */
  adjust_bcs(brightness: float, contrast: float, saturation: float): void

  /** Alpha-blends [param src_rect] from [param src] image to this image at coordinates [param dst], clipped accordingly to both image bounds. This image and [param src] image [b]must[/b] have the same format. [param src_rect] with non-positive size is treated as empty. */
  blend_rect(src: Image, src_rect: Rect2i, dst: Vector2i): void

  /** Alpha-blends [param src_rect] from [param src] image to this image using [param mask] image at coordinates [param dst], clipped accordingly to both image bounds. Alpha channels are required for both [param src] and [param mask]. [param dst] pixels and [param src] pixels will blend if the corresponding mask pixel's alpha value is not 0. This image and [param src] image [b]must[/b] have the same format. [param src] image and [param mask] image [b]must[/b] have the same size (width and height) but they can have different formats. [param src_rect] with non-positive size is treated as empty. */
  blend_rect_mask(
    src: Image,
    mask: Image,
    src_rect: Rect2i,
    dst: Vector2i
  ): void

  /**
   * Copies [param src_rect] from [param src] image to this image at coordinates [param dst], clipped accordingly to both image bounds. This image and [param src] image **must** have the same format. [param src_rect] with non-positive size is treated as empty.
   *
   * **Note:** The alpha channel data in [param src] will overwrite the corresponding data in this image at the target position. To blend alpha channels, use [method blend_rect] instead.
   *
   */
  blit_rect(src: Image, src_rect: Rect2i, dst: Vector2i): void

  /** Blits [param src_rect] area from [param src] image to this image at the coordinates given by [param dst], clipped accordingly to both image bounds. [param src] pixel is copied onto [param dst] if the corresponding [param mask] pixel's alpha value is not 0. This image and [param src] image [b]must[/b] have the same format. [param src] image and [param mask] image [b]must[/b] have the same size (width and height) but they can have different formats. [param src_rect] with non-positive size is treated as empty. */
  blit_rect_mask(src: Image, mask: Image, src_rect: Rect2i, dst: Vector2i): void

  /** Converts a bump map to a normal map. A bump map provides a height offset per-pixel, while a normal map provides a normal direction per pixel. */
  bump_map_to_normal_map(bump_scale?: float): void

  /** Removes the image's mipmaps. */
  clear_mipmaps(): void

  /**
   * Compresses the image with a VRAM-compressed format to use less memory. Can not directly access pixel data while the image is compressed. Returns error if the chosen compression mode is not available.
   *
   * The [param source] parameter helps to pick the best compression method for DXT and ETC2 formats. It is ignored for ASTC compression.
   *
   * The [param astc_format] parameter is only taken into account when using ASTC compression; it is ignored for all other formats.
   *
   * **Note:** [method compress] is only supported in editor builds. When run in an exported project, this method always returns [constant ERR_UNAVAILABLE].
   *
   */
  compress(mode: int, source?: int, astc_format?: int): int

  /**
   * Compresses the image with a VRAM-compressed format to use less memory. Can not directly access pixel data while the image is compressed. Returns error if the chosen compression mode is not available.
   *
   * This is an alternative to [method compress] that lets the user supply the channels used in order for the compressor to pick the best DXT and ETC2 formats. For other formats (non DXT or ETC2), this argument is ignored.
   *
   * The [param astc_format] parameter is only taken into account when using ASTC compression; it is ignored for all other formats.
   *
   * **Note:** [method compress_from_channels] is only supported in editor builds. When run in an exported project, this method always returns [constant ERR_UNAVAILABLE].
   *
   */
  compress_from_channels(mode: int, channels: int, astc_format?: int): int

  /**
   * Compute image metrics on the current image and the compared image. This can be used to calculate the similarity between two images.
   *
   * The dictionary contains `max`, `mean`, `mean_squared`, `root_mean_squared` and `peak_snr`.
   *
   */
  compute_image_metrics(
    compared_image: Image,
    use_luma: boolean
  ): Dictionary<any, any>

  /** Converts this image's format to the given [param format]. */
  convert(format: int): void

  /** Copies [param src] image to this image. */
  copy_from(src: Image): void

  /** Creates an empty image of the given size and format. If [param use_mipmaps] is [code]true[/code], generates mipmaps for this image (see [method generate_mipmaps]). */
  static create(
    width: int,
    height: int,
    use_mipmaps: boolean,
    format: int
  ): Image

  /** Creates an empty image of the given size and format. If [param use_mipmaps] is [code]true[/code], generates mipmaps for this image (see [method generate_mipmaps]). */
  static create_empty(
    width: int,
    height: int,
    use_mipmaps: boolean,
    format: int
  ): Image

  /** Creates a new image of the given size and format. Fills the image with the given raw data. If [param use_mipmaps] is [code]true[/code], loads the mipmaps for this image from [param data]. See [method generate_mipmaps]. */
  static create_from_data(
    width: int,
    height: int,
    use_mipmaps: boolean,
    format: int,
    data: PackedByteArray
  ): Image

  /** Crops the image to the given [param width] and [param height]. If the specified size is larger than the current size, the extra area is filled with black pixels. */
  crop(width: int, height: int): void

  /** Decompresses the image if it is VRAM-compressed in a supported format. This increases memory utilization, but allows modifying the image. Returns [constant OK] if the format is supported, otherwise [constant ERR_UNAVAILABLE]. All VRAM-compressed formats supported by Godot can be decompressed with this method, except [constant FORMAT_ETC2_R11S], [constant FORMAT_ETC2_RG11S], and [constant FORMAT_ETC2_RGB8A1]. */
  decompress(): int

  /** Returns [constant ALPHA_BLEND] if the image has data for alpha values. Returns [constant ALPHA_BIT] if all the alpha values are stored in a single bit. Returns [constant ALPHA_NONE] if no data for alpha values is found. */
  detect_alpha(): int

  /** Returns the color channels used by this image. If the image is compressed, the original [param source] must be specified. */
  detect_used_channels(source?: int): int

  /** Fills the image with [param color]. */
  fill(color: Color): void

  /** Fills [param rect] with [param color]. */
  fill_rect(rect: Rect2i, color: Color): void

  /** Blends low-alpha pixels with nearby pixels. */
  fix_alpha_edges(): void

  /** Flips the image horizontally. */
  flip_x(): void

  /** Flips the image vertically. */
  flip_y(): void

  /**
   * Generates mipmaps for the image. Mipmaps are precalculated lower-resolution copies of the image that are automatically used if the image needs to be scaled down when rendered. They help improve image quality and performance when rendering. This method returns an error if the image is compressed, in a custom format, or if the image's width/height is `0`. Enabling [param renormalize] when generating mipmaps for normal map textures will make sure all resulting vector values are normalized.
   *
   * It is possible to check if the image has mipmaps by calling [method has_mipmaps] or [method get_mipmap_count]. Calling [method generate_mipmaps] on an image that already has mipmaps will replace existing mipmaps in the image.
   *
   */
  generate_mipmaps(renormalize?: boolean): int

  /** Returns a copy of the image's raw data. */
  get_data(): PackedByteArray

  /** Returns size (in bytes) of the image's raw data. */
  get_data_size(): int

  /** Returns this image's format. */
  get_format(): int

  /** Returns the image's height. */
  get_height(): int

  /** Returns the number of mipmap levels or 0 if the image has no mipmaps. The largest main level image is not counted as a mipmap level by this method, so if you want to include it you can add 1 to this count. */
  get_mipmap_count(): int

  /** Returns the offset where the image's mipmap with index [param mipmap] is stored in the [member data] dictionary. */
  get_mipmap_offset(mipmap: int): int

  /**
   * Returns the color of the pixel at `(x, y)`.
   *
   * This is the same as [method get_pixelv], but with two integer arguments instead of a [Vector2i] argument.
   *
   */
  get_pixel(x: int, y: int): Color

  /**
   * Returns the color of the pixel at [param point].
   *
   * This is the same as [method get_pixel], but with a [Vector2i] argument instead of two integer arguments.
   *
   */
  get_pixelv(point: Vector2i): Color

  /** Returns a new [Image] that is a copy of this [Image]'s area specified with [param region]. */
  get_region(region: Rect2i): Image

  /** Returns the image's size (width and height). */
  get_size(): Vector2i

  /** Returns a [Rect2i] enclosing the visible portion of the image, considering each pixel with a non-zero alpha channel as visible. */
  get_used_rect(): Rect2i

  /** Returns the image's width. */
  get_width(): int

  /** Returns [code]true[/code] if the image has generated mipmaps. */
  has_mipmaps(): boolean

  /** Returns [code]true[/code] if the image is compressed. */
  is_compressed(): boolean

  /** Returns [code]true[/code] if the image has no data. */
  is_empty(): boolean

  /** Returns [code]true[/code] if all the image's pixels have an alpha value of 0. Returns [code]false[/code] if any pixel has an alpha value higher than 0. */
  is_invisible(): boolean

  /** Converts the entire image from linear encoding to nonlinear sRGB encoding by using a lookup table. Only works on images with [constant FORMAT_RGB8] or [constant FORMAT_RGBA8] formats. */
  linear_to_srgb(): void

  /**
   * Loads an image from file [param path]. See [url=$DOCS_URL/tutorials/assets_pipeline/importing_images.html#supported-image-formats]Supported image formats[/url] for a list of supported image formats and limitations.
   *
   * **Warning:** This method should only be used in the editor or in cases when you need to load external images at run-time, such as images located at the `user://` directory, and may not work in exported projects.
   *
   * See also [ImageTexture] description for usage examples.
   *
   */
  load(path: string): int

  /**
   * Loads an image from the binary contents of a BMP file.
   *
   * **Note:** Godot's BMP module doesn't support 16-bit per pixel images. Only 1-bit, 4-bit, 8-bit, 24-bit, and 32-bit per pixel images are supported.
   *
   * **Note:** This method is only available in engine builds with the BMP module enabled. By default, the BMP module is enabled, but it can be disabled at build-time using the `module_bmp_enabled=no` SCons option.
   *
   */
  load_bmp_from_buffer(buffer: PackedByteArray): int

  /**
   * Loads an image from the binary contents of a DDS file.
   *
   * **Note:** This method is only available in engine builds with the DDS module enabled. By default, the DDS module is enabled, but it can be disabled at build-time using the `module_dds_enabled=no` SCons option.
   *
   */
  load_dds_from_buffer(buffer: PackedByteArray): int

  /** Loads an image from the binary contents of an OpenEXR file. */
  load_exr_from_buffer(buffer: PackedByteArray): int

  /** Creates a new [Image] and loads data from the specified file. */
  static load_from_file(path: string): Image

  /** Loads an image from the binary contents of a JPEG file. */
  load_jpg_from_buffer(buffer: PackedByteArray): int

  /**
   * Loads an image from the binary contents of a [url=https://github.com/KhronosGroup/KTX-Software]KTX[/url] file. Unlike most image formats, KTX can store VRAM-compressed data and embed mipmaps.
   *
   * **Note:** Godot's libktx implementation only supports 2D images. Cubemaps, texture arrays, and de-padding are not supported.
   *
   * **Note:** This method is only available in engine builds with the KTX module enabled. By default, the KTX module is enabled, but it can be disabled at build-time using the `module_ktx_enabled=no` SCons option.
   *
   */
  load_ktx_from_buffer(buffer: PackedByteArray): int

  /** Loads an image from the binary contents of a PNG file. */
  load_png_from_buffer(buffer: PackedByteArray): int

  /**
   * Loads an image from the UTF-8 binary contents of an **uncompressed** SVG file (**.svg**).
   *
   * **Note:** Beware when using compressed SVG files (like **.svgz**), they need to be `decompressed` before loading.
   *
   * **Note:** This method is only available in engine builds with the SVG module enabled. By default, the SVG module is enabled, but it can be disabled at build-time using the `module_svg_enabled=no` SCons option.
   *
   */
  load_svg_from_buffer(buffer: PackedByteArray, scale?: float): int

  /**
   * Loads an image from the string contents of an SVG file (**.svg**).
   *
   * **Note:** This method is only available in engine builds with the SVG module enabled. By default, the SVG module is enabled, but it can be disabled at build-time using the `module_svg_enabled=no` SCons option.
   *
   */
  load_svg_from_string(svg_str: string, scale?: float): int

  /**
   * Loads an image from the binary contents of a TGA file.
   *
   * **Note:** This method is only available in engine builds with the TGA module enabled. By default, the TGA module is enabled, but it can be disabled at build-time using the `module_tga_enabled=no` SCons option.
   *
   */
  load_tga_from_buffer(buffer: PackedByteArray): int

  /** Loads an image from the binary contents of a WebP file. */
  load_webp_from_buffer(buffer: PackedByteArray): int

  /** Converts the image's data to represent coordinates on a 3D plane. This is used when the image represents a normal map. A normal map can add lots of detail to a 3D surface without increasing the polygon count. */
  normal_map_to_xy(): void

  /** Multiplies color values with alpha values. Resulting color values for a pixel are [code](color * alpha)/256[/code]. See also [member CanvasItemMaterial.blend_mode]. */
  premultiply_alpha(): void

  /** Resizes the image to the given [param width] and [param height]. New pixels are calculated using the [param interpolation] mode defined via [enum Interpolation] constants. */
  resize(width: int, height: int, interpolation?: int): void

  /** Resizes the image to the nearest power of 2 for the width and height. If [param square] is [code]true[/code], sets width and height to be the same. New pixels are calculated using the [param interpolation] mode defined via [enum Interpolation] constants. */
  resize_to_po2(square?: boolean, interpolation?: int): void

  /** Converts a standard linear RGBE (Red Green Blue Exponent) image to an image that uses nonlinear sRGB encoding. */
  rgbe_to_srgb(): Image

  /** Rotates the image in the specified [param direction] by [code]90[/code] degrees. The width and height of the image must be greater than [code]1[/code]. If the width and height are not equal, the image will be resized. */
  rotate_90(direction: int): void

  /** Rotates the image by [code]180[/code] degrees. The width and height of the image must be greater than [code]1[/code]. */
  rotate_180(): void

  /**
   * Saves the image as a DDS (DirectDraw Surface) file to [param path]. DDS is a container format that can store textures in various compression formats, such as DXT1, DXT5, or BC7. This function will return [constant ERR_UNAVAILABLE] if Godot was compiled without the DDS module.
   *
   * **Note:** The DDS module may be disabled in certain builds, which means [method save_dds] will return [constant ERR_UNAVAILABLE] when it is called from an exported project.
   *
   */
  save_dds(path: string): int

  /**
   * Saves the image as a DDS (DirectDraw Surface) file to a byte array. DDS is a container format that can store textures in various compression formats, such as DXT1, DXT5, or BC7. This function will return an empty byte array if Godot was compiled without the DDS module.
   *
   * **Note:** The DDS module may be disabled in certain builds, which means [method save_dds_to_buffer] will return an empty byte array when it is called from an exported project.
   *
   */
  save_dds_to_buffer(): PackedByteArray

  /** Saves the image as an EXR file to [param path]. If [param grayscale] is [code]true[/code] and the image has only one channel, it will be saved explicitly as monochrome rather than one red channel. This function will return [constant ERR_UNAVAILABLE] if Godot was compiled without the TinyEXR module. */
  save_exr(path: string, grayscale?: boolean): int

  /** Saves the image as an EXR file to a byte array. If [param grayscale] is [code]true[/code] and the image has only one channel, it will be saved explicitly as monochrome rather than one red channel. This function will return an empty byte array if Godot was compiled without the TinyEXR module. */
  save_exr_to_buffer(grayscale?: boolean): PackedByteArray

  /**
   * Saves the image as a JPEG file to [param path] with the specified [param quality] between `0.01` and `1.0` (inclusive). Higher [param quality] values result in better-looking output at the cost of larger file sizes. Recommended [param quality] values are between `0.75` and `0.90`. Even at quality `1.00`, JPEG compression remains lossy.
   *
   * **Note:** JPEG does not save an alpha channel. If the [Image] contains an alpha channel, the image will still be saved, but the resulting JPEG file won't contain the alpha channel.
   *
   */
  save_jpg(path: string, quality?: float): int

  /**
   * Saves the image as a JPEG file to a byte array with the specified [param quality] between `0.01` and `1.0` (inclusive). Higher [param quality] values result in better-looking output at the cost of larger byte array sizes (and therefore memory usage). Recommended [param quality] values are between `0.75` and `0.90`. Even at quality `1.00`, JPEG compression remains lossy.
   *
   * **Note:** JPEG does not save an alpha channel. If the [Image] contains an alpha channel, the image will still be saved, but the resulting byte array won't contain the alpha channel.
   *
   */
  save_jpg_to_buffer(quality?: float): PackedByteArray

  /** Saves the image as a PNG file to the file at [param path]. */
  save_png(path: string): int

  /** Saves the image as a PNG file to a byte array. */
  save_png_to_buffer(): PackedByteArray

  /**
   * Saves the image as a WebP (Web Picture) file to the file at [param path]. By default it will save lossless. If [param lossy] is `true`, the image will be saved lossy, using the [param quality] setting between `0.0` and `1.0` (inclusive). Lossless WebP offers more efficient compression than PNG.
   *
   * **Note:** The WebP format is limited to a size of 16383×16383 pixels, while PNG can save larger images.
   *
   */
  save_webp(path: string, lossy?: boolean, quality?: float): int

  /**
   * Saves the image as a WebP (Web Picture) file to a byte array. By default it will save lossless. If [param lossy] is `true`, the image will be saved lossy, using the [param quality] setting between `0.0` and `1.0` (inclusive). Lossless WebP offers more efficient compression than PNG.
   *
   * **Note:** The WebP format is limited to a size of 16383×16383 pixels, while PNG can save larger images.
   *
   */
  save_webp_to_buffer(lossy?: boolean, quality?: float): PackedByteArray

  /** Overwrites data of an existing [Image]. Non-static equivalent of [method create_from_data]. */
  set_data(
    width: int,
    height: int,
    use_mipmaps: boolean,
    format: int,
    data: PackedByteArray
  ): void

  /**
   * Sets the [Color] of the pixel at `(x, y)` to [param color].
   *
   * @example
   *
   *
   * var img_width = 10
   * var img_height = 5
   * var img = Image.create(img_width, img_height, false, Image.FORMAT_RGBA8)
   * img.set_pixel(1, 2, Color.RED) # Sets the color at (1, 2) to red.
   *
   *
   * int imgWidth = 10;
   * int imgHeight = 5;
   * var img = Image.Create(imgWidth, imgHeight, false, Image.Format.Rgba8);
   * img.SetPixel(1, 2, Colors.Red); // Sets the color at (1, 2) to red.
   *
   * @summary
   *
   *
   * This is the same as [method set_pixelv], but with a two integer arguments instead of a [Vector2i] argument.
   *
   * **Note:** Depending on the image's format, the color set here may be clamped or lose precision. Do not assume the color returned by [method get_pixel] to be identical to the one set here; any comparisons will likely need to use an approximation like [method Color.is_equal_approx].
   *
   * **Note:** On grayscale image formats, only the red channel of [param color] is used (and alpha if relevant). The green and blue channels are ignored.
   *
   */
  set_pixel(x: int, y: int, color: Color): void

  /**
   * Sets the [Color] of the pixel at [param point] to [param color].
   *
   * @example
   *
   *
   * var img_width = 10
   * var img_height = 5
   * var img = Image.create(img_width, img_height, false, Image.FORMAT_RGBA8)
   * img.set_pixelv(Vector2i(1, 2), Color.RED) # Sets the color at (1, 2) to red.
   *
   *
   * int imgWidth = 10;
   * int imgHeight = 5;
   * var img = Image.Create(imgWidth, imgHeight, false, Image.Format.Rgba8);
   * img.SetPixelv(new Vector2I(1, 2), Colors.Red); // Sets the color at (1, 2) to red.
   *
   * @summary
   *
   *
   * This is the same as [method set_pixel], but with a [Vector2i] argument instead of two integer arguments.
   *
   * **Note:** Depending on the image's format, the color set here may be clamped or lose precision. Do not assume the color returned by [method get_pixelv] to be identical to the one set here; any comparisons will likely need to use an approximation like [method Color.is_equal_approx].
   *
   * **Note:** On grayscale image formats, only the red channel of [param color] is used (and alpha if relevant). The green and blue channels are ignored.
   *
   */
  set_pixelv(point: Vector2i, color: Color): void

  /** Shrinks the image by a factor of 2 on each axis (this divides the pixel count by 4). */
  shrink_x2(): void

  /**
   * Converts the raw data from nonlinear sRGB encoding to linear encoding using a lookup table. Only works on images with [constant FORMAT_RGB8] or [constant FORMAT_RGBA8] formats.
   *
   * **Note:** The 8-bit formats required by this method are not suitable for storing linearly encoded values; a significant amount of color information will be lost in darker values. To maintain image quality, this method should not be used.
   *
   */
  srgb_to_linear(): void

  connect<T extends SignalsOf<Image>>(
    signal: T,
    method: SignalFunction<Image[T]>
  ): number

  /**
   * The maximal width allowed for [Image] resources.
   *
   */
  static MAX_WIDTH: any

  /**
   * The maximal height allowed for [Image] resources.
   *
   */
  static MAX_HEIGHT: any

  /**
   * Texture format with a single 8-bit depth representing luminance.
   *
   */
  static FORMAT_L8: any

  /**
   * OpenGL texture format with two values, luminance and alpha each stored with 8 bits.
   *
   */
  static FORMAT_LA8: any

  /**
   * OpenGL texture format `RED` with a single component and a bitdepth of 8.
   *
   */
  static FORMAT_R8: any

  /**
   * OpenGL texture format `RG` with two components and a bitdepth of 8 for each.
   *
   */
  static FORMAT_RG8: any

  /**
   * OpenGL texture format `RGB` with three components, each with a bitdepth of 8.
   *
   * **Note:** When creating an [ImageTexture], a nonlinear sRGB to linear encoding conversion is performed.
   *
   */
  static FORMAT_RGB8: any

  /**
   * OpenGL texture format `RGBA` with four components, each with a bitdepth of 8.
   *
   * **Note:** When creating an [ImageTexture], a nonlinear sRGB to linear encoding conversion is performed.
   *
   */
  static FORMAT_RGBA8: any

  /**
   * OpenGL texture format `RGBA` with four components, each with a bitdepth of 4.
   *
   */
  static FORMAT_RGBA4444: any

  /**
   * OpenGL texture format `RGB` with three components. Red and blue have a bitdepth of 5, and green has a bitdepth of 6.
   *
   */
  static FORMAT_RGB565: any

  /**
   * OpenGL texture format `GL_R32F` where there's one component, a 32-bit floating-point value.
   *
   */
  static FORMAT_RF: any

  /**
   * OpenGL texture format `GL_RG32F` where there are two components, each a 32-bit floating-point values.
   *
   */
  static FORMAT_RGF: any

  /**
   * OpenGL texture format `GL_RGB32F` where there are three components, each a 32-bit floating-point values.
   *
   */
  static FORMAT_RGBF: any

  /**
   * OpenGL texture format `GL_RGBA32F` where there are four components, each a 32-bit floating-point values.
   *
   */
  static FORMAT_RGBAF: any

  /**
   * OpenGL texture format `GL_R16F` where there's one component, a 16-bit "half-precision" floating-point value.
   *
   */
  static FORMAT_RH: any

  /**
   * OpenGL texture format `GL_RG16F` where there are two components, each a 16-bit "half-precision" floating-point value.
   *
   */
  static FORMAT_RGH: any

  /**
   * OpenGL texture format `GL_RGB16F` where there are three components, each a 16-bit "half-precision" floating-point value.
   *
   */
  static FORMAT_RGBH: any

  /**
   * OpenGL texture format `GL_RGBA16F` where there are four components, each a 16-bit "half-precision" floating-point value.
   *
   */
  static FORMAT_RGBAH: any

  /**
   * A special OpenGL texture format where the three color components have 9 bits of precision and all three share a single 5-bit exponent.
   *
   */
  static FORMAT_RGBE9995: any

  /**
   * The [url=https://en.wikipedia.org/wiki/S3_Texture_Compression]S3TC[/url] texture format that uses Block Compression 1, and is the smallest variation of S3TC, only providing 1 bit of alpha and color data being premultiplied with alpha.
   *
   * **Note:** When creating an [ImageTexture], a nonlinear sRGB to linear encoding conversion is performed.
   *
   */
  static FORMAT_DXT1: any

  /**
   * The [url=https://en.wikipedia.org/wiki/S3_Texture_Compression]S3TC[/url] texture format that uses Block Compression 2, and color data is interpreted as not having been premultiplied by alpha. Well suited for images with sharp alpha transitions between translucent and opaque areas.
   *
   * **Note:** When creating an [ImageTexture], a nonlinear sRGB to linear encoding conversion is performed.
   *
   */
  static FORMAT_DXT3: any

  /**
   * The [url=https://en.wikipedia.org/wiki/S3_Texture_Compression]S3TC[/url] texture format also known as Block Compression 3 or BC3 that contains 64 bits of alpha channel data followed by 64 bits of DXT1-encoded color data. Color data is not premultiplied by alpha, same as DXT3. DXT5 generally produces superior results for transparent gradients compared to DXT3.
   *
   * **Note:** When creating an [ImageTexture], a nonlinear sRGB to linear encoding conversion is performed.
   *
   */
  static FORMAT_DXT5: any

  /**
   * Texture format that uses [url=https://www.khronos.org/opengl/wiki/Red_Green_Texture_Compression]Red Green Texture Compression[/url], normalizing the red channel data using the same compression algorithm that DXT5 uses for the alpha channel.
   *
   */
  static FORMAT_RGTC_R: any

  /**
   * Texture format that uses [url=https://www.khronos.org/opengl/wiki/Red_Green_Texture_Compression]Red Green Texture Compression[/url], normalizing the red and green channel data using the same compression algorithm that DXT5 uses for the alpha channel.
   *
   */
  static FORMAT_RGTC_RG: any

  /**
   * Texture format that uses [url=https://www.khronos.org/opengl/wiki/BPTC_Texture_Compression]BPTC[/url] compression with unsigned normalized RGBA components.
   *
   * **Note:** When creating an [ImageTexture], a nonlinear sRGB to linear encoding conversion is performed.
   *
   */
  static FORMAT_BPTC_RGBA: any

  /**
   * Texture format that uses [url=https://www.khronos.org/opengl/wiki/BPTC_Texture_Compression]BPTC[/url] compression with signed floating-point RGB components.
   *
   */
  static FORMAT_BPTC_RGBF: any

  /**
   * Texture format that uses [url=https://www.khronos.org/opengl/wiki/BPTC_Texture_Compression]BPTC[/url] compression with unsigned floating-point RGB components.
   *
   */
  static FORMAT_BPTC_RGBFU: any

  /**
   * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC1]Ericsson Texture Compression format 1[/url], also referred to as "ETC1", and is part of the OpenGL ES graphics standard. This format cannot store an alpha channel.
   *
   */
  static FORMAT_ETC: any

  /**
   * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`R11_EAC` variant), which provides one channel of unsigned data.
   *
   */
  static FORMAT_ETC2_R11: any

  /**
   * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`SIGNED_R11_EAC` variant), which provides one channel of signed data.
   *
   */
  static FORMAT_ETC2_R11S: any

  /**
   * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`RG11_EAC` variant), which provides two channels of unsigned data.
   *
   */
  static FORMAT_ETC2_RG11: any

  /**
   * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`SIGNED_RG11_EAC` variant), which provides two channels of signed data.
   *
   */
  static FORMAT_ETC2_RG11S: any

  /**
   * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`RGB8` variant), which is a follow-up of ETC1 and compresses RGB888 data.
   *
   * **Note:** When creating an [ImageTexture], a nonlinear sRGB to linear encoding conversion is performed.
   *
   */
  static FORMAT_ETC2_RGB8: any

  /**
   * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`RGBA8`variant), which compresses RGBA8888 data with full alpha support.
   *
   * **Note:** When creating an [ImageTexture], a nonlinear sRGB to linear encoding conversion is performed.
   *
   */
  static FORMAT_ETC2_RGBA8: any

  /**
   * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`RGB8_PUNCHTHROUGH_ALPHA1` variant), which compresses RGBA data to make alpha either fully transparent or fully opaque.
   *
   * **Note:** When creating an [ImageTexture], a nonlinear sRGB to linear encoding conversion is performed.
   *
   */
  static FORMAT_ETC2_RGB8A1: any

  /**
   * [url=https://en.wikipedia.org/wiki/Ericsson_Texture_Compression#ETC2_and_EAC]Ericsson Texture Compression format 2[/url] (`RGBA8` variant), which compresses RA data and interprets it as two channels (red and green). See also [constant FORMAT_ETC2_RGBA8].
   *
   */
  static FORMAT_ETC2_RA_AS_RG: any

  /**
   * The [url=https://en.wikipedia.org/wiki/S3_Texture_Compression]S3TC[/url] texture format also known as Block Compression 3 or BC3, which compresses RA data and interprets it as two channels (red and green). See also [constant FORMAT_DXT5].
   *
   */
  static FORMAT_DXT5_RA_AS_RG: any

  /**
   * [url=https://en.wikipedia.org/wiki/Adaptive_scalable_texture_compression]Adaptive Scalable Texture Compression[/url]. This implements the 4×4 (high quality) mode.
   *
   */
  static FORMAT_ASTC_4x4: any

  /**
   * Same format as [constant FORMAT_ASTC_4x4], but with the hint to let the GPU know it is used for HDR.
   *
   */
  static FORMAT_ASTC_4x4_HDR: any

  /**
   * [url=https://en.wikipedia.org/wiki/Adaptive_scalable_texture_compression]Adaptive Scalable Texture Compression[/url]. This implements the 8×8 (low quality) mode.
   *
   */
  static FORMAT_ASTC_8x8: any

  /**
   * Same format as [constant FORMAT_ASTC_8x8], but with the hint to let the GPU know it is used for HDR.
   *
   */
  static FORMAT_ASTC_8x8_HDR: any

  /**
   * OpenGL texture format `GL_R16` where there's one component, a 16-bit unsigned normalized integer value. Since the value is normalized, each component is clamped between `0.0` and `1.0` (inclusive).
   *
   * **Note:** Due to limited hardware support, it is mainly recommended to be used on desktop or console devices. It may be unsupported on mobile or web, and will consequently be converted to [constant FORMAT_RF].
   *
   */
  static FORMAT_R16: any

  /**
   * OpenGL texture format `GL_RG16` where there are two components, each a 16-bit unsigned normalized integer value. Since the value is normalized, each component is clamped between `0.0` and `1.0` (inclusive).
   *
   * **Note:** Due to limited hardware support, it is mainly recommended to be used on desktop or console devices. It may be unsupported on mobile or web, and will consequently be converted to [constant FORMAT_RGF].
   *
   */
  static FORMAT_RG16: any

  /**
   * OpenGL texture format `GL_RGB16` where there are three components, each a 16-bit unsigned normalized integer value. Since the value is normalized, each component is clamped between `0.0` and `1.0` (inclusive).
   *
   * **Note:** Due to limited hardware support, it is mainly recommended to be used on desktop or console devices. It may be unsupported on mobile or web, and will consequently be converted to [constant FORMAT_RGBF].
   *
   */
  static FORMAT_RGB16: any

  /**
   * OpenGL texture format `GL_RGBA16` where there are four components, each a 16-bit unsigned normalized integer value. Since the value is normalized, each component is clamped between `0.0` and `1.0` (inclusive).
   *
   * **Note:** Due to limited hardware support, it is mainly recommended to be used on desktop or console devices. It may be unsupported on mobile or web, and will consequently be converted to [constant FORMAT_RGBAF].
   *
   */
  static FORMAT_RGBA16: any

  /**
   * OpenGL texture format `GL_R16UI` where there's one component, a 16-bit unsigned integer value. Each component is clamped between `0` and `65535` (inclusive).
   *
   * **Note:** When used in a shader, the texture requires usage of `usampler` samplers. Additionally, it only supports nearest-neighbor filtering under the Compatibility renderer.
   *
   * **Note:** When sampling using [method Image.get_pixel], returned [Color]s have to be divided by `65535` to get the correct color value.
   *
   */
  static FORMAT_R16I: any

  /**
   * OpenGL texture format `GL_RG16UI` where there are two components, each a 16-bit unsigned integer value. Each component is clamped between `0` and `65535` (inclusive).
   *
   * **Note:** When used in a shader, the texture requires usage of `usampler` samplers. Additionally, it only supports nearest-neighbor filtering under the Compatibility renderer.
   *
   * **Note:** When sampling using [method Image.get_pixel], returned [Color]s have to be divided by `65535` to get the correct color value.
   *
   */
  static FORMAT_RG16I: any

  /**
   * OpenGL texture format `GL_RGB16UI` where there are three components, each a 16-bit unsigned integer value. Each component is clamped between `0` and `65535` (inclusive).
   *
   * **Note:** When used in a shader, the texture requires usage of `usampler` samplers. Additionally, it only supports nearest-neighbor filtering under the Compatibility renderer.
   *
   * **Note:** When sampling using [method Image.get_pixel], returned [Color]s have to be divided by `65535` to get the correct color value.
   *
   */
  static FORMAT_RGB16I: any

  /**
   * OpenGL texture format `GL_RGBA16UI` where there are four components, each a 16-bit unsigned integer value. Each component is clamped between `0` and `65535` (inclusive).
   *
   * **Note:** When used in a shader, the texture requires usage of `usampler` samplers. Additionally, it only supports nearest-neighbor filtering under the Compatibility renderer.
   *
   * **Note:** When sampling using [method Image.get_pixel], returned [Color]s have to be divided by `65535` to get the correct color value.
   *
   */
  static FORMAT_RGBA16I: any

  /**
   * Represents the size of the [enum Format] enum.
   *
   */
  static FORMAT_MAX: any

  /**
   * Performs nearest-neighbor interpolation. If the image is resized, it will be pixelated.
   *
   */
  static INTERPOLATE_NEAREST: any

  /**
   * Performs bilinear interpolation. If the image is resized, it will be blurry. This mode is faster than [constant INTERPOLATE_CUBIC], but it results in lower quality.
   *
   */
  static INTERPOLATE_BILINEAR: any

  /**
   * Performs cubic interpolation. If the image is resized, it will be blurry. This mode often gives better results compared to [constant INTERPOLATE_BILINEAR], at the cost of being slower.
   *
   */
  static INTERPOLATE_CUBIC: any

  /**
   * Performs bilinear separately on the two most-suited mipmap levels, then linearly interpolates between them.
   *
   * It's slower than [constant INTERPOLATE_BILINEAR], but produces higher-quality results with far fewer aliasing artifacts.
   *
   * If the image does not have mipmaps, they will be generated and used internally, but no mipmaps will be generated on the resulting image.
   *
   * **Note:** If you intend to scale multiple copies of the original image, it's better to call [method generate_mipmaps]] on it in advance, to avoid wasting processing power in generating them again and again.
   *
   * On the other hand, if the image already has mipmaps, they will be used, and a new set will be generated for the resulting image.
   *
   */
  static INTERPOLATE_TRILINEAR: any

  /**
   * Performs Lanczos interpolation. This is the slowest image resizing mode, but it typically gives the best results, especially when downscaling images.
   *
   */
  static INTERPOLATE_LANCZOS: any

  /**
   * Image is fully opaque. It does not store alpha data.
   *
   */
  static ALPHA_NONE: any

  /**
   * Image stores either fully opaque or fully transparent pixels. Also known as punchthrough alpha.
   *
   */
  static ALPHA_BIT: any

  /**
   * Image stores alpha data with values varying between `0.0` and `1.0`.
   *
   */
  static ALPHA_BLEND: any

  /**
   * Use S3TC compression.
   *
   */
  static COMPRESS_S3TC: any

  /**
   * Use ETC compression.
   *
   */
  static COMPRESS_ETC: any

  /**
   * Use ETC2 compression.
   *
   */
  static COMPRESS_ETC2: any

  /**
   * Use BPTC compression.
   *
   */
  static COMPRESS_BPTC: any

  /**
   * Use ASTC compression.
   *
   */
  static COMPRESS_ASTC: any

  /**
   * Represents the size of the [enum CompressMode] enum.
   *
   */
  static COMPRESS_MAX: any

  /**
   * The image only uses one channel for luminance (grayscale).
   *
   */
  static USED_CHANNELS_L: any

  /**
   * The image uses two channels for luminance and alpha, respectively.
   *
   */
  static USED_CHANNELS_LA: any

  /**
   * The image only uses the red channel.
   *
   */
  static USED_CHANNELS_R: any

  /**
   * The image uses two channels for red and green.
   *
   */
  static USED_CHANNELS_RG: any

  /**
   * The image uses three channels for red, green, and blue.
   *
   */
  static USED_CHANNELS_RGB: any

  /**
   * The image uses four channels for red, green, blue, and alpha.
   *
   */
  static USED_CHANNELS_RGBA: any

  /**
   * Source texture (before compression) is a regular texture. Default for all textures.
   *
   */
  static COMPRESS_SOURCE_GENERIC: any

  /**
   * Source texture (before compression) uses nonlinear sRGB encoding.
   *
   */
  static COMPRESS_SOURCE_SRGB: any

  /**
   * Source texture (before compression) is a normal texture (e.g. it can be compressed into two channels).
   *
   */
  static COMPRESS_SOURCE_NORMAL: any

  /**
   * Hint to indicate that the high quality 4×4 ASTC compression format should be used.
   *
   */
  static ASTC_FORMAT_4x4: any

  /**
   * Hint to indicate that the low quality 8×8 ASTC compression format should be used.
   *
   */
  static ASTC_FORMAT_8x8: any
}
