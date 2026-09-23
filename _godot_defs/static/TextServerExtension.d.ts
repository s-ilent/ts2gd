/**
 * External [TextServer] implementations should inherit from this class.
 *
 */
declare class TextServerExtension extends TextServer {
  /**
   * External [TextServer] implementations should inherit from this class.
   *
   */
  new(): TextServerExtension
  constructor()
  static new(): TextServerExtension

  /** This method is called before text server is unregistered. */
  protected _cleanup(): void

  /** Creates a new, empty font cache entry resource. */
  protected _create_font(): RID

  /**
   * Optional, implement if font supports extra spacing or baseline offset.
   *
   * Creates a new variation existing font which is reusing the same glyph cache and font data.
   *
   */
  protected _create_font_linked_variation(font_rid: RID): RID

  /** Creates a new buffer for complex text layout, with the given [param direction] and [param orientation]. */
  protected _create_shaped_text(direction: int, orientation: int): RID

  /** Draws box displaying character hexadecimal code. */
  protected _draw_hex_code_box(
    canvas: RID,
    size: int,
    pos: Vector2,
    index: int,
    color: Color
  ): void

  /** Removes all rendered glyph information from the cache entry. */
  protected _font_clear_glyphs(font_rid: RID, size: Vector2i): void

  /** Removes all kerning overrides. */
  protected _font_clear_kerning_map(font_rid: RID, size: int): void

  /** Removes all font sizes from the cache entry. */
  protected _font_clear_size_cache(font_rid: RID): void

  /** Frees all automatically loaded system fonts. */
  protected _font_clear_system_fallback_cache(): void

  /** Removes all textures from font cache entry. */
  protected _font_clear_textures(font_rid: RID, size: Vector2i): void

  /** Draws single glyph into a canvas item at the position, using [param font_rid] at the size [param size]. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  protected _font_draw_glyph(
    font_rid: RID,
    canvas: RID,
    size: int,
    pos: Vector2,
    index: int,
    color: Color,
    oversampling: float
  ): void

  /** Draws single glyph outline of size [param outline_size] into a canvas item at the position, using [param font_rid] at the size [param size]. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  protected _font_draw_glyph_outline(
    font_rid: RID,
    canvas: RID,
    size: int,
    outline_size: int,
    pos: Vector2,
    index: int,
    color: Color,
    oversampling: float
  ): void

  /** Returns font anti-aliasing mode. */
  protected _font_get_antialiasing(font_rid: RID): int

  /** Returns the font ascent (number of pixels above the baseline). */
  protected _font_get_ascent(font_rid: RID, size: int): float

  /** Returns extra baseline offset (as a fraction of font height). */
  protected _font_get_baseline_offset(font_rid: RID): float

  /** Returns character code associated with [param glyph_index], or [code]0[/code] if [param glyph_index] is invalid. */
  protected _font_get_char_from_glyph_index(
    font_rid: RID,
    size: int,
    glyph_index: int
  ): int

  /** Returns the font descent (number of pixels below the baseline). */
  protected _font_get_descent(font_rid: RID, size: int): float

  /** Returns whether the font's embedded bitmap loading is disabled. */
  protected _font_get_disable_embedded_bitmaps(font_rid: RID): boolean

  /** Returns font embolden strength. */
  protected _font_get_embolden(font_rid: RID): float

  /** Returns number of faces in the TrueType / OpenType collection. */
  protected _font_get_face_count(font_rid: RID): int

  /** Returns an active face index in the TrueType / OpenType collection. */
  protected _font_get_face_index(font_rid: RID): int

  /** Returns bitmap font fixed size. */
  protected _font_get_fixed_size(font_rid: RID): int

  /** Returns bitmap font scaling mode. */
  protected _font_get_fixed_size_scale_mode(font_rid: RID): int

  /** Returns [code]true[/code] if font texture mipmap generation is enabled. */
  protected _font_get_generate_mipmaps(font_rid: RID): boolean

  /** Returns the font oversampling factor, shared by all fonts in the TextServer. */
  protected _font_get_global_oversampling(): float

  /** Returns glyph advance (offset of the next glyph). */
  protected _font_get_glyph_advance(
    font_rid: RID,
    size: int,
    glyph: int
  ): Vector2

  /** Returns outline contours of the glyph. */
  protected _font_get_glyph_contours(
    font_rid: RID,
    size: int,
    index: int
  ): Dictionary<any, any>

  /** Returns the glyph index of a [param char], optionally modified by the [param variation_selector]. */
  protected _font_get_glyph_index(
    font_rid: RID,
    size: int,
    char: int,
    variation_selector: int
  ): int

  /** Returns list of rendered glyphs in the cache entry. */
  protected _font_get_glyph_list(
    font_rid: RID,
    size: Vector2i
  ): PackedInt32Array

  /** Returns glyph offset from the baseline. */
  protected _font_get_glyph_offset(
    font_rid: RID,
    size: Vector2i,
    glyph: int
  ): Vector2

