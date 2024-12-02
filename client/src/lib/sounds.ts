import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;
  
  try {
    const key = `lines-${lines}`;
    if (!sounds[key]) {
      // Use OGG format for 3 lines, WAV for others
      const extension = lines === 3 ? 'ogg' : 'wav';
      sounds[key] = new Howl({
        src: [`/sample/0${lines}.${extension}`],
        volume: 0.5,
        preload: true
      });
    }

    sounds[key].play();
  } catch (error) {
    console.error(`Failed to play sound for ${lines} lines:`, error);
  }
}
