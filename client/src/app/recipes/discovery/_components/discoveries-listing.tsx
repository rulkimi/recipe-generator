import { getDiscoveries } from "@/actions/search";
import { searchParamsCache } from "@/lib/searchparams";
import { Discovery } from "@/types";
import DiscoveryCard from "./discovery-card";
import DiscoveryPagination from "./discovery-pagination";
import { MotionContainer, MotionCard } from "@/components/motions/discoveries-motions";

export default async function DiscoveriesListing() {
  const page = searchParamsCache.get("page");
  const q = searchParamsCache.get("q");
  const response = await getDiscoveries({ page, query: q });
  const { data: discoveries, total_pages } = response;

  if (!Array.isArray(discoveries)) {
    return (
      <div className="py-4 text-red-400">
        Sorry, something went wrong while loading discoveries.
      </div>
    );
  }

  if (discoveries.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        No results found{q ? ` for "${q}"` : ""}.
      </div>
    );
  }

  return (
    <>
      <MotionContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
        {discoveries.map((item: Discovery) => (
          <MotionCard 
            key={item.id}
            className="rounded-xl p-5 bg-card text-card-foreground border border-border shadow-sm hover:shadow-none transition-all duration-300 hover:bg-muted/50 cursor-pointer"
          >
            <DiscoveryCard item={item} />
          </MotionCard>
        ))}
      </MotionContainer>
      <DiscoveryPagination totalPages={total_pages} />
    </>
  );
}
