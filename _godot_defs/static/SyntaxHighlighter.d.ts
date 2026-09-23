/**
 * Base class for syntax highlighters. Provides syntax highlighting data to a [TextEdit]. The associated [TextEdit] will call into the [SyntaxHighlighter] on an as-needed basis.
 *
 * **Note:** A [SyntaxHighlighter] instance should not be used across multiple [TextEdit] nodes.
 *
 */
declare class SyntaxHighlighter extends Resource {
  /**
   * Base class for syntax highlighters. Provides syntax highlighting data to a [TextEdit]. The associated [TextEdit] will call into the [SyntaxHighlighter] on an as-needed basis.
   *
   * **Note:** A [SyntaxHighlighter] instance should not be used across multiple [TextEdit] nodes.
   *
   */
  new(): SyntaxHighlighter
  constructor()
  static new(): SyntaxHighlighter

  /** Virtual method which can be overridden to clear any local caches. */
  protected _clear_highlighting_cache(): void

  /**
   * Virtual method which can be overridden to return syntax highlighting data.
   *
   * See [method get_line_syntax_highlighting] for more details.
   *
   */
  protected _get_line_syntax_highlighting(line: int): Dictionary<any, any>

  /** Virtual method which can be overridden to update any local caches. */
  protected _update_cache(): void

  /**
   * Clears all cached syntax highlighting data.
   *
   * Then calls overridable method [method _clear_highlighting_cache].
   *
   */
  clear_highlighting_cache(): void

  /**
   * Returns the syntax highlighting data for the line at index [param line]. If the line is not cached, calls [method _get_line_syntax_highlighting] first to calculate the data.
   *
   * Each entry is a column number containing a nested [Dictionary]. The column number denotes the start of a region, the region will end if another region is found, or at the end of the line. The nested [Dictionary] contains the data for that region. Currently only the key `"color"` is supported.
   *
   * **Example:** Possible return value. This means columns `0` to `4` should be red, and columns `5` to the end of the line should be green:
   *
   * @example
   *
   * {
   * 	0: {
   * 		"color": Color(1, 0, 0)
   * 	},
   * 	5: {
   * 		"color": Color(0, 1, 0)
   * 	}
   * }
   * @summary
   *
   *
   */
  get_line_syntax_highlighting(line: int): Dictionary<any, any>

  /** Returns the associated [TextEdit] node. */
  get_text_edit(): TextEdit

  /**
   * Clears then updates the [SyntaxHighlighter] caches. Override [method _update_cache] for a callback.
   *
   * **Note:** This is called automatically when the associated [TextEdit] node, updates its own cache.
   *
   */
  update_cache(): void

  connect<T extends SignalsOf<SyntaxHighlighter>>(
    signal: T,
    method: SignalFunction<SyntaxHighlighter[T]>
  ): number
}
