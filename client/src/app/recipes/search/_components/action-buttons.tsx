"use client"

import { getRandomRecipe } from "@/actions/search";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";

export default function ActionButtons() {
  const router = useRouter();
  const [type, setType] = useQueryState('type');
  const [loading, setLoading] = useState(false);

  const surpriseMe = async () => {
    setLoading(true);
    try {
      const randomId = await getRandomRecipe();
      router.push(`/recipes/${randomId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setType(type === "ingredients" ? "name" : "ingredients")}
        disabled={loading}
      >
        {type === "ingredients" ? "Search By Name" : "Search By Ingredients"}
      </Button>
      <Button variant="outline" size="sm" onClick={surpriseMe} disabled={loading}>
        {loading && <Loader className="mr-1 size-4 animate-spin" />}
        Surprise Me!
      </Button>
    </div>
  );
}