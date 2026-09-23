/**
 * MultiMesh provides low-level mesh instancing. Drawing thousands of [MeshInstance3D] nodes can be slow, since each object is submitted to the GPU then drawn individually.
 *
 * MultiMesh is much faster as it can draw thousands of instances with a single draw call, resulting in less API overhead.
 *
 * As a drawback, if the instances are too far away from each other, performance may be reduced as every single instance will always render (they are spatially indexed as one, for the whole object).
 *
 * Since instances may have any behavior, the AABB used for visibility must be provided by the user.
 *
 * **Note:** A MultiMesh is a single object, therefore the same maximum lights per object restriction applies. This means, that once the maximum lights are consumed by one or more instances, the rest of the MultiMesh instances will **not** receive any lighting.
 *
 * **Note:** Blend Shapes will be ignored if used in a MultiMesh.
 *
 */
declare class MultiMesh extends Resource {
  /**
   * MultiMesh provides low-level mesh instancing. Drawing thousands of [MeshInstance3D] nodes can be slow, since each object is submitted to the GPU then drawn individually.
   *
   * MultiMesh is much faster as it can draw thousands of instances with a single draw call, resulting in less API overhead.
   *
   * As a drawback, if the instances are too far away from each other, performance may be reduced as every single instance will always render (they are spatially indexed as one, for the whole object).
   *
   * Since instances may have any behavior, the AABB used for visibility must be provided by the user.
   *
   * **Note:** A MultiMesh is a single object, therefore the same maximum lights per object restriction applies. This means, that once the maximum lights are consumed by one or more instances, the rest of the MultiMesh instances will **not** receive any lighting.
   *
   * **Note:** Blend Shapes will be ignored if used in a MultiMesh.
   *
   */
  new(): MultiMesh
  constructor()
  static new(): MultiMesh

  /** Array containing each [Color] used by all instances of this mesh. */
  color_array: PackedColorArray

  /** Custom AABB for this MultiMesh resource. Setting this manually prevents costly runtime AABB recalculations. */
  custom_aabb: AABB

  /** Array containing each custom data value used by all instances of this mesh, as a [PackedColorArray]. */
  custom_data_array: PackedColorArray

  /**
   * Number of instances that will get drawn. This clears and (re)sizes the buffers. Setting data format or flags afterwards will have no effect.
   *
   * By default, all instances are drawn but you can limit this with [member visible_instance_count].
   *
   */
  instance_count: int

  /**
   * [Mesh] resource to be instanced.
   *
   * The looks of the individual instances can be modified using [method set_instance_color] and [method set_instance_custom_data].
   *
   */
  mesh: Mesh

  /**
   * Choose whether to use an interpolation method that favors speed or quality.
   *
   * When using low physics tick rates (typically below 20) or high rates of object rotation, you may get better results from the high quality setting.
   *
   * **Note:** Fast quality does not equate to low quality. Except in the special cases mentioned above, the quality should be comparable to high quality.
   *
   */
  physics_interpolation_quality: int

  /** Array containing each [Transform2D] value used by all instances of this mesh, as a [PackedVector2Array]. Each transform is divided into 3 [Vector2] values corresponding to the transforms' [code]x[/code], [code]y[/code], and [code]origin[/code]. */
  transform_2d_array: PackedVector2Array

  /** Array containing each [Transform3D] value used by all instances of this mesh, as a [PackedVector3Array]. Each transform is divided into 4 [Vector3] values corresponding to the transforms' [code]x[/code], [code]y[/code], [code]z[/code], and [code]origin[/code]. */
  transform_array: PackedVector3Array

  /** Format of transform used to transform mesh, either 2D or 3D. */
  transform_format: int

  /** If [code]true[/code], the [MultiMesh] will use color data (see [method set_instance_color]). Can only be set when [member instance_count] is [code]0[/code] or less. This means that you need to call this method before setting the instance count, or temporarily reset it to [code]0[/code]. */
  use_colors: boolean

  /** If [code]true[/code], the [MultiMesh] will use custom data (see [method set_instance_custom_data]). Can only be set when [member instance_count] is [code]0[/code] or less. This means that you need to call this method before setting the instance count, or temporarily reset it to [code]0[/code]. */
  use_custom_data: boolean

