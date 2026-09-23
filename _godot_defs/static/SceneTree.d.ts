/**
 * As one of the most important classes, the [SceneTree] manages the hierarchy of nodes in a scene, as well as scenes themselves. Nodes can be added, fetched and removed. The whole scene tree (and thus the current scene) can be paused. Scenes can be loaded, switched and reloaded.
 *
 * You can also use the [SceneTree] to organize your nodes into **groups**: every node can be added to as many groups as you want to create, e.g. an "enemy" group. You can then iterate these groups or even call methods and set properties on all the nodes belonging to any given group.
 *
 * [SceneTree] is the default [MainLoop] implementation used by the engine, and is thus in charge of the game loop.
 *
 */
declare class SceneTree extends MainLoop {
  /**
   * As one of the most important classes, the [SceneTree] manages the hierarchy of nodes in a scene, as well as scenes themselves. Nodes can be added, fetched and removed. The whole scene tree (and thus the current scene) can be paused. Scenes can be loaded, switched and reloaded.
   *
   * You can also use the [SceneTree] to organize your nodes into **groups**: every node can be added to as many groups as you want to create, e.g. an "enemy" group. You can then iterate these groups or even call methods and set properties on all the nodes belonging to any given group.
   *
   * [SceneTree] is the default [MainLoop] implementation used by the engine, and is thus in charge of the game loop.
   *
   */
  new(): SceneTree
  constructor()
  static new(): SceneTree

  /**
   * If `true`, the application automatically accepts quitting requests.
   *
   * For mobile platforms, see [member quit_on_go_back].
   *
   */
  auto_accept_quit: boolean

  /**
   * The root node of the currently loaded main scene, usually as a direct child of [member root]. See also [method change_scene_to_file], [method change_scene_to_packed], and [method reload_current_scene].
   *
   * **Warning:** Setting this property directly may not work as expected, as it does **not** add or remove any nodes from this tree.
   *
   */
  current_scene: Node

  /**
   * If `true`, collision shapes will be visible when running the game from the editor for debugging purposes.
   *
   * **Note:** This property is not designed to be changed at run-time. Changing the value of [member debug_collisions_hint] while the project is running will not have the desired effect.
   *
   */
  debug_collisions_hint: boolean

  /**
   * If `true`, navigation polygons will be visible when running the game from the editor for debugging purposes.
   *
   * **Note:** This property is not designed to be changed at run-time. Changing the value of [member debug_navigation_hint] while the project is running will not have the desired effect.
   *
   */
  debug_navigation_hint: boolean

  /**
   * If `true`, curves from [Path2D] and [Path3D] nodes will be visible when running the game from the editor for debugging purposes.
   *
   * **Note:** This property is not designed to be changed at run-time. Changing the value of [member debug_paths_hint] while the project is running will not have the desired effect.
   *
   */
  debug_paths_hint: boolean

  /**
   * The root of the scene currently being edited in the editor. This is usually a direct child of [member root].
   *
   * **Note:** This property does nothing in release builds.
   *
   */
  edited_scene_root: Node

  /**
   * If `true` (default value), enables automatic polling of the [MultiplayerAPI] for this SceneTree during [signal process_frame].
   *
   * If `false`, you need to manually call [method MultiplayerAPI.poll] to process network packets and deliver RPCs. This allows running RPCs in a different loop (e.g. physics, thread, specific time step) and for manual [Mutex] protection when accessing the [MultiplayerAPI] from threads.
   *
   */
  multiplayer_poll: boolean

  /**
   * If `true`, the scene tree is considered paused. This causes the following behavior:
   *
   * - 2D and 3D physics will be stopped, as well as collision detection and related signals.
   *
   * - Depending on each node's [member Node.process_mode], their [method Node._process], [method Node._physics_process] and [method Node._input] callback methods may not called anymore.
   *
   */
  paused: boolean

  /**
   * If `true`, the renderer will interpolate the transforms of objects (both physics and non-physics) between the last two transforms, so that smooth motion is seen even when physics ticks do not coincide with rendered frames.
   *
   * The default value of this property is controlled by [member ProjectSettings.physics/common/physics_interpolation].
   *
   * **Note:** Although this is a global setting, finer control of individual branches of the [SceneTree] is possible using [member Node.physics_interpolation_mode].
   *
   */
  physics_interpolation: boolean

  /**
   * If `true`, the application quits automatically when navigating back (e.g. using the system "Back" button on Android).
   *
   * To handle 'Go Back' button when this option is disabled, use [constant DisplayServer.WINDOW_EVENT_GO_BACK_REQUEST].
   *
   */
  quit_on_go_back: boolean

