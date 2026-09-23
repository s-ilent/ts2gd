/**
 * This node selects a bone in a [Skeleton3D] and attaches to it. This means that the [BoneAttachment3D] node will either dynamically copy or override the 3D transform of the selected bone.
 *
 */
declare class BoneAttachment3D extends Node3D {
  /**
   * This node selects a bone in a [Skeleton3D] and attaches to it. This means that the [BoneAttachment3D] node will either dynamically copy or override the 3D transform of the selected bone.
   *
   */
  new(): BoneAttachment3D
  constructor()
  static new(): BoneAttachment3D

  /** The index of the attached bone. */
  bone_idx: int

  /** The name of the attached bone. */
  bone_name: string

  /** The [NodePath] to the external [Skeleton3D] node. */
  external_skeleton: NodePathType

  /**
   * Whether the [BoneAttachment3D] node will override the bone pose of the bone it is attached to. When set to `true`, the [BoneAttachment3D] node can change the pose of the bone. When set to `false`, the [BoneAttachment3D] will always be set to the bone's transform.
   *
   * **Note:** This override performs interruptively in the skeleton update process using signals due to the old design. It may cause unintended behavior when used at the same time with [SkeletonModifier3D].
   *
   */
  override_pose: boolean

  /** Whether the [BoneAttachment3D] node will use an external [Skeleton3D] node rather than attempting to use its parent node as the [Skeleton3D]. When set to [code]true[/code], the [BoneAttachment3D] node will use the external [Skeleton3D] node set in [member external_skeleton]. */
  use_external_skeleton: boolean

  /** Returns the parent or external [Skeleton3D] node if it exists, otherwise returns [code]null[/code]. */
  get_skeleton(): Skeleton3D

  /** A function that is called automatically when the [Skeleton3D] is updated. This function is where the [BoneAttachment3D] node updates its position so it is correctly bound when it is [i]not[/i] set to override the bone pose. */
  on_skeleton_update(): void

  connect<T extends SignalsOf<BoneAttachment3D>>(
    signal: T,
    method: SignalFunction<BoneAttachment3D[T]>
  ): number
}