  /** Returns size of the glyph. */
  protected _font_get_glyph_size(
    font_rid: RID,
    size: Vector2i,
    glyph: int
  ): Vector2

  /** Returns index of the cache texture containing the glyph. */
  protected _font_get_glyph_texture_idx(
    font_rid: RID,
    size: Vector2i,
    glyph: int
  ): int

  /** Returns resource ID of the cache texture containing the glyph. */
  protected _font_get_glyph_texture_rid(
    font_rid: RID,
    size: Vector2i,
    glyph: int
  ): RID

  /** Returns size of the cache texture containing the glyph. */
  protected _font_get_glyph_texture_size(
    font_rid: RID,
    size: Vector2i,
    glyph: int
  ): Vector2

  /** Returns rectangle in the cache texture containing the glyph. */
  protected _font_get_glyph_uv_rect(
    font_rid: RID,
    size: Vector2i,
    glyph: int
  ): Rect2

  /** Returns the font hinting mode. Used by dynamic fonts only. */
  protected _font_get_hinting(font_rid: RID): int

  /** Returns glyph position rounding behavior. If set to [code]true[/code], when aligning glyphs to the pixel boundaries rounding remainders are accumulated to ensure more uniform glyph distribution. This setting has no effect if subpixel positioning is enabled. */
  protected _font_get_keep_rounding_remainders(font_rid: RID): boolean

  /** Returns kerning for the pair of glyphs. */
  protected _font_get_kerning(
    font_rid: RID,
    size: int,
    glyph_pair: Vector2i
  ): Vector2

  /** Returns list of the kerning overrides. */
  protected _font_get_kerning_list(font_rid: RID, size: int): Vector2i[]

  /** Returns [code]true[/code] if support override is enabled for the [param language]. */
  protected _font_get_language_support_override(
    font_rid: RID,
    language: string
  ): boolean

  /** Returns list of language support overrides. */
  protected _font_get_language_support_overrides(
    font_rid: RID
  ): PackedStringArray

  /** Returns the width of the range around the shape between the minimum and maximum representable signed distance. */
  protected _font_get_msdf_pixel_range(font_rid: RID): int

  /** Returns source font size used to generate MSDF textures. */
  protected _font_get_msdf_size(font_rid: RID): int

  /** Returns font family name. */
  protected _font_get_name(font_rid: RID): string

  /** Returns font OpenType feature set override. */
  protected _font_get_opentype_feature_overrides(
    font_rid: RID
  ): Dictionary<any, any>

  /** Returns [Dictionary] with OpenType font name strings (localized font names, version, description, license information, sample text, etc.). */
  protected _font_get_ot_name_strings(font_rid: RID): Dictionary<any, any>

  /** Returns oversampling factor override. If set to a positive value, overrides the oversampling factor of the viewport this font is used in. See [member Viewport.oversampling]. This value doesn't override the [code skip-lint]oversampling[/code] parameter of [code skip-lint]draw_*[/code] methods. Used by dynamic fonts only. */
  protected _font_get_oversampling(font_rid: RID): float

  /** Returns scaling factor of the color bitmap font. */
  protected _font_get_scale(font_rid: RID, size: int): float

  /** Returns [code]true[/code] if support override is enabled for the [param script]. */
  protected _font_get_script_support_override(
    font_rid: RID,
    script: string
  ): boolean

  /** Returns list of script support overrides. */
  protected _font_get_script_support_overrides(font_rid: RID): PackedStringArray

  /** Returns font cache information, each entry contains the following fields: [code]Vector2i size_px[/code] - font size in pixels, [code]float viewport_oversampling[/code] - viewport oversampling factor, [code]int glyphs[/code] - number of rendered glyphs, [code]int textures[/code] - number of used textures, [code]int textures_size[/code] - size of texture data in bytes. */
  protected _font_get_size_cache_info(font_rid: RID): Dictionary<any, any>[]

  /** Returns list of the font sizes in the cache. Each size is [Vector2i] with font size and outline size. */
  protected _font_get_size_cache_list(font_rid: RID): Vector2i[]

  /** Returns the spacing for [param spacing] in pixels (not relative to the font size). */
  protected _font_get_spacing(font_rid: RID, spacing: int): int

  /** Returns font stretch amount, compared to a normal width. A percentage value between [code]50%[/code] and [code]200%[/code]. */
  protected _font_get_stretch(font_rid: RID): int

  /** Returns font style flags. */
  protected _font_get_style(font_rid: RID): int

  /** Returns font style name. */
  protected _font_get_style_name(font_rid: RID): string

  /** Returns font subpixel glyph positioning mode. */
  protected _font_get_subpixel_positioning(font_rid: RID): int

  /** Returns a string containing all the characters available in the font. */
  protected _font_get_supported_chars(font_rid: RID): string

  /** Returns an array containing all glyph indices in the font. */
  protected _font_get_supported_glyphs(font_rid: RID): PackedInt32Array

  /** Returns number of textures used by font cache entry. */
  protected _font_get_texture_count(font_rid: RID, size: Vector2i): int

