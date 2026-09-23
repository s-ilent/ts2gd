/**
 * A container that displays the contents of underlying [SubViewport] child nodes. It uses the combined size of the [SubViewport]s as minimum size, unless [member stretch] is enabled.
 *
 * **Note:** Changing a [SubViewportContainer]'s [member Control.scale] will cause its contents to appear distorted. To change its visual size without causing distortion, adjust the node's margins instead (if it's not already in a container).
 *
 * **Note:** The [SubViewportContainer] forwards mouse-enter and mouse-exit notifications to its sub-viewports.
 *
 */
declare class SubViewportContainer extends Container {
  /**
   * A container that displays the contents of underlying [SubViewport] child nodes. It uses the combined size of the [SubViewport]s as minimum size, unless [member stretch] is enabled.
   *
   * **Note:** Changing a [SubViewportContainer]'s [member Control.scale] will cause its contents to appear distorted. To change its visual size without causing distortion, adjust the node's margins instead (if it's not already in a container).
   *
   * **Note:** The [SubViewportContainer] forwards mouse-enter and mouse-exit notifications to its sub-viewports.
   *
   */
  new(): SubViewportContainer
  constructor()
  static new(): SubViewportContainer

  /**
   * Configure, if either the [SubViewportContainer] or alternatively the [Control] nodes of its [SubViewport] children should be available as targets of mouse-related functionalities, like identifying the drop target in drag-and-drop operations or cursor shape of hovered [Control] node.
   *
   * If `false`, the [Control] nodes inside its [SubViewport] children are considered as targets.
   *
   * If `true`, the [SubViewportContainer] itself will be considered as a target.
   *
   */
  mouse_target: boolean

  /**
   * If `true`, the sub-viewport will be automatically resized to the control's size.
   *
   * **Note:** If `true`, this will prohibit changing [member SubViewport.size] of its children manually.
   *
   */
  stretch: boolean

  /**
   * Divides the sub-viewport's effective resolution by this value while preserving its scale. This can be used to speed up rendering.
   *
   * For example, a 1280×720 sub-viewport with [member stretch_shrink] set to `2` will be rendered at 640×360 while occupying the same size in the container.
   *
   * **Note:** [member stretch] must be `true` for this property to work.
   *
   */
  stretch_shrink: int

  /** Virtual method to be implemented by the user. If it returns [code]true[/code], the [param event] is propagated to [SubViewport] children. Propagation doesn't happen if it returns [code]false[/code]. If the function is not implemented, all events are propagated to SubViewports. */
  protected _propagate_input_event(event: InputEvent): boolean

  connect<T extends SignalsOf<SubViewportContainer>>(
    signal: T,
    method: SignalFunction<SubViewportContainer[T]>
  ): number
}
