from pydantic import BaseModel

class LeadSearchRequest(BaseModel):
    niche: str
    location: str