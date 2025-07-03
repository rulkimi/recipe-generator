from typing import List, Optional

def build_prompt(
    query: str,
    lang: str,
    type: str,
    ingredients: Optional[list] = None,
    dietary_restrictions: Optional[list] = None,
    additional_instructions: Optional[str] = None,
):
    prompt = f"""
You are a Masterchef skilled in local and global cuisine. Suggest recipes using ingredients easily found in stores at Malaysia. Be detailed, clear, and helpful.

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
    "description: "...",
    "ingredients": [{{ "name": "...", "amount": "..." }}],
    "steps": [{{ "description": "...", "tips": "..." }}],
    "suggested_pairings": [{{ "dish_name": "...", "description": "..." }}]
  }}
]
"""
    else:
        prompt += f"""

Answer this question: {query}
Return a **single** recipe in JSON format.

Format:
{{
  "name": "...",
  "description: "...",
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
