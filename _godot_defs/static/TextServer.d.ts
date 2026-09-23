/**
 * [TextServer] is the API backend for managing fonts and rendering text.
 *
 * **Note:** This is a low-level API, consider using [TextLine], [TextParagraph], and [Font] classes instead.
 *
 * This is an abstract class, so to get the currently active [TextServer] instance, use the following code:
 *
 * @example
 *
 *
 * var ts = TextServerManager.get_primary_interface()
 *
 *
 * var ts = TextServerManager.GetPrimaryInterface();
 *
 * @summary
 *
 *
 */
declare class TextServer extends RefCounted {
  /**
   * [TextServer] is the API backend for managing fonts and rendering text.
   *
   * **Note:** This is a low-level API, consider using [TextLine], [TextParagraph], and [Font] classes instead.
   *
   * This is an abstract class, so to get the currently active [TextServer] instance, use the following code:
   *
   * @example
   *
   *
   * var ts = TextServerManager.get_primary_interface()
   *
   *
   * var ts = TextServerManager.GetPrimaryInterface();
   *
   * @summary
   *
   *
   */
  new(): TextServer
  constructor()
  static new(): TextServer

  /** Creates a new, empty font cache entry resource. To free the resulting resource, use the [method free_rid] method. */
  create_font(): RID

  /** Creates a new variation existing font which is reusing the same glyph cache and font data. To free the resulting resource, use the [method free_rid] method. */
  create_font_linked_variation(font_rid: RID): RID

  /**
   * Creates a new buffer for complex text layout, with the given [param direction] and [param orientation]. To free the resulting buffer, use [method free_rid] method.
   *
   * **Note:** Direction is ignored if server does not support [constant FEATURE_BIDI_LAYOUT] feature (supported by [TextServerAdvanced]).
   *
   * **Note:** Orientation is ignored if server does not support [constant FEATURE_VERTICAL_LAYOUT] feature (supported by [TextServerAdvanced]).
   *
   */
  create_shaped_text(direction?: int, orientation?: int): RID

  /** Draws box displaying character hexadecimal code. Used for replacing missing characters. */
  draw_hex_code_box(
    canvas: RID,
    size: int,
    pos: Vector2,
    index: int,
    color: Color
  ): void

  /**
   * Removes all rendered glyph information from the cache entry.
   *
   * **Note:** This function will not remove textures associated with the glyphs, use [method font_remove_texture] to remove them manually.
   *
   */
  font_clear_glyphs(font_rid: RID, size: Vector2i): void

  /** Removes all kerning overrides. */
  font_clear_kerning_map(font_rid: RID, size: int): void

  /** Removes all font sizes from the cache entry. */
  font_clear_size_cache(font_rid: RID): void

  /** Frees all automatically loaded system fonts. */
  font_clear_system_fallback_cache(): void

  /**
   * Removes all textures from font cache entry.
   *
   * **Note:** This function will not remove glyphs associated with the texture, use [method font_remove_glyph] to remove them manually.
   *
   */
  font_clear_textures(font_rid: RID, size: Vector2i): void

  /**
   * Draws single glyph into a canvas item at the position, using [param font_rid] at the size [param size]. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   *
   * **Note:** Glyph index is specific to the font, use glyphs indices returned by [method shaped_text_get_glyphs] or [method font_get_glyph_index].
   *
   * **Note:** If there are pending glyphs to render, calling this function might trigger the texture cache update.
   *
   */
  font_draw_glyph(
    font_rid: RID,
    canvas: RID,
    size: int,
    pos: Vector2,
    index: int,
    color?: Color,
    oversampling?: float
  ): void

  /**
   * Draws single glyph outline of size [param outline_size] into a canvas item at the position, using [param font_rid] at the size [param size]. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   *
   * **Note:** Glyph index is specific to the font, use glyphs indices returned by [method shaped_text_get_glyphs] or [method font_get_glyph_index].
   *
   * **Note:** If there are pending glyphs to render, calling this function might trigger the texture cache update.
   *
   */
  font_draw_glyph_outline(
    font_rid: RID,
    canvas: RID,
    size: int,
    outline_size: int,
    pos: Vector2,
    index: int,
    color?: Color,
    oversampling?: float
  ): void

  /** Returns font anti-aliasing mode. */
  font_get_antialiasing(font_rid: RID): int

  /** Returns the font ascent (number of pixels above the baseline). */
  font_get_ascent(font_rid: RID, size: int): float

  /** Returns extra baseline offset (as a fraction of font height). */
  font_get_baseline_offset(font_rid: RID): float

  /** Returns character code associated with [param glyph_index], or [code]0[/code] if [param glyph_index] is invalid. See [method font_get_glyph_index]. */
  font_get_char_from_glyph_index(
    font_rid: RID,
    size: int,
    glyph_index: int
  ): int

  /** Returns the font descent (number of pixels below the baseline). */
  font_get_descent(font_rid: RID, size: int): float

  /** Returns whether the font's embedded bitmap loading is disabled. */
  font_get_disable_embedded_bitmaps(font_rid: RID): boolean

  /** Returns font embolden strength. */
  font_get_embolden(font_rid: RID): float

  /** Returns number of faces in the TrueType / OpenType collection. */
  font_get_face_count(font_rid: RID): int

  /** Returns an active face index in the TrueType / OpenType collection. */
  font_get_face_index(font_rid: RID): int

  /** Returns bitmap font fixed size. */
  font_get_fixed_size(font_rid: RID): int

  /** Returns bitmap font scaling mode. */
  font_get_fixed_size_scale_mode(font_rid: RID): int

  /** Returns [code]true[/code] if font texture mipmap generation is enabled. */
  font_get_generate_mipmaps(font_rid: RID): boolean

  /** This method does nothing and always returns [code]1.0[/code]. */
  font_get_global_oversampling(): float

  /**
   * Returns glyph advance (offset of the next glyph).
   *
   * **Note:** Advance for glyphs outlines is the same as the base glyph advance and is not saved.
   *
   */
  font_get_glyph_advance(font_rid: RID, size: int, glyph: int): Vector2

  /**
   * Returns outline contours of the glyph as a [Dictionary] with the following contents:
   *
   * `points`         - [PackedVector3Array], containing outline points. `x` and `y` are point coordinates. `z` is the type of the point, using the [enum ContourPointTag] values.
   *
   * `contours`       - [PackedInt32Array], containing indices the end points of each contour.
   *
   * `orientation`    - [bool], contour orientation. If `true`, clockwise contours must be filled.
   *
   * - Two successive [constant CONTOUR_CURVE_TAG_ON] points indicate a line segment.
   *
   * - One [constant CONTOUR_CURVE_TAG_OFF_CONIC] point between two [constant CONTOUR_CURVE_TAG_ON] points indicates a single conic (quadratic) Bézier arc.
   *
   * - Two [constant CONTOUR_CURVE_TAG_OFF_CUBIC] points between two [constant CONTOUR_CURVE_TAG_ON] points indicate a single cubic Bézier arc.
   *
   * - Two successive [constant CONTOUR_CURVE_TAG_OFF_CONIC] points indicate two successive conic (quadratic) Bézier arcs with a virtual [constant CONTOUR_CURVE_TAG_ON] point at their middle.
   *
   * - Each contour is closed. The last point of a contour uses the first point of a contour as its next point, and vice versa. The first point can be [constant CONTOUR_CURVE_TAG_OFF_CONIC] point.
   *
   */
  font_get_glyph_contours(
    font: RID,
    size: int,
    index: int
  ): Dictionary<any, any>

  /** Returns the glyph index of a [param char], optionally modified by the [param variation_selector]. See [method font_get_char_from_glyph_index]. */
  font_get_glyph_index(
    font_rid: RID,
    size: int,
    char: int,
    variation_selector: int
  ): int

  /** Returns list of rendered glyphs in the cache entry. */
  font_get_glyph_list(font_rid: RID, size: Vector2i): PackedInt32Array

  /** Returns glyph offset from the baseline. */
  font_get_glyph_offset(font_rid: RID, size: Vector2i, glyph: int): Vector2

