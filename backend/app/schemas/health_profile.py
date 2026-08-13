from datetime import datetime

from pydantic import BaseModel


class HealthProfileCreate(BaseModel):
    age: int | None = None
    gender: str | None = None
    height_cm: float | None = None
    weight_kg: float | None = None
    diet_preference: str | None = None
    allergies: str | None = None
    health_conditions: str | None = None


class HealthProfileUpdate(BaseModel):
    age: int | None = None
    gender: str | None = None
    height_cm: float | None = None
    weight_kg: float | None = None
    diet_preference: str | None = None
    allergies: str | None = None
    health_conditions: str | None = None


class HealthProfileResponse(BaseModel):
    id: int
    user_id: int
    age: int | None
    gender: str | None
    height_cm: float | None
    weight_kg: float | None
    diet_preference: str | None
    allergies: str | None
    health_conditions: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }