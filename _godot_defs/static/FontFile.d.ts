/**
 * [FontFile] contains a set of glyphs to represent Unicode characters imported from a font file, as well as a cache of rasterized glyphs, and a set of fallback [Font]s to use.
 *
 * Use [FontVariation] to access specific OpenType variation of the font, create simulated bold / slanted version, and draw lines of text.
 *
 * For more complex text processing, use [FontVariation] in conjunction with [TextLine] or [TextParagraph].
 *
 * Supported font formats:
 *
 * - Dynamic font importer: TrueType (.ttf), TrueType collection (.ttc), OpenType (.otf), OpenType collection (.otc), WOFF (.woff), WOFF2 (.woff2), Type 1 (.pfb, .pfm).
 *
 * - Bitmap font importer: AngelCode BMFont (.fnt, .font), text and binary (version 3) format variants.
 *
 * - Monospace image font importer: All supported image formats.
 *
 * **Note:** A character is a symbol that represents an item (letter, digit etc.) in an abstract way.
 *
 * **Note:** A glyph is a bitmap or a shape used to draw one or more characters in a context-dependent manner. Glyph indices are bound to the specific font data source.
 *
 * **Note:** If none of the font data sources contain glyphs for a character used in a string, the character in question will be replaced with a box displaying its hexadecimal code.
 *
 * @example
 *
 *
 * var f = load("res://BarlowCondensed-Bold.ttf")
 * $Label.add_theme_font_override("font", f)
 * $Label.add_theme_font_size_override("font_size", 64)
 *
 *
 * var f = ResourceLoader.Load<FontFile>("res://BarlowCondensed-Bold.ttf");
 * GetNode("Label").AddThemeFontOverride("font", f);
 * GetNode("Label").AddThemeFontSizeOverride("font_size", 64);
 *
 * @summary
 *
 *
 */
declare class FontFile extends Font {
  /**
   * [FontFile] contains a set of glyphs to represent Unicode characters imported from a font file, as well as a cache of rasterized glyphs, and a set of fallback [Font]s to use.
   *
   * Use [FontVariation] to access specific OpenType variation of the font, create simulated bold / slanted version, and draw lines of text.
   *
   * For more complex text processing, use [FontVariation] in conjunction with [TextLine] or [TextParagraph].
   *
   * Supported font formats:
   *
   * - Dynamic font importer: TrueType (.ttf), TrueType collection (.ttc), OpenType (.otf), OpenType collection (.otc), WOFF (.woff), WOFF2 (.woff2), Type 1 (.pfb, .pfm).
   *
   * - Bitmap font importer: AngelCode BMFont (.fnt, .font), text and binary (version 3) format variants.
   *
   * - Monospace image font importer: All supported image formats.
   *
   * **Note:** A character is a symbol that represents an item (letter, digit etc.) in an abstract way.
   *
   * **Note:** A glyph is a bitmap or a shape used to draw one or more characters in a context-dependent manner. Glyph indices are bound to the specific font data source.
   *
   * **Note:** If none of the font data sources contain glyphs for a character used in a string, the character in question will be replaced with a box displaying its hexadecimal code.
   *
   * @example
   *
   *
   * var f = load("res://BarlowCondensed-Bold.ttf")
   * $Label.add_theme_font_override("font", f)
   * $Label.add_theme_font_size_override("font_size", 64)
   *
   *
   * var f = ResourceLoader.Load<FontFile>("res://BarlowCondensed-Bold.ttf");
   * GetNode("Label").AddThemeFontOverride("font", f);
   * GetNode("Label").AddThemeFontSizeOverride("font_size", 64);
   *
   * @summary
   *
   *
   */
  new(): FontFile
  constructor()
  static new(): FontFile

  /** If set to [code]true[/code], system fonts can be automatically used as fallbacks. */
  allow_system_fallback: boolean

  /** Font anti-aliasing mode. */
  antialiasing: int

  /** Contents of the dynamic font source file. */
  data: PackedByteArray

  /** If set to [code]true[/code], embedded font bitmap loading is disabled (bitmap-only and color fonts ignore this property). */
  disable_embedded_bitmaps: boolean

  /** Font size, used only for the bitmap fonts. */
  fixed_size: int

  /** Scaling mode, used only for the bitmap fonts with [member fixed_size] greater than zero. */
  fixed_size_scale_mode: int

  /** Font family name. */
  font_name: string

  /** Font stretch amount, compared to a normal width. A percentage value between [code]50%[/code] and [code]200%[/code]. */
  font_stretch: int

  /** Font style flags. */
  font_style: int

