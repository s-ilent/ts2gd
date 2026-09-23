/**
 * The rendering server is the API backend for everything visible. The whole scene system mounts on it to display. The rendering server is completely opaque: the internals are entirely implementation-specific and cannot be accessed.
 *
 * The rendering server can be used to bypass the scene/[Node] system entirely. This can improve performance in cases where the scene system is the bottleneck, but won't improve performance otherwise (for instance, if the GPU is already fully utilized).
 *
 * Resources are created using the `*_create` functions. These functions return [RID]s which are not references to the objects themselves, but opaque **pointers** towards these objects.
 *
 * All objects are drawn to a viewport. You can use the [Viewport] attached to the [SceneTree] or you can create one yourself with [method viewport_create]. When using a custom scenario or canvas, the scenario or canvas needs to be attached to the viewport using [method viewport_set_scenario] or [method viewport_attach_canvas].
 *
 * **Scenarios:** In 3D, all visual objects must be associated with a scenario. The scenario is a visual representation of the world. If accessing the rendering server from a running game, the scenario can be accessed from the scene tree from any [Node3D] node with [method Node3D.get_world_3d]. Otherwise, a scenario can be created with [method scenario_create].
 *
 * Similarly, in 2D, a canvas is needed to draw all canvas items.
 *
 * **3D:** In 3D, all visible objects are comprised of a resource and an instance. A resource can be a mesh, a particle system, a light, or any other 3D object. In order to be visible resources must be attached to an instance using [method instance_set_base]. The instance must also be attached to the scenario using [method instance_set_scenario] in order to be visible. RenderingServer methods that don't have a prefix are usually 3D-specific (but not always).
 *
 * **2D:** In 2D, all visible objects are some form of canvas item. In order to be visible, a canvas item needs to be the child of a canvas attached to a viewport, or it needs to be the child of another canvas item that is eventually attached to the canvas. 2D-specific RenderingServer methods generally start with `canvas_*`.
 *
 * **Headless mode:** Starting the engine with the `--headless` [url=$DOCS_URL/tutorials/editor/command_line_tutorial.html]command line argument[/url] disables all rendering and window management functions. Most functions from [RenderingServer] will return dummy values in this case.
 *
 */
declare class RenderingServerClass extends Object {
  /**
   * The rendering server is the API backend for everything visible. The whole scene system mounts on it to display. The rendering server is completely opaque: the internals are entirely implementation-specific and cannot be accessed.
   *
   * The rendering server can be used to bypass the scene/[Node] system entirely. This can improve performance in cases where the scene system is the bottleneck, but won't improve performance otherwise (for instance, if the GPU is already fully utilized).
   *
   * Resources are created using the `*_create` functions. These functions return [RID]s which are not references to the objects themselves, but opaque **pointers** towards these objects.
   *
   * All objects are drawn to a viewport. You can use the [Viewport] attached to the [SceneTree] or you can create one yourself with [method viewport_create]. When using a custom scenario or canvas, the scenario or canvas needs to be attached to the viewport using [method viewport_set_scenario] or [method viewport_attach_canvas].
   *
   * **Scenarios:** In 3D, all visual objects must be associated with a scenario. The scenario is a visual representation of the world. If accessing the rendering server from a running game, the scenario can be accessed from the scene tree from any [Node3D] node with [method Node3D.get_world_3d]. Otherwise, a scenario can be created with [method scenario_create].
   *
   * Similarly, in 2D, a canvas is needed to draw all canvas items.
   *
   * **3D:** In 3D, all visible objects are comprised of a resource and an instance. A resource can be a mesh, a particle system, a light, or any other 3D object. In order to be visible resources must be attached to an instance using [method instance_set_base]. The instance must also be attached to the scenario using [method instance_set_scenario] in order to be visible. RenderingServer methods that don't have a prefix are usually 3D-specific (but not always).
   *
   * **2D:** In 2D, all visible objects are some form of canvas item. In order to be visible, a canvas item needs to be the child of a canvas attached to a viewport, or it needs to be the child of another canvas item that is eventually attached to the canvas. 2D-specific RenderingServer methods generally start with `canvas_*`.
   *
   * **Headless mode:** Starting the engine with the `--headless` [url=$DOCS_URL/tutorials/editor/command_line_tutorial.html]command line argument[/url] disables all rendering and window management functions. Most functions from [RenderingServer] will return dummy values in this case.
   *
   */
  new(): RenderingServerClass
  constructor()
  static new(): RenderingServerClass

  /** If [code]false[/code], disables rendering completely, but the engine logic is still being processed. You can call [method force_draw] to draw a frame even with rendering disabled. */
  render_loop_enabled: boolean

  /** Bakes the material data of the Mesh passed in the [param base] parameter with optional [param material_overrides] to a set of [Image]s of size [param image_size]. Returns an array of [Image]s containing material properties as specified in [enum BakeChannels]. */
  bake_render_uv2(
    base: RID,
    material_overrides: RID[],
    image_size: Vector2i
  ): Image[]

  /** As the RenderingServer actual logic may run on a separate thread, accessing its internals from the main (or any other) thread will result in errors. To make it easier to run code that can safely access the rendering internals (such as [RenderingDevice] and similar RD classes), push a callable via this function so it will be executed on the render thread. */
  call_on_render_thread(callable: Callable): void

  /**
   * Creates a camera attributes object and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `camera_attributes_` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [CameraAttributes].
   *
   */
  camera_attributes_create(): RID

  /** Sets the parameters to use with the auto-exposure effect. These parameters take on the same meaning as their counterparts in [CameraAttributes] and [CameraAttributesPractical]. */
  camera_attributes_set_auto_exposure(
    camera_attributes: RID,
    enable: boolean,
    min_sensitivity: float,
    max_sensitivity: float,
    speed: float,
    scale: float
  ): void

  /** Sets the parameters to use with the DOF blur effect. These parameters take on the same meaning as their counterparts in [CameraAttributesPractical]. */
  camera_attributes_set_dof_blur(
    camera_attributes: RID,
    far_enable: boolean,
    far_distance: float,
    far_transition: float,
    near_enable: boolean,
    near_distance: float,
    near_transition: float,
    amount: float
  ): void

  /** Sets the shape of the DOF bokeh pattern to [param shape]. Different shapes may be used to achieve artistic effect, or to meet performance targets. */
  camera_attributes_set_dof_blur_bokeh_shape(shape: int): void

  /** Sets the quality level of the DOF blur effect to [param quality]. [param use_jitter] can be used to jitter samples taken during the blur pass to hide artifacts at the cost of looking more fuzzy. */
  camera_attributes_set_dof_blur_quality(
    quality: int,
    use_jitter: boolean
  ): void

  /**
   * Sets the exposure values that will be used by the renderers. The normalization amount is used to bake a given Exposure Value (EV) into rendering calculations to reduce the dynamic range of the scene.
   *
   * The normalization factor can be calculated from exposure value (EV100) as follows:
   *
   * @example
   *
   * func get_exposure_normalization(ev100: float):
   * 	return 1.0 / (pow(2.0, ev100) * 1.2)
   * @summary
   *
   *
   * The exposure value can be calculated from aperture (in f-stops), shutter speed (in seconds), and sensitivity (in ISO) as follows:
   *
   * @example
   *
   * func get_exposure(aperture: float, shutter_speed: float, sensitivity: float):
   * 	return log((aperture * aperture) / shutter_speed * (100.0 / sensitivity)) / log(2)
   * @summary
   *
   *
   */
  camera_attributes_set_exposure(
    camera_attributes: RID,
    multiplier: float,
    normalization: float
  ): void

  /**
   * Creates a 3D camera and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `camera_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent node is [Camera3D].
   *
   */
  camera_create(): RID

  /** Sets the camera_attributes created with [method camera_attributes_create] to the given camera. */
  camera_set_camera_attributes(camera: RID, effects: RID): void

  /** Sets the compositor used by this camera. Equivalent to [member Camera3D.compositor]. */
  camera_set_compositor(camera: RID, compositor: RID): void

  /** Sets the cull mask associated with this camera. The cull mask describes which 3D layers are rendered by this camera. Equivalent to [member Camera3D.cull_mask]. */
  camera_set_cull_mask(camera: RID, layers: int): void

  /** Sets the environment used by this camera. Equivalent to [member Camera3D.environment]. */
  camera_set_environment(camera: RID, env: RID): void

  /** Sets camera to use frustum projection. This mode allows adjusting the [param offset] argument to create "tilted frustum" effects. */
  camera_set_frustum(
    camera: RID,
    size: float,
    offset: Vector2,
    z_near: float,
    z_far: float
  ): void

  /** Sets camera to use orthogonal projection, also known as orthographic projection. Objects remain the same size on the screen no matter how far away they are. */
  camera_set_orthogonal(
    camera: RID,
    size: float,
    z_near: float,
    z_far: float
  ): void

  /** Sets camera to use perspective projection. Objects on the screen becomes smaller when they are far away. */
  camera_set_perspective(
    camera: RID,
    fovy_degrees: float,
    z_near: float,
    z_far: float
  ): void

  /** Sets [Transform3D] of camera. */
  camera_set_transform(camera: RID, transform: Transform3D): void

  /** If [code]true[/code], preserves the horizontal aspect ratio which is equivalent to [constant Camera3D.KEEP_WIDTH]. If [code]false[/code], preserves the vertical aspect ratio which is equivalent to [constant Camera3D.KEEP_HEIGHT]. */
  camera_set_use_vertical_aspect(camera: RID, enable: boolean): void

  /**
   * Creates a canvas and returns the assigned [RID]. It can be accessed with the RID that is returned. This RID will be used in all `canvas_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * Canvas has no [Resource] or [Node] equivalent.
   *
   */
  canvas_create(): RID

  /** Subsequent drawing commands will be ignored unless they fall within the specified animation slice. This is a faster way to implement animations that loop on background rather than redrawing constantly. */
  canvas_item_add_animation_slice(
    item: RID,
    animation_length: float,
    slice_begin: float,
    slice_end: float,
    offset?: float
  ): void

  /** Draws a circle on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_circle]. */
  canvas_item_add_circle(
    item: RID,
    pos: Vector2,
    radius: float,
    color: Color,
    antialiased?: boolean
  ): void

  /** If [param ignore] is [code]true[/code], ignore clipping on items drawn with this canvas item until this is called again with [param ignore] set to [code]false[/code]. */
  canvas_item_add_clip_ignore(item: RID, ignore: boolean): void

  /** Draws an ellipse with semi-major axis [param major] and semi-minor axis [param minor] on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_ellipse]. */
  canvas_item_add_ellipse(
    item: RID,
    pos: Vector2,
    major: float,
    minor: float,
    color: Color,
    antialiased?: boolean
  ): void

  /** See also [method CanvasItem.draw_lcd_texture_rect_region]. */
  canvas_item_add_lcd_texture_rect_region(
    item: RID,
    rect: Rect2,
    texture: RID,
    src_rect: Rect2,
    modulate: Color
  ): void

  /** Draws a line on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_line]. */
  canvas_item_add_line(
    item: RID,
    from: Vector2,
    to: Vector2,
    color: Color,
    width?: float,
    antialiased?: boolean
  ): void

  /** Draws a mesh created with [method mesh_create] with given [param transform], [param modulate] color, and [param texture]. This is used internally by [MeshInstance2D]. */
  canvas_item_add_mesh(
    item: RID,
    mesh: RID,
    transform?: Transform2D,
    modulate?: Color,
    texture?: RID
  ): void

  /** See also [method CanvasItem.draw_msdf_texture_rect_region]. */
  canvas_item_add_msdf_texture_rect_region(
    item: RID,
    rect: Rect2,
    texture: RID,
    src_rect: Rect2,
    modulate?: Color,
    outline_size?: int,
    px_range?: float,
    scale?: float
  ): void

  /** Draws a 2D multiline on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_multiline] and [method CanvasItem.draw_multiline_colors]. */
  canvas_item_add_multiline(
    item: RID,
    points: PackedVector2Array,
    colors: PackedColorArray,
    width?: float,
    antialiased?: boolean
  ): void

  /** Draws a 2D [MultiMesh] on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_multimesh]. */
  canvas_item_add_multimesh(item: RID, mesh: RID, texture?: RID): void

  /** Draws a nine-patch rectangle on the [CanvasItem] pointed to by the [param item] [RID]. */
  canvas_item_add_nine_patch(
    item: RID,
    rect: Rect2,
    source: Rect2,
    texture: RID,
    topleft: Vector2,
    bottomright: Vector2,
    x_axis_mode?: int,
    y_axis_mode?: int,
    draw_center?: boolean,
    modulate?: Color
  ): void

  /** Draws particles on the [CanvasItem] pointed to by the [param item] [RID]. */
  canvas_item_add_particles(item: RID, particles: RID, texture: RID): void

  /**
   * Draws a 2D polygon on the [CanvasItem] pointed to by the [param item] [RID]. If you need more flexibility (such as being able to use bones), use [method canvas_item_add_triangle_array] instead. See also [method CanvasItem.draw_polygon].
   *
   * **Note:** If you frequently redraw the same polygon with a large number of vertices, consider pre-calculating the triangulation with [method Geometry2D.triangulate_polygon] and using [method CanvasItem.draw_mesh], [method CanvasItem.draw_multimesh], or [method canvas_item_add_triangle_array].
   *
   */
  canvas_item_add_polygon(
    item: RID,
    points: PackedVector2Array,
    colors: PackedColorArray,
    uvs?: PackedVector2Array,
    texture?: RID
  ): void

  /** Draws a 2D polyline on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_polyline] and [method CanvasItem.draw_polyline_colors]. */
  canvas_item_add_polyline(
    item: RID,
    points: PackedVector2Array,
    colors: PackedColorArray,
    width?: float,
    antialiased?: boolean
  ): void

  /** Draws a 2D primitive on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_primitive]. */
  canvas_item_add_primitive(
    item: RID,
    points: PackedVector2Array,
    colors: PackedColorArray,
    uvs: PackedVector2Array,
    texture: RID
  ): void

  /** Draws a rectangle on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_rect]. */
  canvas_item_add_rect(
    item: RID,
    rect: Rect2,
    color: Color,
    antialiased?: boolean
  ): void

  /** Sets a [Transform2D] that will be used to transform subsequent canvas item commands. */
  canvas_item_add_set_transform(item: RID, transform: Transform2D): void

  /** Draws a 2D textured rectangle on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_texture_rect] and [method Texture2D.draw_rect]. */
  canvas_item_add_texture_rect(
    item: RID,
    rect: Rect2,
    texture: RID,
    tile?: boolean,
    modulate?: Color,
    transpose?: boolean
  ): void

  /** Draws the specified region of a 2D textured rectangle on the [CanvasItem] pointed to by the [param item] [RID]. See also [method CanvasItem.draw_texture_rect_region] and [method Texture2D.draw_rect_region]. */
  canvas_item_add_texture_rect_region(
    item: RID,
    rect: Rect2,
    texture: RID,
    src_rect: Rect2,
    modulate?: Color,
    transpose?: boolean,
    clip_uv?: boolean
  ): void

  /**
   * Draws a triangle array on the [CanvasItem] pointed to by the [param item] [RID]. This is internally used by [Line2D] and [StyleBoxFlat] for rendering. [method canvas_item_add_triangle_array] is highly flexible, but more complex to use than [method canvas_item_add_polygon].
   *
   * **Note:** If [param count] is set to a non-negative value, only the first `count * 3` indices (corresponding to [code skip-lint]count` triangles) will be drawn. Otherwise, all indices are drawn.
   *
   */
  canvas_item_add_triangle_array(
    item: RID,
    indices: PackedInt32Array,
    points: PackedVector2Array,
    colors: PackedColorArray,
    uvs?: PackedVector2Array,
    bones?: PackedInt32Array,
    weights?: PackedFloat32Array,
    texture?: RID,
    count?: int
  ): void

  /** Attaches a skeleton to the [CanvasItem]. Removes the previous skeleton. */
  canvas_item_attach_skeleton(item: RID, skeleton: RID): void

  /** Clears the [CanvasItem] and removes all commands in it. */
  canvas_item_clear(item: RID): void

  /**
   * Creates a new CanvasItem instance and returns its [RID]. It can be accessed with the RID that is returned. This RID will be used in all `canvas_item_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent node is [CanvasItem].
   *
   */
  canvas_item_create(): RID

  /** Returns the value of the per-instance shader uniform from the specified canvas item instance. Equivalent to [method CanvasItem.get_instance_shader_parameter]. */
  canvas_item_get_instance_shader_parameter(
    instance: RID,
    parameter: StringName
  ): any

  /** Returns the default value of the per-instance shader uniform from the specified canvas item instance. Equivalent to [method CanvasItem.get_instance_shader_parameter]. */
  canvas_item_get_instance_shader_parameter_default_value(
    instance: RID,
    parameter: StringName
  ): any

  /**
   * Returns a dictionary of per-instance shader uniform names of the per-instance shader uniform from the specified canvas item instance.
   *
   * The returned dictionary is in PropertyInfo format, with the keys `name`, `class_name`, `type`, `hint`, `hint_string`, and `usage`.
   *
   */
  canvas_item_get_instance_shader_parameter_list(
    instance: RID
  ): Dictionary<any, any>[]

  /**
   * Prevents physics interpolation for the current physics tick.
   *
   * This is useful when moving a canvas item to a new location, to give an instantaneous change rather than interpolation from the previous location.
   *
   */
  canvas_item_reset_physics_interpolation(item: RID): void

  /**
   * Sets the canvas group mode used during 2D rendering for the canvas item specified by the [param item] RID. For faster but more limited clipping, use [method canvas_item_set_clip] instead.
   *
   * **Note:** The equivalent node functionality is found in [CanvasGroup] and [member CanvasItem.clip_children].
   *
   */
  canvas_item_set_canvas_group_mode(
    item: RID,
    mode: int,
    clear_margin?: float,
    fit_empty?: boolean,
    fit_margin?: float,
    blur_mipmaps?: boolean
  ): void

  /**
   * If [param clip] is `true`, makes the canvas item specified by the [param item] RID not draw anything outside of its rect's coordinates. This clipping is fast, but works only with axis-aligned rectangles. This means that rotation is ignored by the clipping rectangle. For more advanced clipping shapes, use [method canvas_item_set_canvas_group_mode] instead.
   *
   * **Note:** The equivalent node functionality is found in [member Label.clip_text], [RichTextLabel] (always enabled) and more.
   *
   */
  canvas_item_set_clip(item: RID, clip: boolean): void

  /** Sets the [CanvasItem] to copy a rect to the backbuffer. */
  canvas_item_set_copy_to_backbuffer(
    item: RID,
    enabled: boolean,
    rect: Rect2
  ): void

  /** If [param use_custom_rect] is [code]true[/code], sets the custom visibility rectangle (used for culling) to [param rect] for the canvas item specified by [param item]. Setting a custom visibility rect can reduce CPU load when drawing lots of 2D instances. If [param use_custom_rect] is [code]false[/code], automatically computes a visibility rectangle based on the canvas item's draw commands. */
  canvas_item_set_custom_rect(
    item: RID,
    use_custom_rect: boolean,
    rect?: Rect2
  ): void

  /** Sets the default texture filter mode for the canvas item specified by the [param item] RID. Equivalent to [member CanvasItem.texture_filter]. */
  canvas_item_set_default_texture_filter(item: RID, filter: int): void

  /** Sets the default texture repeat mode for the canvas item specified by the [param item] RID. Equivalent to [member CanvasItem.texture_repeat]. */
  canvas_item_set_default_texture_repeat(item: RID, repeat: int): void

  /** If [param enabled] is [code]true[/code], enables multichannel signed distance field rendering mode for the canvas item specified by the [param item] RID. This is meant to be used for font rendering, or with specially generated images using [url=https://github.com/Chlumsky/msdfgen]msdfgen[/url]. */
  canvas_item_set_distance_field_mode(item: RID, enabled: boolean): void

  /** If [param enabled] is [code]true[/code], draws the canvas item specified by the [param item] RID behind its parent. Equivalent to [member CanvasItem.show_behind_parent]. */
  canvas_item_set_draw_behind_parent(item: RID, enabled: boolean): void

  /** Sets the index for the [CanvasItem]. */
  canvas_item_set_draw_index(item: RID, index: int): void

  /** Sets the per-instance shader uniform on the specified canvas item instance. Equivalent to [method CanvasItem.set_instance_shader_parameter]. */
  canvas_item_set_instance_shader_parameter(
    instance: RID,
    parameter: StringName,
    value: any
  ): void

  /** If [param interpolated] is [code]true[/code], turns on physics interpolation for the canvas item. */
  canvas_item_set_interpolated(item: RID, interpolated: boolean): void

  /** Sets the light [param mask] for the canvas item specified by the [param item] RID. Equivalent to [member CanvasItem.light_mask]. */
  canvas_item_set_light_mask(item: RID, mask: int): void

  /** Sets a new [param material] to the canvas item specified by the [param item] RID. Equivalent to [member CanvasItem.material]. */
  canvas_item_set_material(item: RID, material: RID): void

  /** Multiplies the color of the canvas item specified by the [param item] RID, while affecting its children. See also [method canvas_item_set_self_modulate]. Equivalent to [member CanvasItem.modulate]. */
  canvas_item_set_modulate(item: RID, color: Color): void

  /** Sets a parent [CanvasItem] to the [CanvasItem]. The item will inherit transform, modulation and visibility from its parent, like [CanvasItem] nodes in the scene tree. */
  canvas_item_set_parent(item: RID, parent: RID): void

  /** Multiplies the color of the canvas item specified by the [param item] RID, without affecting its children. See also [method canvas_item_set_modulate]. Equivalent to [member CanvasItem.self_modulate]. */
  canvas_item_set_self_modulate(item: RID, color: Color): void

  /** If [param enabled] is [code]true[/code], child nodes with the lowest Y position are drawn before those with a higher Y position. Y-sorting only affects children that inherit from the canvas item specified by the [param item] RID, not the canvas item itself. Equivalent to [member CanvasItem.y_sort_enabled]. */
  canvas_item_set_sort_children_by_y(item: RID, enabled: boolean): void

  /** Sets the [param transform] of the canvas item specified by the [param item] RID. This affects where and how the item will be drawn. Child canvas items' transforms are multiplied by their parent's transform. Equivalent to [member Node2D.transform]. */
  canvas_item_set_transform(item: RID, transform: Transform2D): void

  /** Sets if the [CanvasItem] uses its parent's material. */
  canvas_item_set_use_parent_material(item: RID, enabled: boolean): void

  /** Sets the rendering visibility layer associated with this [CanvasItem]. Only [Viewport] nodes with a matching rendering mask will render this [CanvasItem]. */
  canvas_item_set_visibility_layer(item: RID, visibility_layer: int): void

  /**
   * Sets the given [CanvasItem] as visibility notifier. [param area] defines the area of detecting visibility. [param enter_callable] is called when the [CanvasItem] enters the screen, [param exit_callable] is called when the [CanvasItem] exits the screen. If [param enable] is `false`, the item will no longer function as notifier.
   *
   * This method can be used to manually mimic [VisibleOnScreenNotifier2D].
   *
   */
  canvas_item_set_visibility_notifier(
    item: RID,
    enable: boolean,
    area: Rect2,
    enter_callable: Callable,
    exit_callable: Callable
  ): void

  /** Sets the visibility of the [CanvasItem]. */
  canvas_item_set_visible(item: RID, visible: boolean): void

  /** If this is enabled, the Z index of the parent will be added to the children's Z index. */
  canvas_item_set_z_as_relative_to_parent(item: RID, enabled: boolean): void

  /** Sets the [CanvasItem]'s Z index, i.e. its draw order (lower indexes are drawn first). */
  canvas_item_set_z_index(item: RID, z_index: int): void

  /**
   * Transforms both the current and previous stored transform for a canvas item.
   *
   * This allows transforming a canvas item without creating a "glitch" in the interpolation, which is particularly useful for large worlds utilizing a shifting origin.
   *
   */
  canvas_item_transform_physics_interpolation(
    item: RID,
    transform: Transform2D
  ): void

  /** Attaches the canvas light to the canvas. Removes it from its previous canvas. */
  canvas_light_attach_to_canvas(light: RID, canvas: RID): void

  /**
   * Creates a canvas light and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_light_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent node is [Light2D].
   *
   */
  canvas_light_create(): RID

  /** Attaches a light occluder to the canvas. Removes it from its previous canvas. */
  canvas_light_occluder_attach_to_canvas(occluder: RID, canvas: RID): void

  /**
   * Creates a light occluder and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_light_occluder_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent node is [LightOccluder2D].
   *
   */
  canvas_light_occluder_create(): RID

  /**
   * Prevents physics interpolation for the current physics tick.
   *
   * This is useful when moving an occluder to a new location, to give an instantaneous change rather than interpolation from the previous location.
   *
   */
  canvas_light_occluder_reset_physics_interpolation(occluder: RID): void

  /** No documentation provided. */
  canvas_light_occluder_set_as_sdf_collision(
    occluder: RID,
    enable: boolean
  ): void

  /** Enables or disables light occluder. */
  canvas_light_occluder_set_enabled(occluder: RID, enabled: boolean): void

  /** If [param interpolated] is [code]true[/code], turns on physics interpolation for the light occluder. */
  canvas_light_occluder_set_interpolated(
    occluder: RID,
    interpolated: boolean
  ): void

  /** The light mask. See [LightOccluder2D] for more information on light masks. */
  canvas_light_occluder_set_light_mask(occluder: RID, mask: int): void

  /** Sets a light occluder's polygon. */
  canvas_light_occluder_set_polygon(occluder: RID, polygon: RID): void

  /** Sets a light occluder's [Transform2D]. */
  canvas_light_occluder_set_transform(
    occluder: RID,
    transform: Transform2D
  ): void

  /**
   * Transforms both the current and previous stored transform for a light occluder.
   *
   * This allows transforming an occluder without creating a "glitch" in the interpolation, which is particularly useful for large worlds utilizing a shifting origin.
   *
   */
  canvas_light_occluder_transform_physics_interpolation(
    occluder: RID,
    transform: Transform2D
  ): void

  /**
   * Prevents physics interpolation for the current physics tick.
   *
   * This is useful when moving a canvas item to a new location, to give an instantaneous change rather than interpolation from the previous location.
   *
   */
  canvas_light_reset_physics_interpolation(light: RID): void

  /** Sets the blend mode for the given canvas light to [param mode]. Equivalent to [member Light2D.blend_mode]. */
  canvas_light_set_blend_mode(light: RID, mode: int): void

  /** Sets the color for a light. */
  canvas_light_set_color(light: RID, color: Color): void

  /** Enables or disables a canvas light. */
  canvas_light_set_enabled(light: RID, enabled: boolean): void

  /** Sets a canvas light's energy. */
  canvas_light_set_energy(light: RID, energy: float): void

  /** Sets a canvas light's height. */
  canvas_light_set_height(light: RID, height: float): void

  /** If [param interpolated] is [code]true[/code], turns on physics interpolation for the canvas light. */
  canvas_light_set_interpolated(light: RID, interpolated: boolean): void

  /** The light mask. See [LightOccluder2D] for more information on light masks. */
  canvas_light_set_item_cull_mask(light: RID, mask: int): void

  /** The binary mask used to determine which layers this canvas light's shadows affects. See [LightOccluder2D] for more information on light masks. */
  canvas_light_set_item_shadow_cull_mask(light: RID, mask: int): void

  /** The layer range that gets rendered with this light. */
  canvas_light_set_layer_range(light: RID, min_layer: int, max_layer: int): void

  /** Sets the mode of the canvas light. */
  canvas_light_set_mode(light: RID, mode: int): void

  /** Sets the color of the canvas light's shadow. */
  canvas_light_set_shadow_color(light: RID, color: Color): void

  /** Enables or disables the canvas light's shadow. */
  canvas_light_set_shadow_enabled(light: RID, enabled: boolean): void

  /** Sets the canvas light's shadow's filter. */
  canvas_light_set_shadow_filter(light: RID, filter: int): void

  /** Smoothens the shadow. The lower, the smoother. */
  canvas_light_set_shadow_smooth(light: RID, smooth: float): void

  /** Sets the texture to be used by a [PointLight2D]. Equivalent to [member PointLight2D.texture]. */
  canvas_light_set_texture(light: RID, texture: RID): void

  /** Sets the offset of a [PointLight2D]'s texture. Equivalent to [member PointLight2D.offset]. */
  canvas_light_set_texture_offset(light: RID, offset: Vector2): void

