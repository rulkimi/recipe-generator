import google.generativeai as genai
from dotenv import load_dotenv
import PIL.Image
import os
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import io

load_dotenv()

app = FastAPI()

origins = [
  "http://localhost:5173",
  "https://rulkimi.github.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

class RecipeRequest(BaseModel):
    question: str
    additional_instructions: str

def get_model():
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
    config={"response_mime_type": "application/json"}
    model = genai.GenerativeModel(model_name="gemini-1.5-flash", generation_config=config)
    return model

def get_prompt(question: str, language: str, additional_instructions: str = ""):
    prompt = f"""
        You are a masterchef in Malaysia specializing in local and international cuisine. You will respond to a question 
        regarding recipes, ingredients, and food preparation. The ingredients you suggest should be easily available in 
        Malaysian supermarkets. Please provide detailed and easy-to-follow instructions.

        {additional_instructions}

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
                    // only suggest if they are really GOOD pairings, if not, left it an empty array
                    {{ "dish_name": "...", "description": "..." }}
                ]
            }}
        }}

        The question is: {question}
    """
    return prompt

@app.get("/")
async def root():
    return {"message": "Welcome to Recipe Generator"}

@app.post("/generate")
async def generate_recipe(recipe_request: RecipeRequest, language: str = "Bahasa Melayu"):
    try:
        model = get_model()
        prompt = get_prompt(recipe_request.question, language, recipe_request.additional_instructions)
        response = model.generate_content(prompt)
        recipe = json.loads(response.text)
        return {"status": "success", "message": "Recipe generated successfully", "data": recipe}
    except Exception as e:
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e), "data": None})

@app.post("/upload_image/")
async def upload_image(file: UploadFile = File(...), language: str = "Bahasa Melayu", additional_instructions: str = ""):
    try:
        image = PIL.Image.open(io.BytesIO(await file.read()))

        # identify the food name
        model = get_model()
        identification_prompt = f"""
            You are an expert in food identification across all over the world. Please identify the food in this image. Just tell the name of the food
        """
        identification_response = model.generate_content([identification_prompt, image])
        food_name = identification_response.text.strip()

        # generate recipe based on identified food
        question = food_name
        prompt = get_prompt(question, language, additional_instructions)
        response = model.generate_content(prompt)
        print(response.text)
        recipe = json.loads(response.text)
        
        return {"status": "success", "message": "Recipe generated successfully", "data": recipe}
    except Exception as e:
        raise HTTPException(status_code=500, detail={"status": "error", "message": str(e), "data": None})
