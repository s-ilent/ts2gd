/**
 * This class is used to manage directories and their content, even outside of the project folder.
 *
 * [DirAccess] can't be instantiated directly. Instead it is created with a static method that takes a path for which it will be opened.
 *
 * Most of the methods have a static alternative that can be used without creating a [DirAccess]. Static methods only support absolute paths (including `res://` and `user://`).
 *
 * @example
 *
 * # Standard
 * var dir = DirAccess.open("user://levels")
 * dir.make_dir("world1")
 * # Static
 * DirAccess.make_dir_absolute("user://levels/world1")
 * @summary
 *
 *
 * **Note:** Accessing project ("res://") directories once exported may behave unexpectedly as some files are converted to engine-specific formats and their original source files may not be present in the expected PCK package. Because of this, to access resources in an exported project, it is recommended to use [ResourceLoader] instead of [FileAccess].
 *
 * Here is an example on how to iterate through the files of a directory:
 *
 * @example
 *
 *
 * func dir_contents(path):
 * 	var dir = DirAccess.open(path)
 * 	if dir:
 * 		dir.list_dir_begin()
 * 		var file_name = dir.get_next()
 * 		while file_name != "":
 * 			if dir.current_is_dir():
 * 				print("Found directory: " + file_name)
 * 			else:
 * 				print("Found file: " + file_name)
 * 			file_name = dir.get_next()
 * 	else:
 * 		print("An error occurred when trying to access the path.")
 *
 *
 * public void DirContents(string path)
 * {
 * 	using var dir = DirAccess.Open(path);
 * 	if (dir != null)
 * 	{
 * 		dir.ListDirBegin();
 * 		string fileName = dir.GetNext();
 * 		while (fileName != "")
 * 		{
 * 			if (dir.CurrentIsDir())
 * 			{
 * 				GD.Print($"Found directory: {fileName}");
 * 			}
 * 			else
 * 			{
 * 				GD.Print($"Found file: {fileName}");
 * 			}
 * 			fileName = dir.GetNext();
 * 		}
 * 	}
 * 	else
 * 	{
 * 		GD.Print("An error occurred when trying to access the path.");
 * 	}
 * }
 *
 * @summary
 *
 *
 * Keep in mind that file names may change or be remapped after export. If you want to see the actual resource file list as it appears in the editor, use [method ResourceLoader.list_directory] instead.
 *
 */
declare class DirAccess extends RefCounted {
  /**
   * This class is used to manage directories and their content, even outside of the project folder.
   *
   * [DirAccess] can't be instantiated directly. Instead it is created with a static method that takes a path for which it will be opened.
   *
   * Most of the methods have a static alternative that can be used without creating a [DirAccess]. Static methods only support absolute paths (including `res://` and `user://`).
   *
   * @example
   *
   * # Standard
   * var dir = DirAccess.open("user://levels")
   * dir.make_dir("world1")
   * # Static
   * DirAccess.make_dir_absolute("user://levels/world1")
   * @summary
   *
   *
   * **Note:** Accessing project ("res://") directories once exported may behave unexpectedly as some files are converted to engine-specific formats and their original source files may not be present in the expected PCK package. Because of this, to access resources in an exported project, it is recommended to use [ResourceLoader] instead of [FileAccess].
   *
   * Here is an example on how to iterate through the files of a directory:
   *
   * @example
   *
   *
   * func dir_contents(path):
   * 	var dir = DirAccess.open(path)
   * 	if dir:
   * 		dir.list_dir_begin()
   * 		var file_name = dir.get_next()
   * 		while file_name != "":
   * 			if dir.current_is_dir():
   * 				print("Found directory: " + file_name)
   * 			else:
   * 				print("Found file: " + file_name)
   * 			file_name = dir.get_next()
   * 	else:
   * 		print("An error occurred when trying to access the path.")
   *
   *
   * public void DirContents(string path)
   * {
   * 	using var dir = DirAccess.Open(path);
   * 	if (dir != null)
   * 	{
   * 		dir.ListDirBegin();
   * 		string fileName = dir.GetNext();
   * 		while (fileName != "")
   * 		{
   * 			if (dir.CurrentIsDir())
   * 			{
   * 				GD.Print($"Found directory: {fileName}");
   * 			}
   * 			else
   * 			{
   * 				GD.Print($"Found file: {fileName}");
   * 			}
   * 			fileName = dir.GetNext();
   * 		}
   * 	}
   * 	else
   * 	{
   * 		GD.Print("An error occurred when trying to access the path.");
   * 	}
   * }
   *
   * @summary
   *
   *
   * Keep in mind that file names may change or be remapped after export. If you want to see the actual resource file list as it appears in the editor, use [method ResourceLoader.list_directory] instead.
   *
   */
  new(): DirAccess
  constructor()
  static new(): DirAccess

