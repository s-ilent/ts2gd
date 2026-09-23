/**
 * [DisplayServer] handles everything related to window management. It is separated from [OS] as a single operating system may support multiple display servers.
 *
 * **Headless mode:** Starting the engine with the `--headless` [url=$DOCS_URL/tutorials/editor/command_line_tutorial.html]command line argument[/url] disables all rendering and window management functions. Most functions from [DisplayServer] will return dummy values in this case.
 *
 */
declare class DisplayServerClass extends Object {
  /**
   * [DisplayServer] handles everything related to window management. It is separated from [OS] as a single operating system may support multiple display servers.
   *
   * **Headless mode:** Starting the engine with the `--headless` [url=$DOCS_URL/tutorials/editor/command_line_tutorial.html]command line argument[/url] disables all rendering and window management functions. Most functions from [DisplayServer] will return dummy values in this case.
   *
   */
  new(): DisplayServerClass
  constructor()
  static new(): DisplayServerClass

  /**
   * Creates a new, empty accessibility element resource.
   *
   * **Note:** An accessibility element is created and freed automatically for each [Node]. In general, this function should not be called manually.
   *
   */
  accessibility_create_element(window_id: int, role: int): RID

  /** Creates a new, empty accessibility sub-element resource. Sub-elements can be used to provide accessibility information for objects which are not [Node]s, such as list items, table cells, or menu items. Sub-elements are freed automatically when the parent element is freed, or can be freed early using the [method accessibility_free_element] method. */
  accessibility_create_sub_element(
    parent_rid: RID,
    role: int,
    insert_pos?: int
  ): RID

  /**
   * Creates a new, empty accessibility sub-element from the shaped text buffer. Sub-elements are freed automatically when the parent element is freed, or can be freed early using the [method accessibility_free_element] method.
   *
   * If [param is_last_line] is `true`, no trailing newline is appended to the text content. Set to `true` for the last line in multi-line text fields and for single-line text fields.
   *
   */
  accessibility_create_sub_text_edit_elements(
    parent_rid: RID,
    shaped_text: RID,
    min_height: float,
    insert_pos?: int,
    is_last_line?: boolean
  ): RID

  /** Returns the metadata of the accessibility element [param id]. */
  accessibility_element_get_meta(id: RID): any

  /** Sets the metadata of the accessibility element [param id] to [param meta]. */
  accessibility_element_set_meta(id: RID, meta: any): void

  /** Frees the accessibility element [param id] created by [method accessibility_create_element], [method accessibility_create_sub_element], or [method accessibility_create_sub_text_edit_elements]. */
  accessibility_free_element(id: RID): void

  /** Returns the main accessibility element of the OS native window. */
  accessibility_get_window_root(window_id: int): RID

  /** Returns [code]true[/code] if [param id] is a valid accessibility element. */
  accessibility_has_element(id: RID): boolean

  /**
   * Returns `1` if a screen reader, Braille display or other assistive app is active, `0` otherwise. Returns `-1` if status is unknown.
   *
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   *
   * **Note:** Accessibility debugging tools, such as Accessibility Insights for Windows, Accessibility Inspector (macOS), or AT-SPI Browser (Linux/BSD), do not count as assistive apps and will not affect this value. To test your project with these tools, set [member ProjectSettings.accessibility/general/accessibility_support] to `1`.
   *
   */
  accessibility_screen_reader_active(): int

  /**
   * Sets the window focused state for assistive apps.
   *
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   *
   * **Note:** Advanced users only! [Window] objects call this method automatically.
   *
   */
  accessibility_set_window_focused(window_id: int, focused: boolean): void

  /**
   * Sets window outer (with decorations) and inner (without decorations) bounds for assistive apps.
   *
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   *
   * **Note:** Advanced users only! [Window] objects call this method automatically.
   *
   */
  accessibility_set_window_rect(
    window_id: int,
    rect_out: Rect2,
    rect_in: Rect2
  ): void

  /**
   * Returns `1` if a high-contrast user interface theme should be used, `0` otherwise. Returns `-1` if status is unknown.
   *
   * **Note:** This method is implemented on Linux (X11/Wayland, GNOME), macOS, and Windows.
   *
   */
  accessibility_should_increase_contrast(): int

  /**
   * Returns `1` if flashing, blinking, and other moving content that can cause seizures in users with photosensitive epilepsy should be disabled, `0` otherwise. Returns `-1` if status is unknown.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  accessibility_should_reduce_animation(): int

  /**
   * Returns `1` if background images, transparency, and other features that can reduce the contrast between the foreground and background should be disabled, `0` otherwise. Returns `-1` if status is unknown.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  accessibility_should_reduce_transparency(): int

  /** Adds a callback for the accessibility action (action which can be performed by using a special screen reader command or buttons on the Braille display), and marks this action as supported. The action callback receives one [Variant] argument, which value depends on action type. */
  accessibility_update_add_action(
    id: RID,
    action: int,
    callable: Callable
  ): void

  /**
   * Adds a child accessibility element.
   *
   * **Note:** [Node] children and sub-elements are added to the child list automatically.
   *
   */
  accessibility_update_add_child(id: RID, child_id: RID): void

  /** Adds support for a custom accessibility action. [param action_id] is passed as an argument to the callback of [constant ACTION_CUSTOM] action. */
  accessibility_update_add_custom_action(
    id: RID,
    action_id: int,
    action_description: string
  ): void

  /** Adds an element that is controlled by this element. */
  accessibility_update_add_related_controls(id: RID, related_id: RID): void

  /** Adds an element that describes this element. */
  accessibility_update_add_related_described_by(id: RID, related_id: RID): void

  /** Adds an element that details this element. */
  accessibility_update_add_related_details(id: RID, related_id: RID): void

  /** Adds an element that this element flow into. */
  accessibility_update_add_related_flow_to(id: RID, related_id: RID): void

  /** Adds an element that labels this element. */
  accessibility_update_add_related_labeled_by(id: RID, related_id: RID): void

  /**
   * Adds an element that is part of the same radio group.
   *
   * **Note:** This method should be called on each element of the group, using all other elements as [param related_id].
   *
   */
  accessibility_update_add_related_radio_group(id: RID, related_id: RID): void

  /** Adds an element that is an active descendant of this element. */
  accessibility_update_set_active_descendant(id: RID, other_id: RID): void

  /** Sets element background color. */
  accessibility_update_set_background_color(id: RID, color: Color): void

  /** Sets element bounding box, relative to the node position. */
  accessibility_update_set_bounds(id: RID, p_rect: Rect2): void

  /** Sets element checked state. */
  accessibility_update_set_checked(id: RID, checekd: boolean): void

  /** Sets element class name. */
  accessibility_update_set_classname(id: RID, classname: string): void

  /** Sets element color value. */
  accessibility_update_set_color_value(id: RID, color: Color): void

  /** Sets element accessibility description. */
  accessibility_update_set_description(id: RID, description: string): void

  /** Sets an element which contains an error message for this element. */
  accessibility_update_set_error_message(id: RID, other_id: RID): void

  /** Sets element accessibility extra information added to the element name. */
  accessibility_update_set_extra_info(id: RID, name: string): void

  /** Sets element flag. */
  accessibility_update_set_flag(id: RID, flag: int, value: boolean): void

  /** Sets currently focused element. */
  accessibility_update_set_focus(id: RID): void

  /** Sets element foreground color. */
  accessibility_update_set_foreground_color(id: RID, color: Color): void

  /** Sets target element for the link. */
  accessibility_update_set_in_page_link_target(id: RID, other_id: RID): void

  /** Sets element text language. */
  accessibility_update_set_language(id: RID, language: string): void

  /** Sets number of items in the list. */
  accessibility_update_set_list_item_count(id: RID, size: int): void

  /** Sets list/tree item expanded status. */
  accessibility_update_set_list_item_expanded(id: RID, expanded: boolean): void

  /** Sets the position of the element in the list. */
  accessibility_update_set_list_item_index(id: RID, index: int): void

  /** Sets the hierarchical level of the element in the list. */
  accessibility_update_set_list_item_level(id: RID, level: int): void

  /** Sets list/tree item selected status. */
  accessibility_update_set_list_item_selected(id: RID, selected: boolean): void

  /** Sets the orientation of the list elements. */
  accessibility_update_set_list_orientation(id: RID, vertical: boolean): void

  /** Sets the priority of the live region updates. */
  accessibility_update_set_live(id: RID, live: int): void

  /** Sets the element to be a member of the group. */
  accessibility_update_set_member_of(id: RID, group_id: RID): void

  /** Sets element accessibility name. */
  accessibility_update_set_name(id: RID, name: string): void

  /** Sets next element on the line. */
  accessibility_update_set_next_on_line(id: RID, other_id: RID): void

  /** Sets numeric value jump. */
  accessibility_update_set_num_jump(id: RID, jump: float): void

  /** Sets numeric value range. */
  accessibility_update_set_num_range(id: RID, min: float, max: float): void

  /** Sets numeric value step. */
  accessibility_update_set_num_step(id: RID, step: float): void

  /** Sets numeric value. */
  accessibility_update_set_num_value(id: RID, position: float): void

  /** Sets placeholder text. */
  accessibility_update_set_placeholder(id: RID, placeholder: string): void

  /** Sets popup type for popup buttons. */
  accessibility_update_set_popup_type(id: RID, popup: int): void

  /** Sets previous element on the line. */
  accessibility_update_set_previous_on_line(id: RID, other_id: RID): void

  /** Sets element accessibility role. */
  accessibility_update_set_role(id: RID, role: int): void

  /** Sets element accessibility role description text. */
  accessibility_update_set_role_description(id: RID, description: string): void

  /** Sets scroll bar x position. */
  accessibility_update_set_scroll_x(id: RID, position: float): void

  /** Sets scroll bar x range. */
  accessibility_update_set_scroll_x_range(id: RID, min: float, max: float): void

  /** Sets scroll bar y position. */
  accessibility_update_set_scroll_y(id: RID, position: float): void

  /** Sets scroll bar y range. */
  accessibility_update_set_scroll_y_range(id: RID, min: float, max: float): void

  /** Sets the list of keyboard shortcuts used by element. */
  accessibility_update_set_shortcut(id: RID, shortcut: string): void

  /** Sets human-readable description of the current checked state. */
  accessibility_update_set_state_description(id: RID, description: string): void

  /** Sets cell position in the table. */
  accessibility_update_set_table_cell_position(
    id: RID,
    row_index: int,
    column_index: int
  ): void

  /** Sets cell row/column span. */
  accessibility_update_set_table_cell_span(
    id: RID,
    row_span: int,
    column_span: int
  ): void

  /** Sets number of columns in the table. */
  accessibility_update_set_table_column_count(id: RID, count: int): void

  /** Sets position of the column. */
  accessibility_update_set_table_column_index(id: RID, index: int): void

  /** Sets number of rows in the table. */
  accessibility_update_set_table_row_count(id: RID, count: int): void

  /** Sets position of the row in the table. */
  accessibility_update_set_table_row_index(id: RID, index: int): void

  /** Sets element text alignment. */
  accessibility_update_set_text_align(id: RID, align: int): void

  /** Sets text underline/overline/strikethrough. */
  accessibility_update_set_text_decorations(
    id: RID,
    underline: boolean,
    strikethrough: boolean,
    overline: boolean
  ): void

  /** Sets text orientation. */
  accessibility_update_set_text_orientation(id: RID, vertical: boolean): void

  /** Sets text selection to the text field. [param text_start_id] and [param text_end_id] should be elements created by [method accessibility_create_sub_text_edit_elements]. Character offsets are relative to the corresponding element. */
  accessibility_update_set_text_selection(
    id: RID,
    text_start_id: RID,
    start_char: int,
    text_end_id: RID,
    end_char: int
  ): void

  /** Sets tooltip text. */
  accessibility_update_set_tooltip(id: RID, tooltip: string): void

  /** Sets element 2D transform. */
  accessibility_update_set_transform(id: RID, transform: Transform2D): void

  /** Sets link URL. */
  accessibility_update_set_url(id: RID, url: string): void

  /** Sets element text value. */
  accessibility_update_set_value(id: RID, value: string): void

  /**
   * Plays the beep sound from the operative system, if possible. Because it comes from the OS, the beep sound will be audible even if the application is muted. It may also be disabled for the entire OS by the user.
   *
   * **Note:** This method is implemented on macOS, Linux (X11/Wayland), and Windows.
   *
   */
  beep(): void

  /** Returns the user's clipboard as a string if possible. */
  clipboard_get(): string

  /**
   * Returns the user's clipboard as an image if possible.
   *
   * **Note:** This method uses the copied pixel data, e.g. from an image editing software or a web browser, not an image file copied from file explorer.
   *
   */
  clipboard_get_image(): Image

  /**
   * Returns the user's [url=https://unix.stackexchange.com/questions/139191/whats-the-difference-between-primary-selection-and-clipboard-buffer]primary[/url] clipboard as a string if possible. This is the clipboard that is set when the user selects text in any application, rather than when pressing [kbd]Ctrl + C[/kbd]. The clipboard data can then be pasted by clicking the middle mouse button in any application that supports the primary clipboard mechanism.
   *
   * **Note:** This method is only implemented on Linux (X11/Wayland).
   *
   */
  clipboard_get_primary(): string

  /** Returns [code]true[/code] if there is a text content on the user's clipboard. */
  clipboard_has(): boolean

  /** Returns [code]true[/code] if there is an image content on the user's clipboard. */
  clipboard_has_image(): boolean

