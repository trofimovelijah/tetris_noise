const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
const audioBuffers: { [key: string]: AudioBuffer } = {};

// Загрузка звуковых файлов
async function loadSound(filename: string): Promise<AudioBuffer> {
  if (audioBuffers[filename]) return audioBuffers[filename];
  
  const response = await fetch(`/sample/${filename}`);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  audioBuffers[filename] = audioBuffer;
  return audioBuffer;
}

async function playWavSound(buffer: AudioBuffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
}

export async function playSound(lines: number) {
  try {
    const filename = `0${lines}.wav`;
    const buffer = await loadSound(filename);
    await playWavSound(buffer);
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}
