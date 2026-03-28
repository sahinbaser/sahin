import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL", "")
key: str = os.environ.get("SUPABASE_KEY", "")

# If keys are missing, we should handle it gracefully in the service layer
supabase: Client = None
if url and key:
    supabase = create_client(url, key)
else:
    print("Warning: Supabase keys are missing. Portfolio features will be limited.")
