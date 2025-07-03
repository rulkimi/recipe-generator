import { ReactNode } from "react";
import { DietaryRestrictionsProvider } from "./dietary-restrictions-provider";
import { ResponseLanguageProvider } from "./response-language-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - Recipe Generator",
  description: "An AI-powered tool to generate personalized recipes based on your preferences and ingredients.",
};

export default function RecipeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-6xl px-4 mx-auto md:px-12">
      <DietaryRestrictionsProvider>
        <ResponseLanguageProvider>
          {children}
        </ResponseLanguageProvider>
      </DietaryRestrictionsProvider>
    </main>
  );
}