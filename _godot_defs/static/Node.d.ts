/**
 * Nodes are Godot's building blocks. They can be assigned as the child of another node, resulting in a tree arrangement. A given node can contain any number of nodes as children with the requirement that all siblings (direct children of a node) should have unique names.
 *
 * A tree of nodes is called a **scene**. Scenes can be saved to the disk and then instantiated into other scenes. This allows for very high flexibility in the architecture and data model of Godot projects.
 *
 * **Scene tree:** The [SceneTree] contains the active tree of nodes. When a node is added to the scene tree, it receives the [constant NOTIFICATION_ENTER_TREE] notification and its [method _enter_tree] callback is triggered. Child nodes are always added **after** their parent node, i.e. the [method _enter_tree] callback of a parent node will be triggered before its child's.
 *
 * Once all nodes have been added in the scene tree, they receive the [constant NOTIFICATION_READY] notification and their respective [method _ready] callbacks are triggered. For groups of nodes, the [method _ready] callback is called in reverse order, starting with the children and moving up to the parent nodes.
 *
 * This means that when adding a node to the scene tree, the following order will be used for the callbacks: [method _enter_tree] of the parent, [method _enter_tree] of the children, [method _ready] of the children and finally [method _ready] of the parent (recursively for the entire scene tree).
 *
 * **Processing:** Nodes can override the "process" state, so that they receive a callback on each frame requesting them to process (do something). Normal processing (callback [method _process], toggled with [method set_process]) happens as fast as possible and is dependent on the frame rate, so the processing time **delta** (in seconds) is passed as an argument. Physics processing (callback [method _physics_process], toggled with [method set_physics_process]) happens a fixed number of times per second (60 by default) and is useful for code related to the physics engine.
 *
 * Nodes can also process input events. When present, the [method _input] function will be called for each input that the program receives. In many cases, this can be overkill (unless used for simple projects), and the [method _unhandled_input] function might be preferred; it is called when the input event was not handled by anyone else (typically, GUI [Control] nodes), ensuring that the node only receives the events that were meant for it.
 *
 * To keep track of the scene hierarchy (especially when instantiating scenes into other scenes), an "owner" can be set for the node with the [member owner] property. This keeps track of who instantiated what. This is mostly useful when writing editors and tools, though.
 *
 * Finally, when a node is freed with [method Object.free] or [method queue_free], it will also free all its children.
 *
 * **Groups:** Nodes can be added to as many groups as you want to be easy to manage, you could create groups like "enemies" or "collectables" for example, depending on your game. See [method add_to_group], [method is_in_group] and [method remove_from_group]. You can then retrieve all nodes in these groups, iterate them and even call methods on groups via the methods on [SceneTree].
 *
 * **Networking with nodes:** After connecting to a server (or making one, see [ENetMultiplayerPeer]), it is possible to use the built-in RPC (remote procedure call) system to communicate over the network. By calling [method rpc] with a method name, it will be called locally and in all connected peers (peers = clients and the server that accepts connections). To identify which node receives the RPC call, Godot will use its [NodePath] (make sure node names are the same on all peers). Also, take a look at the high-level networking tutorial and corresponding demos.
 *
 * **Note:** The `script` property is part of the [Object] class, not [Node]. It isn't exposed like most properties but does have a setter and getter (see [method Object.set_script] and [method Object.get_script]).
 *
 */
declare class Node extends Object {
  /**
   * Nodes are Godot's building blocks. They can be assigned as the child of another node, resulting in a tree arrangement. A given node can contain any number of nodes as children with the requirement that all siblings (direct children of a node) should have unique names.
   *
   * A tree of nodes is called a **scene**. Scenes can be saved to the disk and then instantiated into other scenes. This allows for very high flexibility in the architecture and data model of Godot projects.
   *
   * **Scene tree:** The [SceneTree] contains the active tree of nodes. When a node is added to the scene tree, it receives the [constant NOTIFICATION_ENTER_TREE] notification and its [method _enter_tree] callback is triggered. Child nodes are always added **after** their parent node, i.e. the [method _enter_tree] callback of a parent node will be triggered before its child's.
   *
   * Once all nodes have been added in the scene tree, they receive the [constant NOTIFICATION_READY] notification and their respective [method _ready] callbacks are triggered. For groups of nodes, the [method _ready] callback is called in reverse order, starting with the children and moving up to the parent nodes.
   *
   * This means that when adding a node to the scene tree, the following order will be used for the callbacks: [method _enter_tree] of the parent, [method _enter_tree] of the children, [method _ready] of the children and finally [method _ready] of the parent (recursively for the entire scene tree).
   *
   * **Processing:** Nodes can override the "process" state, so that they receive a callback on each frame requesting them to process (do something). Normal processing (callback [method _process], toggled with [method set_process]) happens as fast as possible and is dependent on the frame rate, so the processing time **delta** (in seconds) is passed as an argument. Physics processing (callback [method _physics_process], toggled with [method set_physics_process]) happens a fixed number of times per second (60 by default) and is useful for code related to the physics engine.
   *
   * Nodes can also process input events. When present, the [method _input] function will be called for each input that the program receives. In many cases, this can be overkill (unless used for simple projects), and the [method _unhandled_input] function might be preferred; it is called when the input event was not handled by anyone else (typically, GUI [Control] nodes), ensuring that the node only receives the events that were meant for it.
   *
   * To keep track of the scene hierarchy (especially when instantiating scenes into other scenes), an "owner" can be set for the node with the [member owner] property. This keeps track of who instantiated what. This is mostly useful when writing editors and tools, though.
   *
   * Finally, when a node is freed with [method Object.free] or [method queue_free], it will also free all its children.
   *
   * **Groups:** Nodes can be added to as many groups as you want to be easy to manage, you could create groups like "enemies" or "collectables" for example, depending on your game. See [method add_to_group], [method is_in_group] and [method remove_from_group]. You can then retrieve all nodes in these groups, iterate them and even call methods on groups via the methods on [SceneTree].
   *
   * **Networking with nodes:** After connecting to a server (or making one, see [ENetMultiplayerPeer]), it is possible to use the built-in RPC (remote procedure call) system to communicate over the network. By calling [method rpc] with a method name, it will be called locally and in all connected peers (peers = clients and the server that accepts connections). To identify which node receives the RPC call, Godot will use its [NodePath] (make sure node names are the same on all peers). Also, take a look at the high-level networking tutorial and corresponding demos.
   *
   * **Note:** The `script` property is part of the [Object] class, not [Node]. It isn't exposed like most properties but does have a setter and getter (see [method Object.set_script] and [method Object.get_script]).
   *
   */
  new(): Node
  constructor()
  static new(): Node

  /**
   * Defines if any text should automatically change to its translated version depending on the current locale (for nodes such as [Label], [RichTextLabel], [Window], etc.). Also decides if the node's strings should be parsed for translation template generation.
   *
   * **Note:** For the root node, auto translate mode can also be set via [member ProjectSettings.internationalization/rendering/root_node_auto_translate].
   *
   */
  auto_translate_mode: int

  /** An optional description to the node. It will be displayed as a tooltip when hovering over the node in the editor's Scene dock. */
  editor_description: string

  /**
   * The [MultiplayerAPI] instance associated with this node. See [method SceneTree.get_multiplayer].
   *
   * **Note:** Renaming the node, or moving it in the tree, will not move the [MultiplayerAPI] to the new path, you will have to update this manually.
   *
   */
  multiplayer: MultiplayerAPI

  /**
   * The name of the node. This name must be unique among the siblings (other child nodes from the same parent). When set to an existing sibling's name, the node is automatically renamed.
   *
   * **Note:** When changing the name, the following characters will be replaced with an underscore: (`.` `:` `@` `/` `"` `%`). In particular, the `@` character is reserved for auto-generated names. See also [method String.validate_node_name].
   *
   */
  name: StringName

  /**
   * The owner of this node. The owner must be an ancestor of this node. When packing the owner node in a [PackedScene], all the nodes it owns are also saved with it. See also [member unique_name_in_owner].
   *
   * **Note:** In the editor, nodes not owned by the scene root are usually not displayed in the Scene dock, and will **not** be saved. To prevent this, remember to set the owner after calling [method add_child].
   *
   * **Note:** The owner needs to be the current scene root. See [url=$DOCS_URL/tutorials/plugins/running_code_in_the_editor.html#instancing-scenes]Instancing scenes[/url] in the documentation for more information.
   *
   */
  owner: Node

  /**
   * The physics interpolation mode to use for this node. Only effective if [member ProjectSettings.physics/common/physics_interpolation] or [member SceneTree.physics_interpolation] is `true`.
   *
   * By default, nodes inherit the physics interpolation mode from their parent. This property can enable or disable physics interpolation individually for each node, regardless of their parents' physics interpolation mode.
   *
   * **Note:** Some node types like [VehicleWheel3D] have physics interpolation disabled by default, as they rely on their own custom solution.
   *
   * **Note:** When teleporting a node to a distant position, it's recommended to temporarily disable interpolation with [method Node.reset_physics_interpolation] **after** moving the node. This avoids creating a visual streak between the old and new positions.
   *
   */
  physics_interpolation_mode: int

  /** The node's processing behavior. To check if the node can process in its current mode, use [method can_process]. */
  process_mode: int

  /** Similar to [member process_priority] but for [constant NOTIFICATION_PHYSICS_PROCESS], [method _physics_process], or [constant NOTIFICATION_INTERNAL_PHYSICS_PROCESS]. */
  process_physics_priority: int

  /** The node's execution order of the process callbacks ([method _process], [constant NOTIFICATION_PROCESS], and [constant NOTIFICATION_INTERNAL_PROCESS]). Nodes whose priority value is [i]lower[/i] call their process callbacks first, regardless of tree order. */
  process_priority: int