  /**
   * If `true`, hidden files are included when navigating the directory.
   *
   * Affects [method list_dir_begin], [method get_directories] and [method get_files].
   *
   */
  include_hidden: boolean

  /**
   * If `true`, `.` and `..` are included when navigating the directory.
   *
   * Affects [method list_dir_begin] and [method get_directories].
   *
   */
  include_navigational: boolean

  /**
   * Changes the currently opened directory to the one passed as an argument. The argument can be relative to the current directory (e.g. `newdir` or `../newdir`), or an absolute path (e.g. `/tmp/newdir` or `res://somedir/newdir`).
   *
   * Returns one of the [enum Error] code constants ([constant OK] on success).
   *
   * **Note:** The new directory must be within the same scope, e.g. when you had opened a directory inside `res://`, you can't change it to `user://` directory. If you need to open a directory in another access scope, use [method open] to create a new instance instead.
   *
   */
  change_dir(to_dir: string): int

  /**
   * Copies the [param from] file to the [param to] destination. Both arguments should be paths to files, either relative or absolute. If the destination file exists and is not access-protected, it will be overwritten.
   *
   * If [param chmod_flags] is different than `-1`, the Unix permissions for the destination path will be set to the provided value, if available on the current operating system.
   *
   * Returns one of the [enum Error] code constants ([constant OK] on success).
   *
   */
  copy(from: string, to: string, chmod_flags?: int): int

  /** Static version of [method copy]. Supports only absolute paths. */
  static copy_absolute(from: string, to: string, chmod_flags?: int): int

  /**
   * Creates symbolic link between files or folders.
   *
   * **Note:** On Windows, this method works only if the application is running with elevated privileges or Developer Mode is enabled.
   *
   * **Note:** This method is implemented on macOS, Linux, and Windows.
   *
   */
  create_link(source: string, target: string): int

  /**
   * Creates a temporary directory. This directory will be freed when the returned [DirAccess] is freed.
   *
   * If [param prefix] is not empty, it will be prefixed to the directory name, separated by a `-`.
   *
   * If [param keep] is `true`, the directory is not deleted when the returned [DirAccess] is freed.
   *
   * Returns `null` if opening the directory failed. You can use [method get_open_error] to check the error that occurred.
   *
   */
  static create_temp(prefix?: string, keep?: boolean): DirAccess

  /** Returns whether the current item processed with the last [method get_next] call is a directory ([code].[/code] and [code]..[/code] are considered directories). */
  current_is_dir(): boolean

  /**
   * Returns whether the target directory exists. The argument can be relative to the current directory, or an absolute path.
   *
   * **Note:** The returned [bool] in the editor and after exporting when used on a path in the `res://` directory may be different. Some files are converted to engine-specific formats when exported, potentially changing the directory structure.
   *
   */
  dir_exists(path: string): boolean

  /**
   * Static version of [method dir_exists]. Supports only absolute paths.
   *
   * **Note:** The returned [bool] in the editor and after exporting when used on a path in the `res://` directory may be different. Some files are converted to engine-specific formats when exported, potentially changing the directory structure.
   *
   */
  static dir_exists_absolute(path: string): boolean

  /**
   * Returns whether the target file exists. The argument can be relative to the current directory, or an absolute path.
   *
   * For a static equivalent, use [method FileAccess.file_exists].
   *
   * **Note:** Many resources types are imported (e.g. textures or sound files), and their source asset will not be included in the exported game, as only the imported version is used. See [method ResourceLoader.exists] for an alternative approach that takes resource remapping into account.
   *
   */
  file_exists(path: string): boolean

