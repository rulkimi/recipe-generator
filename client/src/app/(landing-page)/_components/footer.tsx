"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="px-6 py-8 text-sm text-center border-t bg-card/60 text-muted-foreground/90 font-medium shadow-inner">
      © {currentYear} Recipe Generator — Built with{" "}
      <span className="text-accent">❤️</span> using ShadCN, Next.js, and AI.
    </footer>
  )
}