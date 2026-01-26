import { Camera, CheckCircle, Sparkles } from "lucide-react";
import {
  MotionContainer,
  MotionCard,
  FadeUp,
} from "@/components/motions/landing-page/features-motions";

const FEATURES = [
  {
    title: "Snap & Cook",
    icon: <Camera className="text-accent w-9 h-9 mb-2" />,
    desc: "Snap a photo and get the recipe so you can make it yourself.",
  },
  {
    title: "Tailored to You",
    icon: <Sparkles className="text-secondary w-9 h-9 mb-2" />,
    desc: (
      <>
        Set your <span className="font-semibold text-primary">diet</span> or faves to get matching recipes.
      </>
    ),
  },
  {
    title: "Instant Inspiration",
    icon: <CheckCircle className="text-chart-4 w-9 h-9 mb-2" />,
    desc: "List what’s in your kitchen and get meal ideas now.",
  },
] as const;

export default function FeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto px-12 py-20">
      <FadeUp>
        <h2 className="mb-12 text-center text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent/80">
          Unlock Smarter Cooking
        </h2>
      </FadeUp>

      <MotionContainer className="grid gap-8 md:grid-cols-3">
        {FEATURES.map((f) => (
          <MotionCard
            key={f.title}
            className="rounded-xl bg-card/90 border border-primary/10 p-5 flex flex-col items-center text-center gap-2"
          >
            {f.icon}
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </MotionCard>
        ))}
      </MotionContainer>
    </section>
  );
}
