/**
 * Represents a class from the Java Native Interface. It is returned from [method JavaClassWrapper.wrap].
 *
 * **Note:** This class only works on Android. On any other platform, this class does nothing.
 *
 * **Note:** This class is not to be confused with [JavaScriptObject].
 *
 */
declare class JavaClass extends RefCounted {
  /**
   * Represents a class from the Java Native Interface. It is returned from [method JavaClassWrapper.wrap].
   *
   * **Note:** This class only works on Android. On any other platform, this class does nothing.
   *
   * **Note:** This class is not to be confused with [JavaScriptObject].
   *
   */
  new(): JavaClass
  constructor()
  static new(): JavaClass

  /** Returns the Java class name. */
  get_java_class_name(): string

  /** Returns the object's Java methods and their signatures as an [Array] of dictionaries, in the same format as [method Object.get_method_list]. */
  get_java_method_list(): Dictionary<any, any>[]

  /** Returns a [JavaClass] representing the Java parent class of this class. */
  get_java_parent_class(): JavaClass

  /** Returns [code]true[/code] if the given [param method] name exists in the object's Java methods. */
  has_java_method(method: StringName): boolean

  connect<T extends SignalsOf<JavaClass>>(
    signal: T,
    method: SignalFunction<JavaClass[T]>
  ): number
}
