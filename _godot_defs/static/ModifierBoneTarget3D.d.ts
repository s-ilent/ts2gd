/**
 * This node selects a bone in a [Skeleton3D] and attaches to it. This means that the [ModifierBoneTarget3D] node will dynamically copy the 3D transform of the selected bone.
 *
 * The functionality is similar to [BoneAttachment3D], but this node adopts the [SkeletonModifier3D] cycle and is intended to be used as another [SkeletonModifier3D]'s target.
 *
 */
declare class ModifierBoneTarget3D extends SkeletonModifier3D {
  /**
   * This node selects a bone in a [Skeleton3D] and attaches to it. This means that the [ModifierBoneTarget3D] node will dynamically copy the 3D transform of the selected bone.
   *
   * The functionality is similar to [BoneAttachment3D], but this node adopts the [SkeletonModifier3D] cycle and is intended to be used as another [SkeletonModifier3D]'s target.
   *
   */
  new(): ModifierBoneTarget3D
  constructor()
  static new(): ModifierBoneTarget3D

  /** The index of the attached bone. */
  bone: int

  /** The name of the attached bone. */
  bone_name: string

  connect<T extends SignalsOf<ModifierBoneTarget3D>>(
    signal: T,
    method: SignalFunction<ModifierBoneTarget3D[T]>
  ): number
}
