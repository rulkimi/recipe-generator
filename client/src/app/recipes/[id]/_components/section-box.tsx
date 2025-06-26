import { ReactNode } from "react";

export default function SectionBox ({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id ?? title}
      className="h-full p-4 space-y-2 border-2"
    >
      <h2 className="text-lg font-semibold text-border">{title}</h2>
      {children}
    </section>
  );
}