  /** Sets the scale factor of a [PointLight2D]'s texture. Equivalent to [member PointLight2D.texture_scale]. */
  canvas_light_set_texture_scale(light: RID, scale: float): void

  /** Sets the canvas light's [Transform2D]. */
  canvas_light_set_transform(light: RID, transform: Transform2D): void

  /** Sets the Z range of objects that will be affected by this light. Equivalent to [member Light2D.range_z_min] and [member Light2D.range_z_max]. */
  canvas_light_set_z_range(light: RID, min_z: int, max_z: int): void

  /**
   * Transforms both the current and previous stored transform for a canvas light.
   *
   * This allows transforming a light without creating a "glitch" in the interpolation, which is particularly useful for large worlds utilizing a shifting origin.
   *
   */
  canvas_light_transform_physics_interpolation(
    light: RID,
    transform: Transform2D
  ): void

  /**
   * Creates a new light occluder polygon and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_occluder_polygon_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [OccluderPolygon2D].
   *
   */
  canvas_occluder_polygon_create(): RID

  /** Sets an occluder polygon's cull mode. */
  canvas_occluder_polygon_set_cull_mode(occluder_polygon: RID, mode: int): void

  /** Sets the shape of the occluder polygon. */
  canvas_occluder_polygon_set_shape(
    occluder_polygon: RID,
    shape: PackedVector2Array,
    closed: boolean
  ): void

  /** No documentation provided. */
  canvas_set_disable_scale(disable: boolean): void

  /**
   * A copy of the canvas item will be drawn with a local offset of the [param mirroring].
   *
   * **Note:** This is equivalent to calling [method canvas_set_item_repeat] like `canvas_set_item_repeat(item, mirroring, 1)`, with an additional check ensuring [param canvas] is a parent of [param item].
   *
   */
  canvas_set_item_mirroring(canvas: RID, item: RID, mirroring: Vector2): void

  /** A copy of the canvas item will be drawn with a local offset of the [param repeat_size] by the number of times of the [param repeat_times]. As the [param repeat_times] increases, the copies will spread away from the origin texture. */
  canvas_set_item_repeat(
    item: RID,
    repeat_size: Vector2,
    repeat_times: int
  ): void

  /** Modulates all colors in the given canvas. */
  canvas_set_modulate(canvas: RID, color: Color): void

  /** Sets the [member ProjectSettings.rendering/2d/shadow_atlas/size] to use for [Light2D] shadow rendering (in pixels). The value is rounded up to the nearest power of 2. */
  canvas_set_shadow_texture_size(size: int): void

  /**
   * Creates a canvas texture and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `canvas_texture_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method. See also [method texture_2d_create].
   *
   * **Note:** The equivalent resource is [CanvasTexture] and is only meant to be used in 2D rendering, not 3D.
   *
   */
  canvas_texture_create(): RID

  /** Sets the [param channel]'s [param texture] for the canvas texture specified by the [param canvas_texture] RID. Equivalent to [member CanvasTexture.diffuse_texture], [member CanvasTexture.normal_texture] and [member CanvasTexture.specular_texture]. */
  canvas_texture_set_channel(
    canvas_texture: RID,
    channel: int,
    texture: RID
  ): void

  /** Sets the [param base_color] and [param shininess] to use for the canvas texture specified by the [param canvas_texture] RID. Equivalent to [member CanvasTexture.specular_color] and [member CanvasTexture.specular_shininess]. */
  canvas_texture_set_shading_parameters(
    canvas_texture: RID,
    base_color: Color,
    shininess: float
  ): void

  /** Sets the texture [param filter] mode to use for the canvas texture specified by the [param canvas_texture] RID. */
  canvas_texture_set_texture_filter(canvas_texture: RID, filter: int): void

  /** Sets the texture [param repeat] mode to use for the canvas texture specified by the [param canvas_texture] RID. */
  canvas_texture_set_texture_repeat(canvas_texture: RID, repeat: int): void

  /**
   * Creates a new compositor and adds it to the RenderingServer. It can be accessed with the RID that is returned.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   */
  compositor_create(): RID

  /**
   * Creates a new rendering effect and adds it to the RenderingServer. It can be accessed with the RID that is returned.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   */
  compositor_effect_create(): RID

  /** Sets the callback type ([param callback_type]) and callback method([param callback]) for this rendering effect. */
  compositor_effect_set_callback(
    effect: RID,
    callback_type: int,
    callback: Callable
  ): void

  /** Enables/disables this rendering effect. */
  compositor_effect_set_enabled(effect: RID, enabled: boolean): void

  /** Sets the flag ([param flag]) for this rendering effect to [code]true[/code] or [code]false[/code] ([param set]). */
  compositor_effect_set_flag(effect: RID, flag: int, set: boolean): void

  /** Sets the compositor effects for the specified compositor RID. [param effects] should be an array containing RIDs created with [method compositor_effect_create]. */
  compositor_set_compositor_effects(compositor: RID, effects: RID[]): void

  /**
   * Creates a RenderingDevice that can be used to do draw and compute operations on a separate thread. Cannot draw to the screen nor share data with the global RenderingDevice.
   *
   * **Note:** When using the OpenGL rendering driver or when running in headless mode, this function always returns `null`.
   *
   */
  create_local_rendering_device(): RenderingDevice

  /**
   * Returns the bounding rectangle for a canvas item in local space, as calculated by the renderer. This bound is used internally for culling.
   *
   * **Warning:** This function is intended for debugging in the editor, and will pass through and return a zero [Rect2] in exported projects.
   *
   */
  debug_canvas_item_get_rect(item: RID): Rect2

  /**
   * Creates a decal and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `decal_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * To place in a scene, attach this decal to an instance using [method instance_set_base] using the returned RID.
   *
   * **Note:** The equivalent node is [Decal].
   *
   */
  decal_create(): RID

  /** Sets the [param albedo_mix] in the decal specified by the [param decal] RID. Equivalent to [member Decal.albedo_mix]. */
  decal_set_albedo_mix(decal: RID, albedo_mix: float): void

  /** Sets the cull [param mask] in the decal specified by the [param decal] RID. Equivalent to [member Decal.cull_mask]. */
  decal_set_cull_mask(decal: RID, mask: int): void

  /** Sets the distance fade parameters in the decal specified by the [param decal] RID. Equivalent to [member Decal.distance_fade_enabled], [member Decal.distance_fade_begin] and [member Decal.distance_fade_length]. */
  decal_set_distance_fade(
    decal: RID,
    enabled: boolean,
    begin: float,
    length: float
  ): void

  /** Sets the emission [param energy] in the decal specified by the [param decal] RID. Equivalent to [member Decal.emission_energy]. */
  decal_set_emission_energy(decal: RID, energy: float): void

  /** Sets the upper fade ([param above]) and lower fade ([param below]) in the decal specified by the [param decal] RID. Equivalent to [member Decal.upper_fade] and [member Decal.lower_fade]. */
  decal_set_fade(decal: RID, above: float, below: float): void

  /** Sets the color multiplier in the decal specified by the [param decal] RID to [param color]. Equivalent to [member Decal.modulate]. */
  decal_set_modulate(decal: RID, color: Color): void

  /** Sets the normal [param fade] in the decal specified by the [param decal] RID. Equivalent to [member Decal.normal_fade]. */
  decal_set_normal_fade(decal: RID, fade: float): void

  /** Sets the [param size] of the decal specified by the [param decal] RID. Equivalent to [member Decal.size]. */
  decal_set_size(decal: RID, size: Vector3): void

  /** Sets the [param texture] in the given texture [param type] slot for the specified decal. Equivalent to [method Decal.set_texture]. */
  decal_set_texture(decal: RID, type: int, texture: RID): void

  /** Sets the texture [param filter] mode to use when rendering decals. This parameter is global and cannot be set on a per-decal basis. */
  decals_set_filter(filter: int): void

  /**
   * Creates a directional light and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID can be used in most `light_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * To place in a scene, attach this directional light to an instance using [method instance_set_base] using the returned RID.
   *
   * **Note:** The equivalent node is [DirectionalLight3D].
   *
   */
  directional_light_create(): RID

  /** Sets the [param size] of the directional light shadows in 3D. See also [member ProjectSettings.rendering/lights_and_shadows/directional_shadow/size]. This parameter is global and cannot be set on a per-viewport basis. */
  directional_shadow_atlas_set_size(size: int, is_16bits: boolean): void

  /** Sets the filter [param quality] for directional light shadows in 3D. See also [member ProjectSettings.rendering/lights_and_shadows/directional_shadow/soft_shadow_filter_quality]. This parameter is global and cannot be set on a per-viewport basis. */
  directional_soft_shadow_filter_set_quality(quality: int): void

  /**
   * Generates and returns an [Image] containing the radiance map for the specified [param environment] RID's sky. This supports built-in sky material and custom sky shaders. If [param bake_irradiance] is `true`, the irradiance map is saved instead of the radiance map. The radiance map is used to render reflected light, while the irradiance map is used to render ambient light. See also [method sky_bake_panorama].
   *
   * **Note:** The image is saved using linear encoding without any tonemapping performed, which means it will look too dark if viewed directly in an image editor.
   *
   * **Note:** [param size] should be a 2:1 aspect ratio for the generated panorama to have square pixels. For radiance maps, there is no point in using a height greater than [member Sky.radiance_size], as it won't increase detail. Irradiance maps only contain low-frequency data, so there is usually no point in going past a size of 128×64 pixels when saving an irradiance map.
   *
   */
  environment_bake_panorama(
    environment: RID,
    bake_irradiance: boolean,
    size: Vector2i
  ): Image

  /**
   * Creates an environment and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `environment_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [Environment].
   *
   */
  environment_create(): RID

  /**
   * If [param enable] is `true`, enables bicubic upscaling for glow which improves quality at the cost of performance. Equivalent to [member ProjectSettings.rendering/environment/glow/upscale_mode].
   *
   * **Note:** This setting is only effective when using the Forward+ or Mobile rendering methods, as Compatibility uses a different glow implementation.
   *
   */
  environment_glow_set_use_bicubic_upscale(enable: boolean): void

  /** Sets the values to be used with the "adjustments" post-process effect. See [Environment] for more details. */
  environment_set_adjustment(
    env: RID,
    enable: boolean,
    brightness: float,
    contrast: float,
    saturation: float,
    use_1d_color_correction: boolean,
    color_correction: RID
  ): void

  /** Sets the values to be used for ambient light rendering. See [Environment] for more details. */
  environment_set_ambient_light(
    env: RID,
    color: Color,
    ambient?: int,
    energy?: float,
    sky_contribution?: float,
    reflection_source?: int
  ): void

  /** Sets the environment's background mode. Equivalent to [member Environment.background_mode]. */
  environment_set_background(env: RID, bg: int): void

  /** Color displayed for clear areas of the scene. Only effective if using the [constant ENV_BG_COLOR] background mode. */
  environment_set_bg_color(env: RID, color: Color): void

  /** Sets the intensity of the background color. */
  environment_set_bg_energy(
    env: RID,
    multiplier: float,
    exposure_value: float
  ): void

  /** Sets the camera ID to be used as environment background. */
  environment_set_camera_id(env: RID, id: int): void

  /** Sets the maximum layer to use if using Canvas background mode. */
  environment_set_canvas_max_layer(env: RID, max_layer: int): void

  /** Configures fog for the specified environment RID. See [code]fog_*[/code] properties in [Environment] for more information. */
  environment_set_fog(
    env: RID,
    enable: boolean,
    light_color: Color,
    light_energy: float,
    sun_scatter: float,
    density: float,
    height: float,
    height_density: float,
    aerial_perspective: float,
    sky_affect: float,
    fog_mode?: int
  ): void

  /** Configures fog depth for the specified environment RID. Only has an effect when the fog mode of the environment is [constant ENV_FOG_MODE_DEPTH]. See [code]fog_depth_*[/code] properties in [Environment] for more information. */
  environment_set_fog_depth(
    env: RID,
    curve: float,
    begin: float,
    end: float
  ): void

  /** Configures glow for the specified environment RID. See [code]glow_*[/code] properties in [Environment] for more information. */
  environment_set_glow(
    env: RID,
    enable: boolean,
    levels: PackedFloat32Array,
    intensity: float,
    strength: float,
    mix: float,
    bloom_threshold: float,
    blend_mode: int,
    hdr_bleed_threshold: float,
    hdr_bleed_scale: float,
    hdr_luminance_cap: float,
    glow_map_strength: float,
    glow_map: RID
  ): void

  /** Configures signed distance field global illumination for the specified environment RID. See [code]sdfgi_*[/code] properties in [Environment] for more information. */
  environment_set_sdfgi(
    env: RID,
    enable: boolean,
    cascades: int,
    min_cell_size: float,
    y_scale: int,
    use_occlusion: boolean,
    bounce_feedback: float,
    read_sky: boolean,
    energy: float,
    normal_bias: float,
    probe_bias: float
  ): void

  /** Sets the number of frames to use for converging signed distance field global illumination. Equivalent to [member ProjectSettings.rendering/global_illumination/sdfgi/frames_to_converge]. */
  environment_set_sdfgi_frames_to_converge(frames: int): void

  /** Sets the update speed for dynamic lights' indirect lighting when computing signed distance field global illumination. Equivalent to [member ProjectSettings.rendering/global_illumination/sdfgi/frames_to_update_lights]. */
  environment_set_sdfgi_frames_to_update_light(frames: int): void

  /** Sets the number of rays to throw per frame when computing signed distance field global illumination. Equivalent to [member ProjectSettings.rendering/global_illumination/sdfgi/probe_ray_count]. */
  environment_set_sdfgi_ray_count(ray_count: int): void

  /** Sets the [Sky] to be used as the environment's background when using [i]BGMode[/i] sky. Equivalent to [member Environment.sky]. */
  environment_set_sky(env: RID, sky: RID): void

  /** Sets a custom field of view for the background [Sky]. Equivalent to [member Environment.sky_custom_fov]. */
  environment_set_sky_custom_fov(env: RID, scale: float): void

  /** Sets the rotation of the background [Sky] expressed as a [Basis]. Equivalent to [member Environment.sky_rotation], where the rotation vector is used to construct the [Basis]. */
  environment_set_sky_orientation(env: RID, orientation: Basis): void

  /** Sets the variables to be used with the screen-space ambient occlusion (SSAO) post-process effect. See [Environment] for more details. */
  environment_set_ssao(
    env: RID,
    enable: boolean,
    radius: float,
    intensity: float,
    power: float,
    detail: float,
    horizon: float,
    sharpness: float,
    light_affect: float,
    ao_channel_affect: float
  ): void

  /** Sets the quality level of the screen-space ambient occlusion (SSAO) post-process effect. See [Environment] for more details. */
  environment_set_ssao_quality(
    quality: int,
    half_size: boolean,
    adaptive_target: float,
    blur_passes: int,
    fadeout_from: float,
    fadeout_to: float
  ): void

  /** Sets the quality level of the screen-space indirect lighting (SSIL) post-process effect. See [Environment] for more details. */
  environment_set_ssil_quality(
    quality: int,
    half_size: boolean,
    adaptive_target: float,
    blur_passes: int,
    fadeout_from: float,
    fadeout_to: float
  ): void

  /** Sets the variables to be used with the screen-space reflections (SSR) post-process effect. See [Environment] for more details. */
  environment_set_ssr(
    env: RID,
    enable: boolean,
    max_steps: int,
    fade_in: float,
    fade_out: float,
    depth_tolerance: float
  ): void

  /** Sets whether screen-space reflections will be rendered at full or half size. Half size is faster, but may look pixelated or cause flickering. */
  environment_set_ssr_half_size(half_size: boolean): void

  /** No documentation provided. */
  environment_set_ssr_roughness_quality(quality: int): void

  /** Sets the variables to be used with the "tonemap" post-process effect. See [Environment] for more details. */
  environment_set_tonemap(
    env: RID,
    tone_mapper: int,
    exposure: float,
    white: float
  ): void

  /** See [member Environment.tonemap_agx_contrast] for more details. */
  environment_set_tonemap_agx_contrast(env: RID, agx_contrast: float): void

  /** Sets the variables to be used with the volumetric fog post-process effect. See [Environment] for more details. */
  environment_set_volumetric_fog(
    env: RID,
    enable: boolean,
    density: float,
    albedo: Color,
    emission: Color,
    emission_energy: float,
    anisotropy: float,
    length: float,
    p_detail_spread: float,
    gi_inject: float,
    temporal_reprojection: boolean,
    temporal_reprojection_amount: float,
    ambient_inject: float,
    sky_affect: float
  ): void

  /** Enables filtering of the volumetric fog scattering buffer. This results in much smoother volumes with very few under-sampling artifacts. */
  environment_set_volumetric_fog_filter_active(active: boolean): void

  /** Sets the resolution of the volumetric fog's froxel buffer. [param size] is modified by the screen's aspect ratio and then used to set the width and height of the buffer. While [param depth] is directly used to set the depth of the buffer. */
  environment_set_volumetric_fog_volume_size(size: int, depth: int): void

  /**
   * Creates a new fog volume and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `fog_volume_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent node is [FogVolume].
   *
   */
  fog_volume_create(): RID

  /** Sets the [Material] of the fog volume. Can be either a [FogMaterial] or a custom [ShaderMaterial]. */
  fog_volume_set_material(fog_volume: RID, material: RID): void

  /** Sets the shape of the fog volume to either [constant RenderingServer.FOG_VOLUME_SHAPE_ELLIPSOID], [constant RenderingServer.FOG_VOLUME_SHAPE_CONE], [constant RenderingServer.FOG_VOLUME_SHAPE_CYLINDER], [constant RenderingServer.FOG_VOLUME_SHAPE_BOX] or [constant RenderingServer.FOG_VOLUME_SHAPE_WORLD]. */
  fog_volume_set_shape(fog_volume: RID, shape: int): void

  /** Sets the size of the fog volume when shape is [constant RenderingServer.FOG_VOLUME_SHAPE_ELLIPSOID], [constant RenderingServer.FOG_VOLUME_SHAPE_CONE], [constant RenderingServer.FOG_VOLUME_SHAPE_CYLINDER] or [constant RenderingServer.FOG_VOLUME_SHAPE_BOX]. */
  fog_volume_set_size(fog_volume: RID, size: Vector3): void

  /** Forces redrawing of all viewports at once. Must be called from the main thread. */
  force_draw(swap_buffers?: boolean, frame_step?: float): void

  /** Forces a synchronization between the CPU and GPU, which may be required in certain cases. Only call this when needed, as CPU-GPU synchronization has a performance cost. */
  force_sync(): void

  /** Tries to free an object in the RenderingServer. To avoid memory leaks, this should be called after using an object as memory management does not occur automatically when using RenderingServer directly. */
  free_rid(rid: RID): void

  /**
   * Returns the name of the current rendering driver. This can be `vulkan`, `d3d12`, `metal`, `opengl3`, `opengl3_es`, or `opengl3_angle`. See also [method get_current_rendering_method].
   *
   * When [member ProjectSettings.rendering/renderer/rendering_method] is `forward_plus` or `mobile`, the rendering driver is determined by [member ProjectSettings.rendering/rendering_device/driver].
   *
   * When [member ProjectSettings.rendering/renderer/rendering_method] is `gl_compatibility`, the rendering driver is determined by [member ProjectSettings.rendering/gl_compatibility/driver].
   *
   * The rendering driver is also determined by the `--rendering-driver` command line argument that overrides this project setting, or an automatic fallback that is applied depending on the hardware.
   *
   */
  get_current_rendering_driver_name(): string

  /**
   * Returns the name of the current rendering method. This can be `forward_plus`, `mobile`, or `gl_compatibility`. See also [method get_current_rendering_driver_name].
   *
   * The rendering method is determined by [member ProjectSettings.rendering/renderer/rendering_method], the `--rendering-method` command line argument that overrides this project setting, or an automatic fallback that is applied depending on the hardware.
   *
   */
  get_current_rendering_method(): string

  /** Returns the default clear color which is used when a specific clear color has not been selected. See also [method set_default_clear_color]. */
  get_default_clear_color(): Color

  /** Returns the time taken to setup rendering on the CPU in milliseconds. This value is shared across all viewports and does [i]not[/i] require [method viewport_set_measure_render_time] to be enabled on a viewport to be queried. See also [method viewport_get_measured_render_time_cpu]. */
  get_frame_setup_time_cpu(): float

  /**
   * Returns the global RenderingDevice.
   *
   * **Note:** When using the OpenGL rendering driver or when running in headless mode, this function always returns `null`.
   *
   */
  get_rendering_device(): RenderingDevice

  /**
   * Returns a statistic about the rendering engine which can be used for performance profiling. See also [method viewport_get_render_info], which returns information specific to a viewport.
   *
   * **Note:** Only 3D rendering is currently taken into account by some of these values, such as the number of draw calls.
   *
   * **Note:** Rendering information is not available until at least 2 frames have been rendered by the engine. If rendering information is not available, [method get_rendering_info] returns `0`. To print rendering information in `_ready()` successfully, use the following:
   *
   * @example
   *
   * func _ready():
   * 	for _i in 2:
   * 		await get_tree().process_frame
   * 	print(RenderingServer.get_rendering_info(RENDERING_INFO_TOTAL_DRAW_CALLS_IN_FRAME))
   * @summary
   *
   *
   */
  get_rendering_info(info: int): int

  /** Returns the parameters of a shader. */
  get_shader_parameter_list(shader: RID): Dictionary<any, any>[]

  /** Returns the RID of the test cube. This mesh will be created and returned on the first call to [method get_test_cube], then it will be cached for subsequent calls. See also [method make_sphere_mesh]. */
  get_test_cube(): RID

  /**
   * Returns the RID of a 256×256 texture with a testing pattern on it (in [constant Image.FORMAT_RGB8] format). This texture will be created and returned on the first call to [method get_test_texture], then it will be cached for subsequent calls. See also [method get_white_texture].
   *
   * **Example:** Get the test texture and apply it to a [Sprite2D] node:
   *
   * @example
   *
   * var texture_rid = RenderingServer.get_test_texture()
   * var texture = ImageTexture.create_from_image(RenderingServer.texture_2d_get(texture_rid))
   * $Sprite2D.texture = texture
   * @summary
   *
   *
   */
  get_test_texture(): RID

  /**
   * Returns the version of the graphics video adapter **currently in use** (e.g. "1.2.189" for Vulkan, "3.3.0 NVIDIA 510.60.02" for OpenGL). This version may be different from the actual latest version supported by the hardware, as Godot may not always request the latest version. See also [method OS.get_video_adapter_driver_info].
   *
   * **Note:** When running a headless or server binary, this function returns an empty string.
   *
   */
  get_video_adapter_api_version(): string

  /**
   * Returns the name of the video adapter (e.g. "GeForce GTX 1080/PCIe/SSE2").
   *
   * **Note:** When running a headless or server binary, this function returns an empty string.
   *
   * **Note:** On the web platform, some browsers such as Firefox may report a different, fixed GPU name such as "GeForce GTX 980" (regardless of the user's actual GPU model). This is done to make fingerprinting more difficult.
   *
   */
  get_video_adapter_name(): string

  /**
   * Returns the type of the video adapter. Since dedicated graphics cards from a given generation will **usually** be significantly faster than integrated graphics made in the same generation, the device type can be used as a basis for automatic graphics settings adjustment. However, this is not always true, so make sure to provide users with a way to manually override graphics settings.
   *
   * **Note:** When using the OpenGL rendering driver or when running in headless mode, this function always returns [constant RenderingDevice.DEVICE_TYPE_OTHER].
   *
   */
  get_video_adapter_type(): int

  /**
   * Returns the vendor of the video adapter (e.g. "NVIDIA Corporation").
   *
   * **Note:** When running a headless or server binary, this function returns an empty string.
   *
   */
  get_video_adapter_vendor(): string

  /**
   * Returns the ID of a 4×4 white texture (in [constant Image.FORMAT_RGB8] format). This texture will be created and returned on the first call to [method get_white_texture], then it will be cached for subsequent calls. See also [method get_test_texture].
   *
   * **Example:** Get the white texture and apply it to a [Sprite2D] node:
   *
   * @example
   *
   * var texture_rid = RenderingServer.get_white_texture()
   * var texture = ImageTexture.create_from_image(RenderingServer.texture_2d_get(texture_rid))
   * $Sprite2D.texture = texture
   * @summary
   *
   *
   */
  get_white_texture(): RID

  /** If [param half_resolution] is [code]true[/code], renders [VoxelGI] and SDFGI ([member Environment.sdfgi_enabled]) buffers at halved resolution on each axis (e.g. 960×540 when the viewport size is 1920×1080). This improves performance significantly when VoxelGI or SDFGI is enabled, at the cost of artifacts that may be visible on polygon edges. The loss in quality becomes less noticeable as the viewport resolution increases. [LightmapGI] rendering is not affected by this setting. Equivalent to [member ProjectSettings.rendering/global_illumination/gi/use_half_resolution]. */
  gi_set_use_half_resolution(half_resolution: boolean): void

  /**
   * Creates a new global shader uniform.
   *
   * **Note:** Global shader parameter names are case-sensitive.
   *
   */
  global_shader_parameter_add(
    name: StringName,
    type: int,
    default_value: any
  ): void

  /**
   * Returns the value of the global shader uniform specified by [param name].
   *
   * **Note:** [method global_shader_parameter_get] has a large performance penalty as the rendering thread needs to synchronize with the calling thread, which is slow. Do not use this method during gameplay to avoid stuttering. If you need to read values in a script after setting them, consider creating an autoload where you store the values you need to query at the same time you're setting them as global parameters.
   *
   */
  global_shader_parameter_get(name: StringName): any

  /**
   * Returns the list of global shader uniform names.
   *
   * **Note:** [method global_shader_parameter_get] has a large performance penalty as the rendering thread needs to synchronize with the calling thread, which is slow. Do not use this method during gameplay to avoid stuttering. If you need to read values in a script after setting them, consider creating an autoload where you store the values you need to query at the same time you're setting them as global parameters.
   *
   */
  global_shader_parameter_get_list(): StringName[]

  /**
   * Returns the type associated to the global shader uniform specified by [param name].
   *
   * **Note:** [method global_shader_parameter_get] has a large performance penalty as the rendering thread needs to synchronize with the calling thread, which is slow. Do not use this method during gameplay to avoid stuttering. If you need to read values in a script after setting them, consider creating an autoload where you store the values you need to query at the same time you're setting them as global parameters.
   *
   */
  global_shader_parameter_get_type(name: StringName): int

  /** Removes the global shader uniform specified by [param name]. */
  global_shader_parameter_remove(name: StringName): void

  /** Sets the global shader uniform [param name] to [param value]. */
  global_shader_parameter_set(name: StringName, value: any): void

  /** Overrides the global shader uniform [param name] with [param value]. Equivalent to the [ShaderGlobalsOverride] node. */
  global_shader_parameter_set_override(name: StringName, value: any): void

  /** Returns [code]true[/code] if changes have been made to the RenderingServer's data. [method force_draw] is usually called if this happens. */
  has_changed(): boolean

  /** This method does nothing and always returns [code]false[/code]. */
  has_feature(feature: int): boolean

  /** Returns [code]true[/code] if the OS supports a certain [param feature]. Features might be [code]s3tc[/code], [code]etc[/code], and [code]etc2[/code]. */
  has_os_feature(feature: string): boolean

  /** Attaches a unique Object ID to instance. Object ID must be attached to instance for proper culling with [method instances_cull_aabb], [method instances_cull_convex], and [method instances_cull_ray]. */
  instance_attach_object_instance_id(instance: RID, id: int): void

  /** Attaches a skeleton to an instance. Removes the previous skeleton from the instance. */
  instance_attach_skeleton(instance: RID, skeleton: RID): void

  /**
   * Creates a visual instance and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `instance_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * An instance is a way of placing a 3D object in the scenario. Objects like particles, meshes, reflection probes and decals need to be associated with an instance to be visible in the scenario using [method instance_set_base].
   *
   * **Note:** The equivalent node is [VisualInstance3D].
   *
   */
  instance_create(): RID

  /**
   * Creates a visual instance, adds it to the RenderingServer, and sets both base and scenario. It can be accessed with the RID that is returned. This RID will be used in all `instance_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method. This is a shorthand for using [method instance_create] and setting the base and scenario manually.
   *
   */
  instance_create2(base: RID, scenario: RID): RID

  /**
   * Returns the value of the per-instance shader uniform from the specified 3D geometry instance. Equivalent to [method GeometryInstance3D.get_instance_shader_parameter].
   *
   * **Note:** Per-instance shader parameter names are case-sensitive.
   *
   */
  instance_geometry_get_shader_parameter(
    instance: RID,
    parameter: StringName
  ): any

  /** Returns the default value of the per-instance shader uniform from the specified 3D geometry instance. Equivalent to [method GeometryInstance3D.get_instance_shader_parameter]. */
  instance_geometry_get_shader_parameter_default_value(
    instance: RID,
    parameter: StringName
  ): any

  /** Returns a dictionary of per-instance shader uniform names of the per-instance shader uniform from the specified 3D geometry instance. The returned dictionary is in PropertyInfo format, with the keys [code]name[/code], [code]class_name[/code], [code]type[/code], [code]hint[/code], [code]hint_string[/code] and [code]usage[/code]. Equivalent to [method GeometryInstance3D.get_instance_shader_parameter]. */
  instance_geometry_get_shader_parameter_list(
    instance: RID
  ): Dictionary<any, any>[]

  /** Sets the shadow casting setting. Equivalent to [member GeometryInstance3D.cast_shadow]. */
  instance_geometry_set_cast_shadows_setting(
    instance: RID,
    shadow_casting_setting: int
  ): void

  /** Sets the [param flag] for a given [param instance] to [param enabled]. */
  instance_geometry_set_flag(instance: RID, flag: int, enabled: boolean): void

  /** Sets the lightmap GI instance to use for the specified 3D geometry instance. The lightmap UV scale for the specified instance (equivalent to [member GeometryInstance3D.gi_lightmap_scale]) and lightmap atlas slice must also be specified. */
  instance_geometry_set_lightmap(
    instance: RID,
    lightmap: RID,
    lightmap_uv_scale: Rect2,
    lightmap_slice: int
  ): void

  /** Sets the level of detail bias to use when rendering the specified 3D geometry instance. Higher values result in higher detail from further away. Equivalent to [member GeometryInstance3D.lod_bias]. */
  instance_geometry_set_lod_bias(instance: RID, lod_bias: float): void

  /** Sets a material that will be rendered for all surfaces on top of active materials for the mesh associated with this instance. Equivalent to [member GeometryInstance3D.material_overlay]. */
  instance_geometry_set_material_overlay(instance: RID, material: RID): void

  /** Sets a material that will override the material for all surfaces on the mesh associated with this instance. Equivalent to [member GeometryInstance3D.material_override]. */
  instance_geometry_set_material_override(instance: RID, material: RID): void

  /** Sets the per-instance shader uniform on the specified 3D geometry instance. Equivalent to [method GeometryInstance3D.set_instance_shader_parameter]. */
  instance_geometry_set_shader_parameter(
    instance: RID,
    parameter: StringName,
    value: any
  ): void

  /**
   * Sets the transparency for the given geometry instance. Equivalent to [member GeometryInstance3D.transparency].
   *
   * A transparency of `0.0` is fully opaque, while `1.0` is fully transparent. Values greater than `0.0` (exclusive) will force the geometry's materials to go through the transparent pipeline, which is slower to render and can exhibit rendering issues due to incorrect transparency sorting. However, unlike using a transparent material, setting [param transparency] to a value greater than `0.0` (exclusive) will **not** disable shadow rendering.
   *
   * In spatial shaders, `1.0 - transparency` is set as the default value of the `ALPHA` built-in.
   *
   * **Note:** [param transparency] is clamped between `0.0` and `1.0`, so this property cannot be used to make transparent materials more opaque than they originally are.
   *
   */
  instance_geometry_set_transparency(instance: RID, transparency: float): void

  /** Sets the visibility range values for the given geometry instance. Equivalent to [member GeometryInstance3D.visibility_range_begin] and related properties. */
  instance_geometry_set_visibility_range(
    instance: RID,
    min: float,
    max: float,
    min_margin: float,
    max_margin: float,
    fade_mode: int
  ): void

  /** Sets the base of the instance. A base can be any of the 3D objects that are created in the RenderingServer that can be displayed. For example, any of the light types, mesh, multimesh, particle system, reflection probe, decal, lightmap, voxel GI and visibility notifiers are all types that can be set as the base of an instance in order to be displayed in the scenario. */
  instance_set_base(instance: RID, base: RID): void

  /** Sets the weight for a given blend shape associated with this instance. */
  instance_set_blend_shape_weight(
    instance: RID,
    shape: int,
    weight: float
  ): void

  /** Sets a custom AABB to use when culling objects from the view frustum. Equivalent to setting [member GeometryInstance3D.custom_aabb]. */
  instance_set_custom_aabb(instance: RID, aabb: AABB): void

  /** Sets a margin to increase the size of the AABB when culling objects from the view frustum. This allows you to avoid culling objects that fall outside the view frustum. Equivalent to [member GeometryInstance3D.extra_cull_margin]. */
  instance_set_extra_visibility_margin(instance: RID, margin: float): void

  /** If [code]true[/code], ignores both frustum and occlusion culling on the specified 3D geometry instance. This is not the same as [member GeometryInstance3D.ignore_occlusion_culling], which only ignores occlusion culling and leaves frustum culling intact. */
  instance_set_ignore_culling(instance: RID, enabled: boolean): void

  /** Sets the render layers that this instance will be drawn to. Equivalent to [member VisualInstance3D.layers]. */
  instance_set_layer_mask(instance: RID, mask: int): void

  /** Sets the sorting offset and switches between using the bounding box or instance origin for depth sorting. */
  instance_set_pivot_data(
    instance: RID,
    sorting_offset: float,
    use_aabb_center: boolean
  ): void

  /** Sets the scenario that the instance is in. The scenario is the 3D world that the objects will be displayed in. */
  instance_set_scenario(instance: RID, scenario: RID): void

  /** Sets the override material of a specific surface. Equivalent to [method MeshInstance3D.set_surface_override_material]. */
  instance_set_surface_override_material(
    instance: RID,
    surface: int,
    material: RID
  ): void

  /** Sets the world space transform of the instance. Equivalent to [member Node3D.global_transform]. */
  instance_set_transform(instance: RID, transform: Transform3D): void

  /** Sets the visibility parent for the given instance. Equivalent to [member Node3D.visibility_parent]. */
  instance_set_visibility_parent(instance: RID, parent: RID): void

  /** Sets whether an instance is drawn or not. Equivalent to [member Node3D.visible]. */
  instance_set_visible(instance: RID, visible: boolean): void

  /** Resets motion vectors and other interpolated values. Use this [i]after[/i] teleporting a mesh from one position to another to avoid ghosting artifacts. */
  instance_teleport(instance: RID): void

  /**
   * Returns an array of object IDs intersecting with the provided AABB. Only 3D nodes that inherit from [VisualInstance3D] are considered, such as [MeshInstance3D] or [DirectionalLight3D]. Use [method @GlobalScope.instance_from_id] to obtain the actual nodes. A scenario RID must be provided, which is available in the [World3D] you want to query. This forces an update for all resources queued to update.
   *
   * **Warning:** This function is primarily intended for editor usage. For in-game use cases, prefer physics collision.
   *
   */
  instances_cull_aabb(aabb: AABB, scenario?: RID): PackedInt64Array

  /**
   * Returns an array of object IDs intersecting with the provided convex shape. Only 3D nodes that inherit from [VisualInstance3D] are considered, such as [MeshInstance3D] or [DirectionalLight3D]. Use [method @GlobalScope.instance_from_id] to obtain the actual nodes. A scenario RID must be provided, which is available in the [World3D] you want to query. This forces an update for all resources queued to update.
   *
   * **Warning:** This function is primarily intended for editor usage. For in-game use cases, prefer physics collision.
   *
   */
  instances_cull_convex(convex: Plane[], scenario?: RID): PackedInt64Array

  /**
   * Returns an array of object IDs intersecting with the provided 3D ray. Only 3D nodes that inherit from [VisualInstance3D] are considered, such as [MeshInstance3D] or [DirectionalLight3D]. Use [method @GlobalScope.instance_from_id] to obtain the actual nodes. A scenario RID must be provided, which is available in the [World3D] you want to query. This forces an update for all resources queued to update.
   *
   * **Warning:** This function is primarily intended for editor usage. For in-game use cases, prefer physics collision.
   *
   */
  instances_cull_ray(
    from: Vector3,
    to: Vector3,
    scenario?: RID
  ): PackedInt64Array

  /** Returns [code]true[/code] if our code is currently executing on the rendering thread. */
  is_on_render_thread(): boolean

  /** If [code]true[/code], this directional light will blend between shadow map splits resulting in a smoother transition between them. Equivalent to [member DirectionalLight3D.directional_shadow_blend_splits]. */
  light_directional_set_blend_splits(light: RID, enable: boolean): void

  /** Sets the shadow mode for this directional light. Equivalent to [member DirectionalLight3D.directional_shadow_mode]. */
  light_directional_set_shadow_mode(light: RID, mode: int): void

  /** If [code]true[/code], this light will not be used for anything except sky shaders. Use this for lights that impact your sky shader that you may want to hide from affecting the rest of the scene. For example, you may want to enable this when the sun in your sky shader falls below the horizon. */
  light_directional_set_sky_mode(light: RID, mode: int): void

  /** Sets whether to use a dual paraboloid or a cubemap for the shadow map. Dual paraboloid is faster but may suffer from artifacts. Equivalent to [member OmniLight3D.omni_shadow_mode]. */
  light_omni_set_shadow_mode(light: RID, mode: int): void

  /** Sets the texture filter mode to use when rendering light projectors. This parameter is global and cannot be set on a per-light basis. */
  light_projectors_set_filter(filter: int): void

  /** Sets the bake mode to use for the specified 3D light. Equivalent to [member Light3D.light_bake_mode]. */
  light_set_bake_mode(light: RID, bake_mode: int): void

  /** Sets the color of the light. Equivalent to [member Light3D.light_color]. */
  light_set_color(light: RID, color: Color): void

  /** Sets the cull mask for this 3D light. Lights only affect objects in the selected layers. Equivalent to [member Light3D.light_cull_mask]. */
  light_set_cull_mask(light: RID, mask: int): void

  /** Sets the distance fade for this 3D light. This acts as a form of level of detail (LOD) and can be used to improve performance. Equivalent to [member Light3D.distance_fade_enabled], [member Light3D.distance_fade_begin], [member Light3D.distance_fade_shadow], and [member Light3D.distance_fade_length]. */
  light_set_distance_fade(
    decal: RID,
    enabled: boolean,
    begin: float,
    shadow: float,
    length: float
  ): void

  /** Sets the maximum SDFGI cascade in which the 3D light's indirect lighting is rendered. Higher values allow the light to be rendered in SDFGI further away from the camera. */
  light_set_max_sdfgi_cascade(light: RID, cascade: int): void

  /** If [code]true[/code], the 3D light will subtract light instead of adding light. Equivalent to [member Light3D.light_negative]. */
  light_set_negative(light: RID, enable: boolean): void

  /** Sets the specified 3D light parameter. Equivalent to [method Light3D.set_param]. */
  light_set_param(light: RID, param: int, value: float): void

  /** Sets the projector texture to use for the specified 3D light. Equivalent to [member Light3D.light_projector]. */
  light_set_projector(light: RID, texture: RID): void

  /** If [code]true[/code], reverses the backface culling of the mesh. This can be useful when you have a flat mesh that has a light behind it. If you need to cast a shadow on both sides of the mesh, set the mesh to use double-sided shadows with [method instance_geometry_set_cast_shadows_setting]. Equivalent to [member Light3D.shadow_reverse_cull_face]. */
  light_set_reverse_cull_face_mode(light: RID, enabled: boolean): void

  /** If [code]true[/code], light will cast shadows. Equivalent to [member Light3D.shadow_enabled]. */
  light_set_shadow(light: RID, enabled: boolean): void

  /** Sets the shadow caster mask for this 3D light. Shadows will only be cast using objects in the selected layers. Equivalent to [member Light3D.shadow_caster_mask]. */
  light_set_shadow_caster_mask(light: RID, mask: int): void

  /**
   * Creates a new lightmap global illumination instance and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `lightmap_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent node is [LightmapGI].
   *
   */
  lightmap_create(): RID

  /** No documentation provided. */
  lightmap_get_probe_capture_bsp_tree(lightmap: RID): PackedInt32Array

  /** No documentation provided. */
  lightmap_get_probe_capture_points(lightmap: RID): PackedVector3Array

  /** No documentation provided. */
  lightmap_get_probe_capture_sh(lightmap: RID): PackedColorArray

  /** No documentation provided. */
  lightmap_get_probe_capture_tetrahedra(lightmap: RID): PackedInt32Array

  /** Used to inform the renderer what exposure normalization value was used while baking the lightmap. This value will be used and modulated at run time to ensure that the lightmap maintains a consistent level of exposure even if the scene-wide exposure normalization is changed at run time. For more information see [method camera_attributes_set_exposure]. */
  lightmap_set_baked_exposure_normalization(
    lightmap: RID,
    baked_exposure: float
  ): void

  /** No documentation provided. */
  lightmap_set_probe_bounds(lightmap: RID, bounds: AABB): void

  /** No documentation provided. */
  lightmap_set_probe_capture_data(
    lightmap: RID,
    points: PackedVector3Array,
    point_sh: PackedColorArray,
    tetrahedra: PackedInt32Array,
    bsp_tree: PackedInt32Array
  ): void

  /** No documentation provided. */
  lightmap_set_probe_capture_update_speed(speed: float): void

  /** No documentation provided. */
  lightmap_set_probe_interior(lightmap: RID, interior: boolean): void

  /** Set the textures on the given [param lightmap] GI instance to the texture array pointed to by the [param light] RID. If the lightmap texture was baked with [member LightmapGI.directional] set to [code]true[/code], then [param uses_sh] must also be [code]true[/code]. */
  lightmap_set_textures(lightmap: RID, light: RID, uses_sh: boolean): void

  /** Toggles whether a bicubic filter should be used when lightmaps are sampled. This smoothens their appearance at a performance cost. */
  lightmaps_set_bicubic_filter(enable: boolean): void

  /** Returns a mesh of a sphere with the given number of horizontal subdivisions, vertical subdivisions and radius. See also [method get_test_cube]. */
  make_sphere_mesh(latitudes: int, longitudes: int, radius: float): RID

  /**
   * Creates an empty material and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `material_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [Material].
   *
   */
  material_create(): RID

  /** Returns the value of a certain material's parameter. */
  material_get_param(material: RID, parameter: StringName): any

  /** Sets an object's next material. */
  material_set_next_pass(material: RID, next_material: RID): void

  /** Sets a material's parameter. */
  material_set_param(material: RID, parameter: StringName, value: any): void

  /** Sets a material's render priority. */
  material_set_render_priority(material: RID, priority: int): void

  /** Sets a shader material's shader. */
  material_set_shader(shader_material: RID, shader: RID): void

  /**
   * When using the Mobile renderer, [method material_set_use_debanding] can be used to enable or disable the debanding feature of 3D materials ([BaseMaterial3D] and [ShaderMaterial]).
   *
   * [method material_set_use_debanding] has no effect when using the Compatibility or Forward+ renderer. In Forward+, [Viewport] debanding can be used instead.
   *
   * See also [member ProjectSettings.rendering/anti_aliasing/quality/use_debanding] and [method RenderingServer.viewport_set_use_debanding].
   *
   */
  material_set_use_debanding(enable: boolean): void

  /** No documentation provided. */
  mesh_add_surface(mesh: RID, surface: Dictionary<any, any>): void

  /** No documentation provided. */
  mesh_add_surface_from_arrays(
    mesh: RID,
    primitive: int,
    arrays: any[],
    blend_shapes?: any[],
    lods?: Dictionary<any, any>,
    compress_format?: int
  ): void

  /** Removes all surfaces from a mesh. */
  mesh_clear(mesh: RID): void

  /**
   * Creates a new mesh and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `mesh_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * To place in a scene, attach this mesh to an instance using [method instance_set_base] using the returned RID.
   *
   * **Note:** The equivalent resource is [Mesh].
   *
   */
  mesh_create(): RID

  /** No documentation provided. */
  mesh_create_from_surfaces(
    surfaces: Dictionary<any, any>[],
    blend_shape_count?: int
  ): RID

  /** Returns a mesh's blend shape count. */
  mesh_get_blend_shape_count(mesh: RID): int

  /** Returns a mesh's blend shape mode. */
  mesh_get_blend_shape_mode(mesh: RID): int

  /** Returns a mesh's custom aabb. */
  mesh_get_custom_aabb(mesh: RID): AABB

  /** No documentation provided. */
  mesh_get_surface(mesh: RID, surface: int): Dictionary<any, any>

  /** Returns a mesh's number of surfaces. */
  mesh_get_surface_count(mesh: RID): int

  /** Sets a mesh's blend shape mode. */
  mesh_set_blend_shape_mode(mesh: RID, mode: int): void

  /** Sets a mesh's custom aabb. */
  mesh_set_custom_aabb(mesh: RID, aabb: AABB): void

  /** No documentation provided. */
  mesh_set_shadow_mesh(mesh: RID, shadow_mesh: RID): void

  /** Returns a mesh's surface's buffer arrays. */
  mesh_surface_get_arrays(mesh: RID, surface: int): any[]

  /** Returns a mesh's surface's arrays for blend shapes. */
  mesh_surface_get_blend_shape_arrays(mesh: RID, surface: int): any[][]

  /** Returns the stride of the attribute buffer for a mesh with given [param format]. */
  mesh_surface_get_format_attribute_stride(format: int, vertex_count: int): int

  /** Returns the stride of the index buffer for a mesh with the given [param format]. */
  mesh_surface_get_format_index_stride(format: int, vertex_count: int): int

  /** Returns the stride of the combined normals and tangents for a mesh with given [param format]. Note importantly that, while normals and tangents are in the vertex buffer with vertices, they are only interleaved with each other and so have a different stride than vertex positions. */
  mesh_surface_get_format_normal_tangent_stride(
    format: int,
    vertex_count: int
  ): int

  /** Returns the offset of a given attribute by [param array_index] in the start of its respective buffer. */
  mesh_surface_get_format_offset(
    format: int,
    vertex_count: int,
    array_index: int
  ): int

  /** Returns the stride of the skin buffer for a mesh with given [param format]. */
  mesh_surface_get_format_skin_stride(format: int, vertex_count: int): int

  /** Returns the stride of the vertex positions for a mesh with given [param format]. Note importantly that vertex positions are stored consecutively and are not interleaved with the other attributes in the vertex buffer (normals and tangents). */
  mesh_surface_get_format_vertex_stride(format: int, vertex_count: int): int

  /** Returns a mesh's surface's material. */
  mesh_surface_get_material(mesh: RID, surface: int): RID

  /** Removes the surface at the given index from the Mesh, shifting surfaces with higher index down by one. */
  mesh_surface_remove(mesh: RID, surface: int): void

  /** Sets a mesh's surface's material. */
  mesh_surface_set_material(mesh: RID, surface: int, material: RID): void

  /** No documentation provided. */
  mesh_surface_update_attribute_region(
    mesh: RID,
    surface: int,
    offset: int,
    data: PackedByteArray
  ): void

  /** Updates the index buffer of the mesh surface with the given [param data]. The expected data are 16 or 32-bit unsigned integers, which can be determined with [method mesh_surface_get_format_index_stride]. */
  mesh_surface_update_index_region(
    mesh: RID,
    surface: int,
    offset: int,
    data: PackedByteArray
  ): void

  /** No documentation provided. */
  mesh_surface_update_skin_region(
    mesh: RID,
    surface: int,
    offset: int,
    data: PackedByteArray
  ): void

  /** No documentation provided. */
  mesh_surface_update_vertex_region(
    mesh: RID,
    surface: int,
    offset: int,
    data: PackedByteArray
  ): void

  /** No documentation provided. */
  multimesh_allocate_data(
    multimesh: RID,
    instances: int,
    transform_format: int,
    color_format?: boolean,
    custom_data_format?: boolean,
    use_indirect?: boolean
  ): void

  /**
   * Creates a new multimesh on the RenderingServer and returns an [RID] handle. This RID will be used in all `multimesh_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * To place in a scene, attach this multimesh to an instance using [method instance_set_base] using the returned RID.
   *
   * **Note:** The equivalent resource is [MultiMesh].
   *
   */
  multimesh_create(): RID

  /** Calculates and returns the axis-aligned bounding box that encloses all instances within the multimesh. */
  multimesh_get_aabb(multimesh: RID): AABB

  /**
   * Returns the MultiMesh data (such as instance transforms, colors, etc.). See [method multimesh_set_buffer] for details on the returned data.
   *
   * **Note:** If the buffer is in the engine's internal cache, it will have to be fetched from GPU memory and possibly decompressed. This means [method multimesh_get_buffer] is potentially a slow operation and should be avoided whenever possible.
   *
   */
  multimesh_get_buffer(multimesh: RID): PackedFloat32Array

  /** Returns the [RenderingDevice] [RID] handle of the [MultiMesh], which can be used as any other buffer on the Rendering Device. */
  multimesh_get_buffer_rd_rid(multimesh: RID): RID

  /**
   * Returns the [RenderingDevice] [RID] handle of the [MultiMesh] command buffer. This [RID] is only valid if `use_indirect` is set to `true` when allocating data through [method multimesh_allocate_data]. It can be used to directly modify the instance count via buffer.
   *
   * The data structure is dependent on both how many surfaces the mesh contains and whether it is indexed or not, the buffer has 5 integers in it, with the last unused if the mesh is not indexed.
   *
   * Each of the values in the buffer correspond to these options:
   *
   * [codeblock lang=text]
   *
   * Indexed:
   *
   *   0 - indexCount;
   *
   *   1 - instanceCount;
   *
   *   2 - firstIndex;
   *
   *   3 - vertexOffset;
   *
   *   4 - firstInstance;
   *
   * Non Indexed:
   *
   *   0 - vertexCount;
   *
   *   1 - instanceCount;
   *
   *   2 - firstVertex;
   *
   *   3 - firstInstance;
   *
   *   4 - unused;
   *
   * @summary
   *
   *
   */
  multimesh_get_command_buffer_rd_rid(multimesh: RID): RID

  /** Returns the custom AABB defined for this MultiMesh resource. */
  multimesh_get_custom_aabb(multimesh: RID): AABB

  /** Returns the number of instances allocated for this multimesh. */
  multimesh_get_instance_count(multimesh: RID): int

  /** Returns the RID of the mesh that will be used in drawing this multimesh. */
  multimesh_get_mesh(multimesh: RID): RID

  /** Returns the number of visible instances for this multimesh. */
  multimesh_get_visible_instances(multimesh: RID): int

  /** Returns the color by which the specified instance will be modulated. */
  multimesh_instance_get_color(multimesh: RID, index: int): Color

  /** Returns the custom data associated with the specified instance. */
  multimesh_instance_get_custom_data(multimesh: RID, index: int): Color

  /** Returns the [Transform3D] of the specified instance. */
  multimesh_instance_get_transform(multimesh: RID, index: int): Transform3D

  /** Returns the [Transform2D] of the specified instance. For use when the multimesh is set to use 2D transforms. */
  multimesh_instance_get_transform_2d(multimesh: RID, index: int): Transform2D

  /**
   * Prevents physics interpolation for the specified instance during the current physics tick.
   *
   * This is useful when moving an instance to a new location, to give an instantaneous change rather than interpolation from the previous location.
   *
   */
  multimesh_instance_reset_physics_interpolation(
    multimesh: RID,
    index: int
  ): void

  /** Sets the color by which this instance will be modulated. Equivalent to [method MultiMesh.set_instance_color]. */
  multimesh_instance_set_color(multimesh: RID, index: int, color: Color): void

  /** Sets the custom data for this instance. Custom data is passed as a [Color], but is interpreted as a [code]vec4[/code] in the shader. Equivalent to [method MultiMesh.set_instance_custom_data]. */
  multimesh_instance_set_custom_data(
    multimesh: RID,
    index: int,
    custom_data: Color
  ): void

  /** Sets the [Transform3D] for this instance. Equivalent to [method MultiMesh.set_instance_transform]. */
  multimesh_instance_set_transform(
    multimesh: RID,
    index: int,
    transform: Transform3D
  ): void

  /** Sets the [Transform2D] for this instance. For use when multimesh is used in 2D. Equivalent to [method MultiMesh.set_instance_transform_2d]. */
  multimesh_instance_set_transform_2d(
    multimesh: RID,
    index: int,
    transform: Transform2D
  ): void

  /**
   * Prevents physics interpolation for all instances during the current physics tick.
   *
   * This is useful when moving all instances to new locations, to give instantaneous changes rather than interpolation from the previous locations.
   *
   */
  multimesh_instances_reset_physics_interpolation(multimesh: RID): void

  /**
   * Set the entire data to use for drawing the [param multimesh] at once to [param buffer] (such as instance transforms and colors). [param buffer]'s size must match the number of instances multiplied by the per-instance data size (which depends on the enabled MultiMesh fields). Otherwise, an error message is printed and nothing is rendered. See also [method multimesh_get_buffer].
   *
   * The per-instance data size and expected data order is:
   *
   * [codeblock lang=text]
   *
   * 2D:
   *
   *   - Position: 8 floats (8 floats for Transform2D)
   *
   *   - Position + Vertex color: 12 floats (8 floats for Transform2D, 4 floats for Color)
   *
   *   - Position + Custom data: 12 floats (8 floats for Transform2D, 4 floats of custom data)
   *
   *   - Position + Vertex color + Custom data: 16 floats (8 floats for Transform2D, 4 floats for Color, 4 floats of custom data)
   *
   * 3D:
   *
   *   - Position: 12 floats (12 floats for Transform3D)
   *
   *   - Position + Vertex color: 16 floats (12 floats for Transform3D, 4 floats for Color)
   *
   *   - Position + Custom data: 16 floats (12 floats for Transform3D, 4 floats of custom data)
   *
   *   - Position + Vertex color + Custom data: 20 floats (12 floats for Transform3D, 4 floats for Color, 4 floats of custom data)
   *
   * @summary
   *
   *
   * Instance transforms are in row-major order. Specifically:
   *
   * - For [Transform2D] the float-order is: `(x.x, y.x, padding_float, origin.x, x.y, y.y, padding_float, origin.y)`.
   *
   * - For [Transform3D] the float-order is: `(basis.x.x, basis.y.x, basis.z.x, origin.x, basis.x.y, basis.y.y, basis.z.y, origin.y, basis.x.z, basis.y.z, basis.z.z, origin.z)`.
   *
   */
  multimesh_set_buffer(multimesh: RID, buffer: PackedFloat32Array): void

  /**
   * Alternative version of [method multimesh_set_buffer] for use with physics interpolation.
   *
   * Takes both an array of current data and an array of data for the previous physics tick.
   *
   */
  multimesh_set_buffer_interpolated(
    multimesh: RID,
    buffer: PackedFloat32Array,
    buffer_previous: PackedFloat32Array
  ): void

  /** Sets the custom AABB for this MultiMesh resource. */
  multimesh_set_custom_aabb(multimesh: RID, aabb: AABB): void

  /** Sets the mesh to be drawn by the multimesh. Equivalent to [member MultiMesh.mesh]. */
  multimesh_set_mesh(multimesh: RID, mesh: RID): void

  /** Turns on and off physics interpolation for this MultiMesh resource. */
  multimesh_set_physics_interpolated(
    multimesh: RID,
    interpolated: boolean
  ): void

  /**
   * Sets the physics interpolation quality for the [MultiMesh].
   *
   * A value of [constant MULTIMESH_INTERP_QUALITY_FAST] gives fast but low quality interpolation, a value of [constant MULTIMESH_INTERP_QUALITY_HIGH] gives slower but higher quality interpolation.
   *
   */
  multimesh_set_physics_interpolation_quality(
    multimesh: RID,
    quality: int
  ): void

  /** Sets the number of instances visible at a given time. If -1, all instances that have been allocated are drawn. Equivalent to [member MultiMesh.visible_instance_count]. */
  multimesh_set_visible_instances(multimesh: RID, visible: int): void

  /**
   * Creates an occluder instance and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `occluder_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [Occluder3D] (not to be confused with the [OccluderInstance3D] node).
   *
   */
  occluder_create(): RID

  /** Sets the mesh data for the given occluder RID, which controls the shape of the occlusion culling that will be performed. */
  occluder_set_mesh(
    occluder: RID,
    vertices: PackedVector3Array,
    indices: PackedInt32Array
  ): void

