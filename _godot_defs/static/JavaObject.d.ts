/**
 * Represents an object from the Java Native Interface. It can be returned from Java methods called on [JavaClass] or other [JavaObject]s. See [JavaClassWrapper] for an example.
 *
 * **Note:** This class only works on Android. On any other platform, this class does nothing.
 *
 * **Note:** This class is not to be confused with [JavaScriptObject].
 *
 */
declare class JavaObject extends RefCounted {
  /**
   * Represents an object from the Java Native Interface. It can be returned from Java methods called on [JavaClass] or other [JavaObject]s. See [JavaClassWrapper] for an example.
   *
   * **Note:** This class only works on Android. On any other platform, this class does nothing.
   *
   * **Note:** This class is not to be confused with [JavaScriptObject].
   *
   */
  new(): JavaObject
  constructor()
  static new(): JavaObject

  /** Returns the [JavaClass] that this object is an instance of. */
  get_java_class(): JavaClass

  /** Returns [code]true[/code] if the given [param method] name exists in the object's Java methods. */
  has_java_method(method: StringName): boolean

  connect<T extends SignalsOf<JavaObject>>(
    signal: T,
    method: SignalFunction<JavaObject[T]>
  ): number
}
