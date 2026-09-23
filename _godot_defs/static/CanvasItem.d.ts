/**
 * Abstract base class for everything in 2D space. Canvas items are laid out in a tree; children inherit and extend their parent's transform. [CanvasItem] is extended by [Control] for GUI-related nodes, and by [Node2D] for 2D game objects.
 *
 * Any [CanvasItem] can draw. For this, [method queue_redraw] is called by the engine, then [constant NOTIFICATION_DRAW] will be received on idle time to request a redraw. Because of this, canvas items don't need to be redrawn on every frame, improving the performance significantly. Several functions for drawing on the [CanvasItem] are provided (see `draw_*` functions). However, they can only be used inside [method _draw], its corresponding [method Object._notification] or methods connected to the [signal draw] signal.
 *
 * Canvas items are drawn in tree order on their canvas layer. By default, children are on top of their parents, so a root [CanvasItem] will be drawn behind everything. This behavior can be changed on a per-item basis.
 *
 * A [CanvasItem] can be hidden, which will also hide its children. By adjusting various other properties of a [CanvasItem], you can also modulate its color (via [member modulate] or [member self_modulate]), change its Z-index, blend mode, and more.
 *
 * Note that properties like transform, modulation, and visibility are only propagated to **direct** [CanvasItem] child nodes. If there is a non-[CanvasItem] node in between, like [Node] or [AnimationPlayer], the [CanvasItem] nodes below will have an independent position and [member modulate] chain. See also [member top_level].
 *
 */
declare class CanvasItem extends Node {
  /**
   * Abstract base class for everything in 2D space. Canvas items are laid out in a tree; children inherit and extend their parent's transform. [CanvasItem] is extended by [Control] for GUI-related nodes, and by [Node2D] for 2D game objects.
   *
   * Any [CanvasItem] can draw. For this, [method queue_redraw] is called by the engine, then [constant NOTIFICATION_DRAW] will be received on idle time to request a redraw. Because of this, canvas items don't need to be redrawn on every frame, improving the performance significantly. Several functions for drawing on the [CanvasItem] are provided (see `draw_*` functions). However, they can only be used inside [method _draw], its corresponding [method Object._notification] or methods connected to the [signal draw] signal.
   *
   * Canvas items are drawn in tree order on their canvas layer. By default, children are on top of their parents, so a root [CanvasItem] will be drawn behind everything. This behavior can be changed on a per-item basis.
   *
   * A [CanvasItem] can be hidden, which will also hide its children. By adjusting various other properties of a [CanvasItem], you can also modulate its color (via [member modulate] or [member self_modulate]), change its Z-index, blend mode, and more.
   *
   * Note that properties like transform, modulation, and visibility are only propagated to **direct** [CanvasItem] child nodes. If there is a non-[CanvasItem] node in between, like [Node] or [AnimationPlayer], the [CanvasItem] nodes below will have an independent position and [member modulate] chain. See also [member top_level].
   *
   */
  new(): CanvasItem
  constructor()
  static new(): CanvasItem

  /**
   * The mode in which this node clips its children, acting as a mask.
   *
   * **Note:** Clipping nodes cannot be nested or placed within a [CanvasGroup]. If an ancestor of this node clips its children or is a [CanvasGroup], then this node's clip mode should be set to [constant CLIP_CHILDREN_DISABLED] to avoid unexpected behavior.
   *
   */
  clip_children: int

  /** The rendering layers in which this [CanvasItem] responds to [Light2D] nodes. */
  light_mask: int

  /** The material applied to this [CanvasItem]. */
  material: Material

  /** The color applied to this [CanvasItem]. This property does affect child [CanvasItem]s, unlike [member self_modulate] which only affects the node itself. */
  modulate: Color

  /**
   * The color applied to this [CanvasItem]. This property does **not** affect child [CanvasItem]s, unlike [member modulate] which affects both the node itself and its children.
   *
   * **Note:** Internal children are also not affected by this property (see the `include_internal` parameter in [method Node.add_child]). For built-in nodes this includes sliders in [ColorPicker], and the tab bar in [TabContainer].
   *
   */
  self_modulate: Color

  /** If [code]true[/code], this node draws behind its parent. */
  show_behind_parent: boolean

  /** The filtering mode used to render this [CanvasItem]'s texture(s). */
  texture_filter: int

  /**
   * The repeating mode used to render this [CanvasItem]'s texture(s). It affects what happens when the texture is sampled outside its extents, for example by setting a [member Sprite2D.region_rect] that is larger than the texture or assigning [Polygon2D] UV points outside the texture.
   *
   * **Note:** [TextureRect] is not affected by [member texture_repeat], as it uses its own texture repeating implementation.
   *
   */
  texture_repeat: int

  /** If [code]true[/code], this [CanvasItem] will [i]not[/i] inherit its transform from parent [CanvasItem]s. Its draw order will also be changed to make it draw on top of other [CanvasItem]s that do not have [member top_level] set to [code]true[/code]. The [CanvasItem] will effectively act as if it was placed as a child of a bare [Node]. */
  top_level: boolean

  /** If [code]true[/code], the parent [CanvasItem]'s [member material] is used as this node's material. */
  use_parent_material: boolean