  /**
   * Creates a new omni light and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID can be used in most `light_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * To place in a scene, attach this omni light to an instance using [method instance_set_base] using the returned RID.
   *
   * **Note:** The equivalent node is [OmniLight3D].
   *
   */
  omni_light_create(): RID

  /**
   * Creates a new 3D GPU particle collision or attractor and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID can be used in most `particles_collision_*` RenderingServer functions.
   *
   * **Note:** The equivalent nodes are [GPUParticlesCollision3D] and [GPUParticlesAttractor3D].
   *
   */
  particles_collision_create(): RID

  /** Requests an update for the 3D GPU particle collision heightfield. This may be automatically called by the 3D GPU particle collision heightfield depending on its [member GPUParticlesCollisionHeightField3D.update_mode]. */
  particles_collision_height_field_update(particles_collision: RID): void

  /** Sets the attenuation [param curve] for the 3D GPU particles attractor specified by the [param particles_collision] RID. Only used for attractors, not colliders. Equivalent to [member GPUParticlesAttractor3D.attenuation]. */
  particles_collision_set_attractor_attenuation(
    particles_collision: RID,
    curve: float
  ): void

  /** Sets the directionality [param amount] for the 3D GPU particles attractor specified by the [param particles_collision] RID. Only used for attractors, not colliders. Equivalent to [member GPUParticlesAttractor3D.directionality]. */
  particles_collision_set_attractor_directionality(
    particles_collision: RID,
    amount: float
  ): void

  /** Sets the [param strength] for the 3D GPU particles attractor specified by the [param particles_collision] RID. Only used for attractors, not colliders. Equivalent to [member GPUParticlesAttractor3D.strength]. */
  particles_collision_set_attractor_strength(
    particles_collision: RID,
    strength: float
  ): void

  /** Sets the [param extents] for the 3D GPU particles collision by the [param particles_collision] RID. Equivalent to [member GPUParticlesCollisionBox3D.size], [member GPUParticlesCollisionSDF3D.size], [member GPUParticlesCollisionHeightField3D.size], [member GPUParticlesAttractorBox3D.size] or [member GPUParticlesAttractorVectorField3D.size] depending on the [param particles_collision] type. */
  particles_collision_set_box_extents(
    particles_collision: RID,
    extents: Vector3
  ): void

  /** Sets the collision or attractor shape [param type] for the 3D GPU particles collision or attractor specified by the [param particles_collision] RID. */
  particles_collision_set_collision_type(
    particles_collision: RID,
    type: int
  ): void

  /** Sets the cull [param mask] for the 3D GPU particles collision or attractor specified by the [param particles_collision] RID. Equivalent to [member GPUParticlesCollision3D.cull_mask] or [member GPUParticlesAttractor3D.cull_mask] depending on the [param particles_collision] type. */
  particles_collision_set_cull_mask(particles_collision: RID, mask: int): void

  /** Sets the signed distance field [param texture] for the 3D GPU particles collision specified by the [param particles_collision] RID. Equivalent to [member GPUParticlesCollisionSDF3D.texture] or [member GPUParticlesAttractorVectorField3D.texture] depending on the [param particles_collision] type. */
  particles_collision_set_field_texture(
    particles_collision: RID,
    texture: RID
  ): void

  /** Sets the heightfield [param mask] for the 3D GPU particles heightfield collision specified by the [param particles_collision] RID. Equivalent to [member GPUParticlesCollisionHeightField3D.heightfield_mask]. */
  particles_collision_set_height_field_mask(
    particles_collision: RID,
    mask: int
  ): void

  /** Sets the heightmap [param resolution] for the 3D GPU particles heightfield collision specified by the [param particles_collision] RID. Equivalent to [member GPUParticlesCollisionHeightField3D.resolution]. */
  particles_collision_set_height_field_resolution(
    particles_collision: RID,
    resolution: int
  ): void

  /** Sets the [param radius] for the 3D GPU particles sphere collision or attractor specified by the [param particles_collision] RID. Equivalent to [member GPUParticlesCollisionSphere3D.radius] or [member GPUParticlesAttractorSphere3D.radius] depending on the [param particles_collision] type. */
  particles_collision_set_sphere_radius(
    particles_collision: RID,
    radius: float
  ): void

  /**
   * Creates a GPU-based particle system and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `particles_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * To place in a scene, attach these particles to an instance using [method instance_set_base] using the returned RID.
   *
   * **Note:** The equivalent nodes are [GPUParticles2D] and [GPUParticles3D].
   *
   * **Note:** All `particles_*` methods only apply to GPU-based particles, not CPU-based particles. [CPUParticles2D] and [CPUParticles3D] do not have equivalent RenderingServer functions available, as these use [MultiMeshInstance2D] and [MultiMeshInstance3D] under the hood (see `multimesh_*` methods).
   *
   */
  particles_create(): RID

  /** Manually emits particles from the [param particles] instance. */
  particles_emit(
    particles: RID,
    transform: Transform3D,
    velocity: Vector3,
    color: Color,
    custom: Color,
    emit_flags: int
  ): void

  /** Calculates and returns the axis-aligned bounding box that contains all the particles. Equivalent to [method GPUParticles3D.capture_aabb]. */
  particles_get_current_aabb(particles: RID): AABB

  /** Returns [code]true[/code] if particles are currently set to emitting. */
  particles_get_emitting(particles: RID): boolean

  /** Returns [code]true[/code] if particles are not emitting and particles are set to inactive. */
  particles_is_inactive(particles: RID): boolean

  /** Add particle system to list of particle systems that need to be updated. Update will take place on the next frame, or on the next call to [method instances_cull_aabb], [method instances_cull_convex], or [method instances_cull_ray]. */
  particles_request_process(particles: RID): void

  /** Requests particles to process for extra process time during a single frame. */
  particles_request_process_time(particles: RID, time: float): void

  /** Reset the particles on the next update. Equivalent to [method GPUParticles3D.restart]. */
  particles_restart(particles: RID): void

  /** Sets the number of particles to be drawn and allocates the memory for them. Equivalent to [member GPUParticles3D.amount]. */
  particles_set_amount(particles: RID, amount: int): void

  /** Sets the amount ratio for particles to be emitted. Equivalent to [member GPUParticles3D.amount_ratio]. */
  particles_set_amount_ratio(particles: RID, ratio: float): void

  /** No documentation provided. */
  particles_set_collision_base_size(particles: RID, size: float): void

  /** Sets a custom axis-aligned bounding box for the particle system. Equivalent to [member GPUParticles3D.visibility_aabb]. */
  particles_set_custom_aabb(particles: RID, aabb: AABB): void

  /** Sets the draw order of the particles. Equivalent to [member GPUParticles3D.draw_order]. */
  particles_set_draw_order(particles: RID, order: int): void

  /** Sets the mesh to be used for the specified draw pass. Equivalent to [member GPUParticles3D.draw_pass_1], [member GPUParticles3D.draw_pass_2], [member GPUParticles3D.draw_pass_3], and [member GPUParticles3D.draw_pass_4]. */
  particles_set_draw_pass_mesh(particles: RID, pass: int, mesh: RID): void

  /** Sets the number of draw passes to use. Equivalent to [member GPUParticles3D.draw_passes]. */
  particles_set_draw_passes(particles: RID, count: int): void

  /** Sets the [Transform3D] that will be used by the particles when they first emit. */
  particles_set_emission_transform(particles: RID, transform: Transform3D): void

  /** Sets the velocity of a particle node, that will be used by [member ParticleProcessMaterial.inherit_velocity_ratio]. */
  particles_set_emitter_velocity(particles: RID, velocity: Vector3): void

  /** If [code]true[/code], particles will emit over time. Setting to [code]false[/code] does not reset the particles, but only stops their emission. Equivalent to [member GPUParticles3D.emitting]. */
  particles_set_emitting(particles: RID, emitting: boolean): void

  /** Sets the explosiveness ratio. Equivalent to [member GPUParticles3D.explosiveness]. */
  particles_set_explosiveness_ratio(particles: RID, ratio: float): void

  /** Sets the frame rate that the particle system rendering will be fixed to. Equivalent to [member GPUParticles3D.fixed_fps]. */
  particles_set_fixed_fps(particles: RID, fps: int): void

  /** If [code]true[/code], uses fractional delta which smooths the movement of the particles. Equivalent to [member GPUParticles3D.fract_delta]. */
  particles_set_fractional_delta(particles: RID, enable: boolean): void

  /** Sets the value that informs a [ParticleProcessMaterial] to rush all particles towards the end of their lifetime. */
  particles_set_interp_to_end(particles: RID, factor: float): void

  /** No documentation provided. */
  particles_set_interpolate(particles: RID, enable: boolean): void

  /** Sets the lifetime of each particle in the system. Equivalent to [member GPUParticles3D.lifetime]. */
  particles_set_lifetime(particles: RID, lifetime: float): void

  /** Sets whether the GPU particles specified by the [param particles] RID should be rendered in 2D or 3D according to [param mode]. */
  particles_set_mode(particles: RID, mode: int): void

  /** If [code]true[/code], particles will emit once and then stop. Equivalent to [member GPUParticles3D.one_shot]. */
  particles_set_one_shot(particles: RID, one_shot: boolean): void

  /** Sets the preprocess time for the particles' animation. This lets you delay starting an animation until after the particles have begun emitting. Equivalent to [member GPUParticles3D.preprocess]. */
  particles_set_pre_process_time(particles: RID, time: float): void

  /**
   * Sets the material for processing the particles.
   *
   * **Note:** This is not the material used to draw the materials. Equivalent to [member GPUParticles3D.process_material].
   *
   */
  particles_set_process_material(particles: RID, material: RID): void

  /** Sets the emission randomness ratio. This randomizes the emission of particles within their phase. Equivalent to [member GPUParticles3D.randomness]. */
  particles_set_randomness_ratio(particles: RID, ratio: float): void

  /** Sets the speed scale of the particle system. Equivalent to [member GPUParticles3D.speed_scale]. */
  particles_set_speed_scale(particles: RID, scale: float): void

  /** No documentation provided. */
  particles_set_subemitter(particles: RID, subemitter_particles: RID): void

  /** No documentation provided. */
  particles_set_trail_bind_poses(
    particles: RID,
    bind_poses: Transform3D[]
  ): void

  /** If [param enable] is [code]true[/code], enables trails for the [param particles] with the specified [param length_sec] in seconds. Equivalent to [member GPUParticles3D.trail_enabled] and [member GPUParticles3D.trail_lifetime]. */
  particles_set_trails(particles: RID, enable: boolean, length_sec: float): void

  /** No documentation provided. */
  particles_set_transform_align(particles: RID, align: int): void

  /** If [code]true[/code], particles use local coordinates. If [code]false[/code] they use global coordinates. Equivalent to [member GPUParticles3D.local_coords]. */
  particles_set_use_local_coordinates(particles: RID, enable: boolean): void

  /** Sets the filter quality for omni and spot light shadows in 3D. See also [member ProjectSettings.rendering/lights_and_shadows/positional_shadow/soft_shadow_filter_quality]. This parameter is global and cannot be set on a per-viewport basis. */
  positional_soft_shadow_filter_set_quality(quality: int): void

  /**
   * Creates a reflection probe and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `reflection_probe_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * To place in a scene, attach this reflection probe to an instance using [method instance_set_base] using the returned RID.
   *
   * **Note:** The equivalent node is [ReflectionProbe].
   *
   */
  reflection_probe_create(): RID

  /** Sets the reflection probe's custom ambient light color. Equivalent to [member ReflectionProbe.ambient_color]. */
  reflection_probe_set_ambient_color(probe: RID, color: Color): void

  /** Sets the reflection probe's custom ambient light energy. Equivalent to [member ReflectionProbe.ambient_color_energy]. */
  reflection_probe_set_ambient_energy(probe: RID, energy: float): void

  /** Sets the reflection probe's ambient light mode. Equivalent to [member ReflectionProbe.ambient_mode]. */
  reflection_probe_set_ambient_mode(probe: RID, mode: int): void

  /** If [code]true[/code], reflections will ignore sky contribution. Equivalent to [member ReflectionProbe.interior]. */
  reflection_probe_set_as_interior(probe: RID, enable: boolean): void

  /** Sets the distance in meters over which a probe blends into the scene. */
  reflection_probe_set_blend_distance(probe: RID, blend_distance: float): void

  /** Sets the render cull mask for this reflection probe. Only instances with a matching layer will be reflected by this probe. Equivalent to [member ReflectionProbe.cull_mask]. */
  reflection_probe_set_cull_mask(probe: RID, layers: int): void

  /** If [code]true[/code], uses box projection. This can make reflections look more correct in certain situations. Equivalent to [member ReflectionProbe.box_projection]. */
  reflection_probe_set_enable_box_projection(probe: RID, enable: boolean): void

  /** If [code]true[/code], computes shadows in the reflection probe. This makes the reflection much slower to compute. Equivalent to [member ReflectionProbe.enable_shadows]. */
  reflection_probe_set_enable_shadows(probe: RID, enable: boolean): void

  /** Sets the intensity of the reflection probe. Intensity modulates the strength of the reflection. Equivalent to [member ReflectionProbe.intensity]. */
  reflection_probe_set_intensity(probe: RID, intensity: float): void

  /** Sets the max distance away from the probe an object can be before it is culled. Equivalent to [member ReflectionProbe.max_distance]. */
  reflection_probe_set_max_distance(probe: RID, distance: float): void

  /** Sets the mesh level of detail to use in the reflection probe rendering. Higher values will use less detailed versions of meshes that have LOD variations generated, which can improve performance. Equivalent to [member ReflectionProbe.mesh_lod_threshold]. */
  reflection_probe_set_mesh_lod_threshold(probe: RID, pixels: float): void

  /** Sets the origin offset to be used when this reflection probe is in box project mode. Equivalent to [member ReflectionProbe.origin_offset]. */
  reflection_probe_set_origin_offset(probe: RID, offset: Vector3): void

  /** Sets the render reflection mask for this reflection probe. Only instances with a matching layer will have reflections applied from this probe. Equivalent to [member ReflectionProbe.reflection_mask]. */
  reflection_probe_set_reflection_mask(probe: RID, layers: int): void

  /** Deprecated. This method does nothing. */
  reflection_probe_set_resolution(probe: RID, resolution: int): void

  /** Sets the size of the area that the reflection probe will capture. Equivalent to [member ReflectionProbe.size]. */
  reflection_probe_set_size(probe: RID, size: Vector3): void

  /** Sets how often the reflection probe updates. Can either be once or every frame. */
  reflection_probe_set_update_mode(probe: RID, mode: int): void

  /** Schedules a callback to the given callable after a frame has been drawn. */
  request_frame_drawn_callback(callable: Callable): void

  /**
   * Creates a scenario and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `scenario_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * The scenario is the 3D world that all the visual instances exist in.
   *
   */
  scenario_create(): RID

  /** Sets the camera attributes ([param effects]) that will be used with this scenario. See also [CameraAttributes]. */
  scenario_set_camera_attributes(scenario: RID, effects: RID): void

  /** Sets the compositor ([param compositor]) that will be used with this scenario. See also [Compositor]. */
  scenario_set_compositor(scenario: RID, compositor: RID): void

  /** Sets the environment that will be used with this scenario. See also [Environment]. */
  scenario_set_environment(scenario: RID, environment: RID): void

  /** Sets the fallback environment to be used by this scenario. The fallback environment is used if no environment is set. Internally, this is used by the editor to provide a default environment. */
  scenario_set_fallback_environment(scenario: RID, environment: RID): void

  /** Sets the screen-space roughness limiter parameters, such as whether it should be enabled and its thresholds. Equivalent to [member ProjectSettings.rendering/anti_aliasing/screen_space_roughness_limiter/enabled], [member ProjectSettings.rendering/anti_aliasing/screen_space_roughness_limiter/amount] and [member ProjectSettings.rendering/anti_aliasing/screen_space_roughness_limiter/limit]. */
  screen_space_roughness_limiter_set_active(
    enable: boolean,
    amount: float,
    limit: float
  ): void

  /** Sets a boot image. The [param color] defines the background color. The value of [param scale] indicates if the image will be scaled to fit the screen size. If [param use_filter] is [code]true[/code], the image will be scaled with linear interpolation. If [param use_filter] is [code]false[/code], the image will be scaled with nearest-neighbor interpolation. */
  set_boot_image(
    image: Image,
    color: Color,
    scale: boolean,
    use_filter?: boolean
  ): void

  /** Sets a boot image. The [param color] defines the background color. The value of [param stretch_mode] indicates how the image will be stretched (see [enum SplashStretchMode] for possible values). If [param use_filter] is [code]true[/code], the image will be scaled with linear interpolation. If [param use_filter] is [code]false[/code], the image will be scaled with nearest-neighbor interpolation. */
  set_boot_image_with_stretch(
    image: Image,
    color: Color,
    stretch_mode: int,
    use_filter?: boolean
  ): void

  /**
   * If [param generate] is `true`, generates debug wireframes for all meshes that are loaded when using the Compatibility renderer. By default, the engine does not generate debug wireframes at runtime, since they slow down loading of assets and take up VRAM.
   *
   * **Note:** You must call this method before loading any meshes when using the Compatibility renderer, otherwise wireframes will not be used.
   *
   */
  set_debug_generate_wireframes(generate: boolean): void

  /** Sets the default clear color which is used when a specific clear color has not been selected. See also [method get_default_clear_color]. */
  set_default_clear_color(color: Color): void

  /**
   * Creates an empty shader and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `shader_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [Shader].
   *
   */
  shader_create(): RID

  /** Returns a shader's source code as a string. */
  shader_get_code(shader: RID): string

  /**
   * Returns a default texture from a shader searched by name.
   *
   * **Note:** If the sampler array is used use [param index] to access the specified texture.
   *
   */
  shader_get_default_texture_parameter(
    shader: RID,
    name: StringName,
    index?: int
  ): RID

  /** Returns the default value for the specified shader uniform. This is usually the value written in the shader source code. */
  shader_get_parameter_default(shader: RID, name: StringName): any

  /** Sets the shader's source code (which triggers recompilation after being changed). */
  shader_set_code(shader: RID, code: string): void

  /**
   * Sets a shader's default texture. Overwrites the texture given by name.
   *
   * **Note:** If the sampler array is used use [param index] to access the specified texture.
   *
   */
  shader_set_default_texture_parameter(
    shader: RID,
    name: StringName,
    texture: RID,
    index?: int
  ): void

  /** Sets the path hint for the specified shader. This should generally match the [Shader] resource's [member Resource.resource_path]. */
  shader_set_path_hint(shader: RID, path: string): void

  /** No documentation provided. */
  skeleton_allocate_data(
    skeleton: RID,
    bones: int,
    is_2d_skeleton?: boolean
  ): void

  /** Returns the [Transform3D] set for a specific bone of this skeleton. */
  skeleton_bone_get_transform(skeleton: RID, bone: int): Transform3D

  /** Returns the [Transform2D] set for a specific bone of this skeleton. */
  skeleton_bone_get_transform_2d(skeleton: RID, bone: int): Transform2D

  /** Sets the [Transform3D] for a specific bone of this skeleton. */
  skeleton_bone_set_transform(
    skeleton: RID,
    bone: int,
    transform: Transform3D
  ): void

  /** Sets the [Transform2D] for a specific bone of this skeleton. */
  skeleton_bone_set_transform_2d(
    skeleton: RID,
    bone: int,
    transform: Transform2D
  ): void

  /**
   * Creates a skeleton and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `skeleton_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   */
  skeleton_create(): RID

  /** Returns the number of bones allocated for this skeleton. */
  skeleton_get_bone_count(skeleton: RID): int

  /** No documentation provided. */
  skeleton_set_base_transform_2d(
    skeleton: RID,
    base_transform: Transform2D
  ): void

  /**
   * Generates and returns an [Image] containing the radiance map for the specified [param sky] RID. This supports built-in sky material and custom sky shaders. If [param bake_irradiance] is `true`, the irradiance map is saved instead of the radiance map. The radiance map is used to render reflected light, while the irradiance map is used to render ambient light. See also [method environment_bake_panorama].
   *
   * **Note:** The image is saved using linear encoding without any tonemapping performed, which means it will look too dark if viewed directly in an image editor. [param energy] values above `1.0` can be used to brighten the resulting image.
   *
   * **Note:** [param size] should be a 2:1 aspect ratio for the generated panorama to have square pixels. For radiance maps, there is no point in using a height greater than [member Sky.radiance_size], as it won't increase detail. Irradiance maps only contain low-frequency data, so there is usually no point in going past a size of 128×64 pixels when saving an irradiance map.
   *
   */
  sky_bake_panorama(
    sky: RID,
    energy: float,
    bake_irradiance: boolean,
    size: Vector2i
  ): Image

  /**
   * Creates an empty sky and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `sky_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   */
  sky_create(): RID

  /** Sets the material that the sky uses to render the background, ambient and reflection maps. */
  sky_set_material(sky: RID, material: RID): void

  /** Sets the process [param mode] of the sky specified by the [param sky] RID. Equivalent to [member Sky.process_mode]. */
  sky_set_mode(sky: RID, mode: int): void

  /** Sets the [param radiance_size] of the sky specified by the [param sky] RID (in pixels). Equivalent to [member Sky.radiance_size]. */
  sky_set_radiance_size(sky: RID, radiance_size: int): void

  /**
   * Creates a spot light and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID can be used in most `light_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * To place in a scene, attach this spot light to an instance using [method instance_set_base] using the returned RID.
   *
   */
  spot_light_create(): RID

  /** Sets [member ProjectSettings.rendering/environment/subsurface_scattering/subsurface_scattering_quality] to use when rendering materials that have subsurface scattering enabled. */
  sub_surface_scattering_set_quality(quality: int): void

  /** Sets the [member ProjectSettings.rendering/environment/subsurface_scattering/subsurface_scattering_scale] and [member ProjectSettings.rendering/environment/subsurface_scattering/subsurface_scattering_depth_scale] to use when rendering materials that have subsurface scattering enabled. */
  sub_surface_scattering_set_scale(scale: float, depth_scale: float): void

  /**
   * Creates a 2-dimensional texture and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `texture_2d_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [Texture2D].
   *
   * **Note:** Not to be confused with [method RenderingDevice.texture_create], which creates the graphics API's own texture type as opposed to the Godot-specific [Texture2D] resource.
   *
   */
  texture_2d_create(image: Image): RID

  /**
   * Returns an [Image] instance from the given [param texture] [RID].
   *
   * **Example:** Get the test texture from [method get_test_texture] and apply it to a [Sprite2D] node:
   *
   * @example
   *
   * var texture_rid = RenderingServer.get_test_texture()
   * var texture = ImageTexture.create_from_image(RenderingServer.texture_2d_get(texture_rid))
   * $Sprite2D.texture = texture
   * @summary
   *
   *
   */
  texture_2d_get(texture: RID): Image

  /** Returns an [Image] instance from the given [param texture] [RID] and [param layer]. */
  texture_2d_layer_get(texture: RID, layer: int): Image

  /**
   * Creates a 2-dimensional layered texture and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `texture_2d_layered_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [TextureLayered].
   *
   */
  texture_2d_layered_create(layers: Image[], layered_type: int): RID

  /**
   * Creates a placeholder for a 2-dimensional layered texture and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `texture_2d_layered_*` RenderingServer functions, although it does nothing when used. See also [method texture_2d_placeholder_create].
   *
   * **Note:** The equivalent resource is [PlaceholderTextureLayered].
   *
   */
  texture_2d_layered_placeholder_create(layered_type: int): RID

  /**
   * Creates a placeholder for a 2-dimensional layered texture and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `texture_2d_layered_*` RenderingServer functions, although it does nothing when used. See also [method texture_2d_layered_placeholder_create].
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [PlaceholderTexture2D].
   *
   */
  texture_2d_placeholder_create(): RID

  /**
   * Updates the texture specified by the [param texture] [RID] with the data in [param image]. A [param layer] must also be specified, which should be `0` when updating a single-layer texture ([Texture2D]).
   *
   * **Note:** The [param image] must have the same width, height and format as the current [param texture] data. Otherwise, an error will be printed and the original texture won't be modified. If you need to use different width, height or format, use [method texture_replace] instead.
   *
   */
  texture_2d_update(texture: RID, image: Image, layer: int): void

  /** [b]Note:[/b] The equivalent resource is [Texture3D]. */
  texture_3d_create(
    format: int,
    width: int,
    height: int,
    depth: int,
    mipmaps: boolean,
    data: Image[]
  ): RID

  /** Returns 3D texture data as an array of [Image]s for the specified texture [RID]. */
  texture_3d_get(texture: RID): Image[]

  /**
   * Creates a placeholder for a 3-dimensional texture and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `texture_3d_*` RenderingServer functions, although it does nothing when used.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent resource is [PlaceholderTexture3D].
   *
   */
  texture_3d_placeholder_create(): RID

  /**
   * Updates the texture specified by the [param texture] [RID]'s data with the data in [param data]. All the texture's layers must be replaced at once.
   *
   * **Note:** The [param texture] must have the same width, height, depth and format as the current texture data. Otherwise, an error will be printed and the original texture won't be modified. If you need to use different width, height, depth or format, use [method texture_replace] instead.
   *
   */
  texture_3d_update(texture: RID, data: Image[]): void

  /**
   * Creates a texture based on a native handle that was created outside of Godot's renderer.
   *
   * **Note:** If using only the rendering device renderer, it's recommend to use [method RenderingDevice.texture_create_from_extension] together with [method RenderingServer.texture_rd_create], rather than this method. This way, the texture's format and usage can be controlled more effectively.
   *
   */
  texture_create_from_native_handle(
    type: int,
    format: int,
    native_handle: int,
    width: int,
    height: int,
    depth: int,
    layers?: int,
    layered_type?: int
  ): RID

  /** Returns the format for the texture. */
  texture_get_format(texture: RID): int

  /**
   * Returns the internal graphics handle for this texture object. For use when communicating with third-party APIs mostly with GDExtension.
   *
   * [param srgb] should be `true` when the texture uses nonlinear sRGB encoding and `false` when the texture uses linear encoding.
   *
   * **Note:** This function returns a `uint64_t` which internally maps to a `GLuint` (OpenGL) or `VkImage` (Vulkan).
   *
   */
  texture_get_native_handle(texture: RID, srgb?: boolean): int

  /** No documentation provided. */
  texture_get_path(texture: RID): string

  /**
   * Returns a texture [RID] that can be used with [RenderingDevice].
   *
   * [param srgb] should be `true` when the texture uses nonlinear sRGB encoding and `false` when the texture uses linear encoding.
   *
   */
  texture_get_rd_texture(texture: RID, srgb?: boolean): RID

  /** This method does nothing and always returns an invalid [RID]. */
  texture_proxy_create(base: RID): RID

  /** This method does nothing. */
  texture_proxy_update(texture: RID, proxy_to: RID): void

  /**
   * Creates a new texture object based on a texture created directly on the [RenderingDevice]. If the texture contains layers, [param layer_type] is used to define the layer type.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The RenderingServer's [method free_rid] won't free the underlying [param rd_texture], you will want to free the [param rd_texture] using [method RenderingDevice.free_rid].
   *
   */
  texture_rd_create(rd_texture: RID, layer_type?: int): RID

  /** Replaces [param texture]'s texture data by the texture specified by the [param by_texture] RID, without changing [param texture]'s RID. */
  texture_replace(texture: RID, by_texture: RID): void

  /** No documentation provided. */
  texture_set_force_redraw_if_visible(texture: RID, enable: boolean): void

  /** No documentation provided. */
  texture_set_path(texture: RID, path: string): void

  /** No documentation provided. */
  texture_set_size_override(texture: RID, width: int, height: int): void

  /** Sets a viewport's camera. */
  viewport_attach_camera(viewport: RID, camera: RID): void

  /** Sets a viewport's canvas. */
  viewport_attach_canvas(viewport: RID, canvas: RID): void

  /**
   * Copies the viewport to a region of the screen specified by [param rect]. If [method viewport_set_render_direct_to_screen] is `true`, then the viewport does not use a framebuffer and the contents of the viewport are rendered directly to screen. However, note that the root viewport is drawn last, therefore it will draw over the screen. Accordingly, you must set the root viewport to an area that does not cover the area that you have attached this viewport to.
   *
   * For example, you can set the root viewport to not render at all with the following code:
   *
   * @example
   *
   *
   * func _ready():
   * 	RenderingServer.viewport_attach_to_screen(get_viewport().get_viewport_rid(), Rect2())
   * 	RenderingServer.viewport_attach_to_screen($Viewport.get_viewport_rid(), Rect2(0, 0, 600, 600))
   *
   * @summary
   *
   *
   * Using this can result in significant optimization, especially on lower-end devices. However, it comes at the cost of having to manage your viewports manually. For further optimization, see [method viewport_set_render_direct_to_screen].
   *
   */
  viewport_attach_to_screen(viewport: RID, rect?: Rect2, screen?: int): void

