/**
 * Returns a [Color] constructed from red ([param r8]), green ([param g8]), blue ([param b8]), and optionally alpha ([param a8]) integer channels, each divided by `255.0` for their final value. Using [method Color8] instead of the standard [Color] constructor is useful when you need to match exact color values in an [Image].
 *
 * @example
 *
 * var red = Color8(255, 0, 0)             # Same as Color(1, 0, 0).
 * var dark_blue = Color8(0, 0, 51)        # Same as Color(0, 0, 0.2).
 * var my_color = Color8(306, 255, 0, 102) # Same as Color(1.2, 1, 0, 0.4).
 * @summary
 *
 *
 * **Note:** Due to the lower precision of [method Color8] compared to the standard [Color] constructor, a color created with [method Color8] will generally not be equal to the same color created with the standard [Color] constructor. Use [method Color.is_equal_approx] for comparisons to avoid issues with floating-point precision error.
 *
 */
declare const Color8: (r8: int, g8: int, b8: int, a8?: int) => Color

/**
 * Asserts that the [param condition] is `true`. If the [param condition] is `false`, an error is generated. When running from the editor, the running project will also be paused until you resume it. This can be used as a stronger form of [method @GlobalScope.push_error] for reporting errors to project developers or add-on users.
 *
 * An optional [param message] can be shown in addition to the generic "Assertion failed" message. You can use this to provide additional details about why the assertion failed.
 *
 * **Warning:** For performance reasons, the code inside [method assert] is only executed in debug builds or when running the project from the editor. Don't include code that has side effects in an [method assert] call. Otherwise, the project will behave differently when exported in release mode.
 *
 * @example
 *
 * # Imagine we always want speed to be between 0 and 20.
 * var speed = -10
 * assert(speed < 20) # True, the program will continue.
 * assert(speed >= 0) # False, the program will stop.
 * assert(speed >= 0 and speed < 20) # You can also combine the two conditional statements in one check.
 * assert(speed < 20, "the speed limit is 20") # Show a message.
 * @summary
 *
 *
 * **Note:** [method assert] is a keyword, not a function. So you cannot access it as a [Callable] or use it inside expressions.
 *
 */
declare const assert: (
  condition: boolean,
  message?: string
) => asserts condition

/**
 * Returns a single character (as a [String] of length 1) of the given Unicode code point [param code].
 *
 * @example
 *
 * print(char(65))     # Prints "A"
 * print(char(129302)) # Prints "🤖" (robot face emoji)
 * @summary
 *
 *
 * This is the inverse of [method ord]. See also [method String.chr] and [method String.unicode_at].
 *
 */
declare const char: (code: int) => string

/**
 * Converts [param what] to [param type] in the best way possible. The [param type] uses the [enum Variant.Type] values.
 *
 * @example
 *
 * var a = [4, 2.5, 1.2]
 * print(a is Array) # Prints true
 * var b = convert(a, TYPE_PACKED_BYTE_ARRAY)
 * print(b)          # Prints [4, 2, 1]
 * print(b is Array) # Prints false
 * @summary
 *
 *
 */
declare const convert: (what: any, type: int) => any

/** Converts a [param dictionary] (created with [method inst_to_dict]) back to an Object instance. Can be useful for deserializing. */
declare const dict_to_inst: (dictionary: Dictionary<any, any>) => Object

/**
 * Returns an array of dictionaries representing the current call stack.
 *
 * @example
 *
 * func _ready():
 * 	foo()
 * func foo():
 * 	bar()
 * func bar():
 * 	print(get_stack())
 * @summary
 *
 *
 * Starting from `_ready()`, `bar()` would print:
 *
 * [codeblock lang=text]
 *
 * [{function:bar, line:12, source:res://script.gd}, {function:foo, line:9, source:res://script.gd}, {function:_ready, line:6, source:res://script.gd}]
 *
 * @summary
 *
 *
 * See also [method print_debug], [method print_stack], and [method Engine.capture_script_backtraces].
 *
 * **Note:** By default, backtraces are only available in editor builds and debug builds. To enable them for release builds as well, you need to enable [member ProjectSettings.debug/settings/gdscript/always_track_call_stacks].
 *
 */
declare const get_stack: () => any[]

/**
 * Returns the passed [param instance] converted to a [Dictionary]. Can be useful for serializing.
 *
 * @example
 *
 * var foo = "bar"
 * func _ready():
 * 	var d = inst_to_dict(self)
 * 	print(d.keys())
 * 	print(d.values())
 * @summary
 *
 *
 * Prints out:
 *
 * [codeblock lang=text]
 *
 * [@subpath, @path, foo]
 *
 * [, res://test.gd, bar]
 *
 * @summary
 *
 *
 * **Note:** This function can only be used to serialize objects with an attached [GDScript] stored in a separate file. Objects without an attached script, with a script written in another language, or with a built-in script are not supported.
 *
 * **Note:** This function is not recursive, which means that nested objects will not be represented as dictionaries. Also, properties passed by reference ([Object], [Dictionary], [Array], and packed arrays) are copied by reference, not duplicated.
 *
 */
declare const inst_to_dict: (instance: Object) => Dictionary<any, any>

/**
 * Returns `true` if [param value] is an instance of [param type]. The [param type] value must be one of the following:
 *
 * - A constant from the [enum Variant.Type] enumeration, for example [constant TYPE_INT].
 *
 * - An [Object]-derived class which exists in [ClassDB], for example [Node].
 *
 * - A [Script] (you can use any class, including inner one).
 *
 * Unlike the right operand of the `is` operator, [param type] can be a non-constant value. The `is` operator supports more features (such as typed arrays). Use the operator instead of this method if you do not need to check the type dynamically.
 *
 * **Examples:**
 *
 * @example
 *
 * print(is_instance_of(a, TYPE_INT))
 * print(is_instance_of(a, Node))
 * print(is_instance_of(a, MyClass))
 * print(is_instance_of(a, MyClass.InnerClass))
 * @summary
 *
 *
 * **Note:** If [param value] and/or [param type] are freed objects (see [method @GlobalScope.is_instance_valid]), or [param type] is not one of the above options, this method will raise a runtime error.
 *
 * See also [method @GlobalScope.typeof], [method type_exists], [method Array.is_same_typed] (and other [Array] methods).
 *
 */
declare const is_instance_of: (value: any, type: any) => boolean

/**
 * Returns the length of the given Variant [param var]. The length can be the character count of a [String] or [StringName], the element count of any array type, or the size of a [Dictionary]. For every other Variant type, a run-time error is generated and execution is stopped.
 *
 * @example
 *
 * var a = [1, 2, 3, 4]
 * len(a) # Returns 4
 * var b = "Hello!"
 * len(b) # Returns 6
 * @summary
 *
 *
 */
declare const len: (_var: any) => int

/**
 * Returns an integer representing the Unicode code point of the given character [param char], which should be a string of length 1.
 *
 * @example
 *
 * print(ord("A")) # Prints 65
 * print(ord("🤖")) # Prints 129302
 * @summary
 *
 *
 * This is the inverse of [method char]. See also [method String.chr] and [method String.unicode_at].
 *
 */
declare const ord: (char: string) => int

/**
 * Like [method @GlobalScope.print], but includes the current stack frame when running with the debugger turned on.
 *
 * The output in the console may look like the following:
 *
 * [codeblock lang=text]
 *
 * Test print
 *
 * At: res://test.gd:15:_process()
 *
 * @summary
 *
 *
 * See also [method print_stack], [method get_stack], and [method Engine.capture_script_backtraces].
 *
 * **Note:** By default, backtraces are only available in editor builds and debug builds. To enable them for release builds as well, you need to enable [member ProjectSettings.debug/settings/gdscript/always_track_call_stacks].
 *
 */
declare const print_debug: (...args: any[]) => void

/**
 * Prints a stack trace at the current code location.
 *
 * The output in the console may look like the following:
 *
 * [codeblock lang=text]
 *
 * Frame 0 - res://test.gd:16 in function '_process'
 *
 * @summary
 *
 *
 * See also [method print_debug], [method get_stack], and [method Engine.capture_script_backtraces].
 *
 * **Note:** By default, backtraces are only available in editor builds and debug builds. To enable them for release builds as well, you need to enable [member ProjectSettings.debug/settings/gdscript/always_track_call_stacks].
 *
 */
