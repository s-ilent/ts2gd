/**
 * The HashingContext class provides an interface for computing cryptographic hashes over multiple iterations. Useful for computing hashes of big files (so you don't have to load them all in memory), network streams, and data streams in general (so you don't have to hold buffers).
 *
 * The [enum HashType] enum shows the supported hashing algorithms.
 *
 * @example
 *
 *
 * const CHUNK_SIZE = 1024
 * func hash_file(path):
 * 	# Check that file exists.
 * 	if not FileAccess.file_exists(path):
 * 		return
 * 	# Start an SHA-256 context.
 * 	var ctx = HashingContext.new()
 * 	ctx.start(HashingContext.HASH_SHA256)
 * 	# Open the file to hash.
 * 	var file = FileAccess.open(path, FileAccess.READ)
 * 	# Update the context after reading each chunk.
 * 	while file.get_position() < file.get_length():
 * 		var remaining = file.get_length() - file.get_position()
 * 		ctx.update(file.get_buffer(min(remaining, CHUNK_SIZE)))
 * 	# Get the computed hash.
 * 	var res = ctx.finish()
 * 	# Print the result as hex string and array.
 * 	printt(res.hex_encode(), Array(res))
 *
 *
 * public const int ChunkSize = 1024;
 * public void HashFile(string path)
 * {
 * 	// Check that file exists.
 * 	if (!FileAccess.FileExists(path))
 * 	{
 * 		return;
 * 	}
 * 	// Start an SHA-256 context.
 * 	var ctx = new HashingContext();
 * 	ctx.Start(HashingContext.HashType.Sha256);
 * 	// Open the file to hash.
 * 	using var file = FileAccess.Open(path, FileAccess.ModeFlags.Read);
 * 	// Update the context after reading each chunk.
 * 	while (file.GetPosition() < file.GetLength())
 * 	{
 * 		int remaining = (int)(file.GetLength() - file.GetPosition());
 * 		ctx.Update(file.GetBuffer(Mathf.Min(remaining, ChunkSize)));
 * 	}
 * 	// Get the computed hash.
 * 	byte[] res = ctx.Finish();
 * 	// Print the result as hex string and array.
 * 	GD.PrintT(res.HexEncode(), (Variant)res);
 * }
 *
 * @summary
 *
 *
 */
declare class HashingContext extends RefCounted {
  /**
   * The HashingContext class provides an interface for computing cryptographic hashes over multiple iterations. Useful for computing hashes of big files (so you don't have to load them all in memory), network streams, and data streams in general (so you don't have to hold buffers).
   *
   * The [enum HashType] enum shows the supported hashing algorithms.
   *
   * @example
   *
   *
   * const CHUNK_SIZE = 1024
   * func hash_file(path):
   * 	# Check that file exists.
   * 	if not FileAccess.file_exists(path):
   * 		return
   * 	# Start an SHA-256 context.
   * 	var ctx = HashingContext.new()
   * 	ctx.start(HashingContext.HASH_SHA256)
   * 	# Open the file to hash.
   * 	var file = FileAccess.open(path, FileAccess.READ)
   * 	# Update the context after reading each chunk.
   * 	while file.get_position() < file.get_length():
   * 		var remaining = file.get_length() - file.get_position()
   * 		ctx.update(file.get_buffer(min(remaining, CHUNK_SIZE)))
   * 	# Get the computed hash.
   * 	var res = ctx.finish()
   * 	# Print the result as hex string and array.
   * 	printt(res.hex_encode(), Array(res))
   *
   *
   * public const int ChunkSize = 1024;
   * public void HashFile(string path)
   * {
   * 	// Check that file exists.
   * 	if (!FileAccess.FileExists(path))
   * 	{
   * 		return;
   * 	}
   * 	// Start an SHA-256 context.
   * 	var ctx = new HashingContext();
   * 	ctx.Start(HashingContext.HashType.Sha256);
   * 	// Open the file to hash.
   * 	using var file = FileAccess.Open(path, FileAccess.ModeFlags.Read);
   * 	// Update the context after reading each chunk.
   * 	while (file.GetPosition() < file.GetLength())
   * 	{
   * 		int remaining = (int)(file.GetLength() - file.GetPosition());
   * 		ctx.Update(file.GetBuffer(Mathf.Min(remaining, ChunkSize)));
   * 	}
   * 	// Get the computed hash.
   * 	byte[] res = ctx.Finish();
   * 	// Print the result as hex string and array.
   * 	GD.PrintT(res.HexEncode(), (Variant)res);
   * }
   *
   * @summary
   *
   *
   */
  new(): HashingContext
  constructor()
  static new(): HashingContext

  /** Closes the current context, and return the computed hash. */
  finish(): PackedByteArray

  /** Starts a new hash computation of the given [param type] (e.g. [constant HASH_SHA256] to start computation of an SHA-256). */
  start(type: int): int

  /** Updates the computation with the given [param chunk] of data. */
  update(chunk: PackedByteArray): int

  connect<T extends SignalsOf<HashingContext>>(
    signal: T,
    method: SignalFunction<HashingContext[T]>
  ): number

  /**
   * Hashing algorithm: MD5.
   *
   */
  static HASH_MD5: any

  /**
   * Hashing algorithm: SHA-1.
   *
   */
  static HASH_SHA1: any

  /**
   * Hashing algorithm: SHA-256.
   *
   */
  static HASH_SHA256: any
}
