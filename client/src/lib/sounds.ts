import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const key = `lines-${lines}`;
    
    if (sounds[key]) {
      sounds[key].unload();
      delete sounds[key];
    }

    const extension = lines === 3 ? 'ogg' : 'wav';
    const soundPath = `/sample/0${lines}.${extension}`;
    
    console.log('Loading sound:', soundPath);
    
    const sound = new Howl({
      src: [soundPath],
      volume: 0.5,
      preload: true,
      html5: false,
      format: [extension],
      onload: () => {
        console.log(`Sound ${lines} loaded successfully from ${soundPath}`);
        sound.play();
      },
      onloaderror: (id, error) => {
        console.error(`Error loading sound ${lines} from ${soundPath}:`, error);
      }
    });

    sounds[key] = sound;
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}