  /** Weight (boldness) of the font. A value in the [code]100...999[/code] range, normal font weight is [code]400[/code], bold font weight is [code]700[/code]. */
  font_weight: int

  /** If set to [code]true[/code], auto-hinting is supported and preferred over font built-in hinting. Used by dynamic fonts only (MSDF fonts don't support hinting). */
  force_autohinter: boolean

  /** If set to [code]true[/code], generate mipmaps for the font textures. */
  generate_mipmaps: boolean

  /** Font hinting mode. Used by dynamic fonts only. */
  hinting: int

  /** If set to [code]true[/code], when aligning glyphs to the pixel boundaries rounding remainders are accumulated to ensure more uniform glyph distribution. This setting has no effect if subpixel positioning is enabled. */
  keep_rounding_remainders: boolean

  /** If set to [code]true[/code], color modulation is applied when drawing colored glyphs, otherwise it's applied to the monochrome glyphs only. */
  modulate_color_glyphs: boolean

  /** The width of the range around the shape between the minimum and maximum representable signed distance. If using font outlines, [member msdf_pixel_range] must be set to at least [i]twice[/i] the size of the largest font outline. The default [member msdf_pixel_range] value of [code]16[/code] allows outline sizes up to [code]8[/code] to look correct. */
  msdf_pixel_range: int

  /** Source font size used to generate MSDF textures. Higher values allow for more precision, but are slower to render and require more memory. Only increase this value if you notice a visible lack of precision in glyph rendering. */
  msdf_size: int

  /**
   * If set to `true`, glyphs of all sizes are rendered using single multichannel signed distance field (MSDF) generated from the dynamic font vector data. Since this approach does not rely on rasterizing the font every time its size changes, this allows for resizing the font in real-time without any performance penalty. Text will also not look grainy for [Control]s that are scaled down (or for [Label3D]s viewed from a long distance). As a downside, font hinting is not available with MSDF. The lack of font hinting may result in less crisp and less readable fonts at small sizes.
   *
   * **Note:** If using font outlines, [member msdf_pixel_range] must be set to at least **twice** the size of the largest font outline.
   *
   * **Note:** MSDF font rendering does not render glyphs with overlapping shapes correctly. Overlapping shapes are not valid per the OpenType standard, but are still commonly found in many font files, especially those converted by Google Fonts. To avoid issues with overlapping glyphs, consider downloading the font file directly from the type foundry instead of relying on Google Fonts.
   *
   */
  multichannel_signed_distance_field: boolean

  /** Font OpenType feature set override. */
  opentype_feature_overrides: Dictionary<any, any>

  /** If set to a positive value, overrides the oversampling factor of the viewport this font is used in. See [member Viewport.oversampling]. This value doesn't override the [code skip-lint]oversampling[/code] parameter of [code skip-lint]draw_*[/code] methods. */
  oversampling: float

  /** Font style name. */
  style_name: string

  /** Font glyph subpixel positioning mode. Subpixel positioning provides shaper text and better kerning for smaller font sizes, at the cost of higher memory usage and lower font rasterization speed. Use [constant TextServer.SUBPIXEL_POSITIONING_AUTO] to automatically enable it based on the font size. */
  subpixel_positioning: int

  /** Removes all font cache entries. */
  clear_cache(): void

  /**
   * Removes all rendered glyph information from the cache entry.
   *
   * **Note:** This function will not remove textures associated with the glyphs, use [method remove_texture] to remove them manually.
   *
   */
  clear_glyphs(cache_index: int, size: Vector2i): void

  /** Removes all kerning overrides. */
  clear_kerning_map(cache_index: int, size: int): void

  /** Removes all font sizes from the cache entry. */
  clear_size_cache(cache_index: int): void

  /**
   * Removes all textures from font cache entry.
   *
   * **Note:** This function will not remove glyphs associated with the texture, use [method remove_glyph] to remove them manually.
   *
   */
  clear_textures(cache_index: int, size: Vector2i): void

  /** Returns the font ascent (number of pixels above the baseline). */
  get_cache_ascent(cache_index: int, size: int): float

  /** Returns number of the font cache entries. */
  get_cache_count(): int

  /** Returns the font descent (number of pixels below the baseline). */
  get_cache_descent(cache_index: int, size: int): float

  /** Returns scaling factor of the color bitmap font. */
  get_cache_scale(cache_index: int, size: int): float

  /** Returns pixel offset of the underline below the baseline. */
  get_cache_underline_position(cache_index: int, size: int): float