  /**
   * Creates an empty viewport and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `viewport_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent node is [Viewport].
   *
   */
  viewport_create(): RID

  /**
   * Returns the CPU time taken to render the last frame in milliseconds. This **only** includes time spent in rendering-related operations; scripts' `_process` functions and other engine subsystems are not included in this readout. To get a complete readout of CPU time spent to render the scene, sum the render times of all viewports that are drawn every frame plus [method get_frame_setup_time_cpu]. Unlike [method Engine.get_frames_per_second], this method will accurately reflect CPU utilization even if framerate is capped via V-Sync or [member Engine.max_fps]. See also [method viewport_get_measured_render_time_gpu].
   *
   * **Note:** Requires measurements to be enabled on the specified [param viewport] using [method viewport_set_measure_render_time]. Otherwise, this method returns `0.0`.
   *
   */
  viewport_get_measured_render_time_cpu(viewport: RID): float

  /**
   * Returns the GPU time taken to render the last frame in milliseconds. To get a complete readout of GPU time spent to render the scene, sum the render times of all viewports that are drawn every frame. Unlike [method Engine.get_frames_per_second], this method accurately reflects GPU utilization even if framerate is capped via V-Sync or [member Engine.max_fps]. See also [method viewport_get_measured_render_time_cpu].
   *
   * **Note:** Requires measurements to be enabled on the specified [param viewport] using [method viewport_set_measure_render_time]. Otherwise, this method returns `0.0`.
   *
   * **Note:** When GPU utilization is low enough during a certain period of time, GPUs will decrease their power state (which in turn decreases core and memory clock speeds). This can cause the reported GPU time to increase if GPU utilization is kept low enough by a framerate cap (compared to what it would be at the GPU's highest power state). Keep this in mind when benchmarking using [method viewport_get_measured_render_time_gpu]. This behavior can be overridden in the graphics driver settings at the cost of higher power usage.
   *
   */
  viewport_get_measured_render_time_gpu(viewport: RID): float

  /**
   * Returns a statistic about the rendering engine which can be used for performance profiling. This is separated into render pass [param type]s, each of them having the same [param info]s you can query (different passes will return different values).
   *
   * See also [method get_rendering_info], which returns global information across all viewports.
   *
   * **Note:** Viewport rendering information is not available until at least 2 frames have been rendered by the engine. If rendering information is not available, [method viewport_get_render_info] returns `0`. To print rendering information in `_ready()` successfully, use the following:
   *
   * @example
   *
   * func _ready():
   * 	for _i in 2:
   * 		await get_tree().process_frame
   * 	print(
   * 			RenderingServer.viewport_get_render_info(get_viewport().get_viewport_rid(),
   * 			RenderingServer.VIEWPORT_RENDER_INFO_TYPE_VISIBLE,
   * 			RenderingServer.VIEWPORT_RENDER_INFO_DRAW_CALLS_IN_FRAME)
   * 	)
   * @summary
   *
   *
   */
  viewport_get_render_info(viewport: RID, type: int, info: int): int

  /** Returns the render target for the viewport. */
  viewport_get_render_target(viewport: RID): RID

  /** Returns the viewport's last rendered frame. */
  viewport_get_texture(viewport: RID): RID

  /**
   * Returns the viewport's update mode.
   *
   * **Warning:** Calling this from any thread other than the rendering thread will be detrimental to performance.
   *
   */
  viewport_get_update_mode(viewport: RID): int

  /** Detaches a viewport from a canvas. */
  viewport_remove_canvas(viewport: RID, canvas: RID): void

  /** If [code]true[/code], sets the viewport active, else sets it inactive. */
  viewport_set_active(viewport: RID, active: boolean): void

  /**
   * Sets the maximum number of samples to take when using anisotropic filtering on textures (as a power of two). A higher sample count will result in sharper textures at oblique angles, but is more expensive to compute. A value of `0` forcibly disables anisotropic filtering, even on materials where it is enabled.
   *
   * The anisotropic filtering level also affects decals and light projectors if they are configured to use anisotropic filtering. See [member ProjectSettings.rendering/textures/decals/filter] and [member ProjectSettings.rendering/textures/light_projectors/filter].
   *
   * **Note:** In 3D, for this setting to have an effect, set [member BaseMaterial3D.texture_filter] to [constant BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC] or [constant BaseMaterial3D.TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC] on materials.
   *
   * **Note:** In 2D, for this setting to have an effect, set [member CanvasItem.texture_filter] to [constant CanvasItem.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC] or [constant CanvasItem.TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC] on the [CanvasItem] node displaying the texture (or in [CanvasTexture]). However, anisotropic filtering is rarely useful in 2D, so only enable it for textures in 2D if it makes a meaningful visual difference.
   *
   */
  viewport_set_anisotropic_filtering_level(
    viewport: RID,
    anisotropic_filtering_level: int
  ): void

  /** Sets the rendering mask associated with this [Viewport]. Only [CanvasItem] nodes with a matching rendering visibility layer will be rendered by this [Viewport]. */
  viewport_set_canvas_cull_mask(viewport: RID, canvas_cull_mask: int): void

  /**
   * Sets the stacking order for a viewport's canvas.
   *
   * [param layer] is the actual canvas layer, while [param sublayer] specifies the stacking order of the canvas among those in the same layer.
   *
   * **Note:** [param layer] should be between [constant CANVAS_LAYER_MIN] and [constant CANVAS_LAYER_MAX] (inclusive). Any other value will wrap around.
   *
   */
  viewport_set_canvas_stacking(
    viewport: RID,
    canvas: RID,
    layer: int,
    sublayer: int
  ): void

  /** Sets the transformation of a viewport's canvas. */
  viewport_set_canvas_transform(
    viewport: RID,
    canvas: RID,
    offset: Transform2D
  ): void

  /** Sets the clear mode of a viewport. */
  viewport_set_clear_mode(viewport: RID, clear_mode: int): void

  /** Sets the debug draw mode of a viewport. */
  viewport_set_debug_draw(viewport: RID, draw: int): void

  /** Sets the default texture filtering mode for the specified [param viewport] RID. */
  viewport_set_default_canvas_item_texture_filter(
    viewport: RID,
    filter: int
  ): void

  /** Sets the default texture repeat mode for the specified [param viewport] RID. */
  viewport_set_default_canvas_item_texture_repeat(
    viewport: RID,
    repeat: int
  ): void

  /** If [code]true[/code], the viewport's canvas (i.e. 2D and GUI elements) is not rendered. */
  viewport_set_disable_2d(viewport: RID, disable: boolean): void

  /** If [code]true[/code], the viewport's 3D elements are not rendered. */
  viewport_set_disable_3d(viewport: RID, disable: boolean): void

  /** Sets the viewport's environment mode which allows enabling or disabling rendering of 3D environment over 2D canvas. When disabled, 2D will not be affected by the environment. When enabled, 2D will be affected by the environment if the environment background mode is [constant ENV_BG_CANVAS]. The default behavior is to inherit the setting from the viewport's parent. If the topmost parent is also set to [constant VIEWPORT_ENVIRONMENT_INHERIT], then the behavior will be the same as if it was set to [constant VIEWPORT_ENVIRONMENT_ENABLED]. */
  viewport_set_environment_mode(viewport: RID, mode: int): void

  /** Determines how sharp the upscaled image will be when using the FSR upscaling mode. Sharpness halves with every whole number. Values go from 0.0 (sharpest) to 2.0. Values above 2.0 won't make a visible difference. */
  viewport_set_fsr_sharpness(viewport: RID, sharpness: float): void

  /** Sets the viewport's global transformation matrix. */
  viewport_set_global_canvas_transform(
    viewport: RID,
    transform: Transform2D
  ): void

  /** Sets the measurement for the given [param viewport] RID (obtained using [method Viewport.get_viewport_rid]). Once enabled, [method viewport_get_measured_render_time_cpu] and [method viewport_get_measured_render_time_gpu] will return values greater than [code]0.0[/code] when queried with the given [param viewport]. */
  viewport_set_measure_render_time(viewport: RID, enable: boolean): void

  /** Sets the multisample antialiasing mode for 2D/Canvas on the specified [param viewport] RID. Equivalent to [member ProjectSettings.rendering/anti_aliasing/quality/msaa_2d] or [member Viewport.msaa_2d]. */
  viewport_set_msaa_2d(viewport: RID, msaa: int): void

  /** Sets the multisample antialiasing mode for 3D on the specified [param viewport] RID. Equivalent to [member ProjectSettings.rendering/anti_aliasing/quality/msaa_3d] or [member Viewport.msaa_3d]. */
  viewport_set_msaa_3d(viewport: RID, msaa: int): void

  /** Sets the [member ProjectSettings.rendering/occlusion_culling/bvh_build_quality] to use for occlusion culling. This parameter is global and cannot be set on a per-viewport basis. */
  viewport_set_occlusion_culling_build_quality(quality: int): void

  /** Sets the [member ProjectSettings.rendering/occlusion_culling/occlusion_rays_per_thread] to use for occlusion culling. This parameter is global and cannot be set on a per-viewport basis. */
  viewport_set_occlusion_rays_per_thread(rays_per_thread: int): void

  /** Sets the viewport's parent to the viewport specified by the [param parent_viewport] RID. */
  viewport_set_parent_viewport(viewport: RID, parent_viewport: RID): void

  /** Sets the number of subdivisions to use in the specified shadow atlas [param quadrant] for omni and spot shadows. See also [method Viewport.set_positional_shadow_atlas_quadrant_subdiv]. */
  viewport_set_positional_shadow_atlas_quadrant_subdivision(
    viewport: RID,
    quadrant: int,
    subdivision: int
  ): void

  /**
   * Sets the [param size] of the shadow atlas's images (used for omni and spot lights) on the viewport specified by the [param viewport] RID. The value is rounded up to the nearest power of 2. If [param use_16_bits] is `true`, use 16 bits for the omni/spot shadow depth map. Enabling this results in shadows having less precision and may result in shadow acne, but can lead to performance improvements on some devices.
   *
   * **Note:** If this is set to `0`, no positional shadows will be visible at all. This can improve performance significantly on low-end systems by reducing both the CPU and GPU load (as fewer draw calls are needed to draw the scene without shadows).
   *
   */
  viewport_set_positional_shadow_atlas_size(
    viewport: RID,
    size: int,
    use_16_bits?: boolean
  ): void

  /** If [code]true[/code], render the contents of the viewport directly to screen. This allows a low-level optimization where you can skip drawing a viewport to the root viewport. While this optimization can result in a significant increase in speed (especially on older devices), it comes at a cost of usability. When this is enabled, you cannot read from the viewport or from the screen_texture. You also lose the benefit of certain window settings, such as the various stretch modes. Another consequence to be aware of is that in 2D the rendering happens in window coordinates, so if you have a viewport that is double the size of the window, and you set this, then only the portion that fits within the window will be drawn, no automatic scaling is possible, even if your game scene is significantly larger than the window size. */
  viewport_set_render_direct_to_screen(viewport: RID, enabled: boolean): void

  /** Sets the 3D resolution scaling mode. Bilinear scaling renders at different resolution to either undersample or supersample the viewport. FidelityFX Super Resolution 1.0, abbreviated to FSR, is an upscaling technology that produces high quality images at fast framerates by using a spatially aware upscaling algorithm. FSR is slightly more expensive than bilinear, but it produces significantly higher image quality. FSR should be used where possible. */
  viewport_set_scaling_3d_mode(viewport: RID, scaling_3d_mode: int): void

  /**
   * Scales the 3D render buffer based on the viewport size uses an image filter specified in [enum ViewportScaling3DMode] to scale the output image to the full viewport size. Values lower than `1.0` can be used to speed up 3D rendering at the cost of quality (undersampling). Values greater than `1.0` are only valid for bilinear mode and can be used to improve 3D rendering quality at a high performance cost (supersampling). See also [enum ViewportMSAA] for multi-sample antialiasing, which is significantly cheaper but only smoothens the edges of polygons.
   *
   * When using FSR upscaling, AMD recommends exposing the following values as preset options to users "Ultra Quality: 0.77", "Quality: 0.67", "Balanced: 0.59", "Performance: 0.5" instead of exposing the entire scale.
   *
   */
  viewport_set_scaling_3d_scale(viewport: RID, scale: float): void

  /** Sets a viewport's scenario. The scenario contains information about environment information, reflection atlas, etc. */
  viewport_set_scenario(viewport: RID, scenario: RID): void

  /** Sets the viewport's screen-space antialiasing mode. Equivalent to [member ProjectSettings.rendering/anti_aliasing/quality/screen_space_aa] or [member Viewport.screen_space_aa]. */
  viewport_set_screen_space_aa(viewport: RID, mode: int): void

  /** Sets the viewport's 2D signed distance field [member ProjectSettings.rendering/2d/sdf/oversize] and [member ProjectSettings.rendering/2d/sdf/scale]. This is used when sampling the signed distance field in [CanvasItem] shaders as well as [GPUParticles2D] collision. This is [i]not[/i] used by SDFGI in 3D rendering. */
  viewport_set_sdf_oversize_and_scale(
    viewport: RID,
    oversize: int,
    scale: int
  ): void

  /** Sets the viewport's width and height in pixels. */
  viewport_set_size(viewport: RID, width: int, height: int): void

  /** If [code]true[/code], canvas item transforms (i.e. origin position) are snapped to the nearest pixel when rendering. This can lead to a crisper appearance at the cost of less smooth movement, especially when [Camera2D] smoothing is enabled. Equivalent to [member ProjectSettings.rendering/2d/snap/snap_2d_transforms_to_pixel]. */
  viewport_set_snap_2d_transforms_to_pixel(
    viewport: RID,
    enabled: boolean
  ): void

  /** If [code]true[/code], canvas item vertices (i.e. polygon points) are snapped to the nearest pixel when rendering. This can lead to a crisper appearance at the cost of less smooth movement, especially when [Camera2D] smoothing is enabled. Equivalent to [member ProjectSettings.rendering/2d/snap/snap_2d_vertices_to_pixel]. */
  viewport_set_snap_2d_vertices_to_pixel(viewport: RID, enabled: boolean): void

  /**
   * Affects the final texture sharpness by reading from a lower or higher mipmap (also called "texture LOD bias"). Negative values make mipmapped textures sharper but grainier when viewed at a distance, while positive values make mipmapped textures blurrier (even when up close). To get sharper textures at a distance without introducing too much graininess, set this between `-0.75` and `0.0`. Enabling temporal antialiasing ([member ProjectSettings.rendering/anti_aliasing/quality/use_taa]) can help reduce the graininess visible when using negative mipmap bias.
   *
   * **Note:** When the 3D scaling mode is set to FSR 1.0, this value is used to adjust the automatic mipmap bias which is calculated internally based on the scale factor. The formula for this is `-log2(1.0 / scale) + mipmap_bias`.
   *
   */
  viewport_set_texture_mipmap_bias(viewport: RID, mipmap_bias: float): void

  /** If [code]true[/code], the viewport renders its background as transparent. */
  viewport_set_transparent_background(viewport: RID, enabled: boolean): void

  /** Sets when the viewport should be updated. */
  viewport_set_update_mode(viewport: RID, update_mode: int): void

  /** Equivalent to [member Viewport.use_debanding]. See also [member ProjectSettings.rendering/anti_aliasing/quality/use_debanding]. */
  viewport_set_use_debanding(viewport: RID, enable: boolean): void

  /**
   * If `true`, 2D rendering will use a high dynamic range (HDR) `RGBA16` format framebuffer. Additionally, 2D rendering will be performed on linear values and will be converted using the appropriate transfer function immediately before blitting to the screen (if the Viewport is attached to the screen).
   *
   * Practically speaking, this means that the end result of the Viewport will not be clamped to the `0-1` range and can be used in 3D rendering without color encoding adjustments. This allows 2D rendering to take advantage of effects requiring high dynamic range (e.g. 2D glow) as well as substantially improves the appearance of effects requiring highly detailed gradients. This setting has the same effect as [member Viewport.use_hdr_2d].
   *
   */
  viewport_set_use_hdr_2d(viewport: RID, enabled: boolean): void

  /** If [code]true[/code], enables occlusion culling on the specified viewport. Equivalent to [member ProjectSettings.rendering/occlusion_culling/use_occlusion_culling]. */
  viewport_set_use_occlusion_culling(viewport: RID, enable: boolean): void

  /** If [code]true[/code], use temporal antialiasing. Equivalent to [member ProjectSettings.rendering/anti_aliasing/quality/use_taa] or [member Viewport.use_taa]. */
  viewport_set_use_taa(viewport: RID, enable: boolean): void

  /** If [code]true[/code], the viewport uses augmented or virtual reality technologies. See [XRInterface]. */
  viewport_set_use_xr(viewport: RID, use_xr: boolean): void

  /** Sets the Variable Rate Shading (VRS) mode for the viewport. If the GPU does not support VRS, this property is ignored. Equivalent to [member ProjectSettings.rendering/vrs/mode]. */
  viewport_set_vrs_mode(viewport: RID, mode: int): void

  /** The texture to use when the VRS mode is set to [constant RenderingServer.VIEWPORT_VRS_TEXTURE]. Equivalent to [member ProjectSettings.rendering/vrs/texture]. */
  viewport_set_vrs_texture(viewport: RID, texture: RID): void

  /**
   * Sets the update mode for Variable Rate Shading (VRS) for the viewport. VRS requires the input texture to be converted to the format usable by the VRS method supported by the hardware. The update mode defines how often this happens. If the GPU does not support VRS, or VRS is not enabled, this property is ignored.
   *
   * If set to [constant RenderingServer.VIEWPORT_VRS_UPDATE_ONCE], the input texture is copied once and the mode is changed to [constant RenderingServer.VIEWPORT_VRS_UPDATE_DISABLED].
   *
   */
  viewport_set_vrs_update_mode(viewport: RID, mode: int): void

  /**
   * Creates a new 3D visibility notifier object and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `visibility_notifier_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * To place in a scene, attach this notifier to an instance using [method instance_set_base] using the returned RID.
   *
   * **Note:** The equivalent node is [VisibleOnScreenNotifier3D].
   *
   */
  visibility_notifier_create(): RID

  /** No documentation provided. */
  visibility_notifier_set_aabb(notifier: RID, aabb: AABB): void

  /** No documentation provided. */
  visibility_notifier_set_callbacks(
    notifier: RID,
    enter_callable: Callable,
    exit_callable: Callable
  ): void

  /** No documentation provided. */
  voxel_gi_allocate_data(
    voxel_gi: RID,
    to_cell_xform: Transform3D,
    aabb: AABB,
    octree_size: Vector3i,
    octree_cells: PackedByteArray,
    data_cells: PackedByteArray,
    distance_field: PackedByteArray,
    level_counts: PackedInt32Array
  ): void

  /**
   * Creates a new voxel-based global illumination object and adds it to the RenderingServer. It can be accessed with the RID that is returned. This RID will be used in all `voxel_gi_*` RenderingServer functions.
   *
   * Once finished with your RID, you will want to free the RID using the RenderingServer's [method free_rid] method.
   *
   * **Note:** The equivalent node is [VoxelGI].
   *
   */
  voxel_gi_create(): RID

  /** No documentation provided. */
  voxel_gi_get_data_cells(voxel_gi: RID): PackedByteArray

  /** No documentation provided. */
  voxel_gi_get_distance_field(voxel_gi: RID): PackedByteArray

  /** No documentation provided. */
  voxel_gi_get_level_counts(voxel_gi: RID): PackedInt32Array

  /** No documentation provided. */
  voxel_gi_get_octree_cells(voxel_gi: RID): PackedByteArray

  /** No documentation provided. */
  voxel_gi_get_octree_size(voxel_gi: RID): Vector3i

  /** No documentation provided. */
  voxel_gi_get_to_cell_xform(voxel_gi: RID): Transform3D

  /** Used to inform the renderer what exposure normalization value was used while baking the voxel gi. This value will be used and modulated at run time to ensure that the voxel gi maintains a consistent level of exposure even if the scene-wide exposure normalization is changed at run time. For more information see [method camera_attributes_set_exposure]. */
  voxel_gi_set_baked_exposure_normalization(
    voxel_gi: RID,
    baked_exposure: float
  ): void

  /** Sets the [member VoxelGIData.bias] value to use on the specified [param voxel_gi]'s [RID]. */
  voxel_gi_set_bias(voxel_gi: RID, bias: float): void

  /** Sets the [member VoxelGIData.dynamic_range] value to use on the specified [param voxel_gi]'s [RID]. */
  voxel_gi_set_dynamic_range(voxel_gi: RID, range: float): void

  /** Sets the [member VoxelGIData.energy] value to use on the specified [param voxel_gi]'s [RID]. */
  voxel_gi_set_energy(voxel_gi: RID, energy: float): void

  /** Sets the [member VoxelGIData.interior] value to use on the specified [param voxel_gi]'s [RID]. */
  voxel_gi_set_interior(voxel_gi: RID, enable: boolean): void

  /** Sets the [member VoxelGIData.normal_bias] value to use on the specified [param voxel_gi]'s [RID]. */
  voxel_gi_set_normal_bias(voxel_gi: RID, bias: float): void

  /** Sets the [member VoxelGIData.propagation] value to use on the specified [param voxel_gi]'s [RID]. */
  voxel_gi_set_propagation(voxel_gi: RID, amount: float): void

  /** Sets the [member ProjectSettings.rendering/global_illumination/voxel_gi/quality] value to use when rendering. This parameter is global and cannot be set on a per-VoxelGI basis. */
  voxel_gi_set_quality(quality: int): void

  /** Sets the [member VoxelGIData.use_two_bounces] value to use on the specified [param voxel_gi]'s [RID]. */
  voxel_gi_set_use_two_bounces(voxel_gi: RID, enable: boolean): void

  connect<T extends SignalsOf<RenderingServerClass>>(
    signal: T,
    method: SignalFunction<RenderingServerClass[T]>
  ): number

  /**
   * Marks an error that shows that the index array is empty.
   *
   */
  static NO_INDEX_ARRAY: any

  /**
   * Number of weights/bones per vertex.
   *
   */
  static ARRAY_WEIGHTS_SIZE: any

  /**
   * The minimum Z-layer for canvas items.
   *
   */
  static CANVAS_ITEM_Z_MIN: any

  /**
   * The maximum Z-layer for canvas items.
   *
   */
  static CANVAS_ITEM_Z_MAX: any

  /**
   * The minimum canvas layer.
   *
   */
  static CANVAS_LAYER_MIN: any

  /**
   * The maximum canvas layer.
   *
   */
  static CANVAS_LAYER_MAX: any

  /**
   * The maximum number of glow levels that can be used with the glow post-processing effect.
   *
   */
  static MAX_GLOW_LEVELS: any

  /** No documentation provided. */
  static MAX_CURSORS: any

  /**
   * The maximum number of directional lights that can be rendered at a given time in 2D.
   *
   */
  static MAX_2D_DIRECTIONAL_LIGHTS: any

  /**
   * The maximum number of surfaces a mesh can have.
   *
   */
  static MAX_MESH_SURFACES: any

  /**
   * 2D texture.
   *
   */
  static TEXTURE_TYPE_2D: any

  /**
   * Layered texture.
   *
   */
  static TEXTURE_TYPE_LAYERED: any

  /**
   * 3D texture.
   *
   */
  static TEXTURE_TYPE_3D: any

  /**
   * Array of 2-dimensional textures (see [Texture2DArray]).
   *
   */
  static TEXTURE_LAYERED_2D_ARRAY: any

  /**
   * Cubemap texture (see [Cubemap]).
   *
   */
  static TEXTURE_LAYERED_CUBEMAP: any

  /**
   * Array of cubemap textures (see [CubemapArray]).
   *
   */
  static TEXTURE_LAYERED_CUBEMAP_ARRAY: any

  /**
   * Left face of a [Cubemap].
   *
   */
  static CUBEMAP_LAYER_LEFT: any

  /**
   * Right face of a [Cubemap].
   *
   */
  static CUBEMAP_LAYER_RIGHT: any

  /**
   * Bottom face of a [Cubemap].
   *
   */
  static CUBEMAP_LAYER_BOTTOM: any

  /**
   * Top face of a [Cubemap].
   *
   */
  static CUBEMAP_LAYER_TOP: any

  /**
   * Front face of a [Cubemap].
   *
   */
  static CUBEMAP_LAYER_FRONT: any

  /**
   * Back face of a [Cubemap].
   *
   */
  static CUBEMAP_LAYER_BACK: any

  /**
   * Shader is a 3D shader.
   *
   */
  static SHADER_SPATIAL: any

  /**
   * Shader is a 2D shader.
   *
   */
  static SHADER_CANVAS_ITEM: any

  /**
   * Shader is a particle shader (can be used in both 2D and 3D).
   *
   */
  static SHADER_PARTICLES: any

  /**
   * Shader is a 3D sky shader.
   *
   */
  static SHADER_SKY: any

  /**
   * Shader is a 3D fog shader.
   *
   */
  static SHADER_FOG: any

  /**
   * Represents the size of the [enum ShaderMode] enum.
   *
   */
  static SHADER_MAX: any

  /**
   * The minimum renderpriority of all materials.
   *
   */
  static MATERIAL_RENDER_PRIORITY_MIN: any

  /**
   * The maximum renderpriority of all materials.
   *
   */
  static MATERIAL_RENDER_PRIORITY_MAX: any

  /**
   * Array is a vertex position array.
   *
   */
  static ARRAY_VERTEX: any

  /**
   * Array is a normal array.
   *
   */
  static ARRAY_NORMAL: any

  /**
   * Array is a tangent array.
   *
   */
  static ARRAY_TANGENT: any

  /**
   * Array is a vertex color array.
   *
   */
  static ARRAY_COLOR: any

  /**
   * Array is a UV coordinates array.
   *
   */
  static ARRAY_TEX_UV: any

  /**
   * Array is a UV coordinates array for the second set of UV coordinates.
   *
   */
  static ARRAY_TEX_UV2: any

  /**
   * Array is a custom data array for the first set of custom data.
   *
   */
  static ARRAY_CUSTOM0: any

  /**
   * Array is a custom data array for the second set of custom data.
   *
   */
  static ARRAY_CUSTOM1: any

  /**
   * Array is a custom data array for the third set of custom data.
   *
   */
  static ARRAY_CUSTOM2: any

  /**
   * Array is a custom data array for the fourth set of custom data.
   *
   */
  static ARRAY_CUSTOM3: any

  /**
   * Array contains bone information.
   *
   */
  static ARRAY_BONES: any

  /**
   * Array is weight information.
   *
   */
  static ARRAY_WEIGHTS: any

  /**
   * Array is an index array.
   *
   */
  static ARRAY_INDEX: any

  /**
   * Represents the size of the [enum ArrayType] enum.
   *
   */
  static ARRAY_MAX: any

  /**
   * The number of custom data arrays available ([constant ARRAY_CUSTOM0], [constant ARRAY_CUSTOM1], [constant ARRAY_CUSTOM2], [constant ARRAY_CUSTOM3]).
   *
   */
  static ARRAY_CUSTOM_COUNT: any

  /**
   * Custom data array contains 8-bit-per-channel red/green/blue/alpha color data. Values are normalized, unsigned floating-point in the `[0.0, 1.0]` range.
   *
   */
  static ARRAY_CUSTOM_RGBA8_UNORM: any

  /**
   * Custom data array contains 8-bit-per-channel red/green/blue/alpha color data. Values are normalized, signed floating-point in the `[-1.0, 1.0]` range.
   *
   */
  static ARRAY_CUSTOM_RGBA8_SNORM: any

  /**
   * Custom data array contains 16-bit-per-channel red/green color data. Values are floating-point in half precision.
   *
   */
  static ARRAY_CUSTOM_RG_HALF: any

  /**
   * Custom data array contains 16-bit-per-channel red/green/blue/alpha color data. Values are floating-point in half precision.
   *
   */
  static ARRAY_CUSTOM_RGBA_HALF: any

  /**
   * Custom data array contains 32-bit-per-channel red color data. Values are floating-point in single precision.
   *
   */
  static ARRAY_CUSTOM_R_FLOAT: any

  /**
   * Custom data array contains 32-bit-per-channel red/green color data. Values are floating-point in single precision.
   *
   */
  static ARRAY_CUSTOM_RG_FLOAT: any

