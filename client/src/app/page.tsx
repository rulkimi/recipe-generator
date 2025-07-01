import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Sparkles, Star, ChefHat } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col bg-background text-foreground">
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center bg-gradient-to-b from-muted/50 to-background">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-primary">
          AI-Powered Recipe Generator
        </h1>
        <p className="max-w-2xl mb-8 text-lg text-muted-foreground md:text-xl">
          Instantly create delicious recipes from your ingredients. No planning, no guessing — just cooking.
        </p>
        <Link href="/recipes/search" >
          <Button size="lg">
            🍽️ Generate a Recipe
          </Button>
        </Link>
      </section>

      <section className="max-w-5xl px-6 py-20 mx-auto">
        <h2 className="mb-12 text-3xl font-semibold text-center md:text-4xl">
          Why You’ll Love It
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Smart Ingredient Matching",
              icon: <CheckCircle className="text-green-500 size-6" />,
              desc: "Enter the ingredients you have, and we'll generate a recipe instantly.",
            },
            {
              title: "Tailored to Your Diet",
              icon: <Sparkles className="text-yellow-500 size-6" />,
              desc: "Vegetarian, vegan, keto, halal? We’ve got you covered with filters and options.",
            },
            {
              title: "Ready in Minutes",
              icon: <ChefHat className="text-red-500 size-6" />,
              desc: "Simple steps and accurate cooking times. No guesswork.",
            },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6 space-y-4">
                <div>{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">Perfect For...</h2>
          <ul className="space-y-4 text-lg text-muted-foreground">
            <li>✔️ Quick meals with what's in your fridge</li>
            <li>✔️ Planning weekly dishes with variety</li>
            <li>✔️ Exploring new cuisines effortlessly</li>
            <li>✔️ Cooking with dietary restrictions</li>
          </ul>
        </div>
      </section>

      <section className="max-w-5xl px-6 py-20 mx-auto">
        <h2 className="mb-12 text-3xl font-semibold text-center">What Users Say</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              name: "Sarah L.",
              quote: "This app saved me so much time! I never thought leftovers could taste this good.",
            },
            {
              name: "Mark R.",
              quote: "I’m on a keto diet, and the AI suggestions are spot on. Love the flexibility!",
            },
          ].map((t, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-3">
                <Star className="text-yellow-500" />
                <p className="italic">“{t.quote}”</p>
                <p className="font-semibold text-muted-foreground">— {t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-sm text-center border-t text-muted-foreground">
        &copy; {new Date().getFullYear()} Recipe Generator. Built with ❤️ using ShadCN & Next.js.
      </footer>
    </main>
  );
}
