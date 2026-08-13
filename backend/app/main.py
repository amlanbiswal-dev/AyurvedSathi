from fastapi import FastAPI

from app.api.routes import health, users


app = FastAPI(
    title="AyurvedSathi API",
    description="Backend API for the AyurvedSathi platform",
    version="0.1.0",
)


app.include_router(health.router)
app.include_router(users.router)


@app.get("/")
async def root():
    return {
        "message": "AyurvedSathi API is running 🚀"
    }