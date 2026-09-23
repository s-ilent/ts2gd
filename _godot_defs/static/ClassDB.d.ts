/**
 * Provides access to metadata stored for every available engine class.
 *
 * **Note:** Script-defined classes with `class_name` are not part of [ClassDB], so they will not return reflection data such as a method or property list. However, [GDExtension]-defined classes **are** part of [ClassDB], so they will return reflection data.
 *
 */
declare class ClassDBClass extends Object {
  /**
   * Provides access to metadata stored for every available engine class.
   *
   * **Note:** Script-defined classes with `class_name` are not part of [ClassDB], so they will not return reflection data such as a method or property list. However, [GDExtension]-defined classes **are** part of [ClassDB], so they will return reflection data.
   *
   */
  new(): ClassDBClass
  constructor()
  static new(): ClassDBClass

  /** Returns [code]true[/code] if objects can be instantiated from the specified [param class], otherwise returns [code]false[/code]. */
  can_instantiate(_class: StringName): boolean

  /** Calls a static method on a class. */
  class_call_static(_class: StringName, method: StringName, ...args: any[]): any

  /** Returns whether the specified [param class] is available or not. */
  class_exists(_class: StringName): boolean

  /** Returns the API type of the specified [param class]. */
  class_get_api_type(_class: StringName): int

  /** Returns an array with all the keys in [param enum] of [param class] or its ancestry. */
  class_get_enum_constants(
    _class: StringName,
    _enum: StringName,
    no_inheritance?: boolean
  ): PackedStringArray

  /** Returns an array with all the enums of [param class] or its ancestry. */
  class_get_enum_list(
    _class: StringName,
    no_inheritance?: boolean
  ): PackedStringArray

  /** Returns the value of the integer constant [param name] of [param class] or its ancestry. Always returns 0 when the constant could not be found. */
  class_get_integer_constant(_class: StringName, name: StringName): int

  /** Returns which enum the integer constant [param name] of [param class] or its ancestry belongs to. */
  class_get_integer_constant_enum(
    _class: StringName,
    name: StringName,
    no_inheritance?: boolean
  ): StringName

  /** Returns an array with the names all the integer constants of [param class] or its ancestry. */
  class_get_integer_constant_list(
    _class: StringName,
    no_inheritance?: boolean
  ): PackedStringArray

  /** Returns the number of arguments of the method [param method] of [param class] or its ancestry if [param no_inheritance] is [code]false[/code]. */
  class_get_method_argument_count(
    _class: StringName,
    method: StringName,
    no_inheritance?: boolean
  ): int

  /**
   * Returns an array with all the methods of [param class] or its ancestry if [param no_inheritance] is `false`. Every element of the array is a [Dictionary] with the following keys: `args`, `default_args`, `flags`, `id`, `name`, `return: (class_name, hint, hint_string, name, type, usage)`.
   *
   * **Note:** In exported release builds the debug info is not available, so the returned dictionaries will contain only method names.
   *
   */
  class_get_method_list(
    _class: StringName,
    no_inheritance?: boolean
  ): Dictionary<any, any>[]

  /** Returns the value of [param property] of [param object] or its ancestry. */
  class_get_property(object: Object, property: StringName): any

  /** Returns the default value of [param property] of [param class] or its ancestor classes. */
  class_get_property_default_value(
    _class: StringName,
    property: StringName
  ): any

  /** Returns the getter method name of [param property] of [param class]. */
  class_get_property_getter(
    _class: StringName,
    property: StringName
  ): StringName

  /** Returns an array with all the properties of [param class] or its ancestry if [param no_inheritance] is [code]false[/code]. */
  class_get_property_list(
    _class: StringName,
    no_inheritance?: boolean
  ): Dictionary<any, any>[]

  /** Returns the setter method name of [param property] of [param class]. */
  class_get_property_setter(
    _class: StringName,
    property: StringName
  ): StringName

  /** Returns the [param signal] data of [param class] or its ancestry. The returned value is a [Dictionary] with the following keys: [code]args[/code], [code]default_args[/code], [code]flags[/code], [code]id[/code], [code]name[/code], [code]return: (class_name, hint, hint_string, name, type, usage)[/code]. */
  class_get_signal(_class: StringName, signal: StringName): Dictionary<any, any>

  /** Returns an array with all the signals of [param class] or its ancestry if [param no_inheritance] is [code]false[/code]. Every element of the array is a [Dictionary] as described in [method class_get_signal]. */
  class_get_signal_list(
    _class: StringName,
    no_inheritance?: boolean
  ): Dictionary<any, any>[]

  /** Returns whether [param class] or its ancestry has an enum called [param name] or not. */
  class_has_enum(
    _class: StringName,
    name: StringName,
    no_inheritance?: boolean
  ): boolean

  /** Returns whether [param class] or its ancestry has an integer constant called [param name] or not. */
  class_has_integer_constant(_class: StringName, name: StringName): boolean

  /** Returns whether [param class] (or its ancestry if [param no_inheritance] is [code]false[/code]) has a method called [param method] or not. */
  class_has_method(
    _class: StringName,
    method: StringName,
    no_inheritance?: boolean
  ): boolean

  /** Returns whether [param class] or its ancestry has a signal called [param signal] or not. */
  class_has_signal(_class: StringName, signal: StringName): boolean

  /** Sets [param property] value of [param object] to [param value]. */
  class_set_property(object: Object, property: StringName, value: any): int

  /**
   * Returns the names of all engine classes available.
   *
   * **Note:** Script-defined classes with `class_name` are not included in this list. Use [method ProjectSettings.get_global_class_list] to get a list of script-defined classes instead.
   *
   */
  get_class_list(): PackedStringArray

  /** Returns the names of all engine classes that directly or indirectly inherit from [param class]. */
  get_inheriters_from_class(_class: StringName): PackedStringArray

  /** Returns the parent class of [param class]. */
  get_parent_class(_class: StringName): StringName

  /** Creates an instance of [param class]. */
  instantiate(_class: StringName): any

  /** Returns whether this [param class] is enabled or not. */
  is_class_enabled(_class: StringName): boolean

  /** Returns whether [param class] (or its ancestor classes if [param no_inheritance] is [code]false[/code]) has an enum called [param enum] that is a bitfield. */
  is_class_enum_bitfield(
    _class: StringName,
    _enum: StringName,
    no_inheritance?: boolean
  ): boolean

  /** Returns whether [param inherits] is an ancestor of [param class] or not. */
  is_parent_class(_class: StringName, inherits: StringName): boolean

  connect<T extends SignalsOf<ClassDBClass>>(
    signal: T,
    method: SignalFunction<ClassDBClass[T]>
  ): number

  /**
   * Native Core class type.
   *
   */
  static API_CORE: any

  /**
   * Native Editor class type.
   *
   */
  static API_EDITOR: any

  /**
   * GDExtension class type.
   *
   */
  static API_EXTENSION: any

  /**
   * GDExtension Editor class type.
   *
   */
  static API_EDITOR_EXTENSION: any

  /**
   * Unknown class type.
   *
   */
  static API_NONE: any
}
