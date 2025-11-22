import { ChefHat, Sparkles, CheckCircle, Camera, Star } from 'lucide-react';
import Link from 'next/link';

const HERO_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1050&q=80";

const DISH_IMAGES = [
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80",
];

export default function LandingPage() {
  return (
    <main className="flex flex-col bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      {/* Hero section - grid layout instead of relative/absolute */}
      <section className="bg-gradient-to-br from-[var(--muted)]/60 via-[var(--background)] to-[var(--background)] px-6 py-24">
        <div className="max-w-6xl mx-auto md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <span className="inline-flex items-center px-2.5 py-1 mb-5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] font-semibold tracking-wide text-xs gap-2 uppercase shadow-sm select-none">
              <ChefHat className="w-5 h-5" />
              Your AI Cooking Buddy
            </span>
            <h1 className="mb-5 text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text text-center md:text-left">
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
          
          {/* Hero image with decorative blurs underneath */}
          <div className="hidden md:flex flex-1 flex-col items-center">
            <img
              src={HERO_IMAGE}
              alt="Vibrant food on plate"
              className="rounded-xl shadow-2xl ring-8 ring-[color:var(--primary)]/10 w-[480px] h-[350px] object-cover object-center"
              style={{ filter: "brightness(0.98) contrast(1.15)" }}
            />
            {/* Decorative blurs - no absolute positioning */}
            <div className="flex justify-between w-full max-w-md mt-[-40px] px-4 pointer-events-none">
              <div className="w-32 h-32 rounded-full blur-2xl bg-[var(--primary)]/30 opacity-80"></div>
              <div className="w-20 h-20 rounded-full blur-xl bg-[var(--accent)]/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-12 py-20">
        <h2 className="mb-12 text-center text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]/80">
          Unlock Smarter Cooking
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Snap & Cook",
              icon: <Camera className="text-[var(--accent)] w-9 h-9 mb-2" />,
              desc: "Upload a photo of your fridge or leftovers—let AI identify the ingredients and craft a custom recipe.",
            },
            {
              title: "Tailored to You",
              icon: <Sparkles className="text-[var(--secondary)] w-9 h-9 mb-2" />,
              desc: <>Set <span className="font-semibold text-[var(--primary)]">dietary needs</span> (vegan, halal, allergies) or cuisine preferences—AI personalizes everything!</>,
            },
            {
              title: "Instant Inspiration",
              icon: <CheckCircle className="text-[var(--chart-4)] w-9 h-9 mb-2" />,
              desc: "No more scrolling endless blogs. Just type what you have—and get fast, step-by-step recipes.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-[color:var(--card)]/80 backdrop-blur-lg shadow-xl border border-[var(--primary)]/10 p-8 flex flex-col items-center text-center transition hover:shadow-2xl hover:-translate-y-2"
            >
              {f.icon}
              <h3 className="mt-1 mb-2 text-xl font-semibold">{f.title}</h3>
              <p className="text-[color:var(--muted-foreground)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-6 bg-gradient-to-br from-[var(--background)] via-[var(--muted)]/40 to-[var(--background)]">
        <h2 className="mb-7 text-2xl md:text-3xl font-bold text-center text-[var(--foreground)]/90">
          Explore Endless Culinary Possibilities
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-auto max-w-4xl">
          {DISH_IMAGES.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Delicious dish #${i + 1}`}
              className="rounded-xl shadow-lg hover:scale-105 transition-all duration-300 aspect-square object-cover object-center"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* Perfect For */}
      <section className="px-6 py-20 bg-[var(--muted)]/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 text-2xl md:text-3xl font-bold">Perfect For...</h2>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {[
              "Quick & healthy dinners",
              "Dietary restrictions",
              "Student/solo meal prep",
              "Using leftovers",
              "Trying new cuisines",
              "Family meals",
              "Last minute guests",
            ].map((text) => (
              <span
                key={text}
                className="inline-flex px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-medium text-base shadow-sm backdrop-blur-md"
              >
                {text}
              </span>
            ))}
          </div>
          <p className="text-lg text-[color:var(--muted-foreground)] opacity-90 mb-2">
            Get creative, save money, impress your friends, and eat well—any night of the week.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl px-6 py-20 mx-auto">
        <h2 className="mb-12 text-3xl font-semibold text-center">What Users Say</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {[
            { name: "Sarah L.", quote: "This app saved me so much time! I never thought leftovers could taste this good.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "Mark R.", quote: "I'm on a keto diet, and the AI suggestions are spot on. Love the flexibility!", avatar: "https://randomuser.me/api/portraits/men/38.jpg" },
            { name: "Jin Y.", quote: "Perfect for weeknights. I just take a picture after grocery shopping, and recipes appear!", avatar: "https://randomuser.me/api/portraits/men/72.jpg" },
            { name: "Maria S.", quote: "Love the variety—I never get bored of my own kitchen anymore.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
          ].map((t, i) => (
            <div key={i} className="bg-[color:var(--card)]/80 border-0 shadow-lg rounded-xl p-6 flex flex-col items-center space-y-3">
              <img
                src={t.avatar}
                alt={`Avatar of ${t.name}`}
                className="w-12 h-12 rounded-full mb-3 ring-2 ring-[var(--primary)]/30 object-cover"
                loading="lazy"
              />
              <div className="flex flex-row gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="text-[var(--secondary)] w-4 h-4 fill-[var(--secondary)]" />
                ))}
              </div>
              <p className="italic text-center text-lg">"{t.quote}"</p>
              <p className="font-semibold text-[color:var(--muted-foreground)]">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-sm text-center border-t bg-[var(--card)]/60 text-[color:var(--muted-foreground)]/90 font-medium shadow-inner">
        © 2025 Recipe Generator — Built with{" "}
        <span className="text-[var(--accent)]">❤️</span> using ShadCN, Next.js, and AI.
      </footer>
    </main>
  );
}