  /**
   * Set the process thread group for this node (basically, whether it receives [constant NOTIFICATION_PROCESS], [constant NOTIFICATION_PHYSICS_PROCESS], [method _process] or [method _physics_process] (and the internal versions) on the main thread or in a sub-thread.
   *
   * By default, the thread group is [constant PROCESS_THREAD_GROUP_INHERIT], which means that this node belongs to the same thread group as the parent node. The thread groups means that nodes in a specific thread group will process together, separate to other thread groups (depending on [member process_thread_group_order]). If the value is set is [constant PROCESS_THREAD_GROUP_SUB_THREAD], this thread group will occur on a sub thread (not the main thread), otherwise if set to [constant PROCESS_THREAD_GROUP_MAIN_THREAD] it will process on the main thread. If there is not a parent or grandparent node set to something other than inherit, the node will belong to the **default thread group**. This default group will process on the main thread and its group order is 0.
   *
   * During processing in a sub-thread, accessing most functions in nodes outside the thread group is forbidden (and it will result in an error in debug mode). Use [method Object.call_deferred], [method call_thread_safe], [method call_deferred_thread_group] and the likes in order to communicate from the thread groups to the main thread (or to other thread groups).
   *
   * To better understand process thread groups, the idea is that any node set to any other value than [constant PROCESS_THREAD_GROUP_INHERIT] will include any child (and grandchild) nodes set to inherit into its process thread group. This means that the processing of all the nodes in the group will happen together, at the same time as the node including them.
   *
   */
  process_thread_group: int

  /** Change the process thread group order. Groups with a lesser order will process before groups with a greater order. This is useful when a large amount of nodes process in sub thread and, afterwards, another group wants to collect their result in the main thread, as an example. */
  process_thread_group_order: int

  /** Set whether the current thread group will process messages (calls to [method call_deferred_thread_group] on threads), and whether it wants to receive them during regular process or physics process callbacks. */
  process_thread_messages: int

  /** The original scene's file path, if the node has been instantiated from a [PackedScene] file. Only scene root nodes contains this. */
  scene_file_path: string

  /**
   * If `true`, the node can be accessed from any node sharing the same [member owner] or from the [member owner] itself, with special `%Name` syntax in [method get_node].
   *
   * **Note:** If another node with the same [member owner] shares the same [member name] as this node, the other node will no longer be accessible as unique.
   *
   */
  unique_name_in_owner: boolean

  /**
   * Called when the node enters the [SceneTree] (e.g. upon instantiating, scene changing, or after calling [method add_child] in a script). If the node has children, its [method _enter_tree] callback will be called first, and then that of the children.
   *
   * Corresponds to the [constant NOTIFICATION_ENTER_TREE] notification in [method Object._notification].
   *
   */
  protected _enter_tree(): void

  /**
   * Called when the node is about to leave the [SceneTree] (e.g. upon freeing, scene changing, or after calling [method remove_child] in a script). If the node has children, its [method _exit_tree] callback will be called last, after all its children have left the tree.
   *
   * Corresponds to the [constant NOTIFICATION_EXIT_TREE] notification in [method Object._notification] and signal [signal tree_exiting]. To get notified when the node has already left the active tree, connect to the [signal tree_exited].
   *
   */
  protected _exit_tree(): void

  /**
   * The elements in the array returned from this method are displayed as warnings in the Scene dock if the script that overrides it is a `tool` script, and accessibility warnings are enabled in the editor settings.
   *
   * Returning an empty array produces no warnings.
   *
   */
  protected _get_accessibility_configuration_warnings(): PackedStringArray

  /**
   * The elements in the array returned from this method are displayed as warnings in the Scene dock if the script that overrides it is a `tool` script.
   *
   * Returning an empty array produces no warnings.
   *
   * Call [method update_configuration_warnings] when the warnings need to be updated for this node.
   *
   * @example
   *
   * @export var energy = 0:
   * 	set(value):
   * 		energy = value
   * 		update_configuration_warnings()
   * func _get_configuration_warnings():
   * 	if energy < 0:
   * 		return ["Energy must be 0 or greater."]
   * 	else:
   * 		return []
   * @summary
   *
   *
   */
  protected _get_configuration_warnings(): PackedStringArray

  /** Called during accessibility information updates to determine the currently focused sub-element, should return a sub-element RID or the value returned by [method get_accessibility_element]. */
  protected _get_focused_accessibility_element(): RID

  /**
   * Called when there is an input event. The input event propagates up through the node tree until a node consumes it.
   *
   * It is only called if input processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_input].
   *
   * To consume the input event and stop it propagating further to other nodes, [method Viewport.set_input_as_handled] can be called.
   *
   * For gameplay input, [method _unhandled_input] and [method _unhandled_key_input] are usually a better fit as they allow the GUI to intercept the events first.
   *
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   *
   */
  protected _input(event: InputEvent): void

  /**
   * Called once on each physics tick, and allows Nodes to synchronize their logic with physics ticks. [param delta] is the logical time between physics ticks in seconds and is equal to [member Engine.time_scale] / [member Engine.physics_ticks_per_second].
   *
   * It is only called if physics processing is enabled for this Node, which is done automatically if this method is overridden, and can be toggled with [method set_physics_process].
   *
   * Processing happens in order of [member process_physics_priority], lower priority values are called first. Nodes with the same priority are processed in tree order, or top to bottom as seen in the editor (also known as pre-order traversal).
   *
   * Corresponds to the [constant NOTIFICATION_PHYSICS_PROCESS] notification in [method Object._notification].
   *
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   *
   * **Note:** Accumulated [param delta] may diverge from real world seconds.
   *
   */
  protected _physics_process(delta: float): void

  /**
   * Called on each idle frame, prior to rendering, and after physics ticks have been processed. [param delta] is the time between frames in seconds.
   *
   * It is only called if processing is enabled for this Node, which is done automatically if this method is overridden, and can be toggled with [method set_process].
   *
   * Processing happens in order of [member process_priority], lower priority values are called first. Nodes with the same priority are processed in tree order, or top to bottom as seen in the editor (also known as pre-order traversal).
   *
   * Corresponds to the [constant NOTIFICATION_PROCESS] notification in [method Object._notification].
   *
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   *
   * **Note:** When the engine is struggling and the frame rate is lowered, [param delta] will increase. When [param delta] is increased, it's capped at a maximum of [member Engine.time_scale] * [member Engine.max_physics_steps_per_frame] / [member Engine.physics_ticks_per_second]. As a result, accumulated [param delta] may not represent real world time.
   *
   * **Note:** When `--fixed-fps` is enabled or the engine is running in Movie Maker mode (see [MovieWriter]), process [param delta] will always be the same for every frame, regardless of how much time the frame took to render.
   *
   * **Note:** Frame delta may be post-processed by [member OS.delta_smoothing] if this is enabled for the project.
   *
   */
  protected _process(delta: float): void

  /**
   * Called when the node is "ready", i.e. when both the node and its children have entered the scene tree. If the node has children, their [method _ready] callbacks get triggered first, and the parent node will receive the ready notification afterwards.
   *
   * Corresponds to the [constant NOTIFICATION_READY] notification in [method Object._notification]. See also the `@onready` annotation for variables.
   *
   * Usually used for initialization. For even earlier initialization, [method Object._init] may be used. See also [method _enter_tree].
   *
   * **Note:** This method may be called only once for each node. After removing a node from the scene tree and adding it again, [method _ready] will **not** be called a second time. This can be bypassed by requesting another call with [method request_ready], which may be called anywhere before adding the node again.
   *
   */
  protected _ready(): void

  /**
   * Called when an [InputEventKey], [InputEventShortcut], or [InputEventJoypadButton] hasn't been consumed by [method _input] or any GUI [Control] item. It is called before [method _unhandled_key_input] and [method _unhandled_input]. The input event propagates up through the node tree until a node consumes it.
   *
   * It is only called if shortcut processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_shortcut_input].
   *
   * To consume the input event and stop it propagating further to other nodes, [method Viewport.set_input_as_handled] can be called.
   *
   * This method can be used to handle shortcuts. For generic GUI events, use [method _input] instead. Gameplay events should usually be handled with either [method _unhandled_input] or [method _unhandled_key_input].
   *
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
   *
   */
  protected _shortcut_input(event: InputEvent): void

  /**
   * Called when an [InputEvent] hasn't been consumed by [method _input] or any GUI [Control] item. It is called after [method _shortcut_input] and after [method _unhandled_key_input]. The input event propagates up through the node tree until a node consumes it.
   *
   * It is only called if unhandled input processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_unhandled_input].
   *
   * To consume the input event and stop it propagating further to other nodes, [method Viewport.set_input_as_handled] can be called.
   *
   * For gameplay input, this method is usually a better fit than [method _input], as GUI events need a higher priority. For keyboard shortcuts, consider using [method _shortcut_input] instead, as it is called before this method. Finally, to handle keyboard events, consider using [method _unhandled_key_input] for performance reasons.
   *
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   *
   */
  protected _unhandled_input(event: InputEvent): void

  /**
   * Called when an [InputEventKey] hasn't been consumed by [method _input] or any GUI [Control] item. It is called after [method _shortcut_input] but before [method _unhandled_input]. The input event propagates up through the node tree until a node consumes it.
   *
   * It is only called if unhandled key input processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_unhandled_key_input].
   *
   * To consume the input event and stop it propagating further to other nodes, [method Viewport.set_input_as_handled] can be called.
   *
   * This method can be used to handle Unicode character input with [kbd]Alt[/kbd], [kbd]Alt + Ctrl[/kbd], and [kbd]Alt + Shift[/kbd] modifiers, after shortcuts were handled.
   *
   * For gameplay input, this and [method _unhandled_input] are usually a better fit than [method _input], as GUI events should be handled first. This method also performs better than [method _unhandled_input], since unrelated events such as [InputEventMouseMotion] are automatically filtered. For shortcuts, consider using [method _shortcut_input] instead.
   *
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   *
   */
  protected _unhandled_key_input(event: InputEvent): void

