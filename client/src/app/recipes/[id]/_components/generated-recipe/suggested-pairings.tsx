"use client"

import { useRecipe } from "@/app/recipes/recipe-provider";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ArrowRight } from "lucide-react";

export default function SuggestedPairings() {
  const { recipe } = useRecipe();

  return (
    <ul className="flex gap-2">
      {recipe?.suggested_pairings.map((pairing, index) => (
        <li key={index}>
          <SuggestedPairingButton
            label={pairing.dish_name}
            description={pairing.description}
          />
        </li>
      ))}
    </ul>
  );
}

const SuggestedPairingButton = ({
  label,
  description
}: {
  label: string;
  description: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="border-2">
            {label}
            <ArrowRight className="ml-2 size-5 text-border" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[250px]">
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}