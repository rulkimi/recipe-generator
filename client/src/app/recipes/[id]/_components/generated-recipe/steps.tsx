"use client"

import { useRecipe } from "@/app/recipes/recipe-provider";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Steps() {
  const { recipe } = useRecipe();

  return (
    <ScrollArea className="max-h-[600px] overflow-auto">
      <ol className="space-y-2">
        {recipe?.steps.map((step, index) => (
          <li
            className="list-decimal ml-5"
            key={index}
          >
            <span>{step.description}</span>
            <br />
            <span className="italic text-sm">
              Tips: {step.tips}
            </span>
          </li>
        ))}
      </ol>
    </ScrollArea>
  );
}