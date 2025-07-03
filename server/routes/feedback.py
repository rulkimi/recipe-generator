from fastapi import APIRouter, Form, File, UploadFile, HTTPException, Body, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import List, Optional
import json
import io
from PIL import Image

from core.model import get_model
from core.prompt import build_prompt
from core.deps import get_db 

router = APIRouter()

@router.get("/feedback/{log_id}")
async def get_feedback_counts(log_id: str, db: AsyncSession = Depends(get_db)):
    try:
        query = text("""
            SELECT good_count, bad_count
            FROM recipe_feedback
            WHERE log_id = :log_id
            LIMIT 1
        """)
        result = await db.execute(query, {"log_id": log_id})
        row = result.fetchone()

        return {
            "status": "success",
            "data": {
                "good_count": row.good_count if row else 0,
                "bad_count": row.bad_count if row else 0
            }
        }

    except Exception as e:
        print(f"Error retrieving feedback counts for log {log_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/feedback/{log_id}")
async def update_feedback(
    log_id: str,
    feedback: str = Body(..., embed=True),
    previous_feedback: Optional[str] = Body(None, embed=True),
    db: AsyncSession = Depends(get_db)
):
    if feedback not in {"good", "bad"}:
        raise HTTPException(status_code=400, detail="Feedback must be 'good' or 'bad'.")

    try:
        log_check_query = text("SELECT id FROM recipe_logs WHERE id = :log_id")
        log_check = await db.execute(log_check_query, {"log_id": log_id})
        if not log_check.scalar():
            raise HTTPException(status_code=404, detail="Recipe log not found.")

        feedback_check_query = text("""
            SELECT good_count, bad_count
            FROM recipe_feedback
            WHERE log_id = :log_id
        """)
        feedback_result = await db.execute(feedback_check_query, {"log_id": log_id})
        feedback_row = feedback_result.fetchone()

        good_count = feedback_row.good_count if feedback_row else 0
        bad_count = feedback_row.bad_count if feedback_row else 0

        if feedback == previous_feedback:
            return {"status": "success", "message": "No change in feedback"}

        if feedback == "good":
            good_count += 1
            if previous_feedback == "bad":
                bad_count -= 1
        elif feedback == "bad":
            bad_count += 1
            if previous_feedback == "good":
                good_count -= 1

        good_count = max(good_count, 0)
        bad_count = max(bad_count, 0)

        if feedback_row:
            update_feedback_query = text("""
                UPDATE recipe_feedback
                SET good_count = :good_count,
                    bad_count = :bad_count
                WHERE log_id = :log_id
            """)
        else:
            update_feedback_query = text("""
                INSERT INTO recipe_feedback (log_id, good_count, bad_count)
                VALUES (:log_id, :good_count, :bad_count)
            """)

        await db.execute(update_feedback_query, {
            "log_id": log_id,
            "good_count": good_count,
            "bad_count": bad_count
        })

        await db.commit()

        return {
            "status": "success",
            "message": f"Feedback updated for log {log_id}"
        }

    except Exception as e:
        print(f"Error updating feedback for log {log_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