  /**
   * The rendering layer in which this [CanvasItem] is rendered by [Viewport] nodes. A [Viewport] will render a [CanvasItem] if it and all its parents share a layer with the [Viewport]'s canvas cull mask.
   *
   * **Note:** A [CanvasItem] does not inherit its parents' visibility layers. This means that if a parent [CanvasItem] does not have all the same layers as its child, the child may not be visible even if both the parent and child have [member visible] set to `true`. For example, if a parent has layer 1 and a child has layer 2, the child will not be visible in a [Viewport] with the canvas cull mask set to layer 1 or 2 (see [member Viewport.canvas_cull_mask]). To ensure that both the parent and child are visible, the parent must have both layers 1 and 2, or the child must have [member top_level] set to `true`.
   *
   */
  visibility_layer: int

  /**
   * If `true`, this [CanvasItem] may be drawn. Whether this [CanvasItem] is actually drawn depends on the visibility of all of its [CanvasItem] ancestors. In other words: this [CanvasItem] will be drawn when [method is_visible_in_tree] returns `true` and all [CanvasItem] ancestors share at least one [member visibility_layer] with this [CanvasItem].
   *
   * **Note:** For controls that inherit [Popup], the correct way to make them visible is to call one of the multiple `popup*()` functions instead.
   *
   */
  visible: boolean

  /**
   * If `true`, this and child [CanvasItem] nodes with a higher Y position are rendered in front of nodes with a lower Y position. If `false`, this and child [CanvasItem] nodes are rendered normally in scene tree order.
   *
   * With Y-sorting enabled on a parent node ('A') but disabled on a child node ('B'), the child node ('B') is sorted but its children ('C1', 'C2', etc.) render together on the same Y position as the child node ('B'). This allows you to organize the render order of a scene without changing the scene tree.
   *
   * Nodes sort relative to each other only if they are on the same [member z_index].
   *
   */
  y_sort_enabled: boolean

  /**
   * If `true`, this node's final Z index is relative to its parent's Z index.
   *
   * For example, if [member z_index] is `2` and its parent's final Z index is `3`, then this node's final Z index will be `5` (`2 + 3`).
   *
   */
  z_as_relative: boolean

  /**
   * The order in which this node is drawn. A node with a higher Z index will display in front of others. Must be between [constant RenderingServer.CANVAS_ITEM_Z_MIN] and [constant RenderingServer.CANVAS_ITEM_Z_MAX] (inclusive).
   *
   * **Note:** The Z index does **not** affect the order in which [CanvasItem] nodes are processed or the way input events are handled. This is especially important to keep in mind for [Control] nodes.
   *
   */
  z_index: int

  /**
   * Called when [CanvasItem] has been requested to redraw (after [method queue_redraw] is called, either manually or by the engine).
   *
   * Corresponds to the [constant NOTIFICATION_DRAW] notification in [method Object._notification].
   *
   */
  protected _draw(): void

  /** Subsequent drawing commands will be ignored unless they fall within the specified animation slice. This is a faster way to implement animations that loop on background rather than redrawing constantly. */
  draw_animation_slice(
    animation_length: float,
    slice_begin: float,
    slice_end: float,
    offset?: float
  ): void

  /**
   * Draws an unfilled arc between the given angles with a uniform [param color] and [param width] and optional antialiasing (supported only for positive [param width]). The larger the value of [param point_count], the smoother the curve. [param center] is defined in local space. For elliptical arcs, see [method draw_ellipse_arc]. See also [method draw_circle].
   *
   * If [param width] is negative, it will be ignored and the arc will be drawn using [constant RenderingServer.PRIMITIVE_LINE_STRIP]. This means that when the CanvasItem is scaled, the arc will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   * The arc is drawn from [param start_angle] towards the value of [param end_angle] so in clockwise direction if `start_angle < end_angle` and counter-clockwise otherwise. Passing the same angles but in reversed order will produce the same arc. If absolute difference of [param start_angle] and [param end_angle] is greater than [constant @GDScript.TAU] radians, then a full circle arc is drawn (i.e. arc will not overlap itself).
   *
   */
  draw_arc(
    center: Vector2,
    radius: float,
    start_angle: float,
    end_angle: float,
    point_count: int,
    color: Color,
    width?: float,
    antialiased?: boolean
  ): void

  /** Draws a string first character using a custom font. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. [param pos] is defined in local space. */
  draw_char(
    font: Font,
    pos: Vector2,
    char: string,
    font_size?: int,
    modulate?: Color,
    oversampling?: float
  ): void

  /** Draws a string first character outline using a custom font. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. [param pos] is defined in local space. */
  draw_char_outline(
    font: Font,
    pos: Vector2,
    char: string,
    font_size?: int,
    size?: int,
    modulate?: Color,
    oversampling?: float
  ): void

  /**
   * Draws a circle, with [param position] defined in local space. See also [method draw_ellipse], [method draw_arc], [method draw_polyline], and [method draw_polygon].
   *
   * If [param filled] is `true`, the circle will be filled with the [param color] specified. If [param filled] is `false`, the circle will be drawn as a stroke with the [param color] and [param width] specified.
   *
   * If [param width] is negative, then two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   * If [param antialiased] is `true`, half transparent "feathers" will be attached to the boundary, making outlines smooth.
   *
   * **Note:** [param width] is only effective if [param filled] is `false`.
   *
   */
  draw_circle(
    position: Vector2,
    radius: float,
    color: Color,
    filled?: boolean,
    width?: float,
    antialiased?: boolean
  ): void

