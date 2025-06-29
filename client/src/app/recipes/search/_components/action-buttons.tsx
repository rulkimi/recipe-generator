"use client"

import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

export default function ActionButtons() {
  const [type, setType] = useQueryState('type');

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setType(type === "ingredients" ? "name" : "ingredients")}
      >
        {type === "ingredients" ? "Search By Name" : "Search By Ingredients"}
      </Button>
      <Button variant="outline" size="sm">
        Surprise Me!
      </Button>
    </div>
  );
}