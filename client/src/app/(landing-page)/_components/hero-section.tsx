import { ChefHat, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  FadeUp,
  ScaleFade,
  MotionContainer,
  MotionImage,
  MotionBlur,
} from "@/components/motions/landing-page/hero-motions";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1050&q=80";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-muted/60 via-background to-background px-6 py-16 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* ----------------------- Hero Text ----------------------- */}
        <MotionContainer className="flex-1 flex flex-col items-center md:items-start mb-10 md:mb-0">
          <ScaleFade>
            <span className="inline-flex items-center px-2.5 py-1 mb-5 rounded-full bg-primary/15 text-primary font-semibold tracking-wide text-xs gap-1 uppercase shadow-sm select-none">
              <ChefHat className="size-3.5" />
              Your AI Cooking Buddy
            </span>
          </ScaleFade>

          <FadeUp>
            <h1 className="mb-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text text-center md:text-left">
              Turn Your Ingredients Into Delicious Recipes, Instantly.
            </h1>
          </FadeUp>

          <FadeUp>
            <p className="mb-8 max-w-xl text-muted-foreground text-lg md:text-xl font-medium text-center md:text-left">
              Got random ingredients at home? See what you can cook with what’s
              on hand, or simply search for any recipe that sounds good. Dinner
              made easy!
            </p>
          </FadeUp>

          <FadeUp>
            <div className="flex gap-3 justify-center md:justify-start w-full flex-wrap">
              <Link
                href="/recipes/search"
                className={cn(buttonVariants({ variant: "default", size: "lg" }))}
              >
                Generate a Recipe
              </Link>
              <Link
                href="/recipes/search?type=ingredients"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "flex items-center gap-2"
                )}
              >
                <Sparkles className="h-5 w-5" />
                Ingredient mode
              </Link>
            </div>
          </FadeUp>
        </MotionContainer>

        {/* ----------------------- Hero Image ----------------------- */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center min-h-[350px] w-full">
          <div className="relative flex justify-center items-center w-full max-w-lg h-[350px]">
            <MotionImage
              src={HERO_IMAGE}
              alt="Vibrant food on plate"
              className="rounded-xl shadow-2xl ring-8 ring-primary/10 w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.98) contrast(1.15)" }}
            />
            <MotionBlur
              className="pointer-events-none absolute left-2 bottom-6 w-28 h-28 rounded-full blur-2xl bg-primary/40 opacity-80"
            />
            <MotionBlur
              className="pointer-events-none absolute right-6 bottom-8 w-16 h-16 rounded-full blur-xl bg-accent/30"
              opacity={0.3}
            />
          </div>
        </div>

        {/* ----------------------- Mobile Hero Image ----------------------- */}
        <div className="md:hidden mt-10 flex w-full justify-center">
          <div className="relative flex justify-center items-center w-full max-w-xs h-48">
            <MotionImage
              src={HERO_IMAGE}
              alt="Vibrant food on plate"
              className="rounded-xl shadow-2xl ring-8 ring-primary/10 w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.98) contrast(1.15)" }}
            />
            <MotionBlur
              className="pointer-events-none absolute left-1 bottom-3 w-16 h-16 rounded-full blur-xl bg-primary/40 opacity-80"
            />
            <MotionBlur
              className="pointer-events-none absolute right-3 bottom-2 w-10 h-10 rounded-full blur-md bg-accent/30"
              opacity={0.6}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