declare const print_stack: () => void

/**
 * Returns an array with the given range. [method range] can be called in three ways:
 *
 * `range(n: int)`: Starts from 0, increases by steps of 1, and stops **before** `n`. The argument `n` is **exclusive**.
 *
 * `range(b: int, n: int)`: Starts from `b`, increases by steps of 1, and stops **before** `n`. The arguments `b` and `n` are **inclusive** and **exclusive**, respectively.
 *
 * `range(b: int, n: int, s: int)`: Starts from `b`, increases/decreases by steps of `s`, and stops **before** `n`. The arguments `b` and `n` are **inclusive** and **exclusive**, respectively. The argument `s` **can** be negative, but not `0`. If `s` is `0`, an error message is printed.
 *
 * [method range] converts all arguments to [int] before processing.
 *
 * **Note:** Returns an empty array if no value meets the value constraint (e.g. `range(2, 5, -1)` or `range(5, 5, 1)`).
 *
 * **Examples:**
 *
 * @example
 *
 * print(range(4))        # Prints [0, 1, 2, 3]
 * print(range(2, 5))     # Prints [2, 3, 4]
 * print(range(0, 6, 2))  # Prints [0, 2, 4]
 * print(range(4, 1, -1)) # Prints [4, 3, 2]
 * @summary
 *
 *
 * To iterate over an [Array] backwards, use:
 *
 * @example
 *
 * var array = [3, 6, 9]
 * for i in range(array.size() - 1, -1, -1):
 * 	print(array**)
 * @summary
 *
 *
 * Output:
 *
 * [codeblock lang=text]
 *
 * 9
 *
 * 6
 *
 * 3
 *
 * @summary
 *
 *
 * To iterate over [float], convert them in the loop.
 *
 * @example
 *
 * for i in range (3, 0, -1):
 * 	print(i / 10.0)
 * @summary
 *
 *
 * Output:
 *
 * [codeblock lang=text]
 *
 * 0.3
 *
 * 0.2
 *
 * 0.1
 *
 * @summary
 *
 *
 */
declare const range: (...args: any[]) => any[]

/**
 * Returns `true` if the given [Object]-derived class exists in [ClassDB]. Note that [Variant] data types are not registered in [ClassDB].
 *
 * @example
 *
 * type_exists("Sprite2D") # Returns true
 * type_exists("NonExistentClass") # Returns false
 * @summary
 *
 *
 */
declare const type_exists: (type: StringName) => boolean

/**
 * Returns the absolute value of a [Variant] parameter [param x] (i.e. non-negative value). Supported types: [int], [float], [Vector2], [Vector2i], [Vector3], [Vector3i], [Vector4], [Vector4i].
 *
 * @example
 *
 * var a = abs(-1)
 * # a is 1
 * var b = abs(-1.2)
 * # b is 1.2
 * var c = abs(Vector2(-3.5, -4))
 * # c is (3.5, 4)
 * var d = abs(Vector2i(-5, -6))
 * # d is (5, 6)
 * var e = abs(Vector3(-7, 8.5, -3.8))
 * # e is (7, 8.5, 3.8)
 * var f = abs(Vector3i(-7, -8, -9))
 * # f is (7, 8, 9)
 * @summary
 *
 *
 * **Note:** For better type safety, use [method absf], [method absi], [method Vector2.abs], [method Vector2i.abs], [method Vector3.abs], [method Vector3i.abs], [method Vector4.abs], or [method Vector4i.abs].
 *
 */
declare const abs: (x: any) => any

/**
 * Returns the absolute value of float parameter [param x] (i.e. positive value).
 *
 * @example
 *
 * # a is 1.2
 * var a = absf(-1.2)
 * @summary
 *
 *
 */
declare const absf: (x: float) => float

/**
 * Returns the absolute value of int parameter [param x] (i.e. positive value).
 *
 * @example
 *
 * # a is 1
 * var a = absi(-1)
 * @summary
 *
 *
 */
declare const absi: (x: int) => int

/**
 * Returns the arc cosine of [param x] in radians. Use to get the angle of cosine [param x]. [param x] will be clamped between `-1.0` and `1.0` (inclusive), in order to prevent [method acos] from returning [constant @GDScript.NAN].
 *
 * @example
 *
 * # c is 0.523599 or 30 degrees if converted with rad_to_deg(c)
 * var c = acos(0.866025)
 * @summary
 *
 *
 */
declare const acos: (x: float) => float

/**
 * Returns the hyperbolic arc (also called inverse) cosine of [param x], returning a value in radians. Use it to get the angle from an angle's cosine in hyperbolic space if [param x] is larger or equal to 1. For values of [param x] lower than 1, it will return 0, in order to prevent [method acosh] from returning [constant @GDScript.NAN].
 *
 * @example
 *
 * var a = acosh(2) # Returns 1.31695789692482
 * cosh(a) # Returns 2
 * var b = acosh(-1) # Returns 0
 * @summary
 *
 *
 */
declare const acosh: (x: float) => float

/** Returns the difference between the two angles (in radians), in the range of [code][-PI, +PI][/code]. When [param from] and [param to] are opposite, returns [code]-PI[/code] if [param from] is smaller than [param to], or [code]PI[/code] otherwise. */
declare const angle_difference: (from: float, to: float) => float

/**
 * Returns the arc sine of [param x] in radians. Use to get the angle of sine [param x]. [param x] will be clamped between `-1.0` and `1.0` (inclusive), in order to prevent [method asin] from returning [constant @GDScript.NAN].
 *
 * @example
 *
 * # s is 0.523599 or 30 degrees if converted with rad_to_deg(s)
 * var s = asin(0.5)
 * @summary
 *
 *
 */
declare const asin: (x: float) => float

/**
 * Returns the hyperbolic arc (also called inverse) sine of [param x], returning a value in radians. Use it to get the angle from an angle's sine in hyperbolic space.
 *
 * @example
 *
 * var a = asinh(0.9) # Returns 0.8088669356527824
 * sinh(a) # Returns 0.9
 * @summary
 *
 *
 */
declare const asinh: (x: float) => float

/**
 * Returns the arc tangent of [param x] in radians. Use it to get the angle from an angle's tangent in trigonometry.
 *
 * The method cannot know in which quadrant the angle should fall. See [method atan2] if you have both `y` and [code skip-lint]x`.
 *
 * @example
 *
 * var a = atan(0.5) # a is 0.463648
 * @summary
 *
 *
 * If [param x] is between `-PI / 2` and `PI / 2` (inclusive), `atan(tan(x))` is equal to [param x].
 *
 */
declare const atan: (x: float) => float

/**
 * Returns the arc tangent of `y/x` in radians. Use to get the angle of tangent `y/x`. To compute the value, the method takes into account the sign of both arguments in order to determine the quadrant.
 *
 * Important note: The Y coordinate comes first, by convention.
 *
 * @example
 *
 * var a = atan2(0, -1) # a is 3.141593
 * @summary
 *
 *
 */
declare const atan2: (y: float, x: float) => float

/**
 * Returns the hyperbolic arc (also called inverse) tangent of [param x], returning a value in radians. Use it to get the angle from an angle's tangent in hyperbolic space if [param x] is between -1 and 1 (non-inclusive).
 *
 * In mathematics, the inverse hyperbolic tangent is only defined for -1 < [param x] < 1 in the real set, so values equal or lower to -1 for [param x] return negative [constant @GDScript.INF] and values equal or higher than 1 return positive [constant @GDScript.INF] in order to prevent [method atanh] from returning [constant @GDScript.NAN].
 *
 * @example
 *
 * var a = atanh(0.9) # Returns 1.47221948958322
 * tanh(a) # Returns 0.9
 * var b = atanh(-2) # Returns -inf
 * tanh(b) # Returns -1
 * @summary
 *
 *
 */
declare const atanh: (x: float) => float

/** Returns the derivative at the given [param t] on a one-dimensional [url=https://en.wikipedia.org/wiki/B%C3%A9zier_curve]Bézier curve[/url] defined by the given [param control_1], [param control_2], and [param end] points. */
declare const bezier_derivative: (
  start: float,
  control_1: float,
  control_2: float,
  end: float,
  t: float
) => float

