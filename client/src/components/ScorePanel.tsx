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
    <Card className="p-6 space-y-6 bg-background/50 backdrop-blur-sm border-primary/20 shadow-lg">
      <div className="relative space-y-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-primary/10">
        <h3 className="text-lg font-medium tracking-wide" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
          {labels.score}
        </h3>
        <p className="text-4xl font-bold text-primary pb-4">
          {gameState.score}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium tracking-wide text-foreground/80" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
            {labels.level}
          </h3>
          <p className="text-2xl font-bold text-foreground">
            {gameState.level}
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium tracking-wide text-foreground/80" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
            {labels.lines}
          </h3>
          <p className="text-2xl font-bold text-foreground">
            {gameState.lines}
          </p>
        </div>
      </div>
    </Card>
  );
}
