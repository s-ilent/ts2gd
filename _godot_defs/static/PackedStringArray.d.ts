/**
 * An array specifically designed to hold [String]s. Packs data tightly, so it saves memory for large array sizes.
 *
 * If you want to join the strings in the array, use [method String.join].
 *
 * @example
 *
 * var string_array = PackedStringArray(["hello", "world"])
 * var string = " ".join(string_array)
 * print(string) # "hello world"
 * @summary
 *
 *
 * **Differences between packed arrays, typed arrays, and untyped arrays:** Packed arrays are generally faster to iterate on and modify compared to a typed array of the same type (e.g. [PackedStringArray] versus `Array[String]`). Also, packed arrays consume less memory. As a downside, packed arrays are less flexible as they don't offer as many convenience methods such as [method Array.map]. Typed arrays are in turn faster to iterate on and modify than untyped arrays.
 *
 * **Note:** Packed arrays are always passed by reference. To get a copy of an array that can be modified independently of the original array, use [method duplicate]. This is **not** the case for built-in properties and methods. In these cases the returned packed array is a copy, and changing it will **not** affect the original value. To update a built-in property of this type, modify the returned array and then assign it to the property again.
 *
 */
declare class PackedStringArray {
  /**
   * An array specifically designed to hold [String]s. Packs data tightly, so it saves memory for large array sizes.
   *
   * If you want to join the strings in the array, use [method String.join].
   *
   * @example
   *
   * var string_array = PackedStringArray(["hello", "world"])
   * var string = " ".join(string_array)
   * print(string) # "hello world"
   * @summary
   *
   *
   * **Differences between packed arrays, typed arrays, and untyped arrays:** Packed arrays are generally faster to iterate on and modify compared to a typed array of the same type (e.g. [PackedStringArray] versus `Array[String]`). Also, packed arrays consume less memory. As a downside, packed arrays are less flexible as they don't offer as many convenience methods such as [method Array.map]. Typed arrays are in turn faster to iterate on and modify than untyped arrays.
   *
   * **Note:** Packed arrays are always passed by reference. To get a copy of an array that can be modified independently of the original array, use [method duplicate]. This is **not** the case for built-in properties and methods. In these cases the returned packed array is a copy, and changing it will **not** affect the original value. To update a built-in property of this type, modify the returned array and then assign it to the property again.
   *
   */

  new(): PackedStringArray
  constructor()

  new(from: PackedStringArray): PackedStringArray
  constructor(from: PackedStringArray)

  new(from: any[]): PackedStringArray
  constructor(from: any[])

  static new(): PackedStringArray

  /** Appends an element at the end of the array (alias of [method push_back]). */
  append(value: string): boolean

  /** Appends a [PackedStringArray] at the end of this array. */
  append_array(array: PackedStringArray): void

  /**
   * Finds the index of an existing value (or the insertion index that maintains sorting order, if the value is not yet present in the array) using binary search. Optionally, a [param before] specifier can be passed. If `false`, the returned index comes after all existing entries of the value in the array.
   *
   * **Note:** Calling [method bsearch] on an unsorted array results in unexpected behavior.
   *
   */
  bsearch(value: string, before?: boolean): int

  /** Clears the array. This is equivalent to using [method resize] with a size of [code]0[/code]. */
  clear(): void

  /** Returns the number of times an element is in the array. */
  count(value: string): int

  /** Creates a copy of the array, and returns it. */
  duplicate(): PackedStringArray

  /** Removes the first occurrence of a value from the array and returns [code]true[/code]. If the value does not exist in the array, nothing happens and [code]false[/code] is returned. To remove an element by index, use [method remove_at] instead. */
  erase(value: string): boolean

  /** Assigns the given value to all elements in the array. This can typically be used together with [method resize] to create an array with a given size and initialized elements. */
  fill(value: string): void

  /** Searches the array for a value and returns its index or [code]-1[/code] if not found. Optionally, the initial search index can be passed. */
  find(value: string, from?: int): int

  /**
   * Returns the [String] at the given [param index] in the array. If [param index] is out-of-bounds or negative, this method fails and returns an empty string.
   *
   * This method is similar (but not identical) to the `[]` operator. Most notably, when this method fails, it doesn't pause project execution if run from the editor.
   *
   */
  get(index: int): string

  /** Returns [code]true[/code] if the array contains [param value]. */
  has(value: string): boolean

  /** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
  insert(at_index: int, value: string): int

  /** Returns [code]true[/code] if the array is empty. */
  is_empty(): boolean

  /** Appends a string element at end of the array. */
  push_back(value: string): boolean

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

  /** Searches the array in reverse order. Optionally, a start search index can be passed. If negative, the start index is considered relative to the end of the array. */
  rfind(value: string, from?: int): int

  /** Changes the [String] at the given index. */
  set(index: int, value: string): void

  /** Returns the number of elements in the array. */
  size(): int

  /**
   * Returns the slice of the [PackedStringArray], from [param begin] (inclusive) to [param end] (exclusive), as a new [PackedStringArray].
   *
   * The absolute value of [param begin] and [param end] will be clamped to the array size, so the default value for [param end] makes it slice to the size of the array by default (i.e. `arr.slice(1)` is a shorthand for `arr.slice(1, arr.size())`).
   *
   * If either [param begin] or [param end] are negative, they will be relative to the end of the array (i.e. `arr.slice(0, -2)` is a shorthand for `arr.slice(0, arr.size() - 2)`).
   *
   */
  slice(begin: int, end?: int): PackedStringArray

  /** Sorts the elements of the array in ascending order. */
  sort(): void

  /** Returns a [PackedByteArray] with each string encoded as UTF-8. Strings are [code]null[/code] terminated. */
  to_byte_array(): PackedByteArray

  connect<T extends SignalsOf<PackedStringArray>>(
    signal: T,
    method: SignalFunction<PackedStringArray[T]>
  ): number
}
