import { GameState } from '../lib/gameLogic';
import { COLORS } from '../lib/tetrominos';

interface NextPieceProps {
  gameState: GameState;
}

export function NextPiece({ gameState }: NextPieceProps) {
  const nextPiece = gameState.nextPiece;
  if (!nextPiece) return null;

  return (
    <div className="p-4 bg-white shadow-md border border-primary/10 rounded-2xl">
      <h3 className="text-sm font-medium mb-2" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        {gameState.language === 'en' ? 'Next' : 'Следующая'}
      </h3>
      <div className="w-24 h-24 relative">
        <canvas
          ref={(canvas) => {
            if (canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                nextPiece.shape.forEach((row, y) => {
                  row.forEach((value, x) => {
                    if (value) {
                      ctx.fillStyle = COLORS[nextPiece.type];
                      ctx.fillRect(x * 20, y * 20, 19, 19);
                    }
                  });
                });
              }
            }
          }}
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}
