/**
 * A control used for playback of [VideoStream] resources.
 *
 * Supported video formats are [url=https://www.theora.org/]Ogg Theora[/url] (`.ogv`, [VideoStreamTheora]) and any format exposed via a GDExtension plugin.
 *
 * **Warning:** On Web, video playback **will** perform poorly due to missing architecture-specific assembly optimizations.
 *
 */
declare class VideoStreamPlayer extends Control {
  /**
   * A control used for playback of [VideoStream] resources.
   *
   * Supported video formats are [url=https://www.theora.org/]Ogg Theora[/url] (`.ogv`, [VideoStreamTheora]) and any format exposed via a GDExtension plugin.
   *
   * **Warning:** On Web, video playback **will** perform poorly due to missing architecture-specific assembly optimizations.
   *
   */
  new(): VideoStreamPlayer
  constructor()
  static new(): VideoStreamPlayer

  /** The embedded audio track to play. */
  audio_track: int

  /** If [code]true[/code], playback starts when the scene loads. */
  autoplay: boolean

  /** Amount of time in milliseconds to store in buffer while playing. */
  buffering_msec: int

  /** Audio bus to use for sound playback. */
  bus: StringName

  /** If [code]true[/code], the video scales to the control size. Otherwise, the control minimum size will be automatically adjusted to match the video stream's dimensions. */
  expand: boolean

  /** If [code]true[/code], the video restarts when it reaches its end. */
  loop: boolean

  /** If [code]true[/code], the video is paused. */
  paused: boolean

  /** The stream's current speed scale. [code]1.0[/code] is the normal speed, while [code]2.0[/code] is double speed and [code]0.5[/code] is half speed. A speed scale of [code]0.0[/code] pauses the video, similar to setting [member paused] to [code]true[/code]. */
  speed_scale: float

  /** The assigned video stream. See description for supported formats. */
  stream: VideoStream

  /** The current position of the stream, in seconds. */
  stream_position: float

  /** Audio volume as a linear value. */
  volume: float

  /** Audio volume in dB. */
  volume_db: float

  /** The length of the current stream, in seconds. */
  get_stream_length(): float

  /** Returns the video stream's name, or [code]"<No Stream>"[/code] if no video stream is assigned. */
  get_stream_name(): string

  /** Returns the current frame as a [Texture2D]. */
  get_video_texture(): Texture2D

  /**
   * Returns `true` if the video is playing.
   *
   * **Note:** The video is still considered playing if paused during playback.
   *
   */
  is_playing(): boolean

  /** Starts the video playback from the beginning. If the video is paused, this will not unpause the video. */
  play(): void

  /**
   * Stops the video playback and sets the stream position to 0.
   *
   * **Note:** Although the stream position will be set to 0, the first frame of the video stream won't become the current frame.
   *
   */
  stop(): void

  connect<T extends SignalsOf<VideoStreamPlayer>>(
    signal: T,
    method: SignalFunction<VideoStreamPlayer[T]>
  ): number

  /**
   * Emitted when playback is finished.
   *
   */
  $finished: Signal<() => void>
}
