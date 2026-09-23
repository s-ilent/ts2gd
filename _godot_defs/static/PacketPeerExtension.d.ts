/**
 */
declare class PacketPeerExtension extends PacketPeer {
  /**
   */
  new(): PacketPeerExtension
  constructor()
  static new(): PacketPeerExtension

  /** No documentation provided. */
  protected _get_available_packet_count(): int

  /** No documentation provided. */
  protected _get_max_packet_size(): int

  /** No documentation provided. */
  protected _get_packet(r_buffer: CPointer, r_buffer_size: CPointer): int

  /** No documentation provided. */
  protected _put_packet(p_buffer: CPointer, p_buffer_size: int): int

  connect<T extends SignalsOf<PacketPeerExtension>>(
    signal: T,
    method: SignalFunction<PacketPeerExtension[T]>
  ): number
}
