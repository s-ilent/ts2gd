/**
 * A real-time heightmap-shaped 3D particle collision shape affecting [GPUParticles3D] nodes.
 *
 * Heightmap shapes allow for efficiently representing collisions for convex and concave objects with a single "floor" (such as terrain). This is less flexible than [GPUParticlesCollisionSDF3D], but it doesn't require a baking step.
 *
 * [GPUParticlesCollisionHeightField3D] can also be regenerated in real-time when it is moved, when the camera moves, or even continuously. This makes [GPUParticlesCollisionHeightField3D] a good choice for weather effects such as rain and snow and games with highly dynamic geometry. However, this class is limited since heightmaps cannot represent overhangs (e.g. indoors or caves).
 *
 * **Note:** [member ParticleProcessMaterial.collision_mode] must be `true` on the [GPUParticles3D]'s process material for collision to work.
 *
 * **Note:** Particle collision only affects [GPUParticles3D], not [CPUParticles3D].
 *
 */
declare class GPUParticlesCollisionHeightField3D extends GPUParticlesCollision3D {
  /**
   * A real-time heightmap-shaped 3D particle collision shape affecting [GPUParticles3D] nodes.
   *
   * Heightmap shapes allow for efficiently representing collisions for convex and concave objects with a single "floor" (such as terrain). This is less flexible than [GPUParticlesCollisionSDF3D], but it doesn't require a baking step.
   *
   * [GPUParticlesCollisionHeightField3D] can also be regenerated in real-time when it is moved, when the camera moves, or even continuously. This makes [GPUParticlesCollisionHeightField3D] a good choice for weather effects such as rain and snow and games with highly dynamic geometry. However, this class is limited since heightmaps cannot represent overhangs (e.g. indoors or caves).
   *
   * **Note:** [member ParticleProcessMaterial.collision_mode] must be `true` on the [GPUParticles3D]'s process material for collision to work.
   *
   * **Note:** Particle collision only affects [GPUParticles3D], not [CPUParticles3D].
   *
   */
  new(): GPUParticlesCollisionHeightField3D
  constructor()
  static new(): GPUParticlesCollisionHeightField3D

  /**
   * If `true`, the [GPUParticlesCollisionHeightField3D] will follow the current camera in global space. The [GPUParticlesCollisionHeightField3D] does not need to be a child of the [Camera3D] node for this to work.
   *
   * Following the camera has a performance cost, as it will force the heightmap to update whenever the camera moves. Consider lowering [member resolution] to improve performance if [member follow_camera_enabled] is `true`.
   *
   */
  follow_camera_enabled: boolean

  /**
   * The visual layers to account for when updating the heightmap. Only [MeshInstance3D]s whose [member VisualInstance3D.layers] match with this [member heightfield_mask] will be included in the heightmap collision update. By default, all 20 user-visible layers are taken into account for updating the heightmap collision.
   *
   * **Note:** Since the [member heightfield_mask] allows for 32 layers to be stored in total, there are an additional 12 layers that are only used internally by the engine and aren't exposed in the editor. Setting [member heightfield_mask] using a script allows you to toggle those reserved layers, which can be useful for editor plugins.
   *
   * To adjust [member heightfield_mask] more easily using a script, use [method get_heightfield_mask_value] and [method set_heightfield_mask_value].
   *
   */
  heightfield_mask: int

  /** Higher resolutions can represent small details more accurately in large scenes, at the cost of lower performance. If [member update_mode] is [constant UPDATE_MODE_ALWAYS], consider using the lowest resolution possible. */
  resolution: int

  /** The collision heightmap's size in 3D units. To improve heightmap quality, [member size] should be set as small as possible while covering the parts of the scene you need. */
  size: Vector3

  /** The update policy to use for the generated heightmap. */
  update_mode: int

  /** Returns [code]true[/code] if the specified layer of the [member heightfield_mask] is enabled, given a [param layer_number] between [code]1[/code] and [code]20[/code], inclusive. */
  get_heightfield_mask_value(layer_number: int): boolean

  /** Based on [param value], enables or disables the specified layer in the [member heightfield_mask], given a [param layer_number] between [code]1[/code] and [code]20[/code], inclusive. */
  set_heightfield_mask_value(layer_number: int, value: boolean): void

  connect<T extends SignalsOf<GPUParticlesCollisionHeightField3D>>(
    signal: T,
    method: SignalFunction<GPUParticlesCollisionHeightField3D[T]>
  ): number

  /**
   * Generate a 256×256 heightmap. Intended for small-scale scenes, or larger scenes with no distant particles.
   *
   */
  static RESOLUTION_256: any

  /**
   * Generate a 512×512 heightmap. Intended for medium-scale scenes, or larger scenes with no distant particles.
   *
   */
  static RESOLUTION_512: any

  /**
   * Generate a 1024×1024 heightmap. Intended for large scenes with distant particles.
   *
   */
  static RESOLUTION_1024: any

  /**
   * Generate a 2048×2048 heightmap. Intended for very large scenes with distant particles.
   *
   */
  static RESOLUTION_2048: any

  /**
   * Generate a 4096×4096 heightmap. Intended for huge scenes with distant particles.
   *
   */
  static RESOLUTION_4096: any

  /**
   * Generate a 8192×8192 heightmap. Intended for gigantic scenes with distant particles.
   *
   */
  static RESOLUTION_8192: any

  /**
   * Represents the size of the [enum Resolution] enum.
   *
   */
  static RESOLUTION_MAX: any

  /**
   * Only update the heightmap when the [GPUParticlesCollisionHeightField3D] node is moved, or when the camera moves if [member follow_camera_enabled] is `true`. An update can be forced by slightly moving the [GPUParticlesCollisionHeightField3D] in any direction, or by calling [method RenderingServer.particles_collision_height_field_update].
   *
   */
  static UPDATE_MODE_WHEN_MOVED: any

  /**
   * Update the heightmap every frame. This has a significant performance cost. This update should only be used when geometry that particles can collide with changes significantly during gameplay.
   *
   */
  static UPDATE_MODE_ALWAYS: any
}
