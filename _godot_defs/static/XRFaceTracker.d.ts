/**
 * An instance of this object represents a tracked face and its corresponding blend shapes. The blend shapes come from the [url=https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/unified-blendshapes]Unified Expressions[/url] standard, and contain extended details and visuals for each blend shape. Additionally the [url=https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/compatibility/overview]Tracking Standard Comparison[/url] page documents the relationship between Unified Expressions and other standards.
 *
 * As face trackers are turned on they are registered with the [XRServer].
 *
 */
declare class XRFaceTracker extends XRTracker {
  /**
   * An instance of this object represents a tracked face and its corresponding blend shapes. The blend shapes come from the [url=https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/unified-blendshapes]Unified Expressions[/url] standard, and contain extended details and visuals for each blend shape. Additionally the [url=https://docs.vrcft.io/docs/tutorial-avatars/tutorial-avatars-extras/compatibility/overview]Tracking Standard Comparison[/url] page documents the relationship between Unified Expressions and other standards.
   *
   * As face trackers are turned on they are registered with the [XRServer].
   *
   */
  new(): XRFaceTracker
  constructor()
  static new(): XRFaceTracker

  /** The array of face blend shape weights with indices corresponding to the [enum BlendShapeEntry] enum. */
  blend_shapes: PackedFloat32Array

  /** Returns the requested face blend shape weight. */
  get_blend_shape(blend_shape: int): float

  /** Sets a face blend shape weight. */
  set_blend_shape(blend_shape: int, weight: float): void

  connect<T extends SignalsOf<XRFaceTracker>>(
    signal: T,
    method: SignalFunction<XRFaceTracker[T]>
  ): number

  /**
   * Right eye looks outwards.
   *
   */
  static FT_EYE_LOOK_OUT_RIGHT: any

  /**
   * Right eye looks inwards.
   *
   */
  static FT_EYE_LOOK_IN_RIGHT: any

  /**
   * Right eye looks upwards.
   *
   */
  static FT_EYE_LOOK_UP_RIGHT: any

  /**
   * Right eye looks downwards.
   *
   */
  static FT_EYE_LOOK_DOWN_RIGHT: any

  /**
   * Left eye looks outwards.
   *
   */
  static FT_EYE_LOOK_OUT_LEFT: any

  /**
   * Left eye looks inwards.
   *
   */
  static FT_EYE_LOOK_IN_LEFT: any

  /**
   * Left eye looks upwards.
   *
   */
  static FT_EYE_LOOK_UP_LEFT: any

  /**
   * Left eye looks downwards.
   *
   */
  static FT_EYE_LOOK_DOWN_LEFT: any

  /**
   * Closes the right eyelid.
   *
   */
  static FT_EYE_CLOSED_RIGHT: any

  /**
   * Closes the left eyelid.
   *
   */
  static FT_EYE_CLOSED_LEFT: any

  /**
   * Squeezes the right eye socket muscles.
   *
   */
  static FT_EYE_SQUINT_RIGHT: any

  /**
   * Squeezes the left eye socket muscles.
   *
   */
  static FT_EYE_SQUINT_LEFT: any

  /**
   * Right eyelid widens beyond relaxed.
   *
   */
  static FT_EYE_WIDE_RIGHT: any

  /**
   * Left eyelid widens beyond relaxed.
   *
   */
  static FT_EYE_WIDE_LEFT: any

  /**
   * Dilates the right eye pupil.
   *
   */
  static FT_EYE_DILATION_RIGHT: any

  /**
   * Dilates the left eye pupil.
   *
   */
  static FT_EYE_DILATION_LEFT: any

  /**
   * Constricts the right eye pupil.
   *
   */
  static FT_EYE_CONSTRICT_RIGHT: any

  /**
   * Constricts the left eye pupil.
   *
   */
  static FT_EYE_CONSTRICT_LEFT: any

  /**
   * Right eyebrow pinches in.
   *
   */
  static FT_BROW_PINCH_RIGHT: any

  /**
   * Left eyebrow pinches in.
   *
   */
  static FT_BROW_PINCH_LEFT: any

  /**
   * Outer right eyebrow pulls down.
   *
   */
  static FT_BROW_LOWERER_RIGHT: any

  /**
   * Outer left eyebrow pulls down.
   *
   */
  static FT_BROW_LOWERER_LEFT: any

  /**
   * Inner right eyebrow pulls up.
   *
   */
  static FT_BROW_INNER_UP_RIGHT: any

  /**
   * Inner left eyebrow pulls up.
   *
   */
  static FT_BROW_INNER_UP_LEFT: any

  /**
   * Outer right eyebrow pulls up.
   *
   */
  static FT_BROW_OUTER_UP_RIGHT: any

