/**
 * The JavaClassWrapper singleton provides a way for the Godot application to send and receive data through the [url=https://developer.android.com/training/articles/perf-jni]Java Native Interface[/url] (JNI).
 *
 * **Note:** This singleton is only available in Android builds.
 *
 * @example
 *
 * var LocalDateTime = JavaClassWrapper.wrap("java.time.LocalDateTime")
 * var DateTimeFormatter = JavaClassWrapper.wrap("java.time.format.DateTimeFormatter")
 * var datetime = LocalDateTime.now()
 * var formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")
 * print(datetime.format(formatter))
 * @summary
 *
 *
 * **Warning:** When calling Java methods, be sure to check [method JavaClassWrapper.get_exception] to check if the method threw an exception.
 *
 */
declare class JavaClassWrapperClass extends Object {
  /**
   * The JavaClassWrapper singleton provides a way for the Godot application to send and receive data through the [url=https://developer.android.com/training/articles/perf-jni]Java Native Interface[/url] (JNI).
   *
   * **Note:** This singleton is only available in Android builds.
   *
   * @example
   *
   * var LocalDateTime = JavaClassWrapper.wrap("java.time.LocalDateTime")
   * var DateTimeFormatter = JavaClassWrapper.wrap("java.time.format.DateTimeFormatter")
   * var datetime = LocalDateTime.now()
   * var formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")
   * print(datetime.format(formatter))
   * @summary
   *
   *
   * **Warning:** When calling Java methods, be sure to check [method JavaClassWrapper.get_exception] to check if the method threw an exception.
   *
   */
  new(): JavaClassWrapperClass
  constructor()
  static new(): JavaClassWrapperClass

  /**
   * Returns the Java exception from the last call into a Java class. If there was no exception, it will return `null`.
   *
   * **Note:** This method only works on Android. On every other platform, this method will always return `null`.
   *
   */
  get_exception(): JavaObject

  /**
   * Wraps a class defined in Java, and returns it as a [JavaClass] [Object] type that Godot can interact with.
   *
   * When wrapping inner (nested) classes, use `$` instead of `.` to separate them. For example, `JavaClassWrapper.wrap("android.view.WindowManager$LayoutParams")` wraps the **WindowManager.LayoutParams** class.
   *
   * **Note:** To invoke a constructor, call a method with the same name as the class. For example:
   *
   * @example
   *
   * var Intent = JavaClassWrapper.wrap("android.content.Intent")
   * var intent = Intent.Intent()
   * @summary
   *
   *
   * **Note:** This method only works on Android. On every other platform, this method does nothing and returns an empty [JavaClass].
   *
   */
  wrap(name: string): JavaClass

  connect<T extends SignalsOf<JavaClassWrapperClass>>(
    signal: T,
    method: SignalFunction<JavaClassWrapperClass[T]>
  ): number
}
