import { Suspense } from "react";
import { Metadata } from "next";
import SearchBar from "../../../components/search-bar";
import ActionButtons from "./_components/action-buttons";
import { SearchBarSkeleton } from "../[id]/loading";
import { MotionContainer, FadeUp } from "@/components/motions/search-page-motions";

export const metadata: Metadata = {
  title: "Generate AI Recipe | Recipe Generator",
  description: "Generate AI recipes instantly. Input the ingredients you have, and our AI will act as your reverse recipe search engine to create the perfect customized recipe.",
  keywords: ["generate AI recipe", "search recipes by ingredients", "what to do with ingredients", "reverse recipe search", "fridge clearer", "input ingredients get recipe"],
  alternates: {
    canonical: "https://recipe-generator.rulkimi.com/recipes/generate",
  },
};

export default function SearchPage() {
  return (
    <MotionContainer className="flex flex-col items-center justify-center max-w-5xl min-h-[calc(100vh-56px)] mx-auto space-y-6">
      <FadeUp delay={0.1}>
        <h1 className="px-4 mb-12 text-4xl font-semibold leading-tight text-center text-transparent sm:text-6xl md:text-7xl sm:leading-snug bg-clip-text bg-gradient-to-r from-primary to-accent/80">
          Find a recipe, skip the stress
        </h1>
      </FadeUp>

      <Suspense fallback={<SearchBarSkeleton />}>
        <FadeUp delay={0.22} className="flex flex-col items-center w-full gap-4">
          <SearchBar />
          <ActionButtons />
        </FadeUp>
      </Suspense>
    </MotionContainer>
  );
}
