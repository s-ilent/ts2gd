/**
 */
declare class ScriptLanguage extends Object {
  /**
   */
  new(): ScriptLanguage
  constructor()
  static new(): ScriptLanguage

  connect<T extends SignalsOf<ScriptLanguage>>(
    signal: T,
    method: SignalFunction<ScriptLanguage[T]>
  ): number

  /** No documentation provided. */
  static SCRIPT_NAME_CASING_AUTO: any

  /** No documentation provided. */
  static SCRIPT_NAME_CASING_PASCAL_CASE: any

  /** No documentation provided. */
  static SCRIPT_NAME_CASING_SNAKE_CASE: any

  /** No documentation provided. */
  static SCRIPT_NAME_CASING_KEBAB_CASE: any

  /** No documentation provided. */
  static SCRIPT_NAME_CASING_CAMEL_CASE: any
}
