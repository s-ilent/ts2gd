/**
 * A node that displays 2D texture information in a 3D environment. See also [Sprite3D] where many other properties are defined.
 *
 */
declare class SpriteBase3D extends GeometryInstance3D {
  /**
   * A node that displays 2D texture information in a 3D environment. See also [Sprite3D] where many other properties are defined.
   *
   */
  new(): SpriteBase3D
  constructor()
  static new(): SpriteBase3D

  /** Threshold at which antialiasing will be applied on the alpha channel. */
  alpha_antialiasing_edge: float

  /** The type of alpha antialiasing to apply. */
  alpha_antialiasing_mode: int

  /** The alpha cutting mode to use for the sprite. */
  alpha_cut: int

  /** The hashing scale for Alpha Hash. Recommended values between [code]0[/code] and [code]2[/code]. */
  alpha_hash_scale: float

  /** Threshold at which the alpha scissor will discard values. */
  alpha_scissor_threshold: float

  /** The direction in which the front of the texture faces. */
  axis: int

  /**
   * The billboard mode to use for the sprite.
   *
   * **Note:** When billboarding is enabled and the material also casts shadows, billboards will face **the** camera in the scene when rendering shadows. In scenes with multiple cameras, the intended shadow cannot be determined and this will result in undefined behavior. See [url=https://github.com/godotengine/godot/pull/72638]GitHub Pull Request #72638[/url] for details.
   *
   */
  billboard: int

  /** If [code]true[/code], texture will be centered. */
  centered: boolean

  /** If [code]true[/code], texture can be seen from the back as well, if [code]false[/code], it is invisible when looking at it from behind. */
  double_sided: boolean

  /** If [code]true[/code], the texture is rendered at the same size regardless of distance. The texture's size on screen is the same as if the camera was [code]1.0[/code] units away from the texture's origin, regardless of the actual distance from the camera. The [Camera3D]'s field of view (or [member Camera3D.size] when in orthogonal/frustum mode) still affects the size the sprite is drawn at. */
  fixed_size: boolean

  /** If [code]true[/code], texture is flipped horizontally. */
  flip_h: boolean

  /** If [code]true[/code], texture is flipped vertically. */
  flip_v: boolean

  /**
   * A color value used to **multiply** the texture's colors. Can be used for mood-coloring or to simulate the color of ambient light.
   *
   * **Note:** Unlike [member CanvasItem.modulate] for 2D, colors with values above `1.0` (overbright) are not supported.
   *
   * **Note:** If a [member GeometryInstance3D.material_override] is defined on the [SpriteBase3D], the material override must be configured to take vertex colors into account for albedo. Otherwise, the color defined in [member modulate] will be ignored. For a [BaseMaterial3D], [member BaseMaterial3D.vertex_color_use_as_albedo] must be `true`. For a [ShaderMaterial], `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function.
   *
   */
  modulate: Color

  /** If [code]true[/code], depth testing is disabled and the object will be drawn in render order. */
  no_depth_test: boolean

  /**
   * The texture's drawing offset.
   *
   * **Note:** When you increase [member offset].y in Sprite3D, the sprite moves upward in world space (i.e., +Y is up).
   *
   */
  offset: Vector2

  /** The size of one pixel's width on the sprite to scale it in 3D. */
  pixel_size: float

  /**
   * Sets the render priority for the sprite. Higher priority objects will be sorted in front of lower priority objects.
   *
   * **Note:** This only applies if [member alpha_cut] is set to [constant ALPHA_CUT_DISABLED] (default value).
   *
   * **Note:** This only applies to sorting of transparent objects. This will not impact how transparent objects are sorted relative to opaque objects. This is because opaque objects are not sorted, while transparent objects are sorted from back to front (subject to priority).
   *
   */
  render_priority: int

  /** If [code]true[/code], the [Light3D] in the [Environment] has effects on the sprite. */
  shaded: boolean

  /**
   * Filter flags for the texture.
   *
   * **Note:** Linear filtering may cause artifacts around the edges, which are especially noticeable on opaque textures. To prevent this, use textures with transparent or identical colors around the edges.
   *
   */
  texture_filter: int

  /** If [code]true[/code], the texture's transparency and the opacity are used to make those parts of the sprite invisible. */
  transparent: boolean

  /** Returns a [TriangleMesh] with the sprite's vertices following its current configuration (such as its [member axis] and [member pixel_size]). */
  generate_triangle_mesh(): TriangleMesh

  /** Returns the value of the specified flag. */
  get_draw_flag(flag: int): boolean

  /** Returns the rectangle representing this sprite. */
  get_item_rect(): Rect2

  /** If [code]true[/code], the specified flag will be enabled. */
  set_draw_flag(flag: int, enabled: boolean): void

  connect<T extends SignalsOf<SpriteBase3D>>(
    signal: T,
    method: SignalFunction<SpriteBase3D[T]>
  ): number

  /**
   * If set, the texture's transparency and the opacity are used to make those parts of the sprite invisible.
   *
   */
  static FLAG_TRANSPARENT: any

  /**
   * If set, lights in the environment affect the sprite.
   *
   */
  static FLAG_SHADED: any

  /**
   * If set, texture can be seen from the back as well. If not, the texture is invisible when looking at it from behind.
   *
   */
  static FLAG_DOUBLE_SIDED: any

  /**
   * Disables the depth test, so this object is drawn on top of all others. However, objects drawn after it in the draw order may cover it.
   *
   */
  static FLAG_DISABLE_DEPTH_TEST: any

  /**
   * Label is scaled by depth so that it always appears the same size on screen.
   *
   */
  static FLAG_FIXED_SIZE: any

  /**
   * Represents the size of the [enum DrawFlags] enum.
   *
   */
  static FLAG_MAX: any

  /**
   * This mode performs standard alpha blending. It can display translucent areas, but transparency sorting issues may be visible when multiple transparent materials are overlapping.
   *
   */
  static ALPHA_CUT_DISABLED: any

  /**
   * This mode only allows fully transparent or fully opaque pixels. Harsh edges will be visible unless some form of screen-space antialiasing is enabled (see [member ProjectSettings.rendering/anti_aliasing/quality/screen_space_aa]). On the bright side, this mode doesn't suffer from transparency sorting issues when multiple transparent materials are overlapping. This mode is also known as **alpha testing** or **1-bit transparency**.
   *
   */
  static ALPHA_CUT_DISCARD: any

  /**
   * This mode draws fully opaque pixels in the depth prepass. This is slower than [constant ALPHA_CUT_DISABLED] or [constant ALPHA_CUT_DISCARD], but it allows displaying translucent areas and smooth edges while using proper sorting.
   *
   */
  static ALPHA_CUT_OPAQUE_PREPASS: any

  /**
   * This mode draws cuts off all values below a spatially-deterministic threshold, the rest will remain opaque.
   *
   */
  static ALPHA_CUT_HASH: any
}