  /** Returns font cache texture image data. */
  protected _font_get_texture_image(
    font_rid: RID,
    size: Vector2i,
    texture_index: int
  ): Image

  /** Returns array containing glyph packing data. */
  protected _font_get_texture_offsets(
    font_rid: RID,
    size: Vector2i,
    texture_index: int
  ): PackedInt32Array

  /** Returns 2D transform applied to the font outlines. */
  protected _font_get_transform(font_rid: RID): Transform2D

  /** Returns pixel offset of the underline below the baseline. */
  protected _font_get_underline_position(font_rid: RID, size: int): float

  /** Returns thickness of the underline in pixels. */
  protected _font_get_underline_thickness(font_rid: RID, size: int): float

  /** Returns variation coordinates for the specified font cache entry. */
  protected _font_get_variation_coordinates(font_rid: RID): Dictionary<any, any>

  /** Returns weight (boldness) of the font. A value in the [code]100...999[/code] range, normal font weight is [code]400[/code], bold font weight is [code]700[/code]. */
  protected _font_get_weight(font_rid: RID): int

  /** Returns [code]true[/code] if a Unicode [param char] is available in the font. */
  protected _font_has_char(font_rid: RID, char: int): boolean

  /** Returns [code]true[/code] if system fonts can be automatically used as fallbacks. */
  protected _font_is_allow_system_fallback(font_rid: RID): boolean

  /** Returns [code]true[/code] if auto-hinting is supported and preferred over font built-in hinting. */
  protected _font_is_force_autohinter(font_rid: RID): boolean

  /** Returns [code]true[/code] if the font supports the given language (as a [url=https://en.wikipedia.org/wiki/ISO_639-1]ISO 639[/url] code). */
  protected _font_is_language_supported(
    font_rid: RID,
    language: string
  ): boolean

  /** Returns [code]true[/code] if color modulation is applied when drawing the font's colored glyphs. */
  protected _font_is_modulate_color_glyphs(font_rid: RID): boolean

  /** Returns [code]true[/code] if glyphs of all sizes are rendered using single multichannel signed distance field generated from the dynamic font vector data. */
  protected _font_is_multichannel_signed_distance_field(font_rid: RID): boolean

  /** Returns [code]true[/code] if the font supports the given script (as a [url=https://en.wikipedia.org/wiki/ISO_15924]ISO 15924[/url] code). */
  protected _font_is_script_supported(font_rid: RID, script: string): boolean

  /** Removes specified rendered glyph information from the cache entry. */
  protected _font_remove_glyph(font_rid: RID, size: Vector2i, glyph: int): void

  /** Removes kerning override for the pair of glyphs. */
  protected _font_remove_kerning(
    font_rid: RID,
    size: int,
    glyph_pair: Vector2i
  ): void

  /** Remove language support override. */
  protected _font_remove_language_support_override(
    font_rid: RID,
    language: string
  ): void

  /** Removes script support override. */
  protected _font_remove_script_support_override(
    font_rid: RID,
    script: string
  ): void

  /** Removes specified font size from the cache entry. */
  protected _font_remove_size_cache(font_rid: RID, size: Vector2i): void

  /** Removes specified texture from the cache entry. */
  protected _font_remove_texture(
    font_rid: RID,
    size: Vector2i,
    texture_index: int
  ): void

  /** Renders specified glyph to the font cache texture. */
  protected _font_render_glyph(font_rid: RID, size: Vector2i, index: int): void

  /** Renders the range of characters to the font cache texture. */
  protected _font_render_range(
    font_rid: RID,
    size: Vector2i,
    start: int,
    end: int
  ): void

  /** If set to [code]true[/code], system fonts can be automatically used as fallbacks. */
  protected _font_set_allow_system_fallback(
    font_rid: RID,
    allow_system_fallback: boolean
  ): void

  /** Sets font anti-aliasing mode. */
  protected _font_set_antialiasing(font_rid: RID, antialiasing: int): void

  /** Sets the font ascent (number of pixels above the baseline). */
  protected _font_set_ascent(font_rid: RID, size: int, ascent: float): void

  /** Sets extra baseline offset (as a fraction of font height). */
  protected _font_set_baseline_offset(
    font_rid: RID,
    baseline_offset: float
  ): void

  /** Sets font source data, e.g contents of the dynamic font source file. */
  protected _font_set_data(font_rid: RID, data: PackedByteArray): void

  /** Sets pointer to the font source data, e.g contents of the dynamic font source file. */
  protected _font_set_data_ptr(
    font_rid: RID,
    data_ptr: CPointer,
    data_size: int
  ): void

  /** Sets the font descent (number of pixels below the baseline). */
  protected _font_set_descent(font_rid: RID, size: int, descent: float): void

  /** If set to [code]true[/code], embedded font bitmap loading is disabled. */
  protected _font_set_disable_embedded_bitmaps(
    font_rid: RID,
    disable_embedded_bitmaps: boolean
  ): void

