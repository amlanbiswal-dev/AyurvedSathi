from sqlalchemy.orm import Session

from app.models.message import Message


def get_message_by_id(
    db: Session,
    message_id: int,
):
    return (
        db.query(Message)
        .filter(Message.id == message_id)
        .first()
    )


def get_conversation_messages(
    db: Session,
    conversation_id: int,
    skip: int = 0,
    limit: int = 100,
):
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_recent_conversation_messages(
    db: Session,
    conversation_id: int,
    limit: int = 20,
):
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.desc())
        .limit(limit)
        .all()
    )


def create_message(
    db: Session,
    conversation_id: int,
    role: str,
    content: str,
):
    message = Message(
        conversation_id=conversation_id,
        role=role,
        content=content,
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message