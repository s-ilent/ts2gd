/**
 * A class stored as a resource. A script extends the functionality of all objects that instantiate it.
 *
 * This is the base class for all scripts and should not be used directly. Trying to create a new script with this class will result in an error.
 *
 * The `new` method of a script subclass creates a new instance. [method Object.set_script] extends an existing object, if that object's class matches one of the script's base classes.
 *
 */
declare class Script extends Resource {
  /**
   * A class stored as a resource. A script extends the functionality of all objects that instantiate it.
   *
   * This is the base class for all scripts and should not be used directly. Trying to create a new script with this class will result in an error.
   *
   * The `new` method of a script subclass creates a new instance. [method Object.set_script] extends an existing object, if that object's class matches one of the script's base classes.
   *
   */
  new(): Script
  constructor()
  static new(): Script

  /** The script source code or an empty string if source code is not available. When set, does not reload the class implementation automatically. */
  source_code: string

  /** Returns [code]true[/code] if the script can be instantiated. */
  can_instantiate(): boolean

  /** Returns the script directly inherited by this script. */
  get_base_script(): Script

  /**
   * Returns the class name associated with the script, if there is one. Returns an empty string otherwise.
   *
   * To give the script a global name, you can use the `class_name` keyword in GDScript and the `[GlobalClass]` attribute in C#.
   *
   * @example
   *
   *
   * class_name MyNode
   * extends Node
   *
   *
   * using Godot;
   * [GlobalClass]
   * public partial class MyNode : Node
   * {
   * }
   *
   * @summary
   *
   *
   */
  get_global_name(): StringName

  /** Returns the script's base type. */
  get_instance_base_type(): StringName

  /** Returns the default value of the specified property. */
  get_property_default_value(property: StringName): any

  /** Returns a [Dictionary] mapping method names to their RPC configuration defined by this script. */
  get_rpc_config(): any

  /** Returns a dictionary containing constant names and their values. */
  get_script_constant_map(): Dictionary<any, any>

  /**
   * Returns the list of methods in this [Script].
   *
   * **Note:** The dictionaries returned by this method are formatted identically to those returned by [method Object.get_method_list].
   *
   */
  get_script_method_list(): Dictionary<any, any>[]

  /**
   * Returns the list of properties in this [Script].
   *
   * **Note:** The dictionaries returned by this method are formatted identically to those returned by [method Object.get_property_list].
   *
   */
  get_script_property_list(): Dictionary<any, any>[]

  /**
   * Returns the list of signals defined in this [Script].
   *
   * **Note:** The dictionaries returned by this method are formatted identically to those returned by [method Object.get_signal_list].
   *
   */
  get_script_signal_list(): Dictionary<any, any>[]

  /** Returns [code]true[/code] if the script, or a base class, defines a signal with the given name. */
  has_script_signal(signal_name: StringName): boolean

  /**
   * Returns `true` if the script contains non-empty source code.
   *
   * **Note:** If a script does not have source code, this does not mean that it is invalid or unusable. For example, a [GDScript] that was exported with binary tokenization has no source code, but still behaves as expected and could be instantiated. This can be checked with [method can_instantiate].
   *
   */
  has_source_code(): boolean

  /** Returns [code]true[/code] if [param base_object] is an instance of this script. */
  instance_has(base_object: Object): boolean

  /** Returns [code]true[/code] if the script is an abstract script. An abstract script does not have a constructor and cannot be instantiated. */
  is_abstract(): boolean

  /** Returns [code]true[/code] if the script is a tool script. A tool script can run in the editor. */
  is_tool(): boolean

  /** Reloads the script's class implementation. Returns an error code. */
  reload(keep_state?: boolean): int

  connect<T extends SignalsOf<Script>>(
    signal: T,
    method: SignalFunction<Script[T]>
  ): number
}
