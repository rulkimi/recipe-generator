"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Recipe } from "@/types";

export default function Steps({ steps }: { steps: Recipe["steps"] }) {
  return (
    <ScrollArea className="max-h-[550px] overflow-auto">
      <ol className="space-y-2">
        {steps?.map((step, index) => (
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