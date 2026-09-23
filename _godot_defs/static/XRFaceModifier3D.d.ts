/**
 * This node applies weights from an [XRFaceTracker] to a mesh with supporting face blend shapes.
 *
 * The [url=https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/unified-blendshapes]Unified Expressions[/url] blend shapes are supported, as well as ARKit and SRanipal blend shapes.
 *
 * The node attempts to identify blend shapes based on name matching. Blend shapes should match the names listed in the [url=https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/compatibility/overview]Unified Expressions Compatibility[/url] chart.
 *
 */
declare class XRFaceModifier3D extends Node3D {
  /**
   * This node applies weights from an [XRFaceTracker] to a mesh with supporting face blend shapes.
   *
   * The [url=https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/unified-blendshapes]Unified Expressions[/url] blend shapes are supported, as well as ARKit and SRanipal blend shapes.
   *
   * The node attempts to identify blend shapes based on name matching. Blend shapes should match the names listed in the [url=https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/compatibility/overview]Unified Expressions Compatibility[/url] chart.
   *
   */
  new(): XRFaceModifier3D
  constructor()
  static new(): XRFaceModifier3D

  /** The [XRFaceTracker] path. */
  face_tracker: StringName

  /** The [NodePath] of the face [MeshInstance3D]. */
  target: NodePathType

  connect<T extends SignalsOf<XRFaceModifier3D>>(
    signal: T,
    method: SignalFunction<XRFaceModifier3D[T]>
  ): number
}
