/**
 * A node that displays a 2D texture. The texture displayed can be a region from a larger atlas texture, or a frame from a sprite sheet animation.
 *
 */
declare class Sprite2D extends Node2D {
  /**
   * A node that displays a 2D texture. The texture displayed can be a region from a larger atlas texture, or a frame from a sprite sheet animation.
   *
   */
  new(): Sprite2D
  constructor()
  static new(): Sprite2D

  /**
   * If `true`, texture is centered.
   *
   * **Note:** For games with a pixel art aesthetic, textures may appear deformed when centered. This is caused by their position being between pixels. To prevent this, set this property to `false`, or consider enabling [member ProjectSettings.rendering/2d/snap/snap_2d_vertices_to_pixel] and [member ProjectSettings.rendering/2d/snap/snap_2d_transforms_to_pixel].
   *
   */
  centered: boolean

  /** If [code]true[/code], texture is flipped horizontally. */
  flip_h: boolean

  /** If [code]true[/code], texture is flipped vertically. */
  flip_v: boolean

  /** Current frame to display from sprite sheet. [member hframes] or [member vframes] must be greater than 1. This property is automatically adjusted when [member hframes] or [member vframes] are changed to keep pointing to the same visual frame (same column and row). If that's impossible, this value is reset to [code]0[/code]. */
  frame: int

  /** Coordinates of the frame to display from sprite sheet. This is as an alias for the [member frame] property. [member hframes] or [member vframes] must be greater than 1. */
  frame_coords: Vector2i

  /** The number of columns in the sprite sheet. When this property is changed, [member frame] is adjusted so that the same visual frame is maintained (same row and column). If that's impossible, [member frame] is reset to [code]0[/code]. */
  hframes: int

  /**
   * The texture's drawing offset.
   *
   * **Note:** When you increase [member offset].y in Sprite2D, the sprite moves downward on screen (i.e., +Y is down).
   *
   */
  offset: Vector2

  /**
   * If `true`, texture is cut from a larger atlas texture. See [member region_rect].
   *
   * **Note:** When using a custom [Shader] on a [Sprite2D], the `UV` shader built-in will refer to the entire texture space. Use the `REGION_RECT` built-in to get the currently visible region defined in [member region_rect] instead. See [url=$DOCS_URL/tutorials/shaders/shader_reference/canvas_item_shader.html]CanvasItem shaders[/url] for details.
   *
   */
  region_enabled: boolean

  /** If [code]true[/code], the area outside of the [member region_rect] is clipped to avoid bleeding of the surrounding texture pixels. [member region_enabled] must be [code]true[/code]. */
  region_filter_clip_enabled: boolean

  /** The region of the atlas texture to display. [member region_enabled] must be [code]true[/code]. */
  region_rect: Rect2

  /** [Texture2D] object to draw. */
  texture: Texture2D

  /** The number of rows in the sprite sheet. When this property is changed, [member frame] is adjusted so that the same visual frame is maintained (same row and column). If that's impossible, [member frame] is reset to [code]0[/code]. */
  vframes: int

  /**
   * Returns a [Rect2] representing the Sprite2D's boundary in local coordinates.
   *
   * **Example:** Detect if the Sprite2D was clicked:
   *
   * @example
   *
   *
   * func _input(event):
   * 	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
   * 		if get_rect().has_point(to_local(event.position)):
   * 			print("A click!")
   *
   *
   * public override void _Input(InputEvent @event)
   * {
   * 	if (@event is InputEventMouseButton inputEventMouse)
   * 	{
   * 		if (inputEventMouse.Pressed && inputEventMouse.ButtonIndex == MouseButton.Left)
   * 		{
   * 			if (GetRect().HasPoint(ToLocal(inputEventMouse.Position)))
   * 			{
   * 				GD.Print("A click!");
   * 			}
   * 		}
   * 	}
   * }
   *
   * @summary
   *
   *
   */
  get_rect(): Rect2

  /** Returns [code]true[/code] if the pixel at the given position is opaque, [code]false[/code] otherwise. Also returns [code]false[/code] if the given position is out of bounds or this sprite's [member texture] is [code]null[/code]. [param pos] is in local coordinates. */
  is_pixel_opaque(pos: Vector2): boolean

  connect<T extends SignalsOf<Sprite2D>>(
    signal: T,
    method: SignalFunction<Sprite2D[T]>
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
