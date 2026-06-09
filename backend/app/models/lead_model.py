from datetime import datetime

def create_lead_document(data):
    return {
        "website":data[website],
        "business_type":data[business_type],
        "score":data[score],
        "issue":data[issue],
        "recommendation":data[recommendation],
        "email":data[email],
        "created_at":datetime.utcnow()
    }