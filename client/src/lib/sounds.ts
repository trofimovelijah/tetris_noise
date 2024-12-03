import { Howl } from 'howler';

// Используем абсолютные пути от корня public
const BASE_URL = window.location.origin;

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const extension = lines === 3 ? 'ogg' : 'wav';
    const soundPath = `${BASE_URL}/sample/0${lines}.${extension}`;
    
    console.log('Attempting to play sound:', soundPath);
    
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
        console.error(`Failed to load sound ${lines}:`, err);
        // Попробуем альтернативный путь
        const altPath = `/sample/0${lines}.${extension}`;
        console.log('Trying alternative path:', altPath);
        const altSound = new Howl({
          src: [altPath],
          volume: 0.7,
          format: [extension],
          html5: false,
          preload: true,
          onload: () => {
            console.log(`Sound ${lines} loaded successfully from alternative path`);
            altSound.play();
          }
        });
      }
    });
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}