  /** Sets the user's clipboard content to the given string. */
  clipboard_set(clipboard: string): void

  /**
   * Sets the user's [url=https://unix.stackexchange.com/questions/139191/whats-the-difference-between-primary-selection-and-clipboard-buffer]primary[/url] clipboard content to the given string. This is the clipboard that is set when the user selects text in any application, rather than when pressing [kbd]Ctrl + C[/kbd]. The clipboard data can then be pasted by clicking the middle mouse button in any application that supports the primary clipboard mechanism.
   *
   * **Note:** This method is only implemented on Linux (X11/Wayland).
   *
   */
  clipboard_set_primary(clipboard_primary: string): void

  /**
   * Displays OS native color picker.
   *
   * Callbacks have the following arguments: `status: bool, color: Color`.
   *
   * **Note:** This method is implemented if the display server has the [constant FEATURE_NATIVE_COLOR_PICKER] feature.
   *
   * **Note:** This method is only implemented on Linux (X11/Wayland).
   *
   */
  color_picker(callback: Callable): boolean

  /**
   * Creates a new application status indicator with the specified icon, tooltip, and activation callback.
   *
   * [param callback] should take two arguments: the pressed mouse button (one of the [enum MouseButton] constants) and the click position in screen coordinates (a [Vector2i]).
   *
   */
  create_status_indicator(
    icon: Texture2D,
    tooltip: string,
    callback: Callable
  ): int

  /** Returns the default mouse cursor shape set by [method cursor_set_shape]. */
  cursor_get_shape(): int

  /**
   * Sets a custom mouse cursor image for the given [param shape]. This means the user's operating system and mouse cursor theme will no longer influence the mouse cursor's appearance.
   *
   * [param cursor] can be either a [Texture2D] or an [Image], and it should not be larger than 256×256 to display correctly. Optionally, [param hotspot] can be set to offset the image's position relative to the click point. By default, [param hotspot] is set to the top-left corner of the image. See also [method cursor_set_shape].
   *
   */
  cursor_set_custom_image(
    cursor: Resource,
    shape?: int,
    hotspot?: Vector2
  ): void

  /** Sets the default mouse cursor shape. The cursor's appearance will vary depending on the user's operating system and mouse cursor theme. See also [method cursor_get_shape] and [method cursor_set_custom_image]. */
  cursor_set_shape(shape: int): void

  /** Removes the application status indicator. */
  delete_status_indicator(id: int): void

  /**
   * Shows a text input dialog which uses the operating system's native look-and-feel. [param callback] should accept a single [String] parameter which contains the text field's contents.
   *
   * **Note:** This method is implemented if the display server has the [constant FEATURE_NATIVE_DIALOG_INPUT] feature. Supported platforms include macOS, Windows, and Android.
   *
   */
  dialog_input_text(
    title: string,
    description: string,
    existing_text: string,
    callback: Callable
  ): int

  /**
   * Shows a text dialog which uses the operating system's native look-and-feel. [param callback] should accept a single [int] parameter which corresponds to the index of the pressed button.
   *
   * **Note:** This method is implemented if the display server has the [constant FEATURE_NATIVE_DIALOG] feature. Supported platforms include macOS, Windows, and Android.
   *
   */
  dialog_show(
    title: string,
    description: string,
    buttons: PackedStringArray,
    callback: Callable
  ): int

  /**
   * Allows the [param process_id] PID to steal focus from this window. In other words, this disables the operating system's focus stealing protection for the specified PID.
   *
   * **Note:** This method is implemented only on Windows.
   *
   */
  enable_for_stealing_focus(process_id: int): void

  /**
   * Displays OS native dialog for selecting files or directories in the file system.
   *
   * Each filter string in the [param filters] array should be formatted like this: `*.png,*.jpg,*.jpeg;Image Files;image/png,image/jpeg`. The description text of the filter is optional and can be omitted. It is recommended to set both file extension and MIME type. See also [member FileDialog.filters].
   *
   * Callbacks have the following arguments: `status: bool, selected_paths: PackedStringArray, selected_filter_index: int`. **On Android,** the third callback argument (`selected_filter_index`) is always `0`.
   *
   * **Note:** This method is implemented if the display server has the [constant FEATURE_NATIVE_DIALOG_FILE] feature. Supported platforms include Linux (X11/Wayland), Windows, macOS, and Android (API level 29+).
   *
   * **Note:** [param current_directory] might be ignored.
   *
   * **Note:** Embedded file dialogs and Windows file dialogs support only file extensions, while Android, Linux, and macOS file dialogs also support MIME types.
   *
   * **Note:** On Android and Linux, [param show_hidden] is ignored.
   *
   * **Note:** On Android and macOS, native file dialogs have no title.
   *
   * **Note:** On macOS, sandboxed apps will save security-scoped bookmarks to retain access to the opened folders across multiple sessions. Use [method OS.get_granted_permissions] to get a list of saved bookmarks.
   *
   * **Note:** On Android, this method uses the Android Storage Access Framework (SAF).
   *
   * The file picker returns a URI instead of a filesystem path. This URI can be passed directly to [FileAccess] to perform read/write operations.
   *
   * When using [constant FILE_DIALOG_MODE_OPEN_DIR], it returns a tree URI that grants full access to the selected directory. File operations inside this directory can be performed by passing a path on the form `treeUri#relative/path/to/file` to [FileAccess].
   *
   * To avoid opening the file picker again after each app restart, you can take persistable URI permission as follows:
   *
   * @example
   *
   *
   * val uri = "content://com.android..." # URI of the selected file or folder.
   * val persist = true # Set to false to release the persistable permission.
   * var android_runtime = Engine.get_singleton("AndroidRuntime")
   * android_runtime.updatePersistableUriPermission(uri, persist)
   *
   * @summary
   *
   *
   * The persistable URI permission remains valid across app restarts as long as the directory is not moved, renamed, or deleted.
   *
   */
  file_dialog_show(
    title: string,
    current_directory: string,
    filename: string,
    show_hidden: boolean,
    mode: int,
    filters: PackedStringArray,
    callback: Callable,
    parent_window_id?: int
  ): int

  /**
   * Displays OS native dialog for selecting files or directories in the file system with additional user selectable options.
   *
   * Each filter string in the [param filters] array should be formatted like this: `*.png,*.jpg,*.jpeg;Image Files;image/png,image/jpeg`. The description text of the filter is optional and can be omitted. It is recommended to set both file extension and MIME type. See also [member FileDialog.filters].
   *
   * [param options] is array of [Dictionary]s with the following keys:
   *
   * - `"name"` - option's name [String].
   *
   * - `"values"` - [PackedStringArray] of values. If empty, boolean option (check box) is used.
   *
   * - `"default"` - default selected option index ([int]) or default boolean value ([bool]).
   *
   * Callbacks have the following arguments: `status: bool, selected_paths: PackedStringArray, selected_filter_index: int, selected_option: Dictionary`.
   *
   * **Note:** This method is implemented if the display server has the [constant FEATURE_NATIVE_DIALOG_FILE_EXTRA] feature. Supported platforms include Linux (X11/Wayland), Windows, and macOS.
   *
   * **Note:** [param current_directory] might be ignored.
   *
   * **Note:** Embedded file dialogs and Windows file dialogs support only file extensions, while Android, Linux, and macOS file dialogs also support MIME types.
   *
   * **Note:** On Linux (X11), [param show_hidden] is ignored.
   *
   * **Note:** On macOS, native file dialogs have no title.
   *
   * **Note:** On macOS, sandboxed apps will save security-scoped bookmarks to retain access to the opened folders across multiple sessions. Use [method OS.get_granted_permissions] to get a list of saved bookmarks.
   *
   */
  file_dialog_with_options_show(
    title: string,
    current_directory: string,
    root: string,
    filename: string,
    show_hidden: boolean,
    mode: int,
    filters: PackedStringArray,
    options: Dictionary<any, any>[],
    callback: Callable,
    parent_window_id?: int
  ): int

  /**
   * Forces window manager processing while ignoring all [InputEvent]s. See also [method process_events].
   *
   * **Note:** This method is implemented on Windows and macOS.
   *
   */
  force_process_and_drop_events(): void

  /**
   * Returns OS theme accent color. Returns `Color(0, 0, 0, 0)`, if accent color is unknown.
   *
   * **Note:** This method is implemented on macOS, Windows, Android, and Linux (X11/Wayland).
   *
   */
  get_accent_color(): Color

  /**
   * Returns the OS theme base color (default control background). Returns `Color(0, 0, 0, 0)` if the base color is unknown.
   *
   * **Note:** This method is implemented on macOS, Windows, and Android.
   *
   */
  get_base_color(): Color

  /**
   * Returns an [Array] of [Rect2], each of which is the bounding rectangle for a display cutout or notch. These are non-functional areas on edge-to-edge screens used by cameras and sensors. Returns an empty array if the device does not have cutouts. See also [method get_display_safe_area].
   *
   * **Note:** Currently only implemented on Android. Other platforms will return an empty array even if they do have display cutouts or notches.
   *
   */
  get_display_cutouts(): Rect2[]

  /**
   * Returns the unobscured area of the display where interactive controls should be rendered. See also [method get_display_cutouts].
   *
   * **Note:** Currently only implemented on Android and iOS. On other platforms, `screen_get_usable_rect(SCREEN_OF_MAIN_WINDOW)` will be returned as a fallback. See also [method screen_get_usable_rect].
   *
   */
  get_display_safe_area(): Rect2i

  /**
   * Returns the index of the screen containing the window with the keyboard focus, or the primary screen if there's no focused window.
   *
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows. On other platforms, this method always returns the primary screen.
   *
   */
  get_keyboard_focus_screen(): int

  /**
   * Returns the name of the [DisplayServer] currently in use. Most operating systems only have a single [DisplayServer], but Linux has access to more than one [DisplayServer] (currently X11 and Wayland).
   *
   * The names of built-in display servers are `Windows`, `macOS`, `X11` (Linux), `Wayland` (Linux), `Android`, `iOS`, `web` (HTML5), and `headless` (when started with the `--headless` [url=$DOCS_URL/tutorials/editor/command_line_tutorial.html]command line argument[/url]).
   *
   */
  get_name(): string

  /**
   * Returns the index of the primary screen.
   *
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows. On other platforms, this method always returns `0`.
   *
   */
  get_primary_screen(): int

  /**
   * Returns the number of displays available.
   *
   * **Note:** This method is implemented on Linux (X11 and Wayland), macOS, and Windows. On other platforms, this method always returns `1`.
   *
   */
  get_screen_count(): int

  /** Returns the index of the screen that overlaps the most with the given rectangle. Returns [constant INVALID_SCREEN] if the rectangle doesn't overlap with any screen or has no area. */
  get_screen_from_rect(rect: Rect2): int

  /**
   * Returns `true` if positions of **OK** and **Cancel** buttons are swapped in dialogs. This is enabled by default on Windows to follow interface conventions, and be toggled by changing [member ProjectSettings.gui/common/swap_cancel_ok].
   *
   * **Note:** This doesn't affect native dialogs such as the ones spawned by [method DisplayServer.dialog_show].
   *
   */
  get_swap_cancel_ok(): boolean

  /**
   * Returns the ID of the window at the specified screen [param position] (in pixels). On multi-monitor setups, the screen position is relative to the virtual desktop area. On multi-monitor setups with different screen resolutions or orientations, the origin may be located outside any display like this:
   *
   * [codeblock lang=text]
   *
   * * (0, 0)        +-------+
   *
   *                 |       |
   *
   * +-------------+ |       |
   *
   * |             | |       |
   *
   * |             | |       |
   *
   * +-------------+ +-------+
   *
   * @summary
   *
   *
   */
  get_window_at_screen_position(position: Vector2i): int

  /**
   * Returns the list of Godot window IDs belonging to this process.
   *
   * **Note:** Native dialogs are not included in this list.
   *
   */
  get_window_list(): PackedInt32Array

  /**
   * Adds a new checkable item with text [param label] to the global menu with ID [param menu_root].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_add_check_item(
    menu_root: string,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new checkable item with text [param label] and icon [param icon] to the global menu with ID [param menu_root].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_add_icon_check_item(
    menu_root: string,
    icon: Texture2D,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new item with text [param label] and icon [param icon] to the global menu with ID [param menu_root].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_add_icon_item(
    menu_root: string,
    icon: Texture2D,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new radio-checkable item with text [param label] and icon [param icon] to the global menu with ID [param menu_root].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** Radio-checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method global_menu_set_item_checked] for more info on how to control it.
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_add_icon_radio_check_item(
    menu_root: string,
    icon: Texture2D,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new item with text [param label] to the global menu with ID [param menu_root].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_add_item(
    menu_root: string,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new item with text [param label] to the global menu with ID [param menu_root].
   *
   * Contrarily to normal binary items, multistate items can have more than two states, as defined by [param max_states]. Each press or activate of the item will increase the state by one. The default value is defined by [param default_state].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** By default, there's no indication of the current item state, it should be changed manually.
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_add_multistate_item(
    menu_root: string,
    label: string,
    max_states: int,
    default_state: int,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new radio-checkable item with text [param label] to the global menu with ID [param menu_root].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** Radio-checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method global_menu_set_item_checked] for more info on how to control it.
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_add_radio_check_item(
    menu_root: string,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a separator between items to the global menu with ID [param menu_root]. Separators also occupy an index.
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_add_separator(menu_root: string, index?: int): int

  /**
   * Adds an item that will act as a submenu of the global menu [param menu_root]. The [param submenu] argument is the ID of the global menu root that will be shown when the item is clicked.
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_add_submenu_item(
    menu_root: string,
    label: string,
    submenu: string,
    index?: int
  ): int

  /**
   * Removes all items from the global menu with ID [param menu_root].
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Supported system menu IDs:**
   *
   * [codeblock lang=text]
   *
   * "_main" - Main menu (macOS).
   *
   * "_dock" - Dock popup menu (macOS).
   *
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   *
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   *
   * "_help" - Help menu (macOS).
   *
   * @summary
   *
   *
   */
  global_menu_clear(menu_root: string): void

