"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, Loader } from "lucide-react";
import { searchRecipe } from "@/actions/search";
import { toast } from "sonner";
import { useDietaryRestrictions } from "@/app/recipes/dietary-restrictions-provider";
import { useResponseLanguage } from "@/app/recipes/response-language-provider";
import { Recipe } from "@/types";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { dietaryRestrictions } = useDietaryRestrictions();
  const { responseLanguage } = useResponseLanguage();

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await searchRecipe(label, {
        dietaryRestrictions,
        responseLanguage,
      });
      const { log_id } = response;
      router.push(`/recipes/${log_id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to find recipe.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="w-full border-2 group md:w-fit"
            onClick={handleClick}
            disabled={loading}
          >
            {label}
            {loading ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 size-5 text-border transition-transform duration-300 group-hover:translate-x-2" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div>{description}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
