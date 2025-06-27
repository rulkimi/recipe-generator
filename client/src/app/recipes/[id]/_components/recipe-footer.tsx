"use client"

import { giveFeedback } from "@/actions/feedback";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function RecipeFooter() {
  const pathname = usePathname();
  const logId = pathname.split('/').pop();
  const [feedbackGiven, setFeedbackGiven] = useState<"good" | "bad" | null>(null);

  const sendFeedback = async (feedback: "good" | "bad") => {
    if (!logId) return;

    try {
      await giveFeedback(logId, feedback);
      setFeedbackGiven(feedback);
      toast.success("Thanks for the feedback!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send feedback.");
    }
  };

  const activeColor = "text-green-500";
  const inactiveColor = "text-border hover:text-foreground";

  return (
    <footer className="flex justify-between">
      <div className="flex items-center gap-4 text-border">
        <span>Was this helpful?</span>
        <div className="flex items-center gap-4 cursor-pointer">
          <ThumbsUp
            className={`size-5 transition-colors ${feedbackGiven === "good" ? activeColor : inactiveColor}`}
            onClick={() => sendFeedback("good")}
          />
          <ThumbsDown
            className={`size-5 transition-colors ${feedbackGiven === "bad" ? "text-red-500" : inactiveColor}`}
            onClick={() => sendFeedback("bad")}
          />
        </div>
      </div>
      <Button variant="link" className="p-0">
        Save Recipe
      </Button>
    </footer>
  );
}
