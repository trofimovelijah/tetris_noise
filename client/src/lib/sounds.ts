import { Howl } from 'howler';

const sounds: { [key: string]: Howl } = {};

function createSound(number: number): Howl {
  const key = `sound-${number}`;
  if (sounds[key]) return sounds[key];

  // Create a new Howl instance
  const sound = new Howl({
    src: ['/01.wav'],
    volume: 0.5,
    preload: true
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
    console.error('Sound playback failed:', error);
  }
}