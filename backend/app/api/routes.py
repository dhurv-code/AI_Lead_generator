from fastapi import APIRouter,UploadFile, File
from app.schemas.request_schema import AnalyzeRequest
# from app.services.scraper import scrape_website
# from app.services.analyzer import analyze_content
# from app.services.email_generator import generate_email
from app.services.lead_processor import process_lead
from app.utils.file_helper import save_upload_file
from app.services.batch_processor import process_csv
from app.database.lead_repository import get_all_leads
from app.schemas.lead_search_schema import LeadSearchRequest
from app.service.lead_finder import find_leads
from app.services.lead_processor import process_lead
router = APIRouter()


@router.get("/")
def health_check():
    return {"status": "running"}


@router.post("/analyze")
def analyze_website(request: AnalyzeRequest):
    return process_lead(request.url)

@router.post("/upload-csv")
async def upload_csv(file:UploadFile= File(...)):
    file_path=await save_upload_file(file)
    results=process_csv(file_path)

    return results

@router.get("/reports")
def get_reports():
    return get_all_leads(

    )
@router.post("/find-leads")
def discover_leads(request:LeadSearchRequest):
    leads=find_leads(request.niche, request.location)
    results=[]
    for lead in leads:
        if lead.get("website"):
            result=process_lead(
                lead["website"]
            )
            result["business_name"]=lead["business_name"]
            results.append(result)
    return results

@router.get("/reports")
def reports():
    return get_all_leads()

@router.get("/exports")
def export():
    pass