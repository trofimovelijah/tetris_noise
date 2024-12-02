import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GameState } from "../lib/gameLogic";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

export function SettingsDialog({
  open,
  onOpenChange,
  gameState,
  setGameState,
}: SettingsDialogProps) {
  const labels = {
    settings: gameState.language === 'en' ? 'Settings' : 'Настройки',
    sound: gameState.language === 'en' ? 'Sound' : 'Звук',
    language: gameState.language === 'en' ? 'Language' : 'Язык',
    english: gameState.language === 'en' ? 'English' : 'Английский',
    russian: gameState.language === 'en' ? 'Russian' : 'Русский',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-primary/20 shadow-xl">
        <DialogHeader className="bg-background text-foreground">
          <DialogTitle className="text-foreground">{labels.settings}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {gameState.language === 'en' ? 'Adjust game settings and preferences' : 'Настройте параметры игры'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 bg-background text-foreground">
          <div className="flex items-center justify-between">
            <Label htmlFor="sound">{labels.sound}</Label>
            <Switch
              id="sound"
              checked={gameState.soundEnabled}
              onCheckedChange={(checked) =>
                setGameState({ ...gameState, soundEnabled: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">{labels.language}</Label>
            <Select
              value={gameState.language}
              onValueChange={(value) =>
                setGameState({ ...gameState, language: value as 'en' | 'ru' })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{labels.english}</SelectItem>
                <SelectItem value="ru">{labels.russian}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
