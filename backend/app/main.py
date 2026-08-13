from fastapi import FastAPI

app = FastAPI(
    title="AyurvedSathi API",
    description="Backend API for the AyurvedSathi platform",
    version="0.1.0",
)


@app.get("/")
async def root():
    return {
        "message": "AyurvedSathi API is running 🚀"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy"
    }