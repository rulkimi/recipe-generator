import { getCollections } from "@/actions/search";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache } from "@/lib/searchparams";
import { formatDietaryRestriction, formatLanguage } from "@/lib/utils";
import { Collection } from "@/types";
import { Bookmark, ThumbsUp, ThumbsDown } from "lucide-react";

export default async function CollectionsListing() {
  const page = searchParamsCache.get("page");
  const response = await getCollections({ page });
  const { data: collections } = response;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
      {collections.map((item: Collection) => {
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
            className="rounded-xl p-5 bg-card text-card-foreground border border-border shadow-sm hover:shadow-md transition-shadow duration-300 space-y-3"
          >
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-base font-semibold text-primary">{item.name}</h3>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border flex-shrink-0 min-w-[40px] justify-center">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {item.good_count}
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border flex-shrink-0 min-w-[40px] justify-center">
                  <ThumbsDown className="w-3.5 h-3.5" />
                  {item.bad_count}
                </span>

                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {item.description && (
              <p className="text-sm text-muted-foreground leading-snug">
                {item.description}
              </p>
            )}

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
      })}
    </div>
  );
}
