import { useEffect, useState } from 'react';
import { GameCanvas } from '../components/GameCanvas';
import { Controls } from '../components/Controls';
import { ScorePanel } from '../components/ScorePanel';
import { NextPiece } from '../components/NextPiece';
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
    <div className="min-h-screen bg-background p-4 lg:p-8 bg-[url('/images/japandi-pattern.svg')] bg-repeat bg-opacity-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <GameCanvas gameState={gameState} />
          </div>
          
          <div className="w-full lg:w-72 space-y-8">
            <NextPiece gameState={gameState} />
            <ScorePanel gameState={gameState} />
            
            <div className="space-y-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsPaused(!isPaused)}
                className="w-full bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors"
              >
                {isPaused ? <Play className="mr-2 h-5 w-5" /> : <Pause className="mr-2 h-5 w-5" />}
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {gameState.language === 'en' ? 'Pause' : 'Пауза'}
                </span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsSettingsOpen(true)}
                className="w-full bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors"
              >
                <Settings className="mr-2 h-5 w-5" />
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {gameState.language === 'en' ? 'Settings' : 'Настройки'}
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setGameState(initGame())}
                className="w-full bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-colors"
              >
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                  {gameState.language === 'en' ? 'New Game' : 'Новая игра'}
                </span>
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
