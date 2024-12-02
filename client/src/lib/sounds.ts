const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

function createOscillator(frequency: number, duration: number) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

export function playSound(lines: number) {
  switch (lines) {
    case 1:
      createOscillator(440, 0.1); // A4
      break;
    case 2:
      createOscillator(554.37, 0.15); // C#5
      break;
    case 3:
      createOscillator(659.25, 0.2); // E5
      break;
    case 4:
      createOscillator(880, 0.3); // A5
      break;
  }
}
