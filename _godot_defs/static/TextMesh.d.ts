/**
 * Generate a [PrimitiveMesh] from the text.
 *
 * TextMesh can be generated only when using dynamic fonts with vector glyph contours. Bitmap fonts (including bitmap data in the TrueType/OpenType containers, like color emoji fonts) are not supported.
 *
 * The UV layout is arranged in 4 horizontal strips, top to bottom: 40% of the height for the front face, 40% for the back face, 10% for the outer edges and 10% for the inner edges.
 *
 */
declare class TextMesh extends PrimitiveMesh {
  /**
   * Generate a [PrimitiveMesh] from the text.
   *
   * TextMesh can be generated only when using dynamic fonts with vector glyph contours. Bitmap fonts (including bitmap data in the TrueType/OpenType containers, like color emoji fonts) are not supported.
   *
   * The UV layout is arranged in 4 horizontal strips, top to bottom: 40% of the height for the front face, 40% for the back face, 10% for the outer edges and 10% for the inner edges.
   *
   */
  new(): TextMesh
  constructor()
  static new(): TextMesh

  /** If set to something other than [constant TextServer.AUTOWRAP_OFF], the text gets wrapped inside the node's bounding rectangle. If you resize the node, it will change its height automatically to show all the text. */
  autowrap_mode: int

  /**
   * Step (in pixels) used to approximate Bézier curves. Lower values result in smoother curves, but is slower to generate and render. Consider adjusting this according to the font size and the typical viewing distance.
   *
   * **Note:** Changing this property will regenerate the mesh, which is a slow operation, especially with large font sizes and long texts.
   *
   */
  curve_step: float

  /** Depths of the mesh, if set to [code]0.0[/code] only front surface, is generated, and UV layout is changed to use full texture for the front face only. */
  depth: float

  /** Font configuration used to display text. */
  font: Font

  /**
   * Font size of the [TextMesh]'s text. This property works in tandem with [member pixel_size]. Higher values will result in a more detailed font, regardless of [member curve_step] and [member pixel_size]. Consider keeping this value below 63 (inclusive) for good performance, and adjust [member pixel_size] as needed to enlarge text.
   *
   * **Note:** Changing this property will regenerate the mesh, which is a slow operation, especially with large font sizes and long texts. To change the text's size in real-time efficiently, change the node's [member Node3D.scale] instead.
   *
   */
  font_size: int

  /** Controls the text's horizontal alignment. Supports left, center, right, and fill (also known as justify). */
  horizontal_alignment: int

  /** Line fill alignment rules. */
  justification_flags: int

  /** Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead. */
  language: string

  /** Additional vertical spacing between lines (in pixels), spacing is added to line descent. This value can be negative. */
  line_spacing: float

  /**
   * The text drawing offset (in pixels).
   *
   * **Note:** Changing this property will regenerate the mesh, which is a slow operation. To change the text's position in real-time efficiently, change the node's [member Node3D.position] instead.
   *
   */
  offset: Vector2

  /**
   * The size of one pixel's width on the text to scale it in 3D. This property works in tandem with [member font_size].
   *
   * **Note:** Changing this property will regenerate the mesh, which is a slow operation, especially with large font sizes and long texts. To change the text's size in real-time efficiently, change the node's [member Node3D.scale] instead.
   *
   */
  pixel_size: float

  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int

  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: any[]

  /**
   * The text to generate mesh from.
   *
   * **Note:** Due to being a [Resource], it doesn't follow the rules of [member Node.auto_translate_mode]. If disabling translation is desired, it should be done manually with [method Object.set_message_translation].
   *
   */
  text: string

  /** Base text writing direction. */
  text_direction: int

  /** If [code]true[/code], all the text displays as UPPERCASE. */
  uppercase: boolean

  /** Controls the text's vertical alignment. Supports top, center, and bottom. */
  vertical_alignment: int

  /** Text width (in pixels), used for fill alignment. */
  width: float

  connect<T extends SignalsOf<TextMesh>>(
    signal: T,
    method: SignalFunction<TextMesh[T]>
  ): number
}
