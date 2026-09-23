/**
 * The RID [Variant] type is used to access a low-level resource by its unique ID. RIDs are opaque, which means they do not grant access to the resource by themselves. They are used by the low-level server classes, such as [DisplayServer], [RenderingServer], [TextServer], etc.
 *
 * A low-level resource may correspond to a high-level [Resource], such as [Texture] or [Mesh].
 *
 * **Note:** RIDs are only useful during the current session. It won't correspond to a similar resource if sent over a network, or loaded from a file at a later time.
 *
 */
declare class RID {
  /**
   * The RID [Variant] type is used to access a low-level resource by its unique ID. RIDs are opaque, which means they do not grant access to the resource by themselves. They are used by the low-level server classes, such as [DisplayServer], [RenderingServer], [TextServer], etc.
   *
   * A low-level resource may correspond to a high-level [Resource], such as [Texture] or [Mesh].
   *
   * **Note:** RIDs are only useful during the current session. It won't correspond to a similar resource if sent over a network, or loaded from a file at a later time.
   *
   */

  new(): RID
  constructor()

  new(from: RID): RID
  constructor(from: RID)

  static new(): RID

  /** Returns the ID of the referenced low-level resource. */
  get_id(): int

  /** Returns [code]true[/code] if the [RID] is not [code]0[/code]. */
  is_valid(): boolean

  connect<T extends SignalsOf<RID>>(
    signal: T,
    method: SignalFunction<RID[T]>
  ): number
}
