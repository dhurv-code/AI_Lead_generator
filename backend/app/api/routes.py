from fastapi import APIRouter
from app.schemas.request_schema import AnalyzeRequest
from app.services.scraper import scrape_website
from app.database.lead_repository import save_lead

router = APIRouter()

@router.get("/")
def health_check():
    return {"status": "running"}

@router.post("/analyze")
def analyze_website(request: AnalyzeRequest):

    website_data=scrape_website(request.url)
    save_lead({
        "website":request.url,
        "title":website_data["title"],
        "content":website_data["content"]
    })
    return website_data