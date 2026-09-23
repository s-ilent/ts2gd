/**
 * [NativeMenu] handles low-level access to the OS native global menu bar and popup menus.
 *
 * **Note:** This is low-level API, consider using [MenuBar] with [member MenuBar.prefer_global_menu] set to `true`, and [PopupMenu] with [member PopupMenu.prefer_native_menu] set to `true`.
 *
 * To create a menu, use [method create_menu], add menu items using `add_*_item` methods. To remove a menu, use [method free_menu].
 *
 * @example
 *
 * var menu
 * func _menu_callback(item_id):
 * 	if item_id == "ITEM_CUT":
 * 		cut()
 * 	elif item_id == "ITEM_COPY":
 * 		copy()
 * 	elif item_id == "ITEM_PASTE":
 * 		paste()
 * func _enter_tree():
 * 	# Create new menu and add items:
 * 	menu = NativeMenu.create_menu()
 * 	NativeMenu.add_item(menu, "Cut", _menu_callback, Callable(), "ITEM_CUT")
 * 	NativeMenu.add_item(menu, "Copy", _menu_callback, Callable(), "ITEM_COPY")
 * 	NativeMenu.add_separator(menu)
 * 	NativeMenu.add_item(menu, "Paste", _menu_callback, Callable(), "ITEM_PASTE")
 * func _on_button_pressed():
 * 	# Show popup menu at mouse position:
 * 	NativeMenu.popup(menu, DisplayServer.mouse_get_position())
 * func _exit_tree():
 * 	# Remove menu when it's no longer needed:
 * 	NativeMenu.free_menu(menu)
 * @summary
 *
 *
 */
declare class NativeMenuClass extends Object {
  /**
   * [NativeMenu] handles low-level access to the OS native global menu bar and popup menus.
   *
   * **Note:** This is low-level API, consider using [MenuBar] with [member MenuBar.prefer_global_menu] set to `true`, and [PopupMenu] with [member PopupMenu.prefer_native_menu] set to `true`.
   *
   * To create a menu, use [method create_menu], add menu items using `add_*_item` methods. To remove a menu, use [method free_menu].
   *
   * @example
   *
   * var menu
   * func _menu_callback(item_id):
   * 	if item_id == "ITEM_CUT":
   * 		cut()
   * 	elif item_id == "ITEM_COPY":
   * 		copy()
   * 	elif item_id == "ITEM_PASTE":
   * 		paste()
   * func _enter_tree():
   * 	# Create new menu and add items:
   * 	menu = NativeMenu.create_menu()
   * 	NativeMenu.add_item(menu, "Cut", _menu_callback, Callable(), "ITEM_CUT")
   * 	NativeMenu.add_item(menu, "Copy", _menu_callback, Callable(), "ITEM_COPY")
   * 	NativeMenu.add_separator(menu)
   * 	NativeMenu.add_item(menu, "Paste", _menu_callback, Callable(), "ITEM_PASTE")
   * func _on_button_pressed():
   * 	# Show popup menu at mouse position:
   * 	NativeMenu.popup(menu, DisplayServer.mouse_get_position())
   * func _exit_tree():
   * 	# Remove menu when it's no longer needed:
   * 	NativeMenu.free_menu(menu)
   * @summary
   *
   *
   */
  new(): NativeMenuClass
  constructor()
  static new(): NativeMenuClass