/** Returns the point at the given [param t] on a one-dimensional [url=https://en.wikipedia.org/wiki/B%C3%A9zier_curve]Bézier curve[/url] defined by the given [param control_1], [param control_2], and [param end] points. */
declare const bezier_interpolate: (
  start: float,
  control_1: float,
  control_2: float,
  end: float,
  t: float
) => float

/**
 * Decodes a byte array back to a [Variant] value, without decoding objects.
 *
 * **Note:** If you need object deserialization, see [method bytes_to_var_with_objects].
 *
 */
declare const bytes_to_var: (bytes: PackedByteArray) => any

/**
 * Decodes a byte array back to a [Variant] value. Decoding objects is allowed.
 *
 * **Warning:** Deserialized object can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats (remote code execution).
 *
 */
declare const bytes_to_var_with_objects: (bytes: PackedByteArray) => any

/**
 * Rounds [param x] upward (towards positive infinity), returning the smallest whole number that is not less than [param x]. Supported types: [int], [float], [Vector2], [Vector2i], [Vector3], [Vector3i], [Vector4], [Vector4i].
 *
 * @example
 *
 * var i = ceil(1.45) # i is 2.0
 * i = ceil(1.001)    # i is 2.0
 * @summary
 *
 *
 * See also [method floor], [method round], and [method snapped].
 *
 * **Note:** For better type safety, use [method ceilf], [method ceili], [method Vector2.ceil], [method Vector3.ceil], or [method Vector4.ceil].
 *
 */
declare const ceil: (x: any) => any

/**
 * Rounds [param x] upward (towards positive infinity), returning the smallest whole number that is not less than [param x].
 *
 * A type-safe version of [method ceil], returning a [float].
 *
 */
declare const ceilf: (x: float) => float

/**
 * Rounds [param x] upward (towards positive infinity), returning the smallest whole number that is not less than [param x].
 *
 * A type-safe version of [method ceil], returning an [int].
 *
 */
declare const ceili: (x: float) => int

/**
 * Clamps the [param value], returning a [Variant] not less than [param min] and not more than [param max]. Any values that can be compared with the less than and greater than operators will work.
 *
 * @example
 *
 * var a = clamp(-10, -1, 5)
 * # a is -1
 * var b = clamp(8.1, 0.9, 5.5)
 * # b is 5.5
 * @summary
 *
 *
 * **Note:** For better type safety, use [method clampf], [method clampi], [method Vector2.clamp], [method Vector2i.clamp], [method Vector3.clamp], [method Vector3i.clamp], [method Vector4.clamp], [method Vector4i.clamp], or [method Color.clamp] (not currently supported by this method).
 *
 * **Note:** When using this on vectors it will **not** perform component-wise clamping, and will pick [param min] if `value < min` or [param max] if `value > max`. To perform component-wise clamping use the methods listed above.
 *
 */
declare const clamp: (value: any, min: any, max: any) => any

/**
 * Clamps the [param value], returning a [float] not less than [param min] and not more than [param max].
 *
 * @example
 *
 * var speed = 42.1
 * var a = clampf(speed, 1.0, 20.5) # a is 20.5
 * speed = -10.0
 * var b = clampf(speed, -1.0, 1.0) # b is -1.0
 * @summary
 *
 *
 */
declare const clampf: (value: float, min: float, max: float) => float

/**
 * Clamps the [param value], returning an [int] not less than [param min] and not more than [param max].
 *
 * @example
 *
 * var speed = 42
 * var a = clampi(speed, 1, 20) # a is 20
 * speed = -10
 * var b = clampi(speed, -1, 1) # b is -1
 * @summary
 *
 *
 */
declare const clampi: (value: int, min: int, max: int) => int

/**
 * Returns the cosine of angle [param angle_rad] in radians.
 *
 * @example
 *
 * cos(PI * 2)         # Returns 1.0
 * cos(PI)             # Returns -1.0
 * cos(deg_to_rad(90)) # Returns 0.0
 * @summary
 *
 *
 */
declare const cos: (angle_rad: float) => float

/**
 * Returns the hyperbolic cosine of [param x] in radians.
 *
 * @example
 *
 * print(cosh(1)) # Prints 1.543081
 * @summary
 *
 *
 */
declare const cosh: (x: float) => float

/** Cubic interpolates between two values by the factor defined in [param weight] with [param pre] and [param post] values. */
declare const cubic_interpolate: (
  from: float,
  to: float,
  pre: float,
  post: float,
  weight: float
) => float

/** Cubic interpolates between two rotation values with shortest path by the factor defined in [param weight] with [param pre] and [param post] values. See also [method lerp_angle]. */
declare const cubic_interpolate_angle: (
  from: float,
  to: float,
  pre: float,
  post: float,
  weight: float
) => float

/**
 * Cubic interpolates between two rotation values with shortest path by the factor defined in [param weight] with [param pre] and [param post] values. See also [method lerp_angle].
 *
 * It can perform smoother interpolation than [method cubic_interpolate] by the time values.
 *
 */
declare const cubic_interpolate_angle_in_time: (
  from: float,
  to: float,
  pre: float,
  post: float,
  weight: float,
  to_t: float,
  pre_t: float,
  post_t: float
) => float

/**
 * Cubic interpolates between two values by the factor defined in [param weight] with [param pre] and [param post] values.
 *
 * It can perform smoother interpolation than [method cubic_interpolate] by the time values.
 *
 */
declare const cubic_interpolate_in_time: (
  from: float,
  to: float,
  pre: float,
  post: float,
  weight: float,
  to_t: float,
  pre_t: float,
  post_t: float
) => float

/** Converts from decibels to linear energy (audio). */
declare const db_to_linear: (db: float) => float

/**
 * Converts an angle expressed in degrees to radians.
 *
 * @example
 *
 * var r = deg_to_rad(180) # r is 3.141593
 * @summary
 *
 *
 */
declare const deg_to_rad: (deg: float) => float

/**
 * Returns an "eased" value of [param x] based on an easing function defined with [param curve]. This easing function is based on an exponent. The [param curve] can be any floating-point number, with specific values leading to the following behaviors:
 *
 * [codeblock lang=text]
 *
 * - Lower than -1.0 (exclusive): Ease in-out
 *
 * - -1.0: Linear
 *
 * - Between -1.0 and 0.0 (exclusive): Ease out-in
 *
 * - 0.0: Constant
 *
 * - Between 0.0 to 1.0 (exclusive): Ease out
 *
 * - 1.0: Linear
 *
 * - Greater than 1.0 (exclusive): Ease in
 *
 * @summary
 *
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/ease_cheatsheet.png]ease() curve values cheatsheet[/url]
 *
 * See also [method smoothstep]. If you need to perform more advanced transitions, use [method Tween.interpolate_value].
 *
 */
declare const ease: (x: float, curve: float) => float

/**
 * Returns a human-readable name for the given [enum Error] code.
 *
 * @example
 *
 * print(OK)                              # Prints 0
 * print(error_string(OK))                # Prints "OK"
 * print(error_string(ERR_BUSY))          # Prints "Busy"
 * print(error_string(ERR_OUT_OF_MEMORY)) # Prints "Out of memory"
 * @summary
 *
 *
 */
declare const error_string: (error: int) => string

/**
 * The natural exponential function. It raises the mathematical constant **e** to the power of [param x] and returns it.
 *
 * **e** has an approximate value of 2.71828, and can be obtained with `exp(1)`.
 *
 * For exponents to other bases use the method [method pow].
 *
 * @example
 *
 * var a = exp(2) # Approximately 7.39
 * @summary
 *
 *
 */
declare const exp: (x: float) => float

/**
 * Rounds [param x] downward (towards negative infinity), returning the largest whole number that is not more than [param x]. Supported types: [int], [float], [Vector2], [Vector2i], [Vector3], [Vector3i], [Vector4], [Vector4i].
 *
 * @example
 *
 * var a = floor(2.99) # a is 2.0
 * a = floor(-2.99)    # a is -3.0
 * @summary
 *
 *
 * See also [method ceil], [method round], and [method snapped].
 *
 * **Note:** For better type safety, use [method floorf], [method floori], [method Vector2.floor], [method Vector3.floor], or [method Vector4.floor].
 *
 */
declare const floor: (x: any) => any

/**
 * Rounds [param x] downward (towards negative infinity), returning the largest whole number that is not more than [param x].
 *
 * A type-safe version of [method floor], returning a [float].
 *
 */
