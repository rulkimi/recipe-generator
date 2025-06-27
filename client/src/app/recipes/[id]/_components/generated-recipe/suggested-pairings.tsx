"use client"

import { useRecipe } from "@/app/recipes/recipe-provider";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ArrowRight } from "lucide-react";

export default function SuggestedPairings() {
  const { recipe } = useRecipe();

  return (
    <ul className="flex flex-col md:flex-row gap-2">
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
          <Button variant="outline" className="border-2 group w-full md:w-fit">
            {label}
            <ArrowRight
              className="ml-2 size-5 text-border group-hover:translate-x-2 transition-transform duration-300"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="">{description}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}