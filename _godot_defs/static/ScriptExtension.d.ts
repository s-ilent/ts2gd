/**
 */
declare class ScriptExtension extends Script {
  /**
   */
  new(): ScriptExtension
  constructor()
  static new(): ScriptExtension

  /** No documentation provided. */
  protected _can_instantiate(): boolean

  /** No documentation provided. */
  protected _editor_can_reload_from_file(): boolean

  /** No documentation provided. */
  protected _get_base_script(): Script

  /** No documentation provided. */
  protected _get_class_icon_path(): string

  /** No documentation provided. */
  protected _get_constants(): Dictionary<any, any>

  /** No documentation provided. */
  protected _get_doc_class_name(): StringName

  /** No documentation provided. */
  protected _get_documentation(): Dictionary<any, any>[]

  /** No documentation provided. */
  protected _get_global_name(): StringName

  /** No documentation provided. */
  protected _get_instance_base_type(): StringName

  /** No documentation provided. */
  protected _get_language(): ScriptLanguage

  /** No documentation provided. */
  protected _get_member_line(member: StringName): int

  /** No documentation provided. */
  protected _get_members(): StringName[]

  /** No documentation provided. */
  protected _get_method_info(method: StringName): Dictionary<any, any>

  /** No documentation provided. */
  protected _get_property_default_value(property: StringName): any

  /** No documentation provided. */
  protected _get_rpc_config(): any

  /** Return the expected argument count for the given [param method], or [code]null[/code] if it can't be determined (which will then fall back to the default behavior). */
  protected _get_script_method_argument_count(method: StringName): any

  /** No documentation provided. */
  protected _get_script_method_list(): Dictionary<any, any>[]

  /** No documentation provided. */
  protected _get_script_property_list(): Dictionary<any, any>[]

  /** No documentation provided. */
  protected _get_script_signal_list(): Dictionary<any, any>[]

  /** No documentation provided. */
  protected _get_source_code(): string

  /** No documentation provided. */
  protected _has_method(method: StringName): boolean

  /** No documentation provided. */
  protected _has_property_default_value(property: StringName): boolean

  /** No documentation provided. */
  protected _has_script_signal(signal: StringName): boolean

  /** No documentation provided. */
  protected _has_source_code(): boolean

  /** No documentation provided. */
  protected _has_static_method(method: StringName): boolean

  /** No documentation provided. */
  protected _inherits_script(script: Script): boolean

  /** No documentation provided. */
  protected _instance_create(for_object: Object): CPointer

  /** No documentation provided. */
  protected _instance_has(object: Object): boolean

  /** Returns [code]true[/code] if the script is an abstract script. Abstract scripts cannot be instantiated directly, instead other scripts should inherit them. Abstract scripts will be either unselectable or hidden in the Create New Node dialog (unselectable if there are non-abstract classes inheriting it, otherwise hidden). */
  protected _is_abstract(): boolean

  /** No documentation provided. */
  protected _is_placeholder_fallback_enabled(): boolean

  /** No documentation provided. */
  protected _is_tool(): boolean

  /** No documentation provided. */
  protected _is_valid(): boolean

  /** No documentation provided. */
  protected _placeholder_erased(placeholder: CPointer): void

  /** No documentation provided. */
  protected _placeholder_instance_create(for_object: Object): CPointer

  /** No documentation provided. */
  protected _reload(keep_state: boolean): int

  /** No documentation provided. */
  protected _set_source_code(code: string): void

  /** No documentation provided. */
  protected _update_exports(): void

  connect<T extends SignalsOf<ScriptExtension>>(
    signal: T,
    method: SignalFunction<ScriptExtension[T]>
  ): number
}
