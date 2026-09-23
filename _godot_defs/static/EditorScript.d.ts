/**
 * Scripts extending this class and implementing its [method _run] method can be executed from the Script Editor's **File > Run** menu option (or by pressing [kbd]Ctrl + Shift + X[/kbd]) while the editor is running. This is useful for adding custom in-editor functionality to Godot. For more complex additions, consider using [EditorPlugin]s instead.
 *
 * If a script extending this class also has a global class name, it will be included in the editor's command palette.
 *
 * **Note:** Extending scripts need to have `tool` mode enabled.
 *
 * **Example:** Running the following script prints "Hello from the Godot Editor!":
 *
 * @example
 *
 *
 * @tool
 * extends EditorScript
 * func _run():
 * 	print("Hello from the Godot Editor!")
 *
 *
 * using Godot;
 * [Tool]
 * public partial class HelloEditor : EditorScript
 * {
 * 	public override void _Run()
 * 	{
 * 		GD.Print("Hello from the Godot Editor!");
 * 	}
 * }
 *
 * @summary
 *
 *
 * **Note:** EditorScript is [RefCounted], meaning it is destroyed when nothing references it. This can cause errors during asynchronous operations if there are no references to the script.
 *
 */
declare class EditorScript extends RefCounted {
  /**
   * Scripts extending this class and implementing its [method _run] method can be executed from the Script Editor's **File > Run** menu option (or by pressing [kbd]Ctrl + Shift + X[/kbd]) while the editor is running. This is useful for adding custom in-editor functionality to Godot. For more complex additions, consider using [EditorPlugin]s instead.
   *
   * If a script extending this class also has a global class name, it will be included in the editor's command palette.
   *
   * **Note:** Extending scripts need to have `tool` mode enabled.
   *
   * **Example:** Running the following script prints "Hello from the Godot Editor!":
   *
   * @example
   *
   *
   * @tool
   * extends EditorScript
   * func _run():
   * 	print("Hello from the Godot Editor!")
   *
   *
   * using Godot;
   * [Tool]
   * public partial class HelloEditor : EditorScript
   * {
   * 	public override void _Run()
   * 	{
   * 		GD.Print("Hello from the Godot Editor!");
   * 	}
   * }
   *
   * @summary
   *
   *
   * **Note:** EditorScript is [RefCounted], meaning it is destroyed when nothing references it. This can cause errors during asynchronous operations if there are no references to the script.
   *
   */
  new(): EditorScript
  constructor()
  static new(): EditorScript

  /** This method is executed by the Editor when [b]File > Run[/b] is used. */
  protected _run(): void

  /** Makes [param node] root of the currently opened scene. Only works if the scene is empty. If the [param node] is a scene instance, an inheriting scene will be created. */
  add_root_node(node: Node): void

  /** Returns the [EditorInterface] singleton instance. */
  get_editor_interface(): EditorInterfaceClass

  /** Returns the edited (current) scene's root [Node]. Equivalent of [method EditorInterface.get_edited_scene_root]. */
  get_scene(): Node

  connect<T extends SignalsOf<EditorScript>>(
    signal: T,
    method: SignalFunction<EditorScript[T]>
  ): number
}
