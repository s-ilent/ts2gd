/**
 * UDP packet peer. Can be used to send and receive raw UDP packets as well as [Variant]s.
 *
 * **Example:** Send a packet:
 *
 * @example
 *
 * var peer = PacketPeerUDP.new()
 * # Optionally, you can select the local port used to send the packet.
 * peer.bind(4444)
 * peer.set_dest_address("1.1.1.1", 4433)
 * peer.put_packet("hello".to_utf8_buffer())
 * @summary
 *
 *
 * **Example:** Listen for packets:
 *
 * @example
 *
 * var peer
 * func _ready():
 * 	peer = PacketPeerUDP.new()
 * 	peer.bind(4433)
 * func _process(_delta):
 * 	if peer.get_available_packet_count() > 0:
 * 		var array_bytes = peer.get_packet()
 * 		var packet_string = array_bytes.get_string_from_ascii()
 * 		print("Received message: ", packet_string)
 * @summary
 *
 *
 * **Note:** When exporting to Android, make sure to enable the `INTERNET` permission in the Android export preset before exporting the project or using one-click deploy. Otherwise, network communication of any kind will be blocked by Android.
 *
 */
declare class PacketPeerUDP extends PacketPeer {
  /**
   * UDP packet peer. Can be used to send and receive raw UDP packets as well as [Variant]s.
   *
   * **Example:** Send a packet:
   *
   * @example
   *
   * var peer = PacketPeerUDP.new()
   * # Optionally, you can select the local port used to send the packet.
   * peer.bind(4444)
   * peer.set_dest_address("1.1.1.1", 4433)
   * peer.put_packet("hello".to_utf8_buffer())
   * @summary
   *
   *
   * **Example:** Listen for packets:
   *
   * @example
   *
   * var peer
   * func _ready():
   * 	peer = PacketPeerUDP.new()
   * 	peer.bind(4433)
   * func _process(_delta):
   * 	if peer.get_available_packet_count() > 0:
   * 		var array_bytes = peer.get_packet()
   * 		var packet_string = array_bytes.get_string_from_ascii()
   * 		print("Received message: ", packet_string)
   * @summary
   *
   *
   * **Note:** When exporting to Android, make sure to enable the `INTERNET` permission in the Android export preset before exporting the project or using one-click deploy. Otherwise, network communication of any kind will be blocked by Android.
   *
   */
  new(): PacketPeerUDP
  constructor()
  static new(): PacketPeerUDP

  /**
   * Binds this [PacketPeerUDP] to the specified [param port] and [param bind_address] with a buffer size [param recv_buf_size], allowing it to receive incoming packets.
   *
   * If [param bind_address] is set to `"*"` (default), the peer will be bound on all available addresses (both IPv4 and IPv6).
   *
   * If [param bind_address] is set to `"0.0.0.0"` (for IPv4) or `"::"` (for IPv6), the peer will be bound to all available addresses matching that IP type.
   *
   * If [param bind_address] is set to any valid address (e.g. `"192.168.1.101"`, `"::1"`, etc.), the peer will only be bound to the interface with that address (or fail if no interface with the given address exists).
   *
   */
  bind(port: int, bind_address?: string, recv_buf_size?: int): int

  /** Closes the [PacketPeerUDP]'s underlying UDP socket. */
  close(): void

  /**
   * Calling this method connects this UDP peer to the given [param host]/[param port] pair. UDP is in reality connectionless, so this option only means that incoming packets from different addresses are automatically discarded, and that outgoing packets are always sent to the connected address (future calls to [method set_dest_address] are not allowed). This method does not send any data to the remote peer, to do that, use [method PacketPeer.put_var] or [method PacketPeer.put_packet] as usual. See also [UDPServer].
   *
   * **Note:** Connecting to the remote peer does not help to protect from malicious attacks like IP spoofing, etc. Think about using an encryption technique like TLS or DTLS if you feel like your application is transferring sensitive information.
   *
   */
  connect_to_host(host: string, port: int): int

  /** Returns the local port to which this peer is bound. */
  get_local_port(): int

  /** Returns the IP of the remote peer that sent the last packet(that was received with [method PacketPeer.get_packet] or [method PacketPeer.get_var]). */
  get_packet_ip(): string

  /** Returns the port of the remote peer that sent the last packet(that was received with [method PacketPeer.get_packet] or [method PacketPeer.get_var]). */
  get_packet_port(): int

  /** Returns whether this [PacketPeerUDP] is bound to an address and can receive packets. */
  is_bound(): boolean

  /** Returns [code]true[/code] if the UDP socket is open and has been connected to a remote address. See [method connect_to_host]. */
  is_socket_connected(): boolean

  /**
   * Joins the multicast group specified by [param multicast_address] using the interface identified by [param interface_name].
   *
   * You can join the same multicast group with multiple interfaces. Use [method IP.get_local_interfaces] to know which are available.
   *
   * **Note:** Some Android devices might require the `CHANGE_WIFI_MULTICAST_STATE` permission for multicast to work.
   *
   */
  join_multicast_group(multicast_address: string, interface_name: string): int

  /** Removes the interface identified by [param interface_name] from the multicast group specified by [param multicast_address]. */
  leave_multicast_group(multicast_address: string, interface_name: string): int

  /**
   * Enable or disable sending of broadcast packets (e.g. `set_dest_address("255.255.255.255", 4343)`. This option is disabled by default.
   *
   * **Note:** Some Android devices might require the `CHANGE_WIFI_MULTICAST_STATE` permission and this option to be enabled to receive broadcast packets too.
   *
   */
  set_broadcast_enabled(enabled: boolean): void

  /**
   * Sets the destination address and port for sending packets and variables. A hostname will be resolved using DNS if needed.
   *
   * **Note:** [method set_broadcast_enabled] must be enabled before sending packets to a broadcast address (e.g. `255.255.255.255`).
   *
   */
  set_dest_address(host: string, port: int): int

  /**
   * Waits for a packet to arrive on the bound address. See [method bind].
   *
   * **Note:** [method wait] can't be interrupted once it has been called. This can be worked around by allowing the other party to send a specific "death pill" packet like this:
   *
   * @example
   *
   *
   * socket = PacketPeerUDP.new()
   * # Server
   * socket.set_dest_address("127.0.0.1", 789)
   * socket.put_packet("Time to stop".to_ascii_buffer())
   * # Client
   * while socket.wait() == OK:
   * 	var data = socket.get_packet().get_string_from_ascii()
   * 	if data == "Time to stop":
   * 		return
   *
   *
   * var socket = new PacketPeerUdp();
   * // Server
   * socket.SetDestAddress("127.0.0.1", 789);
   * socket.PutPacket("Time to stop".ToAsciiBuffer());
   * // Client
   * while (socket.Wait() == OK)
   * {
   * 	string data = socket.GetPacket().GetStringFromASCII();
   * 	if (data == "Time to stop")
   * 	{
   * 		return;
   * 	}
   * }
   *
   * @summary
   *
   *
   */
  wait(): int

  connect<T extends SignalsOf<PacketPeerUDP>>(
    signal: T,
    method: SignalFunction<PacketPeerUDP[T]>
  ): number
}
