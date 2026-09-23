/**
 * An Omnidirectional light is a type of [Light3D] that emits light in all directions. The light is attenuated by distance and this attenuation can be configured by changing its energy, radius, and attenuation parameters.
 *
 * **Note:** When using the Mobile rendering method, only 8 omni lights can be displayed on each mesh resource. Attempting to display more than 8 omni lights on a single mesh resource will result in omni lights flickering in and out as the camera moves. When using the Compatibility rendering method, only 8 omni lights can be displayed on each mesh resource by default, but this can be increased by adjusting [member ProjectSettings.rendering/limits/opengl/max_lights_per_object].
 *
 * **Note:** When using the Mobile or Compatibility rendering methods, omni lights will only correctly affect meshes whose visibility AABB intersects with the light's AABB. If using a shader to deform the mesh in a way that makes it go outside its AABB, [member GeometryInstance3D.extra_cull_margin] must be increased on the mesh. Otherwise, the light may not be visible on the mesh.
 *
 */
declare class OmniLight3D extends Light3D {
  /**
   * An Omnidirectional light is a type of [Light3D] that emits light in all directions. The light is attenuated by distance and this attenuation can be configured by changing its energy, radius, and attenuation parameters.
   *
   * **Note:** When using the Mobile rendering method, only 8 omni lights can be displayed on each mesh resource. Attempting to display more than 8 omni lights on a single mesh resource will result in omni lights flickering in and out as the camera moves. When using the Compatibility rendering method, only 8 omni lights can be displayed on each mesh resource by default, but this can be increased by adjusting [member ProjectSettings.rendering/limits/opengl/max_lights_per_object].
   *
   * **Note:** When using the Mobile or Compatibility rendering methods, omni lights will only correctly affect meshes whose visibility AABB intersects with the light's AABB. If using a shader to deform the mesh in a way that makes it go outside its AABB, [member GeometryInstance3D.extra_cull_margin] must be increased on the mesh. Otherwise, the light may not be visible on the mesh.
   *
   */
  new(): OmniLight3D
  constructor()
  static new(): OmniLight3D

  /**
   * Controls the distance attenuation function for omnilights.
   *
   * A value of `0.0` will maintain a constant brightness through most of the range, but smoothly attenuate the light at the edge of the range. Use a value of `2.0` for physically accurate lights as it results in the proper inverse square attenutation.
   *
   * **Note:** Setting attenuation to `2.0` or higher may result in distant objects receiving minimal light, even within range. For example, with a range of `4096`, an object at `100` units is attenuated by a factor of `0.0001`. With a default brightness of `1`, the light would not be visible at that distance.
   *
   * **Note:** Using negative or values higher than `10.0` may lead to unexpected results.
   *
   */
  omni_attenuation: float

  /**
   * The light's radius. Note that the effectively lit area may appear to be smaller depending on the [member omni_attenuation] in use. No matter the [member omni_attenuation] in use, the light will never reach anything outside this radius.
   *
   * **Note:** [member omni_range] is not affected by [member Node3D.scale] (the light's scale or its parent's scale).
   *
   */
  omni_range: float

  connect<T extends SignalsOf<OmniLight3D>>(
    signal: T,
    method: SignalFunction<OmniLight3D[T]>
  ): number

  /**
   * Shadows are rendered to a dual-paraboloid texture. Faster than [constant SHADOW_CUBE], but lower-quality.
   *
   */
  static SHADOW_DUAL_PARABOLOID: any

  /**
   * Shadows are rendered to a cubemap. Slower than [constant SHADOW_DUAL_PARABOLOID], but higher-quality.
   *
   */
  static SHADOW_CUBE: any
}