declare const floorf: (x: float) => float

/**
 * Rounds [param x] downward (towards negative infinity), returning the largest whole number that is not more than [param x].
 *
 * A type-safe version of [method floor], returning an [int].
 *
 * **Note:** This function is **not** the same as `int(x)`, which rounds towards 0.
 *
 */
declare const floori: (x: float) => int

/**
 * Returns the floating-point remainder of [param x] divided by [param y], keeping the sign of [param x].
 *
 * @example
 *
 * var remainder = fmod(7, 5.5) # remainder is 1.5
 * @summary
 *
 *
 * For the integer remainder operation, use the `%` operator.
 *
 */
declare const fmod: (x: float, y: float) => float

/**
 * Returns the floating-point modulus of [param x] divided by [param y], wrapping equally in positive and negative.
 *
 * @example
 *
 * print(" (x)  (fmod(x, 1.5))   (fposmod(x, 1.5))")
 * for i in 7:
 * 	var x = i * 0.5 - 1.5
 * 	print("%4.1f           %4.1f  | %4.1f" % [x, fmod(x, 1.5), fposmod(x, 1.5)])
 * @summary
 *
 *
 * Prints:
 *
 * [codeblock lang=text]
 *
 *  (x)  (fmod(x, 1.5))   (fposmod(x, 1.5))
 *
 * -1.5           -0.0  |  0.0
 *
 * -1.0           -1.0  |  0.5
 *
 * -0.5           -0.5  |  1.0
 *
 *  0.0            0.0  |  0.0
 *
 *  0.5            0.5  |  0.5
 *
 *  1.0            1.0  |  1.0
 *
 *  1.5            0.0  |  0.0
 *
 * @summary
 *
 *
 */
declare const fposmod: (x: float, y: float) => float

/**
 * Returns the integer hash of the passed [param variable].
 *
 * @example
 *
 *
 * print(hash("a")) # Prints 177670
 *
 *
 * GD.Print(GD.Hash("a")); // Prints 177670
 *
 * @summary
 *
 *
 */
declare const hash: (variable: any) => int

/**
 * Returns the [Object] that corresponds to [param instance_id]. All Objects have a unique instance ID. See also [method Object.get_instance_id].
 *
 * @example
 *
 *
 * var drink = "water"
 * func _ready():
 * 	var id = get_instance_id()
 * 	var instance = instance_from_id(id)
 * 	print(instance.drink) # Prints "water"
 *
 *
 * public partial class MyNode : Node
 * {
 * 	public string Drink { get; set; } = "water";
 * 	public override void _Ready()
 * 	{
 * 		ulong id = GetInstanceId();
 * 		var instance = (MyNode)InstanceFromId(Id);
 * 		GD.Print(instance.Drink); // Prints "water"
 * 	}
 * }
 *
 * @summary
 *
 *
 */
declare const instance_from_id: (instance_id: int) => Object

/**
 * Returns an interpolation or extrapolation factor considering the range specified in [param from] and [param to], and the interpolated value specified in [param weight]. The returned value will be between `0.0` and `1.0` if [param weight] is between [param from] and [param to] (inclusive). If [param weight] is located outside this range, then an extrapolation factor will be returned (return value lower than `0.0` or greater than `1.0`). Use [method clamp] on the result of [method inverse_lerp] if this is not desired.
 *
 * @example
 *
 * # The interpolation ratio in the `lerp()` call below is 0.75.
 * var middle = lerp(20, 30, 0.75)
 * # middle is now 27.5.
 * # Now, we pretend to have forgotten the original ratio and want to get it back.
 * var ratio = inverse_lerp(20, 30, 27.5)
 * # ratio is now 0.75.
 * @summary
 *
 *
 * See also [method lerp], which performs the reverse of this operation, and [method remap] to map a continuous series of values to another.
 *
 */
declare const inverse_lerp: (from: float, to: float, weight: float) => float

/**
 * Returns `true` if [param a] and [param b] are approximately equal to each other.
 *
 * Here, "approximately equal" means that [param a] and [param b] are within a small internal epsilon of each other, which scales with the magnitude of the numbers.
 *
 * Infinity values of the same sign are considered equal.
 *
 */
declare const is_equal_approx: (a: float, b: float) => boolean

/** Returns whether [param x] is a finite value, i.e. it is not [constant @GDScript.NAN], positive infinity, or negative infinity. See also [method is_inf] and [method is_nan]. */
declare const is_finite: (x: float) => boolean

/** Returns [code]true[/code] if [param x] is either positive infinity or negative infinity. See also [method is_finite] and [method is_nan]. */
declare const is_inf: (x: float) => boolean

/** Returns [code]true[/code] if the Object that corresponds to [param id] is a valid object (e.g. has not been deleted from memory). All Objects have a unique instance ID. */
declare const is_instance_id_valid: (id: int) => boolean

/** Returns [code]true[/code] if [param instance] is a valid Object (e.g. has not been deleted from memory). */
declare const is_instance_valid: (instance: any) => boolean

/** Returns [code]true[/code] if [param x] is a NaN ("Not a Number" or invalid) value. This method is needed as [constant @GDScript.NAN] is not equal to itself, which means [code]x == NAN[/code] can't be used to check whether a value is a NaN. */
declare const is_nan: (x: float) => boolean

/**
 * Returns `true`, for value types, if [param a] and [param b] share the same value. Returns `true`, for reference types, if the references of [param a] and [param b] are the same.
 *
 * @example
 *
 * # Vector2 is a value type
 * var vec2_a = Vector2(0, 0)
 * var vec2_b = Vector2(0, 0)
 * var vec2_c = Vector2(1, 1)
 * is_same(vec2_a, vec2_a)  # true
 * is_same(vec2_a, vec2_b)  # true
 * is_same(vec2_a, vec2_c)  # false
 * # Array is a reference type
 * var arr_a = []
 * var arr_b = []
 * is_same(arr_a, arr_a)  # true
 * is_same(arr_a, arr_b)  # false
 * @summary
 *
 *
 * These are [Variant] value types: `null`, [bool], [int], [float], [String], [StringName], [Vector2], [Vector2i], [Vector3], [Vector3i], [Vector4], [Vector4i], [Rect2], [Rect2i], [Transform2D], [Transform3D], [Plane], [Quaternion], [AABB], [Basis], [Projection], [Color], [NodePath], [RID], [Callable] and [Signal].
 *
 * These are [Variant] reference types: [Object], [Dictionary], [Array], [PackedByteArray], [PackedInt32Array], [PackedInt64Array], [PackedFloat32Array], [PackedFloat64Array], [PackedStringArray], [PackedVector2Array], [PackedVector3Array], [PackedVector4Array], and [PackedColorArray].
 *
 */
declare const is_same: (a: any, b: any) => boolean

/**
 * Returns `true` if [param x] is zero or almost zero. The comparison is done using a tolerance calculation with a small internal epsilon.
 *
 * This function is faster than using [method is_equal_approx] with one value as zero.
 *
 */
declare const is_zero_approx: (x: float) => boolean

/**
 * Linearly interpolates between two values by the factor defined in [param weight]. To perform interpolation, [param weight] should be between `0.0` and `1.0` (inclusive). However, values outside this range are allowed and can be used to perform **extrapolation**. If this is not desired, use [method clampf] to limit [param weight].
 *
 * Both [param from] and [param to] must be the same type. Supported types: [int], [float], [Vector2], [Vector3], [Vector4], [Color], [Quaternion], [Basis], [Transform2D], [Transform3D].
 *
 * @example
 *
 * lerp(0, 4, 0.75) # Returns 3.0
 * @summary
 *
 *
 * See also [method inverse_lerp] which performs the reverse of this operation. To perform eased interpolation with [method lerp], combine it with [method ease] or [method smoothstep]. See also [method remap] to map a continuous series of values to another.
 *
 * **Note:** For better type safety, use [method lerpf], [method Vector2.lerp], [method Vector3.lerp], [method Vector4.lerp], [method Color.lerp], [method Quaternion.slerp], [method Basis.slerp], [method Transform2D.interpolate_with], or [method Transform3D.interpolate_with].
 *
 */
declare const lerp: (from: any, to: any, weight: any) => any