  /**
   * Custom data array contains 32-bit-per-channel red/green/blue color data. Values are floating-point in single precision.
   *
   */
  static ARRAY_CUSTOM_RGB_FLOAT: any

  /**
   * Custom data array contains 32-bit-per-channel red/green/blue/alpha color data. Values are floating-point in single precision.
   *
   */
  static ARRAY_CUSTOM_RGBA_FLOAT: any

  /**
   * Represents the size of the [enum ArrayCustomFormat] enum.
   *
   */
  static ARRAY_CUSTOM_MAX: any

  /**
   * Flag used to mark a vertex position array.
   *
   */
  static ARRAY_FORMAT_VERTEX: any

  /**
   * Flag used to mark a normal array.
   *
   */
  static ARRAY_FORMAT_NORMAL: any

  /**
   * Flag used to mark a tangent array.
   *
   */
  static ARRAY_FORMAT_TANGENT: any

  /**
   * Flag used to mark a vertex color array.
   *
   */
  static ARRAY_FORMAT_COLOR: any

  /**
   * Flag used to mark a UV coordinates array.
   *
   */
  static ARRAY_FORMAT_TEX_UV: any

  /**
   * Flag used to mark a UV coordinates array for the second UV coordinates.
   *
   */
  static ARRAY_FORMAT_TEX_UV2: any

  /**
   * Flag used to mark an array of custom per-vertex data for the first set of custom data.
   *
   */
  static ARRAY_FORMAT_CUSTOM0: any

  /**
   * Flag used to mark an array of custom per-vertex data for the second set of custom data.
   *
   */
  static ARRAY_FORMAT_CUSTOM1: any

  /**
   * Flag used to mark an array of custom per-vertex data for the third set of custom data.
   *
   */
  static ARRAY_FORMAT_CUSTOM2: any

  /**
   * Flag used to mark an array of custom per-vertex data for the fourth set of custom data.
   *
   */
  static ARRAY_FORMAT_CUSTOM3: any

  /**
   * Flag used to mark a bone information array.
   *
   */
  static ARRAY_FORMAT_BONES: any

  /**
   * Flag used to mark a weights array.
   *
   */
  static ARRAY_FORMAT_WEIGHTS: any

  /**
   * Flag used to mark an index array.
   *
   */
  static ARRAY_FORMAT_INDEX: any

  /**
   * Mask of mesh channels permitted in blend shapes.
   *
   */
  static ARRAY_FORMAT_BLEND_SHAPE_MASK: any

  /**
   * Shift of first custom channel.
   *
   */
  static ARRAY_FORMAT_CUSTOM_BASE: any

  /**
   * Number of format bits per custom channel. See [enum ArrayCustomFormat].
   *
   */
  static ARRAY_FORMAT_CUSTOM_BITS: any

  /**
   * Amount to shift [enum ArrayCustomFormat] for custom channel index 0.
   *
   */
  static ARRAY_FORMAT_CUSTOM0_SHIFT: any

  /**
   * Amount to shift [enum ArrayCustomFormat] for custom channel index 1.
   *
   */
  static ARRAY_FORMAT_CUSTOM1_SHIFT: any

  /**
   * Amount to shift [enum ArrayCustomFormat] for custom channel index 2.
   *
   */
  static ARRAY_FORMAT_CUSTOM2_SHIFT: any

  /**
   * Amount to shift [enum ArrayCustomFormat] for custom channel index 3.
   *
   */
  static ARRAY_FORMAT_CUSTOM3_SHIFT: any

  /**
   * Mask of custom format bits per custom channel. Must be shifted by one of the SHIFT constants. See [enum ArrayCustomFormat].
   *
   */
  static ARRAY_FORMAT_CUSTOM_MASK: any

  /**
   * Shift of first compress flag. Compress flags should be passed to [method ArrayMesh.add_surface_from_arrays] and [method SurfaceTool.commit].
   *
   */
  static ARRAY_COMPRESS_FLAGS_BASE: any

  /**
   * Flag used to mark that the array contains 2D vertices.
   *
   */
  static ARRAY_FLAG_USE_2D_VERTICES: any

  /**
   * Flag used to mark that the mesh data will use `GL_DYNAMIC_DRAW` on GLES. Unused on Vulkan.
   *
   */
  static ARRAY_FLAG_USE_DYNAMIC_UPDATE: any

  /**
   * Flag used to mark that the array uses 8 bone weights instead of 4.
   *
   */
  static ARRAY_FLAG_USE_8_BONE_WEIGHTS: any

  /**
   * Flag used to mark that the mesh does not have a vertex array and instead will infer vertex positions in the shader using indices and other information.
   *
   */
  static ARRAY_FLAG_USES_EMPTY_VERTEX_ARRAY: any

  /**
   * Flag used to mark that a mesh is using compressed attributes (vertices, normals, tangents, UVs). When this form of compression is enabled, vertex positions will be packed into an RGBA16UNORM attribute and scaled in the vertex shader. The normal and tangent will be packed into an RG16UNORM representing an axis, and a 16-bit float stored in the A-channel of the vertex. UVs will use 16-bit normalized floats instead of full 32-bit signed floats. When using this compression mode you must use either vertices, normals, and tangents or only vertices. You cannot use normals without tangents. Importers will automatically enable this compression if they can.
   *
   */
  static ARRAY_FLAG_COMPRESS_ATTRIBUTES: any

  /**
   * Flag used to mark the start of the bits used to store the mesh version.
   *
   */
  static ARRAY_FLAG_FORMAT_VERSION_BASE: any

  /**
   * Flag used to shift a mesh format int to bring the version into the lowest digits.
   *
   */
  static ARRAY_FLAG_FORMAT_VERSION_SHIFT: any

  /**
   * Flag used to record the format used by prior mesh versions before the introduction of a version.
   *
   */
  static ARRAY_FLAG_FORMAT_VERSION_1: any

  /**
   * Flag used to record the second iteration of the mesh version flag. The primary difference between this and [constant ARRAY_FLAG_FORMAT_VERSION_1] is that this version supports [constant ARRAY_FLAG_COMPRESS_ATTRIBUTES] and in this version vertex positions are de-interleaved from normals and tangents.
   *
   */
  static ARRAY_FLAG_FORMAT_VERSION_2: any

  /**
   * Flag used to record the current version that the engine expects. Currently this is the same as [constant ARRAY_FLAG_FORMAT_VERSION_2].
   *
   */
  static ARRAY_FLAG_FORMAT_CURRENT_VERSION: any

  /**
   * Flag used to isolate the bits used for mesh version after using [constant ARRAY_FLAG_FORMAT_VERSION_SHIFT] to shift them into place.
   *
   */
  static ARRAY_FLAG_FORMAT_VERSION_MASK: any

  /**
   * Primitive to draw consists of points.
   *
   */
  static PRIMITIVE_POINTS: any

  /**
   * Primitive to draw consists of lines.
   *
   */
  static PRIMITIVE_LINES: any

  /**
   * Primitive to draw consists of a line strip from start to end.
   *
   */
  static PRIMITIVE_LINE_STRIP: any

  /**
   * Primitive to draw consists of triangles.
   *
   */
  static PRIMITIVE_TRIANGLES: any

  /**
   * Primitive to draw consists of a triangle strip (the last 3 vertices are always combined to make a triangle).
   *
   */
  static PRIMITIVE_TRIANGLE_STRIP: any

  /**
   * Represents the size of the [enum PrimitiveType] enum.
   *
   */
  static PRIMITIVE_MAX: any

  /**
   * Blend shapes are normalized.
   *
   */
  static BLEND_SHAPE_MODE_NORMALIZED: any

  /**
   * Blend shapes are relative to base weight.
   *
   */
  static BLEND_SHAPE_MODE_RELATIVE: any

  /**
   * Use [Transform2D] to store MultiMesh transform.
   *
   */
  static MULTIMESH_TRANSFORM_2D: any

  /**
   * Use [Transform3D] to store MultiMesh transform.
   *
   */
  static MULTIMESH_TRANSFORM_3D: any

  /**
   * MultiMesh physics interpolation favors speed over quality.
   *
   */
  static MULTIMESH_INTERP_QUALITY_FAST: any

  /**
   * MultiMesh physics interpolation favors quality over speed.
   *
   */
  static MULTIMESH_INTERP_QUALITY_HIGH: any

  /**
   * Nearest-neighbor filter for light projectors (use for pixel art light projectors). No mipmaps are used for rendering, which means light projectors at a distance will look sharp but grainy. This has roughly the same performance cost as using mipmaps.
   *
   */
  static LIGHT_PROJECTOR_FILTER_NEAREST: any

  /**
   * Linear filter for light projectors (use for non-pixel art light projectors). No mipmaps are used for rendering, which means light projectors at a distance will look smooth but blurry. This has roughly the same performance cost as using mipmaps.
   *
   */
  static LIGHT_PROJECTOR_FILTER_LINEAR: any

  /**
   * Nearest-neighbor filter for light projectors (use for pixel art light projectors). Isotropic mipmaps are used for rendering, which means light projectors at a distance will look smooth but blurry. This has roughly the same performance cost as not using mipmaps.
   *
   */
  static LIGHT_PROJECTOR_FILTER_NEAREST_MIPMAPS: any

  /**
   * Linear filter for light projectors (use for non-pixel art light projectors). Isotropic mipmaps are used for rendering, which means light projectors at a distance will look smooth but blurry. This has roughly the same performance cost as not using mipmaps.
   *
   */
  static LIGHT_PROJECTOR_FILTER_LINEAR_MIPMAPS: any

  /**
   * Nearest-neighbor filter for light projectors (use for pixel art light projectors). Anisotropic mipmaps are used for rendering, which means light projectors at a distance will look smooth and sharp when viewed from oblique angles. This looks better compared to isotropic mipmaps, but is slower. The level of anisotropic filtering is defined by [member ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level].
   *
   */
  static LIGHT_PROJECTOR_FILTER_NEAREST_MIPMAPS_ANISOTROPIC: any

  /**
   * Linear filter for light projectors (use for non-pixel art light projectors). Anisotropic mipmaps are used for rendering, which means light projectors at a distance will look smooth and sharp when viewed from oblique angles. This looks better compared to isotropic mipmaps, but is slower. The level of anisotropic filtering is defined by [member ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level].
   *
   */
  static LIGHT_PROJECTOR_FILTER_LINEAR_MIPMAPS_ANISOTROPIC: any

  /**
   * Directional (sun/moon) light (see [DirectionalLight3D]).
   *
   */
  static LIGHT_DIRECTIONAL: any

  /**
   * Omni light (see [OmniLight3D]).
   *
   */
  static LIGHT_OMNI: any

  /**
   * Spot light (see [SpotLight3D]).
   *
   */
  static LIGHT_SPOT: any

  /**
   * The light's energy multiplier.
   *
   */
  static LIGHT_PARAM_ENERGY: any

  /**
   * The light's indirect energy multiplier (final indirect energy is [constant LIGHT_PARAM_ENERGY] * [constant LIGHT_PARAM_INDIRECT_ENERGY]).
   *
   */
  static LIGHT_PARAM_INDIRECT_ENERGY: any

  /**
   * The light's volumetric fog energy multiplier (final volumetric fog energy is [constant LIGHT_PARAM_ENERGY] * [constant LIGHT_PARAM_VOLUMETRIC_FOG_ENERGY]).
   *
   */
  static LIGHT_PARAM_VOLUMETRIC_FOG_ENERGY: any

  /**
   * The light's influence on specularity.
   *
   */
  static LIGHT_PARAM_SPECULAR: any

  /**
   * The light's range.
   *
   */
  static LIGHT_PARAM_RANGE: any

  /**
   * The size of the light when using spot light or omni light. The angular size of the light when using directional light.
   *
   */
  static LIGHT_PARAM_SIZE: any

  /**
   * The light's attenuation.
   *
   */
  static LIGHT_PARAM_ATTENUATION: any

  /**
   * The spotlight's angle.
   *
   */
  static LIGHT_PARAM_SPOT_ANGLE: any

  /**
   * The spotlight's attenuation.
   *
   */
  static LIGHT_PARAM_SPOT_ATTENUATION: any

  /**
   * The maximum distance for shadow splits. Increasing this value will make directional shadows visible from further away, at the cost of lower overall shadow detail and performance (since more objects need to be included in the directional shadow rendering).
   *
   */
  static LIGHT_PARAM_SHADOW_MAX_DISTANCE: any

  /**
   * Proportion of shadow atlas occupied by the first split.
   *
   */
  static LIGHT_PARAM_SHADOW_SPLIT_1_OFFSET: any

  /**
   * Proportion of shadow atlas occupied by the second split.
   *
   */
  static LIGHT_PARAM_SHADOW_SPLIT_2_OFFSET: any

  /**
   * Proportion of shadow atlas occupied by the third split. The fourth split occupies the rest.
   *
   */
  static LIGHT_PARAM_SHADOW_SPLIT_3_OFFSET: any

  /**
   * Proportion of shadow max distance where the shadow will start to fade out.
   *
   */
  static LIGHT_PARAM_SHADOW_FADE_START: any

  /**
   * Normal bias used to offset shadow lookup by object normal. Can be used to fix self-shadowing artifacts.
   *
   */
  static LIGHT_PARAM_SHADOW_NORMAL_BIAS: any

  /**
   * Bias for the shadow lookup to fix self-shadowing artifacts.
   *
   */
  static LIGHT_PARAM_SHADOW_BIAS: any

  /**
   * Sets the size of the directional shadow pancake. The pancake offsets the start of the shadow's camera frustum to provide a higher effective depth resolution for the shadow. However, a high pancake size can cause artifacts in the shadows of large objects that are close to the edge of the frustum. Reducing the pancake size can help. Setting the size to `0` turns off the pancaking effect.
   *
   */
  static LIGHT_PARAM_SHADOW_PANCAKE_SIZE: any

  /**
   * The light's shadow opacity. Values lower than `1.0` make the light appear through shadows. This can be used to fake global illumination at a low performance cost.
   *
   */
  static LIGHT_PARAM_SHADOW_OPACITY: any

  /**
   * Blurs the edges of the shadow. Can be used to hide pixel artifacts in low resolution shadow maps. A high value can make shadows appear grainy and can cause other unwanted artifacts. Try to keep as near default as possible.
   *
   */
  static LIGHT_PARAM_SHADOW_BLUR: any

  /** No documentation provided. */
  static LIGHT_PARAM_TRANSMITTANCE_BIAS: any

  /**
   * Constant representing the intensity of the light, measured in Lumens when dealing with a [SpotLight3D] or [OmniLight3D], or measured in Lux with a [DirectionalLight3D]. Only used when [member ProjectSettings.rendering/lights_and_shadows/use_physical_light_units] is `true`.
   *
   */
  static LIGHT_PARAM_INTENSITY: any

  /**
   * Represents the size of the [enum LightParam] enum.
   *
   */
  static LIGHT_PARAM_MAX: any

  /**
   * Light is ignored when baking. This is the fastest mode, but the light will be taken into account when baking global illumination. This mode should generally be used for dynamic lights that change quickly, as the effect of global illumination is less noticeable on those lights.
   *
   */
  static LIGHT_BAKE_DISABLED: any

  /**
   * Light is taken into account in static baking ([VoxelGI], [LightmapGI], SDFGI ([member Environment.sdfgi_enabled])). The light can be moved around or modified, but its global illumination will not update in real-time. This is suitable for subtle changes (such as flickering torches), but generally not large changes such as toggling a light on and off.
   *
   */
  static LIGHT_BAKE_STATIC: any

  /**
   * Light is taken into account in dynamic baking ([VoxelGI] and SDFGI ([member Environment.sdfgi_enabled]) only). The light can be moved around or modified with global illumination updating in real-time. The light's global illumination appearance will be slightly different compared to [constant LIGHT_BAKE_STATIC]. This has a greater performance cost compared to [constant LIGHT_BAKE_STATIC]. When using SDFGI, the update speed of dynamic lights is affected by [member ProjectSettings.rendering/global_illumination/sdfgi/frames_to_update_lights].
   *
   */
  static LIGHT_BAKE_DYNAMIC: any

  /**
   * Use a dual paraboloid shadow map for omni lights.
   *
   */
  static LIGHT_OMNI_SHADOW_DUAL_PARABOLOID: any

  /**
   * Use a cubemap shadow map for omni lights. Slower but better quality than dual paraboloid.
   *
   */
  static LIGHT_OMNI_SHADOW_CUBE: any

  /**
   * Use orthogonal shadow projection for directional light.
   *
   */
  static LIGHT_DIRECTIONAL_SHADOW_ORTHOGONAL: any

  /**
   * Use 2 splits for shadow projection when using directional light.
   *
   */
  static LIGHT_DIRECTIONAL_SHADOW_PARALLEL_2_SPLITS: any

  /**
   * Use 4 splits for shadow projection when using directional light.
   *
   */
  static LIGHT_DIRECTIONAL_SHADOW_PARALLEL_4_SPLITS: any

  /**
   * Use DirectionalLight3D in both sky rendering and scene lighting.
   *
   */
  static LIGHT_DIRECTIONAL_SKY_MODE_LIGHT_AND_SKY: any

  /**
   * Only use DirectionalLight3D in scene lighting.
   *
   */
  static LIGHT_DIRECTIONAL_SKY_MODE_LIGHT_ONLY: any

  /**
   * Only use DirectionalLight3D in sky rendering.
   *
   */
  static LIGHT_DIRECTIONAL_SKY_MODE_SKY_ONLY: any

  /**
   * Lowest shadow filtering quality (fastest). Soft shadows are not available with this quality setting, which means the [member Light3D.shadow_blur] property is ignored if [member Light3D.light_size] and [member Light3D.light_angular_distance] is `0.0`.
   *
   * **Note:** The variable shadow blur performed by [member Light3D.light_size] and [member Light3D.light_angular_distance] is still effective when using hard shadow filtering. In this case, [member Light3D.shadow_blur] **is** taken into account. However, the results will not be blurred, instead the blur amount is treated as a maximum radius for the penumbra.
   *
   */
  static SHADOW_QUALITY_HARD: any

  /**
   * Very low shadow filtering quality (faster). When using this quality setting, [member Light3D.shadow_blur] is automatically multiplied by 0.75× to avoid introducing too much noise. This division only applies to lights whose [member Light3D.light_size] or [member Light3D.light_angular_distance] is `0.0`).
   *
   */
  static SHADOW_QUALITY_SOFT_VERY_LOW: any

  /**
   * Low shadow filtering quality (fast).
   *
   */
  static SHADOW_QUALITY_SOFT_LOW: any

  /**
   * Medium low shadow filtering quality (average).
   *
   */
  static SHADOW_QUALITY_SOFT_MEDIUM: any

  /**
   * High low shadow filtering quality (slow). When using this quality setting, [member Light3D.shadow_blur] is automatically multiplied by 1.5× to better make use of the high sample count. This increased blur also improves the stability of dynamic object shadows. This multiplier only applies to lights whose [member Light3D.light_size] or [member Light3D.light_angular_distance] is `0.0`).
   *
   */
  static SHADOW_QUALITY_SOFT_HIGH: any

  /**
   * Highest low shadow filtering quality (slowest). When using this quality setting, [member Light3D.shadow_blur] is automatically multiplied by 2× to better make use of the high sample count. This increased blur also improves the stability of dynamic object shadows. This multiplier only applies to lights whose [member Light3D.light_size] or [member Light3D.light_angular_distance] is `0.0`).
   *
   */
  static SHADOW_QUALITY_SOFT_ULTRA: any

  /**
   * Represents the size of the [enum ShadowQuality] enum.
   *
   */
  static SHADOW_QUALITY_MAX: any

  /**
   * Reflection probe will update reflections once and then stop.
   *
   */
  static REFLECTION_PROBE_UPDATE_ONCE: any

  /**
   * Reflection probe will update each frame. This mode is necessary to capture moving objects.
   *
   */
  static REFLECTION_PROBE_UPDATE_ALWAYS: any

  /**
   * Do not apply any ambient lighting inside the reflection probe's box defined by its size.
   *
   */
  static REFLECTION_PROBE_AMBIENT_DISABLED: any

  /**
   * Apply automatically-sourced environment lighting inside the reflection probe's box defined by its size.
   *
   */
  static REFLECTION_PROBE_AMBIENT_ENVIRONMENT: any

  /**
   * Apply custom ambient lighting inside the reflection probe's box defined by its size. See [method reflection_probe_set_ambient_color] and [method reflection_probe_set_ambient_energy].
   *
   */
  static REFLECTION_PROBE_AMBIENT_COLOR: any

  /**
   * Albedo texture slot in a decal ([member Decal.texture_albedo]).
   *
   */
  static DECAL_TEXTURE_ALBEDO: any

  /**
   * Normal map texture slot in a decal ([member Decal.texture_normal]).
   *
   */
  static DECAL_TEXTURE_NORMAL: any

  /**
   * Occlusion/Roughness/Metallic texture slot in a decal ([member Decal.texture_orm]).
   *
   */
  static DECAL_TEXTURE_ORM: any

  /**
   * Emission texture slot in a decal ([member Decal.texture_emission]).
   *
   */
  static DECAL_TEXTURE_EMISSION: any

  /**
   * Represents the size of the [enum DecalTexture] enum.
   *
   */
  static DECAL_TEXTURE_MAX: any

  /**
   * Nearest-neighbor filter for decals (use for pixel art decals). No mipmaps are used for rendering, which means decals at a distance will look sharp but grainy. This has roughly the same performance cost as using mipmaps.
   *
   */
  static DECAL_FILTER_NEAREST: any

  /**
   * Linear filter for decals (use for non-pixel art decals). No mipmaps are used for rendering, which means decals at a distance will look smooth but blurry. This has roughly the same performance cost as using mipmaps.
   *
   */
  static DECAL_FILTER_LINEAR: any

  /**
   * Nearest-neighbor filter for decals (use for pixel art decals). Isotropic mipmaps are used for rendering, which means decals at a distance will look smooth but blurry. This has roughly the same performance cost as not using mipmaps.
   *
   */
  static DECAL_FILTER_NEAREST_MIPMAPS: any

  /**
   * Linear filter for decals (use for non-pixel art decals). Isotropic mipmaps are used for rendering, which means decals at a distance will look smooth but blurry. This has roughly the same performance cost as not using mipmaps.
   *
   */
  static DECAL_FILTER_LINEAR_MIPMAPS: any

  /**
   * Nearest-neighbor filter for decals (use for pixel art decals). Anisotropic mipmaps are used for rendering, which means decals at a distance will look smooth and sharp when viewed from oblique angles. This looks better compared to isotropic mipmaps, but is slower. The level of anisotropic filtering is defined by [member ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level].
   *
   */
  static DECAL_FILTER_NEAREST_MIPMAPS_ANISOTROPIC: any

  /**
   * Linear filter for decals (use for non-pixel art decals). Anisotropic mipmaps are used for rendering, which means decals at a distance will look smooth and sharp when viewed from oblique angles. This looks better compared to isotropic mipmaps, but is slower. The level of anisotropic filtering is defined by [member ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level].
   *
   */
  static DECAL_FILTER_LINEAR_MIPMAPS_ANISOTROPIC: any

  /**
   * Low [VoxelGI] rendering quality using 4 cones.
   *
   */
  static VOXEL_GI_QUALITY_LOW: any

  /**
   * High [VoxelGI] rendering quality using 6 cones.
   *
   */
  static VOXEL_GI_QUALITY_HIGH: any

  /**
   * 2D particles.
   *
   */
  static PARTICLES_MODE_2D: any

  /**
   * 3D particles.
   *
   */
  static PARTICLES_MODE_3D: any

  /** No documentation provided. */
  static PARTICLES_TRANSFORM_ALIGN_DISABLED: any

  /** No documentation provided. */
  static PARTICLES_TRANSFORM_ALIGN_Z_BILLBOARD: any

  /** No documentation provided. */
  static PARTICLES_TRANSFORM_ALIGN_Y_TO_VELOCITY: any

  /** No documentation provided. */
  static PARTICLES_TRANSFORM_ALIGN_Z_BILLBOARD_Y_TO_VELOCITY: any

  /** No documentation provided. */
  static PARTICLES_EMIT_FLAG_POSITION: any

  /** No documentation provided. */
  static PARTICLES_EMIT_FLAG_ROTATION_SCALE: any

  /** No documentation provided. */
  static PARTICLES_EMIT_FLAG_VELOCITY: any

  /** No documentation provided. */
  static PARTICLES_EMIT_FLAG_COLOR: any

  /** No documentation provided. */
  static PARTICLES_EMIT_FLAG_CUSTOM: any

  /**
   * Draw particles in the order that they appear in the particles array.
   *
   */
  static PARTICLES_DRAW_ORDER_INDEX: any

  /**
   * Sort particles based on their lifetime. In other words, the particle with the highest lifetime is drawn at the front.
   *
   */
  static PARTICLES_DRAW_ORDER_LIFETIME: any

  /**
   * Sort particles based on the inverse of their lifetime. In other words, the particle with the lowest lifetime is drawn at the front.
   *
   */
  static PARTICLES_DRAW_ORDER_REVERSE_LIFETIME: any

  /**
   * Sort particles based on their distance to the camera.
   *
   */
  static PARTICLES_DRAW_ORDER_VIEW_DEPTH: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_TYPE_SPHERE_ATTRACT: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_TYPE_BOX_ATTRACT: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_TYPE_VECTOR_FIELD_ATTRACT: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_TYPE_SPHERE_COLLIDE: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_TYPE_BOX_COLLIDE: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_TYPE_SDF_COLLIDE: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_TYPE_HEIGHTFIELD_COLLIDE: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_HEIGHTFIELD_RESOLUTION_256: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_HEIGHTFIELD_RESOLUTION_512: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_HEIGHTFIELD_RESOLUTION_1024: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_HEIGHTFIELD_RESOLUTION_2048: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_HEIGHTFIELD_RESOLUTION_4096: any

  /** No documentation provided. */
  static PARTICLES_COLLISION_HEIGHTFIELD_RESOLUTION_8192: any

  /**
   * Represents the size of the [enum ParticlesCollisionHeightfieldResolution] enum.
   *
   */
  static PARTICLES_COLLISION_HEIGHTFIELD_RESOLUTION_MAX: any

  /**
   * [FogVolume] will be shaped like an ellipsoid (stretched sphere).
   *
   */
  static FOG_VOLUME_SHAPE_ELLIPSOID: any

  /**
   * [FogVolume] will be shaped like a cone pointing upwards (in local coordinates). The cone's angle is set automatically to fill the size. The cone will be adjusted to fit within the size. Rotate the [FogVolume] node to reorient the cone. Non-uniform scaling via size is not supported (scale the [FogVolume] node instead).
   *
   */
  static FOG_VOLUME_SHAPE_CONE: any

  /**
   * [FogVolume] will be shaped like an upright cylinder (in local coordinates). Rotate the [FogVolume] node to reorient the cylinder. The cylinder will be adjusted to fit within the size. Non-uniform scaling via size is not supported (scale the [FogVolume] node instead).
   *
   */
  static FOG_VOLUME_SHAPE_CYLINDER: any

  /**
   * [FogVolume] will be shaped like a box.
   *
   */
  static FOG_VOLUME_SHAPE_BOX: any

  /**
   * [FogVolume] will have no shape, will cover the whole world and will not be culled.
   *
   */
  static FOG_VOLUME_SHAPE_WORLD: any

  /**
   * Represents the size of the [enum FogVolumeShape] enum.
   *
   */
  static FOG_VOLUME_SHAPE_MAX: any

  /**
   * Use bilinear scaling for the viewport's 3D buffer. The amount of scaling can be set using [member Viewport.scaling_3d_scale]. Values less than `1.0` will result in undersampling while values greater than `1.0` will result in supersampling. A value of `1.0` disables scaling.
   *
   */
  static VIEWPORT_SCALING_3D_MODE_BILINEAR: any

  /**
   * Use AMD FidelityFX Super Resolution 1.0 upscaling for the viewport's 3D buffer. The amount of scaling can be set using [member Viewport.scaling_3d_scale]. Values less than `1.0` will result in the viewport being upscaled using FSR. Values greater than `1.0` are not supported and bilinear downsampling will be used instead. A value of `1.0` disables scaling.
   *
   */
  static VIEWPORT_SCALING_3D_MODE_FSR: any

