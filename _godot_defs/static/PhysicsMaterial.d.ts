/**
 * Holds physics-related properties of a surface, namely its roughness and bounciness. This class is used to apply these properties to a physics body.
 *
 */
declare class PhysicsMaterial extends Resource {
  /**
   * Holds physics-related properties of a surface, namely its roughness and bounciness. This class is used to apply these properties to a physics body.
   *
   */
  new(): PhysicsMaterial
  constructor()
  static new(): PhysicsMaterial

  /** If [code]true[/code], subtracts the bounciness from the colliding object's bounciness instead of adding it. */
  absorbent: boolean

  /**
   * The body's bounciness. Values range from `0` (no bounce) to `1` (full bounciness).
   *
   * **Note:** Even with [member bounce] set to `1.0`, some energy will be lost over time due to linear and angular damping. To have a physics body that preserves all its energy over time, set [member bounce] to `1.0`, the body's linear damp mode to **Replace** (if applicable), its linear damp to `0.0`, its angular damp mode to **Replace** (if applicable), and its angular damp to `0.0`.
   *
   */
  bounce: float

  /** The body's friction. Values range from [code]0[/code] (frictionless) to [code]1[/code] (maximum friction). */
  friction: float

  /** If [code]true[/code], the physics engine will use the friction of the object marked as "rough" when two objects collide. If [code]false[/code], the physics engine will use the lowest friction of all colliding objects instead. If [code]true[/code] for both colliding objects, the physics engine will use the highest friction. */
  rough: boolean

  connect<T extends SignalsOf<PhysicsMaterial>>(
    signal: T,
    method: SignalFunction<PhysicsMaterial[T]>
  ): number
}
