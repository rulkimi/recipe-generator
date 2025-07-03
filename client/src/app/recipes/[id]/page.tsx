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
    ? recipe.map(r => r.name).join(", ")
    : recipe.name;

  const description = Array.isArray(recipe)
    ? recipe.map(r => r.description).join(" Also, ")
    : recipe.description;

  return {
    title: recipeName,
    description: description,
    openGraph: {
      title: recipeName,
      description: description,
    },
  };
}


export default async function RecipePage({ params }: { params: Promise<{id: string }>}) {
  const { id } = await params;
  const response = await getRecipeById(id);
  const { data } = response;
  const recipe: Recipe = Array.isArray(data.recipe) ? data.recipe[0] : data.recipe;
  const type = Array.isArray(data.recipe) ? "ingredients" : "name";
  const suggestedFood = Array.isArray(data.recipe) ? data.recipe : [];
  let parsedUserInput;
  try {
    parsedUserInput = data.user_input ? JSON.parse(data.user_input) : undefined;
  } catch (e) {
    parsedUserInput = data.user_input;
  }
  const ingredients = Array.isArray(parsedUserInput) ? parsedUserInput : undefined;
  
  return (
    <div className="py-6 space-y-8 lg:space-y-4">
      <SearchBar recipeName={recipe.name} recipeIngredients={ingredients} />
      <div className="space-y-4">
        <GeneratedRecipe
          data={recipe}
          type={type}
          suggestedFood={suggestedFood}
        />
        <RecipeFooter recipeName={recipe.name} />
      </div>
    </div>
  );
}