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

    // Clear canvas and draw background landscape
    ctx.fillStyle = "#FFF1E6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Red sun
    ctx.fillStyle = "rgba(225, 85, 85, 0.15)";
    ctx.beginPath();
    ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 40, 0, Math.PI * 2);
    ctx.fill();

    // Mountains in the background
    ctx.fillStyle = "rgba(100, 116, 139, 0.1)";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.7);
    ctx.lineTo(canvas.width * 0.3, canvas.height * 0.4);
    ctx.lineTo(canvas.width * 0.5, canvas.height * 0.6);
    ctx.lineTo(canvas.width * 0.7, canvas.height * 0.3);
    ctx.lineTo(canvas.width, canvas.height * 0.5);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();

    // Decorative branches
    ctx.strokeStyle = "rgba(100, 116, 139, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.quadraticCurveTo(100, 0, 200, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height - 50);
    ctx.quadraticCurveTo(canvas.width - 100, canvas.height, canvas.width - 200, canvas.height - 50);
    ctx.stroke();

    // Draw board with rounded rectangles
    gameState.board.forEach((row: number[], y: number) => {
      row.forEach((value: number, x: number) => {
        if (value) {
          ctx.beginPath();
          ctx.roundRect(
            x * CELL_SIZE,
            y * CELL_SIZE,
            CELL_SIZE - 1,
            CELL_SIZE - 1,
            4  // Радиус скругления
          );
          ctx.fillStyle = COLORS[value - 1];
          ctx.fill();
        }
      });
    });

    // Draw current piece with rounded rectangles
    if (gameState.currentPiece) {
      const piece = gameState.currentPiece;
      const rotatedShape = rotateShape(piece.shape, piece.rotation);
      
      rotatedShape.forEach((row: number[], y: number) => {
        row.forEach((value: number, x: number) => {
          if (value) {
            const drawX = (piece.x + x) * CELL_SIZE;
            const drawY = (piece.y + y) * CELL_SIZE;
            
            ctx.beginPath();
            ctx.roundRect(
              drawX,
              drawY,
              CELL_SIZE - 1,
              CELL_SIZE - 1,
              4  // Радиус скругления
            );
            ctx.fillStyle = COLORS[piece.type];
            ctx.fill();
          }
        });
      });
    }

    // Draw grid with thinner lines
    ctx.strokeStyle = "hsla(170, 15%, 35%, 0.1)";
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
      className="border border-primary/10 shadow-lg rounded-2xl"
      style={{
        maxHeight: '80vh',
        width: '100%',
        objectFit: 'contain',
      }}
    />
  );
}