/**
 * Linearly interpolates between two angles (in radians) by a [param weight] value between 0.0 and 1.0.
 *
 * Similar to [method lerp], but interpolates correctly when the angles wrap around [constant @GDScript.TAU]. To perform eased interpolation with [method lerp_angle], combine it with [method ease] or [method smoothstep].
 *
 * @example
 *
 * extends Sprite
 * var elapsed = 0.0
 * func _process(delta):
 * 	var min_angle = deg_to_rad(0.0)
 * 	var max_angle = deg_to_rad(90.0)
 * 	rotation = lerp_angle(min_angle, max_angle, elapsed)
 * 	elapsed += delta
 * @summary
 *
 *
 * **Note:** This function lerps through the shortest path between [param from] and [param to]. However, when these two angles are approximately `PI + k * TAU` apart for any integer `k`, it's not obvious which way they lerp due to floating-point precision errors. For example, `lerp_angle(0, PI, weight)` lerps counter-clockwise, while `lerp_angle(0, PI + 5 * TAU, weight)` lerps clockwise.
 *
 */
declare const lerp_angle: (from: float, to: float, weight: float) => float

/**
 * Linearly interpolates between two values by the factor defined in [param weight]. To perform interpolation, [param weight] should be between `0.0` and `1.0` (inclusive). However, values outside this range are allowed and can be used to perform **extrapolation**. If this is not desired, use [method clampf] on the result of this function.
 *
 * @example
 *
 * lerpf(0, 4, 0.75) # Returns 3.0
 * @summary
 *
 *
 * See also [method inverse_lerp] which performs the reverse of this operation. To perform eased interpolation with [method lerp], combine it with [method ease] or [method smoothstep].
 *
 */
declare const lerpf: (from: float, to: float, weight: float) => float

/**
 * Converts from linear energy to decibels (audio). Since volume is not normally linear, this can be used to implement volume sliders that behave as expected.
 *
 * **Example:** Change the Master bus's volume through a [Slider] node, which ranges from `0.0` to `1.0`:
 *
 * @example
 *
 * AudioServer.set_bus_volume_db(AudioServer.get_bus_index("Master"), linear_to_db($Slider.value))
 * @summary
 *
 *
 */
declare const linear_to_db: (lin: float) => float

/**
 * Returns the [url=https://en.wikipedia.org/wiki/Natural_logarithm]natural logarithm[/url] of [param x] (base [url=https://en.wikipedia.org/wiki/E_(mathematical_constant)]**e**[/url], with **e** being approximately 2.71828). This is the amount of time needed to reach a certain level of continuous growth.
 *
 * **Note:** This is not the same as the "log" function on most calculators, which uses a base 10 logarithm. To use base 10 logarithm, use `log(x) / log(10)`.
 *
 * @example
 *
 * log(10) # Returns 2.302585
 * @summary
 *
 *
 * **Note:** The logarithm of `0` returns `-inf`, while negative values return `-nan`.
 *
 */
declare const log: (x: float) => float

/**
 * Returns the maximum of the given numeric values. This function can take any number of arguments.
 *
 * @example
 *
 * max(1, 7, 3, -6, 5) # Returns 7
 * @summary
 *
 *
 * **Note:** When using this on vectors it will **not** perform component-wise maximum, and will pick the largest value when compared using `x < y`. To perform component-wise maximum, use [method Vector2.max], [method Vector2i.max], [method Vector3.max], [method Vector3i.max], [method Vector4.max], and [method Vector4i.max].
 *
 */
declare const max: (...args: any[]) => any

/**
 * Returns the maximum of two [float] values.
 *
 * @example
 *
 * maxf(3.6, 24)   # Returns 24.0
 * maxf(-3.99, -4) # Returns -3.99
 * @summary
 *
 *
 */
declare const maxf: (a: float, b: float) => float

/**
 * Returns the maximum of two [int] values.
 *
 * @example
 *
 * maxi(1, 2)   # Returns 2
 * maxi(-3, -4) # Returns -3
 * @summary
 *
 *
 */
declare const maxi: (a: int, b: int) => int

/**
 * Returns the minimum of the given numeric values. This function can take any number of arguments.
 *
 * @example
 *
 * min(1, 7, 3, -6, 5) # Returns -6
 * @summary
 *
 *
 * **Note:** When using this on vectors it will **not** perform component-wise minimum, and will pick the smallest value when compared using `x < y`. To perform component-wise minimum, use [method Vector2.min], [method Vector2i.min], [method Vector3.min], [method Vector3i.min], [method Vector4.min], and [method Vector4i.min].
 *
 */
declare const min: (...args: any[]) => any

/**
 * Returns the minimum of two [float] values.
 *
 * @example
 *
 * minf(3.6, 24)   # Returns 3.6
 * minf(-3.99, -4) # Returns -4.0
 * @summary
 *
 *
 */
declare const minf: (a: float, b: float) => float

/**
 * Returns the minimum of two [int] values.
 *
 * @example
 *
 * mini(1, 2)   # Returns 1
 * mini(-3, -4) # Returns -4
 * @summary
 *
 *
 */
declare const mini: (a: int, b: int) => int

/**
 * Moves [param from] toward [param to] by the [param delta] amount. Will not go past [param to].
 *
 * Use a negative [param delta] value to move away.
 *
 * @example
 *
 * move_toward(5, 10, 4)    # Returns 9
 * move_toward(10, 5, 4)    # Returns 6
 * move_toward(5, 10, 9)    # Returns 10
 * move_toward(10, 5, -1.5) # Returns 11.5
 * @summary
 *
 *
 */
declare const move_toward: (from: float, to: float, delta: float) => float

/**
 * Returns the smallest integer power of 2 that is greater than or equal to [param value].
 *
 * @example
 *
 * nearest_po2(3) # Returns 4
 * nearest_po2(4) # Returns 4
 * nearest_po2(5) # Returns 8
 * nearest_po2(0)  # Returns 0 (this may not be expected)
 * nearest_po2(-1) # Returns 0 (this may not be expected)
 * @summary
 *
 *
 * **Warning:** Due to its implementation, this method returns `0` rather than `1` for values less than or equal to `0`, with an exception for [param value] being the smallest negative 64-bit integer (`-9223372036854775808`) in which case the [param value] is returned unchanged.
 *
 */
declare const nearest_po2: (value: int) => int

/**
 * Wraps [param value] between `0` and the [param length]. If the limit is reached, the next value the function returns is decreased to the `0` side or increased to the [param length] side (like a triangle wave). If [param length] is less than zero, it becomes positive.
 *
 * @example
 *
 * pingpong(-3.0, 3.0) # Returns 3.0
 * pingpong(-2.0, 3.0) # Returns 2.0
 * pingpong(-1.0, 3.0) # Returns 1.0
 * pingpong(0.0, 3.0)  # Returns 0.0
 * pingpong(1.0, 3.0)  # Returns 1.0
 * pingpong(2.0, 3.0)  # Returns 2.0
 * pingpong(3.0, 3.0)  # Returns 3.0
 * pingpong(4.0, 3.0)  # Returns 2.0
 * pingpong(5.0, 3.0)  # Returns 1.0
 * pingpong(6.0, 3.0)  # Returns 0.0
 * @summary
 *
 *
 */
declare const pingpong: (value: float, length: float) => float

/**
 * Returns the integer modulus of [param x] divided by [param y] that wraps equally in positive and negative.
 *
 * @example
 *
 * print("#(i)  (i % 3)   (posmod(i, 3))")
 * for i in range(-3, 4):
 * 	print("%2d       %2d  | %2d" % [i, i % 3, posmod(i, 3)])
 * @summary
 *
 *
 * Prints:
 *
 * [codeblock lang=text]
 *
 * (i)  (i % 3)   (posmod(i, 3))
 *
 * -3        0  |  0
 *
 * -2       -2  |  1
 *
 * -1       -1  |  2
 *
 *  0        0  |  0
 *
 *  1        1  |  1
 *
 *  2        2  |  2
 *
 *  3        0  |  0
 *
 * @summary
 *
 *
 */
declare const posmod: (x: int, y: int) => int

/**
 * Returns the result of [param base] raised to the power of [param exp].
 *
 * In GDScript, this is the equivalent of the `**` operator.
 *
 * @example
 *
 * pow(2, 5)   # Returns 32.0
 * pow(4, 1.5) # Returns 8.0
 * @summary
 *
 *
 */
declare const pow: (base: float, exp: float) => float

