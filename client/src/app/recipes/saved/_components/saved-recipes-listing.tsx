"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import RecipeListItem from "./recipe-list-item";
import PageTitle from "../../_components/page-title";
import { AnimatePresence, motion, Variants } from "framer-motion";

const STORAGE_KEY = "saved_recipes";

type Recipe = {
  id: string;
  name: string;
};

const listVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, type: "spring", damping: 20, stiffness: 260 }},
  exit: { opacity: 0, y: -14, transition: { duration: 0.17 } },
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
        <PageTitle title="Saved Recipes" icon="bookmark" />

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
            href="/recipes/generate"
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
            ? "No saved recipes yet. Browse discoveries or create one!"
            : "No matching recipes found."}
        </p>
      ) : (
        <motion.ul
          className="space-y-2"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={listVariants}
        >
          <AnimatePresence>
            {filteredRecipes.map((recipe) => (
              <motion.li
                key={recipe.id}
                variants={itemVariants}
                layout
              >
                <RecipeListItem
                  recipe={recipe}
                  handleRemove={handleRemove}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
