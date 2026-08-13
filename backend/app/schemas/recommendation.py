from datetime import datetime

from pydantic import BaseModel


class RecommendationCreate(BaseModel):
    type: str
    content: str


class RecommendationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    content: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }