/**
 * Camera node for 2D scenes. It forces the screen (current layer) to scroll following this node. This makes it easier (and faster) to program scrollable scenes than manually changing the position of [CanvasItem]-based nodes.
 *
 * Cameras register themselves in the nearest [Viewport] node (when ascending the tree). Only one camera can be active per viewport. If no viewport is available ascending the tree, the camera will register in the global viewport.
 *
 * This node is intended to be a simple helper to get things going quickly, but more functionality may be desired to change how the camera works. To make your own custom camera node, inherit it from [Node2D] and change the transform of the canvas by setting [member Viewport.canvas_transform] in [Viewport] (you can obtain the current [Viewport] by using [method Node.get_viewport]).
 *
 * Note that the [Camera2D] node's [member Node2D.global_position] doesn't represent the actual position of the screen, which may differ due to applied smoothing or limits. You can use [method get_screen_center_position] to get the real position. Same for the node's [member Node2D.global_rotation] which may be different due to applied rotation smoothing. You can use [method get_screen_rotation] to get the current rotation of the screen.
 *
 */
declare class Camera2D extends Node2D {
  /**
   * Camera node for 2D scenes. It forces the screen (current layer) to scroll following this node. This makes it easier (and faster) to program scrollable scenes than manually changing the position of [CanvasItem]-based nodes.
   *
   * Cameras register themselves in the nearest [Viewport] node (when ascending the tree). Only one camera can be active per viewport. If no viewport is available ascending the tree, the camera will register in the global viewport.
   *
   * This node is intended to be a simple helper to get things going quickly, but more functionality may be desired to change how the camera works. To make your own custom camera node, inherit it from [Node2D] and change the transform of the canvas by setting [member Viewport.canvas_transform] in [Viewport] (you can obtain the current [Viewport] by using [method Node.get_viewport]).
   *
   * Note that the [Camera2D] node's [member Node2D.global_position] doesn't represent the actual position of the screen, which may differ due to applied smoothing or limits. You can use [method get_screen_center_position] to get the real position. Same for the node's [member Node2D.global_rotation] which may be different due to applied rotation smoothing. You can use [method get_screen_rotation] to get the current rotation of the screen.
   *
   */
  new(): Camera2D
  constructor()
  static new(): Camera2D

  /** The Camera2D's anchor point. */
  anchor_mode: int

  /** The custom [Viewport] node attached to the [Camera2D]. If [code]null[/code] or not a [Viewport], uses the default viewport instead. */
  custom_viewport: Node

  /** Bottom margin needed to drag the camera. A value of [code]1[/code] makes the camera move only when reaching the bottom edge of the screen. */
  drag_bottom_margin: float

  /** If [code]true[/code], the camera only moves when reaching the horizontal (left and right) drag margins. If [code]false[/code], the camera moves horizontally regardless of margins. */
  drag_horizontal_enabled: boolean

  /**
   * The relative horizontal drag offset of the camera between the right (`-1`) and left (`1`) drag margins.
   *
   * **Note:** Used to set the initial horizontal drag offset; determine the current offset; or force the current offset. It's not automatically updated when [member drag_horizontal_enabled] is `true` or the drag margins are changed.
   *
   */
  drag_horizontal_offset: float

  /** Left margin needed to drag the camera. A value of [code]1[/code] makes the camera move only when reaching the left edge of the screen. */
  drag_left_margin: float

  /** Right margin needed to drag the camera. A value of [code]1[/code] makes the camera move only when reaching the right edge of the screen. */
  drag_right_margin: float

  /** Top margin needed to drag the camera. A value of [code]1[/code] makes the camera move only when reaching the top edge of the screen. */
  drag_top_margin: float

  /** If [code]true[/code], the camera only moves when reaching the vertical (top and bottom) drag margins. If [code]false[/code], the camera moves vertically regardless of the drag margins. */
  drag_vertical_enabled: boolean

  /**
   * The relative vertical drag offset of the camera between the bottom (`-1`) and top (`1`) drag margins.
   *
   * **Note:** Used to set the initial vertical drag offset; determine the current offset; or force the current offset. It's not automatically updated when [member drag_vertical_enabled] is `true` or the drag margins are changed.
   *
   */
  drag_vertical_offset: float

  /** If [code]true[/code], draws the camera's drag margin rectangle in the editor. */
  editor_draw_drag_margin: boolean

  /** If [code]true[/code], draws the camera's limits rectangle in the editor. */
  editor_draw_limits: boolean

  /** If [code]true[/code], draws the camera's screen rectangle in the editor. */
  editor_draw_screen: boolean

  /**
   * Controls whether the camera can be active or not. If `true`, the [Camera2D] will become the main camera when it enters the scene tree and there is no active camera currently (see [method Viewport.get_camera_2d]).
   *
   * When the camera is currently active and [member enabled] is set to `false`, the next enabled [Camera2D] in the scene tree will become active.
   *
   */
  enabled: boolean

  /** If [code]true[/code], the camera's rendered view is not affected by its [member Node2D.rotation] and [member Node2D.global_rotation]. */
  ignore_rotation: boolean

  /** Bottom scroll limit in pixels. The camera stops moving when reaching this value, but [member offset] can push the view past the limit. */
  limit_bottom: int

  /** If [code]true[/code], the limits will be enabled. Disabling this will allow the camera to focus anywhere, when the four [code]limit_*[/code] properties will not work. */
  limit_enabled: boolean

  /** Left scroll limit in pixels. The camera stops moving when reaching this value, but [member offset] can push the view past the limit. */
  limit_left: int

  /** Right scroll limit in pixels. The camera stops moving when reaching this value, but [member offset] can push the view past the limit. */
  limit_right: int

