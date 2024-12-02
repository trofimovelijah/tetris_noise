import { useEffect, useState } from 'react';
import { GameBoard } from '../components/GameBoard';
import { Controls } from '../components/Controls';
import { ScorePanel } from '../components/ScorePanel';
import { SettingsDialog } from '../components/SettingsDialog';
import { useGameLoop } from '../hooks/useGameLoop';
import { useControls } from '../hooks/useControls';
import { initGame } from '../lib/gameLogic';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Pause, Play, Settings } from 'lucide-react';

export default function Game() {
  const [gameState, setGameState] = useState(initGame());
  const [isPaused, setIsPaused] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toast } = useToast();

  const { handleKeyDown, handleTouchControls } = useControls({
    gameState,
    setGameState,
    isPaused,
  });

  useGameLoop({
    gameState,
    setGameState,
    isPaused,
    onGameOver: () => {
      toast({
        title: gameState.language === 'en' ? 'Game Over' : 'Игра окончена',
        description: `Score: ${gameState.score}`,
      });
    },
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <GameBoard gameState={gameState} />
          </div>
          
          <div className="w-full lg:w-64 space-y-6">
            <ScorePanel gameState={gameState} />
            
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsPaused(!isPaused)}
                className="w-full"
              >
                {isPaused ? <Play className="mr-2" /> : <Pause className="mr-2" />}
                {gameState.language === 'en' ? 'Pause' : 'Пауза'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsSettingsOpen(true)}
                className="w-full"
              >
                <Settings className="mr-2" />
                {gameState.language === 'en' ? 'Settings' : 'Настройки'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setGameState(initGame())}
                className="w-full"
              >
                {gameState.language === 'en' ? 'New Game' : 'Новая игра'}
              </Button>
            </div>
            
            <Controls 
              gameState={gameState}
              onControl={handleTouchControls}
            />
          </div>
        </div>
      </div>

      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        gameState={gameState}
        setGameState={setGameState}
      />
    </div>
  );
}
