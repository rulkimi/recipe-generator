"use client"

import { Lightbulb, List, ShoppingBasket } from "lucide-react";
import SectionBox, { SectionHeading } from "./section-box";
import Ingredients from "./ingredients";
import Steps from "./steps";
import SuggestedPairings from "./suggested-pairings";
import { useViewport } from "@/hooks/use-viewport";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";

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
]

export default function GeneratedRecipe() {
  const { isDesktop } = useViewport();

  if (!isDesktop) {
    return (
      <Accordion
        type="single"
        className="w-full space-y-4"
        defaultValue={ACCORDION_ITEMS[0].value}
      >
        {ACCORDION_ITEMS.map(item => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className="border-2 last:border-2 px-4"
          >
            <AccordionTrigger>
              <SectionHeading title={item.label} icon={item.icon} />
            </AccordionTrigger>
            <AccordionContent>
              {item.children}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
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
  );
}