  /**
   * Returns the accelerator of the item at index [param idx]. Accelerators are special combinations of keys that activate the item, no matter which control is focused.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_accelerator(menu_root: string, idx: int): int

  /**
   * Returns the callback of the item at index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_callback(menu_root: string, idx: int): Callable

  /**
   * Returns number of items in the global menu with ID [param menu_root].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_count(menu_root: string): int

  /**
   * Returns the icon of the item at index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_icon(menu_root: string, idx: int): Texture2D

  /**
   * Returns the horizontal offset of the item at the given [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_indentation_level(menu_root: string, idx: int): int

  /**
   * Returns the index of the item with the specified [param tag]. Indices are automatically assigned to each item by the engine, and cannot be set manually.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_index_from_tag(menu_root: string, tag: any): int

  /**
   * Returns the index of the item with the specified [param text]. Indices are automatically assigned to each item by the engine, and cannot be set manually.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_index_from_text(menu_root: string, text: string): int

  /**
   * Returns the callback of the item accelerator at index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_key_callback(menu_root: string, idx: int): Callable

  /**
   * Returns number of states of a multistate item. See [method global_menu_add_multistate_item] for details.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_max_states(menu_root: string, idx: int): int

  /**
   * Returns the state of a multistate item. See [method global_menu_add_multistate_item] for details.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_state(menu_root: string, idx: int): int

  /**
   * Returns the submenu ID of the item at index [param idx]. See [method global_menu_add_submenu_item] for more info on how to add a submenu.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_submenu(menu_root: string, idx: int): string

  /**
   * Returns the metadata of the specified item, which might be of any type. You can set it with [method global_menu_set_item_tag], which provides a simple way of assigning context data to items.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_tag(menu_root: string, idx: int): any

  /**
   * Returns the text of the item at index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_text(menu_root: string, idx: int): string

  /**
   * Returns the tooltip associated with the specified index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_item_tooltip(menu_root: string, idx: int): string

  /**
   * Returns Dictionary of supported system menu IDs and names.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_get_system_menu_roots(): Dictionary<any, any>

  /**
   * Returns `true` if the item at index [param idx] is checkable in some way, i.e. if it has a checkbox or radio button.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_is_item_checkable(menu_root: string, idx: int): boolean

  /**
   * Returns `true` if the item at index [param idx] is checked.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_is_item_checked(menu_root: string, idx: int): boolean

  /**
   * Returns `true` if the item at index [param idx] is disabled. When it is disabled it can't be selected, or its action invoked.
   *
   * See [method global_menu_set_item_disabled] for more info on how to disable an item.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_is_item_disabled(menu_root: string, idx: int): boolean

  /**
   * Returns `true` if the item at index [param idx] is hidden.
   *
   * See [method global_menu_set_item_hidden] for more info on how to hide an item.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_is_item_hidden(menu_root: string, idx: int): boolean

  /**
   * Returns `true` if the item at index [param idx] has radio button-style checkability.
   *
   * **Note:** This is purely cosmetic; you must add the logic for checking/unchecking items in radio groups.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_is_item_radio_checkable(menu_root: string, idx: int): boolean

  /**
   * Removes the item at index [param idx] from the global menu [param menu_root].
   *
   * **Note:** The indices of items after the removed item will be shifted by one.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_remove_item(menu_root: string, idx: int): void

  /**
   * Sets the accelerator of the item at index [param idx]. [param keycode] can be a single [enum Key], or a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_accelerator(
    menu_root: string,
    idx: int,
    keycode: int
  ): void

  /**
   * Sets the callback of the item at index [param idx]. Callback is emitted when an item is pressed.
   *
   * **Note:** The [param callback] Callable needs to accept exactly one Variant parameter, the parameter passed to the Callable will be the value passed to the `tag` parameter when the menu item was created.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_callback(
    menu_root: string,
    idx: int,
    callback: Callable
  ): void

  /**
   * Sets whether the item at index [param idx] has a checkbox. If `false`, sets the type of the item to plain text.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_checkable(
    menu_root: string,
    idx: int,
    checkable: boolean
  ): void

  /**
   * Sets the checkstate status of the item at index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_checked(
    menu_root: string,
    idx: int,
    checked: boolean
  ): void

  /**
   * Enables/disables the item at index [param idx]. When it is disabled, it can't be selected and its action can't be invoked.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_disabled(
    menu_root: string,
    idx: int,
    disabled: boolean
  ): void

  /**
   * Hides/shows the item at index [param idx]. When it is hidden, an item does not appear in a menu and its action cannot be invoked.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_hidden(
    menu_root: string,
    idx: int,
    hidden: boolean
  ): void

  /**
   * Sets the callback of the item at index [param idx]. The callback is emitted when an item is hovered.
   *
   * **Note:** The [param callback] Callable needs to accept exactly one Variant parameter, the parameter passed to the Callable will be the value passed to the `tag` parameter when the menu item was created.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_hover_callbacks(
    menu_root: string,
    idx: int,
    callback: Callable
  ): void

  /**
   * Replaces the [Texture2D] icon of the specified [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   * **Note:** This method is not supported by macOS "_dock" menu items.
   *
   */
  global_menu_set_item_icon(menu_root: string, idx: int, icon: Texture2D): void

  /**
   * Sets the horizontal offset of the item at the given [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_indentation_level(
    menu_root: string,
    idx: int,
    level: int
  ): void

  /**
   * Sets the callback of the item at index [param idx]. Callback is emitted when its accelerator is activated.
   *
   * **Note:** The [param key_callback] Callable needs to accept exactly one Variant parameter, the parameter passed to the Callable will be the value passed to the `tag` parameter when the menu item was created.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_key_callback(
    menu_root: string,
    idx: int,
    key_callback: Callable
  ): void

  /**
   * Sets number of state of a multistate item. See [method global_menu_add_multistate_item] for details.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_max_states(
    menu_root: string,
    idx: int,
    max_states: int
  ): void

  /**
   * Sets the type of the item at the specified index [param idx] to radio button. If `false`, sets the type of the item to plain text.
   *
   * **Note:** This is purely cosmetic; you must add the logic for checking/unchecking items in radio groups.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_radio_checkable(
    menu_root: string,
    idx: int,
    checkable: boolean
  ): void

  /**
   * Sets the state of a multistate item. See [method global_menu_add_multistate_item] for details.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_state(menu_root: string, idx: int, state: int): void

  /**
   * Sets the submenu of the item at index [param idx]. The submenu is the ID of a global menu root that would be shown when the item is clicked.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_submenu(
    menu_root: string,
    idx: int,
    submenu: string
  ): void

  /**
   * Sets the metadata of an item, which may be of any type. You can later get it with [method global_menu_get_item_tag], which provides a simple way of assigning context data to items.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_tag(menu_root: string, idx: int, tag: any): void

  /**
   * Sets the text of the item at index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_text(menu_root: string, idx: int, text: string): void

  /**
   * Sets the [String] tooltip of the item at the specified index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  global_menu_set_item_tooltip(
    menu_root: string,
    idx: int,
    tooltip: string
  ): void

  /** Registers callables to emit when the menu is respectively about to show or closed. Callback methods should have zero arguments. */
  global_menu_set_popup_callbacks(
    menu_root: string,
    open_callback: Callable,
    close_callback: Callable
  ): void

  /** Returns [code]true[/code] if any additional outputs have been registered via [method register_additional_output]. */
  has_additional_outputs(): boolean

  /** Returns [code]true[/code] if the specified [param feature] is supported by the current [DisplayServer], [code]false[/code] otherwise. */
  has_feature(feature: int): boolean

  /**
   * Returns `true` if a hardware keyboard is connected.
   *
   * **Note:** This method is implemented on Android and iOS. On other platforms, this method always returns `true`.
   *
   */
  has_hardware_keyboard(): boolean

  /**
   * Sets native help system search callbacks.
   *
   * [param search_callback] has the following arguments: `String search_string, int result_limit` and return a [Dictionary] with "key, display name" pairs for the search results. Called when the user enters search terms in the `Help` menu.
   *
   * [param action_callback] has the following arguments: `String key`. Called when the user selects a search result in the `Help` menu.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  help_set_search_callbacks(
    search_callback: Callable,
    action_callback: Callable
  ): void

  /**
   * Returns the text selection in the [url=https://en.wikipedia.org/wiki/Input_method]Input Method Editor[/url] composition string, with the [Vector2i]'s `x` component being the caret position and `y` being the length of the selection.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  ime_get_selection(): Vector2i

  /**
   * Returns the composition string contained within the [url=https://en.wikipedia.org/wiki/Input_method]Input Method Editor[/url] window.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  ime_get_text(): string

  /**
   * Returns `true` if OS is using dark mode.
   *
   * **Note:** This method is implemented on Android, iOS, macOS, Windows, and Linux (X11/Wayland).
   *
   */
  is_dark_mode(): boolean

  /**
   * Returns `true` if OS supports dark mode.
   *
   * **Note:** This method is implemented on Android, iOS, macOS, Windows, and Linux (X11/Wayland).
   *
   */
  is_dark_mode_supported(): boolean

  /** Returns [code]true[/code] if touch events are available (Android or iOS), the capability is detected on the Web platform or if [member ProjectSettings.input_devices/pointing/emulate_touch_from_mouse] is [code]true[/code]. */
  is_touchscreen_available(): boolean

  /** Returns [code]true[/code] if the window background can be made transparent. This method returns [code]false[/code] if [member ProjectSettings.display/window/per_pixel_transparency/allowed] is set to [code]false[/code], or if transparency is not supported by the renderer or OS compositor. */
  is_window_transparency_available(): boolean

  /**
   * Returns active keyboard layout index.
   *
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS, and Windows.
   *
   */
  keyboard_get_current_layout(): int

  /**
   * Converts a physical (US QWERTY) [param keycode] to one in the active keyboard layout.
   *
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   *
   */
  keyboard_get_keycode_from_physical(keycode: int): int

  /**
   * Converts a physical (US QWERTY) [param keycode] to localized label printed on the key in the active keyboard layout.
   *
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   *
   */
  keyboard_get_label_from_physical(keycode: int): int

  /**
   * Returns the number of keyboard layouts.
   *
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   *
   */
  keyboard_get_layout_count(): int

  /**
   * Returns the ISO-639/BCP-47 language code of the keyboard layout at position [param index].
   *
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   *
   */
  keyboard_get_layout_language(index: int): string

  /**
   * Returns the localized name of the keyboard layout at position [param index].
   *
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   *
   */
  keyboard_get_layout_name(index: int): string

  /**
   * Sets the active keyboard layout.
   *
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   *
   */
  keyboard_set_current_layout(index: int): void

  /** Returns the current state of mouse buttons (whether each button is pressed) as a bitmask. If multiple mouse buttons are pressed at the same time, the bits are added together. Equivalent to [method Input.get_mouse_button_mask]. */
  mouse_get_button_state(): int

  /** Returns the current mouse mode. See also [method mouse_set_mode]. */
  mouse_get_mode(): int

  /** Returns the mouse cursor's current position in screen coordinates. */
  mouse_get_position(): Vector2i

  /** Sets the current mouse mode. See also [method mouse_get_mode]. */
  mouse_set_mode(mouse_mode: int): void

  /** Perform window manager processing, including input flushing. See also [method force_process_and_drop_events], [method Input.flush_buffered_events] and [member Input.use_accumulated_input]. */
  process_events(): void

  /**
   * Registers an [Object] which represents an additional output that will be rendered too, beyond normal windows. The [Object] is only used as an identifier, which can be later passed to [method unregister_additional_output].
   *
   * This can be used to prevent Godot from skipping rendering when no normal windows are visible.
   *
   */
  register_additional_output(object: Object): void

  /**
   * Returns the dots per inch density of the specified screen. Returns platform specific default value if [param screen] is invalid.
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   * **Note:** On macOS, returned value is inaccurate if fractional display scaling mode is used.
   *
   * **Note:** On Android devices, the actual screen densities are grouped into six generalized densities:
   *
   * [codeblock lang=text]
   *
   *    ldpi - 120 dpi
   *
   *    mdpi - 160 dpi
   *
   *    hdpi - 240 dpi
   *
   *   xhdpi - 320 dpi
   *
   *  xxhdpi - 480 dpi
   *
   * xxxhdpi - 640 dpi
   *
   * @summary
   *
   *
   * **Note:** This method is implemented on Android, iOS, Linux (X11/Wayland), macOS, Web, and Windows. On other platforms, this method always returns `72`.
   *
   */
  screen_get_dpi(screen?: int): int

  /**
   * Returns a screenshot of the [param screen]. Returns `null` if [param screen] is invalid or the [DisplayServer] fails to capture screenshot.
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   * **Note:** This method is implemented on Linux (X11, excluding XWayland), macOS, and Windows. On other platforms, this method always returns `null`.
   *
   * **Note:** On macOS, this method requires the "Screen Recording" permission. If permission is not granted, this method returns a screenshot that will not include other application windows or OS elements not related to the application.
   *
   */
  screen_get_image(screen?: int): Image

