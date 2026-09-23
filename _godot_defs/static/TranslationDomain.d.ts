/**
 * [TranslationDomain] is a self-contained collection of [Translation] resources. Translations can be added to or removed from it.
 *
 * If you're working with the main translation domain, it is more convenient to use the wrap methods on [TranslationServer].
 *
 */
declare class TranslationDomain extends RefCounted {
  /**
   * [TranslationDomain] is a self-contained collection of [Translation] resources. Translations can be added to or removed from it.
   *
   * If you're working with the main translation domain, it is more convenient to use the wrap methods on [TranslationServer].
   *
   */
  new(): TranslationDomain
  constructor()
  static new(): TranslationDomain

  /** If [code]true[/code], translation is enabled. Otherwise, [method translate] and [method translate_plural] will return the input message unchanged regardless of the current locale. */
  enabled: boolean

  /**
   * Replace all characters with their accented variants during pseudolocalization.
   *
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] notification manually after you have finished modifying pseudolocalization related options.
   *
   */
  pseudolocalization_accents_enabled: boolean

  /**
   * Double vowels in strings during pseudolocalization to simulate the lengthening of text due to localization.
   *
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] notification manually after you have finished modifying pseudolocalization related options.
   *
   */
  pseudolocalization_double_vowels_enabled: boolean

  /**
   * If `true`, enables pseudolocalization for the project. This can be used to spot untranslatable strings or layout issues that may occur once the project is localized to languages that have longer strings than the source language.
   *
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] notification manually after you have finished modifying pseudolocalization related options.
   *
   */
  pseudolocalization_enabled: boolean

  /**
   * The expansion ratio to use during pseudolocalization. A value of `0.3` is sufficient for most practical purposes, and will increase the length of each string by 30%.
   *
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] notification manually after you have finished modifying pseudolocalization related options.
   *
   */
  pseudolocalization_expansion_ratio: float

  /**
   * If `true`, emulate bidirectional (right-to-left) text when pseudolocalization is enabled. This can be used to spot issues with RTL layout and UI mirroring that will crop up if the project is localized to RTL languages such as Arabic or Hebrew.
   *
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] notification manually after you have finished modifying pseudolocalization related options.
   *
   */
  pseudolocalization_fake_bidi_enabled: boolean

  /**
   * Replace all characters in the string with `*`. Useful for finding non-localizable strings.
   *
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] notification manually after you have finished modifying pseudolocalization related options.
   *
   */
  pseudolocalization_override_enabled: boolean

  /**
   * Prefix that will be prepended to the pseudolocalized string.
   *
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] notification manually after you have finished modifying pseudolocalization related options.
   *
   */
  pseudolocalization_prefix: string

  /**
   * Skip placeholders for string formatting like `%s` or `%f` during pseudolocalization. Useful to identify strings which need additional control characters to display correctly.
   *
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] notification manually after you have finished modifying pseudolocalization related options.
   *
   */
  pseudolocalization_skip_placeholders_enabled: boolean

  /**
   * Suffix that will be appended to the pseudolocalized string.
   *
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] notification manually after you have finished modifying pseudolocalization related options.
   *
   */
  pseudolocalization_suffix: string

  /** Adds a translation. */
  add_translation(translation: Translation): void

  /** Removes all translations. */
  clear(): void

  /** Returns the [Translation] instances that match [param locale] (see [method TranslationServer.compare_locales]). If [param exact] is [code]true[/code], only instances whose locale exactly equals [param locale] will be returned. */
  find_translations(locale: string, exact: boolean): Translation[]

  /** Returns the locale override of the domain. Returns an empty string if locale override is disabled. */
  get_locale_override(): string

  /** Returns the [Translation] instance that best matches [param locale]. Returns [code]null[/code] if there are no matches. */
  get_translation_object(locale: string): Translation

  /** Returns all available [Translation] instances as added by [method add_translation]. */
  get_translations(): Translation[]

  /** Returns [code]true[/code] if this translation domain contains the given [param translation]. */
  has_translation(translation: Translation): boolean

  /** Returns [code]true[/code] if there are any [Translation] instances that match [param locale] (see [method TranslationServer.compare_locales]). If [param exact] is [code]true[/code], only instances whose locale exactly equals [param locale] are considered. */
  has_translation_for_locale(locale: string, exact: boolean): boolean

  /** Returns the pseudolocalized string based on the [param message] passed in. */
  pseudolocalize(message: StringName): StringName

  /** Removes the given translation. */
  remove_translation(translation: Translation): void

  /**
   * Sets the locale override of the domain.
   *
   * If [param locale] is an empty string, locale override is disabled. Otherwise, [param locale] will be standardized to match known locales (e.g. `en-US` would be matched to `en_US`).
   *
   * **Note:** Calling this method does not automatically update texts in the scene tree. Please propagate the [constant MainLoop.NOTIFICATION_TRANSLATION_CHANGED] signal manually.
   *
   */
  set_locale_override(locale: string): void

  /** Returns the current locale's translation for the given message and context. */
  translate(message: StringName, context?: StringName): StringName

  /**
   * Returns the current locale's translation for the given message, plural message and context.
   *
   * The number [param n] is the number or quantity of the plural object. It will be used to guide the translation system to fetch the correct plural form for the selected language.
   *
   */
  translate_plural(
    message: StringName,
    message_plural: StringName,
    n: int,
    context?: StringName
  ): StringName

  connect<T extends SignalsOf<TranslationDomain>>(
    signal: T,
    method: SignalFunction<TranslationDomain[T]>
  ): number
}
