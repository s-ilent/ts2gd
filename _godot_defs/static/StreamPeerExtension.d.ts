/**
 */
declare class StreamPeerExtension extends StreamPeer {
  /**
   */
  new(): StreamPeerExtension
  constructor()
  static new(): StreamPeerExtension

  /** No documentation provided. */
  protected _get_available_bytes(): int

  /** No documentation provided. */
  protected _get_data(
    r_buffer: CPointer,
    r_bytes: int,
    r_received: CPointer
  ): int

  /** No documentation provided. */
  protected _get_partial_data(
    r_buffer: CPointer,
    r_bytes: int,
    r_received: CPointer
  ): int

  /** No documentation provided. */
  protected _put_data(p_data: CPointer, p_bytes: int, r_sent: CPointer): int

  /** No documentation provided. */
  protected _put_partial_data(
    p_data: CPointer,
    p_bytes: int,
    r_sent: CPointer
  ): int

  connect<T extends SignalsOf<StreamPeerExtension>>(
    signal: T,
    method: SignalFunction<StreamPeerExtension[T]>
  ): number
}
