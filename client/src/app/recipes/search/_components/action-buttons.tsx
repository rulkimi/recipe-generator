import { Button } from "@/components/ui/button";

export default function ActionButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        Search By Ingredients
      </Button>
      <Button variant="outline" size="sm">
        Surprise Me!
      </Button>
    </div>
  );
}