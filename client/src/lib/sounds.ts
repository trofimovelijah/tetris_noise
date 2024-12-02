import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

function createSound(number: number): Howl {
  const key = `sound-${number}`;
  if (sounds[key]) return sounds[key];

  // Используем полный путь и добавляем обработку ошибок
  const sound = new Howl({
    src: [`/sample/0${number}.wav`, `/sample/0${number}.ogg`], // Пробуем оба формата
    volume: 0.5,
    preload: true,
    format: ['wav', 'ogg'],
    onloaderror: (id, error) => {
      console.error(`Error loading sound ${number}:`, error);
    },
    onload: () => {
      console.log(`Sound ${number} loaded successfully`);
    }
  });

  sounds[key] = sound;
  return sound;
}

export async function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;
  
  try {
    const sound = createSound(lines);
    if (sound.state() === 'loaded') {
      sound.play();
    } else {
      sound.once('load', () => {
        sound.play();
      });
    }
  } catch (error) {
    console.error(`Failed to play sound for ${lines} lines:`, error);
  }
}
