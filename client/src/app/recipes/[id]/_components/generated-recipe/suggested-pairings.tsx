"use client"

import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Recipe } from "@/types";
import { ArrowRight } from "lucide-react";

export default function SuggestedPairings({ pairings }: { pairings: Recipe["suggested_pairings"] }) {
  return (
    <ul className="flex flex-col gap-2 md:flex-row">
      {pairings?.map((pairing, index) => (
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
          <Button variant="outline" className="w-full border-2 group md:w-fit">
            {label}
            <ArrowRight
              className="ml-2 transition-transform duration-300 size-5 text-border group-hover:translate-x-2"
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