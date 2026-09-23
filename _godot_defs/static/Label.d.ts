/**
 * A control for displaying plain text. It gives you control over the horizontal and vertical alignment and can wrap the text inside the node's bounding rectangle. It doesn't support bold, italics, or other rich text formatting. For that, use [RichTextLabel] instead.
 *
 * **Note:** A single Label node is not designed to display huge amounts of text. To display large amounts of text in a single node, consider using [RichTextLabel] instead as it supports features like an integrated scroll bar and threading. [RichTextLabel] generally performs better when displaying large amounts of text (several pages or more).
 *
 */
declare class Label extends Control {
  /**
   * A control for displaying plain text. It gives you control over the horizontal and vertical alignment and can wrap the text inside the node's bounding rectangle. It doesn't support bold, italics, or other rich text formatting. For that, use [RichTextLabel] instead.
   *
   * **Note:** A single Label node is not designed to display huge amounts of text. To display large amounts of text in a single node, consider using [RichTextLabel] instead as it supports features like an integrated scroll bar and threading. [RichTextLabel] generally performs better when displaying large amounts of text (several pages or more).
   *
   */
  new(): Label
  constructor()
  static new(): Label

  /** If set to something other than [constant TextServer.AUTOWRAP_OFF], the text gets wrapped inside the node's bounding rectangle. If you resize the node, it will change its height automatically to show all the text. */
  autowrap_mode: int

  /** Autowrap space trimming flags. See [constant TextServer.BREAK_TRIM_START_EDGE_SPACES] and [constant TextServer.BREAK_TRIM_END_EDGE_SPACES] for more info. */
  autowrap_trim_flags: int

  /** If [code]true[/code], the Label only shows the text that fits inside its bounding rectangle and will clip text horizontally. */
  clip_text: boolean

  /** Ellipsis character used for text clipping. */
  ellipsis_char: string

  /** Controls the text's horizontal alignment. Supports left, center, right, and fill (also known as justify). */
  horizontal_alignment: int

  /** Line fill alignment rules. */
  justification_flags: int

  /** A [LabelSettings] resource that can be shared between multiple [Label] nodes. Takes priority over theme properties. */
  label_settings: LabelSettings

  /** Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead. */
  language: string

  /** The number of the lines ignored and not displayed from the start of the [member text] value. */
  lines_skipped: int

  /** Limits the lines of text the node shows on screen. */
  max_lines_visible: int

  /** String used as a paragraph separator. Each paragraph is processed independently, in its own BiDi context. */
  paragraph_separator: string

  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int

  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: any[]

  /** Aligns text to the given tab-stops. */
  tab_stops: PackedFloat32Array

  /** The text to display on screen. */
  text: string

  /** Base text writing direction. */
  text_direction: int

  /** The clipping behavior when the text exceeds the node's bounding rectangle. */
  text_overrun_behavior: int

  /** If [code]true[/code], all the text displays as UPPERCASE. */
  uppercase: boolean

  /** Controls the text's vertical alignment. Supports top, center, bottom, and fill. */
  vertical_alignment: int

  /**
   * The number of characters to display. If set to `-1`, all characters are displayed. This can be useful when animating the text appearing in a dialog box.
   *
   * **Note:** Setting this property updates [member visible_ratio] accordingly.
   *
   * **Note:** Characters are counted as Unicode codepoints. A single visible grapheme may contain multiple codepoints (e.g. certain emoji use three codepoints). A single codepoint may contain two UTF-16 characters, which are used in C# strings.
   *
   */
  visible_characters: int

  /** The clipping behavior when [member visible_characters] or [member visible_ratio] is set. */
  visible_characters_behavior: int

  /**
   * The fraction of characters to display, relative to the total number of characters (see [method get_total_character_count]). If set to `1.0`, all characters are displayed. If set to `0.5`, only half of the characters will be displayed. This can be useful when animating the text appearing in a dialog box.
   *
   * **Note:** Setting this property updates [member visible_characters] accordingly.
   *
   */
  visible_ratio: float

  /** Returns the bounding rectangle of the character at position [param pos] in the label's local coordinate system. If the character is a non-visual character or [param pos] is outside the valid range, an empty [Rect2] is returned. If the character is a part of a composite grapheme, the bounding rectangle of the whole grapheme is returned. */
  get_character_bounds(pos: int): Rect2

  /** Returns the number of lines of text the Label has. */
  get_line_count(): int

  /**
   * Returns the height of the line [param line].
   *
   * If [param line] is set to `-1`, returns the biggest line height.
   *
   * If there are no lines, returns font size in pixels.
   *
   */
  get_line_height(line?: int): int

  /** Returns the total number of printable characters in the text (excluding spaces and newlines). */
  get_total_character_count(): int

  /** Returns the number of lines shown. Useful if the [Label]'s height cannot currently display all lines. */
  get_visible_line_count(): int

  connect<T extends SignalsOf<Label>>(
    signal: T,
    method: SignalFunction<Label[T]>
  ): number
}