  /**
   * Adds a child [param node]. Nodes can have any number of children, but every child must have a unique name. Child nodes are automatically deleted when the parent node is deleted, so an entire scene can be removed by deleting its topmost node.
   *
   * If [param force_readable_name] is `true`, improves the readability of the added [param node]. If not named, the [param node] is renamed to its type, and if it shares [member name] with a sibling, a number is suffixed more appropriately. This operation is very slow. As such, it is recommended leaving this to `false`, which assigns a dummy name featuring `@` in both situations.
   *
   * If [param internal] is different than [constant INTERNAL_MODE_DISABLED], the child will be added as internal node. These nodes are ignored by methods like [method get_children], unless their parameter `include_internal` is `true`. It also prevents these nodes being duplicated with their parent. The intended usage is to hide the internal nodes from the user, so the user won't accidentally delete or modify them. Used by some GUI nodes, e.g. [ColorPicker].
   *
   * **Note:** If [param node] already has a parent, this method will fail. Use [method remove_child] first to remove [param node] from its current parent. For example:
   *
   * @example
   *
   *
   * var child_node = get_child(0)
   * if child_node.get_parent():
   * 	child_node.get_parent().remove_child(child_node)
   * add_child(child_node)
   *
   *
   * Node childNode = GetChild(0);
   * if (childNode.GetParent() != null)
   * {
   * 	childNode.GetParent().RemoveChild(childNode);
   * }
   * AddChild(childNode);
   *
   * @summary
   *
   *
   * If you need the child node to be added below a specific node in the list of children, use [method add_sibling] instead of this method.
   *
   * **Note:** If you want a child to be persisted to a [PackedScene], you must set [member owner] in addition to calling [method add_child]. This is typically relevant for [url=$DOCS_URL/tutorials/plugins/running_code_in_the_editor.html]tool scripts[/url] and [url=$DOCS_URL/tutorials/plugins/editor/index.html]editor plugins[/url]. If [method add_child] is called without setting [member owner], the newly added [Node] will not be visible in the scene tree, though it will be visible in the 2D/3D view.
   *
   */
  add_child(node: Node, force_readable_name?: boolean, internal?: int): void

  /**
   * Adds a [param sibling] node to this node's parent, and moves the added sibling right below this node.
   *
   * If [param force_readable_name] is `true`, improves the readability of the added [param sibling]. If not named, the [param sibling] is renamed to its type, and if it shares [member name] with a sibling, a number is suffixed more appropriately. This operation is very slow. As such, it is recommended leaving this to `false`, which assigns a dummy name featuring `@` in both situations.
   *
   * Use [method add_child] instead of this method if you don't need the child node to be added below a specific node in the list of children.
   *
   * **Note:** If this node is internal, the added sibling will be internal too (see [method add_child]'s `internal` parameter).
   *
   */
  add_sibling(sibling: Node, force_readable_name?: boolean): void

  /**
   * Adds the node to the [param group]. Groups can be helpful to organize a subset of nodes, for example `"enemies"` or `"collectables"`. See notes in the description, and the group methods in [SceneTree].
   *
   * If [param persistent] is `true`, the group will be stored when saved inside a [PackedScene]. All groups created and displayed in the Groups dock are persistent.
   *
   * **Note:** To improve performance, the order of group names is **not** guaranteed and may vary between project runs. Therefore, do not rely on the group order.
   *
   * **Note:** [SceneTree]'s group methods will **not** work on this node if not inside the tree (see [method is_inside_tree]).
   *
   */
  add_to_group(group: keyof Groups, persistent?: boolean): void

  /**
   * Translates a [param message], using the translation catalogs configured in the Project Settings. Further [param context] can be specified to help with the translation. Note that most [Control] nodes automatically translate their strings, so this method is mostly useful for formatted strings or custom drawn text.
   *
   * This method works the same as [method Object.tr], with the addition of respecting the [member auto_translate_mode] state.
   *
   * If [method Object.can_translate_messages] is `false`, or no translation is available, this method returns the [param message] without changes. See [method Object.set_message_translation].
   *
   * For detailed examples, see [url=$DOCS_URL/tutorials/i18n/internationalizing_games.html]Internationalizing games[/url].
   *
   */
  atr(message: string, context?: StringName): string

  /**
   * Translates a [param message] or [param plural_message], using the translation catalogs configured in the Project Settings. Further [param context] can be specified to help with the translation.
   *
   * This method works the same as [method Object.tr_n], with the addition of respecting the [member auto_translate_mode] state.
   *
   * If [method Object.can_translate_messages] is `false`, or no translation is available, this method returns [param message] or [param plural_message], without changes. See [method Object.set_message_translation].
   *
   * The [param n] is the number, or amount, of the message's subject. It is used by the translation system to fetch the correct plural form for the current language.
   *
   * For detailed examples, see [url=$DOCS_URL/tutorials/i18n/localization_using_gettext.html]Localization using gettext[/url].
   *
   * **Note:** Negative and [float] numbers may not properly apply to some countable subjects. It's recommended to handle these cases with [method atr].
   *
   */
  atr_n(
    message: string,
    plural_message: StringName,
    n: int,
    context?: StringName
  ): string

  /** This function is similar to [method Object.call_deferred] except that the call will take place when the node thread group is processed. If the node thread group processes in sub-threads, then the call will be done on that thread, right before [constant NOTIFICATION_PROCESS] or [constant NOTIFICATION_PHYSICS_PROCESS], the [method _process] or [method _physics_process] or their internal versions are called. */
  call_deferred_thread_group(method: StringName, ...args: any[]): any

  /** This function ensures that the calling of this function will succeed, no matter whether it's being done from a thread or not. If called from a thread that is not allowed to call the function, the call will become deferred. Otherwise, the call will go through directly. */
  call_thread_safe(method: StringName, ...args: any[]): any

  /** Returns [code]true[/code] if this node can automatically translate messages depending on the current locale. See [member auto_translate_mode], [method atr], and [method atr_n]. */
  can_auto_translate(): boolean

  /**
   * Returns `true` if the node can receive processing notifications and input callbacks ([constant NOTIFICATION_PROCESS], [method _input], etc.) from the [SceneTree] and [Viewport]. The returned value depends on [member process_mode]:
   *
   * - If set to [constant PROCESS_MODE_PAUSABLE], returns `true` when the game is processing, i.e. [member SceneTree.paused] is `false`;
   *
   * - If set to [constant PROCESS_MODE_WHEN_PAUSED], returns `true` when the game is paused, i.e. [member SceneTree.paused] is `true`;
   *
   * - If set to [constant PROCESS_MODE_ALWAYS], always returns `true`;
   *
   * - If set to [constant PROCESS_MODE_DISABLED], always returns `false`;
   *
   * - If set to [constant PROCESS_MODE_INHERIT], use the parent node's [member process_mode] to determine the result.
   *
   * If the node is not inside the tree, returns `false` no matter the value of [member process_mode].
   *
   */
  can_process(): boolean

  /**
   * Creates a new [Tween] and binds it to this node.
   *
   * This is the equivalent of doing:
   *
   * @example
   *
   *
   * get_tree().create_tween().bind_node(self)
   *
   *
   * GetTree().CreateTween().BindNode(this);
   *
   * @summary
   *
   *
   * The Tween will start automatically on the next process frame or physics frame (depending on [enum Tween.TweenProcessMode]). See [method Tween.bind_node] for more info on Tweens bound to nodes.
   *
   * **Note:** The method can still be used when the node is not inside [SceneTree]. It can fail in an unlikely case of using a custom [MainLoop].
   *
   */
  create_tween(): Tween

  /**
   * Duplicates the node, returning a new node with all of its properties, signals, groups, and children copied from the original, recursively. The behavior can be tweaked through the [param flags] (see [enum DuplicateFlags]). Internal nodes are not duplicated.
   *
   * **Note:** For nodes with a [Script] attached, if [method Object._init] has been defined with required parameters, the duplicated node will not have a [Script].
   *
   * **Note:** By default, this method will duplicate only properties marked for serialization (i.e. using [constant @GlobalScope.PROPERTY_USAGE_STORAGE], or in GDScript, [annotation @GDScript.@export]). If you want to duplicate all properties, use [constant DUPLICATE_INTERNAL_STATE].
   *
   */
  duplicate(flags?: int): Node

  /**
   * Finds the first descendant of this node whose [member name] matches [param pattern], returning `null` if no match is found. The matching is done against node names, **not** their paths, through [method String.match]. As such, it is case-sensitive, `"*"` matches zero or more characters, and `"?"` matches any single character.
   *
   * If [param recursive] is `false`, only this node's direct children are checked. Nodes are checked in tree order, so this node's first direct child is checked first, then its own direct children, etc., before moving to the second direct child, and so on. Internal children are also included in the search (see `internal` parameter in [method add_child]).
   *
   * If [param owned] is `true`, only descendants with a valid [member owner] node are checked.
   *
   * **Note:** This method can be very slow. Consider storing a reference to the found node in a variable. Alternatively, use [method get_node] with unique names (see [member unique_name_in_owner]).
   *
   * **Note:** To find all descendant nodes matching a pattern or a class type, see [method find_children].
   *
   */
  find_child(pattern: string, recursive?: boolean, owned?: boolean): Node

