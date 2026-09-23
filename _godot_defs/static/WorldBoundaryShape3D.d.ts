/**
 * A 3D world boundary shape, intended for use in physics. [WorldBoundaryShape3D] works like an infinite plane that forces all physics bodies to stay above it. The [member plane]'s normal determines which direction is considered as "above" and in the editor, the line over the plane represents this direction. It can for example be used for endless flat floors.
 *
 * **Note:** When the physics engine is set to **Jolt Physics** in the project settings ([member ProjectSettings.physics/3d/physics_engine]), [WorldBoundaryShape3D] has a finite size (centered at the shape's origin). It can be adjusted by changing [member ProjectSettings.physics/jolt_physics_3d/limits/world_boundary_shape_size].
 *
 */
declare class WorldBoundaryShape3D extends Shape3D {
  /**
   * A 3D world boundary shape, intended for use in physics. [WorldBoundaryShape3D] works like an infinite plane that forces all physics bodies to stay above it. The [member plane]'s normal determines which direction is considered as "above" and in the editor, the line over the plane represents this direction. It can for example be used for endless flat floors.
   *
   * **Note:** When the physics engine is set to **Jolt Physics** in the project settings ([member ProjectSettings.physics/3d/physics_engine]), [WorldBoundaryShape3D] has a finite size (centered at the shape's origin). It can be adjusted by changing [member ProjectSettings.physics/jolt_physics_3d/limits/world_boundary_shape_size].
   *
   */
  new(): WorldBoundaryShape3D
  constructor()
  static new(): WorldBoundaryShape3D

  /** The [Plane] used by the [WorldBoundaryShape3D] for collision. */
  plane: Plane

  connect<T extends SignalsOf<WorldBoundaryShape3D>>(
    signal: T,
    method: SignalFunction<WorldBoundaryShape3D[T]>
  ): number
}
