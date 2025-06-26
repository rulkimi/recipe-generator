import SearchBar from "@/components/search-bar";
import Ingredients from "./_components/ingredients";
import SectionBox from "./_components/section-box";
import Steps from "./_components/steps";

export default function Recipe() {
  return (
    <div className="h-screen">
      <div className="py-6 space-y-4">
        <SearchBar />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 row-span-46">
            <SectionBox title="Ingredients">
              <Ingredients />
            </SectionBox>
          </div>
          <div className="col-span-3 space-y-4 row-span-23">
            <div className="h-4/3">
              <SectionBox title="Steps">
                <Steps />
              </SectionBox>
            </div>
            <div className="h-2/3">
              <SectionBox title="Suggested Pairings">
                <Steps />
              </SectionBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}