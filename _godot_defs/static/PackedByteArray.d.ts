/**
 * An array specifically designed to hold bytes. Packs data tightly, so it saves memory for large array sizes.
 *
 * [PackedByteArray] also provides methods to encode/decode various types to/from bytes. The way values are encoded is an implementation detail and shouldn't be relied upon when interacting with external apps.
 *
 * **Note:** Packed arrays are always passed by reference. To get a copy of an array that can be modified independently of the original array, use [method duplicate]. This is **not** the case for built-in properties and methods. In these cases the returned packed array is a copy, and changing it will **not** affect the original value. To update a built-in property of this type, modify the returned array and then assign it to the property again.
 *
 */
declare class PackedByteArray {
  /**
   * An array specifically designed to hold bytes. Packs data tightly, so it saves memory for large array sizes.
   *
   * [PackedByteArray] also provides methods to encode/decode various types to/from bytes. The way values are encoded is an implementation detail and shouldn't be relied upon when interacting with external apps.
   *
   * **Note:** Packed arrays are always passed by reference. To get a copy of an array that can be modified independently of the original array, use [method duplicate]. This is **not** the case for built-in properties and methods. In these cases the returned packed array is a copy, and changing it will **not** affect the original value. To update a built-in property of this type, modify the returned array and then assign it to the property again.
   *
   */

  new(): PackedByteArray
  constructor()

  new(from: PackedByteArray): PackedByteArray
  constructor(from: PackedByteArray)

  new(from: any[]): PackedByteArray
  constructor(from: any[])

  static new(): PackedByteArray

  /** Appends an element at the end of the array (alias of [method push_back]). */
  append(value: int): boolean

  /** Appends a [PackedByteArray] at the end of this array. */
  append_array(array: PackedByteArray): void

  /**
   * Finds the index of an existing value (or the insertion index that maintains sorting order, if the value is not yet present in the array) using binary search. Optionally, a [param before] specifier can be passed. If `false`, the returned index comes after all existing entries of the value in the array.
   *
   * **Note:** Calling [method bsearch] on an unsorted array results in unexpected behavior.
   *
   */
  bsearch(value: int, before?: boolean): int

  /** Swaps the byte order of [param count] 16-bit segments of the array starting at [param offset]. Swap is done in-place. If [param count] is less than zero, all segments to the end of array are processed, if processed data size is not a multiple of 2, the byte after the last processed 16-bit segment is not modified. */
  bswap16(offset?: int, count?: int): void

  /** Swaps the byte order of [param count] 32-bit segments of the array starting at [param offset]. Swap is done in-place. If [param count] is less than zero, all segments to the end of array are processed, if processed data size is not a multiple of 4, bytes after the last processed 32-bit segment are not modified. */
  bswap32(offset?: int, count?: int): void

  /** Swaps the byte order of [param count] 64-bit segments of the array starting at [param offset]. Swap is done in-place. If [param count] is less than zero, all segments to the end of array are processed, if processed data size is not a multiple of 8, bytes after the last processed 64-bit segment are not modified. */
  bswap64(offset?: int, count?: int): void

  /** Clears the array. This is equivalent to using [method resize] with a size of [code]0[/code]. */
  clear(): void

  /** Returns a new [PackedByteArray] with the data compressed. Set the compression mode using one of [enum FileAccess.CompressionMode]'s constants. */
  compress(compression_mode?: int): PackedByteArray

  /** Returns the number of times an element is in the array. */
  count(value: int): int

  /** Decodes a 64-bit floating-point number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0.0[/code] if a valid number can't be decoded. */
  decode_double(byte_offset: int): float

  /** Decodes a 32-bit floating-point number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0.0[/code] if a valid number can't be decoded. */
  decode_float(byte_offset: int): float

  /** Decodes a 16-bit floating-point number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0.0[/code] if a valid number can't be decoded. */
  decode_half(byte_offset: int): float

  /** Decodes a 8-bit signed integer number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0[/code] if a valid number can't be decoded. */
  decode_s8(byte_offset: int): int

  /** Decodes a 16-bit signed integer number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0[/code] if a valid number can't be decoded. */
  decode_s16(byte_offset: int): int

  /** Decodes a 32-bit signed integer number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0[/code] if a valid number can't be decoded. */
  decode_s32(byte_offset: int): int

  /** Decodes a 64-bit signed integer number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0[/code] if a valid number can't be decoded. */
  decode_s64(byte_offset: int): int

  /** Decodes a 8-bit unsigned integer number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0[/code] if a valid number can't be decoded. */
  decode_u8(byte_offset: int): int

  /** Decodes a 16-bit unsigned integer number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0[/code] if a valid number can't be decoded. */
  decode_u16(byte_offset: int): int

