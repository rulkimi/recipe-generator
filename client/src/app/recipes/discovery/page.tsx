import PageTitle from "../_components/page-title";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs";
import DiscoveriesListing from "./_components/discoveries-listing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared Discoveries - Recipe Generator",
  description: "Explore curated and shared discoveries from the community.",
  openGraph: {
    title: "Shared Discoveries - Recipe Generator",
    description: "Explore curated and shared discoveries from the community.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shared Discoveries - Recipe Generator",
    description: "Explore curated and shared discoveries from the community.",
  },
};

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