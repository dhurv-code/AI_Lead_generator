import google.generativeai as genai
from app.config import settings
from app.utils.json_parser import extract_json

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_content(content: str):

    prompt = f"""
    You are a lead generation expert.

    Analyze this website.

    Return ONLY valid JSON.

    {{
        "business_type": "",
        "issues": [],
        "recommendations": []
    }}

    Website Content:

    {content[:3000]}
    """

    try:
        response = model.generate_content(prompt)

        result = extract_json(response.text)

        result["score"] = max(
            100 - len(result["issues"]) * 15,
            0
        )

        return result

    except Exception as e:
        return {
            "business_type": "Unknown",
            "score": 0,
            "issues": [str(e)],
            "recommendations": []
        }