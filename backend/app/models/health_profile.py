from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class HealthProfile(Base):
    __tablename__ = "health_profiles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )

    age: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    gender: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    height_cm: Mapped[float | None] = mapped_column(
        nullable=True,
    )

    weight_kg: Mapped[float | None] = mapped_column(
        nullable=True,
    )

    diet_preference: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    allergies: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    health_conditions: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )