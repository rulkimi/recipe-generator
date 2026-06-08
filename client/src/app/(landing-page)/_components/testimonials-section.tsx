"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { MotionContainer, MotionCard, FadeUp } from "@/components/motions/landing-page/testimonials-motions";
import TestimonialAvatarSofea from "@/assets/testimonial-avatar_sofea.png";
import TestimonialAvatarSonghan from "@/assets/testimonial-avatar_songhan.png";

const TESTIMONIALS = [
  { name: "Sofea", quote: "The layout for the app is so pretty and easy to use. The recipe is pretty accurate too!", avatar: TestimonialAvatarSofea },
  { 
    name: "Song Han", 
    quote: "我丢家里有什么食材进去，它就给我idea可以煮什么了！",
    avatar: TestimonialAvatarSonghan 
  },
  // { name: "Mark R.", quote: "I'm on a keto diet, and the AI suggestions are spot on. Love the flexibility!", avatar: "https://randomuser.me/api/portraits/men/38.jpg" },
  // { name: "Jin Y.", quote: "Perfect for weeknights. I just take a picture after grocery shopping, and recipes appear!", avatar: "https://randomuser.me/api/portraits/men/72.jpg" },
  // { name: "Maria S.", quote: "Love the variety—I never get bored of my own kitchen anymore.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
] as const;

export default function TestimonialsSection() {
  return (
    <section className="max-w-5xl px-6 py-20 mx-auto">
      <FadeUp>
        <h2 className="mb-12 text-3xl font-semibold text-center">
          What Users Say
        </h2>
      </FadeUp>

      <MotionContainer className="grid gap-8 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <MotionCard
            key={i}
            className="bg-card/80 border-0 shadow-lg rounded-xl p-6 flex flex-col items-center space-y-3"
          >
            {typeof t.avatar === "string" ? (
              <img
                src={t.avatar}
                alt={`User review avatar of ${t.name} for Recipe Generator - Search recipes by ingredients`}
                className="w-12 h-12 rounded-full mb-3 ring-2 ring-primary/30 object-cover"
                loading="lazy"
              />
            ) : (
              <Image
                src={t.avatar}
                alt={`User review avatar of ${t.name} for Recipe Generator - Search recipes by ingredients`}
                className="w-12 h-12 rounded-full mb-3 ring-2 ring-primary/30 object-cover"
                width={48}
                height={48}
                priority={false}
              />
            )}

            <FadeUp className="flex flex-row gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="text-secondary w-4 h-4 fill-secondary" />
              ))}
            </FadeUp>

            <FadeUp className="italic text-center text-lg">"{t.quote}"</FadeUp>
            <FadeUp className="font-semibold text-muted-foreground">— {t.name}</FadeUp>
          </MotionCard>
        ))}
      </MotionContainer>
    </section>
  );
}
