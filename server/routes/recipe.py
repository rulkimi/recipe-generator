from fastapi import APIRouter, Form, File, UploadFile, HTTPException, Body, Depends, Query
from typing import List, Optional
import json
import io
import random
from PIL import Image

from core.model import get_model
from core.prompt import build_prompt

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from core.deps import get_db

router = APIRouter()

@router.get("/")
def home():
    return {"message": "Welcome to Recipe Generator"}

@router.post("/generate")
async def generate(
    question: str = Form(...),
    additional_instructions: Optional[str] = Form(""),
    dietary_restrictions: List[str] = Form([]),
    language: str = Form("Bahasa Melayu"),
    db: AsyncSession = Depends(get_db)
):
    try:
        model = get_model()
        prompt = build_prompt(question, language, None, dietary_restrictions, additional_instructions)
        response = model.generate_content(prompt)
        parsed = json.loads(response.text)

        insert_query = text("""
            INSERT INTO recipe_logs (
                user_input,
                type,
                recipe,
                language,
                dietary_restrictions,
                additional_instructions
            )
            VALUES (
                :user_input,
                :type,
                :recipe,
                :language,
                :dietary_restrictions,
                :additional_instructions
            )
            RETURNING id
        """)

        result = await db.execute(insert_query, {
            "user_input": question,
            "type": "name",
            "recipe": json.dumps(parsed),  
            "language": language,
            "dietary_restrictions": dietary_restrictions, 
            "additional_instructions": ""
        })

        log_id = result.scalar()
        await db.commit()

        return {
            "status": "success",
            "log_id": log_id,
            "data": parsed
        }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate_by_ingredients")
async def generate_by_ingredients(
    ingredients: List[str] = Form(...),
    additional_instructions: Optional[str] = Form(""),
    dietary_restrictions: List[str] = Form([]),
    language: str = Form("malay"),
    db: AsyncSession = Depends(get_db) 
):
    try:
        model = get_model()
        prompt = build_prompt("", language, ingredients, dietary_restrictions, additional_instructions)
        response = model.generate_content(prompt)
        parsed = json.loads(response.text)

        insert_query = text("""
            INSERT INTO recipe_logs (
                user_input,
                type,
                recipe,
                language,
                dietary_restrictions,
                additional_instructions
            )
            VALUES (
                :user_input,
                :type,
                :recipe,
                :language,
                :dietary_restrictions,
                :additional_instructions
            )
            RETURNING id
        """)

        result = await db.execute(insert_query, {
            "user_input": ", ".join(ingredients),
            "type": "ingredients",
            "recipe": json.dumps(parsed),
            "language": language,
            "dietary_restrictions": dietary_restrictions,
            "additional_instructions": ""
        })

        log_id = result.scalar()
        await db.commit()

        return {
            "status": "success",
            "log_id": log_id,
            "data": parsed
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload_image")
async def generate_from_image(
    file: UploadFile = File(...),
    additional_instructions: Optional[str] = Form(""),
    dietary_restrictions: List[str] = Form([]),
    language: str = Form("malay"),
    db: AsyncSession = Depends(get_db)
):
    try:
        model = get_model()
        image = Image.open(io.BytesIO(file.file.read()))

        identify_prompt = """You are an expert in food identification. 
        What food is shown in this image?

        Respond in the following JSON format only:

        {
          "food_name": "..."
        }
        """
        id_response = model.generate_content([identify_prompt, image])
        parsed_id_response = json.loads(id_response.text)
        food_name = parsed_id_response["food_name"]

        prompt = build_prompt(food_name, language, None, dietary_restrictions, additional_instructions)
        recipe_response = model.generate_content(prompt)
        parsed = json.loads(recipe_response.text)

        insert_query = text("""
            INSERT INTO recipe_logs (
                user_input,
                type,
                recipe,
                language,
                dietary_restrictions,
                additional_instructions
            )
            VALUES (
                :user_input,
                :type,
                :recipe,
                :language,
                :dietary_restrictions,
                :additional_instructions
            )
            RETURNING id
        """)

        result = await db.execute(insert_query, {
            "user_input": food_name,
            "type": "image",
            "recipe": json.dumps(parsed),
            "language": language,
            "dietary_restrictions": dietary_restrictions,
            "additional_instructions": additional_instructions
        })

        log_id = result.scalar()
        await db.commit()

        return {
            "status": "success",
            "log_id": log_id,
            "data": parsed
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/recipe/{log_id}")
async def get_recipe_by_id(log_id: str, db: AsyncSession = Depends(get_db)):
    try:
        query = text("SELECT recipe, user_input FROM recipe_logs WHERE id = :log_id")
        result = await db.execute(query, {"log_id": log_id})
        row = result.fetchone()

        if not row:
            raise HTTPException(status_code=404, detail="Recipe not found.")

        data = dict(row._mapping)

        return {
            "status": "success",
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/random-recipe")
async def get_random_recipe(db: AsyncSession = Depends(get_db)):
    try:
        query = f"SELECT id FROM recipe_logs LIMIT 100"
        # result = supabase.table("recipe_logs").select("id").execute()
        result = await db.execute(text(query))
        rows = result.fetchall()

        if not rows:
            raise HTTPException(status_code=404, detail="No recipes found")

        ids = [row[0] for row in rows]
        random_id = random.choice(ids)

        return random_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/collections")
async def get_collections(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    try:
        offset = (page - 1) * limit

        query = text(f"""
            SELECT
                CASE
                    WHEN jsonb_typeof(recipe) = 'array'
                        THEN (
                            SELECT string_agg(elem->>'name', ', ')
                            FROM jsonb_array_elements(recipe) AS elem
                        )
                    ELSE recipe->>'name'
                END AS name,
                CASE
                    WHEN jsonb_typeof(recipe) = 'array'
                        THEN (
                            SELECT string_agg(elem->>'description', ' ')
                            FROM jsonb_array_elements(recipe) AS elem
                        )
                    ELSE recipe->>'description'
                END AS description,
                rl.id,
                rl.type,
                rl.user_input,
                rl.language,
                rl.dietary_restrictions,
                COALESCE(rf.good_count, 0) AS good_count,
                COALESCE(rf.bad_count, 0) AS bad_count
            FROM recipe_logs rl
            LEFT JOIN recipe_feedback rf ON rl.id = rf.log_id
            ORDER BY rl.created_at DESC
            LIMIT :limit OFFSET :offset
        """)
        result = await db.execute(query, {"limit": limit, "offset": offset})
        items = result.fetchall()

        count_query = text("SELECT COUNT(*) FROM recipe_logs")
        total_result = await db.execute(count_query)
        total = total_result.scalar()

        return {
            "data": [dict(row._mapping) for row in items],
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": (total + limit - 1) // limit
        }
    except Exception as e:
        return {"error": str(e)}
