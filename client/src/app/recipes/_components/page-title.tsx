import { Icons, type IconType } from "@/components/icons";

export default function PageTitle({
  title,
  icon
}: {
  title: string;
  icon: IconType;
}) {
  const Icon = Icons[icon];
  return (
    <h1 className="flex items-center gap-1 text-sm font-semibold uppercase text-border">
      <Icon className="size-4" />
      {title}
    </h1>
  );
}