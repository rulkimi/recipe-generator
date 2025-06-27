"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ResponseLanguageContextType {
	responseLanguage: string;
	setResponseLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const ResponseLanguageContext = createContext<ResponseLanguageContextType | undefined>(undefined);

export const ResponseLanguageProvider = ({ children }: { children: React.ReactNode }) => {
	const [responseLanguage, setResponseLanguage] = useState<string>("malay");

	useEffect(() => {
		const storedLanguage = localStorage.getItem("responseLanguage");
		if (storedLanguage) {
			setResponseLanguage(storedLanguage);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("responseLanguage", responseLanguage);
	}, [responseLanguage]);

	return (
		<ResponseLanguageContext.Provider value={{ responseLanguage, setResponseLanguage }}>
			{children}
		</ResponseLanguageContext.Provider>
	);
};

export const useResponseLanguage = () => {
	const context = useContext(ResponseLanguageContext);
	if (context === undefined) {
		throw new Error("useResponseLanguage must be used within a ResponseLanguageProvider");
	}
	return context;
};