  /** Sets font embolden strength. If [param strength] is not equal to zero, emboldens the font outlines. Negative values reduce the outline thickness. */
  protected _font_set_embolden(font_rid: RID, strength: float): void

  /** Sets an active face index in the TrueType / OpenType collection. */
  protected _font_set_face_index(font_rid: RID, face_index: int): void

  /** Sets bitmap font fixed size. If set to value greater than zero, same cache entry will be used for all font sizes. */
  protected _font_set_fixed_size(font_rid: RID, fixed_size: int): void

  /** Sets bitmap font scaling mode. This property is used only if [code]fixed_size[/code] is greater than zero. */
  protected _font_set_fixed_size_scale_mode(
    font_rid: RID,
    fixed_size_scale_mode: int
  ): void

  /** If set to [code]true[/code] auto-hinting is preferred over font built-in hinting. */
  protected _font_set_force_autohinter(
    font_rid: RID,
    force_autohinter: boolean
  ): void

  /** If set to [code]true[/code] font texture mipmap generation is enabled. */
  protected _font_set_generate_mipmaps(
    font_rid: RID,
    generate_mipmaps: boolean
  ): void

  /** Sets oversampling factor, shared by all font in the TextServer. */
  protected _font_set_global_oversampling(oversampling: float): void

  /** Sets glyph advance (offset of the next glyph). */
  protected _font_set_glyph_advance(
    font_rid: RID,
    size: int,
    glyph: int,
    advance: Vector2
  ): void

  /** Sets glyph offset from the baseline. */
  protected _font_set_glyph_offset(
    font_rid: RID,
    size: Vector2i,
    glyph: int,
    offset: Vector2
  ): void

  /** Sets size of the glyph. */
  protected _font_set_glyph_size(
    font_rid: RID,
    size: Vector2i,
    glyph: int,
    gl_size: Vector2
  ): void

  /** Sets index of the cache texture containing the glyph. */
  protected _font_set_glyph_texture_idx(
    font_rid: RID,
    size: Vector2i,
    glyph: int,
    texture_idx: int
  ): void

  /** Sets rectangle in the cache texture containing the glyph. */
  protected _font_set_glyph_uv_rect(
    font_rid: RID,
    size: Vector2i,
    glyph: int,
    uv_rect: Rect2
  ): void

  /** Sets font hinting mode. Used by dynamic fonts only. */
  protected _font_set_hinting(font_rid: RID, hinting: int): void

  /** Sets glyph position rounding behavior. If set to [code]true[/code], when aligning glyphs to the pixel boundaries rounding remainders are accumulated to ensure more uniform glyph distribution. This setting has no effect if subpixel positioning is enabled. */
  protected _font_set_keep_rounding_remainders(
    font_rid: RID,
    keep_rounding_remainders: boolean
  ): void

  /** Sets kerning for the pair of glyphs. */
  protected _font_set_kerning(
    font_rid: RID,
    size: int,
    glyph_pair: Vector2i,
    kerning: Vector2
  ): void

  /** Adds override for [method _font_is_language_supported]. */
  protected _font_set_language_support_override(
    font_rid: RID,
    language: string,
    supported: boolean
  ): void

  /** If set to [code]true[/code], color modulation is applied when drawing colored glyphs, otherwise it's applied to the monochrome glyphs only. */
  protected _font_set_modulate_color_glyphs(
    font_rid: RID,
    modulate: boolean
  ): void

  /** Sets the width of the range around the shape between the minimum and maximum representable signed distance. */
  protected _font_set_msdf_pixel_range(
    font_rid: RID,
    msdf_pixel_range: int
  ): void

  /** Sets source font size used to generate MSDF textures. */
  protected _font_set_msdf_size(font_rid: RID, msdf_size: int): void

  /** If set to [code]true[/code], glyphs of all sizes are rendered using single multichannel signed distance field generated from the dynamic font vector data. MSDF rendering allows displaying the font at any scaling factor without blurriness, and without incurring a CPU cost when the font size changes (since the font no longer needs to be rasterized on the CPU). As a downside, font hinting is not available with MSDF. The lack of font hinting may result in less crisp and less readable fonts at small sizes. */
  protected _font_set_multichannel_signed_distance_field(
    font_rid: RID,
    msdf: boolean
  ): void

  /** Sets the font family name. */
  protected _font_set_name(font_rid: RID, name: string): void

  /** Sets font OpenType feature set override. */
  protected _font_set_opentype_feature_overrides(
    font_rid: RID,
    overrides: Dictionary<any, any>
  ): void

  /** If set to a positive value, overrides the oversampling factor of the viewport this font is used in. See [member Viewport.oversampling]. This value doesn't override the [code skip-lint]oversampling[/code] parameter of [code skip-lint]draw_*[/code] methods. Used by dynamic fonts only. */
  protected _font_set_oversampling(font_rid: RID, oversampling: float): void

  /** Sets scaling factor of the color bitmap font. */
  protected _font_set_scale(font_rid: RID, size: int, scale: float): void

