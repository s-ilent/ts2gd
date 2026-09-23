/**
 * This class provides access to a number of different monitors related to performance, such as memory usage, draw calls, and FPS. These are the same as the values displayed in the **Monitor** tab in the editor's **Debugger** panel. By using the [method get_monitor] method of this class, you can access this data from your code.
 *
 * You can add custom monitors using the [method add_custom_monitor] method. Custom monitors are available in **Monitor** tab in the editor's **Debugger** panel together with built-in monitors.
 *
 * **Note:** Some of the built-in monitors are only available in debug mode and will always return `0` when used in a project exported in release mode.
 *
 * **Note:** Some of the built-in monitors are not updated in real-time for performance reasons, so there may be a delay of up to 1 second between changes.
 *
 * **Note:** Custom monitors do not support negative values. Negative values are clamped to 0.
 *
 */
declare class PerformanceClass extends Object {
  /**
   * This class provides access to a number of different monitors related to performance, such as memory usage, draw calls, and FPS. These are the same as the values displayed in the **Monitor** tab in the editor's **Debugger** panel. By using the [method get_monitor] method of this class, you can access this data from your code.
   *
   * You can add custom monitors using the [method add_custom_monitor] method. Custom monitors are available in **Monitor** tab in the editor's **Debugger** panel together with built-in monitors.
   *
   * **Note:** Some of the built-in monitors are only available in debug mode and will always return `0` when used in a project exported in release mode.
   *
   * **Note:** Some of the built-in monitors are not updated in real-time for performance reasons, so there may be a delay of up to 1 second between changes.
   *
   * **Note:** Custom monitors do not support negative values. Negative values are clamped to 0.
   *
   */
  new(): PerformanceClass
  constructor()
  static new(): PerformanceClass

  /**
   * Adds a custom monitor with the name [param id]. You can specify the category of the monitor using slash delimiters in [param id] (for example: `"Game/NumberOfNPCs"`). If there is more than one slash delimiter, then the default category is used. The default category is `"Custom"`. Prints an error if given [param id] is already present.
   *
   * @example
   *
   *
   * func _ready():
   * 	var monitor_value = Callable(self, "get_monitor_value")
   * 	# Adds monitor with name "MyName" to category "MyCategory".
   * 	Performance.add_custom_monitor("MyCategory/MyMonitor", monitor_value)
   * 	# Adds monitor with name "MyName" to category "Custom".
   * 	# Note: "MyCategory/MyMonitor" and "MyMonitor" have same name but different IDs, so the code is valid.
   * 	Performance.add_custom_monitor("MyMonitor", monitor_value)
   * 	# Adds monitor with name "MyName" to category "Custom".
   * 	# Note: "MyMonitor" and "Custom/MyMonitor" have same name and same category but different IDs, so the code is valid.
   * 	Performance.add_custom_monitor("Custom/MyMonitor", monitor_value)
   * 	# Adds monitor with name "MyCategoryOne/MyCategoryTwo/MyMonitor" to category "Custom".
   * 	Performance.add_custom_monitor("MyCategoryOne/MyCategoryTwo/MyMonitor", monitor_value)
   * func get_monitor_value():
   * 	return randi() % 25
   *
   *
   * public override void _Ready()
   * {
   * 	var monitorValue = new Callable(this, MethodName.GetMonitorValue);
   * 	// Adds monitor with name "MyName" to category "MyCategory".
   * 	Performance.AddCustomMonitor("MyCategory/MyMonitor", monitorValue);
   * 	// Adds monitor with name "MyName" to category "Custom".
   * 	// Note: "MyCategory/MyMonitor" and "MyMonitor" have same name but different ids so the code is valid.
   * 	Performance.AddCustomMonitor("MyMonitor", monitorValue);
   * 	// Adds monitor with name "MyName" to category "Custom".
   * 	// Note: "MyMonitor" and "Custom/MyMonitor" have same name and same category but different ids so the code is valid.
   * 	Performance.AddCustomMonitor("Custom/MyMonitor", monitorValue);
   * 	// Adds monitor with name "MyCategoryOne/MyCategoryTwo/MyMonitor" to category "Custom".
   * 	Performance.AddCustomMonitor("MyCategoryOne/MyCategoryTwo/MyMonitor", monitorValue);
   * }
   * public int GetMonitorValue()
   * {
   * 	return GD.Randi() % 25;
   * }
   *
   * @summary
   *
   *
   * The debugger calls the callable to get the value of custom monitor. The callable must return a zero or positive integer or floating-point number.
   *
   * Callables are called with arguments supplied in argument array.
   *
   */
  add_custom_monitor(
    id: StringName,
    callable: Callable,
    arguments?: any[],
    type?: int
  ): void

