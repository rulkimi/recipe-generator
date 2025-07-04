import { DietaryRestriction, ResponseLanguage } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DIETARY_OPTIONS, LANGUAGE_OPTIONS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDietaryRestriction = (value: DietaryRestriction) => {
  const option = DIETARY_OPTIONS.find((opt) => opt.value === value);
  return option?.label ?? value;
};

export const formatLanguage = (value: ResponseLanguage) => {
  const option = LANGUAGE_OPTIONS.find((opt) => opt.value === value);
  return option?.label ?? value;
};





