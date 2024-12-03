import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const key = `lines-${lines}`;
    const extension = lines === 3 ? 'ogg' : 'wav';
    const soundPath = `/sample/0${lines}.${extension}`;
    
    // Очищаем предыдущий звук если он существует
    if (sounds[key]) {
      sounds[key].unload();
      delete sounds[key];
    }
    
    console.log('Loading sound:', soundPath);
    
    const sound = new Howl({
      src: [soundPath],
      volume: 0.7,
      format: [extension],
      html5: false,
      preload: true,
      onload: () => {
        console.log(`Sound ${lines} loaded successfully from ${soundPath}`);
        sound.play();
      },
      onloaderror: (id, err) => {
        console.error(`Failed to load sound ${lines} from ${soundPath}:`, err);
      },
      onplayerror: (id, err) => {
        console.error(`Error playing sound ${lines}:`, err);
        // Попытка перезагрузить и воспроизвести звук
        sound.once('unlock', () => {
          sound.play();
        });
      }
    });
    
    sounds[key] = sound;
    
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}
