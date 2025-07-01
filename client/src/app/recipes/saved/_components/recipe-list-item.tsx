import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";

export default function RecipeListItem({
  recipe,
  handleRemove
}: {
  recipe: {
    id: string;
    name: string;
  };
  handleRemove: (recipeId: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li
      key={recipe.id}
      className="flex items-center justify-between gap-2 p-3 border rounded-md"
    >
      <Link
        href={`/recipes/${recipe.id}`}
        className="text-primary hover:underline"
      >
        {recipe.name}
      </Link>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="self-start sm:self-auto"
          >
            Remove
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to remove this recipe?</DialogTitle>
          </DialogHeader>
          This action can't be undone.
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleRemove(recipe.id);
                setOpen(false);
              }}
            >
              Yes, Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}
