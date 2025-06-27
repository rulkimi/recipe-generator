import SearchBar from "@/components/search-bar";
import GeneratedRecipe from "./_components/generated-recipe";
import RecipeFooter from "./_components/recipe-footer";

export default function Recipe() {
  return (
    <div className="h-screen">
      <div className="py-6 space-y-8 lg:space-y-4">
        <SearchBar />
        <div className="space-y-4">
          <GeneratedRecipe />
          <RecipeFooter />
        </div>
      </div>
    </div>
  );
}