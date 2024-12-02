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

    // Create a new sound
    const extension = lines === 3 ? 'ogg' : 'wav';
    const sound = new Howl({
      src: [`/sample/0${lines}.${extension}`],
      volume: 0.5,
      preload: true,
      html5: false,
      onload: () => {
        console.log(`Sound for ${lines} lines loaded successfully`);
        sound.play();
      },
      onloaderror: (id, error) => {
        console.error(`Error loading sound for ${lines} lines:`, error);
      }
    });

    sounds[key] = sound;
  } catch (error) {
    console.error(`Error playing sound for ${lines} lines:`, error);
  }
}
