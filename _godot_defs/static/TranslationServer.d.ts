/**
 * The translation server is the API backend that manages all language translations.
 *
 * Translations are stored in [TranslationDomain]s, which can be accessed by name. The most commonly used translation domain is the main translation domain. It always exists and can be accessed using an empty [StringName]. The translation server provides wrapper methods for accessing the main translation domain directly, without having to fetch the translation domain first. Custom translation domains are mainly for advanced usages like editor plugins. Names starting with `godot.` are reserved for engine internals.
 *
 */
declare class TranslationServerClass extends Object {
  /**
   * The translation server is the API backend that manages all language translations.
   *
   * Translations are stored in [TranslationDomain]s, which can be accessed by name. The most commonly used translation domain is the main translation domain. It always exists and can be accessed using an empty [StringName]. The translation server provides wrapper methods for accessing the main translation domain directly, without having to fetch the translation domain first. Custom translation domains are mainly for advanced usages like editor plugins. Names starting with `godot.` are reserved for engine internals.
   *
   */
  new(): TranslationServerClass
  constructor()
  static new(): TranslationServerClass

  /** If [code]true[/code], enables the use of pseudolocalization on the main translation domain. See [member ProjectSettings.internationalization/pseudolocalization/use_pseudolocalization] for details. */
  pseudolocalization_enabled: boolean

  /** Adds a translation to the main translation domain. */
  add_translation(translation: Translation): void

  /** Removes all translations from the main translation domain. */
  clear(): void

  /** Compares two locales and returns a similarity score between [code]0[/code] (no match) and [code]10[/code] (full match). */
  compare_locales(locale_a: string, locale_b: string): int

  /** Returns the [Translation] instances in the main translation domain that match [param locale] (see [method compare_locales]). If [param exact] is [code]true[/code], only instances whose locale exactly equals [param locale] will be returned. */
  find_translations(locale: string, exact: boolean): Translation[]

  /** Converts a number from Western Arabic (0..9) to the numeral system used in the given [param locale]. */
  format_number(number: string, locale: string): string

  /** Returns an array of known country codes. */
  get_all_countries(): PackedStringArray

  /** Returns array of known language codes. */
  get_all_languages(): PackedStringArray

  /** Returns an array of known script codes. */
  get_all_scripts(): PackedStringArray

  /** Returns a readable country name for the [param country] code. */
  get_country_name(country: string): string

  /** Returns a readable language name for the [param language] code. */
  get_language_name(language: string): string

  /** Returns an array of all loaded locales of the project. */
  get_loaded_locales(): PackedStringArray

  /**
   * Returns the current locale of the project.
   *
   * See also [method OS.get_locale] and [method OS.get_locale_language] to query the locale of the user system.
   *
   */
  get_locale(): string

  /** Returns a locale's language and its variant (e.g. [code]"en_US"[/code] would return [code]"English (United States)"[/code]). */
  get_locale_name(locale: string): string

  /** Returns the translation domain with the specified name. An empty translation domain will be created and added if it does not exist. */
  get_or_add_domain(domain: StringName): TranslationDomain

  /** Returns the percent sign used in the given [param locale]. */
  get_percent_sign(locale: string): string

  /** Returns the default plural rules for the [param locale]. */
  get_plural_rules(locale: string): string

  /** Returns a readable script name for the [param script] code. */
  get_script_name(script: string): string

  /**
   * Returns the current locale of the editor.
   *
   * **Note:** When called from an exported project returns the same value as [method get_locale].
   *
   */
  get_tool_locale(): string

  /** Returns the [Translation] instance that best matches [param locale] in the main translation domain. Returns [code]null[/code] if there are no matches. */
  get_translation_object(locale: string): Translation

  /** Returns all available [Translation] instances in the main translation domain as added by [method add_translation]. */
  get_translations(): Translation[]

  /** Returns [code]true[/code] if a translation domain with the specified name exists. */
  has_domain(domain: StringName): boolean

  /** Returns [code]true[/code] if the main translation domain contains the given [param translation]. */
  has_translation(translation: Translation): boolean

  /** Returns [code]true[/code] if there are any [Translation] instances in the main translation domain that match [param locale] (see [method compare_locales]). If [param exact] is [code]true[/code], only instances whose locale exactly equals [param locale] are considered. */
  has_translation_for_locale(locale: string, exact: boolean): boolean

  /** Converts [param number] from the numeral system used in the given [param locale] to Western Arabic (0..9). */
  parse_number(number: string, locale: string): string

  /**
   * Returns the pseudolocalized string based on the [param message] passed in.
   *
   * **Note:** This method always uses the main translation domain.
   *
   */
  pseudolocalize(message: StringName): StringName

  /** Reparses the pseudolocalization options and reloads the translation for the main translation domain. */
  reload_pseudolocalization(): void

  /**
   * Removes the translation domain with the specified name.
   *
   * **Note:** Trying to remove the main translation domain is an error.
   *
   */
  remove_domain(domain: StringName): void

  /** Removes the given translation from the main translation domain. */
  remove_translation(translation: Translation): void

  /**
   * Sets the locale of the project. The [param locale] string will be standardized to match known locales (e.g. `en-US` would be matched to `en_US`).
   *
   * If translations have been loaded beforehand for the new locale, they will be applied.
   *
   */
  set_locale(locale: string): void

  /** Returns a [param locale] string standardized to match known locales (e.g. [code]en-US[/code] would be matched to [code]en_US[/code]). If [param add_defaults] is [code]true[/code], the locale may have a default script or country added. */
  standardize_locale(locale: string, add_defaults?: boolean): string

  /**
   * Returns the current locale's translation for the given message and context.
   *
   * **Note:** This method always uses the main translation domain.
   *
   */
  translate(message: StringName, context?: StringName): StringName

  /**
   * Returns the current locale's translation for the given message, plural message and context.
   *
   * The number [param n] is the number or quantity of the plural object. It will be used to guide the translation system to fetch the correct plural form for the selected language.
   *
   * **Note:** This method always uses the main translation domain.
   *
   */
  translate_plural(
    message: StringName,
    plural_message: StringName,
    n: int,
    context?: StringName
  ): StringName

  connect<T extends SignalsOf<TranslationServerClass>>(
    signal: T,
    method: SignalFunction<TranslationServerClass[T]>
  ): number
}
