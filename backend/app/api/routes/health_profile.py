from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.crud.health_profile import (
    create_health_profile,
    get_health_profile_by_user_id,
    update_health_profile,
)
from app.db.database import get_db
from app.schemas.health_profile import (
    HealthProfileCreate,
    HealthProfileResponse,
    HealthProfileUpdate,
)


router = APIRouter(
    prefix="/health-profile",
    tags=["Health Profile"],
)


@router.get(
    "/",
    response_model=HealthProfileResponse,
)
def get_my_health_profile(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    health_profile = get_health_profile_by_user_id(
        db,
        current_user.id,
    )

    if not health_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health profile not found",
        )

    return health_profile


@router.post(
    "/",
    response_model=HealthProfileResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_my_health_profile(
    profile_data: HealthProfileCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_profile = get_health_profile_by_user_id(
        db,
        current_user.id,
    )

    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Health profile already exists",
        )

    health_profile = create_health_profile(
        db=db,
        user_id=current_user.id,
        age=profile_data.age,
        gender=profile_data.gender,
        height_cm=profile_data.height_cm,
        weight_kg=profile_data.weight_kg,
        diet_preference=profile_data.diet_preference,
        allergies=profile_data.allergies,
        health_conditions=profile_data.health_conditions,
    )

    return health_profile


@router.put(
    "/",
    response_model=HealthProfileResponse,
)
def update_my_health_profile(
    profile_data: HealthProfileUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    health_profile = get_health_profile_by_user_id(
        db,
        current_user.id,
    )

    if not health_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Health profile not found",
        )

    updates = profile_data.model_dump(
        exclude_unset=True,
    )

    health_profile = update_health_profile(
        db,
        health_profile,
        **updates,
    )

    return health_profile