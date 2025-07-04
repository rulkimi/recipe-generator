import Link from "next/link";
import { Icons } from "./icons";
import { Blocks, Bookmark } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 p-4 shadow-md bg-background/90">
      <div className="flex justify-between max-w-6xl mx-auto md:px-12">
        <Link href="/recipes/search" className="font-semibold text-primary">
          Recipe Generator
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/recipes/collection"
            className="group"
          >
            <Blocks className="transition-colors duration-300 text-primary group-hover:fill-primary" />
          </Link>
          <Link
            href="/recipes/saved"
            className="group"
          >
            <Bookmark className="transition-colors duration-300 text-primary group-hover:fill-primary" />
          </Link>
          <Link
            href="https://github.com/rulkimi/recipe-generator"
            target="_blank"
            className="group"
          >
            <Icons.github className="transition-colors duration-300 text-primary group-hover:fill-primary" />
          </Link>
        </div>
      </div>
    </header>
  );
}