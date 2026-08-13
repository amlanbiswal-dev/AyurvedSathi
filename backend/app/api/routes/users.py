from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.crud.user import create_user, get_user_by_email
from app.db.database import get_db
from app.schemas.user import UserCreate, UserResponse


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(
        db,
        user_data.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists",
        )

    password_hash = hash_password(
        user_data.password,
    )

    user = create_user(
        db=db,
        email=user_data.email,
        password_hash=password_hash,
    )

    return user