  /** Decodes a 32-bit unsigned integer number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0[/code] if a valid number can't be decoded. */
  decode_u32(byte_offset: int): int

  /** Decodes a 64-bit unsigned integer number from the bytes starting at [param byte_offset]. Fails if the byte count is insufficient. Returns [code]0[/code] if a valid number can't be decoded. */
  decode_u64(byte_offset: int): int

  /** Decodes a [Variant] from the bytes starting at [param byte_offset]. Returns [code]null[/code] if a valid variant can't be decoded or the value is [Object]-derived and [param allow_objects] is [code]false[/code]. */
  decode_var(byte_offset: int, allow_objects?: boolean): any

  /** Decodes a size of a [Variant] from the bytes starting at [param byte_offset]. Requires at least 4 bytes of data starting at the offset, otherwise fails. */
  decode_var_size(byte_offset: int, allow_objects?: boolean): int

  /**
   * Returns a new [PackedByteArray] with the data decompressed. Set [param buffer_size] to the size of the uncompressed data. Set the compression mode using one of [enum FileAccess.CompressionMode]'s constants.
   *
   * **Note:** Decompression is not guaranteed to work with data not compressed by Godot, for example if data compressed with the deflate compression mode lacks a checksum or header.
   *
   */
  decompress(buffer_size: int, compression_mode?: int): PackedByteArray

  /**
   * Returns a new [PackedByteArray] with the data decompressed. Set the compression mode using one of [enum FileAccess.CompressionMode]'s constants. **This method only accepts brotli, gzip, and deflate compression modes.**
   *
   * This method is potentially slower than [method decompress], as it may have to re-allocate its output buffer multiple times while decompressing, whereas [method decompress] knows it's output buffer size from the beginning.
   *
   * GZIP has a maximal compression ratio of 1032:1, meaning it's very possible for a small compressed payload to decompress to a potentially very large output. To guard against this, you may provide a maximum size this function is allowed to allocate in bytes via [param max_output_size]. Passing -1 will allow for unbounded output. If any positive value is passed, and the decompression exceeds that amount in bytes, then an error will be returned.
   *
   * **Note:** Decompression is not guaranteed to work with data not compressed by Godot, for example if data compressed with the deflate compression mode lacks a checksum or header.
   *
   */
  decompress_dynamic(
    max_output_size: int,
    compression_mode?: int
  ): PackedByteArray

  /** Creates a copy of the array, and returns it. */
  duplicate(): PackedByteArray

  /** Encodes a 64-bit floating-point number as bytes at the index of [param byte_offset] bytes. The array must have at least 8 bytes of allocated space, starting at the offset. */
  encode_double(byte_offset: int, value: float): void

  /** Encodes a 32-bit floating-point number as bytes at the index of [param byte_offset] bytes. The array must have at least 4 bytes of space, starting at the offset. */
  encode_float(byte_offset: int, value: float): void

  /** Encodes a 16-bit floating-point number as bytes at the index of [param byte_offset] bytes. The array must have at least 2 bytes of space, starting at the offset. */
  encode_half(byte_offset: int, value: float): void

  /** Encodes a 8-bit signed integer number (signed byte) at the index of [param byte_offset] bytes. The array must have at least 1 byte of space, starting at the offset. */
  encode_s8(byte_offset: int, value: int): void

  /** Encodes a 16-bit signed integer number as bytes at the index of [param byte_offset] bytes. The array must have at least 2 bytes of space, starting at the offset. */
  encode_s16(byte_offset: int, value: int): void

  /** Encodes a 32-bit signed integer number as bytes at the index of [param byte_offset] bytes. The array must have at least 4 bytes of space, starting at the offset. */
  encode_s32(byte_offset: int, value: int): void

  /** Encodes a 64-bit signed integer number as bytes at the index of [param byte_offset] bytes. The array must have at least 8 bytes of space, starting at the offset. */
  encode_s64(byte_offset: int, value: int): void

  /** Encodes a 8-bit unsigned integer number (byte) at the index of [param byte_offset] bytes. The array must have at least 1 byte of space, starting at the offset. */
  encode_u8(byte_offset: int, value: int): void

  /** Encodes a 16-bit unsigned integer number as bytes at the index of [param byte_offset] bytes. The array must have at least 2 bytes of space, starting at the offset. */
  encode_u16(byte_offset: int, value: int): void

  /** Encodes a 32-bit unsigned integer number as bytes at the index of [param byte_offset] bytes. The array must have at least 4 bytes of space, starting at the offset. */
  encode_u32(byte_offset: int, value: int): void

