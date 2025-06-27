"use client"

import { useRecipe } from "@/app/recipes/recipe-provider";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Ingredients() {
  const { recipe } = useRecipe();

  return (
    <ScrollArea className="max-h-[800px] overflow-auto">
      <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2"> 
        {recipe?.ingredients.map(ingredient => (
          <li key={ingredient.name}>
            <strong>{ingredient.name},</strong>&nbsp;
            <span className="italic">{ingredient.amount}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}