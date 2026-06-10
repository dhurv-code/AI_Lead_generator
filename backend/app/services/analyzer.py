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
        "score":0,
        "lead_quality": "",
        "issues": [],
        "recommendations": []
    }}
    Rules:

    - Score must be a realistic lead score from 0-100.
    - Score should consider website quality, professionalism,
    - Conversion potential and business maturity
    - lead_quality must be High, Medium, or Low.
    - Maximum 1 sentence per issues.
    - Maximum 1 sentence per recommendations.
    - No markdown
    - No bullet symbols
    - Each issue under 15 words.
    - Each recommendation under 15 words.
    - Keep everything concise.
    - Return JSON only.

    Website Content:

    {content[:3000]}
    """
    print("API KEY:", settings.GEMINI_API_KEY[:10])

    try:
        response = model.generate_content(prompt)

        result = extract_json(response.text)

        # result["score"] = max(
        #     100 - len(result["issues"]) * 15,
        #     0
        # )

        return result

    except Exception as e:
        return {
            "business_type": "Unknown",
            "score": 0,
            "lead_quality": "Low",
            "issues": [str(e)],
            "recommendations": []
        }