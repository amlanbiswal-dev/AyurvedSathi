import logging

from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.crud.conversation import (
    create_conversation,
    delete_conversation,
    get_conversation_by_id,
    get_user_conversations,
    update_conversation,
)
from app.db.database import get_db
from app.schemas.conversation import (
    ConversationCreate,
    ConversationResponse,
    ConversationUpdate,
)


logger = logging.getLogger(__name__)


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
    title = conversation_data.title.strip() if conversation_data.title else None

    conversation = create_conversation(
        db=db,
        user_id=current_user.id,
        title=title,
    )

    logger.info(
        "User %s created conversation %s",
        current_user.id,
        conversation.id,
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
    logger.info(
        "User %s requested conversation list",
        current_user.id,
    )

    return get_user_conversations(
        db=db,
        user_id=current_user.id,
    )


@router.patch(
    "/{conversation_id}",
    response_model=ConversationResponse,
)
def update_my_conversation(
    conversation_id: int = Path(..., gt=0),
    conversation_data: ConversationUpdate = ...,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = get_conversation_by_id(
        db=db,
        conversation_id=conversation_id,
    )

    if conversation is None:
        logger.warning(
            "Conversation %s not found",
            conversation_id,
        )

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found",
        )

    if conversation.user_id != current_user.id:
        logger.warning(
            "Unauthorized update attempt by user %s on conversation %s",
            current_user.id,
            conversation_id,
        )

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this conversation",
        )

    title = conversation_data.title.strip() if conversation_data.title else None

    updated = update_conversation(
        db=db,
        conversation=conversation,
        title=title,
    )

    logger.info(
        "Conversation %s updated by user %s",
        conversation_id,
        current_user.id,
    )

    return updated


@router.delete(
    "/{conversation_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_my_conversation(
    conversation_id: int = Path(..., gt=0),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    conversation = get_conversation_by_id(
        db=db,
        conversation_id=conversation_id,
    )

    if conversation is None:
        logger.warning(
            "Conversation %s not found",
            conversation_id,
        )

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found",
        )

    if conversation.user_id != current_user.id:
        logger.warning(
            "Unauthorized delete attempt by user %s on conversation %s",
            current_user.id,
            conversation_id,
        )

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this conversation",
        )

    delete_conversation(
        db=db,
        conversation=conversation,
    )

    logger.info(
        "Conversation %s deleted by user %s",
        conversation_id,
        current_user.id,
    )

    return None