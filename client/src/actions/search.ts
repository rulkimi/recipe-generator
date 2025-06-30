"use server"

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
    formData.append("dietary_restrictions", JSON.stringify(dietaryRestrictions));
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