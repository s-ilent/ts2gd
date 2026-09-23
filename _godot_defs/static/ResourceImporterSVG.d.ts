/**
 * This importer imports [DPITexture] resources. See also [ResourceImporterTexture] and [ResourceImporterImage].
 *
 */
declare class ResourceImporterSVG extends ResourceImporter {
  /**
   * This importer imports [DPITexture] resources. See also [ResourceImporterTexture] and [ResourceImporterImage].
   *
   */
  new(): ResourceImporterSVG
  constructor()
  static new(): ResourceImporterSVG

  /** Texture scale. [code]1.0[/code] is the original SVG size. Higher values result in a larger image. */
  base_scale: float

  /** If set, remaps texture colors according to [Color]-[Color] map. */
  color_map: Dictionary<any, any>

  /** If [code]true[/code], uses lossless compression for the SVG source. */
  compress: boolean

  /** Overrides texture saturation. */
  saturation: float

  connect<T extends SignalsOf<ResourceImporterSVG>>(
    signal: T,
    method: SignalFunction<ResourceImporterSVG[T]>
  ): number
}
