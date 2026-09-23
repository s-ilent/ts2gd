/**
 * [MultiMeshInstance2D] is a specialized node to instance a [MultiMesh] resource in 2D. This can be faster to render compared to displaying many [Sprite2D] nodes with large transparent areas, especially if the nodes take up a lot of space on screen at high viewport resolutions. This is because using a mesh designed to fit the sprites' opaque areas will reduce GPU fill rate utilization (at the cost of increased vertex processing utilization).
 *
 * Usage is the same as [MultiMeshInstance3D].
 *
 */
declare class MultiMeshInstance2D extends Node2D {
  /**
   * [MultiMeshInstance2D] is a specialized node to instance a [MultiMesh] resource in 2D. This can be faster to render compared to displaying many [Sprite2D] nodes with large transparent areas, especially if the nodes take up a lot of space on screen at high viewport resolutions. This is because using a mesh designed to fit the sprites' opaque areas will reduce GPU fill rate utilization (at the cost of increased vertex processing utilization).
   *
   * Usage is the same as [MultiMeshInstance3D].
   *
   */
  new(): MultiMeshInstance2D
  constructor()
  static new(): MultiMeshInstance2D

  /** The [MultiMesh] that will be drawn by the [MultiMeshInstance2D]. */
  multimesh: MultiMesh

  /** The [Texture2D] that will be used if using the default [CanvasItemMaterial]. Can be accessed as [code]TEXTURE[/code] in CanvasItem shader. */
  texture: Texture2D

  connect<T extends SignalsOf<MultiMeshInstance2D>>(
    signal: T,
    method: SignalFunction<MultiMeshInstance2D[T]>
  ): number

  /**
   * Emitted when the [member texture] is changed.
   *
   */
  $texture_changed: Signal<() => void>
}
