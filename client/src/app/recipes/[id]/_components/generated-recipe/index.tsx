import { Lightbulb, List, ShoppingBasket } from "lucide-react";
import SectionBox from "./section-box";
import Ingredients from "./ingredients";
import Steps from "./steps";
import SuggestedPairings from "./suggested-pairings";

export default function GeneratedRecipe() {
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