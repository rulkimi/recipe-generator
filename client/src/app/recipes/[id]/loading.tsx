"use client";

import { Lightbulb, List, ShoppingBasket } from "lucide-react";
import SectionBox, { SectionHeading } from "./_components/generated-recipe/section-box";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { useViewport } from "@/hooks/use-viewport";

export default function LoadingRecipe() {
  const { isDesktop } = useViewport();

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

  const GeneratedRecipeSkeleton = () => (
    <>
      {!isDesktop ? (
        <Accordion type="single" className="w-full space-y-4" defaultValue={ACCORDION_ITEMS[0].value}>
          {ACCORDION_ITEMS.map((item) => (
            <AccordionItem key={item.value} value={item.value} className="px-4 border-2 last:border-2">
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
  )

  return (
    <div className="py-6 space-y-8 lg:space-y-4">
      <SearchBarSkeleton />
      <div className="space-y-4">
        <GeneratedRecipeSkeleton />
        {isDesktop && <LoadingRecipeFooter />}
      </div>
    </div>
  );
}

const ingredientsSkeleton = (
  <div className="grid grid-cols-2 gap-2">
    {Array.from({ length: 25 }).map((_, i) => {
      const width = `${Math.floor(Math.random() * 40) + 60}%`; // 60% - 100%
      return <Skeleton key={i} className="h-4" style={{ width }} />;
    })}
  </div>
);

const stepsSkeleton = (
  <div className="space-y-4">
    {Array.from({ length: 8 }).map((_, i) => {
      const titleWidth = `${Math.floor(Math.random() * 30) + 50}%`; // 50% - 80%
      const descWidth = `${Math.floor(Math.random() * 20) + 80}%`; // 80% - 100%
      return (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4" style={{ width: titleWidth }} />
          <Skeleton className="h-3" style={{ width: descWidth }} />
        </div>
      );
    })}
  </div>
);

const pairingsSkeleton = (
  <div className="flex flex-wrap gap-2">
    {Array.from({ length: 3 }).map((_, i) => {
      const width = `${Math.floor(Math.random() * 80) + 120}px`; 
      return <Skeleton key={i} className="h-6" style={{ width }} />;
    })}
  </div>
);

const SearchBarSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center w-full gap-2">
      <div className="relative flex-1">
        <Skeleton className="min-h-[50px] h-[50px] w-full rounded-md border-2" />

        <div className="absolute left-2 top-3">
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>

        <div className="absolute right-2 top-3">
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>

        <div className="absolute right-10 top-3">
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>
      </div>

      <Skeleton className="h-[50px] w-full md:w-[120px] rounded-md" />
    </div>
  );
}

const LoadingRecipeFooter = () => {
  return (
    <footer className="flex items-center justify-between w-full mt-6">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Skeleton className="w-36 h-5" /> 
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="w-6 h-5" /> 
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="w-6 h-5" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-[100px] rounded-md" /> 
      </div>
    </footer>
  );
}