import { ReactNode } from "react";

export default function RecipeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-6xl min-h-screen px-12 mx-auto">
      {children}
    </main>
  );
}