"use client"

import { useRouter } from "next/navigation";
import { Discovery } from "@/types";
import DiscoveryHeader from "./discovery-header";
import DiscoveryCustomizationInfo from "./discovery-customization-badges";

export default function DiscoveryCard({
  item
}: {
  item: Discovery
}) {
  const router = useRouter();
  let parsedUserInput;

  try {
    parsedUserInput = item.user_input ? JSON.parse(item.user_input) : undefined;
  } catch (e) {
    parsedUserInput = item.user_input;
  }

  const showUserInput = item.type === "ingredients";
  return (
    <div
      key={item.id}
      className="space-y-3 rounded-xl p-5 bg-card text-card-foreground border border-border shadow-sm hover:shadow-none transition-all duration-300 hover:bg-muted/50 cursor-pointer"
      onClick={() => router.push(`/recipes/${item.id}`)}
      tabIndex={0}
      role="link"
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/recipes/${item.id}`);
        }
      }}
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
    </div>
  );
}