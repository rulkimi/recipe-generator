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

from uuid import UUID

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
        UUID(log_id, version=4)
    except ValueError:
        return {
            "status": "not_found",
            "data": None,
            "message": "Invalid recipe ID format."
        }

    query = text("SELECT recipe, user_input FROM recipe_logs WHERE id = :log_id")
    try:
        result = await db.execute(query, {"log_id": log_id})
        row = result.fetchone()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if not row:
        return {
            "status": "not_found",
            "data": None,
            "message": "Recipe not found."
        }

    data = dict(row._mapping)

    return {
        "status": "success",
        "data": data
    }

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

@router.get("/discoveries")
async def get_discoveries(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    query: Optional[str] = None,
):
    try:
        offset = (page - 1) * limit
        filters = []
        params = {"limit": limit, "offset": offset}

        if query:
            filters.append("""
                (
                    -- match name or description when recipe is an object
                    recipe->>'name' ILIKE :q OR
                    recipe->>'description' ILIKE :q OR

                    -- match inside array only if it's an array
                    (
                        jsonb_typeof(recipe) = 'array' AND
                        EXISTS (
                            SELECT 1 FROM jsonb_array_elements(recipe) AS elem
                            WHERE elem->>'name' ILIKE :q OR elem->>'description' ILIKE :q
                        )
                    ) OR

                    -- match in type / language / user_input / dietary
                    rl.type ILIKE :q OR
                    rl.language ILIKE :q OR
                    rl.user_input ILIKE :q OR
                    EXISTS (
                        SELECT 1 FROM unnest(rl.dietary_restrictions) AS d
                        WHERE d ILIKE :q
                    )
                )
            """)
            params["q"] = f"%{query}%"

        where_clause = f"WHERE {' AND '.join(filters)}" if filters else ""

        # CTE to deduplicate by name, prioritizing higher good_count, then created_at
        query_sql = text(f"""
            WITH recipes_with_name AS (
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
                    COALESCE(rf.bad_count, 0) AS bad_count,
                    rl.created_at
                FROM recipe_logs rl
                LEFT JOIN recipe_feedback rf ON rl.id = rf.log_id
                {where_clause}
            ),
            ranked_recipes AS (
                SELECT *,
                    ROW_NUMBER() OVER (
                        PARTITION BY name
                        ORDER BY good_count DESC, created_at DESC
                    ) AS rn
                FROM recipes_with_name
            )
            SELECT
                name,
                description,
                id,
                type,
                user_input,
                language,
                dietary_restrictions,
                good_count,
                bad_count
            FROM ranked_recipes
            WHERE rn = 1
            ORDER BY good_count DESC, created_at DESC
            LIMIT :limit OFFSET :offset
        """)
        result = await db.execute(query_sql, params)
        items = result.fetchall()

        count_query = text(f"SELECT COUNT(*) FROM recipe_logs rl {where_clause}")
        total_result = await db.execute(count_query, params)
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