  /** Returns size of the glyph. */
  font_get_glyph_size(font_rid: RID, size: Vector2i, glyph: int): Vector2

  /** Returns index of the cache texture containing the glyph. */
  font_get_glyph_texture_idx(font_rid: RID, size: Vector2i, glyph: int): int

  /**
   * Returns resource ID of the cache texture containing the glyph.
   *
   * **Note:** If there are pending glyphs to render, calling this function might trigger the texture cache update.
   *
   */
  font_get_glyph_texture_rid(font_rid: RID, size: Vector2i, glyph: int): RID

  /**
   * Returns size of the cache texture containing the glyph.
   *
   * **Note:** If there are pending glyphs to render, calling this function might trigger the texture cache update.
   *
   */
  font_get_glyph_texture_size(
    font_rid: RID,
    size: Vector2i,
    glyph: int
  ): Vector2

  /** Returns rectangle in the cache texture containing the glyph. */
  font_get_glyph_uv_rect(font_rid: RID, size: Vector2i, glyph: int): Rect2

  /** Returns the font hinting mode. Used by dynamic fonts only. */
  font_get_hinting(font_rid: RID): int

  /** Returns glyph position rounding behavior. If set to [code]true[/code], when aligning glyphs to the pixel boundaries rounding remainders are accumulated to ensure more uniform glyph distribution. This setting has no effect if subpixel positioning is enabled. */
  font_get_keep_rounding_remainders(font_rid: RID): boolean

  /** Returns kerning for the pair of glyphs. */
  font_get_kerning(font_rid: RID, size: int, glyph_pair: Vector2i): Vector2

  /** Returns list of the kerning overrides. */
  font_get_kerning_list(font_rid: RID, size: int): Vector2i[]

  /** Returns [code]true[/code] if support override is enabled for the [param language]. */
  font_get_language_support_override(font_rid: RID, language: string): boolean

  /** Returns list of language support overrides. */
  font_get_language_support_overrides(font_rid: RID): PackedStringArray

  /** Returns the width of the range around the shape between the minimum and maximum representable signed distance. */
  font_get_msdf_pixel_range(font_rid: RID): int

  /** Returns source font size used to generate MSDF textures. */
  font_get_msdf_size(font_rid: RID): int

  /** Returns font family name. */
  font_get_name(font_rid: RID): string

  /** Returns font OpenType feature set override. */
  font_get_opentype_feature_overrides(font_rid: RID): Dictionary<any, any>

  /** Returns [Dictionary] with OpenType font name strings (localized font names, version, description, license information, sample text, etc.). */
  font_get_ot_name_strings(font_rid: RID): Dictionary<any, any>

  /** Returns oversampling factor override. If set to a positive value, overrides the oversampling factor of the viewport this font is used in. See [member Viewport.oversampling]. This value doesn't override the [code skip-lint]oversampling[/code] parameter of [code skip-lint]draw_*[/code] methods. Used by dynamic fonts only. */
  font_get_oversampling(font_rid: RID): float

  /** Returns scaling factor of the color bitmap font. */
  font_get_scale(font_rid: RID, size: int): float

  /** Returns [code]true[/code] if support override is enabled for the [param script]. */
  font_get_script_support_override(font_rid: RID, script: string): boolean

  /** Returns list of script support overrides. */
  font_get_script_support_overrides(font_rid: RID): PackedStringArray

  /** Returns font cache information, each entry contains the following fields: [code]Vector2i size_px[/code] - font size in pixels, [code]float viewport_oversampling[/code] - viewport oversampling factor, [code]int glyphs[/code] - number of rendered glyphs, [code]int textures[/code] - number of used textures, [code]int textures_size[/code] - size of texture data in bytes. */
  font_get_size_cache_info(font_rid: RID): Dictionary<any, any>[]

  /** Returns list of the font sizes in the cache. Each size is [Vector2i] with font size and outline size. */
  font_get_size_cache_list(font_rid: RID): Vector2i[]

  /** Returns the spacing for [param spacing] in pixels (not relative to the font size). */
  font_get_spacing(font_rid: RID, spacing: int): int

  /** Returns font stretch amount, compared to a normal width. A percentage value between [code]50%[/code] and [code]200%[/code]. */
  font_get_stretch(font_rid: RID): int

  /** Returns font style flags. */
  font_get_style(font_rid: RID): int

  /** Returns font style name. */
  font_get_style_name(font_rid: RID): string

  /** Returns font subpixel glyph positioning mode. */
  font_get_subpixel_positioning(font_rid: RID): int

  /** Returns a string containing all the characters available in the font. */
  font_get_supported_chars(font_rid: RID): string

  /** Returns an array containing all glyph indices in the font. */
  font_get_supported_glyphs(font_rid: RID): PackedInt32Array

  /** Returns number of textures used by font cache entry. */
  font_get_texture_count(font_rid: RID, size: Vector2i): int

  /** Returns font cache texture image data. */
  font_get_texture_image(
    font_rid: RID,
    size: Vector2i,
    texture_index: int
  ): Image

  /** Returns array containing glyph packing data. */
  font_get_texture_offsets(
    font_rid: RID,
    size: Vector2i,
    texture_index: int
  ): PackedInt32Array

  /** Returns 2D transform applied to the font outlines. */
  font_get_transform(font_rid: RID): Transform2D

  /** Returns pixel offset of the underline below the baseline. */
  font_get_underline_position(font_rid: RID, size: int): float

  /** Returns thickness of the underline in pixels. */
  font_get_underline_thickness(font_rid: RID, size: int): float

  /** Returns variation coordinates for the specified font cache entry. See [method font_supported_variation_list] for more info. */
  font_get_variation_coordinates(font_rid: RID): Dictionary<any, any>

  /** Returns weight (boldness) of the font. A value in the [code]100...999[/code] range, normal font weight is [code]400[/code], bold font weight is [code]700[/code]. */
  font_get_weight(font_rid: RID): int

  /** Returns [code]true[/code] if a Unicode [param char] is available in the font. */
  font_has_char(font_rid: RID, char: int): boolean

  /** Returns [code]true[/code] if system fonts can be automatically used as fallbacks. */
  font_is_allow_system_fallback(font_rid: RID): boolean

  /** Returns [code]true[/code] if auto-hinting is supported and preferred over font built-in hinting. Used by dynamic fonts only. */
  font_is_force_autohinter(font_rid: RID): boolean

  /** Returns [code]true[/code] if the font supports the given language (as a [url=https://en.wikipedia.org/wiki/ISO_639-1]ISO 639[/url] code). */
  font_is_language_supported(font_rid: RID, language: string): boolean

  /** Returns [code]true[/code] if color modulation is applied when drawing the font's colored glyphs. */
  font_is_modulate_color_glyphs(font_rid: RID): boolean

  /** Returns [code]true[/code] if glyphs of all sizes are rendered using single multichannel signed distance field generated from the dynamic font vector data. */
  font_is_multichannel_signed_distance_field(font_rid: RID): boolean

  /** Returns [code]true[/code] if the font supports the given script (as a [url=https://en.wikipedia.org/wiki/ISO_15924]ISO 15924[/url] code). */
  font_is_script_supported(font_rid: RID, script: string): boolean

  /**
   * Removes specified rendered glyph information from the cache entry.
   *
   * **Note:** This function will not remove textures associated with the glyphs, use [method font_remove_texture] to remove them manually.
   *
   */
  font_remove_glyph(font_rid: RID, size: Vector2i, glyph: int): void

  /** Removes kerning override for the pair of glyphs. */
  font_remove_kerning(font_rid: RID, size: int, glyph_pair: Vector2i): void

  /** Remove language support override. */
  font_remove_language_support_override(font_rid: RID, language: string): void

  /** Removes script support override. */
  font_remove_script_support_override(font_rid: RID, script: string): void

  /** Removes specified font size from the cache entry. */
  font_remove_size_cache(font_rid: RID, size: Vector2i): void

  /**
   * Removes specified texture from the cache entry.
   *
   * **Note:** This function will not remove glyphs associated with the texture, remove them manually, using [method font_remove_glyph].
   *
   */
  font_remove_texture(font_rid: RID, size: Vector2i, texture_index: int): void

