from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


from app.models import (
    User,
    HealthProfile,
    Conversation,
    Message,
    DietPlan,
    Recommendation,
)