from fastapi import APIRouter,UploadFile, File
from app.schemas.request_schema import AnalyzeRequest
from app.services.scraper import scrape_website
from app.services.analyzer import analyze_content
from app.services.email_generator import generate_email


router = APIRouter()


@router.get("/")
def health_check():
    return {"status": "running"}


@router.post("/analyze")
def analyze_website(request: AnalyzeRequest):

    website_data = scrape_website(request.url)
    audit = analyze_content(website_data["content"])

    email=generate_email(
        audit["business_type"],
        audit["issues"],
        audit["recommendations"]
    )

    audit["email"]=email

    return audit

@router.post("/upload-csv")
async def upload_csv(file:UploadFile= File(...)):
    return {
        "filename":file.filename
    }