/**
 * A camera feed gives you access to a single physical camera attached to your device. When enabled, Godot will start capturing frames from the camera which can then be used. See also [CameraServer].
 *
 * **Note:** Many cameras will return YCbCr images which are split into two textures and need to be combined in a shader. Godot does this automatically for you if you set the environment to show the camera image in the background.
 *
 * **Note:** This class is currently only implemented on Linux, Android, macOS, and iOS. On other platforms no [CameraFeed]s will be available. To get a [CameraFeed] on iOS, the camera plugin from [url=https://github.com/godotengine/godot-ios-plugins]godot-ios-plugins[/url] is required.
 *
 */
declare class CameraFeed extends RefCounted {
  /**
   * A camera feed gives you access to a single physical camera attached to your device. When enabled, Godot will start capturing frames from the camera which can then be used. See also [CameraServer].
   *
   * **Note:** Many cameras will return YCbCr images which are split into two textures and need to be combined in a shader. Godot does this automatically for you if you set the environment to show the camera image in the background.
   *
   * **Note:** This class is currently only implemented on Linux, Android, macOS, and iOS. On other platforms no [CameraFeed]s will be available. To get a [CameraFeed] on iOS, the camera plugin from [url=https://github.com/godotengine/godot-ios-plugins]godot-ios-plugins[/url] is required.
   *
   */
  new(): CameraFeed
  constructor()
  static new(): CameraFeed

  /** If [code]true[/code], the feed is active. */
  feed_is_active: boolean

  /** The transform applied to the camera's image. */
  feed_transform: Transform2D

  /** Formats supported by the feed. Each entry is a [Dictionary] describing format parameters. */
  formats: any[]

  /** Called when the camera feed is activated. */
  protected _activate_feed(): boolean

  /** Called when the camera feed is deactivated. */
  protected _deactivate_feed(): void

  /** Returns feed image data type. */
  get_datatype(): int

  /** Returns the unique ID for this feed. */
  get_id(): int

  /** Returns the camera's name. */
  get_name(): string

  /** Returns the position of camera on the device. */
  get_position(): int

  /** Returns the texture backend ID (usable by some external libraries that need a handle to a texture to write data). */
  get_texture_tex_id(feed_image_type: int): int

  /** Sets the feed as external feed provided by another library. */
  set_external(width: int, height: int): void

  /**
   * Sets the feed format parameters for the given [param index] in the [member formats] array. Returns `true` on success. By default, the YUYV encoded stream is transformed to [constant FEED_RGB]. The YUYV encoded stream output format can be changed by setting [param parameters]'s `output` entry to one of the following:
   *
   * - `"separate"` will result in [constant FEED_YCBCR_SEP];
   *
   * - `"grayscale"` will result in desaturated [constant FEED_RGB];
   *
   * - `"copy"` will result in [constant FEED_YCBCR].
   *
   */
  set_format(index: int, parameters: Dictionary<any, any>): boolean

  /** Sets the camera's name. */
  set_name(name: string): void

  /** Sets the position of this camera. */
  set_position(position: int): void

  /** Sets RGB image for this feed. */
  set_rgb_image(rgb_image: Image): void

  /** Sets YCbCr image for this feed. */
  set_ycbcr_image(ycbcr_image: Image): void

  /** Sets Y and CbCr images for this feed. */
  set_ycbcr_images(y_image: Image, cbcr_image: Image): void

  connect<T extends SignalsOf<CameraFeed>>(
    signal: T,
    method: SignalFunction<CameraFeed[T]>
  ): number

  /**
   * No image set for the feed.
   *
   */
  static FEED_NOIMAGE: any

  /**
   * Feed supplies RGB images.
   *
   */
  static FEED_RGB: any

  /**
   * Feed supplies YCbCr images that need to be converted to RGB.
   *
   */
  static FEED_YCBCR: any

  /**
   * Feed supplies separate Y and CbCr images that need to be combined and converted to RGB.
   *
   */
  static FEED_YCBCR_SEP: any

  /**
   * Feed supplies external image.
   *
   */
  static FEED_EXTERNAL: any

  /**
   * Unspecified position.
   *
   */
  static FEED_UNSPECIFIED: any

  /**
   * Camera is mounted at the front of the device.
   *
   */
  static FEED_FRONT: any

  /**
   * Camera is mounted at the back of the device.
   *
   */
  static FEED_BACK: any

  /**
   * Emitted when the format has changed.
   *
   */
  $format_changed: Signal<() => void>

  /**
   * Emitted when a new frame is available.
   *
   */
  $frame_changed: Signal<() => void>
}
