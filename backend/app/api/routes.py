from fastapi import APIRouter,UploadFile, File
from app.schemas.request_schema import AnalyzeRequest
from app.services.lead_processor import process_lead
from app.utils.file_helper import save_upload_file
from app.services.batch_processor import process_csv
from app.database.lead_repository import get_all_leads
from app.schemas.lead_search_schema import LeadSearchRequest
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
    return get_all_leads()

@router.get("/reports")
def reports():
    return get_all_leads()

@router.get("/exports")
def export():
    pass