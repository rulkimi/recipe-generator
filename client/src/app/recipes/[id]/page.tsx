import SearchBar from "@/components/search-bar";
import GeneratedRecipe from "./_components/generated-recipe";
import RecipeFooter from "./_components/recipe-footer";
import { Metadata } from "next";
import { getRecipeById } from "@/actions/search";
import { Recipe } from "@/types";

export async function generateMetadata({
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const response = await getRecipeById(id);
  const { data } = response;
  const recipe: Recipe = data.recipe;

  const recipeName = Array.isArray(recipe)
    ? recipe.map(r => r.name).join(" and ")
    : recipe.name;

  const ingredients = Array.isArray(recipe)
    ? recipe.flatMap(r => r.ingredients || []).join(", ")
    : recipe.ingredients?.join(", ");

  const suggestedPairings = Array.isArray(recipe)
    ? recipe.flatMap(r => r.suggested_pairings || []).map(p => p.dish_name).join(" and ")
    : recipe.suggested_pairings?.map(p => p.dish_name).join(" and ");

  const description = `Ingredients: ${ingredients}. Pairings: ${suggestedPairings}`;

  return {
    title: recipeName,
    description: description,
    openGraph: {
      title: recipeName,
      description: description,
    },
  };
}


export default function RecipePage() {
  return (
    <div className="py-6 space-y-8 lg:space-y-4">
      <SearchBar />
      <div className="space-y-4">
        <GeneratedRecipe />
        <RecipeFooter />
      </div>
    </div>
  );
}