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