  /**
   * Returns a screenshot of the screen region defined by [param rect]. Returns `null` if [param rect] is outside screen bounds or the [DisplayServer] fails to capture screenshot.
   *
   * **Note:** This method is implemented on macOS and Windows. On other platforms, this method always returns `null`.
   *
   * **Note:** On macOS, this method requires the "Screen Recording" permission. If permission is not granted, this method returns a screenshot that will not include other application windows or OS elements not related to the application.
   *
   */
  screen_get_image_rect(rect: Rect2i): Image

  /**
   * Returns the greatest scale factor of all screens.
   *
   * **Note:** On macOS returned value is `2.0` if there is at least one hiDPI (Retina) screen in the system, and `1.0` in all other cases.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  screen_get_max_scale(): float

  /**
   * Returns the [param screen]'s current orientation. See also [method screen_set_orientation]. Returns [constant SCREEN_LANDSCAPE] if [param screen] is invalid.
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   * **Note:** This method is implemented on Android and iOS. On other platforms, this method always returns [constant SCREEN_LANDSCAPE].
   *
   */
  screen_get_orientation(screen?: int): int

  /**
   * Returns the color of the pixel at the given screen [param position]. On multi-monitor setups, the screen position is relative to the virtual desktop area.
   *
   * **Note:** This method is implemented on Linux (X11, excluding XWayland), macOS, and Windows. On other platforms, this method always returns `Color(0, 0, 0, 1)`.
   *
   * **Note:** On macOS, this method requires the "Screen Recording" permission. If permission is not granted, this method returns a color from a screenshot that will not include other application windows or OS elements not related to the application.
   *
   */
  screen_get_pixel(position: Vector2i): Color

  /**
   * Returns the screen's top-left corner position in pixels. Returns [constant Vector2i.ZERO] if [param screen] is invalid. On multi-monitor setups, the screen position is relative to the virtual desktop area. On multi-monitor setups with different screen resolutions or orientations, the origin might be located outside any display like this:
   *
   * [codeblock lang=text]
   *
   * * (0, 0)        +-------+
   *
   *                 |       |
   *
   * +-------------+ |       |
   *
   * |             | |       |
   *
   * |             | |       |
   *
   * +-------------+ +-------+
   *
   * @summary
   *
   *
   * See also [method screen_get_size].
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   */
  screen_get_position(screen?: int): Vector2i

  /**
   * Returns the current refresh rate of the specified screen. When V-Sync is enabled, this returns the maximum framerate the project can effectively reach. Returns `-1.0` if [param screen] is invalid or the [DisplayServer] fails to find the refresh rate for the specified screen.
   *
   * To fallback to a default refresh rate if the method fails, try:
   *
   * @example
   *
   * var refresh_rate = DisplayServer.screen_get_refresh_rate()
   * if refresh_rate < 0:
   * 	refresh_rate = 60.0
   * @summary
   *
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   * **Note:** This method is implemented on Android, iOS, macOS, Linux (X11 and Wayland), and Windows. On other platforms, this method always returns `-1.0`.
   *
   */
  screen_get_refresh_rate(screen?: int): float

  /**
   * Returns the scale factor of the specified screen by index. Returns `1.0` if [param screen] is invalid.
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   * **Note:** On macOS, the returned value is `2.0` for hiDPI (Retina) screens, and `1.0` for all other cases.
   *
   * **Note:** On Linux (Wayland), the returned value is accurate only when [param screen] is [constant SCREEN_OF_MAIN_WINDOW]. Due to API limitations, passing a direct index will return a rounded-up integer, if the screen has a fractional scale (e.g. `1.25` would get rounded up to `2.0`).
   *
   * **Note:** This method is implemented on Android, iOS, Web, macOS, and Linux (Wayland). On other platforms, this method always returns `1.0`.
   *
   */
  screen_get_scale(screen?: int): float

  /**
   * Returns the screen's size in pixels. See also [method screen_get_position] and [method screen_get_usable_rect]. Returns [constant Vector2i.ZERO] if [param screen] is invalid.
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   */
  screen_get_size(screen?: int): Vector2i

  /**
   * Returns the portion of the screen that is not obstructed by a status bar in pixels. See also [method screen_get_size].
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows. On other platforms, this method always returns `Rect2i(screen_get_position(screen), screen_get_size(screen))`.
   *
   */
  screen_get_usable_rect(screen?: int): Rect2i

  /** Returns [code]true[/code] if the screen should never be turned off by the operating system's power-saving measures. See also [method screen_set_keep_on]. */
  screen_is_kept_on(): boolean

  /** Sets whether the screen should never be turned off by the operating system's power-saving measures. See also [method screen_is_kept_on]. */
  screen_set_keep_on(enable: boolean): void

  /**
   * Sets the [param screen]'s [param orientation]. See also [method screen_get_orientation].
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   * **Note:** This method is implemented on Android and iOS.
   *
   * **Note:** On iOS, this method has no effect if [member ProjectSettings.display/window/handheld/orientation] is not set to [constant SCREEN_SENSOR].
   *
   */
  screen_set_orientation(orientation: int, screen?: int): void

  /**
   * Sets the callback that should be called when a hardware keyboard is connected or disconnected. [param callable] should accept a single [bool] argument indicating whether the keyboard has been connected (`true`) or disconnected (`false`).
   *
   * **Note:** This method is only implemented on Android.
   *
   */
  set_hardware_keyboard_connection_change_callback(callable: Callable): void

  /**
   * Sets the window icon (usually displayed in the top-left corner) with an [Image]. To use icons in the operating system's native format, use [method set_native_icon] instead.
   *
   * **Note:** Requires support for [constant FEATURE_ICON].
   *
   */
  set_icon(image: Image): void

  /**
   * Sets the window icon (usually displayed in the top-left corner) in the operating system's **native** format. The file at [param filename] must be in `.ico` format on Windows or `.icns` on macOS. By using specially crafted `.ico` or `.icns` icons, [method set_native_icon] allows specifying different icons depending on the size the icon is displayed at. This size is determined by the operating system and user preferences (including the display scale factor). To use icons in other formats, use [method set_icon] instead.
   *
   * **Note:** Requires support for [constant FEATURE_NATIVE_ICON].
   *
   */
  set_native_icon(filename: string): void

  /**
   * Sets the callback that should be called when the system's theme settings are changed. [param callable] should accept zero arguments.
   *
   * **Note:** This method is implemented on Android, iOS, macOS, Windows, and Linux (X11/Wayland).
   *
   */
  set_system_theme_change_callback(callable: Callable): void

  /**
   * Opens system emoji and symbol picker.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  show_emoji_and_symbol_picker(): void

  /**
   * Returns the rectangle for the given status indicator [param id] in screen coordinates. If the status indicator is not visible, returns an empty [Rect2].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  status_indicator_get_rect(id: int): Rect2

  /**
   * Sets the application status indicator activation callback. [param callback] should take two arguments: [int] mouse button index (one of [enum MouseButton] values) and [Vector2i] click position in screen coordinates.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  status_indicator_set_callback(id: int, callback: Callable): void

  /**
   * Sets the application status indicator icon.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  status_indicator_set_icon(id: int, icon: Texture2D): void

  /**
   * Sets the application status indicator native popup menu.
   *
   * **Note:** On macOS, the menu is activated by any mouse button. Its activation callback is **not** triggered.
   *
   * **Note:** On Windows, the menu is activated by the right mouse button, selecting the status icon and pressing [kbd]Shift + F10[/kbd], or the applications key. The menu's activation callback for the other mouse buttons is still triggered.
   *
   * **Note:** Native popup is only supported if [NativeMenu] supports the [constant NativeMenu.FEATURE_POPUP_MENU] feature.
   *
   */
  status_indicator_set_menu(id: int, menu_rid: RID): void

  /**
   * Sets the application status indicator tooltip.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  status_indicator_set_tooltip(id: int, tooltip: string): void

  /**
   * Returns current active tablet driver name.
   *
   * **Note:** This method is implemented only on Windows.
   *
   */
  tablet_get_current_driver(): string

  /**
   * Returns the total number of available tablet drivers.
   *
   * **Note:** This method is implemented only on Windows.
   *
   */
  tablet_get_driver_count(): int

  /**
   * Returns the tablet driver name for the given index.
   *
   * **Note:** This method is implemented only on Windows.
   *
   */
  tablet_get_driver_name(idx: int): string

  /**
   * Set active tablet driver name.
   *
   * Supported drivers:
   *
   * - `winink`: Windows Ink API, default.
   *
   * - `wintab`: Wacom Wintab API (compatible device driver required).
   *
   * - `dummy`: Dummy driver, tablet input is disabled.
   *
   * **Note:** This method is implemented only on Windows.
   *
   */
  tablet_set_current_driver(name: string): void

  /**
   * Returns an [Array] of voice information dictionaries.
   *
   * Each [Dictionary] contains two [String] entries:
   *
   * - `name` is voice name.
   *
   * - `id` is voice identifier.
   *
   * - `language` is language code in `lang_Variant` format. The `lang` part is a 2 or 3-letter code based on the ISO-639 standard, in lowercase. The [code skip-lint]Variant` part is an engine-dependent string describing country, region or/and dialect.
   *
   * Note that Godot depends on system libraries for text-to-speech functionality. These libraries are installed by default on Windows and macOS, but not on all Linux distributions. If they are not present, this method will return an empty list. This applies to both Godot users on Linux, as well as end-users on Linux running Godot games that use text-to-speech.
   *
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  tts_get_voices(): Dictionary<any, any>[]

  /**
   * Returns a [PackedStringArray] of voice identifiers for the [param language].
   *
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  tts_get_voices_for_language(language: string): PackedStringArray

  /**
   * Returns `true` if the synthesizer is in a paused state.
   *
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  tts_is_paused(): boolean

  /**
   * Returns `true` if the synthesizer is generating speech, or have utterance waiting in the queue.
   *
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  tts_is_speaking(): boolean

  /**
   * Puts the synthesizer into a paused state.
   *
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  tts_pause(): void

  /**
   * Resumes the synthesizer if it was paused.
   *
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  tts_resume(): void

  /**
   * Adds a callback, which is called when the utterance has started, finished, canceled or reached a text boundary.
   *
   * - [constant TTS_UTTERANCE_STARTED], [constant TTS_UTTERANCE_ENDED], and [constant TTS_UTTERANCE_CANCELED] callable's method should take one [int] parameter, the utterance ID.
   *
   * - [constant TTS_UTTERANCE_BOUNDARY] callable's method should take two [int] parameters, the index of the character and the utterance ID.
   *
   * **Note:** The granularity of the boundary callbacks is engine dependent.
   *
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  tts_set_utterance_callback(event: int, callable: Callable): void

  /**
   * Adds an utterance to the queue. If [param interrupt] is `true`, the queue is cleared first.
   *
   * - [param voice] identifier is one of the `"id"` values returned by [method tts_get_voices] or one of the values returned by [method tts_get_voices_for_language].
   *
   * - [param volume] ranges from `0` (lowest) to `100` (highest).
   *
   * - [param pitch] ranges from `0.0` (lowest) to `2.0` (highest), `1.0` is default pitch for the current voice.
   *
   * - [param rate] ranges from `0.1` (lowest) to `10.0` (highest), `1.0` is a normal speaking rate. Other values act as a percentage relative.
   *
   * - [param utterance_id] is passed as a parameter to the callback functions.
   *
   * **Note:** On Windows and Linux (X11/Wayland), utterance [param text] can use SSML markup. SSML support is engine and voice dependent. If the engine does not support SSML, you should strip out all XML markup before calling [method tts_speak].
   *
   * **Note:** The granularity of pitch, rate, and volume is engine and voice dependent. Values may be truncated.
   *
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  tts_speak(
    text: string,
    voice: string,
    volume?: int,
    pitch?: float,
    rate?: float,
    utterance_id?: int,
    interrupt?: boolean
  ): void

  /**
   * Stops synthesis in progress and removes all utterances from the queue.
   *
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  tts_stop(): void

  /** Unregisters an [Object] representing an additional output, that was registered via [method register_additional_output]. */
  unregister_additional_output(object: Object): void

  /**
   * Returns the on-screen keyboard's height in pixels. Returns `0` if there is no keyboard or if it is currently hidden.
   *
   * **Note:** On Android 7 and 8, the keyboard height may return `0` the first time the keyboard is opened in non-immersive mode. This behavior does not occur in immersive mode.
   *
   */
  virtual_keyboard_get_height(): int

  /** Hides the virtual keyboard if it is shown, does nothing otherwise. */
  virtual_keyboard_hide(): void

  /**
   * Shows the virtual keyboard if the platform has one.
   *
   * [param existing_text] parameter is useful for implementing your own [LineEdit] or [TextEdit], as it tells the virtual keyboard what text has already been typed (the virtual keyboard uses it for auto-correct and predictions).
   *
   * [param position] parameter is the screen space [Rect2] of the edited text.
   *
   * [param type] parameter allows configuring which type of virtual keyboard to show.
   *
   * [param max_length] limits the number of characters that can be entered if different from `-1`.
   *
   * [param cursor_start] can optionally define the current text cursor position if [param cursor_end] is not set.
   *
   * [param cursor_start] and [param cursor_end] can optionally define the current text selection.
   *
   * **Note:** This method is implemented on Android, iOS and Web.
   *
   */
  virtual_keyboard_show(
    existing_text: string,
    position?: Rect2,
    type?: int,
    max_length?: int,
    cursor_start?: int,
    cursor_end?: int
  ): void