  /** Renders specified glyph to the font cache texture. */
  font_render_glyph(font_rid: RID, size: Vector2i, index: int): void

  /** Renders the range of characters to the font cache texture. */
  font_render_range(font_rid: RID, size: Vector2i, start: int, end: int): void

  /** If set to [code]true[/code], system fonts can be automatically used as fallbacks. */
  font_set_allow_system_fallback(
    font_rid: RID,
    allow_system_fallback: boolean
  ): void

  /** Sets font anti-aliasing mode. */
  font_set_antialiasing(font_rid: RID, antialiasing: int): void

  /** Sets the font ascent (number of pixels above the baseline). */
  font_set_ascent(font_rid: RID, size: int, ascent: float): void

  /** Sets extra baseline offset (as a fraction of font height). */
  font_set_baseline_offset(font_rid: RID, baseline_offset: float): void

  /** Sets font source data, e.g contents of the dynamic font source file. */
  font_set_data(font_rid: RID, data: PackedByteArray): void

  /** Sets the font descent (number of pixels below the baseline). */
  font_set_descent(font_rid: RID, size: int, descent: float): void

  /** If set to [code]true[/code], embedded font bitmap loading is disabled (bitmap-only and color fonts ignore this property). */
  font_set_disable_embedded_bitmaps(
    font_rid: RID,
    disable_embedded_bitmaps: boolean
  ): void

  /** Sets font embolden strength. If [param strength] is not equal to zero, emboldens the font outlines. Negative values reduce the outline thickness. */
  font_set_embolden(font_rid: RID, strength: float): void

  /** Sets an active face index in the TrueType / OpenType collection. */
  font_set_face_index(font_rid: RID, face_index: int): void

  /** Sets bitmap font fixed size. If set to value greater than zero, same cache entry will be used for all font sizes. */
  font_set_fixed_size(font_rid: RID, fixed_size: int): void

  /** Sets bitmap font scaling mode. This property is used only if [code]fixed_size[/code] is greater than zero. */
  font_set_fixed_size_scale_mode(
    font_rid: RID,
    fixed_size_scale_mode: int
  ): void

  /** If set to [code]true[/code] auto-hinting is preferred over font built-in hinting. */
  font_set_force_autohinter(font_rid: RID, force_autohinter: boolean): void

  /** If set to [code]true[/code] font texture mipmap generation is enabled. */
  font_set_generate_mipmaps(font_rid: RID, generate_mipmaps: boolean): void

  /** This method does nothing. */
  font_set_global_oversampling(oversampling: float): void

  /**
   * Sets glyph advance (offset of the next glyph).
   *
   * **Note:** Advance for glyphs outlines is the same as the base glyph advance and is not saved.
   *
   */
  font_set_glyph_advance(
    font_rid: RID,
    size: int,
    glyph: int,
    advance: Vector2
  ): void

  /** Sets glyph offset from the baseline. */
  font_set_glyph_offset(
    font_rid: RID,
    size: Vector2i,
    glyph: int,
    offset: Vector2
  ): void

  /** Sets size of the glyph. */
  font_set_glyph_size(
    font_rid: RID,
    size: Vector2i,
    glyph: int,
    gl_size: Vector2
  ): void

  /** Sets index of the cache texture containing the glyph. */
  font_set_glyph_texture_idx(
    font_rid: RID,
    size: Vector2i,
    glyph: int,
    texture_idx: int
  ): void

  /** Sets rectangle in the cache texture containing the glyph. */
  font_set_glyph_uv_rect(
    font_rid: RID,
    size: Vector2i,
    glyph: int,
    uv_rect: Rect2
  ): void

  /** Sets font hinting mode. Used by dynamic fonts only. */
  font_set_hinting(font_rid: RID, hinting: int): void

  /** Sets glyph position rounding behavior. If set to [code]true[/code], when aligning glyphs to the pixel boundaries rounding remainders are accumulated to ensure more uniform glyph distribution. This setting has no effect if subpixel positioning is enabled. */
  font_set_keep_rounding_remainders(
    font_rid: RID,
    keep_rounding_remainders: boolean
  ): void

  /** Sets kerning for the pair of glyphs. */
  font_set_kerning(
    font_rid: RID,
    size: int,
    glyph_pair: Vector2i,
    kerning: Vector2
  ): void

  /** Adds override for [method font_is_language_supported]. */
  font_set_language_support_override(
    font_rid: RID,
    language: string,
    supported: boolean
  ): void

  /** If set to [code]true[/code], color modulation is applied when drawing colored glyphs, otherwise it's applied to the monochrome glyphs only. */
  font_set_modulate_color_glyphs(font_rid: RID, force_autohinter: boolean): void

  /** Sets the width of the range around the shape between the minimum and maximum representable signed distance. */
  font_set_msdf_pixel_range(font_rid: RID, msdf_pixel_range: int): void

  /** Sets source font size used to generate MSDF textures. */
  font_set_msdf_size(font_rid: RID, msdf_size: int): void

  /**
   * If set to `true`, glyphs of all sizes are rendered using single multichannel signed distance field generated from the dynamic font vector data. MSDF rendering allows displaying the font at any scaling factor without blurriness, and without incurring a CPU cost when the font size changes (since the font no longer needs to be rasterized on the CPU). As a downside, font hinting is not available with MSDF. The lack of font hinting may result in less crisp and less readable fonts at small sizes.
   *
   * **Note:** MSDF font rendering does not render glyphs with overlapping shapes correctly. Overlapping shapes are not valid per the OpenType standard, but are still commonly found in many font files, especially those converted by Google Fonts. To avoid issues with overlapping glyphs, consider downloading the font file directly from the type foundry instead of relying on Google Fonts.
   *
   */
  font_set_multichannel_signed_distance_field(
    font_rid: RID,
    msdf: boolean
  ): void

  /** Sets the font family name. */
  font_set_name(font_rid: RID, name: string): void

  /** Sets font OpenType feature set override. */
  font_set_opentype_feature_overrides(
    font_rid: RID,
    overrides: Dictionary<any, any>
  ): void

  /** If set to a positive value, overrides the oversampling factor of the viewport this font is used in. See [member Viewport.oversampling]. This value doesn't override the [code skip-lint]oversampling[/code] parameter of [code skip-lint]draw_*[/code] methods. Used by dynamic fonts only. */
  font_set_oversampling(font_rid: RID, oversampling: float): void

  /** Sets scaling factor of the color bitmap font. */
  font_set_scale(font_rid: RID, size: int, scale: float): void

  /** Adds override for [method font_is_script_supported]. */
  font_set_script_support_override(
    font_rid: RID,
    script: string,
    supported: boolean
  ): void

  /** Sets the spacing for [param spacing] to [param value] in pixels (not relative to the font size). */
  font_set_spacing(font_rid: RID, spacing: int, value: int): void

  /**
   * Sets font stretch amount, compared to a normal width. A percentage value between `50%` and `200%`.
   *
   * **Note:** This value is used for font matching only and will not affect font rendering. Use [method font_set_face_index], [method font_set_variation_coordinates], or [method font_set_transform] instead.
   *
   */
  font_set_stretch(font_rid: RID, weight: int): void

  /**
   * Sets the font style flags.
   *
   * **Note:** This value is used for font matching only and will not affect font rendering. Use [method font_set_face_index], [method font_set_variation_coordinates], [method font_set_embolden], or [method font_set_transform] instead.
   *
   */
  font_set_style(font_rid: RID, style: int): void

  /** Sets the font style name. */
  font_set_style_name(font_rid: RID, name: string): void

  /** Sets font subpixel glyph positioning mode. */
  font_set_subpixel_positioning(font_rid: RID, subpixel_positioning: int): void

  /** Sets font cache texture image data. */
  font_set_texture_image(
    font_rid: RID,
    size: Vector2i,
    texture_index: int,
    image: Image
  ): void

  /** Sets array containing glyph packing data. */
  font_set_texture_offsets(
    font_rid: RID,
    size: Vector2i,
    texture_index: int,
    offset: PackedInt32Array
  ): void

