/**
 */
declare class AudioStreamPlaybackResampled extends AudioStreamPlayback {
  /**
   */
  new(): AudioStreamPlaybackResampled
  constructor()
  static new(): AudioStreamPlaybackResampled

  /** No documentation provided. */
  protected _get_stream_sampling_rate(): float

  /** No documentation provided. */
  protected _mix_resampled(dst_buffer: CPointer, frame_count: int): int

  /** No documentation provided. */
  begin_resample(): void

  connect<T extends SignalsOf<AudioStreamPlaybackResampled>>(
    signal: T,
    method: SignalFunction<AudioStreamPlaybackResampled[T]>
  ): number
}
