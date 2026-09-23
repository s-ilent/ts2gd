/**
 * An automatically scalable [Texture2D] based on an SVG image. [DPITexture]s are used to automatically re-rasterize icons and other texture based UI theme elements to match viewport scale and font oversampling. See also [member ProjectSettings.display/window/stretch/mode] ("canvas_items" mode) and [member Viewport.oversampling_override].
 *
 */
declare class DPITexture extends Texture2D {
  /**
   * An automatically scalable [Texture2D] based on an SVG image. [DPITexture]s are used to automatically re-rasterize icons and other texture based UI theme elements to match viewport scale and font oversampling. See also [member ProjectSettings.display/window/stretch/mode] ("canvas_items" mode) and [member Viewport.oversampling_override].
   *
   */
  new(): DPITexture
  constructor()
  static new(): DPITexture

  /** Texture scale. [code]1.0[/code] is the original SVG size. Higher values result in a larger image. */
  base_scale: float

  /** If set, remaps texture colors according to [Color]-[Color] map. */
  color_map: Dictionary<any, any>

  /** Overrides texture saturation. */
  saturation: float

  /** Creates a new [DPITexture] and initializes it by allocating and setting the SVG data to [param source]. */
  static create_from_string(
    source: string,
    scale?: float,
    saturation?: float,
    color_map?: Dictionary<any, any>
  ): DPITexture

  /** Returns the [RID] of the texture rasterized to match the oversampling of the currently drawn canvas item. */
  get_scaled_rid(): RID

  /** Returns this SVG texture's source code. */
  get_source(): string

  /** Resizes the texture to the specified dimensions. */
  set_size_override(size: Vector2i): void

  /** Sets this SVG texture's source code. */
  set_source(source: string): void

  connect<T extends SignalsOf<DPITexture>>(
    signal: T,
    method: SignalFunction<DPITexture[T]>
  ): number
}