  /**
   * Adds a new checkable item with text [param label] to the global menu [param rid].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   * **Note:** On Windows, [param accelerator] and [param key_callback] are ignored.
   *
   */
  add_check_item(
    rid: RID,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new checkable item with text [param label] and icon [param icon] to the global menu [param rid].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   * **Note:** On Windows, [param accelerator] and [param key_callback] are ignored.
   *
   */
  add_icon_check_item(
    rid: RID,
    icon: Texture2D,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new item with text [param label] and icon [param icon] to the global menu [param rid].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   * **Note:** On Windows, [param accelerator] and [param key_callback] are ignored.
   *
   */
  add_icon_item(
    rid: RID,
    icon: Texture2D,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new radio-checkable item with text [param label] and icon [param icon] to the global menu [param rid].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** Radio-checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method set_item_checked] for more info on how to control it.
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   * **Note:** On Windows, [param accelerator] and [param key_callback] are ignored.
   *
   */
  add_icon_radio_check_item(
    rid: RID,
    icon: Texture2D,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new item with text [param label] to the global menu [param rid].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   * **Note:** On Windows, [param accelerator] and [param key_callback] are ignored.
   *
   */
  add_item(
    rid: RID,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a new item with text [param label] to the global menu [param rid].
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
   * **Note:** This method is implemented on macOS and Windows.
   *
   * **Note:** On Windows, [param accelerator] and [param key_callback] are ignored.
   *
   */
  add_multistate_item(
    rid: RID,
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
   * Adds a new radio-checkable item with text [param label] to the global menu [param rid].
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * An [param accelerator] can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The [param accelerator] is generally a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** Radio-checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See [method set_item_checked] for more info on how to control it.
   *
   * **Note:** The [param callback] and [param key_callback] Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to [param tag].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   * **Note:** On Windows, [param accelerator] and [param key_callback] are ignored.
   *
   */
  add_radio_check_item(
    rid: RID,
    label: string,
    callback?: Callable,
    key_callback?: Callable,
    tag?: any,
    accelerator?: int,
    index?: int
  ): int

  /**
   * Adds a separator between items to the global menu [param rid]. Separators also occupy an index.
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  add_separator(rid: RID, index?: int): int

  /**
   * Adds an item that will act as a submenu of the global menu [param rid]. The [param submenu_rid] argument is the RID of the global menu that will be shown when the item is clicked.
   *
   * Returns index of the inserted item, it's not guaranteed to be the same as [param index] value.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  add_submenu_item(
    rid: RID,
    label: string,
    submenu_rid: RID,
    tag?: any,
    index?: int
  ): int

  /**
   * Removes all items from the global menu [param rid].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  clear(rid: RID): void

  /**
   * Creates a new global menu object.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  create_menu(): RID

  /**
   * Returns the index of the item with the submenu specified by [param submenu_rid]. Indices are automatically assigned to each item by the engine, and cannot be set manually.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  find_item_index_with_submenu(rid: RID, submenu_rid: RID): int

  /**
   * Returns the index of the item with the specified [param tag]. Indices are automatically assigned to each item by the engine, and cannot be set manually.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  find_item_index_with_tag(rid: RID, tag: any): int

  /**
   * Returns the index of the item with the specified [param text]. Indices are automatically assigned to each item by the engine, and cannot be set manually.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  find_item_index_with_text(rid: RID, text: string): int

  /**
   * Frees a global menu object created by this [NativeMenu].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  free_menu(rid: RID): void

  /**
   * Returns the accelerator of the item at index [param idx]. Accelerators are special combinations of keys that activate the item, no matter which control is focused.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  get_item_accelerator(rid: RID, idx: int): int

  /**
   * Returns the callback of the item at index [param idx].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_item_callback(rid: RID, idx: int): Callable

  /**
   * Returns number of items in the global menu [param rid].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_item_count(rid: RID): int

  /**
   * Returns the icon of the item at index [param idx].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_item_icon(rid: RID, idx: int): Texture2D

  /**
   * Returns the horizontal offset of the item at the given [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  get_item_indentation_level(rid: RID, idx: int): int

  /**
   * Returns the callback of the item accelerator at index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  get_item_key_callback(rid: RID, idx: int): Callable

  /**
   * Returns number of states of a multistate item. See [method add_multistate_item] for details.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_item_max_states(rid: RID, idx: int): int

  /**
   * Returns the state of a multistate item. See [method add_multistate_item] for details.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_item_state(rid: RID, idx: int): int

  /**
   * Returns the submenu ID of the item at index [param idx]. See [method add_submenu_item] for more info on how to add a submenu.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_item_submenu(rid: RID, idx: int): RID

  /**
   * Returns the metadata of the specified item, which might be of any type. You can set it with [method set_item_tag], which provides a simple way of assigning context data to items.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_item_tag(rid: RID, idx: int): any

  /**
   * Returns the text of the item at index [param idx].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_item_text(rid: RID, idx: int): string

  /**
   * Returns the tooltip associated with the specified index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  get_item_tooltip(rid: RID, idx: int): string

  /**
   * Returns global menu minimum width.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  get_minimum_width(rid: RID): float

  /**
   * Returns global menu close callback.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_popup_close_callback(rid: RID): Callable

  /**
   * Returns global menu open callback.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  get_popup_open_callback(rid: RID): Callable

  /**
   * Returns global menu size.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  get_size(rid: RID): Vector2

  /**
   * Returns RID of a special system menu.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  get_system_menu(menu_id: int): RID

  /**
   * Returns readable name of a special system menu.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  get_system_menu_name(menu_id: int): string

  /**
   * Returns the text of the system menu item.
   *
   * **Note:** This method is implemented on macOS.
   *
   */
  get_system_menu_text(menu_id: int): string

  /**
   * Returns `true` if the specified [param feature] is supported by the current [NativeMenu], `false` otherwise.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  has_feature(feature: int): boolean

  /**
   * Returns `true` if [param rid] is valid global menu.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  has_menu(rid: RID): boolean

  /**
   * Returns `true` if a special system menu is supported.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  has_system_menu(menu_id: int): boolean

  /**
   * Returns `true` if the item at index [param idx] is checkable in some way, i.e. if it has a checkbox or radio button.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  is_item_checkable(rid: RID, idx: int): boolean

  /**
   * Returns `true` if the item at index [param idx] is checked.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  is_item_checked(rid: RID, idx: int): boolean

  /**
   * Returns `true` if the item at index [param idx] is disabled. When it is disabled it can't be selected, or its action invoked.
   *
   * See [method set_item_disabled] for more info on how to disable an item.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  is_item_disabled(rid: RID, idx: int): boolean

  /**
   * Returns `true` if the item at index [param idx] is hidden.
   *
   * See [method set_item_hidden] for more info on how to hide an item.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  is_item_hidden(rid: RID, idx: int): boolean

  /**
   * Returns `true` if the item at index [param idx] has radio button-style checkability.
   *
   * **Note:** This is purely cosmetic; you must add the logic for checking/unchecking items in radio groups.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  is_item_radio_checkable(rid: RID, idx: int): boolean

  /**
   * Returns `true` if the menu is currently opened.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  is_opened(rid: RID): boolean

  /**
   * Return `true` is global menu is a special system menu.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  is_system_menu(rid: RID): boolean

  /**
   * Shows the global menu at [param position] in the screen coordinates.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  popup(rid: RID, position: Vector2i): void

  /**
   * Removes the item at index [param idx] from the global menu [param rid].
   *
   * **Note:** The indices of items after the removed item will be shifted by one.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  remove_item(rid: RID, idx: int): void

  /**
   * Sets the menu text layout direction from right-to-left if [param is_rtl] is `true`.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_interface_direction(rid: RID, is_rtl: boolean): void

  /**
   * Sets the accelerator of the item at index [param idx]. [param keycode] can be a single [enum Key], or a combination of [enum KeyModifierMask]s and [enum Key]s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` ([kbd]Ctrl + A[/kbd]).
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  set_item_accelerator(rid: RID, idx: int, keycode: int): void

  /**
   * Sets the callback of the item at index [param idx]. Callback is emitted when an item is pressed.
   *
   * **Note:** The [param callback] Callable needs to accept exactly one Variant parameter, the parameter passed to the Callable will be the value passed to the `tag` parameter when the menu item was created.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_callback(rid: RID, idx: int, callback: Callable): void

  /**
   * Sets whether the item at index [param idx] has a checkbox. If `false`, sets the type of the item to plain text.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_checkable(rid: RID, idx: int, checkable: boolean): void

  /**
   * Sets the checkstate status of the item at index [param idx].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_checked(rid: RID, idx: int, checked: boolean): void

  /**
   * Enables/disables the item at index [param idx]. When it is disabled, it can't be selected and its action can't be invoked.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_disabled(rid: RID, idx: int, disabled: boolean): void

  /**
   * Hides/shows the item at index [param idx]. When it is hidden, an item does not appear in a menu and its action cannot be invoked.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  set_item_hidden(rid: RID, idx: int, hidden: boolean): void

  /**
   * Sets the callback of the item at index [param idx]. The callback is emitted when an item is hovered.
   *
   * **Note:** The [param callback] Callable needs to accept exactly one Variant parameter, the parameter passed to the Callable will be the value passed to the `tag` parameter when the menu item was created.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  set_item_hover_callbacks(rid: RID, idx: int, callback: Callable): void

  /**
   * Replaces the [Texture2D] icon of the specified [param idx].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   * **Note:** This method is not supported by macOS Dock menu items.
   *
   */
  set_item_icon(rid: RID, idx: int, icon: Texture2D): void

  /**
   * Sets the horizontal offset of the item at the given [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  set_item_indentation_level(rid: RID, idx: int, level: int): void

  /**
   * Sets the callback of the item at index [param idx]. Callback is emitted when its accelerator is activated.
   *
   * **Note:** The [param key_callback] Callable needs to accept exactly one Variant parameter, the parameter passed to the Callable will be the value passed to the `tag` parameter when the menu item was created.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  set_item_key_callback(rid: RID, idx: int, key_callback: Callable): void

  /**
   * Sets number of state of a multistate item. See [method add_multistate_item] for details.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_max_states(rid: RID, idx: int, max_states: int): void

  /**
   * Sets the type of the item at the specified index [param idx] to radio button. If `false`, sets the type of the item to plain text.
   *
   * **Note:** This is purely cosmetic; you must add the logic for checking/unchecking items in radio groups.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_radio_checkable(rid: RID, idx: int, checkable: boolean): void

  /**
   * Sets the state of a multistate item. See [method add_multistate_item] for details.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_state(rid: RID, idx: int, state: int): void

  /**
   * Sets the submenu RID of the item at index [param idx]. The submenu is a global menu that would be shown when the item is clicked.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_submenu(rid: RID, idx: int, submenu_rid: RID): void

  /**
   * Sets the metadata of an item, which may be of any type. You can later get it with [method get_item_tag], which provides a simple way of assigning context data to items.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_tag(rid: RID, idx: int, tag: any): void

  /**
   * Sets the text of the item at index [param idx].
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_item_text(rid: RID, idx: int, text: string): void

  /**
   * Sets the [String] tooltip of the item at the specified index [param idx].
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  set_item_tooltip(rid: RID, idx: int, tooltip: string): void

  /**
   * Sets the minimum width of the global menu.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  set_minimum_width(rid: RID, width: float): void

  /**
   * Registers callable to emit when the menu is about to show.
   *
   * **Note:** The OS can simulate menu opening to track menu item changes and global shortcuts, in which case the corresponding close callback is not triggered. Use [method is_opened] to check if the menu is currently opened.
   *
   * **Note:** This method is implemented on macOS and Windows.
   *
   */
  set_popup_close_callback(rid: RID, callback: Callable): void

  /**
   * Registers callable to emit after the menu is closed.
   *
   * **Note:** This method is implemented only on macOS.
   *
   */
  set_popup_open_callback(rid: RID, callback: Callable): void

  /**
   * Sets the text of the system menu item.
   *
   * **Note:** This method is implemented on macOS.
   *
   */
  set_system_menu_text(menu_id: int, name: string): void

  connect<T extends SignalsOf<NativeMenuClass>>(
    signal: T,
    method: SignalFunction<NativeMenuClass[T]>
  ): number

  /**
   * [NativeMenu] supports native global main menu.
   *
   */
  static FEATURE_GLOBAL_MENU: any

  /**
   * [NativeMenu] supports native popup menus.
   *
   */
  static FEATURE_POPUP_MENU: any

  /**
   * [NativeMenu] supports menu open and close callbacks.
   *
   */
  static FEATURE_OPEN_CLOSE_CALLBACK: any

  /**
   * [NativeMenu] supports menu item hover callback.
   *
   */
  static FEATURE_HOVER_CALLBACK: any

  /**
   * [NativeMenu] supports menu item accelerator/key callback.
   *
   */
  static FEATURE_KEY_CALLBACK: any

  /**
   * Invalid special system menu ID.
   *
   */
  static INVALID_MENU_ID: any

  /**
   * Global main menu ID.
   *
   */
  static MAIN_MENU_ID: any

  /**
   * Application (first menu after "Apple" menu on macOS) menu ID.
   *
   */
  static APPLICATION_MENU_ID: any

  /**
   * "Window" menu ID (on macOS this menu includes standard window control items and a list of open windows).
   *
   */
  static WINDOW_MENU_ID: any

  /**
   * "Help" menu ID (on macOS this menu includes help search bar).
   *
   */
  static HELP_MENU_ID: any

  /**
   * Dock icon right-click menu ID (on macOS this menu include standard application control items and a list of open windows).
   *
   */
  static DOCK_MENU_ID: any
}