  /**
   * Draws a colored polygon of any number of points, convex or concave. The points in the [param points] array are defined in local space. Unlike [method draw_polygon], a single color must be specified for the whole polygon.
   *
   * **Note:** If you frequently redraw the same polygon with a large number of vertices, consider pre-calculating the triangulation with [method Geometry2D.triangulate_polygon] and using [method draw_mesh], [method draw_multimesh], or [method RenderingServer.canvas_item_add_triangle_array].
   *
   */
  draw_colored_polygon(
    points: PackedVector2Array,
    color: Color,
    uvs?: PackedVector2Array,
    texture?: Texture2D
  ): void

  /**
   * Draws a dashed line from a 2D point to another, with a given color and width. The [param from] and [param to] positions are defined in local space. See also [method draw_line], [method draw_multiline], and [method draw_polyline].
   *
   * If [param width] is negative, then a two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the line parts will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   * [param dash] is the length of each dash in pixels, with the gap between each dash being the same length. If [param aligned] is `true`, the length of the first and last dashes may be shortened or lengthened to allow the line to begin and end at the precise points defined by [param from] and [param to]. Both ends are always symmetrical when [param aligned] is `true`. If [param aligned] is `false`, all dashes will have the same length, but the line may appear incomplete at the end due to the dash length not dividing evenly into the line length. Only full dashes are drawn when [param aligned] is `false`.
   *
   * If [param antialiased] is `true`, half transparent "feathers" will be attached to the boundary, making outlines smooth.
   *
   * **Note:** [param antialiased] is only effective if [param width] is greater than `0.0`.
   *
   */
  draw_dashed_line(
    from: Vector2,
    to: Vector2,
    color: Color,
    width?: float,
    dash?: float,
    aligned?: boolean,
    antialiased?: boolean
  ): void

  /**
   * Draws an ellipse with semi-major axis [param major] and semi-minor axis [param minor]. See also [method draw_circle], [method draw_ellipse_arc], [method draw_polyline], and [method draw_polygon].
   *
   * If [param filled] is `true`, the ellipse will be filled with the [param color] specified. If [param filled] is `false`, the ellipse will be drawn as a stroke with the [param color] and [param width] specified.
   *
   * If [param width] is negative, then two-point primitives will be drawn instead of four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   * If [param antialiased] is `true`, half transparent "feathers" will be attached to the boundary, making outlines smooth.
   *
   * **Note:** [param width] is only effective if [param filled] is `false`.
   *
   */
  draw_ellipse(
    position: Vector2,
    major: float,
    minor: float,
    color: Color,
    filled?: boolean,
    width?: float,
    antialiased?: boolean
  ): void

  /**
   * Draws an unfilled elliptical arc between the given angles with a uniform [param color] and [param width] and optional antialiasing (supported only for positive [param width]). The larger the value of [param point_count], the smoother the curve. For circular arcs, see [method draw_arc]. See also [method draw_ellipse].
   *
   * If [param width] is negative, it will be ignored and the arc will be drawn using [constant RenderingServer.PRIMITIVE_LINE_STRIP]. This means that when the CanvasItem is scaled, the arc will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   * The arc is drawn from [param start_angle] towards the value of [param end_angle] so in clockwise direction if `start_angle < end_angle` and counter-clockwise otherwise. Passing the same angles but in reversed order will produce the same arc. If absolute difference of [param start_angle] and [param end_angle] is greater than [constant @GDScript.TAU] radians, then a full ellipse is drawn (i.e. arc will not overlap itself).
   *
   */
  draw_ellipse_arc(
    center: Vector2,
    major: float,
    minor: float,
    start_angle: float,
    end_angle: float,
    point_count: int,
    color: Color,
    width?: float,
    antialiased?: boolean
  ): void

  /** After submitting all animations slices via [method draw_animation_slice], this function can be used to revert drawing to its default state (all subsequent drawing commands will be visible). If you don't care about this particular use case, usage of this function after submitting the slices is not required. */
  draw_end_animation(): void

  /**
   * Draws a textured rectangle region of the font texture with LCD subpixel anti-aliasing at a given position, optionally modulated by a color. The [param rect] is defined in local space.
   *
   * Texture is drawn using the following blend operation, blend mode of the [CanvasItemMaterial] is ignored:
   *
   * @example
   *
   * dst.r = texture.r * modulate.r * modulate.a + dst.r * (1.0 - texture.r * modulate.a);
   * dst.g = texture.g * modulate.g * modulate.a + dst.g * (1.0 - texture.g * modulate.a);
   * dst.b = texture.b * modulate.b * modulate.a + dst.b * (1.0 - texture.b * modulate.a);
   * dst.a = modulate.a + dst.a * (1.0 - modulate.a);
   * @summary
   *
   *
   */
  draw_lcd_texture_rect_region(
    texture: Texture2D,
    rect: Rect2,
    src_rect: Rect2,
    modulate?: Color
  ): void

