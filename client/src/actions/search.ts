"use server"

import { Collection } from "@/types";
import { Buffer } from "buffer";

export const searchRecipe = async (dishName: string, {
  dietaryRestrictions,
  responseLanguage
}: {
  dietaryRestrictions: string[];
  responseLanguage: string;
}) => {
	try {
		const url = `${process.env.API_URL}/generate`;

		const formData = new FormData();
		formData.append("question", dishName);
		formData.append("additional_instructions", "");
		dietaryRestrictions.forEach((restriction) => {
      formData.append("dietary_restrictions", restriction);
    });
		formData.append("language", responseLanguage);

		const response = await fetch(url, {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const searchRecipeByIngredients = async (
  ingredients: string[],
  {
    dietaryRestrictions,
    responseLanguage,
  }: {
    dietaryRestrictions: string[];
    responseLanguage: string;
  }
) => {
  try {
    const url = `${process.env.API_URL}/generate_by_ingredients`;

    const formData = new FormData();
    formData.append("ingredients", JSON.stringify(ingredients));
    dietaryRestrictions.forEach((restriction) => {
      formData.append("dietary_restrictions", restriction);
    });
    formData.append("additional_instructions", "");
    formData.append("language", responseLanguage);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch recipe by ingredients:", error);
    throw error;
  }
};


export const getRecipeById = async (logId: string) => {
	try {
		const url = `${process.env.API_URL}/recipe/${logId}`;
		const response = await fetch(url, {
			method: 'GET'
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const getRandomRecipe = async () => {
  try {
		const url = `${process.env.API_URL}/random-recipe`;
		const response = await fetch(url, {
			method: 'GET'
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const searchByImage = async (
  base64: string,
  {
    dietaryRestrictions,
    responseLanguage,
    filename,
  }: {
    dietaryRestrictions: string[];
    responseLanguage: string;
    filename: string;
  }
) => {
  try {
    const base64Data = base64.split(",")[1]; // strip "data:image/jpeg;base64,..."
    const binary = Buffer.from(base64Data, "base64");

    const blob = new Blob([binary], { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", blob, filename);
    formData.append("additional_instructions", "");

    dietaryRestrictions.forEach((restriction) => {
      formData.append("dietary_restrictions", restriction);
    });

    formData.append("language", responseLanguage);

    const response = await fetch(`${process.env.API_URL}/upload_image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("searchByImage error:", error);
    throw error;
  }
};

export const getCollections = async ({
  page = 1,
  limit = 10
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const url = new URL(`${process.env.API_URL}/collections`);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", limit.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data as {
      data: Collection[]
    };
  } catch (error) {
    console.error("getCollections error:", error);
    throw error;
  }
};