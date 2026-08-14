from pathlib import Path
import os

from dotenv import load_dotenv


# Project root: AyurvedSathi/
BASE_DIR = Path(__file__).resolve().parents[3]

# Load the .env file from the project root
load_dotenv(BASE_DIR / ".env")


DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured")


SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not configured")


ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not configured")
GEMINI_MODEL = "gemini-3.5-flash"
