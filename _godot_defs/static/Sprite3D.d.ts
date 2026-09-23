/**
 * A node that displays a 2D texture in a 3D environment. The texture displayed can be a region from a larger atlas texture, or a frame from a sprite sheet animation. See also [SpriteBase3D] where properties such as the billboard mode are defined.
 *
 */
declare class Sprite3D extends SpriteBase3D {
  /**
   * A node that displays a 2D texture in a 3D environment. The texture displayed can be a region from a larger atlas texture, or a frame from a sprite sheet animation. See also [SpriteBase3D] where properties such as the billboard mode are defined.
   *
   */
  new(): Sprite3D
  constructor()
  static new(): Sprite3D

  /** Current frame to display from sprite sheet. [member hframes] or [member vframes] must be greater than 1. This property is automatically adjusted when [member hframes] or [member vframes] are changed to keep pointing to the same visual frame (same column and row). If that's impossible, this value is reset to [code]0[/code]. */
  frame: int

  /** Coordinates of the frame to display from sprite sheet. This is as an alias for the [member frame] property. [member hframes] or [member vframes] must be greater than 1. */
  frame_coords: Vector2i

  /** The number of columns in the sprite sheet. When this property is changed, [member frame] is adjusted so that the same visual frame is maintained (same row and column). If that's impossible, [member frame] is reset to [code]0[/code]. */
  hframes: int

  /** If [code]true[/code], the sprite will use [member region_rect] and display only the specified part of its texture. */
  region_enabled: boolean

  /** The region of the atlas texture to display. [member region_enabled] must be [code]true[/code]. */
  region_rect: Rect2

  /** [Texture2D] object to draw. If [member GeometryInstance3D.material_override] is used, this will be overridden. The size information is still used. */
  texture: Texture2D

  /** The number of rows in the sprite sheet. When this property is changed, [member frame] is adjusted so that the same visual frame is maintained (same row and column). If that's impossible, [member frame] is reset to [code]0[/code]. */
  vframes: int

  connect<T extends SignalsOf<Sprite3D>>(
    signal: T,
    method: SignalFunction<Sprite3D[T]>
  ): number

  /**
   * Emitted when the [member frame] changes.
   *
   */
  $frame_changed: Signal<() => void>

  /**
   * Emitted when the [member texture] changes.
   *
   */
  $texture_changed: Signal<() => void>
}
