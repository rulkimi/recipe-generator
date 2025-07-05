"use client";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { searchParams } from "@/lib/searchparams";

export default function DiscoveryPagination({
  totalPages
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

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </Button>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? "default" : "outline"}
            onClick={() => goToPage(pageNum)}
          >
            {pageNum}
          </Button>
        );
      })}

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