  /**
   * Finds all descendants of this node whose names match [param pattern], returning an empty [Array] if no match is found. The matching is done against node names, **not** their paths, through [method String.match]. As such, it is case-sensitive, `"*"` matches zero or more characters, and `"?"` matches any single character.
   *
   * If [param type] is not empty, only ancestors inheriting from [param type] are included (see [method Object.is_class]).
   *
   * If [param recursive] is `false`, only this node's direct children are checked. Nodes are checked in tree order, so this node's first direct child is checked first, then its own direct children, etc., before moving to the second direct child, and so on. Internal children are also included in the search (see `internal` parameter in [method add_child]).
   *
   * If [param owned] is `true`, only descendants with a valid [member owner] node are checked.
   *
   * **Note:** This method can be very slow. Consider storing references to the found nodes in a variable.
   *
   * **Note:** To find a single descendant node matching a pattern, see [method find_child].
   *
   */
  find_children(
    pattern: string,
    type?: string,
    recursive?: boolean,
    owned?: boolean
  ): Node[]

  /**
   * Finds the first ancestor of this node whose [member name] matches [param pattern], returning `null` if no match is found. The matching is done through [method String.match]. As such, it is case-sensitive, `"*"` matches zero or more characters, and `"?"` matches any single character. See also [method find_child] and [method find_children].
   *
   * **Note:** As this method walks upwards in the scene tree, it can be slow in large, deeply nested nodes. Consider storing a reference to the found node in a variable. Alternatively, use [method get_node] with unique names (see [member unique_name_in_owner]).
   *
   */
  find_parent(pattern: string): Node

  /**
   * Returns main accessibility element RID.
   *
   * **Note:** This method should be called only during accessibility information updates ([constant NOTIFICATION_ACCESSIBILITY_UPDATE]).
   *
   */
  get_accessibility_element(): RID

  /**
   * Fetches a child node by its index. Each child node has an index relative to its siblings (see [method get_index]). The first child is at index 0. Negative values can also be used to start from the end of the list. This method can be used in combination with [method get_child_count] to iterate over this node's children. If no child exists at the given index, this method returns `null` and an error is generated.
   *
   * If [param include_internal] is `false`, internal children are ignored (see [method add_child]'s `internal` parameter).
   *
   * @example
   *
   * # Assuming the following are children of this node, in order:
   * # First, Middle, Last.
   * var a = get_child(0).name  # a is "First"
   * var b = get_child(1).name  # b is "Middle"
   * var b = get_child(2).name  # b is "Last"
   * var c = get_child(-1).name # c is "Last"
   * @summary
   *
   *
   * **Note:** To fetch a node by [NodePath], use [method get_node].
   *
   */
  get_child(idx: int, include_internal?: boolean): Node

  /**
   * Returns the number of children of this node.
   *
   * If [param include_internal] is `false`, internal children are not counted (see [method add_child]'s `internal` parameter).
   *
   */
  get_child_count(include_internal?: boolean): int

  /**
   * Returns all children of this node inside an [Array].
   *
   * If [param include_internal] is `false`, excludes internal children from the returned array (see [method add_child]'s `internal` parameter).
   *
   */
  get_children(include_internal?: boolean): Node[]

  /**
   * Returns an [Array] of group names that the node has been added to.
   *
   * **Note:** To improve performance, the order of group names is **not** guaranteed and may vary between project runs. Therefore, do not rely on the group order.
   *
   * **Note:** This method may also return some group names starting with an underscore (`_`). These are internally used by the engine. To avoid conflicts, do not use custom groups starting with underscores. To exclude internal groups, see the following code snippet:
   *
   * @example
   *
   *
   * # Stores the node's non-internal groups only (as an array of StringNames).
   * var non_internal_groups = []
   * for group in get_groups():
   * 	if not str(group).begins_with("_"):
   * 		non_internal_groups.push_back(group)
   *
   *
   * // Stores the node's non-internal groups only (as a List of StringNames).
   * List<string> nonInternalGroups = new List<string>();
   * foreach (string group in GetGroups())
   * {
   * 	if (!group.BeginsWith("_"))
   * 		nonInternalGroups.Add(group);
   * }
   *
   * @summary
   *
   *
   */
  get_groups(): StringName[]

  /**
   * Returns this node's order among its siblings. The first node's index is `0`. See also [method get_child].
   *
   * If [param include_internal] is `false`, returns the index ignoring internal children. The first, non-internal child will have an index of `0` (see [method add_child]'s `internal` parameter).
   *
   */
  get_index(include_internal?: boolean): int

  /** Returns the [Window] that contains this node, or the last exclusive child in a chain of windows starting with the one that contains this node. */
  get_last_exclusive_window(): Window

  /** Returns the peer ID of the multiplayer authority for this node. See [method set_multiplayer_authority]. */
  get_multiplayer_authority(): int

  /**
   * Fetches a node. The [NodePath] can either be a relative path (from this node), or an absolute path (from the [member SceneTree.root]) to a node. If [param path] does not point to a valid node, generates an error and returns `null`. Attempts to access methods on the return value will result in an **"Attempt to call <method> on a null instance."** error.
   *
   * **Note:** Fetching by absolute path only works when the node is inside the scene tree (see [method is_inside_tree]).
   *
   * **Example:** Assume this method is called from the Character node, inside the following tree:
   *
   * [codeblock lang=text]
   *
   *  ┖╴root
   *
   *     ┠╴Character (you are here!)
   *
   *     ┃  ┠╴Sword
   *
   *     ┃  ┖╴Backpack
   *
   *     ┃     ┖╴Dagger
   *
   *     ┠╴MyGame
   *
   *     ┖╴Swamp
   *
   *        ┠╴Alligator
   *
   *        ┠╴Mosquito
   *
   *        ┖╴Goblin
   *
   * @summary
   *
   *
   * The following calls will return a valid node:
   *
   * @example
   *
   *
   * get_node("Sword")
   * get_node("Backpack/Dagger")
   * get_node("../Swamp/Alligator")
   * get_node("/root/MyGame")
   *
   *
   * GetNode("Sword");
   * GetNode("Backpack/Dagger");
   * GetNode("../Swamp/Alligator");
   * GetNode("/root/MyGame");
   *
   * @summary
   *
   *
   */
  get_node(path: NodePathType): Node

  /**
   * Fetches a node. The [NodePath] can either be a relative path (from this node), or an absolute path (from the [member SceneTree.root]) to a node. If [param path] does not point to a valid node, generates an error and returns `null`. Attempts to access methods on the return value will result in an **"Attempt to call <method> on a null instance."** error.
   *
   * **Note:** Fetching by absolute path only works when the node is inside the scene tree (see [method is_inside_tree]).
   *
   * **Example:** Assume this method is called from the Character node, inside the following tree:
   *
   * [codeblock lang=text]
   *
   *  ┖╴root
   *
   *     ┠╴Character (you are here!)
   *
   *     ┃  ┠╴Sword
   *
   *     ┃  ┖╴Backpack
   *
   *     ┃     ┖╴Dagger
   *
   *     ┠╴MyGame
   *
   *     ┖╴Swamp
   *
   *        ┠╴Alligator
   *
   *        ┠╴Mosquito
   *
   *        ┖╴Goblin
   *
   * @summary
   *
   *
   * The following calls will return a valid node:
   *
   * @example
   *
   *
   * get_node("Sword")
   * get_node("Backpack/Dagger")
   * get_node("../Swamp/Alligator")
   * get_node("/root/MyGame")
   *
   *
   * GetNode("Sword");
   * GetNode("Backpack/Dagger");
   * GetNode("../Swamp/Alligator");
   * GetNode("/root/MyGame");
   *
   * @summary
   *
   *
   */
  get_node<T extends Node>(path: NodePathType): T
  get_node_unsafe<T extends Node>(path: NodePathType): T

  /**
   * Fetches a node and its most nested resource as specified by the [NodePath]'s subname. Returns an [Array] of size `3` where:
   *
   * - Element `0` is the [Node], or `null` if not found;
   *
   * - Element `1` is the subname's last nested [Resource], or `null` if not found;
   *
   * - Element `2` is the remaining [NodePath], referring to an existing, non-[Resource] property (see [method Object.get_indexed]).
   *
   * **Example:** Assume that the child's [member Sprite2D.texture] has been assigned an [AtlasTexture]:
   *
   * @example
   *
   *
   * var a = get_node_and_resource("Area2D/Sprite2D")
   * print(a[0].name) # Prints Sprite2D
   * print(a[1])      # Prints <null>
   * print(a[2])      # Prints ^""
   * var b = get_node_and_resource("Area2D/Sprite2D:texture:atlas")
   * print(b[0].name)        # Prints Sprite2D
   * print(b[1].get_class()) # Prints AtlasTexture
   * print(b[2])             # Prints ^""
   * var c = get_node_and_resource("Area2D/Sprite2D:texture:atlas:region")
   * print(c[0].name)        # Prints Sprite2D
   * print(c[1].get_class()) # Prints AtlasTexture
   * print(c[2])             # Prints ^":region"
   *
   *
   * var a = GetNodeAndResource(NodePath("Area2D/Sprite2D"));
   * GD.Print(a[0].Name); // Prints Sprite2D
   * GD.Print(a[1]);      // Prints <null>
   * GD.Print(a[2]);      // Prints ^"
   * var b = GetNodeAndResource(NodePath("Area2D/Sprite2D:texture:atlas"));
   * GD.Print(b[0].name);        // Prints Sprite2D
   * GD.Print(b[1].get_class()); // Prints AtlasTexture
   * GD.Print(b[2]);             // Prints ^""
   * var c = GetNodeAndResource(NodePath("Area2D/Sprite2D:texture:atlas:region"));
   * GD.Print(c[0].name);        // Prints Sprite2D
   * GD.Print(c[1].get_class()); // Prints AtlasTexture
   * GD.Print(c[2]);             // Prints ^":region"
   *
   * @summary
   *
   *
   */
  get_node_and_resource(path: NodePathType): any[]

  /** Fetches a node by [NodePath]. Similar to [method get_node], but does not generate an error if [param path] does not point to a valid node. */
  get_node_or_null(path: NodePathType): Node

