"use client"

import React, { createContext, useContext, useState } from "react";
import { Recipe } from "@/types";

interface SuggestedFoodContextType {
	suggestedFood: Recipe[] | null;
	setSuggestedFood: React.Dispatch<React.SetStateAction<Recipe[] | null>>;
}

const SuggestedFoodContext = createContext<SuggestedFoodContextType | undefined>(undefined);

export const SuggestedFoodProvider = ({ children }: { children: React.ReactNode }) => {
	const [suggestedFood, setSuggestedFood] = useState<Recipe[] | null>(null);

	return (
		<SuggestedFoodContext.Provider value={{ suggestedFood, setSuggestedFood }}>
			{children}
		</SuggestedFoodContext.Provider>
	);
};

export const useSuggestedFood = () => {
	const context = useContext(SuggestedFoodContext);
	if (context === undefined) {
		throw new Error("useSuggestedFood must be used within a SuggestedFoodProvider");
	}
	return context;
};
