/**
 * Returns the boolean result of the comparison between `INF` or `NaN` and a scalar parameter.
 *
 */
declare class VisualShaderNodeIs extends VisualShaderNode {
  /**
   * Returns the boolean result of the comparison between `INF` or `NaN` and a scalar parameter.
   *
   */
  new(): VisualShaderNodeIs
  constructor()
  static new(): VisualShaderNodeIs

  /** The comparison function. */
  function: int

  connect<T extends SignalsOf<VisualShaderNodeIs>>(
    signal: T,
    method: SignalFunction<VisualShaderNodeIs[T]>
  ): number

  /**
   * Comparison with `INF` (Infinity).
   *
   */
  static FUNC_IS_INF: any

  /**
   * Comparison with `NaN` (Not a Number; indicates invalid numeric results, such as division by zero).
   *
   */
  static FUNC_IS_NAN: any

  /**
   * Represents the size of the [enum Function] enum.
   *
   */
  static FUNC_MAX: any
}
