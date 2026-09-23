/**
 * This object contains shader fragments from Godot's internal shaders. These can be used when access to internal uniform buffers and/or internal functions is required for instance when composing compositor effects or compute shaders. Only fragments for the current rendering device are loaded.
 *
 */
declare class ShaderIncludeDB extends Object {
  /**
   * This object contains shader fragments from Godot's internal shaders. These can be used when access to internal uniform buffers and/or internal functions is required for instance when composing compositor effects or compute shaders. Only fragments for the current rendering device are loaded.
   *
   */
  new(): ShaderIncludeDB
  constructor()
  static new(): ShaderIncludeDB

  /** Returns the code for the built-in shader fragment. You can also access this in your shader code through [code]#include "filename"[/code]. */
  static get_built_in_include_file(filename: string): string

  /** Returns [code]true[/code] if an include file with this name exists. */
  static has_built_in_include_file(filename: string): boolean

  /** Returns a list of built-in include files that are currently registered. */
  static list_built_in_include_files(): PackedStringArray

  connect<T extends SignalsOf<ShaderIncludeDB>>(
    signal: T,
    method: SignalFunction<ShaderIncludeDB[T]>
  ): number
}
