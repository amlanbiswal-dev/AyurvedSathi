from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.crud.recommendation import (
    create_recommendation,
    delete_recommendation,
    get_recommendation_by_id,
    get_user_recommendations,
)
from app.db.database import get_db
from app.schemas.recommendation import (
    RecommendationCreate,
    RecommendationResponse,
)


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)


@router.post(
    "/",
    response_model=RecommendationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_my_recommendation(
    recommendation_data: RecommendationCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return create_recommendation(
        db=db,
        user_id=current_user.id,
        recommendation_type=recommendation_data.type,
        content=recommendation_data.content,
    )


@router.get(
    "/",
    response_model=list[RecommendationResponse],
)
def get_my_recommendations(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_user_recommendations(
        db=db,
        user_id=current_user.id,
    )


@router.get(
    "/{recommendation_id}",
    response_model=RecommendationResponse,
)
def get_my_recommendation(
    recommendation_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    recommendation = get_recommendation_by_id(
        db=db,
        recommendation_id=recommendation_id,
    )

    if not recommendation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recommendation not found",
        )

    if recommendation.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this recommendation",
        )

    return recommendation


@router.delete(
    "/{recommendation_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_my_recommendation(
    recommendation_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    recommendation = get_recommendation_by_id(
        db=db,
        recommendation_id=recommendation_id,
    )

    if not recommendation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recommendation not found",
        )

    if recommendation.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this recommendation",
        )

    delete_recommendation(
        db=db,
        recommendation=recommendation,
    )

    return None