  /**
   * Sets 2D transform, applied to the font outlines, can be used for slanting, flipping, and rotating glyphs.
   *
   * For example, to simulate italic typeface by slanting, apply the following transform `Transform2D(1.0, slant, 0.0, 1.0, 0.0, 0.0)`.
   *
   */
  font_set_transform(font_rid: RID, transform: Transform2D): void

  /** Sets pixel offset of the underline below the baseline. */
  font_set_underline_position(
    font_rid: RID,
    size: int,
    underline_position: float
  ): void

  /** Sets thickness of the underline in pixels. */
  font_set_underline_thickness(
    font_rid: RID,
    size: int,
    underline_thickness: float
  ): void

  /** Sets variation coordinates for the specified font cache entry. See [method font_supported_variation_list] for more info. */
  font_set_variation_coordinates(
    font_rid: RID,
    variation_coordinates: Dictionary<any, any>
  ): void

  /**
   * Sets weight (boldness) of the font. A value in the `100...999` range, normal font weight is `400`, bold font weight is `700`.
   *
   * **Note:** This value is used for font matching only and will not affect font rendering. Use [method font_set_face_index], [method font_set_variation_coordinates], or [method font_set_embolden] instead.
   *
   */
  font_set_weight(font_rid: RID, weight: int): void

  /** Returns the dictionary of the supported OpenType features. */
  font_supported_feature_list(font_rid: RID): Dictionary<any, any>

  /** Returns the dictionary of the supported OpenType variation coordinates. */
  font_supported_variation_list(font_rid: RID): Dictionary<any, any>

  /**
   * Converts a number from Western Arabic (0..9) to the numeral system used in the given [param language].
   *
   * If [param language] is an empty string, the active locale will be used.
   *
   */
  format_number(number: string, language?: string): string

  /** Frees an object created by this [TextServer]. */
  free_rid(rid: RID): void

  /** Returns text server features, see [enum Feature]. */
  get_features(): int

  /** Returns size of the replacement character (box with character hexadecimal code that is drawn in place of invalid characters). */
  get_hex_code_box_size(size: int, index: int): Vector2

  /** Returns the name of the server interface. */
  get_name(): string

  /** Returns default TextServer database (e.g. ICU break iterators and dictionaries). */
  get_support_data(): PackedByteArray

  /** Returns default TextServer database (e.g. ICU break iterators and dictionaries) filename. */
  get_support_data_filename(): string

  /** Returns TextServer database (e.g. ICU break iterators and dictionaries) description. */
  get_support_data_info(): string

  /** Returns [code]true[/code] if [param rid] is valid resource owned by this text server. */
  has(rid: RID): boolean

  /** Returns [code]true[/code] if the server supports a feature. */
  has_feature(feature: int): boolean

  /**
   * Returns index of the first string in [param dict] which is visually confusable with the [param string], or `-1` if none is found.
   *
   * **Note:** This method doesn't detect invisible characters, for spoof detection use it in combination with [method spoof_check].
   *
   * **Note:** Always returns `-1` if the server does not support the [constant FEATURE_UNICODE_SECURITY] feature.
   *
   */
  is_confusable(string: string, dict: PackedStringArray): int

  /** Returns [code]true[/code] if locale is right-to-left. */
  is_locale_right_to_left(locale: string): boolean

  /** Returns [code]true[/code] if the locale requires text server support data for line/word breaking. */
  is_locale_using_support_data(locale: string): boolean

  /**
   * Returns `true` if [param string] is a valid identifier.
   *
   * If the text server supports the [constant FEATURE_UNICODE_IDENTIFIERS] feature, a valid identifier must:
   *
   * - Conform to normalization form C.
   *
   * - Begin with a Unicode character of class XID_Start or `"_"`.
   *
   * - May contain Unicode characters of class XID_Continue in the other positions.
   *
   * - Use UAX #31 recommended scripts only (mixed scripts are allowed).
   *
   * If the [constant FEATURE_UNICODE_IDENTIFIERS] feature is not supported, a valid identifier must:
   *
   * - Begin with a Unicode character of class XID_Start or `"_"`.
   *
   * - May contain Unicode characters of class XID_Continue in the other positions.
   *
   */
  is_valid_identifier(string: string): boolean

  /** Returns [code]true[/code] if the given code point is a valid letter, i.e. it belongs to the Unicode category "L". */
  is_valid_letter(unicode: int): boolean

  /**
   * Loads optional TextServer database (e.g. ICU break iterators and dictionaries).
   *
   * **Note:** This function should be called before any other TextServer functions used, otherwise it won't have any effect.
   *
   */
  load_support_data(filename: string): boolean

  /** Converts the given readable name of a feature, variation, script, or language to an OpenType tag. */
  name_to_tag(name: string): int

  /**
   * Converts [param number] from the numeral system used in the given [param language] to Western Arabic (0..9).
   *
   * If [param language] is an empty string, the active locale will be used.
   *
   */
  parse_number(number: string, language?: string): string

  /** Default implementation of the BiDi algorithm override function. */
  parse_structured_text(parser_type: int, args: any[], text: string): Vector3i[]

  /**
   * Returns the percent sign used in the given [param language].
   *
   * If [param language] is an empty string, the active locale will be used.
   *
   */
  percent_sign(language?: string): string

  /**
   * Saves optional TextServer database (e.g. ICU break iterators and dictionaries) to the file.
   *
   * **Note:** This function is used by during project export, to include TextServer database.
   *
   */
  save_support_data(filename: string): boolean

  /** Returns the number of uniform text runs in the buffer. */
  shaped_get_run_count(shaped: RID): int

  /** Returns the direction of the [param index] text run (in visual order). */
  shaped_get_run_direction(shaped: RID, index: int): int

  /** Returns the font RID of the [param index] text run (in visual order). */
  shaped_get_run_font_rid(shaped: RID, index: int): RID

  /** Returns the font size of the [param index] text run (in visual order). */
  shaped_get_run_font_size(shaped: RID, index: int): int

  /** Returns the language of the [param index] text run (in visual order). */
  shaped_get_run_language(shaped: RID, index: int): string

  /** Returns the embedded object of the [param index] text run (in visual order). */
  shaped_get_run_object(shaped: RID, index: int): any

  /** Returns the source text range of the [param index] text run (in visual order). */
  shaped_get_run_range(shaped: RID, index: int): Vector2i

  /** Returns the source text of the [param index] text run (in visual order). */
  shaped_get_run_text(shaped: RID, index: int): string

  /** Returns number of text spans added using [method shaped_text_add_string] or [method shaped_text_add_object]. */
  shaped_get_span_count(shaped: RID): int

  /** Returns text embedded object key. */
  shaped_get_span_embedded_object(shaped: RID, index: int): any

  /** Returns text span metadata. */
  shaped_get_span_meta(shaped: RID, index: int): any

  /** Returns the text span embedded object key. */
  shaped_get_span_object(shaped: RID, index: int): any

  /** Returns the text span source text. */
  shaped_get_span_text(shaped: RID, index: int): string

  /** Returns the text buffer source text, including object replacement characters. */
  shaped_get_text(shaped: RID): string

  /** Changes text span font, font size, and OpenType features, without changing the text. */
  shaped_set_span_update_font(
    shaped: RID,
    index: int,
    fonts: RID[],
    size: int,
    opentype_features?: Dictionary<any, any>
  ): void

  /** Adds inline object to the text buffer, [param key] must be unique. In the text, object is represented as [param length] object replacement characters. */
  shaped_text_add_object(
    shaped: RID,
    key: any,
    size: Vector2,
    inline_align?: int,
    length?: int,
    baseline?: float
  ): boolean

  /** Adds text span and font to draw it to the text buffer. */
  shaped_text_add_string(
    shaped: RID,
    text: string,
    fonts: RID[],
    size: int,
    opentype_features?: Dictionary<any, any>,
    language?: string,
    meta?: any
  ): boolean

  /** Clears text buffer (removes text and inline objects). */
  shaped_text_clear(rid: RID): void

  /** Returns composite character position closest to the [param pos]. */
  shaped_text_closest_character_pos(shaped: RID, pos: int): int

