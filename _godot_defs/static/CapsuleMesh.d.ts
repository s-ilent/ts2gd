/**
 * Class representing a capsule-shaped [PrimitiveMesh].
 *
 */
declare class CapsuleMesh extends PrimitiveMesh {
  /**
   * Class representing a capsule-shaped [PrimitiveMesh].
   *
   */
  new(): CapsuleMesh
  constructor()
  static new(): CapsuleMesh

  /**
   * Total height of the capsule mesh (including the hemispherical ends).
   *
   * **Note:** The [member height] of a capsule must be at least twice its [member radius]. Otherwise, the capsule becomes a circle. If the [member height] is less than twice the [member radius], the properties adjust to a valid value.
   *
   */
  height: float

  /** Number of radial segments on the capsule mesh. */
  radial_segments: int

  /**
   * Radius of the capsule mesh.
   *
   * **Note:** The [member radius] of a capsule cannot be greater than half of its [member height]. Otherwise, the capsule becomes a circle. If the [member radius] is greater than half of the [member height], the properties adjust to a valid value.
   *
   */
  radius: float

  /** Number of rings along the height of the capsule. */
  rings: int

  connect<T extends SignalsOf<CapsuleMesh>>(
    signal: T,
    method: SignalFunction<CapsuleMesh[T]>
  ): number
}