  /** Adds override for [method _font_is_script_supported]. */
  protected _font_set_script_support_override(
    font_rid: RID,
    script: string,
    supported: boolean
  ): void

  /** Sets the spacing for [param spacing] to [param value] in pixels (not relative to the font size). */
  protected _font_set_spacing(font_rid: RID, spacing: int, value: int): void

  /** Sets font stretch amount, compared to a normal width. A percentage value between [code]50%[/code] and [code]200%[/code]. */
  protected _font_set_stretch(font_rid: RID, stretch: int): void

  /** Sets the font style flags. */
  protected _font_set_style(font_rid: RID, style: int): void

  /** Sets the font style name. */
  protected _font_set_style_name(font_rid: RID, name_style: string): void

  /** Sets font subpixel glyph positioning mode. */
  protected _font_set_subpixel_positioning(
    font_rid: RID,
    subpixel_positioning: int
  ): void

  /** Sets font cache texture image data. */
  protected _font_set_texture_image(
    font_rid: RID,
    size: Vector2i,
    texture_index: int,
    image: Image
  ): void

  /** Sets array containing glyph packing data. */
  protected _font_set_texture_offsets(
    font_rid: RID,
    size: Vector2i,
    texture_index: int,
    offset: PackedInt32Array
  ): void

  /** Sets 2D transform, applied to the font outlines, can be used for slanting, flipping, and rotating glyphs. */
  protected _font_set_transform(font_rid: RID, transform: Transform2D): void

  /** Sets pixel offset of the underline below the baseline. */
  protected _font_set_underline_position(
    font_rid: RID,
    size: int,
    underline_position: float
  ): void

  /** Sets thickness of the underline in pixels. */
  protected _font_set_underline_thickness(
    font_rid: RID,
    size: int,
    underline_thickness: float
  ): void

  /** Sets variation coordinates for the specified font cache entry. */
  protected _font_set_variation_coordinates(
    font_rid: RID,
    variation_coordinates: Dictionary<any, any>
  ): void

  /** Sets weight (boldness) of the font. A value in the [code]100...999[/code] range, normal font weight is [code]400[/code], bold font weight is [code]700[/code]. */
  protected _font_set_weight(font_rid: RID, weight: int): void

  /** Returns the dictionary of the supported OpenType features. */
  protected _font_supported_feature_list(font_rid: RID): Dictionary<any, any>

  /** Returns the dictionary of the supported OpenType variation coordinates. */
  protected _font_supported_variation_list(font_rid: RID): Dictionary<any, any>

  /**
   * Converts a number from Western Arabic (0..9) to the numeral system used in the given [param language].
   *
   * If [param language] is an empty string, the active locale will be used.
   *
   */
  protected _format_number(number: string, language: string): string

  /** Frees an object created by this [TextServer]. */
  protected _free_rid(rid: RID): void

  /** Returns text server features, see [enum TextServer.Feature]. */
  protected _get_features(): int

  /** Returns size of the replacement character (box with character hexadecimal code that is drawn in place of invalid characters). */
  protected _get_hex_code_box_size(size: int, index: int): Vector2

  /** Returns the name of the server interface. */
  protected _get_name(): string

  /** Returns default TextServer database (e.g. ICU break iterators and dictionaries). */
  protected _get_support_data(): PackedByteArray

  /** Returns default TextServer database (e.g. ICU break iterators and dictionaries) filename. */
  protected _get_support_data_filename(): string

  /** Returns TextServer database (e.g. ICU break iterators and dictionaries) description. */
  protected _get_support_data_info(): string

  /** Returns [code]true[/code] if [param rid] is valid resource owned by this text server. */
  protected _has(rid: RID): boolean

  /** Returns [code]true[/code] if the server supports a feature. */
  protected _has_feature(feature: int): boolean

  /** Returns index of the first string in [param dict] which is visually confusable with the [param string], or [code]-1[/code] if none is found. */
  protected _is_confusable(string: string, dict: PackedStringArray): int

  /** Returns [code]true[/code] if locale is right-to-left. */
  protected _is_locale_right_to_left(locale: string): boolean

  /** Returns [code]true[/code] if the locale requires text server support data for line/word breaking. */
  protected _is_locale_using_support_data(locale: string): boolean

  /** Returns [code]true[/code] if [param string] is a valid identifier. */
  protected _is_valid_identifier(string: string): boolean

  /** No documentation provided. */
  protected _is_valid_letter(unicode: int): boolean

  /** Loads optional TextServer database (e.g. ICU break iterators and dictionaries). */
  protected _load_support_data(filename: string): boolean

  /** Converts the given readable name of a feature, variation, script, or language to an OpenType tag. */
  protected _name_to_tag(name: string): int

  /**
   * Converts [param number] from the numeral system used in the given [param language] to Western Arabic (0..9).
   *
   * If [param language] is an empty string, the active locale will be used.
   *
   */
  protected _parse_number(number: string, language: string): string

