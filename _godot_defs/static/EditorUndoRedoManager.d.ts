/**
 * [EditorUndoRedoManager] is a manager for [UndoRedo] objects associated with edited scenes. Each scene has its own undo history and [EditorUndoRedoManager] ensures that each action performed in the editor gets associated with a proper scene. For actions not related to scenes ([ProjectSettings] edits, external resources, etc.), a separate global history is used.
 *
 * The usage is mostly the same as [UndoRedo]. You create and commit actions and the manager automatically decides under-the-hood what scenes it belongs to. The scene is deduced based on the first operation in an action, using the object from the operation. The rules are as follows:
 *
 * - If the object is a [Node], use the currently edited scene;
 *
 * - If the object is a built-in resource, use the scene from its path;
 *
 * - If the object is external resource or anything else, use global history.
 *
 * This guessing can sometimes yield false results, so you can provide a custom context object when creating an action.
 *
 * [EditorUndoRedoManager] is intended to be used by Godot editor plugins. You can obtain it using [method EditorPlugin.get_undo_redo]. For non-editor uses or plugins that don't need to integrate with the editor's undo history, use [UndoRedo] instead.
 *
 * The manager's API is mostly the same as in [UndoRedo], so you can refer to its documentation for more examples. The main difference is that [EditorUndoRedoManager] uses object + method name for actions, instead of [Callable].
 *
 */
declare class EditorUndoRedoManager extends Object {
  /**
   * [EditorUndoRedoManager] is a manager for [UndoRedo] objects associated with edited scenes. Each scene has its own undo history and [EditorUndoRedoManager] ensures that each action performed in the editor gets associated with a proper scene. For actions not related to scenes ([ProjectSettings] edits, external resources, etc.), a separate global history is used.
   *
   * The usage is mostly the same as [UndoRedo]. You create and commit actions and the manager automatically decides under-the-hood what scenes it belongs to. The scene is deduced based on the first operation in an action, using the object from the operation. The rules are as follows:
   *
   * - If the object is a [Node], use the currently edited scene;
   *
   * - If the object is a built-in resource, use the scene from its path;
   *
   * - If the object is external resource or anything else, use global history.
   *
   * This guessing can sometimes yield false results, so you can provide a custom context object when creating an action.
   *
   * [EditorUndoRedoManager] is intended to be used by Godot editor plugins. You can obtain it using [method EditorPlugin.get_undo_redo]. For non-editor uses or plugins that don't need to integrate with the editor's undo history, use [UndoRedo] instead.
   *
   * The manager's API is mostly the same as in [UndoRedo], so you can refer to its documentation for more examples. The main difference is that [EditorUndoRedoManager] uses object + method name for actions, instead of [Callable].
   *
   */
  new(): EditorUndoRedoManager
  constructor()
  static new(): EditorUndoRedoManager

  /**
   * Register a method that will be called when the action is committed (i.e. the "do" action).
   *
   * If this is the first operation, the [param object] will be used to deduce target undo history.
   *
   */
  add_do_method(object: Object, method: StringName, ...args: any[]): void

  /**
   * Register a property value change for "do".
   *
   * If this is the first operation, the [param object] will be used to deduce target undo history.
   *
   */
  add_do_property(object: Object, property: StringName, value: any): void

  /** Register a reference for "do" that will be erased if the "do" history is lost. This is useful mostly for new nodes created for the "do" call. Do not use for resources. */
  add_do_reference(object: Object): void

  /**
   * Register a method that will be called when the action is undone (i.e. the "undo" action).
   *
   * If this is the first operation, the [param object] will be used to deduce target undo history.
   *
   */
  add_undo_method(object: Object, method: StringName, ...args: any[]): void

  /**
   * Register a property value change for "undo".
   *
   * If this is the first operation, the [param object] will be used to deduce target undo history.
   *
   */
  add_undo_property(object: Object, property: StringName, value: any): void

  /** Register a reference for "undo" that will be erased if the "undo" history is lost. This is useful mostly for nodes removed with the "do" call (not the "undo" call!). */
  add_undo_reference(object: Object): void