/**
 * Converts one or more arguments of any type to string in the best way possible and prints them to the console.
 *
 * The following BBCode tags are supported: `b`, `i`, `u`, `s`, `indent`, `code`, `url`, `center`, `right`, `color`, `bgcolor`, `fgcolor`.
 *
 * URL tags only support URLs wrapped by a URL tag, not URLs with a different title.
 *
 * When printing to standard output, the supported subset of BBCode is converted to ANSI escape codes for the terminal emulator to display. Support for ANSI escape codes varies across terminal emulators, especially for italic and strikethrough. In standard output, `code` is represented with faint text but without any font change. Unsupported tags are left as-is in standard output.
 *
 * @example
 *
 * [gdscript skip-lint]
 * print_rich("[color=green]**Hello world!**[/color]") # Prints "Hello world!", in green with a bold font.
 *
 * [csharp skip-lint]
 * GD.PrintRich("[color=green]**Hello world!**[/color]"); // Prints "Hello world!", in green with a bold font.
 *
 * @summary
 *
 *
 * **Note:** Consider using [method push_error] and [method push_warning] to print error and warning messages instead of [method print] or [method print_rich]. This distinguishes them from print messages used for debugging purposes, while also displaying a stack trace when an error or warning is printed.
 *
 * **Note:** Output displayed in the editor supports clickable [code skip-lint][url=address]text[/url]` tags. The [code skip-lint][url]` tag's `address` value is handled by [method OS.shell_open] when clicked.
 *
 */
declare const print_rich: (...args: any[]) => void

/** If verbose mode is enabled ([method OS.is_stdout_verbose] returning [code]true[/code]), converts one or more arguments of any type to string in the best way possible and prints them to the console. */
declare const print_verbose: (...args: any[]) => void

/**
 * Prints one or more arguments to strings in the best way possible to standard error line.
 *
 * @example
 *
 *
 * printerr("prints to stderr")
 *
 *
 * GD.PrintErr("prints to stderr");
 *
 * @summary
 *
 *
 */
declare const printerr: (...args: any[]) => void

/**
 * Prints one or more arguments to strings in the best way possible to the OS terminal. Unlike [method print], no newline is automatically added at the end.
 *
 * **Note:** The OS terminal is **not** the same as the editor's Output dock. The output sent to the OS terminal can be seen when running Godot from a terminal. On Windows, this requires using the `console.exe` executable.
 *
 * @example
 *
 *
 * # Prints "ABC" to terminal.
 * printraw("A")
 * printraw("B")
 * printraw("C")
 *
 *
 * // Prints "ABC" to terminal.
 * GD.PrintRaw("A");
 * GD.PrintRaw("B");
 * GD.PrintRaw("C");
 *
 * @summary
 *
 *
 */
declare const printraw: (...args: any[]) => void

/**
 * Prints one or more arguments to the console with a space between each argument.
 *
 * @example
 *
 *
 * prints("A", "B", "C") # Prints "A B C"
 *
 *
 * GD.PrintS("A", "B", "C"); // Prints "A B C"
 *
 * @summary
 *
 *
 */
declare const prints: (...args: any[]) => void

/**
 * Prints one or more arguments to the console with a tab between each argument.
 *
 * @example
 *
 *
 * printt("A", "B", "C") # Prints "A       B       C"
 *
 *
 * GD.PrintT("A", "B", "C"); // Prints "A       B       C"
 *
 * @summary
 *
 *
 */
declare const printt: (...args: any[]) => void

/**
 * Pushes an error message to Godot's built-in debugger and to the OS terminal.
 *
 * @example
 *
 *
 * push_error("test error") # Prints "test error" to debugger and terminal as an error.
 *
 *
 * GD.PushError("test error"); // Prints "test error" to debugger and terminal as an error.
 *
 * @summary
 *
 *
 * **Note:** This function does not pause project execution. To print an error message and pause project execution in debug builds, use `assert(false, "test error")` instead.
 *
 */
declare const push_error: (...args: any[]) => void

/**
 * Pushes a warning message to Godot's built-in debugger and to the OS terminal.
 *
 * @example
 *
 *
 * push_warning("test warning") # Prints "test warning" to debugger and terminal as a warning.
 *
 *
 * GD.PushWarning("test warning"); // Prints "test warning" to debugger and terminal as a warning.
 *
 * @summary
 *
 *
 */
declare const push_warning: (...args: any[]) => void

/**
 * Converts an angle expressed in radians to degrees.
 *
 * @example
 *
 * rad_to_deg(0.523599) # Returns 30
 * rad_to_deg(PI)       # Returns 180
 * rad_to_deg(PI * 2)   # Returns 360
 * @summary
 *
 *
 */
declare const rad_to_deg: (rad: float) => float

/**
 * Given a [param seed], returns a [PackedInt64Array] of size `2`, where its first element is the randomized [int] value, and the second element is the same as [param seed]. Passing the same [param seed] consistently returns the same array.
 *
 * **Note:** "Seed" here refers to the internal state of the pseudo random number generator, currently implemented as a 64 bit integer.
 *
 * @example
 *
 * var a = rand_from_seed(4)
 * print(a[0]) # Prints 2879024997
 * print(a[1]) # Prints 4
 * @summary
 *
 *
 */
declare const rand_from_seed: (seed: int) => PackedInt64Array

/**
 * Returns a random floating-point value between `0.0` and `1.0` (inclusive).
 *
 * @example
 *
 *
 * randf() # Returns e.g. 0.375671
 *
 *
 * GD.Randf(); // Returns e.g. 0.375671
 *
 * @summary
 *
 *
 */
declare const randf: () => float

/**
 * Returns a random floating-point value between [param from] and [param to] (inclusive).
 *
 * @example
 *
 *
 * randf_range(0, 20.5) # Returns e.g. 7.45315
 * randf_range(-10, 10) # Returns e.g. -3.844535
 *
 *
 * GD.RandRange(0.0, 20.5);   // Returns e.g. 7.45315
 * GD.RandRange(-10.0, 10.0); // Returns e.g. -3.844535
 *
 * @summary
 *
 *
 */
declare const randf_range: (from: float, to: float) => float

/**
 * Returns a [url=https://en.wikipedia.org/wiki/Normal_distribution]normally-distributed[/url], pseudo-random floating-point value from the specified [param mean] and a standard [param deviation]. This is also known as a Gaussian distribution.
 *
 * **Note:** This method uses the [url=https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform]Box-Muller transform[/url] algorithm.
 *
 */
declare const randfn: (mean: float, deviation: float) => float

/**
 * Returns a random unsigned 32-bit integer. Use remainder to obtain a random value in the interval `[0, N - 1]` (where N is smaller than 2^32).
 *
 * @example
 *
 *
 * randi()           # Returns random integer between 0 and 2^32 - 1
 * randi() % 20      # Returns random integer between 0 and 19
 * randi() % 100     # Returns random integer between 0 and 99
 * randi() % 100 + 1 # Returns random integer between 1 and 100
 *
 *
 * GD.Randi();           // Returns random integer between 0 and 2^32 - 1
 * GD.Randi() % 20;      // Returns random integer between 0 and 19
 * GD.Randi() % 100;     // Returns random integer between 0 and 99
 * GD.Randi() % 100 + 1; // Returns random integer between 1 and 100
 *
 * @summary
 *
 *
 */
declare const randi: () => int

/**
 * Returns a random signed 32-bit integer between [param from] and [param to] (inclusive). If [param to] is lesser than [param from], they are swapped.
 *
 * @example
 *
 *
 * randi_range(0, 1)      # Returns either 0 or 1
 * randi_range(-10, 1000) # Returns random integer between -10 and 1000
 *
 *
 * GD.RandRange(0, 1);      // Returns either 0 or 1
 * GD.RandRange(-10, 1000); // Returns random integer between -10 and 1000
 *
 * @summary
 *
 *
 */
declare const randi_range: (from: int, to: int) => int

/**
 * Randomizes the seed (or the internal state) of the random number generator. The current implementation uses a number based on the device's time.
 *
 * **Note:** This function is called automatically when the project is run. If you need to fix the seed to have consistent, reproducible results, use [method seed] to initialize the random number generator.
 *
 */
declare const randomize: () => void

