import logging
import time

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.jwt import create_access_token
from app.core.security import verify_password
from app.crud.user import get_user_by_email
from app.db.database import get_db
from app.schemas.auth import LoginRequest, TokenResponse


logger = logging.getLogger(__name__)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    # Normalize email
    email = login_data.email.strip().lower()

    user = get_user_by_email(
        db,
        email,
    )

    # User doesn't exist
    if not user:
        logger.warning(
            "Failed login attempt for email: %s",
            email,
        )

        time.sleep(0.5)

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Wrong password
    if not verify_password(
        login_data.password,
        user.password_hash,
    ):
        logger.warning(
            "Invalid password for email: %s",
            email,
        )

        time.sleep(0.5)

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Optional account status check
    if hasattr(user, "is_active") and not user.is_active:
        logger.warning(
            "Disabled account login attempt: %s",
            email,
        )

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account disabled",
        )

    logger.info(
        "Successful login: %s",
        email,
    )

    access_token = create_access_token(
        {
            "sub": str(user.id)
        }
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
    )