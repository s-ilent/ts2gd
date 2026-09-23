/**
 * [Translation] maps a collection of strings to their individual translations, and also provides convenience methods for pluralization.
 *
 * A [Translation] consists of messages. A message is identified by its context and untranslated string. Unlike [url=https://www.gnu.org/software/gettext/]gettext[/url], using an empty context string in Godot means not using any context.
 *
 */
declare class Translation extends Resource {
  /**
   * [Translation] maps a collection of strings to their individual translations, and also provides convenience methods for pluralization.
   *
   * A [Translation] consists of messages. A message is identified by its context and untranslated string. Unlike [url=https://www.gnu.org/software/gettext/]gettext[/url], using an empty context string in Godot means not using any context.
   *
   */
  new(): Translation
  constructor()
  static new(): Translation

  /** The locale of the translation. */
  locale: string

  /**
   * The plural rules string to enforce. See [url=https://www.gnu.org/software/gettext/manual/html_node/Plural-forms.html]GNU gettext[/url] for examples and more info.
   *
   * If empty or invalid, default plural rules from [method TranslationServer.get_plural_rules] are used. The English plural rules are used as a fallback.
   *
   */
  plural_rules_override: string

  /** Virtual method to override [method get_message]. */
  protected _get_message(
    src_message: StringName,
    context: StringName
  ): StringName

  /** Virtual method to override [method get_plural_message]. */
  protected _get_plural_message(
    src_message: StringName,
    src_plural_message: StringName,
    n: int,
    context: StringName
  ): StringName

  /**
   * Adds a message if nonexistent, followed by its translation.
   *
   * An additional context could be used to specify the translation context or differentiate polysemic words.
   *
   */
  add_message(
    src_message: StringName,
    xlated_message: StringName,
    context?: StringName
  ): void

  /**
   * Adds a message involving plural translation if nonexistent, followed by its translation.
   *
   * An additional context could be used to specify the translation context or differentiate polysemic words.
   *
   */
  add_plural_message(
    src_message: StringName,
    xlated_messages: PackedStringArray,
    context?: StringName
  ): void

  /** Erases a message. */
  erase_message(src_message: StringName, context?: StringName): void

  /** Returns a message's translation. */
  get_message(src_message: StringName, context?: StringName): StringName

  /** Returns the number of existing messages. */
  get_message_count(): int

  /**
   * Returns the keys of all messages, that is, the context and untranslated strings of each message.
   *
   * **Note:** If a message does not use a context, the corresponding element is the untranslated string. Otherwise, the corresponding element is the context and untranslated string separated by the EOT character (`U+0004`). This is done for compatibility purposes.
   *
   * @example
   *
   * for key in translation.get_message_list():
   * 	var p = key.find("\u0004")
   * 	if p == -1:
   * 		var untranslated = key
   * 		print("Message %s" % untranslated)
   * 	else:
   * 		var context = key.substr(0, p)
   * 		var untranslated = key.substr(p + 1)
   * 		print("Message %s with context %s" % [untranslated, context])
   * @summary
   *
   *
   */
  get_message_list(): PackedStringArray

  /**
   * Returns a message's translation involving plurals.
   *
   * The number [param n] is the number or quantity of the plural object. It will be used to guide the translation system to fetch the correct plural form for the selected language.
   *
   * **Note:** Plurals are only supported in [url=$DOCS_URL/tutorials/i18n/localization_using_gettext.html]gettext-based translations (PO)[/url], not CSV.
   *
   */
  get_plural_message(
    src_message: StringName,
    src_plural_message: StringName,
    n: int,
    context?: StringName
  ): StringName

  /** Returns all the translated strings. */
  get_translated_message_list(): PackedStringArray

  connect<T extends SignalsOf<Translation>>(
    signal: T,
    method: SignalFunction<Translation[T]>
  ): number
}