/**
 * Maps a [param value] from range `[istart, istop]` to `[ostart, ostop]`. See also [method lerp] and [method inverse_lerp]. If [param value] is outside `[istart, istop]`, then the resulting value will also be outside `[ostart, ostop]`. If this is not desired, use [method clamp] on the result of this function.
 *
 * @example
 *
 * remap(75, 0, 100, -1, 1) # Returns 0.5
 * @summary
 *
 *
 * For complex use cases where multiple ranges are needed, consider using [Curve] or [Gradient] instead.
 *
 * **Note:** If `istart == istop`, the return value is undefined (most likely NaN, INF, or -INF).
 *
 */
declare const remap: (
  value: float,
  istart: float,
  istop: float,
  ostart: float,
  ostop: float
) => float

/** Allocates a unique ID which can be used by the implementation to construct an RID. This is used mainly from native extensions to implement servers. */
declare const rid_allocate_id: () => int

/** Creates an RID from a [param base]. This is used mainly from native extensions to build servers. */
declare const rid_from_int64: (base: int) => RID

/**
 * Rotates [param from] toward [param to] by the [param delta] amount. Will not go past [param to].
 *
 * Similar to [method move_toward], but interpolates correctly when the angles wrap around [constant @GDScript.TAU].
 *
 * If [param delta] is negative, this function will rotate away from [param to], toward the opposite angle, and will not go past the opposite angle.
 *
 */
declare const rotate_toward: (from: float, to: float, delta: float) => float

/**
 * Rounds [param x] to the nearest whole number, with halfway cases rounded away from 0. Supported types: [int], [float], [Vector2], [Vector2i], [Vector3], [Vector3i], [Vector4], [Vector4i].
 *
 * @example
 *
 * round(2.4) # Returns 2
 * round(2.5) # Returns 3
 * round(2.6) # Returns 3
 * @summary
 *
 *
 * See also [method floor], [method ceil], and [method snapped].
 *
 * **Note:** For better type safety, use [method roundf], [method roundi], [method Vector2.round], [method Vector3.round], or [method Vector4.round].
 *
 */
declare const round: (x: any) => any

/**
 * Rounds [param x] to the nearest whole number, with halfway cases rounded away from 0.
 *
 * A type-safe version of [method round], returning a [float].
 *
 */
declare const roundf: (x: float) => float

/**
 * Rounds [param x] to the nearest whole number, with halfway cases rounded away from 0.
 *
 * A type-safe version of [method round], returning an [int].
 *
 */
declare const roundi: (x: float) => int

/**
 * Sets the seed for the random number generator to [param base]. Setting the seed manually can ensure consistent, repeatable results for most random functions.
 *
 * @example
 *
 *
 * var my_seed = "Godot Rocks".hash()
 * seed(my_seed)
 * var a = randf() + randi()
 * seed(my_seed)
 * var b = randf() + randi()
 * # a and b are now identical
 *
 *
 * ulong mySeed = (ulong)GD.Hash("Godot Rocks");
 * GD.Seed(mySeed);
 * var a = GD.Randf() + GD.Randi();
 * GD.Seed(mySeed);
 * var b = GD.Randf() + GD.Randi();
 * // a and b are now identical
 *
 * @summary
 *
 *
 */
declare const seed: (base: int) => void

/**
 * Returns the same type of [Variant] as [param x], with `-1` for negative values, `1` for positive values, and `0` for zeros. For `nan` values it returns 0.
 *
 * Supported types: [int], [float], [Vector2], [Vector2i], [Vector3], [Vector3i], [Vector4], [Vector4i].
 *
 * @example
 *
 * sign(-6.0) # Returns -1
 * sign(0.0)  # Returns 0
 * sign(6.0)  # Returns 1
 * sign(NAN)  # Returns 0
 * sign(Vector3(-6.0, 0.0, 6.0)) # Returns (-1, 0, 1)
 * @summary
 *
 *
 * **Note:** For better type safety, use [method signf], [method signi], [method Vector2.sign], [method Vector2i.sign], [method Vector3.sign], [method Vector3i.sign], [method Vector4.sign], or [method Vector4i.sign].
 *
 */
declare const sign: (x: any) => any

/**
 * Returns `-1.0` if [param x] is negative, `1.0` if [param x] is positive, and `0.0` if [param x] is zero. For `nan` values of [param x] it returns 0.0.
 *
 * @example
 *
 * signf(-6.5) # Returns -1.0
 * signf(0.0)  # Returns 0.0
 * signf(6.5)  # Returns 1.0
 * signf(NAN)  # Returns 0.0
 * @summary
 *
 *
 */
declare const signf: (x: float) => float

/**
 * Returns `-1` if [param x] is negative, `1` if [param x] is positive, and `0` if [param x] is zero.
 *
 * @example
 *
 * signi(-6) # Returns -1
 * signi(0)  # Returns 0
 * signi(6)  # Returns 1
 * @summary
 *
 *
 */
declare const signi: (x: int) => int

/**
 * Returns the sine of angle [param angle_rad] in radians.
 *
 * @example
 *
 * sin(0.523599)       # Returns 0.5
 * sin(deg_to_rad(90)) # Returns 1.0
 * @summary
 *
 *
 */
declare const sin: (angle_rad: float) => float

/**
 * Returns the hyperbolic sine of [param x].
 *
 * @example
 *
 * var a = log(2.0) # Returns 0.693147
 * sinh(a) # Returns 0.75
 * @summary
 *
 *
 */
declare const sinh: (x: float) => float

/**
 * Returns a smooth cubic Hermite interpolation between `0` and `1`.
 *
 * For positive ranges (when `from <= to`) the return value is `0` when `x <= from`, and `1` when `x >= to`. If [param x] lies between [param from] and [param to], the return value follows an S-shaped curve that smoothly transitions from `0` to `1`.
 *
 * For negative ranges (when `from > to`) the function is mirrored and returns `1` when `x <= to` and `0` when `x >= from`.
 *
 * This S-shaped curve is the cubic Hermite interpolator, given by `f(y) = 3*y^2 - 2*y^3` where `y = (x-from) / (to-from)`.
 *
 * @example
 *
 * smoothstep(0, 2, -5.0) # Returns 0.0
 * smoothstep(0, 2, 0.5) # Returns 0.15625
 * smoothstep(0, 2, 1.0) # Returns 0.5
 * smoothstep(0, 2, 2.0) # Returns 1.0
 * @summary
 *
 *
 * Compared to [method ease] with a curve value of `-1.6521`, [method smoothstep] returns the smoothest possible curve with no sudden changes in the derivative. If you need to perform more advanced transitions, use [Tween] or [AnimationPlayer].
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/smoothstep_ease_comparison.png]Comparison between smoothstep() and ease(x, -1.6521) return values[/url]
 *
 * [url=https://raw.githubusercontent.com/godotengine/godot-docs/master/img/smoothstep_range.webp]Smoothstep() return values with positive, zero, and negative ranges[/url]
 *
 */
declare const smoothstep: (from: float, to: float, x: float) => float

/**
 * Returns the multiple of [param step] that is the closest to [param x]. This can also be used to round a floating-point number to an arbitrary number of decimals.
 *
 * The returned value is the same type of [Variant] as [param step]. Supported types: [int], [float], [Vector2], [Vector2i], [Vector3], [Vector3i], [Vector4], [Vector4i].
 *
 * @example
 *
 * snapped(100, 32)  # Returns 96
 * snapped(3.14159, 0.01)  # Returns 3.14
 * snapped(Vector2(34, 70), Vector2(8, 8))  # Returns (32, 72)
 * @summary
 *
 *
 * See also [method ceil], [method floor], and [method round].
 *
 * **Note:** For better type safety, use [method snappedf], [method snappedi], [method Vector2.snapped], [method Vector2i.snapped], [method Vector3.snapped], [method Vector3i.snapped], [method Vector4.snapped], or [method Vector4i.snapped].
 *
 */
declare const snapped: (x: any, step: any) => any

/**
 * Returns the multiple of [param step] that is the closest to [param x]. This can also be used to round a floating-point number to an arbitrary number of decimals.
 *
 * A type-safe version of [method snapped], returning a [float].
 *
 * @example
 *
 * snappedf(32.0, 2.5)  # Returns 32.5
 * snappedf(3.14159, 0.01)  # Returns 3.14
 * @summary
 *
 *
 */
declare const snappedf: (x: float, step: float) => float

