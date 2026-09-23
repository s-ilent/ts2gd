/**
 * [NavigationServer3DManager] is the API for registering [NavigationServer3D] implementations and setting the default implementation.
 *
 * **Note:** It is not possible to switch servers at runtime. This class is only used on startup at the server initialization level.
 *
 */
declare class NavigationServer3DManagerClass extends Object {
  /**
   * [NavigationServer3DManager] is the API for registering [NavigationServer3D] implementations and setting the default implementation.
   *
   * **Note:** It is not possible to switch servers at runtime. This class is only used on startup at the server initialization level.
   *
   */
  new(): NavigationServer3DManagerClass
  constructor()
  static new(): NavigationServer3DManagerClass

  /** Registers a [NavigationServer3D] implementation by passing a [param name] and a [Callable] that returns a [NavigationServer3D] object. */
  register_server(name: string, create_callback: Callable): void

  /** Sets the default [NavigationServer3D] implementation to the one identified by [param name], if [param priority] is greater than the priority of the current default implementation. */
  set_default_server(name: string, priority: int): void

  connect<T extends SignalsOf<NavigationServer3DManagerClass>>(
    signal: T,
    method: SignalFunction<NavigationServer3DManagerClass[T]>
  ): number
}
