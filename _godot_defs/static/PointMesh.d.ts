/**
 * A [PointMesh] is a primitive mesh composed of a single point. Instead of relying on triangles, points are rendered as a single rectangle on the screen with a constant size. They are intended to be used with particle systems, but can also be used as a cheap way to render billboarded sprites (for example in a point cloud).
 *
 * In order to be displayed, point meshes must be used with a material that has a point size. The point size can be accessed in a shader with the `POINT_SIZE` built-in, or in a [BaseMaterial3D] by setting the [member BaseMaterial3D.use_point_size] and [member BaseMaterial3D.point_size] properties.
 *
 * **Note:** When using point meshes, properties that normally affect vertices will be ignored, including [member BaseMaterial3D.billboard_mode], [member BaseMaterial3D.grow], and [member BaseMaterial3D.cull_mode].
 *
 */
declare class PointMesh extends PrimitiveMesh {
  /**
   * A [PointMesh] is a primitive mesh composed of a single point. Instead of relying on triangles, points are rendered as a single rectangle on the screen with a constant size. They are intended to be used with particle systems, but can also be used as a cheap way to render billboarded sprites (for example in a point cloud).
   *
   * In order to be displayed, point meshes must be used with a material that has a point size. The point size can be accessed in a shader with the `POINT_SIZE` built-in, or in a [BaseMaterial3D] by setting the [member BaseMaterial3D.use_point_size] and [member BaseMaterial3D.point_size] properties.
   *
   * **Note:** When using point meshes, properties that normally affect vertices will be ignored, including [member BaseMaterial3D.billboard_mode], [member BaseMaterial3D.grow], and [member BaseMaterial3D.cull_mode].
   *
   */
  new(): PointMesh
  constructor()
  static new(): PointMesh

  connect<T extends SignalsOf<PointMesh>>(
    signal: T,
    method: SignalFunction<PointMesh[T]>
  ): number
}