  /** Returns the value of custom monitor with given [param id]. The callable is called to get the value of custom monitor. See also [method has_custom_monitor]. Prints an error if the given [param id] is absent. */
  get_custom_monitor(id: StringName): any

  /** Returns the names of active custom monitors in an [Array]. */
  get_custom_monitor_names(): StringName[]

  /** Returns the [enum MonitorType] values of active custom monitors in an [Array]. */
  get_custom_monitor_types(): PackedInt32Array

  /**
   * Returns the value of one of the available built-in monitors. You should provide one of the [enum Monitor] constants as the argument, like this:
   *
   * @example
   *
   *
   * print(Performance.get_monitor(Performance.TIME_FPS)) # Prints the FPS to the console.
   *
   *
   * GD.Print(Performance.GetMonitor(Performance.Monitor.TimeFps)); // Prints the FPS to the console.
   *
   * @summary
   *
   *
   * See [method get_custom_monitor] to query custom performance monitors' values.
   *
   */
  get_monitor(monitor: int): float

  /** Returns the last tick in which custom monitor was added/removed (in microseconds since the engine started). This is set to [method Time.get_ticks_usec] when the monitor is updated. */
  get_monitor_modification_time(): int

  /** Returns [code]true[/code] if custom monitor with the given [param id] is present, [code]false[/code] otherwise. */
  has_custom_monitor(id: StringName): boolean

  /** Removes the custom monitor with given [param id]. Prints an error if the given [param id] is already absent. */
  remove_custom_monitor(id: StringName): void

  connect<T extends SignalsOf<PerformanceClass>>(
    signal: T,
    method: SignalFunction<PerformanceClass[T]>
  ): number

  /**
   * The number of frames rendered in the last second. This metric is only updated once per second, even if queried more often. **Higher is better.**
   *
   */
  static TIME_FPS: any

  /**
   * Time it took to complete one frame, in seconds. **Lower is better.**
   *
   */
  static TIME_PROCESS: any

  /**
   * Time it took to complete one physics frame, in seconds. **Lower is better.**
   *
   */
  static TIME_PHYSICS_PROCESS: any

  /**
   * Time it took to complete one navigation step, in seconds. This includes navigation map updates as well as agent avoidance calculations. **Lower is better.**
   *
   */
  static TIME_NAVIGATION_PROCESS: any

  /**
   * Static memory currently used, in bytes. Not available in release builds. **Lower is better.**
   *
   */
  static MEMORY_STATIC: any

  /**
   * Available static memory. Not available in release builds. **Lower is better.**
   *
   */
  static MEMORY_STATIC_MAX: any

  /**
   * Largest amount of memory the message queue buffer has used, in bytes. The message queue is used for deferred functions calls and notifications. **Lower is better.**
   *
   */
  static MEMORY_MESSAGE_BUFFER_MAX: any

  /**
   * Number of objects currently instantiated (including nodes). **Lower is better.**
   *
   */
  static OBJECT_COUNT: any

  /**
   * Number of resources currently used. **Lower is better.**
   *
   */
  static OBJECT_RESOURCE_COUNT: any

  /**
   * Number of nodes currently instantiated in the scene tree. This also includes the root node. **Lower is better.**
   *
   */
  static OBJECT_NODE_COUNT: any

  /**
   * Number of orphan nodes, i.e. nodes which are not parented to a node of the scene tree. **Lower is better.**
   *
   * **Note:** This is only available in debug mode and will always return `0` when used in a project exported in release mode.
   *
   */
  static OBJECT_ORPHAN_NODE_COUNT: any

  /**
   * The total number of objects in the last rendered frame. This metric doesn't include culled objects (either via hiding nodes, frustum culling or occlusion culling). **Lower is better.**
   *
   */
  static RENDER_TOTAL_OBJECTS_IN_FRAME: any

  /**
   * The total number of vertices or indices rendered in the last rendered frame. This metric doesn't include primitives from culled objects (either via hiding nodes, frustum culling or occlusion culling). Due to the depth prepass and shadow passes, the number of primitives is always higher than the actual number of vertices in the scene (typically double or triple the original vertex count). **Lower is better.**
   *
   */
  static RENDER_TOTAL_PRIMITIVES_IN_FRAME: any

  /**
   * The total number of draw calls performed in the last rendered frame. This metric doesn't include culled objects (either via hiding nodes, frustum culling or occlusion culling), since they do not result in draw calls. **Lower is better.**
   *
   */
  static RENDER_TOTAL_DRAW_CALLS_IN_FRAME: any

