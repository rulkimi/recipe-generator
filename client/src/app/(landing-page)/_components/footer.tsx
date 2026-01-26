"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="px-6 py-8 text-sm text-center border-t bg-card/60 dark:bg-background/80 text-muted-foreground/90 dark:text-muted-foreground font-medium shadow-inner transition-colors">
      © {currentYear} Recipe Generator — Built with{" "}
      <span className="text-accent dark:text-accent">❤️</span> using ShadCN, Next.js, and AI.
    </footer>
  )
}