  /** Returns thickness of the underline in pixels. */
  get_cache_underline_thickness(cache_index: int, size: int): float

  /** Returns character code associated with [param glyph_index], or [code]0[/code] if [param glyph_index] is invalid. See [method get_glyph_index]. */
  get_char_from_glyph_index(size: int, glyph_index: int): int

  /** Returns embolden strength, if is not equal to zero, emboldens the font outlines. Negative values reduce the outline thickness. */
  get_embolden(cache_index: int): float

  /** Returns extra baseline offset (as a fraction of font height). */
  get_extra_baseline_offset(cache_index: int): float

  /** Returns spacing for [param spacing] in pixels (not relative to the font size). */
  get_extra_spacing(cache_index: int, spacing: int): int

  /** Returns an active face index in the TrueType / OpenType collection. */
  get_face_index(cache_index: int): int

  /**
   * Returns glyph advance (offset of the next glyph).
   *
   * **Note:** Advance for glyphs outlines is the same as the base glyph advance and is not saved.
   *
   */
  get_glyph_advance(cache_index: int, size: int, glyph: int): Vector2

  /** Returns the glyph index of a [param char], optionally modified by the [param variation_selector]. */
  get_glyph_index(size: int, char: int, variation_selector: int): int

  /** Returns list of rendered glyphs in the cache entry. */
  get_glyph_list(cache_index: int, size: Vector2i): PackedInt32Array

  /** Returns glyph offset from the baseline. */
  get_glyph_offset(cache_index: int, size: Vector2i, glyph: int): Vector2

  /** Returns glyph size. */
  get_glyph_size(cache_index: int, size: Vector2i, glyph: int): Vector2

  /** Returns index of the cache texture containing the glyph. */
  get_glyph_texture_idx(cache_index: int, size: Vector2i, glyph: int): int

  /** Returns rectangle in the cache texture containing the glyph. */
  get_glyph_uv_rect(cache_index: int, size: Vector2i, glyph: int): Rect2

  /** Returns kerning for the pair of glyphs. */
  get_kerning(cache_index: int, size: int, glyph_pair: Vector2i): Vector2

  /** Returns list of the kerning overrides. */
  get_kerning_list(cache_index: int, size: int): Vector2i[]

  /** Returns [code]true[/code] if support override is enabled for the [param language]. */
  get_language_support_override(language: string): boolean

  /** Returns list of language support overrides. */
  get_language_support_overrides(): PackedStringArray

  /** Returns [code]true[/code] if support override is enabled for the [param script]. */
  get_script_support_override(script: string): boolean

  /** Returns list of script support overrides. */
  get_script_support_overrides(): PackedStringArray

  /** Returns list of the font sizes in the cache. Each size is [Vector2i] with font size and outline size. */
  get_size_cache_list(cache_index: int): Vector2i[]

  /** Returns number of textures used by font cache entry. */
  get_texture_count(cache_index: int, size: Vector2i): int

  /** Returns a copy of the font cache texture image. */
  get_texture_image(cache_index: int, size: Vector2i, texture_index: int): Image

  /** Returns a copy of the array containing glyph packing data. */
  get_texture_offsets(
    cache_index: int,
    size: Vector2i,
    texture_index: int
  ): PackedInt32Array

  /** Returns 2D transform, applied to the font outlines, can be used for slanting, flipping and rotating glyphs. */
  get_transform(cache_index: int): Transform2D

  /** Returns variation coordinates for the specified font cache entry. See [method Font.get_supported_variation_list] for more info. */
  get_variation_coordinates(cache_index: int): Dictionary<any, any>

  /**
   * Loads an AngelCode BMFont (.fnt, .font) bitmap font from file [param path].
   *
   * **Warning:** This method should only be used in the editor or in cases when you need to load external fonts at run-time, such as fonts located at the `user://` directory.
   *
   */
  load_bitmap_font(path: string): int

  /**
   * Loads a TrueType (.ttf), OpenType (.otf), WOFF (.woff), WOFF2 (.woff2) or Type 1 (.pfb, .pfm) dynamic font from file [param path].
   *
   * **Warning:** This method should only be used in the editor or in cases when you need to load external fonts at run-time, such as fonts located at the `user://` directory.
   *
   */
  load_dynamic_font(path: string): int

  /** Removes specified font cache entry. */
  remove_cache(cache_index: int): void

  /**
   * Removes specified rendered glyph information from the cache entry.
   *
   * **Note:** This function will not remove textures associated with the glyphs, use [method remove_texture] to remove them manually.
   *
   */
  remove_glyph(cache_index: int, size: Vector2i, glyph: int): void