  /**
   * Draws a line from a 2D point to another, with a given color and width. It can be optionally antialiased. The [param from] and [param to] positions are defined in local space. See also [method draw_dashed_line], [method draw_multiline], and [method draw_polyline].
   *
   * If [param width] is negative, then a two-point primitive will be drawn instead of a four-point one. This means that when the CanvasItem is scaled, the line will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   */
  draw_line(
    from: Vector2,
    to: Vector2,
    color: Color,
    width?: float,
    antialiased?: boolean
  ): void

  /** Draws a [Mesh] in 2D, using the provided texture. See [MeshInstance2D] for related documentation. The [param transform] is defined in local space. */
  draw_mesh(
    mesh: Mesh,
    texture: Texture2D,
    transform?: Transform2D,
    modulate?: Color
  ): void

  /**
   * Draws a textured rectangle region of the multichannel signed distance field texture at a given position, optionally modulated by a color. The [param rect] is defined in local space. See [member FontFile.multichannel_signed_distance_field] for more information and caveats about MSDF font rendering.
   *
   * If [param outline] is positive, each alpha channel value of pixel in region is set to maximum value of true distance in the [param outline] radius.
   *
   * Value of the [param pixel_range] should the same that was used during distance field texture generation.
   *
   */
  draw_msdf_texture_rect_region(
    texture: Texture2D,
    rect: Rect2,
    src_rect: Rect2,
    modulate?: Color,
    outline?: float,
    pixel_range?: float,
    scale?: float
  ): void

  /**
   * Draws multiple disconnected lines with a uniform [param width] and [param color]. Each line is defined by two consecutive points from [param points] array in local space, i.e. i-th segment consists of `points[2 * i]`, `points[2 * i + 1]` endpoints. When drawing large amounts of lines, this is faster than using individual [method draw_line] calls. To draw interconnected lines, use [method draw_polyline] instead.
   *
   * If [param width] is negative, then two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   * **Note:** [param antialiased] is only effective if [param width] is greater than `0.0`.
   *
   */
  draw_multiline(
    points: PackedVector2Array,
    color: Color,
    width?: float,
    antialiased?: boolean
  ): void

  /**
   * Draws multiple disconnected lines with a uniform [param width] and segment-by-segment coloring. Each segment is defined by two consecutive points from [param points] array in local space and a corresponding color from [param colors] array, i.e. i-th segment consists of `points[2 * i]`, `points[2 * i + 1]` endpoints and has `colors**` color. When drawing large amounts of lines, this is faster than using individual [method draw_line] calls. To draw interconnected lines, use [method draw_polyline_colors] instead.
   *
   * If [param width] is negative, then two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   * **Note:** [param antialiased] is only effective if [param width] is greater than `0.0`.
   *
   */
  draw_multiline_colors(
    points: PackedVector2Array,
    colors: PackedColorArray,
    width?: float,
    antialiased?: boolean
  ): void

  /** Breaks [param text] into lines and draws it using the specified [param font] at the [param pos] in local space (top-left corner). The text will have its color multiplied by [param modulate]. If [param width] is greater than or equal to 0, the text will be clipped if it exceeds the specified width. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  draw_multiline_string(
    font: Font,
    pos: Vector2,
    text: string,
    alignment?: int,
    width?: float,
    font_size?: int,
    max_lines?: int,
    modulate?: Color,
    brk_flags?: int,
    justification_flags?: int,
    direction?: int,
    orientation?: int,
    oversampling?: float
  ): void

  /** Breaks [param text] to the lines and draws text outline using the specified [param font] at the [param pos] in local space (top-left corner). The text will have its color multiplied by [param modulate]. If [param width] is greater than or equal to 0, the text will be clipped if it exceeds the specified width. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  draw_multiline_string_outline(
    font: Font,
    pos: Vector2,
    text: string,
    alignment?: int,
    width?: float,
    font_size?: int,
    max_lines?: int,
    size?: int,
    modulate?: Color,
    brk_flags?: int,
    justification_flags?: int,
    direction?: int,
    orientation?: int,
    oversampling?: float
  ): void

  /** Draws a [MultiMesh] in 2D with the provided texture. See [MultiMeshInstance2D] for related documentation. */
  draw_multimesh(multimesh: MultiMesh, texture: Texture2D): void

  /**
   * Draws a solid polygon of any number of points, convex or concave. Unlike [method draw_colored_polygon], each point's color can be changed individually. The [param points] array is defined in local space. See also [method draw_polyline] and [method draw_polyline_colors]. If you need more flexibility (such as being able to use bones), use [method RenderingServer.canvas_item_add_triangle_array] instead.
   *
   * **Note:** If you frequently redraw the same polygon with a large number of vertices, consider pre-calculating the triangulation with [method Geometry2D.triangulate_polygon] and using [method draw_mesh], [method draw_multimesh], or [method RenderingServer.canvas_item_add_triangle_array].
   *
   */
  draw_polygon(
    points: PackedVector2Array,
    colors: PackedColorArray,
    uvs?: PackedVector2Array,
    texture?: Texture2D
  ): void

  /**
   * Draws interconnected line segments with a uniform [param color] and [param width] and optional antialiasing (supported only for positive [param width]). The [param points] array is defined in local space. When drawing large amounts of lines, this is faster than using individual [method draw_line] calls. To draw disconnected lines, use [method draw_multiline] instead. See also [method draw_polygon].
   *
   * If [param width] is negative, it will be ignored and the polyline will be drawn using [constant RenderingServer.PRIMITIVE_LINE_STRIP]. This means that when the CanvasItem is scaled, the polyline will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   */
  draw_polyline(
    points: PackedVector2Array,
    color: Color,
    width?: float,
    antialiased?: boolean
  ): void