  /**
   * Sets the mouse cursor position to the given [param position] relative to an origin at the upper left corner of the currently focused game Window Manager window.
   *
   * **Note:** [method warp_mouse] is only supported on Windows, macOS, and Linux (X11/Wayland). It has no effect on Android, iOS, and Web.
   *
   */
  warp_mouse(position: Vector2i): void

  /** Returns [code]true[/code] if anything can be drawn in the window specified by [param window_id], [code]false[/code] otherwise. Using the [code]--disable-render-loop[/code] command line argument or a headless build will return [code]false[/code]. */
  window_can_draw(window_id?: int): boolean

  /** Returns ID of the active popup window, or [constant INVALID_WINDOW_ID] if there is none. */
  window_get_active_popup(): int

  /** Returns the [method Object.get_instance_id] of the [Window] the [param window_id] is attached to. */
  window_get_attached_instance_id(window_id?: int): int

  /**
   * Returns the screen the window specified by [param window_id] is currently positioned on. If the screen overlaps multiple displays, the screen where the window's center is located is returned. See also [method window_set_current_screen]. Returns [constant INVALID_SCREEN] if [param window_id] is invalid.
   *
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows. On other platforms, this method always returns `0`.
   *
   */
  window_get_current_screen(window_id?: int): int

  /** Returns the current value of the given window's [param flag]. */
  window_get_flag(flag: int, window_id?: int): boolean

  /** Returns the window's maximum size (in pixels). See also [method window_set_max_size]. */
  window_get_max_size(window_id?: int): Vector2i

  /** Returns the window's minimum size (in pixels). See also [method window_set_min_size]. */
  window_get_min_size(window_id?: int): Vector2i

  /** Returns the mode of the given window. */
  window_get_mode(window_id?: int): int

  /**
   * Returns internal structure pointers for use in plugins.
   *
   * **Note:** This method is implemented on Android, Linux (X11/Wayland), macOS, and Windows.
   *
   */
  window_get_native_handle(handle_type: int, window_id?: int): int

  /** Returns the bounding box of control, or menu item that was used to open the popup window, in the screen coordinate system. */
  window_get_popup_safe_rect(window: int): Rect2i

  /** Returns the position of the client area of the given window on the screen. */
  window_get_position(window_id?: int): Vector2i

  /** Returns the position of the given window on the screen including the borders drawn by the operating system. See also [method window_get_position]. */
  window_get_position_with_decorations(window_id?: int): Vector2i

  /** Returns left margins ([code]x[/code]), right margins ([code]y[/code]) and height ([code]z[/code]) of the title that are safe to use (contains no buttons or other elements) when [constant WINDOW_FLAG_EXTEND_TO_TITLE] flag is set. */
  window_get_safe_title_margins(window_id?: int): Vector3i

  /** Returns the size of the window specified by [param window_id] (in pixels), excluding the borders drawn by the operating system. This is also called the "client area". See also [method window_get_size_with_decorations], [method window_set_size] and [method window_get_position]. */
  window_get_size(window_id?: int): Vector2i

  /** Returns the size of the window specified by [param window_id] (in pixels), including the borders drawn by the operating system. See also [method window_get_size]. */
  window_get_size_with_decorations(window_id?: int): Vector2i

  /**
   * Returns the estimated window title bar size (including text and window buttons) for the window specified by [param window_id] (in pixels). This method does not change the window title.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  window_get_title_size(title: string, window_id?: int): Vector2i

  /** Returns the V-Sync mode of the given window. */
  window_get_vsync_mode(window_id?: int): int

  /** Returns [code]true[/code] if the window specified by [param window_id] is focused. */
  window_is_focused(window_id?: int): boolean

  /** Returns [code]true[/code] if the given window can be maximized (the maximize button is enabled). */
  window_is_maximize_allowed(window_id?: int): boolean

  /**
   * Returns `true` if double-clicking on a window's title should maximize it.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  window_maximize_on_title_dbl_click(): boolean

  /**
   * Returns `true` if double-clicking on a window's title should minimize it.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  window_minimize_on_title_dbl_click(): boolean

  /** Moves the window specified by [param window_id] to the foreground, so that it is visible over other windows. */
  window_move_to_foreground(window_id?: int): void

  /** Makes the window specified by [param window_id] request attention, which is materialized by the window title and taskbar entry blinking until the window is focused. This usually has no visible effect if the window is currently focused. The exact behavior varies depending on the operating system. */
  window_request_attention(window_id?: int): void

  /**
   * Sets the background color of the root window.
   *
   * **Note:** This method is implemented only on Android.
   *
   */
  window_set_color(color: Color): void

  /**
   * Moves the window specified by [param window_id] to the specified [param screen]. See also [method window_get_current_screen].
   *
   * **Note:** One of the following constants can be used as [param screen]: [constant SCREEN_OF_MAIN_WINDOW], [constant SCREEN_PRIMARY], [constant SCREEN_WITH_MOUSE_FOCUS], or [constant SCREEN_WITH_KEYBOARD_FOCUS].
   *
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows.
   *
   */
  window_set_current_screen(screen: int, window_id?: int): void

  /**
   * Sets the [param callback] that should be called when files are dropped from the operating system's file manager to the window specified by [param window_id]. [param callback] should take one [PackedStringArray] argument, which is the list of dropped files.
   *
   * **Warning:** Advanced users only! Adding such a callback to a [Window] node will override its default implementation, which can introduce bugs.
   *
   * **Note:** This method is implemented on Windows, macOS, Linux (X11/Wayland), and Web.
   *
   */
  window_set_drop_files_callback(callback: Callable, window_id?: int): void

  /**
   * If set to `true`, this window will always stay on top of its parent window, parent window will ignore input while this window is opened.
   *
   * **Note:** On macOS, exclusive windows are confined to the same space (virtual desktop or screen) as the parent window.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  window_set_exclusive(window_id: int, exclusive: boolean): void

  /** Enables or disables the given window's given [param flag]. */
  window_set_flag(flag: int, enabled: boolean, window_id?: int): void

  /** Sets whether [url=https://en.wikipedia.org/wiki/Input_method]Input Method Editor[/url] should be enabled for the window specified by [param window_id]. See also [method window_set_ime_position]. */
  window_set_ime_active(active: boolean, window_id?: int): void

  /** Sets the position of the [url=https://en.wikipedia.org/wiki/Input_method]Input Method Editor[/url] popup for the specified [param window_id]. Only effective if [method window_set_ime_active] was set to [code]true[/code] for the specified [param window_id]. */
  window_set_ime_position(position: Vector2i, window_id?: int): void

  /**
   * Sets the [param callback] that should be called when any [InputEvent] is sent to the window specified by [param window_id].
   *
   * **Warning:** Advanced users only! Adding such a callback to a [Window] node will override its default implementation, which can introduce bugs.
   *
   */
  window_set_input_event_callback(callback: Callable, window_id?: int): void

  /**
   * Sets the [param callback] that should be called when text is entered using the virtual keyboard to the window specified by [param window_id].
   *
   * **Warning:** Advanced users only! Adding such a callback to a [Window] node will override its default implementation, which can introduce bugs.
   *
   */
  window_set_input_text_callback(callback: Callable, window_id?: int): void

  /**
   * Sets the maximum size of the window specified by [param window_id] in pixels. Normally, the user will not be able to drag the window to make it larger than the specified size. See also [method window_get_max_size].
   *
   * **Note:** It's recommended to change this value using [member Window.max_size] instead.
   *
   * **Note:** Using third-party tools, it is possible for users to disable window geometry restrictions and therefore bypass this limit.
   *
   */
  window_set_max_size(max_size: Vector2i, window_id?: int): void

  /**
   * Sets the minimum size for the given window to [param min_size] in pixels. Normally, the user will not be able to drag the window to make it smaller than the specified size. See also [method window_get_min_size].
   *
   * **Note:** It's recommended to change this value using [member Window.min_size] instead.
   *
   * **Note:** By default, the main window has a minimum size of `Vector2i(64, 64)`. This prevents issues that can arise when the window is resized to a near-zero size.
   *
   * **Note:** Using third-party tools, it is possible for users to disable window geometry restrictions and therefore bypass this limit.
   *
   */
  window_set_min_size(min_size: Vector2i, window_id?: int): void

  /**
   * Sets window mode for the given window to [param mode].
   *
   * **Note:** On Android, setting it to [constant WINDOW_MODE_FULLSCREEN] or [constant WINDOW_MODE_EXCLUSIVE_FULLSCREEN] will enable immersive mode.
   *
   * **Note:** Setting the window to full screen forcibly sets the borderless flag to `true`, so make sure to set it back to `false` when not wanted.
   *
   */
  window_set_mode(mode: int, window_id?: int): void

  /**
   * Sets a polygonal region of the window which accepts mouse events. Mouse events outside the region will be passed through.
   *
   * Passing an empty array will disable passthrough support (all mouse events will be intercepted by the window, which is the default behavior).
   *
   * @example
   *
   *
   * # Set region, using Path2D node.
   * DisplayServer.window_set_mouse_passthrough($Path2D.curve.get_baked_points())
   * # Set region, using Polygon2D node.
   * DisplayServer.window_set_mouse_passthrough($Polygon2D.polygon)
   * # Reset region to default.
   * DisplayServer.window_set_mouse_passthrough([])
   *
   *
   * // Set region, using Path2D node.
   * DisplayServer.WindowSetMousePassthrough(GetNode<Path2D>("Path2D").Curve.GetBakedPoints());
   * // Set region, using Polygon2D node.
   * DisplayServer.WindowSetMousePassthrough(GetNode<Polygon2D>("Polygon2D").Polygon);
   * // Reset region to default.
   * DisplayServer.WindowSetMousePassthrough([]);
   *
   * @summary
   *
   *
   * **Note:** On Windows, the portion of a window that lies outside the region is not drawn, while on Linux (X11) and macOS it is.
   *
   * **Note:** This method is implemented on Linux (X11), macOS and Windows.
   *
   */
  window_set_mouse_passthrough(
    region: PackedVector2Array,
    window_id?: int
  ): void

  /** Sets the bounding box of control, or menu item that was used to open the popup window, in the screen coordinate system. Clicking this area will not auto-close this popup. */
  window_set_popup_safe_rect(window: int, rect: Rect2i): void

  /**
   * Sets the position of the given window to [param position]. On multi-monitor setups, the screen position is relative to the virtual desktop area. On multi-monitor setups with different screen resolutions or orientations, the origin may be located outside any display like this:
   *
   * [codeblock lang=text]
   *
   * * (0, 0)        +-------+
   *
   *                 |       |
   *
   * +-------------+ |       |
   *
   * |             | |       |
   *
   * |             | |       |
   *
   * +-------------+ +-------+
   *
   * @summary
   *
   *
   * See also [method window_get_position] and [method window_set_size].
   *
   * **Note:** It's recommended to change this value using [member Window.position] instead.
   *
   * **Note:** On Linux (Wayland): this method is a no-op.
   *
   */
  window_set_position(position: Vector2i, window_id?: int): void

  /**
   * Sets the [param callback] that will be called when the window specified by [param window_id] is moved or resized.
   *
   * **Warning:** Advanced users only! Adding such a callback to a [Window] node will override its default implementation, which can introduce bugs.
   *
   */
  window_set_rect_changed_callback(callback: Callable, window_id?: int): void

  /**
   * Sets the size of the given window to [param size] (in pixels). See also [method window_get_size] and [method window_get_position].
   *
   * **Note:** It's recommended to change this value using [member Window.size] instead.
   *
   */
  window_set_size(size: Vector2i, window_id?: int): void

  /**
   * Sets the title of the given window to [param title].
   *
   * **Note:** It's recommended to change this value using [member Window.title] instead.
   *
   * **Note:** Avoid changing the window title every frame, as this can cause performance issues on certain window managers. Try to change the window title only a few times per second at most.
   *
   */
  window_set_title(title: string, window_id?: int): void

  /**
   * Sets window transient parent. Transient window will be destroyed with its transient parent and will return focus to their parent when closed. The transient window is displayed on top of a non-exclusive full-screen parent window. Transient windows can't enter full-screen mode.
   *
   * **Note:** It's recommended to change this value using [member Window.transient] instead.
   *
   * **Note:** The behavior might be different depending on the platform.
   *
   */
  window_set_transient(window_id: int, parent_window_id: int): void

  /**
   * Sets the V-Sync mode of the given window. See also [member ProjectSettings.display/window/vsync/vsync_mode].
   *
   * Depending on the platform and used renderer, the engine will fall back to [constant VSYNC_ENABLED] if the desired mode is not supported.
   *
   * **Note:** V-Sync modes other than [constant VSYNC_ENABLED] are only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   *
   */
  window_set_vsync_mode(vsync_mode: int, window_id?: int): void

  /**
   * When [constant WINDOW_FLAG_EXTEND_TO_TITLE] flag is set, set offset to the center of the first titlebar button.
   *
   * **Note:** This flag is implemented only on macOS.
   *
   */
  window_set_window_buttons_offset(offset: Vector2i, window_id?: int): void

  /**
   * Sets the [param callback] that will be called when an event occurs in the window specified by [param window_id].
   *
   * **Warning:** Advanced users only! Adding such a callback to a [Window] node will override its default implementation, which can introduce bugs.
   *
   */
  window_set_window_event_callback(callback: Callable, window_id?: int): void

  /**
   * Starts an interactive drag operation on the window with the given [param window_id], using the current mouse position. Call this method when handling a mouse button being pressed to simulate a pressed event on the window's title bar. Using this method allows the window to participate in space switching, tiling, and other system features.
   *
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS, and Windows.
   *
   */
  window_start_drag(window_id?: int): void