  /**
   * Returns a [Dictionary] mapping method names to their RPC configuration defined for this node using [method rpc_config].
   *
   * **Note:** This method only returns the RPC configuration assigned via [method rpc_config]. See [method Script.get_rpc_config] to retrieve the RPCs defined by the [Script].
   *
   */
  get_node_rpc_config(): any

  /**
   * Returns object IDs of all orphan nodes (nodes outside the [SceneTree]). Used for debugging.
   *
   * **Note:** [method get_orphan_node_ids] only works in debug builds. When called in a project exported in release mode, [method get_orphan_node_ids] will return an empty array.
   *
   */
  static get_orphan_node_ids(): int[]

  /** Returns this node's parent node, or [code]null[/code] if the node doesn't have a parent. */
  get_parent(): Node

  /** Returns the node's absolute path, relative to the [member SceneTree.root]. If the node is not inside the scene tree, this method fails and returns an empty [NodePath]. */
  get_path(): NodePathType

  /**
   * Returns the relative [NodePath] from this node to the specified [param node]. Both nodes must be in the same [SceneTree] or scene hierarchy, otherwise this method fails and returns an empty [NodePath].
   *
   * If [param use_unique_path] is `true`, returns the shortest path accounting for this node's unique name (see [member unique_name_in_owner]).
   *
   * **Note:** If you get a relative path which starts from a unique node, the path may be longer than a normal relative path, due to the addition of the unique node's name.
   *
   */
  get_path_to(node: Node, use_unique_path?: boolean): NodePathType

  /**
   * Returns the time elapsed (in seconds) since the last physics callback. This value is identical to [method _physics_process]'s `delta` parameter, and is often consistent at run-time, unless [member Engine.physics_ticks_per_second] is changed. See also [constant NOTIFICATION_PHYSICS_PROCESS].
   *
   * **Note:** The returned value will be larger than expected if running at a framerate lower than [member Engine.physics_ticks_per_second] / [member Engine.max_physics_steps_per_frame] FPS. This is done to avoid "spiral of death" scenarios where performance would plummet due to an ever-increasing number of physics steps per frame. This behavior affects both [method _process] and [method _physics_process]. As a result, avoid using `delta` for time measurements in real-world seconds. Use the [Time] singleton's methods for this purpose instead, such as [method Time.get_ticks_usec].
   *
   */
  get_physics_process_delta_time(): float

  /**
   * Returns the time elapsed (in seconds) since the last process callback. This value is identical to [method _process]'s `delta` parameter, and may vary from frame to frame. See also [constant NOTIFICATION_PROCESS].
   *
   * **Note:** The returned value will be larger than expected if running at a framerate lower than [member Engine.physics_ticks_per_second] / [member Engine.max_physics_steps_per_frame] FPS. This is done to avoid "spiral of death" scenarios where performance would plummet due to an ever-increasing number of physics steps per frame. This behavior affects both [method _process] and [method _physics_process]. As a result, avoid using `delta` for time measurements in real-world seconds. Use the [Time] singleton's methods for this purpose instead, such as [method Time.get_ticks_usec].
   *
   */
  get_process_delta_time(): float

  /** Returns [code]true[/code] if this node is an instance load placeholder. See [InstancePlaceholder] and [method set_scene_instance_load_placeholder]. */
  get_scene_instance_load_placeholder(): boolean

  /** Returns the [SceneTree] that contains this node. If this node is not inside the tree, generates an error and returns [code]null[/code]. See also [method is_inside_tree]. */
  get_tree(): SceneTree

  /**
   * Returns the tree as a [String]. Used mainly for debugging purposes. This version displays the path relative to the current node, and is good for copy/pasting into the [method get_node] function. It also can be used in game UI/UX.
   *
   * May print, for example:
   *
   * [codeblock lang=text]
   *
   * TheGame
   *
   * TheGame/Menu
   *
   * TheGame/Menu/Label
   *
   * TheGame/Menu/Camera2D
   *
   * TheGame/SplashScreen
   *
   * TheGame/SplashScreen/Camera2D
   *
   * @summary
   *
   *
   */
  get_tree_string(): string

  /**
   * Similar to [method get_tree_string], this returns the tree as a [String]. This version displays a more graphical representation similar to what is displayed in the Scene Dock. It is useful for inspecting larger trees.
   *
   * May print, for example:
   *
   * [codeblock lang=text]
   *
   *  ┖╴TheGame
   *
   *     ┠╴Menu
   *
   *     ┃  ┠╴Label
   *
   *     ┃  ┖╴Camera2D
   *
   *     ┖╴SplashScreen
   *
   *        ┖╴Camera2D
   *
   * @summary
   *
   *
   */
  get_tree_string_pretty(): string

  /** Returns the node's closest [Viewport] ancestor, if the node is inside the tree. Otherwise, returns [code]null[/code]. */
  get_viewport(): Viewport

  /** Returns the [Window] that contains this node. If the node is in the main window, this is equivalent to getting the root node ([code]get_tree().get_root()[/code]). */
  get_window(): Window

  /** Returns [code]true[/code] if the [param path] points to a valid node. See also [method get_node]. */
  has_node(path: NodePathType): boolean

  /** Returns [code]true[/code] if [param path] points to a valid node and its subnames point to a valid [Resource], e.g. [code]Area2D/CollisionShape2D:shape[/code]. Properties that are not [Resource] types (such as nodes or other [Variant] types) are not considered. See also [method get_node_and_resource]. */
  has_node_and_resource(path: NodePathType): boolean

  /** Returns [code]true[/code] if the given [param node] is a direct or indirect child of this node. */
  is_ancestor_of(node: Node): boolean

  /** Returns [code]true[/code] if the node is folded (collapsed) in the Scene dock. This method is intended to be used in editor plugins and tools. See also [method set_display_folded]. */
  is_displayed_folded(): boolean

  /** Returns [code]true[/code] if [param node] has editable children enabled relative to this node. This method is intended to be used in editor plugins and tools. See also [method set_editable_instance]. */
  is_editable_instance(node: Node): boolean

  /** Returns [code]true[/code] if the given [param node] occurs later in the scene hierarchy than this node. A node occurring later is usually processed last. */
  is_greater_than(node: Node): boolean

  /** Returns [code]true[/code] if this node has been added to the given [param group]. See [method add_to_group] and [method remove_from_group]. See also notes in the description, and the [SceneTree]'s group methods. */
  is_in_group(group: keyof Groups): boolean

  /** Returns [code]true[/code] if this node is currently inside a [SceneTree]. See also [method get_tree]. */
  is_inside_tree(): boolean

  /** Returns [code]true[/code] if the local system is the multiplayer authority of this node. */
  is_multiplayer_authority(): boolean

  /**
   * Returns `true` if the node is ready, i.e. it's inside scene tree and all its children are initialized.
   *
   * [method request_ready] resets it back to `false`.
   *
   */
  is_node_ready(): boolean

  /** Returns [code]true[/code] if the node is part of the scene currently opened in the editor. */
  is_part_of_edited_scene(): boolean

  /**
   * Returns `true` if physics interpolation is enabled for this node (see [member physics_interpolation_mode]).
   *
   * **Note:** Interpolation will only be active if both the flag is set **and** physics interpolation is enabled within the [SceneTree]. This can be tested using [method is_physics_interpolated_and_enabled].
   *
   */
  is_physics_interpolated(): boolean

  /**
   * Returns `true` if physics interpolation is enabled (see [member physics_interpolation_mode]) **and** enabled in the [SceneTree].
   *
   * This is a convenience version of [method is_physics_interpolated] that also checks whether physics interpolation is enabled globally.
   *
   * See [member SceneTree.physics_interpolation] and [member ProjectSettings.physics/common/physics_interpolation].
   *
   */
  is_physics_interpolated_and_enabled(): boolean

  /** Returns [code]true[/code] if physics processing is enabled (see [method set_physics_process]). */
  is_physics_processing(): boolean

  /** Returns [code]true[/code] if internal physics processing is enabled (see [method set_physics_process_internal]). */
  is_physics_processing_internal(): boolean

  /** Returns [code]true[/code] if processing is enabled (see [method set_process]). */
  is_processing(): boolean

  /** Returns [code]true[/code] if the node is processing input (see [method set_process_input]). */
  is_processing_input(): boolean

  /** Returns [code]true[/code] if internal processing is enabled (see [method set_process_internal]). */
  is_processing_internal(): boolean

  /** Returns [code]true[/code] if the node is processing shortcuts (see [method set_process_shortcut_input]). */
  is_processing_shortcut_input(): boolean

  /** Returns [code]true[/code] if the node is processing unhandled input (see [method set_process_unhandled_input]). */
  is_processing_unhandled_input(): boolean

  /** Returns [code]true[/code] if the node is processing unhandled key input (see [method set_process_unhandled_key_input]). */
  is_processing_unhandled_key_input(): boolean

  /**
   * Moves [param child_node] to the given index. A node's index is the order among its siblings. If [param to_index] is negative, the index is counted from the end of the list. See also [method get_child] and [method get_index].
   *
   * **Note:** The processing order of several engine callbacks ([method _ready], [method _process], etc.) and notifications sent through [method propagate_notification] is affected by tree order. [CanvasItem] nodes are also rendered in tree order. See also [member process_priority].
   *
   */
  move_child(child_node: Node, to_index: int): void

  /** Similar to [method call_deferred_thread_group], but for notifications. */
  notify_deferred_thread_group(what: int): void

  /** Similar to [method call_thread_safe], but for notifications. */
  notify_thread_safe(what: int): void

  /**
   * Prints all orphan nodes (nodes outside the [SceneTree]). Useful for debugging.
   *
   * **Note:** This method only works in debug builds. It does nothing in a project exported in release mode.
   *
   */
  static print_orphan_nodes(): void