  /**
   * Draws interconnected line segments with a uniform [param width], point-by-point coloring, and optional antialiasing (supported only for positive [param width]). Colors assigned to line points match by index between [param points] and [param colors], i.e. each line segment is filled with a gradient between the colors of the endpoints. The [param points] array is defined in local space. When drawing large amounts of lines, this is faster than using individual [method draw_line] calls. To draw disconnected lines, use [method draw_multiline_colors] instead. See also [method draw_polygon].
   *
   * If [param width] is negative, it will be ignored and the polyline will be drawn using [constant RenderingServer.PRIMITIVE_LINE_STRIP]. This means that when the CanvasItem is scaled, the polyline will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   */
  draw_polyline_colors(
    points: PackedVector2Array,
    colors: PackedColorArray,
    width?: float,
    antialiased?: boolean
  ): void

  /** Draws a custom primitive. 1 point for a point, 2 points for a line, 3 points for a triangle, and 4 points for a quad. If 0 points or more than 4 points are specified, nothing will be drawn and an error message will be printed. The [param points] array is defined in local space. See also [method draw_line], [method draw_polyline], [method draw_polygon], and [method draw_rect]. */
  draw_primitive(
    points: PackedVector2Array,
    colors: PackedColorArray,
    uvs: PackedVector2Array,
    texture?: Texture2D
  ): void

  /**
   * Draws a rectangle. If [param filled] is `true`, the rectangle will be filled with the [param color] specified. If [param filled] is `false`, the rectangle will be drawn as a stroke with the [param color] and [param width] specified. The [param rect] is specified in local space. See also [method draw_texture_rect].
   *
   * If [param width] is negative, then two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive [param width] like `1.0`.
   *
   * If [param antialiased] is `true`, half transparent "feathers" will be attached to the boundary, making outlines smooth.
   *
   * **Note:** [param width] is only effective if [param filled] is `false`.
   *
   * **Note:** Unfilled rectangles drawn with a negative [param width] may not display perfectly. For example, corners may be missing or brighter due to overlapping lines (for a translucent [param color]).
   *
   */
  draw_rect(
    rect: Rect2,
    color: Color,
    filled?: boolean,
    width?: float,
    antialiased?: boolean
  ): void

  /**
   * Sets a custom local transform for drawing via components. Anything drawn afterwards will be transformed by this.
   *
   * **Note:** [member FontFile.oversampling] does **not** take [param scale] into account. This means that scaling up/down will cause bitmap fonts and rasterized (non-MSDF) dynamic fonts to appear blurry or pixelated. To ensure text remains crisp regardless of scale, you can enable MSDF font rendering by enabling [member ProjectSettings.gui/theme/default_font_multichannel_signed_distance_field] (applies to the default project font only), or enabling **Multichannel Signed Distance Field** in the import options of a DynamicFont for custom fonts. On system fonts, [member SystemFont.multichannel_signed_distance_field] can be enabled in the inspector.
   *
   */
  draw_set_transform(position: Vector2, rotation?: float, scale?: Vector2): void

  /** Sets a custom local transform for drawing via matrix. Anything drawn afterwards will be transformed by this. */
  draw_set_transform_matrix(xform: Transform2D): void

  /**
   * Draws [param text] using the specified [param font] at the [param pos] in local space (bottom-left corner using the baseline of the font). The text will have its color multiplied by [param modulate]. If [param width] is greater than or equal to 0, the text will be clipped if it exceeds the specified width. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   *
   * **Example:** Draw "Hello world", using the project's default font:
   *
   * @example
   *
   *
   * draw_string(ThemeDB.fallback_font, Vector2(64, 64), "Hello world", HORIZONTAL_ALIGNMENT_LEFT, -1, ThemeDB.fallback_font_size)
   *
   *
   * DrawString(ThemeDB.FallbackFont, new Vector2(64, 64), "Hello world", HorizontalAlignment.Left, -1, ThemeDB.FallbackFontSize);
   *
   * @summary
   *
   *
   * See also [method Font.draw_string].
   *
   */
  draw_string(
    font: Font,
    pos: Vector2,
    text: string,
    alignment?: int,
    width?: float,
    font_size?: int,
    modulate?: Color,
    justification_flags?: int,
    direction?: int,
    orientation?: int,
    oversampling?: float
  ): void

  /** Draws [param text] outline using the specified [param font] at the [param pos] in local space (bottom-left corner using the baseline of the font). The text will have its color multiplied by [param modulate]. If [param width] is greater than or equal to 0, the text will be clipped if it exceeds the specified width. If [param oversampling] is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. */
  draw_string_outline(
    font: Font,
    pos: Vector2,
    text: string,
    alignment?: int,
    width?: float,
    font_size?: int,
    size?: int,
    modulate?: Color,
    justification_flags?: int,
    direction?: int,
    orientation?: int,
    oversampling?: float
  ): void

  /** Draws a styled rectangle. The [param rect] is defined in local space. */
  draw_style_box(style_box: StyleBox, rect: Rect2): void

