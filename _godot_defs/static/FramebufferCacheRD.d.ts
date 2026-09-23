/**
 * Framebuffer cache manager for [RenderingDevice]-based renderers. Provides a way to create a framebuffer and reuse it in subsequent calls for as long as the used textures exists. Framebuffers will automatically be cleaned up when dependent objects are freed.
 *
 */
declare class FramebufferCacheRD extends Object {
  /**
   * Framebuffer cache manager for [RenderingDevice]-based renderers. Provides a way to create a framebuffer and reuse it in subsequent calls for as long as the used textures exists. Framebuffers will automatically be cleaned up when dependent objects are freed.
   *
   */
  new(): FramebufferCacheRD
  constructor()
  static new(): FramebufferCacheRD

  /** Creates, or obtains a cached, framebuffer. [param textures] lists textures accessed. [param passes] defines the subpasses and texture allocation, if left empty a single pass is created and textures are allocated depending on their usage flags. [param views] defines the number of views used when rendering. */
  static get_cache_multipass(
    textures: RID[],
    passes: RDFramebufferPass[],
    views: int
  ): RID

  connect<T extends SignalsOf<FramebufferCacheRD>>(
    signal: T,
    method: SignalFunction<FramebufferCacheRD[T]>
  ): number
}
