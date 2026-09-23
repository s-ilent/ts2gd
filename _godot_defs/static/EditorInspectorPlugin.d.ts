/**
 * [EditorInspectorPlugin] allows adding custom property editors to [EditorInspector].
 *
 * When an object is edited, the [method _can_handle] function is called and must return `true` if the object type is supported.
 *
 * If supported, the function [method _parse_begin] will be called, allowing to place custom controls at the beginning of the class.
 *
 * Subsequently, the [method _parse_category] and [method _parse_property] are called for every category and property. They offer the ability to add custom controls to the inspector too.
 *
 * Finally, [method _parse_end] will be called.
 *
 * On each of these calls, the "add" functions can be called.
 *
 * To use [EditorInspectorPlugin], register it using the [method EditorPlugin.add_inspector_plugin] method first.
 *
 */
declare class EditorInspectorPlugin extends RefCounted {
  /**
   * [EditorInspectorPlugin] allows adding custom property editors to [EditorInspector].
   *
   * When an object is edited, the [method _can_handle] function is called and must return `true` if the object type is supported.
   *
   * If supported, the function [method _parse_begin] will be called, allowing to place custom controls at the beginning of the class.
   *
   * Subsequently, the [method _parse_category] and [method _parse_property] are called for every category and property. They offer the ability to add custom controls to the inspector too.
   *
   * Finally, [method _parse_end] will be called.
   *
   * On each of these calls, the "add" functions can be called.
   *
   * To use [EditorInspectorPlugin], register it using the [method EditorPlugin.add_inspector_plugin] method first.
   *
   */
  new(): EditorInspectorPlugin
  constructor()
  static new(): EditorInspectorPlugin

  /** Returns [code]true[/code] if this object can be handled by this plugin. */
  protected _can_handle(object: Object): boolean

  /** Called to allow adding controls at the beginning of the property list for [param object]. */
  protected _parse_begin(object: Object): void

  /** Called to allow adding controls at the beginning of a category in the property list for [param object]. */
  protected _parse_category(object: Object, category: string): void

  /** Called to allow adding controls at the end of the property list for [param object]. */
  protected _parse_end(object: Object): void

  /** Called to allow adding controls at the beginning of a group or a sub-group in the property list for [param object]. */
  protected _parse_group(object: Object, group: string): void

  /** Called to allow adding property-specific editors to the property list for [param object]. The added editor control must extend [EditorProperty]. Returning [code]true[/code] removes the built-in editor for this property, otherwise allows to insert a custom editor before the built-in one. */
  protected _parse_property(
    object: Object,
    type: int,
    name: string,
    hint_type: int,
    hint_string: string,
    usage_flags: int,
    wide: boolean
  ): boolean

  /** Adds a custom control, which is not necessarily a property editor. */
  add_custom_control(control: Control): void

  /**
   * Adds a property editor for an individual property. The [param editor] control must extend [EditorProperty].
   *
   * There can be multiple property editors for a property. If [param add_to_end] is `true`, this newly added editor will be displayed after all the other editors of the property whose [param add_to_end] is `false`. For example, the editor uses this parameter to add an "Edit Region" button for [member Sprite2D.region_rect] below the regular [Rect2] editor.
   *
   * [param label] can be used to choose a custom label for the property editor in the inspector. If left empty, the label is computed from the name of the property instead.
   *
   */
  add_property_editor(
    property: string,
    editor: Control,
    add_to_end?: boolean,
    label?: string
  ): void

  /** Adds an editor that allows modifying multiple properties. The [param editor] control must extend [EditorProperty]. */
  add_property_editor_for_multiple_properties(
    label: string,
    properties: PackedStringArray,
    editor: Control
  ): void

  connect<T extends SignalsOf<EditorInspectorPlugin>>(
    signal: T,
    method: SignalFunction<EditorInspectorPlugin[T]>
  ): number
}
