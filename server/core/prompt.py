from typing import List, Optional

def build_prompt(
    query: str,
    lang: str,
    ingredients: Optional[list] = None,
    dietary: Optional[list] = None,
    notes: Optional[str] = None,
):
    prompt = f"""
You are a Malaysian masterchef skilled in local and global cuisine. Suggest recipes using ingredients easily found in Malaysian stores. Be detailed, clear, and helpful.

Additional Instructions: {notes or "None"}
"""

    if ingredients:
        ing_list = ", ".join(ingredients)
        prompt += f"""

Use only these ingredients: {ing_list}.
If more are needed, mark them with (suggested addition).
Return an array of recipes in JSON format.
"""

    if dietary:
        rules = {
            "Halal": "Use only Halal ingredients and methods.",
            "Vegetarian": "No meat or animal by-products.",
            "Vegan": "No animal products at all.",
            "Non-dairy": "Avoid all dairy ingredients.",
        }
        prompt += "\n" + "\n".join(rules[r] for r in dietary if r in rules)

    prompt += f"""

Reply in natural {lang}. Format strictly as:
{{
  "recipe": {{
    "name": "...",
    "ingredients": [{{ "name": "...", "amount": "..." }}],
    "steps": [{{ "description": "...", "tips": "..." }}],
    "suggested_pairings": [{{ "dish_name": "...", "description": "..." }}]
  }}
}}
"""

    if not ingredients:
        prompt += f"\n\nThe question is: {query}"

    return prompt
