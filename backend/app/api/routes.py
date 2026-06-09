from fastapi import APIRouter,UploadFile, File
from app.schemas.request_schema import AnalyzeRequest
# from app.services.scraper import scrape_website
# from app.services.analyzer import analyze_content
# from app.services.email_generator import generate_email
from app.services.lead_processor import process_lead
from app.utils.file_helper import save_upload_file
from app.services.batch_processor import process_csv

router = APIRouter()


@router.get("/")
def health_check():
    return {"status": "running"}


@router.post("/analyze")
def analyze_website(request: AnalyzeRequest):

    # website_data = scrape_website(request.url)
    # audit = analyze_content(website_data["content"])

    # email=generate_email(
    #     audit["business_type"],
    #     audit["issues"],
    #     audit["recommendations"]
    # )

    # audit["email"]=email

    return process_lead(request.url)

@router.post("/upload-csv")
async def upload_csv(file:UploadFile= File(...)):
    file_path=await save_upload_file(file)
    results=process_csv(file_path)

    return results