  /**
   * Draw shaped text into a canvas item at a given position, with [param color]. [param pos] specifies the leftmost point of the baseline (for horizontal layout) or topmost point of the baseline (for vertical layout). If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   *
   * [param clip_l] and [param clip_r] are offsets relative to [param pos], going to the right in horizontal layout and downward in vertical layout. If [param clip_l] is not negative, glyphs starting before the offset are clipped. If [param clip_r] is not negative, glyphs ending after the offset are clipped.
   *
   */
  shaped_text_draw(
    shaped: RID,
    canvas: RID,
    pos: Vector2,
    clip_l?: float,
    clip_r?: float,
    color?: Color,
    oversampling?: float
  ): void

  /**
   * Draw the outline of the shaped text into a canvas item at a given position, with [param color]. [param pos] specifies the leftmost point of the baseline (for horizontal layout) or topmost point of the baseline (for vertical layout). If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   *
   * [param clip_l] and [param clip_r] are offsets relative to [param pos], going to the right in horizontal layout and downward in vertical layout. If [param clip_l] is not negative, glyphs starting before the offset are clipped. If [param clip_r] is not negative, glyphs ending after the offset are clipped.
   *
   */
  shaped_text_draw_outline(
    shaped: RID,
    canvas: RID,
    pos: Vector2,
    clip_l?: float,
    clip_r?: float,
    outline_size?: int,
    color?: Color,
    oversampling?: float
  ): void

  /** Duplicates shaped text buffer. */
  shaped_text_duplicate(rid: RID): RID

  /** Adjusts text width to fit to specified width, returns new text width. */
  shaped_text_fit_to_width(
    shaped: RID,
    width: float,
    justification_flags?: int
  ): float

  /**
   * Returns the text ascent (number of pixels above the baseline for horizontal layout or to the left of baseline for vertical).
   *
   * **Note:** Overall ascent can be higher than font ascent, if some glyphs are displaced from the baseline.
   *
   */
  shaped_text_get_ascent(shaped: RID): float

  /** Returns shapes of the carets corresponding to the character offset [param position] in the text. Returned caret shape is 1 pixel wide rectangle. */
  shaped_text_get_carets(shaped: RID, position: int): Dictionary<any, any>

  /** Returns array of the composite character boundaries. */
  shaped_text_get_character_breaks(shaped: RID): PackedInt32Array

  /** Returns ellipsis character used for text clipping. */
  shaped_text_get_custom_ellipsis(shaped: RID): int

  /** Returns custom punctuation character list, used for word breaking. If set to empty string, server defaults are used. */
  shaped_text_get_custom_punctuation(shaped: RID): string

  /**
   * Returns the text descent (number of pixels below the baseline for horizontal layout or to the right of baseline for vertical).
   *
   * **Note:** Overall descent can be higher than font descent, if some glyphs are displaced from the baseline.
   *
   */
  shaped_text_get_descent(shaped: RID): float

  /** Returns direction of the text. */
  shaped_text_get_direction(shaped: RID): int

  /** Returns dominant direction of in the range of text. */
  shaped_text_get_dominant_direction_in_range(
    shaped: RID,
    start: int,
    end: int
  ): int

  /** Returns number of glyphs in the ellipsis. */
  shaped_text_get_ellipsis_glyph_count(shaped: RID): int

  /** Returns array of the glyphs in the ellipsis. */
  shaped_text_get_ellipsis_glyphs(shaped: RID): Dictionary<any, any>[]

  /** Returns position of the ellipsis. */
  shaped_text_get_ellipsis_pos(shaped: RID): int

  /** Returns number of glyphs in the buffer. */
  shaped_text_get_glyph_count(shaped: RID): int

  /** Returns an array of glyphs in the visual order. */
  shaped_text_get_glyphs(shaped: RID): Dictionary<any, any>[]

  /** Returns composite character's bounds as offsets from the start of the line. */
  shaped_text_get_grapheme_bounds(shaped: RID, pos: int): Vector2

  /** Returns direction of the text, inferred by the BiDi algorithm. */
  shaped_text_get_inferred_direction(shaped: RID): int

  /** Breaks text to the lines and returns character ranges for each line. */
  shaped_text_get_line_breaks(
    shaped: RID,
    width: float,
    start?: int,
    break_flags?: int
  ): PackedInt32Array

  /** Breaks text to the lines and columns. Returns character ranges for each segment. */
  shaped_text_get_line_breaks_adv(
    shaped: RID,
    width: PackedFloat32Array,
    start?: int,
    once?: boolean,
    break_flags?: int
  ): PackedInt32Array

  /** Returns the glyph index of the inline object. */
  shaped_text_get_object_glyph(shaped: RID, key: any): int

  /** Returns the character range of the inline object. */
  shaped_text_get_object_range(shaped: RID, key: any): Vector2i

  /** Returns bounding rectangle of the inline object. */
  shaped_text_get_object_rect(shaped: RID, key: any): Rect2

  /** Returns array of inline objects. */
  shaped_text_get_objects(shaped: RID): any[]

  /** Returns text orientation. */
  shaped_text_get_orientation(shaped: RID): int

  /** Returns the parent buffer from which the substring originates. */
  shaped_text_get_parent(shaped: RID): RID

  /** Returns [code]true[/code] if text buffer is configured to display control characters. */
  shaped_text_get_preserve_control(shaped: RID): boolean

  /**
   * Returns `true` if text buffer is configured to display hexadecimal codes in place of invalid characters.
   *
   * **Note:** If set to `false`, nothing is displayed in place of invalid characters.
   *
   */
  shaped_text_get_preserve_invalid(shaped: RID): boolean

  /** Returns substring buffer character range in the parent buffer. */
  shaped_text_get_range(shaped: RID): Vector2i

  /** Returns selection rectangles for the specified character range. */
  shaped_text_get_selection(
    shaped: RID,
    start: int,
    end: int
  ): PackedVector2Array

  /** Returns size of the text. */
  shaped_text_get_size(shaped: RID): Vector2

  /** Returns extra spacing added between glyphs or lines in pixels. */
  shaped_text_get_spacing(shaped: RID, spacing: int): int

  /** Returns the position of the overrun trim. */
  shaped_text_get_trim_pos(shaped: RID): int

  /** Returns pixel offset of the underline below the baseline. */
  shaped_text_get_underline_position(shaped: RID): float

  /** Returns thickness of the underline. */
  shaped_text_get_underline_thickness(shaped: RID): float

  /** Returns width (for horizontal layout) or height (for vertical) of the text. */
  shaped_text_get_width(shaped: RID): float

  /** Breaks text into words and returns array of character ranges. Use [param grapheme_flags] to set what characters are used for breaking. */
  shaped_text_get_word_breaks(
    shaped: RID,
    grapheme_flags?: int,
    skip_grapheme_flags?: int
  ): PackedInt32Array

  /** Returns [code]true[/code] if an object with [param key] is embedded in this shaped text buffer. */
  shaped_text_has_object(shaped: RID, key: any): boolean

  /** Returns [code]true[/code] if text buffer contains any visible characters. */
  shaped_text_has_visible_chars(shaped: RID): boolean

  /** Returns grapheme index at the specified pixel offset at the baseline, or [code]-1[/code] if none is found. */
  shaped_text_hit_test_grapheme(shaped: RID, coords: float): int

  /** Returns caret character offset at the specified pixel offset at the baseline. This function always returns a valid position. */
  shaped_text_hit_test_position(shaped: RID, coords: float): int

  /** Returns [code]true[/code] if buffer is successfully shaped. */
  shaped_text_is_ready(shaped: RID): boolean

  /** Returns composite character end position closest to the [param pos]. */
  shaped_text_next_character_pos(shaped: RID, pos: int): int

  /** Returns grapheme end position closest to the [param pos]. */
  shaped_text_next_grapheme_pos(shaped: RID, pos: int): int

  /** Trims text if it exceeds the given width. */
  shaped_text_overrun_trim_to_width(
    shaped: RID,
    width?: float,
    overrun_trim_flags?: int
  ): void

  /** Returns composite character start position closest to the [param pos]. */
  shaped_text_prev_character_pos(shaped: RID, pos: int): int

