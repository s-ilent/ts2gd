/**
 * A [SkeletonModifier3D] for aligning bones along a [Path3D]. The smoothness of the fitting depends on the [member Curve3D.bake_interval].
 *
 * If you want the [Path3D] to attach to a specific bone, it is recommended to place a [ModifierBoneTarget3D] before the [SplineIK3D] in the [SkeletonModifier3D] list (children of the [Skeleton3D]), and then place a [Path3D] as the [ModifierBoneTarget3D]'s child.
 *
 * Bone twist is determined based on the [method Curve3D.get_point_tilt].
 *
 * If the root bone joint and the start point of the [Curve3D] are separated, it assumes that there is a linear line segment between them. This means that the vector pointing toward the start point of the [Curve3D] takes precedence over the shortest intersection point along the [Curve3D].
 *
 * If the end bone joint exceeds the path length, it is bent as close as possible to the end point of the [Curve3D].
 *
 */
declare class SplineIK3D extends ChainIK3D {
  /**
   * A [SkeletonModifier3D] for aligning bones along a [Path3D]. The smoothness of the fitting depends on the [member Curve3D.bake_interval].
   *
   * If you want the [Path3D] to attach to a specific bone, it is recommended to place a [ModifierBoneTarget3D] before the [SplineIK3D] in the [SkeletonModifier3D] list (children of the [Skeleton3D]), and then place a [Path3D] as the [ModifierBoneTarget3D]'s child.
   *
   * Bone twist is determined based on the [method Curve3D.get_point_tilt].
   *
   * If the root bone joint and the start point of the [Curve3D] are separated, it assumes that there is a linear line segment between them. This means that the vector pointing toward the start point of the [Curve3D] takes precedence over the shortest intersection point along the [Curve3D].
   *
   * If the end bone joint exceeds the path length, it is bent as close as possible to the end point of the [Curve3D].
   *
   */
  new(): SplineIK3D
  constructor()
  static new(): SplineIK3D

  /** The number of settings. */
  setting_count: int

  /** Returns the node path of the [Path3D] which is describing the path. */
  get_path_3d(index: int): NodePathType

  /** Returns the tilt interpolation method used between the root bone and the start point of the [Curve3D] when they are apart. See also [method set_tilt_fade_in]. */
  get_tilt_fade_in(index: int): int

  /** Returns the tilt interpolation method used between the end bone and the end point of the [Curve3D] when they are apart. See also [method set_tilt_fade_out]. */
  get_tilt_fade_out(index: int): int

  /** Returns if the tilt property of the [Curve3D] affects the bone twist. */
  is_tilt_enabled(index: int): boolean

  /** Sets the node path of the [Path3D] which is describing the path. */
  set_path_3d(index: int, path_3d: NodePathType): void

  /** Sets if the tilt property of the [Curve3D] should affect the bone twist. */
  set_tilt_enabled(index: int, enabled: boolean): void

  /**
   * If [param size] is greater than `0`, the tilt is interpolated between [param size] start bones from the start point of the [Curve3D] when they are apart.
   *
   * If [param size] is equal `0`, the tilts between the root bone head and the start point of the [Curve3D] are unified with a tilt of the start point of the [Curve3D].
   *
   * If [param size] is less than `0`, the tilts between the root bone and the start point of the [Curve3D] are `0.0`.
   *
   */
  set_tilt_fade_in(index: int, size: int): void

  /**
   * If [param size] is greater than `0`, the tilt is interpolated between [param size] end bones from the end point of the [Curve3D] when they are apart.
   *
   * If [param size] is equal `0`, the tilts between the end bone tail and the end point of the [Curve3D] are unified with a tilt of the end point of the [Curve3D].
   *
   * If [param size] is less than `0`, the tilts between the end bone and the end point of the [Curve3D] are `0.0`.
   *
   */
  set_tilt_fade_out(index: int, size: int): void

  connect<T extends SignalsOf<SplineIK3D>>(
    signal: T,
    method: SignalFunction<SplineIK3D[T]>
  ): number
}
