import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const key = `lines-${lines}`;
    
    // Если звук уже создан, используем его
    if (sounds[key]?.playing()) {
      return;
    }

    // Очищаем предыдущий звук если он существует
    if (sounds[key]) {
      sounds[key].unload();
      delete sounds[key];
    }

    const extension = lines === 3 ? 'ogg' : 'wav';
    const soundPath = `/sample/0${lines}.${extension}`;
    
    console.log('Loading sound:', soundPath);
    
    const sound = new Howl({
      src: [soundPath],
      volume: 0.7,
      preload: true,
      html5: true,
      format: [extension],
      onload: () => {
        console.log(`Sound ${lines} loaded successfully from ${soundPath}`);
        if (!sound.playing()) {
          sound.play();
        }
      },
      onplayerror: (id, error) => {
        console.error(`Error playing sound ${lines}:`, error);
      },
      onloaderror: (id, error) => {
        console.error(`Error loading sound ${lines}:`, error);
      }
    });

    sounds[key] = sound;
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}
