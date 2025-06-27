import SearchBar from "../../../components/search-bar";
import ActionButtons from "./_components/action-buttons";

export default function SearchPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen max-w-5xl mx-auto space-y-6">
      <h1 className="mb-12 text-5xl sm:text-6xl md:text-7xl font-semibold text-transparent leading-tight sm:leading-snug bg-clip-text bg-gradient-to-r from-primary to-pink-500/80 text-center px-4">
        Find a recipe, skip the stress
      </h1>
      <SearchBar />
      <ActionButtons />
    </main>
  )
}
