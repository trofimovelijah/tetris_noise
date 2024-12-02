import { Howl } from 'howler';

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const extension = lines === 3 ? 'ogg' : 'wav';
    const soundPath = `/sample/0${lines}.${extension}`;
    
    console.log('Loading sound:', soundPath);
    
    const sound = new Howl({
      src: [soundPath],
      volume: 0.7,
      format: [extension],
      html5: false,
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
        // Пробуем альтернативный путь без попытки изменить src напрямую
        const altSound = new Howl({
          src: [`/client/public/sample/0${lines}.${extension}`],
          volume: 0.7,
          format: [extension],
          html5: false,
          preload: true,
          onload: () => {
            console.log(`Sound ${lines} loaded successfully from alt path`);
            altSound.play();
          }
        });
      }
    });
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}
