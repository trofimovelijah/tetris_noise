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
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => onControl('left')}
          className="aspect-square"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => onControl('down')}
          className="aspect-square"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => onControl('right')}
          className="aspect-square"
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => onControl('rotateLeft')}
          className="aspect-square"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => onControl('rotateRight')}
          className="aspect-square"
        >
          <RotateCw className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
