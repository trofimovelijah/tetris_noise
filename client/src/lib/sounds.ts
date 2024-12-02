import { Howl } from 'howler';

// Cache for sound files
const sounds: { [key: string]: Howl } = {};

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const key = `lines-${lines}`;
    if (!sounds[key]) {
      sounds[key] = new Howl({
        src: [`/sample/0${lines}.wav`],
        volume: 0.5
      });
    }

    sounds[key].play();
  } catch (error) {
    console.error(`Failed to play sound for ${lines} lines:`, error);
  }
}