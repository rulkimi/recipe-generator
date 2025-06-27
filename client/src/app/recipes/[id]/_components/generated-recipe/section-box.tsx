import { ReactNode } from "react";

export default function SectionBox ({
  id,
  title,
  children,
  icon
}: {
  id?: string;
  title: string;
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <section
      id={id ?? title}
      className="h-full p-4 space-y-3 border-2"
    >
      <div className="flex items-center gap-2">
        <span className="text-border">{icon}</span>
        <h2 className="text-lg font-semibold text-border">{title}</h2>
      </div>
      {children}
    </section>
  );
}