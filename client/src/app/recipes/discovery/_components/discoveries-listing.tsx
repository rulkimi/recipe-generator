import { getDiscoveries } from "@/actions/search";
import { searchParamsCache } from "@/lib/searchparams";
import { Discovery } from "@/types";
import DiscoveryCard from "./discovery-card";

export default async function DiscoveriesListing() {
  const page = searchParamsCache.get("page");
  const response = await getDiscoveries({ page });
  const { data: discoveries } = response;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
      {discoveries.map((item: Discovery) => <DiscoveryCard key={item.id} item={item} />)}
    </div>
  );
}
