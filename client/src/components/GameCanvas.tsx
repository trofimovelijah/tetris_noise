import { useRef, useEffect } from "react";
import { CELL_SIZE, BOARD_WIDTH, BOARD_HEIGHT } from "../lib/gameLogic";
import { TETROMINOS } from "../lib/tetrominos";
import type { Board, GamePiece } from "../lib/gameLogic";

interface GameCanvasProps {
  board: Board;
  currentPiece: GamePiece;
}

export function GameCanvas({ board, currentPiece }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw board
    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillStyle = cell;
          ctx.fillRect(
            x * CELL_SIZE,
            y * CELL_SIZE,
            CELL_SIZE - 1,
            CELL_SIZE - 1
          );
        }
      });
    });

    // Draw current piece
    const piece = TETROMINOS[currentPiece.tetromino];
    let shape = piece.shape;
    // Rotate shape based on current rotation
    for (let i = 0; i < currentPiece.rotation % 4; i++) {
      shape = shape[0].map((_, index) =>
        shape.map(row => row[index]).reverse()
      );
    }

    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const drawX = (currentPiece.pos.x + x) * CELL_SIZE;
          const drawY = (currentPiece.pos.y + y) * CELL_SIZE;
          
          ctx.fillStyle = piece.color;
          ctx.fillRect(drawX, drawY, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      });
    });

    // Draw grid
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= BOARD_WIDTH; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }

    for (let i = 0; i <= BOARD_HEIGHT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(BOARD_WIDTH * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }
  }, [board, currentPiece]);

  return (
    <canvas
      ref={canvasRef}
      width={BOARD_WIDTH * CELL_SIZE}
      height={BOARD_HEIGHT * CELL_SIZE}
      className="border border-primary shadow-lg rounded-lg"
    />
  );
}