  /**
   * Prints the node and its children to the console, recursively. The node does not have to be inside the tree. This method outputs [NodePath]s relative to this node, and is good for copy/pasting into [method get_node]. See also [method print_tree_pretty].
   *
   * May print, for example:
   *
   * [codeblock lang=text]
   *
   * .
   *
   * Menu
   *
   * Menu/Label
   *
   * Menu/Camera2D
   *
   * SplashScreen
   *
   * SplashScreen/Camera2D
   *
   * @summary
   *
   *
   */
  print_tree(): void

  /**
   * Prints the node and its children to the console, recursively. The node does not have to be inside the tree. Similar to [method print_tree], but the graphical representation looks like what is displayed in the editor's Scene dock. It is useful for inspecting larger trees.
   *
   * May print, for example:
   *
   * [codeblock lang=text]
   *
   *  ┖╴TheGame
   *
   *     ┠╴Menu
   *
   *     ┃  ┠╴Label
   *
   *     ┃  ┖╴Camera2D
   *
   *     ┖╴SplashScreen
   *
   *        ┖╴Camera2D
   *
   * @summary
   *
   *
   */
  print_tree_pretty(): void

  /**
   * Calls the given [param method] name, passing [param args] as arguments, on this node and all of its children, recursively.
   *
   * If [param parent_first] is `true`, the method is called on this node first, then on all of its children. If `false`, the children's methods are called first.
   *
   */
  propagate_call(method: StringName, args?: any[], parent_first?: boolean): void

  /** Calls [method Object.notification] with [param what] on this node and all of its children, recursively. */
  propagate_notification(what: int): void

  /** Queues an accessibility information update for this node. */
  queue_accessibility_update(): void

  /**
   * Queues this node to be deleted at the end of the current frame. When deleted, all of its children are deleted as well, and all references to the node and its children become invalid.
   *
   * Unlike with [method Object.free], the node is not deleted instantly, and it can still be accessed before deletion. It is also safe to call [method queue_free] multiple times. Use [method Object.is_queued_for_deletion] to check if the node will be deleted at the end of the frame.
   *
   * **Note:** The node will only be freed after all other deferred calls are finished. Using this method is not always the same as calling [method Object.free] through [method Object.call_deferred].
   *
   */
  queue_free(): void

  /**
   * Removes a child [param node]. The [param node], along with its children, are **not** deleted. To delete a node, see [method queue_free].
   *
   * **Note:** When this node is inside the tree, this method sets the [member owner] of the removed [param node] (or its descendants) to `null`, if their [member owner] is no longer an ancestor (see [method is_ancestor_of]).
   *
   */
  remove_child(node: Node): void

  /** Removes the node from the given [param group]. Does nothing if the node is not in the [param group]. See also notes in the description, and the [SceneTree]'s group methods. */
  remove_from_group(group: keyof Groups): void

  /**
   * Changes the parent of this [Node] to the [param new_parent]. The node needs to already have a parent. The node's [member owner] is preserved if its owner is still reachable from the new location (i.e., the node is still a descendant of the new parent after the operation).
   *
   * If [param keep_global_transform] is `true`, the node's global transform will be preserved if supported. [Node2D], [Node3D] and [Control] support this argument (but [Control] keeps only position).
   *
   */
  reparent(new_parent: Node, keep_global_transform?: boolean): void

  /**
   * Replaces this node by the given [param node]. All children of this node are moved to [param node].
   *
   * If [param keep_groups] is `true`, the [param node] is added to the same groups that the replaced node is in (see [method add_to_group]).
   *
   * **Warning:** The replaced node is removed from the tree, but it is **not** deleted. To prevent memory leaks, store a reference to the node in a variable, or use [method Object.free].
   *
   */
  replace_by(node: Node, keep_groups?: boolean): void

  /**
   * Requests [method _ready] to be called again the next time the node enters the tree. Does **not** immediately call [method _ready].
   *
   * **Note:** This method only affects the current node. If the node's children also need to request ready, this method needs to be called for each one of them. When the node and its children enter the tree again, the order of [method _ready] callbacks will be the same as normal.
   *
   */
  request_ready(): void

  /**
   * When physics interpolation is active, moving a node to a radically different transform (such as placement within a level) can result in a visible glitch as the object is rendered moving from the old to new position over the physics tick.
   *
   * That glitch can be prevented by calling this method, which temporarily disables interpolation until the physics tick is complete.
   *
   * The notification [constant NOTIFICATION_RESET_PHYSICS_INTERPOLATION] will be received by the node and all children recursively.
   *
   * **Note:** This function should be called **after** moving the node, rather than before.
   *
   */
  reset_physics_interpolation(): void

  /**
   * Changes the RPC configuration for the given [param method]. [param config] should either be `null` to disable the feature (as by default), or a [Dictionary] containing the following entries:
   *
   * - `rpc_mode`: see [enum MultiplayerAPI.RPCMode];
   *
   * - `transfer_mode`: see [enum MultiplayerPeer.TransferMode];
   *
   * - `call_local`: if `true`, the method will also be called locally;
   *
   * - `channel`: an [int] representing the channel to send the RPC on.
   *
   * **Note:** In GDScript, this method corresponds to the [annotation @GDScript.@rpc] annotation, with various parameters passed (`@rpc(any)`, `@rpc(authority)`...). See also the [url=$DOCS_URL/tutorials/networking/high_level_multiplayer.html]high-level multiplayer[/url] tutorial.
   *
   */
  rpc_config(method: StringName, config: any): void

  /** Similar to [method call_deferred_thread_group], but for setting properties. */
  set_deferred_thread_group(property: StringName, value: any): void

  /** If set to [code]true[/code], the node appears folded in the Scene dock. As a result, all of its children are hidden. This method is intended to be used in editor plugins and tools, but it also works in release builds. See also [method is_displayed_folded]. */
  set_display_folded(fold: boolean): void

  /** Set to [code]true[/code] to allow all nodes owned by [param node] to be available, and editable, in the Scene dock, even if their [member owner] is not the scene root. This method is intended to be used in editor plugins and tools, but it also works in release builds. See also [method is_editable_instance]. */
  set_editable_instance(node: Node, is_editable: boolean): void

  /**
   * Sets the node's multiplayer authority to the peer with the given peer [param id]. The multiplayer authority is the peer that has authority over the node on the network. Defaults to peer ID 1 (the server). Useful in conjunction with [method rpc_config] and the [MultiplayerAPI].
   *
   * If [param recursive] is `true`, the given peer is recursively set as the authority for all children of this node.
   *
   * **Warning:** This does **not** automatically replicate the new authority to other peers. It is the developer's responsibility to do so. You may replicate the new authority's information using [member MultiplayerSpawner.spawn_function], an RPC, or a [MultiplayerSynchronizer]. Furthermore, the parent's authority does **not** propagate to newly added children.
   *
   */
  set_multiplayer_authority(id: int, recursive?: boolean): void

  /**
   * If set to `true`, enables physics (fixed framerate) processing. When a node is being processed, it will receive a [constant NOTIFICATION_PHYSICS_PROCESS] at a fixed (usually 60 FPS, see [member Engine.physics_ticks_per_second] to change) interval (and the [method _physics_process] callback will be called if it exists).
   *
   * **Note:** If [method _physics_process] is overridden, this will be automatically enabled before [method _ready] is called.
   *
   */
  set_physics_process(enable: boolean): void

  /**
   * If set to `true`, enables internal physics for this node. Internal physics processing happens in isolation from the normal [method _physics_process] calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or physics processing is disabled for scripting ([method set_physics_process]).
   *
   * **Warning:** Built-in nodes rely on internal processing for their internal logic. Disabling it is unsafe and may lead to unexpected behavior. Use this method if you know what you are doing.
   *
   */
  set_physics_process_internal(enable: boolean): void

  /**
   * If set to `true`, enables processing. When a node is being processed, it will receive a [constant NOTIFICATION_PROCESS] on every drawn frame (and the [method _process] callback will be called if it exists).
   *
   * **Note:** If [method _process] is overridden, this will be automatically enabled before [method _ready] is called.
   *
   * **Note:** This method only affects the [method _process] callback, i.e. it has no effect on other callbacks like [method _physics_process]. If you want to disable all processing for the node, set [member process_mode] to [constant PROCESS_MODE_DISABLED].
   *
   */
  set_process(enable: boolean): void

  /**
   * If set to `true`, enables input processing.
   *
   * **Note:** If [method _input] is overridden, this will be automatically enabled before [method _ready] is called. Input processing is also already enabled for GUI controls, such as [Button] and [TextEdit].
   *
   */
  set_process_input(enable: boolean): void

  /**
   * If set to `true`, enables internal processing for this node. Internal processing happens in isolation from the normal [method _process] calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or processing is disabled for scripting ([method set_process]).
   *
   * **Warning:** Built-in nodes rely on internal processing for their internal logic. Disabling it is unsafe and may lead to unexpected behavior. Use this method if you know what you are doing.
   *
   */
  set_process_internal(enable: boolean): void

  /**
   * If set to `true`, enables shortcut processing for this node.
   *
   * **Note:** If [method _shortcut_input] is overridden, this will be automatically enabled before [method _ready] is called.
   *
   */
  set_process_shortcut_input(enable: boolean): void

  /**
   * If set to `true`, enables unhandled input processing. It enables the node to receive all input that was not previously handled (usually by a [Control]).
   *
   * **Note:** If [method _unhandled_input] is overridden, this will be automatically enabled before [method _ready] is called. Unhandled input processing is also already enabled for GUI controls, such as [Button] and [TextEdit].
   *
   */
  set_process_unhandled_input(enable: boolean): void

  /**
   * If set to `true`, enables unhandled key input processing.
   *
   * **Note:** If [method _unhandled_key_input] is overridden, this will be automatically enabled before [method _ready] is called.
   *
   */
  set_process_unhandled_key_input(enable: boolean): void