  /**
   * The amount of video memory used (texture and vertex memory combined, in bytes). Since this metric also includes miscellaneous allocations, this value is always greater than the sum of [constant RENDER_TEXTURE_MEM_USED] and [constant RENDER_BUFFER_MEM_USED]. **Lower is better.**
   *
   */
  static RENDER_VIDEO_MEM_USED: any

  /**
   * The amount of texture memory used (in bytes). **Lower is better.**
   *
   */
  static RENDER_TEXTURE_MEM_USED: any

  /**
   * The amount of render buffer memory used (in bytes). **Lower is better.**
   *
   */
  static RENDER_BUFFER_MEM_USED: any

  /**
   * Number of active [RigidBody2D] nodes in the game. **Lower is better.**
   *
   */
  static PHYSICS_2D_ACTIVE_OBJECTS: any

  /**
   * Number of collision pairs in the 2D physics engine. **Lower is better.**
   *
   */
  static PHYSICS_2D_COLLISION_PAIRS: any

  /**
   * Number of islands in the 2D physics engine. **Lower is better.**
   *
   */
  static PHYSICS_2D_ISLAND_COUNT: any

  /**
   * Number of active [RigidBody3D] and [VehicleBody3D] nodes in the game. **Lower is better.**
   *
   */
  static PHYSICS_3D_ACTIVE_OBJECTS: any

  /**
   * Number of collision pairs in the 3D physics engine. **Lower is better.**
   *
   */
  static PHYSICS_3D_COLLISION_PAIRS: any

  /**
   * Number of islands in the 3D physics engine. **Lower is better.**
   *
   */
  static PHYSICS_3D_ISLAND_COUNT: any

  /**
   * Output latency of the [AudioServer]. Equivalent to calling [method AudioServer.get_output_latency], it is not recommended to call this every frame.
   *
   */
  static AUDIO_OUTPUT_LATENCY: any

  /**
   * Number of active navigation maps in [NavigationServer2D] and [NavigationServer3D]. This also includes the empty default navigation maps created by [World2D] and [World3D] instances.
   *
   */
  static NAVIGATION_ACTIVE_MAPS: any

  /**
   * Number of active navigation regions in [NavigationServer2D] and [NavigationServer3D].
   *
   */
  static NAVIGATION_REGION_COUNT: any

  /**
   * Number of active navigation agents processing avoidance in [NavigationServer2D] and [NavigationServer3D].
   *
   */
  static NAVIGATION_AGENT_COUNT: any

  /**
   * Number of active navigation links in [NavigationServer2D] and [NavigationServer3D].
   *
   */
  static NAVIGATION_LINK_COUNT: any

  /**
   * Number of navigation mesh polygons in [NavigationServer2D] and [NavigationServer3D].
   *
   */
  static NAVIGATION_POLYGON_COUNT: any

  /**
   * Number of navigation mesh polygon edges in [NavigationServer2D] and [NavigationServer3D].
   *
   */
  static NAVIGATION_EDGE_COUNT: any

  /**
   * Number of navigation mesh polygon edges that were merged due to edge key overlap in [NavigationServer2D] and [NavigationServer3D].
   *
   */
  static NAVIGATION_EDGE_MERGE_COUNT: any

  /**
   * Number of polygon edges that are considered connected by edge proximity [NavigationServer2D] and [NavigationServer3D].
   *
   */
  static NAVIGATION_EDGE_CONNECTION_COUNT: any

  /**
   * Number of navigation mesh polygon edges that could not be merged in [NavigationServer2D] and [NavigationServer3D]. The edges still may be connected by edge proximity or with links.
   *
   */
  static NAVIGATION_EDGE_FREE_COUNT: any

  /**
   * Number of active navigation obstacles in the [NavigationServer2D] and [NavigationServer3D].
   *
   */
  static NAVIGATION_OBSTACLE_COUNT: any

  /**
   * Number of pipeline compilations that were triggered by the 2D canvas renderer.
   *
   */
  static PIPELINE_COMPILATIONS_CANVAS: any

  /**
   * Number of pipeline compilations that were triggered by loading meshes. These compilations will show up as longer loading times the first time a user runs the game and the pipeline is required.
   *
   */
  static PIPELINE_COMPILATIONS_MESH: any

  /**
   * Number of pipeline compilations that were triggered by building the surface cache before rendering the scene. These compilations will show up as a stutter when loading a scene the first time a user runs the game and the pipeline is required.
   *
   */
  static PIPELINE_COMPILATIONS_SURFACE: any

  /**
   * Number of pipeline compilations that were triggered while drawing the scene. These compilations will show up as stutters during gameplay the first time a user runs the game and the pipeline is required.
   *
   */
  static PIPELINE_COMPILATIONS_DRAW: any

