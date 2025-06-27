"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Search } from "lucide-react";
import Customization from "./customization";
import { searchRecipe, getRecipeById } from "@/actions/search";
import { KeyboardEvent, useState, useEffect } from "react";
import { Recipe, SearchResponse } from "@/types";
import { useRecipe } from "@/app/recipes/recipe-provider";
import { useRouter, usePathname } from "next/navigation";
import { useDietaryRestrictions } from "@/app/recipes/dietary-restrictions-provider";
import { useResponseLanguage } from "@/app/recipes/response-language-provider";

export default function SearchBar({ ...props }) {
	const router = useRouter();
	const pathname = usePathname();
  const { dietaryRestrictions } = useDietaryRestrictions();
  const { responseLanguage } = useResponseLanguage();
	const { setRecipe } = useRecipe();
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
    if (pathname === '/recipes/search') return;
		const match = pathname.match(/^\/recipes\/([^\/]+)$/);
		if (match && match[1]) {
			const logId = match[1];
			getRecipeById(logId)
				.then((response) => {
					if (response && response.data && response.data.recipe) {
            const recipe: Recipe = response.data.recipe.recipe;
            setInputValue(recipe.name);
						setRecipe(recipe);
					}
				})
				.catch((error) => {
					console.error("Failed to fetch recipe by id:", error);
				});
		}
	}, [pathname, setRecipe]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			try {
				const response: SearchResponse = await searchRecipe(inputValue, {
          dietaryRestrictions,
          responseLanguage
        });
				const { data, log_id, status } = response;
				setRecipe(data.recipe);
				router.push(`/recipes/${log_id}`);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div className="relative w-full">
			<Input
				className="h-[50px] pl-12 pr-22 border-2"
				placeholder="Type something tasty..."
				{...props}
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
			/>
			<Button variant="ghost" size="icon" className="absolute left-2 top-2">
				<Search className="size-5 text-primary" />
			</Button>
			<Customization />
			<Button variant="ghost" size="icon" className="absolute right-2 top-2">
				<Camera className="size-5 text-primary" />
			</Button>
		</div>
	);
}