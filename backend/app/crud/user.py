from sqlalchemy.orm import Session

from app.models.user import User


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    email = email.strip().lower()
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 20):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(
    db: Session,
    email: str,
    password_hash: str,
):
    email = email.strip().lower()

    if get_user_by_email(db, email):
        raise ValueError("Email already exists")

    user = User(
        email=email,
        password_hash=password_hash,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user