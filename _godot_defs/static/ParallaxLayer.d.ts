/**
 * A ParallaxLayer must be the child of a [ParallaxBackground] node. Each ParallaxLayer can be set to move at different speeds relative to the camera movement or the [member ParallaxBackground.scroll_offset] value.
 *
 * This node's children will be affected by its scroll offset.
 *
 * **Note:** Any changes to this node's position and scale made after it enters the scene will be ignored.
 *
 */
declare class ParallaxLayer extends Node2D {
  /**
   * A ParallaxLayer must be the child of a [ParallaxBackground] node. Each ParallaxLayer can be set to move at different speeds relative to the camera movement or the [member ParallaxBackground.scroll_offset] value.
   *
   * This node's children will be affected by its scroll offset.
   *
   * **Note:** Any changes to this node's position and scale made after it enters the scene will be ignored.
   *
   */
  new(): ParallaxLayer
  constructor()
  static new(): ParallaxLayer

  /**
   * The interval, in pixels, at which the [ParallaxLayer] is drawn repeatedly. Useful for creating an infinitely scrolling background. If an axis is set to `0`, the [ParallaxLayer] will be drawn only once along that direction.
   *
   * **Note:** If you want the repetition to pixel-perfect match a [Texture2D] displayed by a child node, you should account for any scale applied to the texture when defining this interval. For example, if you use a child [Sprite2D] scaled to `0.5` to display a 600x600 texture, and want this sprite to be repeated continuously horizontally, you should set the mirroring to `Vector2(300, 0)`.
   *
   * **Note:** If the length of the viewport axis is bigger than twice the repeated axis size, it will not repeat infinitely, as the parallax layer only draws 2 instances of the layer at any given time. The visibility window is calculated from the parent [ParallaxBackground]'s position, not the layer's own position. So, if you use mirroring, **do not** change the [ParallaxLayer] position relative to its parent. Instead, if you need to adjust the background's position, set the [member CanvasLayer.offset] property in the parent [ParallaxBackground].
   *
   * **Note:** Despite the name, the layer will not be mirrored, it will only be repeated.
   *
   */
  motion_mirroring: Vector2

  /** The ParallaxLayer's offset relative to the parent ParallaxBackground's [member ParallaxBackground.scroll_offset]. */
  motion_offset: Vector2

  /** Multiplies the ParallaxLayer's motion. If an axis is set to [code]0[/code], it will not scroll. */
  motion_scale: Vector2

  connect<T extends SignalsOf<ParallaxLayer>>(
    signal: T,
    method: SignalFunction<ParallaxLayer[T]>
  ): number
}
