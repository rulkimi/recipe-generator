"use client";

import { Lightbulb, List, ShoppingBasket } from "lucide-react";
import SectionBox, { SectionHeading } from "./_components/generated-recipe/section-box";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { useViewport } from "@/hooks/use-viewport";

export default function LoadingRecipe() {
  const { isDesktop } = useViewport();

  const ingredientsSkeleton = (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-4" />
      ))}
    </div>
  );

  const stepsSkeleton = (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-3" />
        </div>
      ))}
    </div>
  );

  const pairingsSkeleton = (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="w-24 h-6 rounded-full" />
      ))}
    </div>
  );

  const ACCORDION_ITEMS = [
    {
      label: "Ingredients",
      value: "ingredients",
      icon: <ShoppingBasket className="w-4 h-4" />,
      children: ingredientsSkeleton,
    },
    {
      label: "Steps",
      value: "steps",
      icon: <List className="w-4 h-4" />,
      children: stepsSkeleton,
    },
    {
      label: "Suggested Pairings",
      value: "pairings",
      icon: <Lightbulb className="w-4 h-4" />,
      children: pairingsSkeleton,
    },
  ];

  return (
    <>
      {!isDesktop ? (
        <Accordion type="single" className="w-full space-y-4" defaultValue={ACCORDION_ITEMS[0].value}>
          {ACCORDION_ITEMS.map((item) => (
            <AccordionItem key={item.value} value={item.value} className="px-4 border-2">
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
              {ingredientsSkeleton}
            </SectionBox>
          </div>
          <div className="col-span-8 col-start-5 row-span-6">
            <SectionBox title="Steps" icon={<List />}>
              {stepsSkeleton}
            </SectionBox>
          </div>
          <div className="col-span-8 col-start-5 row-span-2 row-start-7">
            <SectionBox title="Suggested Pairings" icon={<Lightbulb />}>
              {pairingsSkeleton}
            </SectionBox>
          </div>
        </div>
      )}
    </>
  );
}
