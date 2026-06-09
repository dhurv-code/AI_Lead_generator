import google.generativeai as genai
from app.config import settings

genai.configure(api_key=settings.GENERATIVE_AI_API_KEY)

model=genai.GenerativeModel("gemini-2.5-flash")

def analyze_contect(content:str):
    prompt=f"""
    Analyze this website content.

    Return ONLY valid JSON.

    {{
        "business_type": "",
        "score": 0,
        "issues": [],
        "recommendations": []
    }}

    Website Content:
    {content[:5000]}
    """

    response=model.generate_content(prompt)
    return response.text