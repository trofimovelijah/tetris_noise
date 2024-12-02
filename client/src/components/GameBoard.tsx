import { useEffect, useRef } from 'react';
import { GameState } from '../lib/gameLogic';
import { COLORS } from '../lib/tetrominos';

interface GameBoardProps {
  gameState: GameState;
}

const BLOCK_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export function GameBoard({ gameState }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#333';
    for (let x = 0; x < BOARD_WIDTH; x++) {
      for (let y = 0; y < BOARD_HEIGHT; y++) {
        ctx.strokeRect(
          x * BLOCK_SIZE,
          y * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    }

    // Draw board
    gameState.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.fillStyle = COLORS[value - 1];
          ctx.fillRect(
            x * BLOCK_SIZE,
            y * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      });
    });

    // Draw current piece
    const piece = gameState.currentPiece;
    if (piece) {
      ctx.fillStyle = COLORS[piece.type];
      piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            ctx.fillRect(
              (piece.x + x) * BLOCK_SIZE,
              (piece.y + y) * BLOCK_SIZE,
              BLOCK_SIZE,
              BLOCK_SIZE
            );
          }
        });
      });
    }
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={BOARD_WIDTH * BLOCK_SIZE}
      height={BOARD_HEIGHT * BLOCK_SIZE}
      className="border border-border rounded-lg shadow-lg mx-auto"
      style={{
        maxHeight: '80vh',
        width: '100%',
        objectFit: 'contain',
      }}
    />
  );
}