  /**
   * Outer left eyebrow pulls up.
   *
   */
  static FT_BROW_OUTER_UP_LEFT: any

  /**
   * Right side face sneers.
   *
   */
  static FT_NOSE_SNEER_RIGHT: any

  /**
   * Left side face sneers.
   *
   */
  static FT_NOSE_SNEER_LEFT: any

  /**
   * Right side nose canal dilates.
   *
   */
  static FT_NASAL_DILATION_RIGHT: any

  /**
   * Left side nose canal dilates.
   *
   */
  static FT_NASAL_DILATION_LEFT: any

  /**
   * Right side nose canal constricts.
   *
   */
  static FT_NASAL_CONSTRICT_RIGHT: any

  /**
   * Left side nose canal constricts.
   *
   */
  static FT_NASAL_CONSTRICT_LEFT: any

  /**
   * Raises the right side cheek.
   *
   */
  static FT_CHEEK_SQUINT_RIGHT: any

  /**
   * Raises the left side cheek.
   *
   */
  static FT_CHEEK_SQUINT_LEFT: any

  /**
   * Puffs the right side cheek.
   *
   */
  static FT_CHEEK_PUFF_RIGHT: any

  /**
   * Puffs the left side cheek.
   *
   */
  static FT_CHEEK_PUFF_LEFT: any

  /**
   * Sucks in the right side cheek.
   *
   */
  static FT_CHEEK_SUCK_RIGHT: any

  /**
   * Sucks in the left side cheek.
   *
   */
  static FT_CHEEK_SUCK_LEFT: any

  /**
   * Opens jawbone.
   *
   */
  static FT_JAW_OPEN: any

  /**
   * Closes the mouth.
   *
   */
  static FT_MOUTH_CLOSED: any

  /**
   * Pushes jawbone right.
   *
   */
  static FT_JAW_RIGHT: any

  /**
   * Pushes jawbone left.
   *
   */
  static FT_JAW_LEFT: any

  /**
   * Pushes jawbone forward.
   *
   */
  static FT_JAW_FORWARD: any

  /**
   * Pushes jawbone backward.
   *
   */
  static FT_JAW_BACKWARD: any

  /**
   * Flexes jaw muscles.
   *
   */
  static FT_JAW_CLENCH: any

  /**
   * Raises the jawbone.
   *
   */
  static FT_JAW_MANDIBLE_RAISE: any

  /**
   * Upper right lip part tucks in the mouth.
   *
   */
  static FT_LIP_SUCK_UPPER_RIGHT: any

  /**
   * Upper left lip part tucks in the mouth.
   *
   */
  static FT_LIP_SUCK_UPPER_LEFT: any

  /**
   * Lower right lip part tucks in the mouth.
   *
   */
  static FT_LIP_SUCK_LOWER_RIGHT: any

  /**
   * Lower left lip part tucks in the mouth.
   *
   */
  static FT_LIP_SUCK_LOWER_LEFT: any

  /**
   * Right lip corner folds into the mouth.
   *
   */
  static FT_LIP_SUCK_CORNER_RIGHT: any

  /**
   * Left lip corner folds into the mouth.
   *
   */
  static FT_LIP_SUCK_CORNER_LEFT: any

  /**
   * Upper right lip part pushes into a funnel.
   *
   */
  static FT_LIP_FUNNEL_UPPER_RIGHT: any

  /**
   * Upper left lip part pushes into a funnel.
   *
   */
  static FT_LIP_FUNNEL_UPPER_LEFT: any

  /**
   * Lower right lip part pushes into a funnel.
   *
   */
  static FT_LIP_FUNNEL_LOWER_RIGHT: any

  /**
   * Lower left lip part pushes into a funnel.
   *
   */
  static FT_LIP_FUNNEL_LOWER_LEFT: any

  /**
   * Upper right lip part pushes outwards.
   *
   */
  static FT_LIP_PUCKER_UPPER_RIGHT: any

  /**
   * Upper left lip part pushes outwards.
   *
   */
  static FT_LIP_PUCKER_UPPER_LEFT: any

  /**
   * Lower right lip part pushes outwards.
   *
   */
  static FT_LIP_PUCKER_LOWER_RIGHT: any

  /**
   * Lower left lip part pushes outwards.
   *
   */
  static FT_LIP_PUCKER_LOWER_LEFT: any

  /**
   * Upper right part of the lip pulls up.
   *
   */
  static FT_MOUTH_UPPER_UP_RIGHT: any

  /**
   * Upper left part of the lip pulls up.
   *
   */
  static FT_MOUTH_UPPER_UP_LEFT: any

  /**
   * Lower right part of the lip pulls up.
   *
   */
  static FT_MOUTH_LOWER_DOWN_RIGHT: any

