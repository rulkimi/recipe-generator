# --- app/routes/recipe.py ---
from fastapi import APIRouter, Form, File, UploadFile, HTTPException, Body
from typing import List, Optional
import json
import io
import random
from PIL import Image

from core.model import get_model
from core.prompt import build_prompt
from core.db import supabase

router = APIRouter()

@router.get("/")
def home():
    return {"message": "Welcome to Recipe Generator"}

@router.post("/generate")
def generate(
    question: str = Form(...),
    additional_instructions: Optional[str] = Form(""),
    dietary_restrictions: List[str] = Form([]),
    language: str = Form("Bahasa Melayu")
):
    try:
        model = get_model()
        prompt = build_prompt(question, language, "name", None, dietary_restrictions, additional_instructions)
        response = model.generate_content(prompt)
        parsed = json.loads(response.text)

        print(prompt)
        result = supabase.table("recipe_logs").insert({
            "user_input": question,
            "type": "name",
            "recipe": parsed,
            "language": language,
            "dietary_restrictions": dietary_restrictions,
            "additional_instructions": additional_instructions,
            "feedback": None
        }).execute()

        log_id = result.data[0]["id"]
        print(prompt)

        return {
            "status": "success",
            "log_id": log_id,
            "data": parsed
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate_by_ingredients")
def generate_by_ingredients(
    ingredients: List[str] = Form(...),
    additional_instructions: Optional[str] = Form(""),
    dietary_restrictions: List[str] = Form([]),
    language: str = Form("Bahasa Melayu")
):
    try:
        model = get_model()
        prompt = build_prompt("", language, "ingredients", ingredients, dietary_restrictions, additional_instructions)
        response = model.generate_content(prompt)
        parsed = json.loads(response.text)

        result = supabase.table("recipe_logs").insert({
            "user_input": ", ".join(ingredients),
            "type": "ingredients",
            "recipe": parsed,
            "language": language,
            "dietary_restrictions": dietary_restrictions,
            "additional_instructions": additional_instructions,
            "feedback": None
        }).execute()

        log_id = result.data[0]["id"]

        return {
            "status": "success",
            "log_id": log_id,
            "data": parsed
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload_image")
def generate_from_image(
    file: UploadFile = File(...),
    additional_instructions: Optional[str] = Form(""),
    dietary_restrictions: List[str] = Form([]),
    language: str = Form("Bahasa Melayu")
):
    try:
        model = get_model()
        image = Image.open(io.BytesIO(file.file.read()))

        identify_prompt = "You are an expert in food identification. What food is shown in this image?"
        id_response = model.generate_content([identify_prompt, image])
        food_name = id_response.text.strip()

        prompt = build_prompt(food_name, language, None, "image", dietary_restrictions, additional_instructions)
        recipe_response = model.generate_content(prompt)
        parsed = json.loads(recipe_response.text)

        result = supabase.table("recipe_logs").insert({
            "user_input": food_name,
            "type": "image",
            "recipe": parsed,
            "language": language,
            "dietary_restrictions": dietary_restrictions,
            "additional_instructions": additional_instructions,
            "feedback": None
        }).execute()

        log_id = result.data[0]["id"]

        return {
            "status": "success",
            "log_id": log_id,
            "data": parsed
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/recipe/{log_id}")
def get_recipe_by_id(log_id: str):
	try:
		result = supabase.table("recipe_logs").select("recipe").eq("id", log_id).single().execute()
		if not result.data:
			raise HTTPException(status_code=404, detail="Recipe not found.")
		return {
			"status": "success",
			"data": result.data
		}
	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))

@router.get("/random-recipe")
def get_random_recipe():
    try:
        result = supabase.table("recipe_logs").select("id").execute()

        if not result.data:
            raise HTTPException(status_code=404, detail="No recipes found")

        random_id = random.choice(result.data)["id"]

        return random_id

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
