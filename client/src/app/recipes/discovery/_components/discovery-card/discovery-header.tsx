"use client"

import { useEffect, useState } from "react"
import { Discovery } from "@/types"
import { Bookmark, ThumbsDown, ThumbsUp } from "lucide-react"
import { toast } from "sonner"
import { useFeedback } from "@/hooks/use-feedback"

const STORAGE_KEY = "saved_recipes"

export default function DiscoveryHeader({
  item
}: {
  item: Discovery
}) {
  const [isSaved, setIsSaved] = useState(false)

  // Use custom feedback hook
  const feedback = useFeedback(item.good_count, item.bad_count, item.id)

  useEffect(() => {
    // Saved logic
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const saved: Discovery[] = JSON.parse(stored)
        setIsSaved(saved.some((c) => c.id === item.id))
      } catch (e) {
        console.error("Invalid saved discovery format")
      }
    }
  }, [item.id])

  const handleToggleSave = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const stored = localStorage.getItem(STORAGE_KEY)
    let saved: Discovery[] = []

    try {
      saved = stored ? JSON.parse(stored) : []
    } catch (e) {
      console.error("Error parsing saved discoveries")
    }

    let updated: Discovery[]
    if (isSaved) {
      updated = saved.filter((c) => c.id !== item.id)
      setIsSaved(false)
      toast.success("Removed from saved discoveries")
    } else {
      updated = [...saved, { id: item.id, name: item.name } as Discovery]
      setIsSaved(true)
      toast.success("Saved to discoveries")
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const handleSendFeedback = async (type: "good" | "bad", e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    if (feedback.pending) return
    if (feedback.given === type) return
    try {
      await feedback.send(type)
      toast.success("Feedback updated!")
    } catch {
      toast.error("Failed to send feedback.")
    }
  }

  return (
    <div className="flex justify-between items-start gap-2">
      <h3 className="text-base font-semibold text-primary">{item.name}</h3>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <button
          onClick={(e) => handleSendFeedback("good", e)}
          disabled={feedback.pending}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted border border-border flex-shrink-0 min-w-[40px] justify-center transition-colors ${feedback.given === "good" ? "text-green-600 bg-green-100" : "text-muted-foreground hover:bg-green-50"}`}
          aria-label="Like discovery"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          {feedback.counts.good}
        </button>

        <button
          onClick={(e) => handleSendFeedback("bad", e)}
          disabled={feedback.pending}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted border border-border flex-shrink-0 min-w-[40px] justify-center transition-colors ${feedback.given === "bad" ? "text-red-600 bg-red-200" : "text-muted-foreground hover:bg-red-50"}`}
          aria-label="Dislike discovery"
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          {feedback.counts.bad}
        </button>

        <button
          onClick={handleToggleSave}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label={isSaved ? "Unsave discovery" : "Save discovery"}
        >
          <Bookmark
            className={`size-5 cursor-pointer active:scale-125 transition-transform duration-300 ${isSaved ? "fill-primary" : ""}`}
          />
        </button>
      </div>
    </div>
  )
}