  /**
   * The tree's root [Window]. This is top-most [Node] of the scene tree, and is always present. An absolute [NodePath] always starts from this node. Children of the root node may include the loaded [member current_scene], as well as any [url=$DOCS_URL/tutorials/scripting/singletons_autoload.html]AutoLoad[/url] configured in the Project Settings.
   *
   * **Warning:** Do not delete this node. This will result in unstable behavior, followed by a crash.
   *
   */
  root: Window

  /**
   * Calls [param method] on each node inside this tree added to the given [param group]. You can pass arguments to [param method] by specifying them at the end of this method call. Nodes that cannot call [param method] (either because the method doesn't exist or the arguments do not match) are ignored. See also [method set_group] and [method notify_group].
   *
   * **Note:** This method acts immediately on all selected nodes at once, which may cause stuttering in some performance-intensive situations.
   *
   * **Note:** In C#, [param method] must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `MethodName` class to avoid allocating a new [StringName] on each call.
   *
   */
  call_group(group: keyof Groups, method: StringName, ...args: any[]): void

  /**
   * Calls the given [param method] on each node inside this tree added to the given [param group]. Use [param flags] to customize this method's behavior (see [enum GroupCallFlags]). Additional arguments for [param method] can be passed at the end of this method. Nodes that cannot call [param method] (either because the method doesn't exist or the arguments do not match) are ignored.
   *
   * @example
   *
   * # Calls "hide" to all nodes of the "enemies" group, at the end of the frame and in reverse tree order.
   * get_tree().call_group_flags(
   * 		SceneTree.GROUP_CALL_DEFERRED | SceneTree.GROUP_CALL_REVERSE,
   * 		"enemies", "hide")
   * @summary
   *
   *
   * **Note:** In C#, [param method] must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `MethodName` class to avoid allocating a new [StringName] on each call.
   *
   */
  call_group_flags(
    flags: int,
    group: keyof Groups,
    method: StringName,
    ...args: any[]
  ): void

  /**
   * Changes the running scene to the one at the given [param path], after loading it into a [PackedScene] and creating a new instance.
   *
   * Returns [constant OK] on success, [constant ERR_CANT_OPEN] if the [param path] cannot be loaded into a [PackedScene], or [constant ERR_CANT_CREATE] if that scene cannot be instantiated.
   *
   * **Note:** See [method change_scene_to_node] for details on the order of operations.
   *
   */
  change_scene_to_file(path: string): int

  /**
   * Changes the running scene to the provided [Node]. Useful when you want to set up the new scene before changing.
   *
   * Returns [constant OK] on success, [constant ERR_INVALID_PARAMETER] if the [param node] is `null`, or [constant ERR_UNCONFIGURED] if the [param node] is already inside the scene tree.
   *
   * **Note:** Operations happen in the following order when [method change_scene_to_node] is called:
   *
   * 1. The current scene node is immediately removed from the tree. From that point, [method Node.get_tree] called on the current (outgoing) scene will return `null`. [member current_scene] will be `null` too, because the new scene is not available yet.
   *
   * 2. At the end of the frame, the formerly current scene, already removed from the tree, will be deleted (freed from memory) and then the new scene node will be added to the tree. [method Node.get_tree] and [member current_scene] will be back to working as usual.
   *
   * This ensures that both scenes aren't running at the same time, while still freeing the previous scene in a safe way similar to [method Node.queue_free].
   *
   * If you want to reliably access the new scene, await the [signal scene_changed] signal.
   *
   * **Warning:** After using this method, the [SceneTree] will take ownership of the node and will free it automatically when changing scene again. Any references you had to that node will become invalid.
   *
   */
  change_scene_to_node(node: Node): int

  /**
   * Changes the running scene to a new instance of the given [PackedScene] (which must be valid).
   *
   * Returns [constant OK] on success, [constant ERR_CANT_CREATE] if the scene cannot be instantiated, or [constant ERR_INVALID_PARAMETER] if the scene is invalid.
   *
   * **Note:** See [method change_scene_to_node] for details on the order of operations.
   *
   */
  change_scene_to_packed(packed_scene: PackedScene<any>): int

