import { Howl } from 'howler';

export function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;

  try {
    const extension = lines === 3 ? 'ogg' : 'wav';
    const soundPath = `/sample/0${lines}.${extension}`;
    
    console.log('Attempting to play sound:', soundPath);
    
    // Создаем новый экземпляр для каждого воспроизведения
    const sound = new Howl({
      src: [soundPath],
      volume: 0.7,
      format: [extension],
      html5: false,
      preload: false,
      onload: () => {
        console.log(`Successfully loaded sound from ${soundPath}`);
        sound.play();
      },
      onplay: () => {
        console.log(`Started playing sound from ${soundPath}`);
      },
      onend: () => {
        console.log(`Finished playing sound from ${soundPath}`);
        sound.unload(); // Очищаем ресурсы после воспроизведения
      },
      onloaderror: (id, err) => {
        console.error(`Error loading sound ${soundPath}:`, err);
      },
      onplayerror: (id, err) => {
        console.error(`Error playing sound ${soundPath}:`, err);
        // Попытка воспроизвести ещё раз
        sound.once('unlock', () => {
          sound.play();
        });
      }
    });

    // Начинаем загрузку
    sound.load();
    
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}
