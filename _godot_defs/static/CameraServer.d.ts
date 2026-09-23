/**
 * The [CameraServer] keeps track of different cameras accessible in Godot. These are external cameras such as webcams or the cameras on your phone.
 *
 * It is notably used to provide AR modules with a video feed from the camera.
 *
 * **Note:** This class is currently only implemented on Linux, Android, macOS, and iOS. On other platforms no [CameraFeed]s will be available. To get a [CameraFeed] on iOS, the camera plugin from [url=https://github.com/godotengine/godot-ios-plugins]godot-ios-plugins[/url] is required.
 *
 */
declare class CameraServerClass extends Object {
  /**
   * The [CameraServer] keeps track of different cameras accessible in Godot. These are external cameras such as webcams or the cameras on your phone.
   *
   * It is notably used to provide AR modules with a video feed from the camera.
   *
   * **Note:** This class is currently only implemented on Linux, Android, macOS, and iOS. On other platforms no [CameraFeed]s will be available. To get a [CameraFeed] on iOS, the camera plugin from [url=https://github.com/godotengine/godot-ios-plugins]godot-ios-plugins[/url] is required.
   *
   */
  new(): CameraServerClass
  constructor()
  static new(): CameraServerClass

  /**
   * If `true`, the server is actively monitoring available camera feeds.
   *
   * This has a performance cost, so only set it to `true` when you're actively accessing the camera.
   *
   * **Note:** After setting it to `true`, you can receive updated camera feeds through the [signal camera_feeds_updated] signal.
   *
   * @example
   *
   *
   * func _ready():
   * 	CameraServer.camera_feeds_updated.connect(_on_camera_feeds_updated)
   * 	CameraServer.monitoring_feeds = true
   * func _on_camera_feeds_updated():
   * 	var feeds = CameraServer.feeds()
   *
   *
   * public override void _Ready()
   * {
   * 	CameraServer.CameraFeedsUpdated += OnCameraFeedsUpdated;
   * 	CameraServer.MonitoringFeeds = true;
   * }
   * void OnCameraFeedsUpdated()
   * {
   * 	var feeds = CameraServer.Feeds();
   * }
   *
   * @summary
   *
   *
   */
  monitoring_feeds: boolean

  /** Adds the camera [param feed] to the camera server. */
  add_feed(feed: CameraFeed): void

  /** Returns an array of [CameraFeed]s. */
  feeds(): CameraFeed[]

  /** Returns the [CameraFeed] corresponding to the camera with the given [param index]. */
  get_feed(index: int): CameraFeed

  /** Returns the number of [CameraFeed]s registered. */
  get_feed_count(): int

  /** Removes the specified camera [param feed]. */
  remove_feed(feed: CameraFeed): void

  connect<T extends SignalsOf<CameraServerClass>>(
    signal: T,
    method: SignalFunction<CameraServerClass[T]>
  ): number

  /**
   * The RGBA camera image.
   *
   */
  static FEED_RGBA_IMAGE: any

  /**
   * The [url=https://en.wikipedia.org/wiki/YCbCr]YCbCr[/url] camera image.
   *
   */
  static FEED_YCBCR_IMAGE: any

  /**
   * The Y component camera image.
   *
   */
  static FEED_Y_IMAGE: any

  /**
   * The CbCr component camera image.
   *
   */
  static FEED_CBCR_IMAGE: any

  /**
   * Emitted when a [CameraFeed] is added (e.g. a webcam is plugged in).
   *
   */
  $camera_feed_added: Signal<() => void>

  /**
   * Emitted when a [CameraFeed] is removed (e.g. a webcam is unplugged).
   *
   */
  $camera_feed_removed: Signal<() => void>

  /**
   * Emitted when camera feeds are updated.
   *
   */
  $camera_feeds_updated: Signal<() => void>
}