  /** Returns grapheme start position closest to the [param pos]. */
  shaped_text_prev_grapheme_pos(shaped: RID, pos: int): int

  /** Sets new size and alignment of embedded object. */
  shaped_text_resize_object(
    shaped: RID,
    key: any,
    size: Vector2,
    inline_align?: int,
    baseline?: float
  ): boolean

  /**
   * Overrides BiDi for the structured text.
   *
   * Override ranges should cover full source text without overlaps. BiDi algorithm will be used on each range separately.
   *
   */
  shaped_text_set_bidi_override(shaped: RID, override: any[]): void

  /** Sets ellipsis character used for text clipping. */
  shaped_text_set_custom_ellipsis(shaped: RID, char: int): void

  /** Sets custom punctuation character list, used for word breaking. If set to empty string, server defaults are used. */
  shaped_text_set_custom_punctuation(shaped: RID, punct: string): void

  /**
   * Sets desired text direction. If set to [constant DIRECTION_AUTO], direction will be detected based on the buffer contents and current locale.
   *
   * **Note:** Direction is ignored if server does not support [constant FEATURE_BIDI_LAYOUT] feature (supported by [TextServerAdvanced]).
   *
   */
  shaped_text_set_direction(shaped: RID, direction?: int): void

  /**
   * Sets desired text orientation.
   *
   * **Note:** Orientation is ignored if server does not support [constant FEATURE_VERTICAL_LAYOUT] feature (supported by [TextServerAdvanced]).
   *
   */
  shaped_text_set_orientation(shaped: RID, orientation?: int): void

  /** If set to [code]true[/code] text buffer will display control characters. */
  shaped_text_set_preserve_control(shaped: RID, enabled: boolean): void

  /** If set to [code]true[/code] text buffer will display invalid characters as hexadecimal codes, otherwise nothing is displayed. */
  shaped_text_set_preserve_invalid(shaped: RID, enabled: boolean): void

  /** Sets extra spacing added between glyphs or lines in pixels. */
  shaped_text_set_spacing(shaped: RID, spacing: int, value: int): void

  /**
   * Shapes buffer if it's not shaped. Returns `true` if the string is shaped successfully.
   *
   * **Note:** It is not necessary to call this function manually, buffer will be shaped automatically as soon as any of its output data is requested.
   *
   */
  shaped_text_shape(shaped: RID): boolean

  /** Returns text glyphs in the logical order. */
  shaped_text_sort_logical(shaped: RID): Dictionary<any, any>[]

  /** Returns text buffer for the substring of the text in the [param shaped] text buffer (including inline objects). */
  shaped_text_substr(shaped: RID, start: int, length: int): RID

  /** Aligns shaped text to the given tab-stops. */
  shaped_text_tab_align(shaped: RID, tab_stops: PackedFloat32Array): float

  /**
   * Returns `true` if [param string] is likely to be an attempt at confusing the reader.
   *
   * **Note:** Always returns `false` if the server does not support the [constant FEATURE_UNICODE_SECURITY] feature.
   *
   */
  spoof_check(string: string): boolean

  /**
   * Returns array of the composite character boundaries.
   *
   * @example
   *
   * var ts = TextServerManager.get_primary_interface()
   * print(ts.string_get_character_breaks("Test ❤️‍🔥 Test")) # Prints [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14]
   * @summary
   *
   *
   */
  string_get_character_breaks(
    string: string,
    language?: string
  ): PackedInt32Array

  /**
   * Returns an array of the word break boundaries. Elements in the returned array are the offsets of the start and end of words. Therefore the length of the array is always even.
   *
   * When [param chars_per_line] is greater than zero, line break boundaries are returned instead.
   *
   * @example
   *
   * var ts = TextServerManager.get_primary_interface()
   * # Corresponds to the substrings "The", "Godot", "Engine", and "4".
   * print(ts.string_get_word_breaks("The Godot Engine, 4")) # Prints [0, 3, 4, 9, 10, 16, 18, 19]
   * # Corresponds to the substrings "The", "Godot", "Engin", and "e, 4".
   * print(ts.string_get_word_breaks("The Godot Engine, 4", "en", 5)) # Prints [0, 3, 4, 9, 10, 15, 15, 19]
   * # Corresponds to the substrings "The Godot" and "Engine, 4".
   * print(ts.string_get_word_breaks("The Godot Engine, 4", "en", 10)) # Prints [0, 9, 10, 19]
   * @summary
   *
   *
   */
  string_get_word_breaks(
    string: string,
    language?: string,
    chars_per_line?: int
  ): PackedInt32Array

  /**
   * Returns the string converted to `lowercase`.
   *
   * **Note:** Casing is locale dependent and context sensitive if server support [constant FEATURE_CONTEXT_SENSITIVE_CASE_CONVERSION] feature (supported by [TextServerAdvanced]).
   *
   * **Note:** The result may be longer or shorter than the original.
   *
   */
  string_to_lower(string: string, language?: string): string

  /**
   * Returns the string converted to `Title Case`.
   *
   * **Note:** Casing is locale dependent and context sensitive if server support [constant FEATURE_CONTEXT_SENSITIVE_CASE_CONVERSION] feature (supported by [TextServerAdvanced]).
   *
   * **Note:** The result may be longer or shorter than the original.
   *
   */
  string_to_title(string: string, language?: string): string

  /**
   * Returns the string converted to `UPPERCASE`.
   *
   * **Note:** Casing is locale dependent and context sensitive if server support [constant FEATURE_CONTEXT_SENSITIVE_CASE_CONVERSION] feature (supported by [TextServerAdvanced]).
   *
   * **Note:** The result may be longer or shorter than the original.
   *
   */
  string_to_upper(string: string, language?: string): string

  /**
   * Strips diacritics from the string.
   *
   * **Note:** The result may be longer or shorter than the original.
   *
   */
  strip_diacritics(string: string): string

  /** Converts the given OpenType tag to the readable name of a feature, variation, script, or language. */
  tag_to_name(tag: int): string

  connect<T extends SignalsOf<TextServer>>(
    signal: T,
    method: SignalFunction<TextServer[T]>
  ): number

  /**
   * Font glyphs are rasterized as 1-bit bitmaps.
   *
   */
  static FONT_ANTIALIASING_NONE: any

  /**
   * Font glyphs are rasterized as 8-bit grayscale anti-aliased bitmaps.
   *
   */
  static FONT_ANTIALIASING_GRAY: any

  /**
   * Font glyphs are rasterized for LCD screens.
   *
   * LCD subpixel layout is determined by the value of the [member ProjectSettings.gui/theme/lcd_subpixel_layout] setting.
   *
   * LCD subpixel anti-aliasing mode is suitable only for rendering horizontal, unscaled text in 2D.
   *
   */
  static FONT_ANTIALIASING_LCD: any

  /**
   * Unknown or unsupported subpixel layout, LCD subpixel antialiasing is disabled.
   *
   */
  static FONT_LCD_SUBPIXEL_LAYOUT_NONE: any

  /**
   * Horizontal RGB subpixel layout.
   *
   */
  static FONT_LCD_SUBPIXEL_LAYOUT_HRGB: any

  /**
   * Horizontal BGR subpixel layout.
   *
   */
  static FONT_LCD_SUBPIXEL_LAYOUT_HBGR: any

  /**
   * Vertical RGB subpixel layout.
   *
   */
  static FONT_LCD_SUBPIXEL_LAYOUT_VRGB: any

  /**
   * Vertical BGR subpixel layout.
   *
   */
  static FONT_LCD_SUBPIXEL_LAYOUT_VBGR: any

  /**
   * Represents the size of the [enum FontLCDSubpixelLayout] enum.
   *
   */
  static FONT_LCD_SUBPIXEL_LAYOUT_MAX: any

  /**
   * Text direction is determined based on contents and current locale.
   *
   */
  static DIRECTION_AUTO: any

  /**
   * Text is written from left to right.
   *
   */
  static DIRECTION_LTR: any

  /**
   * Text is written from right to left.
   *
   */
  static DIRECTION_RTL: any

  /**
   * Text writing direction is the same as base string writing direction. Used for BiDi override only.
   *
   */
  static DIRECTION_INHERITED: any