  /**
   * Starts an interactive resize operation on the window with the given [param window_id], using the current mouse position. Call this method when handling a mouse button being pressed to simulate a pressed event on the window's edge.
   *
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS, and Windows.
   *
   */
  window_start_resize(edge: int, window_id?: int): void

  connect<T extends SignalsOf<DisplayServerClass>>(
    signal: T,
    method: SignalFunction<DisplayServerClass[T]>
  ): number

  /**
   * Display server supports global menu. This allows the application to display its menu items in the operating system's top bar. **macOS**
   *
   */
  static FEATURE_GLOBAL_MENU: any

  /**
   * Display server supports multiple windows that can be moved outside of the main window. **Windows, macOS, Linux (X11)**
   *
   */
  static FEATURE_SUBWINDOWS: any

  /**
   * Display server supports touchscreen input. **Windows, Linux (X11), Android, iOS, Web**
   *
   */
  static FEATURE_TOUCHSCREEN: any

  /**
   * Display server supports mouse input. **Windows, macOS, Linux (X11/Wayland), Android, Web**
   *
   */
  static FEATURE_MOUSE: any

  /**
   * Display server supports warping mouse coordinates to keep the mouse cursor constrained within an area, but looping when one of the edges is reached. **Windows, macOS, Linux (X11/Wayland)**
   *
   */
  static FEATURE_MOUSE_WARP: any

  /**
   * Display server supports setting and getting clipboard data. See also [constant FEATURE_CLIPBOARD_PRIMARY]. **Windows, macOS, Linux (X11/Wayland), Android, iOS, Web**
   *
   */
  static FEATURE_CLIPBOARD: any

  /**
   * Display server supports popping up a virtual keyboard when requested to input text without a physical keyboard. **Android, iOS, Web**
   *
   */
  static FEATURE_VIRTUAL_KEYBOARD: any

  /**
   * Display server supports setting the mouse cursor shape to be different from the default. **Windows, macOS, Linux (X11/Wayland), Android, Web**
   *
   */
  static FEATURE_CURSOR_SHAPE: any

  /**
   * Display server supports setting the mouse cursor shape to a custom image. **Windows, macOS, Linux (X11/Wayland), Web**
   *
   */
  static FEATURE_CUSTOM_CURSOR_SHAPE: any

  /**
   * Display server supports spawning text dialogs using the operating system's native look-and-feel. See [method dialog_show]. **Windows, macOS**
   *
   */
  static FEATURE_NATIVE_DIALOG: any

  /**
   * Display server supports [url=https://en.wikipedia.org/wiki/Input_method]Input Method Editor[/url], which is commonly used for inputting Chinese/Japanese/Korean text. This is handled by the operating system, rather than by Godot. **Windows, macOS, Linux (X11)**
   *
   */
  static FEATURE_IME: any

  /**
   * Display server supports windows can use per-pixel transparency to make windows behind them partially or fully visible. **Windows, macOS, Linux (X11/Wayland), Android**
   *
   */
  static FEATURE_WINDOW_TRANSPARENCY: any

  /**
   * Display server supports querying the operating system's display scale factor. This allows automatically detecting the hiDPI display **reliably**, instead of guessing based on the screen resolution and the display's reported DPI (which might be unreliable due to broken monitor EDID). **Windows, Linux (Wayland), macOS**
   *
   */
  static FEATURE_HIDPI: any

  /**
   * Display server supports changing the window icon (usually displayed in the top-left corner). **Windows, macOS, Linux (X11/Wayland)**
   *
   * **Note:** Use on Wayland requires the compositor to implement the [url=https://wayland.app/protocols/xdg-toplevel-icon-v1#xdg_toplevel_icon_v1]xdg_toplevel_icon_v1[/url] protocol, which not all compositors do. See [url=https://wayland.app/protocols/xdg-toplevel-icon-v1#compositor-support]xdg_toplevel_icon_v1#compositor-support[/url] for more information on individual compositor support.
   *
   */
  static FEATURE_ICON: any

  /**
   * Display server supports changing the window icon (usually displayed in the top-left corner). **Windows, macOS**
   *
   */
  static FEATURE_NATIVE_ICON: any

  /**
   * Display server supports changing the screen orientation. **Android, iOS**
   *
   */
  static FEATURE_ORIENTATION: any

  /**
   * Display server supports V-Sync status can be changed from the default (which is forced to be enabled platforms not supporting this feature). **Windows, macOS, Linux (X11/Wayland)**
   *
   */
  static FEATURE_SWAP_BUFFERS: any

  /**
   * Display server supports Primary clipboard can be used. This is a different clipboard from [constant FEATURE_CLIPBOARD]. **Linux (X11/Wayland)**
   *
   */
  static FEATURE_CLIPBOARD_PRIMARY: any

  /**
   * Display server supports text-to-speech. See `tts_*` methods. **Windows, macOS, Linux (X11/Wayland), Android, iOS, Web**
   *
   */
  static FEATURE_TEXT_TO_SPEECH: any

  /**
   * Display server supports expanding window content to the title. See [constant WINDOW_FLAG_EXTEND_TO_TITLE]. **macOS**
   *
   */
  static FEATURE_EXTEND_TO_TITLE: any

  /**
   * Display server supports reading screen pixels. See [method screen_get_pixel].
   *
   */
  static FEATURE_SCREEN_CAPTURE: any

  /**
   * Display server supports application status indicators.
   *
   */
  static FEATURE_STATUS_INDICATOR: any

  /**
   * Display server supports native help system search callbacks. See [method help_set_search_callbacks].
   *
   */
  static FEATURE_NATIVE_HELP: any

  /**
   * Display server supports spawning text input dialogs using the operating system's native look-and-feel. See [method dialog_input_text]. **Windows, macOS**
   *
   */
  static FEATURE_NATIVE_DIALOG_INPUT: any

  /**
   * Display server supports spawning dialogs for selecting files or directories using the operating system's native look-and-feel. See [method file_dialog_show]. **Windows, macOS, Linux (X11/Wayland), Android**
   *
   */
  static FEATURE_NATIVE_DIALOG_FILE: any

  /**
   * The display server supports all features of [constant FEATURE_NATIVE_DIALOG_FILE], with the added functionality of Options and native dialog file access to `res://` and `user://` paths. See [method file_dialog_show] and [method file_dialog_with_options_show]. **Windows, macOS, Linux (X11/Wayland)**
   *
   */
  static FEATURE_NATIVE_DIALOG_FILE_EXTRA: any

  /**
   * The display server supports initiating window drag and resize operations on demand. See [method window_start_drag] and [method window_start_resize].
   *
   */
  static FEATURE_WINDOW_DRAG: any

  /**
   * Display server supports [constant WINDOW_FLAG_EXCLUDE_FROM_CAPTURE] window flag. **Windows, macOS**
   *
   */
  static FEATURE_SCREEN_EXCLUDE_FROM_CAPTURE: any

  /**
   * Display server supports embedding a window from another process. **Windows, Linux (X11), macOS**
   *
   */
  static FEATURE_WINDOW_EMBEDDING: any

  /**
   * Native file selection dialog supports MIME types as filters.
   *
   */
  static FEATURE_NATIVE_DIALOG_FILE_MIME: any

  /**
   * Display server supports system emoji and symbol picker. **Windows, macOS**
   *
   */
  static FEATURE_EMOJI_AND_SYMBOL_PICKER: any

  /**
   * Display server supports native color picker. **Linux (X11/Wayland)**
   *
   */
  static FEATURE_NATIVE_COLOR_PICKER: any

  /**
   * Display server automatically fits popups according to the screen boundaries. Window nodes should not attempt to do that themselves.
   *
   */
  static FEATURE_SELF_FITTING_WINDOWS: any

  /**
   * Display server supports interaction with screen reader or Braille display. **Linux (X11/Wayland), macOS, Windows**
   *
   */
  static FEATURE_ACCESSIBILITY_SCREEN_READER: any

  /**
   * Unknown or custom role.
   *
   */
  static ROLE_UNKNOWN: any

  /**
   * Default dialog button element.
   *
   */
  static ROLE_DEFAULT_BUTTON: any

  /**
   * Audio player element.
   *
   */
  static ROLE_AUDIO: any

  /**
   * Video player element.
   *
   */
  static ROLE_VIDEO: any

  /**
   * Non-editable text label.
   *
   */
  static ROLE_STATIC_TEXT: any

  /**
   * Container element. Elements with this role are used for internal structure and ignored by screen readers.
   *
   */
  static ROLE_CONTAINER: any

  /**
   * Panel container element.
   *
   */
  static ROLE_PANEL: any

  /**
   * Button element.
   *
   */
  static ROLE_BUTTON: any

  /**
   * Link element.
   *
   */
  static ROLE_LINK: any

  /**
   * Check box element.
   *
   */
  static ROLE_CHECK_BOX: any

  /**
   * Radio button element.
   *
   */
  static ROLE_RADIO_BUTTON: any

  /**
   * Check button element.
   *
   */
  static ROLE_CHECK_BUTTON: any

  /**
   * Scroll bar element.
   *
   */
  static ROLE_SCROLL_BAR: any

  /**
   * Scroll container element.
   *
   */
  static ROLE_SCROLL_VIEW: any

  /**
   * Container splitter handle element.
   *
   */
  static ROLE_SPLITTER: any

  /**
   * Slider element.
   *
   */
  static ROLE_SLIDER: any

  /**
   * Spin box element.
   *
   */
  static ROLE_SPIN_BUTTON: any

  /**
   * Progress indicator element.
   *
   */
  static ROLE_PROGRESS_INDICATOR: any

  /**
   * Editable text field element.
   *
   */
  static ROLE_TEXT_FIELD: any

  /**
   * Multiline editable text field element.
   *
   */
  static ROLE_MULTILINE_TEXT_FIELD: any

  /**
   * Color picker element.
   *
   */
  static ROLE_COLOR_PICKER: any

  /**
   * Table element.
   *
   */
  static ROLE_TABLE: any

  /**
   * Table/tree cell element.
   *
   */
  static ROLE_CELL: any

  /**
   * Table/tree row element.
   *
   */
  static ROLE_ROW: any

  /**
   * Table/tree row group element.
   *
   */
  static ROLE_ROW_GROUP: any

  /**
   * Table/tree row header element.
   *
   */
  static ROLE_ROW_HEADER: any

  /**
   * Table/tree column header element.
   *
   */
  static ROLE_COLUMN_HEADER: any

  /**
   * Tree view element.
   *
   */
  static ROLE_TREE: any

  /**
   * Tree view item element.
   *
   */
  static ROLE_TREE_ITEM: any

  /**
   * List element.
   *
   */
  static ROLE_LIST: any

  /**
   * List item element.
   *
   */
  static ROLE_LIST_ITEM: any

  /**
   * List view element.
   *
   */
  static ROLE_LIST_BOX: any

  /**
   * List view item element.
   *
   */
  static ROLE_LIST_BOX_OPTION: any

  /**
   * Tab bar element.
   *
   */
  static ROLE_TAB_BAR: any

  /**
   * Tab bar item element.
   *
   */
  static ROLE_TAB: any

  /**
   * Tab panel element.
   *
   */
  static ROLE_TAB_PANEL: any

  /**
   * Menu bar element.
   *
   */
  static ROLE_MENU_BAR: any

  /**
   * Popup menu element.
   *
   */
  static ROLE_MENU: any

  /**
   * Popup menu item element.
   *
   */
  static ROLE_MENU_ITEM: any

  /**
   * Popup menu check button item element.
   *
   */
  static ROLE_MENU_ITEM_CHECK_BOX: any

  /**
   * Popup menu radio button item element.
   *
   */
  static ROLE_MENU_ITEM_RADIO: any

  /**
   * Image element.
   *
   */
  static ROLE_IMAGE: any

  /**
   * Window element.
   *
   */
  static ROLE_WINDOW: any

  /**
   * Embedded window title bar element.
   *
   */
  static ROLE_TITLE_BAR: any

  /**
   * Dialog window element.
   *
   */
  static ROLE_DIALOG: any

  /**
   * Tooltip element.
   *
   */
  static ROLE_TOOLTIP: any

  /**
   * Popup menu.
   *
   */
  static POPUP_MENU: any

  /**
   * Popup list.
   *
   */
  static POPUP_LIST: any

  /**
   * Popup tree view.
   *
   */
  static POPUP_TREE: any

  /**
   * Popup dialog.
   *
   */
  static POPUP_DIALOG: any

  /**
   * Element is hidden for accessibility tools.
   *
   */
  static FLAG_HIDDEN: any

  /**
   * Element supports multiple item selection.
   *
   */
  static FLAG_MULTISELECTABLE: any

  /**
   * Element require user input.
   *
   */
  static FLAG_REQUIRED: any

  /**
   * Element is a visited link.
   *
   */
  static FLAG_VISITED: any

  /**
   * Element content is not ready (e.g. loading).
   *
   */
  static FLAG_BUSY: any

  /**
   * Element is modal window.
   *
   */
  static FLAG_MODAL: any

  /**
   * Element allows touches to be passed through when a screen reader is in touch exploration mode.
   *
   */
  static FLAG_TOUCH_PASSTHROUGH: any

  /**
   * Element is text field with selectable but read-only text.
   *
   */
  static FLAG_READONLY: any

  /**
   * Element is disabled.
   *
   */
  static FLAG_DISABLED: any

  /**
   * Element clips children.
   *
   */
  static FLAG_CLIPS_CHILDREN: any

