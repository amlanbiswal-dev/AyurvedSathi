from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.crud.conversation import get_conversation_by_id
from app.crud.health_profile import get_health_profile_by_user_id
from app.crud.message import (
    create_message,
    get_conversation_messages,
)
from app.db.database import get_db
from app.schemas.message import MessageCreate, MessageResponse
from app.services.ai_service import generate_ai_response


router = APIRouter(
    prefix="/conversations/{conversation_id}/messages",
    tags=["Messages"],
)


def get_owned_conversation(
    db: Session,
    conversation_id: int,
    user_id: int,
):
    conversation = get_conversation_by_id(
        db,
        conversation_id,
    )

    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found",
        )

    if conversation.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this conversation",
        )

    return conversation


@router.post(
    "/",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def send_message(
    conversation_id: int,
    message_data: MessageCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    get_owned_conversation(
        db=db,
        conversation_id=conversation_id,
        user_id=current_user.id,
    )

    user_message = create_message(
        db=db,
        conversation_id=conversation_id,
        role="user",
        content=message_data.content,
    )

    previous_messages = get_conversation_messages(
        db=db,
        conversation_id=conversation_id,
    )

    conversation_history = [
        {
            "role": message.role,
            "content": message.content,
        }
        for message in previous_messages
        if message.id != user_message.id
    ]

    health_profile = get_health_profile_by_user_id(
        db=db,
        user_id=current_user.id,
    )

    health_profile_data = None

    if health_profile:
        health_profile_data = {
            "age": health_profile.age,
            "gender": health_profile.gender,
            "height_cm": health_profile.height_cm,
            "weight_kg": health_profile.weight_kg,
            "diet_preference": health_profile.diet_preference,
            "allergies": health_profile.allergies,
            "health_conditions": health_profile.health_conditions,
        }

    try:
        ai_response = generate_ai_response(
            user_message=message_data.content,
            conversation_history=conversation_history,
            health_profile=health_profile_data,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to generate AI response",
        )

    assistant_message = create_message(
        db=db,
        conversation_id=conversation_id,
        role="assistant",
        content=ai_response,
    )

    return assistant_message


@router.get(
    "/",
    response_model=list[MessageResponse],
)
def get_messages(
    conversation_id: int,
    skip: int = Query(
        default=0,
        ge=0,
    ),
    limit: int = Query(
        default=50,
        ge=1,
        le=100,
    ),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    get_owned_conversation(
        db=db,
        conversation_id=conversation_id,
        user_id=current_user.id,
    )

    return get_conversation_messages(
        db=db,
        conversation_id=conversation_id,
        skip=skip,
        limit=limit,
    )