  /** Returns the absolute path to the currently opened directory (e.g. [code]res://folder[/code] or [code]C:\tmp\folder[/code]). */
  get_current_dir(include_drive?: boolean): string

  /** Returns the currently opened directory's drive index. See [method get_drive_name] to convert returned index to the name of the drive. */
  get_current_drive(): int

  /**
   * Returns a [PackedStringArray] containing filenames of the directory contents, excluding files. The array is sorted alphabetically.
   *
   * Affected by [member include_hidden] and [member include_navigational].
   *
   * **Note:** The returned directories in the editor and after exporting in the `res://` directory may differ as some files are converted to engine-specific formats when exported.
   *
   */
  get_directories(): PackedStringArray

  /**
   * Returns a [PackedStringArray] containing filenames of the directory contents, excluding files, at the given [param path]. The array is sorted alphabetically.
   *
   * Use [method get_directories] if you want more control of what gets included.
   *
   * **Note:** The returned directories in the editor and after exporting in the `res://` directory may differ as some files are converted to engine-specific formats when exported.
   *
   */
  static get_directories_at(path: string): PackedStringArray

  /**
   * On Windows, returns the number of drives (partitions) mounted on the current filesystem.
   *
   * On macOS and Android, returns the number of mounted volumes.
   *
   * On Linux, returns the number of mounted volumes and GTK 3 bookmarks.
   *
   * On other platforms, the method returns 0.
   *
   */
  static get_drive_count(): int

  /**
   * On Windows, returns the name of the drive (partition) passed as an argument (e.g. `C:`).
   *
   * On macOS, returns the path to the mounted volume passed as an argument.
   *
   * On Linux, returns the path to the mounted volume or GTK 3 bookmark passed as an argument.
   *
   * On Android (API level 30+), returns the path to the mounted volume as an argument.
   *
   * On other platforms, or if the requested drive does not exist, the method returns an empty String.
   *
   */
  static get_drive_name(idx: int): string

  /**
   * Returns a [PackedStringArray] containing filenames of the directory contents, excluding directories. The array is sorted alphabetically.
   *
   * Affected by [member include_hidden].
   *
   * **Note:** When used on a `res://` path in an exported project, only the files actually included in the PCK at the given folder level are returned. In practice, this means that since imported resources are stored in a top-level `.godot/` folder, only paths to `*.gd` and `*.import` files are returned (plus a few files such as `project.godot` or `project.binary` and the project icon). In an exported project, the list of returned files will also vary depending on whether [member ProjectSettings.editor/export/convert_text_resources_to_binary] is `true`.
   *
   */
  get_files(): PackedStringArray

  /**
   * Returns a [PackedStringArray] containing filenames of the directory contents, excluding directories, at the given [param path]. The array is sorted alphabetically.
   *
   * Use [method get_files] if you want more control of what gets included.
   *
   * **Note:** When used on a `res://` path in an exported project, only the files included in the PCK at the given folder level are returned. In practice, this means that since imported resources are stored in a top-level `.godot/` folder, only paths to `.gd` and `.import` files are returned (plus a few other files, such as `project.godot` or `project.binary` and the project icon). In an exported project, the list of returned files will also vary depending on [member ProjectSettings.editor/export/convert_text_resources_to_binary].
   *
   */
  static get_files_at(path: string): PackedStringArray

  /**
   * Returns file system type name of the current directory's disk. Returned values are uppercase strings like `NTFS`, `FAT32`, `EXFAT`, `APFS`, `EXT4`, `BTRFS`, and so on.
   *
   * **Note:** This method is implemented on macOS, Linux, Windows and for PCK virtual file system.
   *
   */
  get_filesystem_type(): string

  /**
   * Returns the next element (file or directory) in the current directory.
   *
   * The name of the file or directory is returned (and not its full path). Once the stream has been fully processed, the method returns an empty [String] and closes the stream automatically (i.e. [method list_dir_end] would not be mandatory in such a case).
   *
   */
  get_next(): string

  /** Returns the result of the last [method open] call in the current thread. */
  static get_open_error(): int

  /** Returns the available space on the current directory's disk, in bytes. Returns [code]0[/code] if the platform-specific method to query the available space fails. */
  get_space_left(): int

