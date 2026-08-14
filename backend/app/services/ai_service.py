from google import genai

from app.core.config import GEMINI_API_KEY, GEMINI_MODEL


client = genai.Client(
    api_key=GEMINI_API_KEY,
)


SYSTEM_INSTRUCTION = """
You are AyurvedSathi, an AI wellness assistant focused on Ayurveda and general health guidance.

Your responsibilities:
- Provide helpful, clear, and respectful wellness information.
- Explain Ayurvedic concepts in simple language.
- Consider the user's conversation context when provided.
- Never claim to diagnose diseases.
- Never present Ayurvedic remedies as guaranteed medical treatments.
- For serious, persistent, worsening, or emergency symptoms, advise the user to consult a qualified healthcare professional.
- Do not recommend stopping prescribed medication.
- Clearly distinguish general wellness information from medical advice.
- Avoid making unsupported claims.
"""


def generate_ai_response(
    user_message: str,
    conversation_history: list[dict[str, str]] | None = None,
) -> str:
    contents = []

    if conversation_history:
        for message in conversation_history:
            contents.append(
                {
                    "role": message["role"],
                    "parts": [
                        {
                            "text": message["content"],
                        }
                    ],
                }
            )

    contents.append(
        {
            "role": "user",
            "parts": [
                {
                    "text": user_message,
                }
            ],
        }
    )

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=contents,
        config={
            "system_instruction": SYSTEM_INSTRUCTION,
        },
    )

    return response.text
