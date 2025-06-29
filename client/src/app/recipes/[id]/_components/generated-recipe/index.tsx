"use client";

import { Lightbulb, List, ShoppingBasket } from "lucide-react";
import SectionBox, { SectionHeading } from "./section-box";
import Ingredients from "./ingredients";
import Steps from "./steps";
import SuggestedPairings from "./suggested-pairings";
import { useViewport } from "@/hooks/use-viewport";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { useSuggestedFood } from "@/app/recipes/suggested-food-provider";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { useRecipe } from "@/app/recipes/recipe-provider";
import { cn } from "@/lib/utils";

const ACCORDION_ITEMS = [
  { 
    label: 'Ingredients',
    value: "ingredients",
    icon: <ShoppingBasket className="w-4 h-4" />,
    children: <Ingredients />
  },
  {
    label: 'Steps',
    value: "steps",
    icon: <List className="w-4 h-4" />,
    children: <Steps />
  },
  {
    label: 'Suggested Pairings', 
    value: "pairings", 
    icon: <Lightbulb className="w-4 h-4" />,
    children: <SuggestedPairings />
  },
];

export default function GeneratedRecipe() {
  const { isDesktop } = useViewport();
  const { suggestedFood } = useSuggestedFood();
  const [type] = useQueryState("type");
  const { recipe, setRecipe } = useRecipe();

  return (
    <>
      {type === "ingredients" && suggestedFood && suggestedFood?.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2">
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
              className="border-2 last:border-2 px-4"
            >
              <AccordionTrigger>
                <SectionHeading title={item.label} icon={item.icon} />
              </AccordionTrigger>
              <AccordionContent>{item.children}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="grid grid-cols-12 grid-rows-8 gap-4">
          <div className="col-span-4 row-span-8">
            <SectionBox title="Ingredients" icon={<ShoppingBasket />}>
              <Ingredients />
            </SectionBox>
          </div>
          <div className="col-span-8 row-span-6 col-start-5">
            <SectionBox title="Steps" icon={<List />}>
              <Steps />
            </SectionBox>
          </div>
          <div className="col-span-8 row-span-2 col-start-5 row-start-7">
            <SectionBox title="Suggested Pairings" icon={<Lightbulb />}>
              <SuggestedPairings />
            </SectionBox>
          </div>
        </div>
      )}
    </>
  );
}
