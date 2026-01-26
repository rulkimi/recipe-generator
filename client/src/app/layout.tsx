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
				url: "/recipe-generator-og-image.png",
				width: 1200,
				height: 630,
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
			"/recipe-generator-og-image.png",
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
