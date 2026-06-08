from pydantic import BaseModel

class AnalyzeResponse(BaseModel):
    business_type:str
    score:int
    issue:list
    recommendation:list
    email:str