  /**
   * Lower left part of the lip pulls up.
   *
   */
  static FT_MOUTH_LOWER_DOWN_LEFT: any

  /**
   * Upper right lip part pushes in the cheek.
   *
   */
  static FT_MOUTH_UPPER_DEEPEN_RIGHT: any

  /**
   * Upper left lip part pushes in the cheek.
   *
   */
  static FT_MOUTH_UPPER_DEEPEN_LEFT: any

  /**
   * Moves upper lip right.
   *
   */
  static FT_MOUTH_UPPER_RIGHT: any

  /**
   * Moves upper lip left.
   *
   */
  static FT_MOUTH_UPPER_LEFT: any

  /**
   * Moves lower lip right.
   *
   */
  static FT_MOUTH_LOWER_RIGHT: any

  /**
   * Moves lower lip left.
   *
   */
  static FT_MOUTH_LOWER_LEFT: any

  /**
   * Right lip corner pulls diagonally up and out.
   *
   */
  static FT_MOUTH_CORNER_PULL_RIGHT: any

  /**
   * Left lip corner pulls diagonally up and out.
   *
   */
  static FT_MOUTH_CORNER_PULL_LEFT: any

  /**
   * Right corner lip slants up.
   *
   */
  static FT_MOUTH_CORNER_SLANT_RIGHT: any

  /**
   * Left corner lip slants up.
   *
   */
  static FT_MOUTH_CORNER_SLANT_LEFT: any

  /**
   * Right corner lip pulls down.
   *
   */
  static FT_MOUTH_FROWN_RIGHT: any

  /**
   * Left corner lip pulls down.
   *
   */
  static FT_MOUTH_FROWN_LEFT: any

  /**
   * Mouth corner lip pulls out and down.
   *
   */
  static FT_MOUTH_STRETCH_RIGHT: any

  /**
   * Mouth corner lip pulls out and down.
   *
   */
  static FT_MOUTH_STRETCH_LEFT: any

  /**
   * Right lip corner is pushed backwards.
   *
   */
  static FT_MOUTH_DIMPLE_RIGHT: any

  /**
   * Left lip corner is pushed backwards.
   *
   */
  static FT_MOUTH_DIMPLE_LEFT: any

  /**
   * Raises and slightly pushes out the upper mouth.
   *
   */
  static FT_MOUTH_RAISER_UPPER: any

  /**
   * Raises and slightly pushes out the lower mouth.
   *
   */
  static FT_MOUTH_RAISER_LOWER: any

  /**
   * Right side lips press and flatten together vertically.
   *
   */
  static FT_MOUTH_PRESS_RIGHT: any

  /**
   * Left side lips press and flatten together vertically.
   *
   */
  static FT_MOUTH_PRESS_LEFT: any

  /**
   * Right side lips squeeze together horizontally.
   *
   */
  static FT_MOUTH_TIGHTENER_RIGHT: any

  /**
   * Left side lips squeeze together horizontally.
   *
   */
  static FT_MOUTH_TIGHTENER_LEFT: any

  /**
   * Tongue visibly sticks out of the mouth.
   *
   */
  static FT_TONGUE_OUT: any

  /**
   * Tongue points upwards.
   *
   */
  static FT_TONGUE_UP: any

  /**
   * Tongue points downwards.
   *
   */
  static FT_TONGUE_DOWN: any

  /**
   * Tongue points right.
   *
   */
  static FT_TONGUE_RIGHT: any

  /**
   * Tongue points left.
   *
   */
  static FT_TONGUE_LEFT: any

  /**
   * Sides of the tongue funnel, creating a roll.
   *
   */
  static FT_TONGUE_ROLL: any

  /**
   * Tongue arches up then down inside the mouth.
   *
   */
  static FT_TONGUE_BLEND_DOWN: any

  /**
   * Tongue arches down then up inside the mouth.
   *
   */
  static FT_TONGUE_CURL_UP: any

  /**
   * Tongue squishes together and thickens.
   *
   */
  static FT_TONGUE_SQUISH: any

  /**
   * Tongue flattens and thins out.
   *
   */
  static FT_TONGUE_FLAT: any

  /**
   * Tongue tip rotates clockwise, with the rest following gradually.
   *
   */
  static FT_TONGUE_TWIST_RIGHT: any

  /**
   * Tongue tip rotates counter-clockwise, with the rest following gradually.
   *
   */
  static FT_TONGUE_TWIST_LEFT: any

  /**
   * Inner mouth throat closes.
   *
   */
  static FT_SOFT_PALATE_CLOSE: any

  /**
   * The Adam's apple visibly swallows.
   *
   */
  static FT_THROAT_SWALLOW: any

