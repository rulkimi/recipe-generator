import os
from supabase import create_client, Client

def create_supabase_client():
    url: str = os.getenv("SUPABASE_URL")
    key: str = os.getenv("SUPABASE_KEY")
    supabase: Client = create_client(url, key)
    return supabase

supabase: Client = create_supabase_client()