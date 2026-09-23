/**
 * Uniform set cache manager for [RenderingDevice]-based renderers. Provides a way to create a uniform set and reuse it in subsequent calls for as long as the uniform set exists. Uniform set will automatically be cleaned up when dependent objects are freed.
 *
 */
declare class UniformSetCacheRD extends Object {
  /**
   * Uniform set cache manager for [RenderingDevice]-based renderers. Provides a way to create a uniform set and reuse it in subsequent calls for as long as the uniform set exists. Uniform set will automatically be cleaned up when dependent objects are freed.
   *
   */
  new(): UniformSetCacheRD
  constructor()
  static new(): UniformSetCacheRD

  /** Creates/returns a cached uniform set based on the provided uniforms for a given shader. */
  static get_cache(shader: RID, set: int, uniforms: RDUniform[]): RID

  connect<T extends SignalsOf<UniformSetCacheRD>>(
    signal: T,
    method: SignalFunction<UniformSetCacheRD[T]>
  ): number
}