  /**
   * Returns a new [SceneTreeTimer]. After [param time_sec] in seconds have passed, the timer will emit [signal SceneTreeTimer.timeout] and will be automatically freed.
   *
   * If [param process_always] is `false`, the timer will be paused when setting [member SceneTree.paused] to `true`.
   *
   * If [param process_in_physics] is `true`, the timer will update at the end of the physics frame, instead of the process frame.
   *
   * If [param ignore_time_scale] is `true`, the timer will ignore [member Engine.time_scale] and update with the real, elapsed time.
   *
   * This method is commonly used to create a one-shot delay timer, as in the following example:
   *
   * @example
   *
   *
   * func some_function():
   * 	print("start")
   * 	await get_tree().create_timer(1.0).timeout
   * 	print("end")
   *
   *
   * public async Task SomeFunction()
   * {
   * 	GD.Print("start");
   * 	await ToSignal(GetTree().CreateTimer(1.0f), SceneTreeTimer.SignalName.Timeout);
   * 	GD.Print("end");
   * }
   *
   * @summary
   *
   *
   * **Note:** The timer is always updated **after** all of the nodes in the tree. A node's [method Node._process] method would be called before the timer updates (or [method Node._physics_process] if [param process_in_physics] is set to `true`).
   *
   */
  create_timer(
    time_sec: float,
    process_always?: boolean,
    process_in_physics?: boolean,
    ignore_time_scale?: boolean
  ): SceneTreeTimer

  /**
   * Creates and returns a new [Tween] processed in this tree. The Tween will start automatically on the next process frame or physics frame (depending on its [enum Tween.TweenProcessMode]).
   *
   * **Note:** A [Tween] created using this method is not bound to any [Node]. It may keep working until there is nothing left to animate. If you want the [Tween] to be automatically killed when the [Node] is freed, use [method Node.create_tween] or [method Tween.bind_node].
   *
   */
  create_tween(): Tween

  /** Returns the first [Node] found inside the tree, that has been added to the given [param group], in scene hierarchy order. Returns [code]null[/code] if no match is found. See also [method get_nodes_in_group]. */
  get_first_node_in_group(group: keyof Groups): Node

  /** Returns how many physics process steps have been processed, since the application started. This is [i]not[/i] a measurement of elapsed time. See also [signal physics_frame]. For the number of frames rendered, see [method Engine.get_process_frames]. */
  get_frame(): int

  /** Searches for the [MultiplayerAPI] configured for the given path, if one does not exist it searches the parent paths until one is found. If the path is empty, or none is found, the default one is returned. See [method set_multiplayer]. */
  get_multiplayer(for_path?: NodePathType): MultiplayerAPI

  /** Returns the number of nodes inside this tree. */
  get_node_count(): int

  /** Returns the number of nodes assigned to the given group. */
  get_node_count_in_group(group: keyof Groups): int

  /** Returns an [Array] containing all nodes inside this tree, that have been added to the given [param group], in scene hierarchy order. */
  get_nodes_in_group<T extends keyof Groups>(group: T): Groups[T][]

  /** Returns an [Array] of currently existing [Tween]s in the tree, including paused tweens. */
  get_processed_tweens(): Tween[]

  /** Returns [code]true[/code] if a node added to the given group [param name] exists in the tree. */
  has_group<T extends keyof Groups>(name: T): boolean

  /** Returns [code]true[/code] if accessibility features are enabled, and accessibility information updates are actively processed. */
  is_accessibility_enabled(): boolean

  /** Returns [code]true[/code] if accessibility features are supported by the OS and enabled in project settings. */
  is_accessibility_supported(): boolean

  /**
   * Calls [method Object.notification] with the given [param notification] to all nodes inside this tree added to the [param group]. See also [url=$DOCS_URL/tutorials/best_practices/godot_notifications.html]Godot notifications[/url] and [method call_group] and [method set_group].
   *
   * **Note:** This method acts immediately on all selected nodes at once, which may cause stuttering in some performance-intensive situations.
   *
   */
  notify_group(group: keyof Groups, notification: int): void

  /** Calls [method Object.notification] with the given [param notification] to all nodes inside this tree added to the [param group]. Use [param call_flags] to customize this method's behavior (see [enum GroupCallFlags]). */
  notify_group_flags(
    call_flags: int,
    group: keyof Groups,
    notification: int
  ): void

  /** Queues the given [param obj] to be deleted, calling its [method Object.free] at the end of the current frame. This method is similar to [method Node.queue_free]. */
  queue_delete(obj: Object): void

  /**
   * Quits the application at the end of the current iteration, with the given [param exit_code].
   *
   * By convention, an exit code of `0` indicates success, whereas any other exit code indicates an error. For portability reasons, it should be between `0` and `125` (inclusive).
   *
   * **Note:** On iOS this method doesn't work. Instead, as recommended by the [url=https://developer.apple.com/library/archive/qa/qa1561/_index.html]iOS Human Interface Guidelines[/url], the user is expected to close apps via the Home button.
   *
   */
  quit(exit_code?: int): void

  /**
   * Reloads the currently active scene, replacing [member current_scene] with a new instance of its original [PackedScene].
   *
   * Returns [constant OK] on success, [constant ERR_UNCONFIGURED] if no [member current_scene] is defined, [constant ERR_CANT_OPEN] if [member current_scene] cannot be loaded into a [PackedScene], or [constant ERR_CANT_CREATE] if the scene cannot be instantiated.
   *
   */
  reload_current_scene(): int