  /**
   * Right side neck visibly flexes.
   *
   */
  static FT_NECK_FLEX_RIGHT: any

  /**
   * Left side neck visibly flexes.
   *
   */
  static FT_NECK_FLEX_LEFT: any

  /**
   * Closes both eye lids.
   *
   */
  static FT_EYE_CLOSED: any

  /**
   * Widens both eye lids.
   *
   */
  static FT_EYE_WIDE: any

  /**
   * Squints both eye lids.
   *
   */
  static FT_EYE_SQUINT: any

  /**
   * Dilates both pupils.
   *
   */
  static FT_EYE_DILATION: any

  /**
   * Constricts both pupils.
   *
   */
  static FT_EYE_CONSTRICT: any

  /**
   * Pulls the right eyebrow down and in.
   *
   */
  static FT_BROW_DOWN_RIGHT: any

  /**
   * Pulls the left eyebrow down and in.
   *
   */
  static FT_BROW_DOWN_LEFT: any

  /**
   * Pulls both eyebrows down and in.
   *
   */
  static FT_BROW_DOWN: any

  /**
   * Right brow appears worried.
   *
   */
  static FT_BROW_UP_RIGHT: any

  /**
   * Left brow appears worried.
   *
   */
  static FT_BROW_UP_LEFT: any

  /**
   * Both brows appear worried.
   *
   */
  static FT_BROW_UP: any

  /**
   * Entire face sneers.
   *
   */
  static FT_NOSE_SNEER: any

  /**
   * Both nose canals dilate.
   *
   */
  static FT_NASAL_DILATION: any

  /**
   * Both nose canals constrict.
   *
   */
  static FT_NASAL_CONSTRICT: any

  /**
   * Puffs both cheeks.
   *
   */
  static FT_CHEEK_PUFF: any

  /**
   * Sucks in both cheeks.
   *
   */
  static FT_CHEEK_SUCK: any

  /**
   * Raises both cheeks.
   *
   */
  static FT_CHEEK_SQUINT: any

  /**
   * Tucks in the upper lips.
   *
   */
  static FT_LIP_SUCK_UPPER: any

  /**
   * Tucks in the lower lips.
   *
   */
  static FT_LIP_SUCK_LOWER: any

  /**
   * Tucks in both lips.
   *
   */
  static FT_LIP_SUCK: any

  /**
   * Funnels in the upper lips.
   *
   */
  static FT_LIP_FUNNEL_UPPER: any

  /**
   * Funnels in the lower lips.
   *
   */
  static FT_LIP_FUNNEL_LOWER: any

  /**
   * Funnels in both lips.
   *
   */
  static FT_LIP_FUNNEL: any

  /**
   * Upper lip part pushes outwards.
   *
   */
  static FT_LIP_PUCKER_UPPER: any

  /**
   * Lower lip part pushes outwards.
   *
   */
  static FT_LIP_PUCKER_LOWER: any

  /**
   * Lips push outwards.
   *
   */
  static FT_LIP_PUCKER: any

  /**
   * Raises the upper lips.
   *
   */
  static FT_MOUTH_UPPER_UP: any

  /**
   * Lowers the lower lips.
   *
   */
  static FT_MOUTH_LOWER_DOWN: any

  /**
   * Mouth opens, revealing teeth.
   *
   */
  static FT_MOUTH_OPEN: any

  /**
   * Moves mouth right.
   *
   */
  static FT_MOUTH_RIGHT: any

  /**
   * Moves mouth left.
   *
   */
  static FT_MOUTH_LEFT: any

  /**
   * Right side of the mouth smiles.
   *
   */
  static FT_MOUTH_SMILE_RIGHT: any

  /**
   * Left side of the mouth smiles.
   *
   */
  static FT_MOUTH_SMILE_LEFT: any

  /**
   * Mouth expresses a smile.
   *
   */
  static FT_MOUTH_SMILE: any

  /**
   * Right side of the mouth expresses sadness.
   *
   */
  static FT_MOUTH_SAD_RIGHT: any

  /**
   * Left side of the mouth expresses sadness.
   *
   */
  static FT_MOUTH_SAD_LEFT: any

  /**
   * Mouth expresses sadness.
   *
   */
  static FT_MOUTH_SAD: any

  /**
   * Mouth stretches.
   *
   */
  static FT_MOUTH_STRETCH: any

  /**
   * Lip corners dimple.
   *
   */
  static FT_MOUTH_DIMPLE: any

  /**
   * Mouth tightens.
   *
   */
  static FT_MOUTH_TIGHTENER: any

  /**
   * Mouth presses together.
   *
   */
  static FT_MOUTH_PRESS: any

  /**
   * Represents the size of the [enum BlendShapeEntry] enum.
   *
   */
  static FT_MAX: any
}
