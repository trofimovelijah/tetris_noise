import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const key = `lines-${lines}`;
    
    // If sound is already loaded, use it
    if (sounds[key]) {
      sounds[key].play();
      return;
    }

    // All sounds will use WAV format for better compatibility
    const sound = new Howl({
      src: [`/sample/0${lines}.wav`],
      volume: 0.5,
      preload: true,
      html5: false,
      onload: () => {
        console.log(`Sound for ${lines} lines loaded successfully`);
        sound.play();
      },
      onloaderror: (id, error) => {
        console.error(`Error loading sound ${lines}:`, error);
      }
    });

    sounds[key] = sound;
  } catch (error) {
    console.error(`Error playing sound for ${lines} lines:`, error);
  }
}
