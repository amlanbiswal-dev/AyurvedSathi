from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.crud.conversation import (
    create_conversation,
    delete_conversation,
    get_conversation_by_id,
    get_user_conversations,
)
from app.db.database import get_db
from app.schemas.conversation import (
    ConversationCreate,
    ConversationResponse,
)


router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"],
)


@router.post(
    "/",
    response_model=ConversationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_my_conversation(
    conversation_data: ConversationCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = create_conversation(
        db=db,
        user_id=current_user.id,
        title=conversation_data.title,
    )

    return conversation


@router.get(
    "/",
    response_model=list[ConversationResponse],
)
def get_my_conversations(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_user_conversations(
        db=db,
        user_id=current_user.id,
    )


@router.delete(
    "/{conversation_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_my_conversation(
    conversation_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = get_conversation_by_id(
        db=db,
        conversation_id=conversation_id,
    )

    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found",
        )

    if conversation.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this conversation",
        )

    delete_conversation(
        db=db,
        conversation=conversation,
    )

    return None