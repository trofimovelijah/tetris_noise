import { createContext, useContext, useState } from "react";

interface GameState {
  score: number;
  level: number;
  lines: number;
  isPaused: boolean;
  isGameOver: boolean;
  soundEnabled: boolean;
}

interface GameContextType {
  state: GameState;
  updateScore: (clearedLines: number) => void;
  togglePause: () => void;
  resetGame: () => void;
  toggleSound: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

const initialState: GameState = {
  score: 0,
  level: 1,
  lines: 0,
  isPaused: false,
  isGameOver: false,
  soundEnabled: true
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);

  const updateScore = (clearedLines: number) => {
    setState(prev => {
      const points = [0, 1, 3, 5, 8][clearedLines];
      const newLines = prev.lines + clearedLines;
      const newLevel = Math.floor(newLines / 15) + 1;
      
      return {
        ...prev,
        score: prev.score + points,
        lines: newLines,
        level: newLevel
      };
    });
  };

  const togglePause = () => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const resetGame = () => {
    setState(initialState);
  };

  const toggleSound = () => {
    setState(prev => {
      const newState = { ...prev, soundEnabled: !prev.soundEnabled };
      localStorage.setItem("soundEnabled", String(newState.soundEnabled));
      return newState;
    });
  };

  return (
    <GameContext.Provider
      value={{ state, updateScore, togglePause, resetGame, toggleSound }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
