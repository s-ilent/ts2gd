/**
 * [NavigationServer2DManager] is the API for registering [NavigationServer2D] implementations and setting the default implementation.
 *
 * **Note:** It is not possible to switch servers at runtime. This class is only used on startup at the server initialization level.
 *
 */
declare class NavigationServer2DManagerClass extends Object {
  /**
   * [NavigationServer2DManager] is the API for registering [NavigationServer2D] implementations and setting the default implementation.
   *
   * **Note:** It is not possible to switch servers at runtime. This class is only used on startup at the server initialization level.
   *
   */
  new(): NavigationServer2DManagerClass
  constructor()
  static new(): NavigationServer2DManagerClass

  /** Registers a [NavigationServer2D] implementation by passing a [param name] and a [Callable] that returns a [NavigationServer2D] object. */
  register_server(name: string, create_callback: Callable): void

  /** Sets the default [NavigationServer2D] implementation to the one identified by [param name], if [param priority] is greater than the priority of the current default implementation. */
  set_default_server(name: string, priority: int): void

  connect<T extends SignalsOf<NavigationServer2DManagerClass>>(
    signal: T,
    method: SignalFunction<NavigationServer2DManagerClass[T]>
  ): number
}
