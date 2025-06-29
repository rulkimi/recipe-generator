"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Search } from "lucide-react";
import Customization from "./customization";
import { searchRecipe, searchRecipeByIngredients, getRecipeById } from "@/actions/search";
import { KeyboardEvent, useState, useEffect } from "react";
import { Recipe, SearchResponse } from "@/types";
import { useRecipe } from "@/app/recipes/recipe-provider";
import { useRouter, usePathname } from "next/navigation";
import { useDietaryRestrictions } from "@/app/recipes/dietary-restrictions-provider";
import { useResponseLanguage } from "@/app/recipes/response-language-provider";
import { toast } from "sonner";
import { useQueryState } from "nuqs";
import { TagInput } from "../ui/tag-input";
import { useSuggestedFood } from "@/app/recipes/suggested-food-provider";

export default function SearchBar({ ...props }) {
  const router = useRouter();
  const pathname = usePathname();

  const { dietaryRestrictions } = useDietaryRestrictions();
  const { responseLanguage } = useResponseLanguage();
  const { setRecipe } = useRecipe();
  const { setSuggestedFood } = useSuggestedFood();

  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [type, setType] = useQueryState("type");
  const [placeholder, setPlaceholder] = useState("Type something tasty...");

  useEffect(() => {
    if (pathname === "/recipes/search") return;
    const match = pathname.match(/^\/recipes\/([^\/]+)$/);
    if (match && match[1]) {
      const logId = match[1];
      getRecipeById(logId)
        .then((response) => {
          if (response?.data?.recipe) {
            const recipeResponse = response.data.recipe;
            const recipe: Recipe = Array.isArray(recipeResponse) ? recipeResponse[0] : recipeResponse;
            if (Array.isArray(recipeResponse)) {
              setType("ingredients");
              setSuggestedFood(recipeResponse);
            }
            setInputValue(recipe.name);
            setRecipe(recipe);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch recipe by id:", error);
        });
    }
  }, [pathname, setRecipe]);

  useEffect(() => {
    if (type === "ingredients") {
      setPlaceholder("Press enter to add ingredient");
    } else {
      setPlaceholder("Type something tasty...");
    }
  }, [type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await search();
    }
  };

  const search = async () => {
    const isIngredientsMode = type === "ingredients";
    const query = isIngredientsMode ? ingredients : inputValue.trim();
  
    if (!query || (isIngredientsMode && ingredients.length === 0)) {
      toast.warning("Please provide ingredients or a dish name.");
      return;
    }
  
    try {
      const response: SearchResponse = isIngredientsMode
        ? await searchRecipeByIngredients(ingredients, {
            dietaryRestrictions,
            responseLanguage,
          })
        : await searchRecipe(query as string, {
            dietaryRestrictions,
            responseLanguage,
          });
  
      const { data, log_id } = response;
      console.log(data)
      setRecipe(Array.isArray(data.recipe) ? data.recipe[0] : data.recipe);
      router.push(`/recipes/${log_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 w-full">
      <div className="relative flex-1">
        {type === "ingredients" ? (
          <TagInput
            className="min-h-[50px] pl-12 pr-22 border-2"
            value={ingredients}
            onChange={setIngredients}
            placeholder={placeholder}
            {...props}
          />
        ) : (
          <Input
            className="h-[50px] pl-12 pr-22 border-2"
            placeholder={placeholder}
            {...props}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        )}
        <Button variant="ghost" size="icon" className="absolute left-2 top-2">
          <Search className="size-5 text-primary" />
        </Button>
        <Customization />
        <Button variant="ghost" size="icon" className="absolute right-2 top-2">
          <Camera className="size-5 text-primary" />
        </Button>
      </div>
      <Button className="h-[50px] px-6 w-full md:w-auto" onClick={search}>
        Search
      </Button>
    </div>
  );
}
