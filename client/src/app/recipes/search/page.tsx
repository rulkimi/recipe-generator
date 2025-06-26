import HeroSearchBar from "./_components/hero-search-bar";
import ActionButtons from "./_components/action-buttons";

export default function SearchPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen max-w-5xl mx-auto space-y-6">
      <h1 className="my-12 text-6xl font-semibold text-transparent leading-20 bg-clip-text bg-gradient-to-r from-primary to-pink-500/80">
        Find a recipe, skip the stress
      </h1>
      <HeroSearchBar />
      <ActionButtons />
    </main>
  )
}
