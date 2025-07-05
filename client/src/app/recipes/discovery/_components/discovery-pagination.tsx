"use client"

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { searchParams } from "@/lib/searchparams";

export default function DiscoveryPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const [pageStr, setPage] = useQueryState(
    "page",
    searchParams.page
      .withOptions({ shallow: false, throttleMs: 300 })
      .withDefault(1)
  );

  const currentPage = Math.min(Math.max(Number(pageStr) || 1, 1), totalPages);

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const left = Math.max(1, currentPage - 1);
      const right = Math.min(totalPages, currentPage + 1);

      pages.push(1); // Always show first page

      if (left > 2) pages.push("...");

      for (let i = left; i <= right; i++) {
        if (i !== 1 && i !== totalPages) pages.push(i);
      }

      if (right < totalPages - 1) pages.push("...");

      if (totalPages !== 1) pages.push(totalPages); // Always show last page
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </Button>

      {getPageNumbers().map((p, idx) =>
        typeof p === "string" ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={p}
            variant={p === currentPage ? "default" : "outline"}
            onClick={() => goToPage(p)}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );
}