/**
 * Returns the multiple of [param step] that is the closest to [param x].
 *
 * A type-safe version of [method snapped], returning an [int].
 *
 * @example
 *
 * snappedi(53, 16)  # Returns 48
 * snappedi(4096, 100)  # Returns 4100
 * @summary
 *
 *
 */
declare const snappedi: (x: float, step: int) => int

/**
 * Returns the square root of [param x], where [param x] is a non-negative number.
 *
 * @example
 *
 * sqrt(9)     # Returns 3
 * sqrt(10.24) # Returns 3.2
 * sqrt(-1)    # Returns NaN
 * @summary
 *
 *
 * **Note:** Negative values of [param x] return NaN ("Not a Number"). In C#, if you need negative inputs, use `System.Numerics.Complex`.
 *
 */
declare const sqrt: (x: float) => float

/**
 * Returns the position of the first non-zero digit, after the decimal point. Note that the maximum return value is 10, which is a design decision in the implementation.
 *
 * @example
 *
 * var n = step_decimals(5)       # n is 0
 * n = step_decimals(1.0005)      # n is 4
 * n = step_decimals(0.000000005) # n is 9
 * @summary
 *
 *
 */
declare const step_decimals: (x: float) => int

/**
 * Converts one or more arguments of any [Variant] type to a [String] in the best way possible.
 *
 * @example
 *
 * var a = [10, 20, 30]
 * var b = str(a)
 * print(len(a)) # Prints 3 (the number of elements in the array).
 * print(len(b)) # Prints 12 (the length of the string "[10, 20, 30]").
 * @summary
 *
 *
 */
declare const str: (...args: any[]) => string

/**
 * Converts a formatted [param string] that was returned by [method var_to_str] to the original [Variant].
 *
 * @example
 *
 *
 * var data = '{ "a": 1, "b": 2 }' # data is a String
 * var dict = str_to_var(data)     # dict is a Dictionary
 * print(dict["a"])                # Prints 1
 *
 *
 * string data = "{ \"a\": 1, \"b\": 2 }";           // data is a string
 * var dict = GD.StrToVar(data).AsGodotDictionary(); // dict is a Dictionary
 * GD.Print(dict["a"]);                              // Prints 1
 *
 * @summary
 *
 *
 */
declare const str_to_var: (string: string) => any

/**
 * Returns the tangent of angle [param angle_rad] in radians.
 *
 * @example
 *
 * tan(deg_to_rad(45)) # Returns 1
 * @summary
 *
 *
 */
declare const tan: (angle_rad: float) => float

/**
 * Returns the hyperbolic tangent of [param x].
 *
 * @example
 *
 * var a = log(2.0) # Returns 0.693147
 * tanh(a)          # Returns 0.6
 * @summary
 *
 *
 */
declare const tanh: (x: float) => float

/**
 * Converts the given [param variant] to the given [param type], using the [enum Variant.Type] values. This method is generous with how it handles types, it can automatically convert between array types, convert numeric [String]s to [int], and converting most things to [String].
 *
 * If the type conversion cannot be done, this method will return the default value for that type, for example converting [Rect2] to [Vector2] will always return [constant Vector2.ZERO]. This method will never show error messages as long as [param type] is a valid Variant type.
 *
 * The returned value is a [Variant], but the data inside and its type will be the same as the requested type.
 *
 * @example
 *
 * type_convert("Hi!", TYPE_INT) # Returns 0
 * type_convert("123", TYPE_INT) # Returns 123
 * type_convert(123.4, TYPE_INT) # Returns 123
 * type_convert(5, TYPE_VECTOR2) # Returns (0, 0)
 * type_convert("Hi!", TYPE_NIL) # Returns null
 * @summary
 *
 *
 */
declare const type_convert: (variant: any, type: int) => any

/**
 * Returns a human-readable name of the given [param type], using the [enum Variant.Type] values.
 *
 * @example
 *
 * print(TYPE_INT) # Prints 2
 * print(type_string(TYPE_INT)) # Prints "int"
 * print(type_string(TYPE_STRING)) # Prints "String"
 * @summary
 *
 *
 * See also [method typeof].
 *
 */
declare const type_string: (type: int) => string

/**
 * Encodes a [Variant] value to a byte array, without encoding objects. Deserialization can be done with [method bytes_to_var].
 *
 * **Note:** If you need object serialization, see [method var_to_bytes_with_objects].
 *
 * **Note:** Encoding [Callable] is not supported and will result in an empty value, regardless of the data.
 *
 */
declare const var_to_bytes: (variable: any) => PackedByteArray

/**
 * Encodes a [Variant] value to a byte array. Encoding objects is allowed (and can potentially include executable code). Deserialization can be done with [method bytes_to_var_with_objects].
 *
 * **Note:** Encoding [Callable] is not supported and will result in an empty value, regardless of the data.
 *
 */
declare const var_to_bytes_with_objects: (variable: any) => PackedByteArray

/**
 * Converts a [Variant] [param variable] to a formatted [String] that can then be parsed using [method str_to_var].
 *
 * @example
 *
 *
 * var a = { "a": 1, "b": 2 }
 * print(var_to_str(a))
 *
 *
 * var a = new Godot.Collections.Dictionary { ["a"] = 1, ["b"] = 2 };
 * GD.Print(GD.VarToStr(a));
 *
 * @summary
 *
 *
 * Prints:
 *
 * [codeblock lang=text]
 *
 * {
 *
 * 	"a": 1,
 *
 * 	"b": 2
 *
 * }
 *
 * @summary
 *
 *
 * **Note:** Converting [Signal] or [Callable] is not supported and will result in an empty value for these types, regardless of their data.
 *
 */
declare const var_to_str: (variable: any) => string

/**
 * Returns a [WeakRef] instance holding a weak reference to [param obj]. Returns an empty [WeakRef] instance if [param obj] is `null`. Prints an error and returns `null` if [param obj] is neither [Object]-derived nor `null`.
 *
 * A weak reference to an object is not enough to keep the object alive: when the only remaining references to a referent are weak references, garbage collection is free to destroy the referent and reuse its memory for something else. However, until the object is actually destroyed the weak reference may return the object even if there are no strong references to it.
 *
 */
declare const weakref: (obj: any) => any

/**
 * Wraps the [Variant] [param value] between [param min] and [param max]. [param min] is **inclusive** while [param max] is **exclusive**. This can be used for creating loop-like behavior or infinite surfaces.
 *
 * Variant types [int] and [float] are supported. If any of the arguments is [float], this function returns a [float], otherwise it returns an [int].
 *
 * @example
 *
 * var a = wrap(4, 5, 10)
 * # a is 9 (int)
 * var a = wrap(7, 5, 10)
 * # a is 7 (int)
 * var a = wrap(10.5, 5, 10)
 * # a is 5.5 (float)
 * @summary
 *
 *
 */
declare const wrap: (value: any, min: any, max: any) => any

/**
 * Wraps the float [param value] between [param min] and [param max]. [param min] is **inclusive** while [param max] is **exclusive**. This can be used for creating loop-like behavior or infinite surfaces.
 *
 * @example
 *
 * # Infinite loop between 5.0 and 9.9
 * value = wrapf(value + 0.1, 5.0, 10.0)
 * @summary
 *
 *
 * @example
 *
 * # Infinite rotation (in radians)
 * angle = wrapf(angle + 0.1, 0.0, TAU)
 * @summary
 *
 *
 * @example
 *
 * # Infinite rotation (in radians)
 * angle = wrapf(angle + 0.1, -PI, PI)
 * @summary
 *
 *
 * **Note:** If [param min] is `0`, this is equivalent to [method fposmod], so prefer using that instead. [method wrapf] is more flexible than using the [method fposmod] approach by giving the user control over the minimum value.
 *
 */
declare const wrapf: (value: float, min: float, max: float) => float

/**
 * Wraps the integer [param value] between [param min] and [param max]. [param min] is **inclusive** while [param max] is **exclusive**. This can be used for creating loop-like behavior or infinite surfaces.
 *
 * @example
 *
 * # Infinite loop between 5 and 9
 * frame = wrapi(frame + 1, 5, 10)
 * @summary
 *
 *
 * @example
 *
 * # result is -2
 * var result = wrapi(-6, -5, -1)
 * @summary
 *
 *
 */
declare const wrapi: (value: int, min: int, max: int) => int
