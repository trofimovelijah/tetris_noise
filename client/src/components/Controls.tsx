import { Button } from "@/components/ui/button";
import { RotateCcw, ArrowLeft, ArrowRight, ArrowDown, RotateCw } from "lucide-react";
import { GameState } from "../lib/gameLogic";

interface ControlsProps {
  gameState: GameState;
  onControl: (action: string) => void;
}

export function Controls({ gameState, onControl }: ControlsProps) {
  const labels = {
    left: gameState.language === 'en' ? 'Left' : 'Влево',
    right: gameState.language === 'en' ? 'Right' : 'Вправо',
    down: gameState.language === 'en' ? 'Down' : 'Вниз',
    rotate: gameState.language === 'en' ? 'Rotate' : 'Поворот',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onControl('left')}
          className="aspect-square bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-primary" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onControl('down')}
          className="aspect-square bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors"
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onControl('right')}
          className="aspect-square bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors"
        >
          <ArrowRight className="h-6 w-6 text-primary" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onControl('rotateLeft')}
          className="aspect-square bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors"
        >
          <RotateCcw className="h-6 w-6 text-primary" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onControl('rotateRight')}
          className="aspect-square bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors"
        >
          <RotateCw className="h-6 w-6 text-primary" />
        </Button>
      </div>
    </div>
  );
}
