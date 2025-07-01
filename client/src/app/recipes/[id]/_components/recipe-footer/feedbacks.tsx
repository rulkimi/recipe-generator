"use client";

import { getFeedbackCounts, giveFeedback } from "@/actions/feedback";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";

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

export default function Feedbacks() {
  const pathname = usePathname();
  const logId = pathname.split("/").pop();
  const [feedbackCounts, setFeedbackCounts] = useState({ badCount: 0, goodCount: 0 });
  const [feedbackGiven, setFeedbackGiven] = useState<"good" | "bad" | null>(null);

  // track whether a request is in flight
  const [pending, setPending] = useState(false);
  const requestSeq = useRef(0);

  useEffect(() => {
    if (!logId) return;

    const feedbackMap = getStoredFeedback();
    setFeedbackGiven(feedbackMap[logId] ?? null);

    getFeedbackCounts(logId).then((res) =>
      setFeedbackCounts({
        badCount: res.data.bad_count,
        goodCount: res.data.good_count,
      })
    );
  }, [logId]);

  const sendFeedback = async (newFeedback: "good" | "bad") => {
    if (!logId || pending) return;

    // no-op if the user taps the same reaction twice
    if (feedbackGiven === newFeedback) return;

    setPending(true);
    const thisReqId = ++requestSeq.current;
    const prevFeedback = feedbackGiven;

    // optimistically update UI
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

    try {
      await giveFeedback(logId, newFeedback, prevFeedback ?? undefined);

      // only apply the “success” toast if this is still the latest request
      if (thisReqId === requestSeq.current) {
        toast.success("Feedback updated!");
      }
    } catch (error) {
      console.error(error);
      if (thisReqId === requestSeq.current) {
        setFeedbackCounts((prev) => ({
          goodCount:
            newFeedback === "good"
              ? prev.goodCount - 1 + (prevFeedback === "good" ? 1 : 0)
              : prev.goodCount,
          badCount:
            newFeedback === "bad"
              ? prev.badCount - 1 + (prevFeedback === "bad" ? 1 : 0)
              : prev.badCount,
        }));
        setFeedbackGiven(prevFeedback);
        toast.error("Failed to send feedback.");
      }
    } finally {
      // only clear pending if this was the latest request
      if (thisReqId === requestSeq.current) {
        setPending(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span>Was this helpful?</span>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => sendFeedback("good")}
          disabled={pending}
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
          disabled={pending}
          className={`size-8 hover:bg-red-200 rounded-full ${
            feedbackGiven === "bad" ? "text-red-600" : "text-muted-foreground"
          }`}
        >
          <ThumbsDown className="size-4" />
        </Button>
        <span className="text-xs">{feedbackCounts.badCount}</span>
      </div>
    </div>
  );
}
