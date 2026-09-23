/**
 * A button that represents a link. This type of button is primarily used for interactions that cause a context change (like linking to a web page).
 *
 * See also [BaseButton] which contains common properties and methods associated with this node.
 *
 */
declare class LinkButton extends BaseButton {
  /**
   * A button that represents a link. This type of button is primarily used for interactions that cause a context change (like linking to a web page).
   *
   * See also [BaseButton] which contains common properties and methods associated with this node.
   *
   */
  new(): LinkButton
  constructor()
  static new(): LinkButton

  /** Ellipsis character used for text clipping. */
  ellipsis_char: string

  /** Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead. */
  language: string

  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int

  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: any[]

  /** The button's text that will be displayed inside the button's area. */
  text: string

  /** Base text writing direction. */
  text_direction: int

  /** Sets the clipping behavior when the text exceeds the node's bounding rectangle. */
  text_overrun_behavior: int

  /** The underline mode to use for the text. */
  underline: int

  /**
   * The [url=https://en.wikipedia.org/wiki/Uniform_Resource_Identifier]URI[/url] for this [LinkButton]. If set to a valid URI, pressing the button opens the URI using the operating system's default program for the protocol (via [method OS.shell_open]). HTTP and HTTPS URLs open the default web browser.
   *
   * @example
   *
   *
   * uri = "https://godotengine.org"  # Opens the URL in the default web browser.
   * uri = "C:\SomeFolder"  # Opens the file explorer at the given path.
   * uri = "C:\SomeImage.png"  # Opens the given image in the default viewing app.
   *
   *
   * Uri = "https://godotengine.org"; // Opens the URL in the default web browser.
   * Uri = "C:\SomeFolder"; // Opens the file explorer at the given path.
   * Uri = "C:\SomeImage.png"; // Opens the given image in the default viewing app.
   *
   * @summary
   *
   *
   */
  uri: string

  connect<T extends SignalsOf<LinkButton>>(
    signal: T,
    method: SignalFunction<LinkButton[T]>
  ): number

  /**
   * The LinkButton will always show an underline at the bottom of its text.
   *
   */
  static UNDERLINE_MODE_ALWAYS: any

  /**
   * The LinkButton will show an underline at the bottom of its text when the mouse cursor is over it.
   *
   */
  static UNDERLINE_MODE_ON_HOVER: any

  /**
   * The LinkButton will never show an underline at the bottom of its text.
   *
   */
  static UNDERLINE_MODE_NEVER: any
}