  /** Removes kerning override for the pair of glyphs. */
  remove_kerning(cache_index: int, size: int, glyph_pair: Vector2i): void

  /** Remove language support override. */
  remove_language_support_override(language: string): void

  /** Removes script support override. */
  remove_script_support_override(script: string): void

  /** Removes specified font size from the cache entry. */
  remove_size_cache(cache_index: int, size: Vector2i): void

  /**
   * Removes specified texture from the cache entry.
   *
   * **Note:** This function will not remove glyphs associated with the texture. Remove them manually using [method remove_glyph].
   *
   */
  remove_texture(cache_index: int, size: Vector2i, texture_index: int): void

  /** Renders specified glyph to the font cache texture. */
  render_glyph(cache_index: int, size: Vector2i, index: int): void

  /** Renders the range of characters to the font cache texture. */
  render_range(cache_index: int, size: Vector2i, start: int, end: int): void

  /** Sets the font ascent (number of pixels above the baseline). */
  set_cache_ascent(cache_index: int, size: int, ascent: float): void

  /** Sets the font descent (number of pixels below the baseline). */
  set_cache_descent(cache_index: int, size: int, descent: float): void

  /** Sets scaling factor of the color bitmap font. */
  set_cache_scale(cache_index: int, size: int, scale: float): void

  /** Sets pixel offset of the underline below the baseline. */
  set_cache_underline_position(
    cache_index: int,
    size: int,
    underline_position: float
  ): void

  /** Sets thickness of the underline in pixels. */
  set_cache_underline_thickness(
    cache_index: int,
    size: int,
    underline_thickness: float
  ): void

  /** Sets embolden strength, if is not equal to zero, emboldens the font outlines. Negative values reduce the outline thickness. */
  set_embolden(cache_index: int, strength: float): void

  /** Sets extra baseline offset (as a fraction of font height). */
  set_extra_baseline_offset(cache_index: int, baseline_offset: float): void

  /** Sets the spacing for [param spacing] to [param value] in pixels (not relative to the font size). */
  set_extra_spacing(cache_index: int, spacing: int, value: int): void

  /** Sets an active face index in the TrueType / OpenType collection. */
  set_face_index(cache_index: int, face_index: int): void

  /**
   * Sets glyph advance (offset of the next glyph).
   *
   * **Note:** Advance for glyphs outlines is the same as the base glyph advance and is not saved.
   *
   */
  set_glyph_advance(
    cache_index: int,
    size: int,
    glyph: int,
    advance: Vector2
  ): void

  /** Sets glyph offset from the baseline. */
  set_glyph_offset(
    cache_index: int,
    size: Vector2i,
    glyph: int,
    offset: Vector2
  ): void

  /** Sets glyph size. */
  set_glyph_size(
    cache_index: int,
    size: Vector2i,
    glyph: int,
    gl_size: Vector2
  ): void

  /** Sets index of the cache texture containing the glyph. */
  set_glyph_texture_idx(
    cache_index: int,
    size: Vector2i,
    glyph: int,
    texture_idx: int
  ): void

  /** Sets rectangle in the cache texture containing the glyph. */
  set_glyph_uv_rect(
    cache_index: int,
    size: Vector2i,
    glyph: int,
    uv_rect: Rect2
  ): void

  /** Sets kerning for the pair of glyphs. */
  set_kerning(
    cache_index: int,
    size: int,
    glyph_pair: Vector2i,
    kerning: Vector2
  ): void

  /** Adds override for [method Font.is_language_supported]. */
  set_language_support_override(language: string, supported: boolean): void

  /** Adds override for [method Font.is_script_supported]. */
  set_script_support_override(script: string, supported: boolean): void

  /** Sets font cache texture image. */
  set_texture_image(
    cache_index: int,
    size: Vector2i,
    texture_index: int,
    image: Image
  ): void

  /** Sets array containing glyph packing data. */
  set_texture_offsets(
    cache_index: int,
    size: Vector2i,
    texture_index: int,
    offset: PackedInt32Array
  ): void

  /** Sets 2D transform, applied to the font outlines, can be used for slanting, flipping, and rotating glyphs. */
  set_transform(cache_index: int, transform: Transform2D): void

  /** Sets variation coordinates for the specified font cache entry. See [method Font.get_supported_variation_list] for more info. */
  set_variation_coordinates(
    cache_index: int,
    variation_coordinates: Dictionary<any, any>
  ): void

  connect<T extends SignalsOf<FontFile>>(
    signal: T,
    method: SignalFunction<FontFile[T]>
  ): number
}
