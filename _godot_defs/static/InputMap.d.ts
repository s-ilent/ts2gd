/**
 * Manages all [InputEventAction] which can be created/modified from the project settings menu **Project > Project Settings > Input Map** or in code with [method add_action] and [method action_add_event]. See [method Node._input].
 *
 */
declare class InputMapClass extends Object {
  /**
   * Manages all [InputEventAction] which can be created/modified from the project settings menu **Project > Project Settings > Input Map** or in code with [method add_action] and [method action_add_event]. See [method Node._input].
   *
   */
  new(): InputMapClass
  constructor()
  static new(): InputMapClass

  /** Adds an [InputEvent] to an action. This [InputEvent] will trigger the action. */
  action_add_event(action: Action, event: InputEvent): void

  /** Removes an [InputEvent] from an action. */
  action_erase_event(action: Action, event: InputEvent): void

  /** Removes all events from an action. */
  action_erase_events(action: Action): void

  /** Returns a deadzone value for the action. */
  action_get_deadzone(action: Action): float

  /**
   * Returns an array of [InputEvent]s associated with a given action.
   *
   * **Note:** When used in the editor (e.g. a tool script or [EditorPlugin]), this method will return events for the editor action. If you want to access your project's input binds from the editor, read the `input/*` settings from [ProjectSettings].
   *
   */
  action_get_events(action: Action): InputEvent[]

  /** Returns [code]true[/code] if the action has the given [InputEvent] associated with it. */
  action_has_event(action: Action, event: InputEvent): boolean

  /** Sets a deadzone value for the action. */
  action_set_deadzone(action: Action, deadzone: float): void

  /**
   * Adds an empty action to the [InputMap] with a configurable [param deadzone].
   *
   * An [InputEvent] can then be added to this action with [method action_add_event].
   *
   */
  add_action(action: Action, deadzone?: float): void

  /** Removes an action from the [InputMap]. */
  erase_action(action: Action): void

  /**
   * Returns `true` if the given event is part of an existing action. This method ignores keyboard modifiers if the given [InputEvent] is not pressed (for proper release detection). See [method action_has_event] if you don't want this behavior.
   *
   * If [param exact_match] is `false`, it ignores additional input modifiers for [InputEventKey] and [InputEventMouseButton] events, and the direction for [InputEventJoypadMotion] events.
   *
   */
  event_is_action(
    event: InputEvent,
    action: Action,
    exact_match?: boolean
  ): boolean

  /** Returns the human-readable description of the given action. */
  get_action_description(action: Action): string

  /** Returns an array of all actions in the [InputMap]. */
  get_actions(): StringName[]

  /** Returns [code]true[/code] if the [InputMap] has a registered action with the given name. */
  has_action(action: Action): boolean

  /** Clears all [InputEventAction] in the [InputMap] and load it anew from [ProjectSettings]. */
  load_from_project_settings(): void

  connect<T extends SignalsOf<InputMapClass>>(
    signal: T,
    method: SignalFunction<InputMapClass[T]>
  ): number
}
