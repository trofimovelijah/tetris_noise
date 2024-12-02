const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
const audioBuffers: { [key: string]: AudioBuffer } = {};

async function loadSound(number: number): Promise<AudioBuffer> {
  const key = `sound-${number}`;
  if (audioBuffers[key]) return audioBuffers[key];
  
  // Пробуем загрузить OGG
  try {
    // Используем относительный путь и убеждаемся, что файлы доступны
    const response = await fetch(`../sample/0${number}.ogg`);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers[key] = audioBuffer;
      return audioBuffer;
    }
  } catch (error) {
    console.error('OGG load error:', error);
  }
  
  // Пробуем WAV
  try {
    const response = await fetch(`../sample/0${number}.wav`);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers[key] = audioBuffer;
      return audioBuffer;
    }
  } catch (error) {
    console.error('WAV load error:', error);
  }
  
  throw new Error(`Could not load sound ${number} in any format`);
}

async function playWavSound(buffer: AudioBuffer) {
  try {
    // Создаем новый контекст при необходимости
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

export async function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;
  
  try {
    const buffer = await loadSound(lines);
    await playWavSound(buffer);
  } catch (error) {
    console.error('Sound playback failed:', error);
  }
}