  /** Draws a texture at a given position. The [param position] is defined in local space. */
  draw_texture(texture: Texture2D, position: Vector2, modulate?: Color): void

  /** Draws a textured rectangle at a given position, optionally modulated by a color. The [param rect] is defined in local space. If [param transpose] is [code]true[/code], the texture will have its X and Y coordinates swapped. See also [method draw_rect] and [method draw_texture_rect_region]. */
  draw_texture_rect(
    texture: Texture2D,
    rect: Rect2,
    tile: boolean,
    modulate?: Color,
    transpose?: boolean
  ): void

  /** Draws a textured rectangle from a texture's region (specified by [param src_rect]) at a given position in local space, optionally modulated by a color. If [param transpose] is [code]true[/code], the texture will have its X and Y coordinates swapped. See also [method draw_texture_rect]. */
  draw_texture_rect_region(
    texture: Texture2D,
    rect: Rect2,
    src_rect: Rect2,
    modulate?: Color,
    transpose?: boolean,
    clip_uv?: boolean
  ): void

  /**
   * Forces the node's transform to update. Fails if the node is not inside the tree. See also [method get_transform].
   *
   * **Note:** For performance reasons, transform changes are usually accumulated and applied **once** at the end of the frame. The update propagates through [CanvasItem] children, as well. Therefore, use this method only when you need an up-to-date transform (such as during physics operations).
   *
   */
  force_update_transform(): void

  /** Returns the [RID] of the [World2D] canvas where this node is registered to, used by the [RenderingServer]. */
  get_canvas(): RID

  /** Returns the internal canvas item [RID] used by the [RenderingServer] for this node. */
  get_canvas_item(): RID

  /** Returns the [CanvasLayer] that contains this node, or [code]null[/code] if the node is not in any [CanvasLayer]. */
  get_canvas_layer_node(): CanvasLayer

  /** Returns the transform of this node, converted from its registered canvas's coordinate system to its viewport's coordinate system. See also [method Node.get_viewport]. */
  get_canvas_transform(): Transform2D

  /**
   * Returns mouse cursor's global position relative to the [CanvasLayer] that contains this node.
   *
   * **Note:** For screen-space coordinates (e.g. when using a non-embedded [Popup]), you can use [method DisplayServer.mouse_get_position].
   *
   */
  get_global_mouse_position(): Vector2

  /** Returns the global transform matrix of this item, i.e. the combined transform up to the topmost [CanvasItem] node. The topmost item is a [CanvasItem] that either has no parent, has non-[CanvasItem] parent or it has [member top_level] enabled. */
  get_global_transform(): Transform2D

  /** Returns the transform from the local coordinate system of this [CanvasItem] to the [Viewport]s coordinate system. */
  get_global_transform_with_canvas(): Transform2D

  /** Get the value of a shader parameter as set on this instance. */
  get_instance_shader_parameter(name: StringName): any

  /** Returns the mouse's position in this [CanvasItem] using the local coordinate system of this [CanvasItem]. */
  get_local_mouse_position(): Vector2

  /**
   * Returns the transform of this [CanvasItem] in global screen coordinates (i.e. taking window position into account). Mostly useful for editor plugins.
   *
   * Equivalent to [method get_global_transform_with_canvas] if the window is embedded (see [member Viewport.gui_embed_subwindows]).
   *
   */
  get_screen_transform(): Transform2D

  /** Returns the transform matrix of this [CanvasItem]. */
  get_transform(): Transform2D

  /** Returns this node's viewport boundaries as a [Rect2]. See also [method Node.get_viewport]. */
  get_viewport_rect(): Rect2

  /** Returns the transform of this node, converted from its registered canvas's coordinate system to its viewport embedder's coordinate system. See also [method Viewport.get_final_transform] and [method Node.get_viewport]. */
  get_viewport_transform(): Transform2D

  /** Returns [code]true[/code] if the layer at the given index is set in [member visibility_layer]. */
  get_visibility_layer_bit(layer: int): boolean

  /**
   * Returns the [World2D] this node is registered to.
   *
   * Usually, this is the same as this node's viewport (see [method Node.get_viewport] and [method Viewport.find_world_2d]).
   *
   */
  get_world_2d(): World2D

  /** Hide the [CanvasItem] if it's currently visible. This is equivalent to setting [member visible] to [code]false[/code]. */
  hide(): void

  /** Returns [code]true[/code] if the node receives [constant NOTIFICATION_LOCAL_TRANSFORM_CHANGED] whenever its local transform changes. This is enabled with [method set_notify_local_transform]. */
  is_local_transform_notification_enabled(): boolean

  /** Returns [code]true[/code] if the node receives [constant NOTIFICATION_TRANSFORM_CHANGED] whenever its global transform changes. This is enabled with [method set_notify_transform]. */
  is_transform_notification_enabled(): boolean

  /**
   * Returns `true` if the node is present in the [SceneTree], its [member visible] property is `true` and all its ancestors are also visible. If any ancestor is hidden, this node will not be visible in the scene tree, and is therefore not drawn (see [method _draw]).
   *
   * Visibility is checked only in parent nodes that inherit from [CanvasItem], [CanvasLayer], and [Window]. If the parent is of any other type (such as [Node], [AnimationPlayer], or [Node3D]), it is assumed to be visible.
   *
   * **Note:** This method does not take [member visibility_layer] into account, so even if this method returns `true`, the node might end up not being rendered.
   *
   */
  is_visible_in_tree(): boolean

