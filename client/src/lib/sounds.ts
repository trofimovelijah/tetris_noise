import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const key = `lines-${lines}`;
    
    // Очищаем предыдущий звук
    if (sounds[key]) {
      sounds[key].unload();
      delete sounds[key];
    }

    // Используем звуки напрямую из Replit
    const soundUrl = `https://replit.com/@trofimovelijah/ReactTetrisLite/raw/main/sample/0${lines}.wav`;
    
    console.log('Loading sound:', soundUrl);
    
    const sound = new Howl({
      src: [soundUrl],
      volume: 0.5,
      preload: true,
      html5: true,
      format: ['wav'],
      onload: () => {
        console.log(`Sound ${lines} loaded successfully from ${soundUrl}`);
        sound.play();
      },
      onloaderror: (id, error) => {
        console.error(`Error loading sound ${lines} from ${soundUrl}:`, error);
      },
      onplayerror: (id, error) => {
        console.error(`Error playing sound ${lines}:`, error);
      }
    });

    sounds[key] = sound;
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}
