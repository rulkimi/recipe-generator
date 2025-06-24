# --- app/routes/recipe.py ---
from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from typing import List, Optional
import json
import io
from PIL import Image

from core.model import get_model
from core.prompt import build_prompt

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
        prompt = build_prompt(question, language, None, dietary_restrictions, additional_instructions)
        response = model.generate_content(prompt)
        return {"status": "success", "data": json.loads(response.text)}
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
        prompt = build_prompt("", language, ingredients, dietary_restrictions, additional_instructions)
        response = model.generate_content(prompt)
        return {"status": "success", "data": json.loads(response.text)}
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

        prompt = build_prompt(food_name, language, None, dietary_restrictions, additional_instructions)
        recipe_response = model.generate_content(prompt)
        return {"status": "success", "data": json.loads(recipe_response.text)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))