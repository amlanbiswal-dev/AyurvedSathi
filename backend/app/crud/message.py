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
    limit: int = 20,
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
    role = role.strip()
    content = content.strip()

    allowed_roles = {"user", "assistant", "system"}

    if role not in allowed_roles:
        raise ValueError("Invalid message role")

    if not content:
        raise ValueError("Message content cannot be empty")

    if len(content) > 5000:
        raise ValueError("Message content is too long")

    message = Message(
        conversation_id=conversation_id,
        role=role,
        content=content,
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message