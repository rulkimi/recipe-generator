import { getDiscoveries } from "@/actions/search";
import { searchParamsCache } from "@/lib/searchparams";
import { Discovery } from "@/types";
import DiscoveryCard from "./discovery-card";
import DiscoveryPagination from "./discovery-pagination";

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

  return (
    <>
      {discoveries.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground">
          No results found{q ? ` for "${q}"` : ""}.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            {discoveries.map((item: Discovery) => (
              <DiscoveryCard key={item.id} item={item} />
            ))}
          </div>
          <DiscoveryPagination totalPages={total_pages} />
        </>
      )}
    </>
  );
}
