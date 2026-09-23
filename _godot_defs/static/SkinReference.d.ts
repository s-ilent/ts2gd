/**
 * An internal object containing a mapping from a [Skin] used within the context of a particular [MeshInstance3D] to refer to the skeleton's [RID] in the RenderingServer.
 *
 * See also [method MeshInstance3D.get_skin_reference] and [method RenderingServer.instance_attach_skeleton].
 *
 * Note that despite the similar naming, the skeleton RID used in the [RenderingServer] does not have a direct one-to-one correspondence to a [Skeleton3D] node.
 *
 * In particular, a [Skeleton3D] node with no [MeshInstance3D] children may be unknown to the [RenderingServer].
 *
 * On the other hand, a [Skeleton3D] with multiple [MeshInstance3D] nodes which each have different [member MeshInstance3D.skin] objects may have multiple SkinReference instances (and hence, multiple skeleton [RID]s).
 *
 */
declare class SkinReference extends RefCounted {
  /**
   * An internal object containing a mapping from a [Skin] used within the context of a particular [MeshInstance3D] to refer to the skeleton's [RID] in the RenderingServer.
   *
   * See also [method MeshInstance3D.get_skin_reference] and [method RenderingServer.instance_attach_skeleton].
   *
   * Note that despite the similar naming, the skeleton RID used in the [RenderingServer] does not have a direct one-to-one correspondence to a [Skeleton3D] node.
   *
   * In particular, a [Skeleton3D] node with no [MeshInstance3D] children may be unknown to the [RenderingServer].
   *
   * On the other hand, a [Skeleton3D] with multiple [MeshInstance3D] nodes which each have different [member MeshInstance3D.skin] objects may have multiple SkinReference instances (and hence, multiple skeleton [RID]s).
   *
   */
  new(): SkinReference
  constructor()
  static new(): SkinReference

  /** Returns the [RID] owned by this SkinReference, as returned by [method RenderingServer.skeleton_create]. */
  get_skeleton(): RID

  /**
   * Returns the [Skin] connected to this SkinReference. In the case of [MeshInstance3D] with no [member MeshInstance3D.skin] assigned, this will reference an internal default [Skin] owned by that [MeshInstance3D].
   *
   * Note that a single [Skin] may have more than one [SkinReference] in the case that it is shared by meshes across multiple [Skeleton3D] nodes.
   *
   */
  get_skin(): Skin

  connect<T extends SignalsOf<SkinReference>>(
    signal: T,
    method: SignalFunction<SkinReference[T]>
  ): number
}
