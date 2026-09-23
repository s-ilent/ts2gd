/**
 * [Popup] is a base class for contextual windows and panels with fixed position. It's a modal by default (see [member Window.popup_window]) and provides methods for implementing custom popup behavior.
 *
 * **Note:** [Popup] is invisible by default. To make it visible, call one of the `popup_*` methods from [Window] on the node, such as [method Window.popup_centered_clamped].
 *
 */
declare class Popup extends Window {
  /**
   * [Popup] is a base class for contextual windows and panels with fixed position. It's a modal by default (see [member Window.popup_window]) and provides methods for implementing custom popup behavior.
   *
   * **Note:** [Popup] is invisible by default. To make it visible, call one of the `popup_*` methods from [Window] on the node, such as [method Window.popup_centered_clamped].
   *
   */
  new(): Popup
  constructor()
  static new(): Popup

  connect<T extends SignalsOf<Popup>>(
    signal: T,
    method: SignalFunction<Popup[T]>
  ): number

  /**
   * Emitted when the popup is hidden.
   *
   */
  $popup_hide: Signal<() => void>
}
