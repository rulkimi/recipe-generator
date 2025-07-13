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
				url: "https://opengraph.b-cdn.net/production/images/48b6b729-4217-45e0-90b0-b72c57b3d990.png?token=1coiLlCz2STZ7GyjDUJtJ3z8aOcl9XNtDzQUUf3A7iE&height=100&width=187&expires=33288403645",
				width: 187,
				height: 100,
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
			"https://opengraph.b-cdn.net/production/images/48b6b729-4217-45e0-90b0-b72c57b3d990.png?token=1coiLlCz2STZ7GyjDUJtJ3z8aOcl9XNtDzQUUf3A7iE&height=100&width=187&expires=33288403645",
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