  /**
   * Use AMD FidelityFX Super Resolution 2.2 upscaling for the viewport's 3D buffer. The amount of scaling can be set using [member Viewport.scaling_3d_scale]. Values less than `1.0` will result in the viewport being upscaled using FSR2. Values greater than `1.0` are not supported and bilinear downsampling will be used instead. A value of `1.0` will use FSR2 at native resolution as a TAA solution.
   *
   */
  static VIEWPORT_SCALING_3D_MODE_FSR2: any

  /**
   * Use MetalFX spatial upscaling for the viewport's 3D buffer. The amount of scaling can be set using [member Viewport.scaling_3d_scale]. Values less than `1.0` will result in the viewport being upscaled using MetalFX. Values greater than `1.0` are not supported and bilinear downsampling will be used instead. A value of `1.0` disables scaling.
   *
   * **Note:** Only supported when the Metal rendering driver is in use, which limits this scaling mode to macOS and iOS.
   *
   */
  static VIEWPORT_SCALING_3D_MODE_METALFX_SPATIAL: any

  /**
   * Use MetalFX temporal upscaling for the viewport's 3D buffer. The amount of scaling can be set using [member Viewport.scaling_3d_scale]. Values less than `1.0` will result in the viewport being upscaled using MetalFX. Values greater than `1.0` are not supported and bilinear downsampling will be used instead. A value of `1.0` will use MetalFX at native resolution as a TAA solution.
   *
   * **Note:** Only supported when the Metal rendering driver is in use, which limits this scaling mode to macOS and iOS.
   *
   */
  static VIEWPORT_SCALING_3D_MODE_METALFX_TEMPORAL: any

  /**
   * Represents the size of the [enum ViewportScaling3DMode] enum.
   *
   */
  static VIEWPORT_SCALING_3D_MODE_MAX: any

  /**
   * Do not update the viewport's render target.
   *
   */
  static VIEWPORT_UPDATE_DISABLED: any

  /**
   * Update the viewport's render target once, then switch to [constant VIEWPORT_UPDATE_DISABLED].
   *
   */
  static VIEWPORT_UPDATE_ONCE: any

  /**
   * Update the viewport's render target only when it is visible. This is the default value.
   *
   */
  static VIEWPORT_UPDATE_WHEN_VISIBLE: any

  /**
   * Update the viewport's render target only when its parent is visible.
   *
   */
  static VIEWPORT_UPDATE_WHEN_PARENT_VISIBLE: any

  /**
   * Always update the viewport's render target.
   *
   */
  static VIEWPORT_UPDATE_ALWAYS: any

  /**
   * Always clear the viewport's render target before drawing.
   *
   */
  static VIEWPORT_CLEAR_ALWAYS: any

  /**
   * Never clear the viewport's render target.
   *
   */
  static VIEWPORT_CLEAR_NEVER: any

  /**
   * Clear the viewport's render target on the next frame, then switch to [constant VIEWPORT_CLEAR_NEVER].
   *
   */
  static VIEWPORT_CLEAR_ONLY_NEXT_FRAME: any

  /**
   * Disable rendering of 3D environment over 2D canvas.
   *
   */
  static VIEWPORT_ENVIRONMENT_DISABLED: any

  /**
   * Enable rendering of 3D environment over 2D canvas.
   *
   */
  static VIEWPORT_ENVIRONMENT_ENABLED: any

  /**
   * Inherit enable/disable value from parent. If the topmost parent is also set to [constant VIEWPORT_ENVIRONMENT_INHERIT], then this has the same behavior as [constant VIEWPORT_ENVIRONMENT_ENABLED].
   *
   */
  static VIEWPORT_ENVIRONMENT_INHERIT: any

  /**
   * Represents the size of the [enum ViewportEnvironmentMode] enum.
   *
   */
  static VIEWPORT_ENVIRONMENT_MAX: any

  /**
   * Do not oversize the 2D signed distance field. Occluders may disappear when touching the viewport's edges, and [GPUParticles3D] collision may stop working earlier than intended. This has the lowest GPU requirements.
   *
   */
  static VIEWPORT_SDF_OVERSIZE_100_PERCENT: any

  /**
   * 2D signed distance field covers 20% of the viewport's size outside the viewport on each side (top, right, bottom, left).
   *
   */
  static VIEWPORT_SDF_OVERSIZE_120_PERCENT: any

  /**
   * 2D signed distance field covers 50% of the viewport's size outside the viewport on each side (top, right, bottom, left).
   *
   */
  static VIEWPORT_SDF_OVERSIZE_150_PERCENT: any

  /**
   * 2D signed distance field covers 100% of the viewport's size outside the viewport on each side (top, right, bottom, left). This has the highest GPU requirements.
   *
   */
  static VIEWPORT_SDF_OVERSIZE_200_PERCENT: any

  /**
   * Represents the size of the [enum ViewportSDFOversize] enum.
   *
   */
  static VIEWPORT_SDF_OVERSIZE_MAX: any

  /**
   * Full resolution 2D signed distance field scale. This has the highest GPU requirements.
   *
   */
  static VIEWPORT_SDF_SCALE_100_PERCENT: any

  /**
   * Half resolution 2D signed distance field scale on each axis (25% of the viewport pixel count).
   *
   */
  static VIEWPORT_SDF_SCALE_50_PERCENT: any

  /**
   * Quarter resolution 2D signed distance field scale on each axis (6.25% of the viewport pixel count). This has the lowest GPU requirements.
   *
   */
  static VIEWPORT_SDF_SCALE_25_PERCENT: any

  /**
   * Represents the size of the [enum ViewportSDFScale] enum.
   *
   */
  static VIEWPORT_SDF_SCALE_MAX: any

  /**
   * Multisample antialiasing for 3D is disabled. This is the default value, and also the fastest setting.
   *
   */
  static VIEWPORT_MSAA_DISABLED: any

  /**
   * Multisample antialiasing uses 2 samples per pixel for 3D. This has a moderate impact on performance.
   *
   */
  static VIEWPORT_MSAA_2X: any

  /**
   * Multisample antialiasing uses 4 samples per pixel for 3D. This has a high impact on performance.
   *
   */
  static VIEWPORT_MSAA_4X: any

  /**
   * Multisample antialiasing uses 8 samples per pixel for 3D. This has a very high impact on performance. Likely unsupported on low-end and older hardware.
   *
   */
  static VIEWPORT_MSAA_8X: any

  /**
   * Represents the size of the [enum ViewportMSAA] enum.
   *
   */
  static VIEWPORT_MSAA_MAX: any

  /**
   * Anisotropic filtering is disabled.
   *
   */
  static VIEWPORT_ANISOTROPY_DISABLED: any

  /**
   * Use 2× anisotropic filtering.
   *
   */
  static VIEWPORT_ANISOTROPY_2X: any

  /**
   * Use 4× anisotropic filtering. This is the default value.
   *
   */
  static VIEWPORT_ANISOTROPY_4X: any

  /**
   * Use 8× anisotropic filtering.
   *
   */
  static VIEWPORT_ANISOTROPY_8X: any

  /**
   * Use 16× anisotropic filtering.
   *
   */
  static VIEWPORT_ANISOTROPY_16X: any

  /**
   * Represents the size of the [enum ViewportAnisotropicFiltering] enum.
   *
   */
  static VIEWPORT_ANISOTROPY_MAX: any

  /**
   * Do not perform any antialiasing in the full screen post-process.
   *
   */
  static VIEWPORT_SCREEN_SPACE_AA_DISABLED: any

  /**
   * Use fast approximate antialiasing. FXAA is a popular screen-space antialiasing method, which is fast but will make the image look blurry, especially at lower resolutions. It can still work relatively well at large resolutions such as 1440p and 4K.
   *
   */
  static VIEWPORT_SCREEN_SPACE_AA_FXAA: any

  /**
   * Use subpixel morphological antialiasing. SMAA may produce clearer results than FXAA, but at a slightly higher performance cost.
   *
   */
  static VIEWPORT_SCREEN_SPACE_AA_SMAA: any

  /**
   * Represents the size of the [enum ViewportScreenSpaceAA] enum.
   *
   */
  static VIEWPORT_SCREEN_SPACE_AA_MAX: any

  /**
   * Low occlusion culling BVH build quality (as defined by Embree). Results in the lowest CPU usage, but least effective culling.
   *
   */
  static VIEWPORT_OCCLUSION_BUILD_QUALITY_LOW: any

  /**
   * Medium occlusion culling BVH build quality (as defined by Embree).
   *
   */
  static VIEWPORT_OCCLUSION_BUILD_QUALITY_MEDIUM: any

  /**
   * High occlusion culling BVH build quality (as defined by Embree). Results in the highest CPU usage, but most effective culling.
   *
   */
  static VIEWPORT_OCCLUSION_BUILD_QUALITY_HIGH: any

  /**
   * Number of objects drawn in a single frame.
   *
   */
  static VIEWPORT_RENDER_INFO_OBJECTS_IN_FRAME: any

  /**
   * Number of points, lines, or triangles drawn in a single frame.
   *
   */
  static VIEWPORT_RENDER_INFO_PRIMITIVES_IN_FRAME: any

  /**
   * Number of draw calls during this frame.
   *
   */
  static VIEWPORT_RENDER_INFO_DRAW_CALLS_IN_FRAME: any

  /**
   * Represents the size of the [enum ViewportRenderInfo] enum.
   *
   */
  static VIEWPORT_RENDER_INFO_MAX: any

  /**
   * Visible render pass (excluding shadows).
   *
   */
  static VIEWPORT_RENDER_INFO_TYPE_VISIBLE: any

  /**
   * Shadow render pass. Objects will be rendered several times depending on the number of amounts of lights with shadows and the number of directional shadow splits.
   *
   */
  static VIEWPORT_RENDER_INFO_TYPE_SHADOW: any

  /**
   * Canvas item rendering. This includes all 2D rendering.
   *
   */
  static VIEWPORT_RENDER_INFO_TYPE_CANVAS: any

  /**
   * Represents the size of the [enum ViewportRenderInfoType] enum.
   *
   */
  static VIEWPORT_RENDER_INFO_TYPE_MAX: any

  /**
   * Debug draw is disabled. Default setting.
   *
   */
  static VIEWPORT_DEBUG_DRAW_DISABLED: any

  /**
   * Objects are displayed without light information.
   *
   */
  static VIEWPORT_DEBUG_DRAW_UNSHADED: any

  /**
   * Objects are displayed with only light information.
   *
   * **Note:** When using this debug draw mode, custom shaders are ignored since all materials in the scene temporarily use a debug material. This means the result from custom shader functions (such as vertex displacement) won't be visible anymore when using this debug draw mode.
   *
   */
  static VIEWPORT_DEBUG_DRAW_LIGHTING: any

  /**
   * Objects are displayed semi-transparent with additive blending so you can see where they are drawing over top of one another. A higher overdraw (represented by brighter colors) means you are wasting performance on drawing pixels that are being hidden behind others.
   *
   * **Note:** When using this debug draw mode, custom shaders are ignored since all materials in the scene temporarily use a debug material. This means the result from custom shader functions (such as vertex displacement) won't be visible anymore when using this debug draw mode.
   *
   */
  static VIEWPORT_DEBUG_DRAW_OVERDRAW: any

  /**
   * Debug draw draws objects in wireframe.
   *
   * **Note:** [method set_debug_generate_wireframes] must be called before loading any meshes for wireframes to be visible when using the Compatibility renderer.
   *
   */
  static VIEWPORT_DEBUG_DRAW_WIREFRAME: any

  /**
   * Normal buffer is drawn instead of regular scene so you can see the per-pixel normals that will be used by post-processing effects.
   *
   */
  static VIEWPORT_DEBUG_DRAW_NORMAL_BUFFER: any

  /**
   * Objects are displayed with only the albedo value from [VoxelGI]s. Requires at least one visible [VoxelGI] node that has been baked to have a visible effect.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_VOXEL_GI_ALBEDO: any

  /**
   * Objects are displayed with only the lighting value from [VoxelGI]s. Requires at least one visible [VoxelGI] node that has been baked to have a visible effect.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_VOXEL_GI_LIGHTING: any

  /**
   * Objects are displayed with only the emission color from [VoxelGI]s. Requires at least one visible [VoxelGI] node that has been baked to have a visible effect.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_VOXEL_GI_EMISSION: any

  /**
   * Draws the shadow atlas that stores shadows from [OmniLight3D]s and [SpotLight3D]s in the upper left quadrant of the [Viewport].
   *
   */
  static VIEWPORT_DEBUG_DRAW_SHADOW_ATLAS: any

  /**
   * Draws the shadow atlas that stores shadows from [DirectionalLight3D]s in the upper left quadrant of the [Viewport].
   *
   * The slice of the camera frustum related to the shadow map cascade is superimposed to visualize coverage. The color of each slice matches the colors used for [constant VIEWPORT_DEBUG_DRAW_PSSM_SPLITS]. When shadow cascades are blended the overlap is taken into account when drawing the frustum slices.
   *
   * The last cascade shows all frustum slices to illustrate the coverage of all slices.
   *
   */
  static VIEWPORT_DEBUG_DRAW_DIRECTIONAL_SHADOW_ATLAS: any

  /**
   * Draws the estimated scene luminance. This is a 1×1 texture that is generated when autoexposure is enabled to control the scene's exposure.
   *
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   *
   */
  static VIEWPORT_DEBUG_DRAW_SCENE_LUMINANCE: any

  /**
   * Draws the screen space ambient occlusion texture instead of the scene so that you can clearly see how it is affecting objects. In order for this display mode to work, you must have [member Environment.ssao_enabled] set in your [WorldEnvironment].
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_SSAO: any

  /**
   * Draws the screen space indirect lighting texture instead of the scene so that you can clearly see how it is affecting objects. In order for this display mode to work, you must have [member Environment.ssil_enabled] set in your [WorldEnvironment].
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_SSIL: any

  /**
   * Colors each PSSM split for the [DirectionalLight3D]s in the scene a different color so you can see where the splits are. In order (from closest to furthest from the camera), they are colored red, green, blue, and yellow.
   *
   * **Note:** When using this debug draw mode, custom shaders are ignored since all materials in the scene temporarily use a debug material. This means the result from custom shader functions (such as vertex displacement) won't be visible anymore when using this debug draw mode.
   *
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   *
   */
  static VIEWPORT_DEBUG_DRAW_PSSM_SPLITS: any

  /**
   * Draws the decal atlas that stores decal textures from [Decal]s.
   *
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   *
   */
  static VIEWPORT_DEBUG_DRAW_DECAL_ATLAS: any

  /**
   * Draws SDFGI cascade data. This is the data structure that is used to bounce lighting against and create reflections.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_SDFGI: any

  /**
   * Draws SDFGI probe data. This is the data structure that is used to give indirect lighting dynamic objects moving within the scene.
   *
   * When in the editor, left-clicking a probe will display additional bright dots that show its occlusion information. A white dot means the light is not occluded at all at the dot's position, while a red dot means the light is fully occluded. Intermediate values are possible.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_SDFGI_PROBES: any

  /**
   * Draws the global illumination buffer from [VoxelGI] or SDFGI. Requires [VoxelGI] (at least one visible baked VoxelGI node) or SDFGI ([member Environment.sdfgi_enabled]) to be enabled to have a visible effect.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_GI_BUFFER: any

  /**
   * Disable mesh LOD. All meshes are drawn with full detail, which can be used to compare performance.
   *
   */
  static VIEWPORT_DEBUG_DRAW_DISABLE_LOD: any

  /**
   * Draws the [OmniLight3D] cluster. Clustering determines where lights are positioned in screen-space, which allows the engine to only process these portions of the screen for lighting.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_CLUSTER_OMNI_LIGHTS: any

  /**
   * Draws the [SpotLight3D] cluster. Clustering determines where lights are positioned in screen-space, which allows the engine to only process these portions of the screen for lighting.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_CLUSTER_SPOT_LIGHTS: any

  /**
   * Draws the [Decal] cluster. Clustering determines where decals are positioned in screen-space, which allows the engine to only process these portions of the screen for decals.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_CLUSTER_DECALS: any

  /**
   * Draws the [ReflectionProbe] cluster. Clustering determines where reflection probes are positioned in screen-space, which allows the engine to only process these portions of the screen for reflection probes.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_CLUSTER_REFLECTION_PROBES: any

  /**
   * Draws the occlusion culling buffer. This low-resolution occlusion culling buffer is rasterized on the CPU and is used to check whether instances are occluded by other objects.
   *
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   *
   */
  static VIEWPORT_DEBUG_DRAW_OCCLUDERS: any

  /**
   * Draws the motion vectors buffer. This is used by temporal antialiasing to correct for motion that occurs during gameplay.
   *
   * **Note:** Only supported when using the Forward+ rendering method.
   *
   */
  static VIEWPORT_DEBUG_DRAW_MOTION_VECTORS: any

  /**
   * Internal buffer is drawn instead of regular scene so you can see the per-pixel output that will be used by post-processing effects.
   *
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   *
   */
  static VIEWPORT_DEBUG_DRAW_INTERNAL_BUFFER: any

  /**
   * Variable rate shading is disabled.
   *
   */
  static VIEWPORT_VRS_DISABLED: any

  /**
   * Variable rate shading uses a texture. Note, for stereoscopic use a texture atlas with a texture for each view.
   *
   */
  static VIEWPORT_VRS_TEXTURE: any

  /**
   * Variable rate shading texture is supplied by the primary [XRInterface]. Note that this may override the update mode.
   *
   */
  static VIEWPORT_VRS_XR: any

  /**
   * Represents the size of the [enum ViewportVRSMode] enum.
   *
   */
  static VIEWPORT_VRS_MAX: any

  /**
   * The input texture for variable rate shading will not be processed.
   *
   */
  static VIEWPORT_VRS_UPDATE_DISABLED: any

  /**
   * The input texture for variable rate shading will be processed once.
   *
   */
  static VIEWPORT_VRS_UPDATE_ONCE: any

  /**
   * The input texture for variable rate shading will be processed each frame.
   *
   */
  static VIEWPORT_VRS_UPDATE_ALWAYS: any

  /**
   * Represents the size of the [enum ViewportVRSUpdateMode] enum.
   *
   */
  static VIEWPORT_VRS_UPDATE_MAX: any

  /**
   * Automatically selects the appropriate process mode based on your sky shader. If your shader uses `TIME` or `POSITION`, this will use [constant SKY_MODE_REALTIME]. If your shader uses any of the `LIGHT_*` variables or any custom uniforms, this uses [constant SKY_MODE_INCREMENTAL]. Otherwise, this defaults to [constant SKY_MODE_QUALITY].
   *
   */
  static SKY_MODE_AUTOMATIC: any

  /**
   * Uses high quality importance sampling to process the radiance map. In general, this results in much higher quality than [constant SKY_MODE_REALTIME] but takes much longer to generate. This should not be used if you plan on changing the sky at runtime. If you are finding that the reflection is not blurry enough and is showing sparkles or fireflies, try increasing [member ProjectSettings.rendering/reflections/sky_reflections/ggx_samples].
   *
   */
  static SKY_MODE_QUALITY: any

  /**
   * Uses the same high quality importance sampling to process the radiance map as [constant SKY_MODE_QUALITY], but updates over several frames. The number of frames is determined by [member ProjectSettings.rendering/reflections/sky_reflections/roughness_layers]. Use this when you need highest quality radiance maps, but have a sky that updates slowly.
   *
   */
  static SKY_MODE_INCREMENTAL: any

  /**
   * Uses the fast filtering algorithm to process the radiance map. In general this results in lower quality, but substantially faster run times. If you need better quality, but still need to update the sky every frame, consider turning on [member ProjectSettings.rendering/reflections/sky_reflections/fast_filter_high_quality].
   *
   * **Note:** The fast filtering algorithm is limited to 256×256 cubemaps, so [method sky_set_radiance_size] must be set to `256`. Otherwise, a warning is printed and the overridden radiance size is ignored.
   *
   */
  static SKY_MODE_REALTIME: any

  /**
   * The rendering effect requires the color buffer to be resolved if MSAA is enabled.
   *
   */
  static COMPOSITOR_EFFECT_FLAG_ACCESS_RESOLVED_COLOR: any

  /**
   * The rendering effect requires the depth buffer to be resolved if MSAA is enabled.
   *
   */
  static COMPOSITOR_EFFECT_FLAG_ACCESS_RESOLVED_DEPTH: any

  /**
   * The rendering effect requires motion vectors to be produced.
   *
   */
  static COMPOSITOR_EFFECT_FLAG_NEEDS_MOTION_VECTORS: any

  /**
   * The rendering effect requires normals and roughness g-buffer to be produced (Forward+ only).
   *
   */
  static COMPOSITOR_EFFECT_FLAG_NEEDS_ROUGHNESS: any

  /**
   * The rendering effect requires specular data to be separated out (Forward+ only).
   *
   */
  static COMPOSITOR_EFFECT_FLAG_NEEDS_SEPARATE_SPECULAR: any

  /**
   * The callback is called before our opaque rendering pass, but after depth prepass (if applicable).
   *
   */
  static COMPOSITOR_EFFECT_CALLBACK_TYPE_PRE_OPAQUE: any

  /**
   * The callback is called after our opaque rendering pass, but before our sky is rendered.
   *
   */
  static COMPOSITOR_EFFECT_CALLBACK_TYPE_POST_OPAQUE: any

  /**
   * The callback is called after our sky is rendered, but before our back buffers are created (and if enabled, before subsurface scattering and/or screen space reflections).
   *
   */
  static COMPOSITOR_EFFECT_CALLBACK_TYPE_POST_SKY: any

  /**
   * The callback is called before our transparent rendering pass, but after our sky is rendered and we've created our back buffers.
   *
   */
  static COMPOSITOR_EFFECT_CALLBACK_TYPE_PRE_TRANSPARENT: any

  /**
   * The callback is called after our transparent rendering pass, but before any built-in post-processing effects and output to our render target.
   *
   */
  static COMPOSITOR_EFFECT_CALLBACK_TYPE_POST_TRANSPARENT: any

  /** No documentation provided. */
  static COMPOSITOR_EFFECT_CALLBACK_TYPE_ANY: any

  /**
   * Use the clear color as background.
   *
   */
  static ENV_BG_CLEAR_COLOR: any

  /**
   * Use a specified color as the background.
   *
   */
  static ENV_BG_COLOR: any

  /**
   * Use a sky resource for the background.
   *
   */
  static ENV_BG_SKY: any

  /**
   * Use a specified canvas layer as the background. This can be useful for instantiating a 2D scene in a 3D world.
   *
   */
  static ENV_BG_CANVAS: any

  /**
   * Do not clear the background, use whatever was rendered last frame as the background.
   *
   */
  static ENV_BG_KEEP: any

  /**
   * Displays a camera feed in the background.
   *
   */
  static ENV_BG_CAMERA_FEED: any

  /**
   * Represents the size of the [enum EnvironmentBG] enum.
   *
   */
  static ENV_BG_MAX: any

  /**
   * Gather ambient light from whichever source is specified as the background.
   *
   */
  static ENV_AMBIENT_SOURCE_BG: any

  /**
   * Disable ambient light.
   *
   */
  static ENV_AMBIENT_SOURCE_DISABLED: any

  /**
   * Specify a specific [Color] for ambient light.
   *
   */
  static ENV_AMBIENT_SOURCE_COLOR: any

  /**
   * Gather ambient light from the [Sky] regardless of what the background is.
   *
   */
  static ENV_AMBIENT_SOURCE_SKY: any

  /**
   * Use the background for reflections.
   *
   */
  static ENV_REFLECTION_SOURCE_BG: any

  /**
   * Disable reflections.
   *
   */
  static ENV_REFLECTION_SOURCE_DISABLED: any

  /**
   * Use the [Sky] for reflections regardless of what the background is.
   *
   */
  static ENV_REFLECTION_SOURCE_SKY: any

  /**
   * Additive glow blending mode. Mostly used for particles, glows (bloom), lens flare, bright sources.
   *
   */
  static ENV_GLOW_BLEND_MODE_ADDITIVE: any

  /**
   * Screen glow blending mode. Increases brightness, used frequently with bloom.
   *
   */
  static ENV_GLOW_BLEND_MODE_SCREEN: any

  /**
   * Soft light glow blending mode. Modifies contrast, exposes shadows and highlights (vivid bloom).
   *
   */
  static ENV_GLOW_BLEND_MODE_SOFTLIGHT: any

  /**
   * Replace glow blending mode. Replaces all pixels' color by the glow value. This can be used to simulate a full-screen blur effect by tweaking the glow parameters to match the original image's brightness.
   *
   */
  static ENV_GLOW_BLEND_MODE_REPLACE: any

  /**
   * Mixes the glow with the underlying color to avoid increasing brightness as much while still maintaining a glow effect.
   *
   */
  static ENV_GLOW_BLEND_MODE_MIX: any

  /**
   * Use a physically-based fog model defined primarily by fog density.
   *
   */
  static ENV_FOG_MODE_EXPONENTIAL: any

  /**
   * Use a simple fog model defined by start and end positions and a custom curve. While not physically accurate, this model can be useful when you need more artistic control.
   *
   */
  static ENV_FOG_MODE_DEPTH: any

  /**
   * Does not modify color data, resulting in a linear tonemapping curve which unnaturally clips bright values, causing bright lighting to look blown out. The simplest and fastest tonemapper.
   *
   */
  static ENV_TONE_MAPPER_LINEAR: any

  /**
   * A simple tonemapping curve that rolls off bright values to prevent clipping. This results in an image that can appear dull and low contrast. Slower than [constant ENV_TONE_MAPPER_LINEAR].
   *
   * **Note:** When [member Environment.tonemap_white] is left at the default value of `1.0`, [constant ENV_TONE_MAPPER_REINHARD] produces an identical image to [constant ENV_TONE_MAPPER_LINEAR].
   *
   */
  static ENV_TONE_MAPPER_REINHARD: any

  /**
   * Uses a film-like tonemapping curve to prevent clipping of bright values and provide better contrast than [constant ENV_TONE_MAPPER_REINHARD]. Slightly slower than [constant ENV_TONE_MAPPER_REINHARD].
   *
   */
  static ENV_TONE_MAPPER_FILMIC: any

  /**
   * Uses a high-contrast film-like tonemapping curve and desaturates bright values for a more realistic appearance. Slightly slower than [constant ENV_TONE_MAPPER_FILMIC].
   *
   * **Note:** This tonemapping operator is called "ACES Fitted" in Godot 3.x.
   *
   */
  static ENV_TONE_MAPPER_ACES: any

  /**
   * Uses an adjustable film-like tonemapping curve and desaturates bright values for a more realistic appearance. Better than other tonemappers at maintaining the hue of colors as they become brighter. The slowest tonemapping option.
   *
   */
  static ENV_TONE_MAPPER_AGX: any

  /**
   * Lowest quality of roughness filter for screen-space reflections. Rough materials will not have blurrier screen-space reflections compared to smooth (non-rough) materials. This is the fastest option.
   *
   */
  static ENV_SSR_ROUGHNESS_QUALITY_DISABLED: any

  /**
   * Low quality of roughness filter for screen-space reflections.
   *
   */
  static ENV_SSR_ROUGHNESS_QUALITY_LOW: any

  /**
   * Medium quality of roughness filter for screen-space reflections.
   *
   */
  static ENV_SSR_ROUGHNESS_QUALITY_MEDIUM: any

  /**
   * High quality of roughness filter for screen-space reflections. This is the slowest option.
   *
   */
  static ENV_SSR_ROUGHNESS_QUALITY_HIGH: any

  /**
   * Lowest quality of screen-space ambient occlusion.
   *
   */
  static ENV_SSAO_QUALITY_VERY_LOW: any

  /**
   * Low quality screen-space ambient occlusion.
   *
   */
  static ENV_SSAO_QUALITY_LOW: any

  /**
   * Medium quality screen-space ambient occlusion.
   *
   */
  static ENV_SSAO_QUALITY_MEDIUM: any

  /**
   * High quality screen-space ambient occlusion.
   *
   */
  static ENV_SSAO_QUALITY_HIGH: any

  /**
   * Highest quality screen-space ambient occlusion. Uses the adaptive target setting which can be dynamically adjusted to smoothly balance performance and visual quality.
   *
   */
  static ENV_SSAO_QUALITY_ULTRA: any

  /**
   * Lowest quality of screen-space indirect lighting.
   *
   */
  static ENV_SSIL_QUALITY_VERY_LOW: any

  /**
   * Low quality screen-space indirect lighting.
   *
   */
  static ENV_SSIL_QUALITY_LOW: any

  /**
   * High quality screen-space indirect lighting.
   *
   */
  static ENV_SSIL_QUALITY_MEDIUM: any

