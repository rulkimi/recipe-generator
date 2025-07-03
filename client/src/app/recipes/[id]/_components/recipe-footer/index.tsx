import { Recipe } from "@/types";
import Feedbacks from "./feedbacks";
import SaveRecipe from "./save-recipe";

export default function RecipeFooter({ recipeName }: { recipeName: Recipe["name"] }) {
  return (
    <footer className="flex items-center justify-between">
      <Feedbacks />
      <SaveRecipe recipeName={recipeName} />
    </footer>
  );
}
