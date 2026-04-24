"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/* Bouton lune/soleil — bascule entre dark et light.
   Doit être un Client Component car useTheme utilise le contexte React. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Changer le thème"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* Soleil visible en dark mode, lune en light mode */}
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
