import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Columns3Cog } from "lucide-react";
import DietaryRestrictions from "./dietary-restrictions";
import ResponseLanguage from "./response-language";
import { ReactNode } from "react";
import SearchType from "./search-type";

export default function Customization() {
  return (
    <Popover>
      <PopoverTrigger className="absolute right-12 top-2" asChild>
        <Button variant="ghost" size="icon">
          <Columns3Cog className="size-5 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-4 space-y-4">
        <CustomizationSection title="Search by">
          <SearchType />
        </CustomizationSection>
        <CustomizationSection title="Dietary Restrictions">
          <DietaryRestrictions />
        </CustomizationSection>
        <CustomizationSection title="Response Language">
          <ResponseLanguage />
        </CustomizationSection>
      </PopoverContent>
    </Popover>
  );
}

const CustomizationSection = ({
  title, 
  children 
}: { 
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="space-y-1.5">
      <div className="text-sm text-muted-foreground">{title}</div>
      {children}
    </div>
  );
}