import numpy as np
import soundfile as sf

def generate_tone(freq, duration, sample_rate=44100):
    t = np.linspace(0, duration, int(sample_rate * duration))
    tone = 0.5 * np.sin(2 * np.pi * freq * t)
    # Apply a simple envelope to avoid clicks
    envelope = np.concatenate([
        np.linspace(0, 1, int(0.01 * sample_rate)),
        np.ones(len(t) - int(0.02 * sample_rate)),
        np.linspace(1, 0, int(0.01 * sample_rate))
    ])
    return tone * envelope

# Generate different tones for different line clears
frequencies = {
    1: 440,    # A4 note
    2: 523.25, # C5 note
    3: 659.25, # E5 note
    4: 880     # A5 note
}

durations = {
    1: 0.2,
    2: 0.3,
    3: 0.4,
    4: 0.5
}

for lines in range(1, 5):
    tone = generate_tone(frequencies[lines], durations[lines])
    sf.write(f'client/public/sample/0{lines}.wav', tone, 44100)
    print(f'Generated sound file for {lines} lines')
