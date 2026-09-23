/**
 * This resource defines a custom rendering effect that can be applied to [Viewport]s through the viewports' [Environment]. You can implement a callback that is called during rendering at a given stage of the rendering pipeline and allows you to insert additional passes. Note that this callback happens on the rendering thread. CompositorEffect is an abstract base class and must be extended to implement specific rendering logic.
 *
 */
declare class CompositorEffect extends Resource {
  /**
   * This resource defines a custom rendering effect that can be applied to [Viewport]s through the viewports' [Environment]. You can implement a callback that is called during rendering at a given stage of the rendering pipeline and allows you to insert additional passes. Note that this callback happens on the rendering thread. CompositorEffect is an abstract base class and must be extended to implement specific rendering logic.
   *
   */
  new(): CompositorEffect
  constructor()
  static new(): CompositorEffect

  /**
   * If `true` and MSAA is enabled, this will trigger a color buffer resolve before the effect is run.
   *
   * **Note:** In [method _render_callback], to access the resolved buffer use:
   *
   * @example
   *
   * var render_scene_buffers = render_data.get_render_scene_buffers()
   * var color_buffer = render_scene_buffers.get_texture("render_buffers", "color")
   * @summary
   *
   *
   */
  access_resolved_color: boolean

  /**
   * If `true` and MSAA is enabled, this will trigger a depth buffer resolve before the effect is run.
   *
   * **Note:** In [method _render_callback], to access the resolved buffer use:
   *
   * @example
   *
   * var render_scene_buffers = render_data.get_render_scene_buffers()
   * var depth_buffer = render_scene_buffers.get_texture("render_buffers", "depth")
   * @summary
   *
   *
   */
  access_resolved_depth: boolean

  /** The type of effect that is implemented, determines at what stage of rendering the callback is called. */
  effect_callback_type: int

  /** If [code]true[/code] this rendering effect is applied to any viewport it is added to. */
  enabled: boolean

  /**
   * If `true` this triggers motion vectors being calculated during the opaque render state.
   *
   * **Note:** In [method _render_callback], to access the motion vector buffer use:
   *
   * @example
   *
   * var render_scene_buffers = render_data.get_render_scene_buffers()
   * var motion_buffer = render_scene_buffers.get_velocity_texture()
   * @summary
   *
   *
   */
  needs_motion_vectors: boolean

  /**
   * If `true` this triggers normal and roughness data to be output during our depth pre-pass, only applicable for the Forward+ renderer.
   *
   * **Note:** In [method _render_callback], to access the roughness buffer use:
   *
   * @example
   *
   * var render_scene_buffers = render_data.get_render_scene_buffers()
   * var roughness_buffer = render_scene_buffers.get_texture("forward_clustered", "normal_roughness")
   * @summary
   *
   *
   * The raw normal and roughness buffer is stored in an optimized format, different than the one available in Spatial shaders. When sampling the buffer, a conversion function must be applied. Use this function, copied from [url=https://github.com/godotengine/godot/blob/da5f39889f155658cef7f7ec3cc1abb94e17d815/servers/rendering/renderer_rd/shaders/forward_clustered/scene_forward_clustered_inc.glsl#L334-L341]here[/url]:
   *
   * @example
   *
   * vec4 normal_roughness_compatibility(vec4 p_normal_roughness) {
   * 	float roughness = p_normal_roughness.w;
   * 	if (roughness > 0.5) {
   * 		roughness = 1.0 - roughness;
   * 	}
   * 	roughness /= (127.0 / 255.0);
   * 	return vec4(normalize(p_normal_roughness.xyz * 2.0 - 1.0) * 0.5 + 0.5, roughness);
   * }
   * @summary
   *
   *
   */
  needs_normal_roughness: boolean

  /** If [code]true[/code] this triggers specular data being rendered to a separate buffer and combined after effects have been applied, only applicable for the Forward+ renderer. */
  needs_separate_specular: boolean

  /** Implement this function with your custom rendering code. [param effect_callback_type] should always match the effect callback type you've specified in [member effect_callback_type]. [param render_data] provides access to the rendering state, it is only valid during rendering and should not be stored. */
  protected _render_callback(
    effect_callback_type: int,
    render_data: RenderData
  ): void

  connect<T extends SignalsOf<CompositorEffect>>(
    signal: T,
    method: SignalFunction<CompositorEffect[T]>
  ): number

  /**
   * The callback is called before our opaque rendering pass, but after depth prepass (if applicable).
   *
   */
  static EFFECT_CALLBACK_TYPE_PRE_OPAQUE: any

  /**
   * The callback is called after our opaque rendering pass, but before our sky is rendered.
   *
   */
  static EFFECT_CALLBACK_TYPE_POST_OPAQUE: any

  /**
   * The callback is called after our sky is rendered, but before our back buffers are created (and if enabled, before subsurface scattering and/or screen space reflections).
   *
   */
  static EFFECT_CALLBACK_TYPE_POST_SKY: any

  /**
   * The callback is called before our transparent rendering pass, but after our sky is rendered and we've created our back buffers.
   *
   */
  static EFFECT_CALLBACK_TYPE_PRE_TRANSPARENT: any

  /**
   * The callback is called after our transparent rendering pass, but before any built-in post-processing effects and output to our render target.
   *
   */
  static EFFECT_CALLBACK_TYPE_POST_TRANSPARENT: any

  /**
   * Represents the size of the [enum EffectCallbackType] enum.
   *
   */
  static EFFECT_CALLBACK_TYPE_MAX: any
}
