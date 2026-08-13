from sqlalchemy.orm import Session

from app.models.recommendation import Recommendation


def get_recommendation_by_id(
    db: Session,
    recommendation_id: int,
):
    return (
        db.query(Recommendation)
        .filter(Recommendation.id == recommendation_id)
        .first()
    )


def get_user_recommendations(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 100,
):
    return (
        db.query(Recommendation)
        .filter(Recommendation.user_id == user_id)
        .order_by(Recommendation.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_recommendation(
    db: Session,
    user_id: int,
    recommendation_type: str,
    content: str,
):
    recommendation = Recommendation(
        user_id=user_id,
        type=recommendation_type,
        content=content,
    )

    db.add(recommendation)
    db.commit()
    db.refresh(recommendation)

    return recommendation


def delete_recommendation(
    db: Session,
    recommendation: Recommendation,
):
    db.delete(recommendation)
    db.commit()