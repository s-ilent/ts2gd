/**
 * A mesh type optimized for creating geometry manually, similar to OpenGL 1.x immediate mode.
 *
 * Here's a sample on how to generate a triangular face:
 *
 * @example
 *
 *
 * var mesh = ImmediateMesh.new()
 * mesh.surface_begin(Mesh.PRIMITIVE_TRIANGLES)
 * mesh.surface_add_vertex(Vector3.LEFT)
 * mesh.surface_add_vertex(Vector3.FORWARD)
 * mesh.surface_add_vertex(Vector3.ZERO)
 * mesh.surface_end()
 *
 *
 * var mesh = new ImmediateMesh();
 * mesh.SurfaceBegin(Mesh.PrimitiveType.Triangles);
 * mesh.SurfaceAddVertex(Vector3.Left);
 * mesh.SurfaceAddVertex(Vector3.Forward);
 * mesh.SurfaceAddVertex(Vector3.Zero);
 * mesh.SurfaceEnd();
 *
 * @summary
 *
 *
 * **Note:** Generating complex geometries with [ImmediateMesh] is highly inefficient. Instead, it is designed to generate simple geometry that changes often.
 *
 */
declare class ImmediateMesh extends Mesh {
  /**
   * A mesh type optimized for creating geometry manually, similar to OpenGL 1.x immediate mode.
   *
   * Here's a sample on how to generate a triangular face:
   *
   * @example
   *
   *
   * var mesh = ImmediateMesh.new()
   * mesh.surface_begin(Mesh.PRIMITIVE_TRIANGLES)
   * mesh.surface_add_vertex(Vector3.LEFT)
   * mesh.surface_add_vertex(Vector3.FORWARD)
   * mesh.surface_add_vertex(Vector3.ZERO)
   * mesh.surface_end()
   *
   *
   * var mesh = new ImmediateMesh();
   * mesh.SurfaceBegin(Mesh.PrimitiveType.Triangles);
   * mesh.SurfaceAddVertex(Vector3.Left);
   * mesh.SurfaceAddVertex(Vector3.Forward);
   * mesh.SurfaceAddVertex(Vector3.Zero);
   * mesh.SurfaceEnd();
   *
   * @summary
   *
   *
   * **Note:** Generating complex geometries with [ImmediateMesh] is highly inefficient. Instead, it is designed to generate simple geometry that changes often.
   *
   */
  new(): ImmediateMesh
  constructor()
  static new(): ImmediateMesh

  /** Clear all surfaces. */
  clear_surfaces(): void

  /** Add a 3D vertex using the current attributes previously set. */
  surface_add_vertex(vertex: Vector3): void

  /** Add a 2D vertex using the current attributes previously set. */
  surface_add_vertex_2d(vertex: Vector2): void

  /** Begin a new surface. */
  surface_begin(primitive: int, material?: Material): void

  /** End and commit current surface. Note that surface being created will not be visible until this function is called. */
  surface_end(): void

  /** Set the color attribute that will be pushed with the next vertex. */
  surface_set_color(color: Color): void

  /** Set the normal attribute that will be pushed with the next vertex. */
  surface_set_normal(normal: Vector3): void

  /**
   * Set the tangent attribute that will be pushed with the next vertex.
   *
   * **Note:** Even though [param tangent] is a [Plane], it does not directly represent the tangent plane. Its [member Plane.x], [member Plane.y], and [member Plane.z] represent the tangent vector and [member Plane.d] should be either `-1` or `1`. See also [constant Mesh.ARRAY_TANGENT].
   *
   */
  surface_set_tangent(tangent: Plane): void

  /** Set the UV attribute that will be pushed with the next vertex. */
  surface_set_uv(uv: Vector2): void

  /** Set the UV2 attribute that will be pushed with the next vertex. */
  surface_set_uv2(uv2: Vector2): void

  connect<T extends SignalsOf<ImmediateMesh>>(
    signal: T,
    method: SignalFunction<ImmediateMesh[T]>
  ): number
}
