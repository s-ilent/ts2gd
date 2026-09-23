/**
 * [FABRIK3D] is position based IK, allowing precise and accurate tracking of targets. It's ideal for simple chains without limitations.
 *
 * The resulting twist around the forward vector will always be kept from the previous pose.
 *
 * **Note:** When the target is close to the root, it tends to produce zig-zag patterns, resulting in unnatural visual movement.
 *
 */
declare class FABRIK3D extends IterateIK3D {
  /**
   * [FABRIK3D] is position based IK, allowing precise and accurate tracking of targets. It's ideal for simple chains without limitations.
   *
   * The resulting twist around the forward vector will always be kept from the previous pose.
   *
   * **Note:** When the target is close to the root, it tends to produce zig-zag patterns, resulting in unnatural visual movement.
   *
   */
  new(): FABRIK3D
  constructor()
  static new(): FABRIK3D

  connect<T extends SignalsOf<FABRIK3D>>(
    signal: T,
    method: SignalFunction<FABRIK3D[T]>
  ): number
}
