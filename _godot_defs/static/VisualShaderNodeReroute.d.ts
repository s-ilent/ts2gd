/**
 * Automatically adapts its port type to the type of the incoming connection and ensures valid connections.
 *
 */
declare class VisualShaderNodeReroute extends VisualShaderNode {
  /**
   * Automatically adapts its port type to the type of the incoming connection and ensures valid connections.
   *
   */
  new(): VisualShaderNodeReroute
  constructor()
  static new(): VisualShaderNodeReroute

  /** Returns the port type of the reroute node. */
  get_port_type(): int

  connect<T extends SignalsOf<VisualShaderNodeReroute>>(
    signal: T,
    method: SignalFunction<VisualShaderNodeReroute[T]>
  ): number
}
