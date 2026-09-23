/**
 * Accept a [Color] to the input port and transform it according to [member function].
 *
 */
declare class VisualShaderNodeColorFunc extends VisualShaderNode {
  /**
   * Accept a [Color] to the input port and transform it according to [member function].
   *
   */
  new(): VisualShaderNodeColorFunc
  constructor()
  static new(): VisualShaderNodeColorFunc

  /** A function to be applied to the input color. */
  function: int

  connect<T extends SignalsOf<VisualShaderNodeColorFunc>>(
    signal: T,
    method: SignalFunction<VisualShaderNodeColorFunc[T]>
  ): number

  /**
   * Converts the color to grayscale using the following formula:
   *
   * @example
   *
   * vec3 c = input;
   * float max1 = max(c.r, c.g);
   * float max2 = max(max1, c.b);
   * float max3 = max(max1, max2);
   * return vec3(max3, max3, max3);
   * @summary
   *
   *
   */
  static FUNC_GRAYSCALE: any

  /**
   * Converts HSV vector to RGB equivalent.
   *
   */
  static FUNC_HSV2RGB: any

  /**
   * Converts RGB vector to HSV equivalent.
   *
   */
  static FUNC_RGB2HSV: any

  /**
   * Applies sepia tone effect using the following formula:
   *
   * @example
   *
   * vec3 c = input;
   * float r = (c.r * 0.393) + (c.g * 0.769) + (c.b * 0.189);
   * float g = (c.r * 0.349) + (c.g * 0.686) + (c.b * 0.168);
   * float b = (c.r * 0.272) + (c.g * 0.534) + (c.b * 0.131);
   * return vec3(r, g, b);
   * @summary
   *
   *
   */
  static FUNC_SEPIA: any

  /**
   * Converts color from linear encoding to nonlinear sRGB encoding using the following formula:
   *
   * @example
   *
   * vec3 c = clamp(c, vec3(0.0), vec3(1.0));
   * const vec3 a = vec3(0.055f);
   * return mix((vec3(1.0f) + a) * pow(c.rgb, vec3(1.0f / 2.4f)) - a, 12.92f * c.rgb, lessThan(c.rgb, vec3(0.0031308f)));
   * @summary
   *
   *
   * The Compatibility renderer uses a simpler formula:
   *
   * @example
   *
   * vec3 c = input;
   * return max(vec3(1.055) * pow(c, vec3(0.416666667)) - vec3(0.055), vec3(0.0));
   * @summary
   *
   *
   */
  static FUNC_LINEAR_TO_SRGB: any

  /**
   * Converts color from nonlinear sRGB encoding to linear encoding using the following formula:
   *
   * @example
   *
   * vec3 c = input;
   * return mix(pow((c.rgb + vec3(0.055)) * (1.0 / (1.0 + 0.055)), vec3(2.4)), c.rgb * (1.0 / 12.92), lessThan(c.rgb, vec3(0.04045)));
   * @summary
   *
   *
   * The Compatibility renderer uses a simpler formula:
   *
   * @example
   *
   * vec3 c = input;
   * return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);
   * @summary
   *
   *
   */
  static FUNC_SRGB_TO_LINEAR: any

  /**
   * Represents the size of the [enum Function] enum.
   *
   */
  static FUNC_MAX: any
}
