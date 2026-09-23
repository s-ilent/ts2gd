/**
 * [Texture2D] resource that draws only part of its [member atlas] texture, as defined by the [member region]. An additional [member margin] can also be set, which is useful for small adjustments.
 *
 * Multiple [AtlasTexture] resources can be cropped from the same [member atlas]. Packing many smaller textures into a singular large texture helps to optimize video memory costs and render calls.
 *
 * **Note:** [AtlasTexture] cannot be used in an [AnimatedTexture], and will not tile properly in nodes such as [TextureRect] or [Sprite2D]. To tile an [AtlasTexture], modify its [member region] instead.
 *
 */
declare class AtlasTexture extends Texture2D {
  /**
   * [Texture2D] resource that draws only part of its [member atlas] texture, as defined by the [member region]. An additional [member margin] can also be set, which is useful for small adjustments.
   *
   * Multiple [AtlasTexture] resources can be cropped from the same [member atlas]. Packing many smaller textures into a singular large texture helps to optimize video memory costs and render calls.
   *
   * **Note:** [AtlasTexture] cannot be used in an [AnimatedTexture], and will not tile properly in nodes such as [TextureRect] or [Sprite2D]. To tile an [AtlasTexture], modify its [member region] instead.
   *
   */
  new(): AtlasTexture
  constructor()
  static new(): AtlasTexture

  /** The texture that contains the atlas. Can be any type inheriting from [Texture2D], including another [AtlasTexture]. */
  atlas: Texture2D

  /** If [code]true[/code], the area outside of the [member region] is clipped to avoid bleeding of the surrounding texture pixels. */
  filter_clip: boolean

  /** The margin around the [member region]. Useful for small adjustments. If the [member Rect2.size] of this property ("w" and "h" in the editor) is set, the drawn texture is resized to fit within the margin. */
  margin: Rect2

  /**
   * The region used to draw the [member atlas]. If either dimension of the region's size is `0`, the value from [member atlas] size will be used for that axis instead.
   *
   * **Note:** The image size is always an integer, so the actual region size is rounded down.
   *
   */
  region: Rect2

  connect<T extends SignalsOf<AtlasTexture>>(
    signal: T,
    method: SignalFunction<AtlasTexture[T]>
  ): number
}
