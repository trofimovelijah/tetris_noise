import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const key = `lines-${lines}`;
    
    if (sounds[key]) {
      sounds[key].play();
      return;
    }

    const extension = lines === 3 ? 'ogg' : 'wav';
    const sound = new Howl({
      src: [`/sample/0${lines}.${extension}`],
      volume: 0.5,
      preload: true,
      html5: true,
      onload: () => {
        console.log(`Sound ${lines} loaded from: /sample/0${lines}.${extension}`);
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
