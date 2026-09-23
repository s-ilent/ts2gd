/**
 * The base class for the desktop platform exporters. These include Windows and Linux/BSD, but not macOS. See the classes inheriting from this one for more details.
 *
 */
declare class EditorExportPlatformPC extends EditorExportPlatform {
  /**
   * The base class for the desktop platform exporters. These include Windows and Linux/BSD, but not macOS. See the classes inheriting from this one for more details.
   *
   */
  new(): EditorExportPlatformPC
  constructor()
  static new(): EditorExportPlatformPC

  connect<T extends SignalsOf<EditorExportPlatformPC>>(
    signal: T,
    method: SignalFunction<EditorExportPlatformPC[T]>
  ): number
}