  /**
   * High quality screen-space indirect lighting.
   *
   */
  static ENV_SSIL_QUALITY_HIGH: any

  /**
   * Highest quality screen-space indirect lighting. Uses the adaptive target setting which can be dynamically adjusted to smoothly balance performance and visual quality.
   *
   */
  static ENV_SSIL_QUALITY_ULTRA: any

  /**
   * Use 50% scale for SDFGI on the Y (vertical) axis. SDFGI cells will be twice as short as they are wide. This allows providing increased GI detail and reduced light leaking with thin floors and ceilings. This is usually the best choice for scenes that don't feature much verticality.
   *
   */
  static ENV_SDFGI_Y_SCALE_50_PERCENT: any

  /**
   * Use 75% scale for SDFGI on the Y (vertical) axis. This is a balance between the 50% and 100% SDFGI Y scales.
   *
   */
  static ENV_SDFGI_Y_SCALE_75_PERCENT: any

  /**
   * Use 100% scale for SDFGI on the Y (vertical) axis. SDFGI cells will be as tall as they are wide. This is usually the best choice for highly vertical scenes. The downside is that light leaking may become more noticeable with thin floors and ceilings.
   *
   */
  static ENV_SDFGI_Y_SCALE_100_PERCENT: any

  /**
   * Throw 4 rays per frame when converging SDFGI. This has the lowest GPU requirements, but creates the most noisy result.
   *
   */
  static ENV_SDFGI_RAY_COUNT_4: any

  /**
   * Throw 8 rays per frame when converging SDFGI.
   *
   */
  static ENV_SDFGI_RAY_COUNT_8: any

  /**
   * Throw 16 rays per frame when converging SDFGI.
   *
   */
  static ENV_SDFGI_RAY_COUNT_16: any

  /**
   * Throw 32 rays per frame when converging SDFGI.
   *
   */
  static ENV_SDFGI_RAY_COUNT_32: any

  /**
   * Throw 64 rays per frame when converging SDFGI.
   *
   */
  static ENV_SDFGI_RAY_COUNT_64: any

  /**
   * Throw 96 rays per frame when converging SDFGI. This has high GPU requirements.
   *
   */
  static ENV_SDFGI_RAY_COUNT_96: any

  /**
   * Throw 128 rays per frame when converging SDFGI. This has very high GPU requirements, but creates the least noisy result.
   *
   */
  static ENV_SDFGI_RAY_COUNT_128: any

  /**
   * Represents the size of the [enum EnvironmentSDFGIRayCount] enum.
   *
   */
  static ENV_SDFGI_RAY_COUNT_MAX: any

  /**
   * Converge SDFGI over 5 frames. This is the most responsive, but creates the most noisy result with a given ray count.
   *
   */
  static ENV_SDFGI_CONVERGE_IN_5_FRAMES: any

  /**
   * Configure SDFGI to fully converge over 10 frames.
   *
   */
  static ENV_SDFGI_CONVERGE_IN_10_FRAMES: any

  /**
   * Configure SDFGI to fully converge over 15 frames.
   *
   */
  static ENV_SDFGI_CONVERGE_IN_15_FRAMES: any

  /**
   * Configure SDFGI to fully converge over 20 frames.
   *
   */
  static ENV_SDFGI_CONVERGE_IN_20_FRAMES: any

  /**
   * Configure SDFGI to fully converge over 25 frames.
   *
   */
  static ENV_SDFGI_CONVERGE_IN_25_FRAMES: any

  /**
   * Configure SDFGI to fully converge over 30 frames. This is the least responsive, but creates the least noisy result with a given ray count.
   *
   */
  static ENV_SDFGI_CONVERGE_IN_30_FRAMES: any

  /**
   * Represents the size of the [enum EnvironmentSDFGIFramesToConverge] enum.
   *
   */
  static ENV_SDFGI_CONVERGE_MAX: any

  /**
   * Update indirect light from dynamic lights in SDFGI over 1 frame. This is the most responsive, but has the highest GPU requirements.
   *
   */
  static ENV_SDFGI_UPDATE_LIGHT_IN_1_FRAME: any

  /**
   * Update indirect light from dynamic lights in SDFGI over 2 frames.
   *
   */
  static ENV_SDFGI_UPDATE_LIGHT_IN_2_FRAMES: any

  /**
   * Update indirect light from dynamic lights in SDFGI over 4 frames.
   *
   */
  static ENV_SDFGI_UPDATE_LIGHT_IN_4_FRAMES: any

  /**
   * Update indirect light from dynamic lights in SDFGI over 8 frames.
   *
   */
  static ENV_SDFGI_UPDATE_LIGHT_IN_8_FRAMES: any

  /**
   * Update indirect light from dynamic lights in SDFGI over 16 frames. This is the least responsive, but has the lowest GPU requirements.
   *
   */
  static ENV_SDFGI_UPDATE_LIGHT_IN_16_FRAMES: any

  /**
   * Represents the size of the [enum EnvironmentSDFGIFramesToUpdateLight] enum.
   *
   */
  static ENV_SDFGI_UPDATE_LIGHT_MAX: any

  /**
   * Disables subsurface scattering entirely, even on materials that have [member BaseMaterial3D.subsurf_scatter_enabled] set to `true`. This has the lowest GPU requirements.
   *
   */
  static SUB_SURFACE_SCATTERING_QUALITY_DISABLED: any

  /**
   * Low subsurface scattering quality.
   *
   */
  static SUB_SURFACE_SCATTERING_QUALITY_LOW: any

  /**
   * Medium subsurface scattering quality.
   *
   */
  static SUB_SURFACE_SCATTERING_QUALITY_MEDIUM: any

  /**
   * High subsurface scattering quality. This has the highest GPU requirements.
   *
   */
  static SUB_SURFACE_SCATTERING_QUALITY_HIGH: any

  /**
   * Calculate the DOF blur using a box filter. The fastest option, but results in obvious lines in blur pattern.
   *
   */
  static DOF_BOKEH_BOX: any

  /**
   * Calculates DOF blur using a hexagon shaped filter.
   *
   */
  static DOF_BOKEH_HEXAGON: any

  /**
   * Calculates DOF blur using a circle shaped filter. Best quality and most realistic, but slowest. Use only for areas where a lot of performance can be dedicated to post-processing (e.g. cutscenes).
   *
   */
  static DOF_BOKEH_CIRCLE: any

  /**
   * Lowest quality DOF blur. This is the fastest setting, but you may be able to see filtering artifacts.
   *
   */
  static DOF_BLUR_QUALITY_VERY_LOW: any

  /**
   * Low quality DOF blur.
   *
   */
  static DOF_BLUR_QUALITY_LOW: any

  /**
   * Medium quality DOF blur.
   *
   */
  static DOF_BLUR_QUALITY_MEDIUM: any

  /**
   * Highest quality DOF blur. Results in the smoothest looking blur by taking the most samples, but is also significantly slower.
   *
   */
  static DOF_BLUR_QUALITY_HIGH: any

  /**
   * The instance does not have a type.
   *
   */
  static INSTANCE_NONE: any

  /**
   * The instance is a mesh.
   *
   */
  static INSTANCE_MESH: any

  /**
   * The instance is a multimesh.
   *
   */
  static INSTANCE_MULTIMESH: any

  /**
   * The instance is a particle emitter.
   *
   */
  static INSTANCE_PARTICLES: any

  /**
   * The instance is a GPUParticles collision shape.
   *
   */
  static INSTANCE_PARTICLES_COLLISION: any

  /**
   * The instance is a light.
   *
   */
  static INSTANCE_LIGHT: any

  /**
   * The instance is a reflection probe.
   *
   */
  static INSTANCE_REFLECTION_PROBE: any

  /**
   * The instance is a decal.
   *
   */
  static INSTANCE_DECAL: any

  /**
   * The instance is a VoxelGI.
   *
   */
  static INSTANCE_VOXEL_GI: any

  /**
   * The instance is a lightmap.
   *
   */
  static INSTANCE_LIGHTMAP: any

  /**
   * The instance is an occlusion culling occluder.
   *
   */
  static INSTANCE_OCCLUDER: any

  /**
   * The instance is a visible on-screen notifier.
   *
   */
  static INSTANCE_VISIBLITY_NOTIFIER: any

  /**
   * The instance is a fog volume.
   *
   */
  static INSTANCE_FOG_VOLUME: any

  /**
   * Represents the size of the [enum InstanceType] enum.
   *
   */
  static INSTANCE_MAX: any

  /**
   * A combination of the flags of geometry instances (mesh, multimesh, immediate and particles).
   *
   */
  static INSTANCE_GEOMETRY_MASK: any

  /**
   * Allows the instance to be used in baked lighting.
   *
   */
  static INSTANCE_FLAG_USE_BAKED_LIGHT: any

  /**
   * Allows the instance to be used with dynamic global illumination.
   *
   */
  static INSTANCE_FLAG_USE_DYNAMIC_GI: any

  /**
   * When set, manually requests to draw geometry on next frame.
   *
   */
  static INSTANCE_FLAG_DRAW_NEXT_FRAME_IF_VISIBLE: any

  /**
   * Always draw, even if the instance would be culled by occlusion culling. Does not affect view frustum culling.
   *
   */
  static INSTANCE_FLAG_IGNORE_OCCLUSION_CULLING: any

  /**
   * Represents the size of the [enum InstanceFlags] enum.
   *
   */
  static INSTANCE_FLAG_MAX: any

  /**
   * Disable shadows from this instance.
   *
   */
  static SHADOW_CASTING_SETTING_OFF: any

  /**
   * Cast shadows from this instance.
   *
   */
  static SHADOW_CASTING_SETTING_ON: any

  /**
   * Disable backface culling when rendering the shadow of the object. This is slightly slower but may result in more correct shadows.
   *
   */
  static SHADOW_CASTING_SETTING_DOUBLE_SIDED: any

  /**
   * Only render the shadows from the object. The object itself will not be drawn.
   *
   */
  static SHADOW_CASTING_SETTING_SHADOWS_ONLY: any

  /**
   * Disable visibility range fading for the given instance.
   *
   */
  static VISIBILITY_RANGE_FADE_DISABLED: any

  /**
   * Fade-out the given instance when it approaches its visibility range limits.
   *
   */
  static VISIBILITY_RANGE_FADE_SELF: any

  /**
   * Fade-in the given instance's dependencies when reaching its visibility range limits.
   *
   */
  static VISIBILITY_RANGE_FADE_DEPENDENCIES: any

  /**
   * Index of [Image] in array of [Image]s returned by [method bake_render_uv2]. Image uses [constant Image.FORMAT_RGBA8] and contains albedo color in the `.rgb` channels and alpha in the `.a` channel.
   *
   */
  static BAKE_CHANNEL_ALBEDO_ALPHA: any

  /**
   * Index of [Image] in array of [Image]s returned by [method bake_render_uv2]. Image uses [constant Image.FORMAT_RGBA8] and contains the per-pixel normal of the object in the `.rgb` channels and nothing in the `.a` channel. The per-pixel normal is encoded as `normal * 0.5 + 0.5`.
   *
   */
  static BAKE_CHANNEL_NORMAL: any

  /**
   * Index of [Image] in array of [Image]s returned by [method bake_render_uv2]. Image uses [constant Image.FORMAT_RGBA8] and contains ambient occlusion (from material and decals only) in the `.r` channel, roughness in the `.g` channel, metallic in the `.b` channel and sub surface scattering amount in the `.a` channel.
   *
   */
  static BAKE_CHANNEL_ORM: any

  /**
   * Index of [Image] in array of [Image]s returned by [method bake_render_uv2]. Image uses [constant Image.FORMAT_RGBAH] and contains emission color in the `.rgb` channels and nothing in the `.a` channel.
   *
   */
  static BAKE_CHANNEL_EMISSION: any

  /**
   * Diffuse canvas texture ([member CanvasTexture.diffuse_texture]).
   *
   */
  static CANVAS_TEXTURE_CHANNEL_DIFFUSE: any

  /**
   * Normal map canvas texture ([member CanvasTexture.normal_texture]).
   *
   */
  static CANVAS_TEXTURE_CHANNEL_NORMAL: any

  /**
   * Specular map canvas texture ([member CanvasTexture.specular_texture]).
   *
   */
  static CANVAS_TEXTURE_CHANNEL_SPECULAR: any

  /**
   * The nine patch gets stretched where needed.
   *
   */
  static NINE_PATCH_STRETCH: any

  /**
   * The nine patch gets filled with tiles where needed.
   *
   */
  static NINE_PATCH_TILE: any

  /**
   * The nine patch gets filled with tiles where needed and stretches them a bit if needed.
   *
   */
  static NINE_PATCH_TILE_FIT: any

  /**
   * Uses the default filter mode for this [Viewport].
   *
   */
  static CANVAS_ITEM_TEXTURE_FILTER_DEFAULT: any

  /**
   * The texture filter reads from the nearest pixel only. This makes the texture look pixelated from up close, and grainy from a distance (due to mipmaps not being sampled).
   *
   */
  static CANVAS_ITEM_TEXTURE_FILTER_NEAREST: any

  /**
   * The texture filter blends between the nearest 4 pixels. This makes the texture look smooth from up close, and grainy from a distance (due to mipmaps not being sampled).
   *
   */
  static CANVAS_ITEM_TEXTURE_FILTER_LINEAR: any

  /**
   * The texture filter reads from the nearest pixel and blends between the nearest 2 mipmaps (or uses the nearest mipmap if [member ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter] is `true`). This makes the texture look pixelated from up close, and smooth from a distance.
   *
   * Use this for non-pixel art textures that may be viewed at a low scale (e.g. due to [Camera2D] zoom or sprite scaling), as mipmaps are important to smooth out pixels that are smaller than on-screen pixels.
   *
   */
  static CANVAS_ITEM_TEXTURE_FILTER_NEAREST_WITH_MIPMAPS: any

  /**
   * The texture filter blends between the nearest 4 pixels and between the nearest 2 mipmaps (or uses the nearest mipmap if [member ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter] is `true`). This makes the texture look smooth from up close, and smooth from a distance.
   *
   * Use this for non-pixel art textures that may be viewed at a low scale (e.g. due to [Camera2D] zoom or sprite scaling), as mipmaps are important to smooth out pixels that are smaller than on-screen pixels.
   *
   */
  static CANVAS_ITEM_TEXTURE_FILTER_LINEAR_WITH_MIPMAPS: any

  /**
   * The texture filter reads from the nearest pixel and blends between 2 mipmaps (or uses the nearest mipmap if [member ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter] is `true`) based on the angle between the surface and the camera view. This makes the texture look pixelated from up close, and smooth from a distance. Anisotropic filtering improves texture quality on surfaces that are almost in line with the camera, but is slightly slower. The anisotropic filtering level can be changed by adjusting [member ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level].
   *
   * **Note:** This texture filter is rarely useful in 2D projects. [constant CANVAS_ITEM_TEXTURE_FILTER_NEAREST_WITH_MIPMAPS] is usually more appropriate in this case.
   *
   */
  static CANVAS_ITEM_TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC: any

  /**
   * The texture filter blends between the nearest 4 pixels and blends between 2 mipmaps (or uses the nearest mipmap if [member ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter] is `true`) based on the angle between the surface and the camera view. This makes the texture look smooth from up close, and smooth from a distance. Anisotropic filtering improves texture quality on surfaces that are almost in line with the camera, but is slightly slower. The anisotropic filtering level can be changed by adjusting [member ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level].
   *
   * **Note:** This texture filter is rarely useful in 2D projects. [constant CANVAS_ITEM_TEXTURE_FILTER_LINEAR_WITH_MIPMAPS] is usually more appropriate in this case.
   *
   */
  static CANVAS_ITEM_TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC: any

  /**
   * Max value for [enum CanvasItemTextureFilter] enum.
   *
   */
  static CANVAS_ITEM_TEXTURE_FILTER_MAX: any

  /**
   * Uses the default repeat mode for this [Viewport].
   *
   */
  static CANVAS_ITEM_TEXTURE_REPEAT_DEFAULT: any

  /**
   * Disables textures repeating. Instead, when reading UVs outside the 0-1 range, the value will be clamped to the edge of the texture, resulting in a stretched out look at the borders of the texture.
   *
   */
  static CANVAS_ITEM_TEXTURE_REPEAT_DISABLED: any

  /**
   * Enables the texture to repeat when UV coordinates are outside the 0-1 range. If using one of the linear filtering modes, this can result in artifacts at the edges of a texture when the sampler filters across the edges of the texture.
   *
   */
  static CANVAS_ITEM_TEXTURE_REPEAT_ENABLED: any

  /**
   * Flip the texture when repeating so that the edge lines up instead of abruptly changing.
   *
   */
  static CANVAS_ITEM_TEXTURE_REPEAT_MIRROR: any

  /**
   * Max value for [enum CanvasItemTextureRepeat] enum.
   *
   */
  static CANVAS_ITEM_TEXTURE_REPEAT_MAX: any

  /**
   * Child draws over parent and is not clipped.
   *
   */
  static CANVAS_GROUP_MODE_DISABLED: any

  /**
   * Parent is used for the purposes of clipping only. Child is clipped to the parent's visible area, parent is not drawn.
   *
   */
  static CANVAS_GROUP_MODE_CLIP_ONLY: any

  /**
   * Parent is used for clipping child, but parent is also drawn underneath child as normal before clipping child to its visible area.
   *
   */
  static CANVAS_GROUP_MODE_CLIP_AND_DRAW: any

  /** No documentation provided. */
  static CANVAS_GROUP_MODE_TRANSPARENT: any

  /**
   * 2D point light (see [PointLight2D]).
   *
   */
  static CANVAS_LIGHT_MODE_POINT: any

  /**
   * 2D directional (sun/moon) light (see [DirectionalLight2D]).
   *
   */
  static CANVAS_LIGHT_MODE_DIRECTIONAL: any

  /**
   * Adds light color additive to the canvas.
   *
   */
  static CANVAS_LIGHT_BLEND_MODE_ADD: any

  /**
   * Adds light color subtractive to the canvas.
   *
   */
  static CANVAS_LIGHT_BLEND_MODE_SUB: any

  /**
   * The light adds color depending on transparency.
   *
   */
  static CANVAS_LIGHT_BLEND_MODE_MIX: any

  /**
   * Do not apply a filter to canvas light shadows.
   *
   */
  static CANVAS_LIGHT_FILTER_NONE: any

  /**
   * Use PCF5 filtering to filter canvas light shadows.
   *
   */
  static CANVAS_LIGHT_FILTER_PCF5: any

  /**
   * Use PCF13 filtering to filter canvas light shadows.
   *
   */
  static CANVAS_LIGHT_FILTER_PCF13: any

  /**
   * Max value of the [enum CanvasLightShadowFilter] enum.
   *
   */
  static CANVAS_LIGHT_FILTER_MAX: any

  /**
   * Culling of the canvas occluder is disabled.
   *
   */
  static CANVAS_OCCLUDER_POLYGON_CULL_DISABLED: any

  /**
   * Culling of the canvas occluder is clockwise.
   *
   */
  static CANVAS_OCCLUDER_POLYGON_CULL_CLOCKWISE: any

  /**
   * Culling of the canvas occluder is counterclockwise.
   *
   */
  static CANVAS_OCCLUDER_POLYGON_CULL_COUNTER_CLOCKWISE: any

  /**
   * Boolean global shader parameter (`global uniform bool ...`).
   *
   */
  static GLOBAL_VAR_TYPE_BOOL: any

  /**
   * 2-dimensional boolean vector global shader parameter (`global uniform bvec2 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_BVEC2: any

  /**
   * 3-dimensional boolean vector global shader parameter (`global uniform bvec3 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_BVEC3: any

  /**
   * 4-dimensional boolean vector global shader parameter (`global uniform bvec4 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_BVEC4: any

  /**
   * Integer global shader parameter (`global uniform int ...`).
   *
   */
  static GLOBAL_VAR_TYPE_INT: any

  /**
   * 2-dimensional integer vector global shader parameter (`global uniform ivec2 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_IVEC2: any

  /**
   * 3-dimensional integer vector global shader parameter (`global uniform ivec3 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_IVEC3: any

  /**
   * 4-dimensional integer vector global shader parameter (`global uniform ivec4 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_IVEC4: any

  /**
   * 2-dimensional integer rectangle global shader parameter (`global uniform ivec4 ...`). Equivalent to [constant GLOBAL_VAR_TYPE_IVEC4] in shader code, but exposed as a [Rect2i] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_RECT2I: any

  /**
   * Unsigned integer global shader parameter (`global uniform uint ...`).
   *
   */
  static GLOBAL_VAR_TYPE_UINT: any

  /**
   * 2-dimensional unsigned integer vector global shader parameter (`global uniform uvec2 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_UVEC2: any

  /**
   * 3-dimensional unsigned integer vector global shader parameter (`global uniform uvec3 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_UVEC3: any

  /**
   * 4-dimensional unsigned integer vector global shader parameter (`global uniform uvec4 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_UVEC4: any

  /**
   * Single-precision floating-point global shader parameter (`global uniform float ...`).
   *
   */
  static GLOBAL_VAR_TYPE_FLOAT: any

  /**
   * 2-dimensional floating-point vector global shader parameter (`global uniform vec2 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_VEC2: any

  /**
   * 3-dimensional floating-point vector global shader parameter (`global uniform vec3 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_VEC3: any

  /**
   * 4-dimensional floating-point vector global shader parameter (`global uniform vec4 ...`).
   *
   */
  static GLOBAL_VAR_TYPE_VEC4: any

  /**
   * Color global shader parameter (`global uniform vec4 ...`). Equivalent to [constant GLOBAL_VAR_TYPE_VEC4] in shader code, but exposed as a [Color] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_COLOR: any

  /**
   * 2-dimensional floating-point rectangle global shader parameter (`global uniform vec4 ...`). Equivalent to [constant GLOBAL_VAR_TYPE_VEC4] in shader code, but exposed as a [Rect2] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_RECT2: any

  /**
   * 2×2 matrix global shader parameter (`global uniform mat2 ...`). Exposed as a [PackedInt32Array] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_MAT2: any

  /**
   * 3×3 matrix global shader parameter (`global uniform mat3 ...`). Exposed as a [Basis] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_MAT3: any

  /**
   * 4×4 matrix global shader parameter (`global uniform mat4 ...`). Exposed as a [Projection] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_MAT4: any

  /**
   * 2-dimensional transform global shader parameter (`global uniform mat2x3 ...`). Exposed as a [Transform2D] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_TRANSFORM_2D: any

  /**
   * 3-dimensional transform global shader parameter (`global uniform mat3x4 ...`). Exposed as a [Transform3D] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_TRANSFORM: any

  /**
   * 2D sampler global shader parameter (`global uniform sampler2D ...`). Exposed as a [Texture2D] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_SAMPLER2D: any

  /**
   * 2D sampler array global shader parameter (`global uniform sampler2DArray ...`). Exposed as a [Texture2DArray] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_SAMPLER2DARRAY: any

  /**
   * 3D sampler global shader parameter (`global uniform sampler3D ...`). Exposed as a [Texture3D] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_SAMPLER3D: any

  /**
   * Cubemap sampler global shader parameter (`global uniform samplerCube ...`). Exposed as a [Cubemap] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_SAMPLERCUBE: any

  /**
   * External sampler global shader parameter (`global uniform samplerExternalOES ...`). Exposed as an [ExternalTexture] in the editor UI.
   *
   */
  static GLOBAL_VAR_TYPE_SAMPLEREXT: any

  /**
   * Represents the size of the [enum GlobalShaderParameterType] enum.
   *
   */
  static GLOBAL_VAR_TYPE_MAX: any

  /**
   * Number of objects rendered in the current 3D scene. This varies depending on camera position and rotation.
   *
   */
  static RENDERING_INFO_TOTAL_OBJECTS_IN_FRAME: any

  /**
   * Number of points, lines, or triangles rendered in the current 3D scene. This varies depending on camera position and rotation.
   *
   */
  static RENDERING_INFO_TOTAL_PRIMITIVES_IN_FRAME: any

  /**
   * Number of draw calls performed to render in the current 3D scene. This varies depending on camera position and rotation.
   *
   */
  static RENDERING_INFO_TOTAL_DRAW_CALLS_IN_FRAME: any

  /**
   * Texture memory used (in bytes).
   *
   */
  static RENDERING_INFO_TEXTURE_MEM_USED: any

  /**
   * Buffer memory used (in bytes). This includes vertex data, uniform buffers, and many miscellaneous buffer types used internally.
   *
   */
  static RENDERING_INFO_BUFFER_MEM_USED: any

  /**
   * Video memory used (in bytes). When using the Forward+ or Mobile renderers, this is always greater than the sum of [constant RENDERING_INFO_TEXTURE_MEM_USED] and [constant RENDERING_INFO_BUFFER_MEM_USED], since there is miscellaneous data not accounted for by those two metrics. When using the Compatibility renderer, this is equal to the sum of [constant RENDERING_INFO_TEXTURE_MEM_USED] and [constant RENDERING_INFO_BUFFER_MEM_USED].
   *
   */
  static RENDERING_INFO_VIDEO_MEM_USED: any

  /**
   * Number of pipeline compilations that were triggered by the 2D canvas renderer.
   *
   */
  static RENDERING_INFO_PIPELINE_COMPILATIONS_CANVAS: any

  /**
   * Number of pipeline compilations that were triggered by loading meshes. These compilations will show up as longer loading times the first time a user runs the game and the pipeline is required.
   *
   */
  static RENDERING_INFO_PIPELINE_COMPILATIONS_MESH: any

  /**
   * Number of pipeline compilations that were triggered by building the surface cache before rendering the scene. These compilations will show up as a stutter when loading a scene the first time a user runs the game and the pipeline is required.
   *
   */
  static RENDERING_INFO_PIPELINE_COMPILATIONS_SURFACE: any

  /**
   * Number of pipeline compilations that were triggered while drawing the scene. These compilations will show up as stutters during gameplay the first time a user runs the game and the pipeline is required.
   *
   */
  static RENDERING_INFO_PIPELINE_COMPILATIONS_DRAW: any

  /**
   * Number of pipeline compilations that were triggered to optimize the current scene. These compilations are done in the background and should not cause any stutters whatsoever.
   *
   */
  static RENDERING_INFO_PIPELINE_COMPILATIONS_SPECIALIZATION: any

  /**
   * Pipeline compilation that was triggered by the 2D canvas renderer.
   *
   */
  static PIPELINE_SOURCE_CANVAS: any

  /**
   * Pipeline compilation that was triggered by loading a mesh.
   *
   */
  static PIPELINE_SOURCE_MESH: any

  /**
   * Pipeline compilation that was triggered by building the surface cache before rendering the scene.
   *
   */
  static PIPELINE_SOURCE_SURFACE: any

  /**
   * Pipeline compilation that was triggered while drawing the scene.
   *
   */
  static PIPELINE_SOURCE_DRAW: any

  /**
   * Pipeline compilation that was triggered to optimize the current scene.
   *
   */
  static PIPELINE_SOURCE_SPECIALIZATION: any

  /**
   * Represents the size of the [enum PipelineSource] enum.
   *
   */
  static PIPELINE_SOURCE_MAX: any

  /**
   * No stretching is applied.
   *
   */
  static SPLASH_STRETCH_MODE_DISABLED: any

  /**
   * Stretches image to fullscreen while preserving aspect ratio.
   *
   */
  static SPLASH_STRETCH_MODE_KEEP: any

  /**
   * Stretches the height of the image based on the width of the screen.
   *
   */
  static SPLASH_STRETCH_MODE_KEEP_WIDTH: any

  /**
   * Stretches the width of the image based on the height of the screen.
   *
   */
  static SPLASH_STRETCH_MODE_KEEP_HEIGHT: any

  /**
   * Stretches the image to cover the entire screen while preserving aspect ratio.
   *
   */
  static SPLASH_STRETCH_MODE_COVER: any

  /**
   * Stretches the image to cover the entire screen but doesn't preserve aspect ratio.
   *
   */
  static SPLASH_STRETCH_MODE_IGNORE: any

  /** No documentation provided. */
  static FEATURE_SHADERS: any

  /** No documentation provided. */
  static FEATURE_MULTITHREADED: any

  /**
   * Emitted at the end of the frame, after the RenderingServer has finished updating all the Viewports.
   *
   */
  $frame_post_draw: Signal<() => void>

  /**
   * Emitted at the beginning of the frame, before the RenderingServer updates all the Viewports.
   *
   */
  $frame_pre_draw: Signal<() => void>
}