  /** Limits the number of instances drawn, -1 draws all instances. Changing this does not change the sizes of the buffers. */
  visible_instance_count: int

  /** Returns the visibility axis-aligned bounding box in local space. */
  get_aabb(): AABB

  /** Gets a specific instance's color multiplier. */
  get_instance_color(instance: int): Color

  /** Returns the custom data that has been set for a specific instance. */
  get_instance_custom_data(instance: int): Color

  /** Returns the [Transform3D] of a specific instance. */
  get_instance_transform(instance: int): Transform3D

  /** Returns the [Transform2D] of a specific instance. */
  get_instance_transform_2d(instance: int): Transform2D

  /**
   * When using **physics interpolation**, this function allows you to prevent interpolation on an instance in the current physics tick.
   *
   * This allows you to move instances instantaneously, and should usually be used when initially placing an instance such as a bullet to prevent graphical glitches.
   *
   */
  reset_instance_physics_interpolation(instance: int): void

  /**
   * When using **physics interpolation**, this function allows you to prevent interpolation for all instances in the current physics tick.
   *
   * This allows you to move all instances instantaneously, and should usually be used when initially placing instances to prevent graphical glitches.
   *
   */
  reset_instances_physics_interpolation(): void

  /**
   * An alternative to setting the [member buffer] property, which can be used with **physics interpolation**. This method takes two arrays, and can set the data for the current and previous tick in one go. The renderer will automatically interpolate the data at each frame.
   *
   * This is useful for situations where the order of instances may change from physics tick to tick, such as particle systems.
   *
   * When the order of instances is coherent, the simpler alternative of setting [member buffer] can still be used with interpolation.
   *
   */
  set_buffer_interpolated(
    buffer_curr: PackedFloat32Array,
    buffer_prev: PackedFloat32Array
  ): void

  /**
   * Sets the color of a specific instance by **multiplying** the mesh's existing vertex colors. This allows for different color tinting per instance.
   *
   * **Note:** Each component is stored in 32 bits in the Forward+ and Mobile rendering methods, but is packed into 16 bits in the Compatibility rendering method.
   *
   * For the color to take effect, ensure that [member use_colors] is `true` on the [MultiMesh] and [member BaseMaterial3D.vertex_color_use_as_albedo] is `true` on the material. If you intend to set an absolute color instead of tinting, make sure the material's albedo color is set to pure white (`Color(1, 1, 1)`).
   *
   */
  set_instance_color(instance: int, color: Color): void

  /**
   * Sets custom data for a specific instance. [param custom_data] is a [Color] type only to contain 4 floating-point numbers.
   *
   * **Note:** Each number is stored in 32 bits in the Forward+ and Mobile rendering methods, but is packed into 16 bits in the Compatibility rendering method.
   *
   * For the custom data to be used, ensure that [member use_custom_data] is `true`.
   *
   * This custom instance data has to be manually accessed in your custom shader using `INSTANCE_CUSTOM`.
   *
   */
  set_instance_custom_data(instance: int, custom_data: Color): void

  /** Sets the [Transform3D] for a specific instance. */
  set_instance_transform(instance: int, transform: Transform3D): void

  /** Sets the [Transform2D] for a specific instance. */
  set_instance_transform_2d(instance: int, transform: Transform2D): void

  connect<T extends SignalsOf<MultiMesh>>(
    signal: T,
    method: SignalFunction<MultiMesh[T]>
  ): number

  /**
   * Use this when using 2D transforms.
   *
   */
  static TRANSFORM_2D: any

  /**
   * Use this when using 3D transforms.
   *
   */
  static TRANSFORM_3D: any

  /**
   * Always interpolate using Basis lerping, which can produce warping artifacts in some situations.
   *
   */
  static INTERP_QUALITY_FAST: any

  /**
   * Attempt to interpolate using Basis slerping (spherical linear interpolation) where possible, otherwise fall back to lerping.
   *
   */
  static INTERP_QUALITY_HIGH: any
}
