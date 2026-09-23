/**
 * A socket server.
 *
 */
declare class SocketServer extends RefCounted {
  /**
   * A socket server.
   *
   */
  new(): SocketServer
  constructor()
  static new(): SocketServer

  /** Returns [code]true[/code] if a connection is available for taking. */
  is_connection_available(): boolean

  /** Returns [code]true[/code] if the server is currently listening for connections. */
  is_listening(): boolean

  /** Stops listening. */
  stop(): void

  /** If a connection is available, returns a StreamPeerSocket with the connection. */
  take_socket_connection(): StreamPeerSocket

  connect<T extends SignalsOf<SocketServer>>(
    signal: T,
    method: SignalFunction<SocketServer[T]>
  ): number
}
