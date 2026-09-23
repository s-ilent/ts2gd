/**
 * StreamPeerSocket is an abstract base class that defines common behavior for socket-based streams.
 *
 */
declare class StreamPeerSocket extends StreamPeer {
  /**
   * StreamPeerSocket is an abstract base class that defines common behavior for socket-based streams.
   *
   */
  new(): StreamPeerSocket
  constructor()
  static new(): StreamPeerSocket

  /** Disconnects from host. */
  disconnect_from_host(): void

  /** Returns the status of the connection. */
  get_status(): int

  /** Polls the socket, updating its state. See [method get_status]. */
  poll(): int

  connect<T extends SignalsOf<StreamPeerSocket>>(
    signal: T,
    method: SignalFunction<StreamPeerSocket[T]>
  ): number

  /**
   * The initial status of the [StreamPeerSocket]. This is also the status after disconnecting.
   *
   */
  static STATUS_NONE: any

  /**
   * A status representing a [StreamPeerSocket] that is connecting to a host.
   *
   */
  static STATUS_CONNECTING: any

  /**
   * A status representing a [StreamPeerSocket] that is connected to a host.
   *
   */
  static STATUS_CONNECTED: any

  /**
   * A status representing a [StreamPeerSocket] in error state.
   *
   */
  static STATUS_ERROR: any
}
