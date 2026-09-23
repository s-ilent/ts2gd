/**
 * Creates a bounding volume hierarchy (BVH) tree structure around triangle geometry.
 *
 * The triangle BVH tree can be used for efficient intersection queries without involving a physics engine.
 *
 * For example, this can be used in editor tools to select objects with complex shapes based on the mouse cursor position.
 *
 * **Performance:** Creating the BVH tree for complex geometry is a slow process and best done in a background thread.
 *
 */
declare class TriangleMesh extends RefCounted {
  /**
   * Creates a bounding volume hierarchy (BVH) tree structure around triangle geometry.
   *
   * The triangle BVH tree can be used for efficient intersection queries without involving a physics engine.
   *
   * For example, this can be used in editor tools to select objects with complex shapes based on the mouse cursor position.
   *
   * **Performance:** Creating the BVH tree for complex geometry is a slow process and best done in a background thread.
   *
   */
  new(): TriangleMesh
  constructor()
  static new(): TriangleMesh

  /**
   * Creates the BVH tree from an array of faces. Each 3 vertices of the input [param faces] array represent one triangle (face).
   *
   * Returns `true` if the tree is successfully built, `false` otherwise.
   *
   */
  create_from_faces(faces: PackedVector3Array): boolean

  /** Returns a copy of the geometry faces. Each 3 vertices of the array represent one triangle (face). */
  get_faces(): PackedVector3Array

  /**
   * Tests for intersection with a ray starting at [param begin] and facing [param dir] and extending toward infinity.
   *
   * If an intersection with a triangle happens, returns a [Dictionary] with the following fields:
   *
   * `position`: The position on the intersected triangle.
   *
   * `normal`: The normal of the intersected triangle.
   *
   * `face_index`: The index of the intersected triangle.
   *
   * Returns an empty [Dictionary] if no intersection happens.
   *
   * See also [method intersect_segment], which is similar but uses a finite-length segment.
   *
   */
  intersect_ray(begin: Vector3, dir: Vector3): Dictionary<any, any>

  /**
   * Tests for intersection with a segment going from [param begin] to [param end].
   *
   * If an intersection with a triangle happens returns a [Dictionary] with the following fields:
   *
   * `position`: The position on the intersected triangle.
   *
   * `normal`: The normal of the intersected triangle.
   *
   * `face_index`: The index of the intersected triangle.
   *
   * Returns an empty [Dictionary] if no intersection happens.
   *
   * See also [method intersect_ray], which is similar but uses an infinite-length ray.
   *
   */
  intersect_segment(begin: Vector3, end: Vector3): Dictionary<any, any>

  connect<T extends SignalsOf<TriangleMesh>>(
    signal: T,
    method: SignalFunction<TriangleMesh[T]>
  ): number
}
