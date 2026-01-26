import { Camera, CheckCircle, Sparkles } from "lucide-react";

const FEATURES = [
  {
    title: "Snap & Cook",
    icon: <Camera className="text-accent w-9 h-9 mb-2" />,
    desc: "Upload a photo of your fridge or leftovers—let AI identify the ingredients and craft a custom recipe.",
  },
  {
    title: "Tailored to You",
    icon: <Sparkles className="text-secondary w-9 h-9 mb-2" />,
    desc: <>Set <span className="font-semibold text-primary">dietary needs</span> (vegan, halal, allergies) or cuisine preferences—AI personalizes everything!</>,
  },
  {
    title: "Instant Inspiration",
    icon: <CheckCircle className="text-chart-4 w-9 h-9 mb-2" />,
    desc: "No more scrolling endless blogs. Just type what you have—and get fast, step-by-step recipes.",
  },
] as const;

export default function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-12 py-20">
      <h2 className="mb-12 text-center text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent/80">
        Unlock Smarter Cooking
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl bg-card/80 backdrop-blur-lg shadow-xl border border-primary/10 p-8 flex flex-col items-center text-center transition hover:shadow-2xl hover:-translate-y-2"
          >
            {f.icon}
            <h3 className="mt-1 mb-2 text-xl font-semibold">{f.title}</h3>
            <p className="text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

