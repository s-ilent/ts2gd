/**
 * The compositor resource stores attributes used to customize how a [Viewport] is rendered.
 *
 */
declare class Compositor extends Resource {
  /**
   * The compositor resource stores attributes used to customize how a [Viewport] is rendered.
   *
   */
  new(): Compositor
  constructor()
  static new(): Compositor

  /** The custom [CompositorEffect]s that are applied during rendering of viewports using this compositor. */
  compositor_effects: CompositorEffect[]

  connect<T extends SignalsOf<Compositor>>(
    signal: T,
    method: SignalFunction<Compositor[T]>
  ): number
}
