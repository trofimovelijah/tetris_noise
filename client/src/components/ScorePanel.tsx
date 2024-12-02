import { Card } from "@/components/ui/card";
import { GameState } from "../lib/gameLogic";

interface ScorePanelProps {
  gameState: GameState;
}

export function ScorePanel({ gameState }: ScorePanelProps) {
  const labels = {
    score: gameState.language === 'en' ? 'Score' : 'Очки',
    level: gameState.language === 'en' ? 'Level' : 'Уровень',
    lines: gameState.language === 'en' ? 'Lines' : 'Линии',
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          {labels.score}
        </h3>
        <p className="text-3xl font-bold text-primary">
          {gameState.score}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          {labels.level}
        </h3>
        <p className="text-2xl font-bold">
          {gameState.level}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          {labels.lines}
        </h3>
        <p className="text-2xl font-bold">
          {gameState.lines}
        </p>
      </div>
    </Card>
  );
}
