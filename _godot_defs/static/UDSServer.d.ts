/**
 * A Unix Domain Socket (UDS) server. Listens to connections on a socket path and returns a [StreamPeerUDS] when it gets an incoming connection. Unix Domain Sockets provide inter-process communication on the same machine using the filesystem namespace.
 *
 * **Note:** Unix Domain Sockets are only available on Unix-like systems (Linux, macOS, etc.) and are not supported on Windows.
 *
 */
declare class UDSServer extends SocketServer {
  /**
   * A Unix Domain Socket (UDS) server. Listens to connections on a socket path and returns a [StreamPeerUDS] when it gets an incoming connection. Unix Domain Sockets provide inter-process communication on the same machine using the filesystem namespace.
   *
   * **Note:** Unix Domain Sockets are only available on Unix-like systems (Linux, macOS, etc.) and are not supported on Windows.
   *
   */
  new(): UDSServer
  constructor()
  static new(): UDSServer

  /**
   * Listens on the socket at [param path]. The socket file will be created at the specified path.
   *
   * **Note:** The socket file must not already exist at the specified path. You may need to remove any existing socket file before calling this method.
   *
   */
  listen(path: string): int

  /** If a connection is available, returns a StreamPeerUDS with the connection. */
  take_connection(): StreamPeerUDS

  connect<T extends SignalsOf<UDSServer>>(
    signal: T,
    method: SignalFunction<UDSServer[T]>
  ): number
}
