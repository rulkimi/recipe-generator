"use client"

import { useRecipe } from "@/app/recipes/recipe-provider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Steps() {
  const { recipe } = useRecipe();

  return (
    <ScrollArea className="max-h-[550px] overflow-auto">
      <ol className="space-y-2">
        {recipe?.steps?.map((step, index) => (
          <li
            className="ml-6 list-decimal"
            key={index}
          >
            <span>{step.description}</span>
            <br />
            {step.tips && (
              <span className="text-sm italic font-light">
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