  /** Default implementation of the BiDi algorithm override function. */
  protected _parse_structured_text(
    parser_type: int,
    args: any[],
    text: string
  ): Vector3i[]

  /** Returns percent sign used in the given [param language]. */
  protected _percent_sign(language: string): string

  /** Increases the reference count of the specified oversampling level. This method is called by [Viewport], and should not be used directly. */
  protected _reference_oversampling_level(oversampling: float): void

  /** Saves optional TextServer database (e.g. ICU break iterators and dictionaries) to the file. */
  protected _save_support_data(filename: string): boolean

  /** Returns the number of uniform text runs in the buffer. */
  protected _shaped_get_run_count(shaped: RID): int

  /** Returns the direction of the [param index] text run (in visual order). */
  protected _shaped_get_run_direction(shaped: RID, index: int): int

  /** Returns the font RID of the [param index] text run (in visual order). */
  protected _shaped_get_run_font_rid(shaped: RID, index: int): RID

  /** Returns the font size of the [param index] text run (in visual order). */
  protected _shaped_get_run_font_size(shaped: RID, index: int): int

  /** Returns the language of the [param index] text run (in visual order). */
  protected _shaped_get_run_language(shaped: RID, index: int): string

  /** Returns the embedded object of the [param index] text run (in visual order). */
  protected _shaped_get_run_object(shaped: RID, index: int): any

  /** Returns the source text range of the [param index] text run (in visual order). */
  protected _shaped_get_run_range(shaped: RID, index: int): Vector2i

  /** Returns the source text of the [param index] text run (in visual order). */
  protected _shaped_get_run_text(shaped: RID, index: int): string

  /** Returns number of text spans added using [method _shaped_text_add_string] or [method _shaped_text_add_object]. */
  protected _shaped_get_span_count(shaped: RID): int

  /** Returns text embedded object key. */
  protected _shaped_get_span_embedded_object(shaped: RID, index: int): any

  /** Returns text span metadata. */
  protected _shaped_get_span_meta(shaped: RID, index: int): any

  /** Returns the text span embedded object key. */
  protected _shaped_get_span_object(shaped: RID, index: int): any

  /** Returns the text span source text. */
  protected _shaped_get_span_text(shaped: RID, index: int): string

  /** Returns the text buffer source text, including object replacement characters. */
  protected _shaped_get_text(shaped: RID): string

  /** Changes text span font, font size, and OpenType features, without changing the text. */
  protected _shaped_set_span_update_font(
    shaped: RID,
    index: int,
    fonts: RID[],
    size: int,
    opentype_features: Dictionary<any, any>
  ): void

  /** Adds inline object to the text buffer, [param key] must be unique. In the text, object is represented as [param length] object replacement characters. */
  protected _shaped_text_add_object(
    shaped: RID,
    key: any,
    size: Vector2,
    inline_align: int,
    length: int,
    baseline: float
  ): boolean

  /** Adds text span and font to draw it to the text buffer. */
  protected _shaped_text_add_string(
    shaped: RID,
    text: string,
    fonts: RID[],
    size: int,
    opentype_features: Dictionary<any, any>,
    language: string,
    meta: any
  ): boolean

  /** Clears text buffer (removes text and inline objects). */
  protected _shaped_text_clear(shaped: RID): void

  /** Returns composite character position closest to the [param pos]. */
  protected _shaped_text_closest_character_pos(shaped: RID, pos: int): int

  /** Draw shaped text into a canvas item at a given position, with [param color]. [param pos] specifies the leftmost point of the baseline (for horizontal layout) or topmost point of the baseline (for vertical layout). If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  protected _shaped_text_draw(
    shaped: RID,
    canvas: RID,
    pos: Vector2,
    clip_l: float,
    clip_r: float,
    color: Color,
    oversampling: float
  ): void

  /** Draw the outline of the shaped text into a canvas item at a given position, with [param color]. [param pos] specifies the leftmost point of the baseline (for horizontal layout) or topmost point of the baseline (for vertical layout). If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  protected _shaped_text_draw_outline(
    shaped: RID,
    canvas: RID,
    pos: Vector2,
    clip_l: float,
    clip_r: float,
    outline_size: int,
    color: Color,
    oversampling: float
  ): void

  /** Duplicates shaped text buffer. */
  protected _shaped_text_duplicate(shaped: RID): RID

  /** Adjusts text width to fit to specified width, returns new text width. */
  protected _shaped_text_fit_to_width(
    shaped: RID,
    width: float,
    justification_flags: int
  ): float

  /** Returns the text ascent (number of pixels above the baseline for horizontal layout or to the left of baseline for vertical). */
  protected _shaped_text_get_ascent(shaped: RID): float

  /** Returns shapes of the carets corresponding to the character offset [param position] in the text. Returned caret shape is 1 pixel wide rectangle. */
  protected _shaped_text_get_carets(
    shaped: RID,
    position: int,
    caret: CPointer
  ): void

  /** Returns array of the composite character boundaries. */
  protected _shaped_text_get_character_breaks(shaped: RID): PackedInt32Array

