import { Suspense } from "react";
import SearchBar from "../../../components/search-bar";
import ActionButtons from "./_components/action-buttons";
import { SearchBarSkeleton } from "../[id]/loading";

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl min-h-[calc(100vh-56px)] mx-auto space-y-6">
      <h1 className="px-4 mb-12 text-4xl font-semibold leading-tight text-center text-transparent sm:text-6xl md:text-7xl sm:leading-snug bg-clip-text bg-gradient-to-r from-primary to-pink-500/80">
        Find a recipe, skip the stress
      </h1>
      <Suspense fallback={<SearchBarSkeleton />}>
        <SearchBar />
        <ActionButtons />
      </Suspense>
    </div>
  )
}