  /**
   * Text is written horizontally.
   *
   */
  static ORIENTATION_HORIZONTAL: any

  /**
   * Left to right text is written vertically from top to bottom.
   *
   * Right to left text is written vertically from bottom to top.
   *
   */
  static ORIENTATION_VERTICAL: any

  /**
   * Do not justify text.
   *
   */
  static JUSTIFICATION_NONE: any

  /**
   * Justify text by adding and removing kashidas.
   *
   */
  static JUSTIFICATION_KASHIDA: any

  /**
   * Justify text by changing width of the spaces between the words.
   *
   */
  static JUSTIFICATION_WORD_BOUND: any

  /**
   * Remove trailing and leading spaces from the justified text.
   *
   */
  static JUSTIFICATION_TRIM_EDGE_SPACES: any

  /**
   * Only apply justification to the part of the text after the last tab.
   *
   */
  static JUSTIFICATION_AFTER_LAST_TAB: any

  /**
   * Apply justification to the trimmed line with ellipsis.
   *
   */
  static JUSTIFICATION_CONSTRAIN_ELLIPSIS: any

  /**
   * Do not apply justification to the last line of the paragraph.
   *
   */
  static JUSTIFICATION_SKIP_LAST_LINE: any

  /**
   * Do not apply justification to the last line of the paragraph with visible characters (takes precedence over [constant JUSTIFICATION_SKIP_LAST_LINE]).
   *
   */
  static JUSTIFICATION_SKIP_LAST_LINE_WITH_VISIBLE_CHARS: any

  /**
   * Always apply justification to the paragraphs with a single line ([constant JUSTIFICATION_SKIP_LAST_LINE] and [constant JUSTIFICATION_SKIP_LAST_LINE_WITH_VISIBLE_CHARS] are ignored).
   *
   */
  static JUSTIFICATION_DO_NOT_SKIP_SINGLE_LINE: any

  /**
   * Autowrap is disabled.
   *
   */
  static AUTOWRAP_OFF: any

  /**
   * Wraps the text inside the node's bounding rectangle by allowing to break lines at arbitrary positions, which is useful when very limited space is available.
   *
   */
  static AUTOWRAP_ARBITRARY: any

  /**
   * Wraps the text inside the node's bounding rectangle by soft-breaking between words.
   *
   */
  static AUTOWRAP_WORD: any

  /**
   * Behaves similarly to [constant AUTOWRAP_WORD], but force-breaks a word if that single word does not fit in one line.
   *
   */
  static AUTOWRAP_WORD_SMART: any

  /**
   * Do not break the line.
   *
   */
  static BREAK_NONE: any

  /**
   * Break the line at the line mandatory break characters (e.g. `"\n"`).
   *
   */
  static BREAK_MANDATORY: any

  /**
   * Break the line between the words.
   *
   */
  static BREAK_WORD_BOUND: any

  /**
   * Break the line between any unconnected graphemes.
   *
   */
  static BREAK_GRAPHEME_BOUND: any

  /**
   * Should be used only in conjunction with [constant BREAK_WORD_BOUND], break the line between any unconnected graphemes, if it's impossible to break it between the words.
   *
   */
  static BREAK_ADAPTIVE: any

  /**
   * Remove edge spaces from the broken line segments.
   *
   */
  static BREAK_TRIM_EDGE_SPACES: any

  /**
   * Subtract first line indentation width from all lines after the first one.
   *
   */
  static BREAK_TRIM_INDENT: any

  /**
   * Remove spaces and line break characters from the start of broken line segments.
   *
   * E.g, after line breaking, the second segment of the following text `test  \n  next`, is `next` if the flag is set, and `  next` if it is not.
   *
   */
  static BREAK_TRIM_START_EDGE_SPACES: any

  /**
   * Remove spaces and line break characters from the end of broken line segments.
   *
   * E.g, after line breaking, the first segment of the following text `test  \n  next`, is `test` if the flag is set, and `test  \n` if it is not.
   *
   */
  static BREAK_TRIM_END_EDGE_SPACES: any

  /**
   * Trims text before the shaping. e.g, increasing [member Label.visible_characters] or [member RichTextLabel.visible_characters] value is visually identical to typing the text.
   *
   * **Note:** In this mode, trimmed text is not processed at all. It is not accounted for in line breaking and size calculations.
   *
   */
  static VC_CHARS_BEFORE_SHAPING: any

  /**
   * Displays glyphs that are mapped to the first [member Label.visible_characters] or [member RichTextLabel.visible_characters] characters from the beginning of the text.
   *
   */
  static VC_CHARS_AFTER_SHAPING: any

  /**
   * Displays [member Label.visible_ratio] or [member RichTextLabel.visible_ratio] glyphs, starting from the left or from the right, depending on [member Control.layout_direction] value.
   *
   */
  static VC_GLYPHS_AUTO: any

  /**
   * Displays [member Label.visible_ratio] or [member RichTextLabel.visible_ratio] glyphs, starting from the left.
   *
   */
  static VC_GLYPHS_LTR: any

  /**
   * Displays [member Label.visible_ratio] or [member RichTextLabel.visible_ratio] glyphs, starting from the right.
   *
   */
  static VC_GLYPHS_RTL: any

  /**
   * No text trimming is performed.
   *
   */
  static OVERRUN_NO_TRIMMING: any

  /**
   * Trims the text per character.
   *
   */
  static OVERRUN_TRIM_CHAR: any

  /**
   * Trims the text per word.
   *
   */
  static OVERRUN_TRIM_WORD: any

  /**
   * Trims the text per character and adds an ellipsis to indicate that parts are hidden if trimmed text is 6 characters or longer.
   *
   */
  static OVERRUN_TRIM_ELLIPSIS: any

  /**
   * Trims the text per word and adds an ellipsis to indicate that parts are hidden if trimmed text is 6 characters or longer.
   *
   */
  static OVERRUN_TRIM_WORD_ELLIPSIS: any

  /**
   * Trims the text per character and adds an ellipsis to indicate that parts are hidden regardless of trimmed text length.
   *
   */
  static OVERRUN_TRIM_ELLIPSIS_FORCE: any

  /**
   * Trims the text per word and adds an ellipsis to indicate that parts are hidden regardless of trimmed text length.
   *
   */
  static OVERRUN_TRIM_WORD_ELLIPSIS_FORCE: any

  /**
   * No trimming is performed.
   *
   */
  static OVERRUN_NO_TRIM: any

  /**
   * Trims the text when it exceeds the given width.
   *
   */
  static OVERRUN_TRIM: any

  /**
   * Trims the text per word instead of per grapheme.
   *
   */
  static OVERRUN_TRIM_WORD_ONLY: any

  /**
   * Determines whether an ellipsis should be added at the end of the text.
   *
   */
  static OVERRUN_ADD_ELLIPSIS: any

  /**
   * Determines whether the ellipsis at the end of the text is enforced and may not be hidden.
   *
   */
  static OVERRUN_ENFORCE_ELLIPSIS: any

  /**
   * Accounts for the text being justified before attempting to trim it (see [enum JustificationFlag]).
   *
   */
  static OVERRUN_JUSTIFICATION_AWARE: any

  /**
   * Determines whether the ellipsis should be added regardless of the string length, otherwise it is added only if the string is 6 characters or longer.
   *
   */
  static OVERRUN_SHORT_STRING_ELLIPSIS: any

  /**
   * Grapheme is supported by the font, and can be drawn.
   *
   */
  static GRAPHEME_IS_VALID: any

  /**
   * Grapheme is part of right-to-left or bottom-to-top run.
   *
   */
  static GRAPHEME_IS_RTL: any

  /**
   * Grapheme is not part of source text, it was added by justification process.
   *
   */
  static GRAPHEME_IS_VIRTUAL: any

  /**
   * Grapheme is whitespace.
   *
   */
  static GRAPHEME_IS_SPACE: any

  /**
   * Grapheme is mandatory break point (e.g. `"\n"`).
   *
   */
  static GRAPHEME_IS_BREAK_HARD: any

