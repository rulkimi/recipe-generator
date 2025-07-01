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