"use client";

import { getFeedbackCounts, giveFeedback } from "@/actions/feedback";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredFeedback, setStoredFeedback, type FeedbackType } from "@/lib/feedback-storage";
import { toast } from "sonner";

export default function Feedbacks() {
  const pathname = usePathname();
  const logId = pathname.split("/").pop();

  const [counts, setCounts] = useState({ good: 0, bad: 0 });
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [given, setGiven] = useState<FeedbackType>(null);

  // Fetch initial state and set the given value from local storage
  useEffect(() => {
    if (!logId) return;
    setLoading(true);
    getFeedbackCounts(logId)
      .then((res) => {
        setCounts({
          good: res.data.good_count,
          bad: res.data.bad_count,
        });
        setGiven(getStoredFeedback(logId));
      })
      .finally(() => setLoading(false));
  }, [logId]);

  const handleSend = async (type: "good" | "bad") => {
    if (pending || !logId) return;
    if (given === type) return;

    setPending(true);
    const prev: FeedbackType = given;

    // optimistic update
    setCounts((c) => ({
      good: c.good + (type === "good" ? 1 : 0) - (prev === "good" ? 1 : 0),
      bad: c.bad + (type === "bad" ? 1 : 0) - (prev === "bad" ? 1 : 0),
    }));
    setGiven(type);
    setStoredFeedback(logId, type);

    try {
      await giveFeedback(logId, type, prev ?? undefined);
      toast.success("Feedback updated!");
    } catch (e) {
      // rollback
      setCounts((c) => ({
        good: c.good - (type === "good" ? 1 : 0) + (prev === "good" ? 1 : 0),
        bad: c.bad - (type === "bad" ? 1 : 0) + (prev === "bad" ? 1 : 0),
      }));
      setGiven(prev ?? null);
      setStoredFeedback(logId, prev ?? null);
      toast.error("Failed to send feedback.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span>Was this helpful?</span>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSend("good")}
          disabled={pending || loading}
          className={`size-8 hover:bg-green-100 rounded-full ${
            given === "good" ? "text-green-600" : "text-muted-foreground"
          }`}
        >
          <ThumbsUp className="size-4" />
        </Button>
        <span className="text-xs">{counts.good}</span>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSend("bad")}
          disabled={pending || loading}
          className={`size-8 hover:bg-red-200 rounded-full ${
            given === "bad" ? "text-red-600" : "text-muted-foreground"
          }`}
        >
          <ThumbsDown className="size-4" />
        </Button>
        <span className="text-xs">{counts.bad}</span>
      </div>
    </div>
  );
}