  /**
   * Transforms [param viewport_point] from the viewport's coordinates to this node's local coordinates.
   *
   * For the opposite operation, use [method get_global_transform_with_canvas].
   *
   * @example
   *
   * var viewport_point = get_global_transform_with_canvas() * local_point
   * @summary
   *
   *
   */
  make_canvas_position_local(viewport_point: Vector2): Vector2

  make_input_local<T extends InputEvent>(event: T): T

  /** Moves this node below its siblings, usually causing the node to draw on top of its siblings. Does nothing if this node does not have a parent. See also [method Node.move_child]. */
  move_to_front(): void

  /** Queues the [CanvasItem] to redraw. During idle time, if [CanvasItem] is visible, [constant NOTIFICATION_DRAW] is sent and [method _draw] is called. This only occurs [b]once[/b] per frame, even if this method has been called multiple times. */
  queue_redraw(): void

  /**
   * Set the value of a shader uniform for this instance only ([url=$DOCS_URL/tutorials/shaders/shader_reference/shading_language.html#per-instance-uniforms]per-instance uniform[/url]). See also [method ShaderMaterial.set_shader_parameter] to assign a uniform on all instances using the same [ShaderMaterial].
   *
   * **Note:** For a shader uniform to be assignable on a per-instance basis, it **must** be defined with `instance uniform ...` rather than `uniform ...` in the shader code.
   *
   * **Note:** [param name] is case-sensitive and must match the name of the uniform in the code exactly (not the capitalized name in the inspector).
   *
   */
  set_instance_shader_parameter(name: StringName, value: any): void

  /**
   * If `true`, the node will receive [constant NOTIFICATION_LOCAL_TRANSFORM_CHANGED] whenever its local transform changes.
   *
   * **Note:** Many canvas items such as [Bone2D] or [CollisionShape2D] automatically enable this in order to function correctly.
   *
   */
  set_notify_local_transform(enable: boolean): void

  /**
   * If `true`, the node will receive [constant NOTIFICATION_TRANSFORM_CHANGED] whenever its global transform changes.
   *
   * **Note:** Many canvas items such as [Camera2D] or [Light2D] automatically enable this in order to function correctly.
   *
   */
  set_notify_transform(enable: boolean): void

  /** Set/clear individual bits on the rendering visibility layer. This simplifies editing this [CanvasItem]'s visibility layer. */
  set_visibility_layer_bit(layer: int, enabled: boolean): void

  /**
   * Show the [CanvasItem] if it's currently hidden. This is equivalent to setting [member visible] to `true`.
   *
   * **Note:** For controls that inherit [Popup], the correct way to make them visible is to call one of the multiple `popup*()` functions instead.
   *
   */
  show(): void

  connect<T extends SignalsOf<CanvasItem>>(
    signal: T,
    method: SignalFunction<CanvasItem[T]>
  ): number

  /**
   * Notification received when this node's global transform changes, if [method is_transform_notification_enabled] is `true`. See also [method set_notify_transform] and [method get_transform].
   *
   * **Note:** Many canvas items such as [Camera2D] or [CollisionObject2D] automatically enable this in order to function correctly.
   *
   */
  static NOTIFICATION_TRANSFORM_CHANGED: any

  /**
   * Notification received when this node's transform changes, if [method is_local_transform_notification_enabled] is `true`. This is not received when a parent [Node2D]'s transform changes. See also [method set_notify_local_transform].
   *
   * **Note:** Many canvas items such as [Camera2D] or [CollisionShape2D] automatically enable this in order to function correctly.
   *
   */
  static NOTIFICATION_LOCAL_TRANSFORM_CHANGED: any

  /**
   * The [CanvasItem] is requested to draw (see [method _draw]).
   *
   */
  static NOTIFICATION_DRAW: any

  /**
   * Notification received when this node's visibility changes (see [member visible] and [method is_visible_in_tree]).
   *
   * This notification is received **before** the related [signal visibility_changed] signal.
   *
   */
  static NOTIFICATION_VISIBILITY_CHANGED: any

  /**
   * The [CanvasItem] has entered the canvas.
   *
   */
  static NOTIFICATION_ENTER_CANVAS: any

  /**
   * The [CanvasItem] has exited the canvas.
   *
   * This notification is sent in reversed order.
   *
   */
  static NOTIFICATION_EXIT_CANVAS: any

  /**
   * Notification received when this [CanvasItem] is registered to a new [World2D] (see [method get_world_2d]).
   *
   */
  static NOTIFICATION_WORLD_2D_CHANGED: any

  /**
   * The [CanvasItem] will inherit the filter from its parent.
   *
   */
  static TEXTURE_FILTER_PARENT_NODE: any

  /**
   * The texture filter reads from the nearest pixel only. This makes the texture look pixelated from up close, and grainy from a distance (due to mipmaps not being sampled).
   *
   */
  static TEXTURE_FILTER_NEAREST: any

  /**
   * The texture filter blends between the nearest 4 pixels. This makes the texture look smooth from up close, and grainy from a distance (due to mipmaps not being sampled).
   *
   */
  static TEXTURE_FILTER_LINEAR: any

