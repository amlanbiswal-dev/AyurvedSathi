from sqlalchemy.orm import Session

from app.models.conversation import Conversation


def get_conversation_by_id(
    db: Session,
    conversation_id: int,
):
    return (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id)
        .first()
    )


def get_user_conversations(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 100,
):
    return (
        db.query(Conversation)
        .filter(Conversation.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_conversation(
    db: Session,
    user_id: int,
    title: str | None = None,
):
    conversation = Conversation(
        user_id=user_id,
        title=title,
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def delete_conversation(
    db: Session,
    conversation: Conversation,
):
    db.delete(conversation)
    db.commit()