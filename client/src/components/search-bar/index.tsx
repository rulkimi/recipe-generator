"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Loader, Search } from "lucide-react";
import Customization from "./customization";
import {
  searchRecipe,
  searchRecipeByIngredients,
  searchByImage,
} from "@/actions/search";
import { KeyboardEvent, useState, useEffect, useRef } from "react";
import { SearchResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useDietaryRestrictions } from "@/app/recipes/dietary-restrictions-provider";
import { useResponseLanguage } from "@/app/recipes/response-language-provider";
import { toast } from "sonner";
import { useQueryState } from "nuqs";
import { TagInput } from "../ui/tag-input";

interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  recipeName?: string;
  recipeIngredients?: string[];
}

export default function SearchBar({ recipeName = "", recipeIngredients = [], ...props }: SearchBarProps) {
  const router = useRouter();

  const { dietaryRestrictions } = useDietaryRestrictions();
  const { responseLanguage } = useResponseLanguage();

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(recipeName);
  const [ingredients, setIngredients] = useState<string[]>(recipeIngredients);
  const [type] = useQueryState("type");
  const [placeholder, setPlaceholder] = useState("Type something tasty...");

  const isIngredientsMode = type === "ingredients";

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isIngredientsMode) {
      setPlaceholder("Press enter to add ingredient (Ctrl + Enter to search)");
      setInputValue("");
      setIngredients(recipeIngredients);
    } else {
      setInputValue(recipeName);
      setIngredients([]);
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

      const { status, log_id } = response;
      if (status === "error") {
        toast.error("Invalid input. Please enter a valid food-related query or ingredients.");
        return;
      } 
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

      const { log_id } = response;
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
        {isIngredientsMode ? (
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
