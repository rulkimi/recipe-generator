"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Only toggle between 'light' and 'dark', ignore 'system'
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className="flex items-center justify-center rounded-md group hover:bg-transparent dark:hover:bg-transparent"
      onClick={() => setTheme(nextTheme)}
    >
      {isDark ? (
        <Sun className="size-5 transition-colors duration-300 group-hover:text-yellow-400 group-hover:fill-yellow-200" />
      ) : (
        <Moon className="size-5 transition-colors duration-300 group-hover:text-primary group-hover:fill-primary/20" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