  /**
   * Single click action, callback argument is not set.
   *
   */
  static ACTION_CLICK: any

  /**
   * Focus action, callback argument is not set.
   *
   */
  static ACTION_FOCUS: any

  /**
   * Blur action, callback argument is not set.
   *
   */
  static ACTION_BLUR: any

  /**
   * Collapse action, callback argument is not set.
   *
   */
  static ACTION_COLLAPSE: any

  /**
   * Expand action, callback argument is not set.
   *
   */
  static ACTION_EXPAND: any

  /**
   * Decrement action, callback argument is not set.
   *
   */
  static ACTION_DECREMENT: any

  /**
   * Increment action, callback argument is not set.
   *
   */
  static ACTION_INCREMENT: any

  /**
   * Hide tooltip action, callback argument is not set.
   *
   */
  static ACTION_HIDE_TOOLTIP: any

  /**
   * Show tooltip action, callback argument is not set.
   *
   */
  static ACTION_SHOW_TOOLTIP: any

  /**
   * Set text selection action, callback argument is set to [Dictionary] with the following keys:
   *
   * - `"start_element"` accessibility element of the selection start.
   *
   * - `"start_char"` character offset relative to the accessibility element of the selection start.
   *
   * - `"end_element"` accessibility element of the selection end.
   *
   * - `"end_char"` character offset relative to the accessibility element of the selection end.
   *
   */
  static ACTION_SET_TEXT_SELECTION: any

  /**
   * Replace text action, callback argument is set to [String] with the replacement text.
   *
   */
  static ACTION_REPLACE_SELECTED_TEXT: any

  /**
   * Scroll backward action, callback argument is not set.
   *
   */
  static ACTION_SCROLL_BACKWARD: any

  /**
   * Scroll down action, callback argument is set to [enum AccessibilityScrollUnit].
   *
   */
  static ACTION_SCROLL_DOWN: any

  /**
   * Scroll forward action, callback argument is not set.
   *
   */
  static ACTION_SCROLL_FORWARD: any

  /**
   * Scroll left action, callback argument is set to [enum AccessibilityScrollUnit].
   *
   */
  static ACTION_SCROLL_LEFT: any

  /**
   * Scroll right action, callback argument is set to [enum AccessibilityScrollUnit].
   *
   */
  static ACTION_SCROLL_RIGHT: any

  /**
   * Scroll up action, callback argument is set to [enum AccessibilityScrollUnit].
   *
   */
  static ACTION_SCROLL_UP: any

  /**
   * Scroll into view action, callback argument is set to [enum AccessibilityScrollHint].
   *
   */
  static ACTION_SCROLL_INTO_VIEW: any

  /**
   * Scroll to point action, callback argument is set to [Vector2] with the relative point coordinates.
   *
   */
  static ACTION_SCROLL_TO_POINT: any

  /**
   * Set scroll offset action, callback argument is set to [Vector2] with the scroll offset.
   *
   */
  static ACTION_SET_SCROLL_OFFSET: any

  /**
   * Set value action, callback argument is set to [String] or number with the new value.
   *
   */
  static ACTION_SET_VALUE: any

  /**
   * Show context menu action, callback argument is not set.
   *
   */
  static ACTION_SHOW_CONTEXT_MENU: any

  /**
   * Custom action, callback argument is set to the integer action ID.
   *
   */
  static ACTION_CUSTOM: any

  /**
   * Indicates that updates to the live region should not be presented.
   *
   */
  static LIVE_OFF: any

  /**
   * Indicates that updates to the live region should be presented at the next opportunity (for example at the end of speaking the current sentence).
   *
   */
  static LIVE_POLITE: any

  /**
   * Indicates that updates to the live region have the highest priority and should be presented immediately.
   *
   */
  static LIVE_ASSERTIVE: any

  /**
   * The amount by which to scroll. A single item of a list, line of text.
   *
   */
  static SCROLL_UNIT_ITEM: any

  /**
   * The amount by which to scroll. A single page.
   *
   */
  static SCROLL_UNIT_PAGE: any

  /**
   * A preferred position for the node scrolled into view. Top-left edge of the scroll container.
   *
   */
  static SCROLL_HINT_TOP_LEFT: any

  /**
   * A preferred position for the node scrolled into view. Bottom-right edge of the scroll container.
   *
   */
  static SCROLL_HINT_BOTTOM_RIGHT: any

  /**
   * A preferred position for the node scrolled into view. Top edge of the scroll container.
   *
   */
  static SCROLL_HINT_TOP_EDGE: any

  /**
   * A preferred position for the node scrolled into view. Bottom edge of the scroll container.
   *
   */
  static SCROLL_HINT_BOTTOM_EDGE: any

  /**
   * A preferred position for the node scrolled into view. Left edge of the scroll container.
   *
   */
  static SCROLL_HINT_LEFT_EDGE: any

  /**
   * A preferred position for the node scrolled into view. Right edge of the scroll container.
   *
   */
  static SCROLL_HINT_RIGHT_EDGE: any

  /**
   * Makes the mouse cursor visible if it is hidden.
   *
   */
  static MOUSE_MODE_VISIBLE: any

  /**
   * Makes the mouse cursor hidden if it is visible.
   *
   */
  static MOUSE_MODE_HIDDEN: any

  /**
   * Captures the mouse. The mouse will be hidden and its position locked at the center of the window manager's window.
   *
   * **Note:** If you want to process the mouse's movement in this mode, you need to use [member InputEventMouseMotion.relative].
   *
   */
  static MOUSE_MODE_CAPTURED: any

  /**
   * Confines the mouse cursor to the game window, and make it visible.
   *
   */
  static MOUSE_MODE_CONFINED: any

  /**
   * Confines the mouse cursor to the game window, and make it hidden.
   *
   */
  static MOUSE_MODE_CONFINED_HIDDEN: any

  /**
   * Max value of the [enum MouseMode].
   *
   */
  static MOUSE_MODE_MAX: any

  /**
   * The ID that refers to a screen that does not exist. This is returned by some [DisplayServer] methods if no screen matches the requested result.
   *
   */
  static INVALID_SCREEN: any

  /**
   * Represents the screen containing the mouse pointer.
   *
   * **Note:** On Android, iOS, Web, and Linux (Wayland), this constant always represents the screen at index `0`.
   *
   */
  static SCREEN_WITH_MOUSE_FOCUS: any

  /**
   * Represents the screen containing the window with the keyboard focus.
   *
   * **Note:** On Android, iOS, Web, and Linux (Wayland), this constant always represents the screen at index `0`.
   *
   */
  static SCREEN_WITH_KEYBOARD_FOCUS: any

  /**
   * Represents the primary screen.
   *
   * **Note:** On Android, iOS, Web, and Linux (Wayland), this constant always represents the screen at index `0`.
   *
   */
  static SCREEN_PRIMARY: any

  /**
   * Represents the screen where the main window is located. This is usually the default value in functions that allow specifying one of several screens.
   *
   * **Note:** On Android, iOS, Web, and Linux (Wayland), this constant always represents the screen at index `0`.
   *
   */
  static SCREEN_OF_MAIN_WINDOW: any

  /**
   * The ID of the main window spawned by the engine, which can be passed to methods expecting a `window_id`.
   *
   */
  static MAIN_WINDOW_ID: any

  /**
   * The ID that refers to a nonexistent window. This is returned by some [DisplayServer] methods if no window matches the requested result.
   *
   */
  static INVALID_WINDOW_ID: any

  /**
   * The ID that refers to a nonexistent application status indicator.
   *
   */
  static INVALID_INDICATOR_ID: any

  /**
   * Default landscape orientation.
   *
   */
  static SCREEN_LANDSCAPE: any

  /**
   * Default portrait orientation.
   *
   */
  static SCREEN_PORTRAIT: any

  /**
   * Reverse landscape orientation (upside down).
   *
   */
  static SCREEN_REVERSE_LANDSCAPE: any

  /**
   * Reverse portrait orientation (upside down).
   *
   */
  static SCREEN_REVERSE_PORTRAIT: any

  /**
   * Automatic landscape orientation (default or reverse depending on sensor).
   *
   */
  static SCREEN_SENSOR_LANDSCAPE: any

  /**
   * Automatic portrait orientation (default or reverse depending on sensor).
   *
   */
  static SCREEN_SENSOR_PORTRAIT: any

  /**
   * Automatic landscape or portrait orientation (default or reverse depending on sensor).
   *
   */
  static SCREEN_SENSOR: any

  /**
   * Default text virtual keyboard.
   *
   */
  static KEYBOARD_TYPE_DEFAULT: any

  /**
   * Multiline virtual keyboard.
   *
   */
  static KEYBOARD_TYPE_MULTILINE: any

  /**
   * Virtual number keypad, useful for PIN entry.
   *
   */
  static KEYBOARD_TYPE_NUMBER: any

  /**
   * Virtual number keypad, useful for entering fractional numbers.
   *
   */
  static KEYBOARD_TYPE_NUMBER_DECIMAL: any

  /**
   * Virtual phone number keypad.
   *
   */
  static KEYBOARD_TYPE_PHONE: any

  /**
   * Virtual keyboard with additional keys to assist with typing email addresses.
   *
   */
  static KEYBOARD_TYPE_EMAIL_ADDRESS: any

  /**
   * Virtual keyboard for entering a password. On most platforms, this should disable autocomplete and autocapitalization.
   *
   * **Note:** This is not supported on Web. Instead, this behaves identically to [constant KEYBOARD_TYPE_DEFAULT].
   *
   */
  static KEYBOARD_TYPE_PASSWORD: any

  /**
   * Virtual keyboard with additional keys to assist with typing URLs.
   *
   */
  static KEYBOARD_TYPE_URL: any

  /**
   * Arrow cursor shape. This is the default when not pointing anything that overrides the mouse cursor, such as a [LineEdit] or [TextEdit].
   *
   */
  static CURSOR_ARROW: any

  /**
   * I-beam cursor shape. This is used by default when hovering a control that accepts text input, such as [LineEdit] or [TextEdit].
   *
   */
  static CURSOR_IBEAM: any

  /**
   * Pointing hand cursor shape. This is used by default when hovering a [LinkButton] or a URL tag in a [RichTextLabel].
   *
   */
  static CURSOR_POINTING_HAND: any

  /**
   * Crosshair cursor. This is intended to be displayed when the user needs precise aim over an element, such as a rectangle selection tool or a color picker.
   *
   */
  static CURSOR_CROSS: any

  /**
   * Wait cursor. On most cursor themes, this displays a spinning icon **besides** the arrow. Intended to be used for non-blocking operations (when the user can do something else at the moment). See also [constant CURSOR_BUSY].
   *
   */
  static CURSOR_WAIT: any

  /**
   * Wait cursor. On most cursor themes, this **replaces** the arrow with a spinning icon. Intended to be used for blocking operations (when the user can't do anything else at the moment). See also [constant CURSOR_WAIT].
   *
   */
  static CURSOR_BUSY: any

  /**
   * Dragging hand cursor. This is displayed during drag-and-drop operations. See also [constant CURSOR_CAN_DROP].
   *
   */
  static CURSOR_DRAG: any

  /**
   * "Can drop" cursor. This is displayed during drag-and-drop operations if hovering over a [Control] that can accept the drag-and-drop event. On most cursor themes, this displays a dragging hand with an arrow symbol besides it. See also [constant CURSOR_DRAG].
   *
   */
  static CURSOR_CAN_DROP: any

  /**
   * Forbidden cursor. This is displayed during drag-and-drop operations if the hovered [Control] can't accept the drag-and-drop event.
   *
   */
  static CURSOR_FORBIDDEN: any

  /**
   * Vertical resize cursor. Intended to be displayed when the hovered [Control] can be vertically resized using the mouse. See also [constant CURSOR_VSPLIT].
   *
   */
  static CURSOR_VSIZE: any

  /**
   * Horizontal resize cursor. Intended to be displayed when the hovered [Control] can be horizontally resized using the mouse. See also [constant CURSOR_HSPLIT].
   *
   */
  static CURSOR_HSIZE: any

  /**
   * Secondary diagonal resize cursor (top-right/bottom-left). Intended to be displayed when the hovered [Control] can be resized on both axes at once using the mouse.
   *
   */
  static CURSOR_BDIAGSIZE: any

  /**
   * Main diagonal resize cursor (top-left/bottom-right). Intended to be displayed when the hovered [Control] can be resized on both axes at once using the mouse.
   *
   */
  static CURSOR_FDIAGSIZE: any

  /**
   * Move cursor. Intended to be displayed when the hovered [Control] can be moved using the mouse.
   *
   */
  static CURSOR_MOVE: any

  /**
   * Vertical split cursor. This is displayed when hovering a [Control] with splits that can be vertically resized using the mouse, such as [VSplitContainer]. On some cursor themes, this cursor may have the same appearance as [constant CURSOR_VSIZE].
   *
   */
  static CURSOR_VSPLIT: any

  /**
   * Horizontal split cursor. This is displayed when hovering a [Control] with splits that can be horizontally resized using the mouse, such as [HSplitContainer]. On some cursor themes, this cursor may have the same appearance as [constant CURSOR_HSIZE].
   *
   */
  static CURSOR_HSPLIT: any

  /**
   * Help cursor. On most cursor themes, this displays a question mark icon instead of the mouse cursor. Intended to be used when the user has requested help on the next element that will be clicked.
   *
   */
  static CURSOR_HELP: any

  /**
   * Represents the size of the [enum CursorShape] enum.
   *
   */
  static CURSOR_MAX: any

