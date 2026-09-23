/**
 * Node used for displaying a [Mesh] in 2D. This can be faster to render compared to displaying a [Sprite2D] node with large transparent areas, especially if the node takes up a lot of space on screen at high viewport resolutions. This is because using a mesh designed to fit the sprite's opaque areas will reduce GPU fill rate utilization (at the cost of increased vertex processing utilization).
 *
 * When a [Mesh] has to be instantiated more than thousands of times close to each other, consider using a [MultiMesh] in a [MultiMeshInstance2D] instead.
 *
 * A [MeshInstance2D] can be created from an existing [Sprite2D] via a tool in the editor toolbar. Select the [Sprite2D] node, then choose **Sprite2D > Convert to MeshInstance2D** at the top of the 2D editor viewport.
 *
 */
declare class MeshInstance2D extends Node2D {
  /**
   * Node used for displaying a [Mesh] in 2D. This can be faster to render compared to displaying a [Sprite2D] node with large transparent areas, especially if the node takes up a lot of space on screen at high viewport resolutions. This is because using a mesh designed to fit the sprite's opaque areas will reduce GPU fill rate utilization (at the cost of increased vertex processing utilization).
   *
   * When a [Mesh] has to be instantiated more than thousands of times close to each other, consider using a [MultiMesh] in a [MultiMeshInstance2D] instead.
   *
   * A [MeshInstance2D] can be created from an existing [Sprite2D] via a tool in the editor toolbar. Select the [Sprite2D] node, then choose **Sprite2D > Convert to MeshInstance2D** at the top of the 2D editor viewport.
   *
   */
  new(): MeshInstance2D
  constructor()
  static new(): MeshInstance2D

  /** The [Mesh] that will be drawn by the [MeshInstance2D]. */
  mesh: Mesh

  /** The [Texture2D] that will be used if using the default [CanvasItemMaterial]. Can be accessed as [code]TEXTURE[/code] in CanvasItem shader. */
  texture: Texture2D

  connect<T extends SignalsOf<MeshInstance2D>>(
    signal: T,
    method: SignalFunction<MeshInstance2D[T]>
  ): number

  /**
   * Emitted when the [member texture] is changed.
   *
   */
  $texture_changed: Signal<() => void>
}
