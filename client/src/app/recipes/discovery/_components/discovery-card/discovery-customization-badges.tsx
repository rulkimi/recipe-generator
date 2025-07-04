import { Separator } from "@/components/ui/separator"
import { formatDietaryRestriction, formatLanguage } from "@/lib/utils"
import { Discovery } from "@/types"

export default function DiscoveryCustomizationInfo({
  item
}: {
  item: Discovery
}) {
  return (
    <div className="flex flex-wrap gap-1 text-xs h-5">
      {/* <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
        {item.type}
      </span> */}
      {item.language && (
        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
          {formatLanguage(item.language)}
        </span>
      )}
      {item.dietary_restrictions.length > 0 && (
        <>
          <Separator orientation="vertical" className="mx-1" />
          {item.dietary_restrictions?.map((restriction, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border"
            >
              {formatDietaryRestriction(restriction)}
            </span>
          ))}
        </>
      )}
    </div>
  )
}