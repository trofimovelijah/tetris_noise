import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

function createSound(number: number): Howl {
  const key = `sound-${number}`;
  if (sounds[key]) return sounds[key];

  const sound = new Howl({
    src: [`/sample/0${number}.wav`],  // Используем разные файлы для разного количества линий
    volume: 0.5,
    preload: true
  });

  sounds[key] = sound;
  return sound;
}

export async function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;
  
  try {
    const sound = createSound(lines);  // Создаем звук в зависимости от количества линий
    sound.play();
  } catch (error) {
    console.error('Sound playback failed:', error);
  }
}
