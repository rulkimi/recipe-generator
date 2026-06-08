import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Header from "@/components/header";
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://recipe-generator.rulkimi.com"),
  title: {
    default: "Recipe Generator - AI Personalized Recipes",
    template: "%s | Recipe Generator"
  },
  description:
    "An AI-powered recipe generator. Get personalized, easy meal ideas instantly. Search recipes by ingredients to find out what to do with ingredients you have in your fridge and reduce food waste.",
  keywords: [
    "AI recipe generator",
    "AI recipe maker", 
    "personalized recipes", 
    "recipe generator", 
    "recipes by ingredients", 
    "search recipes by ingredients",
    "what to do with ingredients", 
    "what can I cook with these ingredients",
    "reverse recipe search",
    "ingredient based recipe finder",
    "fridge clearer recipe app",
    "cook with what you have",
    "meal ideas", 
    "leftover ingredient recipes",
    "empty fridge recipes",
    "easy recipe generator",
    "healthy recipes by ingredients"
  ],
  authors: [{ name: "Recipe Generator Team" }],
  creator: "Recipe Generator Team",
  openGraph: {
    title: "Recipe Generator - AI Personalized Recipes",
    description:
      "An AI-powered recipe generator. Get personalized, easy meal ideas instantly. Search recipes by ingredients to find out what to do with ingredients you have in your fridge and reduce food waste.",
    url: "https://recipe-generator.rulkimi.com",
    siteName: "Recipe Generator",
    type: "website",
    images: [
      {
        url: "/recipe-generator-og-image.png",
        width: 1200,
        height: 630,
        alt: "Recipe Generator - AI Personalized Recipes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipe Generator - AI Personalized Recipes",
    description:
      "An AI-powered recipe generator. Get personalized, easy meal ideas instantly. Search recipes by ingredients to find out what to do with ingredients you have in your fridge and reduce food waste.",
    images: [
      "/recipe-generator-og-image.png",
    ],
    site: "https://recipe-generator.rulkimi.com",
  },
  alternates: {
    canonical: "https://recipe-generator.rulkimi.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <Header />
            <NextTopLoader color="var(--primary)" height={3} />
            {children}
          </NuqsAdapter>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
