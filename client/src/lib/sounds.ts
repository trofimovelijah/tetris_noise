let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function createTetrisSound(frequency: number, duration: number): OscillatorNode {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  
  gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  return oscillator;
}

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;
  
  try {
    // Different frequencies and durations for different line clears
    const config = {
      1: { freq: 440, duration: 0.2 },    // A4 note
      2: { freq: 523.25, duration: 0.3 }, // C5 note
      3: { freq: 659.25, duration: 0.4 }, // E5 note
      4: { freq: 880, duration: 0.5 }     // A5 note
    };

    const sound = createTetrisSound(
      config[lines as keyof typeof config].freq,
      config[lines as keyof typeof config].duration
    );

    sound.start();
    sound.stop(getAudioContext().currentTime + config[lines as keyof typeof config].duration);
  } catch (error) {
    console.error(`Failed to play sound for ${lines} lines:`, error);
  }
}