  /**
   * Returns `true` if the directory is a macOS bundle.
   *
   * **Note:** This method is implemented on macOS.
   *
   */
  is_bundle(path: string): boolean

  /**
   * Returns `true` if the file system or directory use case sensitive file names.
   *
   * **Note:** This method is implemented on macOS, Linux (for EXT4 and F2FS filesystems only) and Windows. On other platforms, it always returns `true`.
   *
   */
  is_case_sensitive(path: string): boolean

  /** Returns [code]true[/code] if paths [param path_a] and [param path_b] resolve to the same file system object. Returns [code]false[/code] otherwise, even if the files are bit-for-bit identical (e.g., identical copies of the file that are not symbolic links). */
  is_equivalent(path_a: string, path_b: string): boolean

  /**
   * Returns `true` if the file or directory is a symbolic link, directory junction, or other reparse point.
   *
   * **Note:** This method is implemented on macOS, Linux, and Windows.
   *
   */
  is_link(path: string): boolean

  /**
   * Initializes the stream used to list all files and directories using the [method get_next] function, closing the currently opened stream if needed. Once the stream has been processed, it should typically be closed with [method list_dir_end].
   *
   * Affected by [member include_hidden] and [member include_navigational].
   *
   * **Note:** The order of files and directories returned by this method is not deterministic, and can vary between operating systems. If you want a list of all files or folders sorted alphabetically, use [method get_files] or [method get_directories].
   *
   */
  list_dir_begin(): int

  /** Closes the current stream opened with [method list_dir_begin] (whether it has been fully processed with [method get_next] does not matter). */
  list_dir_end(): void

  /**
   * Creates a directory. The argument can be relative to the current directory, or an absolute path. The target directory should be placed in an already existing directory (to create the full path recursively, see [method make_dir_recursive]).
   *
   * Returns one of the [enum Error] code constants ([constant OK] on success).
   *
   */
  make_dir(path: string): int

  /** Static version of [method make_dir]. Supports only absolute paths. */
  static make_dir_absolute(path: string): int

  /**
   * Creates a target directory and all necessary intermediate directories in its path, by calling [method make_dir] recursively. The argument can be relative to the current directory, or an absolute path.
   *
   * Returns one of the [enum Error] code constants ([constant OK] on success).
   *
   */
  make_dir_recursive(path: string): int

  /** Static version of [method make_dir_recursive]. Supports only absolute paths. */
  static make_dir_recursive_absolute(path: string): int

  /**
   * Creates a new [DirAccess] object and opens an existing directory of the filesystem. The [param path] argument can be within the project tree (`res://folder`), the user directory (`user://folder`) or an absolute path of the user filesystem (e.g. `/tmp/folder` or `C:\tmp\folder`).
   *
   * Returns `null` if opening the directory failed. You can use [method get_open_error] to check the error that occurred.
   *
   */
  static open(path: string): DirAccess

  /**
   * Returns target of the symbolic link.
   *
   * **Note:** This method is implemented on macOS, Linux, and Windows.
   *
   */
  read_link(path: string): string

  /**
   * Permanently deletes the target file or an empty directory. The argument can be relative to the current directory, or an absolute path. If the target directory is not empty, the operation will fail.
   *
   * If you don't want to delete the file/directory permanently, use [method OS.move_to_trash] instead.
   *
   * Returns one of the [enum Error] code constants ([constant OK] on success).
   *
   */
  remove(path: string): int

  /** Static version of [method remove]. Supports only absolute paths. */
  static remove_absolute(path: string): int

  /**
   * Renames (move) the [param from] file or directory to the [param to] destination. Both arguments should be paths to files or directories, either relative or absolute. If the destination file or directory exists and is not access-protected, it will be overwritten.
   *
   * Returns one of the [enum Error] code constants ([constant OK] on success).
   *
   */
  rename(from: string, to: string): int

  /** Static version of [method rename]. Supports only absolute paths. */
  static rename_absolute(from: string, to: string): int

  connect<T extends SignalsOf<DirAccess>>(
    signal: T,
    method: SignalFunction<DirAccess[T]>
  ): number
}
