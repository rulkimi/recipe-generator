import { Discovery } from "@/types";
import DiscoveryHeader from "./discovery-header";
import DiscoveryCustomizationInfo from "./discovery-customization-badges";
import Link from "next/link";

export default function DiscoveryCard({
  item
}: {
  item: Discovery
}) {
  let parsedUserInput;

  try {
    parsedUserInput = item.user_input ? JSON.parse(item.user_input) : undefined;
  } catch (e) {
    parsedUserInput = item.user_input;
  }

  const showUserInput = item.type === "ingredients";
  return (
    <Link
      key={item.id}
      href={`/recipes/${item.id}`}
      className="rounded-xl p-5 bg-card text-card-foreground border border-border shadow-sm hover:shadow-none transition-all duration-300 space-y-3 hover:bg-muted/50 cursor-pointer"
    >
      <DiscoveryHeader item={item} />

      {item.description && (
        <p className="text-sm text-muted-foreground leading-snug">
          {item.description}
        </p>
      )}

      <DiscoveryCustomizationInfo item={item} />

      {showUserInput && (
        <p className="text-sm text-muted-foreground leading-snug">
          <span className="font-semibold">Ingredients:</span>{" "}
          {Array.isArray(parsedUserInput)
            ? parsedUserInput.join(", ")
            : parsedUserInput}
        </p>
      )}
    </Link>
  );
}