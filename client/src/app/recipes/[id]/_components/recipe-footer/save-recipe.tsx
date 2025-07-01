"use client";

import { useRecipe } from "@/app/recipes/recipe-provider";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "saved_recipes";

function getSavedRecipes(): { id: string; name: string }[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveRecipe(id: string, name: string) {
  const current = getSavedRecipes();
  const alreadySaved = current.some((item) => item.id === id);
  if (!alreadySaved) {
    const updated = [...current, { id, name }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}

export default function SaveRecipe() {
  const pathname = usePathname();
  const logId = pathname.split("/").pop()!;
  const { recipe } = useRecipe();
  const [saved, setSaved] = useState(false);

  const recipeName = recipe?.name;

  useEffect(() => {
    const savedRecipes = getSavedRecipes();
    setSaved(savedRecipes.some((r) => r.id === logId));
  }, [logId]);

  const handleSave = () => {
    if (!saved && recipeName) {
      saveRecipe(logId, recipeName);
      setSaved(true);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`text-sm ${saved ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
      onClick={handleSave}
    >
      <Bookmark className={`size-4 ${saved && 'fill-primary'}`} />
      {saved ? "Saved" : "Save Recipe"}
    </Button>
  );
}
