import { useCallback } from 'react';
import { GameState, checkCollision } from '../lib/gameLogic';
import { rotateMatrix } from '../lib/tetrominos';

interface UseControlsProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  isPaused: boolean;
}

export function useControls({
  gameState,
  setGameState,
  isPaused,
}: UseControlsProps) {
  const handleMove = useCallback((offsetX: number, offsetY: number) => {
    if (isPaused || !gameState.currentPiece || gameState.gameOver) return;

    if (!checkCollision(gameState.board, gameState.currentPiece, offsetX, offsetY)) {
      setGameState({
        ...gameState,
        currentPiece: {
          ...gameState.currentPiece,
          x: gameState.currentPiece.x + offsetX,
          y: gameState.currentPiece.y + offsetY,
        },
      });
    }
  }, [gameState, isPaused, setGameState]);

  const handleRotate = useCallback((direction: 1 | -1) => {
    if (isPaused || !gameState.currentPiece || gameState.gameOver) return;

    const newShape = direction === 1
      ? rotateMatrix(gameState.currentPiece.shape)
      : rotateMatrix(rotateMatrix(rotateMatrix(gameState.currentPiece.shape)));

    const newPiece = {
      ...gameState.currentPiece,
      shape: newShape,
    };

    if (!checkCollision(gameState.board, newPiece)) {
      setGameState({
        ...gameState,
        currentPiece: newPiece,
      });
    }
  }, [gameState, isPaused, setGameState]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        handleMove(-1, 0);
        break;
      case 'ArrowRight':
        handleMove(1, 0);
        break;
      case 'ArrowDown':
        handleMove(0, 1);
        break;
      case 'ArrowUp':
        handleRotate(1);
        break;
      case 'z':
      case 'Z':
        handleRotate(-1);
        break;
      case ' ':
        event.preventDefault(); // Prevent page scroll
        setIsPaused(!isPaused);
        break;
    }
  }, [handleMove, handleRotate]);

  const handleTouchControls = useCallback((action: string) => {
    switch (action) {
      case 'left':
        handleMove(-1, 0);
        break;
      case 'right':
        handleMove(1, 0);
        break;
      case 'down':
        handleMove(0, 1);
        break;
      case 'rotateRight':
        handleRotate(1);
        break;
      case 'rotateLeft':
        handleRotate(-1);
        break;
    }
  }, [handleMove, handleRotate]);

  return {
    handleKeyDown,
    handleTouchControls,
  };
}
