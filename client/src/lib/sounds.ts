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
      html5: true,
      preload: false,
      onload: () => {
        console.log(`Sound ${lines} loaded successfully`);
        sound.play();
      },
      onloaderror: (id, err) => {
        console.error(`Failed to load sound ${lines}:`, err);
      }
    });
  } catch (error) {
    console.error(`Error in playSound(${lines}):`, error);
  }
}