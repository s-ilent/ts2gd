/**
 * An array specifically designed to hold 64-bit floating-point values (double). Packs data tightly, so it saves memory for large array sizes.
 *
 * If you only need to pack 32-bit floats tightly, see [PackedFloat32Array] for a more memory-friendly alternative.
 *
 * **Differences between packed arrays, typed arrays, and untyped arrays:** Packed arrays are generally faster to iterate on and modify compared to a typed array of the same type (e.g. [PackedFloat64Array] versus `Array[float]`). Also, packed arrays consume less memory. As a downside, packed arrays are less flexible as they don't offer as many convenience methods such as [method Array.map]. Typed arrays are in turn faster to iterate on and modify than untyped arrays.
 *
 * **Note:** Packed arrays are always passed by reference. To get a copy of an array that can be modified independently of the original array, use [method duplicate]. This is **not** the case for built-in properties and methods. In these cases the returned packed array is a copy, and changing it will **not** affect the original value. To update a built-in property of this type, modify the returned array and then assign it to the property again.
 *
 */
declare class PackedFloat64Array {
  /**
   * An array specifically designed to hold 64-bit floating-point values (double). Packs data tightly, so it saves memory for large array sizes.
   *
   * If you only need to pack 32-bit floats tightly, see [PackedFloat32Array] for a more memory-friendly alternative.
   *
   * **Differences between packed arrays, typed arrays, and untyped arrays:** Packed arrays are generally faster to iterate on and modify compared to a typed array of the same type (e.g. [PackedFloat64Array] versus `Array[float]`). Also, packed arrays consume less memory. As a downside, packed arrays are less flexible as they don't offer as many convenience methods such as [method Array.map]. Typed arrays are in turn faster to iterate on and modify than untyped arrays.
   *
   * **Note:** Packed arrays are always passed by reference. To get a copy of an array that can be modified independently of the original array, use [method duplicate]. This is **not** the case for built-in properties and methods. In these cases the returned packed array is a copy, and changing it will **not** affect the original value. To update a built-in property of this type, modify the returned array and then assign it to the property again.
   *
   */

  new(): PackedFloat64Array
  constructor()

  new(from: PackedFloat64Array): PackedFloat64Array
  constructor(from: PackedFloat64Array)

  new(from: any[]): PackedFloat64Array
  constructor(from: any[])

  static new(): PackedFloat64Array

  /** Appends an element at the end of the array (alias of [method push_back]). */
  append(value: float): boolean

  /** Appends a [PackedFloat64Array] at the end of this array. */
  append_array(array: PackedFloat64Array): void

  /**
   * Finds the index of an existing value (or the insertion index that maintains sorting order, if the value is not yet present in the array) using binary search. Optionally, a [param before] specifier can be passed. If `false`, the returned index comes after all existing entries of the value in the array.
   *
   * **Note:** Calling [method bsearch] on an unsorted array results in unexpected behavior.
   *
   * **Note:** [constant @GDScript.NAN] doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   *
   */
  bsearch(value: float, before?: boolean): int

  /** Clears the array. This is equivalent to using [method resize] with a size of [code]0[/code]. */
  clear(): void

  /**
   * Returns the number of times an element is in the array.
   *
   * **Note:** [constant @GDScript.NAN] doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   *
   */
  count(value: float): int

  /** Creates a copy of the array, and returns it. */
  duplicate(): PackedFloat64Array

  /**
   * Removes the first occurrence of a value from the array and returns `true`. If the value does not exist in the array, nothing happens and `false` is returned. To remove an element by index, use [method remove_at] instead.
   *
   * **Note:** [constant @GDScript.NAN] doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   *
   */
  erase(value: float): boolean

  /** Assigns the given value to all elements in the array. This can typically be used together with [method resize] to create an array with a given size and initialized elements. */
  fill(value: float): void

  /**
   * Searches the array for a value and returns its index or `-1` if not found. Optionally, the initial search index can be passed.
   *
   * **Note:** [constant @GDScript.NAN] doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   *
   */
  find(value: float, from?: int): int

  /**
   * Returns the 64-bit float at the given [param index] in the array. If [param index] is out-of-bounds or negative, this method fails and returns `0.0`.
   *
   * This method is similar (but not identical) to the `[]` operator. Most notably, when this method fails, it doesn't pause project execution if run from the editor.
   *
   */
  get(index: int): float

  /**
   * Returns `true` if the array contains [param value].
   *
   * **Note:** [constant @GDScript.NAN] doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   *
   */
  has(value: float): boolean

  /** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
  insert(at_index: int, value: float): int

  /** Returns [code]true[/code] if the array is empty. */
  is_empty(): boolean

  /** Appends an element at the end of the array. */
  push_back(value: float): boolean

  /** Removes an element from the array by index. */
  remove_at(index: int): void

  /**
   * Sets the size of the array. If the array is grown, reserves elements at the end of the array. If the array is shrunk, truncates the array to the new size. Calling [method resize] once and assigning the new values is faster than adding new elements one by one.
   *
   * Returns [constant OK] on success, or one of the following [enum Error] constants if this method fails: [constant ERR_INVALID_PARAMETER] if the size is negative, or [constant ERR_OUT_OF_MEMORY] if allocations fail. Use [method size] to find the actual size of the array after resize.
   *
   */
  resize(new_size: int): int

  /** Reverses the order of the elements in the array. */
  reverse(): void

  /**
   * Searches the array in reverse order. Optionally, a start search index can be passed. If negative, the start index is considered relative to the end of the array.
   *
   * **Note:** [constant @GDScript.NAN] doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   *
   */
  rfind(value: float, from?: int): int

  /** Changes the float at the given index. */
  set(index: int, value: float): void

  /** Returns the number of elements in the array. */
  size(): int

  /**
   * Returns the slice of the [PackedFloat64Array], from [param begin] (inclusive) to [param end] (exclusive), as a new [PackedFloat64Array].
   *
   * The absolute value of [param begin] and [param end] will be clamped to the array size, so the default value for [param end] makes it slice to the size of the array by default (i.e. `arr.slice(1)` is a shorthand for `arr.slice(1, arr.size())`).
   *
   * If either [param begin] or [param end] are negative, they will be relative to the end of the array (i.e. `arr.slice(0, -2)` is a shorthand for `arr.slice(0, arr.size() - 2)`).
   *
   */
  slice(begin: int, end?: int): PackedFloat64Array

  /**
   * Sorts the elements of the array in ascending order.
   *
   * **Note:** [constant @GDScript.NAN] doesn't behave the same as other numbers. Therefore, the results from this method may not be accurate if NaNs are included.
   *
   */
  sort(): void

  /**
   * Returns a copy of the data converted to a [PackedByteArray], where each element has been encoded as 8 bytes.
   *
   * The size of the new array will be `float64_array.size() * 8`.
   *
   */
  to_byte_array(): PackedByteArray

  connect<T extends SignalsOf<PackedFloat64Array>>(
    signal: T,
    method: SignalFunction<PackedFloat64Array[T]>
  ): number
}
