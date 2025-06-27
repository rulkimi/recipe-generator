"use client"

import { useRecipe } from "@/app/recipes/recipe-provider";

export default function Ingredients() {
  const { recipe } = useRecipe();

  return (
    <ul> 
      {recipe?.ingredients.map(ingredient => (
        <li key={ingredient.name}>
          <strong>{ingredient.name},</strong>&nbsp;
          <span className="italic">{ingredient.amount}</span>
        </li>
      ))}
    </ul>
  );
}