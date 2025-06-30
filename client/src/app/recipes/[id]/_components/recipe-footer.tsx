"use client";

import { getFeedbackCounts, giveFeedback } from "@/actions/feedback";
import { Button } from "@/components/ui/button";
import { Bookmark, ThumbsDown, ThumbsUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const FEEDBACK_STORAGE_KEY = "feedback_map";

function getStoredFeedback(): Record<string, "good" | "bad"> {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveFeedbackToStorage(logId: string, feedback: "good" | "bad") {
  const feedbackMap = getStoredFeedback();
  feedbackMap[logId] = feedback;
  localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackMap));
}

export default function RecipeFooter() {
  const pathname = usePathname();
  const logId = pathname.split("/").pop();
  const [feedbackCounts, setFeedbackCounts] = useState({
    badCount: 0,
    goodCount: 0,
  });
  const [feedbackGiven, setFeedbackGiven] = useState<"good" | "bad" | null>(null);

  useEffect(() => {
    if (!logId) return;

    const feedbackMap = getStoredFeedback();
    const savedFeedback = feedbackMap[logId] ?? null;
    setFeedbackGiven(savedFeedback);

    getFeedbackCounts(logId).then((res) =>
      setFeedbackCounts({
        badCount: res.data.bad_count,
        goodCount: res.data.good_count,
      })
    );
  }, [logId]);

  const sendFeedback = async (newFeedback: "good" | "bad") => {
    if (!logId) return;

    const prevFeedback = feedbackGiven;

    // If same as previous, ignore
    if (prevFeedback === newFeedback) return;

    try {
      await giveFeedback(logId, newFeedback, feedbackGiven ?? undefined);

      // Update counts locally
      setFeedbackCounts((prev) => ({
        goodCount:
          prevFeedback === "good"
            ? prev.goodCount - 1 + (newFeedback === "good" ? 1 : 0)
            : prev.goodCount + (newFeedback === "good" ? 1 : 0),
        badCount:
          prevFeedback === "bad"
            ? prev.badCount - 1 + (newFeedback === "bad" ? 1 : 0)
            : prev.badCount + (newFeedback === "bad" ? 1 : 0),
      }));

      setFeedbackGiven(newFeedback);
      saveFeedbackToStorage(logId, newFeedback);
      toast.success("Feedback updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send feedback.");
    }
  };

  return (
    <footer className="flex items-center justify-between px-4 py-4 mt-6 border-t border-muted">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>Was this helpful?</span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => sendFeedback("good")}
            className={`size-8 hover:bg-green-100 rounded-full ${
              feedbackGiven === "good" ? "text-green-600" : "text-muted-foreground"
            }`}
          >
            <ThumbsUp className="size-4" />
          </Button>
          <span className="text-xs">{feedbackCounts.goodCount}</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => sendFeedback("bad")}
            className={`size-8 hover:bg-red-200 rounded-full ${
              feedbackGiven === "bad" ? "text-red-600" : "text-muted-foreground"
            }`}
          >
            <ThumbsDown className="size-4" />
          </Button>
          <span className="text-xs">{feedbackCounts.badCount}</span>
        </div>
      </div>

      <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary">
        <Bookmark className="mr-1.5 size-4" />
        Save Recipe
      </Button>
    </footer>
  );
}
