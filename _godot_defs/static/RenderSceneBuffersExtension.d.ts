/**
 * This class allows for a RenderSceneBuffer implementation to be made in GDExtension.
 *
 */
declare class RenderSceneBuffersExtension extends RenderSceneBuffers {
  /**
   * This class allows for a RenderSceneBuffer implementation to be made in GDExtension.
   *
   */
  new(): RenderSceneBuffersExtension
  constructor()
  static new(): RenderSceneBuffersExtension

  /** Implement this in GDExtension to handle the (re)sizing of a viewport. */
  protected _configure(config: RenderSceneBuffersConfiguration): void

  /** Implement this in GDExtension to change the anisotropic filtering level. */
  protected _set_anisotropic_filtering_level(
    anisotropic_filtering_level: int
  ): void

  /** Implement this in GDExtension to record a new FSR sharpness value. */
  protected _set_fsr_sharpness(fsr_sharpness: float): void

  /** Implement this in GDExtension to change the texture mipmap bias. */
  protected _set_texture_mipmap_bias(texture_mipmap_bias: float): void

  /** Implement this in GDExtension to react to the debanding flag changing. */
  protected _set_use_debanding(use_debanding: boolean): void

  connect<T extends SignalsOf<RenderSceneBuffersExtension>>(
    signal: T,
    method: SignalFunction<RenderSceneBuffersExtension[T]>
  ): number
}