  /** If set to [code]true[/code], the node becomes an [InstancePlaceholder] when packed and instantiated from a [PackedScene]. See also [method get_scene_instance_load_placeholder]. */
  set_scene_instance_load_placeholder(load_placeholder: boolean): void

  /** Similar to [method call_thread_safe], but for setting properties. */
  set_thread_safe(property: StringName, value: any): void

  /**
   * Makes this node inherit the translation domain from its parent node. If this node has no parent, the main translation domain will be used.
   *
   * This is the default behavior for all nodes. Calling [method Object.set_translation_domain] disables this behavior.
   *
   */
  set_translation_domain_inherited(): void

  /** Refreshes the warnings displayed for this node in the Scene dock. Use [method _get_configuration_warnings] to customize the warning messages to display. */
  update_configuration_warnings(): void

  connect<T extends SignalsOf<Node>>(
    signal: T,
    method: SignalFunction<Node[T]>
  ): number

  /**
   * Notification received when the node enters a [SceneTree]. See [method _enter_tree].
   *
   * This notification is received **before** the related [signal tree_entered] signal.
   *
   */
  static NOTIFICATION_ENTER_TREE: any

  /**
   * Notification received when the node is about to exit a [SceneTree]. See [method _exit_tree].
   *
   * This notification is received **after** the related [signal tree_exiting] signal.
   *
   * This notification is sent in reversed order.
   *
   */
  static NOTIFICATION_EXIT_TREE: any

  /** No documentation provided. */
  static NOTIFICATION_MOVED_IN_PARENT: any

  /**
   * Notification received when the node is ready. See [method _ready].
   *
   */
  static NOTIFICATION_READY: any

  /**
   * Notification received when the node is paused. See [member process_mode].
   *
   */
  static NOTIFICATION_PAUSED: any

  /**
   * Notification received when the node is unpaused. See [member process_mode].
   *
   */
  static NOTIFICATION_UNPAUSED: any

  /**
   * Notification received from the tree every physics frame when [method is_physics_processing] returns `true`. See [method _physics_process].
   *
   */
  static NOTIFICATION_PHYSICS_PROCESS: any

  /**
   * Notification received from the tree every rendered frame when [method is_processing] returns `true`. See [method _process].
   *
   */
  static NOTIFICATION_PROCESS: any

  /**
   * Notification received when the node is set as a child of another node (see [method add_child] and [method add_sibling]).
   *
   * **Note:** This does **not** mean that the node entered the [SceneTree].
   *
   */
  static NOTIFICATION_PARENTED: any

  /**
   * Notification received when the parent node calls [method remove_child] on this node.
   *
   * **Note:** This does **not** mean that the node exited the [SceneTree].
   *
   */
  static NOTIFICATION_UNPARENTED: any

  /**
   * Notification received **only** by the newly instantiated scene root node, when [method PackedScene.instantiate] is completed.
   *
   */
  static NOTIFICATION_SCENE_INSTANTIATED: any

  /**
   * Notification received when a drag operation begins. All nodes receive this notification, not only the dragged one.
   *
   * Can be triggered either by dragging a [Control] that provides drag data (see [method Control._get_drag_data]) or using [method Control.force_drag].
   *
   * Use [method Viewport.gui_get_drag_data] to get the dragged data.
   *
   */
  static NOTIFICATION_DRAG_BEGIN: any

  /**
   * Notification received when a drag operation ends.
   *
   * Use [method Viewport.gui_is_drag_successful] to check if the drag succeeded.
   *
   */
  static NOTIFICATION_DRAG_END: any

  /**
   * Notification received when the node's [member name] or one of its ancestors' [member name] is changed. This notification is **not** received when the node is removed from the [SceneTree].
   *
   */
  static NOTIFICATION_PATH_RENAMED: any

  /**
   * Notification received when the list of children is changed. This happens when child nodes are added, moved or removed.
   *
   */
  static NOTIFICATION_CHILD_ORDER_CHANGED: any

  /**
   * Notification received from the tree every rendered frame when [method is_processing_internal] returns `true`.
   *
   */
  static NOTIFICATION_INTERNAL_PROCESS: any

  /**
   * Notification received from the tree every physics frame when [method is_physics_processing_internal] returns `true`.
   *
   */
  static NOTIFICATION_INTERNAL_PHYSICS_PROCESS: any

  /**
   * Notification received when the node enters the tree, just before [constant NOTIFICATION_READY] may be received. Unlike the latter, it is sent every time the node enters tree, not just once.
   *
   */
  static NOTIFICATION_POST_ENTER_TREE: any

  /**
   * Notification received when the node is disabled. See [constant PROCESS_MODE_DISABLED].
   *
   */
  static NOTIFICATION_DISABLED: any

  /**
   * Notification received when the node is enabled again after being disabled. See [constant PROCESS_MODE_DISABLED].
   *
   */
  static NOTIFICATION_ENABLED: any

  /**
   * Notification received when [method reset_physics_interpolation] is called on the node or its ancestors.
   *
   */
  static NOTIFICATION_RESET_PHYSICS_INTERPOLATION: any

  /**
   * Notification received right before the scene with the node is saved in the editor. This notification is only sent in the Godot editor and will not occur in exported projects.
   *
   */
  static NOTIFICATION_EDITOR_PRE_SAVE: any

  /**
   * Notification received right after the scene with the node is saved in the editor. This notification is only sent in the Godot editor and will not occur in exported projects.
   *
   */
  static NOTIFICATION_EDITOR_POST_SAVE: any

  /**
   * Notification received when the mouse enters the window.
   *
   * Implemented for embedded windows and on desktop and web platforms.
   *
   */
  static NOTIFICATION_WM_MOUSE_ENTER: any

  /**
   * Notification received when the mouse leaves the window.
   *
   * Implemented for embedded windows and on desktop and web platforms.
   *
   */
  static NOTIFICATION_WM_MOUSE_EXIT: any

  /**
   * Notification received from the OS when the node's [Window] ancestor is focused. This may be a change of focus between two windows of the same engine instance, or from the OS desktop or a third-party application to a window of the game (in which case [constant NOTIFICATION_APPLICATION_FOCUS_IN] is also received).
   *
   * A [Window] node receives this notification when it is focused.
   *
   */
  static NOTIFICATION_WM_WINDOW_FOCUS_IN: any

  /**
   * Notification received from the OS when the node's [Window] ancestor is defocused. This may be a change of focus between two windows of the same engine instance, or from a window of the game to the OS desktop or a third-party application (in which case [constant NOTIFICATION_APPLICATION_FOCUS_OUT] is also received).
   *
   * A [Window] node receives this notification when it is defocused.
   *
   */
  static NOTIFICATION_WM_WINDOW_FOCUS_OUT: any

  /**
   * Notification received from the OS when a close request is sent (e.g. closing the window with a "Close" button or [kbd]Alt + F4[/kbd]).
   *
   * Implemented on desktop platforms.
   *
   */
  static NOTIFICATION_WM_CLOSE_REQUEST: any

  /**
   * Notification received from the OS when a go back request is sent (e.g. pressing the "Back" button on Android).
   *
   * Implemented only on Android.
   *
   */
  static NOTIFICATION_WM_GO_BACK_REQUEST: any

  /**
   * Notification received when the window is resized.
   *
   * **Note:** Only the resized [Window] node receives this notification, and it's not propagated to the child nodes.
   *
   */
  static NOTIFICATION_WM_SIZE_CHANGED: any

  /**
   * Notification received from the OS when the screen's dots per inch (DPI) scale is changed. Only implemented on macOS.
   *
   */
  static NOTIFICATION_WM_DPI_CHANGE: any

  /**
   * Notification received when the mouse cursor enters the [Viewport]'s visible area, that is not occluded behind other [Control]s or [Window]s, provided its [member Viewport.gui_disable_input] is `false` and regardless if it's currently focused or not.
   *
   */
  static NOTIFICATION_VP_MOUSE_ENTER: any

  /**
   * Notification received when the mouse cursor leaves the [Viewport]'s visible area, that is not occluded behind other [Control]s or [Window]s, provided its [member Viewport.gui_disable_input] is `false` and regardless if it's currently focused or not.
   *
   */
  static NOTIFICATION_VP_MOUSE_EXIT: any

  /**
   * Notification received when the window is moved.
   *
   */
  static NOTIFICATION_WM_POSITION_CHANGED: any

  /**
   * Notification received from the OS when the application is exceeding its allocated memory.
   *
   * Implemented only on iOS.
   *
   */
  static NOTIFICATION_OS_MEMORY_WARNING: any

  /**
   * Notification received when translations may have changed. Can be triggered by the user changing the locale, changing [member auto_translate_mode] or when the node enters the scene tree. Can be used to respond to language changes, for example to change the UI strings on the fly. Useful when working with the built-in translation support, like [method Object.tr].
   *
   * **Note:** This notification is received alongside [constant NOTIFICATION_ENTER_TREE], so if you are instantiating a scene, the child nodes will not be initialized yet. You can use it to setup translations for this node, child nodes created from script, or if you want to access child nodes added in the editor, make sure the node is ready using [method is_node_ready].
   *
   * @example
   *
   * func _notification(what):
   * 	if what == NOTIFICATION_TRANSLATION_CHANGED:
   * 		if not is_node_ready():
   * 			await ready # Wait until ready signal.
   * 		$Label.text = atr("%d Bananas") % banana_counter
   * @summary
   *
   *
   */
  static NOTIFICATION_TRANSLATION_CHANGED: any

  /**
   * Notification received from the OS when a request for "About" information is sent.
   *
   * Implemented only on macOS.
   *
   */
  static NOTIFICATION_WM_ABOUT: any

  /**
   * Notification received from Godot's crash handler when the engine is about to crash.
   *
   * Implemented on desktop platforms, if the crash handler is enabled.
   *
   */
  static NOTIFICATION_CRASH: any

