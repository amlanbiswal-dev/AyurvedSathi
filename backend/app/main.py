from fastapi import FastAPI

from app.api.routes.health import router as health_router


app = FastAPI(
    title="AyurvedSathi API",
    description="Backend API for the AyurvedSathi platform",
    version="0.1.0",
)


app.include_router(health_router)


@app.get("/")
async def root():
    return {
        "message": "AyurvedSathi API is running 🚀"
    }