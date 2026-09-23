/**
 */
declare class StatusIndicator extends Node {
  /**
   */
  new(): StatusIndicator
  constructor()
  static new(): StatusIndicator

  /** Status indicator icon. */
  icon: Texture2D

  /**
   * Status indicator native popup menu. If this is set, the [signal pressed] signal is not emitted.
   *
   * **Note:** Native popup is only supported if [NativeMenu] supports [constant NativeMenu.FEATURE_POPUP_MENU] feature.
   *
   */
  menu: NodePathType

  /** Status indicator tooltip. */
  tooltip: string

  /** If [code]true[/code], the status indicator is visible. */
  visible: boolean

  /** Returns the status indicator rectangle in screen coordinates. If this status indicator is not visible, returns an empty [Rect2]. */
  get_rect(): Rect2

  connect<T extends SignalsOf<StatusIndicator>>(
    signal: T,
    method: SignalFunction<StatusIndicator[T]>
  ): number

  /**
   * Emitted when the status indicator is pressed.
   *
   */
  $pressed: Signal<() => void>
}