  /**
   * Notification received from the OS when an update of the Input Method Engine occurs (e.g. change of IME cursor position or composition string).
   *
   * Implemented on desktop and web platforms.
   *
   */
  static NOTIFICATION_OS_IME_UPDATE: any

  /**
   * Notification received from the OS when the application is resumed.
   *
   * Specific to the Android and iOS platforms.
   *
   */
  static NOTIFICATION_APPLICATION_RESUMED: any

  /**
   * Notification received from the OS when the application is paused.
   *
   * Specific to the Android and iOS platforms.
   *
   * **Note:** On iOS, you only have approximately 5 seconds to finish a task started by this signal. If you go over this allotment, iOS will kill the app instead of pausing it.
   *
   */
  static NOTIFICATION_APPLICATION_PAUSED: any

  /**
   * Notification received from the OS when the application is focused, i.e. when changing the focus from the OS desktop or a thirdparty application to any open window of the Godot instance.
   *
   * Implemented on desktop and mobile platforms.
   *
   */
  static NOTIFICATION_APPLICATION_FOCUS_IN: any

  /**
   * Notification received from the OS when the application is defocused, i.e. when changing the focus from any open window of the Godot instance to the OS desktop or a thirdparty application.
   *
   * Implemented on desktop and mobile platforms.
   *
   */
  static NOTIFICATION_APPLICATION_FOCUS_OUT: any

  /**
   * Notification received when the [TextServer] is changed.
   *
   */
  static NOTIFICATION_TEXT_SERVER_CHANGED: any

  /**
   * Notification received when an accessibility information update is required.
   *
   */
  static NOTIFICATION_ACCESSIBILITY_UPDATE: any

  /**
   * Notification received when accessibility elements are invalidated. All node accessibility elements are automatically deleted after receiving this message, therefore all existing references to such elements should be discarded.
   *
   */
  static NOTIFICATION_ACCESSIBILITY_INVALIDATE: any

  /**
   * Inherits [member process_mode] from the node's parent. This is the default for any newly created node.
   *
   */
  static PROCESS_MODE_INHERIT: any

  /**
   * Stops processing when [member SceneTree.paused] is `true`. This is the inverse of [constant PROCESS_MODE_WHEN_PAUSED], and the default for the root node.
   *
   */
  static PROCESS_MODE_PAUSABLE: any

  /**
   * Process **only** when [member SceneTree.paused] is `true`. This is the inverse of [constant PROCESS_MODE_PAUSABLE].
   *
   */
  static PROCESS_MODE_WHEN_PAUSED: any

  /**
   * Always process. Keeps processing, ignoring [member SceneTree.paused]. This is the inverse of [constant PROCESS_MODE_DISABLED].
   *
   */
  static PROCESS_MODE_ALWAYS: any

  /**
   * Never process. Completely disables processing, ignoring [member SceneTree.paused]. This is the inverse of [constant PROCESS_MODE_ALWAYS].
   *
   */
  static PROCESS_MODE_DISABLED: any

  /**
   * Process this node based on the thread group mode of the first parent (or grandparent) node that has a thread group mode that is not inherit. See [member process_thread_group] for more information.
   *
   */
  static PROCESS_THREAD_GROUP_INHERIT: any

  /**
   * Process this node (and child nodes set to inherit) on the main thread. See [member process_thread_group] for more information.
   *
   */
  static PROCESS_THREAD_GROUP_MAIN_THREAD: any

  /**
   * Process this node (and child nodes set to inherit) on a sub-thread. See [member process_thread_group] for more information.
   *
   */
  static PROCESS_THREAD_GROUP_SUB_THREAD: any

  /**
   * Allows this node to process threaded messages created with [method call_deferred_thread_group] right before [method _process] is called.
   *
   */
  static FLAG_PROCESS_THREAD_MESSAGES: any

  /**
   * Allows this node to process threaded messages created with [method call_deferred_thread_group] right before [method _physics_process] is called.
   *
   */
  static FLAG_PROCESS_THREAD_MESSAGES_PHYSICS: any

  /**
   * Allows this node to process threaded messages created with [method call_deferred_thread_group] right before either [method _process] or [method _physics_process] are called.
   *
   */
  static FLAG_PROCESS_THREAD_MESSAGES_ALL: any

  /**
   * Inherits [member physics_interpolation_mode] from the node's parent. This is the default for any newly created node.
   *
   */
  static PHYSICS_INTERPOLATION_MODE_INHERIT: any

  /**
   * Enables physics interpolation for this node and for children set to [constant PHYSICS_INTERPOLATION_MODE_INHERIT]. This is the default for the root node.
   *
   */
  static PHYSICS_INTERPOLATION_MODE_ON: any

  /**
   * Disables physics interpolation for this node and for children set to [constant PHYSICS_INTERPOLATION_MODE_INHERIT].
   *
   */
  static PHYSICS_INTERPOLATION_MODE_OFF: any

  /**
   * Duplicate the node's signal connections that are connected with the [constant Object.CONNECT_PERSIST] flag.
   *
   */
  static DUPLICATE_SIGNALS: any

  /**
   * Duplicate the node's groups.
   *
   */
  static DUPLICATE_GROUPS: any

  /**
   * Duplicate the node's script (also overriding the duplicated children's scripts, if combined with [constant DUPLICATE_USE_INSTANTIATION]).
   *
   */
  static DUPLICATE_SCRIPTS: any

  /**
   * Duplicate using [method PackedScene.instantiate]. If the node comes from a scene saved on disk, reuses [method PackedScene.instantiate] as the base for the duplicated node and its children.
   *
   */
  static DUPLICATE_USE_INSTANTIATION: any

  /**
   * Duplicate also non-serializable variables (i.e. without [constant @GlobalScope.PROPERTY_USAGE_STORAGE]).
   *
   */
  static DUPLICATE_INTERNAL_STATE: any

  /**
   * Duplicate using default flags. This constant is useful to add or remove a single flag.
   *
   * @example
   *
   * # Duplicate non-exported variables.
   * var dupe = duplicate(DUPLICATE_DEFAULT | DUPLICATE_INTERNAL_STATE)
   * @summary
   *
   *
   */
  static DUPLICATE_DEFAULT: any

  /**
   * The node will not be internal.
   *
   */
  static INTERNAL_MODE_DISABLED: any

  /**
   * The node will be placed at the beginning of the parent's children, before any non-internal sibling.
   *
   */
  static INTERNAL_MODE_FRONT: any

  /**
   * The node will be placed at the end of the parent's children, after any non-internal sibling.
   *
   */
  static INTERNAL_MODE_BACK: any

  /**
   * Inherits [member auto_translate_mode] from the node's parent. This is the default for any newly created node.
   *
   */
  static AUTO_TRANSLATE_MODE_INHERIT: any

  /**
   * Always automatically translate. This is the inverse of [constant AUTO_TRANSLATE_MODE_DISABLED], and the default for the root node.
   *
   */
  static AUTO_TRANSLATE_MODE_ALWAYS: any

  /**
   * Never automatically translate. This is the inverse of [constant AUTO_TRANSLATE_MODE_ALWAYS].
   *
   * String parsing for translation template generation will be skipped for this node and children that are set to [constant AUTO_TRANSLATE_MODE_INHERIT].
   *
   */
  static AUTO_TRANSLATE_MODE_DISABLED: any

  /**
   * Emitted when the child [param node] enters the [SceneTree], usually because this node entered the tree (see [signal tree_entered]), or [method add_child] has been called.
   *
   * This signal is emitted **after** the child node's own [constant NOTIFICATION_ENTER_TREE] and [signal tree_entered].
   *
   */
  $child_entered_tree: Signal<() => void>

  /**
   * Emitted when the child [param node] is about to exit the [SceneTree], usually because this node is exiting the tree (see [signal tree_exiting]), or because the child [param node] is being removed or freed.
   *
   * When this signal is received, the child [param node] is still accessible inside the tree. This signal is emitted **after** the child node's own [signal tree_exiting] and [constant NOTIFICATION_EXIT_TREE].
   *
   */
  $child_exiting_tree: Signal<() => void>

  /**
   * Emitted when the list of children is changed. This happens when child nodes are added, moved or removed.
   *
   */
  $child_order_changed: Signal<() => void>

  /**
   * Emitted when the node's editor description field changed.
   *
   */
  $editor_description_changed: Signal<() => void>

  /**
   * Emitted when an attribute of the node that is relevant to the editor is changed. Only emitted in the editor.
   *
   */
  $editor_state_changed: Signal<() => void>

  /**
   * Emitted when the node is considered ready, after [method _ready] is called.
   *
   */
  $ready: Signal<() => void>

  /**
   * Emitted when the node's [member name] is changed, if the node is inside the tree.
   *
   */
  $renamed: Signal<() => void>

  /**
   * Emitted when this node is being replaced by the [param node], see [method replace_by].
   *
   * This signal is emitted **after** [param node] has been added as a child of the original parent node, but **before** all original child nodes have been reparented to [param node].
   *
   */
  $replacing_by: Signal<() => void>

  /**
   * Emitted when the node enters the tree.
   *
   * This signal is emitted **after** the related [constant NOTIFICATION_ENTER_TREE] notification.
   *
   */
  $tree_entered: Signal<() => void>

  /**
   * Emitted after the node exits the tree and is no longer active.
   *
   * This signal is emitted **after** the related [constant NOTIFICATION_EXIT_TREE] notification.
   *
   */
  $tree_exited: Signal<() => void>

  /**
   * Emitted when the node is just about to exit the tree. The node is still valid. As such, this is the right place for de-initialization (or a "destructor", if you will).
   *
   * This signal is emitted **after** the node's [method _exit_tree], and **before** the related [constant NOTIFICATION_EXIT_TREE].
   *
   */
  $tree_exiting: Signal<() => void>
}
