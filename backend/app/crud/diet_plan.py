from sqlalchemy.orm import Session

from app.models.diet_plan import DietPlan


def get_diet_plan_by_id(
    db: Session,
    diet_plan_id: int,
):
    return (
        db.query(DietPlan)
        .filter(DietPlan.id == diet_plan_id)
        .first()
    )


def get_user_diet_plans(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 20,
):
    return (
        db.query(DietPlan)
        .filter(DietPlan.user_id == user_id)
        .order_by(DietPlan.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_diet_plan(
    db: Session,
    user_id: int,
    title: str,
    content: str,
):
    title = title.strip()
    content = content.strip()

    if not title:
        raise ValueError("Title cannot be empty")

    if not content:
        raise ValueError("Content cannot be empty")

    if len(title) > 255:
        raise ValueError("Title is too long")

    if len(content) > 5000:
        raise ValueError("Content is too long")

    diet_plan = DietPlan(
        user_id=user_id,
        title=title,
        content=content,
    )

    db.add(diet_plan)
    db.commit()
    db.refresh(diet_plan)

    return diet_plan


def delete_diet_plan(
    db: Session,
    diet_plan: DietPlan,
):
    db.delete(diet_plan)
    db.commit()