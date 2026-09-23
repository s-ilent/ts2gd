/**
 * An optimized translation. Uses real-time compressed translations, which results in very small dictionaries.
 *
 * This class does not store the untranslated strings for optimization purposes. Therefore, [method Translation.get_message_list] always returns an empty array, and [method Translation.get_message_count] always returns `0`.
 *
 */
declare class OptimizedTranslation extends Translation {
  /**
   * An optimized translation. Uses real-time compressed translations, which results in very small dictionaries.
   *
   * This class does not store the untranslated strings for optimization purposes. Therefore, [method Translation.get_message_list] always returns an empty array, and [method Translation.get_message_count] always returns `0`.
   *
   */
  new(): OptimizedTranslation
  constructor()
  static new(): OptimizedTranslation

  /**
   * Generates and sets an optimized translation from the given [Translation] resource.
   *
   * **Note:** Messages in [param from] should not use context or plural forms.
   *
   * **Note:** This method is intended to be used in the editor. It does nothing when called from an exported project.
   *
   */
  generate(from: Translation): void

  connect<T extends SignalsOf<OptimizedTranslation>>(
    signal: T,
    method: SignalFunction<OptimizedTranslation[T]>
  ): number
}
