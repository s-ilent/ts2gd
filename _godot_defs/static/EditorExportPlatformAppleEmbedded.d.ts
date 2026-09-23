/**
 * The base class for Apple embedded platform exporters. These include iOS and visionOS, but not macOS. See the classes inheriting from this one for more details.
 *
 */
declare class EditorExportPlatformAppleEmbedded extends EditorExportPlatform {
  /**
   * The base class for Apple embedded platform exporters. These include iOS and visionOS, but not macOS. See the classes inheriting from this one for more details.
   *
   */
  new(): EditorExportPlatformAppleEmbedded
  constructor()
  static new(): EditorExportPlatformAppleEmbedded

  connect<T extends SignalsOf<EditorExportPlatformAppleEmbedded>>(
    signal: T,
    method: SignalFunction<EditorExportPlatformAppleEmbedded[T]>
  ): number
}
