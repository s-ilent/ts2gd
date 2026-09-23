/**
 * Base class for all primitive meshes. Handles applying a [Material] to a primitive mesh. Examples include [BoxMesh], [CapsuleMesh], [CylinderMesh], [PlaneMesh], [PrismMesh], and [SphereMesh].
 *
 */
declare class PrimitiveMesh extends Mesh {
  /**
   * Base class for all primitive meshes. Handles applying a [Material] to a primitive mesh. Examples include [BoxMesh], [CapsuleMesh], [CylinderMesh], [PlaneMesh], [PrismMesh], and [SphereMesh].
   *
   */
  new(): PrimitiveMesh
  constructor()
  static new(): PrimitiveMesh

  /** If set, generates UV2 UV coordinates applying a padding using the [member uv2_padding] setting. UV2 is needed for lightmapping. */
  add_uv2: boolean

  /** Overrides the [AABB] with one defined by user for use with frustum culling. Especially useful to avoid unexpected culling when using a shader to offset vertices. */
  custom_aabb: AABB

  /**
   * If `true`, the order of the vertices in each triangle is reversed, resulting in the backside of the mesh being drawn.
   *
   * This gives the same result as using [constant BaseMaterial3D.CULL_FRONT] in [member BaseMaterial3D.cull_mode].
   *
   */
  flip_faces: boolean

  /** The current [Material] of the primitive mesh. */
  material: Material

  /**
   * If [member add_uv2] is set, specifies the padding in pixels applied along seams of the mesh. Lower padding values allow making better use of the lightmap texture (resulting in higher texel density), but may introduce visible lightmap bleeding along edges.
   *
   * If the size of the lightmap texture can't be determined when generating the mesh, UV2 is calculated assuming a texture size of 1024x1024.
   *
   */
  uv2_padding: float

  /** Override this method to customize how this primitive mesh should be generated. Should return an [Array] where each element is another Array of values required for the mesh (see the [enum Mesh.ArrayType] constants). */
  protected _create_mesh_array(): any[]

  /**
   * Returns the mesh arrays used to make up the surface of this primitive mesh.
   *
   * **Example:** Pass the result to [method ArrayMesh.add_surface_from_arrays] to create a new surface:
   *
   * @example
   *
   *
   * var c = CylinderMesh.new()
   * var arr_mesh = ArrayMesh.new()
   * arr_mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, c.get_mesh_arrays())
   *
   *
   * var c = new CylinderMesh();
   * var arrMesh = new ArrayMesh();
   * arrMesh.AddSurfaceFromArrays(Mesh.PrimitiveType.Triangles, c.GetMeshArrays());
   *
   * @summary
   *
   *
   */
  get_mesh_arrays(): any[]

  /** Request an update of this primitive mesh based on its properties. */
  request_update(): void

  connect<T extends SignalsOf<PrimitiveMesh>>(
    signal: T,
    method: SignalFunction<PrimitiveMesh[T]>
  ): number
}
