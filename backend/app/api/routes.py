from fastapifrom fastapi import APIRouter
from app.schemas.request_schema import AnalyzeRequest

router = APIRouter()

@router.get("/")
def health_check():
    return {"status": "running"}

@router.post("/analyze")
def analyze_website(request: AnalyzeRequest):

    return {
        "message": "Analysis endpoint working",
        "url": request.url
    }