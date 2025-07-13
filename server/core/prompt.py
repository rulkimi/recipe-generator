from typing import List, Optional

def build_prompt(
    query: str,
    lang: str,
    ingredients: Optional[list] = None,
    dietary_restrictions: Optional[list] = None,
    additional_instructions: Optional[str] = None,
):
    prompt = f"""
You are a Masterchef skilled in local and global cuisine. Your goal is to help users with valid cooking-related queries or real ingredients.

First, check if the input is valid and makes sense:
- If the query or ingredients are nonsensical, unrelated to food, or not real ingredients (e.g. "ashdasdasi" or made-up food), return the following JSON **exactly** and do not generate anything else:

{{
  "error": "Invalid input. Please enter a valid food-related query or ingredients."
}}

Only proceed if the input makes real-world culinary sense.

Additional Instructions: {additional_instructions or "None"}
"""

    if ingredients:
        ing_list = ", ".join(ingredients)
        prompt += f"""

Use only these ingredients: {ing_list}.
If more are needed, mark them with (suggested addition).
Return an **array** of recipes in JSON format.

Format:
recipe: [
  {{
    "name": "...",
    "description": "...",
    "ingredients": [{{ "name": "...", "amount": "..." }}],
    "steps": [{{ "description": "...", "tips": "..." }}],
    "suggested_pairings": [{{ "dish_name": "...", "description": "..." }}]
  }}
]
"""
    else:
        prompt += f"""

Answer this question: {query}
Return a **single** recipe in JSON format. Make sure to ONLY return SINGLE recipe.

Format:
{{
  "name": "...",
  "description": "...",
  "ingredients": [{{ "name": "...", "amount": "..." }}],
  "steps": [{{ "description": "...", "tips": "..." }}],
  "suggested_pairings": [{{ "dish_name": "...", "description": "..." }}]
}}
"""

    if dietary_restrictions:
        rules = {
            "halal": "Use only Halal ingredients and methods.",
            "vegetarian": "No meat or animal by-products.",
            "vegan": "No animal products at all.",
            "non-dairy": "Avoid all dairy ingredients.",
            "keto": "Low in carbs, high in healthy fats, moderate in protein. Avoid sugars and starches.",
            "gluten-free": "Avoid all sources of gluten, including wheat, barley, and rye.",
        }
        prompt += "\nDietary restrictions:\n" + "\n".join(
            rules[r] for r in dietary_restrictions if r in rules
        )

    prompt += f"\n\nRespond in natural {lang}."

    return prompt

