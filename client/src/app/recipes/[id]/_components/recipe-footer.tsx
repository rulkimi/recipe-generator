import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function RecipeFooter() {
  return (
    <footer className="flex justify-between">
      <div className="flex items-center gap-4 text-border">
        <span>Was this helpful?</span>
        <div className="flex items-center gap-4">
          <ThumbsUp className="size-5" />
          <ThumbsDown className="size-5" />
        </div>
      </div>
      <Button
        variant="link"
        className="p-0"
      >
        Save Recipe
      </Button>
    </footer>
  );
}