  /**
   * The texture filter reads from the nearest pixel and blends between the nearest 2 mipmaps (or uses the nearest mipmap if [member ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter] is `true`). This makes the texture look pixelated from up close, and smooth from a distance.
   *
   * Use this for non-pixel art textures that may be viewed at a low scale (e.g. due to [Camera2D] zoom or sprite scaling), as mipmaps are important to smooth out pixels that are smaller than on-screen pixels.
   *
   */
  static TEXTURE_FILTER_NEAREST_WITH_MIPMAPS: any

  /**
   * The texture filter blends between the nearest 4 pixels and between the nearest 2 mipmaps (or uses the nearest mipmap if [member ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter] is `true`). This makes the texture look smooth from up close, and smooth from a distance.
   *
   * Use this for non-pixel art textures that may be viewed at a low scale (e.g. due to [Camera2D] zoom or sprite scaling), as mipmaps are important to smooth out pixels that are smaller than on-screen pixels.
   *
   */
  static TEXTURE_FILTER_LINEAR_WITH_MIPMAPS: any

  /**
   * The texture filter reads from the nearest pixel and blends between 2 mipmaps (or uses the nearest mipmap if [member ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter] is `true`) based on the angle between the surface and the camera view. This makes the texture look pixelated from up close, and smooth from a distance. Anisotropic filtering improves texture quality on surfaces that are almost in line with the camera, but is slightly slower. The anisotropic filtering level can be changed by adjusting [member ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level].
   *
   * **Note:** This texture filter is rarely useful in 2D projects. [constant TEXTURE_FILTER_NEAREST_WITH_MIPMAPS] is usually more appropriate in this case.
   *
   */
  static TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC: any

  /**
   * The texture filter blends between the nearest 4 pixels and blends between 2 mipmaps (or uses the nearest mipmap if [member ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter] is `true`) based on the angle between the surface and the camera view. This makes the texture look smooth from up close, and smooth from a distance. Anisotropic filtering improves texture quality on surfaces that are almost in line with the camera, but is slightly slower. The anisotropic filtering level can be changed by adjusting [member ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level].
   *
   * **Note:** This texture filter is rarely useful in 2D projects. [constant TEXTURE_FILTER_LINEAR_WITH_MIPMAPS] is usually more appropriate in this case.
   *
   */
  static TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC: any

  /**
   * Represents the size of the [enum TextureFilter] enum.
   *
   */
  static TEXTURE_FILTER_MAX: any

  /**
   * The [CanvasItem] will inherit the filter from its parent.
   *
   */
  static TEXTURE_REPEAT_PARENT_NODE: any

  /**
   * The texture does not repeat. Sampling the texture outside its extents will result in "stretching" of the edge pixels. You can avoid this by ensuring a 1-pixel fully transparent border on each side of the texture.
   *
   */
  static TEXTURE_REPEAT_DISABLED: any

  /**
   * The texture repeats when exceeding the texture's size.
   *
   */
  static TEXTURE_REPEAT_ENABLED: any

  /**
   * The texture repeats when the exceeding the texture's size in a "2×2 tiled mode". Repeated textures at even positions are mirrored.
   *
   */
  static TEXTURE_REPEAT_MIRROR: any

  /**
   * Represents the size of the [enum TextureRepeat] enum.
   *
   */
  static TEXTURE_REPEAT_MAX: any

  /**
   * Children are drawn over this node and are not clipped.
   *
   */
  static CLIP_CHILDREN_DISABLED: any

  /**
   * This node is used as a mask and is **not** drawn. The mask is based on this node's alpha channel: Opaque pixels are kept, transparent pixels are discarded, and semi-transparent pixels are blended in according to their opacity. Children are clipped to this node's drawn area.
   *
   */
  static CLIP_CHILDREN_ONLY: any

  /**
   * This node is used as a mask and is also drawn. The mask is based on this node's alpha channel: Opaque pixels are kept, transparent pixels are discarded, and semi-transparent pixels are blended in according to their opacity. Children are clipped to the parent's drawn area.
   *
   */
  static CLIP_CHILDREN_AND_DRAW: any

  /**
   * Represents the size of the [enum ClipChildrenMode] enum.
   *
   */
  static CLIP_CHILDREN_MAX: any

  /**
   * Emitted when the [CanvasItem] must redraw, **after** the related [constant NOTIFICATION_DRAW] notification, and **before** [method _draw] is called.
   *
   * **Note:** Deferred connections do not allow drawing through the `draw_*` methods.
   *
   */
  $draw: Signal<() => void>

  /**
   * Emitted when this node becomes hidden, i.e. it's no longer visible in the tree (see [method is_visible_in_tree]).
   *
   */
  $hidden: Signal<() => void>

  /**
   * Emitted when the [CanvasItem]'s boundaries (position or size) change, or when an action took place that may have affected these boundaries (e.g. changing [member Sprite2D.texture]).
   *
   */
  $item_rect_changed: Signal<() => void>

  /**
   * Emitted when the [CanvasItem]'s visibility changes, either because its own [member visible] property changed or because its visibility in the tree changed (see [method is_visible_in_tree]).
   *
   * This signal is emitted **after** the related [constant NOTIFICATION_VISIBILITY_CHANGED] notification.
   *
   */
  $visibility_changed: Signal<() => void>
}