  /** Encodes a 64-bit unsigned integer number as bytes at the index of [param byte_offset] bytes. The array must have at least 8 bytes of space, starting at the offset. */
  encode_u64(byte_offset: int, value: int): void

  /** Encodes a [Variant] at the index of [param byte_offset] bytes. A sufficient space must be allocated, depending on the encoded variant's size. If [param allow_objects] is [code]false[/code], [Object]-derived values are not permitted and will instead be serialized as ID-only. */
  encode_var(byte_offset: int, value: any, allow_objects?: boolean): int

  /** Removes the first occurrence of a value from the array and returns [code]true[/code]. If the value does not exist in the array, nothing happens and [code]false[/code] is returned. To remove an element by index, use [method remove_at] instead. */
  erase(value: int): boolean

  /** Assigns the given value to all elements in the array. This can typically be used together with [method resize] to create an array with a given size and initialized elements. */
  fill(value: int): void

  /** Searches the array for a value and returns its index or [code]-1[/code] if not found. Optionally, the initial search index can be passed. */
  find(value: int, from?: int): int

  /**
   * Returns the byte at the given [param index] in the array. If [param index] is out-of-bounds or negative, this method fails and returns `0`.
   *
   * This method is similar (but not identical) to the `[]` operator. Most notably, when this method fails, it doesn't pause project execution if run from the editor.
   *
   */
  get(index: int): int

  /** Converts ASCII/Latin-1 encoded array to [String]. Fast alternative to [method get_string_from_utf8] if the content is ASCII/Latin-1 only. Unlike the UTF-8 function this function maps every byte to a character in the array. Multibyte sequences will not be interpreted correctly. For parsing user input always use [method get_string_from_utf8]. This is the inverse of [method String.to_ascii_buffer]. */
  get_string_from_ascii(): string

  /**
   * Converts system multibyte code page encoded array to [String]. If conversion fails, empty string is returned. This is the inverse of [method String.to_multibyte_char_buffer].
   *
   * The values permitted for [param encoding] are system dependent. If [param encoding] is empty string, system default encoding is used.
   *
   * - For Windows, see [url=https://learn.microsoft.com/en-us/windows/win32/Intl/code-page-identifiers]Code Page Identifiers[/url] .NET names.
   *
   * - For macOS and Linux/BSD, see `libiconv` library documentation and `iconv --list` for a list of supported encodings.
   *
   */
  get_string_from_multibyte_char(encoding?: string): string

  /** Converts UTF-8 encoded array to [String]. Slower than [method get_string_from_ascii] but supports UTF-8 encoded data. Use this function if you are unsure about the source of the data. For user input this function should always be preferred. Returns empty string if source array is not valid UTF-8 string. This is the inverse of [method String.to_utf8_buffer]. */
  get_string_from_utf8(): string

  /** Converts UTF-16 encoded array to [String]. If the BOM is missing, little-endianness is assumed. Returns empty string if source array is not valid UTF-16 string. This is the inverse of [method String.to_utf16_buffer]. */
  get_string_from_utf16(): string

  /** Converts UTF-32 encoded array to [String]. Returns empty string if source array is not valid UTF-32 string. This is the inverse of [method String.to_utf32_buffer]. */
  get_string_from_utf32(): string

  /** Converts wide character ([code]wchar_t[/code], UTF-16 on Windows, UTF-32 on other platforms) encoded array to [String]. Returns empty string if source array is not valid wide string. This is the inverse of [method String.to_wchar_buffer]. */
  get_string_from_wchar(): string

  /** Returns [code]true[/code] if the array contains [param value]. */
  has(value: int): boolean

  /** Returns [code]true[/code] if a valid [Variant] value can be decoded at the [param byte_offset]. Returns [code]false[/code] otherwise or when the value is [Object]-derived and [param allow_objects] is [code]false[/code]. */
  has_encoded_var(byte_offset: int, allow_objects?: boolean): boolean

  /**
   * Returns a hexadecimal representation of this array as a [String].
   *
   * @example
   *
   *
   * var array = PackedByteArray([11, 46, 255])
   * print(array.hex_encode()) # Prints "0b2eff"
   *
   *
   * byte[] array = [11, 46, 255];
   * GD.Print(array.HexEncode()); // Prints "0b2eff"
   *
   * @summary
   *
   *
   */
  hex_encode(): string

  /** Inserts a new element at a given position in the array. The position must be valid, or at the end of the array ([code]idx == size()[/code]). */
  insert(at_index: int, value: int): int

  /** Returns [code]true[/code] if the array is empty. */
  is_empty(): boolean

  /** Appends an element at the end of the array. */
  push_back(value: int): boolean

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
  rfind(value: int, from?: int): int

  /** Changes the byte at the given index. */
  set(index: int, value: int): void

