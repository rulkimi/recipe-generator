"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { Compass, Bookmark, Menu, ChefHat } from "lucide-react";
import { useViewport } from "@/hooks/use-viewport";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/theme-toggler";

export default function Header() {
  const pathname = usePathname();
  const { isMobile } = useViewport();

  // Nav links except GitHub (put GitHub in rightmost)
  const mainNavLinks = [
    {
      href: "/recipes/generate",
      label: "Generate",
      icon: ChefHat,
    },
    {
      href: "/recipes/discovery",
      label: "Discovery",
      icon: Compass,
    },
    {
      href: "/recipes/saved",
      label: "Saved",
      icon: Bookmark,
    },
  ];

  const githubLink = {
    href: "https://github.com/rulkimi/recipe-generator",
    label: "GitHub",
    icon: Icons.github,
    // external: true, // Removed to fix TS error
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/")) return pathname.startsWith(href);
    return false;
  };

  return (
    <header className="sticky top-0 z-10 p-4 shadow-md bg-background/90">
      <div className="flex justify-between items-center max-w-6xl mx-auto md:px-12">
        {/* Left: Logo */}
        <Link
          href="/"
          className="font-semibold text-primary text-lg"
          aria-current={isActive("/") ? "page" : undefined}
        >
          Recipe Generator
        </Link>

        {/* Center: Main navigation (desktop), hidden on mobile */}
        {!isMobile && (
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center gap-2 sm:gap-4">
              {mainNavLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 group transition-colors hover:text-primary ${
                        isActive(link.href) ? "text-primary" : ""
                      }`}
                      aria-current={isActive(link.href) ? "page" : undefined}
                    >
                      <Icon
                        className={`size-4 transition-colors duration-300 group-hover:fill-primary/20 ${
                          isActive(link.href) ? "text-primary fill-primary/20" : ""
                        }`}
                      />
                      <span className="hidden sm:inline ml-1">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Right: GitHub + dark mode toggle (desktop); Hamburger (mobile) */}
        <div className="flex items-center gap-2">
          {!isMobile ? (
            <>
              {/* GitHub Link */}
              <Link
                href={githubLink.href}
                target="_blank"
                className="flex items-center justify-center rounded-md group"
                rel="noopener noreferrer"
              >
                <githubLink.icon className="size-4 transition-colors duration-300 group-hover:text-primary group-hover:fill-primary/20" />
                <span className="sr-only">{githubLink.label}</span>
              </Link>
              {/* Dark mode toggle */}
              <ModeToggle />
            </>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open Menu"
                  className="p-2 rounded-md hover:bg-primary/10 transition md:hidden"
                >
                  <Menu className="size-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <SheetHeader className="border-b p-4 flex items-center">
                  <span className="font-semibold text-lg text-primary">Menu</span>
                </SheetHeader>
                <nav>
                  <ul className="flex flex-col p-4 gap-3">
                    {[...mainNavLinks, githubLink].map((link, i) => {
                      const Icon = link.icon;
                      // Only the GitHub link is external, so check by href.
                      const isExternal =
                        typeof link.href === "string" &&
                        link.href.startsWith("http");
                      if (isExternal) {
                        return (
                          <li key={i}>
                            <SheetClose asChild>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-base hover:bg-primary/10 group transition-colors"
                              >
                                <Icon className="size-4 text-primary group-hover:fill-primary/20" />
                                <span>{link.label}</span>
                              </a>
                            </SheetClose>
                          </li>
                        );
                      }
                      return (
                        <li key={i}>
                          <SheetClose asChild>
                            <Link
                              href={link.href}
                              className={`flex items-center gap-2 rounded-md px-3 py-2 text-base transition-colors group hover:bg-primary/10 ${
                                isActive(link.href) ? "bg-primary/10 text-primary" : ""
                              }`}
                              aria-current={isActive(link.href) ? "page" : undefined}
                              tabIndex={0}
                              passHref
                            >
                              <Icon
                                className={`size-4 transition-colors duration-300 group-hover:fill-primary/20 ${
                                  isActive(link.href) ? "text-primary fill-primary/20" : ""
                                }`}
                              />
                              <span>{link.label}</span>
                            </Link>
                          </SheetClose>
                        </li>
                      );
                    })}
                    {/* Dark mode toggle at bottom of sheet */}
                    <li className="pt-3 border-t">
                      <ModeToggle />
                    </li>
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}