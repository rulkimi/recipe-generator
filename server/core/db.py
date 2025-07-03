import os
# from supabase import create_client, Client

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from dotenv import load_dotenv

# def create_supabase_client():
#     url: str = os.getenv("SUPABASE_URL")
#     key: str = os.getenv("SUPABASE_KEY")
#     supabase: Client = create_client(url, key)
#     return supabase

# supabase: Client = create_supabase_client()

DATABASE_URL = os.getenv("DATABASE_ASYNC_URL")

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()