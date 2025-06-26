import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Search } from "lucide-react";
import Customization from "./customization";

export default function HeroSearchBar() {
  return (
    <div className="relative w-full">
      <Input
        className="h-[50px] pl-12 pr-22"
        placeholder="Type something tasty..."
      />
      <Button variant="ghost" size="icon" className="absolute left-2 top-2">
        <Search className="size-5 text-primary" />
      </Button>
      <Customization />
      <Button variant="ghost" size="icon" className="absolute right-2 top-2">
        <Camera className="size-5 text-primary" />
      </Button>
    </div>
  );
}