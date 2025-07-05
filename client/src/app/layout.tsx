import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Header from "@/components/header";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Generator",
  description:
    "An AI-powered tool to generate personalized recipes based on your preferences and ingredients.",
  openGraph: {
    title: "Recipe Generator",
    description:
      "An AI-powered tool to generate personalized recipes based on your preferences and ingredients.",
    url: "https://recipe-generator.rulkimi.com",
    type: "website",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/9f011366-2c27-4d66-bf7e-eb84bcd2d981.png?token=k-_35-CHIlEZS6jFkcPnsxWX-QfV62LSHki6AMfjm0Y&height=206&width=382&expires=33287351366",
        width: 382,
        height: 206,
        alt: "Recipe Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipe Generator",
    description:
      "An AI-powered tool to generate personalized recipes based on your preferences and ingredients.",
    images: [
      "https://opengraph.b-cdn.net/production/images/9f011366-2c27-4d66-bf7e-eb84bcd2d981.png?token=k-_35-CHIlEZS6jFkcPnsxWX-QfV62LSHki6AMfjm0Y&height=206&width=382&expires=33287351366",
    ],
    site: "https://recipe-generator.rulkimi.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <NuqsAdapter>
          <Header />
          <NextTopLoader color="var(--primary)" height={3} />
          {children}
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
