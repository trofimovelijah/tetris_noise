import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon } from "lucide-react";
import { useGame } from "../context/GameContext";
import { useLanguage } from "../context/LanguageContext";

export function Settings() {
  const { state, toggleSound } = useGame();
  const { language, setLanguage, t } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("settings")}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {t("sound")}
            </label>
            <Switch
              checked={state.soundEnabled}
              onCheckedChange={toggleSound}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {t("language")}
            </label>
            <div className="space-x-2">
              <Button
                variant={language === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("en")}
              >
                EN
              </Button>
              <Button
                variant={language === "ru" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("ru")}
              >
                RU
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
