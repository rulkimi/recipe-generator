"use client"

import React, { createContext, useContext, useState } from "react";
import { Recipe } from "@/types";

interface RecipeContextType {
	recipe: Recipe | null;
	setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
	const [recipe, setRecipe] = useState<Recipe | null>(null);

	return (
		<RecipeContext.Provider value={{ recipe, setRecipe }}>
			{children}
		</RecipeContext.Provider>
	);
};

export const useRecipe = () => {
	const context = useContext(RecipeContext);
	if (context === undefined) {
		throw new Error("useRecipe must be used within a RecipeProvider");
	}
	return context;
};
