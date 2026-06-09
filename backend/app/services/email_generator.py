import google.generativeai as genai
from app.config import settings

genai=genai.congigure(api_key=settings.GEMINI_API_KEY)
model=genai.GenerativeModel("gemini-2.5-flash")

def generate_email(business_type,issues,recommendations):
    prompt=f"""
    You are an expert sales copywriter.
    Generate a professional cold outreach email.

    Business Type:
    {business_type}

    Issues:
    {issues}

    Recommendations:
    {recommendations}

    keep it:
    - Professional
    - Short
    - Personalized
    - Under 150 words
    """

    response=model.generate_content(prompt)
    return response.text