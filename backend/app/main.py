from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.api.routes import (
    auth,
    conversations,
    diet_plans,
    health,
    health_profile,
    messages,
    recommendations,
    users,
)


app = FastAPI(
    title="AyurvedSathi API",
    description="Backend API for the AyurvedSathi platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# Allow only the frontend origin
origins = [
    "http://localhost:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PUT",
        "DELETE",
    ],
    allow_headers=["*"],
)


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)

        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = (
            "geolocation=(), microphone=(), camera=()"
        )

        return response


app.add_middleware(SecurityHeadersMiddleware)


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"},
    )


app.include_router(auth.router)
app.include_router(health.router)
app.include_router(users.router)
app.include_router(health_profile.router)
app.include_router(conversations.router)
app.include_router(messages.router)
app.include_router(diet_plans.router)
app.include_router(recommendations.router)


@app.get("/")
async def root():
    return {
        "message": "AyurvedSathi API is running"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy"
    }