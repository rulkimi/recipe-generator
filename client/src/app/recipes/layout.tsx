import { ReactNode } from "react";
import { RecipeProvider } from "./recipe-provider";
import { DietaryRestrictionsProvider } from "./dietary-restrictions-provider";
import { ResponseLanguageProvider } from "./response-language-provider";
import { SuggestedFoodProvider } from "./suggested-food-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - Recipe Generator",
  description: "An AI-powered tool to generate personalized recipes based on your preferences and ingredients.",
};

export default function RecipeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-6xl px-4 mx-auto md:px-12">
      <RecipeProvider>
        <DietaryRestrictionsProvider>
          <ResponseLanguageProvider>
            <SuggestedFoodProvider>
              {children}
            </SuggestedFoodProvider>
          </ResponseLanguageProvider>
        </DietaryRestrictionsProvider>
      </RecipeProvider>
    </main>
  );
}