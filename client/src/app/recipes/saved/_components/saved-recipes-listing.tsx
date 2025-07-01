"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

const STORAGE_KEY = "saved_recipes";

type Recipe = {
  id: string;
  name: string;
};

export default function SavedRecipesListing() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecipes(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid saved recipe format");
      }
    }
  }, []);

  const handleRemove = (id: string) => {
    const updated = recipes.filter((r) => r.id !== id);
    setRecipes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="py-6 space-y-4">
      <h1 className="flex items-center gap-1 text-sm font-semibold uppercase text-border">
        <Bookmark className="size-4" />
        Saved Recipes
      </h1>

      {recipes.length === 0 ? (
        <p className="text-muted-foreground">You haven't saved any recipes yet.</p>
      ) : (
        <ul className="space-y-2">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <Link href={`/recipes/${recipe.id}`} className="text-primary hover:underline">
                {recipe.name}
              </Link>
              <Button variant="ghost" size="sm" onClick={() => handleRemove(recipe.id)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
