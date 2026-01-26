import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Sarah L.", quote: "This app saved me so much time! I never thought leftovers could taste this good.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Mark R.", quote: "I'm on a keto diet, and the AI suggestions are spot on. Love the flexibility!", avatar: "https://randomuser.me/api/portraits/men/38.jpg" },
  { name: "Jin Y.", quote: "Perfect for weeknights. I just take a picture after grocery shopping, and recipes appear!", avatar: "https://randomuser.me/api/portraits/men/72.jpg" },
  { name: "Maria S.", quote: "Love the variety—I never get bored of my own kitchen anymore.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
] as const;

export default function TestimonialsSection() {
  return (
    <section className="max-w-5xl px-6 py-20 mx-auto">
      <h2 className="mb-12 text-3xl font-semibold text-center">What Users Say</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-card/80 border-0 shadow-lg rounded-xl p-6 flex flex-col items-center space-y-3">
            <img
              src={t.avatar}
              alt={`Avatar of ${t.name}`}
              className="w-12 h-12 rounded-full mb-3 ring-2 ring-primary/30 object-cover"
              loading="lazy"
            />
            <div className="flex flex-row gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="text-secondary w-4 h-4 fill-secondary" />
              ))}
            </div>
            <p className="italic text-center text-lg">"{t.quote}"</p>
            <p className="font-semibold text-muted-foreground">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}