  /**
   * Sets the given [param property] to [param value] on all nodes inside this tree added to the given [param group]. Nodes that do not have the [param property] are ignored. See also [method call_group] and [method notify_group].
   *
   * **Note:** This method acts immediately on all selected nodes at once, which may cause stuttering in some performance-intensive situations.
   *
   * **Note:** In C#, [param property] must be in snake_case when referring to built-in Godot properties. Prefer using the names exposed in the `PropertyName` class to avoid allocating a new [StringName] on each call.
   *
   */
  set_group(group: keyof Groups, property: string, value: any): void

  /**
   * Sets the given [param property] to [param value] on all nodes inside this tree added to the given [param group]. Nodes that do not have the [param property] are ignored. Use [param call_flags] to customize this method's behavior (see [enum GroupCallFlags]).
   *
   * **Note:** In C#, [param property] must be in snake_case when referring to built-in Godot properties. Prefer using the names exposed in the `PropertyName` class to avoid allocating a new [StringName] on each call.
   *
   */
  set_group_flags(
    call_flags: int,
    group: keyof Groups,
    property: string,
    value: any
  ): void

  /**
   * Sets a custom [MultiplayerAPI] with the given [param root_path] (controlling also the relative subpaths), or override the default one if [param root_path] is empty.
   *
   * **Note:** No [MultiplayerAPI] must be configured for the subpath containing [param root_path], nested custom multiplayers are not allowed. I.e. if one is configured for `"/root/Foo"` setting one for `"/root/Foo/Bar"` will cause an error.
   *
   * **Note:** [method set_multiplayer] should be called **before** the child nodes are ready at the given [param root_path]. If multiplayer nodes like [MultiplayerSpawner] or [MultiplayerSynchronizer] are added to the tree before the custom multiplayer API is set, they will not work.
   *
   */
  set_multiplayer(multiplayer: MultiplayerAPI, root_path?: NodePathType): void

  /** If a current scene is loaded, calling this method will unload it. */
  unload_current_scene(): void

  connect<T extends SignalsOf<SceneTree>>(
    signal: T,
    method: SignalFunction<SceneTree[T]>
  ): number

  /**
   * Call nodes within a group with no special behavior (default).
   *
   */
  static GROUP_CALL_DEFAULT: any

  /**
   * Call nodes within a group in reverse tree hierarchy order (all nested children are called before their respective parent nodes).
   *
   */
  static GROUP_CALL_REVERSE: any

  /**
   * Call nodes within a group at the end of the current frame (can be either process or physics frame), similar to [method Object.call_deferred].
   *
   */
  static GROUP_CALL_DEFERRED: any

  /**
   * Call nodes within a group only once, even if the call is executed many times in the same frame. Must be combined with [constant GROUP_CALL_DEFERRED] to work.
   *
   * **Note:** Different arguments are not taken into account. Therefore, when the same call is executed with different arguments, only the first call will be performed.
   *
   */
  static GROUP_CALL_UNIQUE: any

  /**
   * Emitted when the [param node] enters this tree.
   *
   */
  $node_added: Signal<() => void>

  /**
   * Emitted when the [param node]'s [method Node.update_configuration_warnings] is called. Only emitted in the editor.
   *
   */
  $node_configuration_warning_changed: Signal<() => void>

  /**
   * Emitted when the [param node] exits this tree.
   *
   */
  $node_removed: Signal<() => void>

  /**
   * Emitted when the [param node]'s [member Node.name] is changed.
   *
   */
  $node_renamed: Signal<() => void>

  /**
   * Emitted immediately before [method Node._physics_process] is called on every node in this tree.
   *
   */
  $physics_frame: Signal<() => void>

  /**
   * Emitted immediately before [method Node._process] is called on every node in this tree.
   *
   */
  $process_frame: Signal<() => void>

  /**
   * Emitted after the new scene is added to scene tree and initialized. Can be used to reliably access [member current_scene] when changing scenes.
   *
   * @example
   *
   * # This code should be inside an autoload.
   * get_tree().change_scene_to_file(other_scene_path)
   * await get_tree().scene_changed
   * print(get_tree().current_scene) # Prints the new scene.
   * @summary
   *
   *
   */
  $scene_changed: Signal<() => void>

  /**
   * Emitted any time the tree's hierarchy changes (nodes being moved, renamed, etc.).
   *
   */
  $tree_changed: Signal<() => void>

  /**
   * Emitted when the [member Node.process_mode] of any node inside the tree is changed. Only emitted in the editor, to update the visibility of disabled nodes.
   *
   */
  $tree_process_mode_changed: Signal<() => void>
}
