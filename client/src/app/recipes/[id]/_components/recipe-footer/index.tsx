import Feedbacks from "./feedbacks";
import SaveRecipe from "./save-recipe";

export default function RecipeFooter() {
  return (
    <footer className="flex items-center justify-between">
      <Feedbacks />
      <SaveRecipe />
    </footer>
  );
}
