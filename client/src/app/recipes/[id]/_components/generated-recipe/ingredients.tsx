"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { Recipe } from "@/types";

export default function Ingredients({ ingredients }: { ingredients: Recipe['ingredients'] }) {
  return (
    <ScrollArea className="max-h-[800px] overflow-auto">
      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1"> 
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.name + "-" + index}>
            <strong>{ingredient.name},</strong>&nbsp;
            <span className="italic">{ingredient.amount}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}