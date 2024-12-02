import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

function createSound(number: number): Howl {
  const key = `sound-${number}`;
  if (sounds[key]) return sounds[key];

  // Проверяем наличие файла и создаем звук
  const sound = new Howl({
    src: [`/sample/0${number}.wav`],
    volume: 0.5,
    preload: true,
    onloaderror: (id, error) => {
      console.error(`Error loading sound ${number}:`, error);
    }
  });

  sounds[key] = sound;
  return sound;
}

export async function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;
  
  try {
    const sound = createSound(lines);
    sound.play();
  } catch (error) {
    console.error(`Failed to play sound for ${lines} lines:`, error);
  }
}
