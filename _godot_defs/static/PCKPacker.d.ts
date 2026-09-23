/**
 * The [PCKPacker] is used to create packages that can be loaded into a running project using [method ProjectSettings.load_resource_pack].
 *
 * @example
 *
 *
 * var packer = PCKPacker.new()
 * packer.pck_start("test.pck")
 * packer.add_file("res://text.txt", "text.txt")
 * packer.flush()
 *
 *
 * var packer = new PckPacker();
 * packer.PckStart("test.pck");
 * packer.AddFile("res://text.txt", "text.txt");
 * packer.Flush();
 *
 * @summary
 *
 *
 * The above [PCKPacker] creates package `test.pck`, then adds a file named `text.txt` at the root of the package.
 *
 * **Note:** PCK is Godot's own pack file format. To create ZIP archives that can be read by any program, use [ZIPPacker] instead.
 *
 */
declare class PCKPacker extends RefCounted {
  /**
   * The [PCKPacker] is used to create packages that can be loaded into a running project using [method ProjectSettings.load_resource_pack].
   *
   * @example
   *
   *
   * var packer = PCKPacker.new()
   * packer.pck_start("test.pck")
   * packer.add_file("res://text.txt", "text.txt")
   * packer.flush()
   *
   *
   * var packer = new PckPacker();
   * packer.PckStart("test.pck");
   * packer.AddFile("res://text.txt", "text.txt");
   * packer.Flush();
   *
   * @summary
   *
   *
   * The above [PCKPacker] creates package `test.pck`, then adds a file named `text.txt` at the root of the package.
   *
   * **Note:** PCK is Godot's own pack file format. To create ZIP archives that can be read by any program, use [ZIPPacker] instead.
   *
   */
  new(): PCKPacker
  constructor()
  static new(): PCKPacker

  /** Adds the [param source_path] file to the current PCK package at the [param target_path] internal path. The [code]res://[/code] prefix for [param target_path] is optional and stripped internally. File content is immediately written to the PCK. */
  add_file(target_path: string, source_path: string, encrypt?: boolean): int

  /** Registers a file removal of the [param target_path] internal path to the PCK. This is mainly used for patches. If the file at this path has been loaded from a previous PCK, it will be removed. The [code]res://[/code] prefix for [param target_path] is optional and stripped internally. */
  add_file_removal(target_path: string): int

  /**
   * Writes the file directory and closes the PCK. If [param verbose] is `true`, a list of files added will be printed to the console for easier debugging.
   *
   * **Note:** [PCKPacker] will automatically flush when it's freed, which happens when it goes out of scope or when it gets assigned with `null`. In C# the reference must be disposed after use, either with the `using` statement or by calling the `Dispose` method directly.
   *
   */
  flush(verbose?: boolean): int

  /** Creates a new PCK file at the file path [param pck_path]. The [code].pck[/code] file extension isn't added automatically, so it should be part of [param pck_path] (even though it's not required). */
  pck_start(
    pck_path: string,
    alignment?: int,
    key?: string,
    encrypt_directory?: boolean
  ): int

  connect<T extends SignalsOf<PCKPacker>>(
    signal: T,
    method: SignalFunction<PCKPacker[T]>
  ): number
}