  /**
   * If `true`, the camera smoothly stops when reaches its limits.
   *
   * This property has no effect if [member position_smoothing_enabled] is `false`.
   *
   * **Note:** To immediately update the camera's position to be within limits without smoothing, even with this setting enabled, invoke [method reset_smoothing].
   *
   */
  limit_smoothed: boolean

  /** Top scroll limit in pixels. The camera stops moving when reaching this value, but [member offset] can push the view past the limit. */
  limit_top: int

  /** The camera's relative offset. Useful for looking around or camera shake animations. The offsetted camera can go past the limits defined in [member limit_top], [member limit_bottom], [member limit_left] and [member limit_right]. */
  offset: Vector2

  /** If [code]true[/code], the camera's view smoothly moves towards its target position at [member position_smoothing_speed]. */
  position_smoothing_enabled: boolean

  /** Speed in pixels per second of the camera's smoothing effect when [member position_smoothing_enabled] is [code]true[/code]. */
  position_smoothing_speed: float

  /** The camera's process callback. */
  process_callback: int

  /**
   * If `true`, the camera's view smoothly rotates, via asymptotic smoothing, to align with its target rotation at [member rotation_smoothing_speed].
   *
   * **Note:** This property has no effect if [member ignore_rotation] is `true`.
   *
   */
  rotation_smoothing_enabled: boolean

  /** The angular, asymptotic speed of the camera's rotation smoothing effect when [member rotation_smoothing_enabled] is [code]true[/code]. */
  rotation_smoothing_speed: float

  /**
   * The camera's zoom. Higher values are more zoomed in. For example, a zoom of `Vector2(2.0, 2.0)` will be twice as zoomed in on each axis (the view covers an area four times smaller). In contrast, a zoom of `Vector2(0.5, 0.5)` will be twice as zoomed out on each axis (the view covers an area four times larger). The X and Y components should generally always be set to the same value, unless you wish to stretch the camera view.
   *
   * **Note:** [member FontFile.oversampling] does **not** take [Camera2D] zoom into account. This means that zooming in/out will cause bitmap fonts and rasterized (non-MSDF) dynamic fonts to appear blurry or pixelated unless the font is part of a [CanvasLayer] that makes it ignore camera zoom. To ensure text remains crisp regardless of zoom, you can enable MSDF font rendering by enabling [member ProjectSettings.gui/theme/default_font_multichannel_signed_distance_field] (applies to the default project font only), or enabling **Multichannel Signed Distance Field** in the import options of a DynamicFont for custom fonts. On system fonts, [member SystemFont.multichannel_signed_distance_field] can be enabled in the inspector.
   *
   */
  zoom: Vector2

  /** Aligns the camera to the tracked node. */
  align(): void

  /** Forces the camera to update scroll immediately. */
  force_update_scroll(): void

  /** Returns the specified [enum Side]'s margin. See also [member drag_bottom_margin], [member drag_top_margin], [member drag_left_margin], and [member drag_right_margin]. */
  get_drag_margin(margin: int): float

  /** Returns the camera limit for the specified [enum Side]. See also [member limit_bottom], [member limit_top], [member limit_left], and [member limit_right]. */
  get_limit(margin: int): int

  /**
   * Returns the center of the screen from this camera's point of view, in global coordinates.
   *
   * **Note:** The exact targeted position of the camera may be different. See [method get_target_position].
   *
   */
  get_screen_center_position(): Vector2

  /**
   * Returns the current screen rotation from this camera's point of view.
   *
   * **Note:** The screen rotation can be different from [member Node2D.global_rotation] if the camera is rotating smoothly due to [member rotation_smoothing_enabled].
   *
   */
  get_screen_rotation(): float

  /**
   * Returns this camera's target position, in global coordinates.
   *
   * **Note:** The returned value is not the same as [member Node2D.global_position], as it is affected by the drag properties. It is also not the same as the current position if [member position_smoothing_enabled] is `true` (see [method get_screen_center_position]).
   *
   */
  get_target_position(): Vector2

  /** Returns [code]true[/code] if this [Camera2D] is the active camera (see [method Viewport.get_camera_2d]). */
  is_current(): boolean

  /** Forces this [Camera2D] to become the current active one. [member enabled] must be [code]true[/code]. */
  make_current(): void

  /**
   * Sets the camera's position immediately to its current smoothing destination.
   *
   * This method has no effect if [member position_smoothing_enabled] is `false`.
   *
   */
  reset_smoothing(): void

  /** Sets the specified [enum Side]'s margin. See also [member drag_bottom_margin], [member drag_top_margin], [member drag_left_margin], and [member drag_right_margin]. */
  set_drag_margin(margin: int, drag_margin: float): void

  /** Sets the camera limit for the specified [enum Side]. See also [member limit_bottom], [member limit_top], [member limit_left], and [member limit_right]. */
  set_limit(margin: int, limit: int): void

  connect<T extends SignalsOf<Camera2D>>(
    signal: T,
    method: SignalFunction<Camera2D[T]>
  ): number

  /**
   * The camera's position is fixed so that the top-left corner is always at the origin.
   *
   */
  static ANCHOR_MODE_FIXED_TOP_LEFT: any

  /**
   * The camera's position takes into account vertical/horizontal offsets and the screen size.
   *
   */
  static ANCHOR_MODE_DRAG_CENTER: any

  /**
   * The camera updates during physics frames (see [constant Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS]).
   *
   */
  static CAMERA2D_PROCESS_PHYSICS: any

  /**
   * The camera updates during process frames (see [constant Node.NOTIFICATION_INTERNAL_PROCESS]).
   *
   */
  static CAMERA2D_PROCESS_IDLE: any
}
