import { Howl } from 'howler';

const BASE_PATH = '/sample';

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const soundPath = `${BASE_PATH}/0${lines}.wav`;
    console.log('Loading sound:', soundPath);
    
    const sound = new Howl({
      src: [soundPath],
      volume: 0.7,
      format: ['wav'],
      html5: true,
      preload: true,
      onload: () => {
        console.log(`Sound ${lines} loaded successfully`);
        sound.play();
      },
      onplay: () => {
        console.log(`Playing sound ${lines}`);
      },
      onloaderror: (id, err) => {
        console.error(`Failed to load sound ${lines}:`, err);
        // Попытка использовать альтернативный путь
        const altPath = `/client/public/sample/0${lines}.wav`;
        console.log('Trying alternative path:', altPath);
        sound.src = [altPath];
        sound.load();
      }
    });

    sound.load();
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}
