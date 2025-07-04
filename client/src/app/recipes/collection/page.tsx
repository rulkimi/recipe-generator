import PageTitle from "../_components/page-title";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs";
import CollectionsListing from "./_components/collections-listing";

export default async function Collection({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await searchParamsCache.parse(searchParams);
  // const key = serialize({ ...searchParams });

  return (
    <div className="py-6">
      <PageTitle title="Collections" icon="blocks" />
      <CollectionsListing />
    </div>
  );
}