  /** Returns ellipsis character used for text clipping. */
  protected _shaped_text_get_custom_ellipsis(shaped: RID): int

  /** Returns custom punctuation character list, used for word breaking. If set to empty string, server defaults are used. */
  protected _shaped_text_get_custom_punctuation(shaped: RID): string

  /** Returns the text descent (number of pixels below the baseline for horizontal layout or to the right of baseline for vertical). */
  protected _shaped_text_get_descent(shaped: RID): float

  /** Returns direction of the text. */
  protected _shaped_text_get_direction(shaped: RID): int

  /** Returns dominant direction of in the range of text. */
  protected _shaped_text_get_dominant_direction_in_range(
    shaped: RID,
    start: int,
    end: int
  ): int

  /** Returns number of glyphs in the ellipsis. */
  protected _shaped_text_get_ellipsis_glyph_count(shaped: RID): int

  /** Returns array of the glyphs in the ellipsis. */
  protected _shaped_text_get_ellipsis_glyphs(shaped: RID): CPointer

  /** Returns position of the ellipsis. */
  protected _shaped_text_get_ellipsis_pos(shaped: RID): int

  /** Returns number of glyphs in the buffer. */
  protected _shaped_text_get_glyph_count(shaped: RID): int

  /** Returns an array of glyphs in the visual order. */
  protected _shaped_text_get_glyphs(shaped: RID): CPointer

  /** Returns composite character's bounds as offsets from the start of the line. */
  protected _shaped_text_get_grapheme_bounds(shaped: RID, pos: int): Vector2

  /** Returns direction of the text, inferred by the BiDi algorithm. */
  protected _shaped_text_get_inferred_direction(shaped: RID): int

  /** Breaks text to the lines and returns character ranges for each line. */
  protected _shaped_text_get_line_breaks(
    shaped: RID,
    width: float,
    start: int,
    break_flags: int
  ): PackedInt32Array

  /** Breaks text to the lines and columns. Returns character ranges for each segment. */
  protected _shaped_text_get_line_breaks_adv(
    shaped: RID,
    width: PackedFloat32Array,
    start: int,
    once: boolean,
    break_flags: int
  ): PackedInt32Array

  /** Returns the glyph index of the inline object. */
  protected _shaped_text_get_object_glyph(shaped: RID, key: any): int

  /** Returns the character range of the inline object. */
  protected _shaped_text_get_object_range(shaped: RID, key: any): Vector2i

  /** Returns bounding rectangle of the inline object. */
  protected _shaped_text_get_object_rect(shaped: RID, key: any): Rect2

  /** Returns array of inline objects. */
  protected _shaped_text_get_objects(shaped: RID): any[]

  /** Returns text orientation. */
  protected _shaped_text_get_orientation(shaped: RID): int

  /** Returns the parent buffer from which the substring originates. */
  protected _shaped_text_get_parent(shaped: RID): RID

  /** Returns [code]true[/code] if text buffer is configured to display control characters. */
  protected _shaped_text_get_preserve_control(shaped: RID): boolean

  /** Returns [code]true[/code] if text buffer is configured to display hexadecimal codes in place of invalid characters. */
  protected _shaped_text_get_preserve_invalid(shaped: RID): boolean

  /** Returns substring buffer character range in the parent buffer. */
  protected _shaped_text_get_range(shaped: RID): Vector2i

  /** Returns selection rectangles for the specified character range. */
  protected _shaped_text_get_selection(
    shaped: RID,
    start: int,
    end: int
  ): PackedVector2Array

  /** Returns size of the text. */
  protected _shaped_text_get_size(shaped: RID): Vector2

  /** Returns extra spacing added between glyphs or lines in pixels. */
  protected _shaped_text_get_spacing(shaped: RID, spacing: int): int

  /** Returns the position of the overrun trim. */
  protected _shaped_text_get_trim_pos(shaped: RID): int

  /** Returns pixel offset of the underline below the baseline. */
  protected _shaped_text_get_underline_position(shaped: RID): float

  /** Returns thickness of the underline. */
  protected _shaped_text_get_underline_thickness(shaped: RID): float

  /** Returns width (for horizontal layout) or height (for vertical) of the text. */
  protected _shaped_text_get_width(shaped: RID): float

  /** Breaks text into words and returns array of character ranges. Use [param grapheme_flags] to set what characters are used for breaking. */
  protected _shaped_text_get_word_breaks(
    shaped: RID,
    grapheme_flags: int,
    skip_grapheme_flags: int
  ): PackedInt32Array

  /** Returns [code]true[/code] if an object with [param key] is embedded in this shaped text buffer. */
  protected _shaped_text_has_object(shaped: RID, key: any): boolean

  /** Returns grapheme index at the specified pixel offset at the baseline, or [code]-1[/code] if none is found. */
  protected _shaped_text_hit_test_grapheme(shaped: RID, coord: float): int

