"use client"

import { useEffect, useState } from "react"
import { Discovery } from "@/types"
import { Bookmark, ThumbsDown, ThumbsUp } from "lucide-react"
import { toast } from "sonner"

const STORAGE_KEY = "saved_recipes"

export default function DiscoveryHeader({
  item
}: {
  item: Discovery
}) {
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
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

  const handleToggleSave = () => {
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
      toast.success("Removed from saved discoveries", {
        description: `"${item.name}" has been unsaved.`,
      })
    } else {
      updated = [...saved, { id: item.id, name: item.name } as Discovery]
      setIsSaved(true)
      toast.success("Saved to discoveries", {
        description: `"${item.name}" has been saved.`,
      })
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return (
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleSave();
          }}
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
