/**
 * A stream peer that handles UNIX Domain Socket (UDS) connections. This object can be used to connect to UDS servers, or also is returned by a UDS server. Unix Domain Sockets provide inter-process communication on the same machine using the filesystem namespace.
 *
 * **Note:** UNIX Domain Sockets are only available on UNIX-like systems (Linux, macOS, etc.) and are not supported on Windows.
 *
 */
declare class StreamPeerUDS extends StreamPeerSocket {
  /**
   * A stream peer that handles UNIX Domain Socket (UDS) connections. This object can be used to connect to UDS servers, or also is returned by a UDS server. Unix Domain Sockets provide inter-process communication on the same machine using the filesystem namespace.
   *
   * **Note:** UNIX Domain Sockets are only available on UNIX-like systems (Linux, macOS, etc.) and are not supported on Windows.
   *
   */
  new(): StreamPeerUDS
  constructor()
  static new(): StreamPeerUDS

  /**
   * Opens the UDS socket, and binds it to the specified socket path.
   *
   * This method is generally not needed, and only used to force the subsequent call to [method connect_to_host] to use the specified [param path] as the source address.
   *
   */
  bind(path: string): int

  /** Connects to the specified UNIX Domain Socket path. Returns [constant OK] on success. */
  connect_to_host(path: string): int

  /** Returns the socket path of this peer. */
  get_connected_path(): string

  connect<T extends SignalsOf<StreamPeerUDS>>(
    signal: T,
    method: SignalFunction<StreamPeerUDS[T]>
  ): number
}
