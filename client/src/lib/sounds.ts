import { Howl } from 'howler';

const SOUND_PATHS = {
  1: '/sample/01.wav',
  2: '/sample/02.wav',
  3: '/sample/03.wav',
  4: '/sample/04.wav'
};

let currentSound: Howl | null = null;

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    // Остановить предыдущий звук, если он воспроизводится
    if (currentSound) {
      currentSound.stop();
      currentSound.unload();
    }

    const soundPath = SOUND_PATHS[lines as keyof typeof SOUND_PATHS];
    console.log('Loading sound:', soundPath);
    
    currentSound = new Howl({
      src: [soundPath],
      volume: 0.7,
      format: ['wav'],
      html5: true,
      preload: true,
      pool: 1,
      onload: () => {
        console.log(`Sound ${lines} loaded successfully from ${soundPath}`);
        currentSound?.play();
      },
      onplay: () => {
        console.log(`Playing sound ${lines}`);
      },
      onend: () => {
        console.log(`Finished playing sound ${lines}`);
        if (currentSound) {
          currentSound.unload();
          currentSound = null;
        }
      },
      onloaderror: (id, err) => {
        console.error(`Error loading sound ${lines} from ${soundPath}:`, err);
      },
      onplayerror: (id, err) => {
        console.error(`Error playing sound ${lines}:`, err);
      }
    });
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}
