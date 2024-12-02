import { useEffect, useRef } from 'react';
import { GameState, moveDown } from '../lib/gameLogic';

interface UseGameLoopProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  isPaused: boolean;
  onGameOver?: () => void;
}

export function useGameLoop({
  gameState,
  setGameState,
  isPaused,
  onGameOver,
}: UseGameLoopProps) {
  const lastUpdate = useRef<number>(0);
  const frameId = useRef<number>(0);

  useEffect(() => {
    if (isPaused || gameState.gameOver) {
      cancelAnimationFrame(frameId.current);
      return;
    }

    function gameLoop(timestamp: number) {
      if (!lastUpdate.current) lastUpdate.current = timestamp;

      const deltaTime = timestamp - lastUpdate.current;
      const speed = Math.max(100, 800 - (gameState.level - 1) * 50);

      if (deltaTime > speed) {
        const newState = moveDown(gameState);
        if (newState.gameOver && onGameOver) {
          onGameOver();
        }
        setGameState(newState);
        lastUpdate.current = timestamp;
      }

      frameId.current = requestAnimationFrame(gameLoop);
    }

    frameId.current = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(frameId.current);
  }, [gameState, isPaused, setGameState, onGameOver]);
}
