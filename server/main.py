import os
import io
import json
from PIL import Image
from fastapi import FastAPI, HTTPException, File, UploadFile, Depends, Query, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
from typing import List, Optional

load_dotenv()

app = FastAPI()

origins = ["http://localhost:5173", "https://rulkimi.github.io"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Request(BaseModel):
    additional_instructions: Optional[str] = None
    dietary_restrictions: Optional[List[str]] = None

class RequestWithIngredients(Request):
    ingredients: Optional[List[str]] = None

def configure_model():
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    return genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config={"response_mime_type": "application/json"},
    )

def format_prompt(
    question: str,
    language: str,
    recipe_request: Request
):
    prompt = f"""
    You are a masterchef in Malaysia specializing in local and international cuisine. You will respond to a question 
    regarding recipes, ingredients, and food preparation. The ingredients you suggest should be easily available in 
    Malaysian supermarkets. Please provide detailed and easy-to-follow instructions.

    {recipe_request.additional_instructions}
    """

    if isinstance(recipe_request, RequestWithIngredients) and recipe_request.ingredients:
        prompt += f"\n\n{format_ingredients_section(recipe_request.ingredients)}\n"

    prompt += f"\n{format_dietary_restrictions(recipe_request.dietary_restrictions)}\n"
    prompt += f"""
    Respond in natural {language}. Do not make it sound weird and robotic.

    You should only respond in the following JSON object (IMPORTANT! DO NOT RESPOND IN ANY OTHER FORMAT):
    {{
        "recipe": {{
            "name": "...",
            "ingredients": [
                {{ "name": "...", "amount": "..." }}
                // more ingredients
            ],
            "steps": [
                {{ "description": "...", "tips": "..." }},
                {{ "description": "...", "tips": "..." }}
                // more steps, tips/suggestions if any
            ],
            "suggested_pairings": [
                // only suggest if they are really GOOD pairings, if not, leave it an empty array
                {{ "dish_name": "...", "description": "..." }}
            ]
        }}
    }}
    """

    if not isinstance(recipe_request, RequestWithIngredients) or not recipe_request.ingredients:
        prompt += f"\n\nThe question is: {question}\n"

    return prompt

def format_ingredients_section(ingredients: list):
    if not ingredients:
        return ""
    ingredients_str = ", ".join(ingredients)
    return f"""
    Please provide a list of dishes that can be made with the following ingredients: {ingredients_str}.
    !!IMPORTANT!! Only use these ingredients. If an additional ingredient is needed, indicate it by adding (suggested addition) after the ingredient name.
    Return the recipes in an array of JSON objects in the following format:
    """

def format_dietary_restrictions(dietary_restrictions: list):
    restrictions_map = {
        "Halal": "Ensure that all ingredients and preparation methods comply with Halal dietary requirements.\n",
        "Vegetarian": "Ensure that all ingredients are vegetarian, and no meat or animal by-products are used.\n",
        "Vegan": "Ensure that all ingredients are vegan, and no animal products or by-products are used.\n",
        "Non-dairy": "Ensure that no dairy products are used in the recipe.\n",
    }
    return "".join([restrictions_map[restriction] for restriction in dietary_restrictions if restriction in restrictions_map])

@app.get("/")
async def root():
    return {"message": "Welcome to Recipe Generator"}

@app.post("/generate")
async def generate_recipe(
    question: str,
    additional_instructions: Optional[str] = Form(""),
    dietary_restrictions: Optional[list] = Form([]),
    language: str = "Bahasa Melayu"
):
    try:
        recipe_request = Request(
            additional_instructions=additional_instructions,
            dietary_restrictions=dietary_restrictions
        )
        model = configure_model()
        prompt = format_prompt(question, language, recipe_request)
        print(prompt)
        response = model.generate_content(prompt)
        recipe = json.loads(response.text)
        return {"status": "success", "message": "Recipe generated successfully", "data": recipe}
    except Exception as e:
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e), "data": None})

@app.post("/generate_by_ingredients")
async def generate_recipe_by_ingredients(
    ingredients: List[str] = Form([]),
    additional_instructions: Optional[str] = Form(""),
    dietary_restrictions: Optional[list] = Form([]),
    language: str = "Bahasa Melayu"
):
    try:
        recipe_request = RequestWithIngredients(
            additional_instructions=additional_instructions,
            dietary_restrictions=dietary_restrictions,
            ingredients=ingredients
        )
        model = configure_model()
        prompt = format_prompt("", language, recipe_request)
        print(prompt)
        response = model.generate_content(prompt)
        recipe = json.loads(response.text)
        return {"status": "success", "message": "Recipe generated successfully", "data": recipe}
    except Exception as e:
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e), "data": None})

@app.post("/upload_image/")
async def upload_image(
    file: UploadFile = File(...),
    additional_instructions: Optional[str] = Form(""),
    dietary_restrictions: Optional[list] = Form([]),
    language: str = "Bahasa Melayu"
):
    try:
        recipe_request = Request(
            additional_instructions=additional_instructions,
            dietary_restrictions=dietary_restrictions
        )
        image = Image.open(io.BytesIO(await file.read()))

        # Identify the food name
        model = configure_model()
        identification_prompt = "You are an expert in food identification. Please identify the food in this image."
        identification_response = model.generate_content([identification_prompt, image])
        food_name = identification_response.text.strip()

        # Generate recipe based on identified food
        prompt = format_prompt(food_name, language, recipe_request)
        response = model.generate_content(prompt)
        recipe = json.loads(response.text)

        return {"status": "success", "message": "Recipe generated successfully", "data": recipe}
    except Exception as e:
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e), "data": None})
