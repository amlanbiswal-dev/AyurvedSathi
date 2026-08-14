from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.crud.diet_plan import (
    create_diet_plan,
    delete_diet_plan,
    get_diet_plan_by_id,
    get_user_diet_plans,
)
from app.db.database import get_db
from app.schemas.diet_plan import (
    DietPlanCreate,
    DietPlanResponse,
)


router = APIRouter(
    prefix="/diet-plans",
    tags=["Diet Plans"],
)


@router.post(
    "/",
    response_model=DietPlanResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_my_diet_plan(
    diet_plan_data: DietPlanCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return create_diet_plan(
        db=db,
        user_id=current_user.id,
        title=diet_plan_data.title,
        content=diet_plan_data.content,
    )


@router.get(
    "/",
    response_model=list[DietPlanResponse],
)
def get_my_diet_plans(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_user_diet_plans(
        db=db,
        user_id=current_user.id,
    )


@router.get(
    "/{diet_plan_id}",
    response_model=DietPlanResponse,
)
def get_my_diet_plan(
    diet_plan_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    diet_plan = get_diet_plan_by_id(
        db=db,
        diet_plan_id=diet_plan_id,
    )

    if not diet_plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Diet plan not found",
        )

    if diet_plan.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this diet plan",
        )

    return diet_plan


@router.delete(
    "/{diet_plan_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_my_diet_plan(
    diet_plan_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    diet_plan = get_diet_plan_by_id(
        db=db,
        diet_plan_id=diet_plan_id,
    )

    if not diet_plan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Diet plan not found",
        )

    if diet_plan.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this diet plan",
        )

    delete_diet_plan(
        db=db,
        diet_plan=diet_plan,
    )

    return None
