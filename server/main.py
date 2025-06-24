from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.recipe import router as recipe_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://rulkimi.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recipe_router)