from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class HealthProfileCreate(BaseModel):
    age: int | None = Field(
        default=None,
        ge=1,
        le=120,
    )

    gender: str | None = Field(
        default=None,
        max_length=50,
    )

    height_cm: float | None = Field(
        default=None,
        gt=0,
        le=300,
    )

    weight_kg: float | None = Field(
        default=None,
        gt=0,
        le=500,
    )

    diet_preference: str | None = Field(
        default=None,
        max_length=100,
    )

    allergies: str | None = None

    health_conditions: str | None = None

    @field_validator(
        "gender",
        "diet_preference",
        "allergies",
        "health_conditions",
        mode="before",
    )
    @classmethod
    def normalize_text(cls, value):
        if value is None:
            return None

        value = value.strip()

        return value if value else None


class HealthProfileUpdate(BaseModel):
    age: int | None = Field(
        default=None,
        ge=1,
        le=120,
    )

    gender: str | None = Field(
        default=None,
        max_length=50,
    )

    height_cm: float | None = Field(
        default=None,
        gt=0,
        le=300,
    )

    weight_kg: float | None = Field(
        default=None,
        gt=0,
        le=500,
    )

    diet_preference: str | None = Field(
        default=None,
        max_length=100,
    )

    allergies: str | None = None

    health_conditions: str | None = None

    @field_validator(
        "gender",
        "diet_preference",
        "allergies",
        "health_conditions",
        mode="before",
    )
    @classmethod
    def normalize_text(cls, value):
        if value is None:
            return None

        value = value.strip()

        return value if value else None


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

    model_config = ConfigDict(
        from_attributes=True,
    )