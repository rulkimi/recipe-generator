"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchParams } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useQueryState } from "nuqs";
import Link from "next/link";

export default function DiscoverySearch() {
  const [search, setSearch] = useQueryState(
    "q",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 300 })
      .withDefault("")
  );

  const [, setPage] = useQueryState(
    "page",
    searchParams.page.withOptions({ shallow: false }).withDefault(1)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset page to 1 on search
  };

  return (
    <div className="flex flex-col w-full gap-2 sm:flex-row sm:items-center sm:gap-2 sm:w-auto">
      <Input
        placeholder="Search discovery..."
        value={search}
        className="w-full sm:w-64"
        onChange={handleChange}
      />
      <Link
        href="/recipes/search"
        className={cn(
          buttonVariants({ variant: "default" }),
          "w-full sm:w-auto text-center group"
        )}
      >
        New Recipe
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
