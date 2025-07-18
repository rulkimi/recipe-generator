"use client";

import { Lightbulb, List, ShoppingBasket } from "lucide-react";
import SectionBox, { SectionHeading } from "./section-box";
import Ingredients from "./ingredients";
import Steps from "./steps";
import SuggestedPairings from "./suggested-pairings";
import { useViewport } from "@/hooks/use-viewport";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { useQueryState } from "nuqs";

export default function GeneratedRecipe({
  data,
  type,
  suggestedFood
}: { 
  data: Recipe;
  type: "ingredients" | "name";
  suggestedFood: Recipe[];
}) {
  const { isDesktop } = useViewport();
  const [recipe, setRecipe] = useState<Recipe>(data);
  const [_, setType] = useQueryState("type");

  const ACCORDION_ITEMS = [
    { 
      label: 'Ingredients',
      value: "ingredients",
      icon: <ShoppingBasket className="w-4 h-4" />,
      children: <Ingredients ingredients={recipe.ingredients} />
    },
    {
      label: 'Steps',
      value: "steps",
      icon: <List className="w-4 h-4" />,
      children: <Steps steps={recipe.steps} />
    },
    {
      label: 'Suggested Pairings', 
      value: "pairings", 
      icon: <Lightbulb className="w-4 h-4" />,
      children: <SuggestedPairings pairings={recipe.suggested_pairings} />
    },
  ];

  useEffect(() => {
    if (!recipe) return;
    if (suggestedFood.length) setType("ingredients");

    const descriptionContent = `Ingredients: ${recipe.ingredients?.map(i => i.name).join(", ") || "N/A"}. Steps: ${recipe.steps?.length || 0}. Pairings: ${recipe.suggested_pairings?.map(pairing => (pairing.dish_name)).join(", ") || "None"}.`;

    const updateMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
      let tag = document.head.querySelector(
        `${isProperty ? "meta[property='" + nameOrProperty + "']" : "meta[name='" + nameOrProperty + "']"}`
      ) as HTMLMetaElement | null;

      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) {
          tag.setAttribute("property", nameOrProperty);
        } else {
          tag.setAttribute("name", nameOrProperty);
        }
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", content);
    };

    updateMetaTag("description", descriptionContent);
    updateMetaTag("og:title", recipe.name, true);
    updateMetaTag("og:description", descriptionContent, true);

  }, [recipe]);

  return (
    <>
      {type === "ingredients" && suggestedFood && suggestedFood?.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-4">
          {suggestedFood.map((food, index) => {
            const isActive = recipe?.name === food.name;
            return (
              <li key={index}>
                <Button
                  variant={isActive ? "default" : "outline"}
                  className={cn("border-2", isActive && "border-primary bg-primary text-white")}
                  onClick={() => setRecipe(food)}
                >
                  {food.name}
                </Button>
              </li>
            );
          })}
        </ul>
      )}

      {!isDesktop ? (
        <Accordion
          type="single"
          className="w-full space-y-4"
          defaultValue={ACCORDION_ITEMS[0].value}
        >
          {ACCORDION_ITEMS.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="px-4 border-2 last:border-2"
            >
              <AccordionTrigger>
                <SectionHeading title={item.label} icon={item.icon} />
              </AccordionTrigger>
              <AccordionContent>{item.children}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="grid grid-cols-12 gap-4 grid-rows-8">
          <div className="col-span-4 row-span-8">
            <SectionBox title="Ingredients" icon={<ShoppingBasket />}>
              <Ingredients ingredients={recipe.ingredients} />
            </SectionBox>
          </div>
          <div className="col-span-8 col-start-5 row-span-6">
            <SectionBox title="Steps" icon={<List />}>
              <Steps steps={recipe.steps} />
            </SectionBox>
          </div>
          <div className="col-span-8 col-start-5 row-span-2 row-start-7">
            <SectionBox title="Suggested Pairings" icon={<Lightbulb />}>
              <SuggestedPairings pairings={recipe.suggested_pairings} />
            </SectionBox>
          </div>
        </div>
      )}
    </>
  );
}