  /**
   * Clears the given undo history. You can clear history for a specific scene, global history, or for all histories at once (except [constant REMOTE_HISTORY]) if [param id] is [constant INVALID_HISTORY].
   *
   * If [param increase_version] is `true`, the undo history version will be increased, marking it as unsaved. Useful for operations that modify the scene, but don't support undo.
   *
   * @example
   *
   * var scene_root = EditorInterface.get_edited_scene_root()
   * var undo_redo = EditorInterface.get_editor_undo_redo()
   * undo_redo.clear_history(undo_redo.get_object_history_id(scene_root))
   * @summary
   *
   *
   * **Note:** If you want to mark an edited scene as unsaved without clearing its history, use [method EditorInterface.mark_scene_as_unsaved] instead.
   *
   */
  clear_history(id?: int, increase_version?: boolean): void

  /** Commits the action. If [param execute] is [code]true[/code] (default), all "do" methods/properties are called/set when this function is called. */
  commit_action(execute?: boolean): void

  /**
   * Create a new action. After this is called, do all your calls to [method add_do_method], [method add_undo_method], [method add_do_property], and [method add_undo_property], then commit the action with [method commit_action].
   *
   * The way actions are merged is dictated by the [param merge_mode] argument.
   *
   * If [param custom_context] object is provided, it will be used for deducing target history (instead of using the first operation).
   *
   * The way undo operation are ordered in actions is dictated by [param backward_undo_ops]. When [param backward_undo_ops] is `false` undo option are ordered in the same order they were added. Which means the first operation to be added will be the first to be undone.
   *
   * If [param mark_unsaved] is `false`, the action will not mark the history as unsaved. This is useful for example for actions that change a selection, or a setting that will be saved automatically. Otherwise, this should be left to `true` if the action requires saving by the user or if it can cause data loss when left unsaved.
   *
   */
  create_action(
    name: string,
    merge_mode?: int,
    custom_context?: Object,
    backward_undo_ops?: boolean,
    mark_unsaved?: boolean
  ): void

  /**
   * Forces the next operation (e.g. [method add_do_method]) to use the action's history rather than guessing it from the object. This is sometimes needed when a history can't be correctly determined, like for a nested resource that doesn't have a path yet.
   *
   * This method should only be used when absolutely necessary, otherwise it might cause invalid history state. For most of complex cases, the `custom_context` parameter of [method create_action] is sufficient.
   *
   */
  force_fixed_history(): void

  /**
   * Returns the [UndoRedo] object associated with the given history [param id].
   *
   * [param id] above `0` are mapped to the opened scene tabs (but it doesn't match their order). [param id] of `0` or lower have special meaning (see [enum SpecialHistory]).
   *
   * Best used with [method get_object_history_id]. This method is only provided in case you need some more advanced methods of [UndoRedo] (but keep in mind that directly operating on the [UndoRedo] object might affect editor's stability).
   *
   */
  get_history_undo_redo(id: int): UndoRedo

  /** Returns the history ID deduced from the given [param object]. It can be used with [method get_history_undo_redo]. */
  get_object_history_id(object: Object): int

  /** Returns [code]true[/code] if the [EditorUndoRedoManager] is currently committing the action, i.e. running its "do" method or property change (see [method commit_action]). */
  is_committing_action(): boolean

  connect<T extends SignalsOf<EditorUndoRedoManager>>(
    signal: T,
    method: SignalFunction<EditorUndoRedoManager[T]>
  ): number

  /**
   * Global history not associated with any scene, but with external resources etc.
   *
   */
  static GLOBAL_HISTORY: any

  /**
   * History associated with remote inspector. Used when live editing a running project.
   *
   */
  static REMOTE_HISTORY: any

  /**
   * Invalid "null" history. It's a special value, not associated with any object.
   *
   */
  static INVALID_HISTORY: any

  /**
   * Emitted when the list of actions in any history has changed, either when an action is committed or a history is cleared.
   *
   */
  $history_changed: Signal<() => void>

  /**
   * Emitted when the version of any history has changed as a result of undo or redo call.
   *
   */
  $version_changed: Signal<() => void>
}
