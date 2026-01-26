"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { Compass, Bookmark, Menu } from "lucide-react";
import { useViewport } from "@/hooks/use-viewport";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";

export default function Header() {
  const pathname = usePathname();
  const { isMobile } = useViewport();

  // Helper for active nav
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Navigation Items
  const navLinks = [
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
    {
      href: "https://github.com/rulkimi/recipe-generator",
      label: "GitHub",
      icon: Icons.github,
      external: true,
    },
  ];

  return (
    <header className="sticky top-0 z-10 p-4 shadow-md bg-background/90">
      <div className="flex justify-between items-center max-w-6xl mx-auto md:px-12">
        <Link
          href="/"
          className="font-semibold text-primary text-lg"
          aria-current={isActive("/") ? "page" : undefined}
        >
          Recipe Generator
        </Link>
        {isMobile ? (
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
                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    // Special GitHub link
                    if (link.external) {
                      // Wrap external link with SheetClose so the sheet closes on click
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
                    // Wrap Link with SheetClose asChild so sheet closes on nav
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
                                isActive(link.href)
                                  ? "text-primary fill-primary/20"
                                  : ""
                              }`}
                            />
                            <span>{link.label}</span>
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav>
            <ul className="flex items-center gap-2 sm:gap-3">
              <li>
                <Link
                  href="/recipes/discovery"
                  className={`flex items-center gap-1 group transition-colors hover:text-primary ${
                    isActive("/recipes/discovery") ? "text-primary" : ""
                  }`}
                  aria-current={isActive("/recipes/discovery") ? "page" : undefined}
                >
                  <Compass
                    className={`size-4 transition-colors duration-300 group-hover:fill-primary/20 ${
                      isActive("/recipes/discovery")
                        ? "text-primary fill-primary/20"
                        : ""
                    }`}
                  />
                  <span className="hidden sm:inline ml-1">Discover</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/saved"
                  className={`flex items-center gap-1 group transition-colors hover:text-primary ${
                    isActive("/recipes/saved") ? "text-primary" : ""
                  }`}
                  aria-current={isActive("/recipes/saved") ? "page" : undefined}
                >
                  <Bookmark
                    className={`size-4 transition-colors duration-300 group-hover:fill-primary/20 ${
                      isActive("/recipes/saved")
                        ? "text-primary fill-primary/20"
                        : ""
                    }`}
                  />
                  <span className="hidden sm:inline ml-1">Saved</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/rulkimi/recipe-generator"
                  target="_blank"
                  className="flex items-center justify-center rounded-md group"
                >
                  <Icons.github className="size-4 transition-colors duration-300 group-hover:text-primary group-hover:fill-primary/20" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}