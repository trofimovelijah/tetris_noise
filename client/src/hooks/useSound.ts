import { useCallback, useRef, useEffect } from "react";
import { useGame } from "../context/GameContext";

export function useSound() {
  const audioContext = useRef<AudioContext | null>(null);
  const { state } = useGame();

  useEffect(() => {
    audioContext.current = new AudioContext();
    return () => {
      audioContext.current?.close();
    };
  }, []);

  const playSound = useCallback(async (url: string) => {
    if (!state.soundEnabled || !audioContext.current) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);
      
      const source = audioContext.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.current.destination);
      source.start();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, [state.soundEnabled]);

  const playMove = useCallback(() => {
    playSound("/sounds/move.mp3");
  }, [playSound]);

  const playRotate = useCallback(() => {
    playSound("/sounds/rotate.mp3");
  }, [playSound]);

  const playClear = useCallback(() => {
    playSound("/sounds/clear.mp3");
  }, [playSound]);

  return { playMove, playRotate, playClear };
}
