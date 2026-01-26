import { ChefHat, Sparkles, CheckCircle, Camera, Star } from 'lucide-react';
import Link from 'next/link';

const HERO_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1050&q=80";

export default function HeroSection () {
  return (
    <section className="bg-gradient-to-br from-[var(--muted)]/60 via-[var(--background)] to-[var(--background)] px-6 py-24">
    <div className="max-w-6xl mx-auto md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="flex-1 flex flex-col items-center md:items-start">
        <span className="inline-flex items-center px-2.5 py-1 mb-5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] font-semibold tracking-wide text-xs gap-2 uppercase shadow-sm select-none">
          <ChefHat className="w-5 h-5" />
          Your AI Cooking Buddy
        </span>
        <h1 className="mb-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text text-center md:text-left">
          Turn Your Ingredients Into Delicious Recipes, Instantly.
        </h1>
        <p className="mb-8 max-w-xl text-[color:var(--muted-foreground)] text-lg md:text-xl font-medium text-center md:text-left">
          Fridge almost empty? Want to eat healthier, try a new cuisine, or improvise tonight's meal? Simply snap a pic or type what you have—let AI do the magic!
        </p>
        <div className="flex gap-3 justify-center md:justify-start w-full flex-wrap">
          <Link href="/recipes/search" className="px-6 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-base shadow-lg transition hover:-translate-y-1">
            🍽️ Generate a Recipe
          </Link>
          <Link href="/recipes/search?type=ingredients" className="px-6 py-3 rounded-lg border border-[var(--border)] font-semibold text-base flex items-center gap-2 transition hover:-translate-y-1 bg-transparent text-[var(--primary)]">
            <Sparkles className="h-5 w-5 text-[var(--primary)]" />
            Ingredient mode
          </Link>
        </div>
      </div>
      
      <div className="hidden md:flex flex-1 flex-col items-center justify-center min-h-[350px] w-full">
        <div className="relative flex justify-center items-center w-full max-w-lg h-[350px]">
          <img
            src={HERO_IMAGE}
            alt="Vibrant food on plate"
            className="rounded-xl shadow-2xl ring-8 ring-primary/10 w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.98) contrast(1.15)" }}
          />
          {/* Decorative blurs - positioned for fit */}
          <div className="pointer-events-none absolute left-2 bottom-6">
            <div className="w-28 h-28 rounded-full blur-2xl bg-primary/40 opacity-80"></div>
          </div>
          <div className="pointer-events-none absolute right-6 bottom-8">
            <div className="w-16 h-16 rounded-full blur-xl bg-accent/30"></div>
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}