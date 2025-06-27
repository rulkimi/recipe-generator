"use client"

import { useRecipe } from "@/app/recipes/recipe-provider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Steps() {
  const { recipe } = useRecipe();

  return (
    <ScrollArea className="max-h-[550px] overflow-auto">
      <ol className="space-y-2">
        {recipe?.steps.map((step, index) => (
          <li
            className="list-decimal ml-6"
            key={index}
          >
            <span>{step.description}</span>
            <br />
            {step.tips && (
              <span className="italic text-sm font-light">
                Tips: {step.tips}
              </span>
            )}
          </li>
        ))}
      </ol>
      <ScrollBar />
    </ScrollArea>
  );
}