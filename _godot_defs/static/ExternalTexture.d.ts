/**
 * Displays the content of an external buffer provided by the platform.
 *
 * Requires the [url=https://registry.khronos.org/OpenGL/extensions/OES/OES_EGL_image_external.txt]OES_EGL_image_external[/url] extension (OpenGL) or [url=https://registry.khronos.org/vulkan/specs/1.1-extensions/html/vkspec.html#VK_ANDROID_external_memory_android_hardware_buffer]VK_ANDROID_external_memory_android_hardware_buffer[/url] extension (Vulkan).
 *
 * **Note:** This is currently only supported in Android builds.
 *
 */
declare class ExternalTexture extends Texture2D {
  /**
   * Displays the content of an external buffer provided by the platform.
   *
   * Requires the [url=https://registry.khronos.org/OpenGL/extensions/OES/OES_EGL_image_external.txt]OES_EGL_image_external[/url] extension (OpenGL) or [url=https://registry.khronos.org/vulkan/specs/1.1-extensions/html/vkspec.html#VK_ANDROID_external_memory_android_hardware_buffer]VK_ANDROID_external_memory_android_hardware_buffer[/url] extension (Vulkan).
   *
   * **Note:** This is currently only supported in Android builds.
   *
   */
  new(): ExternalTexture
  constructor()
  static new(): ExternalTexture

  /** External texture size. */
  size: Vector2

  /**
   * Returns the external texture ID.
   *
   * Depending on your use case, you may need to pass this to platform APIs, for example, when creating an `android.graphics.SurfaceTexture` on Android.
   *
   */
  get_external_texture_id(): int

  /**
   * Sets the external buffer ID.
   *
   * Depending on your use case, you may need to call this with data received from a platform API, for example, `SurfaceTexture.getHardwareBuffer()` on Android.
   *
   */
  set_external_buffer_id(external_buffer_id: int): void

  connect<T extends SignalsOf<ExternalTexture>>(
    signal: T,
    method: SignalFunction<ExternalTexture[T]>
  ): number
}