  /**
   * Number of pipeline compilations that were triggered to optimize the current scene. These compilations are done in the background and should not cause any stutters whatsoever.
   *
   */
  static PIPELINE_COMPILATIONS_SPECIALIZATION: any

  /**
   * Number of active navigation maps in the [NavigationServer2D]. This also includes the empty default navigation maps created by [World2D] instances.
   *
   */
  static NAVIGATION_2D_ACTIVE_MAPS: any

  /**
   * Number of active navigation regions in the [NavigationServer2D].
   *
   */
  static NAVIGATION_2D_REGION_COUNT: any

  /**
   * Number of active navigation agents processing avoidance in the [NavigationServer2D].
   *
   */
  static NAVIGATION_2D_AGENT_COUNT: any

  /**
   * Number of active navigation links in the [NavigationServer2D].
   *
   */
  static NAVIGATION_2D_LINK_COUNT: any

  /**
   * Number of navigation mesh polygons in the [NavigationServer2D].
   *
   */
  static NAVIGATION_2D_POLYGON_COUNT: any

  /**
   * Number of navigation mesh polygon edges in the [NavigationServer2D].
   *
   */
  static NAVIGATION_2D_EDGE_COUNT: any

  /**
   * Number of navigation mesh polygon edges that were merged due to edge key overlap in the [NavigationServer2D].
   *
   */
  static NAVIGATION_2D_EDGE_MERGE_COUNT: any

  /**
   * Number of polygon edges that are considered connected by edge proximity [NavigationServer2D].
   *
   */
  static NAVIGATION_2D_EDGE_CONNECTION_COUNT: any

  /**
   * Number of navigation mesh polygon edges that could not be merged in the [NavigationServer2D]. The edges still may be connected by edge proximity or with links.
   *
   */
  static NAVIGATION_2D_EDGE_FREE_COUNT: any

  /**
   * Number of active navigation obstacles in the [NavigationServer2D].
   *
   */
  static NAVIGATION_2D_OBSTACLE_COUNT: any

  /**
   * Number of active navigation maps in the [NavigationServer3D]. This also includes the empty default navigation maps created by [World3D] instances.
   *
   */
  static NAVIGATION_3D_ACTIVE_MAPS: any

  /**
   * Number of active navigation regions in the [NavigationServer3D].
   *
   */
  static NAVIGATION_3D_REGION_COUNT: any

  /**
   * Number of active navigation agents processing avoidance in the [NavigationServer3D].
   *
   */
  static NAVIGATION_3D_AGENT_COUNT: any

  /**
   * Number of active navigation links in the [NavigationServer3D].
   *
   */
  static NAVIGATION_3D_LINK_COUNT: any

  /**
   * Number of navigation mesh polygons in the [NavigationServer3D].
   *
   */
  static NAVIGATION_3D_POLYGON_COUNT: any

  /**
   * Number of navigation mesh polygon edges in the [NavigationServer3D].
   *
   */
  static NAVIGATION_3D_EDGE_COUNT: any

  /**
   * Number of navigation mesh polygon edges that were merged due to edge key overlap in the [NavigationServer3D].
   *
   */
  static NAVIGATION_3D_EDGE_MERGE_COUNT: any

  /**
   * Number of polygon edges that are considered connected by edge proximity [NavigationServer3D].
   *
   */
  static NAVIGATION_3D_EDGE_CONNECTION_COUNT: any

  /**
   * Number of navigation mesh polygon edges that could not be merged in the [NavigationServer3D]. The edges still may be connected by edge proximity or with links.
   *
   */
  static NAVIGATION_3D_EDGE_FREE_COUNT: any

  /**
   * Number of active navigation obstacles in the [NavigationServer3D].
   *
   */
  static NAVIGATION_3D_OBSTACLE_COUNT: any

  /**
   * Represents the size of the [enum Monitor] enum.
   *
   */
  static MONITOR_MAX: any

  /**
   * Monitor output is formatted as an integer value.
   *
   */
  static MONITOR_TYPE_QUANTITY: any

  /**
   * Monitor output is formatted as computer memory. Submitted values should represent a number of bytes.
   *
   */
  static MONITOR_TYPE_MEMORY: any

  /**
   * Monitor output is formatted as time in milliseconds. Submitted values should represent a time in seconds (not milliseconds).
   *
   */
  static MONITOR_TYPE_TIME: any

  /**
   * Monitor output is formatted as a percentage. Submitted values should represent a fractional value rather than the percentage directly, e.g. `0.5` for `50.00%`.
   *
   */
  static MONITOR_TYPE_PERCENTAGE: any
}
