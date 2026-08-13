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
    for field, value in updates.items():
        if hasattr(health_profile, field):
            setattr(health_profile, field, value)

    db.commit()
    db.refresh(health_profile)

    return health_profile