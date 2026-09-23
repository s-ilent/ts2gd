/**
 * This [SkeletonModification2D] uses an algorithm called Forward And Backward Reaching Inverse Kinematics, or FABRIK, to rotate a bone chain so that it reaches a target.
 *
 * FABRIK works by knowing the positions and lengths of a series of bones, typically called a "bone chain". It first starts by running a forward pass, which places the final bone at the target's position. Then all other bones are moved towards the tip bone, so they stay at the defined bone length away. Then a backwards pass is performed, where the root/first bone in the FABRIK chain is placed back at the origin. Then all other bones are moved so they stay at the defined bone length away. This positions the bone chain so that it reaches the target when possible, but all of the bones stay the correct length away from each other.
 *
 * Because of how FABRIK works, it often gives more natural results than those seen in [SkeletonModification2DCCDIK].
 *
 * **Note:** The FABRIK modifier has `fabrik_joints`, which are the data objects that hold the data for each joint in the FABRIK chain. This is different from [Bone2D] nodes! FABRIK joints hold the data needed for each [Bone2D] in the bone chain used by FABRIK.
 *
 * To help control how the FABRIK joints move, a magnet vector can be passed, which can nudge the bones in a certain direction prior to solving, giving a level of control over the final result.
 *
 */
declare class SkeletonModification2DFABRIK extends SkeletonModification2D {
  /**
   * This [SkeletonModification2D] uses an algorithm called Forward And Backward Reaching Inverse Kinematics, or FABRIK, to rotate a bone chain so that it reaches a target.
   *
   * FABRIK works by knowing the positions and lengths of a series of bones, typically called a "bone chain". It first starts by running a forward pass, which places the final bone at the target's position. Then all other bones are moved towards the tip bone, so they stay at the defined bone length away. Then a backwards pass is performed, where the root/first bone in the FABRIK chain is placed back at the origin. Then all other bones are moved so they stay at the defined bone length away. This positions the bone chain so that it reaches the target when possible, but all of the bones stay the correct length away from each other.
   *
   * Because of how FABRIK works, it often gives more natural results than those seen in [SkeletonModification2DCCDIK].
   *
   * **Note:** The FABRIK modifier has `fabrik_joints`, which are the data objects that hold the data for each joint in the FABRIK chain. This is different from [Bone2D] nodes! FABRIK joints hold the data needed for each [Bone2D] in the bone chain used by FABRIK.
   *
   * To help control how the FABRIK joints move, a magnet vector can be passed, which can nudge the bones in a certain direction prior to solving, giving a level of control over the final result.
   *
   */
  new(): SkeletonModification2DFABRIK
  constructor()
  static new(): SkeletonModification2DFABRIK

  /** The number of FABRIK joints in the FABRIK modification. */
  fabrik_data_chain_length: int

  /** The NodePath to the node that is the target for the FABRIK modification. This node is what the FABRIK chain will attempt to rotate the bone chain to. */
  target_nodepath: NodePathType

  /** Returns the [Bone2D] node assigned to the FABRIK joint at [param joint_idx]. */
  get_fabrik_joint_bone2d_node(joint_idx: int): NodePathType

  /** Returns the index of the [Bone2D] node assigned to the FABRIK joint at [param joint_idx]. */
  get_fabrik_joint_bone_index(joint_idx: int): int

  /** Returns the magnet position vector for the joint at [param joint_idx]. */
  get_fabrik_joint_magnet_position(joint_idx: int): Vector2

  /** Returns whether the joint is using the target's rotation rather than allowing FABRIK to rotate the joint. This option only applies to the tip/final joint in the chain. */
  get_fabrik_joint_use_target_rotation(joint_idx: int): boolean

  /** Sets the [Bone2D] node assigned to the FABRIK joint at [param joint_idx]. */
  set_fabrik_joint_bone2d_node(
    joint_idx: int,
    bone2d_nodepath: NodePathType
  ): void

  /** Sets the bone index, [param bone_idx], of the FABRIK joint at [param joint_idx]. When possible, this will also update the [code]bone2d_node[/code] of the FABRIK joint based on data provided by the linked skeleton. */
  set_fabrik_joint_bone_index(joint_idx: int, bone_idx: int): void

  /** Sets the magnet position vector for the joint at [param joint_idx]. */
  set_fabrik_joint_magnet_position(
    joint_idx: int,
    magnet_position: Vector2
  ): void

  /**
   * Sets whether the joint at [param joint_idx] will use the target node's rotation rather than letting FABRIK rotate the node.
   *
   * **Note:** This option only works for the tip/final joint in the chain. For all other nodes, this option will be ignored.
   *
   */
  set_fabrik_joint_use_target_rotation(
    joint_idx: int,
    use_target_rotation: boolean
  ): void

  connect<T extends SignalsOf<SkeletonModification2DFABRIK>>(
    signal: T,
    method: SignalFunction<SkeletonModification2DFABRIK[T]>
  ): number
}
