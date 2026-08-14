from sqlalchemy.orm import Session

from app.models.health_profile import HealthProfile


def get_health_profile_by_user_id(
    db: Session,
    user_id: int,
):
    return (
        db.query(HealthProfile)
        .filter(HealthProfile.user_id == user_id)
        .first()
    )


def create_health_profile(
    db: Session,
    user_id: int,
    age: int | None = None,
    gender: str | None = None,
    height_cm: float | None = None,
    weight_kg: float | None = None,
    diet_preference: str | None = None,
    allergies: str | None = None,
    health_conditions: str | None = None,
):
    # Validate numeric fields
    if age is not None and (age < 0 or age > 120):
        raise ValueError("Invalid age")

    if height_cm is not None and (height_cm < 30 or height_cm > 300):
        raise ValueError("Invalid height")

    if weight_kg is not None and (weight_kg < 1 or weight_kg > 500):
        raise ValueError("Invalid weight")

    # Clean text inputs
    gender = gender.strip() if gender else None
    diet_preference = diet_preference.strip() if diet_preference else None
    allergies = allergies.strip() if allergies else None
    health_conditions = health_conditions.strip() if health_conditions else None

    health_profile = HealthProfile(
        user_id=user_id,
        age=age,
        gender=gender,
        height_cm=height_cm,
        weight_kg=weight_kg,
        diet_preference=diet_preference,
        allergies=allergies,
        health_conditions=health_conditions,
    )

    db.add(health_profile)
    db.commit()
    db.refresh(health_profile)

    return health_profile


def update_health_profile(
    db: Session,
    health_profile: HealthProfile,
    **updates,
):
    allowed_fields = {
        "age",
        "gender",
        "height_cm",
        "weight_kg",
        "diet_preference",
        "allergies",
        "health_conditions",
    }

    for field, value in updates.items():
        if field not in allowed_fields:
            continue

        if field == "age" and value is not None:
            if value < 0 or value > 120:
                raise ValueError("Invalid age")

        if field == "height_cm" and value is not None:
            if value < 30 or value > 300:
                raise ValueError("Invalid height")

        if field == "weight_kg" and value is not None:
            if value < 1 or value > 500:
                raise ValueError("Invalid weight")

        if isinstance(value, str):
            value = value.strip()

        setattr(health_profile, field, value)

    db.commit()
    db.refresh(health_profile)

    return health_profile