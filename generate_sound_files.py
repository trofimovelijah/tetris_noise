import numpy as np
import soundfile as sf
import os

def generate_tone(freq, duration, sample_rate=44100):
    t = np.linspace(0, duration, int(sample_rate * duration))
    # Using a more complex waveform with harmonics for richer sound
    wave = (
        0.5 * np.sin(2 * np.pi * freq * t) +  # fundamental
        0.25 * np.sin(4 * np.pi * freq * t) +  # first harmonic
        0.15 * np.sin(6 * np.pi * freq * t)    # second harmonic
    )
    
    # Apply ADSR envelope
    attack = int(0.02 * sample_rate)
    decay = int(0.05 * sample_rate)
    sustain_level = 0.7
    release = int(0.1 * sample_rate)
    
    envelope = np.ones(len(t))
    # Attack
    envelope[:attack] = np.linspace(0, 1, attack)
    # Decay
    envelope[attack:attack+decay] = np.linspace(1, sustain_level, decay)
    # Release
    envelope[-release:] = np.linspace(sustain_level, 0, release)
    
    return wave * envelope

def ensure_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

def main():
    # Japanese pentatonic scale frequencies
    frequencies = {
        1: 440.0,    # A4
        2: 493.88,   # B4
        3: 587.33,   # D5
        4: 659.25    # E5
    }

    durations = {
        1: 0.2,  # Short for single line
        2: 0.3,  # Medium for double line
        3: 0.4,  # Longer for triple line
        4: 0.5   # Longest for tetris
    }

    # Ensure the sample directory exists
    sample_dir = 'client/public/sample'
    ensure_directory(sample_dir)

    # Generate sound files
    for lines in range(1, 5):
        tone = generate_tone(frequencies[lines], durations[lines])
        # Normalize to prevent clipping
        tone = tone / np.max(np.abs(tone))
        
        # Save as WAV file for all except line 3, which should be OGG
        extension = 'ogg' if lines == 3 else 'wav'
        filename = os.path.join(sample_dir, f'0{lines}.{extension}')
        sf.write(filename, tone, 44100)
        print(f'Generated sound file for {lines} lines: {filename}')

if __name__ == "__main__":
    main()
