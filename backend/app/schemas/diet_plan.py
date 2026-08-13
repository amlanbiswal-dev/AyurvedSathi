from datetime import datetime

from pydantic import BaseModel


class DietPlanCreate(BaseModel):
    title: str
    content: str


class DietPlanResponse(BaseModel):
    id: int
    user_id: int
    title: str
    content: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }