/**
 * [AudioStreamGenerator] is a type of audio stream that does not play back sounds on its own; instead, it expects a script to generate audio data for it. See also [AudioStreamGeneratorPlayback].
 *
 * Here's a sample on how to use it to generate a sine wave:
 *
 * @example
 *
 *
 * var playback # Will hold the AudioStreamGeneratorPlayback.
 * @onready var sample_hz = $AudioStreamPlayer.stream.mix_rate
 * var pulse_hz = 440.0 # The frequency of the sound wave.
 * var phase = 0.0
 * func _ready():
 * 	$AudioStreamPlayer.play()
 * 	playback = $AudioStreamPlayer.get_stream_playback()
 * 	fill_buffer()
 * func fill_buffer():
 * 	var increment = pulse_hz / sample_hz
 * 	var frames_available = playback.get_frames_available()
 * 	for i in range(frames_available):
 * 		playback.push_frame(Vector2.ONE * sin(phase * TAU))
 * 		phase = fmod(phase + increment, 1.0)
 *
 *
 * [Export] public AudioStreamPlayer Player { get; set; }
 * private AudioStreamGeneratorPlayback _playback; // Will hold the AudioStreamGeneratorPlayback.
 * private float _sampleHz;
 * private float _pulseHz = 440.0f; // The frequency of the sound wave.
 * private double phase = 0.0;
 * public override void _Ready()
 * {
 * 	if (Player.Stream is AudioStreamGenerator generator) // Type as a generator to access MixRate.
 * 	{
 * 		_sampleHz = generator.MixRate;
 * 		Player.Play();
 * 		_playback = (AudioStreamGeneratorPlayback)Player.GetStreamPlayback();
 * 		FillBuffer();
 * 	}
 * }
 * public void FillBuffer()
 * {
 * 	float increment = _pulseHz / _sampleHz;
 * 	int framesAvailable = _playback.GetFramesAvailable();
 * 	for (int i = 0; i < framesAvailable; i++)
 * 	{
 * 		_playback.PushFrame(Vector2.One * (float)Mathf.Sin(phase * Mathf.Tau));
 * 		phase = Mathf.PosMod(phase + increment, 1.0);
 * 	}
 * }
 *
 * @summary
 *
 *
 * In the example above, the "AudioStreamPlayer" node must use an [AudioStreamGenerator] as its stream. The `fill_buffer` function provides audio data for approximating a sine wave.
 *
 * See also [AudioEffectSpectrumAnalyzer] for performing real-time audio spectrum analysis.
 *
 * **Note:** Due to performance constraints, this class is best used from C# or from a compiled language via GDExtension. If you still want to use this class from GDScript, consider using a lower [member mix_rate] such as 11,025 Hz or 22,050 Hz.
 *
 */
declare class AudioStreamGenerator extends AudioStream {
  /**
   * [AudioStreamGenerator] is a type of audio stream that does not play back sounds on its own; instead, it expects a script to generate audio data for it. See also [AudioStreamGeneratorPlayback].
   *
   * Here's a sample on how to use it to generate a sine wave:
   *
   * @example
   *
   *
   * var playback # Will hold the AudioStreamGeneratorPlayback.
   * @onready var sample_hz = $AudioStreamPlayer.stream.mix_rate
   * var pulse_hz = 440.0 # The frequency of the sound wave.
   * var phase = 0.0
   * func _ready():
   * 	$AudioStreamPlayer.play()
   * 	playback = $AudioStreamPlayer.get_stream_playback()
   * 	fill_buffer()
   * func fill_buffer():
   * 	var increment = pulse_hz / sample_hz
   * 	var frames_available = playback.get_frames_available()
   * 	for i in range(frames_available):
   * 		playback.push_frame(Vector2.ONE * sin(phase * TAU))
   * 		phase = fmod(phase + increment, 1.0)
   *
   *
   * [Export] public AudioStreamPlayer Player { get; set; }
   * private AudioStreamGeneratorPlayback _playback; // Will hold the AudioStreamGeneratorPlayback.
   * private float _sampleHz;
   * private float _pulseHz = 440.0f; // The frequency of the sound wave.
   * private double phase = 0.0;
   * public override void _Ready()
   * {
   * 	if (Player.Stream is AudioStreamGenerator generator) // Type as a generator to access MixRate.
   * 	{
   * 		_sampleHz = generator.MixRate;
   * 		Player.Play();
   * 		_playback = (AudioStreamGeneratorPlayback)Player.GetStreamPlayback();
   * 		FillBuffer();
   * 	}
   * }
   * public void FillBuffer()
   * {
   * 	float increment = _pulseHz / _sampleHz;
   * 	int framesAvailable = _playback.GetFramesAvailable();
   * 	for (int i = 0; i < framesAvailable; i++)
   * 	{
   * 		_playback.PushFrame(Vector2.One * (float)Mathf.Sin(phase * Mathf.Tau));
   * 		phase = Mathf.PosMod(phase + increment, 1.0);
   * 	}
   * }
   *
   * @summary
   *
   *
   * In the example above, the "AudioStreamPlayer" node must use an [AudioStreamGenerator] as its stream. The `fill_buffer` function provides audio data for approximating a sine wave.
   *
   * See also [AudioEffectSpectrumAnalyzer] for performing real-time audio spectrum analysis.
   *
   * **Note:** Due to performance constraints, this class is best used from C# or from a compiled language via GDExtension. If you still want to use this class from GDScript, consider using a lower [member mix_rate] such as 11,025 Hz or 22,050 Hz.
   *
   */
  new(): AudioStreamGenerator
  constructor()
  static new(): AudioStreamGenerator

  /** The length of the buffer to generate (in seconds). Lower values result in less latency, but require the script to generate audio data faster, resulting in increased CPU usage and more risk for audio cracking if the CPU can't keep up. */
  buffer_length: float

  /**
   * The sample rate to use (in Hz). Higher values are more demanding for the CPU to generate, but result in better quality.
   *
   * In games, common sample rates in use are `11025`, `16000`, `22050`, `32000`, `44100`, and `48000`.
   *
   * According to the [url=https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem]Nyquist-Shannon sampling theorem[/url], there is no quality difference to human hearing when going past 40,000 Hz (since most humans can only hear up to ~20,000 Hz, often less). If you are generating lower-pitched sounds such as voices, lower sample rates such as `32000` or `22050` may be usable with no loss in quality.
   *
   * **Note:** [AudioStreamGenerator] is not automatically resampling input data, to produce expected result [member mix_rate_mode] should match the sampling rate of input data.
   *
   * **Note:** If you are using [AudioEffectCapture] as the source of your data, set [member mix_rate_mode] to [constant MIX_RATE_INPUT] or [constant MIX_RATE_OUTPUT] to automatically match current [AudioServer] mixing rate.
   *
   */
  mix_rate: float

  /** Mixing rate mode. If set to [constant MIX_RATE_CUSTOM], [member mix_rate] is used, otherwise current [AudioServer] mixing rate is used. */
  mix_rate_mode: int

  connect<T extends SignalsOf<AudioStreamGenerator>>(
    signal: T,
    method: SignalFunction<AudioStreamGenerator[T]>
  ): number

  /**
   * Current [AudioServer] output mixing rate.
   *
   */
  static MIX_RATE_OUTPUT: any

  /**
   * Current [AudioServer] input mixing rate.
   *
   */
  static MIX_RATE_INPUT: any

  /**
   * Custom mixing rate, specified by [member mix_rate].
   *
   */
  static MIX_RATE_CUSTOM: any

  /**
   * Maximum value for the mixing rate mode enum.
   *
   */
  static MIX_RATE_MAX: any
}
