import { LANGUAGE_OPTIONS, DIETARY_OPTIONS } from "@/lib/constants";

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Step {
  description: string;
  tips: string;
}

export interface SuggestedPairing {
  dish_name: string;
  description: string;
}

export interface Recipe {
  name: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  suggested_pairings: SuggestedPairing[];
}

export interface SearchResponse {
  data: {
    recipe: Recipe;
  };
  log_id: string;
  status: "success" | "failed" | "error";
}

export type SearchType = "name" | "ingredients" | "image";

export interface Discovery {
  name: string;
  id: string;
  type: SearchType;
  user_input: string;
  good_count: number;
  bad_count: number;
  description: string;
  language: ResponseLanguage;
  dietary_restrictions: DietaryRestriction[];
}

export type ResponseLanguage = typeof LANGUAGE_OPTIONS[number]['value'];
export type DietaryRestriction = typeof DIETARY_OPTIONS[number]['value'];