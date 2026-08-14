from sqlalchemy import text
from app.db.database import engine
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        logger.info("Database connection successful!")
        logger.info("Result: %s", result.scalar())

except Exception:
    logger.exception("Database connection failed.")
    raise RuntimeError("Unable to connect to the database.")