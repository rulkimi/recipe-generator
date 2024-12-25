import axios from "axios";

export interface Ingredient {
  name: string;
  amount: number;
}

export interface Recipe {
  name: string;
  ingredients: Ingredient[];
  steps: Array<{
    description: string;
    tips?: string;
  }>;
  suggested_pairings?: Array<{
    dish_name: string;
    description: string;
  }>;
}

export interface RecipeResponse {
  data: {
    recipe: Recipe
  }
  message: string
  status: string
}

export interface Payload {
  additional_instructions?: string;
  dietary_restrictions?: string[];
}

export interface Params {
  question: string;
  language?: string; 
}

const useRecipeGenerator = () => {
  const generateRecipe = async (payload: Payload, params: Params) => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/generate', payload, { params });
      return response.data as RecipeResponse;
    } catch (error) {
      console.error("Error fetching the recipe data:", error);
      throw error;
    }
  };

  return { generateRecipe };
};

export default useRecipeGenerator;
