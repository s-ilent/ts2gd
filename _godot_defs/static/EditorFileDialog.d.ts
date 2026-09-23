/**
 * [EditorFileDialog] is a [FileDialog] tweaked to work in the editor. It automatically handles favorite and recent directory lists, and synchronizes some properties with their corresponding editor settings.
 *
 * [EditorFileDialog] will automatically show a native dialog based on the [member EditorSettings.interface/editor/use_native_file_dialogs] editor setting and ignores [member FileDialog.use_native_dialog].
 *
 * **Note:** [EditorFileDialog] is invisible by default. To make it visible, call one of the `popup_*` methods from [Window] on the node, such as [method Window.popup_centered_clamped].
 *
 */
declare class EditorFileDialog extends FileDialog {
  /**
   * [EditorFileDialog] is a [FileDialog] tweaked to work in the editor. It automatically handles favorite and recent directory lists, and synchronizes some properties with their corresponding editor settings.
   *
   * [EditorFileDialog] will automatically show a native dialog based on the [member EditorSettings.interface/editor/use_native_file_dialogs] editor setting and ignores [member FileDialog.use_native_dialog].
   *
   * **Note:** [EditorFileDialog] is invisible by default. To make it visible, call one of the `popup_*` methods from [Window] on the node, such as [method Window.popup_centered_clamped].
   *
   */
  new(): EditorFileDialog
  constructor()
  static new(): EditorFileDialog

  /** If [code]true[/code], the [EditorFileDialog] will not warn the user before overwriting files. */
  disable_overwrite_warning: boolean

  /** This method is kept for compatibility and does nothing. As an alternative, you can display another dialog after showing the file dialog. */
  add_side_menu(menu: Control, title?: string): void

  connect<T extends SignalsOf<EditorFileDialog>>(
    signal: T,
    method: SignalFunction<EditorFileDialog[T]>
  ): number
}