  /** Returns caret character offset at the specified pixel offset at the baseline. This function always returns a valid position. */
  protected _shaped_text_hit_test_position(shaped: RID, coord: float): int

  /** Returns [code]true[/code] if buffer is successfully shaped. */
  protected _shaped_text_is_ready(shaped: RID): boolean

  /** Returns composite character end position closest to the [param pos]. */
  protected _shaped_text_next_character_pos(shaped: RID, pos: int): int

  /** Returns grapheme end position closest to the [param pos]. */
  protected _shaped_text_next_grapheme_pos(shaped: RID, pos: int): int

  /** Trims text if it exceeds the given width. */
  protected _shaped_text_overrun_trim_to_width(
    shaped: RID,
    width: float,
    trim_flags: int
  ): void

  /** Returns composite character start position closest to the [param pos]. */
  protected _shaped_text_prev_character_pos(shaped: RID, pos: int): int

  /** Returns grapheme start position closest to the [param pos]. */
  protected _shaped_text_prev_grapheme_pos(shaped: RID, pos: int): int

  /** Sets new size and alignment of embedded object. */
  protected _shaped_text_resize_object(
    shaped: RID,
    key: any,
    size: Vector2,
    inline_align: int,
    baseline: float
  ): boolean

  /** Overrides BiDi for the structured text. */
  protected _shaped_text_set_bidi_override(shaped: RID, override: any[]): void

  /** Sets ellipsis character used for text clipping. */
  protected _shaped_text_set_custom_ellipsis(shaped: RID, char: int): void

  /** Sets custom punctuation character list, used for word breaking. If set to empty string, server defaults are used. */
  protected _shaped_text_set_custom_punctuation(
    shaped: RID,
    punct: string
  ): void

  /** Sets desired text direction. If set to [constant TextServer.DIRECTION_AUTO], direction will be detected based on the buffer contents and current locale. */
  protected _shaped_text_set_direction(shaped: RID, direction: int): void

  /** Sets desired text orientation. */
  protected _shaped_text_set_orientation(shaped: RID, orientation: int): void

  /** If set to [code]true[/code] text buffer will display control characters. */
  protected _shaped_text_set_preserve_control(
    shaped: RID,
    enabled: boolean
  ): void

  /** If set to [code]true[/code] text buffer will display invalid characters as hexadecimal codes, otherwise nothing is displayed. */
  protected _shaped_text_set_preserve_invalid(
    shaped: RID,
    enabled: boolean
  ): void

  /** Sets extra spacing added between glyphs or lines in pixels. */
  protected _shaped_text_set_spacing(
    shaped: RID,
    spacing: int,
    value: int
  ): void

  /** Shapes buffer if it's not shaped. Returns [code]true[/code] if the string is shaped successfully. */
  protected _shaped_text_shape(shaped: RID): boolean

  /** Returns text glyphs in the logical order. */
  protected _shaped_text_sort_logical(shaped: RID): CPointer

  /** Returns text buffer for the substring of the text in the [param shaped] text buffer (including inline objects). */
  protected _shaped_text_substr(shaped: RID, start: int, length: int): RID

  /** Aligns shaped text to the given tab-stops. */
  protected _shaped_text_tab_align(
    shaped: RID,
    tab_stops: PackedFloat32Array
  ): float

  /** Updates break points in the shaped text. This method is called by default implementation of text breaking functions. */
  protected _shaped_text_update_breaks(shaped: RID): boolean

  /** Updates justification points in the shaped text. This method is called by default implementation of text justification functions. */
  protected _shaped_text_update_justification_ops(shaped: RID): boolean

  /** Returns [code]true[/code] if [param string] is likely to be an attempt at confusing the reader. */
  protected _spoof_check(string: string): boolean

  /** Returns array of the composite character boundaries. */
  protected _string_get_character_breaks(
    string: string,
    language: string
  ): PackedInt32Array

  /** Returns an array of the word break boundaries. Elements in the returned array are the offsets of the start and end of words. Therefore the length of the array is always even. */
  protected _string_get_word_breaks(
    string: string,
    language: string,
    chars_per_line: int
  ): PackedInt32Array

  /** Returns the string converted to [code]lowercase[/code]. */
  protected _string_to_lower(string: string, language: string): string

  /** Returns the string converted to [code]Title Case[/code]. */
  protected _string_to_title(string: string, language: string): string

  /** Returns the string converted to [code]UPPERCASE[/code]. */
  protected _string_to_upper(string: string, language: string): string

  /** Strips diacritics from the string. */
  protected _strip_diacritics(string: string): string

  /** Converts the given OpenType tag to the readable name of a feature, variation, script, or language. */
  protected _tag_to_name(tag: int): string

  /** Decreases the reference count of the specified oversampling level, and frees the font cache for oversampling level when the reference count reaches zero. This method is called by [Viewport], and should not be used directly. */
  protected _unreference_oversampling_level(oversampling: float): void

  connect<T extends SignalsOf<TextServerExtension>>(
    signal: T,
    method: SignalFunction<TextServerExtension[T]>
  ): number
}
