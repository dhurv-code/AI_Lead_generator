from fastapi import APIRouter
from app.schemas.request_schema import AnalyzeRequest
from app.services.scraper import scrape_website
from app.services.analyzer import analyze_content

router = APIRouter()


@router.get("/")
def health_check():
    return {"status": "running"}


@router.post("/analyze")
def analyze_website(request: AnalyzeRequest):

    website_data = scrape_website(request.url)

    audit = analyze_content(
        website_data["content"]
    )

    return audit