import PageTitle from "../_components/page-title";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs";
import DiscoveriesListing from "./_components/discoveries-listing";

export default async function Discovery({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await searchParamsCache.parse(searchParams);
  // const key = serialize({ ...searchParams });

  return (
    <div className="py-6">
      <PageTitle title="Shared Discoveries" icon="compass" />
      <DiscoveriesListing />
    </div>
  );
}