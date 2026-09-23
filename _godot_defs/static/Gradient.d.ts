/**
 * This resource describes a color transition by defining a set of colored points and how to interpolate between them.
 *
 * See also [Curve] which supports more complex easing methods, but does not support colors.
 *
 */
declare class Gradient extends Resource {
  /**
   * This resource describes a color transition by defining a set of colored points and how to interpolate between them.
   *
   * See also [Curve] which supports more complex easing methods, but does not support colors.
   *
   */
  new(): Gradient
  constructor()
  static new(): Gradient

  /**
   * Gradient's colors as a [PackedColorArray].
   *
   * **Note:** Setting this property updates all colors at once. To update any color individually use [method set_color].
   *
   */
  colors: PackedColorArray

  /**
   * The color space used to interpolate between points of the gradient. It does not affect the returned colors, which will always use nonlinear sRGB encoding.
   *
   * **Note:** This setting has no effect when [member interpolation_mode] is set to [constant GRADIENT_INTERPOLATE_CONSTANT].
   *
   */
  interpolation_color_space: int

  /** The algorithm used to interpolate between points of the gradient. */
  interpolation_mode: int

  /**
   * Gradient's offsets as a [PackedFloat32Array].
   *
   * **Note:** Setting this property updates all offsets at once. To update any offset individually use [method set_offset].
   *
   */
  offsets: PackedFloat32Array

  /** Adds the specified color to the gradient, with the specified offset. */
  add_point(offset: float, color: Color): void

  /** Returns the color of the gradient color at index [param point]. */
  get_color(point: int): Color

  /** Returns the offset of the gradient color at index [param point]. */
  get_offset(point: int): float

  /** Returns the number of colors in the gradient. */
  get_point_count(): int

  /** Removes the color at index [param point]. */
  remove_point(point: int): void

  /**
   * Reverses/mirrors the gradient.
   *
   * **Note:** This method mirrors all points around the middle of the gradient, which may produce unexpected results when [member interpolation_mode] is set to [constant GRADIENT_INTERPOLATE_CONSTANT].
   *
   */
  reverse(): void

  /** Returns the interpolated color specified by [param offset]. [param offset] should be between [code]0.0[/code] and [code]1.0[/code] (inclusive). Using a value lower than [code]0.0[/code] will return the same color as [code]0.0[/code], and using a value higher than [code]1.0[/code] will return the same color as [code]1.0[/code]. If your input value is not within this range, consider using [method @GlobalScope.remap] on the input value with output values set to [code]0.0[/code] and [code]1.0[/code]. */
  sample(offset: float): Color

  /** Sets the color of the gradient color at index [param point]. */
  set_color(point: int, color: Color): void

  /** Sets the offset for the gradient color at index [param point]. */
  set_offset(point: int, offset: float): void

  connect<T extends SignalsOf<Gradient>>(
    signal: T,
    method: SignalFunction<Gradient[T]>
  ): number

  /**
   * Linear interpolation.
   *
   */
  static GRADIENT_INTERPOLATE_LINEAR: any

  /**
   * Constant interpolation, color changes abruptly at each point and stays uniform between. This might cause visible aliasing when used for a gradient texture in some cases.
   *
   */
  static GRADIENT_INTERPOLATE_CONSTANT: any

  /**
   * Cubic interpolation.
   *
   */
  static GRADIENT_INTERPOLATE_CUBIC: any

  /**
   * sRGB color space.
   *
   */
  static GRADIENT_COLOR_SPACE_SRGB: any

  /**
   * Linear sRGB color space.
   *
   */
  static GRADIENT_COLOR_SPACE_LINEAR_SRGB: any

  /**
   * [url=https://bottosson.github.io/posts/oklab/]Oklab[/url] color space. This color space provides a smooth and uniform-looking transition between colors.
   *
   */
  static GRADIENT_COLOR_SPACE_OKLAB: any
}
