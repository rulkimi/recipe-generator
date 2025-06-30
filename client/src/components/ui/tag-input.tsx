"use client";

import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onCtrlEnter?: () => void;
}

export function TagInput({ value, onChange, placeholder, className, disabled, onCtrlEnter }: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onCtrlEnter && e.ctrlKey && e.key === "Enter") {
      onCtrlEnter();
    }
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInput("");
    }

  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow]",
        "focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:border-ring",
        "dark:bg-input/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "flex h-auto min-h-[2.25rem] w-full text-base outline-none",
        "md:text-sm",
        disabled && "pointer-events-none opacity-50 cursor-not-allowed",
        className
      )}
    >
      {value.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-1 hover:text-destructive"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <input
        type="text"
        disabled={disabled} 
        className={cn(
          "flex-grow bg-transparent text-base md:text-sm outline-none min-w-[120px]",
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          disabled && "pointer-events-none opacity-50 cursor-not-allowed"
        )}
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
