from fastapi import FastAPI

from app.api.routes import (
    auth,
    conversations,
    health,
    health_profile,
    messages,
    users,
)


app = FastAPI(
    title="AyurvedSathi API",
    description="Backend API for the AyurvedSathi platform",
    version="0.1.0",
)

app.include_router(auth.router)
app.include_router(health.router)
app.include_router(users.router)
app.include_router(health_profile.router)
app.include_router(conversations.router)
app.include_router(messages.router)


@app.get("/")
async def root():
    return {
        "message": "AyurvedSathi API is running 🚀"
    }