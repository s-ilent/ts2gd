/**
 * This object manages the functionality and display of toast notifications within the editor, ensuring immediate and informative alerts are presented to the user.
 *
 * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_editor_toaster].
 *
 */
declare class EditorToaster extends HBoxContainer {
  /**
   * This object manages the functionality and display of toast notifications within the editor, ensuring immediate and informative alerts are presented to the user.
   *
   * **Note:** This class shouldn't be instantiated directly. Instead, access the singleton using [method EditorInterface.get_editor_toaster].
   *
   */
  new(): EditorToaster
  constructor()
  static new(): EditorToaster

  /** Pushes a toast notification to the editor for display. */
  push_toast(message: string, severity?: int, tooltip?: string): void

  connect<T extends SignalsOf<EditorToaster>>(
    signal: T,
    method: SignalFunction<EditorToaster[T]>
  ): number

  /**
   * Toast will display with an INFO severity.
   *
   */
  static SEVERITY_INFO: any

  /**
   * Toast will display with a WARNING severity and have a corresponding color.
   *
   */
  static SEVERITY_WARNING: any

  /**
   * Toast will display with an ERROR severity and have a corresponding color.
   *
   */
  static SEVERITY_ERROR: any
}
