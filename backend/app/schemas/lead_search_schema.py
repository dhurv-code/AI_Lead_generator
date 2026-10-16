
from pydantic import BaseModel, Field


class LeadSearchRequest(BaseModel):
    niche: str = Field(
        min_length=2,
        max_length=100,
        description="Type of business to find"
    )

    location: str = Field(
        min_length=2,
        max_length=100,
        description="City or region to search"
    )

    limit: int = Field(
        default=20,
        ge=1,
        le=20,
        description="Maximum number of leads to discover"
    )
