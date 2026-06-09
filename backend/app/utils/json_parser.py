import json
import re
def extract_json(text):
    try:
        match=re.search(r'\{.*\}',text,re.DOTALL)
        if match:
            return json.loads(match.group())
        
    except Exception:
        pass
    return {
        "business_type": "Unknown",
        "score": 0,
        "issues": [],
        "recommendations": []
    }