  /** Returns the number of elements in the array. */
  size(): int

  /**
   * Returns the slice of the [PackedByteArray], from [param begin] (inclusive) to [param end] (exclusive), as a new [PackedByteArray].
   *
   * The absolute value of [param begin] and [param end] will be clamped to the array size, so the default value for [param end] makes it slice to the size of the array by default (i.e. `arr.slice(1)` is a shorthand for `arr.slice(1, arr.size())`).
   *
   * If either [param begin] or [param end] are negative, they will be relative to the end of the array (i.e. `arr.slice(0, -2)` is a shorthand for `arr.slice(0, arr.size() - 2)`).
   *
   */
  slice(begin: int, end?: int): PackedByteArray

  /** Sorts the elements of the array in ascending order. */
  sort(): void

  /**
   * Returns a copy of the data converted to a [PackedColorArray], where each block of 16 bytes has been converted to a [Color] variant.
   *
   * **Note:** The size of the input array must be a multiple of 16 (size of four 32-bit float variables). The size of the new array will be `byte_array.size() / 16`. If the original data can't be converted to [Color] variants, the resulting data is undefined.
   *
   */
  to_color_array(): PackedColorArray

  /**
   * Returns a copy of the data converted to a [PackedFloat32Array], where each block of 4 bytes has been converted to a 32-bit float (C++ [code skip-lint]float`).
   *
   * The size of the input array must be a multiple of 4 (size of 32-bit float). The size of the new array will be `byte_array.size() / 4`.
   *
   * If the original data can't be converted to 32-bit floats, the resulting data is undefined.
   *
   */
  to_float32_array(): PackedFloat32Array

  /**
   * Returns a copy of the data converted to a [PackedFloat64Array], where each block of 8 bytes has been converted to a 64-bit float (C++ `double`, Godot [float]).
   *
   * The size of the input array must be a multiple of 8 (size of 64-bit double). The size of the new array will be `byte_array.size() / 8`.
   *
   * If the original data can't be converted to 64-bit floats, the resulting data is undefined.
   *
   */
  to_float64_array(): PackedFloat64Array

  /**
   * Returns a copy of the data converted to a [PackedInt32Array], where each block of 4 bytes has been converted to a signed 32-bit integer (C++ `int32_t`).
   *
   * The size of the input array must be a multiple of 4 (size of 32-bit integer). The size of the new array will be `byte_array.size() / 4`.
   *
   * If the original data can't be converted to signed 32-bit integers, the resulting data is undefined.
   *
   */
  to_int32_array(): PackedInt32Array

  /**
   * Returns a copy of the data converted to a [PackedInt64Array], where each block of 8 bytes has been converted to a signed 64-bit integer (C++ `int64_t`, Godot [int]).
   *
   * The size of the input array must be a multiple of 8 (size of 64-bit integer). The size of the new array will be `byte_array.size() / 8`.
   *
   * If the original data can't be converted to signed 64-bit integers, the resulting data is undefined.
   *
   */
  to_int64_array(): PackedInt64Array

  /**
   * Returns a copy of the data converted to a [PackedVector2Array], where each block of 8 bytes or 16 bytes (32-bit or 64-bit) has been converted to a [Vector2] variant.
   *
   * **Note:** The size of the input array must be a multiple of 8 or 16 (depending on the build settings, see [Vector2] for more details). The size of the new array will be `byte_array.size() / (8 or 16)`. If the original data can't be converted to [Vector2] variants, the resulting data is undefined.
   *
   */
  to_vector2_array(): PackedVector2Array

  /**
   * Returns a copy of the data converted to a [PackedVector3Array], where each block of 12 or 24 bytes (32-bit or 64-bit) has been converted to a [Vector3] variant.
   *
   * **Note:** The size of the input array must be a multiple of 12 or 24 (depending on the build settings, see [Vector3] for more details). The size of the new array will be `byte_array.size() / (12 or 24)`. If the original data can't be converted to [Vector3] variants, the resulting data is undefined.
   *
   */
  to_vector3_array(): PackedVector3Array

  /**
   * Returns a copy of the data converted to a [PackedVector4Array], where each block of 16 or 32 bytes (32-bit or 64-bit) has been converted to a [Vector4] variant.
   *
   * **Note:** The size of the input array must be a multiple of 16 or 32 (depending on the build settings, see [Vector4] for more details). The size of the new array will be `byte_array.size() / (16 or 32)`. If the original data can't be converted to [Vector4] variants, the resulting data is undefined.
   *
   */
  to_vector4_array(): PackedVector4Array

  connect<T extends SignalsOf<PackedByteArray>>(
    signal: T,
    method: SignalFunction<PackedByteArray[T]>
  ): number
}
