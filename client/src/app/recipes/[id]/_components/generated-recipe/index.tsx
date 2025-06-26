import { Lightbulb, List, ShoppingBasket } from "lucide-react";
import SectionBox from "./section-box";
import Ingredients from "./ingredients";
import Steps from "./steps";

export default function GeneratedRecipe() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1 row-span-46">
        <SectionBox
          title="Ingredients"
          icon={<ShoppingBasket />}
        >
          <Ingredients />
        </SectionBox>
      </div>
      <div className="col-span-3 space-y-4 row-span-23">
        <div className="h-4/3">
          <SectionBox
            title="Steps"
            icon={<List />}
          >
            <Steps />
          </SectionBox>
        </div>
        <div className="h-2/3">
          <SectionBox
            title="Suggested Pairings"
            icon={<Lightbulb />}
          >
            <Steps />
          </SectionBox>
        </div>
      </div>
    </div>
  );
}