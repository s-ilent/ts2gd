/**
 * Abstraction over [TextServer] for handling a single paragraph of text.
 *
 */
declare class TextParagraph extends RefCounted {
  /**
   * Abstraction over [TextServer] for handling a single paragraph of text.
   *
   */
  new(): TextParagraph
  constructor()
  static new(): TextParagraph

  /** Paragraph horizontal alignment. */
  alignment: int

  /** Line breaking rules. For more info see [TextServer]. */
  break_flags: int

  /** Custom punctuation character list, used for word breaking. If set to empty string, server defaults are used. */
  custom_punctuation: string

  /** Text writing direction. */
  direction: int

  /** Ellipsis character used for text clipping. */
  ellipsis_char: string

  /** Line fill alignment rules. */
  justification_flags: int

  /** Additional vertical spacing between lines (in pixels), spacing is added to line descent. This value can be negative. */
  line_spacing: float

  /** Limits the lines of text shown. */
  max_lines_visible: int

  /** Text orientation. */
  orientation: int

  /** If set to [code]true[/code] text will display control characters. */
  preserve_control: boolean

  /** If set to [code]true[/code] text will display invalid characters. */
  preserve_invalid: boolean

  /** The clipping behavior when the text exceeds the paragraph's set width. */
  text_overrun_behavior: int

  /** Paragraph width. */
  width: float

  /** Adds inline object to the text buffer, [param key] must be unique. In the text, object is represented as [param length] object replacement characters. */
  add_object(
    key: any,
    size: Vector2,
    inline_align?: int,
    length?: int,
    baseline?: float
  ): boolean

  /** Adds text span and font to draw it. */
  add_string(
    text: string,
    font: Font,
    font_size: int,
    language?: string,
    meta?: any
  ): boolean

  /** Clears text paragraph (removes text and inline objects). */
  clear(): void

  /** Removes dropcap. */
  clear_dropcap(): void

  /** Draw all lines of the text and drop cap into a canvas item at a given position, with [param color]. [param pos] specifies the top left corner of the bounding box. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  draw(
    canvas: RID,
    pos: Vector2,
    color?: Color,
    dc_color?: Color,
    oversampling?: float
  ): void

  /** Draw drop cap into a canvas item at a given position, with [param color]. [param pos] specifies the top left corner of the bounding box. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  draw_dropcap(
    canvas: RID,
    pos: Vector2,
    color?: Color,
    oversampling?: float
  ): void

  /** Draw drop cap outline into a canvas item at a given position, with [param color]. [param pos] specifies the top left corner of the bounding box. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  draw_dropcap_outline(
    canvas: RID,
    pos: Vector2,
    outline_size?: int,
    color?: Color,
    oversampling?: float
  ): void

  /** Draw single line of text into a canvas item at a given position, with [param color]. [param pos] specifies the top left corner of the bounding box. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  draw_line(
    canvas: RID,
    pos: Vector2,
    line: int,
    color?: Color,
    oversampling?: float
  ): void

  /** Draw outline of the single line of text into a canvas item at a given position, with [param color]. [param pos] specifies the top left corner of the bounding box. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  draw_line_outline(
    canvas: RID,
    pos: Vector2,
    line: int,
    outline_size?: int,
    color?: Color,
    oversampling?: float
  ): void

  /** Draw outlines of all lines of the text and drop cap into a canvas item at a given position, with [param color]. [param pos] specifies the top left corner of the bounding box. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  draw_outline(
    canvas: RID,
    pos: Vector2,
    outline_size?: int,
    color?: Color,
    dc_color?: Color,
    oversampling?: float
  ): void

  /** Duplicates this [TextParagraph]. */
  duplicate(): TextParagraph

  /** Returns number of lines used by dropcap. */
  get_dropcap_lines(): int

  /** Returns drop cap text buffer RID. */
  get_dropcap_rid(): RID

  /** Returns drop cap bounding box size. */
  get_dropcap_size(): Vector2

  /** Returns the text writing direction inferred by the BiDi algorithm. */
  get_inferred_direction(): int

  /** Returns the text line ascent (number of pixels above the baseline for horizontal layout or to the left of baseline for vertical). */
  get_line_ascent(line: int): float

  /** Returns number of lines in the paragraph. */
  get_line_count(): int

  /** Returns the text line descent (number of pixels below the baseline for horizontal layout or to the right of baseline for vertical). */
  get_line_descent(line: int): float

  /** Returns bounding rectangle of the inline object. */
  get_line_object_rect(line: int, key: any): Rect2

  /** Returns array of inline objects in the line. */
  get_line_objects(line: int): any[]

  /** Returns character range of the line. */
  get_line_range(line: int): Vector2i

  /** Returns TextServer line buffer RID. */
  get_line_rid(line: int): RID

  /** Returns size of the bounding box of the line of text. Returned size is rounded up. */
  get_line_size(line: int): Vector2

  /** Returns pixel offset of the underline below the baseline. */
  get_line_underline_position(line: int): float

  /** Returns thickness of the underline. */
  get_line_underline_thickness(line: int): float

  /** Returns width (for horizontal layout) or height (for vertical) of the line of text. */
  get_line_width(line: int): float

  /** Returns the size of the bounding box of the paragraph, without line breaks. */
  get_non_wrapped_size(): Vector2

  /** Returns the character range of the paragraph. */
  get_range(): Vector2i

  /** Returns TextServer full string buffer RID. */
  get_rid(): RID

  /** Returns the size of the bounding box of the paragraph. */
  get_size(): Vector2

  /** Returns [code]true[/code] if an object with [param key] is embedded in this shaped text buffer. */
  has_object(key: any): boolean

  /** Returns caret character offset at the specified coordinates. This function always returns a valid position. */
  hit_test(coords: Vector2): int

  /** Sets new size and alignment of embedded object. */
  resize_object(
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
  set_bidi_override(override: any[]): void

  /** Sets drop cap, overrides previously set drop cap. Drop cap (dropped capital) is a decorative element at the beginning of a paragraph that is larger than the rest of the text. */
  set_dropcap(
    text: string,
    font: Font,
    font_size: int,
    dropcap_margins?: Rect2,
    language?: string
  ): boolean

  /** Aligns paragraph to the given tab-stops. */
  tab_align(tab_stops: PackedFloat32Array): void

  connect<T extends SignalsOf<TextParagraph>>(
    signal: T,
    method: SignalFunction<TextParagraph[T]>
  ): number
}
