"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Loader, Search } from "lucide-react";
import Customization from "./customization";
import {
  searchRecipe,
  searchRecipeByIngredients,
  searchByImage,
  getRecipeById,
} from "@/actions/search";
import { KeyboardEvent, useState, useEffect, useRef } from "react";
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

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [type, setType] = useQueryState("type");
  const [placeholder, setPlaceholder] = useState("Type something tasty...");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pathname === "/recipes/search") return;
    const match = pathname.match(/^\/recipes\/([^\/]+)$/);
    if (match && match[1]) {
      const logId = match[1];
      setLoading(true);
      getRecipeById(logId)
        .then((response) => {
          if (response?.data?.recipe) {
            const recipeResponse = response.data.recipe;
            const recipe: Recipe = Array.isArray(recipeResponse)
              ? recipeResponse[0]
              : recipeResponse;
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
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [pathname, setRecipe]);

  useEffect(() => {
    if (type === "ingredients") {
      setPlaceholder("Press enter to add ingredient (Ctrl + Enter to search)");
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

  const handleOnCtrlEnter = async () => await search();

  const search = async () => {
    const isIngredientsMode = type === "ingredients";
    const query = isIngredientsMode ? ingredients : inputValue.trim();

    if (!query || (isIngredientsMode && ingredients.length === 0)) {
      toast.warning("Please provide ingredients or a dish name.");
      return;
    }

    setLoading(true);
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
      setRecipe(Array.isArray(data.recipe) ? data.recipe[0] : data.recipe);
      router.push(`/recipes/${log_id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await toBase64(file);

    setLoading(true);
    try {
      const response = await searchByImage(base64, {
        dietaryRestrictions,
        responseLanguage,
        filename: file.name,
      });

      const { data, log_id } = response;
      setRecipe(Array.isArray(data.recipe) ? data.recipe[0] : data.recipe);
      router.push(`/recipes/${log_id}`);
    } catch (err) {
      console.error("Image recipe generation failed:", err);
      toast.error("Failed to generate recipe from image.");
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  return (
    <div className="flex flex-wrap items-center w-full gap-2">
      <div className="relative flex-1">
        {type === "ingredients" ? (
          <TagInput
            className="min-h-[50px] pl-12 pr-22 border-2"
            value={ingredients}
            onChange={setIngredients}
            onCtrlEnter={handleOnCtrlEnter}
            placeholder={placeholder}
            {...props}
            disabled={loading}
          />
        ) : (
          <Input
            className="h-[50px] pl-12 pr-22 border-2"
            placeholder={placeholder}
            {...props}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        )}
        <Button variant="ghost" size="icon" className="absolute left-2 top-2">
          <Search className="size-5 text-primary" />
        </Button>
        <Customization />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
        >
          <Camera className="size-5 text-primary" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </div>
      <Button
        className="h-[50px] px-6 w-full md:w-auto"
        onClick={search}
        disabled={loading}
      >
        {loading && <Loader className="mr-2 size-5 animate-spin" />}
        Search
      </Button>
    </div>
  );
}
