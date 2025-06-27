"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface DietaryRestrictionsContextType {
	dietaryRestrictions: string[];
	setDietaryRestrictions: React.Dispatch<React.SetStateAction<string[]>>;
}

const DietaryRestrictionsContext = createContext<DietaryRestrictionsContextType | undefined>(undefined);

const STORAGE_KEY = "dietaryRestrictions";
const DEFAULT_RESTRICTIONS = ["halal"];

export const DietaryRestrictionsProvider = ({ children }: { children: React.ReactNode }) => {
	const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				setDietaryRestrictions(JSON.parse(stored));
			} catch (e) {
				console.error("Invalid dietaryRestrictions in localStorage", e);
				setDietaryRestrictions(DEFAULT_RESTRICTIONS);
			}
		} else {
			setDietaryRestrictions(DEFAULT_RESTRICTIONS);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(dietaryRestrictions));
	}, [dietaryRestrictions]);

	return (
		<DietaryRestrictionsContext.Provider value={{ dietaryRestrictions, setDietaryRestrictions }}>
			{children}
		</DietaryRestrictionsContext.Provider>
	);
};

export const useDietaryRestrictions = () => {
	const context = useContext(DietaryRestrictionsContext);
	if (context === undefined) {
		throw new Error("useDietaryRestrictions must be used within a DietaryRestrictionsProvider");
	}
	return context;
};
