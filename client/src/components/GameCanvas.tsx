import { useRef, useEffect } from "react";
import { CELL_SIZE, BOARD_WIDTH, BOARD_HEIGHT, type GameState } from "../lib/gameLogic";
import { COLORS, rotateShape } from "../lib/tetrominos";

interface GameCanvasProps {
  gameState: GameState;
}

export function GameCanvas({ gameState }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas and draw textured background
    ctx.fillStyle = "hsl(40, 20%, 95%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add subtle texture pattern
    ctx.fillStyle = "hsla(40, 20%, 90%, 0.5)";
    for (let i = 0; i < canvas.width; i += 10) {
      for (let j = 0; j < canvas.height; j += 10) {
        if ((i + j) % 20 === 0) {
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }

    // Draw board
    gameState.board.forEach((row: number[], y: number) => {
      row.forEach((value: number, x: number) => {
        if (value) {
          ctx.fillStyle = COLORS[value - 1];
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
    if (gameState.currentPiece) {
      const piece = gameState.currentPiece;
      ctx.fillStyle = COLORS[piece.type];
      
      // Use the rotateShape function from tetrominos.ts
      const rotatedShape = rotateShape(piece.shape, piece.rotation);
      
      rotatedShape.forEach((row: number[], y: number) => {
        row.forEach((value: number, x: number) => {
          if (value) {
            const drawX = (piece.x + x) * CELL_SIZE;
            const drawY = (piece.y + y) * CELL_SIZE;
            ctx.fillRect(drawX, drawY, CELL_SIZE - 1, CELL_SIZE - 1);
          }
        });
      });
    }

    // Draw grid with thinner lines
    ctx.strokeStyle = "hsla(170, 15%, 35%, 0.2)";
    ctx.lineWidth = 0.25;

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
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={BOARD_WIDTH * CELL_SIZE}
      height={BOARD_HEIGHT * CELL_SIZE}
      className="border border-primary shadow-lg rounded-lg"
      style={{
        maxHeight: '80vh',
        width: '100%',
        objectFit: 'contain',
      }}
    />
  );
}
