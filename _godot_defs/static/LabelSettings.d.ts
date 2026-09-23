/**
 * [LabelSettings] is a resource that provides common settings to customize the text in a [Label]. It will take priority over the properties defined in [member Control.theme]. The resource can be shared between multiple labels and changed on the fly, so it's convenient and flexible way to setup text style.
 *
 */
declare class LabelSettings extends Resource {
  /**
   * [LabelSettings] is a resource that provides common settings to customize the text in a [Label]. It will take priority over the properties defined in [member Control.theme]. The resource can be shared between multiple labels and changed on the fly, so it's convenient and flexible way to setup text style.
   *
   */
  new(): LabelSettings
  constructor()
  static new(): LabelSettings

  /** [Font] used for the text. */
  font: Font

  /** Color of the text. */
  font_color: Color

  /** Size of the text. */
  font_size: int

  /** Additional vertical spacing between lines (in pixels), spacing is added to line descent. This value can be negative. */
  line_spacing: float

  /** The color of the outline. */
  outline_color: Color

  /** Text outline size. */
  outline_size: int

  /** Vertical space between paragraphs. Added on top of [member line_spacing]. */
  paragraph_spacing: float

  /** Color of the shadow effect. If alpha is [code]0[/code], no shadow will be drawn. */
  shadow_color: Color

  /** Offset of the shadow effect, in pixels. */
  shadow_offset: Vector2

  /** Size of the shadow effect. */
  shadow_size: int

  /** The number of stacked outlines. */
  stacked_outline_count: int

  /** The number of stacked shadows. */
  stacked_shadow_count: int

  /** Adds a new stacked outline to the label at the given [param index]. If [param index] is [code]-1[/code], the new stacked outline will be added at the end of the list. */
  add_stacked_outline(index?: int): void

  /** Adds a new stacked shadow to the label at the given [param index]. If [param index] is [code]-1[/code], the new stacked shadow will be added at the end of the list. */
  add_stacked_shadow(index?: int): void

  /** Returns the color of the stacked outline at [param index]. */
  get_stacked_outline_color(index: int): Color

  /** Returns the size of the stacked outline at [param index]. */
  get_stacked_outline_size(index: int): int

  /** Returns the color of the stacked shadow at [param index]. */
  get_stacked_shadow_color(index: int): Color

  /** Returns the offset of the stacked shadow at [param index]. */
  get_stacked_shadow_offset(index: int): Vector2

  /** Returns the outline size of the stacked shadow at [param index]. */
  get_stacked_shadow_outline_size(index: int): int

  /** Moves the stacked outline at index [param from_index] to the given position [param to_position] in the array. */
  move_stacked_outline(from_index: int, to_position: int): void

  /** Moves the stacked shadow at index [param from_index] to the given position [param to_position] in the array. */
  move_stacked_shadow(from_index: int, to_position: int): void

  /** Removes the stacked outline at index [param index]. */
  remove_stacked_outline(index: int): void

  /** Removes the stacked shadow at index [param index]. */
  remove_stacked_shadow(index: int): void

  /** Sets the color of the stacked outline identified by the given [param index] to [param color]. */
  set_stacked_outline_color(index: int, color: Color): void

  /** Sets the size of the stacked outline identified by the given [param index] to [param size]. */
  set_stacked_outline_size(index: int, size: int): void

  /** Sets the color of the stacked shadow identified by the given [param index] to [param color]. */
  set_stacked_shadow_color(index: int, color: Color): void

  /** Sets the offset of the stacked shadow identified by the given [param index] to [param offset]. */
  set_stacked_shadow_offset(index: int, offset: Vector2): void

  /** Sets the outline size of the stacked shadow identified by the given [param index] to [param size]. */
  set_stacked_shadow_outline_size(index: int, size: int): void

  connect<T extends SignalsOf<LabelSettings>>(
    signal: T,
    method: SignalFunction<LabelSettings[T]>
  ): number
}
