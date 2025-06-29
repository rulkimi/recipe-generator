import { ReactNode } from "react";
import { RecipeProvider } from "./recipe-provider";
import { DietaryRestrictionsProvider } from "./dietary-restrictions-provider";
import { ResponseLanguageProvider } from "./response-language-provider";
import { SuggestedFoodProvider } from "./suggested-food-provider";

export default function RecipeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-6xl min-h-screen px-4 md:px-12 mx-auto">
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