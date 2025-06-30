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

@router.get("/feedback/{log_id}")
def get_feedback_counts(log_id: str):
    try:
        existing_feedback = (
            supabase.table("recipe_feedback")
            .select("good_count", "bad_count")
            .eq("log_id", log_id)
            .maybe_single()
            .execute()
        )
        
        good_count = existing_feedback.data.get("good_count", 0) if existing_feedback and existing_feedback.data else 0
        bad_count = existing_feedback.data.get("bad_count", 0) if existing_feedback and existing_feedback.data else 0

        return {
          "status": "success",
          "data": {
            "good_count": good_count,
            "bad_count": bad_count
          }
        }

    except Exception as e:
        print(f"Error retrieving feedback counts for log {log_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/feedback/{log_id}")
def update_feedback(
    log_id: str,
    feedback: str = Body(..., embed=True),
    previous_feedback: Optional[str] = Body(None, embed=True)
):
    if feedback not in {"good", "bad"}:
        raise HTTPException(status_code=400, detail="Feedback must be 'good' or 'bad'.")

    try:
        log_result = (
            supabase
            .table("recipe_logs")
            .select("id")
            .eq("id", log_id)
            .single()
            .execute()
        )
        if not log_result.data:
            raise HTTPException(status_code=404, detail="Recipe log not found.")

        existing_feedback = (
            supabase
            .table("recipe_feedback")
            .select("good_count", "bad_count")
            .eq("log_id", log_id)
            .maybe_single()
            .execute()
        )

        good_count = existing_feedback.data.get("good_count", 0) if existing_feedback and existing_feedback.data else 0
        bad_count = existing_feedback.data.get("bad_count", 0) if existing_feedback and existing_feedback.data else 0

        if feedback == previous_feedback:
            return {"status": "success", "message": "No change in feedback"}

        # update counts
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

        if existing_feedback and existing_feedback.data:
            supabase.table("recipe_feedback").update({
                "good_count": good_count,
                "bad_count": bad_count
            }).eq("log_id", log_id).execute()
        else:
            supabase.table("recipe_feedback").insert({
                "log_id": log_id,
                "good_count": good_count,
                "bad_count": bad_count
            }).execute()

        result = (
            supabase
            .table("recipe_logs")
            .update({"feedback": feedback})
            .eq("id", log_id)
            .execute()
        )
        if not result.data:
            raise HTTPException(status_code=404, detail="Log entry not found.")

        return {
            "status": "success",
            "message": f"Feedback updated for log {log_id}"
        }

    except Exception as e:
        print(f"Error updating feedback for log {log_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")