  /**
   * The native file dialog allows selecting one, and only one file.
   *
   */
  static FILE_DIALOG_MODE_OPEN_FILE: any

  /**
   * The native file dialog allows selecting multiple files.
   *
   */
  static FILE_DIALOG_MODE_OPEN_FILES: any

  /**
   * The native file dialog only allows selecting a directory, disallowing the selection of any file.
   *
   */
  static FILE_DIALOG_MODE_OPEN_DIR: any

  /**
   * The native file dialog allows selecting one file or directory.
   *
   */
  static FILE_DIALOG_MODE_OPEN_ANY: any

  /**
   * The native file dialog will warn when a file exists.
   *
   */
  static FILE_DIALOG_MODE_SAVE_FILE: any

  /**
   * Windowed mode, i.e. [Window] doesn't occupy the whole screen (unless set to the size of the screen).
   *
   */
  static WINDOW_MODE_WINDOWED: any

  /**
   * Minimized window mode, i.e. [Window] is not visible and available on window manager's window list. Normally happens when the minimize button is pressed.
   *
   */
  static WINDOW_MODE_MINIMIZED: any

  /**
   * Maximized window mode, i.e. [Window] will occupy whole screen area except task bar and still display its borders. Normally happens when the maximize button is pressed.
   *
   */
  static WINDOW_MODE_MAXIMIZED: any

  /**
   * Full screen mode with full multi-window support.
   *
   * Full screen window covers the entire display area of a screen and has no decorations. The display's video mode is not changed.
   *
   * **On Android:** This enables immersive mode.
   *
   * **On macOS:** A new desktop is used to display the running project.
   *
   * **Note:** Regardless of the platform, enabling full screen will change the window size to match the monitor's size. Therefore, make sure your project supports [url=$DOCS_URL/tutorials/rendering/multiple_resolutions.html]multiple resolutions[/url] when enabling full screen mode.
   *
   */
  static WINDOW_MODE_FULLSCREEN: any

  /**
   * A single window full screen mode. This mode has less overhead, but only one window can be open on a given screen at a time (opening a child window or application switching will trigger a full screen transition).
   *
   * Full screen window covers the entire display area of a screen and has no border or decorations. The display's video mode is not changed.
   *
   * **Note:** This mode might not work with screen recording software.
   *
   * **On Android:** This enables immersive mode.
   *
   * **On Windows:** Depending on video driver, full screen transition might cause screens to go black for a moment.
   *
   * **On macOS:** A new desktop is used to display the running project. Exclusive full screen mode prevents Dock and Menu from showing up when the mouse pointer is hovering the edge of the screen.
   *
   * **On Linux (X11):** Exclusive full screen mode bypasses compositor.
   *
   * **On Linux (Wayland):** Equivalent to [constant WINDOW_MODE_FULLSCREEN].
   *
   * **Note:** Regardless of the platform, enabling full screen will change the window size to match the monitor's size. Therefore, make sure your project supports [url=$DOCS_URL/tutorials/rendering/multiple_resolutions.html]multiple resolutions[/url] when enabling full screen mode.
   *
   */
  static WINDOW_MODE_EXCLUSIVE_FULLSCREEN: any

  /**
   * The window can't be resized by dragging its resize grip. It's still possible to resize the window using [method window_set_size]. This flag is ignored for full screen windows.
   *
   */
  static WINDOW_FLAG_RESIZE_DISABLED: any

  /**
   * The window do not have native title bar and other decorations. This flag is ignored for full-screen windows.
   *
   */
  static WINDOW_FLAG_BORDERLESS: any

  /**
   * The window is floating on top of all other windows. This flag is ignored for full-screen windows.
   *
   */
  static WINDOW_FLAG_ALWAYS_ON_TOP: any

  /**
   * The window background can be transparent.
   *
   * **Note:** This flag has no effect if [method is_window_transparency_available] returns `false`.
   *
   * **Note:** Transparency support is implemented on Linux (X11/Wayland), macOS, and Windows, but availability might vary depending on GPU driver, display manager, and compositor capabilities.
   *
   * **Note:** Transparency support is implemented on Android, but can only be enabled via [member ProjectSettings.display/window/per_pixel_transparency/allowed]. This flag has no effect on Android.
   *
   */
  static WINDOW_FLAG_TRANSPARENT: any

  /**
   * The window can't be focused. No-focus window will ignore all input, except mouse clicks.
   *
   */
  static WINDOW_FLAG_NO_FOCUS: any

  /**
   * Window is part of menu or [OptionButton] dropdown. This flag can't be changed when the window is visible. An active popup window will exclusively receive all input, without stealing focus from its parent. Popup windows are automatically closed when uses click outside it, or when an application is switched. Popup window must have transient parent set (see [method window_set_transient]).
   *
   */
  static WINDOW_FLAG_POPUP: any

  /**
   * Window content is expanded to the full size of the window. Unlike borderless window, the frame is left intact and can be used to resize the window, title bar is transparent, but have minimize/maximize/close buttons.
   *
   * Use [method window_set_window_buttons_offset] to adjust minimize/maximize/close buttons offset.
   *
   * Use [method window_get_safe_title_margins] to determine area under the title bar that is not covered by decorations.
   *
   * **Note:** This flag is implemented only on macOS.
   *
   */
  static WINDOW_FLAG_EXTEND_TO_TITLE: any

  /**
   * All mouse events are passed to the underlying window of the same application.
   *
   */
  static WINDOW_FLAG_MOUSE_PASSTHROUGH: any

  /**
   * Window style is overridden, forcing sharp corners.
   *
   * **Note:** This flag is implemented only on Windows (11).
   *
   */
  static WINDOW_FLAG_SHARP_CORNERS: any

  /**
   * Window is excluded from screenshots taken by [method screen_get_image], [method screen_get_image_rect], and [method screen_get_pixel].
   *
   * **Note:** This flag is implemented on macOS and Windows (10, 20H1).
   *
   * **Note:** Setting this flag will prevent standard screenshot methods from capturing a window image, but does **NOT** guarantee that other apps won't be able to capture an image. It should not be used as a DRM or security measure.
   *
   */
  static WINDOW_FLAG_EXCLUDE_FROM_CAPTURE: any

  /**
   * Signals the window manager that this window is supposed to be an implementation-defined "popup" (usually a floating, borderless, untileable and immovable child window).
   *
   */
  static WINDOW_FLAG_POPUP_WM_HINT: any

  /**
   * Window minimize button is disabled.
   *
   * **Note:** This flag is implemented on macOS and Windows.
   *
   */
  static WINDOW_FLAG_MINIMIZE_DISABLED: any

  /**
   * Window maximize button is disabled.
   *
   * **Note:** This flag is implemented on macOS and Windows.
   *
   */
  static WINDOW_FLAG_MAXIMIZE_DISABLED: any

  /**
   * Represents the size of the [enum WindowFlags] enum.
   *
   */
  static WINDOW_FLAG_MAX: any

  /**
   * Sent when the mouse pointer enters the window.
   *
   */
  static WINDOW_EVENT_MOUSE_ENTER: any

  /**
   * Sent when the mouse pointer exits the window.
   *
   */
  static WINDOW_EVENT_MOUSE_EXIT: any

  /**
   * Sent when the window grabs focus.
   *
   */
  static WINDOW_EVENT_FOCUS_IN: any

  /**
   * Sent when the window loses focus.
   *
   */
  static WINDOW_EVENT_FOCUS_OUT: any

  /**
   * Sent when the user has attempted to close the window (e.g. close button is pressed).
   *
   */
  static WINDOW_EVENT_CLOSE_REQUEST: any

  /**
   * Sent when the device "Back" button is pressed.
   *
   * **Note:** This event is implemented only on Android.
   *
   */
  static WINDOW_EVENT_GO_BACK_REQUEST: any

  /**
   * Sent when the window is moved to the display with different DPI, or display DPI is changed.
   *
   * **Note:** This flag is implemented only on macOS and Linux (Wayland).
   *
   */
  static WINDOW_EVENT_DPI_CHANGE: any

  /**
   * Sent when the window title bar decoration is changed (e.g. [constant WINDOW_FLAG_EXTEND_TO_TITLE] is set or window entered/exited full screen mode).
   *
   * **Note:** This flag is implemented only on macOS.
   *
   */
  static WINDOW_EVENT_TITLEBAR_CHANGE: any

  /**
   * Sent when the window has been forcibly closed by the display server. The window will immediately hide and clean any internal rendering references.
   *
   * **Note:** This flag is implemented only on Linux (Wayland).
   *
   */
  static WINDOW_EVENT_FORCE_CLOSE: any

  /**
   * Top-left edge of a window.
   *
   */
  static WINDOW_EDGE_TOP_LEFT: any

  /**
   * Top edge of a window.
   *
   */
  static WINDOW_EDGE_TOP: any

  /**
   * Top-right edge of a window.
   *
   */
  static WINDOW_EDGE_TOP_RIGHT: any

  /**
   * Left edge of a window.
   *
   */
  static WINDOW_EDGE_LEFT: any

  /**
   * Right edge of a window.
   *
   */
  static WINDOW_EDGE_RIGHT: any

  /**
   * Bottom-left edge of a window.
   *
   */
  static WINDOW_EDGE_BOTTOM_LEFT: any

  /**
   * Bottom edge of a window.
   *
   */
  static WINDOW_EDGE_BOTTOM: any

  /**
   * Bottom-right edge of a window.
   *
   */
  static WINDOW_EDGE_BOTTOM_RIGHT: any

  /**
   * Represents the size of the [enum WindowResizeEdge] enum.
   *
   */
  static WINDOW_EDGE_MAX: any

  /**
   * No vertical synchronization, which means the engine will display frames as fast as possible (tearing may be visible). Framerate is unlimited (regardless of [member Engine.max_fps]).
   *
   */
  static VSYNC_DISABLED: any

  /**
   * Default vertical synchronization mode, the image is displayed only on vertical blanking intervals (no tearing is visible). Framerate is limited by the monitor refresh rate (regardless of [member Engine.max_fps]).
   *
   */
  static VSYNC_ENABLED: any

  /**
   * Behaves like [constant VSYNC_DISABLED] when the framerate drops below the screen's refresh rate to reduce stuttering (tearing may be visible). Otherwise, vertical synchronization is enabled to avoid tearing. Framerate is limited by the monitor refresh rate (regardless of [member Engine.max_fps]). Behaves like [constant VSYNC_ENABLED] when using the Compatibility rendering method.
   *
   */
  static VSYNC_ADAPTIVE: any

  /**
   * Displays the most recent image in the queue on vertical blanking intervals, while rendering to the other images (no tearing is visible). Framerate is unlimited (regardless of [member Engine.max_fps]).
   *
   * Although not guaranteed, the images can be rendered as fast as possible, which may reduce input lag (also called "Fast" V-Sync mode). [constant VSYNC_MAILBOX] works best when at least twice as many frames as the display refresh rate are rendered. Behaves like [constant VSYNC_ENABLED] when using the Compatibility rendering method.
   *
   */
  static VSYNC_MAILBOX: any

  /**
   * Display handle:
   *
   * - Linux (X11): `X11::Display*` for the display.
   *
   * - Linux (Wayland): `wl_display` for the display.
   *
   * - Android: `EGLDisplay` for the display.
   *
   */
  static DISPLAY_HANDLE: any

  /**
   * Window handle:
   *
   * - Windows: `HWND` for the window.
   *
   * - Linux (X11): `X11::Window*` for the window.
   *
   * - Linux (Wayland): `wl_surface` for the window.
   *
   * - macOS: `NSWindow*` for the window.
   *
   * - iOS: `UIViewController*` for the view controller.
   *
   * - Android: `jObject` for the activity.
   *
   */
  static WINDOW_HANDLE: any

  /**
   * Window view:
   *
   * - Windows: `HDC` for the window (only with the Compatibility renderer).
   *
   * - macOS: `NSView*` for the window main view.
   *
   * - iOS: `UIView*` for the window main view.
   *
   */
  static WINDOW_VIEW: any

  /**
   * OpenGL context (only with the Compatibility renderer):
   *
   * - Windows: `HGLRC` for the window (native GL), or `EGLContext` for the window (ANGLE).
   *
   * - Linux (X11): `GLXContext*` for the window.
   *
   * - Linux (Wayland): `EGLContext` for the window.
   *
   * - macOS: `NSOpenGLContext*` for the window (native GL), or `EGLContext` for the window (ANGLE).
   *
   * - Android: `EGLContext` for the window.
   *
   */
  static OPENGL_CONTEXT: any

  /**
   * - Windows: `EGLDisplay` for the window (ANGLE).
   *
   * - macOS: `EGLDisplay` for the window (ANGLE).
   *
   * - Linux (Wayland): `EGLDisplay` for the window.
   *
   */
  static EGL_DISPLAY: any

  /**
   * - Windows: `EGLConfig` for the window (ANGLE).
   *
   * - macOS: `EGLConfig` for the window (ANGLE).
   *
   * - Linux (Wayland): `EGLConfig` for the window.
   *
   */
  static EGL_CONFIG: any

  /**
   * Utterance has begun to be spoken.
   *
   */
  static TTS_UTTERANCE_STARTED: any

  /**
   * Utterance was successfully finished.
   *
   */
  static TTS_UTTERANCE_ENDED: any

  /**
   * Utterance was canceled, or TTS service was unable to process it.
   *
   */
  static TTS_UTTERANCE_CANCELED: any

  /**
   * Utterance reached a word or sentence boundary.
   *
   */
  static TTS_UTTERANCE_BOUNDARY: any
}
