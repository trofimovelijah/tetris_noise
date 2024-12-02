const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
const audioBuffers: { [key: string]: AudioBuffer } = {};

async function loadSound(number: number): Promise<AudioBuffer> {
  const key = `sound-${number}`;
  if (audioBuffers[key]) return audioBuffers[key];
  
  // Сначала пробуем загрузить OGG
  try {
    const response = await fetch(`/sample/0${number}.ogg`);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers[key] = audioBuffer;
      return audioBuffer;
    }
  } catch (error) {
    console.log('OGG format failed, trying WAV');
  }
  
  // Пробуем WAV если OGG не получился
  try {
    const response = await fetch(`/sample/0${number}.wav`);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      audioBuffers[key] = audioBuffer;
      return audioBuffer;
    }
  } catch (error) {
    console.log('WAV format failed');
    throw new Error('Could not load sound in any format');
  }
  
  throw new Error('Sound file not found');
}

async function playWavSound(buffer: AudioBuffer) {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
}

export async function playSound(lines: number) {
  if (lines < 1 || lines > 4) return;
  
  try {
    const buffer = await loadSound(lines);
    await playWavSound(buffer);
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}
