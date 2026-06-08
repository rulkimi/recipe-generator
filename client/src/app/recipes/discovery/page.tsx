import PageTitle from "../_components/page-title";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs";
import DiscoveriesListing from "./_components/discoveries-listing";
import { Metadata } from "next";
import DiscoverySearch from "./_components/discovery-search";

export const metadata: Metadata = {
  title: "Shared Discoveries | Recipe Generator",
  description: "Explore curated and shared AI recipes from the community. See what others have cooked by searching recipes by ingredients. Get inspired and find new ideas.",
  keywords: ["discover recipes", "community recipes", "shared recipes", "search recipes by ingredients", "recipe ideas", "cooking inspiration", "ingredient based recipes"],
  alternates: {
    canonical: "https://recipe-generator.rulkimi.com/recipes/discovery",
  },
  openGraph: {
    title: "Shared Discoveries | Recipe Generator",
    description: "Explore curated and shared AI recipes from the community. See what others have cooked by searching recipes by ingredients. Get inspired and find new ideas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shared Discoveries | Recipe Generator",
    description: "Explore curated and shared AI recipes from the community. See what others have cooked by searching recipes by ingredients. Get inspired and find new ideas.",
  },
};

export default async function Discovery({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolvedSearchParams = await searchParams;
  searchParamsCache.parse(resolvedSearchParams);
  // const key = serialize({ ...resolvedSearchParams });

  return (
    <div className="py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PageTitle title="Shared Discoveries" icon="compass" />
          <DiscoverySearch />
        </div>
        <DiscoveriesListing />
      </div>
  );
}
