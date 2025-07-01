"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import RecipeListItem from "./recipe-list-item";

const STORAGE_KEY = "saved_recipes";

type Recipe = {
  id: string;
  name: string;
};

export default function SavedRecipesListing() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

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

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="flex items-center gap-1 text-sm font-semibold uppercase text-border">
          <Bookmark className="size-4" />
          Saved Recipes
        </h1>

        <div className="flex flex-col w-full gap-2 sm:flex-row sm:items-center sm:gap-2 sm:w-auto">
          {recipes.length > 0 && (
            <Input
              placeholder="Search recipes..."
              value={search}
              className="w-full sm:w-64"
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <Link
            href="/recipes/search"
            className={cn(buttonVariants({ variant: "default" }), "w-full sm:w-auto text-center group")}
          >
            New Recipe
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="text-muted-foreground">
          {recipes.length === 0
            ? "You haven't saved any recipes yet."
            : "No matching recipes found."}
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredRecipes.map((recipe) => (
            <RecipeListItem
              key={recipe.id}
              recipe={recipe}
              handleRemove={handleRemove}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
