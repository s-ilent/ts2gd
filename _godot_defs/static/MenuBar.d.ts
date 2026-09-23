/**
 * A horizontal menu bar that creates a menu for each [PopupMenu] child. New items are created by adding [PopupMenu]s to this node. Item title is determined by [member Window.title], or node name if [member Window.title] is empty. Item title can be overridden using [method set_menu_title].
 *
 */
declare class MenuBar extends Control {
  /**
   * A horizontal menu bar that creates a menu for each [PopupMenu] child. New items are created by adding [PopupMenu]s to this node. Item title is determined by [member Window.title], or node name if [member Window.title] is empty. Item title can be overridden using [method set_menu_title].
   *
   */
  new(): MenuBar
  constructor()
  static new(): MenuBar

  /** Flat [MenuBar] don't display item decoration. */
  flat: boolean

  /** Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead. */
  language: string

  /**
   * If `true`, [MenuBar] will use system global menu when supported.
   *
   * **Note:** If `true` and global menu is supported, this node is not displayed, has zero size, and all its child nodes except [PopupMenu]s are inaccessible.
   *
   * **Note:** This property overrides the value of the [member PopupMenu.prefer_native_menu] property of the child nodes.
   *
   */
  prefer_global_menu: boolean

  /** Position order in the global menu to insert [MenuBar] items at. All menu items in the [MenuBar] are always inserted as a continuous range. Menus with lower [member start_index] are inserted first. Menus with [member start_index] equal to [code]-1[/code] are inserted last. */
  start_index: int

  /** If [code]true[/code], when the cursor hovers above menu item, it will close the current [PopupMenu] and open the other one. */
  switch_on_hover: boolean

  /** Base text writing direction. */
  text_direction: int

  /** Returns number of menu items. */
  get_menu_count(): int

  /** Returns [PopupMenu] associated with menu item. */
  get_menu_popup(menu: int): PopupMenu

  /** Returns menu item title. */
  get_menu_title(menu: int): string

  /** Returns menu item tooltip. */
  get_menu_tooltip(menu: int): string

  /** Returns [code]true[/code] if the menu item is disabled. */
  is_menu_disabled(menu: int): boolean

  /** Returns [code]true[/code] if the menu item is hidden. */
  is_menu_hidden(menu: int): boolean

  /** Returns [code]true[/code] if the current system's global menu is supported and used by this [MenuBar]. */
  is_native_menu(): boolean

  /** If [code]true[/code], shortcuts are disabled and cannot be used to trigger the button. */
  set_disable_shortcuts(disabled: boolean): void

  /** If [code]true[/code], menu item is disabled. */
  set_menu_disabled(menu: int, disabled: boolean): void

  /** If [code]true[/code], menu item is hidden. */
  set_menu_hidden(menu: int, hidden: boolean): void

  /** Sets menu item title. */
  set_menu_title(menu: int, title: string): void

  /** Sets menu item tooltip. */
  set_menu_tooltip(menu: int, tooltip: string): void

  connect<T extends SignalsOf<MenuBar>>(
    signal: T,
    method: SignalFunction<MenuBar[T]>
  ): number
}
