import google.generativeai as genai
from app.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)
model=genai.GenerativeModel("gemini-2.5-flash")

def generate_email(business_type,issues,recommendations):
    prompt=f"""
    Generate a cold outreach email.

    Rules:

    - Maximum 120 words.
    - Professional tone.
    - Mention only ONE key issue.
    - Mention ONE recommendation.
    - End with a call to action.
    - No markdown.
    - No bullet points.

    Business Type:
    {business_type}

    Issues:
    {issues}

    Recommendations:
    {recommendations}
    """

    response=model.generate_content(prompt)
    return response.text