  /**
   * Grapheme is optional break point (e.g. space).
   *
   */
  static GRAPHEME_IS_BREAK_SOFT: any

  /**
   * Grapheme is the tabulation character.
   *
   */
  static GRAPHEME_IS_TAB: any

  /**
   * Grapheme is kashida.
   *
   */
  static GRAPHEME_IS_ELONGATION: any

  /**
   * Grapheme is punctuation character.
   *
   */
  static GRAPHEME_IS_PUNCTUATION: any

  /**
   * Grapheme is underscore character.
   *
   */
  static GRAPHEME_IS_UNDERSCORE: any

  /**
   * Grapheme is connected to the previous grapheme. Breaking line before this grapheme is not safe.
   *
   */
  static GRAPHEME_IS_CONNECTED: any

  /**
   * It is safe to insert a U+0640 before this grapheme for elongation.
   *
   */
  static GRAPHEME_IS_SAFE_TO_INSERT_TATWEEL: any

  /**
   * Grapheme is an object replacement character for the embedded object.
   *
   */
  static GRAPHEME_IS_EMBEDDED_OBJECT: any

  /**
   * Grapheme is a soft hyphen.
   *
   */
  static GRAPHEME_IS_SOFT_HYPHEN: any

  /**
   * Disables font hinting (smoother but less crisp).
   *
   */
  static HINTING_NONE: any

  /**
   * Use the light font hinting mode.
   *
   */
  static HINTING_LIGHT: any

  /**
   * Use the default font hinting mode (crisper but less smooth).
   *
   * **Note:** This hinting mode changes both horizontal and vertical glyph metrics. If applied to monospace font, some glyphs might have different width.
   *
   */
  static HINTING_NORMAL: any

  /**
   * Glyph horizontal position is rounded to the whole pixel size, each glyph is rasterized once.
   *
   */
  static SUBPIXEL_POSITIONING_DISABLED: any

  /**
   * Glyph horizontal position is rounded based on font size.
   *
   * - To one quarter of the pixel size if font size is smaller or equal to [constant SUBPIXEL_POSITIONING_ONE_QUARTER_MAX_SIZE].
   *
   * - To one half of the pixel size if font size is smaller or equal to [constant SUBPIXEL_POSITIONING_ONE_HALF_MAX_SIZE].
   *
   * - To the whole pixel size for larger fonts.
   *
   */
  static SUBPIXEL_POSITIONING_AUTO: any

  /**
   * Glyph horizontal position is rounded to one half of the pixel size, each glyph is rasterized up to two times.
   *
   */
  static SUBPIXEL_POSITIONING_ONE_HALF: any

  /**
   * Glyph horizontal position is rounded to one quarter of the pixel size, each glyph is rasterized up to four times.
   *
   */
  static SUBPIXEL_POSITIONING_ONE_QUARTER: any

  /**
   * Maximum font size which will use "one half of the pixel" subpixel positioning in [constant SUBPIXEL_POSITIONING_AUTO] mode.
   *
   */
  static SUBPIXEL_POSITIONING_ONE_HALF_MAX_SIZE: any

  /**
   * Maximum font size which will use "one quarter of the pixel" subpixel positioning in [constant SUBPIXEL_POSITIONING_AUTO] mode.
   *
   */
  static SUBPIXEL_POSITIONING_ONE_QUARTER_MAX_SIZE: any

  /**
   * TextServer supports simple text layouts.
   *
   */
  static FEATURE_SIMPLE_LAYOUT: any

  /**
   * TextServer supports bidirectional text layouts.
   *
   */
  static FEATURE_BIDI_LAYOUT: any

  /**
   * TextServer supports vertical layouts.
   *
   */
  static FEATURE_VERTICAL_LAYOUT: any

  /**
   * TextServer supports complex text shaping.
   *
   */
  static FEATURE_SHAPING: any

  /**
   * TextServer supports justification using kashidas.
   *
   */
  static FEATURE_KASHIDA_JUSTIFICATION: any

  /**
   * TextServer supports complex line/word breaking rules (e.g. dictionary based).
   *
   */
  static FEATURE_BREAK_ITERATORS: any

  /**
   * TextServer supports loading bitmap fonts.
   *
   */
  static FEATURE_FONT_BITMAP: any

  /**
   * TextServer supports loading dynamic (TrueType, OpeType, etc.) fonts.
   *
   */
  static FEATURE_FONT_DYNAMIC: any

  /**
   * TextServer supports multichannel signed distance field dynamic font rendering.
   *
   */
  static FEATURE_FONT_MSDF: any

  /**
   * TextServer supports loading system fonts.
   *
   */
  static FEATURE_FONT_SYSTEM: any

  /**
   * TextServer supports variable fonts.
   *
   */
  static FEATURE_FONT_VARIABLE: any

  /**
   * TextServer supports locale dependent and context sensitive case conversion.
   *
   */
  static FEATURE_CONTEXT_SENSITIVE_CASE_CONVERSION: any

  /**
   * TextServer require external data file for some features, see [method load_support_data].
   *
   */
  static FEATURE_USE_SUPPORT_DATA: any

  /**
   * TextServer supports UAX #31 identifier validation, see [method is_valid_identifier].
   *
   */
  static FEATURE_UNICODE_IDENTIFIERS: any

  /**
   * TextServer supports [url=https://unicode.org/reports/tr36/]Unicode Technical Report #36[/url] and [url=https://unicode.org/reports/tr39/]Unicode Technical Standard #39[/url] based spoof detection features.
   *
   */
  static FEATURE_UNICODE_SECURITY: any

  /**
   * Contour point is on the curve.
   *
   */
  static CONTOUR_CURVE_TAG_ON: any

  /**
   * Contour point isn't on the curve, but serves as a control point for a conic (quadratic) Bézier arc.
   *
   */
  static CONTOUR_CURVE_TAG_OFF_CONIC: any

  /**
   * Contour point isn't on the curve, but serves as a control point for a cubic Bézier arc.
   *
   */
  static CONTOUR_CURVE_TAG_OFF_CUBIC: any

  /**
   * Spacing for each glyph.
   *
   */
  static SPACING_GLYPH: any

  /**
   * Spacing for the space character.
   *
   */
  static SPACING_SPACE: any

  /**
   * Spacing at the top of the line.
   *
   */
  static SPACING_TOP: any

  /**
   * Spacing at the bottom of the line.
   *
   */
  static SPACING_BOTTOM: any

  /**
   * Represents the size of the [enum SpacingType] enum.
   *
   */
  static SPACING_MAX: any

  /**
   * Font is bold.
   *
   */
  static FONT_BOLD: any

  /**
   * Font is italic or oblique.
   *
   */
  static FONT_ITALIC: any

  /**
   * Font has fixed-width characters (also known as monospace).
   *
   */
  static FONT_FIXED_WIDTH: any

  /**
   * Use default Unicode BiDi algorithm.
   *
   */
  static STRUCTURED_TEXT_DEFAULT: any

  /**
   * BiDi override for URI.
   *
   */
  static STRUCTURED_TEXT_URI: any

  /**
   * BiDi override for file path.
   *
   */
  static STRUCTURED_TEXT_FILE: any

  /**
   * BiDi override for email.
   *
   */
  static STRUCTURED_TEXT_EMAIL: any

  /**
   * BiDi override for lists. Structured text options: list separator [String].
   *
   */
  static STRUCTURED_TEXT_LIST: any

  /**
   * BiDi override for GDScript.
   *
   */
  static STRUCTURED_TEXT_GDSCRIPT: any

  /**
   * User defined structured text BiDi override function.
   *
   */
  static STRUCTURED_TEXT_CUSTOM: any

  /**
   * Bitmap font is not scaled.
   *
   */
  static FIXED_SIZE_SCALE_DISABLE: any

  /**
   * Bitmap font is scaled to the closest integer multiple of the font's fixed size. This is the recommended option for pixel art fonts.
   *
   */
  static FIXED_SIZE_SCALE_INTEGER_ONLY: any

  /**
   * Bitmap font is scaled to an arbitrary (fractional) size. This is the recommended option for non-pixel art fonts.
   *
   */
  static FIXED_SIZE_SCALE_ENABLED: any
}
