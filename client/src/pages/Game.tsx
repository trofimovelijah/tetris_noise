import { useEffect, useState } from 'react';
import { GameCanvas } from '../components/GameCanvas';
import { Controls } from '../components/Controls';
import { ScorePanel } from '../components/ScorePanel';
import { NextPiece } from '../components/NextPiece';
import { useGameLoop } from '../hooks/useGameLoop';
import { useControls } from '../hooks/useControls';
import { initGame } from '../lib/gameLogic';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function Game() {
  const [gameState, setGameState] = useState(initGame());
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  const { handleKeyDown, handleTouchControls } = useControls({
    gameState,
    setGameState,
    isPaused,
    setIsPaused,
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
        {/* Добавить заголовок */}
        <h1 className="text-4xl font-bold mb-8 text-center tracking-wide" 
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
          JapanoiseT
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Игровое поле остается без изменений */}
          <div className="flex-1">
            <GameCanvas gameState={gameState} />
          </div>
          
          {/* Обновить стили панели управления */}
          <div className="w-full lg:w-72 space-y-6">
            <div className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg p-4 space-y-6">
              <NextPiece gameState={gameState} />
              <ScorePanel gameState={gameState} />
              
              {/* Настройки */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {gameState.language === 'en' ? 'Language' : 'Язык'}
                  </span>
                  <Select
                    value={gameState.language}
                    onValueChange={(value) => setGameState({ ...gameState, language: value as 'en' | 'ru' })}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {gameState.language === 'en' ? 'Sound' : 'Звук'}
                  </span>
                  <Switch
                    checked={gameState.soundEnabled}
                    onCheckedChange={(checked) => setGameState({ ...gameState, soundEnabled: checked })}
                  />
                </div>
              </div>

              {/* Кнопки управления */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-full bg-background/95 border-primary/20"
                >
                  {isPaused ? <Play className="mr-2 h-5 w-5" /> : <Pause className="mr-2 h-5 w-5" />}
                  <span style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {gameState.language === 'en' ? 'Pause' : 'Пауза'}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setGameState(initGame(gameState.language))}
                  className="w-full bg-background/95 border-primary/20"
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
      </div>
    </div>
  );
}
